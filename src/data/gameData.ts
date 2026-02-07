// ========================================
// 게임 데이터 v2.0 - 상업용 품질 (한국어)
// 100개 이상 케이스 지원
// ========================================

import { DifficultySettings } from '../types';

export const KOREAN_NAMES = {
  male: [
    '김민준', '이서준', '박도윤', '최예준', '정시우',
    '강하준', '조지호', '윤주원', '장현우', '임준혁',
    '한도현', '오건우', '서민재', '신우빈', '권승현',
    '송태현', '유재민', '백승우', '허진우', '남도윤',
    '류현석', '양시현', '심재호', '문준서', '안성민',
    '손지훈', '황민혁', '전승호', '홍태양', '배준영'
  ],
  female: [
    '김서연', '이서윤', '박지우', '최서현', '정민서',
    '강하은', '조하윤', '윤지민', '장채원', '임수아',
    '한지아', '오예린', '서수빈', '신소율', '권예은',
    '송유나', '유하린', '백서영', '허지원', '남채린',
    '류시아', '양하늘', '심수진', '문예지', '안소희',
    '손나연', '황민지', '전수현', '홍세아', '배지은'
  ]
};

export const OCCUPATIONS = {
  school: [
    { id: 'student', name: '학생', description: '학교에 다니는 학생' },
    { id: 'classPresident', name: '반장', description: '학급의 반장으로 책임감이 강하다' },
    { id: 'clubLeader', name: '동아리 부장', description: '동아리를 이끄는 리더십 있는 학생' },
    { id: 'libraryHelper', name: '도서부원', description: '도서관에서 봉사하며 책을 좋아한다' },
    { id: 'studentCouncil', name: '학생회 임원', description: '학생회에서 활동하며 영향력이 있다' },
    { id: 'athlete', name: '운동부원', description: '학교 운동부 소속 선수' },
    { id: 'artClub', name: '미술부원', description: '미술에 재능이 있는 학생' },
    { id: 'scienceClub', name: '과학부원', description: '과학 실험을 좋아하는 학생' },
    { id: 'teacher', name: '교사', description: '학교에서 가르치는 선생님' },
    { id: 'counselor', name: '상담교사', description: '학생 상담을 담당하며 비밀을 많이 안다' },
    { id: 'janitor', name: '관리인', description: '학교 시설을 관리하며 모든 곳에 접근 가능' },
    { id: 'newStudent', name: '전학생', description: '최근에 전학 온 신비로운 학생' }
  ],
  general: [
    { id: 'officeWorker', name: '회사원', description: '회사에서 근무' },
    { id: 'shopOwner', name: '가게 주인', description: '가게를 운영' },
    { id: 'artist', name: '예술가', description: '예술 활동을 하는 사람' },
    { id: 'writer', name: '작가', description: '글을 쓰는 직업' }
  ]
};

export const PERSONALITIES = [
  { id: 'cheerful', name: '쾌활한', traits: ['밝음', '활기참', '낙천적'], behaviors: ['자주 웃는다', '친구가 많다', '긍정적으로 말한다'] },
  { id: 'quiet', name: '조용한', traits: ['과묵함', '신중함', '관찰력'], behaviors: ['말이 적다', '혼자 있기를 좋아한다', '상대방을 잘 관찰한다'] },
  { id: 'confident', name: '자신감 있는', traits: ['당당함', '리더십', '카리스마'], behaviors: ['주도적으로 행동한다', '의견을 강하게 표현한다', '사람들을 이끈다'] },
  { id: 'nervous', name: '신경질적인', traits: ['예민함', '불안함', '의심많음'], behaviors: ['작은 일에도 신경 쓴다', '쉽게 짜증낸다', '의심이 많다'] },
  { id: 'friendly', name: '친절한', traits: ['다정함', '배려심', '사교적'], behaviors: ['남을 잘 돕는다', '편하게 대화한다', '갈등을 피한다'] },
  { id: 'cold', name: '냉담한', traits: ['무뚝뚝함', '감정억제', '독립적'], behaviors: ['감정을 잘 드러내지 않는다', '혼자 일하기를 좋아한다', '거리감이 있다'] },
  { id: 'curious', name: '호기심 많은', traits: ['탐구심', '질문많음', '모험적'], behaviors: ['질문을 많이 한다', '새로운 것을 좋아한다', '위험을 무릅쓴다'] },
  { id: 'ambitious', name: '야심찬', traits: ['목표지향', '경쟁적', '성취욕'], behaviors: ['목표를 위해 노력한다', '경쟁을 좋아한다', '인정받고 싶어한다'] },
  { id: 'secretive', name: '비밀스러운', traits: ['수수께끼', '신비로움', '폐쇄적'], behaviors: ['과거를 말하지 않는다', '비밀이 많다', '진심을 숨긴다'] },
  { id: 'perfectionist', name: '완벽주의적', traits: ['꼼꼼함', '강박적', '높은 기준'], behaviors: ['실수를 용납하지 않는다', '모든 것을 통제하려 한다', '작은 것도 놓치지 않는다'] }
];

