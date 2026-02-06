# Puzzle Components Usage Guide

## PuzzleContainer + ContradictionPuzzle Example

```tsx
import React, { useState } from 'react';
import { PuzzleContainer } from './PuzzleContainer';
import { ContradictionPuzzle } from './ContradictionPuzzle';
import { ContradictionData } from '../../types/puzzles';

function MyPuzzleScreen() {
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);

  // Example contradiction puzzle data
  const contradictionData: ContradictionData = {
    type: 'contradiction',
    characterName: '박민수 교수',
    characterIcon: '👨‍🏫',
    statements: [
      {
        id: 'stmt1',
        text: '나는 어젯밤 10시부터 새벽 2시까지 연구실에서 논문을 쓰고 있었습니다.',
        isLie: false,
      },
      {
        id: 'stmt2',
        text: '연구실 CCTV는 작동하지 않았기 때문에 증거가 없을 겁니다.',
        isLie: true,
        correctEvidenceId: 'cctv-footage',
        explanation: 'CCTV 영상을 확인한 결과, 카메라는 정상 작동하고 있었으며 박 교수는 10시 30분에 연구실을 떠났습니다!',
      },
      {
        id: 'stmt3',
        text: '피해자와는 오래 전부터 친한 동료였습니다.',
        isLie: false,
      },
    ],
  };

  // Example collected evidence
  const collectedEvidence = [
    {
      id: 'cctv-footage',
      name: 'CCTV 녹화 영상',
      description: '연구실 복도 CCTV에 녹화된 10시 30분의 영상. 박 교수가 연구실을 나가는 모습이 선명하게 찍혀있다.',
      type: 'digital',
    },
    {
      id: 'fingerprint',
      name: '지문 분석 결과',
      description: '범행 현장에서 발견된 미확인 지문',
      type: 'forensic',
    },
    {
      id: 'notebook',
      name: '피해자의 수첩',
      description: '피해자가 남긴 마지막 메모',
      type: 'document',
    },
  ];

  const handleSolve = (earnedScore: number) => {
    setScore(earnedScore);
    setIsCompleted(true);
  };

  const handleNextPuzzle = () => {
    console.log('Moving to next puzzle...');
    // Navigate to next puzzle or phase
  };

  return (
    <PuzzleContainer
      title="증언의 모순"
      description="박민수 교수의 증언을 듣고 모순을 찾아내세요."
      storyContext="박 교수의 알리바이에는 명확한 허점이 있을 것입니다. 증거를 통해 이를 증명하세요."
      stepNumber={3}
      totalSteps={8}
      hints={[
        'CCTV 영상을 자세히 확인해보세요.',
        '교수는 언제 연구실을 떠났다고 했나요?',
        '진술과 영상의 시간을 비교해보세요.',
      ]}
      isCompleted={isCompleted}
      score={score}
      rewardText="박 교수의 알리바이가 무너졌습니다!"
      onNextPuzzle={handleNextPuzzle}
    >
      <ContradictionPuzzle
        data={contradictionData}
        collectedEvidence={collectedEvidence}
        onSolve={handleSolve}
      />
    </PuzzleContainer>
  );
}
```

## Features

### PuzzleContainer
- ✅ Title bar with puzzle icon and step indicator
- ✅ Description and story context
- ✅ Hint system (reveals one at a time, shows penalty)
- ✅ Score display with animation
- ✅ Completion animation (confetti particles + green glow)
- ✅ "Next puzzle" button after completion
- ✅ Responsive layout with Tailwind + Framer Motion

### ContradictionPuzzle
- ✅ Character portrait with large emoji
- ✅ Typewriter effect for statement text
- ✅ Progress dots showing current statement
- ✅ "계속 듣기" and "이의있음!" buttons
- ✅ Dramatic "이의있음!" animation (red flash + text)
- ✅ Evidence selection panel (slides from bottom)
- ✅ Wrong attempt feedback (shake animation)
- ✅ Attempt counter (max 3 per statement)
- ✅ Score calculation (100 - 20 per wrong attempt)
- ✅ Multiple contradictions support
- ✅ Explanation after finding each contradiction

## Theming

All components use the game's dark theme:
- Base: `bg-slate-900`, `bg-slate-800`
- Glass effects: `backdrop-blur-lg`
- Accents: amber (`text-amber-400`), purple (`text-purple-400`), blue (`text-indigo-400`)
- Green for success: `text-green-400`, `bg-green-500/10`
- Red for objection: `bg-red-600`, `text-red-400`

## Animations

Powered by Framer Motion 12:
- Typewriter text effect
- Particle confetti on completion
- Screen flash for objection
- Shake animation for wrong attempts
- Smooth panel slides
- Scale and rotate transitions
