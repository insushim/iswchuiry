// ========================================
// 핵심 타입 정의 v2.0 - 상업용 품질
// ========================================

export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';
export type CaseType = 'theft' | 'vandalism' | 'mystery' | 'disappearance' | 'fraud' | 'blackmail';
export type GamePhase = 'intro' | 'investigation' | 'interrogation' | 'deduction' | 'accusation' | 'reveal';
export type EvidenceType = 'physical' | 'testimony' | 'document' | 'digital' | 'forensic';
export type RelationshipType = 'friend' | 'rival' | 'family' | 'lover' | 'colleague' | 'enemy' | 'stranger';

// Knox 10계명 검증 결과
export interface KnoxValidation {
  rule1_culpritEarlyAppearance: boolean;  // 범인은 초반에 등장
  rule2_noSupernatural: boolean;          // 초자연적 요소 금지
  rule3_noSecretPassages: boolean;        // 비밀 통로 2개 이상 금지
  rule4_noUnknownPoison: boolean;         // 미지의 독극물 금지
  rule5_noAsianCharacter: boolean;        // (현대 해석: 스테레오타입 금지)
  rule6_noAccident: boolean;              // 우연 해결 금지
  rule7_detectiveNotCulprit: boolean;     // 탐정은 범인 불가
  rule8_allCluesShown: boolean;           // 모든 단서 공개
  rule9_sidekickLimited: boolean;         // 조수의 추리 제한
  rule10_noTwinUnannounced: boolean;      // 사전 언급 없는 쌍둥이 금지
  isValid: boolean;
  failedRules: string[];
  score: number;
}

// 캐릭터 관계
export interface Relationship {
  targetId: string;
  type: RelationshipType;
  intensity: 1 | 2 | 3 | 4 | 5; // 관계 강도
  description: string;
  isPublic: boolean; // 공개적인 관계인지
  secretReason?: string; // 숨겨진 관계 이유
}

// 동기 시스템
export interface Motive {
  type: 'revenge' | 'greed' | 'jealousy' | 'fear' | 'protection' | 'ideology' | 'accident';
  description: string;
  strength: 1 | 2 | 3; // 동기 강도
  relatedEvidence: string[]; // 동기를 뒷받침하는 증거
  isRevealed: boolean;
}

// 알리바이 시스템 (강화)
export interface Alibi {
  location: string;
  startTime: string; // HH:MM 형식
  endTime: string;
  activity: string;
  witnesses: string[]; // 증인 캐릭터 ID
  physicalEvidence: string[]; // 알리바이 물증
  hasHole: boolean;
  holeDetail?: string;
  holeTimeStart?: string;
  holeTimeEnd?: string;
  canBeVerified: boolean;
  verificationMethod?: string;
}

export interface Character {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female';
  occupation: string;
  personality: string;
  description: string;
  appearance: string; // 외모 설명
  background: string; // 배경 스토리
  alibi: Alibi;
  motive: Motive | null;
  relationships: Relationship[];
  secrets: Secret[];
  isVictim: boolean;
  isCulprit: boolean;
  isWitness: boolean;
  suspicionLevel: number; // 0-100, 플레이어가 느끼는 의심도
  dialogues: Record<string, DialogueOption[]>;
  behaviorPatterns: string[]; // 행동 패턴
  nervousTriggers: string[]; // 긴장하는 주제
  firstAppearanceTime: string; // 처음 등장 시간
}

export interface DialogueOption {
  id: string;
  text: string;
  condition?: DialogueCondition;
  response: string;
  revealsInfo?: string;
  changesRelation?: number;
  triggersNervous?: boolean;
}

export interface DialogueCondition {
  requiredEvidence?: string[];
  requiredSecrets?: string[];
  requiredDeductions?: string[];
  minTrustLevel?: number;
}

export interface Secret {
  id: string;
  content: string;
  importance: 'critical' | 'major' | 'minor';
  isRevealed: boolean;
  requiredEvidence: string[];
  requiredTrustLevel?: number;
  connectedToCase: boolean; // 사건과 직접 관련?
  revealMethod: 'evidence' | 'interrogation' | 'deduction' | 'automatic';
}

export interface Evidence {
  id: string;
  name: string;
  type: EvidenceType;
  description: string;
  detailedDescription: string; // 자세한 설명
  location: string;
  foundAt: string; // 발견 장소 상세
  linkedCharacters: string[];
  contradicts?: string[]; // 모순되는 증거 ID
  supports?: string[]; // 뒷받침하는 증거 ID
  isRedHerring: boolean;
  redHerringReason?: string; // 왜 미끼인지
  isCollected: boolean;
  isCritical: boolean;
  criticalReason?: string; // 왜 결정적인지
  discoveryDifficulty: 1 | 2 | 3; // 발견 난이도
  analysisRequired: boolean; // 분석 필요 여부
  analysisResult?: string;
  timestamp?: string; // 증거의 시간대 (타임라인 연결)
  weight: number; // 증거 가치 (점수 계산용)
}

export interface Location {
  id: string;
  name: string;
  description: string;
  atmosphere: string; // 분위기 설명
  objects: InteractiveObject[];
  connectedTo: string[];
  accessRestriction?: string; // 접근 제한
  isSearched: boolean;
  searchProgress: number; // 0-100
  hiddenAreas: HiddenArea[];
}

export interface HiddenArea {
  id: string;
  name: string;
  description: string;
  discoveryCondition: string;
  isDiscovered: boolean;
  containsEvidence: string[];
}

