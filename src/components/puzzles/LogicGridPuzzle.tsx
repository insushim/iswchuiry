import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  X as XIcon,
  ChevronDown,
  ChevronRight,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import {
  LogicGridData,
  LogicGridSuspect,
  LogicGridCategory,
  LogicGridClue
} from '../../types/puzzles';

interface LogicGridPuzzleProps {
  data: LogicGridData;
  onSolve: (score: number) => void;
}

type CellState = 'empty' | 'X' | 'O';

interface GridState {
  [suspectId: string]: {
    [categoryId: string]: {
      [value: string]: CellState;
    };
  };
}

const DIFFICULTY_COLORS = {
  1: { bg: 'bg-green-500/10', border: 'border-green-500', text: 'text-green-400' },
  2: { bg: 'bg-blue-500/10', border: 'border-blue-500', text: 'text-blue-400' },
  3: { bg: 'bg-red-500/10', border: 'border-red-500', text: 'text-red-400' },
};

const DIFFICULTY_LABELS = {
  1: '쉬움',
  2: '보통',
  3: '어려움',
};

export function LogicGridPuzzle({ data, onSolve }: LogicGridPuzzleProps) {
  const [gridState, setGridState] = useState<GridState>(() => {
    const initial: GridState = {};
    data.suspects.forEach((suspect) => {
      initial[suspect.id] = {};
      data.categories.forEach((category) => {
        initial[suspect.id][category.id] = {};
        category.values.forEach((value) => {
          initial[suspect.id][category.id][value] = 'empty';
        });
      });
    });
    return initial;
  });

  const [expandedClues, setExpandedClues] = useState<Set<string>>(new Set());
  const [readClues, setReadClues] = useState<Set<string>>(new Set());
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<{
    isCorrect: boolean;
    wrongCells: string[];
  } | null>(null);
  const [isSolved, setIsSolved] = useState(false);

  // Toggle cell state: empty → X → O → empty
  const toggleCell = useCallback((suspectId: string, categoryId: string, value: string) => {
    if (isSolved) return;

    setGridState((prev) => {
      const current = prev[suspectId][categoryId][value];
      let next: CellState;

      if (current === 'empty') {
        next = 'X';
      } else if (current === 'X') {
        next = 'O';
      } else {
        next = 'empty';
      }

      const newState = { ...prev };
      newState[suspectId] = { ...newState[suspectId] };
      newState[suspectId][categoryId] = { ...newState[suspectId][categoryId] };
      newState[suspectId][categoryId][value] = next;

      // Auto-eliminate other values in same category when O is set
      if (next === 'O') {
        const category = data.categories.find(c => c.id === categoryId);
        if (category) {
          category.values.forEach((v) => {
            if (v !== value && newState[suspectId][categoryId][v] === 'empty') {
              newState[suspectId][categoryId][v] = 'X';
            }
          });
        }
      }

      return newState;
    });
  }, [data.categories, isSolved]);

  const toggleClue = useCallback((clueId: string) => {
    setExpandedClues((prev) => {
      const next = new Set(prev);
      if (next.has(clueId)) {
        next.delete(clueId);
      } else {
        next.add(clueId);
        setReadClues((r) => new Set(r).add(clueId));
      }
      return next;
    });
  }, []);

  const validateSolution = useCallback(() => {
    setIsValidating(true);
    setValidationResult(null);

    // Check if solution matches
    const wrongCells: string[] = [];
    let correctCount = 0;
    let totalChecks = 0;

    data.suspects.forEach((suspect) => {
      data.categories.forEach((category) => {
        const solutionValue = data.solution[suspect.id]?.[category.id];
        if (!solutionValue) return;

        category.values.forEach((value) => {
          const cellState = gridState[suspect.id][category.id][value];
          const shouldBeO = value === solutionValue;

          if (cellState === 'O') {
            totalChecks++;
            if (shouldBeO) {
              correctCount++;
            } else {
              wrongCells.push(`${suspect.id}-${category.id}-${value}`);
            }
          }
        });
      });
    });

    const isCorrect = wrongCells.length === 0 && correctCount === Object.keys(data.solution).length * data.categories.length;

    setTimeout(() => {
      setValidationResult({ isCorrect, wrongCells });
      setIsValidating(false);

      if (isCorrect) {
        setIsSolved(true);
        setTimeout(() => {
          const score = calculateScore(correctCount, totalChecks, wrongCells.length);
          onSolve(score);
        }, 2000);
      }
    }, 800);
  }, [data, gridState, onSolve]);

  const calculateScore = (correct: number, total: number, wrong: number) => {
    if (wrong === 0 && total === correct) return 150;
    if (wrong <= 2) return 100;
    return 50;
  };

  const getCellId = (suspectId: string, categoryId: string, value: string) =>
    `${suspectId}-${categoryId}-${value}`;

  const isWrongCell = (suspectId: string, categoryId: string, value: string) =>
    validationResult?.wrongCells.includes(getCellId(suspectId, categoryId, value)) ?? false;

  return (
    <div className="w-full h-full flex flex-col bg-slate-900 text-white overflow-hidden">
      {/* Clue Cards */}
      <div className="flex-shrink-0 p-4 border-b border-slate-700/50 bg-slate-800/30 backdrop-blur-sm">
        <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-yellow-400" />
          단서
        </h3>
        <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          {data.clues.map((clue, index) => {
            const isExpanded = expandedClues.has(clue.id);
            const isRead = readClues.has(clue.id);
            const colors = DIFFICULTY_COLORS[clue.difficulty];

            return (
              <motion.div
                key={clue.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`border ${colors.border} ${colors.bg} rounded-lg overflow-hidden transition-all ${
                  isRead && !isExpanded ? 'opacity-60' : 'opacity-100'
                }`}
              >
                <button
                  onClick={() => toggleClue(clue.id)}
                  className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-bold ${colors.text} px-2 py-0.5 rounded border ${colors.border}`}>
                      {DIFFICULTY_LABELS[clue.difficulty]}
                    </span>
                    <span className="text-sm font-medium">단서 #{index + 1}</span>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-4 pb-3 text-slate-300 text-sm leading-relaxed"
                    >
                      {clue.text}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Logic Grid */}
      <div className="flex-1 overflow-auto p-4">
        <div className="inline-block min-w-full">
          <div className="border border-slate-700 rounded-lg overflow-hidden bg-slate-800/50 backdrop-blur-sm">
            {/* Header Row */}
            <div className="flex bg-slate-800 border-b border-slate-700">
              {/* Empty corner cell */}
              <div className="w-32 flex-shrink-0 border-r border-slate-700 p-3 font-bold text-slate-400">
                용의자
              </div>
              {/* Category headers */}
              {data.categories.map((category) => (
                <div
                  key={category.id}
                  className="flex border-r border-slate-700 last:border-r-0"
                  style={{ minWidth: `${category.values.length * 80}px` }}
                >
                  <div className="w-full border-b border-slate-600 p-2 text-center">
                    <div className="flex items-center justify-center gap-2 font-bold text-slate-200">
                      <span className="text-lg">{category.icon}</span>
                      <span>{category.name}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Value headers */}
            <div className="flex bg-slate-800/80 border-b border-slate-700">
              <div className="w-32 flex-shrink-0 border-r border-slate-700"></div>
              {data.categories.map((category) => (
                <div
                  key={`values-${category.id}`}
                  className="flex border-r border-slate-700 last:border-r-0"
                >
                  {category.values.map((value) => (
                    <div
                      key={value}
                      className="w-20 p-2 text-center text-xs font-medium text-slate-400 border-r border-slate-700/50 last:border-r-0"
                    >
                      {value}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Grid Rows */}
            {data.suspects.map((suspect, suspectIndex) => (
              <motion.div
                key={suspect.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: suspectIndex * 0.08 }}
                className="flex border-b border-slate-700/50 last:border-b-0 hover:bg-slate-700/20 transition-colors"
              >
                {/* Suspect name */}
                <div className="w-32 flex-shrink-0 border-r border-slate-700 p-3 flex items-center gap-2 font-medium">
                  <span className="text-lg">{suspect.icon}</span>
                  <span className="text-sm">{suspect.name}</span>
                </div>

                {/* Cells for each category */}
                {data.categories.map((category) => (
                  <div
                    key={`${suspect.id}-${category.id}`}
                    className="flex border-r border-slate-700 last:border-r-0"
                  >
                    {category.values.map((value) => {
                      const cellState = gridState[suspect.id][category.id][value];
                      const isWrong = isWrongCell(suspect.id, category.id, value);

                      return (
                        <button
                          key={value}
                          onClick={() => toggleCell(suspect.id, category.id, value)}
                          disabled={isSolved}
                          className={`w-20 h-14 border-r border-slate-700/50 last:border-r-0 relative group transition-all ${
                            isSolved ? 'cursor-not-allowed' : 'hover:bg-slate-600/30 active:scale-95 cursor-pointer'
                          } ${
                            isWrong && validationResult && !validationResult.isCorrect
                              ? 'animate-shake bg-red-500/20'
                              : ''
                          } ${
                            isSolved && cellState === 'O'
                              ? 'bg-green-500/20 animate-pulse-slow'
                              : ''
                          }`}
                        >
                          <AnimatePresence mode="wait">
                            {cellState === 'X' && (
                              <motion.div
                                key="x"
                                initial={{ scale: 0, rotate: -90 }}
                                animate={{ scale: 1, rotate: 0 }}
                                exit={{ scale: 0, rotate: 90 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                                className="absolute inset-0 flex items-center justify-center"
                              >
                                <XIcon className="w-8 h-8 text-red-400 stroke-[3]" />
                              </motion.div>
                            )}
                            {cellState === 'O' && (
                              <motion.div
                                key="o"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                                className="absolute inset-0 flex items-center justify-center"
                              >
                                <div className="relative">
                                  <div className="w-8 h-8 rounded-full border-4 border-green-400"></div>
                                  <Check className="w-5 h-5 text-green-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 stroke-[3]" />
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {/* Hover effect */}
                          {!isSolved && (
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Validation Button & Feedback */}
      <div className="flex-shrink-0 p-4 border-t border-slate-700/50 bg-slate-800/30 backdrop-blur-sm space-y-3">
        {validationResult && !validationResult.isCorrect && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm"
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>일부가 틀렸습니다. 다시 확인해보세요.</span>
          </motion.div>
        )}

        {validationResult && validationResult.isCorrect && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 px-4 py-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm font-bold"
          >
            <Sparkles className="w-5 h-5 flex-shrink-0 animate-bounce" />
            <span>정답입니다! 완벽한 추리입니다!</span>
          </motion.div>
        )}

        <motion.button
          onClick={validateSolution}
          disabled={isValidating || isSolved}
          whileHover={!isValidating && !isSolved ? { scale: 1.02 } : {}}
          whileTap={!isValidating && !isSolved ? { scale: 0.98 } : {}}
          className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
            isSolved
              ? 'bg-green-600 cursor-not-allowed opacity-50'
              : isValidating
              ? 'bg-blue-600 cursor-wait'
              : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-lg hover:shadow-xl'
          }`}
        >
          {isSolved ? (
            <span className="flex items-center justify-center gap-2">
              <Check className="w-5 h-5" />
              해결 완료!
            </span>
          ) : isValidating ? (
            <span className="flex items-center justify-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              >
                <Sparkles className="w-5 h-5" />
              </motion.div>
              검증 중...
            </span>
          ) : (
            '정답 확인하기'
          )}
        </motion.button>
      </div>
    </div>
  );
}
