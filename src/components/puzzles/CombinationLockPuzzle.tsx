import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, ChevronUp, ChevronDown, Check } from 'lucide-react';
import { CombinationLockData } from '../../types/puzzles';

interface CombinationLockPuzzleProps {
  data: CombinationLockData;
  onSolve: (score: number) => void;
}

export function CombinationLockPuzzle({ data, onSolve }: CombinationLockPuzzleProps) {
  const [dialValues, setDialValues] = useState<number[]>(
    Array(data.dialCount).fill(0)
  );
  const [attempts, setAttempts] = useState(0);
  const [isSolved, setIsSolved] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);

  const rotateDial = (dialIndex: number, direction: 1 | -1) => {
    if (isSolved) return;
    setDialValues(prev => {
      const next = [...prev];
      const options = data.dialOptions[dialIndex];
      next[dialIndex] = ((next[dialIndex] + direction) % options.length + options.length) % options.length;
      return next;
    });
  };

  const getCurrentValues = (): string[] => {
    return dialValues.map((valIdx, dialIdx) => data.dialOptions[dialIdx][valIdx]);
  };

  const handleTryUnlock = () => {
    if (isSolved) return;
    setIsUnlocking(true);
    setAttempts(prev => prev + 1);

    const current = getCurrentValues();
    const isCorrect = current.every((val, i) => val === data.solution[i]);

    setTimeout(() => {
      setIsUnlocking(false);
      if (isCorrect) {
        setIsSolved(true);
        const score = Math.max(40, 100 - (attempts) * 15);
        setTimeout(() => onSolve(score), 1500);
      } else {
        setShowError(true);
        setTimeout(() => setShowError(false), 1500);
      }
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* 힌트 카드 */}
      <motion.div
        className="glass p-5 rounded-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-xs text-slate-500 mb-2">비밀번호 힌트:</p>
        <p className="text-sm text-amber-300 leading-relaxed italic">
          "{data.clueText}"
        </p>
      </motion.div>

      {/* 자물쇠 UI */}
      <motion.div
        className={`relative p-8 rounded-3xl border-2 transition-all ${
          isSolved
            ? 'bg-emerald-500/10 border-emerald-500/30'
            : 'glass border-white/10'
        }`}
        animate={showError ? { x: [-8, 8, -8, 8, -4, 4, 0] } : {}}
        transition={{ duration: 0.5 }}
      >
        {/* 자물쇠 아이콘 */}
        <motion.div
          className="text-center mb-6"
          animate={isSolved ? { y: -10 } : isUnlocking ? { rotate: [-5, 5, -5, 5, 0] } : {}}
          transition={isSolved ? { type: 'spring' } : { duration: 0.5 }}
        >
          {isSolved ? (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', bounce: 0.5 }}
            >
              <Unlock size={48} className="text-emerald-400 mx-auto" />
            </motion.div>
          ) : (
            <Lock size={48} className={`mx-auto ${isUnlocking ? 'text-amber-400' : 'text-slate-500'}`} />
          )}
        </motion.div>

        {/* 다이얼 그리드 */}
        <div className="flex items-center justify-center gap-3">
          {Array.from({ length: data.dialCount }).map((_, dialIdx) => {
            const options = data.dialOptions[dialIdx];
            const currentVal = options[dialValues[dialIdx]];
            const prevVal = options[((dialValues[dialIdx] - 1) % options.length + options.length) % options.length];
            const nextVal = options[(dialValues[dialIdx] + 1) % options.length];

            return (
              <div key={dialIdx} className="flex flex-col items-center gap-1">
                {/* 위 버튼 */}
                <motion.button
                  onClick={() => rotateDial(dialIdx, -1)}
                  disabled={isSolved}
                  className="w-14 h-8 rounded-lg bg-slate-700/80 hover:bg-slate-600 flex items-center justify-center transition-colors"
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronUp size={18} className="text-slate-400" />
                </motion.button>

                {/* 다이얼 값 */}
                <div className="relative w-16 h-24 overflow-hidden rounded-xl border-2 border-white/20 bg-slate-800">
                  {/* 위 미리보기 */}
                  <div className="h-1/3 flex items-center justify-center text-xs text-slate-600 opacity-50">
                    {prevVal}
                  </div>

                  {/* 현재 값 */}
                  <motion.div
                    key={`${dialIdx}-${dialValues[dialIdx]}`}
                    className={`h-1/3 flex items-center justify-center font-bold text-xl border-y border-white/10 ${
                      isSolved ? 'text-emerald-400 bg-emerald-500/10' : 'text-white bg-slate-700/50'
                    }`}
                    initial={{ y: -10, opacity: 0.5 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    {currentVal}
                  </motion.div>

                  {/* 아래 미리보기 */}
                  <div className="h-1/3 flex items-center justify-center text-xs text-slate-600 opacity-50">
                    {nextVal}
                  </div>
                </div>

                {/* 아래 버튼 */}
                <motion.button
                  onClick={() => rotateDial(dialIdx, 1)}
                  disabled={isSolved}
                  className="w-14 h-8 rounded-lg bg-slate-700/80 hover:bg-slate-600 flex items-center justify-center transition-colors"
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronDown size={18} className="text-slate-400" />
                </motion.button>
              </div>
            );
          })}
        </div>

        {/* 현재 조합 표시 */}
        <div className="text-center mt-4">
          <p className="text-xs text-slate-500">
            현재: {getCurrentValues().join(' - ')}
          </p>
        </div>
      </motion.div>

      {/* 열기 버튼 */}
      <motion.button
        onClick={handleTryUnlock}
        disabled={isSolved || isUnlocking}
        className={`w-full py-4 rounded-xl font-bold text-lg disabled:opacity-50 ${
          isSolved
            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
            : 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-900'
        }`}
        whileHover={!isSolved ? { scale: 1.02 } : {}}
        whileTap={!isSolved ? { scale: 0.98 } : {}}
      >
        {isSolved ? (
          <span className="flex items-center justify-center gap-2">
            <Check size={20} /> 잠금 해제됨!
          </span>
        ) : isUnlocking ? (
          <span className="flex items-center justify-center gap-2">
            <motion.div
              className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }}
            />
            확인 중...
          </span>
        ) : (
          '잠금 해제 시도'
        )}
      </motion.button>

      {/* 에러 */}
      <AnimatePresence>
        {showError && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center text-red-400 text-sm"
          >
            비밀번호가 틀렸습니다. (시도: {attempts}회)
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
