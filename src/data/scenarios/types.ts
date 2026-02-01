// ========================================
// 시나리오 타입 정의
// ========================================

export interface ScenarioCharacter {
  id: string;
  name: string;
  role: 'culprit' | 'victim' | 'witness' | 'suspect' | 'bystander';
  age: number;
  gender: 'male' | 'female';
  occupation: string;
  personality: string;
  appearance: string;
  background: string;
  alibi: {
    location: string;
    time: string;
    activity: string;
    witnesses: string[];
    hasHole: boolean;
    holeDetail?: string;
  };
  motive?: {
    type: 'revenge' | 'greed' | 'jealousy' | 'fear' | 'protection' | 'ideology' | 'accident';
    description: string;
    strength: 1 | 2 | 3;
  };
  relationships: {
    targetId: string;
    type: string;
    description: string;
    isSecret?: boolean;
  }[];
  secrets: {
    id: string;
    content: string;
    importance: 'critical' | 'major' | 'minor';
    revealCondition: string;
  }[];
  dialogues: {
    topic: string;
    lines: string[];
    revealsInfo?: string;
    requiresEvidence?: string[];
  }[];
  nervousTriggers: string[];
}

export interface ScenarioEvidence {
  id: string;
  name: string;
  type: 'physical' | 'testimony' | 'document' | 'digital' | 'forensic';
  description: string;
  detailedDescription: string;
  location: string;
  foundAt: string;
  linkedCharacters: string[];
  isCritical: boolean;
  isRedHerring: boolean;
  redHerringReason?: string;
  discoveryDifficulty: 1 | 2 | 3;
  analysisRequired: boolean;
  analysisResult?: string;
  timestamp?: string;
  contradicts?: string[];
  supports?: string[];
}

export interface ScenarioLocation {
  id: string;
  name: string;
  description: string;
  atmosphere: string;
  objects: {
    id: string;
    name: string;
    description: string;
    examinationResult: string;
    containsEvidence?: string;
    isLocked?: boolean;
    unlockMethod?: string;
  }[];
  hiddenAreas?: {
    id: string;
    name: string;
    description: string;
    discoveryCondition: string;
    containsEvidence: string[];
  }[];
  connectedTo: string[];
}

export interface ScenarioTimeline {
  time: string;
  event: string;
  participants: string[];
  location: string;
  importance: 'critical' | 'major' | 'minor';
  isRevealed: boolean;
}

export interface Scenario {
  id: string;
  title: string;
  subtitle: string;
  type: 'theft' | 'vandalism' | 'mystery' | 'disappearance' | 'fraud' | 'blackmail' | 'special';
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  estimatedTime: number; // 분

  // 스토리
  prologue: string[];
  introduction: string[];
  setting: string;

  // 사건 핵심
  crimeTime: string;
  crimeLocation: string;
  culpritId: string;
  victimId?: string;
  motive: string;
  motiveDetail: string;
  method: string;
  methodDetail: string;

  // 게임 데이터
  characters: ScenarioCharacter[];
  evidence: ScenarioEvidence[];
  locations: ScenarioLocation[];
  timeline: ScenarioTimeline[];

  // 해답
  solution: {
    summary: string;
    detailedExplanation: string[];
    keyEvidence: string[];
    howToSolve: string[];
    commonMistakes: string[];
  };

  // 추론 검증 키워드
  deductionKeywords: {
    who: string[];
    why: string[];
    how: string[];
    when: string[];
    where: string[];
  };

  // 메타데이터
  tags: string[];
  author: string;
  version: string;
}
