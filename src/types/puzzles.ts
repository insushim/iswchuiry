// ========================================
// DEDUCTIO v5.0 - Escape Room Puzzle Types
// ========================================

export type PuzzleType =
  | 'hidden-object'
  | 'cipher-decode'
  | 'timeline-sort'
  | 'contradiction'
  | 'pattern-match'
  | 'evidence-chain'
  | 'combination-lock'
  | 'logic-grid';

export interface PuzzleConfig {
  id: string;
  type: PuzzleType;
  title: string;
  description: string;
  storyContext: string; // 퍼즐이 스토리에서 어떤 맥락인지
  difficulty: 1 | 2 | 3;
  rewardType: 'evidence' | 'secret' | 'contradiction' | 'clue';
  rewardIds: string[];
  rewardText: string; // 보상 설명 ("핵심 증거를 발견했습니다!")
  hints: string[];
  data: PuzzleData;
}

export type PuzzleData =
  | HiddenObjectData
  | CipherData
  | TimelineSortData
  | ContradictionData
  | PatternMatchData
  | EvidenceChainData
  | CombinationLockData
  | LogicGridData;

// ── 1. 숨은 단서 찾기 ──────────────────
export interface HiddenObjectData {
  type: 'hidden-object';
  sceneName: string; // "범행 현장", "피해자의 방"
  gridSize: { cols: number; rows: number }; // CSS 그리드 크기
  cells: HiddenCell[];
  requiredFinds: number;
}

export interface HiddenCell {
  id: string;
  row: number;
  col: number;
  icon: string; // emoji or lucide icon name
  label: string;
  isEvidence: boolean;
  isRedHerring: boolean;
  examineText: string;
  evidenceId?: string;
}

// ── 2. 암호 해독 ──────────────────────
export interface CipherData {
  type: 'cipher-decode';
  cipherType: 'caesar-ko' | 'substitute' | 'reverse' | 'number';
  encodedText: string;
  solution: string;
  shift?: number; // caesar: 한글 자모 이동량
  keyMap?: Record<string, string>; // substitute cipher mapping
  partialReveal?: number[]; // 미리 공개할 글자 인덱스
}

// ── 3. 타임라인 재구성 ──────────────────
export interface TimelineSortData {
  type: 'timeline-sort';
  events: TimelineCard[];
  correctOrder: string[]; // event IDs in correct order
}

export interface TimelineCard {
  id: string;
  text: string;
  timeHint?: string; // 약간의 시간 힌트 ("오전 중", "점심 직후")
  icon: string;
  characterName?: string;
}

// ── 4. 모순 찾기 (Ace Attorney식) ──────
export interface ContradictionData {
  type: 'contradiction';
  characterName: string;
  characterIcon: string; // emoji
  statements: ContradictionStatement[];
}

export interface ContradictionStatement {
  id: string;
  text: string;
  isLie: boolean;
  correctEvidenceId?: string; // 이 진술을 반박하는 증거 ID
  explanation?: string; // 왜 모순인지
}

// ── 5. 패턴 매칭 ──────────────────────
export interface PatternMatchData {
  type: 'pattern-match';
  layout: 'memory' | 'sequence' | 'grid-match';
  cards: PatternCard[];
  matchPairs: [string, string][]; // card ID pairs that match
}

export interface PatternCard {
  id: string;
  front: string; // 앞면 (emoji/심볼)
  back: string; // 뒷면 (매칭 대상)
  group: string; // 같은 그룹끼리 매칭
}

// ── 6. 증거 연결 ──────────────────────
export interface EvidenceChainData {
  type: 'evidence-chain';
  nodes: ChainNode[];
  correctConnections: ChainConnection[];
  distractorNodes?: string[]; // 연결하면 안 되는 노드들
}

export interface ChainNode {
  id: string;
  label: string;
  description: string;
  icon: string;
  x: number; // 0-100 percentage position
  y: number;
}

export interface ChainConnection {
  fromId: string;
  toId: string;
  label: string; // "지원", "반박", "연결"
}

// ── 7. 조합 자물쇠 ──────────────────
export interface CombinationLockData {
  type: 'combination-lock';
  dialCount: 3 | 4;
  dialOptions: string[][]; // 각 다이얼의 선택지
  solution: string[];
  clueText: string; // 비밀번호 힌트
}

// ── 8. 논리 그리드 (Murdle식) ──────────
export interface LogicGridData {
  type: 'logic-grid';
  suspects: LogicGridSuspect[];
  categories: LogicGridCategory[];
  clues: LogicGridClue[];
  solution: Record<string, Record<string, string>>; // suspectId -> categoryId -> value
}

export interface LogicGridSuspect {
  id: string;
  name: string;
  icon: string;
}

export interface LogicGridCategory {
  id: string;
  name: string;
  values: string[];
  icon: string;
}

export interface LogicGridClue {
  id: string;
  text: string;
  difficulty: 1 | 2 | 3;
}

// ── 퍼즐 상태 ──────────────────────
export interface PuzzleProgress {
  puzzleId: string;
  isCompleted: boolean;
  isUnlocked: boolean;
  attempts: number;
  hintsUsed: number;
  score: number;
  startedAt?: number;
  completedAt?: number;
}

// ── 퍼즐 체인 ──────────────────────
export interface PuzzleChainConfig {
  puzzles: PuzzleConfig[];
  totalScore: number;
}
