// ========================================
// DEDUCTIO v5.0 - Puzzle Chain Generator
// 케이스 데이터에서 퍼즐 체인 자동 생성
// ========================================

import { Case, Difficulty, Evidence, Character, TimelineEvent } from '../types';
import {
  PuzzleConfig, PuzzleType,
  HiddenObjectData, HiddenCell,
  CipherData,
  TimelineSortData, TimelineCard,
  ContradictionData, ContradictionStatement,
  PatternMatchData, PatternCard,
  EvidenceChainData, ChainNode, ChainConnection,
  CombinationLockData,
  LogicGridData, LogicGridSuspect, LogicGridCategory, LogicGridClue
} from '../types/puzzles';
import { generateId } from '../utils/helpers';

// 난이도별 퍼즐 구성
const DIFFICULTY_PUZZLE_MAP: Record<Difficulty, PuzzleType[]> = {
  easy: ['hidden-object', 'timeline-sort', 'contradiction', 'logic-grid'],
  medium: ['hidden-object', 'cipher-decode', 'timeline-sort', 'contradiction', 'evidence-chain', 'logic-grid'],
  hard: ['hidden-object', 'cipher-decode', 'timeline-sort', 'contradiction', 'pattern-match', 'evidence-chain', 'combination-lock', 'logic-grid'],
  expert: ['hidden-object', 'cipher-decode', 'timeline-sort', 'contradiction', 'pattern-match', 'evidence-chain', 'combination-lock', 'logic-grid']
};

const SCENE_ICONS: Record<string, string> = {
  '교실': '📚', '복도': '🚪', '운동장': '⚽', '도서관': '📖',
  '화장실': '🚻', '체육관': '🏀', '급식실': '🍱', '교무실': '📋',
  '과학실': '🔬', '미술실': '🎨', '음악실': '🎵', '옥상': '☁️'
};

const EVIDENCE_ICONS: Record<string, string> = {
  physical: '🔍', testimony: '💬', document: '📄', digital: '💻', forensic: '🧪'
};

export function generatePuzzleChain(caseData: Case, difficulty: Difficulty): PuzzleConfig[] {
  const puzzleTypes = DIFFICULTY_PUZZLE_MAP[difficulty];
  const puzzles: PuzzleConfig[] = [];
  let stepNum = 0;

  for (const type of puzzleTypes) {
    const puzzle = generatePuzzle(type, caseData, difficulty, stepNum);
    if (puzzle) {
      puzzles.push(puzzle);
      stepNum++;
    }
  }

  return puzzles;
}

function generatePuzzle(
  type: PuzzleType,
  caseData: Case,
  difficulty: Difficulty,
  step: number
): PuzzleConfig | null {
  switch (type) {
    case 'hidden-object':
      return generateHiddenObject(caseData, difficulty, step);
    case 'cipher-decode':
      return generateCipher(caseData, difficulty, step);
    case 'timeline-sort':
      return generateTimeline(caseData, difficulty, step);
    case 'contradiction':
      return generateContradiction(caseData, difficulty, step);
    case 'pattern-match':
      return generatePatternMatch(caseData, difficulty, step);
    case 'evidence-chain':
      return generateEvidenceChain(caseData, difficulty, step);
    case 'combination-lock':
      return generateCombinationLock(caseData, difficulty, step);
    case 'logic-grid':
      return generateLogicGrid(caseData, difficulty, step);
    default:
      return null;
  }
}

