import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Puzzle, Check, RotateCcw } from 'lucide-react';
import { PatternMatchData, PatternCard } from '../../types/puzzles';

interface PatternMatchPuzzleProps {
  data: PatternMatchData;
  onSolve: (score: number) => void;
}

export function PatternMatchPuzzle({ data, onSolve }: PatternMatchPuzzleProps) {
  const [flipped, setFlipped] = useState<Set<string>>(new Set());
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<string[]>([]);
  const [isSolved, setIsSolved] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showPeek, setShowPeek] = useState(true);
  const [isChecking, setIsChecking] = useState(false);

  const totalPairs = data.matchPairs.length;
  const matchedPairs = matched.size / 2;

  // 처음 2초간 카드 미리보기
  useEffect(() => {
    const timer = setTimeout(() => setShowPeek(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleCardClick = (cardId: string) => {
    if (isSolved || isChecking || matched.has(cardId) || selected.includes(cardId)) return;
    if (selected.length >= 2) return;

    const newSelected = [...selected, cardId];
    setSelected(newSelected);
    setFlipped(prev => new Set(prev).add(cardId));

    if (newSelected.length === 2) {
      setIsChecking(true);
      setAttempts(prev => prev + 1);

      const [a, b] = newSelected;
      const isMatch = data.matchPairs.some(
        ([x, y]) => (x === a && y === b) || (x === b && y === a)
      );

      setTimeout(() => {
        if (isMatch) {
          setMatched(prev => {
            const next = new Set(prev);
            next.add(a);
            next.add(b);
            return next;
          });

          const newMatchedCount = matchedPairs + 1;
          if (newMatchedCount >= totalPairs) {
            setIsSolved(true);
            const score = Math.max(40, 120 - Math.max(0, attempts - totalPairs) * 10);
            setTimeout(() => onSolve(score), 1000);
          }
        } else {
          setFlipped(prev => {
            const next = new Set(prev);
            next.delete(a);
            next.delete(b);
            return next;
          });
        }
        setSelected([]);
        setIsChecking(false);
      }, 800);
    }
  };

  const getCard = (id: string) => data.cards.find(c => c.id === id);

  // 메모리 게임 레이아웃
  const gridCols = data.cards.length <= 8 ? 4 : data.cards.length <= 12 ? 4 : 5;

  return (
    <div className="space-y-4">
      {/* 진행도 */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2 text-slate-400">
          <Puzzle size={16} className="text-purple-400" />
          <span>매칭: {matchedPairs}/{totalPairs} 쌍</span>
        </div>
        <span className="text-slate-500">시도: {attempts}회</span>
      </div>

      {/* 카드 그리드 */}
      <motion.div
        className="grid gap-3"
        style={{ gridTemplateColumns: `repeat(${gridCols}, 1fr)` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {data.cards.map(card => {
          const isFlipped = showPeek || flipped.has(card.id) || matched.has(card.id);
          const isMatched = matched.has(card.id);
          const isSelected = selected.includes(card.id);

          return (
            <motion.button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              disabled={isSolved || isMatched}
              className={`relative aspect-square rounded-xl border-2 flex items-center justify-center text-2xl transition-all ${
                isMatched
                  ? 'bg-emerald-500/20 border-emerald-500/40'
                  : isSelected
                  ? 'bg-purple-500/20 border-purple-500/40'
                  : isFlipped
                  ? 'bg-slate-700/80 border-white/20'
                  : 'bg-slate-800/80 border-white/10 hover:border-purple-500/30 cursor-pointer'
              }`}
              whileHover={!isMatched && !isSolved ? { scale: 1.05 } : {}}
              whileTap={!isMatched && !isSolved ? { scale: 0.95 } : {}}
              animate={isMatched ? { scale: [1, 1.1, 1] } : {}}
            >
              <AnimatePresence mode="wait">
                {isFlipped ? (
                  <motion.div
                    key="front"
                    initial={{ rotateY: 90 }}
                    animate={{ rotateY: 0 }}
                    exit={{ rotateY: -90 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col items-center gap-1"
                  >
                    <span className="text-2xl">{card.front}</span>
                    <span className="text-[9px] text-slate-400 leading-tight">{card.back}</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="back"
                    initial={{ rotateY: -90 }}
                    animate={{ rotateY: 0 }}
                    exit={{ rotateY: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="text-slate-600 text-xl">?</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {isMatched && (
                <motion.div
                  className="absolute top-1 right-1"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring' }}
                >
                  <Check size={12} className="text-emerald-400" />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </motion.div>

      {/* 완료 */}
      <AnimatePresence>
        {isSolved && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl"
          >
            <Check size={40} className="text-emerald-400 mx-auto mb-2" />
            <p className="text-emerald-300 font-bold text-lg">패턴 매칭 성공!</p>
            <p className="text-slate-400 text-sm mt-1">{attempts}회 시도로 완료</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
