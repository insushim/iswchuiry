import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import { useMetaStore } from '../../store/metaStore';
import {
  Trophy, Star, Clock, Search, Brain,
  Home, RotateCcw, User, AlertCircle, Sparkles,
  ChevronRight, X, Award, Target, Share2, Check
} from 'lucide-react';
import { formatTime, formatScore } from '../../utils/helpers';

const RANK_CONFIG: Record<string, { color: string; bg: string; text: string; icon: React.ElementType; glow: string }> = {
  S: { color: 'from-amber-400 to-yellow-300', bg: 'bg-amber-500/20', text: '전설의 탐정', icon: Trophy, glow: 'shadow-amber-500/40' },
  A: { color: 'from-purple-400 to-pink-300', bg: 'bg-purple-500/20', text: '명탐정', icon: Award, glow: 'shadow-purple-500/40' },
  B: { color: 'from-blue-400 to-cyan-300', bg: 'bg-blue-500/20', text: '숙련 탐정', icon: Target, glow: 'shadow-blue-500/40' },
  C: { color: 'from-green-400 to-emerald-300', bg: 'bg-green-500/20', text: '탐정 견습생', icon: Search, glow: 'shadow-green-500/40' },
  D: { color: 'from-orange-400 to-amber-300', bg: 'bg-orange-500/20', text: '초보 탐정', icon: Brain, glow: 'shadow-orange-500/40' },
  F: { color: 'from-slate-400 to-slate-300', bg: 'bg-slate-500/20', text: '재도전 필요', icon: RotateCcw, glow: 'shadow-slate-500/40' }
};