// ── 1. 숨은 단서 찾기 ──────────────────
function generateHiddenObject(caseData: Case, difficulty: Difficulty, step: number): PuzzleConfig {
  const location = caseData.locations[0];
  const objects = location?.objects || [];
  const cols = 4;
  const rows = 3;

  const cells: HiddenCell[] = [];
  let cellIdx = 0;

  // 실제 증거가 있는 오브젝트
  const evidenceObjects = objects.filter(o => o.containsEvidence);
  const normalObjects = objects.filter(o => !o.containsEvidence);

  // 증거 셀
  for (const obj of evidenceObjects.slice(0, 3)) {
    const row = Math.floor(cellIdx / cols) + 1;
    const col = (cellIdx % cols) + 1;
    cells.push({
      id: generateId(),
      row, col,
      icon: getObjectIcon(obj.name),
      label: obj.name,
      isEvidence: true,
      isRedHerring: false,
      examineText: obj.containsEvidence
        ? `중요한 단서를 발견했습니다! ${obj.examinationResult}`
        : obj.examinationResult,
      evidenceId: obj.containsEvidence || undefined
    });
    cellIdx++;
  }

  // 일반 셀 (레드헤링 포함)
  for (const obj of normalObjects.slice(0, cols * rows - cells.length)) {
    const row = Math.floor(cellIdx / cols) + 1;
    const col = (cellIdx % cols) + 1;
    const isRedHerring = Math.random() < 0.2;
    cells.push({
      id: generateId(),
      row, col,
      icon: getObjectIcon(obj.name),
      label: obj.name,
      isEvidence: false,
      isRedHerring,
      examineText: obj.examinationResult
    });
    cellIdx++;
  }

  // 빈 셀 채우기
  const fillerItems = ['의자', '책상', '창문', '시계', '칠판', '사물함', '쓰레기통', '포스터', '선풍기'];
  while (cells.length < cols * rows) {
    const row = Math.floor(cellIdx / cols) + 1;
    const col = (cellIdx % cols) + 1;
    const name = fillerItems[cells.length % fillerItems.length];
    cells.push({
      id: generateId(),
      row, col,
      icon: getObjectIcon(name),
      label: name,
      isEvidence: false,
      isRedHerring: false,
      examineText: '특별한 것은 없어 보입니다.'
    });
    cellIdx++;
  }

  // 셀 순서 섞기
  const shuffled = [...cells].sort(() => Math.random() - 0.5);
  shuffled.forEach((cell, i) => {
    cell.row = Math.floor(i / cols) + 1;
    cell.col = (i % cols) + 1;
  });

  const requiredFinds = Math.min(evidenceObjects.length, 3);

  const data: HiddenObjectData = {
    type: 'hidden-object',
    sceneName: location?.name || '범행 현장',
    gridSize: { cols, rows },
    cells: shuffled,
    requiredFinds: Math.max(requiredFinds, 2)
  };

  return {
    id: generateId(),
    type: 'hidden-object',
    title: '현장 조사',
    description: '범행 현장을 꼼꼼히 살펴보고 숨겨진 증거를 찾아내세요.',
    storyContext: `${location?.name || '현장'}에 도착했습니다. 주변을 조사하여 단서를 찾아야 합니다.`,
    difficulty: difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3,
    rewardType: 'evidence',
    rewardIds: evidenceObjects.map(o => o.containsEvidence).filter(Boolean) as string[],
    rewardText: '현장에서 핵심 증거를 발견했습니다!',
    hints: [
      '빛나는 곳을 눈여겨보세요.',
      '사건과 관련 없어 보이는 것도 확인해보세요.',
      `${requiredFinds}개의 증거를 찾아야 합니다.`
    ],
    data
  };
}

// ── 2. 암호 해독 ──────────────────────
function generateCipher(caseData: Case, difficulty: Difficulty, step: number): PuzzleConfig {
  // 핵심 증거나 모티브에서 힌트 텍스트 추출
  const criticalEvidence = caseData.evidence.find(e => e.isCritical && !e.isRedHerring);
  const solutionText = criticalEvidence
    ? criticalEvidence.name.slice(0, 8)
    : caseData.motive.slice(0, 8);

  const shift = Math.floor(Math.random() * 5) + 2; // 2-6 shift

  const data: CipherData = {
    type: 'cipher-decode',
    cipherType: 'caesar-ko',
    encodedText: shiftKorean(solutionText, shift),
    solution: solutionText,
    shift,
    partialReveal: [0]
  };

  return {
    id: generateId(),
    type: 'cipher-decode',
    title: '암호 해독',
    description: '현장에서 발견된 암호화된 메시지를 해독하세요.',
    storyContext: '범인이 남긴 것으로 보이는 암호 메모가 발견되었습니다.',
    difficulty: difficulty === 'easy' ? 1 : 2,
    rewardType: 'clue',
    rewardIds: criticalEvidence ? [criticalEvidence.id] : [],
    rewardText: `암호를 해독했습니다: "${solutionText}"`,
    hints: [
      '한글 자모를 일정 칸만큼 이동시킨 시저 암호입니다.',
      `이동량은 ${shift}보다 작거나 같습니다.`,
      `첫 글자는 "${solutionText[0]}"입니다.`
    ],
    data
  };
}

