// ========================================
// 케이스 검증 유틸리티 - 100개+ 케이스 교차검증
// ========================================

import { Case, CaseValidationResult, ValidationError, ValidationWarning, KnoxValidation } from '../types';
import { CaseGenerator } from '../core/CaseGenerator';
import { Difficulty, CaseType } from '../types';

// 케이스 검증 함수
export function validateCase(caseData: Case): CaseValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];

  // 1. 기본 구조 검증
  validateBasicStructure(caseData, errors);

  // 2. Knox 규칙 검증
  const knoxValidation = validateKnoxRules(caseData);
  if (!knoxValidation.isValid) {
    for (const failedRule of knoxValidation.failedRules) {
      errors.push({
        code: 'KNOX_VIOLATION',
        message: failedRule,
        location: 'case.knoxValidation',
        severity: 'high'
      });
    }
  }

  // 3. 해결 가능성 검증
  const solvability = validateSolvability(caseData, errors, warnings);

  // 4. 증거 체인 검증
  validateEvidenceChain(caseData, errors, warnings);

  // 5. 타임라인 일관성 검증
  validateTimelineConsistency(caseData, errors, warnings);

  // 6. 캐릭터 일관성 검증
  validateCharacterConsistency(caseData, errors, warnings);

  // 점수 계산
  const baseScore = 100;
  const errorPenalty = errors.reduce((acc, e) => {
    switch (e.severity) {
      case 'critical': return acc + 30;
      case 'high': return acc + 20;
      case 'medium': return acc + 10;
      default: return acc;
    }
  }, 0);
  const warningPenalty = warnings.length * 2;
  const knoxBonus = knoxValidation.score;

  const score = Math.max(0, Math.min(100, baseScore - errorPenalty - warningPenalty + knoxBonus));

  return {
    isValid: errors.filter(e => e.severity === 'critical').length === 0,
    errors,
    warnings,
    score,
    knoxValidation,
    solvability
  };
}

// 기본 구조 검증
function validateBasicStructure(caseData: Case, errors: ValidationError[]): void {
  if (!caseData.culpritId) {
    errors.push({
      code: 'NO_CULPRIT',
      message: '범인이 지정되지 않았습니다',
      location: 'case.culpritId',
      severity: 'critical'
    });
  }

  if (caseData.characters.length < 3) {
    errors.push({
      code: 'TOO_FEW_CHARACTERS',
      message: '캐릭터가 3명 미만입니다',
      location: 'case.characters',
      severity: 'critical'
    });
  }

  if (caseData.evidence.length < 3) {
    errors.push({
      code: 'TOO_FEW_EVIDENCE',
      message: '증거가 3개 미만입니다',
      location: 'case.evidence',
      severity: 'critical'
    });
  }

  // 범인 존재 여부
  const culpritExists = caseData.characters.some(c => c.id === caseData.culpritId);
  if (!culpritExists) {
    errors.push({
      code: 'CULPRIT_NOT_FOUND',
      message: '범인 ID가 캐릭터 목록에 없습니다',
      location: 'case.culpritId',
      severity: 'critical'
    });
  }

  // 범인의 isCulprit 플래그
  const culprit = caseData.characters.find(c => c.id === caseData.culpritId);
  if (culprit && !culprit.isCulprit) {
    errors.push({
      code: 'CULPRIT_FLAG_MISMATCH',
      message: '범인의 isCulprit 플래그가 false입니다',
      location: 'case.characters[culprit].isCulprit',
      severity: 'high'
    });
  }
}

