import React, { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Play, Star, Zap, Crown, Skull,
  Calendar, Timer, Brain, BookOpen, Users, Lightbulb,
  Trophy, Clock, Shield, ChevronRight, Flame
} from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { useMetaStore, getDailyChallengeNumber } from '../store/metaStore';
import { Difficulty } from '../types';

type GameMode = 'classic' | 'daily' | 'timeattack' | 'brain';

const MODE_TABS: { key: GameMode; label: string; icon: React.ElementType; activeClass: string }[] = [
  { key: 'classic', label: '클래식', icon: BookOpen, activeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40' },
  { key: 'daily', label: '일일 도전', icon: Calendar, activeClass: 'bg-blue-500/20 text-blue-300 border-blue-500/40' },
  { key: 'timeattack', label: '타임어택', icon: Timer, activeClass: 'bg-red-500/20 text-red-300 border-red-500/40' },
  { key: 'brain', label: '두뇌 훈련', icon: Brain, activeClass: 'bg-purple-500/20 text-purple-300 border-purple-500/40' },
];

const difficulties: {
  key: Difficulty;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  suspects: string;
  hints: string;
  multiplier: string;
}[] = [
  { key: 'easy', name: '쉬움', description: '추리 입문자를 위한 난이도', icon: Star, color: 'from-green-500 to-emerald-600', suspects: '3-4명', hints: '힌트 10회', multiplier: 'x1.0' },
  { key: 'medium', name: '보통', description: '적당한 긴장감과 도전', icon: Zap, color: 'from-blue-500 to-indigo-600', suspects: '4-5명', hints: '힌트 5회', multiplier: 'x1.5' },
  { key: 'hard', name: '어려움', description: '경험 많은 탐정을 위한 도전', icon: Crown, color: 'from-orange-500 to-red-600', suspects: '5-6명', hints: '힌트 3회', multiplier: 'x2.0' },
  { key: 'expert', name: '전문가', description: '최고 난이도의 극한 추리', icon: Skull, color: 'from-purple-500 to-pink-600', suspects: '6-7명', hints: '힌트 1회', multiplier: 'x3.0' },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } }
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

