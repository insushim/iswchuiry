// ========================================
// 게임 데이터 (한국어)
// ========================================

export const KOREAN_NAMES = {
  male: [
    '김민준', '이서준', '박도윤', '최예준', '정시우',
    '강하준', '조지호', '윤주원', '장현우', '임준혁',
    '한도현', '오건우', '서민재', '신우빈', '권승현'
  ],
  female: [
    '김서연', '이서윤', '박지우', '최서현', '정민서',
    '강하은', '조하윤', '윤지민', '장채원', '임수아',
    '한지아', '오예린', '서수빈', '신소율', '권예은'
  ]
};

export const OCCUPATIONS = {
  school: [
    { id: 'student', name: '학생', description: '학교에 다니는 학생' },
    { id: 'classPresident', name: '반장', description: '학급의 반장' },
    { id: 'clubLeader', name: '동아리 부장', description: '동아리를 이끄는 학생' },
    { id: 'libraryHelper', name: '도서부원', description: '도서관에서 봉사하는 학생' },
    { id: 'studentCouncil', name: '학생회 임원', description: '학생회에서 활동하는 학생' },
    { id: 'teacher', name: '교사', description: '학교에서 가르치는 선생님' },
    { id: 'counselor', name: '상담교사', description: '학생 상담을 담당' },
    { id: 'janitor', name: '관리인', description: '학교 시설을 관리' }
  ],
  general: [
    { id: 'officeWorker', name: '회사원', description: '회사에서 근무' },
    { id: 'shopOwner', name: '가게 주인', description: '가게를 운영' },
    { id: 'artist', name: '예술가', description: '예술 활동을 하는 사람' },
    { id: 'writer', name: '작가', description: '글을 쓰는 직업' }
  ]
};

export const PERSONALITIES = [
  { id: 'cheerful', name: '쾌활한', traits: ['밝음', '활기참', '낙천적'] },
  { id: 'quiet', name: '조용한', traits: ['과묵함', '신중함', '관찰력'] },
  { id: 'confident', name: '자신감 있는', traits: ['당당함', '리더십', '카리스마'] },
  { id: 'nervous', name: '신경질적인', traits: ['예민함', '불안함', '의심많음'] },
  { id: 'friendly', name: '친절한', traits: ['다정함', '배려심', '사교적'] },
  { id: 'cold', name: '냉담한', traits: ['무뚝뚝함', '감정억제', '독립적'] },
  { id: 'curious', name: '호기심 많은', traits: ['탐구심', '질문많음', '모험적'] },
  { id: 'ambitious', name: '야심찬', traits: ['목표지향', '경쟁적', '성취욕'] }
];

export const MOTIVES = {
  theft: [
    '경제적 어려움으로 돈이 급하게 필요했다',
    '다른 사람이 가진 것이 부러웠다',
    '과거에 받은 상처에 대한 복수',
    '누군가의 강요나 협박을 받았다',
    '자신의 능력을 증명하고 싶었다'
  ],
  vandalism: [
    '참을 수 없는 분노',
    '관심을 끌고 싶었다',
    '불만을 표출하기 위해',
    '친구들의 부추김',
    '다른 것을 숨기기 위해'
  ],
  mystery: [
    '비밀을 지키기 위해',
    '누군가를 보호하기 위해',
    '오해에서 비롯된 행동',
    '개인적인 이익을 위해'
  ],
  disappearance: [
    '무언가를 보호하기 위해',
    '협박 재료로 사용하기 위해',
    '사고로 인한 은폐',
    '개인적 이득을 위해'
  ]
};

