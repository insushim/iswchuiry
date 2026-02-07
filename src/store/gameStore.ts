import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { GameState, Deduction, GamePhase } from '../types';
import { CaseGenerator } from '../core/CaseGenerator';
import { generatePuzzleChain } from '../core/PuzzleGenerator';
import { generateId } from '../utils/helpers';
import { DIFFICULTY_SETTINGS, DEDUCTION_SYNONYMS } from '../data/gameData';
import { PuzzleProgress } from '../types/puzzles';

// 점수 상수
const SCORE = {
  EVIDENCE_CRITICAL: 50,
  EVIDENCE_NORMAL: 20,
  SECRET_REVEAL: 30,
  DEDUCTION_CORRECT: 40,
  ACCUSATION_BASE: 500,
  HINT_BONUS: 20,
  TIME_FAST_BONUS: 200,
  TIME_MEDIUM_BONUS: 100,
  TIME_FAST_THRESHOLD: 10,
  TIME_MEDIUM_THRESHOLD: 20,
  EVIDENCE_RATE_THRESHOLD: 0.8,
  EVIDENCE_RATE_BONUS: 100,
  RANK_S: 1200,
  RANK_A: 900,
  RANK_B: 600,
  RANK_C: 400,
  RANK_D: 200,
} as const;

interface GameStore extends GameState {
  // 게임 라이프사이클
  startNewGame: (difficulty: 'easy' | 'medium' | 'hard' | 'expert', seed?: number) => void;
  resetGame: () => void;

  // 페이즈 관리
  setPhase: (phase: GamePhase) => void;

  // 조사
  setLocation: (locationId: string) => void;
  examineObject: (objectId: string) => { found: boolean; evidenceId?: string; message: string };
  collectEvidence: (evidenceId: string) => void;

  // 심문
  setCharacter: (characterId: string | null) => void;
  getDialogue: (topic: string) => string[];
  revealSecret: (characterId: string, secretId: string) => boolean;

  // 추론
  addDeduction: (type: Deduction['type'], statement: string, evidenceIds: string[]) => void;
  confirmDeductions: () => { correct: number; total: number };

  // 고발
  makeAccusation: (suspectId: string) => { isCorrect: boolean; score: number };

  // 힌트
  useHint: () => string | null;

  // 퍼즐 체인
  initPuzzleChain: () => void;
  solvePuzzle: (puzzleId: string, score: number) => void;
  advancePuzzle: () => void;

  // 유틸
  updatePlayTime: () => void;
}

const initialState: GameState = {
  currentCase: null,
  phase: 'intro',
  currentLocation: null,
  currentCharacter: null,
  collectedEvidence: [],
  analyzedEvidence: [],
  examinedObjects: [],
  interviewedCharacters: [],
  revealedSecrets: [],
  revealedTimeline: [],
  deductions: [],
  confirmedFacts: [],
  playerNotes: [],
  hintsUsed: 0,
  hintsRemaining: 5,
  score: 0,
  maxScore: 1000,
  startTime: 0,
  playTime: 0,
  isComplete: false,
  accusationResult: null,
  achievements: [],
  activeDeductionTab: 'evidence-board',
  logicGrid: {},
  evidenceBoard: { connections: [], positions: {}, pinnedEvidence: [] },
  hypotheses: [],
  foundContradictions: [],
  contradictionCombo: 0,
  puzzleProgress: [],
  currentPuzzleIndex: 0,
  statistics: {
    evidenceFound: 0,
    totalEvidence: 0,
    charactersInterviewed: 0,
    totalCharacters: 0,
    locationsSearched: 0,
    totalLocations: 0,
    deductionsMade: 0,
    correctDeductions: 0,
    contradictionsFound: 0,
    totalContradictions: 0,
    logicGridProgress: 0,
    hintsUsed: 0,
    timeSpent: 0
  }
};