// ── 3. 타임라인 재구성 ──────────────────
function generateTimeline(caseData: Case, difficulty: Difficulty, step: number): PuzzleConfig {
  const keyEvents = caseData.timeline
    .filter(e => e.importance !== 'minor')
    .slice(0, difficulty === 'easy' ? 4 : difficulty === 'medium' ? 5 : 6);

  const events: TimelineCard[] = keyEvents.map(event => ({
    id: event.id,
    text: event.description,
    timeHint: getTimeHint(event.time),
    icon: event.isKeyEvent ? '⚡' : '📌',
    characterName: caseData.characters.find(c => event.participants.includes(c.id))?.name
  }));

  const correctOrder = keyEvents.map(e => e.id);

  const data: TimelineSortData = {
    type: 'timeline-sort',
    events,
    correctOrder
  };

  return {
    id: generateId(),
    type: 'timeline-sort',
    title: '사건 타임라인 재구성',
    description: '사건의 순서를 올바르게 재구성하세요.',
    storyContext: '수집된 증언과 증거를 바탕으로 사건의 시간 순서를 파악해야 합니다.',
    difficulty: events.length <= 4 ? 1 : events.length <= 5 ? 2 : 3,
    rewardType: 'clue',
    rewardIds: [],
    rewardText: '사건의 타임라인을 완성했습니다!',
    hints: [
      '시간 힌트를 잘 확인하세요.',
      '인물의 동선을 추적해보세요.',
      '가장 확실한 이벤트부터 배치하세요.'
    ],
    data
  };
}

// ── 4. 모순 찾기 ──────────────────────
function generateContradiction(caseData: Case, difficulty: Difficulty, step: number): PuzzleConfig {
  const contradictions = caseData.contradictions;
  if (contradictions.length === 0) {
    // 모순 데이터가 없으면 간단한 것 생성
    return generateFallbackContradiction(caseData, step);
  }

  const culprit = caseData.characters.find(c => c.isCulprit);
  const targetChar = culprit || caseData.characters.find(c => !c.isVictim);
  if (!targetChar) return generateFallbackContradiction(caseData, step);

  const charContradictions = contradictions.filter(c => c.characterId === targetChar.id);
  const otherContradictions = contradictions.filter(c => c.characterId !== targetChar.id);
  const activeContradictions = charContradictions.length > 0 ? charContradictions : contradictions;

  const statements: ContradictionStatement[] = [];

  // 모순이 있는 진술
  for (const cont of activeContradictions.slice(0, 2)) {
    statements.push({
      id: cont.id,
      text: cont.statement,
      isLie: true,
      correctEvidenceId: cont.contradictingEvidenceId,
      explanation: cont.explanation
    });
  }

  // 진실 진술 (필러)
  const truthStatements = [
    `그 시간에 저는 ${targetChar.alibi.location}에 있었습니다.`,
    `${targetChar.alibi.activity}을(를) 하고 있었어요.`,
    `평소와 다름없는 하루였습니다.`
  ];
  for (const text of truthStatements.slice(0, 3)) {
    statements.push({
      id: generateId(),
      text,
      isLie: false
    });
  }

  // 순서 섞기
  const shuffled = [...statements].sort(() => Math.random() - 0.5);

  const data: ContradictionData = {
    type: 'contradiction',
    characterName: targetChar.name,
    characterIcon: targetChar.gender === 'male' ? '👨' : '👩',
    statements: shuffled
  };

  return {
    id: generateId(),
    type: 'contradiction',
    title: '모순 찾기',
    description: `${targetChar.name}의 진술에서 모순을 찾아내세요.`,
    storyContext: `${targetChar.name}을(를) 심문 중입니다. 진술 속의 거짓말을 증거로 반박하세요.`,
    difficulty: activeContradictions.length <= 1 ? 1 : 2,
    rewardType: 'contradiction',
    rewardIds: activeContradictions.map(c => c.id),
    rewardText: '모순을 발견하여 용의자를 추궁했습니다!',
    hints: [
      '각 진술을 증거와 비교해보세요.',
      '시간과 장소에 주목하세요.',
      '알리바이가 증거와 일치하나요?'
    ],
    data
  };
}