export interface InteractiveObject {
  id: string;
  name: string;
  description: string;
  canExamine: boolean;
  examinationResult: string;
  containsEvidence: string | null;
  isExamined: boolean;
  requiresTool?: string;
  isLocked?: boolean;
  unlockMethod?: string;
}

export interface TimelineEvent {
  id: string;
  time: string; // HH:MM 형식
  endTime?: string;
  description: string;
  detailedDescription: string;
  participants: string[];
  location: string;
  isKeyEvent: boolean;
  isRevealed: boolean;
  importance: 'critical' | 'major' | 'minor';
  relatedEvidence: string[];
  canBeContradicted: boolean;
  contradictionEvidence?: string[];
}

// 추론 시스템 (강화)
export interface Deduction {
  id: string;
  type: 'who' | 'why' | 'how' | 'when' | 'where' | 'connection';
  statement: string;
  supportingEvidence: string[];
  contradictingEvidence: string[];
  isCorrect: boolean | null;
  isConfirmed: boolean;
  confidence: number; // 0-100
  verificationMethod: 'evidence' | 'testimony' | 'logic' | 'timeline';
  correctAnswer?: string; // 정답 (검증용)
  partialCredit: number; // 부분 점수 (0-1)
  feedback?: string; // 피드백 메시지
}

// 추론 검증 키워드
export interface DeductionKeywords {
  who: string[]; // 범인 이름 키워드
  why: string[]; // 동기 키워드
  how: string[]; // 방법 키워드
  when: string[]; // 시간 키워드
  where: string[]; // 장소 키워드
}

export interface Case {
  id: string;
  title: string;
  subtitle: string;
  type: CaseType;
  difficulty: Difficulty;
  estimatedTime: number; // 예상 플레이 시간 (분)
  summary: string;
  detailedSummary: string;
  introduction: string[];
  prologue: string[]; // 프롤로그 (분위기 조성)
  characters: Character[];
  evidence: Evidence[];
  locations: Location[];
  timeline: TimelineEvent[];
  culpritId: string;
  victimId: string | null;
  motive: string;
  motiveDetail: string;
  method: string;
  methodDetail: string;
  crimeTime: string; // 범행 시각
  crimeLocation: string; // 범행 장소
  deductionKeywords: DeductionKeywords; // 추론 검증용 키워드
  solution: {
    explanation: string;
    detailedExplanation: string[];
    keyEvidence: string[];
    timeline: string[];
    howToSolve: string[]; // 해결 힌트
    commonMistakes: string[]; // 흔한 실수
  };
  knoxValidation: KnoxValidation;
  qualityScore: number; // 케이스 품질 점수
  version: string;
  createdAt: number;
}

export interface GameState {
  currentCase: Case | null;
  phase: GamePhase;
  currentLocation: string | null;
  currentCharacter: string | null;
  collectedEvidence: string[];
  analyzedEvidence: string[];
  examinedObjects: string[];
  interviewedCharacters: string[];
  revealedSecrets: string[];
  revealedTimeline: string[];
  deductions: Deduction[];
  confirmedFacts: string[];
  playerNotes: PlayerNote[];
  hintsUsed: number;
  hintsRemaining: number;
  score: number;
  maxScore: number;
  startTime: number;
  playTime: number;
  isComplete: boolean;
  accusationResult: AccusationResult | null;
  achievements: string[];
  statistics: GameStatistics;
}

export interface PlayerNote {
  id: string;
  content: string;
  linkedEvidence: string[];
  linkedCharacters: string[];
  timestamp: number;
}

export interface AccusationResult {
  isCorrect: boolean;
  accusedId: string;
  actualCulpritId: string;
  evidenceScore: number;
  deductionScore: number;
  timeBonus: number;
  totalScore: number;
  rank: 'S' | 'A' | 'B' | 'C' | 'D' | 'F';
  feedback: string[];
  missedClues: string[];
  correctDeductions: number;
  incorrectDeductions: number;
}

export interface GameStatistics {
  evidenceFound: number;
  totalEvidence: number;
  charactersInterviewed: number;
  totalCharacters: number;
  locationsSearched: number;
  totalLocations: number;
  deductionsMade: number;
  correctDeductions: number;
  hintsUsed: number;
  timeSpent: number;
}

export interface DialogueState {
  characterId: string;
  trustLevel: number; // 0-100
  currentTopic: string | null;
  messages: DialogueMessage[];
  availableTopics: string[];
  unlockedTopics: string[];
}

export interface DialogueMessage {
  id: string;
  speaker: 'player' | 'character';
  text: string;
  isImportant: boolean;
  revealsEvidence?: string;
  revealsSecret?: string;
  timestamp: number;
}

// 난이도 설정 타입
export interface DifficultySettings {
  suspectCount: { min: number; max: number };
  evidenceCount: { min: number; max: number };
  criticalEvidenceCount: number;
  redHerringCount: number;
  hintCount: number;
  timeLimit: number | null;
  scoreMultiplier: number;
  showContradictions: boolean;
  showImportantDialogue: boolean;
  alibiHoleVisibility: 'obvious' | 'subtle' | 'hidden';
}

// 케이스 검증 결과
export interface CaseValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  score: number;
  knoxValidation: KnoxValidation;
  solvability: 'guaranteed' | 'possible' | 'difficult' | 'impossible';
}

export interface ValidationError {
  code: string;
  message: string;
  location: string;
  severity: 'critical' | 'high' | 'medium';
}

export interface ValidationWarning {
  code: string;
  message: string;
  suggestion: string;
}