export const APPEARANCES = {
  male: [
    '단정하게 정돈된 단발머리에 안경을 쓰고 있다',
    '키가 크고 체격이 좋으며 운동선수처럼 보인다',
    '날카로운 눈매에 차분한 인상을 준다',
    '덥수룩한 머리에 편한 옷차림을 하고 있다',
    '깔끔한 교복 차림에 성실해 보인다',
    '예술가적인 분위기가 풍기는 외모다',
    '조용하고 눈에 띄지 않는 평범한 외모다',
    '밝은 표정에 사람들과 잘 어울리는 모습이다'
  ],
  female: [
    '긴 생머리에 차분한 인상을 준다',
    '활발해 보이는 단발머리를 하고 있다',
    '안경을 쓰고 지적인 분위기가 난다',
    '세련된 옷차림에 자신감이 넘친다',
    '수수한 모습에 친근감이 있다',
    '예쁘장한 외모에 인기가 많아 보인다',
    '조용하고 신비로운 분위기를 풍긴다',
    '밝은 미소가 인상적이다'
  ]
};

// 신체 프로필 데이터 (간접 증거 시스템)
export const PHYSICAL_HEIGHTS = ['단신', '보통키', '장신'] as const;
export const PHYSICAL_BUILDS = ['마른', '보통체격', '건장한'] as const;
export const PHYSICAL_HANDEDNESS = ['왼손잡이', '오른손잡이'] as const;
export const BLOOD_TYPES = ['A', 'B', 'O', 'AB'] as const;
export const DISTINCTIVE_FEATURES = [
  '안경 착용', '짧은 머리', '긴 머리', '손목 시계 착용',
  '피어싱', '반창고가 붙어있음', '항상 모자를 쓰고 다님',
  '왼쪽 귀에 흉터', '오른손에 반지', '목걸이 착용',
  '늘 후드를 쓰고 다님', '특이한 신발을 신고 다님'
];
export const SHOE_SIZES = {
  male: { teen: [255, 260, 265, 270, 275, 280], adult: [260, 265, 270, 275, 280] },
  female: { teen: [230, 235, 240, 245, 250], adult: [235, 240, 245, 250, 255] }
};
export const ACCESS_AREAS_BY_OCCUPATION: Record<string, string[]> = {
  teacher: ['교무실', '교과준비실', '보안실'],
  counselor: ['상담실', '교무실', '보안실'],
  janitor: ['보안실', '창고', '옥상', '지하실'],
  studentCouncil: ['학생회실', '방송실'],
  libraryHelper: ['도서관 서고', '도서관 사무실'],
  clubLeader: ['동아리실'],
  athlete: ['체육관 창고', '탈의실'],
  default: []
};

// 간접 증거 템플릿 (범인 이름 대신 특성을 참조)
export const INDIRECT_EVIDENCE_TEMPLATES = {
  physical: [
    { trait: 'shoeSize', template: (v: number) => `범행 현장에서 ${v}mm 크기의 신발 자국이 발견되었다.`, name: '현장 신발 자국' },
    { trait: 'handedness', template: (v: string) => `현장의 흔적으로 보아 범인은 ${v}인 것으로 추정된다.`, name: '필적 분석 결과' },
    { trait: 'build', template: (v: string) => `무거운 물건이 옮겨진 흔적. ${v} 체격의 사람만 가능해 보인다.`, name: '물리적 흔적 분석' },
    { trait: 'height', template: (v: string) => `CCTV 문틀 높이와 비교한 결과, 범인은 ${v}인 것으로 보인다.`, name: 'CCTV 신장 분석' },
  ],
  forensic: [
    { trait: 'bloodType', template: (v: string) => `현장에서 발견된 혈흔은 ${v}형이다.`, name: '혈흔 분석 결과' },
    { trait: 'distinctiveFeature', template: (v: string) => `현장에서 "${v}"과(와) 관련된 흔적이 발견되었다.`, name: '특징적 흔적' },
  ],
  alibi: [
    { trait: 'accessAreas', template: (v: string) => `범행 장소는 ${v}에 접근 가능한 사람만 들어갈 수 있다.`, name: '접근 권한 분석' },
  ],
  schedule: [
    { trait: 'alibiHole', template: (_v: string, time: string) => `CCTV 분석 결과, ${time} 경에 복도를 지나가는 인물이 포착되었으나 얼굴은 확인 불가.`, name: 'CCTV 시간대 분석' },
  ]
};

// 동기 선택지 (선택식 추론용)
export const MOTIVE_LABELS: Record<string, string> = {
  revenge: '복수',
  greed: '탐욕',
  jealousy: '질투',
  fear: '공포/은폐',
  protection: '보호/방어',
  ideology: '신념',
  accident: '우발적'
};