export function RevealPhase() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {
    currentCase, accusationResult, score, playTime,
    hintsUsed, collectedEvidence, confirmedFacts,
    statistics, resetGame
  } = useGameStore();
  const { recordGameResult, completeDailyChallenge, unlockAchievement } = useMetaStore();

  // 게임 모드 감지 (URL 파라미터 기반)
  const gameMode = searchParams.get('dailyMode') === 'true' ? 'daily'
    : searchParams.get('timeLimit') ? 'timeattack'
    : searchParams.get('brainMode') === 'true' ? 'brain'
    : 'classic';

  const [revealStep, setRevealStep] = useState(0);
  const [copied, setCopied] = useState(false);
  const [recorded, setRecorded] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setRevealStep(prev => prev < 6 ? prev + 1 : prev);
    }, 700);
    return () => clearInterval(timer);
  }, []);

  // Record game result + daily challenge + achievements once
  useEffect(() => {
    if (!recorded && currentCase && accusationResult) {
      const totalScore = accusationResult.totalScore || score;
      const rank = accusationResult.rank || 'F';
      const isCorrect = accusationResult.isCorrect;

      recordGameResult({
        score: totalScore,
        rank,
        difficulty: currentCase.difficulty as 'easy' | 'medium' | 'hard' | 'expert',
        won: isCorrect,
        timeSeconds: playTime,
        caseTitle: currentCase.title,
        mode: gameMode,
      });

      // 일일 도전 완료 기록
      if (gameMode === 'daily') {
        completeDailyChallenge({ rank, score: totalScore, time: playTime, correct: isCorrect });
      }

      // 업적 해금 체크
      const now = Date.now();
      if (isCorrect) {
        unlockAchievement({ id: 'first_case_solved', name: '첫 사건 해결', description: '첫 번째 사건을 성공적으로 해결했습니다.', icon: '🔍', unlockedAt: now });
      }
      if (rank === 'S') {
        unlockAchievement({ id: 's_rank_1', name: '명탐정의 자질', description: 'S 랭크를 1회 달성했습니다.', icon: '⭐', unlockedAt: now });
      }
      if (hintsUsed === 0 && isCorrect) {
        unlockAchievement({ id: 'no_hint_clear', name: '직감의 탐정', description: '힌트를 한 번도 사용하지 않고 사건을 해결했습니다.', icon: '🎯', unlockedAt: now });
      }
      if (currentCase.evidence.length > 0 && collectedEvidence.length === currentCase.evidence.length) {
        unlockAchievement({ id: 'all_evidence_collected', name: '증거 수집가', description: '한 사건에서 모든 증거를 수집했습니다.', icon: '📦', unlockedAt: now });
      }
      if (hintsUsed === 0 && collectedEvidence.length === currentCase.evidence.length && rank === 'S') {
        unlockAchievement({ id: 'flawless_victory', name: '완벽한 승리', description: '힌트 0, 모든 증거 수집, S 랭크를 동시에 달성했습니다.', icon: '👑', unlockedAt: now });
      }
      if (playTime <= 600 && isCorrect) {
        unlockAchievement({ id: 'speed_10min', name: '번개 추리', description: '10분 이내에 사건을 해결했습니다.', icon: '⚡', unlockedAt: now });
      }
      if (playTime <= 300 && isCorrect) {
        unlockAchievement({ id: 'speed_5min', name: '직감의 번개', description: '5분 이내에 사건을 해결했습니다.', icon: '⚡', unlockedAt: now });
      }
      if (playTime <= 180 && isCorrect) {
        unlockAchievement({ id: 'speed_3min', name: '순간 포착', description: '3분 이내에 사건을 해결했습니다.', icon: '💨', unlockedAt: now });
      }
      if (gameMode === 'daily') {
        unlockAchievement({ id: 'daily_first', name: '오늘의 사건', description: '첫 번째 일일 도전을 완료했습니다.', icon: '📅', unlockedAt: now });
      }
      const hour = new Date().getHours();
      if (hour >= 0 && hour < 5) {
        unlockAchievement({ id: 'night_owl', name: '야행성 탐정', description: '자정(00:00~05:00)에 사건을 해결했습니다.', icon: '🦉', unlockedAt: now });
      }
      if (hour >= 5 && hour < 7) {
        unlockAchievement({ id: 'early_bird', name: '새벽 탐정', description: '이른 아침(05:00~07:00)에 사건을 해결했습니다.', icon: '🌅', unlockedAt: now });
      }

      setRecorded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recorded, currentCase, accusationResult]);

  if (!currentCase || !accusationResult) return null;

  const culprit = currentCase.characters.find(c => c.id === currentCase.culpritId);
  const accused = currentCase.characters.find(c => c.id === accusationResult.accusedId);
  const isCorrect = accusationResult.isCorrect;
  const rank = accusationResult.rank || 'F';
  const rankConfig = RANK_CONFIG[rank];
  const RankIcon = rankConfig.icon;

  const handleNewGame = () => { resetGame(); navigate('/new-game'); };
  const handleHome = () => { resetGame(); navigate('/'); };

  const handleShare = () => {
    const stars = accusationResult.stars || 0;
    const starStr = '⭐'.repeat(stars) + '☆'.repeat(3 - stars);
    const evidenceRate = currentCase.evidence.length > 0
      ? `${collectedEvidence.length}/${currentCase.evidence.length}`
      : '-';
    const text = [
      `🔍 DEDUCTIO - ${currentCase.title}`,
      `랭크: ${rank} | ${starStr}`,
      `점수: ${formatScore(accusationResult.totalScore || score)}`,
      `시간: ${formatTime(playTime)}`,
      `증거: ${evidenceRate}`,
      ``,
      `https://deductio.game`
    ].join('\n');

    navigator.clipboard?.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const stats = [
    { icon: Clock, label: '플레이 시간', value: formatTime(playTime), color: 'text-blue-400' },
    { icon: Search, label: '수집한 증거', value: `${collectedEvidence.length}/${currentCase.evidence.length}`, color: 'text-green-400' },
    { icon: Brain, label: '정확한 추론', value: `${accusationResult.correctDeductions || 0}개`, color: 'text-purple-400' },
    { icon: Star, label: '사용한 힌트', value: `${hintsUsed}회`, color: 'text-amber-400' }
  ];

  const scoreBreakdown = [
    { label: '기본 점수', value: isCorrect ? 500 : 0 },
    { label: '증거 수집 점수', value: accusationResult.evidenceScore || 0 },
    { label: '추론 점수', value: accusationResult.deductionScore || 0 },
    { label: '시간 보너스', value: accusationResult.timeBonus || 0 }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 overflow-y-auto">
      <div className="flex-1 flex flex-col items-center justify-start p-6 pt-12">
        <div className="max-w-2xl w-full">

          {/* Result Header */}
          <AnimatePresence>
            {revealStep >= 1 && (
              <motion.div
                className="text-center mb-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div
                  className={`w-28 h-28 rounded-full mx-auto mb-5 flex items-center justify-center shadow-2xl ${
                    isCorrect
                      ? 'bg-gradient-to-br from-amber-400 to-amber-600 ' + rankConfig.glow
                      : 'bg-gradient-to-br from-slate-500 to-slate-700'
                  }`}
                  animate={isCorrect ? {
                    boxShadow: ['0 0 20px rgba(251,191,36,0.3)', '0 0 50px rgba(251,191,36,0.6)', '0 0 20px rgba(251,191,36,0.3)']
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {isCorrect ? (
                    <Trophy size={52} className="text-white" />
                  ) : (
                    <X size={52} className="text-white" />
                  )}
                </motion.div>

                <motion.h1
                  className={`text-4xl font-black mb-2 ${
                    isCorrect
                      ? 'bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent'
                      : 'text-slate-400'
                  }`}
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {isCorrect ? '사건 해결!' : '아쉽습니다...'}
                </motion.h1>
                <motion.p
                  className="text-slate-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {isCorrect ? '진범을 찾아냈습니다.' : '범인을 찾지 못했습니다.'}
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Culprit Reveal */}
          <AnimatePresence>
            {revealStep >= 2 && (
              <motion.div
                className="card mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500/30 to-rose-600/30 border-2 border-red-500/40 flex items-center justify-center">
                    <User size={28} className="text-red-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">진범</p>
                    <p className="text-2xl font-bold text-white">{culprit?.name}</p>
                    <p className="text-sm text-slate-400">{culprit?.occupation}</p>
                  </div>
                </div>

                {!isCorrect && accused && (
                  <div className="mb-4 p-3 bg-slate-700/30 rounded-lg">
                    <p className="text-xs text-slate-500 mb-1">당신이 지목한 사람</p>
                    <p className="text-lg text-slate-300">{accused.name} <span className="text-slate-500 text-sm">({accused.occupation})</span></p>
                  </div>
                )}

                <div className="border-t border-slate-700 pt-4 mb-4">
                  <p className="text-xs text-slate-500 mb-2 flex items-center gap-1">
                    <AlertCircle size={12} /> 동기
                  </p>
                  <p className="text-white text-sm leading-relaxed">{currentCase.motive}</p>
                </div>

                <div>
                  <p className="text-xs text-slate-500 mb-2">진실</p>
                  <p className="text-slate-300 text-sm leading-relaxed">{currentCase.solution.explanation}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Rank & Score */}
          <AnimatePresence>
            {revealStep >= 3 && (
              <motion.div
                className="card mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="text-center">
                    <motion.div
                      className={`w-20 h-20 rounded-2xl ${rankConfig.bg} flex items-center justify-center mb-2 shadow-lg ${rankConfig.glow}`}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', bounce: 0.5, delay: 0.2 }}
                    >
                      <RankIcon size={36} className={`bg-gradient-to-r ${rankConfig.color} bg-clip-text`} style={{ color: 'inherit' }} />
                    </motion.div>
                    <motion.p
                      className={`text-3xl font-black bg-gradient-to-r ${rankConfig.color} bg-clip-text text-transparent`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      {rank} 랭크
                    </motion.p>
                    <p className="text-sm text-slate-400">{rankConfig.text}</p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-slate-500 mb-1">최종 점수</p>
                    <motion.p
                      className="text-4xl font-black bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4, type: 'spring' }}
                    >
                      {formatScore(accusationResult.totalScore || score)}
                    </motion.p>
                    <p className="text-xs text-slate-500 mt-1">
                      {currentCase.difficulty === 'easy' ? '쉬움' :
                       currentCase.difficulty === 'medium' ? '보통' :
                       currentCase.difficulty === 'hard' ? '어려움' : '전문가'}
                    </p>

                    {accusationResult.stars !== undefined && accusationResult.stars > 0 && (
                      <div className="flex items-center justify-end gap-1 mt-2">
                        {[1, 2, 3].map(i => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6 + i * 0.15 }}
                          >
                            <Star
                              size={20}
                              className={i <= (accusationResult.stars || 0) ? 'text-amber-400' : 'text-slate-600'}
                              fill={i <= (accusationResult.stars || 0) ? 'currentColor' : 'none'}
                            />
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Score breakdown */}
                <div className="border-t border-slate-700 pt-4">
                  <p className="text-xs text-slate-500 mb-3">점수 상세</p>
                  <div className="space-y-2">
                    {scoreBreakdown.map((item, i) => (
                      <motion.div
                        key={i}
                        className="flex justify-between text-sm"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * i }}
                      >
                        <span className="text-slate-500">{item.label}</span>
                        <span className={`font-medium ${item.value > 0 ? 'text-green-400' : 'text-slate-500'}`}>
                          +{formatScore(item.value)}
                        </span>
                      </motion.div>
                    ))}
                    <div className="border-t border-slate-700 pt-2 mt-2 flex justify-between text-sm font-bold">
                      <span className="text-slate-300">합계</span>
                      <span className="text-amber-400">{formatScore(accusationResult.totalScore || score)}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Statistics */}
          <AnimatePresence>
            {revealStep >= 4 && (
              <motion.div
                className="grid grid-cols-2 gap-4 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {stats.map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={i}
                      className="card text-center"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Icon className={`mx-auto mb-2 ${stat.color}`} size={22} />
                      <p className="text-xs text-slate-500 mb-1">{stat.label}</p>
                      <p className="text-lg font-bold text-white">{stat.value}</p>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Missed Clues */}
          <AnimatePresence>
            {revealStep >= 5 && accusationResult.missedClues && accusationResult.missedClues.length > 0 && (
              <motion.div
                className="card mb-6 border-amber-500/30"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle size={16} className="text-amber-400" />
                  <h3 className="text-sm text-amber-400 font-semibold">놓친 단서</h3>
                </div>
                <ul className="space-y-2">
                  {accusationResult.missedClues.map((clue, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="text-sm text-slate-400 flex items-start gap-2"
                    >
                      <span className="text-amber-400/60 mt-0.5">•</span>
                      <span>{clue}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Feedback */}
          <AnimatePresence>
            {revealStep >= 5 && accusationResult.feedback && accusationResult.feedback.length > 0 && (
              <motion.div
                className="card mb-6 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-indigo-500/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles size={16} className="text-indigo-400" />
                  <h3 className="text-sm text-indigo-400 font-semibold">탐정의 평가</h3>
                </div>
                {accusationResult.feedback.map((text, i) => (
                  <p key={i} className="text-slate-300 text-sm leading-relaxed mb-1">{text}</p>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Share + Buttons */}
          <AnimatePresence>
            {revealStep >= 6 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {/* Share Card */}
                <motion.button
                  onClick={handleShare}
                  className="w-full mb-4 p-4 glass rounded-xl flex items-center justify-center gap-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {copied ? (
                    <><Check size={16} className="text-green-400" /> <span className="text-green-400">클립보드에 복사됨!</span></>
                  ) : (
                    <><Share2 size={16} /> 결과 공유하기</>
                  )}
                </motion.button>

                {/* Record notification */}
                {recorded && (
                  <motion.p
                    className="text-center text-xs text-slate-500 mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    게임 결과가 통계에 기록되었습니다
                  </motion.p>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4 pb-8">
                  <motion.button
                    onClick={handleHome}
                    className="flex-1 btn-secondary py-3.5 flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Home size={18} />
                    홈으로
                  </motion.button>
                  <motion.button
                    onClick={handleNewGame}
                    className="flex-1 btn-accent py-3.5 flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    animate={{ boxShadow: ['0 0 10px rgba(251,191,36,0.2)', '0 0 25px rgba(251,191,36,0.4)', '0 0 10px rgba(251,191,36,0.2)'] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <RotateCcw size={18} />
                    새 사건
                    <ChevronRight size={16} />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
