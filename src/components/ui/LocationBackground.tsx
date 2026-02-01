import React from 'react';

// 장소별 배경 설정
interface LocationBackgroundProps {
  locationId?: string;
  locationName?: string;
  atmosphere?: string;
  children: React.ReactNode;
  overlay?: boolean;
}

// 장소별 그라데이션 및 패턴
const LOCATION_THEMES: Record<string, {
  gradient: string;
  pattern: string;
  icon: string;
  ambientColor: string;
}> = {
  // 학교 관련
  classroom: {
    gradient: 'from-slate-800 via-slate-900 to-slate-950',
    pattern: 'bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.1),transparent_50%)]',
    icon: '🏫',
    ambientColor: 'rgba(59,130,246,0.05)'
  },
  hallway: {
    gradient: 'from-slate-900 via-gray-900 to-slate-950',
    pattern: 'bg-[linear-gradient(to_bottom,rgba(100,116,139,0.1),transparent_50%)]',
    icon: '🚪',
    ambientColor: 'rgba(100,116,139,0.05)'
  },
  library: {
    gradient: 'from-amber-950 via-slate-900 to-slate-950',
    pattern: 'bg-[radial-gradient(ellipse_at_bottom,rgba(180,83,9,0.1),transparent_50%)]',
    icon: '📚',
    ambientColor: 'rgba(180,83,9,0.05)'
  },
  gym: {
    gradient: 'from-orange-950 via-slate-900 to-slate-950',
    pattern: 'bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.1),transparent_50%)]',
    icon: '🏀',
    ambientColor: 'rgba(249,115,22,0.05)'
  },
  rooftop: {
    gradient: 'from-sky-950 via-slate-900 to-slate-950',
    pattern: 'bg-[linear-gradient(to_top,transparent,rgba(14,165,233,0.1))]',
    icon: '☁️',
    ambientColor: 'rgba(14,165,233,0.05)'
  },
  basement: {
    gradient: 'from-slate-950 via-gray-950 to-black',
    pattern: 'bg-[radial-gradient(ellipse_at_bottom,rgba(30,30,30,0.5),transparent)]',
    icon: '🔦',
    ambientColor: 'rgba(30,30,30,0.2)'
  },
  office: {
    gradient: 'from-blue-950 via-slate-900 to-slate-950',
    pattern: 'bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.1),transparent_50%)]',
    icon: '🗄️',
    ambientColor: 'rgba(59,130,246,0.05)'
  },
  artroom: {
    gradient: 'from-purple-950 via-slate-900 to-slate-950',
    pattern: 'bg-[radial-gradient(circle_at_bottom_left,rgba(147,51,234,0.1),transparent_50%)]',
    icon: '🎨',
    ambientColor: 'rgba(147,51,234,0.05)'
  },
  sciencelab: {
    gradient: 'from-emerald-950 via-slate-900 to-slate-950',
    pattern: 'bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.1),transparent_50%)]',
    icon: '🔬',
    ambientColor: 'rgba(16,185,129,0.05)'
  },
  computerroom: {
    gradient: 'from-cyan-950 via-slate-900 to-slate-950',
    pattern: 'bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.15),transparent_50%)]',
    icon: '💻',
    ambientColor: 'rgba(6,182,212,0.05)'
  },
  restroom: {
    gradient: 'from-slate-900 via-slate-950 to-black',
    pattern: 'bg-[linear-gradient(to_bottom,rgba(71,85,105,0.1),transparent)]',
    icon: '🚻',
    ambientColor: 'rgba(71,85,105,0.05)'
  },
  storage: {
    gradient: 'from-stone-950 via-slate-950 to-black',
    pattern: 'bg-[radial-gradient(ellipse_at_bottom,rgba(68,64,60,0.2),transparent)]',
    icon: '📦',
    ambientColor: 'rgba(68,64,60,0.1)'
  },
  entrance: {
    gradient: 'from-slate-800 via-slate-900 to-slate-950',
    pattern: 'bg-[linear-gradient(to_bottom,rgba(148,163,184,0.1),transparent_30%)]',
    icon: '🚪',
    ambientColor: 'rgba(148,163,184,0.05)'
  },
  // 외부
  outdoor: {
    gradient: 'from-green-950 via-slate-900 to-slate-950',
    pattern: 'bg-[radial-gradient(ellipse_at_top,rgba(34,197,94,0.1),transparent_50%)]',
    icon: '🌳',
    ambientColor: 'rgba(34,197,94,0.05)'
  },
  temple: {
    gradient: 'from-amber-950 via-red-950 to-slate-950',
    pattern: 'bg-[radial-gradient(ellipse_at_center,rgba(180,83,9,0.15),transparent_50%)]',
    icon: '⛩️',
    ambientColor: 'rgba(180,83,9,0.08)'
  },
  // 기본
  default: {
    gradient: 'from-slate-900 via-slate-900 to-slate-950',
    pattern: 'bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.05),transparent_50%)]',
    icon: '📍',
    ambientColor: 'rgba(99,102,241,0.03)'
  }
};

