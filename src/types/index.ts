// ========================================
// DEDUCTIO v3.0 - Real Deduction Game Types
// ========================================

export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';
export type CaseType = 'theft' | 'vandalism' | 'mystery' | 'disappearance' | 'fraud' | 'blackmail';
export type GamePhase = 'intro' | 'investigation' | 'interrogation' | 'deduction' | 'accusation' | 'reveal';
export type EvidenceType = 'physical' | 'testimony' | 'document' | 'digital' | 'forensic';
export type RelationshipType = 'friend' | 'rival' | 'family' | 'lover' | 'colleague' | 'enemy' | 'stranger';

// Logic Grid cell state for elimination
export type CellState = 'unknown' | 'possible' | 'eliminated' | 'confirmed';

// Deduction tool tabs
export type DeductionTab = 'evidence-board' | 'logic-grid' | 'timeline' | 'hypothesis' | 'notes';

// Knox 10 Rules validation
export interface KnoxValidation {
  rule1_culpritEarlyAppearance: boolean;
  rule2_noSupernatural: boolean;
  rule3_noSecretPassages: boolean;
  rule4_noUnknownPoison: boolean;
  rule5_noAsianCharacter: boolean;
  rule6_noAccident: boolean;
  rule7_detectiveNotCulprit: boolean;
  rule8_allCluesShown: boolean;
  rule9_sidekickLimited: boolean;
  rule10_noTwinUnannounced: boolean;
  isValid: boolean;
  failedRules: string[];
  score: number;
}

export interface Relationship {
  targetId: string;
  type: RelationshipType;
  intensity: 1 | 2 | 3 | 4 | 5;
  description: string;
  isPublic: boolean;
  secretReason?: string;
}

export interface Motive {
  type: 'revenge' | 'greed' | 'jealousy' | 'fear' | 'protection' | 'ideology' | 'accident';
  description: string;
  strength: 1 | 2 | 3;
  relatedEvidence: string[];
  isRevealed: boolean;
}

export interface Alibi {
  location: string;
  startTime: string;
  endTime: string;
  activity: string;
  witnesses: string[];
  physicalEvidence: string[];
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
  appearance: string;
  background: string;
  alibi: Alibi;
  motive: Motive | null;
  relationships: Relationship[];
  secrets: Secret[];
  isVictim: boolean;
  isCulprit: boolean;
  isWitness: boolean;
  suspicionLevel: number;
  dialogues: Record<string, DialogueOption[]>;
  behaviorPatterns: string[];
  nervousTriggers: string[];
  firstAppearanceTime: string;
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
  connectedToCase: boolean;
  revealMethod: 'evidence' | 'interrogation' | 'deduction' | 'automatic';
}

export interface Evidence {
  id: string;
  name: string;
  type: EvidenceType;
  description: string;
  detailedDescription: string;
  location: string;
  foundAt: string;
  linkedCharacters: string[];
  contradicts?: string[];
  supports?: string[];
  isRedHerring: boolean;
  redHerringReason?: string;
  isCollected: boolean;
  isCritical: boolean;
  criticalReason?: string;
  discoveryDifficulty: 1 | 2 | 3;
  analysisRequired: boolean;
  analysisResult?: string;
  timestamp?: string;
  weight: number;
  // v3: Logic grid attributes
  category?: string;
  implicates?: string[];   // character IDs this evidence points to
  exonerates?: string[];   // character IDs this evidence clears
}