export const useGameStore = create<GameStore>()(
  immer((set, get) => ({
    ...initialState,

    startNewGame: (difficulty, seed) => {
      const generator = new CaseGenerator(difficulty, undefined, seed);
      const newCase = generator.generate();
      const settings = DIFFICULTY_SETTINGS[difficulty];

      // 퍼즐 체인 생성 (같은 시드 기반)
      const puzzleChain = generatePuzzleChain(newCase, difficulty, seed);
      newCase.puzzleChain = puzzleChain;

      const puzzleProgress = puzzleChain.map(p => ({
        puzzleId: p.id,
        isCompleted: false,
        isUnlocked: false,
        attempts: 0,
        hintsUsed: 0,
        score: 0
      }));
      if (puzzleProgress.length > 0) {
        puzzleProgress[0].isUnlocked = true;
      }

      set((state) => {
        // 개별 속성 초기화 (immer 안전)
        state.currentCase = newCase;
        state.phase = 'intro';
        state.currentLocation = newCase.locations[0]?.id || null;
        state.currentCharacter = null;
        state.collectedEvidence = [];
        state.analyzedEvidence = [];
        state.examinedObjects = [];
        state.interviewedCharacters = [];
        state.revealedSecrets = [];
        state.revealedTimeline = [];
        state.deductions = [];
        state.confirmedFacts = [];
        state.playerNotes = [];
        state.hintsUsed = 0;
        state.hintsRemaining = settings.hintCount;
        state.score = 0;
        state.maxScore = 1000;
        state.startTime = Date.now();
        state.playTime = 0;
        state.isComplete = false;
        state.accusationResult = null;
        state.achievements = [];
        state.activeDeductionTab = 'evidence-board';
        state.logicGrid = {};
        state.evidenceBoard = { connections: [], positions: {}, pinnedEvidence: [] };
        state.hypotheses = [];
        state.foundContradictions = [];
        state.contradictionCombo = 0;
        state.puzzleProgress = puzzleProgress;
        state.currentPuzzleIndex = 0;
        state.statistics = {
          evidenceFound: 0,
          totalEvidence: 0,
          charactersInterviewed: 0,
          totalCharacters: 0,
          locationsSearched: 0,
          totalLocations: 0,
          deductionsMade: 0,
          correctDeductions: 0,
          contradictionsFound: 0,
          totalContradictions: 0,
          logicGridProgress: 0,
          hintsUsed: 0,
          timeSpent: 0
        };
      });
    },

    resetGame: () => {
      set((state) => {
        state.currentCase = null;
        state.phase = 'intro';
        state.currentLocation = null;
        state.currentCharacter = null;
        state.collectedEvidence = [];
        state.analyzedEvidence = [];
        state.examinedObjects = [];
        state.interviewedCharacters = [];
        state.revealedSecrets = [];
        state.revealedTimeline = [];
        state.deductions = [];
        state.confirmedFacts = [];
        state.playerNotes = [];
        state.hintsUsed = 0;
        state.hintsRemaining = 5;
        state.score = 0;
        state.maxScore = 1000;
        state.startTime = 0;
        state.playTime = 0;
        state.isComplete = false;
        state.accusationResult = null;
        state.achievements = [];
        state.activeDeductionTab = 'evidence-board';
        state.logicGrid = {};
        state.evidenceBoard = { connections: [], positions: {}, pinnedEvidence: [] };
        state.hypotheses = [];
        state.foundContradictions = [];
        state.contradictionCombo = 0;
        state.puzzleProgress = [];
        state.currentPuzzleIndex = 0;
        state.statistics = {
          evidenceFound: 0, totalEvidence: 0,
          charactersInterviewed: 0, totalCharacters: 0,
          locationsSearched: 0, totalLocations: 0,
          deductionsMade: 0, correctDeductions: 0,
          contradictionsFound: 0, totalContradictions: 0,
          logicGridProgress: 0, hintsUsed: 0, timeSpent: 0
        };
      });
    },

    setPhase: (phase) => {
      set((state) => {
        state.phase = phase;
      });
    },

    setLocation: (locationId) => {
      set((state) => {
        state.currentLocation = locationId;
      });
    },

    examineObject: (objectId) => {
      const { currentCase, currentLocation, collectedEvidence } = get();

      if (!currentCase || !currentLocation) {
        return { found: false, message: '오류가 발생했습니다.' };
      }

      const location = currentCase.locations.find(l => l.id === currentLocation);
      if (!location) {
        return { found: false, message: '장소를 찾을 수 없습니다.' };
      }

      const object = location.objects.find(o => o.id === objectId);
      if (!object) {
        return { found: false, message: '물건을 찾을 수 없습니다.' };
      }

      set((state) => {
        if (!state.examinedObjects.includes(objectId)) {
          state.examinedObjects.push(objectId);
        }
      });

      if (object.containsEvidence && !collectedEvidence.includes(object.containsEvidence)) {
        const evidence = currentCase.evidence.find(e => e.id === object.containsEvidence);
        if (evidence) {
          set((state) => {
            state.collectedEvidence.push(evidence.id);
            state.score += evidence.isCritical ? SCORE.EVIDENCE_CRITICAL : SCORE.EVIDENCE_NORMAL;
          });
          return {
            found: true,
            evidenceId: evidence.id,
            message: `${evidence.name}을(를) 발견했습니다! "${evidence.description}"`
          };
        }
      }

      return { found: false, message: object.examinationResult };
    },

    collectEvidence: (evidenceId) => {
      set((state) => {
        if (!state.collectedEvidence.includes(evidenceId)) {
          state.collectedEvidence.push(evidenceId);
        }
      });
    },

    setCharacter: (characterId) => {
      set((state) => {
        state.currentCharacter = characterId;
        if (characterId && !state.interviewedCharacters.includes(characterId)) {
          state.interviewedCharacters.push(characterId);
        }
      });
    },

    getDialogue: (topic) => {
      const { currentCase, currentCharacter } = get();
      if (!currentCase || !currentCharacter) return ['...'];

      const character = currentCase.characters.find(c => c.id === currentCharacter);
      if (!character) return ['...'];

      const dialogueOptions = character.dialogues[topic];
      if (!dialogueOptions) return ['그건 잘 모르겠어요.'];

      // DialogueOption[] 또는 string[]을 string[]으로 변환
      return dialogueOptions.map(d => typeof d === 'string' ? d : d.response);
    },

    revealSecret: (characterId, secretId) => {
      const { currentCase, collectedEvidence } = get();
      if (!currentCase) return false;

      const character = currentCase.characters.find(c => c.id === characterId);
      if (!character) return false;

      const secret = character.secrets.find(s => s.id === secretId);
      if (!secret || secret.isRevealed) return false;

      // 필요한 증거가 있는지 확인
      const hasRequiredEvidence = secret.requiredEvidence.every(
        evId => collectedEvidence.includes(evId)
      );

      if (hasRequiredEvidence || secret.requiredEvidence.length === 0) {
        set((state) => {
          const char = state.currentCase?.characters.find(c => c.id === characterId);
          const sec = char?.secrets.find(s => s.id === secretId);
          if (sec) {
            sec.isRevealed = true;
            state.revealedSecrets.push(secretId);
            state.score += SCORE.SECRET_REVEAL;
          }
        });
        return true;
      }

      return false;
    },

    addDeduction: (type, statement, evidenceIds) => {
      set((state) => {
        state.deductions.push({
          id: generateId(),
          type,
          statement,
          supportingEvidence: evidenceIds,
          contradictingEvidence: [],
          isCorrect: null,
          isConfirmed: false,
          confidence: 0,
          verificationMethod: 'evidence',
          partialCredit: 0
        });
        state.statistics.deductionsMade++;
      });
    },

    confirmDeductions: () => {
      const { currentCase, deductions, collectedEvidence } = get();
      if (!currentCase) return { correct: 0, total: 0 };

      const pendingDeductions = deductions.filter(d => !d.isConfirmed).slice(0, 3);
      let correctCount = 0;

      // 키워드 매칭 함수
      const matchesKeywords = (statement: string, keywords: string[]): boolean => {
        const normalizedStatement = statement.toLowerCase().replace(/\s+/g, '');
        return keywords.some(kw => normalizedStatement.includes(kw.toLowerCase().replace(/\s+/g, '')));
      };

      // 부분 점수 계산 함수
      const calculatePartialCredit = (statement: string, keywords: string[]): number => {
        const matchCount = keywords.filter(kw =>
          statement.toLowerCase().includes(kw.toLowerCase())
        ).length;
        return Math.min(matchCount / Math.max(keywords.length, 1), 1);
      };

      set((state) => {
        const caseData = state.currentCase;
        if (!caseData) return;

        const culprit = caseData.characters.find(c => c.id === caseData.culpritId);
        const keywords = caseData.deductionKeywords;

        for (const deduction of pendingDeductions) {
          const stateDeduction = state.deductions.find(d => d.id === deduction.id);
          if (!stateDeduction) continue;

          let isCorrect = false;
          let partialCredit = 0;
          let feedback = '';

          const statement = deduction.statement.toLowerCase();

          switch (deduction.type) {
            case 'who': {
              // 범인 이름 키워드 매칭
              const whoKeywords = keywords.who || [];
              const culpritName = culprit?.name || '';
              const allWhoKeywords = [...whoKeywords, culpritName];

              isCorrect = matchesKeywords(deduction.statement, allWhoKeywords);
              partialCredit = isCorrect ? 1 : calculatePartialCredit(deduction.statement, allWhoKeywords);

              if (isCorrect) {
                feedback = '정확합니다! 범인을 올바르게 지목했습니다.';
              } else {
                feedback = '범인이 아닌 것 같습니다. 증거를 다시 검토해보세요.';
              }
              break;
            }

            case 'why': {
              // 동기 키워드 매칭
              const whyKeywords = keywords.why || [];
              const motiveType = culprit?.motive?.type;
              const synonyms = motiveType ? (DEDUCTION_SYNONYMS.motive[motiveType as keyof typeof DEDUCTION_SYNONYMS.motive] || []) : [];
              const allWhyKeywords = [...whyKeywords, ...synonyms, caseData.motive];

              isCorrect = matchesKeywords(deduction.statement, allWhyKeywords);
              partialCredit = isCorrect ? 1 : calculatePartialCredit(deduction.statement, allWhyKeywords);

              if (isCorrect) {
                feedback = '정확합니다! 동기를 올바르게 파악했습니다.';
              } else {
                // 부분 점수 안내
                if (partialCredit > 0.3) {
                  feedback = '방향은 맞지만, 정확한 동기는 아닙니다.';
                } else {
                  feedback = '동기가 틀린 것 같습니다. 인물 관계를 다시 살펴보세요.';
                }
              }
              break;
            }

            case 'how': {
              // 방법 키워드 매칭
              const howKeywords = keywords.how || [];
              const methodKeywords = [...howKeywords, caseData.method];

              isCorrect = matchesKeywords(deduction.statement, methodKeywords);
              partialCredit = isCorrect ? 1 : calculatePartialCredit(deduction.statement, methodKeywords);

              if (isCorrect) {
                feedback = '정확합니다! 범행 방법을 올바르게 파악했습니다.';
              } else {
                feedback = '범행 방법이 다른 것 같습니다. 물리적 증거를 확인해보세요.';
              }
              break;
            }

            case 'when': {
              // 시간 키워드 매칭
              const whenKeywords = keywords.when || [];
              const timeKeywords = [...whenKeywords, caseData.crimeTime];

              isCorrect = matchesKeywords(deduction.statement, timeKeywords);
              partialCredit = isCorrect ? 1 : calculatePartialCredit(deduction.statement, timeKeywords);

              if (isCorrect) {
                feedback = '정확합니다! 범행 시각을 올바르게 추정했습니다.';
              } else {
                feedback = '시간대가 다른 것 같습니다. 알리바이와 타임라인을 확인해보세요.';
              }
              break;
            }

            case 'where': {
              // 장소 키워드 매칭
              const whereKeywords = keywords.where || [];
              const locationKeywords = [...whereKeywords, caseData.crimeLocation];

              isCorrect = matchesKeywords(deduction.statement, locationKeywords);
              partialCredit = isCorrect ? 1 : calculatePartialCredit(deduction.statement, locationKeywords);

              if (isCorrect) {
                feedback = '정확합니다! 범행 장소를 올바르게 파악했습니다.';
              } else {
                feedback = '장소가 다른 것 같습니다. 증거가 발견된 위치를 확인해보세요.';
              }
              break;
            }

            case 'connection': {
              // 연결 추론 - 증거 간 연결 검증
              const supportingEvidence = deduction.supportingEvidence || [];
              const hasValidEvidence = supportingEvidence.length >= 2 &&
                supportingEvidence.every(id => collectedEvidence.includes(id));

              // 연결된 증거들이 실제로 관련이 있는지 확인
              const relatedEvidence = caseData.evidence.filter(e =>
                supportingEvidence.includes(e.id) &&
                (e.linkedCharacters.includes(caseData.culpritId) || e.isCritical)
              );

              isCorrect = hasValidEvidence && relatedEvidence.length >= 1;
              partialCredit = relatedEvidence.length / Math.max(supportingEvidence.length, 1);

              if (isCorrect) {
                feedback = '좋은 연결입니다! 증거들의 관계를 올바르게 파악했습니다.';
              } else {
                feedback = '증거 간의 연결이 약합니다. 더 강력한 근거가 필요합니다.';
              }
              break;
            }
          }

          // 결과 업데이트
          stateDeduction.isCorrect = isCorrect;
          stateDeduction.isConfirmed = true;
          stateDeduction.partialCredit = partialCredit;
          stateDeduction.confidence = isCorrect ? 100 : Math.floor(partialCredit * 100);
          stateDeduction.feedback = feedback;

          if (isCorrect) {
            correctCount++;
            state.confirmedFacts.push(deduction.statement);
            state.score += SCORE.DEDUCTION_CORRECT;
            state.statistics.correctDeductions++;
          } else if (partialCredit > 0.5) {
            // 부분 점수
            state.score += Math.floor(20 * partialCredit);
          }
        }
      });

      return { correct: correctCount, total: pendingDeductions.length };
    },

    makeAccusation: (suspectId) => {
      const { currentCase, startTime, collectedEvidence } = get();

      if (!currentCase) {
        return { isCorrect: false, score: 0 };
      }

      const isCorrect = suspectId === currentCase.culpritId;
      let score = 0;

      if (isCorrect) {
        score = SCORE.ACCUSATION_BASE;

        // 난이도 보너스
        const difficultyMultiplier = {
          easy: 1,
          medium: 1.5,
          hard: 2,
          expert: 3
        }[currentCase.difficulty];
        score *= difficultyMultiplier;

        // 힌트 미사용 보너스
        const hintsRemaining = get().hintsRemaining;
        score += hintsRemaining * SCORE.HINT_BONUS;

        // 시간 보너스
        const elapsedMinutes = (Date.now() - startTime) / 60000;
        if (elapsedMinutes < SCORE.TIME_FAST_THRESHOLD) score += SCORE.TIME_FAST_BONUS;
        else if (elapsedMinutes < SCORE.TIME_MEDIUM_THRESHOLD) score += SCORE.TIME_MEDIUM_BONUS;

        // 증거 수집률 보너스
        const collectionRate = collectedEvidence.length / Math.max(currentCase.evidence.length, 1);
        if (collectionRate > SCORE.EVIDENCE_RATE_THRESHOLD) score += SCORE.EVIDENCE_RATE_BONUS;
      }

      const deductionStats = get().deductions.reduce(
        (acc, d) => {
          if (d.isCorrect === true) acc.correct++;
          if (d.isCorrect === false) acc.incorrect++;
          return acc;
        },
        { correct: 0, incorrect: 0 }
      );

      const elapsedMinutes = (Date.now() - startTime) / 60000;
      const timeBonus = elapsedMinutes < 10 ? 200 : elapsedMinutes < 20 ? 100 : 0;
      const evidenceScore = Math.floor((collectedEvidence.length / Math.max(currentCase.evidence.length, 1)) * 300);
      const deductionScore = deductionStats.correct * 40;

      const rank = score >= SCORE.RANK_S ? 'S' : score >= SCORE.RANK_A ? 'A' : score >= SCORE.RANK_B ? 'B' : score >= SCORE.RANK_C ? 'C' : score >= SCORE.RANK_D ? 'D' : 'F';

      set((state) => {
        state.isComplete = true;
        state.phase = 'reveal';
        state.accusationResult = {
          isCorrect,
          accusedId: suspectId,
          actualCulpritId: currentCase.culpritId,
          evidenceScore,
          deductionScore,
          contradictionScore: 0,
          logicGridScore: 0,
          timeBonus,
          totalScore: Math.floor(score),
          rank,
          stars: (score >= SCORE.RANK_S ? 3 : score >= SCORE.RANK_B ? 2 : score >= SCORE.RANK_D ? 1 : 0) as 0 | 1 | 2 | 3,
          feedback: isCorrect
            ? ['정확한 추리였습니다! 모든 증거가 범인을 가리키고 있었습니다.']
            : ['안타깝게도 틀렸습니다. 증거를 다시 살펴보세요.'],
          missedClues: currentCase.evidence
            .filter(e => e.isCritical && !collectedEvidence.includes(e.id))
            .map(e => e.name),
          correctDeductions: deductionStats.correct,
          incorrectDeductions: deductionStats.incorrect
        };
        state.score += Math.floor(score);
        state.statistics.timeSpent = Math.floor(elapsedMinutes * 60);
      });

      return { isCorrect, score: Math.floor(score) };
    },

    useHint: () => {
      const { currentCase, hintsRemaining, collectedEvidence, interviewedCharacters } = get();

      if (hintsRemaining <= 0 || !currentCase) return null;

      set((state) => {
        state.hintsUsed++;
        state.hintsRemaining--;
      });

      // 힌트 생성 로직
      const uncollectedEvidence = currentCase.evidence.filter(
        e => e.isCritical && !e.isRedHerring && !collectedEvidence.includes(e.id)
      );

      if (uncollectedEvidence.length > 0) {
        const hint = uncollectedEvidence[0];
        return `중요한 단서가 "${hint.location}"에 있을 수 있어요.`;
      }

      const uninterviewedChars = currentCase.characters.filter(
        c => !interviewedCharacters.includes(c.id) && !c.isVictim
      );

      if (uninterviewedChars.length > 0) {
        return `"${uninterviewedChars[0].name}"에게 아직 이야기를 듣지 않았어요.`;
      }

      return `수집한 증거들을 연결해서 생각해보세요. 누가 동기와 기회를 가졌나요?`;
    },

    initPuzzleChain: () => {
      set((state) => {
        state.phase = 'puzzle-chain';
        state.currentPuzzleIndex = 0;
      });
    },

    solvePuzzle: (puzzleId, score) => {
      set((state) => {
        const progress = state.puzzleProgress.find(p => p.puzzleId === puzzleId);
        if (progress) {
          progress.isCompleted = true;
          progress.score = score;
          progress.completedAt = Date.now();
          state.score += score;
        }

        // 퍼즐 보상: 증거 자동 수집
        const puzzleConfig = state.currentCase?.puzzleChain?.find(p => p.id === puzzleId);
        if (puzzleConfig && puzzleConfig.rewardIds) {
          for (const rewardId of puzzleConfig.rewardIds) {
            if (!state.collectedEvidence.includes(rewardId)) {
              state.collectedEvidence.push(rewardId);
            }
          }
        }
      });
    },

    advancePuzzle: () => {
      set((state) => {
        const nextIndex = state.currentPuzzleIndex + 1;
        const totalPuzzles = state.puzzleProgress.length;

        if (nextIndex >= totalPuzzles) {
          // 모든 퍼즐 완료 → 고발 단계로
          state.phase = 'accusation';
        } else {
          state.currentPuzzleIndex = nextIndex;
          // 다음 퍼즐 언락
          if (state.puzzleProgress[nextIndex]) {
            state.puzzleProgress[nextIndex].isUnlocked = true;
            state.puzzleProgress[nextIndex].startedAt = Date.now();
          }
        }
      });
    },

    updatePlayTime: () => {
      set((state) => {
        if (state.startTime > 0 && !state.isComplete) {
          state.playTime = Math.floor((Date.now() - state.startTime) / 1000);
        }
      });
    }
  }))
);
