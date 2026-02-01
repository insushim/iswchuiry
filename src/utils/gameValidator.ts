/**
 * 게임 검증 시스템 - Knox 규칙 및 게임 로직 검증
 * 상용 품질 보장을 위한 QA 시스템
 */

import { Scenario, ScenarioCharacter, ScenarioEvidence, ScenarioLocation } from '../data/scenarios/types';

// 검증 결과 타입
export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  score: number; // 0-100
}

export interface ValidationError {
  code: string;
  message: string;
  field?: string;
  severity: 'critical' | 'major' | 'minor';
}

export interface ValidationWarning {
  code: string;
  message: string;
  suggestion?: string;
}

// Knox 10계명 검증
export function validateKnoxRules(scenario: Scenario): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];

  // Knox 규칙 1: 범인은 이야기 초반에 등장해야 한다
  const culprit = scenario.characters.find(c => c.role === 'culprit');
  if (!culprit) {
    errors.push({
      code: 'KNOX_1_NO_CULPRIT',
      message: '범인이 지정되지 않았습니다',
      severity: 'critical'
    });
  }

  // Knox 규칙 2: 탐정 방법 이외의 초자연적 해결 금지
  const hasSupernaturalEvidence = scenario.evidence.some(e =>
    e.description.includes('마법') ||
    e.description.includes('초능력') ||
    e.description.includes('귀신') ||
    e.description.includes('점술')
  );
  if (hasSupernaturalEvidence) {
    errors.push({
      code: 'KNOX_2_SUPERNATURAL',
      message: '초자연적 요소가 포함되어 있습니다',
      severity: 'major'
    });
  }

  // Knox 규칙 3: 비밀 통로는 1개까지만
  const secretPassages = scenario.locations.filter(loc =>
    loc.description?.includes('비밀') ||
    loc.description?.includes('숨겨진 통로')
  );
  if (secretPassages.length > 1) {
    errors.push({
      code: 'KNOX_3_SECRET_PASSAGES',
      message: '비밀 통로가 2개 이상입니다',
      severity: 'major'
    });
  }

  // Knox 규칙 4: 미발견 독약/과학 장치 금지
  const hasUnexplainedScience = scenario.evidence.some(e =>
    (e.description.includes('독') || e.description.includes('약물')) &&
    !e.description.includes('검출') &&
    !e.description.includes('분석')
  );
  if (hasUnexplainedScience) {
    warnings.push({
      code: 'KNOX_4_UNEXPLAINED_SCIENCE',
      message: '설명되지 않은 독약/과학 장치가 있을 수 있습니다',
      suggestion: '증거에 과학적 설명을 추가하세요'
    });
  }

  // Knox 규칙 5: 범인의 동기 검증
  const culpritCharacter = scenario.characters.find(c => c.role === 'culprit');
  if (culpritCharacter && (!culpritCharacter.motive || !culpritCharacter.motive.description || culpritCharacter.motive.description.length < 10)) {
    errors.push({
      code: 'KNOX_5_NO_MOTIVE',
      message: '범인의 동기가 불충분합니다',
      severity: 'critical'
    });
  }

  // Knox 규칙 6: 탐정은 우연으로 해결하면 안 됨
  const hasSuspiciousText = scenario.solution.howToSolve.some(step =>
    step.includes('우연히') ||
    step.includes('운 좋게') ||
    step.includes('마침')
  );
  if (hasSuspiciousText) {
    warnings.push({
      code: 'KNOX_6_ACCIDENTAL',
      message: '우연적 요소가 해결 과정에 포함되어 있습니다',
      suggestion: '논리적 추리 과정으로 변경하세요'
    });
  }

  // Knox 규칙 8: 독자에게 공개되지 않은 단서로 해결 금지
  const requiredEvidence = scenario.solution.keyEvidence;
  const availableEvidence = scenario.evidence.map(e => e.id);
  const missingEvidence = requiredEvidence.filter(id => !availableEvidence.includes(id));
  if (missingEvidence.length > 0) {
    errors.push({
      code: 'KNOX_8_HIDDEN_EVIDENCE',
      message: `해결에 필요한 증거가 발견 가능하지 않습니다: ${missingEvidence.join(', ')}`,
      severity: 'critical'
    });
  }

  // Knox 규칙 10: 쌍둥이/변장 트릭은 사전 힌트 필요
  const hasTwinOrDisguise = scenario.characters.some(c =>
    c.appearance?.includes('쌍둥이') ||
    c.appearance?.includes('변장') ||
    c.secrets?.some(s => s.content.includes('쌍둥이') || s.content.includes('변장'))
  );
  const hasTwinHint = scenario.evidence.some(e =>
    e.description.includes('쌍둥이') ||
    e.description.includes('닮은') ||
    e.description.includes('변장')
  );
  if (hasTwinOrDisguise && !hasTwinHint) {
    errors.push({
      code: 'KNOX_10_TWIN_NO_HINT',
      message: '쌍둥이/변장 트릭에 대한 힌트가 없습니다',
      severity: 'major'
    });
  }

  // 점수 계산
  const criticalErrors = errors.filter(e => e.severity === 'critical').length;
  const majorErrors = errors.filter(e => e.severity === 'major').length;
  const minorErrors = errors.filter(e => e.severity === 'minor').length;
  const score = Math.max(0, 100 - (criticalErrors * 30) - (majorErrors * 15) - (minorErrors * 5) - (warnings.length * 2));

  return {
    isValid: criticalErrors === 0 && majorErrors === 0,
    errors,
    warnings,
    score
  };
}