function generateFallbackContradiction(caseData: Case, step: number): PuzzleConfig {
  const culprit = caseData.characters.find(c => c.isCulprit);
  const name = culprit?.name || '용의자';
  const evidence = caseData.evidence.find(e => e.isCritical && !e.isRedHerring);

  const statements: ContradictionStatement[] = [
    {
      id: generateId(),
      text: `사건 당시 저는 ${culprit?.alibi.location || '다른 곳'}에 있었습니다.`,
      isLie: true,
      correctEvidenceId: evidence?.id || '',
      explanation: '증거에 의하면 이 시간에 다른 곳에 있었습니다.'
    },
    {
      id: generateId(),
      text: '그 물건을 본 적이 없습니다.',
      isLie: false
    },
    {
      id: generateId(),
      text: '피해자와는 잘 알지 못합니다.',
      isLie: false
    }
  ];

  const data: ContradictionData = {
    type: 'contradiction',
    characterName: name,
    characterIcon: culprit?.gender === 'male' ? '👨' : '👩',
    statements
  };

  return {
    id: generateId(),
    type: 'contradiction',
    title: '모순 찾기',
    description: `${name}의 진술에서 모순을 찾아내세요.`,
    storyContext: `${name}을(를) 심문합니다.`,
    difficulty: 1,
    rewardType: 'contradiction',
    rewardIds: [],
    rewardText: '모순을 발견했습니다!',
    hints: ['증거를 잘 살펴보세요.', '시간을 확인하세요.'],
    data
  };
}

// ── 5. 패턴 매칭 ──────────────────────
function generatePatternMatch(caseData: Case, difficulty: Difficulty, step: number): PuzzleConfig {
  const evidence = caseData.evidence.filter(e => !e.isRedHerring).slice(0, 4);
  const cards: PatternCard[] = [];
  const matchPairs: [string, string][] = [];

  evidence.forEach((ev, i) => {
    const cardA: PatternCard = {
      id: `ev-${i}-a`,
      front: EVIDENCE_ICONS[ev.type] || '📋',
      back: ev.name,
      group: `group-${i}`
    };
    const cardB: PatternCard = {
      id: `ev-${i}-b`,
      front: getLocationIcon(ev.location),
      back: ev.location,
      group: `group-${i}`
    };
    cards.push(cardA, cardB);
    matchPairs.push([cardA.id, cardB.id]);
  });

  // 카드 섞기
  const shuffledCards = [...cards].sort(() => Math.random() - 0.5);

  const data: PatternMatchData = {
    type: 'pattern-match',
    layout: 'memory',
    cards: shuffledCards,
    matchPairs
  };

  return {
    id: generateId(),
    type: 'pattern-match',
    title: '증거 매칭',
    description: '증거와 발견 장소를 올바르게 매칭하세요.',
    storyContext: '수집한 증거들을 정리하고 있습니다. 각 증거가 어디서 발견되었는지 매칭해보세요.',
    difficulty: evidence.length <= 3 ? 1 : 2,
    rewardType: 'clue',
    rewardIds: [],
    rewardText: '증거들의 패턴을 파악했습니다!',
    hints: [
      '카드를 2초 동안 미리 볼 수 있습니다.',
      '증거의 종류와 장소를 연결하세요.'
    ],
    data
  };
}