export const BACKGROUNDS = {
  student: [
    '평범한 가정에서 자랐으며 특별한 일 없이 지내왔다',
    '어릴 때부터 우등생으로 기대를 한 몸에 받았다',
    '가정 형편이 어려워 장학금으로 다니고 있다',
    '최근 부모님의 이혼으로 힘든 시기를 보내고 있다',
    '중학교 때 왕따를 당한 경험이 있다',
    '전에 다니던 학교에서 문제를 일으켜 전학왔다'
  ],
  classPresident: [
    '초등학교 때부터 항상 반장이었다',
    '성적은 좋지만 친구가 별로 없다',
    '책임감이 강해 모든 일을 도맡아 한다'
  ],
  clubLeader: [
    '동아리 활동에 열정적이며 대회 입상 경험이 있다',
    '리더십이 있지만 가끔 독단적이라는 평가를 받는다'
  ],
  teacher: [
    '교직 경력 10년 차의 베테랑 교사다',
    '신입 교사로 학생들과 친하게 지내려 노력한다',
    '엄격하지만 학생들의 성장을 진심으로 바란다'
  ],
  libraryHelper: [
    '책을 좋아해 도서관에서 대부분의 시간을 보낸다',
    '조용한 성격이라 도서관 일이 잘 맞는다'
  ],
  studentCouncil: [
    '학교 행사를 주도적으로 이끌며 영향력이 크다',
    '야심이 있어 학생회장을 노리고 있다'
  ],
  counselor: [
    '학생들의 비밀을 많이 알고 있다',
    '따뜻한 마음으로 학생들의 고민을 들어준다'
  ],
  janitor: [
    '학교에서 오래 일해 모든 것을 알고 있다',
    '조용히 일하며 학생들을 지켜본다'
  ],
  athlete: [
    '운동에 재능이 있어 학교 대표 선수다',
    '체육 특기생으로 입학했다'
  ],
  artClub: [
    '어릴 때부터 그림에 재능을 보였다',
    '미대 진학을 준비하고 있다'
  ],
  scienceClub: [
    '과학 올림피아드 입상 경력이 있다',
    '실험과 연구를 좋아한다'
  ],
  newStudent: [
    '전학 온 지 얼마 안 되어 아직 적응 중이다',
    '전 학교에서의 일을 숨기고 있는 것 같다'
  ]
};

export const RELATIONSHIPS_TEMPLATES: Record<string, string> = {
  friend: '서로 친하게 지내는 좋은 친구 사이',
  rival: '은근히 경쟁하는 라이벌 관계',
  family: '가족 같은 사이',
  lover: '연인 관계',
  colleague: '같이 활동하는 동료',
  enemy: '사이가 좋지 않은 적대 관계',
  stranger: '별로 아는 사이가 아님'
};

export const ALIBI_TEMPLATES: Record<string, Array<{location: string; activity: string}>> = {
  student: [
    { location: '교실', activity: '수업을 듣고 있었어요' },
    { location: '도서관', activity: '공부를 하고 있었어요' },
    { location: '급식실', activity: '점심을 먹고 있었어요' },
    { location: '복도', activity: '친구와 이야기하고 있었어요' },
    { location: '운동장', activity: '체육 수업 중이었어요' },
    { location: '화장실', activity: '화장실에 갔다 왔어요' }
  ],
  teacher: [
    { location: '교무실', activity: '서류 작업을 하고 있었어요' },
    { location: '교실', activity: '수업을 하고 있었어요' },
    { location: '회의실', activity: '회의 중이었어요' },
    { location: '상담실', activity: '학생 상담 중이었어요' }
  ]
};

export const TIME_SLOTS = [
  { time: '08:30', period: '등교 시간' },
  { time: '09:00', period: '1교시' },
  { time: '10:00', period: '2교시' },
  { time: '10:50', period: '쉬는 시간' },
  { time: '11:00', period: '3교시' },
  { time: '12:00', period: '점심시간' },
  { time: '13:00', period: '4교시' },
  { time: '14:00', period: '5교시' },
  { time: '15:00', period: '6교시' },
  { time: '16:00', period: '방과후' }
];

export const MOTIVES = {
  theft: [
    '경제적 어려움으로 돈이 급하게 필요했다',
    '다른 사람이 가진 것이 부러웠다',
    '과거에 받은 상처에 대한 복수',
    '누군가의 강요나 협박을 받았다',
    '자신의 능력을 증명하고 싶었다',
    '시험에서 좋은 성적을 받기 위해',
    '빚을 갚아야 했다',
    '가족을 위한 어쩔 수 없는 선택이었다'
  ],
  vandalism: [
    '참을 수 없는 분노',
    '관심을 끌고 싶었다',
    '불만을 표출하기 위해',
    '친구들의 부추김',
    '다른 것을 숨기기 위해',
    '질투심에 의한 행동',
    '오래된 원한',
    '스트레스 해소를 위해'
  ],
  mystery: [
    '비밀을 지키기 위해',
    '누군가를 보호하기 위해',
    '오해에서 비롯된 행동',
    '개인적인 이익을 위해',
    '진실이 밝혀지는 것이 두려웠다',
    '과거를 숨기기 위해'
  ],
  disappearance: [
    '무언가를 보호하기 위해',
    '협박 재료로 사용하기 위해',
    '사고로 인한 은폐',
    '개인적 이득을 위해',
    '다른 사건을 덮기 위해',
    '완벽한 계획의 일부였다'
  ],
  fraud: [
    '인정받고 싶은 욕망',
    '쉽게 성공하고 싶었다',
    '다른 사람을 이기고 싶었다',
    '거짓이 진실이 되기를 바랐다',
    '자격을 갖추지 못한 것에 대한 불안'
  ],
  blackmail: [
    '돈이 필요했다',
    '상대방에게 복수하고 싶었다',
    '힘을 갖고 싶었다',
    '비밀을 알게 된 것을 이용하려 했다',
    '누군가의 지시를 받았다'
  ]
};

