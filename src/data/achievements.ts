// ========================================
// DEDUCTIO - 업적 시스템 정의
// 100대 두뇌/추리게임 혁신 반영
// ========================================

export interface AchievementDef {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'mastery' | 'streak' | 'collection' | 'speed' | 'exploration' | 'special';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  condition: string;
  maxProgress?: number;
}

// ========================================
// 업적 정의 (30+)
// ========================================

export const ACHIEVEMENTS: AchievementDef[] = [
  // ── Mastery (숙련) ──────────────────────────
  {
    id: 'first_case_solved',
    name: '첫 사건 해결',
    description: '첫 번째 사건을 성공적으로 해결했습니다.',
    icon: '🔍',
    category: 'mastery',
    rarity: 'common',
    condition: '사건 1회 해결',
  },
  {
    id: 's_rank_1',
    name: '명탐정의 자질',
    description: 'S 랭크를 1회 달성했습니다.',
    icon: '⭐',
    category: 'mastery',
    rarity: 'rare',
    condition: 'S 랭크 1회 달성',
  },
  {
    id: 's_rank_5',
    name: '명탐정',
    description: 'S 랭크를 5회 달성했습니다.',
    icon: '🌟',
    category: 'mastery',
    rarity: 'epic',
    condition: 'S 랭크 5회 달성',
    maxProgress: 5,
  },
  {
    id: 's_rank_10',
    name: '전설의 탐정',
    description: 'S 랭크를 10회 달성했습니다.',
    icon: '💎',
    category: 'mastery',
    rarity: 'legendary',
    condition: 'S 랭크 10회 달성',
    maxProgress: 10,
  },
  {
    id: 'perfect_deduction',
    name: '완벽한 추론',
    description: '한 사건에서 5가지 추론을 모두 맞혔습니다.',
    icon: '🧠',
    category: 'mastery',
    rarity: 'epic',
    condition: '추론 5/5 정답',
  },
  {
    id: 'no_hint_clear',
    name: '직감의 탐정',
    description: '힌트를 한 번도 사용하지 않고 사건을 해결했습니다.',
    icon: '🎯',
    category: 'mastery',
    rarity: 'rare',
    condition: '힌트 0회 사용 클리어',
  },
  {
    id: 'all_evidence_collected',
    name: '증거 수집가',
    description: '한 사건에서 모든 증거를 수집했습니다.',
    icon: '📦',
    category: 'mastery',
    rarity: 'rare',
    condition: '증거 100% 수집 클리어',
  },
  {
    id: 'flawless_victory',
    name: '완벽한 승리',
    description: '힌트 0, 모든 증거 수집, S 랭크를 동시에 달성했습니다.',
    icon: '👑',
    category: 'mastery',
    rarity: 'legendary',
    condition: '힌트 0 + 증거 전부 + S 랭크',
  },

  // ── Streak (연속) ──────────────────────────
  {
    id: 'streak_3',
    name: '꾸준한 탐정',
    description: '3일 연속으로 게임을 플레이했습니다.',
    icon: '🔥',
    category: 'streak',
    rarity: 'common',
    condition: '3일 연속 플레이',
    maxProgress: 3,
  },
  {
    id: 'streak_7',
    name: '일주일의 집념',
    description: '7일 연속으로 게임을 플레이했습니다.',
    icon: '🔥',
    category: 'streak',
    rarity: 'rare',
    condition: '7일 연속 플레이',
    maxProgress: 7,
  },
  {
    id: 'streak_30',
    name: '한 달의 수련',
    description: '30일 연속으로 게임을 플레이했습니다.',
    icon: '🔥',
    category: 'streak',
    rarity: 'epic',
    condition: '30일 연속 플레이',
    maxProgress: 30,
  },
  {
    id: 'streak_90',
    name: '분기의 헌신',
    description: '90일 연속으로 게임을 플레이했습니다.',
    icon: '🔥',
    category: 'streak',
    rarity: 'epic',
    condition: '90일 연속 플레이',
    maxProgress: 90,
  },
  {
    id: 'streak_365',
    name: '영원한 탐정',
    description: '365일 연속으로 게임을 플레이했습니다.',
    icon: '🏆',
    category: 'streak',
    rarity: 'legendary',
    condition: '365일 연속 플레이',
    maxProgress: 365,
  },

  // ── Collection (수집) ──────────────────────────
  {
    id: 'case_type_theft',
    name: '도난 전문가',
    description: '도난 사건을 10회 해결했습니다.',
    icon: '🗝️',
    category: 'collection',
    rarity: 'rare',
    condition: '도난 사건 10회 해결',
    maxProgress: 10,
  },
  {
    id: 'case_type_vandalism',
    name: '파손 분석가',
    description: '기물파손 사건을 10회 해결했습니다.',
    icon: '🔨',
    category: 'collection',
    rarity: 'rare',
    condition: '기물파손 사건 10회 해결',
    maxProgress: 10,
  },
  {
    id: 'case_type_mystery',
    name: '미스터리 해결사',
    description: '미스터리 사건을 10회 해결했습니다.',
    icon: '❓',
    category: 'collection',
    rarity: 'rare',
    condition: '미스터리 사건 10회 해결',
    maxProgress: 10,
  },
  {
    id: 'case_type_disappearance',
    name: '실종 추적자',
    description: '실종 사건을 10회 해결했습니다.',
    icon: '👤',
    category: 'collection',
    rarity: 'rare',
    condition: '실종 사건 10회 해결',
    maxProgress: 10,
  },
  {
    id: 'case_type_fraud',
    name: '사기 감별사',
    description: '사기 사건을 10회 해결했습니다.',
    icon: '📝',
    category: 'collection',
    rarity: 'rare',
    condition: '사기 사건 10회 해결',
    maxProgress: 10,
  },
  {
    id: 'case_type_blackmail',
    name: '협박 저지자',
    description: '협박 사건을 10회 해결했습니다.',
    icon: '📧',
    category: 'collection',
    rarity: 'rare',
    condition: '협박 사건 10회 해결',
    maxProgress: 10,
  },
  {
    id: 'difficulty_easy_master',
    name: '초보 졸업',
    description: '쉬움 난이도를 10회 클리어했습니다.',
    icon: '🟢',
    category: 'collection',
    rarity: 'common',
    condition: '쉬움 10회 클리어',
    maxProgress: 10,
  },
  {
    id: 'difficulty_medium_master',
    name: '중급 탐정',
    description: '보통 난이도를 10회 클리어했습니다.',
    icon: '🟡',
    category: 'collection',
    rarity: 'rare',
    condition: '보통 10회 클리어',
    maxProgress: 10,
  },
  {
    id: 'difficulty_hard_master',
    name: '상급 탐정',
    description: '어려움 난이도를 10회 클리어했습니다.',
    icon: '🟠',
    category: 'collection',
    rarity: 'epic',
    condition: '어려움 10회 클리어',
    maxProgress: 10,
  },
  {
    id: 'difficulty_expert_master',
    name: '최고의 탐정',
    description: '전문가 난이도를 10회 클리어했습니다.',
    icon: '🔴',
    category: 'collection',
    rarity: 'legendary',
    condition: '전문가 10회 클리어',
    maxProgress: 10,
  },
  {
    id: 'games_10',
    name: '신참 탐정',
    description: '총 10회 게임을 플레이했습니다.',
    icon: '📋',
    category: 'collection',
    rarity: 'common',
    condition: '10게임 플레이',
    maxProgress: 10,
  },
  {
    id: 'games_50',
    name: '숙련된 탐정',
    description: '총 50회 게임을 플레이했습니다.',
    icon: '📋',
    category: 'collection',
    rarity: 'rare',
    condition: '50게임 플레이',
    maxProgress: 50,
  },
  {
    id: 'games_100',
    name: '베테랑 탐정',
    description: '총 100회 게임을 플레이했습니다.',
    icon: '🏅',
    category: 'collection',
    rarity: 'epic',
    condition: '100게임 플레이',
    maxProgress: 100,
  },
  {
    id: 'total_evidence_100',
    name: '증거의 산',
    description: '누적 100개의 증거를 수집했습니다.',
    icon: '🗄️',
    category: 'collection',
    rarity: 'rare',
    condition: '누적 증거 100개 수집',
    maxProgress: 100,
  },
  {
    id: 'total_evidence_500',
    name: '증거 창고',
    description: '누적 500개의 증거를 수집했습니다.',
    icon: '🏛️',
    category: 'collection',
    rarity: 'epic',
    condition: '누적 증거 500개 수집',
    maxProgress: 500,
  },

  // ── Speed (속도) ──────────────────────────
  {
    id: 'speed_10min',
    name: '번개 추리',
    description: '10분 이내에 사건을 해결했습니다.',
    icon: '⚡',
    category: 'speed',
    rarity: 'rare',
    condition: '10분 이내 클리어',
  },
  {
    id: 'speed_5min',
    name: '직감의 번개',
    description: '5분 이내에 사건을 해결했습니다.',
    icon: '⚡',
    category: 'speed',
    rarity: 'epic',
    condition: '5분 이내 클리어',
  },
  {
    id: 'speed_3min',
    name: '순간 포착',
    description: '3분 이내에 사건을 해결했습니다.',
    icon: '💨',
    category: 'speed',
    rarity: 'legendary',
    condition: '3분 이내 클리어',
  },

  // ── Exploration (탐험) ──────────────────────────
  {
    id: 'all_locations_searched',
    name: '구석구석 탐정',
    description: '한 사건에서 모든 장소를 조사했습니다.',
    icon: '🗺️',
    category: 'exploration',
    rarity: 'common',
    condition: '한 사건 모든 장소 조사',
  },
  {
    id: 'all_characters_interviewed',
    name: '사교적 탐정',
    description: '한 사건에서 모든 인물을 심문했습니다.',
    icon: '💬',
    category: 'exploration',
    rarity: 'common',
    condition: '한 사건 모든 인물 심문',
  },
  {
    id: 'contradictions_5',
    name: '모순 발견자',
    description: '총 5개의 모순을 발견했습니다.',
    icon: '⚖️',
    category: 'exploration',
    rarity: 'rare',
    condition: '누적 모순 5개 발견',
    maxProgress: 5,
  },
  {
    id: 'contradictions_20',
    name: '이의 있소!',
    description: '총 20개의 모순을 발견했습니다.',
    icon: '⚖️',
    category: 'exploration',
    rarity: 'epic',
    condition: '누적 모순 20개 발견',
    maxProgress: 20,
  },

  // ── Special (특수) ──────────────────────────
  {
    id: 'daily_first',
    name: '오늘의 사건',
    description: '첫 번째 일일 도전을 완료했습니다.',
    icon: '📅',
    category: 'special',
    rarity: 'common',
    condition: '일일 도전 1회 완료',
  },
  {
    id: 'daily_7',
    name: '주간 탐정',
    description: '일일 도전을 7회 완료했습니다.',
    icon: '📅',
    category: 'special',
    rarity: 'rare',
    condition: '일일 도전 7회 완료',
    maxProgress: 7,
  },
  {
    id: 'daily_30',
    name: '월간 탐정',
    description: '일일 도전을 30회 완료했습니다.',
    icon: '📅',
    category: 'special',
    rarity: 'epic',
    condition: '일일 도전 30회 완료',
    maxProgress: 30,
  },
  {
    id: 'win_streak_3',
    name: '연승 개시',
    description: '3연승을 달성했습니다.',
    icon: '🎰',
    category: 'special',
    rarity: 'common',
    condition: '3연승',
    maxProgress: 3,
  },
  {
    id: 'win_streak_10',
    name: '무패 행진',
    description: '10연승을 달성했습니다.',
    icon: '🎰',
    category: 'special',
    rarity: 'epic',
    condition: '10연승',
    maxProgress: 10,
  },
  {
    id: 'style_analyst_10',
    name: '분석형 탐정 마스터',
    description: '분석형 스타일로 10회 클리어했습니다.',
    icon: '🔬',
    category: 'special',
    rarity: 'rare',
    condition: '분석형 스타일 10회 클리어',
    maxProgress: 10,
  },
  {
    id: 'style_intuitive_10',
    name: '직관형 탐정 마스터',
    description: '직관형 스타일로 10회 클리어했습니다.',
    icon: '🌙',
    category: 'special',
    rarity: 'rare',
    condition: '직관형 스타일 10회 클리어',
    maxProgress: 10,
  },
  {
    id: 'style_social_10',
    name: '사교형 탐정 마스터',
    description: '사교형 스타일로 10회 클리어했습니다.',
    icon: '🤝',
    category: 'special',
    rarity: 'rare',
    condition: '사교형 스타일 10회 클리어',
    maxProgress: 10,
  },
  {
    id: 'comeback_victory',
    name: '역전승',
    description: '힌트를 4회 이상 사용하고도 S 랭크를 달성했습니다.',
    icon: '🔄',
    category: 'special',
    rarity: 'epic',
    condition: '힌트 4회 이상 사용 후 S 랭크',
  },
  {
    id: 'night_owl',
    name: '야행성 탐정',
    description: '자정(00:00~05:00)에 사건을 해결했습니다.',
    icon: '🦉',
    category: 'special',
    rarity: 'rare',
    condition: '자정~새벽 5시 사이 클리어',
  },
  {
    id: 'early_bird',
    name: '새벽 탐정',
    description: '이른 아침(05:00~07:00)에 사건을 해결했습니다.',
    icon: '🌅',
    category: 'special',
    rarity: 'rare',
    condition: '새벽 5시~7시 사이 클리어',
  },
  {
    id: 'score_10000',
    name: '만점 탐정',
    description: '누적 점수 10,000점을 달성했습니다.',
    icon: '🏆',
    category: 'special',
    rarity: 'rare',
    condition: '누적 점수 10,000점',
    maxProgress: 10000,
  },
  {
    id: 'score_100000',
    name: '전설의 기록',
    description: '누적 점수 100,000점을 달성했습니다.',
    icon: '👑',
    category: 'special',
    rarity: 'legendary',
    condition: '누적 점수 100,000점',
    maxProgress: 100000,
  },
];

