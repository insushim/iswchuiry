import React, { useState, useEffect } from 'react';
import { useGameStore } from '../../store/gameStore';
import { ChevronRight, Search } from 'lucide-react';

export function IntroPhase() {
  const { currentCase, setPhase } = useGameStore();
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  if (!currentCase) return null;

  const lines = currentCase.introduction;

  // 타이핑 효과
  useEffect(() => {
    if (currentLine >= lines.length) return;

    const line = lines[currentLine];
    let charIndex = 0;
    setIsTyping(true);
    setDisplayedText('');

    const interval = setInterval(() => {
      if (charIndex < line.length) {
        setDisplayedText(line.slice(0, charIndex + 1));
        charIndex++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [currentLine, lines]);

  const handleNext = () => {
    if (isTyping) {
      // 타이핑 중이면 전체 텍스트 표시
      setDisplayedText(lines[currentLine]);
      setIsTyping(false);
    } else if (currentLine < lines.length - 1) {
      // 다음 줄로
      setCurrentLine(prev => prev + 1);
    } else {
      // 조사 단계로
      setPhase('investigation');
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 cursor-pointer"
      onClick={handleNext}
    >
      {/* 상단 타이틀 */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Search size={32} className="text-amber-400" />
          <span className="text-amber-400 text-lg">새로운 사건</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          {currentCase.title}
        </h1>
        <p className="text-slate-400">
          난이도: {currentCase.difficulty === 'easy' ? '쉬움' :
                   currentCase.difficulty === 'medium' ? '보통' :
                   currentCase.difficulty === 'hard' ? '어려움' : '전문가'}
        </p>
      </div>

      {/* 대화 박스 */}
      <div className="w-full max-w-2xl">
        <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-slate-700 min-h-[150px]">
          <p className="text-xl text-white leading-relaxed">
            {displayedText}
            {isTyping && <span className="animate-pulse">|</span>}
          </p>
        </div>

        {/* 진행 표시 */}
        <div className="mt-4 flex items-center justify-between text-slate-500">
          <div className="flex gap-2">
            {lines.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${i <= currentLine ? 'bg-amber-400' : 'bg-slate-700'}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2 text-sm">
            <span>클릭하여 계속</span>
            <ChevronRight size={16} />
          </div>
        </div>
      </div>

      {/* 하단 안내 */}
      {currentLine === lines.length - 1 && !isTyping && (
        <div className="mt-8 animate-pulse">
          <button className="btn-accent px-8 py-3 flex items-center gap-2">
            조사 시작
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