export const CRIME_METHODS: Record<string, Array<{name: string; description: string}>> = {
  theft: [
    { name: '몰래 훔침', description: '아무도 모르게 목표물을 가져갔다' },
    { name: '위장 작전', description: '다른 물건으로 교체하거나 위장했다' },
    { name: '공범 활용', description: '다른 사람의 도움을 받아 실행했다' },
    { name: '열쇠 복제', description: '열쇠를 복제하여 잠긴 곳에 접근했다' }
  ],
  vandalism: [
    { name: '직접 파손', description: '직접 손으로 물건을 파손했다' },
    { name: '도구 사용', description: '도구를 사용하여 훼손했다' },
    { name: '우연 위장', description: '사고처럼 보이게 위장했다' }
  ],
  mystery: [
    { name: '협박 편지', description: '익명의 편지로 협박했다' },
    { name: '소문 유포', description: '거짓 소문을 퍼뜨렸다' },
    { name: '증거 조작', description: '증거를 위조하거나 조작했다' }
  ],
  disappearance: [
    { name: '은닉', description: '아무도 찾을 수 없는 곳에 숨겼다' },
    { name: '파기', description: '증거가 남지 않게 완전히 없앴다' },
    { name: '이동', description: '다른 장소로 옮겼다' }
  ],
  fraud: [
    { name: '문서 위조', description: '문서를 위조하여 속였다' },
    { name: '신분 사칭', description: '다른 사람인 척 행동했다' },
    { name: '작품 표절', description: '다른 사람의 작품을 자신의 것처럼 주장했다' }
  ],
  blackmail: [
    { name: '비밀 폭로 협박', description: '비밀을 폭로하겠다고 협박했다' },
    { name: '증거 제시', description: '약점이 될 증거를 보여주며 협박했다' },
    { name: '익명 메시지', description: '추적할 수 없는 방법으로 협박했다' }
  ]
};