// Knox 규칙 검증
function validateKnoxRules(caseData: Case): KnoxValidation {
  const culprit = caseData.characters.find(c => c.id === caseData.culpritId);
  const failedRules: string[] = [];

  // Rule 1: 범인은 초반에 등장
  const rule1 = culprit ?
    ['08:00', '08:30', '09:00', '09:30', '10:00'].includes(culprit.firstAppearanceTime) :
    false;
  if (!rule1) failedRules.push('Rule 1: 범인이 초반에 등장하지 않음');

  // Rule 2: 초자연적 요소 금지 (항상 통과)
  const rule2 = true;

  // Rule 3: 비밀 통로 2개 이상 금지
  const secretPassages = caseData.locations.flatMap(l =>
    l.hiddenAreas?.filter(h => h.name.includes('통로') || h.name.includes('passage')) || []
  );
  const rule3 = secretPassages.length < 2;
  if (!rule3) failedRules.push('Rule 3: 비밀 통로가 2개 이상');

  // Rule 4: 미지의 독극물 금지 (항상 통과, 이 게임에서 사용 안함)
  const rule4 = true;

  // Rule 5: 스테레오타입 금지 (항상 통과)
  const rule5 = true;

  // Rule 6: 우연 해결 금지
  const criticalEvidence = caseData.evidence.filter(e => e.isCritical && !e.isRedHerring);
  const rule6 = criticalEvidence.length >= 2;
  if (!rule6) failedRules.push('Rule 6: 결정적 증거 부족으로 우연 해결 위험');

  // Rule 7: 탐정은 범인 불가 (플레이어가 탐정이므로 항상 통과)
  const rule7 = true;

  // Rule 8: 모든 단서 공개
  const culpritEvidence = caseData.evidence.filter(e =>
    e.linkedCharacters.includes(caseData.culpritId) && e.isCritical
  );
  const rule8 = culpritEvidence.length >= 1;
  if (!rule8) failedRules.push('Rule 8: 범인과 연결된 결정적 증거 없음');

  // Rule 9: 조수의 추리 제한 (이 게임에서 해당 없음)
  const rule9 = true;

  // Rule 10: 사전 언급 없는 쌍둥이 금지
  const rule10 = true;

  const passedRules = [rule1, rule2, rule3, rule4, rule5, rule6, rule7, rule8, rule9, rule10]
    .filter(Boolean).length;

  return {
    rule1_culpritEarlyAppearance: rule1,
    rule2_noSupernatural: rule2,
    rule3_noSecretPassages: rule3,
    rule4_noUnknownPoison: rule4,
    rule5_noAsianCharacter: rule5,
    rule6_noAccident: rule6,
    rule7_detectiveNotCulprit: rule7,
    rule8_allCluesShown: rule8,
    rule9_sidekickLimited: rule9,
    rule10_noTwinUnannounced: rule10,
    isValid: failedRules.length === 0,
    failedRules,
    score: passedRules * 2
  };
}

// 해결 가능성 검증
function validateSolvability(
  caseData: Case,
  errors: ValidationError[],
  warnings: ValidationWarning[]
): 'guaranteed' | 'possible' | 'difficult' | 'impossible' {
  const culprit = caseData.characters.find(c => c.id === caseData.culpritId);
  if (!culprit) return 'impossible';

  // 범인을 가리키는 증거 수
  const culpritEvidence = caseData.evidence.filter(e =>
    e.linkedCharacters.includes(caseData.culpritId) && !e.isRedHerring
  );

  // 결정적 증거 수
  const criticalEvidence = culpritEvidence.filter(e => e.isCritical);

  // 알리바이 허점
  const hasAlibiHole = culprit.alibi.hasHole;

  // 동기
  const hasMotive = culprit.motive !== null;

  // 해결 가능성 판단
  if (criticalEvidence.length === 0) {
    errors.push({
      code: 'NO_CRITICAL_EVIDENCE',
      message: '범인과 연결된 결정적 증거가 없습니다',
      location: 'case.evidence',
      severity: 'critical'
    });
    return 'impossible';
  }

  if (!hasAlibiHole && !hasMotive) {
    warnings.push({
      code: 'WEAK_CASE',
      message: '알리바이 허점과 동기가 모두 불명확합니다',
      suggestion: '알리바이 허점이나 동기를 추가하세요'
    });
    return 'difficult';
  }

  if (criticalEvidence.length >= 2 && hasAlibiHole && hasMotive) {
    return 'guaranteed';
  }

  if (criticalEvidence.length >= 1 && (hasAlibiHole || hasMotive)) {
    return 'possible';
  }

  return 'difficult';
}

