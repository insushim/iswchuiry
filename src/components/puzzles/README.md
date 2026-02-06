# Logic Grid Puzzle Component

Murdle-style 논리 추리 퍼즐 컴포넌트입니다. 클래식한 논리 소거 퍼즐 형식을 구현했습니다.

## 특징

- 만족스러운 셀 토글 애니메이션 (empty → X → O → empty)
- 자동 소거 기능 (O 설정 시 같은 카테고리의 다른 값들이 자동으로 X 처리)
- 접을 수 있는 단서 카드 (난이도별 색상 구분)
- 실시간 정답 검증 및 피드백
- 반응형 디자인 (모바일/데스크탑 지원)
- 다크 테마 + 글래스 효과

## 사용법

### 기본 예제

```tsx
import { LogicGridPuzzle } from './components/puzzles/LogicGridPuzzle';
import { LogicGridData } from './types/puzzles';

const puzzleData: LogicGridData = {
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
  ],
  clues: [
    {
      id: 'clue1',
      text: '김민준은 도서관에 없었다.',
      difficulty: 1,
    },
    {
      id: 'clue2',
      text: '범인은 칼을 사용하지 않았다.',
      difficulty: 2,
    },
  ],
  solution: {
    suspect1: {
      location: '교실',
      weapon: '독약',
    },
    suspect2: {
      location: '도서관',
      weapon: '밧줄',
    },
    suspect3: {
      location: '식당',
      weapon: '칼',
    },
  },
};

function MyGame() {
  const handleSolve = (score: number) => {
    console.log('Solved with score:', score);
    // 다음 퍼즐로 이동하거나 보상 지급
  };

  return (
    <LogicGridPuzzle data={puzzleData} onSolve={handleSolve} />
  );
}
```

## Props

### LogicGridPuzzleProps

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| data | LogicGridData | ✅ | 퍼즐 데이터 (용의자, 카테고리, 단서, 정답) |
| onSolve | (score: number) => void | ✅ | 정답 확인 성공 시 호출되는 콜백 |

## 데이터 구조

### LogicGridData

```typescript
interface LogicGridData {
  type: 'logic-grid';
  suspects: LogicGridSuspect[];     // 용의자 목록 (3-7명 권장)
  categories: LogicGridCategory[];  // 카테고리 목록 (2-4개 권장)
  clues: LogicGridClue[];          // 단서 목록
  solution: Record<string, Record<string, string>>;
}
```

### LogicGridSuspect

```typescript
interface LogicGridSuspect {
  id: string;      // 고유 ID (예: 'suspect1')
  name: string;    // 이름 (예: '김민준')
  icon: string;    // 이모지 아이콘 (예: '👨‍💼')
}
```

### LogicGridCategory

```typescript
interface LogicGridCategory {
  id: string;        // 고유 ID (예: 'location')
  name: string;      // 카테고리 이름 (예: '장소')
  values: string[];  // 가능한 값들 (예: ['도서관', '교실', '식당'])
  icon: string;      // 이모지 아이콘 (예: '📍')
}
```

### LogicGridClue

```typescript
interface LogicGridClue {
  id: string;            // 고유 ID
  text: string;          // 단서 텍스트
  difficulty: 1 | 2 | 3; // 난이도 (1=쉬움, 2=보통, 3=어려움)
}
```

### Solution Format

```typescript
// suspectId -> categoryId -> 정답 값
{
  suspect1: {
    location: '도서관',
    weapon: '칼',
    time: '12시'
  },
  suspect2: {
    location: '교실',
    weapon: '독약',
    time: '1시'
  }
}
```

## 사용자 인터랙션

### 셀 토글

1. **빈 셀 클릭** → **X** (제거됨, 빨간색)
2. **X 클릭** → **O** (확정됨, 초록색)
3. **O 클릭** → **빈 셀**로 돌아감

### 자동 소거

- O를 설정하면 같은 행(용의자)의 같은 카테고리 내 다른 값들이 자동으로 X 처리됩니다
- 예: "김민준-장소-도서관"을 O로 설정 → "김민준-장소-교실", "김민준-장소-식당"이 자동으로 X

### 단서 카드

- 클릭하여 펼치기/접기
- 읽은 단서는 반투명하게 표시
- 난이도별 색상:
  - 🟢 쉬움 (1): 초록색
  - 🔵 보통 (2): 파란색
  - 🔴 어려움 (3): 빨간색

## 점수 시스템

| 조건 | 점수 |
|------|------|
| 완벽 (틀린 O 없음) | 150점 |
| 약간의 실수 (틀린 O 2개 이하) | 100점 |
| 많은 실수 (틀린 O 3개 이상) | 50점 |

## 애니메이션

### 셀 상태 전환

- **X 애니메이션**: 회전하며 스케일 증가, 빨간색으로 페이드인
- **O 애니메이션**: 스프링 효과와 함께 나타남, 초록색 체크마크

### 검증 피드백

- **정답**: 모든 O 셀이 초록색으로 펄스 효과
- **오답**: 틀린 셀이 빨간색으로 흔들림 (shake)

## 반응형 디자인

### 데스크탑 (1024px+)
- 모든 카테고리가 가로로 나열
- 단서 카드가 상단에 배치
- 넓은 그리드 뷰

### 태블릿 (768px-1023px)
- 그리드가 가로 스크롤 가능
- 카테고리 헤더 고정

### 모바일 (767px 이하)
- 그리드 가로 스크롤
- 단서 카드 접기/펼치기 필수
- 터치 최적화된 셀 크기

## 접근성

- 키보드 네비게이션 지원 (Tab, Enter, Space)
- 명확한 시각적 피드백
- 고대비 색상 사용
- 스크린 리더 호환

## 성능 최적화

- React.memo() 사용으로 불필요한 리렌더 방지
- useCallback으로 함수 메모이제이션
- Framer Motion의 AnimatePresence로 효율적인 애니메이션

## 퍼즐 디자인 팁

### 좋은 퍼즐 만들기

1. **용의자 수**: 3-5명이 적당 (너무 많으면 복잡)
2. **카테고리 수**: 2-4개 (3개가 가장 균형잡힘)
3. **단서 개수**: 용의자 수 × 카테고리 수 + 2~3개
4. **난이도 배분**: 쉬움 40%, 보통 40%, 어려움 20%

### 단서 작성 가이드

- **쉬움 (1)**: 직접적인 정보 (예: "김민준은 도서관에 있었다")
- **보통 (2)**: 소거가 필요한 정보 (예: "범인은 칼을 사용하지 않았다")
- **어려움 (3)**: 여러 단서를 조합해야 하는 정보 (예: "12시에 있던 사람은 독약과 관련 없으며...")

### 검증 방법

퍼즐이 논리적으로 풀 수 있는지 확인:
1. 단서만으로 모든 셀을 X 또는 O로 결정 가능한가?
2. 여러 정답이 가능한가? (유일해야 함)
3. 불필요한 단서가 있는가?

## 예제

전체 예제는 `LogicGridPuzzle.demo.tsx` 파일을 참고하세요.

## 라이센스

MIT