export const LOCATIONS = {
  school: [
    {
      id: 'classroom',
      name: '교실',
      description: '학생들이 수업을 듣는 공간. 책상과 의자가 정돈되어 있다.',
      atmosphere: '익숙하고 편안한 분위기',
      objects: [
        { id: 'desk', name: '책상', description: '학생용 책상', canExamine: true, examinationResult: '책상 서랍 안에 여러 물건들이 있다.' },
        { id: 'locker', name: '사물함', description: '개인 사물함', canExamine: true, examinationResult: '사물함은 잠겨있다. 열쇠가 필요하다.' },
        { id: 'blackboard', name: '칠판', description: '수업용 칠판', canExamine: true, examinationResult: '오늘 수업 내용이 적혀있다.' },
        { id: 'window', name: '창문', description: '교실 창문', canExamine: true, examinationResult: '운동장이 내려다보인다.' },
        { id: 'trashcan', name: '쓰레기통', description: '교실 구석의 쓰레기통', canExamine: true, examinationResult: '버려진 종이들이 보인다.' },
        { id: 'teacherDesk', name: '교탁', description: '선생님 책상', canExamine: true, examinationResult: '출석부와 수업 자료가 있다.' }
      ],
      hiddenAreas: [
        { id: 'underDesk', name: '책상 밑', description: '책상 아래 숨겨진 공간', discoveryCondition: '책상을 자세히 살펴보면', isDiscovered: false, containsEvidence: [] }
      ]
    },
    {
      id: 'hallway',
      name: '복도',
      description: '교실들을 연결하는 긴 통로. 학생들의 발자국 소리가 울린다.',
      atmosphere: '사람들이 오가는 분주한 분위기',
      objects: [
        { id: 'noticeBoard', name: '게시판', description: '학교 공지사항이 붙어있는 게시판', canExamine: true, examinationResult: '여러 공지사항과 포스터가 붙어있다.' },
        { id: 'waterFountain', name: '정수기', description: '복도에 있는 정수기', canExamine: true, examinationResult: '물이 시원하게 나온다.' },
        { id: 'fireExtinguisher', name: '소화기', description: '비상용 소화기', canExamine: true, examinationResult: '최근 점검 날짜가 스티커에 적혀있다.' },
        { id: 'cctv', name: 'CCTV', description: '보안 카메라', canExamine: true, examinationResult: '복도를 비추고 있다. 녹화 영상은 보안실에서 확인해야 한다.' }
      ],
      hiddenAreas: []
    },
    {
      id: 'library',
      name: '도서관',
      description: '조용한 분위기의 도서관. 책 냄새가 가득하다.',
      atmosphere: '조용하고 차분한 분위기',
      objects: [
        { id: 'bookshelf', name: '책장', description: '다양한 책들이 꽂혀있는 책장', canExamine: true, examinationResult: '책들이 주제별로 정리되어 있다.' },
        { id: 'studyDesk', name: '열람석', description: '공부할 수 있는 책상', canExamine: true, examinationResult: '누군가 메모를 남겨두었다.' },
        { id: 'librarianDesk', name: '사서 데스크', description: '도서 대출 담당 데스크', canExamine: true, examinationResult: '대출 기록부가 놓여있다.' },
        { id: 'returnBox', name: '반납함', description: '책 반납함', canExamine: true, examinationResult: '몇 권의 책이 반납되어 있다.' },
        { id: 'computer', name: '컴퓨터', description: '검색용 컴퓨터', canExamine: true, examinationResult: '최근 검색 기록을 확인할 수 있다.' }
      ],
      hiddenAreas: [
        { id: 'behindShelf', name: '책장 뒤', description: '책장 뒤 숨겨진 공간', discoveryCondition: '책장을 움직이면', isDiscovered: false, containsEvidence: [] }
      ]
    },
    {
      id: 'cafeteria',
      name: '급식실',
      description: '점심을 먹는 넓은 공간. 테이블이 줄지어 있다.',
      atmosphere: '점심 시간에는 시끌벅적한 분위기',
      objects: [
        { id: 'servingCounter', name: '배식대', description: '음식을 배식받는 곳', canExamine: true, examinationResult: '오늘의 메뉴판이 붙어있다.' },
        { id: 'tables', name: '테이블', description: '식사용 테이블', canExamine: true, examinationResult: '깨끗하게 정돈되어 있다.' },
        { id: 'vendingMachine', name: '자판기', description: '음료 자판기', canExamine: true, examinationResult: '동전 반환구에 무언가 걸려있다.' },
        { id: 'kitchenDoor', name: '주방 문', description: '주방으로 통하는 문', canExamine: true, examinationResult: '관계자 외 출입금지 표지판이 붙어있다.' }
      ],
      hiddenAreas: []
    },
    {
      id: 'teachersOffice',
      name: '교무실',
      description: '선생님들이 업무를 보는 공간. 책상이 빼곡하다.',
      atmosphere: '업무적이고 약간 긴장되는 분위기',
      objects: [
        { id: 'teacherDesk', name: '교사 책상', description: '선생님들의 책상', canExamine: true, examinationResult: '서류와 채점할 시험지가 쌓여있다.' },
        { id: 'filingCabinet', name: '서류함', description: '학생 기록이 보관된 서류함', canExamine: true, examinationResult: '학생 이름표가 붙어있다. 잠겨있다.' },
        { id: 'printer', name: '프린터', description: '공용 프린터', canExamine: true, examinationResult: '최근 인쇄 기록이 남아있다.' },
        { id: 'whiteboard', name: '화이트보드', description: '교사 회의용 화이트보드', canExamine: true, examinationResult: '이번 주 일정이 적혀있다.' },
        { id: 'safe', name: '금고', description: '중요 서류 보관 금고', canExamine: true, examinationResult: '비밀번호가 필요하다.' }
      ],
      hiddenAreas: []
    },
    {
      id: 'scienceLab',
      name: '과학실',
      description: '실험 기구들이 가득한 과학실. 약품 냄새가 난다.',
      atmosphere: '약간 으스스하고 신비로운 분위기',
      objects: [
        { id: 'labTable', name: '실험대', description: '실험을 진행하는 테이블', canExamine: true, examinationResult: '실험 도구들이 정리되어 있다.' },
        { id: 'chemicalCabinet', name: '약품장', description: '각종 실험 약품이 보관된 캐비닛', canExamine: true, examinationResult: '약품 목록표가 붙어있다. 잠겨있다.' },
        { id: 'microscope', name: '현미경', description: '관찰용 현미경', canExamine: true, examinationResult: '렌즈에 무언가 묻어있다.' },
        { id: 'sink', name: '싱크대', description: '실험 후 세척용 싱크대', canExamine: true, examinationResult: '물이 새고 있다.' }
      ],
      hiddenAreas: []
    },
    {
      id: 'artRoom',
      name: '미술실',
      description: '미술 수업이 진행되는 공간. 그림들이 전시되어 있다.',
      atmosphere: '창의적이고 자유로운 분위기',
      objects: [
        { id: 'easel', name: '이젤', description: '그림을 그리는 이젤', canExamine: true, examinationResult: '미완성된 그림이 걸려있다.' },
        { id: 'supplyCabinet', name: '재료함', description: '미술 재료가 보관된 캐비닛', canExamine: true, examinationResult: '물감, 붓, 캔버스 등이 있다.' },
        { id: 'displayShelf', name: '전시대', description: '학생 작품 전시대', canExamine: true, examinationResult: '다양한 학생 작품들이 전시되어 있다.' },
        { id: 'dryingRack', name: '건조대', description: '작품 건조용 선반', canExamine: true, examinationResult: '최근에 그린 그림들이 말리고 있다.' }
      ],
      hiddenAreas: []
    },
    {
      id: 'rooftop',
      name: '옥상',
      description: '학교 건물 꼭대기. 도시 전경이 보인다.',
      atmosphere: '고요하고 바람이 부는 분위기',
      objects: [
        { id: 'waterTank', name: '물탱크', description: '물저장 탱크', canExamine: true, examinationResult: '물탱크 뒤에 숨을 수 있는 공간이 있다.' },
        { id: 'fence', name: '펜스', description: '안전 펜스', canExamine: true, examinationResult: '펜스 일부가 느슨해져 있다.' },
        { id: 'bench', name: '벤치', description: '휴식용 벤치', canExamine: true, examinationResult: '벤치 아래에 무언가 있다.' },
        { id: 'storageRoom', name: '창고', description: '옥상 창고', canExamine: true, examinationResult: '오래된 물건들이 보관되어 있다.' }
      ],
      hiddenAreas: [
        { id: 'behindTank', name: '물탱크 뒤', description: '물탱크 뒤 숨겨진 공간', discoveryCondition: '물탱크 주변을 살펴보면', isDiscovered: false, containsEvidence: [] }
      ]
    },
    {
      id: 'gymnasium',
      name: '체육관',
      description: '넓은 실내 체육관. 농구 골대가 보인다.',
      atmosphere: '활기차고 에너지가 넘치는 분위기',
      objects: [
        { id: 'equipmentRoom', name: '용구실', description: '체육 용품이 보관된 방', canExamine: true, examinationResult: '공, 줄넘기, 매트 등이 있다.' },
        { id: 'lockerRoom', name: '탈의실', description: '옷을 갈아입는 곳', canExamine: true, examinationResult: '사물함이 줄지어 있다.' },
        { id: 'bleachers', name: '관람석', description: '경기를 관람하는 좌석', canExamine: true, examinationResult: '좌석 밑에 무언가 떨어져 있다.' }
      ],
      hiddenAreas: []
    },
    {
      id: 'securityRoom',
      name: '보안실',
      description: 'CCTV 모니터가 가득한 보안실.',
      atmosphere: '어둡고 긴장되는 분위기',
      objects: [
        { id: 'monitors', name: 'CCTV 모니터', description: '학교 곳곳을 비추는 화면', canExamine: true, examinationResult: '여러 장소의 실시간 영상이 보인다.' },
        { id: 'recorder', name: '녹화기', description: '영상 녹화 장치', canExamine: true, examinationResult: '특정 시간대의 영상을 확인할 수 있다.' },
        { id: 'logBook', name: '출입 기록부', description: '방문자 기록', canExamine: true, examinationResult: '오늘 방문한 사람들의 기록이 있다.' }
      ],
      hiddenAreas: []
    }
  ]
};

