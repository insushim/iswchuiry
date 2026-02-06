import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Award, ChevronRight, Sparkles, Check } from 'lucide-react';

export interface PuzzleContainerProps {
  title: string;
  description: string;
  storyContext: string;
  stepNumber: number;
  totalSteps: number;
  hints: string[];
  isCompleted: boolean;
  score: number;
  rewardText?: string;
  onNextPuzzle: () => void;
  children: React.ReactNode;
}

export function PuzzleContainer({
  title,
  description,
  storyContext,
  stepNumber,
  totalSteps,
  hints,
  isCompleted,
  score,
  rewardText,
  onNextPuzzle,
  children,
}: PuzzleContainerProps) {
  const [hintsShown, setHintsShown] = useState(0);
  const [showCompletionAnimation, setShowCompletionAnimation] = useState(false);

  const handleShowHint = () => {
    if (hintsShown < hints.length) {
      setHintsShown(hintsShown + 1);
    }
  };

  React.useEffect(() => {
    if (isCompleted && !showCompletionAnimation) {
      setShowCompletionAnimation(true);
    }
  }, [isCompleted]);

  return (
    <div className="h-full flex flex-col relative">
      {/* Completion Animation - Confetti Particles */}
      <AnimatePresence>
        {showCompletionAnimation && (
          <div className="fixed inset-0 z-50 pointer-events-none">
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '50%',
                }}
                initial={{
                  opacity: 1,
                  y: 0,
                  x: 0,
                  scale: 1,
                  rotate: 0
                }}
                animate={{
                  opacity: 0,
                  y: Math.random() * -400 - 100,
                  x: (Math.random() - 0.5) * 300,
                  scale: Math.random() * 0.5 + 0.5,
                  rotate: Math.random() * 720 - 360
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 2,
                  delay: i * 0.03,
                  ease: "easeOut"
                }}
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    background: ['#fbbf24', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'][i % 6]
                  }}
                />
              </motion.div>
            ))}

            {/* Green glow effect */}
            <motion.div
              className="absolute inset-0 bg-green-500/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, times: [0, 0.5, 1] }}
            />
          </div>
        )}
      </AnimatePresence>

      {/* Title Bar */}
      <motion.div
        className="bg-gradient-to-b from-slate-800/90 to-slate-800/50 backdrop-blur-sm border-b border-slate-700/60 p-5"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                  <Sparkles size={20} className="text-indigo-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{title}</h2>
                  <p className="text-xs text-slate-400">단계 {stepNumber}/{totalSteps}</p>
                </div>
              </div>
              <p className="text-sm text-slate-300">{description}</p>
              <p className="text-xs text-slate-500 italic mt-2">{storyContext}</p>
            </div>

            {/* Score Display */}
            {isCompleted && (
              <motion.div
                className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-lg"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", duration: 0.6, delay: 0.3 }}
              >
                <Award size={18} className="text-green-400" />
                <span className="font-bold text-green-400">+{score}</span>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Puzzle Content */}
      <div className="flex-1 overflow-y-auto p-5">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </div>

      {/* Bottom Action Bar */}
      <motion.div
        className="bg-slate-900/90 backdrop-blur-lg border-t border-slate-700/60 p-4"
        initial={{ y: 60 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          {/* Hint Section */}
          <div className="flex items-center gap-3">
            {!isCompleted && (
              <>
                <motion.button
                  onClick={handleShowHint}
                  disabled={hintsShown >= hints.length}
                  className="btn-secondary flex items-center gap-2 text-sm"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Lightbulb size={16} className="text-yellow-400" />
                  힌트 ({hintsShown}/{hints.length})
                </motion.button>

                {hintsShown > 0 && (
                  <motion.div
                    className="text-xs text-purple-400"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    점수 -{hintsShown * 10}
                  </motion.div>
                )}
              </>
            )}
          </div>

          {/* Next Button (completion) */}
          {isCompleted && (
            <motion.button
              onClick={onNextPuzzle}
              className="btn-primary flex items-center gap-2"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Check size={16} />
              다음 퍼즐
              <ChevronRight size={16} />
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Hint Display Area */}
      <AnimatePresence>
        {hintsShown > 0 && !isCompleted && (
          <motion.div
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 max-w-md w-full mx-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <div className="card border-purple-500/40 bg-purple-500/10 backdrop-blur-lg">
              <div className="flex items-start gap-3">
                <Lightbulb size={18} className="text-purple-400 mt-0.5" />
                <div className="flex-1 space-y-2">
                  {hints.slice(0, hintsShown).map((hint, i) => (
                    <motion.p
                      key={i}
                      className="text-sm text-purple-200"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      {i + 1}. {hint}
                    </motion.p>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Completion Reward Message */}
      <AnimatePresence>
        {isCompleted && rewardText && (
          <motion.div
            className="fixed top-24 left-1/2 -translate-x-1/2 z-40 max-w-md w-full mx-4"
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ delay: 0.3 }}
          >
            <div className="card border-green-500/50 bg-green-500/10 backdrop-blur-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Check size={20} className="text-green-400" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-green-400 mb-1">퍼즐 완료!</h4>
                  <p className="text-sm text-green-200">{rewardText}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
