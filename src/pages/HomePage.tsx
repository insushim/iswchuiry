import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play, BookOpen, Settings, Brain, Eye, MessageSquare,
  ChevronRight, Fingerprint, Clock, Users, MapPin, Target,
  Star, Flame, Trophy, TrendingUp, Calendar, Share2,
  Zap, Timer, Dumbbell, Sparkles, Award, BarChart3,
  Shield, Lock, ArrowRight, Crown
} from 'lucide-react';
import { useMetaStore, getDailyChallengeNumber } from '../store/metaStore';

// ---- Animation Variants ----
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.15 } }
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }
};
const pulseGlow = {
  animate: {
    boxShadow: [
      '0 0 20px rgba(251, 191, 36, 0.2)',
      '0 0 40px rgba(251, 191, 36, 0.4)',
      '0 0 20px rgba(251, 191, 36, 0.2)'
    ],
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' as const }
  }
};

// ---- Typewriter Hook ----
function useTypewriter(text: string, speed = 60) {
  const [display, setDisplay] = useState('');
  useEffect(() => {
    let i = 0;
    setDisplay('');
    const t = setInterval(() => {
      if (i < text.length) { setDisplay(text.slice(0, ++i)); }
      else clearInterval(t);
    }, speed);
    return () => clearInterval(t);
  }, [text, speed]);
  return display;
}

