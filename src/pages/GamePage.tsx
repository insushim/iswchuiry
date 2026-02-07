import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';
import { useMetaStore } from '../store/metaStore';
import { Layout } from '../components/Layout';
import { IntroPhase } from '../components/phases/IntroPhase';
import { InvestigationPhase } from '../components/phases/InvestigationPhase';
import { InterrogationPhase } from '../components/phases/InterrogationPhase';
import { DeductionPhase } from '../components/phases/DeductionPhase';
import { AccusationPhase } from '../components/phases/AccusationPhase';
import { RevealPhase } from '../components/phases/RevealPhase';
import { PuzzleChainPhase } from '../components/phases/PuzzleChainPhase';

// 타임어택 타이머 오버레이
function TimeAttackTimer({ timeLimit }: { timeLimit: number }) {
  const [remaining, setRemaining] = useState(timeLimit);
  const { makeAccusation, currentCase, isComplete } = useGameStore();

  useEffect(() => {
    if (isComplete || remaining <= 0) return;
    const t = setInterval(() => {
      setRemaining(prev => {
        if (prev <= 1) {
          clearInterval(t);
          // 시간 초과 → 자동 실패 처리
          if (currentCase && !isComplete) {
            makeAccusation('__timeout__');
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [isComplete, currentCase, makeAccusation, remaining]);

  if (isComplete) return null;

  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const isUrgent = remaining < 60;

  return (
    <div className={`fixed top-4 right-4 z-50 px-4 py-2 rounded-xl font-mono text-lg font-bold shadow-lg ${
      isUrgent ? 'bg-red-600 text-white animate-pulse' : 'bg-slate-800/90 text-red-400 border border-red-500/30'
    }`}>
      {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
    </div>
  );
}

// 두뇌훈련 IQ 계산기
function useBrainTrainingScore() {
  const { score, playTime, hintsUsed, collectedEvidence, currentCase } = useGameStore();
  const { updateBrainTraining } = useMetaStore();

  const calculateIQ = useCallback(() => {
    if (!currentCase) return;
    const evidenceRate = collectedEvidence.length / Math.max(currentCase.evidence.length, 1);
    const timeEfficiency = Math.max(0, 1 - (playTime / 1800)); // 30분 기준
    const hintPenalty = hintsUsed * 0.1;
    const rawIQ = Math.round(
      80 + (score / 10) + (evidenceRate * 20) + (timeEfficiency * 30) - (hintPenalty * 15)
    );
    const iq = Math.min(200, Math.max(60, rawIQ));
    updateBrainTraining(score, iq);
  }, [score, playTime, hintsUsed, collectedEvidence, currentCase, updateBrainTraining]);

  return calculateIQ;
}

export function GamePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { currentCase, phase, updatePlayTime, isComplete } = useGameStore();
  const calculateBrainIQ = useBrainTrainingScore();

  const timeLimit = searchParams.get('timeLimit') ? Number(searchParams.get('timeLimit')) : null;
  const isBrainMode = searchParams.get('brainMode') === 'true';

  // 케이스가 없으면 홈으로
  useEffect(() => {
    if (!currentCase) {
      navigate('/');
    }
  }, [currentCase, navigate]);

  // 플레이 타임 업데이트
  useEffect(() => {
    const interval = setInterval(updatePlayTime, 1000);
    return () => clearInterval(interval);
  }, [updatePlayTime]);

  // 두뇌훈련 모드: 게임 완료 시 IQ 계산
  useEffect(() => {
    if (isBrainMode && isComplete) {
      calculateBrainIQ();
    }
  }, [isBrainMode, isComplete, calculateBrainIQ]);

  if (!currentCase) return null;

  const renderPhase = () => {
    switch (phase) {
      case 'intro':
        return <IntroPhase />;
      case 'puzzle-chain':
        return <PuzzleChainPhase />;
      case 'investigation':
        return <InvestigationPhase />;
      case 'interrogation':
        return <InterrogationPhase />;
      case 'deduction':
        return <DeductionPhase />;
      case 'accusation':
        return <AccusationPhase />;
      case 'reveal':
        return <RevealPhase />;
      default:
        return <IntroPhase />;
    }
  };

  return (
    <Layout showHeader={phase !== 'intro' && phase !== 'reveal' && phase !== 'puzzle-chain'}>
      {timeLimit && <TimeAttackTimer timeLimit={timeLimit} />}
      {renderPhase()}
    </Layout>
  );
}
