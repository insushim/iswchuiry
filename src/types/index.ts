// ========================================
// 핵심 타입 정의
// ========================================

export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';
export type CaseType = 'theft' | 'vandalism' | 'mystery' | 'disappearance';
export type GamePhase = 'intro' | 'investigation' | 'interrogation' | 'deduction' | 'accusation' | 'reveal';
export type EvidenceType = 'physical' | 'testimony' | 'document';

export interface Character {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female';
  occupation: string;
  personality: string;
  description: string;
  alibi: {
    location: string;
    time: string;
    activity: string;
    hasHole: boolean;
    holeDetail?: string;
  };
  motive: string | null;
  secrets: Secret[];
  isVictim: boolean;
  isCulprit: boolean;
  dialogues: Record<string, string[]>;
}

export interface Secret {
  id: string;
  content: string;
  isRevealed: boolean;
  requiredEvidence: string[];
}

export interface Evidence {
  id: string;
  name: string;
  type: EvidenceType;
  description: string;
  location: string;
  linkedCharacters: string[];
  isRedHerring: boolean;
  isCollected: boolean;
  isCritical: boolean;
}

export interface Location {
  id: string;
  name: string;
  description: string;
  objects: InteractiveObject[];
  connectedTo: string[];
}

export interface InteractiveObject {
  id: string;
  name: string;
  description: string;
  canExamine: boolean;
  examinationResult: string;
  containsEvidence: string | null;
  isExamined: boolean;
}

export interface TimelineEvent {
  id: string;
  time: string;
  description: string;
  participants: string[];
  location: string;
  isKeyEvent: boolean;
  isRevealed: boolean;
}

export interface Deduction {
  id: string;
  type: 'who' | 'why' | 'how' | 'when' | 'where';
  statement: string;
  supportingEvidence: string[];
  isCorrect: boolean | null;
  isConfirmed: boolean;
}

export interface Case {
  id: string;
  title: string;
  type: CaseType;
  difficulty: Difficulty;
  summary: string;
  introduction: string[];
  characters: Character[];
  evidence: Evidence[];
  locations: Location[];
  timeline: TimelineEvent[];
  culpritId: string;
  victimId: string | null;
  motive: string;
  method: string;
  solution: {
    explanation: string;
    keyEvidence: string[];
    timeline: string[];
  };
}

export interface GameState {
  currentCase: Case | null;
  phase: GamePhase;
  currentLocation: string | null;
  currentCharacter: string | null;
  collectedEvidence: string[];
  examinedObjects: string[];
  interviewedCharacters: string[];
  revealedSecrets: string[];
  deductions: Deduction[];
  confirmedFacts: string[];
  hintsUsed: number;
  hintsRemaining: number;
  score: number;
  startTime: number;
  playTime: number;
  isComplete: boolean;
  accusationResult: {
    isCorrect: boolean;
    accusedId: string;
    score: number;
  } | null;
}

export interface DialogueState {
  characterId: string;
  currentTopic: string | null;
  messages: DialogueMessage[];
}

export interface DialogueMessage {
  speaker: 'player' | 'character';
  text: string;
  isImportant: boolean;
}
