import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Check, X, Eye, MapPin } from 'lucide-react';
import { HiddenObjectData, HiddenCell } from '../../types/puzzles';

interface HiddenObjectPuzzleProps {
  data: HiddenObjectData;
  onSolve: (score: number) => void;
}

export function HiddenObjectPuzzle({ data, onSolve }: HiddenObjectPuzzleProps) {
  const [examined, setExamined] = useState<Set<string>>(new Set());
  const [found, setFound] = useState<string[]>([]);
  const [lastResult, setLastResult] = useState<{ id: string; text: string; isEvidence: boolean } | null>(null);
  const [isSolved, setIsSolved] = useState(false);
  const [wrongClicks, setWrongClicks] = useState(0);

  const evidenceCells = data.cells.filter(c => c.isEvidence && !c.isRedHerring);
  const totalEvidence = evidenceCells.length;
  const foundCount = found.length;

  const handleCellClick = (cell: HiddenCell) => {
    if (isSolved || examined.has(cell.id)) return;

    setExamined(prev => new Set(prev).add(cell.id));

    if (cell.isEvidence && !cell.isRedHerring) {
      setFound(prev => [...prev, cell.id]);
      setLastResult({ id: cell.id, text: cell.examineText, isEvidence: true });

      const newFoundCount = foundCount + 1;
      if (newFoundCount >= data.requiredFinds) {
        setIsSolved(true);
        const score = Math.max(40, 120 - wrongClicks * 10);
        setTimeout(() => onSolve(score), 1500);
      }
    } else if (cell.isRedHerring) {
      setLastResult({ id: cell.id, text: '이것은 사건과 관련 없는 것 같습니다...', isEvidence: false });
      setWrongClicks(prev => prev + 1);
    } else {
      setLastResult({ id: cell.id, text: cell.examineText, isEvidence: false });
    }

    setTimeout(() => setLastResult(null), 2500);
  };

  return (
    <div className="space-y-4">
      {/* 진행도 */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2 text-slate-400">
          <Search size={16} className="text-cyan-400" />
          <span>발견한 증거: {foundCount}/{data.requiredFinds}필요 (전체 {totalEvidence})</span>
        </div>
        <div className="flex gap-1">
          {Array.from({ length: data.requiredFinds }).map((_, i) => (
            <motion.div
              key={i}
              className={`w-3 h-3 rounded-full ${i < foundCount ? 'bg-emerald-500' : 'bg-slate-700'}`}
              animate={i < foundCount ? { scale: [1, 1.4, 1] } : {}}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </div>

      {/* 현장 그리드 */}
      <motion.div
        className="glass p-4 rounded-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex items-center gap-2 mb-3">
          <MapPin size={16} className="text-amber-400" />
          <h3 className="text-sm font-medium text-slate-300">{data.sceneName}</h3>
        </div>

        <div
          className="grid gap-2"
          style={{
            gridTemplateColumns: `repeat(${data.gridSize.cols}, 1fr)`,
            gridTemplateRows: `repeat(${data.gridSize.rows}, 1fr)`
          }}
        >
          {data.cells.map(cell => {
            const isExamined = examined.has(cell.id);
            const isFound = found.includes(cell.id);
            const isRedHerring = cell.isRedHerring && isExamined;

            return (
              <motion.button
                key={cell.id}
                onClick={() => handleCellClick(cell)}
                disabled={isExamined || isSolved}
                className={`relative aspect-square rounded-xl border-2 flex flex-col items-center justify-center gap-1 transition-all ${
                  isFound
                    ? 'bg-emerald-500/20 border-emerald-500/40'
                    : isRedHerring
                    ? 'bg-red-500/10 border-red-500/20 opacity-50'
                    : isExamined
                    ? 'bg-slate-800/30 border-white/5 opacity-40'
                    : 'bg-slate-800/60 border-white/10 hover:border-cyan-500/40 hover:bg-slate-700/50 cursor-pointer'
                }`}
                whileHover={!isExamined && !isSolved ? { scale: 1.05 } : {}}
                whileTap={!isExamined && !isSolved ? { scale: 0.95 } : {}}
                style={{
                  gridRow: cell.row,
                  gridColumn: cell.col
                }}
              >
                <span className="text-xl">{cell.icon}</span>
                <span className="text-[10px] text-slate-500 leading-tight text-center px-1">
                  {cell.label}
                </span>

                {isFound && (
                  <motion.div
                    className="absolute top-1 right-1"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', bounce: 0.6 }}
                  >
                    <Check size={14} className="text-emerald-400" />
                  </motion.div>
                )}

                {isRedHerring && (
                  <motion.div
                    className="absolute top-1 right-1"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    <X size={14} className="text-red-400" />
                  </motion.div>
                )}

                {!isExamined && !isSolved && (
                  <motion.div
                    className="absolute inset-0 rounded-xl"
                    animate={{ boxShadow: ['inset 0 0 0 0 rgba(6,182,212,0)', 'inset 0 0 15px 0 rgba(6,182,212,0.08)', 'inset 0 0 0 0 rgba(6,182,212,0)'] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* 조사 결과 토스트 */}
      <AnimatePresence>
        {lastResult && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-4 rounded-xl border text-sm ${
              lastResult.isEvidence
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                : 'bg-slate-800/80 border-white/5 text-slate-400'
            }`}
          >
            <div className="flex items-start gap-2">
              {lastResult.isEvidence ? (
                <Eye size={16} className="text-emerald-400 mt-0.5 flex-shrink-0" />
              ) : (
                <Search size={16} className="text-slate-500 mt-0.5 flex-shrink-0" />
              )}
              <span>{lastResult.text}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 완료 */}
      <AnimatePresence>
        {isSolved && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl"
          >
            <motion.div
              initial={{ rotate: -180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: 'spring', bounce: 0.5 }}
            >
              <Check size={40} className="text-emerald-400 mx-auto mb-2" />
            </motion.div>
            <p className="text-emerald-300 font-bold text-lg">현장 조사 완료!</p>
            <p className="text-slate-400 text-sm mt-1">{foundCount}개의 증거를 발견했습니다</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