// ========================================
// 업적 유틸리티 함수
// ========================================

/** 업적 ID로 업적 정의를 조회합니다 */
export function getAchievementById(id: string): AchievementDef | undefined {
  return ACHIEVEMENTS.find(a => a.id === id);
}

/** 카테고리별 업적 목록을 반환합니다 */
export function getAchievementsByCategory(category: AchievementDef['category']): AchievementDef[] {
  return ACHIEVEMENTS.filter(a => a.category === category);
}

/** 희귀도별 업적 목록을 반환합니다 */
export function getAchievementsByRarity(rarity: AchievementDef['rarity']): AchievementDef[] {
  return ACHIEVEMENTS.filter(a => a.rarity === rarity);
}

/** 업적의 희귀도 색상을 반환합니다 */
export function getRarityColor(rarity: AchievementDef['rarity']): string {
  switch (rarity) {
    case 'common': return '#9ca3af';    // 회색
    case 'rare': return '#3b82f6';      // 파란색
    case 'epic': return '#a855f7';      // 보라색
    case 'legendary': return '#f59e0b'; // 금색
  }
}

/** 업적의 희귀도 한국어 이름을 반환합니다 */
export function getRarityName(rarity: AchievementDef['rarity']): string {
  switch (rarity) {
    case 'common': return '일반';
    case 'rare': return '희귀';
    case 'epic': return '영웅';
    case 'legendary': return '전설';
  }
}

/** 카테고리의 한국어 이름을 반환합니다 */
export function getCategoryName(category: AchievementDef['category']): string {
  switch (category) {
    case 'mastery': return '숙련';
    case 'streak': return '연속';
    case 'collection': return '수집';
    case 'speed': return '속도';
    case 'exploration': return '탐험';
    case 'special': return '특수';
  }
}