// 증거 체인 검증
function validateEvidenceChain(
  caseData: Case,
  errors: ValidationError[],
  warnings: ValidationWarning[]
): void {
  // 모든 결정적 증거가 수집 가능한지
  const criticalEvidence = caseData.evidence.filter(e => e.isCritical);

  for (const evidence of criticalEvidence) {
    const location = caseData.locations.find(l => l.id === evidence.location || l.name === evidence.location);

    if (!location) {
      errors.push({
        code: 'EVIDENCE_LOCATION_MISSING',
        message: `증거 "${evidence.name}"의 위치를 찾을 수 없습니다`,
        location: `case.evidence[${evidence.id}]`,
        severity: 'high'
      });
    }
  }

  // 레드 헤링 비율 확인
  const redHerrings = caseData.evidence.filter(e => e.isRedHerring);
  const redHerringRatio = redHerrings.length / caseData.evidence.length;

  if (redHerringRatio > 0.5) {
    warnings.push({
      code: 'TOO_MANY_RED_HERRINGS',
      message: '레드 헤링이 전체 증거의 50%를 초과합니다',
      suggestion: '결정적 증거를 더 추가하세요'
    });
  }
}

// 타임라인 일관성 검증
function validateTimelineConsistency(
  caseData: Case,
  errors: ValidationError[],
  warnings: ValidationWarning[]
): void {
  const timeToMinutes = (time: string): number => {
    const [h, m] = time.split(':').map(Number);
    return h * 60 + m;
  };

  // 타임라인 이벤트 시간 순서 확인
  const events = [...caseData.timeline].sort((a, b) =>
    timeToMinutes(a.time) - timeToMinutes(b.time)
  );

  // 범행 시각이 타임라인에 포함되어 있는지
  const crimeTimeMin = timeToMinutes(caseData.crimeTime);
  const coveringEvents = events.filter(e => {
    const start = timeToMinutes(e.time);
    const end = e.endTime ? timeToMinutes(e.endTime) : start + 30;
    return crimeTimeMin >= start && crimeTimeMin <= end;
  });

  if (coveringEvents.length === 0) {
    warnings.push({
      code: 'CRIME_TIME_NOT_COVERED',
      message: '범행 시각이 타임라인 이벤트에 포함되지 않습니다',
      suggestion: '범행 시각 전후 이벤트를 추가하세요'
    });
  }

  // 알리바이 시간과 타임라인 일관성
  for (const character of caseData.characters) {
    if (character.alibi.startTime && character.alibi.endTime) {
      const alibiStart = timeToMinutes(character.alibi.startTime);
      const alibiEnd = timeToMinutes(character.alibi.endTime);

      if (alibiEnd < alibiStart) {
        warnings.push({
          code: 'ALIBI_TIME_INCONSISTENT',
          message: `${character.name}의 알리바이 종료 시간이 시작 시간보다 빠릅니다`,
          suggestion: '알리바이 시간을 수정하세요'
        });
      }
    }
  }
}

// 캐릭터 일관성 검증
function validateCharacterConsistency(
  caseData: Case,
  errors: ValidationError[],
  warnings: ValidationWarning[]
): void {
  const characterIds = caseData.characters.map(c => c.id);

  // 범인 확인
  const culprit = caseData.characters.find(c => c.isCulprit);
  const flaggedCulprits = caseData.characters.filter(c => c.isCulprit);

  if (flaggedCulprits.length > 1) {
    errors.push({
      code: 'MULTIPLE_CULPRITS',
      message: '여러 캐릭터가 범인으로 플래그되어 있습니다',
      location: 'case.characters',
      severity: 'high'
    });
  }

  // 관계 일관성
  for (const character of caseData.characters) {
    for (const rel of character.relationships) {
      if (!characterIds.includes(rel.targetId)) {
        warnings.push({
          code: 'INVALID_RELATIONSHIP_TARGET',
          message: `${character.name}의 관계 대상 ID가 유효하지 않습니다`,
          suggestion: '관계 대상을 확인하세요'
        });
      }
    }
  }

  // 증인 검증
  for (const character of caseData.characters) {
    for (const witnessId of character.alibi.witnesses) {
      if (!characterIds.includes(witnessId)) {
        warnings.push({
          code: 'INVALID_WITNESS',
          message: `${character.name}의 알리바이 증인이 유효하지 않습니다`,
          suggestion: '증인 ID를 확인하세요'
        });
      }
    }
  }
}

