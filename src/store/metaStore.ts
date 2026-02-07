import { create } from 'zustand';
import { persist } from 'zustand/middleware';
// 시나리오 수 상수 (ALL_SCENARIOS 전체 임포트 방지 - 번들 700KB 절약)
const SCENARIO_COUNT = 108;

export interface DailyChallengeResult {
  rank: string;
  score: number;
  time: number;
  correct: boolean;
}

export interface RecentScore {
  date: string;
  score: number;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  rank: string;
  caseTitle: string;
  timeSeconds: number;
  mode: string;
}

export interface MetaAchievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: number;
}

interface MetaState {
  // Profile
  detectiveName: string;
  detectiveStyle: '분석형' | '직감형' | '사교형';
  memberSince: string;

  // Streaks
  currentStreak: number;
  longestStreak: number;
  lastPlayedDate: string;
  playedDates: string[];

  // Stats
  totalGamesPlayed: number;
  totalGamesWon: number;
  totalScore: number;
  averageScore: number;
  averageTime: number;
  bestScore: number;
  bestTime: number;
  bestRank: string;
  perfectGames: number;
  totalPlayTime: number;
  totalPlayTimeSeconds: number;

  // By difficulty
  gamesPlayed: Record<string, number>;
  gamesWon: Record<string, number>;

  // Rank distribution
  rankDistribution: Record<string, number>;

  // Daily Challenge
  dailyChallengeCompleted: boolean;
  dailyChallengeDate: string;
  dailyChallengeResult: DailyChallengeResult | null;

  // Achievements
  unlockedAchievements: MetaAchievement[];
  achievementProgress: Record<string, number>;

  // History
  recentScores: RecentScore[];
  scoreHistory: Array<{ date: string; score: number; difficulty: string; mode: string }>;

  // Brain Training
  brainTrainingHighScore: number;
  detectiveIQ: number;

  // Time Attack
  timeAttackBestTimes: Record<string, number>;

  // Actions
  setDetectiveName: (name: string) => void;
  setDetectiveStyle: (style: '분석형' | '직감형' | '사교형') => void;
  completeDailyChallenge: (result: DailyChallengeResult) => void;
  incrementGamesPlayed: () => void;
  incrementGamesWon: (rank: string) => void;
  recordGameResult: (result: {
    score: number;
    rank: string;
    difficulty: 'easy' | 'medium' | 'hard' | 'expert';
    won: boolean;
    timeSeconds: number;
    caseTitle: string;
    mode: string;
  }) => void;
  unlockAchievement: (achievement: MetaAchievement) => void;
  updateAchievementProgress: (id: string, progress: number) => void;
  updateBrainTraining: (score: number, iq: number) => void;
  updateTimeAttack: (mode: string, time: number) => void;
  resetDailyIfNeeded: () => void;
  resetStats: () => void;
}

export function getDailyScenarioIndex(): number {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  return seed % SCENARIO_COUNT;
}

export function getDailyChallengeNumber(): number {
  const start = new Date(2025, 5, 1);
  const today = new Date();
  const diff = Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return diff + 1;
}

function getTodayString(): string {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
}