export const CASE_TEMPLATES: Record<string, { titles: string[]; subtitle?: string; items: Array<{name: string; description: string}> }> = {
  theft: {
    titles: [
      '사라진 시험지',
      '도난당한 트로피',
      '없어진 장학금',
      '사라진 미술 작품',
      '분실된 USB',
      '도둑맞은 지갑',
      '사라진 열쇠 다발',
      '없어진 졸업 앨범'
    ],
    subtitle: '도난 사건',
    items: [
      { name: '기말고사 시험지', description: '다음 주 시험 문제가 적힌 시험지' },
      { name: '전국대회 우승 트로피', description: '작년 전국대회에서 획득한 트로피' },
      { name: '학급 기금', description: '수학여행을 위해 모은 학급 기금' },
      { name: '졸업 작품', description: '미술부 선배의 졸업 작품' },
      { name: '연구 데이터 USB', description: '중요한 연구 결과가 담긴 USB' },
      { name: '학생회 예산', description: '축제 준비금이 담긴 봉투' },
      { name: '마스터키', description: '모든 교실을 열 수 있는 마스터키' },
      { name: '시간 캡슐', description: '5년 전 묻어둔 시간 캡슐' }
    ]
  },
  vandalism: {
    titles: [
      '망가진 벽화',
      '훼손된 프로젝트',
      '찢어진 사진',
      '깨진 유리창',
      '파손된 악기',
      '불탄 전시물',
      '훼손된 컴퓨터'
    ],
    subtitle: '기물 파손 사건',
    items: [
      { name: '복도 벽화', description: '미술부가 그린 복도 벽화' },
      { name: '과학 프로젝트', description: '대회 출품용 과학 프로젝트' },
      { name: '졸업 사진', description: '교무실에 걸린 졸업 사진' },
      { name: '전시실 유리창', description: '미술실 전시 유리창' },
      { name: '피아노', description: '음악실의 그랜드 피아노' },
      { name: '우승 현수막', description: '학교 현관의 우승 현수막' }
    ]
  },
  mystery: {
    titles: [
      '익명의 편지',
      '수상한 소문',
      '비밀 노트',
      '의문의 메시지',
      '사라진 일기장',
      '알 수 없는 협박'
    ],
    subtitle: '미스터리 사건',
    items: [
      { name: '익명 편지', description: '협박 내용이 담긴 익명의 편지' },
      { name: '소문', description: '학교에 퍼진 수상한 소문' },
      { name: '비밀 노트', description: '누군가의 비밀이 적힌 노트' },
      { name: '암호 메시지', description: '해독이 필요한 의문의 메시지' },
      { name: '사라진 일기장', description: '비밀이 담긴 일기장' }
    ]
  },
  disappearance: {
    titles: [
      '사라진 마스코트',
      '없어진 타임캡슐',
      '행방불명된 기념품',
      '증발한 증거물',
      '사라진 상장'
    ],
    subtitle: '실종 사건',
    items: [
      { name: '학교 마스코트', description: '학교 상징인 마스코트 인형' },
      { name: '타임캡슐', description: '10년 전 묻은 타임캡슐' },
      { name: '창립기념품', description: '학교 창립 100주년 기념품' },
      { name: '증거 자료', description: '중요한 사건의 증거 자료' },
      { name: '총장배', description: '역대 학교 대표팀의 우승 트로피' }
    ]
  },
  fraud: {
    titles: [
      '가짜 시험지',
      '위조된 성적표',
      '거짓 추천서',
      '표절된 작품'
    ],
    subtitle: '사기 사건',
    items: [
      { name: '위조 시험지', description: '누군가 만든 가짜 시험 문제' },
      { name: '조작된 성적표', description: '성적이 조작된 성적표' },
      { name: '거짓 추천서', description: '허위 내용이 담긴 추천서' },
      { name: '표절 작품', description: '다른 사람의 작품을 베낀 작품' }
    ]
  },
  blackmail: {
    titles: [
      '협박 편지',
      '비밀 폭로 위협',
      '익명의 요구',
      '사진 협박'
    ],
    subtitle: '협박 사건',
    items: [
      { name: '협박 메시지', description: '돈을 요구하는 익명의 메시지' },
      { name: '비밀 사진', description: '누군가의 약점이 담긴 사진' },
      { name: '녹음 파일', description: '협박에 사용된 녹음 파일' },
      { name: '증거 문서', description: '비리를 증명하는 문서' }
    ]
  }
};