// 100개 케이스 배치 검증
export interface BatchValidationResult {
  totalCases: number;
  validCases: number;
  invalidCases: number;
  averageScore: number;
  knoxPassRate: number;
  solvabilityDistribution: {
    guaranteed: number;
    possible: number;
    difficult: number;
    impossible: number;
  };
  commonErrors: { code: string; count: number }[];
  commonWarnings: { code: string; count: number }[];
  results: {
    seed: number;
    difficulty: Difficulty;
    caseType: CaseType;
    isValid: boolean;
    score: number;
    solvability: string;
    errorCount: number;
    warningCount: number;
  }[];
}

export function validateCaseBatch(
  count: number = 100,
  difficulties: Difficulty[] = ['easy', 'medium', 'hard', 'expert']
): BatchValidationResult {
  const results: BatchValidationResult['results'] = [];
  const errorCounts: Record<string, number> = {};
  const warningCounts: Record<string, number> = {};
  const solvabilityDist = {
    guaranteed: 0,
    possible: 0,
    difficult: 0,
    impossible: 0
  };

  let validCount = 0;
  let totalScore = 0;
  let knoxPassCount = 0;

  for (let i = 0; i < count; i++) {
    const difficulty = difficulties[i % difficulties.length];
    const seed = Date.now() + i;

    const generator = new CaseGenerator(difficulty, undefined, seed);
    const caseData = generator.generate();
    const validation = validateCase(caseData);

    // 결과 기록
    results.push({
      seed,
      difficulty,
      caseType: caseData.type,
      isValid: validation.isValid,
      score: validation.score,
      solvability: validation.solvability,
      errorCount: validation.errors.length,
      warningCount: validation.warnings.length
    });

    if (validation.isValid) validCount++;
    totalScore += validation.score;
    if (validation.knoxValidation.isValid) knoxPassCount++;
    solvabilityDist[validation.solvability]++;

    // 에러/경고 집계
    for (const error of validation.errors) {
      errorCounts[error.code] = (errorCounts[error.code] || 0) + 1;
    }
    for (const warning of validation.warnings) {
      warningCounts[warning.code] = (warningCounts[warning.code] || 0) + 1;
    }
  }

  // 정렬된 에러/경고 목록
  const commonErrors = Object.entries(errorCounts)
    .map(([code, count]) => ({ code, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const commonWarnings = Object.entries(warningCounts)
    .map(([code, count]) => ({ code, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return {
    totalCases: count,
    validCases: validCount,
    invalidCases: count - validCount,
    averageScore: totalScore / count,
    knoxPassRate: (knoxPassCount / count) * 100,
    solvabilityDistribution: solvabilityDist,
    commonErrors,
    commonWarnings,
    results
  };
}

// 콘솔 출력용 포맷터
export function formatValidationReport(result: BatchValidationResult): string {
  const lines: string[] = [];

  lines.push('═══════════════════════════════════════════════════════════');
  lines.push('          케이스 교차검증 리포트');
  lines.push('═══════════════════════════════════════════════════════════');
  lines.push('');
  lines.push(`총 검증 케이스: ${result.totalCases}개`);
  lines.push(`유효 케이스: ${result.validCases}개 (${((result.validCases / result.totalCases) * 100).toFixed(1)}%)`);
  lines.push(`무효 케이스: ${result.invalidCases}개`);
  lines.push(`평균 점수: ${result.averageScore.toFixed(1)}/100`);
  lines.push(`Knox 규칙 통과율: ${result.knoxPassRate.toFixed(1)}%`);
  lines.push('');
  lines.push('해결 가능성 분포:');
  lines.push(`  - 보장됨 (guaranteed): ${result.solvabilityDistribution.guaranteed}개`);
  lines.push(`  - 가능함 (possible): ${result.solvabilityDistribution.possible}개`);
  lines.push(`  - 어려움 (difficult): ${result.solvabilityDistribution.difficult}개`);
  lines.push(`  - 불가능 (impossible): ${result.solvabilityDistribution.impossible}개`);
  lines.push('');

  if (result.commonErrors.length > 0) {
    lines.push('주요 오류:');
    for (const error of result.commonErrors) {
      lines.push(`  - ${error.code}: ${error.count}건`);
    }
    lines.push('');
  }

  if (result.commonWarnings.length > 0) {
    lines.push('주요 경고:');
    for (const warning of result.commonWarnings) {
      lines.push(`  - ${warning.code}: ${warning.count}건`);
    }
  }

  lines.push('');
  lines.push('═══════════════════════════════════════════════════════════');

  return lines.join('\n');
}