// 시나리오 완성도 검증
export function validateScenarioCompleteness(scenario: Scenario): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];

  // 기본 필드 검증
  if (!scenario.id) {
    errors.push({ code: 'MISSING_ID', message: 'ID가 없습니다', severity: 'critical' });
  }
  if (!scenario.title || scenario.title.length < 3) {
    errors.push({ code: 'MISSING_TITLE', message: '제목이 없거나 너무 짧습니다', severity: 'critical' });
  }
  if (!scenario.prologue || scenario.prologue.length < 1) {
    errors.push({ code: 'SHORT_PROLOGUE', message: '프롤로그가 없습니다', severity: 'major' });
  }

  // 캐릭터 검증
  if (scenario.characters.length < 3) {
    errors.push({ code: 'FEW_CHARACTERS', message: '캐릭터가 3명 미만입니다', severity: 'major' });
  }
  const hasVictim = scenario.characters.some(c => c.role === 'victim');
  const hasCulprit = scenario.characters.some(c => c.role === 'culprit');
  if (!hasVictim && scenario.victimId) {
    warnings.push({ code: 'VICTIM_ID_BUT_NO_ROLE', message: 'victimId가 있지만 victim role이 없습니다', suggestion: '피해자 역할을 확인하세요' });
  }
  if (!hasCulprit) {
    errors.push({ code: 'NO_CULPRIT', message: '범인이 없습니다', severity: 'critical' });
  }

  // 증거 검증
  if (scenario.evidence.length < 5) {
    errors.push({ code: 'FEW_EVIDENCE', message: '증거가 5개 미만입니다', severity: 'major' });
  }
  const keyEvidence = scenario.evidence.filter(e => e.isCritical);
  if (keyEvidence.length === 0) {
    errors.push({ code: 'NO_KEY_EVIDENCE', message: '핵심 증거가 없습니다', severity: 'critical' });
  }

  // 장소 검증
  if (scenario.locations.length < 2) {
    errors.push({ code: 'FEW_LOCATIONS', message: '장소가 2개 미만입니다', severity: 'major' });
  }

  // 타임라인 검증
  if (!scenario.timeline || scenario.timeline.length < 3) {
    warnings.push({
      code: 'SHORT_TIMELINE',
      message: '타임라인이 짧습니다',
      suggestion: '최소 3개 이상의 시간대를 추가하세요'
    });
  }

  // 해결책 검증
  if (!scenario.solution) {
    errors.push({ code: 'NO_SOLUTION', message: '해결책이 없습니다', severity: 'critical' });
  } else {
    if (!scenario.culpritId) {
      errors.push({ code: 'NO_CULPRIT_ID', message: '범인 ID가 없습니다', severity: 'critical' });
    }
    if (!scenario.method || scenario.method.length < 20) {
      errors.push({ code: 'SHORT_METHOD', message: '범행 방법 설명이 부족합니다', severity: 'major' });
    }
    if (!scenario.solution.howToSolve || scenario.solution.howToSolve.length < 3) {
      warnings.push({
        code: 'SHORT_SOLUTION',
        message: '해결 과정이 짧습니다',
        suggestion: '최소 3단계 이상의 해결 과정을 추가하세요'
      });
    }
  }

  // 점수 계산
  const criticalErrors = errors.filter(e => e.severity === 'critical').length;
  const majorErrors = errors.filter(e => e.severity === 'major').length;
  const minorErrors = errors.filter(e => e.severity === 'minor').length;
  const score = Math.max(0, 100 - (criticalErrors * 25) - (majorErrors * 10) - (minorErrors * 3) - (warnings.length * 1));

  return {
    isValid: criticalErrors === 0,
    errors,
    warnings,
    score
  };
}

