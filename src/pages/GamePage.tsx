import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';
import { Layout } from '../components/Layout';
import { IntroPhase } from '../components/phases/IntroPhase';
import { InvestigationPhase } from '../components/phases/InvestigationPhase';
import { InterrogationPhase } from '../components/phases/InterrogationPhase';
import { DeductionPhase } from '../components/phases/DeductionPhase';
import { AccusationPhase } from '../components/phases/AccusationPhase';
import { RevealPhase } from '../components/phases/RevealPhase';

export function GamePage() {
  const navigate = useNavigate();
  const { currentCase, phase, updatePlayTime } = useGameStore();

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

  if (!currentCase) return null;

  const renderPhase = () => {
    switch (phase) {
      case 'intro':
        return <IntroPhase />;
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
    <Layout showHeader={phase !== 'intro' && phase !== 'reveal'}>
      {renderPhase()}
    </Layout>
  );
}
