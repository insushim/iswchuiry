import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Fingerprint, Trophy, Target, Clock, Brain,
  TrendingUp, Star, Award, Flame, BarChart3, Crown, Zap
} from 'lucide-react';
import { useMetaStore } from '../store/metaStore';
import { formatTime } from '../utils/helpers';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } }
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const RANK_COLORS: Record<string, string> = {
  S: 'from-amber-400 to-yellow-500',
  A: 'from-green-400 to-emerald-500',
  B: 'from-blue-400 to-cyan-500',
  C: 'from-slate-400 to-slate-500',
  D: 'from-orange-400 to-amber-500',
  F: 'from-red-400 to-rose-500'
};

const DIFF_LABELS: Record<string, string> = {
  easy: '쉬움', medium: '보통', hard: '어려움', expert: '전문가'
};
const DIFF_COLORS: Record<string, string> = {
  easy: 'bg-green-500', medium: 'bg-blue-500', hard: 'bg-orange-500', expert: 'bg-purple-500'
};

export function StatsPage() {
  const navigate = useNavigate();
  const {
    detectiveName, detectiveStyle, memberSince,
    currentStreak, longestStreak, totalGamesPlayed, totalGamesWon,
    totalScore, averageScore, bestScore, bestRank, perfectGames,
    totalPlayTimeSeconds, bestTime,
    gamesPlayed, gamesWon, rankDistribution,
    unlockedAchievements, recentScores
  } = useMetaStore();

  const winRate = totalGamesPlayed > 0 ? Math.round((totalGamesWon / totalGamesPlayed) * 100) : 0;
  const maxRankCount = Math.max(1, ...Object.values(rankDistribution));

  const mainStats = [
    { icon: Target, label: '총 게임', value: totalGamesPlayed, suffix: '회', color: 'text-blue-400' },
    { icon: Trophy, label: '승리', value: totalGamesWon, suffix: '회', color: 'text-green-400' },
    { icon: TrendingUp, label: '승률', value: winRate, suffix: '%', color: 'text-emerald-400' },
    { icon: Crown, label: '최고 랭크', value: bestRank || '-', suffix: '', color: 'text-amber-400' },
    { icon: Star, label: '최고 점수', value: bestScore, suffix: '', color: 'text-yellow-400' },
    { icon: BarChart3, label: '평균 점수', value: averageScore, suffix: '', color: 'text-cyan-400' },
    { icon: Award, label: '퍼펙트', value: perfectGames, suffix: '회', color: 'text-purple-400' },
    { icon: Clock, label: '총 플레이', value: Math.floor(totalPlayTimeSeconds / 60), suffix: '분', color: 'text-slate-400' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950/30 to-slate-900">
      <motion.div className="max-w-3xl mx-auto px-4 sm:px-6 py-8" variants={container} initial="hidden" animate="show">
        {/* Header */}
        <motion.div variants={item} className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <motion.button onClick={() => navigate('/')} className="p-2 hover:bg-slate-800 rounded-lg transition-colors" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <ArrowLeft size={20} className="text-slate-400" />
            </motion.button>
            <h1 className="text-2xl font-bold text-white">통계</h1>
          </div>
          <Fingerprint size={24} className="text-amber-500/40" />
        </motion.div>

        {/* Profile Card */}
        <motion.div variants={item} className="glass p-6 rounded-2xl mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg">
              <Brain size={28} className="text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-white">{detectiveName}</h2>
              <p className="text-sm text-slate-400">{detectiveStyle} 탐정</p>
              <p className="text-xs text-slate-500">가입일: {memberSince}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center gap-1 text-orange-400">
                <Flame size={18} />
                <span className="text-2xl font-black">{currentStreak}</span>
              </div>
              <p className="text-xs text-slate-500">연속</p>
              {longestStreak > 0 && <p className="text-xs text-slate-600">최장 {longestStreak}일</p>}
            </div>
          </div>
        </motion.div>

        {/* Main Stats Grid */}
        <motion.div variants={item} className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {mainStats.map((stat, i) => (
            <motion.div key={i} className="glass p-4 rounded-xl text-center" whileHover={{ scale: 1.03, y: -2 }}>
              <stat.icon className={`w-5 h-5 ${stat.color} mx-auto mb-2`} />
              <div className="text-xl font-bold text-white">{stat.value}{stat.suffix}</div>
              <div className="text-xs text-slate-500">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Rank Distribution */}
        <motion.div variants={item} className="glass p-6 rounded-2xl mb-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Trophy size={18} className="text-amber-400" />
            랭크 분포
          </h3>
          <div className="space-y-3">
            {['S', 'A', 'B', 'C', 'D', 'F'].map(rank => {
              const count = rankDistribution[rank] || 0;
              const pct = maxRankCount > 0 ? (count / maxRankCount) * 100 : 0;
              return (
                <div key={rank} className="flex items-center gap-3">
                  <span className={`w-8 text-center text-sm font-bold bg-gradient-to-r ${RANK_COLORS[rank]} bg-clip-text text-transparent`}>{rank}</span>
                  <div className="flex-1 h-6 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${RANK_COLORS[rank]} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8, delay: 0.1 }}
                    />
                  </div>
                  <span className="w-10 text-right text-sm text-slate-400">{count}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Difficulty Breakdown */}
        <motion.div variants={item} className="glass p-6 rounded-2xl mb-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Zap size={18} className="text-blue-400" />
            난이도별 기록
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {['easy', 'medium', 'hard', 'expert'].map(diff => {
              const played = gamesPlayed[diff] || 0;
              const won = gamesWon[diff] || 0;
              const rate = played > 0 ? Math.round((won / played) * 100) : 0;
              return (
                <div key={diff} className="bg-slate-800/50 p-4 rounded-xl border border-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-3 h-3 rounded-full ${DIFF_COLORS[diff]}`} />
                    <span className="text-sm font-medium text-white">{DIFF_LABELS[diff]}</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{played}<span className="text-sm text-slate-400">회</span></div>
                  <div className="text-xs text-slate-500">{won}승 | 승률 {rate}%</div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Recent Games */}
        <motion.div variants={item} className="glass p-6 rounded-2xl mb-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Clock size={18} className="text-cyan-400" />
            최근 게임
          </h3>
          {recentScores.length > 0 ? (
            <div className="space-y-2">
              {recentScores.slice(0, 10).map((game, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl border border-white/5"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold bg-gradient-to-r ${RANK_COLORS[game.rank] || RANK_COLORS.F} text-white`}>
                    {game.rank}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{game.caseTitle || '사건'}</p>
                    <p className="text-xs text-slate-500">{game.date} | {DIFF_LABELS[game.difficulty] || game.difficulty}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-amber-400">{game.score}점</p>
                    <p className="text-xs text-slate-500">{formatTime(game.timeSeconds)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Target size={32} className="text-slate-600 mx-auto mb-2" />
              <p className="text-sm text-slate-500">아직 게임 기록이 없습니다</p>
            </div>
          )}
        </motion.div>

        {/* Achievements Summary */}
        <motion.div variants={item} className="glass p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Award size={18} className="text-amber-400" />
              업적 현황
            </h3>
            <button onClick={() => navigate('/achievements')} className="text-sm text-amber-400 hover:text-amber-300">
              전체 보기 →
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-3xl font-black text-white">{unlockedAchievements.length}</div>
            <div className="flex-1">
              <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, (unlockedAchievements.length / 45) * 100)}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
              </div>
              <p className="text-xs text-slate-500 mt-1">{unlockedAchievements.length}/45 업적 해금</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
