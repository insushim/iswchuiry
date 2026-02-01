// ========================================
// 상업용 고유 시나리오 105개+ - 수작업 제작
// ========================================

import { Scenario } from './types';

// 시나리오 카테고리별 import
import { theftScenarios } from './theft';
import { theftScenariosPart1 } from './theft-part1';
import { theftScenariosPart2 } from './theft-part2';
import { theftScenariosPart3 } from './theft-part3';
import { theftScenariosPart4 } from './theft-part4';
import { vandalismScenarios } from './vandalism';
import { mysteryScenarios } from './mystery';
import { disappearanceScenarios } from './disappearance';
import { fraudScenarios } from './fraud';
import fraudScenariosPart2 from './fraud-part2';
import { blackmailScenarios } from './blackmail';
import { specialScenarios } from './special';

// 전체 시나리오 export
export const ALL_SCENARIOS: Scenario[] = [
  ...theftScenarios,
  ...theftScenariosPart1,
  ...theftScenariosPart2,
  ...theftScenariosPart3,
  ...theftScenariosPart4,
  ...vandalismScenarios,
  ...mysteryScenarios,
  ...disappearanceScenarios,
  ...fraudScenarios,
  ...fraudScenariosPart2,
  ...blackmailScenarios,
  ...specialScenarios
];

// 난이도별 시나리오 필터
export const getScenariosByDifficulty = (difficulty: 'easy' | 'medium' | 'hard' | 'expert'): Scenario[] => {
  return ALL_SCENARIOS.filter(s => s.difficulty === difficulty);
};

// 타입별 시나리오 필터
export const getScenariosByType = (type: string): Scenario[] => {
  return ALL_SCENARIOS.filter(s => s.type === type);
};

// 랜덤 시나리오 선택
export const getRandomScenario = (difficulty?: string, type?: string): Scenario => {
  let filtered = ALL_SCENARIOS;

  if (difficulty) {
    filtered = filtered.filter(s => s.difficulty === difficulty);
  }
  if (type) {
    filtered = filtered.filter(s => s.type === type);
  }

  if (filtered.length === 0) {
    filtered = ALL_SCENARIOS;
  }

  return filtered[Math.floor(Math.random() * filtered.length)];
};

// 시나리오 ID로 찾기
export const getScenarioById = (id: string): Scenario | undefined => {
  return ALL_SCENARIOS.find(s => s.id === id);
};

export * from './types';