export function NewGamePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { startNewGame } = useGameStore();
  const { dailyChallengeCompleted, dailyChallengeResult, currentStreak, detectiveIQ } = useMetaStore();

  const initialMode = (searchParams.get('mode') as GameMode) || 'classic';
  const [mode, setMode] = useState<GameMode>(initialMode);
  const [selected, setSelected] = useState<Difficulty>('medium');
  const [isLoading, setIsLoading] = useState(false);

  const dailyNumber = useMemo(() => getDailyChallengeNumber(), []);

  const handleStart = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    const diff = mode === 'daily' ? 'medium' as Difficulty : selected;
    startNewGame(diff);
    navigate('/game');
  };

  const selectedDiff = difficulties.find(d => d.key === selected)!;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950/30 to-slate-900">
      <motion.div className="max-w-4xl mx-auto px-4 sm:px-6 py-8" variants={container} initial="hidden" animate="show">
        {/* Header */}
        <motion.div variants={item} className="flex items-center gap-4 mb-8">
          <motion.button onClick={() => navigate('/')} className="p-2 rounded-lg hover:bg-slate-800 transition-colors" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <ArrowLeft className="text-slate-400" />
          </motion.button>
          <h1 className="text-2xl font-bold text-white">새 게임</h1>
        </motion.div>

        {/* Mode Tabs */}
        <motion.div variants={item} className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
          {MODE_TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setMode(tab.key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all border ${
                mode === tab.key
                  ? tab.activeClass
                  : 'bg-slate-800/50 text-slate-400 border-transparent hover:bg-slate-700'
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          {/* ===== Classic Mode ===== */}
          {mode === 'classic' && (
            <motion.div key="classic" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <h2 className="text-lg font-medium text-slate-300 mb-4">난이도 선택</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {difficulties.map((diff) => {
                  const Icon = diff.icon;
                  const isSelected = selected === diff.key;
                  return (
                    <motion.button
                      key={diff.key}
                      onClick={() => setSelected(diff.key)}
                      className={`relative p-5 rounded-2xl border-2 transition-all ${
                        isSelected
                          ? 'border-white/30 bg-slate-800 shadow-lg'
                          : 'border-slate-700/50 bg-slate-800/50 hover:border-slate-600'
                      }`}
                      whileHover={{ scale: 1.03, y: -3 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${diff.color} flex items-center justify-center mb-3 mx-auto shadow-lg`}>
                        <Icon size={26} className="text-white" />
                      </div>
                      <h3 className="font-bold text-white mb-1">{diff.name}</h3>
                      <p className="text-xs text-slate-400 mb-3">{diff.description}</p>
                      <div className="space-y-1 text-xs text-slate-500">
                        <div className="flex items-center gap-1"><Users size={10} /> {diff.suspects}</div>
                        <div className="flex items-center gap-1"><Lightbulb size={10} /> {diff.hints}</div>
                        <div className="flex items-center gap-1"><Trophy size={10} /> {diff.multiplier}</div>
                      </div>
                      {isSelected && (
                        <motion.div className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                          <Star size={12} className="text-white" fill="currentColor" />
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              <div className="flex justify-center">
                <motion.button
                  onClick={handleStart}
                  disabled={isLoading}
                  className="px-12 py-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl font-bold text-lg text-slate-900 shadow-xl shadow-amber-500/25 flex items-center gap-3 disabled:opacity-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {isLoading ? (
                    <><div className="w-6 h-6 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" /> 사건 생성 중...</>
                  ) : (
                    <><Play size={24} fill="currentColor" /> 사건 시작! <ChevronRight size={18} /></>
                  )}
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* ===== Daily Mode ===== */}
          {mode === 'daily' && (
            <motion.div key="daily" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="glass rounded-2xl p-8 text-center mb-8">
                <motion.div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 inline-flex mb-4" animate={{ rotate: [0, -5, 5, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                  <Calendar size={32} className="text-white" />
                </motion.div>
                <h2 className="text-2xl font-bold text-white mb-1">오늘의 사건 #{String(dailyNumber).padStart(3, '0')}</h2>
                <p className="text-slate-400 mb-2">{new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p className="text-sm text-slate-500 mb-6">전 세계 탐정들이 같은 사건에 도전합니다</p>

                <div className="flex justify-center gap-6 mb-6 text-sm">
                  <div className="text-center"><Shield size={16} className="text-blue-400 mx-auto mb-1" /><span className="text-slate-400">보통 난이도</span></div>
                  <div className="text-center"><Clock size={16} className="text-blue-400 mx-auto mb-1" /><span className="text-slate-400">제한 없음</span></div>
                  <div className="text-center"><Flame size={16} className="text-orange-400 mx-auto mb-1" /><span className="text-slate-400">{currentStreak}일 연속</span></div>
                </div>

                {dailyChallengeCompleted ? (
                  <div className="space-y-3">
                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                      <Trophy size={24} className="text-emerald-400 mx-auto mb-2" />
                      <p className="text-emerald-300 font-bold">오늘의 사건을 이미 해결했습니다!</p>
                      {dailyChallengeResult && (
                        <p className="text-sm text-slate-400 mt-1">랭크 {dailyChallengeResult.rank} | {dailyChallengeResult.score}점</p>
                      )}
                    </div>
                    <p className="text-xs text-slate-500">내일 새로운 사건이 열립니다</p>
                  </div>
                ) : (
                  <motion.button
                    onClick={handleStart}
                    disabled={isLoading}
                    className="px-10 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl font-bold text-lg text-white shadow-xl shadow-blue-500/25 flex items-center gap-3 mx-auto disabled:opacity-50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {isLoading ? (
                      <><div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" /> 준비 중...</>
                    ) : (
                      <><Play size={24} fill="currentColor" /> 오늘의 사건 도전</>
                    )}
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}

          {/* ===== Time Attack Mode ===== */}
          {mode === 'timeattack' && (
            <motion.div key="timeattack" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="glass rounded-2xl p-8 text-center mb-8">
                <motion.div className="p-4 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 inline-flex mb-4" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <Timer size={32} className="text-white" />
                </motion.div>
                <h2 className="text-2xl font-bold text-white mb-2">타임어택</h2>
                <p className="text-slate-400 mb-6">제한 시간 안에 사건을 해결하세요!</p>

                <div className="inline-flex items-center gap-2 px-6 py-3 bg-red-500/10 border border-red-500/20 rounded-xl mb-6">
                  <Clock size={20} className="text-red-400" />
                  <span className="text-2xl font-black text-red-400">15:00</span>
                  <span className="text-sm text-slate-400">제한시간</span>
                </div>
              </div>

              <h3 className="text-lg font-medium text-slate-300 mb-4">난이도 선택</h3>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {difficulties.map(diff => {
                  const isSelected = selected === diff.key;
                  return (
                    <motion.button key={diff.key} onClick={() => setSelected(diff.key)}
                      className={`p-4 rounded-xl border transition-all ${isSelected ? 'border-red-500/40 bg-red-500/10' : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'}`}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${diff.color} flex items-center justify-center mb-2 mx-auto`}>
                        <diff.icon size={20} className="text-white" />
                      </div>
                      <p className="font-bold text-white text-sm">{diff.name}</p>
                      <p className="text-xs text-slate-400">{diff.multiplier}</p>
                    </motion.button>
                  );
                })}
              </div>

              <div className="flex justify-center">
                <motion.button onClick={handleStart} disabled={isLoading}
                  className="px-10 py-4 bg-gradient-to-r from-red-500 to-rose-500 rounded-xl font-bold text-lg text-white shadow-xl shadow-red-500/25 flex items-center gap-3 disabled:opacity-50"
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                >
                  {isLoading ? (
                    <><div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" /> 준비 중...</>
                  ) : (
                    <><Zap size={24} /> 도전 시작!</>
                  )}
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* ===== Brain Training Mode ===== */}
          {mode === 'brain' && (
            <motion.div key="brain" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="glass rounded-2xl p-8 text-center mb-8">
                <motion.div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 inline-flex mb-4" animate={{ rotate: [0, 360] }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}>
                  <Brain size={32} className="text-white" />
                </motion.div>
                <h2 className="text-2xl font-bold text-white mb-2">두뇌 훈련</h2>
                <p className="text-slate-400 mb-6">추리력을 측정하고 훈련하세요</p>

                <div className="inline-flex items-center gap-4 px-6 py-4 bg-purple-500/10 border border-purple-500/20 rounded-xl mb-6">
                  <div className="text-center">
                    <p className="text-3xl font-black text-purple-400">{detectiveIQ || '?'}</p>
                    <p className="text-xs text-slate-400">탐정 IQ</p>
                  </div>
                </div>

                <div className="space-y-3 text-sm text-slate-400 mb-6">
                  <p>패턴 인식, 논리 추론, 관찰력을 종합 평가합니다</p>
                  <p>매 게임 후 추리력 점수가 갱신됩니다</p>
                </div>
              </div>

              <div className="flex justify-center">
                <motion.button onClick={handleStart} disabled={isLoading}
                  className="px-10 py-4 bg-gradient-to-r from-purple-500 to-violet-500 rounded-xl font-bold text-lg text-white shadow-xl shadow-purple-500/25 flex items-center gap-3 disabled:opacity-50"
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                >
                  {isLoading ? (
                    <><div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" /> 준비 중...</>
                  ) : (
                    <><Brain size={24} /> 훈련 시작</>
                  )}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