// 장소 이름으로 테마 찾기
function getLocationTheme(locationId?: string, locationName?: string) {
  const searchStr = `${locationId || ''} ${locationName || ''}`.toLowerCase();

  if (searchStr.includes('교실') || searchStr.includes('classroom')) return LOCATION_THEMES.classroom;
  if (searchStr.includes('복도') || searchStr.includes('hallway') || searchStr.includes('corridor')) return LOCATION_THEMES.hallway;
  if (searchStr.includes('도서') || searchStr.includes('library')) return LOCATION_THEMES.library;
  if (searchStr.includes('체육') || searchStr.includes('gym') || searchStr.includes('강당')) return LOCATION_THEMES.gym;
  if (searchStr.includes('옥상') || searchStr.includes('rooftop')) return LOCATION_THEMES.rooftop;
  if (searchStr.includes('지하') || searchStr.includes('basement') || searchStr.includes('창고')) return LOCATION_THEMES.basement;
  if (searchStr.includes('교무') || searchStr.includes('office') || searchStr.includes('사무')) return LOCATION_THEMES.office;
  if (searchStr.includes('미술') || searchStr.includes('art')) return LOCATION_THEMES.artroom;
  if (searchStr.includes('과학') || searchStr.includes('science') || searchStr.includes('실험')) return LOCATION_THEMES.sciencelab;
  if (searchStr.includes('컴퓨터') || searchStr.includes('computer') || searchStr.includes('전산')) return LOCATION_THEMES.computerroom;
  if (searchStr.includes('화장') || searchStr.includes('restroom') || searchStr.includes('toilet')) return LOCATION_THEMES.restroom;
  if (searchStr.includes('창고') || searchStr.includes('storage')) return LOCATION_THEMES.storage;
  if (searchStr.includes('정문') || searchStr.includes('입구') || searchStr.includes('entrance')) return LOCATION_THEMES.entrance;
  if (searchStr.includes('운동장') || searchStr.includes('outdoor') || searchStr.includes('야외')) return LOCATION_THEMES.outdoor;
  if (searchStr.includes('사찰') || searchStr.includes('temple') || searchStr.includes('절')) return LOCATION_THEMES.temple;

  return LOCATION_THEMES.default;
}

// 분위기별 추가 효과
function getAtmosphereEffect(atmosphere?: string) {
  if (!atmosphere) return '';

  const atmosphereLower = atmosphere.toLowerCase();

  if (atmosphereLower.includes('어두') || atmosphereLower.includes('dark')) {
    return 'after:absolute after:inset-0 after:bg-black/30';
  }
  if (atmosphereLower.includes('긴장') || atmosphereLower.includes('불길') || atmosphereLower.includes('tense')) {
    return 'animate-pulse-slow';
  }
  if (atmosphereLower.includes('조용') || atmosphereLower.includes('quiet')) {
    return 'after:absolute after:inset-0 after:bg-gradient-to-b after:from-transparent after:to-slate-950/50';
  }

  return '';
}

export function LocationBackground({
  locationId,
  locationName,
  atmosphere,
  children,
  overlay = true
}: LocationBackgroundProps) {
  const theme = getLocationTheme(locationId, locationName);
  const atmosphereEffect = getAtmosphereEffect(atmosphere);

  return (
    <div className={`relative min-h-screen bg-gradient-to-br ${theme.gradient}`}>
      {/* 배경 패턴 */}
      <div className={`absolute inset-0 ${theme.pattern}`} />

      {/* 분위기 효과 */}
      {atmosphereEffect && <div className={atmosphereEffect} />}

      {/* 장식 요소 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* 부유하는 파티클 */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/10 rounded-full animate-float"
            style={{
              left: `${10 + (i * 12)}%`,
              top: `${20 + (i * 8) % 60}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + (i % 3)}s`
            }}
          />
        ))}

        {/* 장소 아이콘 (우측 상단) */}
        <div
          className="absolute top-4 right-4 text-6xl opacity-10"
          style={{ filter: 'blur(1px)' }}
        >
          {theme.icon}
        </div>
      </div>

      {/* 오버레이 그라데이션 */}
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
      )}

      {/* 컨텐츠 */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

// 장소 헤더 컴포넌트
interface LocationHeaderProps {
  name: string;
  description?: string;
  atmosphere?: string;
  searchProgress?: number;
}

export function LocationHeader({
  name,
  description,
  atmosphere,
  searchProgress = 0
}: LocationHeaderProps) {
  const theme = getLocationTheme(undefined, name);

  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-3xl">{theme.icon}</span>
        <div>
          <h2 className="text-2xl font-bold text-white">{name}</h2>
          {description && (
            <p className="text-sm text-slate-400">{description}</p>
          )}
        </div>
      </div>

      {atmosphere && (
        <p className="text-sm text-slate-500 italic mb-3">
          "{atmosphere}"
        </p>
      )}

      {searchProgress > 0 && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">조사 진행</span>
          <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden max-w-xs">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-500"
              style={{ width: `${searchProgress}%` }}
            />
          </div>
          <span className="text-xs text-amber-400">{searchProgress}%</span>
        </div>
      )}
    </div>
  );
}

export default LocationBackground;