export const LOCATIONS = {
  school: [
    {
      id: 'classroom',
      name: '교실',
      description: '학생들이 수업을 듣는 공간. 책상과 의자가 정돈되어 있다.',
      objects: [
        { id: 'desk', name: '책상', description: '학생용 책상', canExamine: true, examinationResult: '책상 서랍 안에 여러 물건들이 있다.' },
        { id: 'locker', name: '사물함', description: '개인 사물함', canExamine: true, examinationResult: '사물함은 잠겨있다. 열쇠가 필요하다.' },
        { id: 'blackboard', name: '칠판', description: '수업용 칠판', canExamine: true, examinationResult: '오늘 수업 내용이 적혀있다.' },
        { id: 'window', name: '창문', description: '교실 창문', canExamine: true, examinationResult: '운동장이 내려다보인다.' },
        { id: 'trashcan', name: '쓰레기통', description: '교실 구석의 쓰레기통', canExamine: true, examinationResult: '버려진 종이들이 보인다.' }
      ]
    },
    {
      id: 'hallway',
      name: '복도',
      description: '교실들을 연결하는 긴 통로. 학생들의 발자국 소리가 울린다.',
      objects: [
        { id: 'noticeBoard', name: '게시판', description: '학교 공지사항이 붙어있는 게시판', canExamine: true, examinationResult: '여러 공지사항과 포스터가 붙어있다.' },
        { id: 'waterFountain', name: '정수기', description: '복도에 있는 정수기', canExamine: true, examinationResult: '물이 시원하게 나온다.' },
        { id: 'fireExtinguisher', name: '소화기', description: '비상용 소화기', canExamine: true, examinationResult: '최근 점검 날짜가 스티커에 적혀있다.' }
      ]
    },
    {
      id: 'library',
      name: '도서관',
      description: '조용한 분위기의 도서관. 책 냄새가 가득하다.',
      objects: [
        { id: 'bookshelf', name: '책장', description: '다양한 책들이 꽂혀있는 책장', canExamine: true, examinationResult: '책들이 주제별로 정리되어 있다.' },
        { id: 'studyDesk', name: '열람석', description: '공부할 수 있는 책상', canExamine: true, examinationResult: '누군가 메모를 남겨두었다.' },
        { id: 'librarianDesk', name: '사서 데스크', description: '도서 대출 담당 데스크', canExamine: true, examinationResult: '대출 기록부가 놓여있다.' },
        { id: 'returnBox', name: '반납함', description: '책 반납함', canExamine: true, examinationResult: '몇 권의 책이 반납되어 있다.' }
      ]
    },
    {
      id: 'cafeteria',
      name: '급식실',
      description: '점심을 먹는 넓은 공간. 테이블이 줄지어 있다.',
      objects: [
        { id: 'servingCounter', name: '배식대', description: '음식을 배식받는 곳', canExamine: true, examinationResult: '오늘의 메뉴판이 붙어있다.' },
        { id: 'tables', name: '테이블', description: '식사용 테이블', canExamine: true, examinationResult: '깨끗하게 정돈되어 있다.' },
        { id: 'vendingMachine', name: '자판기', description: '음료 자판기', canExamine: true, examinationResult: '동전 반환구에 무언가 걸려있다.' },
        { id: 'kitchenDoor', name: '주방 문', description: '주방으로 통하는 문', canExamine: true, examinationResult: '관계자 외 출입금지 표지판이 붙어있다.' }
      ]
    },
    {
      id: 'teachersOffice',
      name: '교무실',
      description: '선생님들이 업무를 보는 공간. 책상이 빼곡하다.',
      objects: [
        { id: 'teacherDesk', name: '교사 책상', description: '선생님들의 책상', canExamine: true, examinationResult: '서류와 채점할 시험지가 쌓여있다.' },
        { id: 'filingCabinet', name: '서류함', description: '학생 기록이 보관된 서류함', canExamine: true, examinationResult: '학생 이름표가 붙어있다. 잠겨있다.' },
        { id: 'printer', name: '프린터', description: '공용 프린터', canExamine: true, examinationResult: '최근 인쇄 기록이 남아있다.' },
        { id: 'whiteboard', name: '화이트보드', description: '교사 회의용 화이트보드', canExamine: true, examinationResult: '이번 주 일정이 적혀있다.' }
      ]
    },
    {
      id: 'scienceLab',
      name: '과학실',
      description: '실험 기구들이 가득한 과학실. 약품 냄새가 난다.',
      objects: [
        { id: 'labTable', name: '실험대', description: '실험을 진행하는 테이블', canExamine: true, examinationResult: '실험 도구들이 정리되어 있다.' },
        { id: 'chemicalCabinet', name: '약품장', description: '각종 실험 약품이 보관된 캐비닛', canExamine: true, examinationResult: '약품 목록표가 붙어있다. 잠겨있다.' },
        { id: 'microscope', name: '현미경', description: '관찰용 현미경', canExamine: true, examinationResult: '렌즈에 무언가 묻어있다.' },
        { id: 'sink', name: '싱크대', description: '실험 후 세척용 싱크대', canExamine: true, examinationResult: '물이 새고 있다.' }
      ]
    },
    {
      id: 'artRoom',
      name: '미술실',
      description: '미술 수업이 진행되는 공간. 그림들이 전시되어 있다.',
      objects: [
        { id: 'easel', name: '이젤', description: '그림을 그리는 이젤', canExamine: true, examinationResult: '미완성된 그림이 걸려있다.' },
        { id: 'supplyCabinet', name: '재료함', description: '미술 재료가 보관된 캐비닛', canExamine: true, examinationResult: '물감, 붓, 캔버스 등이 있다.' },
        { id: 'displayShelf', name: '전시대', description: '학생 작품 전시대', canExamine: true, examinationResult: '다양한 학생 작품들이 전시되어 있다.' },
        { id: 'dryingRack', name: '건조대', description: '작품 건조용 선반', canExamine: true, examinationResult: '최근에 그린 그림들이 말리고 있다.' }
      ]
    },
    {
      id: 'rooftop',
      name: '옥상',
      description: '학교 건물 꼭대기. 도시 전경이 보인다.',
      objects: [
        { id: 'waterTank', name: '물탱크', description: '물저장 탱크', canExamine: true, examinationResult: '물탱크 뒤에 숨을 수 있는 공간이 있다.' },
        { id: 'fence', name: '펜스', description: '안전 펜스', canExamine: true, examinationResult: '펜스 일부가 느슨해져 있다.' },
        { id: 'bench', name: '벤치', description: '휴식용 벤치', canExamine: true, examinationResult: '벤치 아래에 무언가 있다.' },
        { id: 'storageRoom', name: '창고', description: '옥상 창고', canExamine: true, examinationResult: '오래된 물건들이 보관되어 있다.' }
      ]
    }
  ]
};