export interface Location {
  id: string;
  name: string;
  description: string;
  atmosphere: string;
  objects: InteractiveObject[];
  connectedTo: string[];
  accessRestriction?: string;
  isSearched: boolean;
  searchProgress: number;
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
  time: string;
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

// v3: Logic Grid system (Murdle-style)
export interface LogicGridState {
  // rows = suspects, cols = attributes (categories)
  categories: LogicCategory[];
  grid: Record<string, Record<string, CellState>>; // suspectId -> categoryValue -> state
}

export interface LogicCategory {
  id: string;
  name: string;
  values: string[];
  icon: string;
}

// v3: Evidence Board connections
export interface EvidenceBoardState {
  connections: EvidenceConnection[];
  positions: Record<string, { x: number; y: number }>;
  pinnedEvidence: string[];
}

export interface EvidenceConnection {
  id: string;
  fromId: string;
  toId: string;
  type: 'supports' | 'contradicts' | 'related';
  label?: string;
}

// v3: Hypothesis system
export interface Hypothesis {
  id: string;
  suspectId: string;
  suspectName: string;
  motive: { text: string; evidenceIds: string[]; score: number };
  opportunity: { text: string; evidenceIds: string[]; score: number };
  means: { text: string; evidenceIds: string[]; score: number };
  totalScore: number;
  isLocked: boolean;
}

// v3: Contradiction system (Ace Attorney style)
export interface Contradiction {
  id: string;
  statementId: string;    // the statement/testimony
  evidenceId: string;     // the contradicting evidence
  characterId: string;    // who made the statement
  description: string;
  isFound: boolean;
  points: number;
}

// v3: Player deductions for the new system
export interface Deduction {
  id: string;
  type: 'who' | 'why' | 'how' | 'when' | 'where' | 'connection';
  statement: string;
  supportingEvidence: string[];
  contradictingEvidence: string[];
  isCorrect: boolean | null;
  isConfirmed: boolean;
  confidence: number;
  verificationMethod: 'evidence' | 'testimony' | 'logic' | 'timeline';
  correctAnswer?: string;
  partialCredit: number;
  feedback?: string;
}

export interface DeductionKeywords {
  who: string[];
  why: string[];
  how: string[];
  when: string[];
  where: string[];
}

export interface Case {
  id: string;
  title: string;
  subtitle: string;
  type: CaseType;
  difficulty: Difficulty;
  estimatedTime: number;
  summary: string;
  detailedSummary: string;
  introduction: string[];
  prologue: string[];
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
  crimeTime: string;
  crimeLocation: string;
  deductionKeywords: DeductionKeywords;
  // v3: Contradiction data built into the case
  contradictions: CaseContradiction[];
  // v3: Logic grid categories
  logicCategories: LogicCategory[];
  solution: {
    explanation: string;
    detailedExplanation: string[];
    keyEvidence: string[];
    timeline: string[];
    howToSolve: string[];
    commonMistakes: string[];
  };
  knoxValidation: KnoxValidation;
  qualityScore: number;
  version: string;
  createdAt: number;
}

export interface CaseContradiction {
  id: string;
  characterId: string;
  statement: string;
  contradictingEvidenceId: string;
  explanation: string;
  isCritical: boolean;
}

export interface GameState {
  currentCase: Case | null;
  phase: GamePhase;
  currentLocation: string | null;
  currentCharacter: string | null;
  activeDeductionTab: DeductionTab;
  collectedEvidence: string[];
  analyzedEvidence: string[];
  examinedObjects: string[];
  interviewedCharacters: string[];
  revealedSecrets: string[];
  revealedTimeline: string[];
  deductions: Deduction[];
  confirmedFacts: string[];
  playerNotes: PlayerNote[];
  // v3: New deduction tools state
  logicGrid: Record<string, Record<string, CellState>>;
  evidenceBoard: EvidenceBoardState;
  hypotheses: Hypothesis[];
  foundContradictions: string[];
  contradictionCombo: number;
  // Scoring
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
  contradictionScore: number;
  logicGridScore: number;
  timeBonus: number;
  totalScore: number;
  rank: 'S' | 'A' | 'B' | 'C' | 'D' | 'F';
  stars: 0 | 1 | 2 | 3;
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
  contradictionsFound: number;
  totalContradictions: number;
  logicGridProgress: number;
  hintsUsed: number;
  timeSpent: number;
}

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

export interface DialogueState {
  characterId: string;
  trustLevel: number;
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
