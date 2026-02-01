// ========================================
// 실종 시나리오 15개 - 수작업 제작
// ========================================

import { Scenario } from './types';

export const disappearanceScenarios: Scenario[] = [
  // ========================================
  // 시나리오 #1: 수학여행의 실종자
  // ========================================
  {
    id: 'disappearance-001',
    title: '수학여행의 실종자',
    subtitle: '경주 수학여행 둘째 날, 한 학생이 사라지다',
    type: 'disappearance',
    difficulty: 'medium',
    estimatedTime: 25,

    prologue: [
      '청운고 2학년 경주 수학여행.',
      '불국사 관람 도중, 한 학생이 홀연히 사라졌다.',
      '핸드폰도, 짐도 그대로 둔 채.'
    ],
    introduction: [
      '수학여행 인솔 교사가 급히 연락해왔습니다.',
      '"학생 하나가 실종됐어요. 불국사에서 마지막으로 봤는데..."',
      '실종된 학생의 행방을 추적해야 합니다.'
    ],
    setting: '경주 불국사 및 주변',

    crimeTime: '14:00',
    crimeLocation: '불국사 경내',
    culpritId: 'char-bully',
    victimId: 'char-missing',
    motive: '입막음 - 폭행 사실 고발 위협',
    motiveDetail: '실종된 김서진은 같은 반 나현우의 학교폭력을 담임에게 고발하려 했다. 나현우는 이를 막기 위해 협박으로 김서진을 격리시켰다.',
    method: '협박하여 폐사찰에 가두고 "부모님 오실 때까지 나오지 마"라고 함',
    methodDetail: '나현우와 공범들은 김서진을 협박하여 불국사 근처 폐사찰로 데려갔다. "고발하면 가만 안 둔다"고 위협하며 가둬두었다.',

    characters: [
      {
        id: 'char-missing',
        name: '김서진',
        role: 'victim',
        age: 17,
        gender: 'female',
        occupation: '2학년 학생',
        personality: '정의롭고 용감하지만 약함',
        appearance: '작은 키, 겁먹은 표정',
        background: '학교폭력을 목격하고 고발을 결심.',
        alibi: {
          location: '불명',
          time: '14:00',
          activity: '실종',
          witnesses: [],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-bully', type: '적대 관계', description: '나현우의 폭력을 목격하고 고발하려 함', isSecret: false }
        ],
        secrets: [],
        dialogues: [],
        nervousTriggers: []
      },
      {
        id: 'char-bully',
        name: '나현우',
        role: 'culprit',
        age: 18,
        gender: 'male',
        occupation: '2학년 학생 / 일진',
        personality: '폭력적이고 교활함, 겉으로는 평범한 척',
        appearance: '건장한 체격, 날카로운 눈빛',
        background: '학교의 일진 그룹 리더. 여러 학생을 괴롭혀왔다.',
        alibi: {
          location: '불국사 청운교',
          time: '14:00',
          activity: '사진 찍고 있었다고 주장',
          witnesses: ['char-accomplice'],
          hasHole: true,
          holeDetail: '13:30~14:30 사이 단체 사진에 없음'
        },
        motive: {
          type: 'fear',
          description: '학교폭력 사실이 드러나면 퇴학당할 것을 두려워함',
          strength: 3
        },
        relationships: [
          { targetId: 'char-missing', type: '적대 관계', description: '김서진이 자신을 고발하려 하자 위협' },
          { targetId: 'char-accomplice', type: '공범', description: '함께 폭력을 행사해온 동료' }
        ],
        secrets: [
          {
            id: 'secret-bully-1',
            content: '김서진을 폐사찰에 가뒀다',
            importance: 'critical',
            revealCondition: '공범 회유 후'
          }
        ],
        dialogues: [
          {
            topic: '김서진',
            lines: ['서진이? 모르겠는데. 그냥 같은 반이니까.', '실종됐다고? 어디 갔나보지.']
          },
          {
            topic: '알리바이',
            lines: ['나 청운교에서 사진 찍었어. 민재랑 같이.'],
            requiresEvidence: ['evidence-photo']
          }
        ],
        nervousTriggers: ['고발', '담임', '폭력', '퇴학']
      },
      {
        id: 'char-accomplice',
        name: '이민재',
        role: 'suspect',
        age: 17,
        gender: 'male',
        occupation: '2학년 학생',
        personality: '소심하지만 나현우를 따름',
        appearance: '평범한 외모, 불안한 눈빛',
        background: '나현우의 추종자. 본인도 괴롭힘에 참여해왔다.',
        alibi: {
          location: '불국사 청운교',
          time: '14:00',
          activity: '나현우와 함께 있었다고 주장',
          witnesses: ['char-bully'],
          hasHole: true,
          holeDetail: '동일하게 단체 사진에 없음'
        },
        relationships: [
          { targetId: 'char-bully', type: '추종자', description: '나현우를 따르며 같이 다님' }
        ],
        secrets: [
          {
            id: 'secret-accomplice-1',
            content: '김서진을 폐사찰에 가두는 것을 도왔다',
            importance: 'critical',
            revealCondition: '증거 제시 후 압박'
          }
        ],
        dialogues: [
          {
            topic: '김서진',
            lines: ['서진이요? 저는... 잘 모르겠어요.', '(눈을 피하며) 현우 형이랑 있었어요.']
          },
          {
            topic: '진실',
            lines: ['...저도 어쩔 수 없었어요.', '현우 형이 시키면... 안 하면 저도...'],
            requiresEvidence: ['evidence-photo']
          }
        ],
        nervousTriggers: ['폐사찰', '감금', '협박']
      },
      {
        id: 'char-teacher',
        name: '한미라',
        role: 'witness',
        age: 35,
        gender: 'female',
        occupation: '담임교사',
        personality: '책임감 있고 학생들을 걱정함',
        appearance: '정장 차림, 걱정스러운 표정',
        background: '김서진으로부터 학교폭력 고발을 예고받았었다.',
        alibi: {
          location: '불국사 매표소',
          time: '14:00',
          activity: '인원 확인 중',
          witnesses: ['다른 교사'],
          hasHole: false
        },
        relationships: [],
        secrets: [
          {
            id: 'secret-teacher-1',
            content: '김서진이 어제 나현우의 폭력을 고발하겠다고 말했다',
            importance: 'major',
            revealCondition: '직접 질문 시'
          }
        ],
        dialogues: [
          {
            topic: '김서진',
            lines: ['서진이가... 어제 저한테 할 말이 있다고 했어요.', '나현우 학생에 대한 거였어요. 학교폭력...']
          },
          {
            topic: '나현우',
            lines: ['그 학생... 문제가 좀 있었어요. 신고가 몇 번.', '근데 증거가 없어서 처리가 안 됐죠.']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-local',
        name: '정노인',
        role: 'witness',
        age: 70,
        gender: 'male',
        occupation: '경주 토박이 / 기념품점 주인',
        personality: '수다스럽고 관찰력 좋음',
        appearance: '구부정한 허리, 낡은 모자',
        background: '50년째 불국사 근처에서 기념품점 운영.',
        alibi: {
          location: '기념품점',
          time: '14:00',
          activity: '가게 운영',
          witnesses: [],
          hasHole: false
        },
        relationships: [],
        secrets: [],
        dialogues: [
          {
            topic: '목격',
            lines: ['2시쯤? 학생들 몇 명이 뒷길로 가더라고.', '여자애 하나를 끌고 가는 것 같았어. 장난치나 했지.']
          },
          {
            topic: '폐사찰',
            lines: ['뒷길로 가면 폐사찰이 있어. 용문암이라고.', '요즘 아무도 안 가는 곳이야.']
          }
        ],
        nervousTriggers: []
      }
    ],

    evidence: [
      {
        id: 'evidence-photo',
        name: '단체 사진 분석',
        type: 'digital',
        description: '14:00 단체 사진에 나현우, 이민재, 김서진 없음',
        detailedDescription: '인원 체크용 단체 사진. 38명 중 3명(나현우, 이민재, 김서진)이 없다.',
        location: '교사 핸드폰',
        foundAt: '한미라 교사',
        linkedCharacters: ['char-bully', 'char-accomplice', 'char-missing'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-witness-local',
        name: '기념품점 주인 증언',
        type: 'testimony',
        description: '학생들이 여자애를 끌고 뒷길로 가는 것 목격',
        detailedDescription: '"2시쯤 학생들 몇 명이 여자애 하나를 끌고 뒷길로 가더라고."',
        location: '기념품점',
        foundAt: '정노인 인터뷰',
        linkedCharacters: ['char-bully', 'char-accomplice', 'char-missing'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-note',
        name: '김서진의 메모',
        type: 'document',
        description: '김서진 짐에서 발견된 메모',
        detailedDescription: '"선생님께 - 나현우가 1학년 후배들을 때리는 것을 봤습니다..."',
        location: '숙소',
        foundAt: '김서진 가방',
        linkedCharacters: ['char-missing', 'char-bully'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-temple-location',
        name: '폐사찰 위치 정보',
        type: 'testimony',
        description: '폐사찰 용문암의 위치',
        detailedDescription: '불국사 뒷길로 500m 거리에 버려진 암자가 있음.',
        location: '기념품점',
        foundAt: '정노인 인터뷰',
        linkedCharacters: [],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-confession',
        name: '이민재의 자백',
        type: 'testimony',
        description: '이민재가 진실을 고백',
        detailedDescription: '"저도 어쩔 수 없었어요... 현우 형이 서진이를 폐사찰에 가두자고..."',
        location: '불국사',
        foundAt: '이민재 심문 후',
        linkedCharacters: ['char-accomplice', 'char-bully'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      }
    ],

    locations: [
      {
        id: 'loc-bulguksa',
        name: '불국사 경내',
        description: '천년 고찰 불국사',
        atmosphere: '관광객들과 학생들로 북적이는 고즈넉한 사찰',
        objects: [
          {
            id: 'obj-bridge',
            name: '청운교/백운교',
            description: '불국사의 상징적인 다리',
            examinationResult: '나현우가 여기서 사진 찍었다고 주장. 하지만 단체 사진에는 없음.'
          }
        ],
        connectedTo: ['loc-backpath']
      },
      {
        id: 'loc-backpath',
        name: '뒷길',
        description: '불국사 뒤쪽 산길',
        atmosphere: '인적이 드물고 조용한 산책로',
        objects: [
          {
            id: 'obj-sign',
            name: '이정표',
            description: '용문암 0.5km 표시',
            examinationResult: '폐사찰로 가는 길이 있다.'
          }
        ],
        connectedTo: ['loc-bulguksa', 'loc-temple']
      },
      {
        id: 'loc-temple',
        name: '폐사찰 용문암',
        description: '버려진 작은 암자',
        atmosphere: '먼지 쌓인 쓸쓸한 공간, 거미줄',
        objects: [
          {
            id: 'obj-room',
            name: '법당',
            description: '문이 잠긴 작은 방',
            examinationResult: '안에서 김서진 발견!',
            isLocked: true,
            unlockMethod: '문 강제 개방'
          }
        ],
        connectedTo: ['loc-backpath']
      }
    ],

    timeline: [
      { time: '13:00', event: '불국사 도착, 자유관람 시작', participants: ['char-missing', 'char-bully', 'char-accomplice'], location: '불국사', importance: 'minor', isRevealed: true },
      { time: '13:30', event: '나현우, 김서진에게 접근하여 협박', participants: ['char-bully', 'char-missing'], location: '불국사', importance: 'critical', isRevealed: false },
      { time: '13:40', event: '나현우/이민재, 김서진을 뒷길로 데려감', participants: ['char-bully', 'char-accomplice', 'char-missing'], location: '뒷길', importance: 'critical', isRevealed: false },
      { time: '14:00', event: '단체 사진 촬영 (3명 불참)', participants: [], location: '불국사', importance: 'major', isRevealed: true },
      { time: '14:10', event: '김서진을 폐사찰에 가둠', participants: ['char-bully', 'char-accomplice', 'char-missing'], location: '폐사찰', importance: 'critical', isRevealed: false },
      { time: '14:30', event: '나현우/이민재 복귀', participants: ['char-bully', 'char-accomplice'], location: '불국사', importance: 'major', isRevealed: false },
      { time: '15:00', event: '김서진 실종 확인', participants: ['char-teacher'], location: '불국사', importance: 'major', isRevealed: true }
    ],

    solution: {
      summary: '나현우가 학교폭력 고발을 막기 위해 김서진을 폐사찰에 가뒀다.',
      detailedExplanation: [
        '김서진은 나현우의 학교폭력을 목격하고 담임에게 고발하려 했다.',
        '나현우는 이를 알고 수학여행을 기회로 삼았다.',
        '자유관람 시간에 김서진을 협박하여 뒷길로 데려갔다.',
        '공범 이민재와 함께 폐사찰 용문암에 가뒀다.',
        '"고발하면 가만 안 둔다"고 위협하고 돌아왔다.',
        '단체 사진 시간에 돌아오지 못해 알리바이에 구멍이 생겼다.'
      ],
      keyEvidence: ['evidence-photo', 'evidence-witness-local', 'evidence-note', 'evidence-temple-location', 'evidence-confession'],
      howToSolve: [
        '실종 시간대에 함께 없었던 사람 파악',
        '김서진과 갈등이 있던 사람 확인',
        '목격자 증언 수집',
        '공범 압박하여 자백 유도'
      ],
      commonMistakes: [
        '김서진이 스스로 도망쳤다고 생각하는 것',
        '외부인 납치로 단정짓는 것'
      ]
    },

    deductionKeywords: {
      who: ['나현우', '이민재', '일진'],
      why: ['학교폭력', '고발', '입막음', '협박'],
      how: ['감금', '폐사찰', '협박'],
      when: ['2시', '14:00', '자유관람'],
      where: ['폐사찰', '용문암', '뒷길']
    },

    tags: ['수학여행', '학교폭력', '감금', '실종', '경주'],
    author: 'DEDUCTIO Team',
    version: '1.0.0'
  },

  // ========================================
  // 시나리오 #2: 수학여행 버스의 비밀
  // ========================================
  {
    id: 'disappearance-002',
    title: '수학여행 버스의 비밀',
    subtitle: '제주도 수학여행, 휴게소에서 사라진 학생',
    type: 'disappearance',
    difficulty: 'easy',
    estimatedTime: 20,

    prologue: [
      '제주도로 향하는 수학여행.',
      '휴게소 휴식 후, 한 학생이 버스에 타지 않았다.',
      '그의 가방과 핸드폰은 버스 안에 그대로.'
    ],
    introduction: [
      '인솔 교사로부터 긴급 연락이 왔습니다.',
      '"휴게소에서 출발했는데 학생 한 명이 안 보여요!"',
      '실종된 학생을 찾아야 합니다.'
    ],
    setting: '고속도로 휴게소 및 버스',

    crimeTime: '11:30',
    crimeLocation: '휴게소',
    culpritId: 'char-stranger',
    victimId: 'char-student',
    motive: '채무 독촉 - 부모의 빚',
    motiveDetail: '학생의 부모가 사채업자에게 거액의 빛을 지고 있었다. 사채업자는 학생을 납치하여 부모를 압박하려 했다.',
    method: '휴게소에서 강제로 차에 태움',
    methodDetail: '사채업자 일당이 휴게소에서 학생을 미행하다가 화장실 근처에서 강제로 차에 태웠다. 주변이 시끄러워 목격자가 없었다.',

    characters: [
      {
        id: 'char-student',
        name: '박지훈',
        role: 'victim',
        age: 17,
        gender: 'male',
        occupation: '2학년 학생',
        personality: '내성적이고 조용함',
        appearance: '마른 체형, 불안한 표정',
        background: '부모의 빚 문제로 고민 중',
        alibi: {
          location: '불명',
          time: '11:30',
          activity: '실종',
          witnesses: [],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-friend', type: '친구', description: '유일하게 빚 문제를 털어놓은 친구', isSecret: false }
        ],
        secrets: [],
        dialogues: [],
        nervousTriggers: []
      },
      {
        id: 'char-stranger',
        name: '김태식',
        role: 'culprit',
        age: 42,
        gender: 'male',
        occupation: '사채업자',
        personality: '냉정하고 강압적',
        appearance: '건장한 체격, 선글라스',
        background: '박지훈 부모에게 5천만원을 빌려줬으나 상환받지 못함',
        alibi: {
          location: '휴게소 주차장',
          time: '11:30',
          activity: 'CCTV에 포착됨',
          witnesses: [],
          hasHole: false
        },
        motive: {
          type: 'greed',
          description: '빚 회수를 위해 학생을 납치',
          strength: 3
        },
        relationships: [
          { targetId: 'char-student', type: '채권자-채무자 가족', description: '부모의 빚 때문에 연결됨' }
        ],
        secrets: [
          {
            id: 'secret-stranger-1',
            content: '박지훈을 납치하여 차에 태웠다',
            importance: 'critical',
            revealCondition: 'CCTV 분석 후'
          }
        ],
        dialogues: [],
        nervousTriggers: ['빚', '납치', 'CCTV']
      },
      {
        id: 'char-friend',
        name: '최민수',
        role: 'witness',
        age: 17,
        gender: 'male',
        occupation: '2학년 학생',
        personality: '의리 있고 걱정이 많음',
        appearance: '평범한 외모, 걱정스러운 표정',
        background: '박지훈의 유일한 친구',
        alibi: {
          location: '휴게소 편의점',
          time: '11:30',
          activity: '간식 구매',
          witnesses: ['편의점 직원'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-student', type: '친구', description: '박지훈의 고민을 들어줌' }
        ],
        secrets: [
          {
            id: 'secret-friend-1',
            content: '박지훈이 빚쟁이한테 시달린다고 말했다',
            importance: 'major',
            revealCondition: '직접 질문 시'
          }
        ],
        dialogues: [
          {
            topic: '박지훈',
            lines: ['지훈이가... 요즘 힘들어했어요.', '부모님 빚 때문에... 빚쟁이들이 찾아온대요.']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-teacher-bus',
        name: '이성민',
        role: 'witness',
        age: 38,
        gender: 'male',
        occupation: '인솔 교사',
        personality: '책임감 있지만 부주의함',
        appearance: '정장 차림, 당황한 표정',
        background: '수학여행 인솔 책임자',
        alibi: {
          location: '휴게소 식당',
          time: '11:30',
          activity: '식사',
          witnesses: ['다른 교사'],
          hasHole: false
        },
        relationships: [],
        secrets: [],
        dialogues: [
          {
            topic: '실종',
            lines: ['11시 45분에 출발했는데 그때는 몰랐어요.', '배차표에서 인원 확인했을 때 한 명이 부족했어요.']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-clerk',
        name: '정수진',
        role: 'witness',
        age: 28,
        gender: 'female',
        occupation: '휴게소 직원',
        personality: '관찰력 좋음',
        appearance: '유니폼 착용, 밝은 표정',
        background: '휴게소 근무 3년차',
        alibi: {
          location: '휴게소 카운터',
          time: '11:30',
          activity: '근무',
          witnesses: [],
          hasHole: false
        },
        relationships: [],
        secrets: [],
        dialogues: [
          {
            topic: '목격',
            lines: ['11시 30분쯤 학생복 입은 애가 선글라스 낀 남자한테 끌려가는 걸 봤어요.', '주차장 쪽으로 갔어요. 검은색 승용차였던 것 같아요.']
          }
        ],
        nervousTriggers: []
      }
    ],

    evidence: [
      {
        id: 'evidence-cctv',
        name: '휴게소 CCTV',
        type: 'digital',
        description: '11:28 박지훈이 검은 승용차에 강제로 탑승',
        detailedDescription: 'CCTV 분석 결과 박지훈이 선글라스 낀 남성에게 팔을 잡혀 차에 타는 장면 포착.',
        location: '휴게소 주차장',
        foundAt: 'CCTV 분석',
        linkedCharacters: ['char-student', 'char-stranger'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: true
      },
      {
        id: 'evidence-friend-testimony',
        name: '최민수 증언',
        type: 'testimony',
        description: '박지훈이 빚쟁이에게 시달렸다는 증언',
        detailedDescription: '"지훈이가 부모님 빚 때문에 빚쟁이들이 학교까지 찾아왔다고 했어요."',
        location: '버스',
        foundAt: '최민수 인터뷰',
        linkedCharacters: ['char-student', 'char-friend'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-phone-threat',
        name: '협박 문자',
        type: 'digital',
        description: '박지훈 핸드폰에 남은 협박 문자',
        detailedDescription: '"이번 주까지 안 갚으면 아들한테 찾아간다" - 발신자: 김태식',
        location: '버스',
        foundAt: '박지훈 핸드폰',
        linkedCharacters: ['char-student', 'char-stranger'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-license-plate',
        name: '차량 번호',
        type: 'physical',
        description: 'CCTV에 찍힌 검은색 승용차 번호판',
        detailedDescription: '12가 3456, 김태식 명의 차량',
        location: 'CCTV',
        foundAt: 'CCTV 분석',
        linkedCharacters: ['char-stranger'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: true
      }
    ],

    locations: [
      {
        id: 'loc-rest-area',
        name: '휴게소',
        description: '고속도로 휴게소',
        atmosphere: '시끄럽고 사람들로 북적임',
        objects: [
          {
            id: 'obj-parking',
            name: '주차장',
            description: '넓은 주차 공간',
            examinationResult: 'CCTV가 설치되어 있음'
          }
        ],
        connectedTo: ['loc-bus']
      },
      {
        id: 'loc-bus',
        name: '수학여행 버스',
        description: '45인승 관광버스',
        atmosphere: '시끄럽고 어수선함',
        objects: [
          {
            id: 'obj-bag',
            name: '박지훈의 가방',
            description: '좌석에 남겨진 가방',
            examinationResult: '핸드폰과 지갑이 그대로 있음'
          }
        ],
        connectedTo: ['loc-rest-area']
      }
    ],

    timeline: [
      { time: '11:00', event: '휴게소 도착', participants: ['char-student', 'char-friend', 'char-teacher-bus'], location: '휴게소', importance: 'minor', isRevealed: true },
      { time: '11:20', event: '김태식, 주차장에서 대기', participants: ['char-stranger'], location: '휴게소', importance: 'major', isRevealed: false },
      { time: '11:28', event: '박지훈 납치', participants: ['char-student', 'char-stranger'], location: '주차장', importance: 'critical', isRevealed: false },
      { time: '11:45', event: '버스 출발', participants: ['char-friend', 'char-teacher-bus'], location: '휴게소', importance: 'major', isRevealed: true },
      { time: '11:50', event: '실종 확인', participants: ['char-teacher-bus'], location: '버스', importance: 'major', isRevealed: true }
    ],

    solution: {
      summary: '사채업자 김태식이 부모의 빚을 갚으라고 압박하기 위해 박지훈을 납치했다.',
      detailedExplanation: [
        '박지훈의 부모는 김태식에게 5천만원의 빚을 지고 있었다.',
        '김태식은 상환을 받지 못하자 박지훈을 납치하기로 계획했다.',
        '수학여행 일정을 알아낸 김태식은 휴게소에서 대기했다.',
        '박지훈이 혼자 화장실에 가는 순간을 노려 차에 강제로 태웠다.',
        'CCTV에 납치 장면이 선명하게 포착되었다.'
      ],
      keyEvidence: ['evidence-cctv', 'evidence-friend-testimony', 'evidence-phone-threat', 'evidence-license-plate'],
      howToSolve: [
        'CCTV 확인',
        '친구 최민수의 증언 청취',
        '박지훈 핸드폰의 협박 문자 확인',
        '차량 번호로 범인 추적'
      ],
      commonMistakes: [
        '학생이 스스로 도망쳤다고 생각하는 것',
        '친구들과의 다툼으로 단정짓는 것'
      ]
    },

    deductionKeywords: {
      who: ['김태식', '사채업자', '빚쟁이'],
      why: ['빚', '돈', '상환', '압박'],
      how: ['납치', '강제', '차량'],
      when: ['11:28', '휴게소'],
      where: ['주차장', 'CCTV']
    },

    tags: ['수학여행', '납치', '사채', '휴게소'],
    author: 'DEDUCTIO',
    version: '1.0'
  },

  // ========================================
  // 시나리오 #3: 야간자율학습의 그림자
  // ========================================
  {
    id: 'disappearance-003',
    title: '야간자율학습의 그림자',
    subtitle: '야자 후 사라진 수학 교사',
    type: 'disappearance',
    difficulty: 'hard',
    estimatedTime: 30,

    prologue: [
      '밤 10시, 야간자율학습이 끝났다.',
      '수학 교사 김현수가 교무실을 나선 뒤 사라졌다.',
      '차도 가방도 그대로 남겨둔 채.'
    ],
    introduction: [
      '다음 날 아침, 교감에게서 연락이 왔습니다.',
      '"김현수 선생님이 어젯밤부터 연락이 안 돼요."',
      '교사의 실종 사건을 해결해야 합니다.'
    ],
    setting: '청운고등학교',

    crimeTime: '22:10',
    crimeLocation: '과학실',
    culpritId: 'char-parent',
    victimId: 'char-teacher-kim',
    motive: '복수 - 자녀의 자살',
    motiveDetail: '김현수 교사의 과도한 압박과 모욕으로 학생 이지수가 자살했다. 이지수의 아버지는 복수를 위해 김현수를 납치했다.',
    method: '과학실에서 기절시킨 후 차량으로 이동',
    methodDetail: '이지수 아버지는 과학실에서 김현수를 기다렸다가 스턴건으로 기절시킨 후 차량에 태워 산속 창고로 이동했다.',

    characters: [
      {
        id: 'char-teacher-kim',
        name: '김현수',
        role: 'victim',
        age: 45,
        gender: 'male',
        occupation: '수학 교사',
        personality: '엄격하고 권위적, 학생들에게 가혹함',
        appearance: '날카로운 인상, 안경 착용',
        background: '30년 경력, 학생들을 과도하게 압박하는 것으로 유명',
        alibi: {
          location: '불명',
          time: '22:10',
          activity: '실종',
          witnesses: [],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-parent', type: '적대 관계', description: '이지수를 압박하여 자살로 이끔', isSecret: false }
        ],
        secrets: [],
        dialogues: [],
        nervousTriggers: []
      },
      {
        id: 'char-parent',
        name: '이강민',
        role: 'culprit',
        age: 48,
        gender: 'male',
        occupation: '이지수의 아버지 / 건설업자',
        personality: '절망적이고 복수심에 불타는',
        appearance: '수척한 얼굴, 어두운 눈빛',
        background: '딸 이지수가 김현수 교사의 압박으로 3개월 전 자살',
        alibi: {
          location: '집',
          time: '22:10',
          activity: '집에 있었다고 주장',
          witnesses: [],
          hasHole: true,
          holeDetail: '학교 근처 CCTV에 차량 포착'
        },
        motive: {
          type: 'revenge',
          description: '딸의 자살에 대한 복수',
          strength: 3
        },
        relationships: [
          { targetId: 'char-teacher-kim', type: '적대 관계', description: '딸을 죽음으로 몰고간 교사' }
        ],
        secrets: [
          {
            id: 'secret-parent-1',
            content: '김현수를 납치하여 산속 창고에 가뒀다',
            importance: 'critical',
            revealCondition: 'CCTV 및 증거 제시 후'
          }
        ],
        dialogues: [
          {
            topic: '김현수',
            lines: ['그 사람... 우리 지수를 죽였어요.', '매일 욕하고 모욕주고... 결국 지수가...']
          },
          {
            topic: '알리바이',
            lines: ['집에 있었습니다.', '(눈을 피하며) 아무 데도 안 갔어요.'],
            requiresEvidence: ['evidence-cctv-school']
          }
        ],
        nervousTriggers: ['지수', '자살', '복수', 'CCTV']
      },
      {
        id: 'char-security',
        name: '박철수',
        role: 'witness',
        age: 58,
        gender: 'male',
        occupation: '학교 경비',
        personality: '성실하고 관찰력 좋음',
        appearance: '경비 유니폼, 친절한 인상',
        background: '청운고 경비 10년차',
        alibi: {
          location: '경비실',
          time: '22:10',
          activity: '근무',
          witnesses: [],
          hasHole: false
        },
        relationships: [],
        secrets: [],
        dialogues: [
          {
            topic: '목격',
            lines: ['10시 15분쯤 검은색 SUV가 나가는 걸 봤어요.', '김현수 선생님 차는 아직 주차장에 있었고요.']
          },
          {
            topic: '차량',
            lines: ['번호판은 못 봤는데... 뒷유리에 아기가 타고 있어요 스티커가 있었어요.']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-colleague',
        name: '최은지',
        role: 'witness',
        age: 32,
        gender: 'female',
        occupation: '영어 교사',
        personality: '친절하고 학생 중심적',
        appearance: '부드러운 인상',
        background: '김현수의 교육 방식에 반대해왔음',
        alibi: {
          location: '교무실',
          time: '22:10',
          activity: '야자 마무리 업무',
          witnesses: ['다른 교사'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-teacher-kim', type: '동료', description: '교육 철학이 달라 자주 충돌' }
        ],
        secrets: [
          {
            id: 'secret-colleague-1',
            content: '김현수가 이지수를 심하게 괴롭혔던 것을 알고 있음',
            importance: 'major',
            revealCondition: '직접 질문 시'
          }
        ],
        dialogues: [
          {
            topic: '김현수',
            lines: ['김 선생님은... 너무 엄격하셨어요.', '학생들을 사람 취급도 안 하셨죠.']
          },
          {
            topic: '이지수',
            lines: ['지수가 자살하기 전에... 김 선생님한테 매일 욕먹었어요.', '"너는 쓰레기다", "포기해라" 그런 말들...']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-student-witness',
        name: '한수민',
        role: 'witness',
        age: 17,
        gender: 'female',
        occupation: '3학년 학생',
        personality: '조용하고 관찰력 좋음',
        appearance: '안경 착용, 작은 체구',
        background: '야자 마지막까지 남아있던 학생',
        alibi: {
          location: '3-2 교실',
          time: '22:10',
          activity: '공부',
          witnesses: [],
          hasHole: false
        },
        relationships: [],
        secrets: [],
        dialogues: [
          {
            topic: '목격',
            lines: ['10시쯤 과학실에서 이상한 소리가 났어요.', '둔탁한 소리... 뭔가 떨어지는 것 같았어요.']
          }
        ],
        nervousTriggers: []
      }
    ],

    evidence: [
      {
        id: 'evidence-cctv-school',
        name: '학교 주변 CCTV',
        type: 'digital',
        description: '22:15 검은색 SUV 출차 (이강민 차량)',
        detailedDescription: 'CCTV 분석 결과 이강민의 차량이 학교에서 나가는 장면 포착. 뒷좌석에 사람이 누워있는 것으로 보임.',
        location: '학교 정문',
        foundAt: 'CCTV 분석',
        linkedCharacters: ['char-parent', 'char-teacher-kim'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: true
      },
      {
        id: 'evidence-science-room',
        name: '과학실 흔적',
        type: 'physical',
        description: '바닥에 떨어진 안경과 스턴건 방전 흔적',
        detailedDescription: '김현수의 안경이 깨진 채 바닥에 떨어져 있고, 스턴건 사용 흔적(전극 자국)이 발견됨.',
        location: '과학실',
        foundAt: '현장 조사',
        linkedCharacters: ['char-teacher-kim'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: true
      },
      {
        id: 'evidence-suicide-note',
        name: '이지수 유서',
        type: 'document',
        description: '3개월 전 자살한 이지수의 유서',
        detailedDescription: '"김현수 선생님이 매일 저를 쓰레기라고 불렀습니다. 더 이상 견딜 수 없습니다."',
        location: '경찰 기록',
        foundAt: '경찰 자료 조회',
        linkedCharacters: ['char-teacher-kim', 'char-parent'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-phone-record',
        name: '이강민 통화 기록',
        type: 'digital',
        description: '납치 전날 "내일 끝낸다"는 통화 내용',
        detailedDescription: '이강민이 친구에게 "3개월 기다렸다. 내일 모든 것을 끝낸다"고 말함.',
        location: '통신사 기록',
        foundAt: '통화 기록 조회',
        linkedCharacters: ['char-parent'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      },
      {
        id: 'evidence-warehouse',
        name: '산속 창고 위치',
        type: 'physical',
        description: '이강민 소유 창고 발견',
        detailedDescription: '이강민이 소유한 산속 창고에서 김현수 발견. 결박되어 있었으나 생존.',
        location: '산속',
        foundAt: '차량 추적 후',
        linkedCharacters: ['char-parent', 'char-teacher-kim'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      }
    ],

    locations: [
      {
        id: 'loc-teachers-office',
        name: '교무실',
        description: '교사들의 사무 공간',
        atmosphere: '야자 후 조용하고 어두움',
        objects: [
          {
            id: 'obj-desk',
            name: '김현수 책상',
            description: '정리정돈된 책상',
            examinationResult: '가방과 차 키가 그대로 있음'
          }
        ],
        connectedTo: ['loc-science-room']
      },
      {
        id: 'loc-science-room',
        name: '과학실',
        description: '4층 과학 실험실',
        atmosphere: '어둡고 조용함',
        objects: [
          {
            id: 'obj-floor',
            name: '바닥',
            description: '이상한 흔적들',
            examinationResult: '깨진 안경과 스턴건 방전 흔적 발견'
          }
        ],
        connectedTo: ['loc-teachers-office', 'loc-parking']
      },
      {
        id: 'loc-parking',
        name: '주차장',
        description: '학교 주차장',
        atmosphere: '어두운 밤',
        objects: [
          {
            id: 'obj-car-kim',
            name: '김현수 차량',
            description: '그대로 주차되어 있음',
            examinationResult: '차량 내부에 이상 없음'
          }
        ],
        connectedTo: ['loc-science-room']
      },
      {
        id: 'loc-warehouse',
        name: '산속 창고',
        description: '이강민 소유의 폐창고',
        atmosphere: '어둡고 외진 곳',
        objects: [
          {
            id: 'obj-victim',
            name: '결박된 김현수',
            description: '의자에 묶여 있음',
            examinationResult: '생존 확인, 구출 완료'
          }
        ],
        connectedTo: []
      }
    ],

    timeline: [
      { time: '22:00', event: '야간자율학습 종료', participants: ['char-teacher-kim', 'char-colleague'], location: '교무실', importance: 'minor', isRevealed: true },
      { time: '22:05', event: '김현수, 과학실로 이동', participants: ['char-teacher-kim'], location: '과학실', importance: 'major', isRevealed: false },
      { time: '22:08', event: '이강민, 과학실에서 대기', participants: ['char-parent'], location: '과학실', importance: 'critical', isRevealed: false },
      { time: '22:10', event: '스턴건으로 김현수 기절', participants: ['char-parent', 'char-teacher-kim'], location: '과학실', importance: 'critical', isRevealed: false },
      { time: '22:15', event: '차량으로 이동', participants: ['char-parent', 'char-teacher-kim'], location: '주차장', importance: 'critical', isRevealed: false },
      { time: '22:30', event: '산속 창고 도착', participants: ['char-parent', 'char-teacher-kim'], location: '창고', importance: 'critical', isRevealed: false },
      { time: '08:00', event: '실종 확인', participants: ['char-colleague'], location: '교무실', importance: 'major', isRevealed: true }
    ],

    solution: {
      summary: '이지수의 아버지 이강민이 딸의 자살에 대한 복수로 김현수 교사를 납치했다.',
      detailedExplanation: [
        '3개월 전 학생 이지수가 김현수 교사의 과도한 압박으로 자살했다.',
        '이강민은 딸의 죽음에 대한 복수를 계획했다.',
        '야자 시간을 노려 과학실에서 김현수를 기다렸다.',
        '스턴건으로 기절시킨 후 차량에 태워 산속 창고로 이동했다.',
        'CCTV와 현장 증거로 범행이 드러났다.'
      ],
      keyEvidence: ['evidence-cctv-school', 'evidence-science-room', 'evidence-suicide-note', 'evidence-phone-record', 'evidence-warehouse'],
      howToSolve: [
        '김현수의 최근 갈등 관계 조사',
        '이지수 자살 사건 연결',
        'CCTV로 이강민 차량 확인',
        '과학실 현장 증거 수집',
        '이강민 소유 부동산 추적'
      ],
      commonMistakes: [
        '학생들과의 갈등으로 단정짓는 것',
        '교사가 스스로 사라졌다고 생각하는 것'
      ]
    },

    deductionKeywords: {
      who: ['이강민', '아버지', '복수자'],
      why: ['복수', '자살', '압박', '딸'],
      how: ['납치', '스턴건', '창고'],
      when: ['22:10', '야자 후'],
      where: ['과학실', '창고', '산속']
    },

    tags: ['복수', '납치', '교사', '자살', '야간자율학습'],
    author: 'DEDUCTIO',
    version: '1.0'
  },

  // ========================================
  // 시나리오 #4: 체육대회의 함성 속에서
  // ========================================
  {
    id: 'disappearance-004',
    title: '체육대회의 함성 속에서',
    subtitle: '체육대회 중 사라진 응원단장',
    type: 'disappearance',
    difficulty: 'medium',
    estimatedTime: 25,

    prologue: [
      '연례 체육대회, 온 학교가 들썩인다.',
      '오후 2시, 백군 응원단장이 홀연히 사라졌다.',
      '그의 핸드폰은 응원석에 그대로.'
    ],
    introduction: [
      '체육대회 진행 중 긴급 상황이 발생했습니다.',
      '"응원단장이 안 보여요! 다음 경기 시작인데!"',
      '실종된 응원단장을 찾아야 합니다.'
    ],
    setting: '학교 운동장 및 체육관',

    crimeTime: '14:00',
    crimeLocation: '체육관 창고',
    culpritId: 'char-rival',
    victimId: 'char-leader',
    motive: '경쟁심 - 응원상 우승 방해',
    motiveDetail: '적군 응원단장이 승리를 위해 경쟁 팀 단장을 납치하여 경기를 방해하려 했다.',
    method: '체육관 창고에 가둠',
    methodDetail: '거짓 메시지로 체육관 창고로 유인한 뒤 문을 잠그고 가뒀다. 응원 시간에 나타나지 못하게 만들었다.',

    characters: [
      {
        id: 'char-leader',
        name: '강태양',
        role: 'victim',
        age: 18,
        gender: 'male',
        occupation: '3학년 / 백군 응원단장',
        personality: '열정적이고 책임감 강함',
        appearance: '키 큰 체격, 햇볕에 그을린 피부',
        background: '2년 연속 응원상 수상, 학교의 인기인',
        alibi: {
          location: '불명',
          time: '14:00',
          activity: '실종',
          witnesses: [],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-rival', type: '라이벌', description: '매년 응원상을 두고 경쟁', isSecret: false }
        ],
        secrets: [],
        dialogues: [],
        nervousTriggers: []
      },
      {
        id: 'char-rival',
        name: '박서진',
        role: 'culprit',
        age: 18,
        gender: 'female',
        occupation: '3학년 / 적군 응원단장',
        personality: '승부욕 강하고 교활함',
        appearance: '날렵한 인상, 예리한 눈빛',
        background: '강태양과 매년 응원상을 두고 치열하게 경쟁',
        alibi: {
          location: '응원석',
          time: '14:00',
          activity: '응원 지휘',
          witnesses: ['적군 단원들'],
          hasHole: true,
          holeDetail: '13:50~14:10 사이 목격자 없음'
        },
        motive: {
          type: 'jealousy',
          description: '응원상 우승을 위해 라이벌 제거',
          strength: 3
        },
        relationships: [
          { targetId: 'char-leader', type: '라이벌', description: '강태양을 이기고 싶어함' },
          { targetId: 'char-helper', type: '친구', description: '같은 반 친구' }
        ],
        secrets: [
          {
            id: 'secret-rival-1',
            content: '강태양을 체육관 창고에 가뒀다',
            importance: 'critical',
            revealCondition: '증거 제시 후'
          }
        ],
        dialogues: [
          {
            topic: '강태양',
            lines: ['태양이? 어디 갔는지 모르겠는데.', '(미소 지으며) 백군 망했네요.']
          },
          {
            topic: '알리바이',
            lines: ['계속 응원석에 있었어요.', '우리 단원들이 다 봤어요.'],
            requiresEvidence: ['evidence-message']
          }
        ],
        nervousTriggers: ['창고', '메시지', '거짓말']
      },
      {
        id: 'char-helper',
        name: '김민지',
        role: 'suspect',
        age: 17,
        gender: 'female',
        occupation: '2학년 / 적군 단원',
        personality: '소극적이지만 박서진을 따름',
        appearance: '평범한 외모, 불안한 표정',
        background: '박서진의 친한 친구',
        alibi: {
          location: '응원석',
          time: '14:00',
          activity: '응원',
          witnesses: ['다른 단원들'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-rival', type: '친구', description: '박서진의 계획을 알고 있음' }
        ],
        secrets: [
          {
            id: 'secret-helper-1',
            content: '박서진이 강태양을 가뒀다는 것을 알고 있음',
            importance: 'major',
            revealCondition: '압박 시'
          }
        ],
        dialogues: [
          {
            topic: '박서진',
            lines: ['서진이는... 이기는 게 너무 중요해요.', '(망설이며) 그래도 이렇게까지는...']
          }
        ],
        nervousTriggers: ['창고', '거짓말', '공범']
      },
      {
        id: 'char-teacher-pe',
        name: '조민호',
        role: 'witness',
        age: 40,
        gender: 'male',
        occupation: '체육 교사',
        personality: '열정적이고 공정함',
        appearance: '운동복 차림, 건장한 체격',
        background: '체육대회 총괄 책임자',
        alibi: {
          location: '운동장',
          time: '14:00',
          activity: '경기 진행',
          witnesses: ['다수'],
          hasHole: false
        },
        relationships: [],
        secrets: [],
        dialogues: [
          {
            topic: '강태양',
            lines: ['태양이가 안 보인다고요?', '그 친구가 빠지면 안 되는데... 응원이 안 되잖아요.']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-friend',
        name: '이준호',
        role: 'witness',
        age: 18,
        gender: 'male',
        occupation: '3학년 / 백군 부단장',
        personality: '차분하고 관찰력 좋음',
        appearance: '안경 착용, 날씬한 체형',
        background: '강태양의 친한 친구',
        alibi: {
          location: '응원석',
          time: '14:00',
          activity: '태양 찾기',
          witnesses: ['백군 단원들'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-leader', type: '친구', description: '강태양과 절친' }
        ],
        secrets: [],
        dialogues: [
          {
            topic: '강태양',
            lines: ['태양이가 "잠깐 다녀올게"라고 하고 갔어요.', '핸드폰 메시지를 보고 급하게 나갔어요.']
          },
          {
            topic: '메시지',
            lines: ['태양이 핸드폰에 메시지가 왔는데... 체육관으로 오라는 내용이었어요.']
          }
        ],
        nervousTriggers: []
      }
    ],

    evidence: [
      {
        id: 'evidence-message',
        name: '의심스러운 문자',
        type: 'digital',
        description: '강태양 핸드폰에 온 메시지',
        detailedDescription: '"태양아, 체육관 창고로 와. 급한 일 있어. -선생님" (발신: 박서진 번호)',
        location: '응원석',
        foundAt: '강태양 핸드폰',
        linkedCharacters: ['char-leader', 'char-rival'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: true
      },
      {
        id: 'evidence-lock',
        name: '창고 자물쇠',
        type: 'physical',
        description: '체육관 창고 문에 걸린 새 자물쇠',
        detailedDescription: '원래 없던 자물쇠가 추가로 걸려 있음. 안에서 강태양의 목소리가 들림.',
        location: '체육관',
        foundAt: '체육관 창고',
        linkedCharacters: ['char-leader'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-cctv-gym',
        name: '체육관 CCTV',
        type: 'digital',
        description: '13:55 박서진이 창고로 들어가는 장면',
        detailedDescription: 'CCTV에 박서진이 자물쇠를 들고 체육관으로 들어가는 모습 포착.',
        location: '체육관',
        foundAt: 'CCTV 분석',
        linkedCharacters: ['char-rival'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: true
      },
      {
        id: 'evidence-witness-friend',
        name: '이준호 증언',
        type: 'testimony',
        description: '강태양이 메시지 보고 급히 나감',
        detailedDescription: '"태양이가 핸드폰 보더니 급하게 체육관으로 갔어요."',
        location: '응원석',
        foundAt: '이준호 인터뷰',
        linkedCharacters: ['char-leader', 'char-friend'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-confession',
        name: '김민지 증언',
        type: 'testimony',
        description: '박서진의 계획을 알고 있었다는 증언',
        detailedDescription: '"서진이가... 태양이를 창고에 가뒀어요. 응원을 못하게 하려고..."',
        location: '응원석',
        foundAt: '김민지 압박 후',
        linkedCharacters: ['char-helper', 'char-rival'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      }
    ],

    locations: [
      {
        id: 'loc-field',
        name: '운동장',
        description: '학교 운동장',
        atmosphere: '함성과 응원으로 시끄러움',
        objects: [
          {
            id: 'obj-cheering',
            name: '응원석',
            description: '백군/적군 응원석',
            examinationResult: '강태양의 핸드폰 발견'
          }
        ],
        connectedTo: ['loc-gym']
      },
      {
        id: 'loc-gym',
        name: '체육관',
        description: '실내 체육관',
        atmosphere: '조용하고 어두움',
        objects: [
          {
            id: 'obj-warehouse',
            name: '창고',
            description: '체육 용품 창고',
            examinationResult: '자물쇠로 잠겨 있음, 안에서 소리 들림',
            isLocked: true,
            unlockMethod: '자물쇠 파괴'
          }
        ],
        connectedTo: ['loc-field']
      }
    ],

    timeline: [
      { time: '13:00', event: '체육대회 시작', participants: ['char-leader', 'char-rival'], location: '운동장', importance: 'minor', isRevealed: true },
      { time: '13:50', event: '박서진, 강태양에게 거짓 문자 발송', participants: ['char-rival', 'char-leader'], location: '응원석', importance: 'critical', isRevealed: false },
      { time: '13:55', event: '박서진, 체육관 창고에 자물쇠 설치', participants: ['char-rival'], location: '체육관', importance: 'critical', isRevealed: false },
      { time: '13:58', event: '강태양, 체육관으로 이동', participants: ['char-leader'], location: '체육관', importance: 'major', isRevealed: false },
      { time: '14:00', event: '강태양 창고에 갇힘', participants: ['char-leader'], location: '창고', importance: 'critical', isRevealed: false },
      { time: '14:05', event: '실종 확인', participants: ['char-friend'], location: '응원석', importance: 'major', isRevealed: true }
    ],

    solution: {
      summary: '적군 응원단장 박서진이 응원상 우승을 위해 라이벌 강태양을 체육관 창고에 가뒀다.',
      detailedExplanation: [
        '박서진은 매년 강태양에게 응원상을 빼앗겨왔다.',
        '올해는 반드시 이기겠다는 집념으로 강태양을 제거하기로 계획했다.',
        '선생님 행세를 하며 거짓 문자를 보내 체육관으로 유인했다.',
        '미리 준비한 자물쇠로 창고 문을 잠가 가뒀다.',
        '강태양이 응원에 참여하지 못하면 백군이 질 것이라 생각했다.'
      ],
      keyEvidence: ['evidence-message', 'evidence-lock', 'evidence-cctv-gym', 'evidence-witness-friend', 'evidence-confession'],
      howToSolve: [
        '강태양의 마지막 행적 추적',
        '핸드폰 메시지 확인',
        '체육관 CCTV 분석',
        '김민지 압박하여 진실 확인',
        '창고에서 강태양 구출'
      ],
      commonMistakes: [
        '강태양이 스스로 숨었다고 생각하는 것',
        '외부인 소행으로 단정짓는 것'
      ]
    },

    deductionKeywords: {
      who: ['박서진', '응원단장', '라이벌'],
      why: ['경쟁', '응원상', '우승', '승부욕'],
      how: ['감금', '창고', '자물쇠', '거짓 문자'],
      when: ['14:00', '체육대회'],
      where: ['체육관', '창고']
    },

    tags: ['체육대회', '경쟁', '감금', '응원'],
    author: 'DEDUCTIO',
    version: '1.0'
  },

  // ========================================
  // 시나리오 #5: 동아리 MT의 악몽
  // ========================================
  {
    id: 'disappearance-005',
    title: '동아리 MT의 악몽',
    subtitle: '밤 산책 후 돌아오지 않은 부원',
    type: 'disappearance',
    difficulty: 'hard',
    estimatedTime: 30,

    prologue: [
      '사진 동아리 MT, 강원도 펜션.',
      '밤 11시, 한 부원이 산책을 나갔다.',
      '새벽 3시가 되어도 돌아오지 않았다.'
    ],
    introduction: [
      '동아리 회장에게서 다급한 연락이 왔습니다.',
      '"지민이가 산책 나간 지 4시간째인데 연락이 안 돼요!"',
      '실종된 부원을 찾아야 합니다.'
    ],
    setting: '강원도 산골 펜션',

    crimeTime: '23:00',
    crimeLocation: '펜션 뒷산',
    culpritId: 'char-senior',
    victimId: 'char-junior',
    motive: '은폐 - 폭행 사건 고발 저지',
    motiveDetail: '지민이 선배의 후배 폭행 사건을 사진으로 찍어뒀고, 이를 학교에 제보하려 했다. 선배는 이를 막기 위해 지민을 산속에 유기했다.',
    method: '산책 중 기습하여 산속 오두막에 가둠',
    methodDetail: '선배가 함께 산책을 나가자고 제안한 뒤, 인적 없는 곳에서 기습하여 폐오두막에 가뒀다.',

    characters: [
      {
        id: 'char-junior',
        name: '한지민',
        role: 'victim',
        age: 17,
        gender: 'female',
        occupation: '2학년 / 사진부',
        personality: '정의롭고 용감함',
        appearance: '작은 키, 카메라 애호가',
        background: '선배의 폭행을 목격하고 증거 사진 촬영',
        alibi: {
          location: '불명',
          time: '23:00',
          activity: '실종',
          witnesses: [],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-senior', type: '동아리 선후배', description: '선배의 폭행 목격', isSecret: true }
        ],
        secrets: [],
        dialogues: [],
        nervousTriggers: []
      },
      {
        id: 'char-senior',
        name: '박준혁',
        role: 'culprit',
        age: 19,
        gender: 'male',
        occupation: '3학년 / 사진부 부회장',
        personality: '폭력적이고 교활함',
        appearance: '건장한 체격, 냉정한 인상',
        background: '후배들을 괴롭혀온 문제 선배',
        alibi: {
          location: '펜션',
          time: '23:00',
          activity: '게임하고 있었다고 주장',
          witnesses: [],
          hasHole: true,
          holeDetail: '11시~12시 사이 목격자 없음'
        },
        motive: {
          type: 'fear',
          description: '폭행 사건 은폐',
          strength: 3
        },
        relationships: [
          { targetId: 'char-junior', type: '동아리 선후배', description: '지민의 고발을 두려워함' }
        ],
        secrets: [
          {
            id: 'secret-senior-1',
            content: '지민을 산속 오두막에 가뒀다',
            importance: 'critical',
            revealCondition: '증거 제시 및 압박'
          }
        ],
        dialogues: [
          {
            topic: '한지민',
            lines: ['지민이? 산책 갔다고 했는데.', '혼자 갔나보죠 뭐.']
          },
          {
            topic: '알리바이',
            lines: ['나 펜션에서 게임했어요.', '(눈을 피하며) 계속 안에 있었다고요.'],
            requiresEvidence: ['evidence-photos']
          }
        ],
        nervousTriggers: ['사진', '증거', '폭행', '고발']
      },
      {
        id: 'char-president',
        name: '최수진',
        role: 'witness',
        age: 18,
        gender: 'female',
        occupation: '3학년 / 사진부 회장',
        personality: '책임감 있고 걱정 많음',
        appearance: '긴 머리, 안경',
        background: '동아리를 이끄는 회장',
        alibi: {
          location: '펜션',
          time: '23:00',
          activity: '영화 감상',
          witnesses: ['다른 부원들'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-junior', type: '동아리 선후배', description: '지민을 아낌' }
        ],
        secrets: [
          {
            id: 'secret-president-1',
            content: '박준혁의 폭행 의혹을 알고 있었음',
            importance: 'major',
            revealCondition: '직접 질문 시'
          }
        ],
        dialogues: [
          {
            topic: '한지민',
            lines: ['지민이가 11시쯤 나갔어요.', '"바람 쐬고 올게요"라고...']
          },
          {
            topic: '박준혁',
            lines: ['준혁이가... 후배들한테 좀 심했어요.', '지민이가 그 얘기를 하려던 참이었는데...']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-witness',
        name: '김태훈',
        role: 'witness',
        age: 17,
        gender: 'male',
        occupation: '2학년 / 사진부',
        personality: '조용하고 관찰력 좋음',
        appearance: '마른 체형, 안경',
        background: '지민의 같은 학년 친구',
        alibi: {
          location: '펜션 베란다',
          time: '23:00',
          activity: '별 촬영',
          witnesses: [],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-junior', type: '친구', description: '지민과 친함' }
        ],
        secrets: [],
        dialogues: [
          {
            topic: '목격',
            lines: ['11시 10분쯤 박준혁 선배가 밖으로 나가는 걸 봤어요.', '손전등을 들고 있었어요.']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-owner',
        name: '이영숙',
        role: 'witness',
        age: 55,
        gender: 'female',
        occupation: '펜션 주인',
        personality: '친절하고 지역에 밝음',
        appearance: '중년 여성, 소탈한 인상',
        background: '펜션 운영 10년차',
        alibi: {
          location: '펜션 사무실',
          time: '23:00',
          activity: '업무',
          witnesses: [],
          hasHole: false
        },
        relationships: [],
        secrets: [],
        dialogues: [
          {
            topic: '뒷산',
            lines: ['뒷산에 올라가면 폐오두막이 있어요.', '옛날에 산지기가 쓰던 건데 지금은 아무도 안 가요.']
          }
        ],
        nervousTriggers: []
      }
    ],

    evidence: [
      {
        id: 'evidence-photos',
        name: '지민의 카메라',
        type: 'digital',
        description: '지민이 촬영한 박준혁 폭행 사진',
        detailedDescription: '박준혁이 1학년 후배를 때리는 장면이 담긴 사진들. 날짜는 MT 일주일 전.',
        location: '펜션',
        foundAt: '지민의 가방',
        linkedCharacters: ['char-junior', 'char-senior'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: true
      },
      {
        id: 'evidence-flashlight',
        name: '손전등 목격',
        type: 'testimony',
        description: '박준혁이 손전등 들고 나간 것 목격',
        detailedDescription: '"11시 10분쯤 박준혁 선배가 손전등 들고 밖으로 나갔어요."',
        location: '펜션',
        foundAt: '김태훈 증언',
        linkedCharacters: ['char-senior', 'char-witness'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-footprints',
        name: '발자국',
        type: 'physical',
        description: '펜션에서 오두막으로 이어진 두 사람의 발자국',
        detailedDescription: '박준혁의 운동화(280mm)와 지민의 운동화(240mm) 발자국이 오두막까지 이어짐.',
        location: '뒷산',
        foundAt: '현장 조사',
        linkedCharacters: ['char-senior', 'char-junior'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: true
      },
      {
        id: 'evidence-cabin',
        name: '폐오두막',
        type: 'physical',
        description: '산속 폐오두막에서 지민 발견',
        detailedDescription: '문이 밖에서 잠긴 오두막에 지민이 갇혀 있음. 저체온증 초기 단계.',
        location: '뒷산',
        foundAt: '수색 후',
        linkedCharacters: ['char-junior'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      },
      {
        id: 'evidence-message',
        name: '지민의 메모',
        type: 'document',
        description: '지민이 남긴 메모',
        detailedDescription: '"준혁 선배가 증거 사진 지우라고 협박했다. 학교에 제보할 것이다."',
        location: '펜션',
        foundAt: '지민의 노트',
        linkedCharacters: ['char-junior', 'char-senior'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      }
    ],

    locations: [
      {
        id: 'loc-pension',
        name: '펜션',
        description: '강원도 산골 펜션',
        atmosphere: '밤에는 조용하고 어두움',
        objects: [
          {
            id: 'obj-bag',
            name: '지민의 가방',
            description: '방에 남겨진 가방',
            examinationResult: '카메라와 노트 발견'
          }
        ],
        connectedTo: ['loc-mountain']
      },
      {
        id: 'loc-mountain',
        name: '뒷산',
        description: '펜션 뒤 산길',
        atmosphere: '어둡고 위험함',
        objects: [
          {
            id: 'obj-trail',
            name: '산길',
            description: '오솔길',
            examinationResult: '발자국 발견'
          }
        ],
        connectedTo: ['loc-pension', 'loc-cabin']
      },
      {
        id: 'loc-cabin',
        name: '폐오두막',
        description: '산속 낡은 오두막',
        atmosphere: '을씨년스럽고 추움',
        objects: [
          {
            id: 'obj-door',
            name: '오두막 문',
            description: '밖에서 잠긴 문',
            examinationResult: '안에서 지민 발견',
            isLocked: true,
            unlockMethod: '문 개방'
          }
        ],
        connectedTo: ['loc-mountain']
      }
    ],

    timeline: [
      { time: '20:00', event: 'MT 저녁 식사', participants: ['char-junior', 'char-senior', 'char-president'], location: '펜션', importance: 'minor', isRevealed: true },
      { time: '22:50', event: '지민, MT 중 선배 폭행 제보 결심', participants: ['char-junior'], location: '펜션', importance: 'major', isRevealed: false },
      { time: '23:00', event: '지민, 산책 나감', participants: ['char-junior'], location: '펜션', importance: 'major', isRevealed: true },
      { time: '23:10', event: '박준혁, 손전등 들고 뒤따라 나감', participants: ['char-senior'], location: '펜션', importance: 'critical', isRevealed: false },
      { time: '23:30', event: '박준혁, 지민을 오두막에 가둠', participants: ['char-senior', 'char-junior'], location: '오두막', importance: 'critical', isRevealed: false },
      { time: '23:50', event: '박준혁 복귀', participants: ['char-senior'], location: '펜션', importance: 'major', isRevealed: false },
      { time: '03:00', event: '실종 신고', participants: ['char-president'], location: '펜션', importance: 'major', isRevealed: true }
    ],

    solution: {
      summary: '박준혁이 폭행 사건 고발을 막기 위해 지민을 산속 오두막에 가뒀다.',
      detailedExplanation: [
        '지민은 박준혁이 후배를 폭행하는 장면을 사진으로 찍어뒀다.',
        'MT 기간 중 학교에 제보하려던 지민의 계획을 박준혁이 알게 되었다.',
        '박준혁은 지민이 산책을 나가자 뒤따라갔다.',
        '인적 없는 곳에서 지민을 협박하여 폐오두막으로 데려갔다.',
        '문을 잠그고 유기하여 제보를 막으려 했다.'
      ],
      keyEvidence: ['evidence-photos', 'evidence-flashlight', 'evidence-footprints', 'evidence-cabin', 'evidence-message'],
      howToSolve: [
        '지민의 카메라에서 폭행 사진 발견',
        '김태훈의 박준혁 목격 증언',
        '발자국 추적하여 오두막 발견',
        '지민 구출 및 메모 확인',
        '박준혁 압박하여 자백'
      ],
      commonMistakes: [
        '지민이 길을 잃었다고 생각하는 것',
        '야생동물 공격으로 단정짓는 것'
      ]
    },

    deductionKeywords: {
      who: ['박준혁', '선배', '폭행자'],
      why: ['은폐', '고발', '폭행', '증거'],
      how: ['유기', '오두막', '감금'],
      when: ['23:00', '산책'],
      where: ['뒷산', '오두막']
    },

    tags: ['MT', '동아리', '폭행', '유기', '산'],
    author: 'DEDUCTIO',
    version: '1.0'
  },

  // ========================================
  // 시나리오 #6: 축제의 미로
  // ========================================
  {
    id: 'disappearance-006',
    title: '축제의 미로',
    subtitle: '학교 축제, 귀신의 집에서 사라진 학생',
    type: 'disappearance',
    difficulty: 'easy',
    estimatedTime: 20,

    prologue: [
      '청운고 문화제, 축제의 하이라이트 귀신의 집.',
      '오후 5시, 한 학생이 입장한 뒤 나오지 않았다.',
      '30분이 지나도 출구로 나타나지 않는다.'
    ],
    introduction: [
      '귀신의 집 운영진에게서 연락이 왔습니다.',
      '"학생 한 명이 출구로 안 나왔어요. 안에도 없는데..."',
      '사라진 학생을 찾아야 합니다.'
    ],
    setting: '학교 체육관 (귀신의 집)',

    crimeTime: '17:00',
    crimeLocation: '체육관 비상구',
    culpritId: 'char-debtor',
    victimId: 'char-creditor',
    motive: '도주 - 빚 독촉 회피',
    motiveDetail: '실종된 학생은 같은 반 친구에게 50만원을 빌려주고 갚으라고 압박했다. 채무자는 빚을 갚을 수 없어 축제를 이용해 도주했다.',
    method: '귀신의 집 비상구를 통해 탈출',
    methodDetail: '채무자는 귀신의 집 스태프로 일하면서 내부 구조를 파악했고, 채권자가 입장하자 비상구를 열어 도주했다.',

    characters: [
      {
        id: 'char-creditor',
        name: '송민준',
        role: 'victim',
        age: 17,
        gender: 'male',
        occupation: '2학년 학생',
        personality: '돈에 집착하고 집요함',
        appearance: '날카로운 인상',
        background: '친구에게 돈을 빌려주고 매일 독촉함',
        alibi: {
          location: '불명',
          time: '17:00',
          activity: '귀신의 집 입장 후 실종',
          witnesses: [],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-debtor', type: '채권자-채무자', description: '돈을 빌려주고 독촉함', isSecret: false }
        ],
        secrets: [],
        dialogues: [],
        nervousTriggers: []
      },
      {
        id: 'char-debtor',
        name: '김도현',
        role: 'culprit',
        age: 17,
        gender: 'male',
        occupation: '2학년 학생',
        personality: '소심하고 회피적',
        appearance: '왜소한 체격, 불안한 표정',
        background: '송민준에게 50만원을 빌렸으나 갚지 못함',
        alibi: {
          location: '귀신의 집 (스태프)',
          time: '17:00',
          activity: '귀신 역할',
          witnesses: ['다른 스태프'],
          hasHole: true,
          holeDetail: '17:00~17:30 목격자 없음'
        },
        motive: {
          type: 'fear',
          description: '빚 독촉을 피해 도주',
          strength: 3
        },
        relationships: [
          { targetId: 'char-creditor', type: '채무자-채권자', description: '빚을 갚지 못해 시달림' }
        ],
        secrets: [
          {
            id: 'secret-debtor-1',
            content: '비상구를 열어주고 민준이를 밖으로 유인하여 도주시켰다',
            importance: 'critical',
            revealCondition: 'CCTV 및 증거 제시'
          }
        ],
        dialogues: [
          {
            topic: '송민준',
            lines: ['민준이요? 입장한 거 봤는데...', '(눈을 피하며) 제가 어떻게 알아요.']
          },
          {
            topic: '알리바이',
            lines: ['저는 계속 귀신 역할 했어요.', '다른 스태프들이 봤을걸요?'],
            requiresEvidence: ['evidence-cctv-exit']
          }
        ],
        nervousTriggers: ['빚', '50만원', '비상구', 'CCTV']
      },
      {
        id: 'char-staff-leader',
        name: '박유진',
        role: 'witness',
        age: 18,
        gender: 'female',
        occupation: '3학년 / 귀신의 집 총괄',
        personality: '책임감 있고 꼼꼼함',
        appearance: '짧은 머리, 활동적인 모습',
        background: '귀신의 집 기획 및 운영 총괄',
        alibi: {
          location: '입구',
          time: '17:00',
          activity: '입장객 안내',
          witnesses: ['다수'],
          hasHole: false
        },
        relationships: [],
        secrets: [],
        dialogues: [
          {
            topic: '송민준',
            lines: ['5시에 입장했어요. 확실해요.', '근데 출구로 안 나왔어요. 체크리스트에 없어요.']
          },
          {
            topic: '비상구',
            lines: ['비상구는 절대 열면 안 되는데...', '알람이 울려야 하는데 꺼져 있었네요?']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-friend',
        name: '이하늘',
        role: 'witness',
        age: 17,
        gender: 'female',
        occupation: '2학년 학생',
        personality: '친절하고 관찰력 좋음',
        appearance: '긴 머리, 부드러운 인상',
        background: '김도현의 친구',
        alibi: {
          location: '축제장',
          time: '17:00',
          activity: '축제 구경',
          witnesses: ['다른 친구들'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-debtor', type: '친구', description: '도현의 고민을 알고 있음' }
        ],
        secrets: [
          {
            id: 'secret-friend-1',
            content: '김도현이 송민준의 빚 독촉에 시달렸다는 것을 알고 있음',
            importance: 'major',
            revealCondition: '직접 질문 시'
          }
        ],
        dialogues: [
          {
            topic: '김도현',
            lines: ['도현이가... 요즘 민준이한테 시달렸어요.', '매일 돈 갚으라고... 협박까지 했대요.']
          }
        ],
        nervousTriggers: []
      }
    ],

    evidence: [
      {
        id: 'evidence-cctv-exit',
        name: '비상구 CCTV',
        type: 'digital',
        description: '17:05 송민준이 비상구로 나가는 장면',
        detailedDescription: 'CCTV에 송민준이 비상구를 통해 밖으로 나가는 장면 포착. 김도현이 문을 열어주는 모습도 보임.',
        location: '체육관',
        foundAt: 'CCTV 분석',
        linkedCharacters: ['char-creditor', 'char-debtor'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: true
      },
      {
        id: 'evidence-alarm',
        name: '비상구 알람 조작',
        type: 'physical',
        description: '비상구 알람이 고의로 꺼져 있음',
        detailedDescription: '비상구 알람의 배터리가 제거되어 있음. 김도현의 지문 발견.',
        location: '비상구',
        foundAt: '현장 조사',
        linkedCharacters: ['char-debtor'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: true
      },
      {
        id: 'evidence-debt',
        name: '차용증',
        type: 'document',
        description: '김도현이 송민준에게 쓴 차용증',
        detailedDescription: '"50만원을 빌립니다. 한 달 내 갚겠습니다. - 김도현"',
        location: '송민준 가방',
        foundAt: '송민준 소지품',
        linkedCharacters: ['char-creditor', 'char-debtor'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-threat',
        name: '협박 문자',
        type: 'digital',
        description: '송민준이 김도현에게 보낸 협박 문자',
        detailedDescription: '"오늘까지 안 갚으면 부모님한테 말한다. 경찰 신고할 거다."',
        location: '김도현 핸드폰',
        foundAt: '김도현 심문 후',
        linkedCharacters: ['char-creditor', 'char-debtor'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      }
    ],

    locations: [
      {
        id: 'loc-entrance',
        name: '귀신의 집 입구',
        description: '체육관 입구를 개조한 공포 입구',
        atmosphere: '어둡고 으스스함',
        objects: [
          {
            id: 'obj-checklist',
            name: '입장 체크리스트',
            description: '입장객 명단',
            examinationResult: '송민준 입장 확인, 출구 체크 없음'
          }
        ],
        connectedTo: ['loc-maze']
      },
      {
        id: 'loc-maze',
        name: '미로 구간',
        description: '칸막이로 만든 미로',
        atmosphere: '깜깜하고 무서운 음향',
        objects: [
          {
            id: 'obj-emergency-exit',
            name: '비상구',
            description: '체육관 측면 비상구',
            examinationResult: 'CCTV 있음, 알람 꺼져 있음'
          }
        ],
        connectedTo: ['loc-entrance', 'loc-outside']
      },
      {
        id: 'loc-outside',
        name: '체육관 밖',
        description: '학교 운동장',
        atmosphere: '축제로 시끄러움',
        objects: [],
        connectedTo: ['loc-maze']
      }
    ],

    timeline: [
      { time: '16:50', event: '김도현, 비상구 알람 배터리 제거', participants: ['char-debtor'], location: '비상구', importance: 'critical', isRevealed: false },
      { time: '17:00', event: '송민준, 귀신의 집 입장', participants: ['char-creditor'], location: '입구', importance: 'major', isRevealed: true },
      { time: '17:05', event: '김도현, 비상구 열어줌', participants: ['char-debtor', 'char-creditor'], location: '비상구', importance: 'critical', isRevealed: false },
      { time: '17:30', event: '실종 확인', participants: ['char-staff-leader'], location: '출구', importance: 'major', isRevealed: true }
    ],

    solution: {
      summary: '김도현이 빚 독촉을 피하기 위해 비상구를 조작하여 송민준을 밖으로 유도했다.',
      detailedExplanation: [
        '김도현은 송민준에게 50만원을 빌렸으나 갚지 못했다.',
        '송민준의 집요한 독촉과 협박에 시달리던 김도현은 도주를 계획했다.',
        '귀신의 집 스태프로 일하며 비상구 위치를 파악했다.',
        '축제 당일 비상구 알람 배터리를 제거했다.',
        '송민준이 입장하자 비상구를 열어 밖으로 유인했다.',
        'CCTV에 모든 과정이 포착되었다.'
      ],
      keyEvidence: ['evidence-cctv-exit', 'evidence-alarm', 'evidence-debt', 'evidence-threat'],
      howToSolve: [
        '입장/퇴장 명단 대조',
        '비상구 CCTV 확인',
        '알람 조작 흔적 발견',
        '송민준-김도현 관계 파악',
        '김도현 압박하여 자백'
      ],
      commonMistakes: [
        '송민준이 스스로 숨었다고 생각하는 것',
        '귀신의 집 내부에서 사고가 났다고 단정짓는 것'
      ]
    },

    deductionKeywords: {
      who: ['김도현', '채무자', '스태프'],
      why: ['빚', '독촉', '도주', '협박'],
      how: ['비상구', '알람 조작'],
      when: ['17:00', '축제'],
      where: ['귀신의 집', '비상구']
    },

    tags: ['축제', '빚', '도주', '귀신의 집'],
    author: 'DEDUCTIO',
    version: '1.0'
  },

  // ========================================
  // 시나리오 #7: 방과 후 수업의 비밀
  // ========================================
  {
    id: 'disappearance-007',
    title: '방과 후 수업의 비밀',
    subtitle: '방과 후 교실에서 사라진 학생',
    type: 'disappearance',
    difficulty: 'medium',
    estimatedTime: 25,

    prologue: [
      '방과 후 영어 수업, 10명의 학생.',
      '쉬는 시간 후, 한 학생이 돌아오지 않았다.',
      '가방도 책도 그대로 둔 채.'
    ],
    introduction: [
      '방과 후 교사에게서 연락이 왔습니다.',
      '"학생 한 명이 화장실 간다고 나가더니 안 돌아와요."',
      '실종된 학생을 찾아야 합니다.'
    ],
    setting: '학교 3층 영어 교실',

    crimeTime: '16:30',
    crimeLocation: '옥상',
    culpritId: 'char-boyfriend',
    victimId: 'char-girlfriend',
    motive: '갈등 - 이별 통보 후 감정 폭발',
    motiveDetail: '실종된 여학생이 남자친구에게 이별을 통보했고, 남자친구는 이를 받아들이지 못하고 협박하며 옥상에 가뒀다.',
    method: '옥상으로 유인 후 문 잠금',
    methodDetail: '남자친구가 "마지막으로 할 말이 있다"며 옥상으로 유인한 뒤, 문을 잠그고 "생각을 바꿀 때까지 나가지 마"라고 협박했다.',

    characters: [
      {
        id: 'char-girlfriend',
        name: '윤서아',
        role: 'victim',
        age: 17,
        gender: 'female',
        occupation: '2학년 학생',
        personality: '독립적이고 결단력 있음',
        appearance: '긴 머리, 단호한 표정',
        background: '남자친구와 헤어지기로 결심함',
        alibi: {
          location: '불명',
          time: '16:30',
          activity: '실종',
          witnesses: [],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-boyfriend', type: '전 연인', description: '헤어지려 함', isSecret: false }
        ],
        secrets: [],
        dialogues: [],
        nervousTriggers: []
      },
      {
        id: 'char-boyfriend',
        name: '정우진',
        role: 'culprit',
        age: 18,
        gender: 'male',
        occupation: '3학년 학생',
        personality: '집착이 강하고 감정 기복이 심함',
        appearance: '건장한 체격, 어두운 눈빛',
        background: '윤서아의 남자친구, 이별을 받아들이지 못함',
        alibi: {
          location: '복도',
          time: '16:30',
          activity: '화장실 갔다 왔다고 주장',
          witnesses: [],
          hasHole: true,
          holeDetail: '목격자 없음, 옥상 CCTV에 포착'
        },
        motive: {
          type: 'jealousy',
          description: '이별 거부, 관계 강요',
          strength: 3
        },
        relationships: [
          { targetId: 'char-girlfriend', type: '전 연인', description: '집착하고 있음' }
        ],
        secrets: [
          {
            id: 'secret-boyfriend-1',
            content: '윤서아를 옥상에 가뒀다',
            importance: 'critical',
            revealCondition: 'CCTV 제시 후'
          }
        ],
        dialogues: [
          {
            topic: '윤서아',
            lines: ['서아? 몰라요.', '(화를 내며) 왜 자꾸 물어봐요!']
          },
          {
            topic: '알리바이',
            lines: ['저는 화장실 갔다 왔어요.', '(눈을 피하며) 아무도 못 봤을걸요?'],
            requiresEvidence: ['evidence-cctv-roof']
          }
        ],
        nervousTriggers: ['이별', '헤어지기', '옥상', 'CCTV']
      },
      {
        id: 'char-teacher-english',
        name: '김수연',
        role: 'witness',
        age: 35,
        gender: 'female',
        occupation: '영어 교사',
        personality: '세심하고 책임감 있음',
        appearance: '단정한 차림, 안경',
        background: '방과 후 수업 담당',
        alibi: {
          location: '교무실',
          time: '16:30',
          activity: '쉬는 시간 휴식',
          witnesses: ['다른 교사'],
          hasHole: false
        },
        relationships: [],
        secrets: [],
        dialogues: [
          {
            topic: '윤서아',
            lines: ['서아가 16시 20분쯤 화장실 간다고 나갔어요.', '30분이 지나도 안 돌아와서 이상했어요.']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-friend-seoah',
        name: '박지은',
        role: 'witness',
        age: 17,
        gender: 'female',
        occupation: '2학년 학생 / 서아 친구',
        personality: '친절하고 걱정 많음',
        appearance: '짧은 머리, 밝은 표정',
        background: '윤서아의 절친',
        alibi: {
          location: '영어 교실',
          time: '16:30',
          activity: '방과 후 수업',
          witnesses: ['다른 학생들'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-girlfriend', type: '친구', description: '서아의 고민을 들어줌' }
        ],
        secrets: [
          {
            id: 'secret-friend-1',
            content: '서아가 우진이와 헤어지려 한다는 것을 알고 있음',
            importance: 'major',
            revealCondition: '직접 질문 시'
          }
        ],
        dialogues: [
          {
            topic: '윤서아',
            lines: ['서아가... 우진 오빠랑 헤어지려고 했어요.', '오늘 방과 후 끝나고 말하려고 했대요.']
          },
          {
            topic: '정우진',
            lines: ['우진 오빠가... 너무 집착했어요.', '서아가 무서워했어요. 스토킹까지...']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-security-guard',
        name: '이철호',
        role: 'witness',
        age: 52,
        gender: 'male',
        occupation: '학교 경비',
        personality: '성실하고 책임감 있음',
        appearance: '경비 유니폼, 진지한 표정',
        background: '학교 경비 8년차',
        alibi: {
          location: '경비실',
          time: '16:30',
          activity: '근무',
          witnesses: [],
          hasHole: false
        },
        relationships: [],
        secrets: [],
        dialogues: [
          {
            topic: '옥상',
            lines: ['옥상 문은 항상 잠겨 있어야 해요.', '그런데 오늘 열려 있더라고요. 이상하죠?']
          }
        ],
        nervousTriggers: []
      }
    ],

    evidence: [
      {
        id: 'evidence-cctv-roof',
        name: '옥상 계단 CCTV',
        type: 'digital',
        description: '16:25 정우진과 윤서아가 옥상으로 올라감',
        detailedDescription: 'CCTV에 정우진이 윤서아의 팔을 잡고 옥상 계단으로 올라가는 장면 포착. 서아가 거부하는 모습도 보임.',
        location: '3층 복도',
        foundAt: 'CCTV 분석',
        linkedCharacters: ['char-boyfriend', 'char-girlfriend'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: true
      },
      {
        id: 'evidence-roof-door',
        name: '잠긴 옥상 문',
        type: 'physical',
        description: '옥상 문이 밖에서 잠겨 있음',
        detailedDescription: '옥상 문이 체인으로 잠겨 있고, 안에서 윤서아의 목소리가 들림.',
        location: '옥상',
        foundAt: '현장 조사',
        linkedCharacters: ['char-girlfriend'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-messages',
        name: '협박 문자',
        type: 'digital',
        description: '정우진이 윤서아에게 보낸 협박 문자들',
        detailedDescription: '"헤어지면 가만 안 둔다", "끝까지 따라다닐 거다", "네가 날 떠나면 넌 후회할 거야"',
        location: '윤서아 핸드폰',
        foundAt: '윤서아 구출 후',
        linkedCharacters: ['char-boyfriend', 'char-girlfriend'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-friend-testimony',
        name: '박지은 증언',
        type: 'testimony',
        description: '서아가 우진과 헤어지려 했다는 증언',
        detailedDescription: '"서아가 오늘 우진 오빠한테 헤어지자고 말하려고 했어요. 너무 무서워했어요."',
        location: '교실',
        foundAt: '박지은 인터뷰',
        linkedCharacters: ['char-girlfriend', 'char-friend-seoah'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      }
    ],

    locations: [
      {
        id: 'loc-english-room',
        name: '영어 교실',
        description: '3층 영어 전용 교실',
        atmosphere: '방과 후 수업 진행 중',
        objects: [
          {
            id: 'obj-desk',
            name: '윤서아 책상',
            description: '가방과 책이 그대로',
            examinationResult: '핸드폰도 남아 있음'
          }
        ],
        connectedTo: ['loc-hallway']
      },
      {
        id: 'loc-hallway',
        name: '3층 복도',
        description: '조용한 복도',
        atmosphere: '방과 후라 인적 드묾',
        objects: [
          {
            id: 'obj-stairs',
            name: '옥상 계단',
            description: '옥상으로 가는 계단',
            examinationResult: 'CCTV 설치되어 있음'
          }
        ],
        connectedTo: ['loc-english-room', 'loc-roof']
      },
      {
        id: 'loc-roof',
        name: '옥상',
        description: '학교 옥상',
        atmosphere: '바람이 부는 넓은 공간',
        objects: [
          {
            id: 'obj-door',
            name: '옥상 문',
            description: '체인으로 잠긴 문',
            examinationResult: '안에서 윤서아 발견',
            isLocked: true,
            unlockMethod: '체인 절단'
          }
        ],
        connectedTo: ['loc-hallway']
      }
    ],

    timeline: [
      { time: '16:00', event: '방과 후 수업 시작', participants: ['char-girlfriend', 'char-friend-seoah'], location: '영어 교실', importance: 'minor', isRevealed: true },
      { time: '16:20', event: '쉬는 시간, 윤서아 화장실 간다고 나감', participants: ['char-girlfriend'], location: '영어 교실', importance: 'major', isRevealed: true },
      { time: '16:23', event: '정우진, 복도에서 윤서아 기다림', participants: ['char-boyfriend'], location: '복도', importance: 'critical', isRevealed: false },
      { time: '16:25', event: '정우진, 윤서아를 옥상으로 끌고 감', participants: ['char-boyfriend', 'char-girlfriend'], location: '옥상 계단', importance: 'critical', isRevealed: false },
      { time: '16:30', event: '옥상 문 잠금', participants: ['char-boyfriend'], location: '옥상', importance: 'critical', isRevealed: false },
      { time: '16:50', event: '실종 확인', participants: ['char-teacher-english'], location: '영어 교실', importance: 'major', isRevealed: true }
    ],

    solution: {
      summary: '정우진이 이별 통보를 거부하며 윤서아를 옥상에 가뒀다.',
      detailedExplanation: [
        '윤서아는 정우진의 집착과 스토킹에 지쳐 헤어지기로 결심했다.',
        '정우진은 이를 알고 쉬는 시간을 노려 복도에서 기다렸다.',
        '윤서아가 화장실을 가자 강제로 옥상으로 끌고 갔다.',
        '옥상에서 "생각을 바꿀 때까지 나가지 마"라고 협박했다.',
        '문을 체인으로 잠그고 내려왔다.',
        'CCTV에 모든 과정이 포착되었다.'
      ],
      keyEvidence: ['evidence-cctv-roof', 'evidence-roof-door', 'evidence-messages', 'evidence-friend-testimony'],
      howToSolve: [
        '윤서아의 마지막 행적 추적',
        'CCTV로 정우진과 함께 옥상에 간 것 확인',
        '박지은의 증언으로 이별 배경 파악',
        '옥상에서 윤서아 구출',
        '협박 문자로 동기 확인'
      ],
      commonMistakes: [
        '윤서아가 스스로 옥상에 갔다고 생각하는 것',
        '자살 시도로 오해하는 것'
      ]
    },

    deductionKeywords: {
      who: ['정우진', '남자친구', '전 연인'],
      why: ['이별', '집착', '스토킹', '거부'],
      how: ['감금', '옥상', '체인'],
      when: ['16:30', '쉬는 시간'],
      where: ['옥상', '방과 후 교실']
    },

    tags: ['방과 후', '연애', '스토킹', '감금', '옥상'],
    author: 'DEDUCTIO',
    version: '1.0'
  },

  // ========================================
  // 시나리오 #8: 도서관의 침묵
  // ========================================
  {
    id: 'disappearance-008',
    title: '도서관의 침묵',
    subtitle: '도서관에서 사라진 사서',
    type: 'disappearance',
    difficulty: 'hard',
    estimatedTime: 30,
    prologue: ['학교 도서관, 오후 6시 폐관 시간.', '사서 선생님이 마감 준비 중 사라졌다.', '도서관 문은 안에서 잠겨 있었다.'],
    introduction: ['야간 경비가 긴급 신고했습니다.', '"도서관 불이 켜져 있는데 사서 선생님이 안 보여요!"', '밀실에서 사라진 사서를 찾아야 합니다.'],
    setting: '학교 도서관',
    crimeTime: '18:00',
    crimeLocation: '도서관 서고',
    culpritId: 'char-thief',
    victimId: 'char-librarian-008',
    motive: '은폐 - 도서 절도 발각',
    motiveDetail: '학생이 희귀 도서들을 훔쳐 팔아왔는데, 사서가 이를 발견하고 경찰에 신고하려 했다.',
    method: '서고에 유인 후 문 잠금',
    methodDetail: '학생이 "책을 찾아달라"며 사서를 서고로 유인한 뒤, 밖에서 문을 잠그고 도망갔다.',
    characters: [
      {
        id: 'char-librarian-008',
        name: '장미희',
        role: 'victim',
        age: 38,
        gender: 'female',
        occupation: '사서',
        personality: '꼼꼼하고 책임감 강함',
        appearance: '안경, 단정한 옷차림',
        background: '도서관 관리 15년',
        alibi: { location: '불명', time: '18:00', activity: '실종', witnesses: [], hasHole: false },
        relationships: [{ targetId: 'char-thief', type: '의심 관계', description: '도서 절도 의심', isSecret: false }],
        secrets: [],
        dialogues: [],
        nervousTriggers: []
      },
      {
        id: 'char-thief',
        name: '한재혁',
        role: 'culprit',
        age: 18,
        gender: 'male',
        occupation: '3학년 / 도서부',
        personality: '겉으로는 모범생',
        appearance: '단정한 외모',
        background: '도서부 부장, 비밀리에 희귀 도서 절도',
        alibi: { location: '집', time: '18:00', activity: '집에 있었다고 주장', witnesses: [], hasHole: true, holeDetail: '학교 근처 CCTV에 포착' },
        motive: { type: 'fear', description: '도서 절도 은폐', strength: 3 },
        relationships: [{ targetId: 'char-librarian-008', type: '의심받는 관계', description: '사서의 의심을 받음' }],
        secrets: [
          { id: 'secret-thief-1', content: '3개월간 희귀 도서 20권을 훔쳐 고서점에 팔았다', importance: 'critical', revealCondition: '고서점 조사 후' },
          { id: 'secret-thief-2', content: '사서를 서고에 가뒀다', importance: 'critical', revealCondition: '증거 제시 및 압박' }
        ],
        dialogues: [
          { topic: '장미희', lines: ['사서 선생님이요? 6시에 마감하시고 퇴근하셨을걸요?'] },
          { topic: '알리바이', lines: ['집에서 공부하고 있었어요.'], requiresEvidence: ['evidence-cctv'] }
        ],
        nervousTriggers: ['도서 절도', '희귀본', '고서점']
      }
    ],
    evidence: [
      { id: 'evidence-cctv', name: '도서관 CCTV', type: 'digital', description: '17:55 한재혁이 사서를 서고로 유인', detailedDescription: 'CCTV에 한재혁이 장미희를 서고로 안내 후 문을 잠그는 장면', location: '도서관', foundAt: 'CCTV', linkedCharacters: ['char-thief'], isCritical: true, isRedHerring: false, discoveryDifficulty: 1, analysisRequired: true },
      { id: 'evidence-storage', name: '잠긴 서고', type: 'physical', description: '서고 문이 밖에서 잠겨 있고 안에서 장미희 발견', detailedDescription: '서고에 장미희가 갇혀 있음', location: '도서관', foundAt: '현장', linkedCharacters: ['char-librarian-008'], isCritical: true, isRedHerring: false, discoveryDifficulty: 2, analysisRequired: false }
    ],
    locations: [
      { id: 'loc-library', name: '도서관', description: '학교 도서관', atmosphere: '조용함', objects: [{ id: 'obj-desk', name: '사서 책상', description: '정돈된 책상', examinationResult: '도서 분실 조사 보고서' }], connectedTo: ['loc-storage'] },
      { id: 'loc-storage', name: '서고', description: '희귀본 서고', atmosphere: '어둡고 먼지', objects: [{ id: 'obj-door', name: '서고 문', description: '잠긴 문', examinationResult: '안에서 장미희 발견', isLocked: true, unlockMethod: '열쇠' }], connectedTo: ['loc-library'] }
    ],
    timeline: [
      { time: '17:50', event: '한재혁 재입장', participants: ['char-thief'], location: '도서관', importance: 'critical', isRevealed: false },
      { time: '18:00', event: '서고 문 잠금', participants: ['char-thief'], location: '서고', importance: 'critical', isRevealed: false },
      { time: '19:00', event: '실종 발견', participants: [], location: '도서관', importance: 'major', isRevealed: true }
    ],
    solution: {
      summary: '한재혁이 희귀 도서 절도 발각을 막기 위해 사서를 서고에 가뒀다.',
      detailedExplanation: ['한재혁은 3개월간 희귀본 20권을 훔쳐 고서점에 팔았다.', '사서가 조사하며 한재혁을 의심했다.', '폐관 직전 서고로 유인 후 문을 잠갔다.'],
      keyEvidence: ['evidence-cctv', 'evidence-storage'],
      howToSolve: ['CCTV 확인', '서고 수색', '고서점 조사'],
      commonMistakes: ['사서가 스스로 사라졌다고 생각']
    },
    deductionKeywords: { who: ['한재혁', '도서부'], why: ['도서 절도', '은폐'], how: ['감금', '서고'], when: ['18:00'], where: ['도서관'] },
    tags: ['도서관', '절도', '희귀본'],
    author: 'DEDUCTIO',
    version: '1.0'
  },

  // ========================================
  // 시나리오 #9: 급식실의 미스터리
  // ========================================
  {
    id: 'disappearance-009',
    title: '급식실의 미스터리',
    subtitle: '급식 시간에 사라진 영양사',
    type: 'disappearance',
    difficulty: 'easy',
    estimatedTime: 20,
    prologue: ['점심시간, 1200명의 학생이 급식을 기다린다.', '영양사가 냉동고에 들어간 뒤 나오지 않았다.'],
    introduction: ['급식실 조리사에게서 다급한 연락이 왔습니다.', '"영양사님이 냉동고에서 안 나오세요!"'],
    setting: '학교 급식실',
    crimeTime: '12:15',
    crimeLocation: '급식실 냉동고',
    culpritId: 'char-supplier',
    victimId: 'char-nutritionist',
    motive: '입막음 - 식자재 비리 발각',
    motiveDetail: '영양사가 식자재 업체의 부정 납품을 발견하고 신고하려 했다.',
    method: '냉동고에 유인 후 문 잠금',
    methodDetail: '식자재 업체 직원이 "냉동 식품 확인 부탁드린다"며 냉동고로 유인 후 문을 잠갔다.',
    characters: [
      {
        id: 'char-nutritionist',
        name: '김영희',
        role: 'victim',
        age: 45,
        gender: 'female',
        occupation: '영양사',
        personality: '정직하고 원칙적',
        appearance: '흰색 위생복',
        background: '학교 영양사 10년',
        alibi: { location: '불명', time: '12:15', activity: '실종', witnesses: [], hasHole: false },
        relationships: [{ targetId: 'char-supplier', type: '의심 관계', description: '식자재 비리 의심', isSecret: false }],
        secrets: [],
        dialogues: [],
        nervousTriggers: []
      },
      {
        id: 'char-supplier',
        name: '박철민',
        role: 'culprit',
        age: 38,
        gender: 'male',
        occupation: '식자재 업체',
        personality: '교활함',
        appearance: '작업복',
        background: '부정 식자재 납품',
        alibi: { location: '급식실', time: '12:15', activity: '납품', witnesses: ['조리사'], hasHole: true, holeDetail: '12:10~12:20 목격자 없음' },
        motive: { type: 'fear', description: '식자재 비리 은폐', strength: 3 },
        relationships: [{ targetId: 'char-nutritionist', type: '적대 관계', description: '영양사의 조사 두려워함' }],
        secrets: [
          { id: 'secret-supplier-1', content: '3개월간 저품질 식자재를 고품질로 속여 납품', importance: 'critical', revealCondition: '납품 기록 조사' },
          { id: 'secret-supplier-2', content: '김영희를 냉동고에 가뒀다', importance: 'critical', revealCondition: 'CCTV' }
        ],
        dialogues: [
          { topic: '김영희', lines: ['영양사님이요? 냉동고 쪽으로 가시던데...'] },
          { topic: '알리바이', lines: ['식자재 내리고 바로 나갔어요.'], requiresEvidence: ['evidence-cctv-freezer'] }
        ],
        nervousTriggers: ['비리', '부정', '납품']
      }
    ],
    evidence: [
      { id: 'evidence-cctv-freezer', name: '급식실 CCTV', type: 'digital', description: '12:12 박철민이 김영희를 냉동고로 유인', detailedDescription: 'CCTV에 박철민이 냉동고 유인 후 문 잠금', location: '급식실', foundAt: 'CCTV', linkedCharacters: ['char-supplier'], isCritical: true, isRedHerring: false, discoveryDifficulty: 1, analysisRequired: true },
      { id: 'evidence-freezer', name: '잠긴 냉동고', type: 'physical', description: '냉동고에서 김영희 발견', detailedDescription: '김영희가 추위에 떨고 있음', location: '급식실', foundAt: '현장', linkedCharacters: ['char-nutritionist'], isCritical: true, isRedHerring: false, discoveryDifficulty: 1, analysisRequired: false }
    ],
    locations: [
      { id: 'loc-kitchen', name: '조리실', description: '급식 조리 공간', atmosphere: '뜨겁고 바쁨', objects: [], connectedTo: ['loc-freezer'] },
      { id: 'loc-freezer', name: '냉동고', description: '대형 냉동실', atmosphere: '영하 20도', objects: [{ id: 'obj-door', name: '냉동고 문', description: '잠긴 문', examinationResult: '안에서 김영희 발견', isLocked: true, unlockMethod: '긴급 개방' }], connectedTo: ['loc-kitchen'] }
    ],
    timeline: [
      { time: '12:05', event: '박철민 납품', participants: ['char-supplier'], location: '급식실', importance: 'major', isRevealed: true },
      { time: '12:13', event: '냉동고 문 잠금', participants: ['char-supplier'], location: '냉동고', importance: 'critical', isRevealed: false },
      { time: '12:20', event: '실종 확인', participants: [], location: '조리실', importance: 'major', isRevealed: true }
    ],
    solution: {
      summary: '박철민이 식자재 비리 발각을 막기 위해 영양사를 냉동고에 가뒀다.',
      detailedExplanation: ['박철민은 저품질 식자재를 속여 납품했다.', '김영희가 비리를 발견하고 신고하려 했다.', '냉동고로 유인 후 문을 잠갔다.'],
      keyEvidence: ['evidence-cctv-freezer', 'evidence-freezer'],
      howToSolve: ['CCTV 확인', '냉동고 수색', '납품 기록 조사'],
      commonMistakes: ['단순 사고로 생각']
    },
    deductionKeywords: { who: ['박철민', '업체'], why: ['비리', '식자재'], how: ['냉동고'], when: ['12:15'], where: ['급식실'] },
    tags: ['급식실', '비리', '냉동고'],
    author: 'DEDUCTIO',
    version: '1.0'
  },

  // ========================================
  // 시나리오 #10: 조회의 공백
  // ========================================
  {
    id: 'disappearance-010',
    title: '조회의 공백',
    subtitle: '조회 시간, 운동장에서 사라진 학생',
    type: 'disappearance',
    difficulty: 'medium',
    estimatedTime: 25,
    prologue: ['월요일 아침 조회, 전교생이 운동장에 모였다.', '조회 중 한 학생이 사라졌다.', '1000명의 학생 속에서 어떻게 사라질 수 있었을까?'],
    introduction: ['담임 교사가 긴급 연락했습니다.', '"조회 시작할 때는 있었는데 끝나고 보니 없어요!"'],
    setting: '학교 운동장',
    crimeTime: '08:30',
    crimeLocation: '운동장',
    culpritId: 'char-gang',
    victimId: 'char-witness',
    motive: '입막음 - 범죄 목격',
    motiveDetail: '학생이 주말에 학교 근처 편의점 강도 사건을 목격했고, 범인이 같은 학교 선배였다. 범인은 이를 막기 위해 학생을 납치했다.',
    method: '조회 중 후문으로 끌고 나감',
    methodDetail: '범인과 공범들이 조회 중 혼란을 틈타 학생을 둘러싸고 후문으로 끌고 나갔다.',
    characters: [
      {
        id: 'char-witness',
        name: '이준서',
        role: 'victim',
        age: 16,
        gender: 'male',
        occupation: '1학년',
        personality: '정의롭고 용감',
        appearance: '작은 키',
        background: '편의점 강도 목격',
        alibi: { location: '불명', time: '08:30', activity: '실종', witnesses: [], hasHole: false },
        relationships: [{ targetId: 'char-gang', type: '목격자-범인', description: '강도 사건 목격', isSecret: true }],
        secrets: [],
        dialogues: [],
        nervousTriggers: []
      },
      {
        id: 'char-gang',
        name: '강태욱',
        role: 'culprit',
        age: 19,
        gender: 'male',
        occupation: '3학년 / 일진',
        personality: '폭력적이고 위협적',
        appearance: '건장한 체격',
        background: '주말에 편의점 강도',
        alibi: { location: '운동장', time: '08:30', activity: '조회 참석', witnesses: ['다른 학생들'], hasHole: true, holeDetail: '조회 중간에 자리 비움' },
        motive: { type: 'fear', description: '범죄 목격 은폐', strength: 3 },
        relationships: [{ targetId: 'char-witness', type: '범인-목격자', description: '강도 사건 목격당함' }],
        secrets: [
          { id: 'secret-gang-1', content: '주말에 편의점 강도 사건 저질렀다', importance: 'critical', revealCondition: '경찰 조사' },
          { id: 'secret-gang-2', content: '이준서를 납치했다', importance: 'critical', revealCondition: '목격자 증언' }
        ],
        dialogues: [
          { topic: '이준서', lines: ['1학년? 모르는데.'] },
          { topic: '알리바이', lines: ['조회 내내 있었어요.'], requiresEvidence: ['evidence-cctv-gate'] }
        ],
        nervousTriggers: ['편의점', '강도', '경찰']
      }
    ],
    evidence: [
      { id: 'evidence-cctv-gate', name: '후문 CCTV', type: 'digital', description: '08:35 강태욱 일당이 이준서를 끌고 나감', detailedDescription: 'CCTV에 강태욱과 공범들이 이준서를 강제로 끌고 나가는 장면', location: '후문', foundAt: 'CCTV', linkedCharacters: ['char-gang'], isCritical: true, isRedHerring: false, discoveryDifficulty: 2, analysisRequired: true },
      { id: 'evidence-convenience', name: '편의점 강도 CCTV', type: 'digital', description: '주말 강도 사건 CCTV', detailedDescription: '강태욱이 편의점을 털고 이준서와 마주치는 장면', location: '편의점', foundAt: '경찰', linkedCharacters: ['char-gang', 'char-witness'], isCritical: true, isRedHerring: false, discoveryDifficulty: 3, analysisRequired: true }
    ],
    locations: [
      { id: 'loc-field', name: '운동장', description: '조회 장소', atmosphere: '1000명 학생', objects: [], connectedTo: ['loc-backgate'] },
      { id: 'loc-backgate', name: '후문', description: '학교 후문', atmosphere: '조용함', objects: [{ id: 'obj-cctv', name: 'CCTV', description: 'CCTV 카메라', examinationResult: '납치 장면 포착' }], connectedTo: ['loc-field'] }
    ],
    timeline: [
      { time: '08:00', event: '조회 시작', participants: ['char-witness', 'char-gang'], location: '운동장', importance: 'minor', isRevealed: true },
      { time: '08:35', event: '이준서 납치', participants: ['char-gang', 'char-witness'], location: '후문', importance: 'critical', isRevealed: false },
      { time: '09:00', event: '실종 확인', participants: [], location: '교실', importance: 'major', isRevealed: true }
    ],
    solution: {
      summary: '강태욱이 편의점 강도 목격을 은폐하기 위해 이준서를 납치했다.',
      detailedExplanation: ['강태욱은 주말에 편의점 강도를 저질렀다.', '이준서가 이를 목격했다.', '조회 중 혼란을 틈타 이준서를 납치했다.'],
      keyEvidence: ['evidence-cctv-gate', 'evidence-convenience'],
      howToSolve: ['후문 CCTV 확인', '편의점 사건 연결', '강태욱 추적'],
      commonMistakes: ['학생이 스스로 도망쳤다고 생각']
    },
    deductionKeywords: { who: ['강태욱', '일진'], why: ['강도', '목격', '입막음'], how: ['납치', '후문'], when: ['08:30', '조회'], where: ['운동장', '후문'] },
    tags: ['조회', '강도', '목격', '납치'],
    author: 'DEDUCTIO',
    version: '1.0'
  },

  // ========================================
  // 시나리오 #11: 청소 시간의 비밀
  // ========================================
  {
    id: 'disappearance-011',
    title: '청소 시간의 비밀',
    subtitle: '청소 시간, 화장실에서 사라진 학생',
    type: 'disappearance',
    difficulty: 'easy',
    estimatedTime: 20,
    prologue: ['방과 후 청소 시간.', '화장실 청소 당번이 사라졌다.', '10분 전까지 있었는데 흔적도 없이 사라졌다.'],
    introduction: ['학급 반장이 연락했습니다.', '"청소 당번이 화장실에서 안 나와요!"'],
    setting: '학교 4층 화장실',
    crimeTime: '16:40',
    crimeLocation: '4층 화장실',
    culpritId: 'char-bully-011',
    victimId: 'char-student-011',
    motive: '보복 - 고발에 대한 앙갚음',
    motiveDetail: '학생이 일진의 폭행을 담임에게 고발했고, 일진이 보복으로 학생을 옥상에 가뒀다.',
    method: '화장실에서 기습하여 옥상으로 끌고 감',
    methodDetail: '일진이 화장실에서 기다리다가 학생을 기습하여 옥상으로 끌고 가 가뒀다.',
    characters: [
      {
        id: 'char-student-011',
        name: '박민호',
        role: 'victim',
        age: 16,
        gender: 'male',
        occupation: '1학년',
        personality: '정의롭지만 겁 많음',
        appearance: '작은 키',
        background: '일진 고발',
        alibi: { location: '불명', time: '16:40', activity: '실종', witnesses: [], hasHole: false },
        relationships: [{ targetId: 'char-bully-011', type: '고발자-가해자', description: '폭행 고발', isSecret: false }],
        secrets: [],
        dialogues: [],
        nervousTriggers: []
      },
      {
        id: 'char-bully-011',
        name: '최준영',
        role: 'culprit',
        age: 17,
        gender: 'male',
        occupation: '2학년 / 일진',
        personality: '폭력적',
        appearance: '건장한 체격',
        background: '폭행으로 징계받음',
        alibi: { location: '교실', time: '16:40', activity: '청소', witnesses: [], hasHole: true, holeDetail: '목격자 없음' },
        motive: { type: 'revenge', description: '고발에 대한 보복', strength: 3 },
        relationships: [{ targetId: 'char-student-011', type: '가해자-고발자', description: '고발당해 징계받음' }],
        secrets: [
          { id: 'secret-bully-1', content: '박민호를 옥상에 가뒀다', importance: 'critical', revealCondition: 'CCTV' }
        ],
        dialogues: [
          { topic: '박민호', lines: ['그 새끼? 모르는데.'] },
          { topic: '알리바이', lines: ['교실에서 청소했어요.'], requiresEvidence: ['evidence-cctv-stairs'] }
        ],
        nervousTriggers: ['고발', '징계', '옥상']
      }
    ],
    evidence: [
      { id: 'evidence-cctv-stairs', name: '계단 CCTV', type: 'digital', description: '16:42 최준영이 박민호를 끌고 옥상으로', detailedDescription: 'CCTV에 최준영이 박민호를 강제로 끌고 옥상으로 가는 장면', location: '계단', foundAt: 'CCTV', linkedCharacters: ['char-bully-011'], isCritical: true, isRedHerring: false, discoveryDifficulty: 1, analysisRequired: true },
      { id: 'evidence-roof-door', name: '잠긴 옥상', type: 'physical', description: '옥상에서 박민호 발견', detailedDescription: '옥상 문이 잠겨 있고 안에서 박민호 발견', location: '옥상', foundAt: '현장', linkedCharacters: ['char-student-011'], isCritical: true, isRedHerring: false, discoveryDifficulty: 2, analysisRequired: false }
    ],
    locations: [
      { id: 'loc-restroom', name: '4층 화장실', description: '남자 화장실', atmosphere: '조용함', objects: [], connectedTo: ['loc-stairs'] },
      { id: 'loc-stairs', name: '계단', description: '옥상으로 가는 계단', atmosphere: '어두움', objects: [{ id: 'obj-cctv', name: 'CCTV', description: 'CCTV 카메라', examinationResult: '납치 장면' }], connectedTo: ['loc-restroom', 'loc-roof'] },
      { id: 'loc-roof', name: '옥상', description: '학교 옥상', atmosphere: '바람', objects: [{ id: 'obj-door', name: '옥상 문', description: '잠긴 문', examinationResult: '안에서 박민호', isLocked: true, unlockMethod: '개방' }], connectedTo: ['loc-stairs'] }
    ],
    timeline: [
      { time: '16:30', event: '청소 시작', participants: ['char-student-011'], location: '화장실', importance: 'minor', isRevealed: true },
      { time: '16:42', event: '옥상 납치', participants: ['char-bully-011', 'char-student-011'], location: '옥상', importance: 'critical', isRevealed: false },
      { time: '17:00', event: '실종 확인', participants: [], location: '교실', importance: 'major', isRevealed: true }
    ],
    solution: {
      summary: '최준영이 고발에 대한 보복으로 박민호를 옥상에 가뒀다.',
      detailedExplanation: ['박민호가 최준영의 폭행을 고발했다.', '최준영은 보복을 계획했다.', '청소 시간에 기습하여 옥상에 가뒀다.'],
      keyEvidence: ['evidence-cctv-stairs', 'evidence-roof-door'],
      howToSolve: ['CCTV 확인', '옥상 수색'],
      commonMistakes: ['학생이 스스로 숨었다고 생각']
    },
    deductionKeywords: { who: ['최준영', '일진'], why: ['보복', '고발'], how: ['납치', '옥상'], when: ['16:40', '청소'], where: ['화장실', '옥상'] },
    tags: ['청소', '폭행', '보복', '옥상'],
    author: 'DEDUCTIO',
    version: '1.0'
  },

  // ========================================
  // 시나리오 #12: 동창회의 그림자
  // ========================================
  {
    id: 'disappearance-012',
    title: '동창회의 그림자',
    subtitle: '10년 만의 동창회, 사라진 동창',
    type: 'disappearance',
    difficulty: 'hard',
    estimatedTime: 30,
    prologue: ['청운고 10주년 동창회.', '회식 중 한 동창이 사라졌다.', '핸드폰도 가방도 그대로인 채.'],
    introduction: ['동창회 간사가 연락했습니다.', '"민수가 화장실 간다고 나가더니 30분째 안 와요!"'],
    setting: '학교 근처 식당',
    crimeTime: '20:30',
    crimeLocation: '식당 뒷골목',
    culpritId: 'char-debtor-012',
    victimId: 'char-creditor-012',
    motive: '도주 - 빚 독촉 회피',
    motiveDetail: '동창이 사업 자금 5천만원을 빌려줬는데 갚지 못해 도주했다.',
    method: '화장실 간다고 나가서 도주',
    methodDetail: '채무자가 화장실 간다고 나가서 후문으로 도주했다.',
    characters: [
      {
        id: 'char-creditor-012',
        name: '김민수',
        role: 'victim',
        age: 28,
        gender: 'male',
        occupation: '회사원',
        personality: '집요하고 돈에 집착',
        appearance: '정장',
        background: '동창에게 5천만원 빌려줌',
        alibi: { location: '불명', time: '20:30', activity: '실종', witnesses: [], hasHole: false },
        relationships: [{ targetId: 'char-debtor-012', type: '채권자-채무자', description: '돈 빌려줌', isSecret: false }],
        secrets: [],
        dialogues: [],
        nervousTriggers: []
      },
      {
        id: 'char-debtor-012',
        name: '박재현',
        role: 'culprit',
        age: 28,
        gender: 'male',
        occupation: '무직',
        personality: '회피적',
        appearance: '평범한 옷차림',
        background: '사업 실패로 빚',
        alibi: { location: '불명', time: '20:30', activity: '화장실 갔다고 주장', witnesses: [], hasHole: true, holeDetail: '후문 CCTV에 도주 장면' },
        motive: { type: 'fear', description: '빚 독촉 회피', strength: 3 },
        relationships: [{ targetId: 'char-creditor-012', type: '채무자-채권자', description: '5천만원 빚' }],
        secrets: [
          { id: 'secret-debtor-1', content: '동창회를 이용해 도주 계획', importance: 'critical', revealCondition: 'CCTV' }
        ],
        dialogues: [],
        nervousTriggers: []
      }
    ],
    evidence: [
      { id: 'evidence-cctv-back', name: '후문 CCTV', type: 'digital', description: '20:32 박재현이 택시 타고 도주', detailedDescription: 'CCTV에 박재현이 후문으로 나가 택시를 타는 장면', location: '후문', foundAt: 'CCTV', linkedCharacters: ['char-debtor-012'], isCritical: true, isRedHerring: false, discoveryDifficulty: 2, analysisRequired: true },
      { id: 'evidence-debt', name: '차용증', type: 'document', description: '5천만원 차용증', detailedDescription: '박재현이 김민수에게 쓴 차용증', location: '김민수 가방', foundAt: '가방', linkedCharacters: ['char-creditor-012', 'char-debtor-012'], isCritical: true, isRedHerring: false, discoveryDifficulty: 1, analysisRequired: false }
    ],
    locations: [
      { id: 'loc-restaurant', name: '식당', description: '동창회 장소', atmosphere: '시끄럽고 즐거움', objects: [], connectedTo: ['loc-alley'] },
      { id: 'loc-alley', name: '뒷골목', description: '식당 뒤', atmosphere: '어둡고 조용함', objects: [{ id: 'obj-cctv', name: 'CCTV', description: 'CCTV 카메라', examinationResult: '도주 장면' }], connectedTo: ['loc-restaurant'] }
    ],
    timeline: [
      { time: '19:00', event: '동창회 시작', participants: ['char-creditor-012', 'char-debtor-012'], location: '식당', importance: 'minor', isRevealed: true },
      { time: '20:30', event: '박재현 화장실 간다고 나감', participants: ['char-debtor-012'], location: '식당', importance: 'major', isRevealed: true },
      { time: '20:32', event: '박재현 도주', participants: ['char-debtor-012'], location: '뒷골목', importance: 'critical', isRevealed: false },
      { time: '21:00', event: '실종 확인', participants: [], location: '식당', importance: 'major', isRevealed: true }
    ],
    solution: {
      summary: '박재현이 빚 독촉을 피해 동창회를 이용해 도주했다.',
      detailedExplanation: ['박재현은 김민수에게 5천만원을 빚졌다.', '갚을 수 없어 도주를 계획했다.', '동창회 중 화장실 간다고 나가서 택시로 도주했다.'],
      keyEvidence: ['evidence-cctv-back', 'evidence-debt'],
      howToSolve: ['CCTV 확인', '차용증 발견', '박재현 추적'],
      commonMistakes: ['납치로 생각']
    },
    deductionKeywords: { who: ['박재현', '채무자'], why: ['빚', '도주'], how: ['도주', '택시'], when: ['20:30', '동창회'], where: ['식당', '뒷골목'] },
    tags: ['동창회', '빚', '도주'],
    author: 'DEDUCTIO',
    version: '1.0'
  },

  // ========================================
  // 시나리오 #13: 학부모 상담의 함정
  // ========================================
  {
    id: 'disappearance-013',
    title: '학부모 상담의 함정',
    subtitle: '학부모 상담일, 사라진 어머니',
    type: 'disappearance',
    difficulty: 'medium',
    estimatedTime: 25,
    prologue: ['학부모 상담 주간.', '한 어머니가 상담 후 사라졌다.', '자녀는 엄마를 기다리고 있다.'],
    introduction: ['학생이 울면서 연락했습니다.', '"엄마가 상담 끝나고 안 나와요!"'],
    setting: '학교 상담실',
    crimeTime: '18:00',
    crimeLocation: '상담실',
    culpritId: 'char-kidnapper-013',
    victimId: 'char-mother',
    motive: '납치 - 랜섬웨어',
    motiveDetail: '어머니가 부유한 사업가로, 납치범이 몸값을 요구하기 위해 납치했다.',
    method: '상담실에서 기습하여 차량으로 이동',
    methodDetail: '가짜 교사로 위장한 납치범이 상담실에서 어머니를 기습하여 차량으로 이동했다.',
    characters: [
      {
        id: 'char-mother',
        name: '최은희',
        role: 'victim',
        age: 42,
        gender: 'female',
        occupation: '사업가',
        personality: '강인하고 독립적',
        appearance: '고급 옷차림',
        background: 'IT 회사 대표',
        alibi: { location: '불명', time: '18:00', activity: '실종', witnesses: [], hasHole: false },
        relationships: [{ targetId: 'char-kidnapper-013', type: '피해자-납치범', description: '납치당함', isSecret: false }],
        secrets: [],
        dialogues: [],
        nervousTriggers: []
      },
      {
        id: 'char-kidnapper-013',
        name: '조성훈',
        role: 'culprit',
        age: 35,
        gender: 'male',
        occupation: '납치범',
        personality: '교활하고 위험',
        appearance: '정장 (교사 위장)',
        background: '전과자, 계획적 범죄',
        alibi: { location: '불명', time: '18:00', activity: '도주', witnesses: [], hasHole: false },
        motive: { type: 'greed', description: '몸값 요구', strength: 3 },
        relationships: [{ targetId: 'char-mother', type: '납치범-피해자', description: '납치함' }],
        secrets: [
          { id: 'secret-kidnapper-1', content: '교사로 위장하여 침입', importance: 'critical', revealCondition: 'CCTV' }
        ],
        dialogues: [],
        nervousTriggers: []
      }
    ],
    evidence: [
      { id: 'evidence-cctv-parking', name: '주차장 CCTV', type: 'digital', description: '18:05 조성훈이 최은희를 차에 태움', detailedDescription: 'CCTV에 조성훈이 최은희를 강제로 차에 태우는 장면', location: '주차장', foundAt: 'CCTV', linkedCharacters: ['char-kidnapper-013'], isCritical: true, isRedHerring: false, discoveryDifficulty: 1, analysisRequired: true },
      { id: 'evidence-ransom', name: '몸값 요구 문자', type: 'digital', description: '3억 원 요구 문자', detailedDescription: '납치범이 가족에게 보낸 몸값 요구 문자', location: '가족 핸드폰', foundAt: '가족', linkedCharacters: ['char-kidnapper-013'], isCritical: true, isRedHerring: false, discoveryDifficulty: 2, analysisRequired: false }
    ],
    locations: [
      { id: 'loc-counsel', name: '상담실', description: '학부모 상담실', atmosphere: '조용함', objects: [], connectedTo: ['loc-parking'] },
      { id: 'loc-parking', name: '주차장', description: '학교 주차장', atmosphere: '어두워짐', objects: [{ id: 'obj-cctv', name: 'CCTV', description: 'CCTV 카메라', examinationResult: '납치 장면' }], connectedTo: ['loc-counsel'] }
    ],
    timeline: [
      { time: '17:30', event: '상담 시작', participants: ['char-mother'], location: '상담실', importance: 'minor', isRevealed: true },
      { time: '18:00', event: '상담 종료', participants: ['char-mother'], location: '상담실', importance: 'major', isRevealed: true },
      { time: '18:05', event: '납치', participants: ['char-kidnapper-013', 'char-mother'], location: '주차장', importance: 'critical', isRevealed: false },
      { time: '18:30', event: '실종 확인', participants: [], location: '학교', importance: 'major', isRevealed: true }
    ],
    solution: {
      summary: '조성훈이 교사로 위장하여 최은희를 납치했다.',
      detailedExplanation: ['조성훈은 최은희가 부유한 사업가임을 알았다.', '교사로 위장하여 학교에 침입했다.', '상담 후 주차장에서 기습하여 납치했다.', '몸값 3억 원을 요구했다.'],
      keyEvidence: ['evidence-cctv-parking', 'evidence-ransom'],
      howToSolve: ['CCTV 확인', '몸값 문자 추적', '조성훈 체포'],
      commonMistakes: ['단순 실종으로 생각']
    },
    deductionKeywords: { who: ['조성훈', '납치범'], why: ['납치', '몸값'], how: ['기습', '차량'], when: ['18:00', '상담'], where: ['상담실', '주차장'] },
    tags: ['학부모', '납치', '몸값'],
    author: 'DEDUCTIO',
    version: '1.0'
  },

  // ========================================
  // 시나리오 #14: 졸업식의 마지막 선물
  // ========================================
  {
    id: 'disappearance-014',
    title: '졸업식의 마지막 선물',
    subtitle: '졸업식 날, 사라진 졸업생',
    type: 'disappearance',
    difficulty: 'easy',
    estimatedTime: 20,
    prologue: ['3학년 졸업식.', '졸업장 받은 학생이 사라졌다.', '가족도 친구도 찾을 수 없다.'],
    introduction: ['학부모가 다급히 연락했습니다.', '"우리 아이가 졸업장 받고 사라졌어요!"'],
    setting: '학교 강당',
    crimeTime: '11:00',
    crimeLocation: '강당',
    culpritId: 'char-runaway',
    victimId: 'char-graduate',
    motive: '가출 - 대학 진학 압박',
    motiveDetail: '학생이 부모의 과도한 대학 진학 압박에 지쳐 가출했다.',
    method: '졸업식 후 혼자 집을 나감',
    methodDetail: '졸업식이 끝나자마자 짐을 싸서 집을 나갔다.',
    characters: [
      {
        id: 'char-graduate',
        name: '이수진',
        role: 'victim',
        age: 18,
        gender: 'female',
        occupation: '졸업생',
        personality: '억압받고 지침',
        appearance: '교복',
        background: '부모의 대학 진학 압박',
        alibi: { location: '불명', time: '11:00', activity: '가출', witnesses: [], hasHole: false },
        relationships: [],
        secrets: [],
        dialogues: [],
        nervousTriggers: []
      },
      {
        id: 'char-runaway',
        name: '이수진',
        role: 'culprit',
        age: 18,
        gender: 'female',
        occupation: '졸업생',
        personality: '억압받고 지침',
        appearance: '교복',
        background: '부모의 대학 진학 압박',
        alibi: { location: '불명', time: '11:00', activity: '가출', witnesses: [], hasHole: false },
        motive: { type: 'fear', description: '부모 압박 탈출', strength: 3 },
        relationships: [],
        secrets: [
          { id: 'secret-runaway-1', content: '가출 계획을 세웠다', importance: 'critical', revealCondition: '친구 증언' }
        ],
        dialogues: [],
        nervousTriggers: []
      }
    ],
    evidence: [
      { id: 'evidence-note', name: '가출 편지', type: 'document', description: '수진이가 남긴 편지', detailedDescription: '"더 이상 견딜 수 없어요. 제가 원하는 삶을 살고 싶어요."', location: '집', foundAt: '방', linkedCharacters: ['char-graduate'], isCritical: true, isRedHerring: false, discoveryDifficulty: 2, analysisRequired: false },
      { id: 'evidence-friend', name: '친구 증언', type: 'testimony', description: '수진이가 가출 계획 언급', detailedDescription: '"수진이가 졸업하면 집을 나가겠다고 했어요."', location: '학교', foundAt: '친구', linkedCharacters: ['char-graduate'], isCritical: true, isRedHerring: false, discoveryDifficulty: 1, analysisRequired: false }
    ],
    locations: [
      { id: 'loc-hall', name: '강당', description: '졸업식 장소', atmosphere: '축하 분위기', objects: [], connectedTo: [] },
      { id: 'loc-home', name: '집', description: '수진이 집', atmosphere: '조용함', objects: [{ id: 'obj-note', name: '편지', description: '가출 편지', examinationResult: '가출 의사 확인' }], connectedTo: [] }
    ],
    timeline: [
      { time: '10:00', event: '졸업식 시작', participants: ['char-graduate'], location: '강당', importance: 'minor', isRevealed: true },
      { time: '11:00', event: '졸업식 종료', participants: ['char-graduate'], location: '강당', importance: 'major', isRevealed: true },
      { time: '11:30', event: '가출', participants: ['char-graduate'], location: '집', importance: 'critical', isRevealed: false },
      { time: '13:00', event: '실종 확인', participants: [], location: '집', importance: 'major', isRevealed: true }
    ],
    solution: {
      summary: '이수진이 부모의 대학 진학 압박에 지쳐 가출했다.',
      detailedExplanation: ['수진이는 부모의 과도한 진학 압박에 시달렸다.', '졸업식을 계기로 가출을 결심했다.', '가출 편지를 남기고 집을 나갔다.'],
      keyEvidence: ['evidence-note', 'evidence-friend'],
      howToSolve: ['가출 편지 발견', '친구 증언 청취', '수진 추적'],
      commonMistakes: ['납치로 생각']
    },
    deductionKeywords: { who: ['이수진', '졸업생'], why: ['가출', '압박', '진학'], how: ['가출'], when: ['11:00', '졸업식'], where: ['강당', '집'] },
    tags: ['졸업식', '가출', '압박'],
    author: 'DEDUCTIO',
    version: '1.0'
  },

  // ========================================
  // 시나리오 #15: 입학식의 첫 사건
  // ========================================
  {
    id: 'disappearance-015',
    title: '입학식의 첫 사건',
    subtitle: '입학식 날, 사라진 신입생',
    type: 'disappearance',
    difficulty: 'medium',
    estimatedTime: 25,
    prologue: ['고등학교 입학식.', '새내기 학생이 사라졌다.', '아직 친구도 없는 학생이 어디로 갔을까?'],
    introduction: ['학부모가 긴급 연락했습니다.', '"아이가 입학식 끝나고 안 보여요!"'],
    setting: '학교 강당',
    crimeTime: '12:00',
    crimeLocation: '강당',
    culpritId: 'char-senior-015',
    victimId: 'char-freshman',
    motive: '과거 복수 - 중학교 폭력',
    motiveDetail: '신입생이 중학교 때 선배를 괴롭혔고, 피해자가 고등학교에서 재회하여 복수했다.',
    method: '입학식 후 옥상으로 끌고 가 가둠',
    methodDetail: '선배가 "선배로서 학교 안내해준다"며 옥상으로 데려가 가뒀다.',
    characters: [
      {
        id: 'char-freshman',
        name: '김도윤',
        role: 'victim',
        age: 16,
        gender: 'male',
        occupation: '1학년 신입생',
        personality: '오만하고 폭력적이었음',
        appearance: '교복',
        background: '중학교 때 일진',
        alibi: { location: '불명', time: '12:00', activity: '실종', witnesses: [], hasHole: false },
        relationships: [{ targetId: 'char-senior-015', type: '과거 가해자-피해자', description: '중학교 때 괴롭힘', isSecret: true }],
        secrets: [],
        dialogues: [],
        nervousTriggers: []
      },
      {
        id: 'char-senior-015',
        name: '박진우',
        role: 'culprit',
        age: 17,
        gender: 'male',
        occupation: '2학년',
        personality: '복수심에 불타는',
        appearance: '교복',
        background: '중학교 때 김도윤에게 괴롭힘당함',
        alibi: { location: '강당', time: '12:00', activity: '입학식 도우미', witnesses: ['다른 도우미'], hasHole: true, holeDetail: '12:00~12:30 목격자 없음' },
        motive: { type: 'revenge', description: '과거 폭력에 대한 복수', strength: 3 },
        relationships: [{ targetId: 'char-freshman', type: '과거 피해자-가해자', description: '중학교 때 괴롭힘당함' }],
        secrets: [
          { id: 'secret-senior-1', content: '김도윤을 옥상에 가뒀다', importance: 'critical', revealCondition: 'CCTV' }
        ],
        dialogues: [
          { topic: '김도윤', lines: ['신입생? 모르는데요.'] },
          { topic: '알리바이', lines: ['입학식 도우미로 강당에 있었어요.'], requiresEvidence: ['evidence-cctv-roof'] }
        ],
        nervousTriggers: ['중학교', '폭력', '괴롭힘', '복수']
      }
    ],
    evidence: [
      { id: 'evidence-cctv-roof', name: '옥상 CCTV', type: 'digital', description: '12:05 박진우가 김도윤을 옥상으로', detailedDescription: 'CCTV에 박진우가 김도윤을 옥상으로 데려가는 장면', location: '옥상', foundAt: 'CCTV', linkedCharacters: ['char-senior-015'], isCritical: true, isRedHerring: false, discoveryDifficulty: 1, analysisRequired: true },
      { id: 'evidence-past', name: '중학교 기록', type: 'document', description: '김도윤의 폭력 징계 기록', detailedDescription: '중학교 때 박진우를 괴롭혀 징계받은 기록', location: '학교', foundAt: '기록', linkedCharacters: ['char-freshman', 'char-senior-015'], isCritical: true, isRedHerring: false, discoveryDifficulty: 2, analysisRequired: false }
    ],
    locations: [
      { id: 'loc-hall', name: '강당', description: '입학식 장소', atmosphere: '축하 분위기', objects: [], connectedTo: ['loc-roof'] },
      { id: 'loc-roof', name: '옥상', description: '학교 옥상', atmosphere: '바람', objects: [{ id: 'obj-door', name: '옥상 문', description: '잠긴 문', examinationResult: '안에서 김도윤 발견', isLocked: true, unlockMethod: '개방' }], connectedTo: ['loc-hall'] }
    ],
    timeline: [
      { time: '11:00', event: '입학식 시작', participants: ['char-freshman', 'char-senior-015'], location: '강당', importance: 'minor', isRevealed: true },
      { time: '12:00', event: '입학식 종료', participants: ['char-freshman'], location: '강당', importance: 'major', isRevealed: true },
      { time: '12:05', event: '옥상 납치', participants: ['char-senior-015', 'char-freshman'], location: '옥상', importance: 'critical', isRevealed: false },
      { time: '13:00', event: '실종 확인', participants: [], location: '강당', importance: 'major', isRevealed: true }
    ],
    solution: {
      summary: '박진우가 중학교 때의 폭력에 대한 복수로 김도윤을 옥상에 가뒀다.',
      detailedExplanation: ['박진우는 중학교 때 김도윤에게 심하게 괴롭힘당했다.', '고등학교에서 재회하자 복수를 계획했다.', '입학식 도우미를 핑계로 김도윤을 옥상으로 데려가 가뒀다.'],
      keyEvidence: ['evidence-cctv-roof', 'evidence-past'],
      howToSolve: ['CCTV 확인', '중학교 기록 조사', '옥상 수색'],
      commonMistakes: ['신입생이 길을 잃었다고 생각']
    },
    deductionKeywords: { who: ['박진우', '선배'], why: ['복수', '폭력', '과거'], how: ['납치', '옥상'], when: ['12:00', '입학식'], where: ['강당', '옥상'] },
    tags: ['입학식', '복수', '과거', '폭력'],
    author: 'DEDUCTIO',
    version: '1.0'
  }
];