export const CASE_TEMPLATES = {
  theft: {
    titles: [
      '사라진 시험지',
      '도난당한 트로피',
      '없어진 장학금',
      '사라진 미술 작품'
    ],
    items: [
      { name: '기말고사 시험지', description: '다음 주 시험 문제가 적힌 시험지' },
      { name: '전국대회 우승 트로피', description: '작년 전국대회에서 획득한 트로피' },
      { name: '학급 기금', description: '수학여행을 위해 모은 학급 기금' },
      { name: '졸업 작품', description: '미술부 선배의 졸업 작품' }
    ]
  },
  vandalism: {
    titles: [
      '망가진 벽화',
      '훼손된 프로젝트',
      '찢어진 사진',
      '깨진 유리창'
    ],
    items: [
      { name: '복도 벽화', description: '미술부가 그린 복도 벽화' },
      { name: '과학 프로젝트', description: '대회 출품용 과학 프로젝트' },
      { name: '졸업 사진', description: '교무실에 걸린 졸업 사진' },
      { name: '전시실 유리창', description: '미술실 전시 유리창' }
    ]
  },
  mystery: {
    titles: [
      '익명의 편지',
      '수상한 소문',
      '비밀 노트',
      '의문의 메시지'
    ],
    items: [
      { name: '익명 편지', description: '협박 내용이 담긴 익명의 편지' },
      { name: '소문', description: '학교에 퍼진 수상한 소문' },
      { name: '비밀 노트', description: '누군가의 비밀이 적힌 노트' },
      { name: '암호 메시지', description: '해독이 필요한 의문의 메시지' }
    ]
  },
  disappearance: {
    titles: [
      '사라진 마스코트',
      '없어진 타임캡슐',
      '행방불명된 기념품',
      '증발한 증거물'
    ],
    items: [
      { name: '학교 마스코트', description: '학교 상징인 마스코트 인형' },
      { name: '타임캡슐', description: '10년 전 묻은 타임캡슐' },
      { name: '창립기념품', description: '학교 창립 100주년 기념품' },
      { name: '증거 자료', description: '중요한 사건의 증거 자료' }
    ]
  }
};

