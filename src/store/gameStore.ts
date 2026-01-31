import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { GameState, Deduction, GamePhase } from '../types';
import { CaseGenerator } from '../core/CaseGenerator';
import { generateId } from '../utils/helpers';
import { DIFFICULTY_SETTINGS } from '../data/gameData';

interface GameStore extends GameState {
  // 게임 라이프사이클
  startNewGame: (difficulty: 'easy' | 'medium' | 'hard' | 'expert') => void;
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

  // 유틸
  updatePlayTime: () => void;
}

const initialState: GameState = {
  currentCase: null,
  phase: 'intro',
  currentLocation: null,
  currentCharacter: null,
  collectedEvidence: [],
  examinedObjects: [],
  interviewedCharacters: [],
  revealedSecrets: [],
  deductions: [],
  confirmedFacts: [],
  hintsUsed: 0,
  hintsRemaining: 5,
  score: 0,
  startTime: 0,
  playTime: 0,
  isComplete: false,
  accusationResult: null
};

export const useGameStore = create<GameStore>()(
  immer((set, get) => ({
    ...initialState,

    startNewGame: (difficulty) => {
      const generator = new CaseGenerator(difficulty);
      const newCase = generator.generate();
      const settings = DIFFICULTY_SETTINGS[difficulty];

      set((state) => {
        Object.assign(state, initialState);
        state.currentCase = newCase;
        state.phase = 'intro';
        state.hintsRemaining = settings.hintCount;
        state.startTime = Date.now();
        state.currentLocation = newCase.locations[0]?.id || null;
      });
    },

    resetGame: () => {
      set((state) => {
        Object.assign(state, initialState);
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
            state.score += evidence.isCritical ? 50 : 20;
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

      return character.dialogues[topic] || ['그건 잘 모르겠어요.'];
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
            state.score += 30;
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
          isCorrect: null,
          isConfirmed: false
        });
      });
    },

    confirmDeductions: () => {
      const { currentCase, deductions } = get();
      if (!currentCase) return { correct: 0, total: 0 };

      const pendingDeductions = deductions.filter(d => !d.isConfirmed).slice(0, 3);
      let correctCount = 0;

      set((state) => {
        for (const deduction of pendingDeductions) {
          const stateDeduction = state.deductions.find(d => d.id === deduction.id);
          if (stateDeduction) {
            // 간단한 검증 로직 (실제로는 더 정교해야 함)
            const culprit = state.currentCase?.characters.find(
              c => c.id === state.currentCase?.culpritId
            );

            let isCorrect = false;
            if (deduction.type === 'who' && culprit) {
              isCorrect = deduction.statement.includes(culprit.name);
            } else if (deduction.type === 'why') {
              isCorrect = deduction.statement.toLowerCase().includes(
                state.currentCase?.motive.toLowerCase().split(' ')[0] || ''
              );
            } else {
              // 다른 타입은 70% 확률로 정답 처리 (데모용)
              isCorrect = Math.random() > 0.3;
            }

            stateDeduction.isCorrect = isCorrect;
            stateDeduction.isConfirmed = true;

            if (isCorrect) {
              correctCount++;
              state.confirmedFacts.push(deduction.statement);
              state.score += 40;
            }
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
        score = 500;

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
        score += hintsRemaining * 20;

        // 시간 보너스
        const elapsedMinutes = (Date.now() - startTime) / 60000;
        if (elapsedMinutes < 10) score += 200;
        else if (elapsedMinutes < 20) score += 100;

        // 증거 수집률 보너스
        const collectionRate = collectedEvidence.length / currentCase.evidence.length;
        if (collectionRate > 0.8) score += 100;
      }

      set((state) => {
        state.isComplete = true;
        state.phase = 'reveal';
        state.accusationResult = {
          isCorrect,
          accusedId: suspectId,
          score: Math.floor(score)
        };
        state.score += Math.floor(score);
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

    updatePlayTime: () => {
      set((state) => {
        if (state.startTime > 0 && !state.isComplete) {
          state.playTime = Math.floor((Date.now() - state.startTime) / 1000);
        }
      });
    }
  }))
);