// ---- Countdown Hook ----
function useCountdownToMidnight() {
  const [timeLeft, setTimeLeft] = useState('');
  useEffect(() => {
    const calc = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      const diff = tomorrow.getTime() - now.getTime();
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`);
    };
    calc();
    const t = setInterval(calc, 1000);
    return () => clearInterval(t);
  }, []);
  return timeLeft;
}

// ---- Flame Animation Component ----
function FlameIcon({ streak }: { streak: number }) {
  return (
    <motion.div
      className="relative inline-flex"
      animate={{ scale: [1, 1.15, 1] }}
      transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
    >
      <Flame className={`w-6 h-6 ${streak > 0 ? 'text-orange-400' : 'text-slate-600'}`} fill={streak > 0 ? 'currentColor' : 'none'} />
      {streak >= 7 && (
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"
          animate={{ opacity: [0.5, 1, 0.5], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
}

// ---- Main Component ----
export function HomePage() {
  const navigate = useNavigate();
  const subtitle = useTypewriter('세계 최고의 추리 두뇌 게임', 60);
  const countdown = useCountdownToMidnight();

  const {
    currentStreak, longestStreak, totalGamesPlayed, totalGamesWon,
    dailyChallengeCompleted, dailyChallengeResult,
    unlockedAchievements, resetDailyIfNeeded, bestRank
  } = useMetaStore();

  useEffect(() => {
    resetDailyIfNeeded();
  }, [resetDailyIfNeeded]);

  const winRate = totalGamesPlayed > 0 ? Math.round((totalGamesWon / totalGamesPlayed) * 100) : 0;
  const dailyNumber = useMemo(() => getDailyChallengeNumber(), []);

  const todayFormatted = useMemo(() => {
    const d = new Date();
    return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일의 사건`;
  }, []);

  // Game Modes
  const gameModes = [
    {
      id: 'classic',
      icon: BookOpen,
      title: '클래식 모드',
      desc: '102+ 시나리오 | 난이도 선택',
      gradient: 'from-amber-500 to-orange-600',
      bgGlow: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20',
      route: '/new-game?mode=classic'
    },
    {
      id: 'daily',
      icon: Calendar,
      title: '오늘의 사건',
      desc: '매일 새로운 사건 | 모두 같은 문제',
      gradient: 'from-blue-500 to-cyan-600',
      bgGlow: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
      route: '/new-game?mode=daily'
    },
    {
      id: 'timeattack',
      icon: Timer,
      title: '타임어택',
      desc: '15분 안에 해결하라!',
      gradient: 'from-red-500 to-rose-600',
      bgGlow: 'bg-red-500/10',
      borderColor: 'border-red-500/20',
      route: '/new-game?mode=timeattack'
    },
    {
      id: 'brain',
      icon: Dumbbell,
      title: '두뇌 훈련',
      desc: '추리력 점수 측정',
      gradient: 'from-purple-500 to-violet-600',
      bgGlow: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
      route: '/new-game?mode=brain'
    }
  ];

  // Features
  const features = [
    {
      icon: Eye,
      title: '현장 조사',
      desc: '5개 장소, 30+ 오브젝트 탐색',
      color: 'from-blue-500 to-cyan-500',
      detail: '범죄 현장 곳곳을 탐색하고 숨겨진 단서를 찾아내세요'
    },
    {
      icon: MessageSquare,
      title: '심문',
      desc: 'Ace Attorney 스타일 모순 추적',
      color: 'from-purple-500 to-pink-500',
      detail: '용의자의 증언 속 모순을 찾아 진실을 밝혀내세요'
    },
    {
      icon: Brain,
      title: '추론',
      desc: 'Obra Dinn 스타일 3중 검증',
      color: 'from-amber-500 to-orange-500',
      detail: '누가, 왜, 어떻게 - 3중 추론으로 진범을 지목하세요'
    }
  ];

  // Content Stats
  const contentStats = [
    { icon: Target, label: '시나리오', value: '102+' },
    { icon: Shield, label: '사건유형', value: '6종' },
    { icon: BarChart3, label: '난이도', value: '4단계' },
    { icon: Users, label: '캐릭터', value: '60+' },
    { icon: Zap, label: '게임모드', value: '5종' }
  ];

  // Quick Stats for the bar
  const quickStats = [
    { icon: Flame, label: '연속 기록', value: currentStreak, suffix: '일', color: 'text-orange-400', active: currentStreak > 0 },
    { icon: Play, label: '총 게임', value: totalGamesPlayed, suffix: '회', color: 'text-blue-400', active: true },
    { icon: TrendingUp, label: '승률', value: winRate, suffix: '%', color: 'text-green-400', active: true },
    { icon: Crown, label: '최고 랭크', value: bestRank || '-', suffix: '', color: 'text-amber-400', active: true }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950/30 to-slate-900 overflow-hidden relative">
      {/* Ambient Glow Effects */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/3 rounded-full blur-[200px] pointer-events-none" />

      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* ===== 1. Immersive Header ===== */}
        <motion.header variants={item} className="flex items-center justify-between mb-12 sm:mb-16">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Fingerprint className="w-8 h-8 text-amber-500" />
            </motion.div>
            <span className="text-lg font-bold tracking-wider text-slate-300">DEDUCTIO</span>
            <span className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 rounded-full text-xs text-amber-400 font-medium">
              v6.0 - Premium Edition
            </span>
          </div>
          <motion.button
            onClick={() => navigate('/settings')}
            className="p-2.5 glass rounded-xl text-slate-400 hover:text-white transition-colors"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <Settings className="w-5 h-5" />
          </motion.button>
        </motion.header>

        {/* ===== Hero Logo + Typewriter ===== */}
        <div className="text-center mb-10 sm:mb-14">
          <motion.div variants={item}>
            <motion.h1
              className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight mb-3"
              animate={{
                textShadow: [
                  '0 0 20px rgba(251, 191, 36, 0.0)',
                  '0 0 40px rgba(251, 191, 36, 0.3)',
                  '0 0 20px rgba(251, 191, 36, 0.0)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">
                DEDUCTIO
              </span>
            </motion.h1>
            <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-amber-500 to-transparent mb-5" />
          </motion.div>

          <motion.p variants={item} className="text-lg sm:text-xl md:text-2xl text-amber-100/80 mb-4 h-8 font-light">
            {subtitle}<span className="animate-pulse text-amber-400">|</span>
          </motion.p>
        </div>

        {/* ===== 2. Daily Challenge Banner (MOST PROMINENT) ===== */}
        <motion.div variants={item} className="mb-10">
          <motion.div
            className="relative overflow-hidden rounded-2xl border border-blue-500/20 bg-gradient-to-br from-slate-800/80 via-blue-950/30 to-slate-800/80 backdrop-blur-xl p-6 sm:p-8"
            {...pulseGlow}
          >
            {/* Decorative corner accents */}
            <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-transparent rounded-br-full" />
            <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-amber-500/10 to-transparent rounded-tl-full" />

            <div className="relative flex flex-col md:flex-row md:items-center gap-6">
              {/* Left: Daily Challenge Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <motion.div
                    className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600"
                    animate={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Calendar className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white">오늘의 사건</h2>
                    <span className="text-xs text-blue-400 font-mono">#{String(dailyNumber).padStart(3, '0')}</span>
                  </div>
                </div>

                <p className="text-base sm:text-lg text-slate-300 mb-2">{todayFormatted}</p>

                {dailyChallengeCompleted && dailyChallengeResult ? (
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                        dailyChallengeResult.rank === 'S' ? 'bg-amber-500/20 text-amber-300' :
                        dailyChallengeResult.rank === 'A' ? 'bg-green-500/20 text-green-300' :
                        dailyChallengeResult.rank === 'B' ? 'bg-blue-500/20 text-blue-300' :
                        'bg-slate-500/20 text-slate-300'
                      }`}>
                        랭크 {dailyChallengeResult.rank}
                      </span>
                      <span className="text-sm text-slate-400">
                        {dailyChallengeResult.score}점
                      </span>
                      <span className="text-sm text-slate-400">
                        {Math.floor(dailyChallengeResult.time / 60)}분 {dailyChallengeResult.time % 60}초
                      </span>
                    </div>
                    <p className="text-sm text-emerald-400 flex items-center gap-1.5">
                      <Trophy className="w-4 h-4" />
                      오늘의 사건 해결 완료!
                    </p>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Clock className="w-3.5 h-3.5" />
                      다음 사건까지 {countdown}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-slate-400">전 세계 탐정들이 같은 사건에 도전합니다</p>
                    <motion.button
                      onClick={() => navigate('/new-game?mode=daily')}
                      className="inline-flex items-center gap-2.5 px-7 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl font-bold text-white shadow-lg shadow-blue-500/25"
                      whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.35)' }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Play className="w-5 h-5" fill="currentColor" />
                      오늘의 사건을 풀어보세요
                      <ChevronRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                )}
              </div>

              {/* Right: Streak Display */}
              <div className="flex md:flex-col items-center gap-4 md:gap-2 md:min-w-[120px]">
                <div className="flex flex-col items-center p-4 rounded-2xl bg-slate-800/60 border border-white/5">
                  <FlameIcon streak={currentStreak} />
                  <span className="text-3xl font-black text-white mt-1">{currentStreak}</span>
                  <span className="text-xs text-slate-400 mt-0.5">연속 기록</span>
                </div>
                {longestStreak > 0 && (
                  <div className="text-center">
                    <span className="text-xs text-slate-500">최장 {longestStreak}일</span>
                  </div>
                )}
              </div>
            </div>

            {/* Share Button (when completed) */}
            {dailyChallengeCompleted && (
              <motion.button
                className="absolute top-4 right-4 p-2 glass rounded-lg text-slate-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  const text = `DEDUCTIO #${dailyNumber}\n랭크: ${dailyChallengeResult?.rank} | 점수: ${dailyChallengeResult?.score}\n연속: ${currentStreak}일\nhttps://deductio.game`;
                  navigator.clipboard?.writeText(text);
                }}
              >
                <Share2 className="w-4 h-4" />
              </motion.button>
            )}
          </motion.div>
        </motion.div>

        {/* ===== 3. Quick Stats Bar ===== */}
        <motion.div variants={item} className="mb-10">
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 cursor-pointer"
            onClick={() => navigate('/stats')}
          >
            {quickStats.map((stat, i) => (
              <motion.div
                key={i}
                className="glass p-4 rounded-xl text-center group hover:bg-white/5 transition-all"
                whileHover={{ scale: 1.03, y: -2 }}
              >
                <stat.icon className={`w-5 h-5 ${stat.color} mx-auto mb-1.5`} />
                <div className="text-2xl font-bold text-white">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* ===== 4. Game Modes Section ===== */}
        <motion.div variants={item} className="mb-10">
          <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            게임 모드
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {gameModes.map((mode, i) => (
              <motion.button
                key={mode.id}
                onClick={() => navigate(mode.route)}
                className={`relative group text-left overflow-hidden rounded-2xl border ${mode.borderColor} ${mode.bgGlow} backdrop-blur-sm p-5 sm:p-6 transition-all hover:bg-white/5`}
                whileHover={{ scale: 1.02, y: -3 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                {/* Gradient accent line */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${mode.gradient}`} />

                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${mode.gradient} shadow-lg flex-shrink-0`}>
                    <mode.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                      {mode.title}
                      {mode.id === 'daily' && !dailyChallengeCompleted && (
                        <span className="px-1.5 py-0.5 bg-blue-500/20 text-blue-400 text-[10px] rounded-full font-medium animate-pulse">
                          NEW
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-slate-400">{mode.desc}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-white group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* ===== Main CTA ===== */}
        <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <motion.button
            onClick={() => navigate('/new-game')}
            className="group px-10 py-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl font-bold text-lg text-slate-900 shadow-xl shadow-amber-500/30 w-full sm:w-auto"
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(251, 191, 36, 0.35)' }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="flex items-center justify-center gap-3">
              <Play className="w-6 h-6" fill="currentColor" />
              새 게임 시작
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.button>

          <motion.button
            onClick={() => navigate('/tutorial')}
            className="px-8 py-4 glass rounded-xl font-medium text-slate-200 hover:bg-white/10 transition-all w-full sm:w-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="flex items-center justify-center gap-2">
              <BookOpen className="w-5 h-5" />
              튜토리얼
            </span>
          </motion.button>
        </motion.div>

        {/* ===== 5. Features Showcase ===== */}
        <motion.div variants={item} className="mb-10">
          <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
            <Eye className="w-5 h-5 text-blue-400" />
            핵심 시스템
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={i}
                className="glass p-6 rounded-2xl group"
                whileHover={{ scale: 1.03, y: -4 }}
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${f.color} mb-4 shadow-lg`}>
                  <f.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{f.title}</h3>
                <p className="text-sm font-medium text-amber-400/80 mb-2">{f.desc}</p>
                <p className="text-sm text-slate-400">{f.detail}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ===== 6. Achievement Preview ===== */}
        <motion.div variants={item} className="mb-10">
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                업적
              </h2>
              <button
                onClick={() => navigate('/achievements')}
                className="text-sm text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1"
              >
                전체 보기 <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-slate-400">{unlockedAchievements.length}/30 업적 해금</span>
                <span className="text-amber-400 font-medium">{Math.round((unlockedAchievements.length / 30) * 100)}%</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(unlockedAchievements.length / 30) * 100}%` }}
                  transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* Recent Achievements */}
            {unlockedAchievements.length > 0 ? (
              <div className="space-y-2">
                <p className="text-xs text-slate-500 mb-2">최근 해금된 업적</p>
                {unlockedAchievements.slice(-3).reverse().map((ach, i) => (
                  <div key={ach.id} className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl border border-white/5">
                    <div className="p-2 rounded-lg bg-amber-500/10">
                      <Award className="w-4 h-4 text-amber-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-white truncate">{ach.name}</div>
                      <div className="text-xs text-slate-500 truncate">{ach.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <Lock className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <p className="text-sm text-slate-500">게임을 플레이하여 업적을 해금하세요</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* ===== 7. Statistics Preview ===== */}
        <motion.div variants={item} className="mb-10">
          <motion.div
            className="glass rounded-2xl p-6 cursor-pointer group"
            onClick={() => navigate('/stats')}
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-400" />
                나의 통계
              </h2>
              <span className="text-sm text-blue-400 group-hover:text-blue-300 transition-colors flex items-center gap-1">
                상세 보기 <ChevronRight className="w-4 h-4" />
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-slate-800/50 rounded-xl">
                <div className="text-2xl font-bold text-white">{totalGamesPlayed}</div>
                <div className="text-xs text-slate-500">총 게임</div>
              </div>
              <div className="text-center p-3 bg-slate-800/50 rounded-xl">
                <div className="text-2xl font-bold text-white">{winRate}%</div>
                <div className="text-xs text-slate-500">승률</div>
              </div>
              <div className="text-center p-3 bg-slate-800/50 rounded-xl">
                <div className="text-2xl font-bold text-white">{bestRank || '-'}</div>
                <div className="text-xs text-slate-500">최고 랭크</div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ===== 8. Content Stats ===== */}
        <motion.div variants={item} className="mb-10">
          <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-400" />
            게임 콘텐츠
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {contentStats.map((s, i) => (
              <motion.div
                key={i}
                className="glass p-4 rounded-xl text-center"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <s.icon className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-white">{s.value}</div>
                <div className="text-xs text-slate-500">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ===== 9. Footer ===== */}
        <motion.footer variants={item} className="text-center pt-8 border-t border-white/5">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Fingerprint className="w-4 h-4 text-amber-500/60" />
            <span className="text-sm text-slate-500">DEDUCTIO v6.0 - Premium Edition</span>
          </div>
          <p className="text-xs text-slate-600 mb-4">
            102+ 시나리오 | 8종 퍼즐 | 세계 100대 게임 DNA
          </p>
          <div className="flex justify-center gap-3">
            <motion.button
              onClick={() => navigate('/settings')}
              className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-slate-400 hover:text-white transition-colors text-sm"
              whileHover={{ scale: 1.05 }}
            >
              <Settings className="w-4 h-4" />
              설정
            </motion.button>
          </div>
        </motion.footer>
      </motion.div>
    </div>
  );
}
