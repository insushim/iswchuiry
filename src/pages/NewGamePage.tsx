import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Star, Zap, Crown, Skull } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { Difficulty } from '../types';

const difficulties: {
  key: Difficulty;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  details: string[];
}[] = [
  {
    key: 'easy',
    name: '쉬움',
    description: '추리 게임이 처음이라면 여기서!',
    icon: Star,
    color: 'from-green-500 to-emerald-600',
    details: ['용의자 3-4명', '힌트 10회', '미끼 없음']
  },
  {
    key: 'medium',
    name: '보통',
    description: '적당한 도전을 원한다면',
    icon: Zap,
    color: 'from-blue-500 to-indigo-600',
    details: ['용의자 4-5명', '힌트 5회', '미끼 2개']
  },
  {
    key: 'hard',
    name: '어려움',
    description: '숙련된 탐정을 위한 도전',
    icon: Crown,
    color: 'from-orange-500 to-red-600',
    details: ['용의자 5-6명', '힌트 3회', '미끼 3개']
  },
  {
    key: 'expert',
    name: '전문가',
    description: '최고의 탐정만이 해결 가능',
    icon: Skull,
    color: 'from-purple-500 to-pink-600',
    details: ['용의자 6-7명', '힌트 1회', '미끼 5개']
  }
];

export function NewGamePage() {
  const navigate = useNavigate();
  const { startNewGame } = useGameStore();
  const [selected, setSelected] = useState<Difficulty>('medium');
  const [isLoading, setIsLoading] = useState(false);

  const handleStart = async () => {
    setIsLoading(true);

    // 로딩 효과
    await new Promise(resolve => setTimeout(resolve, 1000));

    startNewGame(selected);
    navigate('/game');
  };

  const selectedDiff = difficulties.find(d => d.key === selected)!;

  return (
    <div className="min-h-screen bg-slate-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/')}
            className="p-2 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="text-slate-400" />
          </button>
          <h1 className="text-3xl font-bold text-white">새 게임</h1>
        </div>

        {/* 난이도 선택 */}
        <div className="mb-8">
          <h2 className="text-xl font-medium text-slate-300 mb-4">난이도 선택</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {difficulties.map((diff) => {
              const Icon = diff.icon;
              const isSelected = selected === diff.key;

              return (
                <button
                  key={diff.key}
                  onClick={() => setSelected(diff.key)}
                  className={`
                    relative p-4 rounded-xl border-2 transition-all transform hover:scale-105
                    ${isSelected
                      ? 'border-white bg-slate-800'
                      : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'}
                  `}
                >
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${diff.color} flex items-center justify-center mb-3 mx-auto`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <h3 className="font-bold text-white mb-1">{diff.name}</h3>
                  <p className="text-xs text-slate-400">{diff.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* 선택된 난이도 상세 */}
        <div className="card mb-8">
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-xl bg-gradient-to-br ${selectedDiff.color}`}>
              <selectedDiff.icon size={32} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-2">{selectedDiff.name} 난이도</h3>
              <p className="text-slate-400 mb-4">{selectedDiff.description}</p>

              <div className="flex flex-wrap gap-3">
                {selectedDiff.details.map((detail, i) => (
                  <span key={i} className="px-3 py-1 bg-slate-700 rounded-full text-sm text-slate-300">
                    {detail}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 시작 버튼 */}
        <div className="flex justify-center">
          <button
            onClick={handleStart}
            disabled={isLoading}
            className="btn-accent px-12 py-4 text-xl flex items-center gap-3 transform hover:scale-105 transition-all disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <div className="w-6 h-6 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                사건 생성 중...
              </>
            ) : (
              <>
                <Play size={28} />
                사건 시작!
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