// ── 6. 증거 연결 ──────────────────────
function generateEvidenceChain(caseData: Case, difficulty: Difficulty, step: number): PuzzleConfig {
  const criticalEvidence = caseData.evidence
    .filter(e => !e.isRedHerring)
    .slice(0, 5);

  const nodes: ChainNode[] = criticalEvidence.map((ev, i) => ({
    id: ev.id,
    label: ev.name,
    description: ev.description,
    icon: EVIDENCE_ICONS[ev.type] || '📋',
    x: getNodeX(i, criticalEvidence.length),
    y: getNodeY(i, criticalEvidence.length)
  }));

  // 증거 간 실제 연결 관계 생성
  const correctConnections: ChainConnection[] = [];
  for (let i = 0; i < criticalEvidence.length; i++) {
    const ev = criticalEvidence[i];
    if (ev.supports) {
      for (const supportedId of ev.supports) {
        if (criticalEvidence.some(e => e.id === supportedId)) {
          correctConnections.push({
            fromId: ev.id,
            toId: supportedId,
            label: '지원'
          });
        }
      }
    }
    if (ev.contradicts) {
      for (const contradictId of ev.contradicts) {
        if (criticalEvidence.some(e => e.id === contradictId)) {
          correctConnections.push({
            fromId: ev.id,
            toId: contradictId,
            label: '반박'
          });
        }
      }
    }
  }

  // 연결이 너무 적으면 추가
  if (correctConnections.length < 2) {
    for (let i = 0; i < criticalEvidence.length - 1; i++) {
      const a = criticalEvidence[i];
      const b = criticalEvidence[i + 1];
      if (a.linkedCharacters.some(c => b.linkedCharacters.includes(c))) {
        const exists = correctConnections.some(
          c => (c.fromId === a.id && c.toId === b.id) || (c.fromId === b.id && c.toId === a.id)
        );
        if (!exists) {
          correctConnections.push({ fromId: a.id, toId: b.id, label: '연결' });
        }
      }
    }
  }

  // 최소 2개 보장
  while (correctConnections.length < 2 && nodes.length >= 2) {
    const from = nodes[correctConnections.length % nodes.length];
    const to = nodes[(correctConnections.length + 1) % nodes.length];
    correctConnections.push({ fromId: from.id, toId: to.id, label: '연결' });
  }

  const data: EvidenceChainData = {
    type: 'evidence-chain',
    nodes,
    correctConnections
  };

  return {
    id: generateId(),
    type: 'evidence-chain',
    title: '증거 연결',
    description: '증거들 사이의 관계를 파악하고 연결하세요.',
    storyContext: '수집한 증거들 사이에 숨겨진 연결고리를 찾아야 합니다.',
    difficulty: correctConnections.length <= 2 ? 1 : 2,
    rewardType: 'clue',
    rewardIds: [],
    rewardText: '증거 간의 관계를 밝혀냈습니다!',
    hints: [
      '두 증거 노드를 순서대로 클릭하면 연결됩니다.',
      '같은 인물과 관련된 증거를 연결해보세요.',
      `총 ${correctConnections.length}개의 연결이 필요합니다.`
    ],
    data
  };
}

