import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import { PuzzleContainer } from '../puzzles/PuzzleContainer';
import { HiddenObjectPuzzle } from '../puzzles/HiddenObjectPuzzle';
import { CipherPuzzle } from '../puzzles/CipherPuzzle';
import { TimelineSortPuzzle } from '../puzzles/TimelineSortPuzzle';
import { ContradictionPuzzle } from '../puzzles/ContradictionPuzzle';
import { PatternMatchPuzzle } from '../puzzles/PatternMatchPuzzle';
import { EvidenceChainPuzzle } from '../puzzles/EvidenceChainPuzzle';
import { CombinationLockPuzzle } from '../puzzles/CombinationLockPuzzle';
import { LogicGridPuzzle } from '../puzzles/LogicGridPuzzle';
import {
  PuzzleConfig,
  HiddenObjectData,
  CipherData,
  TimelineSortData,
  ContradictionData,
  PatternMatchData,
  EvidenceChainData,
  CombinationLockData,
  LogicGridData
} from '../../types/puzzles';
import {
  Lock, Unlock, Check, ChevronRight, Trophy, Star
} from 'lucide-react';

export function PuzzleChainPhase() {
  const {
    currentCase,
    puzzleProgress,
    currentPuzzleIndex,
    collectedEvidence,
    solvePuzzle,
    advancePuzzle,
    score
  } = useGameStore();

  const [showTransition, setShowTransition] = useState(false);
  const [completedScore, setCompletedScore] = useState(0);

  if (!currentCase || !currentCase.puzzleChain) return null;

  const puzzles = currentCase.puzzleChain;
  const currentPuzzle = puzzles[currentPuzzleIndex];
  const currentProgress = puzzleProgress[currentPuzzleIndex];
  const totalPuzzles = puzzles.length;

  const handlePuzzleSolve = useCallback((puzzleScore: number) => {
    if (!currentPuzzle) return;
    solvePuzzle(currentPuzzle.id, puzzleScore);
    setCompletedScore(puzzleScore);
  }, [currentPuzzle, solvePuzzle]);

  const handleNextPuzzle = useCallback(() => {
    setShowTransition(true);
    setTimeout(() => {
      advancePuzzle();
      setShowTransition(false);
      setCompletedScore(0);
    }, 600);
  }, [advancePuzzle]);

  // 수집된 증거 목록 (ContradictionPuzzle에서 필요)
  const collectedEvidenceData = collectedEvidence.map(evId => {
    const ev = currentCase.evidence.find(e => e.id === evId);
    return ev ? {
      id: ev.id,
      name: ev.name,
      description: ev.description,
      type: ev.type
    } : null;
  }).filter(Boolean) as { id: string; name: string; description: string; type: string }[];

  const renderPuzzle = (puzzle: PuzzleConfig) => {
    const { data } = puzzle;

    switch (data.type) {
      case 'hidden-object':
        return (
          <HiddenObjectPuzzle
            data={data as HiddenObjectData}
            onSolve={handlePuzzleSolve}
          />
        );
      case 'cipher-decode':
        return (
          <CipherPuzzle
            data={data as CipherData}
            onSolve={handlePuzzleSolve}
          />
        );
      case 'timeline-sort':
        return (
          <TimelineSortPuzzle
            data={data as TimelineSortData}
            onSolve={handlePuzzleSolve}
          />
        );
      case 'contradiction':
        return (
          <ContradictionPuzzle
            data={data as ContradictionData}
            collectedEvidence={collectedEvidenceData}
            onSolve={handlePuzzleSolve}
          />
        );
      case 'pattern-match':
        return (
          <PatternMatchPuzzle
            data={data as PatternMatchData}
            onSolve={handlePuzzleSolve}
          />
        );
      case 'evidence-chain':
        return (
          <EvidenceChainPuzzle
            data={data as EvidenceChainData}
            onSolve={handlePuzzleSolve}
          />
        );
      case 'combination-lock':
        return (
          <CombinationLockPuzzle
            data={data as CombinationLockData}
            onSolve={handlePuzzleSolve}
          />
        );
      case 'logic-grid':
        return (
          <LogicGridPuzzle
            data={data as LogicGridData}
            onSolve={handlePuzzleSolve}
          />
        );
      default:
        return <div className="text-center text-slate-500">알 수 없는 퍼즐 타입</div>;
    }
  };

  if (!currentPuzzle) return null;

  return (
    <div className="h-full flex flex-col relative">
      {/* 전환 오버레이 */}
      <AnimatePresence>
        {showTransition && (
          <motion.div
            className="fixed inset-0 z-50 bg-slate-900 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 0.6, ease: 'linear' }}
                className="w-12 h-12 border-3 border-amber-400 border-t-transparent rounded-full mx-auto mb-4"
              />
              <p className="text-amber-400 text-lg font-medium">다음 퍼즐 준비 중...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 퍼즐 진행 바 */}
      <motion.div
        className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700/60 px-4 py-3"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="max-w-4xl mx-auto">
          {/* 진행도 도트 */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-500">퍼즐 진행</span>
            <span className="text-xs text-amber-400 font-medium">
              {currentPuzzleIndex + 1} / {totalPuzzles}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            {puzzles.map((puzzle, i) => {
              const progress = puzzleProgress[i];
              const isCurrent = i === currentPuzzleIndex;
              const isCompleted = progress?.isCompleted;
              const isLocked = !progress?.isUnlocked;

              return (
                <motion.div
                  key={puzzle.id}
                  className={`relative flex-1 h-2 rounded-full transition-all ${
                    isCompleted
                      ? 'bg-emerald-500'
                      : isCurrent
                      ? 'bg-amber-500'
                      : isLocked
                      ? 'bg-slate-700'
                      : 'bg-slate-600'
                  }`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {isCurrent && !isCompleted && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-amber-400/30"
                      animate={{ opacity: [0.3, 0.8, 0.3] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* 퍼즐 아이콘 행 */}
          <div className="flex items-center justify-between mt-2">
            {puzzles.map((puzzle, i) => {
              const progress = puzzleProgress[i];
              const isCurrent = i === currentPuzzleIndex;
              const isCompleted = progress?.isCompleted;

              return (
                <div
                  key={`icon-${puzzle.id}`}
                  className={`flex items-center justify-center w-6 h-6 rounded-full text-xs ${
                    isCompleted
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : isCurrent
                      ? 'bg-amber-500/20 text-amber-400'
                      : 'bg-slate-800 text-slate-600'
                  }`}
                >
                  {isCompleted ? (
                    <Check size={12} />
                  ) : (
                    <span className="text-[10px] font-bold">{i + 1}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* PuzzleContainer + 실제 퍼즐 */}
      <PuzzleContainer
        title={currentPuzzle.title}
        description={currentPuzzle.description}
        storyContext={currentPuzzle.storyContext}
        stepNumber={currentPuzzleIndex + 1}
        totalSteps={totalPuzzles}
        hints={currentPuzzle.hints}
        isCompleted={currentProgress?.isCompleted || false}
        score={completedScore}
        rewardText={currentProgress?.isCompleted ? currentPuzzle.rewardText : undefined}
        onNextPuzzle={handleNextPuzzle}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPuzzle.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            {renderPuzzle(currentPuzzle)}
          </motion.div>
        </AnimatePresence>
      </PuzzleContainer>
    </div>
  );
}
