import React from 'react';

// 캐릭터 아바타 속성
interface AvatarProps {
  gender: 'male' | 'female';
  age: number;
  occupation: string;
  personality?: string;
  isCulprit?: boolean;
  isVictim?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

// 성별/나이/직업에 따른 아바타 파츠
const HAIR_STYLES = {
  male: {
    young: ['🧑', '👦', '🧒'],
    adult: ['👨', '🧔', '👴'],
  },
  female: {
    young: ['👧', '👩‍🦰', '👱‍♀️'],
    adult: ['👩', '👩‍🦳', '👵'],
  }
};

const OCCUPATION_ICONS: Record<string, string> = {
  // 학생
  '학생': '📚',
  '반장': '⭐',
  '부반장': '✨',
  '학생회장': '👑',
  '학생회 부회장': '🎖️',
  '도서부원': '📖',
  '미술반': '🎨',
  '축구부': '⚽',
  '방송부': '🎙️',
  '과학부': '🔬',

  // 교직원
  '교사': '👔',
  '담임교사': '📝',
  '미술 교사': '🖼️',
  '체육 교사': '🏃',
  '과학 교사': '🧪',
  '컴퓨터 교사': '💻',
  '도서관 사서': '📚',
  '경비원': '🔒',
  '관리인': '🔧',
  '교감': '📋',
  '교장': '🏫',

  // 기타
  '기자': '📰',
  '의사': '🩺',
  '변호사': '⚖️',
  '사업가': '💼',
  '자영업': '🏪',
  '회사원': '👔',
  '경찰': '👮',
};

const PERSONALITY_COLORS: Record<string, string> = {
  '책임감': 'from-blue-400 to-blue-600',
  '야망': 'from-purple-400 to-purple-600',
  '정의': 'from-green-400 to-green-600',
  '친절': 'from-pink-400 to-pink-600',
  '냉정': 'from-slate-400 to-slate-600',
  '분노': 'from-red-400 to-red-600',
  '두려움': 'from-gray-400 to-gray-600',
  '질투': 'from-emerald-400 to-emerald-600',
  default: 'from-indigo-400 to-indigo-600',
};

// 사이즈 맵
const SIZE_MAP = {
  sm: { container: 'w-12 h-12', icon: 'text-2xl', badge: 'text-xs' },
  md: { container: 'w-16 h-16', icon: 'text-3xl', badge: 'text-sm' },
  lg: { container: 'w-20 h-20', icon: 'text-4xl', badge: 'text-base' },
  xl: { container: 'w-24 h-24', icon: 'text-5xl', badge: 'text-lg' },
};

export function CharacterAvatar({
  gender,
  age,
  occupation,
  personality,
  isCulprit = false,
  isVictim = false,
  size = 'md',
  className = ''
}: AvatarProps) {
  // 나이 그룹 결정
  const ageGroup = age < 25 ? 'young' : 'adult';

  // 기본 아바타 이모지 선택
  const hairOptions = HAIR_STYLES[gender][ageGroup];
  const baseEmoji = hairOptions[Math.floor(age % hairOptions.length)];

  // 직업 아이콘
  const occupationIcon = Object.entries(OCCUPATION_ICONS).find(([key]) =>
    occupation.includes(key)
  )?.[1] || '👤';

  // 성격에 따른 색상
  const personalityColor = personality
    ? Object.entries(PERSONALITY_COLORS).find(([key]) =>
        personality.includes(key)
      )?.[1] || PERSONALITY_COLORS.default
    : PERSONALITY_COLORS.default;

  // 상태에 따른 테두리
  let borderColor = 'border-slate-600';
  let statusBadge = null;

  if (isCulprit) {
    borderColor = 'border-red-500 ring-2 ring-red-500/50';
    statusBadge = '🔴';
  } else if (isVictim) {
    borderColor = 'border-amber-500 ring-2 ring-amber-500/50';
    statusBadge = '⚠️';
  }

  const sizeConfig = SIZE_MAP[size];

  return (
    <div className={`relative ${className}`}>
      {/* 메인 아바타 */}
      <div
        className={`
          ${sizeConfig.container}
          rounded-full
          bg-gradient-to-br ${personalityColor}
          flex items-center justify-center
          border-2 ${borderColor}
          shadow-lg
          relative
          overflow-hidden
        `}
      >
        {/* 배경 패턴 */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent)]" />
        </div>

        {/* 캐릭터 이모지 */}
        <span className={`${sizeConfig.icon} relative z-10`}>
          {baseEmoji}
        </span>
      </div>

      {/* 직업 배지 */}
      <div
        className={`
          absolute -bottom-1 -right-1
          ${size === 'sm' ? 'w-5 h-5' : size === 'md' ? 'w-6 h-6' : 'w-7 h-7'}
          bg-slate-800 rounded-full
          flex items-center justify-center
          border border-slate-600
          shadow-md
        `}
      >
        <span className={sizeConfig.badge}>{occupationIcon}</span>
      </div>

      {/* 상태 배지 (범인/피해자) */}
      {statusBadge && (
        <div
          className={`
            absolute -top-1 -right-1
            ${size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'}
            flex items-center justify-center
          `}
        >
          <span className="text-xs">{statusBadge}</span>
        </div>
      )}
    </div>
  );
}

// 캐릭터 카드 컴포넌트
interface CharacterCardProps {
  name: string;
  gender: 'male' | 'female';
  age: number;
  occupation: string;
  personality?: string;
  description?: string;
  isCulprit?: boolean;
  isVictim?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
  suspicionLevel?: number;
}

export function CharacterCard({
  name,
  gender,
  age,
  occupation,
  personality,
  description,
  isCulprit = false,
  isVictim = false,
  isSelected = false,
  onClick,
  suspicionLevel = 0
}: CharacterCardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        card cursor-pointer transition-all duration-200
        ${isSelected ? 'ring-2 ring-amber-400 bg-amber-400/10' : 'hover:bg-slate-700/50'}
        ${onClick ? 'hover:scale-102' : ''}
      `}
    >
      <div className="flex items-start gap-4">
        <CharacterAvatar
          gender={gender}
          age={age}
          occupation={occupation}
          personality={personality}
          isCulprit={isCulprit}
          isVictim={isVictim}
          size="lg"
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-bold text-white truncate">{name}</h3>
            {suspicionLevel > 0 && (
              <div className="flex items-center gap-1">
                <span className="text-xs text-red-400">의심도</span>
                <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-yellow-400 to-red-500"
                    style={{ width: `${suspicionLevel}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          <p className="text-sm text-slate-400 mb-1">
            {occupation} · {age}세
          </p>

          {description && (
            <p className="text-xs text-slate-500 line-clamp-2">
              {description}
            </p>
          )}

          {isVictim && (
            <span className="inline-block mt-2 px-2 py-0.5 text-xs bg-amber-500/20 text-amber-400 rounded">
              피해자
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default CharacterAvatar;