export const DIALOGUE_TEMPLATES = {
  greeting: [
    '안녕하세요. 무슨 일이신가요?',
    '아, 탐정님이시군요. 도와드릴 일이 있나요?',
    '네, 말씀하세요.',
    '저를 찾으셨나요?'
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
    '오해하고 계신 것 같아요.'
  ],
  nervous: [
    '왜... 왜 그런 걸 물어보시는 건가요?',
    '그건... 말하기 어려워요.',
    '꼭 대답해야 하나요?',
    '그 이야기는 하고 싶지 않아요.'
  ],
  helpful: [
    '도움이 될지 모르겠지만...',
    '사실, 제가 본 게 있어요.',
    '이상한 점이 있긴 했어요.',
    '말해도 될지 모르겠지만...'
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
    { name: '발자국', description: '현장에 남은 발자국 흔적' },
    { name: '지문', description: '물건에 남은 지문' },
    { name: '섬유 조각', description: '옷에서 떨어진 섬유 조각' },
    { name: '열쇠', description: '특정 장소의 열쇠' },
    { name: '메모 조각', description: '찢어진 메모 조각' },
    { name: '물건 파편', description: '깨진 물건의 조각' }
  ],
  testimony: [
    { name: '목격 증언', description: '사건을 목격한 사람의 증언' },
    { name: '알리바이 증언', description: '용의자의 알리바이에 관한 증언' },
    { name: '관계 증언', description: '인물들 간의 관계에 대한 증언' },
    { name: '이상 행동 증언', description: '누군가의 이상한 행동에 대한 증언' }
  ],
  document: [
    { name: '일정표', description: '누군가의 일정이 적힌 문서' },
    { name: '이메일', description: '주고받은 이메일 내용' },
    { name: '문자 메시지', description: '휴대폰 문자 메시지 기록' },
    { name: '계약서', description: '특정 계약이나 약속이 적힌 문서' },
    { name: '기록부', description: '활동 기록이 담긴 문서' }
  ]
};

export const DIFFICULTY_SETTINGS = {
  easy: {
    suspectCount: { min: 3, max: 4 },
    evidenceCount: { min: 5, max: 7 },
    redHerringCount: 0,
    hintCount: 10,
    timeLimit: null,
    scoreMultiplier: 1
  },
  medium: {
    suspectCount: { min: 4, max: 5 },
    evidenceCount: { min: 7, max: 10 },
    redHerringCount: 2,
    hintCount: 5,
    timeLimit: null,
    scoreMultiplier: 1.5
  },
  hard: {
    suspectCount: { min: 5, max: 6 },
    evidenceCount: { min: 10, max: 12 },
    redHerringCount: 3,
    hintCount: 3,
    timeLimit: 1800,
    scoreMultiplier: 2
  },
  expert: {
    suspectCount: { min: 6, max: 7 },
    evidenceCount: { min: 12, max: 15 },
    redHerringCount: 5,
    hintCount: 1,
    timeLimit: 1200,
    scoreMultiplier: 3
  }
};

export const HINTS = {
  evidence: [
    '아직 조사하지 않은 장소가 있어요.',
    '모든 물건을 꼼꼼히 살펴보세요.',
    '{location}에 중요한 단서가 있을 수 있어요.'
  ],
  character: [
    '모든 용의자와 대화해 보셨나요?',
    '{character}에게 다시 물어보세요.',
    '증거를 제시하면 새로운 정보를 얻을 수 있어요.'
  ],
  deduction: [
    '수집한 증거들을 연결해 보세요.',
    '누가 동기, 기회, 수단을 모두 가지고 있나요?',
    '알리바이에 빈틈이 있는 사람을 찾아보세요.'
  ]
};