// ── 7. 조합 자물쇠 ──────────────────────
function generateCombinationLock(caseData: Case, difficulty: Difficulty, step: number): PuzzleConfig {
  const digits = ['0','1','2','3','4','5','6','7','8','9'];
  const solution = [
    digits[Math.floor(Math.random() * 10)],
    digits[Math.floor(Math.random() * 10)],
    digits[Math.floor(Math.random() * 10)]
  ];

  // 범행 시간에서 힌트 생성
  const timeDigits = caseData.crimeTime.replace(':', '');
  if (timeDigits.length >= 3) {
    solution[0] = timeDigits[0];
    solution[1] = timeDigits[1];
    solution[2] = timeDigits[2];
  }

  const clueText = `비밀번호는 사건이 일어난 시각과 관련이 있습니다. 범행 시각: ${caseData.crimeTime}`;

  const data: CombinationLockData = {
    type: 'combination-lock',
    dialCount: 3,
    dialOptions: [digits, digits, digits],
    solution,
    clueText
  };

  return {
    id: generateId(),
    type: 'combination-lock',
    title: '잠긴 서랍',
    description: '비밀번호를 알아내어 잠긴 서랍을 열어보세요.',
    storyContext: '범인의 서랍이 자물쇠로 잠겨 있습니다. 힌트를 이용해 비밀번호를 알아내세요.',
    difficulty: 1,
    rewardType: 'secret',
    rewardIds: [],
    rewardText: '서랍에서 결정적인 증거를 찾았습니다!',
    hints: [
      '시간을 숫자로 바꿔보세요.',
      `범행 시각은 ${caseData.crimeTime}입니다.`,
      `첫 번째 숫자는 ${solution[0]}입니다.`
    ],
    data
  };
}

// ── 8. 논리 그리드 ──────────────────────
function generateLogicGrid(caseData: Case, difficulty: Difficulty, step: number): PuzzleConfig {
  const suspects = caseData.characters
    .filter(c => !c.isVictim)
    .slice(0, difficulty === 'easy' ? 3 : 4);

  const gridSuspects: LogicGridSuspect[] = suspects.map(s => ({
    id: s.id,
    name: s.name,
    icon: s.gender === 'male' ? '👨' : '👩'
  }));

  // 카테고리 생성
  const categories: LogicGridCategory[] = [];
  const solution: Record<string, Record<string, string>> = {};

  // 동기 카테고리
  const motiveValues = suspects.map(s =>
    s.motive ? s.motive.type : randomMotiveType()
  );
  const uniqueMotives = [...new Set(motiveValues)];
  while (uniqueMotives.length < suspects.length) {
    const types = ['복수', '탐욕', '질투', '두려움', '보호'];
    for (const t of types) {
      if (!uniqueMotives.includes(t)) {
        uniqueMotives.push(t);
        if (uniqueMotives.length >= suspects.length) break;
      }
    }
  }

  categories.push({
    id: 'motive',
    name: '동기',
    values: uniqueMotives.slice(0, suspects.length),
    icon: '💡'
  });

  // 장소 카테고리
  const locationValues = suspects.map(s => s.alibi.location || '불명');
  const uniqueLocations = [...new Set(locationValues)];
  while (uniqueLocations.length < suspects.length) {
    const locs = ['교실', '복도', '도서관', '운동장', '급식실'];
    for (const l of locs) {
      if (!uniqueLocations.includes(l)) {
        uniqueLocations.push(l);
        if (uniqueLocations.length >= suspects.length) break;
      }
    }
  }

  categories.push({
    id: 'location',
    name: '위치',
    values: uniqueLocations.slice(0, suspects.length),
    icon: '📍'
  });

  // 솔루션 매핑
  suspects.forEach((s, i) => {
    solution[s.id] = {
      motive: uniqueMotives[i] || uniqueMotives[0],
      location: uniqueLocations[i] || uniqueLocations[0]
    };
  });

  // 단서 생성
  const clues: LogicGridClue[] = [];
  const culprit = suspects.find(s => s.isCulprit);

  // 직접 단서
  suspects.forEach((s, i) => {
    if (i < 2) {
      clues.push({
        id: generateId(),
        text: `${s.name}은(는) ${uniqueLocations[i]}에서 목격되었습니다.`,
        difficulty: 1
      });
    }
  });

  // 소거 단서
  if (suspects.length >= 3) {
    clues.push({
      id: generateId(),
      text: `${suspects[0].name}의 동기는 ${uniqueMotives[0]}이(가) 아닙니다... 아니, ${uniqueMotives[0]}입니다.`,
      difficulty: 2
    });
  }

  // 범인 관련 간접 단서
  if (culprit) {
    const culpritIdx = suspects.indexOf(culprit);
    clues.push({
      id: generateId(),
      text: `범행 동기가 ${solution[culprit.id]?.motive || '불명'}인 사람이 범인입니다.`,
      difficulty: 3
    });
  }

  const data: LogicGridData = {
    type: 'logic-grid',
    suspects: gridSuspects,
    categories,
    clues,
    solution
  };

  return {
    id: generateId(),
    type: 'logic-grid',
    title: '최종 추리',
    description: '논리적 추론으로 범인을 찾아내세요.',
    storyContext: '모든 증거가 모였습니다. 이제 논리적으로 범인을 특정해야 합니다.',
    difficulty: difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3,
    rewardType: 'clue',
    rewardIds: [],
    rewardText: '범인을 특정했습니다!',
    hints: [
      'X로 불가능한 조합을 제거하세요.',
      'O로 확정된 조합을 표시하세요.',
      '한 행에 O는 카테고리당 하나만 가능합니다.'
    ],
    data
  };
}

