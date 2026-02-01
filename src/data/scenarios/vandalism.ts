// ========================================
// 기물파손 시나리오 15개 - 수작업 제작
// ========================================

import { Scenario } from './types';

export const vandalismScenarios: Scenario[] = [
  // ========================================
  // 시나리오 #1: 부서진 트로피
  // ========================================
  {
    id: 'vandalism-001',
    title: '부서진 트로피',
    subtitle: '전국대회 우승 트로피가 산산조각',
    type: 'vandalism',
    difficulty: 'easy',
    estimatedTime: 15,

    prologue: [
      '청운고 축구부의 자랑, 전국대회 우승 트로피.',
      '창립 50주년을 맞아 전시되어 있던 그 트로피가',
      '무참히 부서진 채 발견되었다.'
    ],
    introduction: [
      '체육관에서 긴급 호출이 왔습니다.',
      '"트로피가... 트로피가 깨졌어요!"',
      '전국대회 우승 트로피가 바닥에 산산조각 나있습니다.'
    ],
    setting: '청운고등학교 체육관 트로피 전시대',

    crimeTime: '18:30',
    crimeLocation: '체육관 로비',
    culpritId: 'char-benched',
    victimId: undefined,
    motive: '팀에서 방출당한 분노',
    motiveDetail: '축구부 출신 강태호는 부상으로 팀에서 방출당했다. 자신이 기여한 우승인데 이름도 거론되지 않는 것에 분노했다.',
    method: '야구 배트로 전시장 유리와 트로피를 파손',
    methodDetail: '강태호는 체육창고에서 야구 배트를 가져와 전시장 유리를 깨고 트로피를 부쉈다.',

    characters: [
      {
        id: 'char-benched',
        name: '강태호',
        role: 'culprit',
        age: 18,
        gender: 'male',
        occupation: '전 축구부 주전 / 3학년',
        personality: '자존심이 강하고 열정적, 최근 분노 조절 문제',
        appearance: '건장한 체격, 무릎에 수술 자국',
        background: '축구부 에이스였으나 부상으로 방출. 재활 중이지만 회복이 어렵다는 진단.',
        alibi: {
          location: '재활센터',
          time: '18:30',
          activity: '재활 치료 중이었다고 주장',
          witnesses: [],
          hasHole: true,
          holeDetail: '재활센터 기록에는 17:00에 퇴소한 것으로 나옴'
        },
        motive: {
          type: 'revenge',
          description: '자신이 기여한 우승인데 방출당하고 이름도 없는 것에 분노',
          strength: 3
        },
        relationships: [
          { targetId: 'char-captain', type: '전 동료', description: '한때 같은 팀, 지금은 소원함' }
        ],
        secrets: [
          {
            id: 'secret-benched-1',
            content: '의사로부터 선수 생활 불가능 판정을 받았다',
            importance: 'major',
            revealCondition: '재활 이야기 시'
          }
        ],
        dialogues: [
          {
            topic: '트로피',
            lines: ['그 트로피? 제가 피땀 흘려 딴 건데...', '근데 지금 저한텐 아무 의미 없어요.']
          },
          {
            topic: '알리바이',
            lines: ['재활센터에 있었어요.'],
            requiresEvidence: ['evidence-rehab-record']
          }
        ],
        nervousTriggers: ['축구', '부상', '방출', '재활']
      },
      {
        id: 'char-captain',
        name: '박준혁',
        role: 'suspect',
        age: 18,
        gender: 'male',
        occupation: '축구부 주장 / 3학년',
        personality: '리더십 있고 책임감 강함',
        appearance: '다부진 체격, 자신감 있는 표정',
        background: '현 축구부 주장, 차기 프로 유망주.',
        alibi: {
          location: '운동장',
          time: '18:30',
          activity: '개인 훈련 중',
          witnesses: ['char-coach'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-benched', type: '전 동료', description: '강태호의 방출을 아쉬워함' }
        ],
        secrets: [],
        dialogues: [
          {
            topic: '강태호',
            lines: ['태호 형은... 힘든 시간을 보내고 있어요.', '방출된 후로 많이 변했어요.']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-coach',
        name: '김성진',
        role: 'witness',
        age: 40,
        gender: 'male',
        occupation: '축구부 감독',
        personality: '엄격하지만 선수들을 아낌',
        appearance: '운동복 차림, 호각을 목에 걸고 있음',
        background: '전직 프로선수, 10년째 지도자 생활.',
        alibi: {
          location: '운동장',
          time: '18:30',
          activity: '박준혁 개인 훈련 지도',
          witnesses: ['char-captain'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-benched', type: '전 지도자', description: '강태호를 방출시킨 결정자' }
        ],
        secrets: [],
        dialogues: [
          {
            topic: '강태호',
            lines: ['태호 방출은 어쩔 수 없었어요. 부상이 너무 심해서...', '근데 그 후로 연락이 끊겼어요.']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-janitor',
        name: '이만수',
        role: 'witness',
        age: 58,
        gender: 'male',
        occupation: '학교 관리인',
        personality: '과묵하고 성실함',
        appearance: '작업복 차림, 도구 가방을 들고 다님',
        background: '30년째 학교 관리를 담당.',
        alibi: {
          location: '관리실',
          time: '18:30',
          activity: '청소 도구 정리 중',
          witnesses: [],
          hasHole: false
        },
        relationships: [],
        secrets: [],
        dialogues: [
          {
            topic: '목격',
            lines: ['6시 반쯤 체육관 쪽에서 유리 깨지는 소리가 났어요.', '가봤더니 누가 뒷문으로 뛰어가더라고요. 절뚝거리면서.']
          }
        ],
        nervousTriggers: []
      }
    ],

    evidence: [
      {
        id: 'evidence-bat',
        name: '야구 배트',
        type: 'physical',
        description: '현장 근처에서 발견된 야구 배트',
        detailedDescription: '알루미늄 배트에 트로피 금속 조각이 묻어있다. 손잡이에 땀 자국.',
        location: '체육관',
        foundAt: '전시대 옆 화분 뒤',
        linkedCharacters: ['char-benched'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: true,
        analysisResult: '지문이 일부 검출됨. 학교 야구부 장비실 물품.'
      },
      {
        id: 'evidence-rehab-record',
        name: '재활센터 퇴소 기록',
        type: 'document',
        description: '강태호의 재활센터 출입 기록',
        detailedDescription: '기록에 따르면 강태호는 17:00에 퇴소했다.',
        location: '재활센터',
        foundAt: '재활센터 데스크',
        linkedCharacters: ['char-benched'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-witness-janitor',
        name: '관리인 목격담',
        type: 'testimony',
        description: '뒷문으로 뛰어가는 절뚝거리는 인물 목격',
        detailedDescription: '"누가 뒷문으로 뛰어가더라고요. 절뚝거리면서. 체격이 좋아 보였어요."',
        location: '체육관',
        foundAt: '관리인 인터뷰',
        linkedCharacters: ['char-benched'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-knee-brace',
        name: '무릎 보호대 조각',
        type: 'physical',
        description: '현장에서 발견된 무릎 보호대 일부',
        detailedDescription: '검은색 무릎 보호대의 찢어진 조각. 재활 환자들이 주로 착용하는 종류.',
        location: '체육관',
        foundAt: '전시대 근처',
        linkedCharacters: ['char-benched'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-redherring-rival',
        name: '라이벌 학교 협박편지',
        type: 'document',
        description: '익명의 협박편지',
        detailedDescription: '"다음엔 너희 선수들이다"라고 적힌 편지.',
        location: '체육관',
        foundAt: '감독 사물함',
        linkedCharacters: [],
        isCritical: false,
        isRedHerring: true,
        redHerringReason: '장난으로 밝혀진 라이벌 학교 학생들의 것',
        discoveryDifficulty: 1,
        analysisRequired: false
      }
    ],

    locations: [
      {
        id: 'loc-gym-lobby',
        name: '체육관 로비',
        description: '트로피 전시대가 있는 입구',
        atmosphere: '깨진 유리와 부서진 트로피 조각이 흩어져 있음',
        objects: [
          {
            id: 'obj-display',
            name: '전시대',
            description: '유리가 깨진 트로피 전시대',
            examinationResult: '강한 충격으로 유리가 박살남. 트로피 조각이 바닥에.',
            containsEvidence: 'evidence-knee-brace'
          },
          {
            id: 'obj-plant',
            name: '화분',
            description: '전시대 옆 큰 화분',
            examinationResult: '화분 뒤에 야구 배트가 숨겨져 있다.',
            containsEvidence: 'evidence-bat'
          }
        ],
        connectedTo: ['loc-gym', 'loc-backdoor']
      }
    ],

    timeline: [
      { time: '17:00', event: '강태호, 재활센터 퇴소', participants: ['char-benched'], location: '재활센터', importance: 'critical', isRevealed: false },
      { time: '18:00', event: '강태호, 학교 도착', participants: ['char-benched'], location: '학교', importance: 'major', isRevealed: false },
      { time: '18:30', event: '트로피 파손', participants: ['char-benched'], location: '체육관 로비', importance: 'critical', isRevealed: false },
      { time: '18:32', event: '관리인, 유리 깨지는 소리 듣고 이동', participants: ['char-janitor'], location: '관리실', importance: 'major', isRevealed: false },
      { time: '18:35', event: '관리인, 뒷문으로 도주하는 인물 목격', participants: ['char-janitor', 'char-benched'], location: '체육관', importance: 'critical', isRevealed: false },
      { time: '18:40', event: '파손 발견 및 신고', participants: ['char-janitor'], location: '체육관 로비', importance: 'major', isRevealed: true }
    ],

    solution: {
      summary: '강태호가 방출에 대한 분노로 자신이 딴 우승 트로피를 파괴했다.',
      detailedExplanation: [
        '강태호는 부상으로 축구부에서 방출당했다.',
        '의사로부터 선수 생활 불가능 판정을 받고 절망했다.',
        '자신이 피땀 흘려 딴 우승인데 이제 아무도 기억하지 않는다고 느꼈다.',
        '재활센터를 일찍 나와 학교로 갔다.',
        '야구 배트로 전시대를 부수고 트로피를 파괴했다.',
        '무릎 부상 때문에 절뚝거리며 도주했다.'
      ],
      keyEvidence: ['evidence-bat', 'evidence-rehab-record', 'evidence-witness-janitor', 'evidence-knee-brace'],
      howToSolve: [
        '도주자의 특징 (절뚝거림) 파악',
        '무릎 부상이 있는 관계자 확인',
        '알리바이 검증',
        '동기 파악'
      ],
      commonMistakes: [
        '라이벌 학교 소행으로 단정짓는 것',
        '현 축구부원을 의심하는 것'
      ]
    },

    deductionKeywords: {
      who: ['강태호', '전 축구부', '방출'],
      why: ['분노', '방출', '부상', '무시', '복수'],
      how: ['배트', '야구 배트', '파손'],
      when: ['6시 반', '18:30', '저녁'],
      where: ['체육관', '전시대', '로비']
    },

    tags: ['스포츠', '부상', '분노', '방출', '트로피'],
    author: 'DEDUCTIO Team',
    version: '1.0.0'
  },

  // ========================================
  // 시나리오 #2: 학교 정문 교명판 훼손
  // ========================================
  {
    id: 'vandalism-002',
    title: '학교 정문 교명판 훼손',
    subtitle: '50년 역사의 교명판에 낙서가',
    type: 'vandalism',
    difficulty: 'easy',
    estimatedTime: 15,

    prologue: [
      '청운고등학교 정문의 자랑인 대리석 교명판.',
      '창립 50주년 기념으로 제작된 이 교명판에',
      '스프레이 낙서가 새겨진 채 발견되었다.'
    ],
    introduction: [
      '아침 등교 시간, 학생들의 비명소리가 들립니다.',
      '"교명판에... 욕설이 적혀있어요!"',
      '누군가 빨간 스프레이로 교명판을 훼손했습니다.'
    ],
    setting: '청운고등학교 정문 교명판',

    crimeTime: '05:30',
    crimeLocation: '학교 정문',
    culpritId: 'char-expelled',
    motive: '퇴학 당한 것에 대한 복수',
    motiveDetail: '최근 폭력 사건으로 퇴학당한 김동민이 학교에 대한 원망을 표출하기 위해 범행을 저질렀다.',
    method: '새벽에 정문 CCTV 사각지대에서 스프레이로 낙서',
    methodDetail: '김동민은 학교 시설을 잘 알고 있어 CCTV 사각지대를 파악하고 새벽에 침입했다.',

    characters: [
      {
        id: 'char-expelled',
        name: '김동민',
        role: 'culprit',
        age: 18,
        gender: 'male',
        occupation: '퇴학생',
        personality: '충동적이고 분노 조절이 안됨',
        appearance: '검은색 후드, 마른 체격',
        background: '한 달 전 폭력 사건으로 퇴학당함. 학교에 강한 원한을 품고 있음.',
        alibi: {
          location: '집',
          time: '05:30',
          activity: '자고 있었다고 주장',
          witnesses: [],
          hasHole: true,
          holeDetail: '가족들이 확인할 수 없는 시간대'
        },
        motive: {
          type: 'revenge',
          description: '퇴학 조치에 대한 복수',
          strength: 3
        },
        relationships: [
          { targetId: 'char-teacher', type: '전 담임', description: '퇴학 결정에 관여한 교사' }
        ],
        secrets: [
          {
            id: 'secret-expelled-1',
            content: 'SNS에 학교에 대한 협박성 글을 여러 번 올렸다',
            importance: 'major',
            revealCondition: 'SNS 조사 시'
          }
        ],
        dialogues: [
          {
            topic: '퇴학',
            lines: ['그 학교는 저를 버렸어요.', '제 인생을 망친 곳이에요.']
          }
        ],
        nervousTriggers: ['퇴학', '정문', '스프레이', 'CCTV']
      },
      {
        id: 'char-teacher',
        name: '정미영',
        role: 'witness',
        age: 35,
        gender: 'female',
        occupation: '생활지도 교사',
        personality: '원칙적이고 엄격함',
        appearance: '단정한 정장 차림',
        background: '김동민의 퇴학 결정에 관여한 교사.',
        alibi: {
          location: '집',
          time: '05:30',
          activity: '출근 준비 중',
          witnesses: ['가족'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-expelled', type: '전 담임', description: '퇴학시킨 학생' }
        ],
        secrets: [],
        dialogues: [
          {
            topic: '김동민',
            lines: ['동민이는 여러 차례 경고를 받았어요.', '퇴학은 어쩔 수 없는 결정이었습니다.']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-guard',
        name: '박철수',
        role: 'witness',
        age: 55,
        gender: 'male',
        occupation: '경비원',
        personality: '책임감 있고 꼼꼼함',
        appearance: '경비 유니폼, 순찰 손전등 소지',
        background: '15년째 학교 경비를 맡고 있음.',
        alibi: {
          location: '경비실',
          time: '05:30',
          activity: 'CCTV 모니터링',
          witnesses: [],
          hasHole: false
        },
        relationships: [],
        secrets: [],
        dialogues: [
          {
            topic: '목격',
            lines: ['새벽 5시 반쯤 정문 쪽에서 인기척이 있었어요.', 'CCTV에는 안 잡혔지만 사각지대가 있거든요.']
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
        occupation: '학생 / 김동민 친구',
        personality: '우유부단하고 소심함',
        appearance: '안경 착용, 왜소한 체격',
        background: '김동민의 유일한 친구. 퇴학 후에도 연락을 유지함.',
        alibi: {
          location: '집',
          time: '05:30',
          activity: '수면 중',
          witnesses: ['부모'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-expelled', type: '친구', description: '유일하게 연락하는 친구' }
        ],
        secrets: [
          {
            id: 'secret-friend-1',
            content: '김동민이 전날 밤 복수하겠다고 문자를 보냈다',
            importance: 'critical',
            revealCondition: '휴대폰 조사 시'
          }
        ],
        dialogues: [
          {
            topic: '김동민',
            lines: ['동민이는... 많이 힘들어했어요.', '학교를 정말 원망했어요.']
          }
        ],
        nervousTriggers: ['문자', '복수']
      }
    ],

    evidence: [
      {
        id: 'evidence-spray',
        name: '빨간 스프레이',
        type: 'physical',
        description: '근처 쓰레기통에서 발견된 빨간 스프레이 캔',
        detailedDescription: '지문이 닦여져 있지만 구매 영수증이 함께 발견됨.',
        location: '학교 정문',
        foundAt: '정문 옆 쓰레기통',
        linkedCharacters: ['char-expelled'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: true,
        analysisResult: '영수증에 어제 날짜가 찍혀있고 근처 문구점에서 구매됨.'
      },
      {
        id: 'evidence-sns',
        name: 'SNS 협박글',
        type: 'digital',
        description: '김동민의 SNS에 올라온 학교 비난 글',
        detailedDescription: '"그 학교는 대가를 치를 것이다" 등의 협박성 내용.',
        location: '온라인',
        foundAt: 'SNS 계정',
        linkedCharacters: ['char-expelled'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-text',
        name: '복수 예고 문자',
        type: 'digital',
        description: '이준호에게 보낸 문자 메시지',
        detailedDescription: '"내일 아침 학교가 놀랄 거야"라는 내용의 문자.',
        location: '이준호 휴대폰',
        foundAt: '이준호 휴대폰',
        linkedCharacters: ['char-expelled', 'char-friend'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      },
      {
        id: 'evidence-footprint',
        name: '운동화 자국',
        type: 'physical',
        description: '교명판 주변의 붉은 페인트 발자국',
        detailedDescription: '280mm 사이즈의 운동화 자국.',
        location: '학교 정문',
        foundAt: '교명판 앞',
        linkedCharacters: ['char-expelled'],
        isCritical: false,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-cctv',
        name: 'CCTV 영상',
        type: 'digital',
        description: '정문 CCTV 녹화 영상',
        detailedDescription: '5시 20분경 후드를 쓴 인물이 정문 근처로 접근하는 모습이 일부 포착됨.',
        location: '경비실',
        foundAt: 'CCTV 서버',
        linkedCharacters: ['char-expelled'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: true,
        analysisResult: '얼굴은 확인 불가하지만 체격과 걸음걸이가 김동민과 유사함.'
      },
      {
        id: 'evidence-receipt',
        name: '스프레이 구매 영수증',
        type: 'document',
        description: '문구점 영수증',
        detailedDescription: '어제 오후 3시에 빨간 스프레이를 구매한 영수증.',
        location: '학교 정문',
        foundAt: '쓰레기통 안',
        linkedCharacters: ['char-expelled'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: true,
        analysisResult: '문구점 주인이 김동민을 확인함.'
      }
    ],

    locations: [
      {
        id: 'loc-gate',
        name: '학교 정문',
        description: '대리석으로 만든 교명판이 있는 정문',
        atmosphere: '빨간 스프레이로 욕설이 적혀있어 충격적임',
        objects: [
          {
            id: 'obj-signboard',
            name: '교명판',
            description: '대리석 교명판에 빨간 낙서',
            examinationResult: '스프레이 페인트가 아직 완전히 마르지 않았음.',
            containsEvidence: 'evidence-footprint'
          },
          {
            id: 'obj-trash',
            name: '쓰레기통',
            description: '정문 옆 쓰레기통',
            examinationResult: '스프레이 캔과 영수증이 있음.',
            containsEvidence: 'evidence-spray'
          }
        ],
        connectedTo: ['loc-guard-room', 'loc-parking']
      },
      {
        id: 'loc-guard-room',
        name: '경비실',
        description: 'CCTV 모니터가 있는 경비실',
        atmosphere: '여러 대의 모니터가 학교 곳곳을 비추고 있음',
        objects: [
          {
            id: 'obj-monitor',
            name: 'CCTV 모니터',
            description: '12대의 모니터가 설치됨',
            examinationResult: 'CCTV 녹화 영상 확인 가능.',
            containsEvidence: 'evidence-cctv'
          }
        ],
        connectedTo: ['loc-gate']
      },
      {
        id: 'loc-parking',
        name: '주차장',
        description: '정문 옆 교직원 주차장',
        atmosphere: '아직 출근 시간 전이라 한산함',
        objects: [],
        connectedTo: ['loc-gate']
      },
      {
        id: 'loc-online',
        name: '온라인',
        description: 'SNS 및 메시지 조사 공간',
        atmosphere: '디지털 증거 분석',
        objects: [
          {
            id: 'obj-sns',
            name: 'SNS 계정',
            description: '김동민의 SNS',
            examinationResult: '협박성 글이 여러 개 있음.',
            containsEvidence: 'evidence-sns'
          }
        ],
        connectedTo: []
      }
    ],

    timeline: [
      { time: '15:00', event: '김동민, 문구점에서 빨간 스프레이 구매', participants: ['char-expelled'], location: '문구점', importance: 'major', isRevealed: false },
      { time: '23:00', event: '김동민, 이준호에게 복수 예고 문자 전송', participants: ['char-expelled', 'char-friend'], location: '온라인', importance: 'critical', isRevealed: false },
      { time: '05:20', event: '김동민, 학교 정문 접근', participants: ['char-expelled'], location: '학교 정문', importance: 'critical', isRevealed: false },
      { time: '05:30', event: '교명판 낙서 범행', participants: ['char-expelled'], location: '학교 정문', importance: 'critical', isRevealed: false },
      { time: '05:40', event: '김동민, 현장 이탈', participants: ['char-expelled'], location: '학교 정문', importance: 'major', isRevealed: false },
      { time: '07:30', event: '낙서 발견 및 신고', participants: ['char-guard'], location: '학교 정문', importance: 'major', isRevealed: true }
    ],

    solution: {
      summary: '퇴학당한 김동민이 학교에 대한 복수로 교명판을 훼손했다.',
      detailedExplanation: [
        '김동민은 한 달 전 폭력 사건으로 퇴학당했다.',
        '퇴학 이후 학교에 대한 강한 원한을 품었다.',
        'SNS에 학교를 비난하고 협박하는 글을 여러 번 올렸다.',
        '전날 문구점에서 빨간 스프레이를 구매했다.',
        '새벽에 CCTV 사각지대를 이용해 침입했다.',
        '교명판에 욕설을 적고 도주했다.'
      ],
      keyEvidence: ['evidence-spray', 'evidence-sns', 'evidence-text', 'evidence-cctv'],
      howToSolve: [
        'SNS에서 협박성 글 확인',
        '스프레이 구매 영수증 추적',
        '친구에게 보낸 문자 확인',
        'CCTV 영상 분석'
      ],
      commonMistakes: [
        '현 재학생의 소행으로 단정짓는 것',
        '단순 장난으로 치부하는 것'
      ]
    },

    deductionKeywords: {
      who: ['김동민', '퇴학생', '전 학생'],
      why: ['복수', '원한', '퇴학', '분노'],
      how: ['스프레이', '낙서', '침입'],
      when: ['새벽', '05:30', '5시 반'],
      where: ['정문', '교명판', '학교 입구']
    },

    tags: ['퇴학', '복수', '낙서', 'SNS', '학교폭력'],
    author: 'DEDUCTIO',
    version: '1.0'
  },

  // ========================================
  // 시나리오 #3: 교실 유리창 파손
  // ========================================
  {
    id: 'vandalism-003',
    title: '교실 유리창 파손',
    subtitle: '3학년 2반 창문이 깨졌다',
    type: 'vandalism',
    difficulty: 'easy',
    estimatedTime: 15,

    prologue: [
      '주말이 지나고 월요일 아침.',
      '3학년 2반 교실의 창문 5개가',
      '모두 깨진 채 발견되었다.'
    ],
    introduction: [
      '등교한 학생들이 소리를 지릅니다.',
      '"창문이 다 깨졌어요!"',
      '교실 바닥은 유리 파편으로 가득합니다.'
    ],
    setting: '청운고등학교 3학년 2반 교실',

    crimeTime: '토요일 22:00',
    crimeLocation: '3학년 2반 교실',
    culpritId: 'char-baseball-boy',
    motive: '실수 후 도주',
    motiveDetail: '야구 연습 중 공이 벗어나 창문을 깼지만, 처벌이 두려워 나머지 창문도 깨서 우연한 사고처럼 위장하려 했다.',
    method: '야구공과 돌을 던져 창문 파손',
    methodDetail: '첫 창문은 야구공으로 실수로 깼고, 나머지는 의도적으로 돌을 던져 깼다.',

    characters: [
      {
        id: 'char-baseball-boy',
        name: '조민우',
        role: 'culprit',
        age: 17,
        gender: 'male',
        occupation: '야구부 / 2학년',
        personality: '겁이 많고 충동적',
        appearance: '운동선수 체격, 불안한 표정',
        background: '야구부 선수. 평소 성실하지만 실수를 숨기려는 경향이 있음.',
        alibi: {
          location: '집',
          time: '토요일 22:00',
          activity: '집에서 쉬고 있었다고 주장',
          witnesses: [],
          hasHole: true,
          holeDetail: '가족들이 외출 중이었음'
        },
        motive: {
          type: 'fear',
          description: '실수를 숨기기 위한 추가 파손',
          strength: 2
        },
        relationships: [],
        secrets: [
          {
            id: 'secret-baseball-1',
            content: '이전에도 공으로 창문을 깬 적이 있어 학교에서 경고를 받았다',
            importance: 'major',
            revealCondition: '과거 기록 조회 시'
          }
        ],
        dialogues: [
          {
            topic: '토요일',
            lines: ['토요일엔 집에 있었어요.', '야구 연습? 안 했는데요...']
          }
        ],
        nervousTriggers: ['야구', '창문', '토요일', '연습']
      },
      {
        id: 'char-classmate',
        name: '김서연',
        role: 'witness',
        age: 18,
        gender: 'female',
        occupation: '3학년 2반 학생',
        personality: '관찰력이 뛰어나고 꼼꼼함',
        appearance: '단정한 외모, 안경 착용',
        background: '3학년 2반 반장. 교실 관리에 책임감이 강함.',
        alibi: {
          location: '집',
          time: '토요일 22:00',
          activity: '가족과 저녁 식사',
          witnesses: ['부모'],
          hasHole: false
        },
        relationships: [],
        secrets: [],
        dialogues: [
          {
            topic: '창문',
            lines: ['창문이 한꺼번에 5개나 깨진 건 이상해요.', '뭔가 의도적으로 보여요.']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-security',
        name: '최용식',
        role: 'witness',
        age: 52,
        gender: 'male',
        occupation: '야간 경비원',
        personality: '책임감 있고 성실함',
        appearance: '경비 유니폼, 순찰 손전등',
        background: '10년째 야간 경비를 맡고 있음.',
        alibi: {
          location: '경비실',
          time: '토요일 22:00',
          activity: '순찰 중',
          witnesses: [],
          hasHole: false
        },
        relationships: [],
        secrets: [],
        dialogues: [
          {
            topic: '목격',
            lines: ['토요일 밤 10시쯤 유리 깨지는 소리를 여러 번 들었어요.', '운동장 쪽에서 인기척도 있었고요.']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-coach',
        name: '박진수',
        role: 'suspect',
        age: 38,
        gender: 'male',
        occupation: '야구부 코치',
        personality: '열정적이고 선수들을 아낌',
        appearance: '운동복 차림, 선글라스',
        background: '야구부 코치. 선수들의 실수를 감싸주는 경향이 있음.',
        alibi: {
          location: '집',
          time: '토요일 22:00',
          activity: '휴식',
          witnesses: ['아내'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-baseball-boy', type: '코치', description: '조민우를 지도하는 코치' }
        ],
        secrets: [],
        dialogues: [
          {
            topic: '조민우',
            lines: ['민우는 착한 애예요.', '실수가 좀 많긴 하지만...']
          }
        ],
        nervousTriggers: []
      }
    ],

    evidence: [
      {
        id: 'evidence-baseball',
        name: '야구공',
        type: 'physical',
        description: '교실 바닥에서 발견된 야구공',
        detailedDescription: '학교 야구부 마킹이 있는 공. 유리 파편이 묻어있음.',
        location: '3학년 2반 교실',
        foundAt: '교실 바닥',
        linkedCharacters: ['char-baseball-boy'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-stones',
        name: '돌멩이들',
        type: 'physical',
        description: '교실 바닥에 흩어진 여러 개의 돌',
        detailedDescription: '운동장에서 흔히 볼 수 있는 크기의 돌 4개.',
        location: '3학년 2반 교실',
        foundAt: '교실 바닥',
        linkedCharacters: ['char-baseball-boy'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-footprints',
        name: '운동장 발자국',
        type: 'physical',
        description: '운동장에서 교실 쪽으로 이어지는 발자국',
        detailedDescription: '야구 스파이크 자국이 교실 아래까지 이어짐.',
        location: '운동장',
        foundAt: '운동장 흙바닥',
        linkedCharacters: ['char-baseball-boy'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-glove',
        name: '야구 글러브',
        type: 'physical',
        description: '운동장 펜스 근처에서 발견된 글러브',
        detailedDescription: '조민우의 이름이 적혀있는 글러브.',
        location: '운동장',
        foundAt: '펜스 근처',
        linkedCharacters: ['char-baseball-boy'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-cctv-gap',
        name: 'CCTV 사각지대',
        type: 'digital',
        description: 'CCTV 녹화 영상',
        detailedDescription: '교실 쪽은 사각지대지만 운동장 입구에 인영이 포착됨.',
        location: '경비실',
        foundAt: 'CCTV 서버',
        linkedCharacters: ['char-baseball-boy'],
        isCritical: false,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: true,
        analysisResult: '22시경 운동복 차림의 학생이 운동장으로 들어가는 모습.'
      },
      {
        id: 'evidence-warning',
        name: '과거 경고 기록',
        type: 'document',
        description: '조민우의 이전 창문 파손 기록',
        detailedDescription: '3개월 전 야구공으로 창문을 깬 사건 기록.',
        location: '행정실',
        foundAt: '학생 기록부',
        linkedCharacters: ['char-baseball-boy'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      }
    ],

    locations: [
      {
        id: 'loc-classroom',
        name: '3학년 2반 교실',
        description: '창문 5개가 모두 깨진 교실',
        atmosphere: '유리 파편이 바닥에 흩어져 있고 위험함',
        objects: [
          {
            id: 'obj-windows',
            name: '깨진 창문들',
            description: '5개의 창문이 모두 깨짐',
            examinationResult: '첫 번째 창문의 파손 패턴이 나머지와 다름.',
            containsEvidence: 'evidence-baseball'
          },
          {
            id: 'obj-floor',
            name: '교실 바닥',
            description: '유리 파편과 파편들',
            examinationResult: '야구공과 돌멩이들이 있음.',
            containsEvidence: 'evidence-stones'
          }
        ],
        connectedTo: ['loc-hallway']
      },
      {
        id: 'loc-hallway',
        name: '3층 복도',
        description: '3학년 교실들이 있는 복도',
        atmosphere: '조용하고 한산함',
        objects: [],
        connectedTo: ['loc-classroom', 'loc-playground']
      },
      {
        id: 'loc-playground',
        name: '운동장',
        description: '야구부가 연습하는 운동장',
        atmosphere: '밤에는 어둡고 한적함',
        objects: [
          {
            id: 'obj-fence',
            name: '펜스',
            description: '운동장 경계 펜스',
            examinationResult: '펜스 근처에 야구 글러브가 떨어져 있음.',
            containsEvidence: 'evidence-glove'
          },
          {
            id: 'obj-ground',
            name: '운동장 흙바닥',
            description: '야구 연습장 흙바닥',
            examinationResult: '스파이크 자국이 교실 쪽으로 이어짐.',
            containsEvidence: 'evidence-footprints'
          }
        ],
        connectedTo: ['loc-hallway']
      },
      {
        id: 'loc-admin',
        name: '행정실',
        description: '학생 기록이 보관된 행정실',
        atmosphere: '서류와 파일들이 정리되어 있음',
        objects: [
          {
            id: 'obj-records',
            name: '학생 기록부',
            description: '학생들의 상벌 기록',
            examinationResult: '조민우의 이전 창문 파손 기록 발견.',
            containsEvidence: 'evidence-warning'
          }
        ],
        connectedTo: []
      }
    ],

    timeline: [
      { time: '21:30', event: '조민우, 혼자 야구 연습 시작', participants: ['char-baseball-boy'], location: '운동장', importance: 'major', isRevealed: false },
      { time: '21:55', event: '야구공이 빗나가 첫 번째 창문 파손', participants: ['char-baseball-boy'], location: '3학년 2반 교실', importance: 'critical', isRevealed: false },
      { time: '22:00', event: '조민우, 나머지 창문 4개를 돌로 파손', participants: ['char-baseball-boy'], location: '3학년 2반 교실', importance: 'critical', isRevealed: false },
      { time: '22:05', event: '경비원, 유리 깨지는 소리 듣고 순찰', participants: ['char-security'], location: '경비실', importance: 'major', isRevealed: false },
      { time: '22:10', event: '조민우, 현장 이탈', participants: ['char-baseball-boy'], location: '운동장', importance: 'major', isRevealed: false },
      { time: '월요일 07:30', event: '파손 발견 및 신고', participants: ['char-classmate'], location: '3학년 2반 교실', importance: 'major', isRevealed: true }
    ],

    solution: {
      summary: '조민우가 야구 연습 중 실수로 창문을 깬 후, 우연한 사고로 위장하기 위해 나머지 창문들도 의도적으로 파손했다.',
      detailedExplanation: [
        '조민우는 토요일 밤 혼자 야구 연습을 하고 있었다.',
        '실수로 공이 빗나가 3학년 2반 창문을 깼다.',
        '이전에도 비슷한 실수로 경고를 받은 적이 있어 처벌이 두려웠다.',
        '우연한 사고처럼 보이게 하기 위해 나머지 창문 4개도 돌로 깼다.',
        '글러브를 두고 황급히 도주했다.'
      ],
      keyEvidence: ['evidence-baseball', 'evidence-stones', 'evidence-glove', 'evidence-warning'],
      howToSolve: [
        '야구공과 돌의 차이 파악',
        '첫 번째 창문의 파손 패턴 분석',
        '운동장에서 발견된 글러브 확인',
        '과거 기록 조회'
      ],
      commonMistakes: [
        '외부인의 소행으로 단정짓는 것',
        '단순 우연한 사고로 보는 것'
      ]
    },

    deductionKeywords: {
      who: ['조민우', '야구부', '학생'],
      why: ['실수', '은폐', '두려움', '위장'],
      how: ['야구공', '돌', '던지기'],
      when: ['토요일 밤', '22:00', '10시'],
      where: ['3학년 2반', '교실', '창문']
    },

    tags: ['야구', '실수', '은폐', '위장', '창문'],
    author: 'DEDUCTIO',
    version: '1.0'
  },

  // ========================================
  // 시나리오 #4: 학교 벽화 낙서
  // ========================================
  {
    id: 'vandalism-004',
    title: '학교 벽화 낙서',
    subtitle: '학생들이 그린 벽화가 훼손되다',
    type: 'vandalism',
    difficulty: 'medium',
    estimatedTime: 20,

    prologue: [
      '미술부 학생들이 한 달간 공들여 그린 벽화.',
      '학교 50주년을 기념하는 이 벽화에',
      '검은 페인트로 낙서가 덧칠되었다.'
    ],
    introduction: [
      '미술부 학생들의 울음소리가 들립니다.',
      '"우리가 한 달 동안 그린 벽화가..."',
      '누군가 고의로 벽화를 훼손했습니다.'
    ],
    setting: '청운고등학교 1층 복도 벽화',

    crimeTime: '19:00',
    crimeLocation: '1층 복도',
    culpritId: 'char-rival-artist',
    motive: '미술대회 입상 경쟁에서 밀린 질투',
    motiveDetail: '같은 미술부 부원인 한지민은 벽화 프로젝트 리더 선정에서 탈락했다. 자신이 더 실력이 좋다고 생각했지만 선발되지 못한 것에 대한 질투심으로 범행을 저질렀다.',
    method: '검은 페인트로 벽화 위에 낙서',
    methodDetail: '한지민은 미술실 열쇠를 복사해두었고, 방과 후 검은 페인트를 가져와 벽화에 낙서했다.',

    characters: [
      {
        id: 'char-rival-artist',
        name: '한지민',
        role: 'culprit',
        age: 17,
        gender: 'female',
        occupation: '미술부 부원 / 2학년',
        personality: '자존심이 강하고 완벽주의자',
        appearance: '긴 머리, 항상 스케치북을 들고 다님',
        background: '실력있는 미술부원이지만 벽화 프로젝트 리더 선정에서 탈락했다.',
        alibi: {
          location: '학원',
          time: '19:00',
          activity: '미술학원에 있었다고 주장',
          witnesses: [],
          hasHole: true,
          holeDetail: '학원 출석부에 서명은 있지만 실제로 수업을 듣지 않았음'
        },
        motive: {
          type: 'jealousy',
          description: '벽화 프로젝트에서 배제된 것에 대한 질투',
          strength: 3
        },
        relationships: [
          { targetId: 'char-leader', type: '동료', description: '같은 미술부지만 경쟁 관계' }
        ],
        secrets: [
          {
            id: 'secret-rival-1',
            content: '미술실 열쇠를 몰래 복사해두었다',
            importance: 'critical',
            revealCondition: '미술실 출입 조사 시'
          }
        ],
        dialogues: [
          {
            topic: '벽화',
            lines: ['그 벽화요? 그냥 그랬던데요.', '제가 했으면 훨씬 나았을 거예요.']
          }
        ],
        nervousTriggers: ['리더', '선발', '질투', '페인트']
      },
      {
        id: 'char-leader',
        name: '박소희',
        role: 'suspect',
        age: 18,
        gender: 'female',
        occupation: '미술부 부장 / 3학년',
        personality: '리더십 있고 재능이 뛰어남',
        appearance: '단발머리, 페인트가 묻은 앞치마',
        background: '벽화 프로젝트 리더로 선정되어 팀을 이끌었다.',
        alibi: {
          location: '집',
          time: '19:00',
          activity: '가족과 저녁 식사',
          witnesses: ['부모', '동생'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-rival-artist', type: '동료', description: '한지민과 경쟁 관계' }
        ],
        secrets: [],
        dialogues: [
          {
            topic: '한지민',
            lines: ['지민이는 실력이 좋아요.', '하지만 협동 작업이 약해서 리더로는 부적합했어요.']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-art-teacher',
        name: '김예린',
        role: 'witness',
        age: 32,
        gender: 'female',
        occupation: '미술 교사',
        personality: '섬세하고 학생들을 잘 이해함',
        appearance: '화가 스타일의 복장',
        background: '미술부 지도 교사. 리더 선발 과정에서 한지민을 탈락시켰다.',
        alibi: {
          location: '집',
          time: '19:00',
          activity: '개인 작업 중',
          witnesses: [],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-rival-artist', type: '지도교사', description: '한지민의 재능을 인정하지만 성격적 문제를 지적함' }
        ],
        secrets: [],
        dialogues: [
          {
            topic: '리더 선발',
            lines: ['지민이는 개인 실력은 뛰어나지만', '팀워크에 문제가 있어서 리더로 선발하지 않았어요.']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-junior',
        name: '이수진',
        role: 'witness',
        age: 16,
        gender: 'female',
        occupation: '미술부 후배 / 1학년',
        personality: '소심하고 관찰력이 좋음',
        appearance: '작은 체구, 큰 안경',
        background: '미술부 막내. 선배들의 관계를 조용히 관찰해왔다.',
        alibi: {
          location: '집',
          time: '19:00',
          activity: '숙제 중',
          witnesses: ['부모'],
          hasHole: false
        },
        relationships: [],
        secrets: [
          {
            id: 'secret-junior-1',
            content: '어제 한지민 선배가 미술실 열쇠를 복사하는 것을 봤다',
            importance: 'critical',
            revealCondition: '세심한 질문 시'
          }
        ],
        dialogues: [
          {
            topic: '한지민',
            lines: ['지민 선배는... 요즘 기분이 안 좋아 보였어요.', '벽화 얘기만 나오면 표정이 굳어졌어요.']
          }
        ],
        nervousTriggers: []
      }
    ],

    evidence: [
      {
        id: 'evidence-black-paint',
        name: '검은 페인트통',
        type: 'physical',
        description: '현장 근처에서 발견된 페인트통',
        detailedDescription: '미술실에서 사용하는 페인트. 뚜껑이 열린 채로 발견됨.',
        location: '1층 복도',
        foundAt: '화장실 쓰레기통',
        linkedCharacters: ['char-rival-artist'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: true,
        analysisResult: '지문이 일부 검출됨. 한지민의 것으로 확인됨.'
      },
      {
        id: 'evidence-key-copy',
        name: '복사된 미술실 열쇠',
        type: 'physical',
        description: '한지민의 사물함에서 발견된 열쇠',
        detailedDescription: '미술실 열쇠의 복사본. 최근에 만든 것으로 보임.',
        location: '한지민 사물함',
        foundAt: '사물함 안쪽',
        linkedCharacters: ['char-rival-artist'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      },
      {
        id: 'evidence-academy-log',
        name: '학원 출석부',
        type: 'document',
        description: '미술학원 출석 기록',
        detailedDescription: '한지민이 서명은 했지만 실제 수업에는 참여하지 않았다는 강사의 증언.',
        location: '미술학원',
        foundAt: '학원 출석부',
        linkedCharacters: ['char-rival-artist'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-sketch',
        name: '스케치북',
        type: 'physical',
        description: '한지민의 스케치북',
        detailedDescription: '벽화를 훼손하는 그림이 여러 장 그려져 있음.',
        location: '미술실',
        foundAt: '한지민 자리',
        linkedCharacters: ['char-rival-artist'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-cctv-hallway',
        name: '복도 CCTV',
        type: 'digital',
        description: '1층 복도 CCTV 녹화 영상',
        detailedDescription: '19시경 미술실에서 나오는 인물이 포착됨.',
        location: '경비실',
        foundAt: 'CCTV 서버',
        linkedCharacters: ['char-rival-artist'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: true,
        analysisResult: '체격과 머리 스타일이 한지민과 일치함.'
      },
      {
        id: 'evidence-testimony-junior',
        name: '후배의 증언',
        type: 'testimony',
        description: '이수진의 목격담',
        detailedDescription: '어제 한지민이 열쇠 가게에서 나오는 것을 봤다는 증언.',
        location: '미술실',
        foundAt: '이수진 인터뷰',
        linkedCharacters: ['char-rival-artist', 'char-junior'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      }
    ],

    locations: [
      {
        id: 'loc-hallway-mural',
        name: '1층 복도',
        description: '벽화가 그려진 긴 복도',
        atmosphere: '아름다운 벽화가 검은 페인트로 훼손되어 충격적임',
        objects: [
          {
            id: 'obj-mural',
            name: '훼손된 벽화',
            description: '학생들이 한 달간 그린 대형 벽화',
            examinationResult: '검은 페인트가 덧칠되어 원본이 가려짐.',
            containsEvidence: 'evidence-black-paint'
          }
        ],
        connectedTo: ['loc-art-room', 'loc-bathroom']
      },
      {
        id: 'loc-art-room',
        name: '미술실',
        description: '미술 수업과 미술부 활동 공간',
        atmosphere: '물감과 붓이 정리되어 있음',
        objects: [
          {
            id: 'obj-supplies',
            name: '미술 용품',
            description: '각종 페인트와 도구들',
            examinationResult: '검은 페인트 하나가 없어진 것으로 확인됨.',
            containsEvidence: 'evidence-sketch'
          }
        ],
        connectedTo: ['loc-hallway-mural']
      },
      {
        id: 'loc-bathroom',
        name: '1층 화장실',
        description: '복도 끝의 화장실',
        atmosphere: '조용하고 한적함',
        objects: [
          {
            id: 'obj-trash',
            name: '쓰레기통',
            description: '화장실 쓰레기통',
            examinationResult: '페인트통이 버려져 있음.',
            containsEvidence: 'evidence-black-paint'
          }
        ],
        connectedTo: ['loc-hallway-mural']
      },
      {
        id: 'loc-locker',
        name: '사물함 구역',
        description: '학생들의 사물함이 있는 공간',
        atmosphere: '복도 한쪽에 사물함들이 줄지어 있음',
        objects: [
          {
            id: 'obj-jimin-locker',
            name: '한지민 사물함',
            description: '2학년 사물함',
            examinationResult: '복사된 열쇠가 발견됨.',
            containsEvidence: 'evidence-key-copy'
          }
        ],
        connectedTo: []
      }
    ],

    timeline: [
      { time: '18:30', event: '한지민, 학원에 서명만 하고 이탈', participants: ['char-rival-artist'], location: '미술학원', importance: 'major', isRevealed: false },
      { time: '18:45', event: '한지민, 학교 도착', participants: ['char-rival-artist'], location: '학교', importance: 'major', isRevealed: false },
      { time: '19:00', event: '미술실에서 검은 페인트 가져옴', participants: ['char-rival-artist'], location: '미술실', importance: 'critical', isRevealed: false },
      { time: '19:10', event: '벽화 훼손', participants: ['char-rival-artist'], location: '1층 복도', importance: 'critical', isRevealed: false },
      { time: '19:25', event: '페인트통 버리고 현장 이탈', participants: ['char-rival-artist'], location: '1층 화장실', importance: 'major', isRevealed: false },
      { time: '다음날 07:30', event: '훼손 발견 및 신고', participants: ['char-leader'], location: '1층 복도', importance: 'major', isRevealed: true }
    ],

    solution: {
      summary: '한지민이 벽화 프로젝트 리더 선정에서 탈락한 것에 대한 질투심으로 벽화를 훼손했다.',
      detailedExplanation: [
        '한지민은 실력이 뛰어났지만 팀워크 부족으로 리더 선정에서 탈락했다.',
        '박소희가 리더로 선정되고 벽화가 완성되자 질투심이 폭발했다.',
        '미술실 열쇠를 몰래 복사해두었다.',
        '학원에 서명만 하고 학교로 돌아왔다.',
        '미술실에서 검은 페인트를 가져와 벽화를 훼손했다.',
        '페인트통을 화장실에 버리고 도주했다.'
      ],
      keyEvidence: ['evidence-black-paint', 'evidence-key-copy', 'evidence-academy-log', 'evidence-sketch'],
      howToSolve: [
        '알리바이 검증 (학원 출석 확인)',
        '미술실 출입 조사',
        '복사된 열쇠 발견',
        '스케치북의 훼손 계획 그림 확인'
      ],
      commonMistakes: [
        '외부인의 소행으로 단정짓는 것',
        '리더인 박소희를 의심하는 것'
      ]
    },

    deductionKeywords: {
      who: ['한지민', '미술부', '경쟁자'],
      why: ['질투', '경쟁', '리더', '탈락'],
      how: ['페인트', '열쇠', '침입'],
      when: ['저녁', '19:00', '7시'],
      where: ['1층 복도', '벽화', '미술실']
    },

    tags: ['질투', '예술', '경쟁', '미술부', '벽화'],
    author: 'DEDUCTIO',
    version: '1.0'
  },

  // ========================================
  // 시나리오 #5: 교장실 초상화 훼손
  // ========================================
  {
    id: 'vandalism-005',
    title: '교장실 초상화 훼손',
    subtitle: '역대 교장 초상화에 붉은 X표시',
    type: 'vandalism',
    difficulty: 'medium',
    estimatedTime: 20,

    prologue: [
      '교장실에 걸린 역대 교장들의 초상화.',
      '학교의 역사를 담은 이 초상화들에',
      '붉은 마커로 X자 표시가 그어졌다.'
    ],
    introduction: [
      '교장선생님의 분노한 목소리가 들립니다.',
      '"이건 학교 전통에 대한 모독이야!"',
      '5대 교장 초상화에 붉은 X표가 그어져 있습니다.'
    ],
    setting: '청운고등학교 교장실',

    crimeTime: '17:30',
    crimeLocation: '교장실',
    culpritId: 'char-grandson',
    motive: '할아버지(전직 교장)의 명예 훼손에 대한 복수',
    motiveDetail: '재학생 윤태준의 할아버지는 5대 교장이었는데, 최근 학교 측이 할아버지의 비리 의혹을 조사하며 명예를 실추시켰다. 윤태준은 이에 분노하여 다른 교장들의 초상화만 훼손했다.',
    method: '방과 후 교장실에 침입하여 붉은 마커로 표시',
    methodDetail: '윤태준은 청소 당번을 이용해 교장실에 접근했고, 할아버지를 제외한 다른 교장들의 초상화에 X표를 그었다.',

    characters: [
      {
        id: 'char-grandson',
        name: '윤태준',
        role: 'culprit',
        age: 18,
        gender: 'male',
        occupation: '학생 / 3학년',
        personality: '가족을 중시하고 의리가 있음',
        appearance: '단정한 외모, 성실해 보임',
        background: '5대 교장의 손자. 할아버지를 매우 존경하며 명예를 중요하게 생각함.',
        alibi: {
          location: '청소',
          time: '17:30',
          activity: '교실 청소 당번이었다고 주장',
          witnesses: [],
          hasHole: true,
          holeDetail: '청소를 일찍 마치고 혼자 남았던 시간이 있음'
        },
        motive: {
          type: 'revenge',
          description: '할아버지 명예 훼손에 대한 보복',
          strength: 3
        },
        relationships: [
          { targetId: 'char-principal', type: '학생-교장', description: '현 교장에 대한 원한' }
        ],
        secrets: [
          {
            id: 'secret-grandson-1',
            content: '할아버지가 학교로부터 비리 의혹 조사를 받고 충격을 받았다',
            importance: 'critical',
            revealCondition: '가족 관계 조사 시'
          }
        ],
        dialogues: [
          {
            topic: '할아버지',
            lines: ['우리 할아버지는 훌륭한 분이셨어요.', '학교가 할아버지를 모욕했어요.']
          }
        ],
        nervousTriggers: ['교장', '초상화', '5대', '할아버지']
      },
      {
        id: 'char-principal',
        name: '강석진',
        role: 'suspect',
        age: 58,
        gender: 'male',
        occupation: '현 교장',
        personality: '원칙적이고 엄격함',
        appearance: '정장 차림, 카리스마 있는 외모',
        background: '최근 전임 교장들의 비리 의혹을 조사 중.',
        alibi: {
          location: '교육청',
          time: '17:30',
          activity: '회의 참석',
          witnesses: ['교육청 직원들'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-grandson', type: '교장-학생', description: '윤태준의 할아버지를 조사함' }
        ],
        secrets: [],
        dialogues: [
          {
            topic: '조사',
            lines: ['학교의 투명성을 위해 필요한 조치였습니다.', '과거의 잘못은 바로잡아야 합니다.']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-secretary',
        name: '최은영',
        role: 'witness',
        age: 45,
        gender: 'female',
        occupation: '교장 비서',
        personality: '꼼꼼하고 관찰력이 좋음',
        appearance: '단정한 정장, 안경 착용',
        background: '20년째 학교 행정실에서 근무.',
        alibi: {
          location: '행정실',
          time: '17:30',
          activity: '서류 정리',
          witnesses: ['동료 직원'],
          hasHole: false
        },
        relationships: [],
        secrets: [],
        dialogues: [
          {
            topic: '목격',
            lines: ['5시 반쯤 교장실 쪽에서 인기척이 있었어요.', '청소하는 학생이 있다고 생각했는데...']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-classmate',
        name: '김민준',
        role: 'witness',
        age: 18,
        gender: 'male',
        occupation: '학생 / 윤태준 친구',
        personality: '활발하고 눈치가 빠름',
        appearance: '운동선수 체격',
        background: '윤태준의 절친. 최근 태준이가 힘들어하는 것을 알고 있었음.',
        alibi: {
          location: '운동장',
          time: '17:30',
          activity: '축구',
          witnesses: ['운동 친구들'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-grandson', type: '친구', description: '윤태준의 절친' }
        ],
        secrets: [
          {
            id: 'secret-classmate-1',
            content: '윤태준이 학교와 교장에 대해 불만을 토로한 적이 있다',
            importance: 'major',
            revealCondition: '친구 관계 조사 시'
          }
        ],
        dialogues: [
          {
            topic: '윤태준',
            lines: ['태준이는 요즘 힘들어 보였어요.', '할아버지 일로 많이 속상해했어요.']
          }
        ],
        nervousTriggers: []
      }
    ],

    evidence: [
      {
        id: 'evidence-red-marker',
        name: '붉은 마커',
        type: 'physical',
        description: '교장실 쓰레기통에서 발견된 마커',
        detailedDescription: '붉은 유성 마커. 초상화의 X표와 색상이 일치함.',
        location: '교장실',
        foundAt: '쓰레기통',
        linkedCharacters: ['char-grandson'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: true,
        analysisResult: '지문이 검출됨. 윤태준의 것으로 확인됨.'
      },
      {
        id: 'evidence-cleaning-record',
        name: '청소 당번 명단',
        type: 'document',
        description: '이번 주 청소 당번 기록',
        detailedDescription: '윤태준이 3층 복도 청소 담당으로 되어 있음. 교장실과 가까운 위치.',
        location: '행정실',
        foundAt: '청소 기록부',
        linkedCharacters: ['char-grandson'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-portrait-pattern',
        name: '훼손 패턴',
        type: 'forensic',
        description: '초상화 훼손 분석',
        detailedDescription: '5대 교장(윤태준의 할아버지) 초상화만 훼손되지 않았음.',
        location: '교장실',
        foundAt: '초상화 벽면',
        linkedCharacters: ['char-grandson'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: true,
        analysisResult: '할아버지 초상화는 의도적으로 피해간 것으로 보임.'
      },
      {
        id: 'evidence-diary',
        name: '윤태준 일기',
        type: 'document',
        description: '윤태준의 개인 일기장',
        detailedDescription: '할아버지에 대한 학교의 조사를 비난하는 내용이 적혀있음.',
        location: '교실',
        foundAt: '윤태준 책상',
        linkedCharacters: ['char-grandson'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      },
      {
        id: 'evidence-cctv-hallway',
        name: '3층 복도 CCTV',
        type: 'digital',
        description: 'CCTV 녹화 영상',
        detailedDescription: '17시 25분경 윤태준이 교장실 쪽으로 가는 모습이 포착됨.',
        location: '경비실',
        foundAt: 'CCTV 서버',
        linkedCharacters: ['char-grandson'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-investigation',
        name: '비리 조사 문서',
        type: 'document',
        description: '5대 교장 비리 의혹 조사 보고서',
        detailedDescription: '학교 측이 진행 중인 조사 문서. 윤태준이 이를 알고 분노했을 가능성.',
        location: '행정실',
        foundAt: '기밀 문서함',
        linkedCharacters: ['char-grandson', 'char-principal'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      }
    ],

    locations: [
      {
        id: 'loc-principal-office',
        name: '교장실',
        description: '역대 교장 초상화가 걸린 교장실',
        atmosphere: '권위적이고 엄숙한 분위기지만 초상화 훼손으로 어수선함',
        objects: [
          {
            id: 'obj-portraits',
            name: '초상화들',
            description: '역대 교장 6명의 초상화',
            examinationResult: '5대 교장을 제외한 모든 초상화에 붉은 X표.',
            containsEvidence: 'evidence-portrait-pattern'
          },
          {
            id: 'obj-trash',
            name: '쓰레기통',
            description: '교장실 쓰레기통',
            examinationResult: '붉은 마커가 버려져 있음.',
            containsEvidence: 'evidence-red-marker'
          }
        ],
        connectedTo: ['loc-hallway-3f']
      },
      {
        id: 'loc-hallway-3f',
        name: '3층 복도',
        description: '교장실과 가까운 3층 복도',
        atmosphere: '조용하고 한산함',
        objects: [],
        connectedTo: ['loc-principal-office', 'loc-classroom-3-2']
      },
      {
        id: 'loc-classroom-3-2',
        name: '3학년 2반 교실',
        description: '윤태준이 속한 반',
        atmosphere: '방과 후라 조용함',
        objects: [
          {
            id: 'obj-desk',
            name: '윤태준 책상',
            description: '창가 자리 책상',
            examinationResult: '책상 서랍에 일기장이 있음.',
            containsEvidence: 'evidence-diary'
          }
        ],
        connectedTo: ['loc-hallway-3f']
      },
      {
        id: 'loc-admin-office',
        name: '행정실',
        description: '학교 행정 업무 공간',
        atmosphere: '서류와 파일로 가득함',
        objects: [
          {
            id: 'obj-files',
            name: '문서함',
            description: '기밀 문서 보관함',
            examinationResult: '비리 조사 문서 발견.',
            containsEvidence: 'evidence-investigation'
          }
        ],
        connectedTo: []
      }
    ],

    timeline: [
      { time: '17:00', event: '윤태준, 청소 시작', participants: ['char-grandson'], location: '3층 복도', importance: 'major', isRevealed: false },
      { time: '17:15', event: '청소 완료 후 혼자 남음', participants: ['char-grandson'], location: '3층 복도', importance: 'major', isRevealed: false },
      { time: '17:25', event: '교장실 접근', participants: ['char-grandson'], location: '교장실', importance: 'critical', isRevealed: false },
      { time: '17:30', event: '초상화 훼손', participants: ['char-grandson'], location: '교장실', importance: 'critical', isRevealed: false },
      { time: '17:40', event: '마커를 버리고 현장 이탈', participants: ['char-grandson'], location: '교장실', importance: 'major', isRevealed: false },
      { time: '다음날 08:00', event: '훼손 발견 및 신고', participants: ['char-principal'], location: '교장실', importance: 'major', isRevealed: true }
    ],

    solution: {
      summary: '윤태준이 할아버지(5대 교장)에 대한 비리 조사에 분노하여 다른 교장들의 초상화를 훼손했다.',
      detailedExplanation: [
        '윤태준의 할아버지는 5대 교장으로 학교에 헌신했다.',
        '최근 학교가 전임 교장들의 비리 의혹 조사를 시작했다.',
        '할아버지가 조사를 받으며 명예가 훼손되는 것에 분노했다.',
        '청소 당번을 이용해 교장실에 접근했다.',
        '할아버지를 제외한 다른 교장들의 초상화에 X표를 그었다.',
        '이는 할아버지만 존경하고 나머지는 인정하지 않는다는 의미였다.'
      ],
      keyEvidence: ['evidence-red-marker', 'evidence-portrait-pattern', 'evidence-diary', 'evidence-investigation'],
      howToSolve: [
        '훼손 패턴 분석 (5대 교장만 제외)',
        '윤태준과 5대 교장의 관계 확인',
        '일기장에서 동기 파악',
        'CCTV로 범행 시간 확인'
      ],
      commonMistakes: [
        '외부인의 소행으로 단정짓는 것',
        '현 교장에 대한 불만으로 해석하는 것'
      ]
    },

    deductionKeywords: {
      who: ['윤태준', '학생', '손자'],
      why: ['복수', '명예', '할아버지', '조사'],
      how: ['마커', 'X표', '청소'],
      when: ['방과 후', '17:30', '5시 반'],
      where: ['교장실', '초상화', '3층']
    },

    tags: ['가족', '명예', '복수', '교장', '초상화'],
    author: 'DEDUCTIO',
    version: '1.0'
  },

  // ========================================
  // 시나리오 #6: 과학실 실험 장비 파손
  // ========================================
  {
    id: 'vandalism-006',
    title: '과학실 실험 장비 파손',
    subtitle: '고가의 현미경과 비커가 모두 깨졌다',
    type: 'vandalism',
    difficulty: 'hard',
    estimatedTime: 25,

    prologue: [
      '과학 대회를 앞두고 새로 구입한 실험 장비.',
      '총 500만원 상당의 현미경과 유리 기구들이',
      '모두 파손된 채 발견되었다.'
    ],
    introduction: [
      '과학 교사의 비명소리가 들립니다.',
      '"이럴 수가... 대회가 내일인데!"',
      '과학실이 난장판이 되었습니다.'
    ],
    setting: '청운고등학교 과학실',

    crimeTime: '20:00',
    crimeLocation: '과학실',
    culpritId: 'char-failed-student',
    motive: '과학 대회 참가 자격 박탈에 대한 복수',
    motiveDetail: '이재훈은 성적 미달로 과학 대회 참가 자격을 박탈당했다. 자신이 참가할 수 없다면 아무도 참가하지 못하게 하려고 실험 장비를 파손했다.',
    method: '야간에 침입하여 장비를 일부러 떨어뜨림',
    methodDetail: '이재훈은 과학실 창문이 잠기지 않는다는 것을 알고 있었다. 밤에 사다리를 타고 올라가 창문으로 침입했다.',

    characters: [
      {
        id: 'char-failed-student',
        name: '이재훈',
        role: 'culprit',
        age: 17,
        gender: 'male',
        occupation: '과학반 / 2학년',
        personality: '집착이 강하고 승부욕이 심함',
        appearance: '안경 착용, 마른 체형',
        background: '과학에 재능이 있지만 최근 성적이 떨어져 대회 참가 자격을 잃었다.',
        alibi: {
          location: '집',
          time: '20:00',
          activity: '집에서 공부하고 있었다고 주장',
          witnesses: [],
          hasHole: true,
          holeDetail: '부모님이 출장으로 집에 없었음'
        },
        motive: {
          type: 'revenge',
          description: '대회 참가 자격 박탈에 대한 복수',
          strength: 3
        },
        relationships: [
          { targetId: 'char-science-teacher', type: '학생-교사', description: '자격을 박탈당한 것에 원한' }
        ],
        secrets: [
          {
            id: 'secret-failed-1',
            content: '과학이 유일한 자신의 강점이라고 생각해 왔다',
            importance: 'major',
            revealCondition: '심리 분석 시'
          }
        ],
        dialogues: [
          {
            topic: '대회',
            lines: ['대회요? 저는 관심 없어요.', '어차피 참가 못하는데...']
          }
        ],
        nervousTriggers: ['대회', '자격', '성적', '장비']
      },
      {
        id: 'char-science-teacher',
        name: '박지훈',
        role: 'witness',
        age: 42,
        gender: 'male',
        occupation: '과학 교사',
        personality: '공정하고 원칙적',
        appearance: '흰 가운, 안경',
        background: '과학 대회 지도 교사. 이재훈의 자격 박탈을 결정했다.',
        alibi: {
          location: '집',
          time: '20:00',
          activity: '가족과 저녁 식사',
          witnesses: ['가족'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-failed-student', type: '교사-학생', description: '재훈의 재능을 인정하지만 규정을 지켰다' }
        ],
        secrets: [],
        dialogues: [
          {
            topic: '이재훈',
            lines: ['재훈이는 재능이 있어요.', '하지만 규정은 규정입니다. 성적이 기준에 못 미쳤어요.']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-competitor',
        name: '최서준',
        role: 'suspect',
        age: 17,
        gender: 'male',
        occupation: '과학반 / 2학년',
        personality: '성실하고 경쟁심이 강함',
        appearance: '단정한 외모',
        background: '이재훈 대신 대회에 참가하게 된 학생.',
        alibi: {
          location: '도서관',
          time: '20:00',
          activity: '공부',
          witnesses: ['도서관 사서'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-failed-student', type: '경쟁자', description: '과학반에서 경쟁 관계' }
        ],
        secrets: [],
        dialogues: [
          {
            topic: '이재훈',
            lines: ['재훈이는 요즘 기분이 안 좋아 보였어요.', '대회 얘기만 나오면 얼굴이 굳었어요.']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-janitor-night',
        name: '김철호',
        role: 'witness',
        age: 60,
        gender: 'male',
        occupation: '야간 관리인',
        personality: '성실하고 책임감 있음',
        appearance: '작업복, 손전등',
        background: '15년째 야간 근무를 담당.',
        alibi: {
          location: '관리실',
          time: '20:00',
          activity: '순찰 준비',
          witnesses: [],
          hasHole: false
        },
        relationships: [],
        secrets: [],
        dialogues: [
          {
            topic: '목격',
            lines: ['8시쯤 과학실 쪽에서 유리 깨지는 소리가 났어요.', '가보니 창문이 열려있더라고요.']
          }
        ],
        nervousTriggers: []
      }
    ],

    evidence: [
      {
        id: 'evidence-broken-microscope',
        name: '파손된 현미경',
        type: 'physical',
        description: '바닥에 떨어진 고가 현미경',
        detailedDescription: '의도적으로 높은 곳에서 떨어뜨린 것으로 보임. 완전히 파손됨.',
        location: '과학실',
        foundAt: '과학실 바닥',
        linkedCharacters: ['char-failed-student'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-window',
        name: '열린 창문',
        type: 'physical',
        description: '잠기지 않은 과학실 창문',
        detailedDescription: '창틀에 사다리 자국이 있음.',
        location: '과학실',
        foundAt: '과학실 창문',
        linkedCharacters: ['char-failed-student'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: true,
        analysisResult: '외부에서 사다리를 타고 침입한 흔적.'
      },
      {
        id: 'evidence-ladder',
        name: '사다리',
        type: 'physical',
        description: '과학실 창문 아래 놓인 사다리',
        detailedDescription: '학교 창고에 있던 사다리. 최근에 이동된 것으로 보임.',
        location: '과학실 외벽',
        foundAt: '과학실 건물 외벽',
        linkedCharacters: ['char-failed-student'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: true,
        analysisResult: '사다리에 지문이 검출됨.'
      },
      {
        id: 'evidence-shoes',
        name: '신발 자국',
        type: 'physical',
        description: '과학실 바닥의 신발 자국',
        detailedDescription: '운동화 자국이 창문에서 실험대까지 이어짐.',
        location: '과학실',
        foundAt: '과학실 바닥',
        linkedCharacters: ['char-failed-student'],
        isCritical: false,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-disqualification',
        name: '자격 박탈 통보서',
        type: 'document',
        description: '이재훈에게 전달된 통보서',
        detailedDescription: '성적 미달로 대회 참가 자격이 박탈되었다는 내용.',
        location: '행정실',
        foundAt: '학생 기록',
        linkedCharacters: ['char-failed-student', 'char-science-teacher'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-message',
        name: '문자 메시지',
        type: 'digital',
        description: '이재훈이 친구에게 보낸 문자',
        detailedDescription: '"모두 후회하게 될 거야"라는 내용의 협박성 문자.',
        location: '휴대폰',
        foundAt: '친구 휴대폰',
        linkedCharacters: ['char-failed-student'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      }
    ],

    locations: [
      {
        id: 'loc-science-lab',
        name: '과학실',
        description: '실험 장비가 있는 과학 교실',
        atmosphere: '유리 파편과 파손된 장비로 난장판',
        objects: [
          {
            id: 'obj-equipment',
            name: '실험 장비들',
            description: '현미경, 비커, 플라스크 등',
            examinationResult: '대부분 바닥에 떨어져 파손됨.',
            containsEvidence: 'evidence-broken-microscope'
          },
          {
            id: 'obj-window',
            name: '창문',
            description: '2층 과학실 창문',
            examinationResult: '열려있고 창틀에 사다리 자국.',
            containsEvidence: 'evidence-window'
          }
        ],
        connectedTo: ['loc-hallway-2f']
      },
      {
        id: 'loc-hallway-2f',
        name: '2층 복도',
        description: '과학실이 있는 2층 복도',
        atmosphere: '밤이라 어둡고 조용함',
        objects: [],
        connectedTo: ['loc-science-lab']
      },
      {
        id: 'loc-outside',
        name: '과학실 외벽',
        description: '과학실 창문 아래 공간',
        atmosphere: '어두운 밤, 사다리가 놓여있음',
        objects: [
          {
            id: 'obj-ladder',
            name: '사다리',
            description: '창고에서 가져온 사다리',
            examinationResult: '지문이 검출됨.',
            containsEvidence: 'evidence-ladder'
          }
        ],
        connectedTo: []
      },
      {
        id: 'loc-admin',
        name: '행정실',
        description: '학생 기록 보관 장소',
        atmosphere: '서류로 가득함',
        objects: [
          {
            id: 'obj-records',
            name: '학생 기록',
            description: '학생들의 성적과 활동 기록',
            examinationResult: '이재훈의 자격 박탈 통보서 발견.',
            containsEvidence: 'evidence-disqualification'
          }
        ],
        connectedTo: []
      }
    ],

    timeline: [
      { time: '19:30', event: '이재훈, 학교 도착', participants: ['char-failed-student'], location: '학교', importance: 'major', isRevealed: false },
      { time: '19:45', event: '창고에서 사다리 가져옴', participants: ['char-failed-student'], location: '창고', importance: 'major', isRevealed: false },
      { time: '20:00', event: '사다리로 과학실 침입', participants: ['char-failed-student'], location: '과학실', importance: 'critical', isRevealed: false },
      { time: '20:10', event: '실험 장비 파손', participants: ['char-failed-student'], location: '과학실', importance: 'critical', isRevealed: false },
      { time: '20:15', event: '관리인, 유리 깨지는 소리 듣고 이동', participants: ['char-janitor-night'], location: '관리실', importance: 'major', isRevealed: false },
      { time: '20:20', event: '이재훈, 현장 이탈', participants: ['char-failed-student'], location: '학교', importance: 'major', isRevealed: false },
      { time: '다음날 07:00', event: '파손 발견 및 신고', participants: ['char-science-teacher'], location: '과학실', importance: 'major', isRevealed: true }
    ],

    solution: {
      summary: '이재훈이 과학 대회 참가 자격 박탈에 분노하여 실험 장비를 파손했다.',
      detailedExplanation: [
        '이재훈은 과학에 재능이 있었지만 성적 미달로 대회 참가 자격을 잃었다.',
        '과학이 자신의 유일한 강점이라고 생각했기에 큰 충격을 받았다.',
        '자신이 참가할 수 없다면 아무도 참가하지 못하게 하려고 계획했다.',
        '밤에 창고에서 사다리를 가져와 과학실 창문으로 침입했다.',
        '500만원 상당의 실험 장비를 모두 파손했다.',
        '친구에게 "모두 후회하게 될 거야"라는 문자를 보냈다.'
      ],
      keyEvidence: ['evidence-ladder', 'evidence-window', 'evidence-disqualification', 'evidence-message'],
      howToSolve: [
        '침입 경로 파악 (사다리와 창문)',
        '동기 확인 (자격 박탈)',
        '협박 문자 발견',
        '사다리 지문 분석'
      ],
      commonMistakes: [
        '경쟁자를 의심하는 것',
        '외부인의 소행으로 단정짓는 것'
      ]
    },

    deductionKeywords: {
      who: ['이재훈', '과학반', '학생'],
      why: ['복수', '자격 박탈', '분노', '질투'],
      how: ['사다리', '침입', '파손'],
      when: ['밤', '20:00', '8시'],
      where: ['과학실', '2층', '창문']
    },

    tags: ['과학', '대회', '복수', '침입', '파손'],
    author: 'DEDUCTIO',
    version: '1.0'
  },

  // ========================================
  // 시나리오 #7: 음악실 피아노 손상
  // ========================================
  {
    id: 'vandalism-007',
    title: '음악실 피아노 손상',
    subtitle: '그랜드 피아노 건반에 접착제가',
    type: 'vandalism',
    difficulty: 'medium',
    estimatedTime: 20,

    prologue: [
      '학교의 자랑인 그랜드 피아노.',
      '음악 발표회를 일주일 앞둔 시점에',
      '피아노 건반에 강력 접착제가 발라졌다.'
    ],
    introduction: [
      '음악 교사의 당황한 목소리가 들립니다.',
      '"건반이... 안 눌러져요!"',
      '누군가 피아노를 고의로 망가뜨렸습니다.'
    ],
    setting: '청운고등학교 음악실',

    crimeTime: '16:30',
    crimeLocation: '음악실',
    culpritId: 'char-stage-fright',
    motive: '발표회 공포증으로 인한 회피',
    motiveDetail: '피아노 독주자로 선정된 서윤아는 무대 공포증이 있었다. 발표회가 다가오자 불안감이 극심해졌고, 발표회를 취소시키기 위해 피아노를 고의로 손상시켰다.',
    method: '방과 후 홀로 남아 건반에 강력 접착제 도포',
    methodDetail: '서윤아는 연습한다는 핑계로 음악실에 남았고, 아무도 없을 때 가져온 접착제로 건반을 붙였다.',

    characters: [
      {
        id: 'char-stage-fright',
        name: '서윤아',
        role: 'culprit',
        age: 17,
        gender: 'female',
        occupation: '합창부 / 2학년',
        personality: '소심하고 불안감이 많음',
        appearance: '긴 머리, 항상 긴장한 표정',
        background: '피아노 실력은 뛰어나지만 심한 무대 공포증이 있다.',
        alibi: {
          location: '음악실',
          time: '16:30',
          activity: '피아노 연습 중이었다고 주장',
          witnesses: [],
          hasHole: true,
          holeDetail: '혼자 연습했다고 하지만 확인할 사람이 없음'
        },
        motive: {
          type: 'fear',
          description: '무대 공포증으로 발표회를 회피하려 함',
          strength: 2
        },
        relationships: [
          { targetId: 'char-music-teacher', type: '학생-교사', description: '독주자로 선정받음' }
        ],
        secrets: [
          {
            id: 'secret-stage-1',
            content: '과거 무대에서 실수한 후 트라우마가 생겼다',
            importance: 'critical',
            revealCondition: '심리 상담 기록 조회 시'
          }
        ],
        dialogues: [
          {
            topic: '발표회',
            lines: ['발표회요? 저... 잘 모르겠어요.', '너무 떨려서...']
          }
        ],
        nervousTriggers: ['발표회', '무대', '독주', '피아노']
      },
      {
        id: 'char-music-teacher',
        name: '이소연',
        role: 'witness',
        age: 38,
        gender: 'female',
        occupation: '음악 교사',
        personality: '열정적이고 학생들을 독려함',
        appearance: '우아한 옷차림',
        background: '음악 발표회 총괄. 서윤아의 재능을 높이 평가함.',
        alibi: {
          location: '교무실',
          time: '16:30',
          activity: '회의',
          witnesses: ['다른 교사들'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-stage-fright', type: '교사-학생', description: '윤아의 재능을 믿고 독주자로 선정함' }
        ],
        secrets: [],
        dialogues: [
          {
            topic: '서윤아',
            lines: ['윤아는 재능이 정말 뛰어나요.', '하지만 요즘 많이 불안해 보이더라고요.']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-rival-pianist',
        name: '김민지',
        role: 'suspect',
        age: 17,
        gender: 'female',
        occupation: '합창부 / 2학년',
        personality: '자신감 있고 경쟁적',
        appearance: '단발머리, 당당한 자세',
        background: '독주자 선발에서 서윤아에게 밀렸다.',
        alibi: {
          location: '학원',
          time: '16:30',
          activity: '피아노 학원',
          witnesses: ['학원 강사'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-stage-fright', type: '경쟁자', description: '독주자 자리를 놓고 경쟁' }
        ],
        secrets: [],
        dialogues: [
          {
            topic: '서윤아',
            lines: ['윤아는 실력은 있지만 멘탈이 약해요.', '무대에서 버틸 수 있을지 모르겠어요.']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-counselor',
        name: '박선미',
        role: 'witness',
        age: 45,
        gender: 'female',
        occupation: '상담 교사',
        personality: '따뜻하고 이해심이 많음',
        appearance: '부드러운 인상',
        background: '서윤아의 무대 공포증을 상담해왔다.',
        alibi: {
          location: '상담실',
          time: '16:30',
          activity: '학생 상담',
          witnesses: ['상담 학생'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-stage-fright', type: '상담교사', description: '윤아의 공포증을 알고 있음' }
        ],
        secrets: [],
        dialogues: [
          {
            topic: '서윤아',
            lines: ['윤아는 무대 공포증이 심해요.', '발표회 압박이 너무 클까봐 걱정했어요.']
          }
        ],
        nervousTriggers: []
      }
    ],

    evidence: [
      {
        id: 'evidence-glue',
        name: '강력 접착제',
        type: 'physical',
        description: '음악실 쓰레기통에서 발견된 접착제 튜브',
        detailedDescription: '거의 다 사용된 강력 접착제. 건반에 묻은 접착제와 동일.',
        location: '음악실',
        foundAt: '쓰레기통',
        linkedCharacters: ['char-stage-fright'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: true,
        analysisResult: '지문이 검출됨. 서윤아의 것으로 확인됨.'
      },
      {
        id: 'evidence-receipt',
        name: '접착제 구매 영수증',
        type: 'document',
        description: '문구점 영수증',
        detailedDescription: '어제 서윤아가 강력 접착제를 구매한 기록.',
        location: '서윤아 가방',
        foundAt: '가방 안',
        linkedCharacters: ['char-stage-fright'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-counseling',
        name: '상담 기록',
        type: 'document',
        description: '서윤아의 심리 상담 기록',
        detailedDescription: '무대 공포증과 발표회에 대한 극심한 불안이 기록되어 있음.',
        location: '상담실',
        foundAt: '상담 기록부',
        linkedCharacters: ['char-stage-fright', 'char-counselor'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      },
      {
        id: 'evidence-practice-log',
        name: '연습실 사용 기록',
        type: 'document',
        description: '음악실 사용 기록부',
        detailedDescription: '서윤아가 사건 시간에 음악실에 있었다는 기록.',
        location: '음악실',
        foundAt: '출입 기록부',
        linkedCharacters: ['char-stage-fright'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-diary',
        name: '서윤아 일기',
        type: 'document',
        description: '서윤아의 일기장',
        detailedDescription: '"발표회만 없어진다면..." 같은 내용이 반복적으로 적혀있음.',
        location: '서윤아 사물함',
        foundAt: '사물함',
        linkedCharacters: ['char-stage-fright'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-cctv',
        name: 'CCTV 영상',
        type: 'digital',
        description: '음악실 복도 CCTV',
        detailedDescription: '서윤아가 혼자 음악실에 들어갔다 나오는 모습.',
        location: '경비실',
        foundAt: 'CCTV 서버',
        linkedCharacters: ['char-stage-fright'],
        isCritical: false,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      }
    ],

    locations: [
      {
        id: 'loc-music-room',
        name: '음악실',
        description: '그랜드 피아노가 있는 음악 교실',
        atmosphere: '아름다운 공간이지만 피아노가 손상되어 충격적',
        objects: [
          {
            id: 'obj-piano',
            name: '그랜드 피아노',
            description: '학교의 자랑인 그랜드 피아노',
            examinationResult: '건반에 접착제가 발라져 있음.',
            containsEvidence: 'evidence-glue'
          },
          {
            id: 'obj-trash',
            name: '쓰레기통',
            description: '음악실 쓰레기통',
            examinationResult: '접착제 튜브가 버려져 있음.',
            containsEvidence: 'evidence-glue'
          }
        ],
        connectedTo: ['loc-hallway-music']
      },
      {
        id: 'loc-hallway-music',
        name: '음악실 복도',
        description: '음악실이 있는 복도',
        atmosphere: '조용하고 한산함',
        objects: [],
        connectedTo: ['loc-music-room', 'loc-counseling']
      },
      {
        id: 'loc-counseling',
        name: '상담실',
        description: '심리 상담이 이루어지는 공간',
        atmosphere: '따뜻하고 편안한 분위기',
        objects: [
          {
            id: 'obj-records',
            name: '상담 기록부',
            description: '학생들의 상담 기록',
            examinationResult: '서윤아의 무대 공포증 기록 발견.',
            containsEvidence: 'evidence-counseling'
          }
        ],
        connectedTo: ['loc-hallway-music']
      },
      {
        id: 'loc-locker-area',
        name: '사물함 구역',
        description: '학생 사물함',
        atmosphere: '복도 한쪽에 줄지어 있음',
        objects: [
          {
            id: 'obj-locker',
            name: '서윤아 사물함',
            description: '2학년 사물함',
            examinationResult: '일기장 발견.',
            containsEvidence: 'evidence-diary'
          }
        ],
        connectedTo: []
      }
    ],

    timeline: [
      { time: '15:00', event: '서윤아, 문구점에서 접착제 구매', participants: ['char-stage-fright'], location: '문구점', importance: 'major', isRevealed: false },
      { time: '16:00', event: '음악실 입장 (연습 명목)', participants: ['char-stage-fright'], location: '음악실', importance: 'major', isRevealed: false },
      { time: '16:30', event: '피아노 건반에 접착제 도포', participants: ['char-stage-fright'], location: '음악실', importance: 'critical', isRevealed: false },
      { time: '16:50', event: '접착제 버리고 퇴실', participants: ['char-stage-fright'], location: '음악실', importance: 'major', isRevealed: false },
      { time: '다음날 09:00', event: '피아노 손상 발견', participants: ['char-music-teacher'], location: '음악실', importance: 'major', isRevealed: true }
    ],

    solution: {
      summary: '서윤아가 무대 공포증으로 인한 발표회 회피를 위해 피아노를 손상시켰다.',
      detailedExplanation: [
        '서윤아는 피아노 실력은 뛰어나지만 심한 무대 공포증이 있었다.',
        '독주자로 선정되자 극심한 불안에 시달렸다.',
        '발표회만 취소된다면 무대에 서지 않아도 된다고 생각했다.',
        '문구점에서 강력 접착제를 구매했다.',
        '연습한다는 핑계로 음악실에 남아 건반에 접착제를 발랐다.',
        '발표회가 취소되기를 바랐다.'
      ],
      keyEvidence: ['evidence-glue', 'evidence-counseling', 'evidence-diary', 'evidence-receipt'],
      howToSolve: [
        '상담 기록에서 무대 공포증 확인',
        '일기장에서 발표회 회피 욕구 파악',
        '접착제 구매 영수증 발견',
        '지문 분석'
      ],
      commonMistakes: [
        '경쟁자를 의심하는 것',
        '단순 장난으로 치부하는 것'
      ]
    },

    deductionKeywords: {
      who: ['서윤아', '합창부', '독주자'],
      why: ['공포증', '회피', '불안', '무대'],
      how: ['접착제', '건반', '훼손'],
      when: ['방과 후', '16:30', '4시 반'],
      where: ['음악실', '피아노', '건반']
    },

    tags: ['공포증', '회피', '피아노', '발표회', '심리'],
    author: 'DEDUCTIO',
    version: '1.0'
  },

  // ========================================
  // 시나리오 #8: 학교 화단 파괴
  // ========================================
  {
    id: 'vandalism-008',
    title: '학교 화단 파괴',
    subtitle: '원예부가 가꾼 화단이 짓밟혔다',
    type: 'vandalism',
    difficulty: 'easy',
    estimatedTime: 15,

    prologue: [
      '원예부 학생들이 6개월간 정성껏 가꾼 화단.',
      '학교 축제를 앞두고 만개한 꽃들이',
      '모두 짓밟혀 파괴되었다.'
    ],
    introduction: [
      '원예부 학생들의 울음소리가 들립니다.',
      '"우리가 6개월 동안 키운 꽃들이..."',
      '누군가 고의로 화단을 망가뜨렸습니다.'
    ],
    setting: '청운고등학교 중정 화단',

    crimeTime: '토요일 14:00',
    crimeLocation: '중정 화단',
    culpritId: 'char-soccer-player',
    motive: '축구 연습 공간 확보를 위한 불만',
    motiveDetail: '축구부 주장 정우진은 학교가 운동장 일부를 화단으로 바꾸는 것에 불만이 많았다. 축구 연습 공간이 줄어든 것에 분노하여 화단을 파괴했다.',
    method: '토요일에 축구화를 신고 화단을 짓밟음',
    methodDetail: '정우진은 토요일 연습 후 화가 난 상태로 화단을 축구화로 짓밟고 삽으로 꽃을 뽑아냈다.',

    characters: [
      {
        id: 'char-soccer-player',
        name: '정우진',
        role: 'culprit',
        age: 18,
        gender: 'male',
        occupation: '축구부 주장 / 3학년',
        personality: '열정적이지만 충동적',
        appearance: '건장한 체격, 운동복',
        background: '축구부 주장. 화단 조성으로 연습 공간이 줄어든 것에 불만.',
        alibi: {
          location: '집',
          time: '토요일 14:00',
          activity: '집에서 쉬고 있었다고 주장',
          witnesses: [],
          hasHole: true,
          holeDetail: '가족들이 외출 중이었음'
        },
        motive: {
          type: 'revenge',
          description: '연습 공간 감소에 대한 불만',
          strength: 2
        },
        relationships: [
          { targetId: 'char-garden-leader', type: '대립', description: '화단 조성을 반대했음' }
        ],
        secrets: [
          {
            id: 'secret-soccer-1',
            content: '학교 회의에서 화단 조성을 강하게 반대했다',
            importance: 'major',
            revealCondition: '회의록 조사 시'
          }
        ],
        dialogues: [
          {
            topic: '화단',
            lines: ['그 화단 때문에 우리 연습 공간이 줄었어요.', '축구부보다 꽃이 중요한가요?']
          }
        ],
        nervousTriggers: ['화단', '운동장', '공간', '축구']
      },
      {
        id: 'char-garden-leader',
        name: '한채원',
        role: 'suspect',
        age: 17,
        gender: 'female',
        occupation: '원예부 부장 / 2학년',
        personality: '온화하고 인내심이 강함',
        appearance: '단정한 외모, 원예용 장갑',
        background: '원예부 부장. 화단 프로젝트를 주도했다.',
        alibi: {
          location: '집',
          time: '토요일 14:00',
          activity: '가족과 외출',
          witnesses: ['가족'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-soccer-player', type: '대립', description: '축구부의 반대에도 화단을 추진함' }
        ],
        secrets: [],
        dialogues: [
          {
            topic: '정우진',
            lines: ['우진씨는 화단을 탐탁지 않게 여겼어요.', '하지만 이럴 줄은...']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-security-weekend',
        name: '오상훈',
        role: 'witness',
        age: 48,
        gender: 'male',
        occupation: '주말 경비원',
        personality: '성실하고 꼼꼼함',
        appearance: '경비 유니폼',
        background: '주말 근무 경비원.',
        alibi: {
          location: '경비실',
          time: '토요일 14:00',
          activity: '순찰 중',
          witnesses: [],
          hasHole: false
        },
        relationships: [],
        secrets: [],
        dialogues: [
          {
            topic: '목격',
            lines: ['2시쯤 운동복 입은 학생이 화단 쪽으로 가는 걸 봤어요.', '축구부 같았는데...']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-garden-member',
        name: '이지우',
        role: 'witness',
        age: 16,
        gender: 'male',
        occupation: '원예부 부원 / 1학년',
        personality: '순수하고 열정적',
        appearance: '왜소한 체격',
        background: '원예부 신입 부원. 화단을 매우 아꼈다.',
        alibi: {
          location: '학원',
          time: '토요일 14:00',
          activity: '수학 학원',
          witnesses: ['학원 강사'],
          hasHole: false
        },
        relationships: [],
        secrets: [],
        dialogues: [
          {
            topic: '화단',
            lines: ['6개월 동안 매일 물 주고 돌봤어요.', '너무 슬퍼요...']
          }
        ],
        nervousTriggers: []
      }
    ],

    evidence: [
      {
        id: 'evidence-shoe-prints',
        name: '축구화 자국',
        type: 'physical',
        description: '화단에 남은 축구화 발자국',
        detailedDescription: '스터드가 있는 축구화 자국이 화단 전체에 있음.',
        location: '중정 화단',
        foundAt: '화단',
        linkedCharacters: ['char-soccer-player'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: true,
        analysisResult: '280mm 사이즈, 정우진의 축구화와 일치.'
      },
      {
        id: 'evidence-shovel',
        name: '원예용 삽',
        type: 'physical',
        description: '화단 옆에 버려진 삽',
        detailedDescription: '원예부 창고의 삽. 지문이 묻어있음.',
        location: '중정 화단',
        foundAt: '화단 옆',
        linkedCharacters: ['char-soccer-player'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: true,
        analysisResult: '정우진의 지문 검출.'
      },
      {
        id: 'evidence-cctv',
        name: 'CCTV 영상',
        type: 'digital',
        description: '중정 CCTV 녹화 영상',
        detailedDescription: '14시경 정우진이 화단으로 다가가는 모습이 포착됨.',
        location: '경비실',
        foundAt: 'CCTV 서버',
        linkedCharacters: ['char-soccer-player'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-meeting-record',
        name: '학교 회의록',
        type: 'document',
        description: '화단 조성 회의 기록',
        detailedDescription: '정우진이 화단 조성을 강하게 반대했다는 내용.',
        location: '행정실',
        foundAt: '회의록',
        linkedCharacters: ['char-soccer-player', 'char-garden-leader'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-soil',
        name: '흙 묻은 축구화',
        type: 'physical',
        description: '정우진 사물함의 축구화',
        detailedDescription: '화단의 흙과 동일한 성분이 묻어있음.',
        location: '사물함',
        foundAt: '정우진 사물함',
        linkedCharacters: ['char-soccer-player'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: true,
        analysisResult: '화단의 흙 성분과 일치.'
      }
    ],

    locations: [
      {
        id: 'loc-garden',
        name: '중정 화단',
        description: '원예부가 가꾼 아름다운 화단',
        atmosphere: '짓밟힌 꽃들과 파헤쳐진 흙으로 참혹함',
        objects: [
          {
            id: 'obj-flowers',
            name: '파괴된 꽃들',
            description: '짓밟히고 뽑힌 꽃들',
            examinationResult: '축구화 자국이 선명함.',
            containsEvidence: 'evidence-shoe-prints'
          },
          {
            id: 'obj-shovel',
            name: '버려진 삽',
            description: '원예용 삽',
            examinationResult: '지문이 묻어있음.',
            containsEvidence: 'evidence-shovel'
          }
        ],
        connectedTo: ['loc-courtyard']
      },
      {
        id: 'loc-courtyard',
        name: '중정',
        description: '학교 중앙 정원',
        atmosphere: '평화롭던 공간이 어수선함',
        objects: [],
        connectedTo: ['loc-garden', 'loc-storage']
      },
      {
        id: 'loc-storage',
        name: '원예부 창고',
        description: '원예 도구 보관 창고',
        atmosphere: '삽 하나가 없어진 상태',
        objects: [
          {
            id: 'obj-tools',
            name: '원예 도구들',
            description: '각종 원예 도구',
            examinationResult: '삽 하나가 없어짐.',
            containsEvidence: ''
          }
        ],
        connectedTo: ['loc-courtyard']
      },
      {
        id: 'loc-locker',
        name: '사물함 구역',
        description: '학생 사물함',
        atmosphere: '복도에 줄지어 있음',
        objects: [
          {
            id: 'obj-locker-woojin',
            name: '정우진 사물함',
            description: '3학년 사물함',
            examinationResult: '흙 묻은 축구화 발견.',
            containsEvidence: 'evidence-soil'
          }
        ],
        connectedTo: []
      }
    ],

    timeline: [
      { time: '13:00', event: '정우진, 축구 연습 종료', participants: ['char-soccer-player'], location: '운동장', importance: 'major', isRevealed: false },
      { time: '13:30', event: '원예부 창고에서 삽 가져옴', participants: ['char-soccer-player'], location: '원예부 창고', importance: 'major', isRevealed: false },
      { time: '14:00', event: '화단 파괴', participants: ['char-soccer-player'], location: '중정 화단', importance: 'critical', isRevealed: false },
      { time: '14:20', event: '삽 버리고 현장 이탈', participants: ['char-soccer-player'], location: '중정 화단', importance: 'major', isRevealed: false },
      { time: '월요일 07:30', event: '파괴 발견 및 신고', participants: ['char-garden-leader'], location: '중정 화단', importance: 'major', isRevealed: true }
    ],

    solution: {
      summary: '정우진이 화단 조성으로 축구 연습 공간이 줄어든 것에 분노하여 화단을 파괴했다.',
      detailedExplanation: [
        '학교가 운동장 일부를 화단으로 바꾸면서 축구부 연습 공간이 줄었다.',
        '정우진은 학교 회의에서 화단 조성을 강하게 반대했지만 받아들여지지 않았다.',
        '축구 연습보다 꽃이 중요하다는 것에 분노했다.',
        '토요일 연습 후 화가 난 상태로 화단으로 갔다.',
        '원예부 창고에서 삽을 가져와 꽃을 뽑고 축구화로 짓밟았다.',
        '삽을 버리고 도주했다.'
      ],
      keyEvidence: ['evidence-shoe-prints', 'evidence-shovel', 'evidence-cctv', 'evidence-meeting-record'],
      howToSolve: [
        '축구화 자국 확인',
        '삽의 지문 분석',
        'CCTV로 범인 확인',
        '회의록에서 동기 파악'
      ],
      commonMistakes: [
        '원예부 내부 갈등으로 보는 것',
        '외부인의 소행으로 단정짓는 것'
      ]
    },

    deductionKeywords: {
      who: ['정우진', '축구부', '주장'],
      why: ['불만', '공간', '운동장', '복수'],
      how: ['짓밟기', '삽', '축구화'],
      when: ['토요일', '14:00', '2시'],
      where: ['중정', '화단', '정원']
    },

    tags: ['축구', '화단', '공간 갈등', '원예', '파괴'],
    author: 'DEDUCTIO',
    version: '1.0'
  },

  // ========================================
  // 시나리오 #9: 체육관 바닥 스크래치
  // ========================================
  {
    id: 'vandalism-009',
    title: '체육관 바닥 스크래치',
    subtitle: '새로 시공한 체육관 바닥에 깊은 상처',
    type: 'vandalism',
    difficulty: 'medium',
    estimatedTime: 20,

    prologue: [
      '1000만원을 들여 새로 시공한 체육관 바닥.',
      '농구 대회를 앞두고 완성된 이 바닥에',
      '날카로운 도구로 긁은 듯한 스크래치가 생겼다.'
    ],
    introduction: [
      '체육 교사의 분노한 목소리가 들립니다.',
      '"이게 무슨 짓이야!"',
      '체육관 바닥에 깊은 스크래치가 여러 개 있습니다.'
    ],
    setting: '청운고등학교 체육관',

    crimeTime: '일요일 19:00',
    crimeLocation: '체육관',
    culpritId: 'char-janitor-son',
    motive: '아버지(관리인) 해고에 대한 복수',
    motiveDetail: '관리인의 아들 김태양은 아버지가 체육관 관리 부실로 해고당한 것에 분노했다. 새 바닥 시공은 아버지를 해고하기 위한 핑계였다고 생각하여 바닥을 훼손했다.',
    method: '일요일 밤 침입하여 못과 칼로 바닥 긁음',
    methodDetail: '김태양은 아버지가 가지고 있던 체육관 열쇠를 몰래 사용해 침입했다. 날카로운 못으로 바닥을 긁어 스크래치를 냈다.',

    characters: [
      {
        id: 'char-janitor-son',
        name: '김태양',
        role: 'culprit',
        age: 18,
        gender: 'male',
        occupation: '전학생 / 3학년',
        personality: '가족을 위해서라면 무엇이든 하는 성격',
        appearance: '건장한 체격, 어두운 표정',
        background: '최근 전학 온 학생. 아버지가 학교 관리인이었지만 해고당했다.',
        alibi: {
          location: '집',
          time: '일요일 19:00',
          activity: '집에서 공부했다고 주장',
          witnesses: [],
          hasHole: true,
          holeDetail: '아버지가 외출 중이었고 확인 불가'
        },
        motive: {
          type: 'revenge',
          description: '아버지 해고에 대한 복수',
          strength: 3
        },
        relationships: [
          { targetId: 'char-pe-teacher', type: '학생-교사', description: '아버지를 해고시킨 교사에 대한 원한' }
        ],
        secrets: [
          {
            id: 'secret-son-1',
            content: '아버지의 체육관 열쇠를 몰래 가지고 있었다',
            importance: 'critical',
            revealCondition: '소지품 조사 시'
          }
        ],
        dialogues: [
          {
            topic: '아버지',
            lines: ['우리 아버지는 30년 동안 성실하게 일했어요.', '학교가 아버지를 버렸어요.']
          }
        ],
        nervousTriggers: ['체육관', '해고', '아버지', '바닥']
      },
      {
        id: 'char-pe-teacher',
        name: '조민호',
        role: 'witness',
        age: 45,
        gender: 'male',
        occupation: '체육 교사',
        personality: '원칙적이고 엄격함',
        appearance: '운동복, 호루라기',
        background: '체육관 관리 책임자. 전 관리인의 해고를 건의했다.',
        alibi: {
          location: '집',
          time: '일요일 19:00',
          activity: '가족과 저녁 식사',
          witnesses: ['가족'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-janitor-son', type: '교사-학생', description: '태양의 아버지를 해고시킴' }
        ],
        secrets: [],
        dialogues: [
          {
            topic: '해고',
            lines: ['전 관리인은 체육관 관리를 제대로 하지 않았어요.', '새 바닥 시공이 필요했고 책임을 물었습니다.']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-fired-janitor',
        name: '김철수',
        role: 'suspect',
        age: 55,
        gender: 'male',
        occupation: '전 관리인',
        personality: '성실하지만 자존심이 상한 상태',
        appearance: '피곤한 표정, 작업복',
        background: '30년간 학교 관리인으로 일했지만 최근 해고당했다.',
        alibi: {
          location: '친구 집',
          time: '일요일 19:00',
          activity: '친구와 술자리',
          witnesses: ['친구'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-janitor-son', type: '부자', description: '아들 김태양' },
          { targetId: 'char-pe-teacher', type: '적대', description: '해고를 건의한 교사' }
        ],
        secrets: [],
        dialogues: [
          {
            topic: '해고',
            lines: ['30년을 일했는데... 이렇게 쫓겨나다니.', '정말 억울해요.']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-classmate-witness',
        name: '박현우',
        role: 'witness',
        age: 18,
        gender: 'male',
        occupation: '학생 / 3학년',
        personality: '관찰력이 좋음',
        appearance: '안경 착용',
        background: '김태양과 같은 반. 최근 태양이 힘들어하는 것을 알고 있었다.',
        alibi: {
          location: '학원',
          time: '일요일 19:00',
          activity: '수학 학원',
          witnesses: ['학원 강사'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-janitor-son', type: '반 친구', description: '같은 반' }
        ],
        secrets: [
          {
            id: 'secret-witness-1',
            content: '김태양이 학교와 교사들에 대해 불만을 토로한 적이 있다',
            importance: 'major',
            revealCondition: '친구 관계 조사 시'
          }
        ],
        dialogues: [
          {
            topic: '김태양',
            lines: ['태양이는 아버지 일로 많이 힘들어했어요.', '학교를 원망하는 것 같았어요.']
          }
        ],
        nervousTriggers: []
      }
    ],

    evidence: [
      {
        id: 'evidence-scratch-marks',
        name: '바닥 스크래치',
        type: 'physical',
        description: '체육관 바닥의 깊은 스크래치',
        detailedDescription: '날카로운 못이나 칼로 긁은 듯한 흔적. 여러 개의 선이 교차함.',
        location: '체육관',
        foundAt: '체육관 바닥',
        linkedCharacters: ['char-janitor-son'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: true,
        analysisResult: '날카로운 금속 도구로 인한 손상.'
      },
      {
        id: 'evidence-key',
        name: '체육관 열쇠',
        type: 'physical',
        description: '김태양이 가지고 있던 열쇠',
        detailedDescription: '아버지가 사용하던 체육관 열쇠. 반납했어야 하지만 복사본을 가지고 있었음.',
        location: '김태양 집',
        foundAt: '가방 안',
        linkedCharacters: ['char-janitor-son', 'char-fired-janitor'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      },
      {
        id: 'evidence-nail',
        name: '날카로운 못',
        type: 'physical',
        description: '체육관 근처에서 발견된 못',
        detailedDescription: '끝이 날카로운 못. 바닥 스크래치와 일치하는 흔적.',
        location: '체육관',
        foundAt: '쓰레기통',
        linkedCharacters: ['char-janitor-son'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: true,
        analysisResult: '김태양의 지문 검출.'
      },
      {
        id: 'evidence-cctv',
        name: 'CCTV 영상',
        type: 'digital',
        description: '체육관 입구 CCTV',
        detailedDescription: '19시경 후드를 쓴 인물이 체육관에 들어가는 모습.',
        location: '경비실',
        foundAt: 'CCTV 서버',
        linkedCharacters: ['char-janitor-son'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: true,
        analysisResult: '체격과 걸음걸이가 김태양과 유사함.'
      },
      {
        id: 'evidence-dismissal',
        name: '해고 통지서',
        type: 'document',
        description: '김철수 관리인 해고 문서',
        detailedDescription: '체육관 관리 부실을 이유로 한 해고 통지서.',
        location: '행정실',
        foundAt: '인사 기록',
        linkedCharacters: ['char-fired-janitor', 'char-pe-teacher'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-diary',
        name: '김태양 일기',
        type: 'document',
        description: '김태양의 개인 일기',
        detailedDescription: '아버지 해고에 대한 분노와 복수 계획이 적혀있음.',
        location: '김태양 집',
        foundAt: '책상 서랍',
        linkedCharacters: ['char-janitor-son'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      }
    ],

    locations: [
      {
        id: 'loc-gym',
        name: '체육관',
        description: '새로 시공한 바닥이 있는 체육관',
        atmosphere: '새 바닥이 훼손되어 충격적',
        objects: [
          {
            id: 'obj-floor',
            name: '체육관 바닥',
            description: '새로 시공한 고급 바닥재',
            examinationResult: '깊은 스크래치가 여러 개 있음.',
            containsEvidence: 'evidence-scratch-marks'
          },
          {
            id: 'obj-trash',
            name: '쓰레기통',
            description: '체육관 쓰레기통',
            examinationResult: '날카로운 못이 버려져 있음.',
            containsEvidence: 'evidence-nail'
          }
        ],
        connectedTo: ['loc-gym-entrance']
      },
      {
        id: 'loc-gym-entrance',
        name: '체육관 입구',
        description: '체육관으로 들어가는 입구',
        atmosphere: 'CCTV가 설치되어 있음',
        objects: [],
        connectedTo: ['loc-gym']
      },
      {
        id: 'loc-taeyang-home',
        name: '김태양 집',
        description: '김태양의 집',
        atmosphere: '아버지와 단둘이 사는 집',
        objects: [
          {
            id: 'obj-desk',
            name: '책상',
            description: '김태양의 책상',
            examinationResult: '일기장과 열쇠 발견.',
            containsEvidence: 'evidence-diary'
          }
        ],
        connectedTo: []
      },
      {
        id: 'loc-admin',
        name: '행정실',
        description: '인사 기록 보관 장소',
        atmosphere: '서류로 가득함',
        objects: [
          {
            id: 'obj-files',
            name: '인사 기록',
            description: '직원 인사 기록',
            examinationResult: '김철수 해고 통지서 발견.',
            containsEvidence: 'evidence-dismissal'
          }
        ],
        connectedTo: []
      }
    ],

    timeline: [
      { time: '18:30', event: '김태양, 집에서 못과 열쇠 준비', participants: ['char-janitor-son'], location: '김태양 집', importance: 'major', isRevealed: false },
      { time: '18:50', event: '학교 도착', participants: ['char-janitor-son'], location: '학교', importance: 'major', isRevealed: false },
      { time: '19:00', event: '체육관 침입', participants: ['char-janitor-son'], location: '체육관', importance: 'critical', isRevealed: false },
      { time: '19:15', event: '바닥 스크래치 훼손', participants: ['char-janitor-son'], location: '체육관', importance: 'critical', isRevealed: false },
      { time: '19:35', event: '못 버리고 현장 이탈', participants: ['char-janitor-son'], location: '체육관', importance: 'major', isRevealed: false },
      { time: '월요일 06:00', event: '훼손 발견 및 신고', participants: ['char-pe-teacher'], location: '체육관', importance: 'major', isRevealed: true }
    ],

    solution: {
      summary: '김태양이 아버지의 해고에 분노하여 새로 시공한 체육관 바닥을 훼손했다.',
      detailedExplanation: [
        '김철수는 30년간 학교 관리인으로 성실히 일했다.',
        '체육관 관리 부실을 이유로 해고당했다.',
        '아들 김태양은 아버지 해고가 부당하다고 생각했다.',
        '새 바닥 시공은 아버지를 해고하기 위한 핑계라고 여겼다.',
        '아버지가 사용하던 체육관 열쇠를 몰래 가지고 있었다.',
        '일요일 밤 체육관에 침입해 못으로 바닥을 긁었다.',
        '학교에 복수하고자 했다.'
      ],
      keyEvidence: ['evidence-key', 'evidence-nail', 'evidence-diary', 'evidence-dismissal'],
      howToSolve: [
        '침입 방법 파악 (열쇠)',
        '동기 확인 (아버지 해고)',
        '일기장에서 복수 계획 발견',
        'CCTV와 못의 지문 분석'
      ],
      commonMistakes: [
        '아버지를 범인으로 의심하는 것',
        '외부인의 소행으로 단정짓는 것'
      ]
    },

    deductionKeywords: {
      who: ['김태양', '학생', '아들'],
      why: ['복수', '해고', '아버지', '분노'],
      how: ['못', '스크래치', '열쇠'],
      when: ['일요일 밤', '19:00', '7시'],
      where: ['체육관', '바닥', '입구']
    },

    tags: ['가족', '해고', '복수', '체육관', '훼손'],
    author: 'DEDUCTIO',
    version: '1.0'
  },

  // ========================================
  // 시나리오 #10: 도서관 책 훼손
  // ========================================
  {
    id: 'vandalism-010',
    title: '도서관 책 훼손',
    subtitle: '희귀 도서들이 찢어지고 낙서됐다',
    type: 'vandalism',
    difficulty: 'hard',
    estimatedTime: 25,

    prologue: [
      '학교 도서관의 자랑인 희귀 도서 컬렉션.',
      '총 20권의 귀중한 책들이',
      '찢어지고 낙서된 채 발견되었다.'
    ],
    introduction: [
      '사서 선생님의 충격적인 목소리가 들립니다.',
      '"이럴 수가... 복원이 불가능해요!"',
      '수십 년 된 귀중한 책들이 모두 훼손되었습니다.'
    ],
    setting: '청운고등학교 도서관',

    crimeTime: '목요일 20:00',
    crimeLocation: '도서관 희귀본 서가',
    culpritId: 'char-librarian-assistant',
    motive: '사서 교사 자리 경쟁에서 밀린 원한',
    motiveDetail: '도서관 보조교사 한수민은 정식 사서 교사 채용에서 탈락했다. 현 사서가 자신보다 실력이 없다고 생각했지만, 희귀본 관리 능력 차이로 탈락한 것에 분노하여 희귀본을 훼손했다.',
    method: '근무 시간 이후 남아서 희귀본 찢고 낙서',
    methodDetail: '한수민은 도서관 열쇠를 가지고 있어 자유롭게 출입할 수 있었다. 근무 후 혼자 남아 희귀본들을 체계적으로 훼손했다.',

    characters: [
      {
        id: 'char-librarian-assistant',
        name: '한수민',
        role: 'culprit',
        age: 28,
        gender: 'female',
        occupation: '도서관 보조교사',
        personality: '완벽주의자, 자존심이 강함',
        appearance: '안경 착용, 단정한 복장',
        background: '문헌정보학 전공. 정식 사서 교사 채용에서 탈락했다.',
        alibi: {
          location: '집',
          time: '목요일 20:00',
          activity: '집에서 쉬고 있었다고 주장',
          witnesses: [],
          hasHole: true,
          holeDetail: '혼자 사는 집이라 확인 불가'
        },
        motive: {
          type: 'jealousy',
          description: '사서 교사 채용 탈락에 대한 질투와 복수',
          strength: 3
        },
        relationships: [
          { targetId: 'char-head-librarian', type: '동료', description: '현 사서에 대한 질투와 원한' }
        ],
        secrets: [
          {
            id: 'secret-assistant-1',
            content: '채용 탈락 후 현 사서에 대한 악의적인 글을 SNS에 올렸다',
            importance: 'major',
            revealCondition: 'SNS 조사 시'
          }
        ],
        dialogues: [
          {
            topic: '채용',
            lines: ['제가 더 자격이 있었어요.', '희귀본 관리가 뭐가 그렇게 중요한가요?']
          }
        ],
        nervousTriggers: ['채용', '희귀본', '사서', '탈락']
      },
      {
        id: 'char-head-librarian',
        name: '이은지',
        role: 'suspect',
        age: 32,
        gender: 'female',
        occupation: '사서 교사',
        personality: '전문적이고 책임감이 강함',
        appearance: '우아한 외모, 항상 책을 들고 다님',
        background: '희귀본 관리 전문가. 최근 정식 사서로 채용되었다.',
        alibi: {
          location: '서점',
          time: '목요일 20:00',
          activity: '신간 도서 구매',
          witnesses: ['서점 직원'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-librarian-assistant', type: '동료', description: '한수민과 채용 경쟁 관계였음' }
        ],
        secrets: [],
        dialogues: [
          {
            topic: '한수민',
            lines: ['수민씨는 실력이 있지만 희귀본 관리 경험이 부족했어요.', '요즘 관계가 좀 어색하긴 해요.']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-book-collector',
        name: '박지훈',
        role: 'witness',
        age: 17,
        gender: 'male',
        occupation: '도서부 부장 / 2학년',
        personality: '책을 사랑하는 조용한 성격',
        appearance: '안경, 항상 책 가방',
        background: '도서관을 자주 이용하며 희귀본에 관심이 많았다.',
        alibi: {
          location: '집',
          time: '목요일 20:00',
          activity: '독서',
          witnesses: ['부모'],
          hasHole: false
        },
        relationships: [],
        secrets: [
          {
            id: 'secret-collector-1',
            content: '최근 한수민이 희귀본 서가 앞에서 혼잣말을 하는 것을 봤다',
            importance: 'major',
            revealCondition: '세심한 질문 시'
          }
        ],
        dialogues: [
          {
            topic: '희귀본',
            lines: ['그 책들은 정말 귀중했어요.', '복원이 불가능하다니... 너무 슬퍼요.']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-security-lib',
        name: '정민수',
        role: 'witness',
        age: 50,
        gender: 'male',
        occupation: '야간 경비원',
        personality: '성실하고 관찰력이 좋음',
        appearance: '경비 유니폼',
        background: '10년째 야간 근무 중.',
        alibi: {
          location: '경비실',
          time: '목요일 20:00',
          activity: '순찰',
          witnesses: [],
          hasHole: false
        },
        relationships: [],
        secrets: [],
        dialogues: [
          {
            topic: '목격',
            lines: ['8시쯤 도서관에 불이 켜져 있었어요.', '근무 시간이 지났는데 이상하다고 생각했죠.']
          }
        ],
        nervousTriggers: []
      }
    ],

    evidence: [
      {
        id: 'evidence-torn-books',
        name: '찢어진 희귀본들',
        type: 'physical',
        description: '체계적으로 훼손된 20권의 책',
        detailedDescription: '페이지가 찢어지고 낙서가 되어있음. 특정 패턴이 있음.',
        location: '도서관',
        foundAt: '희귀본 서가',
        linkedCharacters: ['char-librarian-assistant'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: true,
        analysisResult: '모두 희귀본 목록에 있는 책들. 의도적 선별.'
      },
      {
        id: 'evidence-access-log',
        name: '도서관 출입 기록',
        type: 'digital',
        description: '전자 출입 기록',
        detailedDescription: '한수민이 20시에 도서관에 입장한 기록.',
        location: '행정실',
        foundAt: '출입 시스템',
        linkedCharacters: ['char-librarian-assistant'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-pen',
        name: '낙서에 사용된 펜',
        type: 'physical',
        description: '도서관 책상에서 발견된 빨간 펜',
        detailedDescription: '한수민이 평소 사용하던 펜. 잉크가 책의 낙서와 일치.',
        location: '도서관',
        foundAt: '한수민 책상',
        linkedCharacters: ['char-librarian-assistant'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: true,
        analysisResult: '지문과 잉크 분석 결과 일치.'
      },
      {
        id: 'evidence-sns',
        name: 'SNS 악의적 글',
        type: 'digital',
        description: '한수민의 SNS 비공개 계정',
        detailedDescription: '현 사서를 비난하고 희귀본 관리의 무의미함을 주장하는 글.',
        location: '온라인',
        foundAt: 'SNS 계정',
        linkedCharacters: ['char-librarian-assistant'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      },
      {
        id: 'evidence-rejection-letter',
        name: '채용 탈락 통지서',
        type: 'document',
        description: '한수민의 채용 탈락 문서',
        detailedDescription: '희귀본 관리 능력 부족을 이유로 탈락했다는 내용.',
        location: '행정실',
        foundAt: '인사 기록',
        linkedCharacters: ['char-librarian-assistant', 'char-head-librarian'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-cctv',
        name: 'CCTV 영상',
        type: 'digital',
        description: '도서관 내부 CCTV',
        detailedDescription: '한수민이 희귀본 서가 앞에서 활동하는 모습.',
        location: '경비실',
        foundAt: 'CCTV 서버',
        linkedCharacters: ['char-librarian-assistant'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      }
    ],

    locations: [
      {
        id: 'loc-library',
        name: '도서관',
        description: '학교 도서관',
        atmosphere: '훼손된 희귀본들로 충격적',
        objects: [
          {
            id: 'obj-rare-books',
            name: '희귀본 서가',
            description: '귀중한 책들이 보관된 서가',
            examinationResult: '20권의 책이 모두 훼손됨.',
            containsEvidence: 'evidence-torn-books'
          },
          {
            id: 'obj-desk',
            name: '한수민 책상',
            description: '보조교사 책상',
            examinationResult: '빨간 펜이 있음.',
            containsEvidence: 'evidence-pen'
          }
        ],
        connectedTo: ['loc-library-entrance']
      },
      {
        id: 'loc-library-entrance',
        name: '도서관 입구',
        description: '전자 출입 시스템이 있는 입구',
        atmosphere: '출입 기록이 남음',
        objects: [],
        connectedTo: ['loc-library']
      },
      {
        id: 'loc-admin-hr',
        name: '행정실 인사과',
        description: '인사 기록 보관',
        atmosphere: '서류로 가득함',
        objects: [
          {
            id: 'obj-hr-files',
            name: '인사 기록',
            description: '채용 관련 서류',
            examinationResult: '한수민 탈락 통지서 발견.',
            containsEvidence: 'evidence-rejection-letter'
          }
        ],
        connectedTo: []
      },
      {
        id: 'loc-online-sns',
        name: '온라인 공간',
        description: 'SNS 조사',
        atmosphere: '디지털 증거',
        objects: [
          {
            id: 'obj-sns-account',
            name: 'SNS 계정',
            description: '한수민의 비공개 계정',
            examinationResult: '악의적인 글들 발견.',
            containsEvidence: 'evidence-sns'
          }
        ],
        connectedTo: []
      }
    ],

    timeline: [
      { time: '19:00', event: '정규 근무 종료', participants: ['char-librarian-assistant', 'char-head-librarian'], location: '도서관', importance: 'minor', isRevealed: false },
      { time: '19:30', event: '이은지 퇴근', participants: ['char-head-librarian'], location: '도서관', importance: 'major', isRevealed: false },
      { time: '20:00', event: '한수민, 도서관 재입장', participants: ['char-librarian-assistant'], location: '도서관', importance: 'critical', isRevealed: false },
      { time: '20:10', event: '희귀본 훼손 시작', participants: ['char-librarian-assistant'], location: '도서관', importance: 'critical', isRevealed: false },
      { time: '21:30', event: '훼손 완료 후 퇴실', participants: ['char-librarian-assistant'], location: '도서관', importance: 'major', isRevealed: false },
      { time: '다음날 09:00', event: '훼손 발견 및 신고', participants: ['char-head-librarian'], location: '도서관', importance: 'major', isRevealed: true }
    ],

    solution: {
      summary: '한수민이 사서 교사 채용에서 탈락한 것에 대한 복수로 희귀본들을 훼손했다.',
      detailedExplanation: [
        '한수민은 문헌정보학 전공으로 사서 교사에 지원했다.',
        '희귀본 관리 능력 부족으로 탈락하고 이은지가 채용되었다.',
        '자신이 더 자격이 있다고 생각했지만 희귀본 때문에 떨어진 것에 분노했다.',
        'SNS에 현 사서를 비난하는 글을 올렸다.',
        '근무 후 도서관에 재입장하여 희귀본 20권을 체계적으로 훼손했다.',
        '희귀본이 중요하지 않다는 것을 증명하려 했다.'
      ],
      keyEvidence: ['evidence-access-log', 'evidence-pen', 'evidence-sns', 'evidence-rejection-letter'],
      howToSolve: [
        '출입 기록 확인',
        '채용 탈락 동기 파악',
        'SNS에서 악의적 감정 확인',
        'CCTV와 펜 분석'
      ],
      commonMistakes: [
        '현 사서를 의심하는 것',
        '학생의 소행으로 단정짓는 것'
      ]
    },

    deductionKeywords: {
      who: ['한수민', '보조교사', '탈락자'],
      why: ['질투', '탈락', '복수', '채용'],
      how: ['찢기', '낙서', '훼손'],
      when: ['밤', '20:00', '8시'],
      where: ['도서관', '희귀본', '서가']
    },

    tags: ['질투', '채용', '도서관', '희귀본', '복수'],
    author: 'DEDUCTIO',
    version: '1.0'
  },

  // ========================================
  // 시나리오 #11: 컴퓨터실 모니터 파손
  // ========================================
  {
    id: 'vandalism-011',
    title: '컴퓨터실 모니터 파손',
    subtitle: '30대의 새 모니터가 모두 깨졌다',
    type: 'vandalism',
    difficulty: 'medium',
    estimatedTime: 20,

    prologue: [
      '코딩 대회를 위해 새로 구입한 모니터 30대.',
      '총 2000만원 상당의 고급 모니터들이',
      '모두 화면이 깨진 채 발견되었다.'
    ],
    introduction: [
      '정보 교사의 절망적인 목소리가 들립니다.',
      '"내일이 대회인데... 이럴 수가!"',
      '컴퓨터실이 아수라장이 되었습니다.'
    ],
    setting: '청운고등학교 컴퓨터실',

    crimeTime: '금요일 18:00',
    crimeLocation: '컴퓨터실',
    culpritId: 'char-hacker-student',
    motive: '코딩 대회 출전 금지에 대한 복수',
    motiveDetail: '천재 해커 학생 최민혁은 과거 해킹 전력으로 대회 출전이 금지되었다. 실력으로는 우승할 자신이 있었지만 참가조차 못하게 된 것에 분노하여 대회 자체를 망치기로 결심했다.',
    method: '방과 후 컴퓨터실에 남아 망치로 모니터 파손',
    methodDetail: '최민혁은 컴퓨터실 청소 당번을 자원하여 늦게까지 남을 수 있었다. 공구실에서 망치를 가져와 모든 모니터를 체계적으로 파손했다.',

    characters: [
      {
        id: 'char-hacker-student',
        name: '최민혁',
        role: 'culprit',
        age: 17,
        gender: 'male',
        occupation: '컴퓨터 동아리 / 2학년',
        personality: '천재적이지만 반사회적',
        appearance: '후드 티, 헤드폰을 항상 착용',
        background: '해킹 실력이 뛰어나지만 과거 학교 시스템 해킹으로 징계를 받았다.',
        alibi: {
          location: '컴퓨터실',
          time: '금요일 18:00',
          activity: '청소 당번이었다고 주장',
          witnesses: [],
          hasHole: true,
          holeDetail: '청소는 17시에 끝났는데 18시까지 혼자 남아있었음'
        },
        motive: {
          type: 'revenge',
          description: '대회 출전 금지에 대한 복수',
          strength: 3
        },
        relationships: [
          { targetId: 'char-it-teacher', type: '학생-교사', description: '대회 출전을 막은 교사에 대한 원한' }
        ],
        secrets: [
          {
            id: 'secret-hacker-1',
            content: '최근 다크웹에서 학교 시스템 재해킹을 계획했다',
            importance: 'critical',
            revealCondition: '컴퓨터 로그 분석 시'
          }
        ],
        dialogues: [
          {
            topic: '대회',
            lines: ['대회요? 저는 관심 없어요.', '어차피 참가 못하는데...']
          }
        ],
        nervousTriggers: ['해킹', '대회', '금지', '징계']
      },
      {
        id: 'char-it-teacher',
        name: '김태현',
        role: 'witness',
        age: 38,
        gender: 'male',
        occupation: '정보 교사',
        personality: '원칙적이지만 학생을 아낌',
        appearance: '캐주얼한 복장',
        background: '코딩 대회 총괄 교사. 최민혁의 재능을 인정하지만 출전을 금지시켰다.',
        alibi: {
          location: '교무실',
          time: '금요일 18:00',
          activity: '대회 준비',
          witnesses: ['다른 교사들'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-hacker-student', type: '교사-학생', description: '민혁의 재능은 인정하지만 과거 행동으로 출전 금지' }
        ],
        secrets: [],
        dialogues: [
          {
            topic: '최민혁',
            lines: ['민혁이는 천재예요.', '하지만 규정은 규정입니다. 해킹 전력자는 참가 불가예요.']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-coding-rival',
        name: '박서준',
        role: 'suspect',
        age: 17,
        gender: 'male',
        occupation: '컴퓨터 동아리 부장 / 2학년',
        personality: '성실하고 노력파',
        appearance: '안경, 단정한 외모',
        background: '대회 출전 예정. 최민혁과 경쟁 관계.',
        alibi: {
          location: '학원',
          time: '금요일 18:00',
          activity: '코딩 학원',
          witnesses: ['학원 강사'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-hacker-student', type: '경쟁자', description: '컴퓨터 동아리에서 경쟁 관계' }
        ],
        secrets: [],
        dialogues: [
          {
            topic: '최민혁',
            lines: ['민혁이는 실력은 최고예요.', '근데 태도에 문제가 있어요.']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-classmate-coder',
        name: '이수아',
        role: 'witness',
        age: 17,
        gender: 'female',
        occupation: '컴퓨터 동아리 / 2학년',
        personality: '조용하고 관찰력이 좋음',
        appearance: '긴 머리, 노트북을 항상 들고 다님',
        background: '최민혁과 같은 동아리. 민혁의 변화를 눈치챘다.',
        alibi: {
          location: '집',
          time: '금요일 18:00',
          activity: '코딩 연습',
          witnesses: ['부모'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-hacker-student', type: '동아리 동료', description: '민혁을 이해하려 노력함' }
        ],
        secrets: [
          {
            id: 'secret-coder-1',
            content: '최민혁이 대회에 대한 불만을 자주 토로했다',
            importance: 'major',
            revealCondition: '세심한 질문 시'
          }
        ],
        dialogues: [
          {
            topic: '최민혁',
            lines: ['민혁 오빠는 요즘 많이 힘들어 보였어요.', '대회 얘기만 나오면 화를 냈어요.']
          }
        ],
        nervousTriggers: []
      }
    ],

    evidence: [
      {
        id: 'evidence-hammer',
        name: '망치',
        type: 'physical',
        description: '공구실에서 가져온 망치',
        detailedDescription: '모니터 유리 파편이 묻어있는 망치. 지문 검출됨.',
        location: '컴퓨터실',
        foundAt: '책상 아래',
        linkedCharacters: ['char-hacker-student'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: true,
        analysisResult: '최민혁의 지문 확인.'
      },
      {
        id: 'evidence-cleaning-schedule',
        name: '청소 당번표',
        type: 'document',
        description: '이번 주 청소 당번',
        detailedDescription: '최민혁이 금요일 컴퓨터실 청소 당번으로 자원했다는 기록.',
        location: '행정실',
        foundAt: '청소 기록부',
        linkedCharacters: ['char-hacker-student'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-computer-log',
        name: '컴퓨터 접속 기록',
        type: 'digital',
        description: '컴퓨터실 PC 사용 기록',
        detailedDescription: '최민혁이 다크웹에서 학교 시스템 해킹 방법을 검색한 기록.',
        location: '컴퓨터실',
        foundAt: '서버 로그',
        linkedCharacters: ['char-hacker-student'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: true,
        analysisResult: '복수 계획을 세웠던 흔적.'
      },
      {
        id: 'evidence-ban-notice',
        name: '출전 금지 통보서',
        type: 'document',
        description: '최민혁의 대회 출전 금지 문서',
        detailedDescription: '과거 해킹 전력으로 대회 참가가 불가능하다는 내용.',
        location: '행정실',
        foundAt: '학생 기록',
        linkedCharacters: ['char-hacker-student', 'char-it-teacher'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-cctv',
        name: 'CCTV 영상',
        type: 'digital',
        description: '복도 CCTV',
        detailedDescription: '최민혁이 18시까지 컴퓨터실에 남아있던 모습.',
        location: '경비실',
        foundAt: 'CCTV 서버',
        linkedCharacters: ['char-hacker-student'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-chat',
        name: '채팅 기록',
        type: 'digital',
        description: '다크웹 채팅방 기록',
        detailedDescription: '"학교가 후회하게 만들겠다"는 내용의 채팅.',
        location: '온라인',
        foundAt: '다크웹 서버',
        linkedCharacters: ['char-hacker-student'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: true,
        analysisResult: '최민혁의 IP 주소와 일치.'
      }
    ],

    locations: [
      {
        id: 'loc-computer-lab',
        name: '컴퓨터실',
        description: '30대의 컴퓨터가 있는 실습실',
        atmosphere: '모든 모니터가 깨져 참혹함',
        objects: [
          {
            id: 'obj-monitors',
            name: '파손된 모니터들',
            description: '30대의 새 모니터',
            examinationResult: '모두 체계적으로 파손됨.',
            containsEvidence: ''
          },
          {
            id: 'obj-hammer',
            name: '망치',
            description: '책상 아래 망치',
            examinationResult: '유리 파편과 지문이 있음.',
            containsEvidence: 'evidence-hammer'
          }
        ],
        connectedTo: ['loc-hallway-computer']
      },
      {
        id: 'loc-hallway-computer',
        name: '컴퓨터실 복도',
        description: '컴퓨터실이 있는 복도',
        atmosphere: 'CCTV가 설치되어 있음',
        objects: [],
        connectedTo: ['loc-computer-lab']
      },
      {
        id: 'loc-server-room',
        name: '서버실',
        description: '학교 서버가 있는 방',
        atmosphere: '디지털 기록 보관',
        objects: [
          {
            id: 'obj-server',
            name: '서버',
            description: '학교 메인 서버',
            examinationResult: '접속 기록 분석 가능.',
            containsEvidence: 'evidence-computer-log'
          }
        ],
        connectedTo: []
      },
      {
        id: 'loc-darkweb',
        name: '다크웹',
        description: '온라인 공간',
        atmosphere: '디지털 증거',
        objects: [
          {
            id: 'obj-chat',
            name: '채팅방',
            description: '다크웹 채팅방',
            examinationResult: '협박성 채팅 발견.',
            containsEvidence: 'evidence-chat'
          }
        ],
        connectedTo: []
      }
    ],

    timeline: [
      { time: '17:00', event: '청소 시작', participants: ['char-hacker-student'], location: '컴퓨터실', importance: 'minor', isRevealed: false },
      { time: '17:30', event: '청소 완료, 혼자 남음', participants: ['char-hacker-student'], location: '컴퓨터실', importance: 'major', isRevealed: false },
      { time: '17:45', event: '공구실에서 망치 가져옴', participants: ['char-hacker-student'], location: '공구실', importance: 'major', isRevealed: false },
      { time: '18:00', event: '모니터 파손 시작', participants: ['char-hacker-student'], location: '컴퓨터실', importance: 'critical', isRevealed: false },
      { time: '18:30', event: '모든 모니터 파손 완료', participants: ['char-hacker-student'], location: '컴퓨터실', importance: 'critical', isRevealed: false },
      { time: '18:45', event: '현장 이탈', participants: ['char-hacker-student'], location: '컴퓨터실', importance: 'major', isRevealed: false },
      { time: '다음날 07:00', event: '파손 발견 및 신고', participants: ['char-it-teacher'], location: '컴퓨터실', importance: 'major', isRevealed: true }
    ],

    solution: {
      summary: '최민혁이 코딩 대회 출전 금지에 분노하여 대회용 모니터를 모두 파손했다.',
      detailedExplanation: [
        '최민혁은 해킹 천재지만 과거 학교 시스템 해킹으로 징계를 받았다.',
        '코딩 대회 출전이 금지되었지만 실력으로는 우승할 자신이 있었다.',
        '참가조차 못하게 된 것에 분노했다.',
        '다크웹에서 복수를 계획했다.',
        '청소 당번을 자원하여 컴퓨터실에 늦게까지 남았다.',
        '공구실에서 망치를 가져와 모든 모니터를 파손했다.',
        '대회 자체를 망치려 했다.'
      ],
      keyEvidence: ['evidence-hammer', 'evidence-computer-log', 'evidence-ban-notice', 'evidence-chat'],
      howToSolve: [
        '망치 지문 분석',
        '컴퓨터 접속 기록 조사',
        '출전 금지 동기 파악',
        '다크웹 채팅 추적'
      ],
      commonMistakes: [
        '경쟁자를 의심하는 것',
        '외부 해커의 소행으로 보는 것'
      ]
    },

    deductionKeywords: {
      who: ['최민혁', '해커', '학생'],
      why: ['복수', '금지', '대회', '분노'],
      how: ['망치', '파손', '청소'],
      when: ['방과 후', '18:00', '6시'],
      where: ['컴퓨터실', '모니터', '실습실']
    },

    tags: ['해킹', '대회', '복수', '컴퓨터', '천재'],
    author: 'DEDUCTIO',
    version: '1.0'
  },

  // ========================================
  // 시나리오 #12: 미술실 석고상 파손
  // ========================================
  {
    id: 'vandalism-012',
    title: '미술실 석고상 파손',
    subtitle: '100년 된 석고상이 산산조각',
    type: 'vandalism',
    difficulty: 'medium',
    estimatedTime: 20,

    prologue: [
      '미술실의 보물, 100년 된 고전 석고상.',
      '대를 이어 사용되어온 이 석고상이',
      '산산조각 난 채 발견되었다.'
    ],
    introduction: [
      '미술 교사의 슬픈 목소리가 들립니다.',
      '"이건... 복원이 불가능해요..."',
      '역사적 가치가 있던 석고상이 파괴되었습니다.'
    ],
    setting: '청운고등학교 미술실',

    crimeTime: '수요일 21:00',
    crimeLocation: '미술실',
    culpritId: 'char-accident-student',
    motive: '실수를 숨기기 위한 추가 파손',
    motiveDetail: '미술부 학생 강유진은 야간 연습 중 실수로 석고상 하나를 떨어뜨려 깼다. 처벌이 두려워 일부러 모든 석고상을 파손하여 외부인의 침입 사고처럼 위장하려 했다.',
    method: '첫 번째는 실수, 나머지는 의도적으로 바닥에 떨어뜨림',
    methodDetail: '강유진은 팔을 휘두르다가 석고상을 떨어뜨렸고, 이를 숨기기 위해 나머지 석고상들도 모두 파손했다.',

    characters: [
      {
        id: 'char-accident-student',
        name: '강유진',
        role: 'culprit',
        age: 16,
        gender: 'female',
        occupation: '미술부 / 1학년',
        personality: '겁이 많고 충동적',
        appearance: '작은 체구, 불안한 표정',
        background: '미술부 신입. 평소 성실하지만 실수를 숨기려는 경향이 있다.',
        alibi: {
          location: '집',
          time: '수요일 21:00',
          activity: '집에서 쉬고 있었다고 주장',
          witnesses: [],
          hasHole: true,
          holeDetail: '부모님이 야근 중이었음'
        },
        motive: {
          type: 'fear',
          description: '실수를 숨기기 위한 추가 범행',
          strength: 2
        },
        relationships: [],
        secrets: [
          {
            id: 'secret-accident-1',
            content: '과거에도 실수를 숨기려다 더 큰 문제를 만든 적이 있다',
            importance: 'major',
            revealCondition: '과거 기록 조회 시'
          }
        ],
        dialogues: [
          {
            topic: '석고상',
            lines: ['저... 저는 아무것도 몰라요.', '외부인이 침입한 게 아닐까요?']
          }
        ],
        nervousTriggers: ['석고상', '실수', '파손', '미술실']
      },
      {
        id: 'char-art-teacher-2',
        name: '최서연',
        role: 'witness',
        age: 40,
        gender: 'female',
        occupation: '미술 교사',
        personality: '엄격하지만 공정함',
        appearance: '단정한 외모, 물감이 묻은 앞치마',
        background: '미술부 지도 교사. 석고상을 매우 소중히 여겼다.',
        alibi: {
          location: '집',
          time: '수요일 21:00',
          activity: '가족과 저녁 식사',
          witnesses: ['가족'],
          hasHole: false
        },
        relationships: [],
        secrets: [],
        dialogues: [
          {
            topic: '석고상',
            lines: ['그 석고상은 학교 역사의 일부였어요.', '100년 동안 우리 선배들이 사용했던...']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-art-senior',
        name: '윤지호',
        role: 'suspect',
        age: 18,
        gender: 'male',
        occupation: '미술부 부장 / 3학년',
        personality: '책임감 있고 후배를 챙김',
        appearance: '긴 머리, 예술가 스타일',
        background: '미술부 부장. 강유진을 지도했다.',
        alibi: {
          location: '학원',
          time: '수요일 21:00',
          activity: '입시 미술학원',
          witnesses: ['학원 강사'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-accident-student', type: '선후배', description: '유진이를 지도하는 선배' }
        ],
        secrets: [],
        dialogues: [
          {
            topic: '강유진',
            lines: ['유진이는 착한 애예요.', '근데 실수가 좀 많고 겁이 많아요.']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-security-art',
        name: '이동혁',
        role: 'witness',
        age: 52,
        gender: 'male',
        occupation: '야간 경비원',
        personality: '성실하고 책임감 있음',
        appearance: '경비 유니폼',
        background: '야간 순찰 담당.',
        alibi: {
          location: '경비실',
          time: '수요일 21:00',
          activity: '순찰',
          witnesses: [],
          hasHole: false
        },
        relationships: [],
        secrets: [],
        dialogues: [
          {
            topic: '목격',
            lines: ['9시쯤 미술실 쪽에서 뭔가 깨지는 소리가 났어요.', '여러 번 계속해서요.']
          }
        ],
        nervousTriggers: []
      }
    ],

    evidence: [
      {
        id: 'evidence-broken-statues',
        name: '파손된 석고상들',
        type: 'physical',
        description: '바닥에 산산조각 난 석고상 5개',
        detailedDescription: '첫 번째 석고상의 파손 패턴이 나머지와 다름. 첫 번째는 우연한 낙하, 나머지는 의도적.',
        location: '미술실',
        foundAt: '미술실 바닥',
        linkedCharacters: ['char-accident-student'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: true,
        analysisResult: '첫 번째는 실수, 나머지는 의도적 파손으로 판단됨.'
      },
      {
        id: 'evidence-practice-log',
        name: '미술실 사용 기록',
        type: 'document',
        description: '미술실 출입 기록부',
        detailedDescription: '강유진이 수요일 저녁 미술실 사용을 신청했다는 기록.',
        location: '미술실',
        foundAt: '출입 기록부',
        linkedCharacters: ['char-accident-student'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-fingerprints',
        name: '지문',
        type: 'forensic',
        description: '석고상 조각의 지문',
        detailedDescription: '강유진의 지문이 여러 조각에서 검출됨.',
        location: '미술실',
        foundAt: '석고상 조각',
        linkedCharacters: ['char-accident-student'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: true,
        analysisResult: '강유진의 지문 확인.'
      },
      {
        id: 'evidence-shoes',
        name: '신발 자국',
        type: 'physical',
        description: '석고 가루가 묻은 신발 자국',
        detailedDescription: '미술실에서 복도로 이어지는 발자국. 강유진의 신발 사이즈와 일치.',
        location: '미술실',
        foundAt: '복도',
        linkedCharacters: ['char-accident-student'],
        isCritical: false,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-cctv',
        name: 'CCTV 영상',
        type: 'digital',
        description: '복도 CCTV',
        detailedDescription: '21시경 강유진이 황급히 미술실을 나가는 모습.',
        location: '경비실',
        foundAt: 'CCTV 서버',
        linkedCharacters: ['char-accident-student'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-past-record',
        name: '과거 기록',
        type: 'document',
        description: '강유진의 중학교 기록',
        detailedDescription: '실수를 숨기려다 더 큰 문제를 만든 전력이 있음.',
        location: '행정실',
        foundAt: '학생 기록부',
        linkedCharacters: ['char-accident-student'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      }
    ],

    locations: [
      {
        id: 'loc-art-room',
        name: '미술실',
        description: '석고상이 있던 미술 교실',
        atmosphere: '산산조각 난 석고상들로 비극적',
        objects: [
          {
            id: 'obj-statues',
            name: '파손된 석고상',
            description: '5개의 석고상 조각',
            examinationResult: '첫 번째와 나머지의 파손 패턴이 다름.',
            containsEvidence: 'evidence-broken-statues'
          }
        ],
        connectedTo: ['loc-hallway-art']
      },
      {
        id: 'loc-hallway-art',
        name: '미술실 복도',
        description: '미술실로 이어지는 복도',
        atmosphere: '석고 가루 발자국이 있음',
        objects: [
          {
            id: 'obj-footprints',
            name: '발자국',
            description: '석고 가루가 묻은 발자국',
            examinationResult: '미술실에서 출구로 이어짐.',
            containsEvidence: 'evidence-shoes'
          }
        ],
        connectedTo: ['loc-art-room']
      },
      {
        id: 'loc-admin-records',
        name: '행정실',
        description: '학생 기록 보관',
        atmosphere: '서류로 가득함',
        objects: [
          {
            id: 'obj-student-files',
            name: '학생 기록부',
            description: '학생들의 과거 기록',
            examinationResult: '강유진의 중학교 기록 발견.',
            containsEvidence: 'evidence-past-record'
          }
        ],
        connectedTo: []
      }
    ],

    timeline: [
      { time: '20:00', event: '강유진, 미술실 입장', participants: ['char-accident-student'], location: '미술실', importance: 'major', isRevealed: false },
      { time: '20:30', event: '연습 중 첫 번째 석고상 실수로 파손', participants: ['char-accident-student'], location: '미술실', importance: 'critical', isRevealed: false },
      { time: '20:35', event: '공포에 나머지 석고상들도 의도적으로 파손', participants: ['char-accident-student'], location: '미술실', importance: 'critical', isRevealed: false },
      { time: '21:00', event: '황급히 현장 이탈', participants: ['char-accident-student'], location: '미술실', importance: 'major', isRevealed: false },
      { time: '다음날 08:00', event: '파손 발견 및 신고', participants: ['char-art-teacher-2'], location: '미술실', importance: 'major', isRevealed: true }
    ],

    solution: {
      summary: '강유진이 실수로 석고상을 깬 후, 처벌이 두려워 나머지 석고상들도 모두 파손하여 외부인 침입 사고로 위장하려 했다.',
      detailedExplanation: [
        '강유진은 미술실에서 야간 연습 중이었다.',
        '실수로 팔을 휘두르다가 석고상 하나를 떨어뜨렸다.',
        '100년 된 귀중한 석고상이라 처벌이 두려웠다.',
        '과거에도 실수를 숨기려다 더 큰 문제를 만든 적이 있었다.',
        '외부인 침입 사고처럼 보이게 하기 위해 나머지 석고상들도 모두 파손했다.',
        '황급히 도주했지만 지문과 발자국을 남겼다.'
      ],
      keyEvidence: ['evidence-broken-statues', 'evidence-practice-log', 'evidence-fingerprints', 'evidence-past-record'],
      howToSolve: [
        '파손 패턴 분석 (첫 번째와 나머지의 차이)',
        '출입 기록 확인',
        '지문 분석',
        '과거 기록에서 패턴 파악'
      ],
      commonMistakes: [
        '외부인 침입으로 단정짓는 것',
        '선배들을 의심하는 것'
      ]
    },

    deductionKeywords: {
      who: ['강유진', '미술부', '신입'],
      why: ['실수', '은폐', '두려움', '위장'],
      how: ['떨어뜨리기', '파손', '위장'],
      when: ['밤', '21:00', '9시'],
      where: ['미술실', '석고상', '교실']
    },

    tags: ['실수', '은폐', '위장', '석고상', '미술'],
    author: 'DEDUCTIO',
    version: '1.0'
  },

  // ========================================
  // 시나리오 #13: 학교 버스 타이어 펑크
  // ========================================
  {
    id: 'vandalism-013',
    title: '학교 버스 타이어 펑크',
    subtitle: '수학여행 버스의 타이어가 모두 펑크',
    type: 'vandalism',
    difficulty: 'easy',
    estimatedTime: 15,

    prologue: [
      '내일 떠날 수학여행을 위한 버스.',
      '준비가 완료된 3대의 버스 타이어가',
      '모두 칼로 찔려 펑크가 났다.'
    ],
    introduction: [
      '버스 기사님의 당황한 목소리가 들립니다.',
      '"타이어가 전부 펑크 났어요!"',
      '수학여행이 취소될 위기에 처했습니다.'
    ],
    setting: '청운고등학교 주차장',

    crimeTime: '목요일 23:00',
    crimeLocation: '학교 주차장',
    culpritId: 'char-bullied-student',
    motive: '수학여행에서 괴롭힘을 피하기 위함',
    motiveDetail: '왕따를 당하는 학생 송민재는 수학여행에서 더 심한 괴롭힘을 당할까 두려워했다. 여행을 취소시키기 위해 버스 타이어를 훼손했다.',
    method: '야간에 칼로 타이어를 찔러 펑크',
    methodDetail: '송민재는 밤에 학교로 돌아와 준비해온 칼로 버스 타이어 12개를 모두 찔렀다.',

    characters: [
      {
        id: 'char-bullied-student',
        name: '송민재',
        role: 'culprit',
        age: 16,
        gender: 'male',
        occupation: '학생 / 1학년',
        personality: '소극적이고 위축되어 있음',
        appearance: '왜소한 체격, 고개를 숙이고 다님',
        background: '반에서 왕따를 당하고 있다. 수학여행이 두렵다.',
        alibi: {
          location: '집',
          time: '목요일 23:00',
          activity: '자고 있었다고 주장',
          witnesses: [],
          hasHole: true,
          holeDetail: '부모님이 확인할 수 없는 시간'
        },
        motive: {
          type: 'fear',
          description: '수학여행에서의 괴롭힘 회피',
          strength: 3
        },
        relationships: [
          { targetId: 'char-bully', type: '피해자-가해자', description: '괴롭힘을 당하고 있음' }
        ],
        secrets: [
          {
            id: 'secret-bullied-1',
            content: '상담 선생님에게 수학여행이 두렵다고 털어놓았다',
            importance: 'critical',
            revealCondition: '상담 기록 조회 시'
          }
        ],
        dialogues: [
          {
            topic: '수학여행',
            lines: ['수학여행요? 저는... 별로 가고 싶지 않아요.', '집에 있는 게 더 편해요.']
          }
        ],
        nervousTriggers: ['수학여행', '버스', '괴롭힘', '여행']
      },
      {
        id: 'char-bully',
        name: '김대호',
        role: 'suspect',
        age: 16,
        gender: 'male',
        occupation: '학생 / 1학년',
        personality: '공격적이고 폭력적',
        appearance: '건장한 체격, 거친 말투',
        background: '송민재를 괴롭히는 학생.',
        alibi: {
          location: 'PC방',
          time: '목요일 23:00',
          activity: '게임',
          witnesses: ['PC방 주인'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-bullied-student', type: '가해자-피해자', description: '송민재를 괴롭힘' }
        ],
        secrets: [],
        dialogues: [
          {
            topic: '송민재',
            lines: ['송민재? 걔는 항상 혼자 있어.', '수학여행에서도 혼자 있겠지.']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-counselor-2',
        name: '정수진',
        role: 'witness',
        age: 42,
        gender: 'female',
        occupation: '상담 교사',
        personality: '따뜻하고 학생을 이해함',
        appearance: '부드러운 인상',
        background: '송민재의 괴롭힘 문제를 알고 있었다.',
        alibi: {
          location: '집',
          time: '목요일 23:00',
          activity: '휴식',
          witnesses: ['남편'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-bullied-student', type: '상담교사', description: '민재의 고민을 들어줌' }
        ],
        secrets: [],
        dialogues: [
          {
            topic: '송민재',
            lines: ['민재는 수학여행이 너무 두렵다고 했어요.', '괴롭힘 때문에...']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-bus-driver',
        name: '박순철',
        role: 'witness',
        age: 58,
        gender: 'male',
        occupation: '버스 기사',
        personality: '성실하고 책임감 있음',
        appearance: '기사 유니폼',
        background: '15년째 학교 버스를 운전.',
        alibi: {
          location: '집',
          time: '목요일 23:00',
          activity: '수면',
          witnesses: ['아내'],
          hasHole: false
        },
        relationships: [],
        secrets: [],
        dialogues: [
          {
            topic: '타이어',
            lines: ['타이어가 칼로 찔린 것 같아요.', '의도적인 범행이 확실해요.']
          }
        ],
        nervousTriggers: []
      }
    ],

    evidence: [
      {
        id: 'evidence-knife',
        name: '칼',
        type: 'physical',
        description: '주차장 화단에서 발견된 칼',
        detailedDescription: '타이어 고무 조각이 묻은 칼. 지문이 검출됨.',
        location: '주차장',
        foundAt: '화단',
        linkedCharacters: ['char-bullied-student'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: true,
        analysisResult: '송민재의 지문 확인.'
      },
      {
        id: 'evidence-punctured-tires',
        name: '펑크 난 타이어',
        type: 'physical',
        description: '12개의 타이어 모두 펑크',
        detailedDescription: '날카로운 칼로 찔린 흔적. 체계적으로 모든 타이어를 훼손함.',
        location: '주차장',
        foundAt: '버스 3대',
        linkedCharacters: ['char-bullied-student'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: true,
        analysisResult: '동일한 도구로 찔린 것으로 판단됨.'
      },
      {
        id: 'evidence-counseling-record',
        name: '상담 기록',
        type: 'document',
        description: '송민재의 상담 기록',
        detailedDescription: '"수학여행이 너무 무섭다. 가고 싶지 않다"는 내용.',
        location: '상담실',
        foundAt: '상담 기록부',
        linkedCharacters: ['char-bullied-student', 'char-counselor-2'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-cctv-parking',
        name: 'CCTV 영상',
        type: 'digital',
        description: '주차장 CCTV',
        detailedDescription: '23시경 후드를 쓴 인물이 버스 주변을 배회하는 모습.',
        location: '경비실',
        foundAt: 'CCTV 서버',
        linkedCharacters: ['char-bullied-student'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: true,
        analysisResult: '체격이 송민재와 유사함.'
      },
      {
        id: 'evidence-diary',
        name: '송민재 일기',
        type: 'document',
        description: '송민재의 일기장',
        detailedDescription: '"수학여행만 없어진다면..." 같은 내용이 반복됨.',
        location: '송민재 집',
        foundAt: '책상',
        linkedCharacters: ['char-bullied-student'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      },
      {
        id: 'evidence-bullying-report',
        name: '괴롭힘 신고 기록',
        type: 'document',
        description: '송민재가 당한 괴롭힘 기록',
        detailedDescription: '여러 차례 신고되었지만 제대로 처리되지 않았음.',
        location: '행정실',
        foundAt: '학생 기록',
        linkedCharacters: ['char-bullied-student', 'char-bully'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      }
    ],

    locations: [
      {
        id: 'loc-parking',
        name: '학교 주차장',
        description: '버스가 주차된 주차장',
        atmosphere: '모든 버스 타이어가 펑크 나있음',
        objects: [
          {
            id: 'obj-buses',
            name: '수학여행 버스 3대',
            description: '타이어가 모두 펑크 난 버스들',
            examinationResult: '12개 타이어 모두 칼로 찔림.',
            containsEvidence: 'evidence-punctured-tires'
          },
          {
            id: 'obj-flowerbed',
            name: '화단',
            description: '주차장 옆 화단',
            examinationResult: '칼이 버려져 있음.',
            containsEvidence: 'evidence-knife'
          }
        ],
        connectedTo: ['loc-school-gate']
      },
      {
        id: 'loc-school-gate',
        name: '학교 정문',
        description: '주차장으로 이어지는 정문',
        atmosphere: 'CCTV 설치됨',
        objects: [],
        connectedTo: ['loc-parking']
      },
      {
        id: 'loc-counseling-room',
        name: '상담실',
        description: '학생 상담 공간',
        atmosphere: '따뜻하고 안전한 분위기',
        objects: [
          {
            id: 'obj-counseling-files',
            name: '상담 기록부',
            description: '학생 상담 기록',
            examinationResult: '송민재의 수학여행 공포 기록.',
            containsEvidence: 'evidence-counseling-record'
          }
        ],
        connectedTo: []
      },
      {
        id: 'loc-minjae-home',
        name: '송민재 집',
        description: '송민재의 집',
        atmosphere: '조용하고 외로운 분위기',
        objects: [
          {
            id: 'obj-diary',
            name: '일기장',
            description: '송민재의 일기',
            examinationResult: '수학여행 회피 욕구가 담긴 글.',
            containsEvidence: 'evidence-diary'
          }
        ],
        connectedTo: []
      }
    ],

    timeline: [
      { time: '22:30', event: '송민재, 집에서 칼 준비', participants: ['char-bullied-student'], location: '송민재 집', importance: 'major', isRevealed: false },
      { time: '22:50', event: '학교 도착', participants: ['char-bullied-student'], location: '학교', importance: 'major', isRevealed: false },
      { time: '23:00', event: '버스 타이어 펑크 시작', participants: ['char-bullied-student'], location: '주차장', importance: 'critical', isRevealed: false },
      { time: '23:30', event: '12개 타이어 모두 펑크 완료', participants: ['char-bullied-student'], location: '주차장', importance: 'critical', isRevealed: false },
      { time: '23:40', event: '칼 버리고 현장 이탈', participants: ['char-bullied-student'], location: '주차장', importance: 'major', isRevealed: false },
      { time: '다음날 06:00', event: '펑크 발견 및 신고', participants: ['char-bus-driver'], location: '주차장', importance: 'major', isRevealed: true }
    ],

    solution: {
      summary: '송민재가 수학여행에서의 괴롭힘이 두려워 여행을 취소시키기 위해 버스 타이어를 모두 펑크냈다.',
      detailedExplanation: [
        '송민재는 반에서 심한 왕따를 당하고 있었다.',
        '수학여행에서 더 심한 괴롭힘을 당할까 두려웠다.',
        '상담 선생님에게 여행이 무섭다고 털어놓았다.',
        '여행을 취소시키는 것만이 방법이라고 생각했다.',
        '밤에 칼을 준비해 학교로 갔다.',
        '버스 3대의 타이어 12개를 모두 찔러 펑크냈다.',
        '수학여행이 취소되기를 바랐다.'
      ],
      keyEvidence: ['evidence-knife', 'evidence-counseling-record', 'evidence-diary', 'evidence-bullying-report'],
      howToSolve: [
        '상담 기록에서 수학여행 공포 확인',
        '일기장에서 회피 욕구 파악',
        '칼의 지문 분석',
        '괴롭힘 배경 조사'
      ],
      commonMistakes: [
        '가해자를 범인으로 의심하는 것',
        '단순 장난으로 치부하는 것'
      ]
    },

    deductionKeywords: {
      who: ['송민재', '피해자', '학생'],
      why: ['회피', '괴롭힘', '두려움', '왕따'],
      how: ['칼', '펑크', '찌르기'],
      when: ['밤', '23:00', '11시'],
      where: ['주차장', '버스', '타이어']
    },

    tags: ['왕따', '괴롭힘', '회피', '수학여행', '학교폭력'],
    author: 'DEDUCTIO',
    version: '1.0'
  },

  // ========================================
  // 시나리오 #14: 급식실 주방기구 파손
  // ========================================
  {
    id: 'vandalism-014',
    title: '급식실 주방기구 파손',
    subtitle: '급식실 주방 기구가 모두 망가졌다',
    type: 'vandalism',
    difficulty: 'medium',
    estimatedTime: 20,

    prologue: [
      '학교 급식을 책임지는 주방.',
      '수천만원 상당의 주방 기구들이',
      '하룻밤 사이 모두 파손되었다.'
    ],
    introduction: [
      '영양사의 충격적인 목소리가 들립니다.',
      '"오늘 급식을 할 수 없어요!"',
      '주방이 난장판이 되었습니다.'
    ],
    setting: '청운고등학교 급식실 주방',

    crimeTime: '일요일 03:00',
    crimeLocation: '급식실 주방',
    culpritId: 'char-chef-rival',
    motive: '급식 납품 계약 경쟁에서 밀린 복수',
    motiveDetail: '전직 급식 업체 직원 한정우는 새 업체에게 계약을 빼앗겼다. 자신의 회사가 부당하게 탈락했다고 생각하여 새 업체의 장비를 모두 파손했다.',
    method: '일요일 새벽 침입하여 주방 기구 파손',
    methodDetail: '한정우는 과거 급식실 근무 경험으로 침입 방법을 알고 있었다. 새벽에 침입해 조리 기구들을 체계적으로 파손했다.',

    characters: [
      {
        id: 'char-chef-rival',
        name: '한정우',
        role: 'culprit',
        age: 35,
        gender: 'male',
        occupation: '전직 급식 업체 직원',
        personality: '자존심이 강하고 집착적',
        appearance: '조리복 같은 옷, 거친 손',
        background: '이전 급식 업체에서 일했으나 계약 탈락으로 실직했다.',
        alibi: {
          location: '집',
          time: '일요일 03:00',
          activity: '자고 있었다고 주장',
          witnesses: [],
          hasHole: true,
          holeDetail: '혼자 사는 집이라 확인 불가'
        },
        motive: {
          type: 'revenge',
          description: '계약 탈락에 대한 복수',
          strength: 3
        },
        relationships: [
          { targetId: 'char-new-chef', type: '경쟁자', description: '계약을 빼앗긴 원한' }
        ],
        secrets: [
          {
            id: 'secret-chef-1',
            content: '학교 측에 부당함을 호소하는 이메일을 여러 차례 보냈다',
            importance: 'major',
            revealCondition: '이메일 기록 조사 시'
          }
        ],
        dialogues: [
          {
            topic: '계약',
            lines: ['우리 회사가 더 좋은 조건이었어요.', '학교가 부당하게 결정했어요.']
          }
        ],
        nervousTriggers: ['계약', '급식', '업체', '탈락']
      },
      {
        id: 'char-new-chef',
        name: '김미선',
        role: 'suspect',
        age: 42,
        gender: 'female',
        occupation: '영양사 / 새 업체',
        personality: '전문적이고 책임감 있음',
        appearance: '위생복, 단정한 외모',
        background: '새로 계약한 급식 업체의 영양사.',
        alibi: {
          location: '집',
          time: '일요일 03:00',
          activity: '수면',
          witnesses: ['남편'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-chef-rival', type: '경쟁자', description: '계약을 따낸 업체' }
        ],
        secrets: [],
        dialogues: [
          {
            topic: '이전 업체',
            lines: ['이전 업체는 위생 관리가 부실했어요.', '우리가 정당하게 계약을 따냈어요.']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-security-cafeteria',
        name: '장민호',
        role: 'witness',
        age: 55,
        gender: 'male',
        occupation: '야간 경비원',
        personality: '성실하지만 순찰이 소홀함',
        appearance: '경비 유니폼',
        background: '주말 야간 근무 경비원.',
        alibi: {
          location: '경비실',
          time: '일요일 03:00',
          activity: '졸음',
          witnesses: [],
          hasHole: true,
          holeDetail: '순찰을 제대로 하지 않았음'
        },
        relationships: [],
        secrets: [
          {
            id: 'secret-security-1',
            content: '새벽에 잠깐 졸았다',
            importance: 'minor',
            revealCondition: '세심한 질문 시'
          }
        ],
        dialogues: [
          {
            topic: '순찰',
            lines: ['새벽 3시쯤... 잠깐 쉬고 있었어요.', '미안합니다...']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-principal-contract',
        name: '이준석',
        role: 'witness',
        age: 52,
        gender: 'male',
        occupation: '행정실장',
        personality: '원칙적이고 공정함',
        appearance: '정장 차림',
        background: '급식 업체 계약을 담당했다.',
        alibi: {
          location: '집',
          time: '일요일 03:00',
          activity: '수면',
          witnesses: ['아내'],
          hasHole: false
        },
        relationships: [],
        secrets: [],
        dialogues: [
          {
            topic: '계약',
            lines: ['이전 업체는 위생 점수가 낮았어요.', '공정한 평가로 새 업체를 선정했습니다.']
          }
        ],
        nervousTriggers: []
      }
    ],

    evidence: [
      {
        id: 'evidence-broken-equipment',
        name: '파손된 주방 기구',
        type: 'physical',
        description: '냄비, 프라이팬, 조리 도구들이 모두 파손됨',
        detailedDescription: '체계적으로 모든 기구가 망가져 있음. 분노가 담긴 범행.',
        location: '급식실 주방',
        foundAt: '주방',
        linkedCharacters: ['char-chef-rival'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: true,
        analysisResult: '의도적이고 계획적인 파손.'
      },
      {
        id: 'evidence-door-lock',
        name: '부서진 자물쇠',
        type: 'physical',
        description: '주방 뒷문의 부서진 자물쇠',
        detailedDescription: '전문 도구로 따서 침입한 흔적.',
        location: '급식실',
        foundAt: '뒷문',
        linkedCharacters: ['char-chef-rival'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-footprints-kitchen',
        name: '주방화 발자국',
        type: 'physical',
        description: '주방 바닥의 발자국',
        detailedDescription: '전문 주방화 자국. 한정우가 신던 것과 일치.',
        location: '급식실 주방',
        foundAt: '주방 바닥',
        linkedCharacters: ['char-chef-rival'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: true,
        analysisResult: '한정우의 주방화와 동일한 패턴.'
      },
      {
        id: 'evidence-emails',
        name: '항의 이메일',
        type: 'digital',
        description: '한정우가 보낸 이메일들',
        detailedDescription: '학교에 계약 결정이 부당하다는 내용의 이메일 여러 통.',
        location: '행정실',
        foundAt: '이메일 서버',
        linkedCharacters: ['char-chef-rival'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-contract-documents',
        name: '계약 심사 문서',
        type: 'document',
        description: '급식 업체 계약 심사 자료',
        detailedDescription: '이전 업체(한정우)가 위생 점수 미달로 탈락했다는 기록.',
        location: '행정실',
        foundAt: '계약 파일',
        linkedCharacters: ['char-chef-rival', 'char-new-chef'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-cctv-backdoor',
        name: 'CCTV 영상',
        type: 'digital',
        description: '급식실 뒷문 CCTV',
        detailedDescription: '03시경 조리복 차림의 남성이 침입하는 모습.',
        location: '경비실',
        foundAt: 'CCTV 서버',
        linkedCharacters: ['char-chef-rival'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: true,
        analysisResult: '체격과 움직임이 한정우와 유사함.'
      }
    ],

    locations: [
      {
        id: 'loc-cafeteria-kitchen',
        name: '급식실 주방',
        description: '학교 급식을 조리하는 주방',
        atmosphere: '파손된 기구들로 난장판',
        objects: [
          {
            id: 'obj-equipment',
            name: '주방 기구들',
            description: '각종 조리 도구와 기계',
            examinationResult: '모두 체계적으로 파손됨.',
            containsEvidence: 'evidence-broken-equipment'
          },
          {
            id: 'obj-floor',
            name: '주방 바닥',
            description: '타일 바닥',
            examinationResult: '주방화 발자국이 있음.',
            containsEvidence: 'evidence-footprints-kitchen'
          }
        ],
        connectedTo: ['loc-backdoor']
      },
      {
        id: 'loc-backdoor',
        name: '급식실 뒷문',
        description: '직원 출입구',
        atmosphere: '자물쇠가 부서져 있음',
        objects: [
          {
            id: 'obj-lock',
            name: '자물쇠',
            description: '뒷문 자물쇠',
            examinationResult: '전문 도구로 딴 흔적.',
            containsEvidence: 'evidence-door-lock'
          }
        ],
        connectedTo: ['loc-cafeteria-kitchen']
      },
      {
        id: 'loc-admin-contract',
        name: '행정실',
        description: '계약 서류 보관',
        atmosphere: '서류로 가득함',
        objects: [
          {
            id: 'obj-contracts',
            name: '계약 파일',
            description: '급식 업체 계약 관련 서류',
            examinationResult: '심사 결과와 이메일 기록.',
            containsEvidence: 'evidence-contract-documents'
          }
        ],
        connectedTo: []
      }
    ],

    timeline: [
      { time: '02:30', event: '한정우, 학교 도착', participants: ['char-chef-rival'], location: '학교', importance: 'major', isRevealed: false },
      { time: '02:45', event: '뒷문 자물쇠를 따고 침입', participants: ['char-chef-rival'], location: '급식실 뒷문', importance: 'critical', isRevealed: false },
      { time: '03:00', event: '주방 기구 파손 시작', participants: ['char-chef-rival'], location: '급식실 주방', importance: 'critical', isRevealed: false },
      { time: '04:00', event: '파손 완료 후 현장 이탈', participants: ['char-chef-rival'], location: '급식실', importance: 'major', isRevealed: false },
      { time: '월요일 05:00', event: '파손 발견 및 신고', participants: ['char-new-chef'], location: '급식실 주방', importance: 'major', isRevealed: true }
    ],

    solution: {
      summary: '한정우가 급식 업체 계약 탈락에 분노하여 새 업체의 주방 기구를 모두 파손했다.',
      detailedExplanation: [
        '한정우는 이전 급식 업체에서 일했다.',
        '새로운 계약 심사에서 위생 점수 미달로 탈락했다.',
        '자신의 업체가 부당하게 탈락했다고 생각했다.',
        '학교에 여러 차례 항의 이메일을 보냈지만 무시당했다.',
        '새 업체에 대한 복수를 계획했다.',
        '일요일 새벽 급식실에 침입해 모든 주방 기구를 파손했다.',
        '급식을 중단시켜 새 업체를 곤란하게 만들려 했다.'
      ],
      keyEvidence: ['evidence-footprints-kitchen', 'evidence-emails', 'evidence-contract-documents', 'evidence-cctv-backdoor'],
      howToSolve: [
        '침입 방법 조사 (자물쇠)',
        '발자국 분석',
        '계약 탈락 동기 파악',
        '항의 이메일 확인'
      ],
      commonMistakes: [
        '새 업체를 의심하는 것',
        '학생의 소행으로 단정짓는 것'
      ]
    },

    deductionKeywords: {
      who: ['한정우', '전직 직원', '업체'],
      why: ['복수', '탈락', '계약', '분노'],
      how: ['침입', '파손', '자물쇠'],
      when: ['새벽', '03:00', '3시'],
      where: ['급식실', '주방', '뒷문']
    },

    tags: ['계약', '복수', '급식', '업체', '침입'],
    author: 'DEDUCTIO',
    version: '1.0'
  },

  // ========================================
  // 시나리오 #15: 방송실 장비 파손
  // ========================================
  {
    id: 'vandalism-015',
    title: '방송실 장비 파손',
    subtitle: '방송부의 고가 장비가 모두 파괴됐다',
    type: 'vandalism',
    difficulty: 'hard',
    estimatedTime: 25,

    prologue: [
      '학교 방송을 책임지는 방송실.',
      '3000만원 상당의 음향 및 영상 장비가',
      '하룻밤 사이 모두 파손되었다.'
    ],
    introduction: [
      '방송부 부장의 절망적인 목소리가 들립니다.',
      '"졸업 방송을 할 수 없어요..."',
      '방송실이 완전히 망가졌습니다.'
    ],
    setting: '청운고등학교 방송실',

    crimeTime: '토요일 20:00',
    crimeLocation: '방송실',
    culpritId: 'char-expelled-broadcaster',
    motive: '방송부에서 퇴출당한 것에 대한 복수',
    motiveDetail: '전 방송부 에이스 오지훈은 사적 방송 사용 적발로 부에서 퇴출당했다. 자신이 키운 방송부인데 쫓겨난 것에 분노하여 장비를 모두 파손했다.',
    method: '토요일 밤 침입하여 장비를 체계적으로 파손',
    methodDetail: '오지훈은 방송실 비밀번호를 알고 있었다. 침입하여 마이크, 카메라, 믹서 등 모든 장비를 파손했다.',

    characters: [
      {
        id: 'char-expelled-broadcaster',
        name: '오지훈',
        role: 'culprit',
        age: 18,
        gender: 'male',
        occupation: '전 방송부 부장 / 3학년',
        personality: '자존심이 강하고 집착적',
        appearance: '헤드폰을 항상 착용, 창백한 얼굴',
        background: '방송부 에이스였으나 사적 방송 사용으로 퇴출당했다.',
        alibi: {
          location: '집',
          time: '토요일 20:00',
          activity: '집에서 개인 방송 중이었다고 주장',
          witnesses: [],
          hasHole: true,
          holeDetail: '방송 녹화는 사전 녹화 가능'
        },
        motive: {
          type: 'revenge',
          description: '방송부 퇴출에 대한 복수',
          strength: 3
        },
        relationships: [
          { targetId: 'char-new-captain', type: '전 동료', description: '자신을 고발한 후임 부장에 대한 원한' }
        ],
        secrets: [
          {
            id: 'secret-broadcaster-1',
            content: '방송실 비밀번호를 여전히 알고 있었다',
            importance: 'critical',
            revealCondition: '방송실 출입 조사 시'
          }
        ],
        dialogues: [
          {
            topic: '방송부',
            lines: ['방송부는 제가 키운 거예요.', '저 없이는 아무것도 못해요.']
          }
        ],
        nervousTriggers: ['방송부', '퇴출', '장비', '후임']
      },
      {
        id: 'char-new-captain',
        name: '정하늘',
        role: 'suspect',
        age: 17,
        gender: 'female',
        occupation: '방송부 부장 / 2학년',
        personality: '원칙적이고 정의로움',
        appearance: '단정한 외모, 마이크 핀',
        background: '오지훈의 부정을 고발하여 새 부장이 되었다.',
        alibi: {
          location: '친구 집',
          time: '토요일 20:00',
          activity: '친구와 영화 감상',
          witnesses: ['친구', '친구 부모'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-expelled-broadcaster', type: '전 동료', description: '오지훈을 고발함' }
        ],
        secrets: [],
        dialogues: [
          {
            topic: '오지훈',
            lines: ['지훈 선배는 실력은 있었지만 규칙을 어겼어요.', '고발한 건 옳은 일이었어요.']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-broadcasting-teacher',
        name: '송민우',
        role: 'witness',
        age: 38,
        gender: 'male',
        occupation: '방송부 지도교사',
        personality: '공정하고 원칙적',
        appearance: '캐주얼한 복장',
        background: '방송부 지도 교사. 오지훈의 퇴출을 결정했다.',
        alibi: {
          location: '집',
          time: '토요일 20:00',
          activity: '가족과 저녁 식사',
          witnesses: ['가족'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-expelled-broadcaster', type: '교사-학생', description: '지훈의 재능은 인정하지만 퇴출 결정' }
        ],
        secrets: [],
        dialogues: [
          {
            topic: '오지훈',
            lines: ['지훈이는 천재였어요.', '하지만 학교 장비로 개인 방송을 한 건 명백한 규정 위반이었습니다.']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-junior-member',
        name: '김서우',
        role: 'witness',
        age: 16,
        gender: 'male',
        occupation: '방송부 부원 / 1학년',
        personality: '관찰력이 좋고 눈치가 빠름',
        appearance: '왜소한 체격, 카메라를 들고 다님',
        background: '방송부 신입. 오지훈을 존경했다.',
        alibi: {
          location: '집',
          time: '토요일 20:00',
          activity: '편집 작업',
          witnesses: ['부모'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-expelled-broadcaster', type: '후배', description: '오지훈을 존경함' }
        ],
        secrets: [
          {
            id: 'secret-junior-2',
            content: '오지훈 선배가 최근 방송실 앞을 배회하는 것을 봤다',
            importance: 'major',
            revealCondition: '세심한 질문 시'
          }
        ],
        dialogues: [
          {
            topic: '오지훈',
            lines: ['지훈 선배는 요즘 많이 힘들어 보였어요.', '방송부 얘기만 나오면 화를 냈어요.']
          }
        ],
        nervousTriggers: []
      }
    ],

    evidence: [
      {
        id: 'evidence-destroyed-equipment',
        name: '파손된 방송 장비',
        type: 'physical',
        description: '마이크, 카메라, 믹서 등 모든 장비 파손',
        detailedDescription: '체계적이고 전문적으로 파손됨. 장비를 잘 아는 사람의 범행.',
        location: '방송실',
        foundAt: '방송실',
        linkedCharacters: ['char-expelled-broadcaster'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: true,
        analysisResult: '방송 장비 전문가의 범행으로 판단됨.'
      },
      {
        id: 'evidence-access-code',
        name: '출입 기록',
        type: 'digital',
        description: '방송실 전자 출입 기록',
        detailedDescription: '오지훈의 구 비밀번호로 20시에 출입한 기록.',
        location: '행정실',
        foundAt: '출입 시스템',
        linkedCharacters: ['char-expelled-broadcaster'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-broadcast-recording',
        name: '개인 방송 녹화',
        type: 'digital',
        description: '오지훈의 개인 방송 영상',
        detailedDescription: '알리바이로 제시한 방송이 사전 녹화된 것으로 확인됨.',
        location: '온라인',
        foundAt: '스트리밍 플랫폼',
        linkedCharacters: ['char-expelled-broadcaster'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: true,
        analysisResult: '타임스탬프 조작 흔적 발견.'
      },
      {
        id: 'evidence-expulsion-notice',
        name: '퇴출 통보서',
        type: 'document',
        description: '오지훈의 방송부 퇴출 문서',
        detailedDescription: '사적 방송 사용을 이유로 퇴출되었다는 내용.',
        location: '행정실',
        foundAt: '학생 활동 기록',
        linkedCharacters: ['char-expelled-broadcaster', 'char-broadcasting-teacher'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-chat-logs',
        name: '채팅 기록',
        type: 'digital',
        description: '오지훈의 SNS 채팅',
        detailedDescription: '"방송부가 후회하게 만들겠다"는 내용의 채팅.',
        location: '온라인',
        foundAt: 'SNS 메신저',
        linkedCharacters: ['char-expelled-broadcaster'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      },
      {
        id: 'evidence-fingerprints-equipment',
        name: '장비의 지문',
        type: 'forensic',
        description: '파손된 장비의 지문',
        detailedDescription: '오지훈의 지문이 여러 장비에서 검출됨.',
        location: '방송실',
        foundAt: '파손된 장비',
        linkedCharacters: ['char-expelled-broadcaster'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: true,
        analysisResult: '오지훈의 지문 확인.'
      }
    ],

    locations: [
      {
        id: 'loc-broadcasting-room',
        name: '방송실',
        description: '학교 방송 장비가 있는 방송실',
        atmosphere: '고가 장비가 모두 파손되어 참혹함',
        objects: [
          {
            id: 'obj-equipment',
            name: '방송 장비들',
            description: '마이크, 카메라, 믹서, 컴퓨터 등',
            examinationResult: '모두 체계적으로 파손됨.',
            containsEvidence: 'evidence-destroyed-equipment'
          }
        ],
        connectedTo: ['loc-hallway-broadcast']
      },
      {
        id: 'loc-hallway-broadcast',
        name: '방송실 복도',
        description: '방송실로 이어지는 복도',
        atmosphere: '전자 출입 시스템 설치',
        objects: [],
        connectedTo: ['loc-broadcasting-room']
      },
      {
        id: 'loc-admin-activity',
        name: '행정실',
        description: '학생 활동 기록 보관',
        atmosphere: '서류로 가득함',
        objects: [
          {
            id: 'obj-activity-records',
            name: '활동 기록',
            description: '동아리 활동 기록',
            examinationResult: '오지훈 퇴출 통보서 발견.',
            containsEvidence: 'evidence-expulsion-notice'
          }
        ],
        connectedTo: []
      },
      {
        id: 'loc-online-platform',
        name: '온라인 플랫폼',
        description: '스트리밍 및 SNS 조사',
        atmosphere: '디지털 증거',
        objects: [
          {
            id: 'obj-stream',
            name: '방송 영상',
            description: '오지훈의 개인 방송',
            examinationResult: '사전 녹화 확인.',
            containsEvidence: 'evidence-broadcast-recording'
          },
          {
            id: 'obj-chat',
            name: 'SNS 채팅',
            description: '메신저 대화',
            examinationResult: '협박성 채팅 발견.',
            containsEvidence: 'evidence-chat-logs'
          }
        ],
        connectedTo: []
      }
    ],

    timeline: [
      { time: '19:00', event: '오지훈, 사전 녹화 방송 업로드', participants: ['char-expelled-broadcaster'], location: '집', importance: 'major', isRevealed: false },
      { time: '19:45', event: '학교 도착', participants: ['char-expelled-broadcaster'], location: '학교', importance: 'major', isRevealed: false },
      { time: '20:00', event: '구 비밀번호로 방송실 침입', participants: ['char-expelled-broadcaster'], location: '방송실', importance: 'critical', isRevealed: false },
      { time: '20:15', event: '방송 장비 파손 시작', participants: ['char-expelled-broadcaster'], location: '방송실', importance: 'critical', isRevealed: false },
      { time: '21:30', event: '모든 장비 파손 완료', participants: ['char-expelled-broadcaster'], location: '방송실', importance: 'critical', isRevealed: false },
      { time: '21:45', event: '현장 이탈', participants: ['char-expelled-broadcaster'], location: '방송실', importance: 'major', isRevealed: false },
      { time: '월요일 07:00', event: '파손 발견 및 신고', participants: ['char-new-captain'], location: '방송실', importance: 'major', isRevealed: true }
    ],

    solution: {
      summary: '오지훈이 방송부에서 퇴출당한 것에 분노하여 자신이 사랑했던 방송실 장비를 모두 파손했다.',
      detailedExplanation: [
        '오지훈은 방송부의 에이스이자 부장이었다.',
        '학교 장비로 개인 방송을 하다가 적발되었다.',
        '후임 부장 정하늘이 이를 고발하여 퇴출당했다.',
        '자신이 키운 방송부에서 쫓겨난 것에 분노했다.',
        '방송실 구 비밀번호를 알고 있었다.',
        '토요일 밤 사전 녹화한 방송을 업로드하고 학교로 갔다.',
        '방송실에 침입해 모든 장비를 체계적으로 파손했다.',
        '자신 없이는 방송을 할 수 없게 만들려 했다.'
      ],
      keyEvidence: ['evidence-access-code', 'evidence-broadcast-recording', 'evidence-expulsion-notice', 'evidence-chat-logs'],
      howToSolve: [
        '출입 기록 확인',
        '알리바이 검증 (방송 타임스탬프)',
        '퇴출 동기 파악',
        'SNS 채팅에서 협박 확인'
      ],
      commonMistakes: [
        '새 부장을 의심하는 것',
        '외부인의 소행으로 단정짓는 것'
      ]
    },

    deductionKeywords: {
      who: ['오지훈', '전 부장', '퇴출자'],
      why: ['복수', '퇴출', '분노', '질투'],
      how: ['침입', '파손', '비밀번호'],
      when: ['토요일 밤', '20:00', '8시'],
      where: ['방송실', '장비', '복도']
    },

    tags: ['방송', '퇴출', '복수', '장비', '전문성'],
    author: 'DEDUCTIO',
    version: '1.0'
  }
];