export const useMetaStore = create<MetaState>()(
  persist(
    (set, get) => ({
      // Profile
      detectiveName: '탐정',
      detectiveStyle: '분석형',
      memberSince: getTodayString(),

      // Streaks
      currentStreak: 0,
      longestStreak: 0,
      lastPlayedDate: '',
      playedDates: [],

      // Stats
      totalGamesPlayed: 0,
      totalGamesWon: 0,
      totalScore: 0,
      averageScore: 0,
      averageTime: 0,
      bestScore: 0,
      bestTime: 0,
      bestRank: 'F',
      perfectGames: 0,
      totalPlayTime: 0,
      totalPlayTimeSeconds: 0,

      // By difficulty
      gamesPlayed: { easy: 0, medium: 0, hard: 0, expert: 0 },
      gamesWon: { easy: 0, medium: 0, hard: 0, expert: 0 },

      // Rank distribution
      rankDistribution: { S: 0, A: 0, B: 0, C: 0, D: 0, F: 0 },

      // Daily
      dailyChallengeCompleted: false,
      dailyChallengeDate: '',
      dailyChallengeResult: null,

      // Achievements
      unlockedAchievements: [],
      achievementProgress: {},

      // History
      recentScores: [],
      scoreHistory: [],

      // Brain Training
      brainTrainingHighScore: 0,
      detectiveIQ: 0,

      // Time Attack
      timeAttackBestTimes: {},

      // Actions
      setDetectiveName: (name) => set({ detectiveName: name }),
      setDetectiveStyle: (style) => set({ detectiveStyle: style }),

      completeDailyChallenge: (result) => {
        const today = getTodayString();
        set((state) => ({
          dailyChallengeCompleted: true,
          dailyChallengeDate: today,
          dailyChallengeResult: result,
          currentStreak: state.currentStreak + 1,
          longestStreak: Math.max(state.longestStreak, state.currentStreak + 1),
        }));
      },

      incrementGamesPlayed: () => {
        set((state) => ({ totalGamesPlayed: state.totalGamesPlayed + 1 }));
      },

      incrementGamesWon: (rank) => {
        const rankOrder = ['S', 'A', 'B', 'C', 'D', 'F'];
        set((state) => ({
          totalGamesWon: state.totalGamesWon + 1,
          bestRank: rankOrder.indexOf(rank) < rankOrder.indexOf(state.bestRank) ? rank : state.bestRank,
        }));
      },

      recordGameResult: (result) => {
        const state = get();
        const todayStr = getTodayString();
        const newTotalGames = state.totalGamesPlayed + 1;
        const newTotalWon = state.totalGamesWon + (result.won ? 1 : 0);
        const newTotalScore = state.totalScore + result.score;
        const newTotalTime = state.totalPlayTimeSeconds + result.timeSeconds;

        // Streak calculation
        let newStreak = state.currentStreak;
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;

        if (state.lastPlayedDate === todayStr) {
          // Already played today
        } else if (state.lastPlayedDate === yesterdayStr || state.lastPlayedDate === '') {
          newStreak = state.lastPlayedDate === '' ? 1 : newStreak + 1;
        } else {
          newStreak = 1;
        }

        const updatedGamesPlayed = { ...state.gamesPlayed };
        updatedGamesPlayed[result.difficulty] = (updatedGamesPlayed[result.difficulty] || 0) + 1;

        const updatedGamesWon = { ...state.gamesWon };
        if (result.won) {
          updatedGamesWon[result.difficulty] = (updatedGamesWon[result.difficulty] || 0) + 1;
        }

        const updatedRankDist = { ...state.rankDistribution };
        updatedRankDist[result.rank] = (updatedRankDist[result.rank] || 0) + 1;

        const updatedPlayedDates = state.playedDates.includes(todayStr)
          ? state.playedDates.slice(-365)
          : [...state.playedDates, todayStr].slice(-365);

        const rankOrder = ['S', 'A', 'B', 'C', 'D', 'F'];

        set({
          totalGamesPlayed: newTotalGames,
          totalGamesWon: newTotalWon,
          totalScore: newTotalScore,
          averageScore: Math.round(newTotalScore / newTotalGames),
          averageTime: Math.round(newTotalTime / newTotalGames),
          bestScore: Math.max(state.bestScore, result.score),
          bestTime: state.bestTime === 0 ? result.timeSeconds : Math.min(state.bestTime, result.timeSeconds),
          bestRank: rankOrder.indexOf(result.rank) < rankOrder.indexOf(state.bestRank) ? result.rank : state.bestRank,
          perfectGames: state.perfectGames + (result.rank === 'S' ? 1 : 0),
          totalPlayTime: newTotalTime,
          totalPlayTimeSeconds: newTotalTime,
          currentStreak: newStreak,
          longestStreak: Math.max(state.longestStreak, newStreak),
          lastPlayedDate: todayStr,
          playedDates: updatedPlayedDates,
          gamesPlayed: updatedGamesPlayed,
          gamesWon: updatedGamesWon,
          rankDistribution: updatedRankDist,
          recentScores: [
            {
              date: todayStr,
              score: result.score,
              difficulty: result.difficulty,
              rank: result.rank,
              caseTitle: result.caseTitle,
              timeSeconds: result.timeSeconds,
              mode: result.mode,
            },
            ...state.recentScores,
          ].slice(0, 50),
          scoreHistory: [
            ...state.scoreHistory,
            { date: todayStr, score: result.score, difficulty: result.difficulty, mode: result.mode },
          ].slice(-500),
        });
      },

      unlockAchievement: (achievement) => {
        const state = get();
        if (state.unlockedAchievements.some((a) => a.id === achievement.id)) return;
        set({
          unlockedAchievements: [...state.unlockedAchievements, achievement],
        });
      },

      updateAchievementProgress: (id, progress) => {
        set((state) => ({
          achievementProgress: { ...state.achievementProgress, [id]: progress },
        }));
      },

      updateBrainTraining: (score, iq) => {
        set((state) => ({
          brainTrainingHighScore: Math.max(state.brainTrainingHighScore, score),
          detectiveIQ: iq,
        }));
      },

      updateTimeAttack: (mode, time) => {
        set((state) => ({
          timeAttackBestTimes: {
            ...state.timeAttackBestTimes,
            [mode]: state.timeAttackBestTimes[mode]
              ? Math.min(state.timeAttackBestTimes[mode], time)
              : time,
          },
        }));
      },

      resetDailyIfNeeded: () => {
        const today = getTodayString();
        const state = get();
        if (state.dailyChallengeDate !== today) {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;

          set({
            dailyChallengeCompleted: false,
            dailyChallengeResult: null,
            dailyChallengeDate: today,
            currentStreak: state.dailyChallengeDate === yesterdayStr ? state.currentStreak : 0,
          });
        }
      },

      resetStats: () => {
        set({
          currentStreak: 0,
          longestStreak: 0,
          lastPlayedDate: '',
          playedDates: [],
          totalGamesPlayed: 0,
          totalGamesWon: 0,
          totalScore: 0,
          averageScore: 0,
          averageTime: 0,
          bestScore: 0,
          bestTime: 0,
          bestRank: 'F',
          perfectGames: 0,
          totalPlayTime: 0,
          totalPlayTimeSeconds: 0,
          gamesPlayed: { easy: 0, medium: 0, hard: 0, expert: 0 },
          gamesWon: { easy: 0, medium: 0, hard: 0, expert: 0 },
          rankDistribution: { S: 0, A: 0, B: 0, C: 0, D: 0, F: 0 },
          dailyChallengeCompleted: false,
          dailyChallengeDate: '',
          dailyChallengeResult: null,
          unlockedAchievements: [],
          achievementProgress: {},
          recentScores: [],
          scoreHistory: [],
        });
      },
    }),
    {
      name: 'deductio-meta-storage',
    }
  )
);
