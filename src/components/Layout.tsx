import React from 'react';
import { useGameStore } from '../store/gameStore';
import { formatTime, formatScore } from '../utils/helpers';
import { Clock, Search, Lightbulb } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
}

export function Layout({ children, showHeader = true }: LayoutProps) {
  const { currentCase, phase, score, playTime, hintsRemaining, collectedEvidence } = useGameStore();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {showHeader && currentCase && phase !== 'intro' && phase !== 'reveal' && (
        <header className="h-16 bg-slate-900/90 backdrop-blur-sm border-b border-slate-700 px-4 flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-bold text-white truncate max-w-[200px]">
              {currentCase.title}
            </h1>
            <span className="hidden md:inline px-2 py-1 bg-indigo-500/20 text-indigo-300 text-sm rounded">
              {phase === 'investigation' ? '조사 중' :
               phase === 'interrogation' ? '심문 중' :
               phase === 'deduction' ? '추론 중' :
               phase === 'accusation' ? '고발' : ''}
            </span>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <div className="hidden md:flex items-center gap-2 text-slate-300">
              <Search size={16} className="text-green-400" />
              <span className="text-sm">{collectedEvidence.length}/{currentCase.evidence.length}</span>
            </div>

            <div className="flex items-center gap-2 text-slate-300">
              <Clock size={16} className="text-blue-400" />
              <span className="text-sm">{formatTime(playTime)}</span>
            </div>

            <div className="flex items-center gap-2 text-amber-400 font-bold">
              <span className="text-sm">{formatScore(score)} P</span>
            </div>

            <div className="flex items-center gap-2 text-purple-400">
              <Lightbulb size={16} />
              <span className="text-sm">{hintsRemaining}</span>
            </div>
          </div>
        </header>
      )}

      <main className="flex-1 overflow-hidden">
        {children}
      </main>
    </div>
  );
}