export const DIALOGUE_TEMPLATES = {
  greeting: [
    '안녕하세요. 무슨 일이신가요?',
    '아, 탐정님이시군요. 도와드릴 일이 있나요?',
    '네, 말씀하세요.',
    '저를 찾으셨나요?',
    '뭔가 알고 싶으신 게 있으신가요?'
  ],
  alibi: [
    '그 시간에요? {activity}',
    '저는 {time}에 {location}에 있었어요.',
    '{activity}. {witness}가 증명해줄 수 있어요.',
    '분명히 기억해요. {location}에서 {activity}'
  ],
  denial: [
    '저는 정말 모르는 일이에요!',
    '왜 저를 의심하시는 건가요?',
    '저는 아무것도 하지 않았어요.',
    '오해하고 계신 것 같아요.',
    '믿어주세요, 저는 결백해요.'
  ],
  nervous: [
    '왜... 왜 그런 걸 물어보시는 건가요?',
    '그건... 말하기 어려워요.',
    '꼭 대답해야 하나요?',
    '그 이야기는 하고 싶지 않아요.',
    '음... 그게... 그러니까...',
    '갑자기 왜 그런 질문을...'
  ],
  helpful: [
    '도움이 될지 모르겠지만...',
    '사실, 제가 본 게 있어요.',
    '이상한 점이 있긴 했어요.',
    '말해도 될지 모르겠지만...',
    '궁금한 게 있으시면 물어보세요.'
  ],
  relationship: [
    '다른 사람들과는 그냥 평범한 사이예요.',
    '친하게 지내는 편이에요.',
    '딱히 가깝지는 않아요.',
    '아는 사이긴 하지만...'
  ],
  secretReveal: [
    '사실은... {secret}',
    '이건 비밀인데... {secret}',
    '다른 사람에게는 말하지 마세요. {secret}',
    '정말 말하기 어렵지만... {secret}'
  ]
};