// 게임 플레이 가능성 검증
export function validatePlayability(scenario: Scenario): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];

  // 1. 모든 핵심 증거가 접근 가능한지
  const keyEvidence = scenario.evidence.filter(e => e.isCritical);
  for (const evidence of keyEvidence) {
    const location = scenario.locations.find(loc =>
      loc.id === evidence.foundAt || loc.id === evidence.location
    );
    if (!location) {
      errors.push({
        code: 'INACCESSIBLE_EVIDENCE',
        message: `핵심 증거 "${evidence.name}"를 찾을 수 있는 장소가 없습니다`,
        field: evidence.id,
        severity: 'critical'
      });
    }
  }

  // 2. 범인에게 도달할 수 있는 논리 경로 존재 여부
  const culprit = scenario.characters.find(c => c.role === 'culprit');
  if (culprit) {
    const evidencePointingToCulprit = scenario.evidence.filter(e =>
      e.linkedCharacters?.includes(culprit.id) ||
      e.description.includes(culprit.name)
    );
    if (evidencePointingToCulprit.length < 2) {
      errors.push({
        code: 'INSUFFICIENT_CULPRIT_EVIDENCE',
        message: '범인을 가리키는 증거가 부족합니다 (최소 2개 필요)',
        severity: 'major'
      });
    }
  }

  // 3. 난이도 적절성
  const totalClues = scenario.evidence.length;
  const redHerrings = scenario.evidence.filter(e => e.isRedHerring).length;
  const redHerringRatio = redHerrings / totalClues;

  if (scenario.difficulty === 'easy' && redHerringRatio > 0.3) {
    warnings.push({
      code: 'TOO_MANY_RED_HERRINGS_EASY',
      message: '쉬운 난이도에 혼란 증거가 너무 많습니다',
      suggestion: '혼란 증거를 줄이거나 난이도를 높이세요'
    });
  }
  if ((scenario.difficulty === 'hard' || scenario.difficulty === 'expert') && redHerringRatio < 0.2) {
    warnings.push({
      code: 'FEW_RED_HERRINGS_HARD',
      message: '높은 난이도에 혼란 증거가 적습니다',
      suggestion: '혼란 증거를 추가하여 난이도를 높이세요'
    });
  }

  // 4. 심문 가능성
  const interviewableCharacters = scenario.characters.filter(c =>
    c.role !== 'victim' || (c.dialogues && c.dialogues.length > 0)
  );
  if (interviewableCharacters.length < 2) {
    errors.push({
      code: 'FEW_INTERVIEWABLE',
      message: '심문 가능한 캐릭터가 부족합니다',
      severity: 'major'
    });
  }

  // 점수 계산
  const criticalErrors = errors.filter(e => e.severity === 'critical').length;
  const majorErrors = errors.filter(e => e.severity === 'major').length;
  const minorErrors = errors.filter(e => e.severity === 'minor').length;
  const score = Math.max(0, 100 - (criticalErrors * 30) - (majorErrors * 15) - (minorErrors * 5) - (warnings.length * 2));

  return {
    isValid: criticalErrors === 0,
    errors,
    warnings,
    score
  };
}