// ── 유틸리티 함수들 ──────────────────────

function shiftKorean(text: string, shift: number): string {
  return text.split('').map(ch => {
    const code = ch.charCodeAt(0) - 0xAC00;
    if (code < 0 || code > 11171) return ch;
    const cho = Math.floor(code / 588);
    const jung = Math.floor((code % 588) / 28);
    const jong = code % 28;
    const newCho = ((cho + shift) % 19 + 19) % 19;
    const newJung = ((jung + shift) % 21 + 21) % 21;
    const newJong = jong === 0 ? 0 : ((jong - 1 + shift) % 27 + 27) % 27 + 1;
    return String.fromCharCode(0xAC00 + newCho * 588 + newJung * 28 + newJong);
  }).join('');
}

function getObjectIcon(name: string): string {
  const iconMap: Record<string, string> = {
    '가방': '🎒', '책': '📕', '노트': '📒', '핸드폰': '📱',
    '지갑': '👛', '열쇠': '🔑', '편지': '✉️', '사진': '📷',
    '메모': '📝', '의자': '🪑', '책상': '🪵', '창문': '🪟',
    '시계': '⏰', '칠판': '📋', '사물함': '🗄️', '쓰레기통': '🗑️',
    '포스터': '🖼️', '선풍기': '💨', '컴퓨터': '💻', '유리': '🥃'
  };
  for (const [key, icon] of Object.entries(iconMap)) {
    if (name.includes(key)) return icon;
  }
  return '📦';
}

function getLocationIcon(location: string): string {
  for (const [key, icon] of Object.entries(SCENE_ICONS)) {
    if (location.includes(key)) return icon;
  }
  return '📍';
}

function getTimeHint(time: string): string {
  const hour = parseInt(time.split(':')[0]);
  if (hour < 9) return '이른 아침';
  if (hour < 12) return '오전';
  if (hour < 13) return '점심';
  if (hour < 15) return '오후 초';
  if (hour < 18) return '오후';
  return '저녁';
}

function getNodeX(index: number, total: number): number {
  const positions = [
    [50], // 1
    [25, 75], // 2
    [20, 50, 80], // 3
    [15, 40, 60, 85], // 4
    [10, 30, 50, 70, 90] // 5
  ];
  return positions[Math.min(total - 1, 4)][index] || 50;
}

function getNodeY(index: number, total: number): number {
  const positions = [
    [50], // 1
    [40, 60], // 2
    [25, 60, 25], // 3
    [30, 70, 30, 70], // 4
    [20, 55, 80, 35, 65] // 5
  ];
  return positions[Math.min(total - 1, 4)][index] || 50;
}

function randomMotiveType(): string {
  const types = ['복수', '탐욕', '질투', '두려움', '보호'];
  return types[Math.floor(Math.random() * types.length)];
}
