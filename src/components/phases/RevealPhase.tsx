import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../../store/gameStore';
import {
  Trophy, Star, Clock, Search, Brain,
  Home, RotateCcw, Check, X, User
} from 'lucide-react';
import { formatTime, formatScore } from '../../utils/helpers';

export function RevealPhase() {
  const navigate = useNavigate();
  const {
    currentCase,
    accusationResult,
    score,
    playTime,
    hintsUsed,
    collectedEvidence,
    confirmedFacts,
    resetGame
  } = useGameStore();

  const [revealStep, setRevealStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRevealStep(prev => prev < 4 ? prev + 1 : prev);
    }, 800);
    return () => clearInterval(timer);
  }, []);

  if (!currentCase || !accusationResult) return null;

  const culprit = currentCase.characters.find(c => c.id === currentCase.culpritId);
  const accused = currentCase.characters.find(c => c.id === accusationResult.accusedId);
  const isCorrect = accusationResult.isCorrect;

  const handleNewGame = () => {
    resetGame();
    navigate('/new-game');
  };

  const handleHome = () => {
    resetGame();
    navigate('/');
  };

  const stats = [
    { icon: Clock, label: '플레이 시간', value: formatTime(playTime) },
    { icon: Search, label: '수집한 증거', value: `${collectedEvidence.length}/${currentCase.evidence.length}` },
    { icon: Brain, label: '확정된 사실', value: `${confirmedFacts.length}개` },
    { icon: Star, label: '사용한 힌트', value: `${hintsUsed}회` }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-2xl w-full">
        {/* 결과 헤더 */}
        {revealStep >= 1 && (
          <div className="text-center mb-8 animate-fade-in">
            <div className={`w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center ${
              isCorrect
                ? 'bg-gradient-to-br from-amber-400 to-amber-600 animate-pulse'
                : 'bg-gradient-to-br from-slate-500 to-slate-700'
            }`}>
              {isCorrect ? (
                <Trophy size={48} className="text-white" />
              ) : (
                <X size={48} className="text-white" />
              )}
            </div>

            <h1 className={`text-4xl font-bold mb-2 ${
              isCorrect
                ? 'bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent'
                : 'text-slate-400'
            }`}>
              {isCorrect ? '사건 해결!' : '아쉽습니다...'}
            </h1>

            <p className="text-slate-400">
              {isCorrect
                ? '훌륭합니다! 진범을 찾아냈습니다.'
                : '범인을 찾지 못했습니다.'}
            </p>
          </div>
        )}

        {/* 진범 공개 */}
        {revealStep >= 2 && (
          <div className="card mb-6 animate-fade-in">
            <h3 className="text-sm text-slate-400 mb-2">진범</h3>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
                <User size={32} className="text-red-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{culprit?.name}</p>
                <p className="text-slate-400">{culprit?.occupation}</p>
              </div>
            </div>

            {!isCorrect && accused && (
              <div className="mt-4 pt-4 border-t border-slate-700">
                <p className="text-sm text-slate-400">당신이 지목한 사람</p>
                <p className="text-lg text-slate-300">{accused.name}</p>
              </div>
            )}

            <div className="mt-4 pt-4 border-t border-slate-700">
              <p className="text-sm text-slate-400 mb-2">동기</p>
              <p className="text-white">{currentCase.motive}</p>
            </div>

            <div className="mt-4">
              <p className="text-sm text-slate-400 mb-2">진실</p>
              <p className="text-slate-300 text-sm">{currentCase.solution.explanation}</p>
            </div>
          </div>
        )}

        {/* 점수 */}
        {revealStep >= 3 && (
          <div className={`card mb-6 text-center animate-fade-in ${
            isCorrect ? 'bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border-amber-500/30' : ''
          }`}>
            <h3 className="text-sm text-slate-400 mb-2">최종 점수</h3>
            <p className="text-5xl font-bold bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
              {formatScore(score)}
            </p>
            <p className="text-slate-400 mt-2">
              난이도: {currentCase.difficulty === 'easy' ? '쉬움' :
                       currentCase.difficulty === 'medium' ? '보통' :
                       currentCase.difficulty === 'hard' ? '어려움' : '전문가'}
            </p>
          </div>
        )}

        {/* 통계 */}
        {revealStep >= 3 && (
          <div className="grid grid-cols-2 gap-4 mb-6 animate-fade-in">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="card text-center">
                  <Icon className="mx-auto mb-2 text-indigo-400" size={24} />
                  <p className="text-sm text-slate-400">{stat.label}</p>
                  <p className="text-lg font-bold text-white">{stat.value}</p>
                </div>
              );
            })}
          </div>
        )}

        {/* 버튼 */}
        {revealStep >= 4 && (
          <div className="flex gap-4 animate-fade-in">
            <button
              onClick={handleHome}
              className="flex-1 btn-secondary py-3 flex items-center justify-center gap-2"
            >
              <Home size={18} />
              홈으로
            </button>
            <button
              onClick={handleNewGame}
              className="flex-1 btn-accent py-3 flex items-center justify-center gap-2"
            >
              <RotateCcw size={18} />
              새 사건
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