// 스토리 품질 검증
export function validateStoryQuality(scenario: Scenario): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];

  // 1. 캐릭터 깊이
  for (const character of scenario.characters) {
    if (!character.personality || character.personality.length < 10) {
      warnings.push({
        code: 'SHALLOW_CHARACTER',
        message: `${character.name}의 성격 설명이 부족합니다`,
        suggestion: '캐릭터의 성격을 더 자세히 설명하세요'
      });
    }
    if (!character.background || character.background.length < 20) {
      warnings.push({
        code: 'MISSING_BACKGROUND',
        message: `${character.name}의 배경 스토리가 부족합니다`,
        suggestion: '캐릭터의 과거나 동기를 추가하세요'
      });
    }
  }

  // 2. 동기의 설득력
  const culprit = scenario.characters.find(c => c.role === 'culprit');
  if (culprit && culprit.motive) {
    const motiveLength = culprit.motive.description.length;
    if (motiveLength < 30) {
      errors.push({
        code: 'WEAK_MOTIVE',
        message: '범인의 동기가 설득력이 부족합니다',
        severity: 'major'
      });
    }
  }

  // 3. 서사 일관성
  if (scenario.timeline && scenario.timeline.length > 0) {
    const times = scenario.timeline.map(t => t.time);
    const uniqueTimes = new Set(times);
    if (times.length !== uniqueTimes.size) {
      warnings.push({
        code: 'DUPLICATE_TIMELINE',
        message: '타임라인에 중복된 시간이 있습니다',
        suggestion: '시간대를 구분하세요'
      });
    }
  }

  // 4. 대화 품질
  let totalDialogues = 0;
  let shortDialogues = 0;
  for (const character of scenario.characters) {
    if (character.dialogues) {
      totalDialogues += character.dialogues.length;
      for (const dialogue of character.dialogues) {
        if (dialogue.lines && dialogue.lines.length < 2) {
          shortDialogues++;
        }
      }
    }
  }
  if (totalDialogues > 0 && shortDialogues / totalDialogues > 0.5) {
    warnings.push({
      code: 'SHORT_DIALOGUES',
      message: '대화가 너무 짧습니다',
      suggestion: '캐릭터 대화에 더 많은 정보를 담으세요'
    });
  }

  // 점수 계산
  const criticalErrors = errors.filter(e => e.severity === 'critical').length;
  const majorErrors = errors.filter(e => e.severity === 'major').length;
  const minorErrors = errors.filter(e => e.severity === 'minor').length;
  const score = Math.max(0, 100 - (criticalErrors * 25) - (majorErrors * 12) - (minorErrors * 5) - (warnings.length * 3));

  return {
    isValid: criticalErrors === 0 && majorErrors === 0,
    errors,
    warnings,
    score
  };
}

// 종합 검증
export function validateScenario(scenario: Scenario): {
  knox: ValidationResult;
  completeness: ValidationResult;
  playability: ValidationResult;
  storyQuality: ValidationResult;
  overall: ValidationResult;
} {
  const knox = validateKnoxRules(scenario);
  const completeness = validateScenarioCompleteness(scenario);
  const playability = validatePlayability(scenario);
  const storyQuality = validateStoryQuality(scenario);

  // 종합 점수 계산
  const overallScore = Math.round(
    (knox.score * 0.3) +
    (completeness.score * 0.25) +
    (playability.score * 0.25) +
    (storyQuality.score * 0.2)
  );

  const allErrors = [
    ...knox.errors,
    ...completeness.errors,
    ...playability.errors,
    ...storyQuality.errors
  ];

  const allWarnings = [
    ...knox.warnings,
    ...completeness.warnings,
    ...playability.warnings,
    ...storyQuality.warnings
  ];

  const criticalErrors = allErrors.filter(e => e.severity === 'critical').length;

  return {
    knox,
    completeness,
    playability,
    storyQuality,
    overall: {
      isValid: criticalErrors === 0,
      errors: allErrors,
      warnings: allWarnings,
      score: overallScore
    }
  };
}

// 배치 검증 (여러 시나리오 한 번에)
export function validateAllScenarios(scenarios: Scenario[]): {
  results: Map<string, ReturnType<typeof validateScenario>>;
  summary: {
    total: number;
    passed: number;
    failed: number;
    averageScore: number;
    commonIssues: { code: string; count: number }[];
  };
} {
  const results = new Map<string, ReturnType<typeof validateScenario>>();
  const issueCounter = new Map<string, number>();

  let totalScore = 0;
  let passed = 0;

  for (const scenario of scenarios) {
    const result = validateScenario(scenario);
    results.set(scenario.id, result);
    totalScore += result.overall.score;

    if (result.overall.isValid) {
      passed++;
    }

    // 이슈 카운트
    for (const error of result.overall.errors) {
      issueCounter.set(error.code, (issueCounter.get(error.code) || 0) + 1);
    }
    for (const warning of result.overall.warnings) {
      issueCounter.set(warning.code, (issueCounter.get(warning.code) || 0) + 1);
    }
  }

  // 가장 흔한 이슈 정렬
  const commonIssues = Array.from(issueCounter.entries())
    .map(([code, count]) => ({ code, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return {
    results,
    summary: {
      total: scenarios.length,
      passed,
      failed: scenarios.length - passed,
      averageScore: scenarios.length > 0 ? Math.round(totalScore / scenarios.length) : 0,
      commonIssues
    }
  };
}

export default validateScenario;
