import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, BookOpen, Award, Settings, Search, TestTube2 } from 'lucide-react';

export function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-indigo-900/20 to-slate-900">
      {/* 배경 효과 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-indigo-400/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center max-w-lg mx-auto">
        {/* 로고 */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Search size={48} className="text-amber-400" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 bg-clip-text text-transparent mb-2">
            DEDUCTIO
          </h1>
          <p className="text-xl text-slate-400">
            AI가 만드는 무한한 추리 세계
          </p>
        </div>

        {/* 돋보기 애니메이션 */}
        <div className="text-6xl mb-8 animate-bounce">
          🔍
        </div>

        {/* 메뉴 버튼 */}
        <div className="flex flex-col gap-3 max-w-xs mx-auto">
          <button
            onClick={() => navigate('/new-game')}
            className="btn-accent py-4 text-lg flex items-center justify-center gap-3 transform hover:scale-105 transition-all"
          >
            <Play size={24} />
            새 게임
          </button>

          <button
            onClick={() => navigate('/tutorial')}
            className="btn-secondary py-3 flex items-center justify-center gap-3"
          >
            <BookOpen size={20} />
            게임 방법
          </button>

          <div className="flex gap-3 mt-2">
            <button
              onClick={() => alert('업적 기능은 추후 업데이트됩니다.')}
              className="flex-1 btn-secondary py-3 flex items-center justify-center gap-2"
            >
              <Award size={18} />
              업적
            </button>
            <button
              onClick={() => alert('설정 기능은 추후 업데이트됩니다.')}
              className="flex-1 btn-secondary py-3 flex items-center justify-center gap-2"
            >
              <Settings size={18} />
              설정
            </button>
          </div>

          {/* QA 대시보드 (개발자용) */}
          <button
            onClick={() => navigate('/qa')}
            className="mt-4 w-full py-2 flex items-center justify-center gap-2 text-sm text-slate-500 hover:text-slate-300 border border-slate-700 rounded-lg hover:border-slate-600 transition-colors"
          >
            <TestTube2 size={16} />
            QA 대시보드 (개발자)
          </button>
        </div>

        {/* 하단 정보 */}
        <p className="mt-12 text-slate-500 text-sm">
          2024 DEDUCTIO. 매 플레이마다 새로운 사건이 기다립니다.
        </p>
      </div>
    </div>
  );
}
