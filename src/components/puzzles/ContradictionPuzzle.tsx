import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ContradictionData, ContradictionStatement } from '../../types/puzzles';
import { AlertCircle, X, CheckCircle, Zap } from 'lucide-react';

export interface ContradictionPuzzleProps {
  data: ContradictionData;
  collectedEvidence: { id: string; name: string; description: string; type: string }[];
  onSolve: (score: number) => void;
}

export function ContradictionPuzzle({
  data,
  collectedEvidence,
  onSolve,
}: ContradictionPuzzleProps) {
  const [currentStatementIndex, setCurrentStatementIndex] = useState(0);
  const [foundLies, setFoundLies] = useState<Set<string>>(new Set());
  const [showEvidencePanel, setShowEvidencePanel] = useState(false);
  const [attemptsByStatement, setAttemptsByStatement] = useState<Record<string, number>>({});
  const [showObjection, setShowObjection] = useState(false);
  const [wrongAttempt, setWrongAttempt] = useState(false);
  const [currentExplanation, setCurrentExplanation] = useState<string | null>(null);
  const [animatingText, setAnimatingText] = useState(true);

  const currentStatement = data.statements[currentStatementIndex];
  const totalLies = data.statements.filter(s => s.isLie).length;
  const allLiesFound = foundLies.size === totalLies;

  // Typewriter effect for statement
  useEffect(() => {
    setAnimatingText(true);
    const timer = setTimeout(() => {
      setAnimatingText(false);
    }, currentStatement.text.length * 30); // 30ms per character
    return () => clearTimeout(timer);
  }, [currentStatementIndex, currentStatement.text]);

  const handleContinue = () => {
    if (currentStatementIndex < data.statements.length - 1) {
      setCurrentStatementIndex(currentStatementIndex + 1);
      setCurrentExplanation(null);
    }
  };

  const handleObjection = () => {
    setShowEvidencePanel(true);
  };

  const handleSelectEvidence = (evidenceId: string) => {
    const attemptCount = attemptsByStatement[currentStatement.id] || 0;

    // Check if this statement is a lie and if the evidence is correct
    if (currentStatement.isLie && currentStatement.correctEvidenceId === evidenceId) {
      // CORRECT! Show dramatic objection animation
      setShowObjection(true);
      setFoundLies(new Set([...foundLies, currentStatement.id]));
      setCurrentExplanation(currentStatement.explanation || '모순을 발견했습니다!');
      setShowEvidencePanel(false);

      // Calculate score (100 base - 20 per wrong attempt)
      const score = Math.max(100 - attemptCount * 20, 20);

      // Hide objection animation after 2 seconds
      setTimeout(() => {
        setShowObjection(false);
      }, 2000);

      // Check if all lies are found
      if (foundLies.size + 1 === totalLies) {
        // All lies found! Calculate total score
        const totalScore = Object.keys(attemptsByStatement).reduce((sum, key) => {
          const attempts = attemptsByStatement[key];
          return sum + Math.max(100 - attempts * 20, 20);
        }, score);
        setTimeout(() => {
          onSolve(totalScore);
        }, 2500);
      }
    } else {
      // WRONG! Show shake animation
      setWrongAttempt(true);
      setAttemptsByStatement({
        ...attemptsByStatement,
        [currentStatement.id]: attemptCount + 1,
      });

      setTimeout(() => {
        setWrongAttempt(false);
      }, 500);

      // Close panel after 3 attempts
      if (attemptCount + 1 >= 3) {
        setShowEvidencePanel(false);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Character Portrait */}
      <motion.div
        className="flex flex-col items-center gap-3"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border-2 border-purple-500/30 flex items-center justify-center text-4xl"
          animate={wrongAttempt ? {
            x: [0, -10, 10, -10, 10, 0],
            transition: { duration: 0.5 }
          } : {}}
        >
          {data.characterIcon}
        </motion.div>
        <h3 className="text-lg font-bold text-white">{data.characterName}</h3>
      </motion.div>

      {/* Progress Indicator */}
      <div className="flex items-center justify-center gap-2">
        {data.statements.map((stmt, i) => (
          <div
            key={stmt.id}
            className={`w-2 h-2 rounded-full transition-all ${
              i === currentStatementIndex
                ? 'bg-indigo-400 w-6'
                : foundLies.has(stmt.id)
                ? 'bg-green-400'
                : i < currentStatementIndex
                ? 'bg-slate-600'
                : 'bg-slate-700'
            }`}
          />
        ))}
      </div>

      {/* Statement Speech Bubble */}
      <motion.div
        key={currentStatementIndex}
        className="relative"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Speech bubble tail */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[12px] border-b-slate-800" />

        <div className="card bg-slate-800 border-slate-700">
          <div className="flex items-start gap-3 mb-4">
            <div className="flex-1">
              <motion.p
                className="text-white leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {animatingText ? (
                  <TypewriterText text={currentStatement.text} />
                ) : (
                  currentStatement.text
                )}
              </motion.p>
            </div>
            {foundLies.has(currentStatement.id) && (
              <motion.div
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", duration: 0.5 }}
              >
                <CheckCircle size={24} className="text-green-400" />
              </motion.div>
            )}
          </div>

          {/* Explanation (after finding contradiction) */}
          {currentExplanation && foundLies.has(currentStatement.id) && (
            <motion.div
              className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-sm text-green-200 italic">{currentExplanation}</p>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Action Buttons */}
      {!allLiesFound && (
        <div className="flex items-center justify-center gap-3">
          {currentStatementIndex < data.statements.length - 1 && (
            <motion.button
              onClick={handleContinue}
              className="btn-secondary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              disabled={animatingText}
            >
              계속 듣기
            </motion.button>
          )}

          {!foundLies.has(currentStatement.id) && (
            <motion.button
              onClick={handleObjection}
              className="btn-danger flex items-center gap-2 relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={animatingText}
              animate={!animatingText ? {
                boxShadow: [
                  '0 0 20px rgba(239, 68, 68, 0.3)',
                  '0 0 40px rgba(239, 68, 68, 0.5)',
                  '0 0 20px rgba(239, 68, 68, 0.3)',
                ]
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Zap size={18} />
              <span className="font-bold">이의있음!</span>
            </motion.button>
          )}
        </div>
      )}

      {/* Found Contradictions Counter */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-lg border border-slate-700">
          <AlertCircle size={16} className="text-amber-400" />
          <span className="text-sm text-slate-300">
            발견한 모순: <span className="font-bold text-green-400">{foundLies.size}</span> / {totalLies}
          </span>
        </div>
      </div>

      {/* OBJECTION! Dramatic Animation */}
      <AnimatePresence>
        {showObjection && (
          <>
            {/* Red flash overlay */}
            <motion.div
              className="fixed inset-0 z-50 bg-red-600/40 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, times: [0, 0.3, 1] }}
            />

            {/* OBJECTION text */}
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
              initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 1.2, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              <div className="text-8xl font-black text-white bg-red-600 px-12 py-6 rounded-xl shadow-2xl border-4 border-white transform -rotate-3">
                이의있음!
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Evidence Selection Panel */}
      <AnimatePresence>
        {showEvidencePanel && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowEvidencePanel(false)}
            />

            {/* Evidence Panel */}
            <motion.div
              className="fixed bottom-0 left-0 right-0 z-50 max-h-[70vh] overflow-y-auto"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="bg-slate-900 border-t-4 border-amber-500 rounded-t-3xl p-6">
                <div className="max-w-4xl mx-auto">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">증거 선택</h3>
                      <p className="text-sm text-slate-400">
                        모순을 증명할 증거를 선택하세요
                        {attemptsByStatement[currentStatement.id] > 0 && (
                          <span className="ml-2 text-red-400">
                            (시도: {attemptsByStatement[currentStatement.id]}/3)
                          </span>
                        )}
                      </p>
                    </div>
                    <button
                      onClick={() => setShowEvidencePanel(false)}
                      className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      <X size={20} className="text-slate-400" />
                    </button>
                  </div>

                  {/* Evidence Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {collectedEvidence.map((evidence, i) => (
                      <motion.button
                        key={evidence.id}
                        onClick={() => handleSelectEvidence(evidence.id)}
                        className="card text-left hover:border-amber-500/50 transition-all group"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-slate-700/50 flex items-center justify-center text-xl flex-shrink-0">
                            {getEvidenceIcon(evidence.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-white mb-1 group-hover:text-amber-400 transition-colors">
                              {evidence.name}
                            </h4>
                            <p className="text-xs text-slate-400 line-clamp-2">
                              {evidence.description}
                            </p>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  {collectedEvidence.length === 0 && (
                    <p className="text-center text-slate-500 py-8">
                      수집한 증거가 없습니다.
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Wrong Attempt Message */}
      <AnimatePresence>
        {wrongAttempt && (
          <motion.div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <div className="card border-red-500/50 bg-red-500/20 backdrop-blur-lg">
              <p className="text-white font-bold text-center">
                이 증거로는 반박할 수 없습니다...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Helper: Typewriter text animation component
function TypewriterText({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= text.length) {
        setDisplayedText(text.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [text]);

  return <>{displayedText}</>;
}

// Helper: Get icon for evidence type
function getEvidenceIcon(type: string): string {
  const icons: Record<string, string> = {
    physical: '📷',
    testimony: '👥',
    document: '📄',
    digital: '💾',
    forensic: '🔬',
  };
  return icons[type] || '📋';
}