export const EVIDENCE_TEMPLATES = {
  physical: [
    { name: '발자국', description: '현장에 남은 발자국 흔적', detailedDescription: '특정 신발 사이즈와 무늬를 확인할 수 있다.' },
    { name: '지문', description: '물건에 남은 지문', detailedDescription: '지문 대조를 통해 누구의 것인지 알 수 있다.' },
    { name: '섬유 조각', description: '옷에서 떨어진 섬유 조각', detailedDescription: '특정 의류와 대조할 수 있다.' },
    { name: '열쇠', description: '특정 장소의 열쇠', detailedDescription: '어디를 열 수 있는 열쇠인지 확인해야 한다.' },
    { name: '메모 조각', description: '찢어진 메모 조각', detailedDescription: '필체를 통해 작성자를 추정할 수 있다.' },
    { name: '물건 파편', description: '깨진 물건의 조각', detailedDescription: '무엇이 깨졌는지 추측할 수 있다.' },
    { name: '머리카락', description: '현장에서 발견된 머리카락', detailedDescription: '색상과 길이로 범위를 좁힐 수 있다.' },
    { name: '손톱 자국', description: '물건에 남은 손톱 자국', detailedDescription: '격렬한 행동의 흔적이다.' }
  ],
  testimony: [
    { name: '목격 증언', description: '사건을 목격한 사람의 증언', detailedDescription: '목격자가 본 것을 진술했다.' },
    { name: '알리바이 증언', description: '용의자의 알리바이에 관한 증언', detailedDescription: '특정 시간에 어디 있었는지에 대한 증언이다.' },
    { name: '관계 증언', description: '인물들 간의 관계에 대한 증언', detailedDescription: '그들의 관계가 어땠는지 알 수 있다.' },
    { name: '이상 행동 증언', description: '누군가의 이상한 행동에 대한 증언', detailedDescription: '평소와 다른 행동을 했다는 증언이다.' },
    { name: '소리 증언', description: '특정 소리를 들었다는 증언', detailedDescription: '어떤 소리가 언제 들렸는지 알 수 있다.' }
  ],
  document: [
    { name: '일정표', description: '누군가의 일정이 적힌 문서', detailedDescription: '그날 무엇을 했는지 알 수 있다.' },
    { name: '이메일', description: '주고받은 이메일 내용', detailedDescription: '대화 내용을 확인할 수 있다.' },
    { name: '문자 메시지', description: '휴대폰 문자 메시지 기록', detailedDescription: '누구와 무슨 대화를 했는지 알 수 있다.' },
    { name: '계약서', description: '특정 계약이나 약속이 적힌 문서', detailedDescription: '약속의 내용을 확인할 수 있다.' },
    { name: '기록부', description: '활동 기록이 담긴 문서', detailedDescription: '언제 무엇을 했는지 기록되어 있다.' },
    { name: '사진', description: '현장이나 인물이 찍힌 사진', detailedDescription: '시각적 증거가 될 수 있다.' }
  ],
  critical: [
    { name: '결정적 증거', description: '사건의 핵심이 되는 증거', detailedDescription: '이 증거가 범인을 가리킨다.' }
  ]
};

export const DIFFICULTY_SETTINGS: Record<string, DifficultySettings> = {
  easy: {
    suspectCount: { min: 3, max: 4 },
    evidenceCount: { min: 6, max: 8 },
    criticalEvidenceCount: 3,
    redHerringCount: 0,
    hintCount: 10,
    timeLimit: null,
    scoreMultiplier: 1,
    showContradictions: true,
    showImportantDialogue: true,
    alibiHoleVisibility: 'obvious'
  },
  medium: {
    suspectCount: { min: 4, max: 5 },
    evidenceCount: { min: 8, max: 11 },
    criticalEvidenceCount: 3,
    redHerringCount: 2,
    hintCount: 5,
    timeLimit: null,
    scoreMultiplier: 1.5,
    showContradictions: true,
    showImportantDialogue: false,
    alibiHoleVisibility: 'subtle'
  },
  hard: {
    suspectCount: { min: 5, max: 6 },
    evidenceCount: { min: 10, max: 13 },
    criticalEvidenceCount: 3,
    redHerringCount: 3,
    hintCount: 3,
    timeLimit: 1800,
    scoreMultiplier: 2,
    showContradictions: false,
    showImportantDialogue: false,
    alibiHoleVisibility: 'subtle'
  },
  expert: {
    suspectCount: { min: 6, max: 7 },
    evidenceCount: { min: 12, max: 16 },
    criticalEvidenceCount: 3,
    redHerringCount: 5,
    hintCount: 1,
    timeLimit: 1200,
    scoreMultiplier: 3,
    showContradictions: false,
    showImportantDialogue: false,
    alibiHoleVisibility: 'hidden'
  }
};

export const HINTS = {
  evidence: [
    '아직 조사하지 않은 장소가 있어요.',
    '모든 물건을 꼼꼼히 살펴보세요.',
    '{location}에 중요한 단서가 있을 수 있어요.',
    '증거들을 비교해 보세요. 모순점을 찾을 수 있을지도.'
  ],
  character: [
    '모든 용의자와 대화해 보셨나요?',
    '{character}에게 다시 물어보세요.',
    '증거를 제시하면 새로운 정보를 얻을 수 있어요.',
    '알리바이에 빈틈이 있는 사람을 찾아보세요.'
  ],
  deduction: [
    '수집한 증거들을 연결해 보세요.',
    '누가 동기, 기회, 수단을 모두 가지고 있나요?',
    '알리바이에 빈틈이 있는 사람을 찾아보세요.',
    '결정적 증거가 가리키는 사람은 누구인가요?'
  ]
};

// 추론 검증용 유사어 사전
export const DEDUCTION_SYNONYMS = {
  motive: {
    revenge: ['복수', '앙갚음', '되갚음', '보복'],
    greed: ['탐욕', '욕심', '이득', '돈', '재물'],
    jealousy: ['질투', '시기', '부러움', '선망'],
    fear: ['두려움', '공포', '무서움', '불안'],
    protection: ['보호', '지키다', '숨기다', '감추다']
  },
  method: {
    steal: ['훔치다', '가져가다', '빼앗다', '도둑질'],
    destroy: ['파괴', '부수다', '망가뜨리다', '훼손'],
    hide: ['숨기다', '감추다', '은닉', '은폐']
  }
};
