import React from 'react';
import { LogicGridPuzzle } from './LogicGridPuzzle';
import { LogicGridData } from '../../types/puzzles';

// Example puzzle data - Murdle-style murder mystery
const examplePuzzleData: LogicGridData = {
  type: 'logic-grid',
  suspects: [
    { id: 'suspect1', name: '김민준', icon: '👨‍💼' },
    { id: 'suspect2', name: '이서연', icon: '👩‍🎓' },
    { id: 'suspect3', name: '박지훈', icon: '👨‍🍳' },
  ],
  categories: [
    {
      id: 'location',
      name: '장소',
      icon: '📍',
      values: ['도서관', '교실', '식당'],
    },
    {
      id: 'weapon',
      name: '흉기',
      icon: '🔪',
      values: ['칼', '독약', '밧줄'],
    },
    {
      id: 'time',
      name: '시각',
      icon: '🕐',
      values: ['12시', '1시', '2시'],
    },
  ],
  clues: [
    {
      id: 'clue1',
      text: '김민준은 도서관에 없었으며, 독약을 사용하지 않았습니다.',
      difficulty: 1,
    },
    {
      id: 'clue2',
      text: '범인은 칼을 사용하지 않았습니다. 그리고 교실에서 범행이 일어나지 않았습니다.',
      difficulty: 2,
    },
    {
      id: 'clue3',
      text: '이서연은 12시에 현장에 있었지만 범인이 아닙니다. 그녀는 도서관에 있었습니다.',
      difficulty: 1,
    },
    {
      id: 'clue4',
      text: '박지훈은 1시에 있지 않았습니다. 식당에서 범행이 일어났습니다.',
      difficulty: 2,
    },
    {
      id: 'clue5',
      text: '밧줄은 2시에 사용되었으며, 김민준은 2시에 있지 않았습니다.',
      difficulty: 3,
    },
  ],
  solution: {
    suspect1: {
      location: '교실',
      weapon: '밧줄',
      time: '1시',
    },
    suspect2: {
      location: '도서관',
      weapon: '칼',
      time: '12시',
    },
    suspect3: {
      location: '식당',
      weapon: '독약',
      time: '2시',
    },
  },
};

// More complex example with 4 suspects and 4 categories
const complexPuzzleData: LogicGridData = {
  type: 'logic-grid',
  suspects: [
    { id: 's1', name: '최유나', icon: '👩‍💼' },
    { id: 's2', name: '강태민', icon: '👨‍🔬' },
    { id: 's3', name: '윤지원', icon: '👩‍⚕️' },
    { id: 's4', name: '정수호', icon: '👨‍🎨' },
  ],
  categories: [
    {
      id: 'location',
      name: '발견 장소',
      icon: '📍',
      values: ['옥상', '지하', '로비', '주차장'],
    },
    {
      id: 'evidence',
      name: '증거',
      icon: '🔍',
      values: ['지문', '혈흔', '섬유', '머리카락'],
    },
    {
      id: 'motive',
      name: '동기',
      icon: '💭',
      values: ['돈', '복수', '질투', '비밀'],
    },
    {
      id: 'alibi',
      name: '알리바이',
      icon: '📋',
      values: ['없음', '약함', '강함', '완벽'],
    },
  ],
  clues: [
    {
      id: 'c1',
      text: '옥상에서 발견된 증거는 지문이 아니며, 돈이 동기인 사람과 관련이 없습니다.',
      difficulty: 2,
    },
    {
      id: 'c2',
      text: '최유나의 알리바이는 약하며, 그녀는 지하에서 발견되지 않았습니다.',
      difficulty: 1,
    },
    {
      id: 'c3',
      text: '강태민은 완벽한 알리바이를 가지고 있으며, 혈흔과는 관련이 없습니다.',
      difficulty: 2,
    },
    {
      id: 'c4',
      text: '복수가 동기인 사람은 주차장에서 발견되었고, 섬유 증거와 연결됩니다.',
      difficulty: 3,
    },
    {
      id: 'c5',
      text: '윤지원은 질투가 동기이며, 로비에 있지 않았습니다. 그녀의 알리바이는 없음입니다.',
      difficulty: 2,
    },
    {
      id: 'c6',
      text: '정수호는 비밀을 숨기고 있으며, 로비에서 발견되었습니다. 머리카락 증거는 그와 관련이 없습니다.',
      difficulty: 3,
    },
    {
      id: 'c7',
      text: '지문은 강한 알리바이를 가진 사람의 것이며, 지하에서 발견되었습니다.',
      difficulty: 3,
    },
    {
      id: 'c8',
      text: '돈이 동기인 사람은 알리바이가 약하며, 혈흔과 연결됩니다.',
      difficulty: 2,
    },
  ],
  solution: {
    s1: {
      location: '옥상',
      evidence: '혈흔',
      motive: '돈',
      alibi: '약함',
    },
    s2: {
      location: '지하',
      evidence: '지문',
      motive: '비밀',
      alibi: '완벽',
    },
    s3: {
      location: '주차장',
      evidence: '섬유',
      motive: '질투',
      alibi: '없음',
    },
    s4: {
      location: '로비',
      evidence: '머리카락',
      motive: '복수',
      alibi: '강함',
    },
  },
};

export function LogicGridPuzzleDemo() {
  const [currentPuzzle, setCurrentPuzzle] = React.useState<'simple' | 'complex'>('simple');

  const handleSolve = (score: number) => {
    console.log('Puzzle solved! Score:', score);
    alert(`퍼즐 완료! 점수: ${score}점`);
  };

  return (
    <div className="w-screen h-screen bg-slate-900">
      <div className="p-4 border-b border-slate-700 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Logic Grid Puzzle Demo</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPuzzle('simple')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              currentPuzzle === 'simple'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            간단한 퍼즐 (3x3)
          </button>
          <button
            onClick={() => setCurrentPuzzle('complex')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              currentPuzzle === 'complex'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            복잡한 퍼즐 (4x4)
          </button>
        </div>
      </div>
      <div className="h-[calc(100vh-80px)]">
        <LogicGridPuzzle
          key={currentPuzzle}
          data={currentPuzzle === 'simple' ? examplePuzzleData : complexPuzzleData}
          onSolve={handleSolve}
        />
      </div>
    </div>
  );
}
