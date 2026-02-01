// ========================================
// 미스터리 시나리오 20개 - 수작업 제작
// ========================================

import { Scenario } from './types';

export const mysteryScenarios: Scenario[] = [
  // ========================================
  // 시나리오 #1: 잠긴 교실의 비밀
  // ========================================
  {
    id: 'mystery-001',
    title: '잠긴 교실의 비밀',
    subtitle: '안에서 잠긴 교실, 창문도 없는 그곳에서 무슨 일이?',
    type: 'mystery',
    difficulty: 'medium',
    estimatedTime: 20,

    prologue: [
      '창문 없는 특별활동실.',
      '안에서 잠긴 문, 아무 대답 없는 방 안.',
      '강제로 문을 열었을 때, 그 안에는 기절한 학생만이...'
    ],
    introduction: [
      '특별활동실에서 이상한 상황이 발생했습니다.',
      '안에서 잠긴 문, 창문도 없는 교실.',
      '문을 부수고 들어갔더니 한 학생이 기절해 있었습니다.',
      '어떻게 된 일일까요?'
    ],
    setting: '청운고등학교 지하 특별활동실',

    crimeTime: '16:00',
    crimeLocation: '특별활동실',
    culpritId: 'char-mastermind',
    victimId: 'char-victim-student',
    motive: '협박을 무력화하기 위해',
    motiveDetail: '피해자가 범인의 비밀을 알고 협박했다. 범인은 피해자를 가두고 협박 증거를 찾으려 했다.',
    method: '수면제를 탄 음료를 주고, 밖에서 문을 잠근 후 환기구를 통해 안에서 잠근 것처럼 위장',
    methodDetail: '범인은 피해자에게 음료를 권한 뒤, 피해자가 쓰러지자 밖으로 나와 문을 잠갔다. 그 후 환기구를 통해 교실 안의 잠금장치를 조작해 안에서 잠긴 것처럼 보이게 했다.',

    characters: [
      {
        id: 'char-victim-student',
        name: '조민수',
        role: 'victim',
        age: 17,
        gender: 'male',
        occupation: '2학년 학생',
        personality: '약삭빠르고 교활함',
        appearance: '눈빛이 날카롭고 항상 무언가를 노리는 듯한 표정',
        background: '남의 비밀을 캐내 이용하는 것으로 유명.',
        alibi: {
          location: '특별활동실',
          time: '16:00',
          activity: '기절해 있었음',
          witnesses: [],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-mastermind', type: '협박 관계', description: '최윤아의 비밀을 알고 협박 중', isSecret: true }
        ],
        secrets: [
          {
            id: 'secret-victim-1',
            content: '최윤아가 시험에서 부정행위를 한 것을 알고 협박하고 있었다',
            importance: 'critical',
            revealCondition: '휴대폰 메시지 분석'
          }
        ],
        dialogues: [
          {
            topic: '상태',
            lines: ['(의식이 돌아온 후) 머리가 너무 아파요...', '음료를 마신 후로 기억이 없어요.']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-mastermind',
        name: '최윤아',
        role: 'culprit',
        age: 17,
        gender: 'female',
        occupation: '학생회 부회장 / 2학년',
        personality: '완벽주의자, 체면을 중시함',
        appearance: '단정한 교복, 반듯한 자세',
        background: '전교 1등을 유지하며 명문대 진학이 목표.',
        alibi: {
          location: '학생회실',
          time: '16:00',
          activity: '학생회 업무 중이었다고 주장',
          witnesses: ['char-council-member'],
          hasHole: true,
          holeDetail: '15:30~16:30 사이 10분간 자리를 비웠다는 증언'
        },
        motive: {
          type: 'fear',
          description: '부정행위 사실이 드러날 것을 두려워함',
          strength: 3
        },
        relationships: [
          { targetId: 'char-victim-student', type: '협박당하는 관계', description: '조민수에게 협박당하고 있음', isSecret: true }
        ],
        secrets: [
          {
            id: 'secret-mastermind-1',
            content: '1학년 때 중간고사에서 부정행위를 했다',
            importance: 'critical',
            revealCondition: '조민수 휴대폰 메시지 확인 후'
          }
        ],
        dialogues: [
          {
            topic: '사건',
            lines: ['끔찍한 일이네요. 민수가 왜 그 교실에...', '저는 학생회실에 있었어요.']
          },
          {
            topic: '조민수',
            lines: ['...그냥 같은 반 애예요.', '별로 친하진 않아요.']
          }
        ],
        nervousTriggers: ['협박', '비밀', '부정행위', '시험']
      },
      {
        id: 'char-council-member',
        name: '박서연',
        role: 'witness',
        age: 17,
        gender: 'female',
        occupation: '학생회원 / 2학년',
        personality: '성실하고 솔직함',
        appearance: '밝은 표정, 항상 웃음',
        background: '최윤아와 함께 학생회 활동 중.',
        alibi: {
          location: '학생회실',
          time: '16:00',
          activity: '학생회 업무',
          witnesses: ['char-mastermind'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-mastermind', type: '동료', description: '학생회 동료' }
        ],
        secrets: [
          {
            id: 'secret-council-1',
            content: '최윤아가 4시쯤 10분 정도 자리를 비웠다',
            importance: 'major',
            revealCondition: '알리바이 질문 시'
          }
        ],
        dialogues: [
          {
            topic: '최윤아',
            lines: ['윤아? 학생회실에 있었어요.', '...근데 4시쯤 잠깐 자리 비운 것 같기도? 화장실 갔나.']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-science-teacher',
        name: '정호진',
        role: 'witness',
        age: 45,
        gender: 'male',
        occupation: '과학 교사',
        personality: '논리적이고 꼼꼼함',
        appearance: '흰 실험복, 안경',
        background: '화학을 전공한 과학 교사. 특별활동실 관리 담당.',
        alibi: {
          location: '과학실',
          time: '16:00',
          activity: '실험 준비 중',
          witnesses: [],
          hasHole: false
        },
        relationships: [],
        secrets: [],
        dialogues: [
          {
            topic: '특별활동실',
            lines: ['그 방은 환기구가 있어요. 창문 대신.', '환기구가 꽤 커서... 손이 들어갈 정도죠.']
          },
          {
            topic: '잠금장치',
            lines: ['안쪽에 걸쇠가 있어요. 환기구에서 손을 뻗으면 닿을 수도...', '물론 밖에서 그렇게 하려면 도구가 필요하겠지만.']
          }
        ],
        nervousTriggers: []
      }
    ],

    evidence: [
      {
        id: 'evidence-drink',
        name: '빈 음료병',
        type: 'physical',
        description: '특별활동실에서 발견된 빈 음료병',
        detailedDescription: '에너지 드링크 병. 바닥에 흰색 분말 잔여물.',
        location: '특별활동실',
        foundAt: '조민수 옆',
        linkedCharacters: ['char-mastermind', 'char-victim-student'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: true,
        analysisResult: '수면제 성분(졸피뎀) 검출. 병에서 최윤아 지문 발견.'
      },
      {
        id: 'evidence-vent',
        name: '환기구 흔적',
        type: 'physical',
        description: '환기구 덮개에 긁힌 자국',
        detailedDescription: '누군가 환기구를 열고 안쪽으로 손을 넣은 흔적.',
        location: '특별활동실',
        foundAt: '환기구',
        linkedCharacters: ['char-mastermind'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-tool',
        name: '긴 철사',
        type: 'physical',
        description: '복도 쓰레기통에서 발견된 구부러진 철사',
        detailedDescription: '옷걸이를 펴서 만든 듯한 긴 철사. 끝이 갈고리 모양.',
        location: '복도',
        foundAt: '특별활동실 근처 쓰레기통',
        linkedCharacters: ['char-mastermind'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-phone-message',
        name: '조민수 휴대폰 메시지',
        type: 'digital',
        description: '협박 메시지 기록',
        detailedDescription: '"시험 부정행위 사실 알아. 매달 5만 원씩 입금해" - 최윤아에게 보낸 메시지.',
        location: '특별활동실',
        foundAt: '조민수 휴대폰',
        linkedCharacters: ['char-victim-student', 'char-mastermind'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-alibi-gap',
        name: '최윤아 부재 증언',
        type: 'testimony',
        description: '박서연의 증언',
        detailedDescription: '"4시쯤 윤아가 10분 정도 자리를 비웠어요. 화장실 간다고."',
        location: '학생회실',
        foundAt: '박서연 인터뷰',
        linkedCharacters: ['char-mastermind', 'char-council-member'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      }
    ],

    locations: [
      {
        id: 'loc-activity-room',
        name: '특별활동실',
        description: '지하에 있는 창문 없는 교실',
        atmosphere: '어둡고 폐쇄적인 공간, 먼지 냄새',
        objects: [
          {
            id: 'obj-door',
            name: '문',
            description: '안쪽에서 잠글 수 있는 문',
            examinationResult: '안쪽 걸쇠가 걸려있었다. 강제로 부숴서 열었음.'
          },
          {
            id: 'obj-vent',
            name: '환기구',
            description: '천장 근처 환기구',
            examinationResult: '환기구 덮개에 최근 열린 흔적. 크기가 꽤 커서 손이 들어갈 수 있음.',
            containsEvidence: 'evidence-vent'
          },
          {
            id: 'obj-desk',
            name: '책상',
            description: '조민수가 쓰러져 있던 책상',
            examinationResult: '빈 음료병과 휴대폰이 있다.',
            containsEvidence: 'evidence-drink'
          }
        ],
        connectedTo: ['loc-basement-corridor']
      },
      {
        id: 'loc-basement-corridor',
        name: '지하 복도',
        description: '특별활동실로 이어지는 복도',
        atmosphere: '조용하고 인적이 드문 공간',
        objects: [
          {
            id: 'obj-trash',
            name: '쓰레기통',
            description: '복도 끝 쓰레기통',
            examinationResult: '구부러진 철사가 버려져 있다.',
            containsEvidence: 'evidence-tool'
          }
        ],
        connectedTo: ['loc-activity-room', 'loc-stairs']
      }
    ],

    timeline: [
      { time: '15:30', event: '최윤아, 조민수에게 "할 말이 있다"고 연락', participants: ['char-mastermind', 'char-victim-student'], location: '학교', importance: 'major', isRevealed: false },
      { time: '15:50', event: '조민수, 특별활동실로 이동', participants: ['char-victim-student'], location: '지하 복도', importance: 'major', isRevealed: false },
      { time: '15:55', event: '최윤아, 수면제 탄 음료를 조민수에게 줌', participants: ['char-mastermind', 'char-victim-student'], location: '특별활동실', importance: 'critical', isRevealed: false },
      { time: '16:00', event: '조민수 기절, 최윤아 밖으로 나옴', participants: ['char-mastermind'], location: '특별활동실', importance: 'critical', isRevealed: false },
      { time: '16:05', event: '최윤아, 환기구를 통해 안쪽 걸쇠를 잠금', participants: ['char-mastermind'], location: '지하 복도', importance: 'critical', isRevealed: false },
      { time: '16:10', event: '최윤아, 학생회실로 복귀', participants: ['char-mastermind'], location: '학생회실', importance: 'major', isRevealed: false },
      { time: '17:00', event: '특별활동실에서 응답 없음 발견, 문 강제 개방', participants: [], location: '특별활동실', importance: 'major', isRevealed: true }
    ],

    solution: {
      summary: '최윤아가 협박범 조민수를 기절시키고, 환기구를 통해 밀실을 만들었다.',
      detailedExplanation: [
        '조민수는 최윤아의 과거 부정행위를 알고 협박하고 있었다.',
        '최윤아는 협박에서 벗어나기 위해 계획을 세웠다.',
        '조민수를 특별활동실로 불러 수면제 탄 음료를 주었다.',
        '조민수가 기절하자 밖으로 나왔다.',
        '옷걸이로 만든 철사를 이용해 환기구를 통해 안쪽 걸쇠를 잠갔다.',
        '안에서 잠긴 것처럼 위장해 자신은 아무 관련 없는 척했다.',
        '협박 증거(휴대폰)를 가져가려 했으나 시간이 부족했다.'
      ],
      keyEvidence: ['evidence-drink', 'evidence-vent', 'evidence-tool', 'evidence-phone-message', 'evidence-alibi-gap'],
      howToSolve: [
        '밀실이 어떻게 만들어졌는지 구조 파악',
        '환기구를 통한 조작 가능성 확인',
        '피해자와 갈등이 있던 사람 찾기',
        '알리바이 공백 확인'
      ],
      commonMistakes: [
        '피해자가 스스로 문을 잠갔다고 생각하는 것',
        '외부 침입자를 의심하는 것'
      ]
    },

    deductionKeywords: {
      who: ['최윤아', '학생회', '부회장'],
      why: ['협박', '부정행위', '비밀', '두려움'],
      how: ['환기구', '수면제', '철사', '밀실'],
      when: ['4시', '16:00', '오후'],
      where: ['특별활동실', '지하', '환기구']
    },

    tags: ['밀실', '협박', '학생회', '수면제', '트릭'],
    author: 'DEDUCTIO Team',
    version: '1.0.0'
  },

  // ========================================
  // 시나리오 #2: 밀실에서 발견된 협박 편지
  // ========================================
  {
    id: 'mystery-002',
    title: '밀실에서 발견된 협박 편지',
    subtitle: '잠긴 교무실에 남겨진 의문의 편지',
    type: 'mystery',
    difficulty: 'easy',
    estimatedTime: 15,

    prologue: [
      '아침 첫 수업 전, 교무실 문은 굳게 잠겨있었다.',
      '하지만 교장선생님 책상 위에는 협박 편지가...',
      '누가, 어떻게 넣었을까?'
    ],
    introduction: [
      '교장선생님의 책상 위에서 협박 편지가 발견되었습니다.',
      '교무실은 어젯밤부터 아침까지 잠겨있었습니다.',
      'CCTV에도 아무도 들어간 흔적이 없습니다.',
      '범인은 누구일까요?'
    ],
    setting: '청운고등학교 교무실',

    crimeTime: '06:30',
    crimeLocation: '교무실',
    culpritId: 'char-janitor',
    victimId: 'char-principal',
    motive: '부당 해고에 대한 분노',
    motiveDetail: '청소부가 계약 해지를 통보받고 교장에게 항의하려 했으나 무시당했다.',
    method: '청소 시간을 이용해 편지를 몰래 남김',
    methodDetail: '청소부는 전날 저녁 청소 시간에 편지를 미리 숨겨두고, 아침 일찍 다시 청소하러 들어가 책상 위에 올려놓았다.',

    characters: [
      {
        id: 'char-principal',
        name: '김대성',
        role: 'victim',
        age: 55,
        gender: 'male',
        occupation: '교장',
        personality: '권위적이고 차갑다',
        appearance: '회색 양복, 엄격한 인상',
        background: '30년 교육 경력, 보수적인 경영 방식',
        alibi: {
          location: '자택',
          time: '06:30',
          activity: '출근 준비 중',
          witnesses: ['가족'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-janitor', type: '고용주', description: '청소부를 해고하려 함' }
        ],
        secrets: [
          {
            id: 'secret-principal-1',
            content: '예산 절감을 위해 청소부들을 대량 해고할 계획',
            importance: 'major',
            revealCondition: '편지 내용 분석'
          }
        ],
        dialogues: [
          {
            topic: '편지',
            lines: ['누군가 날 협박하고 있어!', '이건 명백한 위협이야!']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-janitor',
        name: '이순덕',
        role: 'culprit',
        age: 48,
        gender: 'female',
        occupation: '청소부',
        personality: '조용하지만 억울함을 참지 못함',
        appearance: '작은 체구, 피곤한 눈빛',
        background: '5년간 학교 청소, 최근 해고 통보 받음',
        alibi: {
          location: '교무실',
          time: '06:30',
          activity: '아침 청소 중',
          witnesses: ['char-guard'],
          hasHole: false
        },
        motive: {
          type: 'revenge',
          description: '부당 해고에 대한 분노',
          strength: 2
        },
        relationships: [
          { targetId: 'char-principal', type: '직원', description: '해고 통보를 받음' }
        ],
        secrets: [
          {
            id: 'secret-janitor-1',
            content: '전날 저녁 청소 중 편지를 서랍에 숨겨두었다',
            importance: 'critical',
            revealCondition: 'CCTV 재확인 및 청소 시간표 조회'
          }
        ],
        dialogues: [
          {
            topic: '청소',
            lines: ['저는 매일 6시 30분에 출근해요.', '열쇠는... 경비실에서 받아요.']
          },
          {
            topic: '교장',
            lines: ['...별 말씀을요.', '(긴장하며) 그냥 청소만 하는 사람이에요.']
          }
        ],
        nervousTriggers: ['해고', '편지', '협박']
      },
      {
        id: 'char-guard',
        name: '박철수',
        role: 'witness',
        age: 60,
        gender: 'male',
        occupation: '경비',
        personality: '성실하고 규칙적',
        appearance: '경비복, 열쇠뭉치',
        background: '10년간 학교 경비 근무',
        alibi: {
          location: '경비실',
          time: '06:30',
          activity: '근무 중',
          witnesses: [],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-janitor', type: '동료', description: '매일 아침 열쇠를 건네줌' }
        ],
        secrets: [
          {
            id: 'secret-guard-1',
            content: '이순덕이 전날 저녁에도 청소를 했고, 이상하게 오래 걸렸다',
            importance: 'major',
            revealCondition: '청소 시간 질문'
          }
        ],
        dialogues: [
          {
            topic: '열쇠',
            lines: ['교무실 열쇠는 제가 관리해요.', '이 아주머니가 매일 아침 받아가죠.']
          },
          {
            topic: '어제',
            lines: ['어제도 청소하셨는데... 평소보다 좀 오래 걸리셨어요.', '뭐 청소할 게 많았나봐요.']
          }
        ],
        nervousTriggers: []
      }
    ],

    evidence: [
      {
        id: 'evidence-letter',
        name: '협박 편지',
        type: 'physical',
        description: '교장 책상 위의 편지',
        detailedDescription: '"당신의 비양심적인 결정을 멈추지 않으면 후회할 것이다" - 인쇄된 글씨',
        location: '교무실',
        foundAt: '교장 책상',
        linkedCharacters: ['char-janitor', 'char-principal'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: true,
        analysisResult: '편지 용지에서 청소용 세제 성분 검출'
      },
      {
        id: 'evidence-cctv',
        name: 'CCTV 기록',
        type: 'digital',
        description: '교무실 복도 CCTV',
        detailedDescription: '저녁 6시 청소부 입장, 7시 30분 퇴장. 아침 6시 30분 재입장.',
        location: '복도',
        foundAt: 'CCTV 관제실',
        linkedCharacters: ['char-janitor'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: true,
        analysisResult: '저녁 청소가 평소보다 30분 더 걸렸다'
      },
      {
        id: 'evidence-drawer',
        name: '서랍 지문',
        type: 'physical',
        description: '교장 책상 서랍',
        detailedDescription: '서랍 안쪽에 이순덕의 지문 발견',
        location: '교무실',
        foundAt: '책상 서랍',
        linkedCharacters: ['char-janitor'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: true,
        analysisResult: '청소부가 서랍을 열었던 흔적'
      }
    ],

    locations: [
      {
        id: 'loc-office',
        name: '교무실',
        description: '교장실이 포함된 교무실',
        atmosphere: '조용하고 깨끗한 사무 공간',
        objects: [
          {
            id: 'obj-desk',
            name: '교장 책상',
            description: '깔끔하게 정리된 책상',
            examinationResult: '편지가 놓여있고, 서랍에 청소부 지문이 있다.',
            containsEvidence: 'evidence-letter'
          }
        ],
        connectedTo: ['loc-corridor']
      },
      {
        id: 'loc-corridor',
        name: '복도',
        description: '교무실 앞 복도',
        atmosphere: 'CCTV가 설치된 감시 구역',
        objects: [
          {
            id: 'obj-cctv',
            name: 'CCTV',
            description: '24시간 녹화',
            examinationResult: '청소부의 출입 기록 확인됨',
            containsEvidence: 'evidence-cctv'
          }
        ],
        connectedTo: ['loc-office', 'loc-guard-room']
      }
    ],

    timeline: [
      { time: '18:00', event: '이순덕, 저녁 청소 시작', participants: ['char-janitor'], location: '교무실', importance: 'major', isRevealed: false },
      { time: '18:45', event: '이순덕, 편지를 책상 서랍에 숨김', participants: ['char-janitor'], location: '교무실', importance: 'critical', isRevealed: false },
      { time: '19:30', event: '이순덕, 청소 종료 후 퇴근', participants: ['char-janitor'], location: '교무실', importance: 'major', isRevealed: false },
      { time: '06:30', event: '이순덕, 아침 청소 시작, 편지를 책상 위에 올림', participants: ['char-janitor'], location: '교무실', importance: 'critical', isRevealed: false },
      { time: '07:30', event: '교장 출근, 편지 발견', participants: ['char-principal'], location: '교무실', importance: 'major', isRevealed: true }
    ],

    solution: {
      summary: '청소부 이순덕이 청소 시간을 이용해 편지를 남겼다.',
      detailedExplanation: [
        '이순덕은 부당 해고 통보에 분노했다.',
        '전날 저녁 청소 중 미리 편지를 서랍에 숨겨두었다.',
        '다음날 아침 청소 때 편지를 꺼내 책상 위에 올려놓았다.',
        'CCTV에는 정상적인 청소 모습만 보였다.',
        '편지 용지에서 청소용 세제 성분이 검출되어 범인 특정'
      ],
      keyEvidence: ['evidence-letter', 'evidence-cctv', 'evidence-drawer'],
      howToSolve: [
        'CCTV 기록 분석',
        '청소 시간 확인',
        '편지 용지 분석',
        '서랍 지문 확인'
      ],
      commonMistakes: [
        '외부 침입자를 의심하는 것',
        '학생을 범인으로 생각하는 것'
      ]
    },

    deductionKeywords: {
      who: ['이순덕', '청소부'],
      why: ['해고', '분노', '부당'],
      how: ['청소', '서랍', '편지'],
      when: ['아침', '06:30', '청소시간'],
      where: ['교무실', '책상']
    },

    tags: ['협박편지', '청소부', '밀실', '트릭', '해고'],
    author: 'DEDUCTIO',
    version: '1.0'
  },

  // ========================================
  // 시나리오 #3: 갑자기 멈춘 시계탑
  // ========================================
  {
    id: 'mystery-003',
    title: '갑자기 멈춘 시계탑',
    subtitle: '정확히 3시 15분에 멈춘 시계, 그 의미는?',
    type: 'mystery',
    difficulty: 'medium',
    estimatedTime: 20,

    prologue: [
      '학교의 상징인 시계탑이 멈췄다.',
      '정확히 3시 15분을 가리킨 채로.',
      '그런데 이상하다. 왜 하필 그 시간에?'
    ],
    introduction: [
      '학교 시계탑이 3시 15분에 멈췄습니다.',
      '관리인은 고장이라고 하지만, 이상한 점이 있습니다.',
      '같은 시각, 체육관에서 도난 사건이 발생했습니다.',
      '우연일까요?'
    ],
    setting: '청운고등학교 시계탑 및 체육관',

    crimeTime: '15:15',
    crimeLocation: '체육관',
    culpritId: 'char-athlete',
    victimId: 'char-coach',
    motive: '체육관 예산 횡령 증거 인멸',
    motiveDetail: '운동부 주장이 코치의 예산 횡령 증거를 발견하고 이를 이용하려다, 코치에게 역으로 협박당하자 증거를 훔쳤다.',
    method: '시계탑을 일부러 멈춰 알리바이 시간을 혼란시킴',
    methodDetail: '범인은 시계탑 전원을 차단해 3시 15분에 멈추게 했다. 실제 범행은 3시 45분에 이루어졌으나, 목격자들은 시계를 보고 3시 15분이라고 착각했다.',

    characters: [
      {
        id: 'char-coach',
        name: '강태민',
        role: 'victim',
        age: 42,
        gender: 'male',
        occupation: '축구부 코치',
        personality: '외향적이나 속으로는 탐욕스러움',
        appearance: '운동복, 건장한 체격',
        background: '전 프로 선수 출신, 10년째 코치 활동',
        alibi: {
          location: '체육관 사무실',
          time: '15:15',
          activity: '회의 중',
          witnesses: ['char-teacher'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-athlete', type: '코치-선수', description: '최근 갈등 있음' }
        ],
        secrets: [
          {
            id: 'secret-coach-1',
            content: '운동부 예산 300만원을 개인적으로 사용했다',
            importance: 'critical',
            revealCondition: '회계 장부 확인'
          }
        ],
        dialogues: [
          {
            topic: '도난',
            lines: ['내 사무실 금고가 털렸어!', '중요한 서류가 들어있었는데!']
          }
        ],
        nervousTriggers: ['예산', '횡령', '장부']
      },
      {
        id: 'char-athlete',
        name: '박준혁',
        role: 'culprit',
        age: 18,
        gender: 'male',
        occupation: '축구부 주장 / 3학년',
        personality: '정의감이 강하지만 충동적',
        appearance: '운동선수 체격, 단호한 눈빛',
        background: '명문대 체육특기생 입시 준비 중',
        alibi: {
          location: '운동장',
          time: '15:15',
          activity: '훈련 중',
          witnesses: ['char-teammate'],
          hasHole: true,
          holeDetail: '3시 20분~3시 50분 사이 화장실 다녀온다며 자리 비움'
        },
        motive: {
          type: 'revenge',
          description: '코치의 횡령 증거를 확보하려 함',
          strength: 3
        },
        relationships: [
          { targetId: 'char-coach', type: '선수-코치', description: '최근 코치의 비리를 발견함' }
        ],
        secrets: [
          {
            id: 'secret-athlete-1',
            content: '시계탑 전기실 열쇠를 몰래 복제했다',
            importance: 'critical',
            revealCondition: '사물함 수색'
          },
          {
            id: 'secret-athlete-2',
            content: '3시 15분에 시계를 멈추고, 30분 후 범행을 저질렀다',
            importance: 'critical',
            revealCondition: '타임라인 재구성'
          }
        ],
        dialogues: [
          {
            topic: '시계탑',
            lines: ['시계가 멈췄다고요? 몰랐는데...', '(긴장) 저는 운동장에 있었어요.']
          },
          {
            topic: '코치',
            lines: ['...코치님은 좋은 분이에요.', '(주먹 쥐며) 하지만 뭔가 숨기는 게 있어요.']
          }
        ],
        nervousTriggers: ['시계', '3시', '알리바이']
      },
      {
        id: 'char-teammate',
        name: '김동현',
        role: 'witness',
        age: 18,
        gender: 'male',
        occupation: '축구부원 / 3학년',
        personality: '순진하고 믿음직함',
        appearance: '밝은 표정, 운동복',
        background: '박준혁과 친한 친구',
        alibi: {
          location: '운동장',
          time: '15:15',
          activity: '훈련',
          witnesses: ['char-athlete'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-athlete', type: '친구', description: '가장 친한 친구' }
        ],
        secrets: [
          {
            id: 'secret-teammate-1',
            content: '준혁이가 30분 정도 자리를 비웠다',
            importance: 'major',
            revealCondition: '알리바이 확인'
          }
        ],
        dialogues: [
          {
            topic: '박준혁',
            lines: ['준혁이? 같이 훈련했어요.', '아, 중간에 화장실 간다고 나갔다 왔어요.']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-teacher',
        name: '이현주',
        role: 'witness',
        age: 38,
        gender: 'female',
        occupation: '체육 교사',
        personality: '꼼꼼하고 정확함',
        appearance: '운동복, 안경',
        background: '학교 운동부 총괄 담당',
        alibi: {
          location: '체육관 사무실',
          time: '15:15',
          activity: '코치와 회의',
          witnesses: ['char-coach'],
          hasHole: false
        },
        relationships: [],
        secrets: [
          {
            id: 'secret-teacher-1',
            content: '회의 중 시계를 봤는데 3시 15분이었고, 회의가 끝났을 때도 3시 15분이어서 이상했다',
            importance: 'critical',
            revealCondition: '시간 관련 질문'
          }
        ],
        dialogues: [
          {
            topic: '회의',
            lines: ['3시부터 회의 시작했는데...', '시계를 봤더니 3시 15분이었어요. 근데 회의 끝날 때도 3시 15분이라 이상했어요.']
          }
        ],
        nervousTriggers: []
      }
    ],

    evidence: [
      {
        id: 'evidence-clock',
        name: '멈춘 시계탑',
        type: 'physical',
        description: '3시 15분에 멈춘 시계',
        detailedDescription: '전원이 차단되어 3시 15분에 정지. 전기실에서 의도적으로 차단한 흔적.',
        location: '시계탑',
        foundAt: '시계탑',
        linkedCharacters: ['char-athlete'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: true,
        analysisResult: '3시 15분에 전원 차단됨. 전기실 문에 박준혁 지문 발견'
      },
      {
        id: 'evidence-key',
        name: '복제 열쇠',
        type: 'physical',
        description: '전기실 열쇠 복제본',
        detailedDescription: '박준혁 사물함에서 발견된 전기실 열쇠',
        location: '운동장 사물함',
        foundAt: '박준혁 사물함',
        linkedCharacters: ['char-athlete'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-document',
        name: '횡령 증거 서류',
        type: 'physical',
        description: '박준혁이 훔친 회계 장부',
        detailedDescription: '코치의 예산 유용 내역이 기록된 장부',
        location: '박준혁 가방',
        foundAt: '운동장',
        linkedCharacters: ['char-athlete', 'char-coach'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-testimony-time',
        name: '시간 불일치 증언',
        type: 'testimony',
        description: '이현주 선생님 증언',
        detailedDescription: '회의 시작과 끝 모두 시계가 3시 15분을 가리켰다는 증언',
        location: '체육관',
        foundAt: '인터뷰',
        linkedCharacters: ['char-teacher'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      }
    ],

    locations: [
      {
        id: 'loc-clock-tower',
        name: '시계탑',
        description: '학교 상징인 오래된 시계탑',
        atmosphere: '고풍스러운 건물, 종소리가 울림',
        objects: [
          {
            id: 'obj-electric-room',
            name: '전기실',
            description: '시계탑 전원 제어실',
            examinationResult: '전원이 차단되어 있고, 문에 지문이 있다.',
            containsEvidence: 'evidence-clock'
          }
        ],
        connectedTo: ['loc-gym']
      },
      {
        id: 'loc-gym',
        name: '체육관',
        description: '실내 체육관 및 코치 사무실',
        atmosphere: '운동 기구 냄새, 활기찬 분위기',
        objects: [
          {
            id: 'obj-safe',
            name: '금고',
            description: '코치 사무실 금고',
            examinationResult: '강제로 열린 흔적. 서류가 사라졌다.',
            containsEvidence: 'evidence-document'
          }
        ],
        connectedTo: ['loc-clock-tower', 'loc-field']
      }
    ],

    timeline: [
      { time: '15:10', event: '박준혁, 전기실로 이동', participants: ['char-athlete'], location: '시계탑', importance: 'critical', isRevealed: false },
      { time: '15:15', event: '박준혁, 시계탑 전원 차단', participants: ['char-athlete'], location: '시계탑 전기실', importance: 'critical', isRevealed: false },
      { time: '15:20', event: '박준혁, 운동장으로 복귀', participants: ['char-athlete'], location: '운동장', importance: 'major', isRevealed: false },
      { time: '15:40', event: '박준혁, 화장실 간다며 자리 비움', participants: ['char-athlete'], location: '운동장', importance: 'major', isRevealed: false },
      { time: '15:45', event: '박준혁, 코치 사무실 금고 강제 개방', participants: ['char-athlete'], location: '체육관', importance: 'critical', isRevealed: false },
      { time: '16:00', event: '강태민 코치, 도난 발견', participants: ['char-coach'], location: '체육관', importance: 'major', isRevealed: true }
    ],

    solution: {
      summary: '박준혁이 시계를 멈춰 범행 시각을 위장했다.',
      detailedExplanation: [
        '박준혁은 코치의 횡령 증거를 확보하려 했다.',
        '먼저 3시 15분에 시계탑 전원을 차단해 시계를 멈췄다.',
        '운동장으로 돌아가 훈련하는 척하며 알리바이를 만들었다.',
        '3시 45분, 화장실 간다며 자리를 비워 금고를 털었다.',
        '목격자들은 멈춘 시계를 보고 여전히 3시 15분이라 착각했다.',
        '실제 범행은 3시 45분이었으나 알리바이가 성립되는 듯 보였다.'
      ],
      keyEvidence: ['evidence-clock', 'evidence-key', 'evidence-document', 'evidence-testimony-time'],
      howToSolve: [
        '시계가 멈춘 이유 파악',
        '시간 증언의 모순 발견',
        '전기실 침입 흔적 확인',
        '알리바이 공백 확인'
      ],
      commonMistakes: [
        '실제 범행 시각을 3시 15분으로 착각',
        '외부인을 범인으로 의심'
      ]
    },

    deductionKeywords: {
      who: ['박준혁', '주장', '축구부'],
      why: ['횡령', '증거', '정의'],
      how: ['시계탑', '전원차단', '시간위장'],
      when: ['3시15분', '3시45분'],
      where: ['시계탑', '체육관', '전기실']
    },

    tags: ['시계', '시간트릭', '횡령', '체육관', '알리바이'],
    author: 'DEDUCTIO',
    version: '1.0'
  },

  // ========================================
  // 시나리오 #4: 사라진 시험지와 나타난 답안
  // ========================================
  {
    id: 'mystery-004',
    title: '사라진 시험지와 나타난 답안',
    subtitle: '시험 전날, 인쇄실에서 사라진 시험지의 미스터리',
    type: 'mystery',
    difficulty: 'medium',
    estimatedTime: 18,

    prologue: [
      '내일은 중요한 중간고사.',
      '그런데 인쇄실에서 수학 시험지가 통째로 사라졌다.',
      '다음날, 한 학생의 책상에서 완벽한 답안이 발견되는데...'
    ],
    introduction: [
      '중간고사 시험지가 인쇄실에서 사라졌습니다.',
      '다음날, 시험을 치른 한 학생이 만점을 받았습니다.',
      '그 학생의 사물함에서 시험지 사본이 발견되었습니다.',
      '하지만 그 학생은 결백을 주장합니다. 진실은?'
    ],
    setting: '청운고등학교 인쇄실 및 교실',

    crimeTime: '19:30',
    crimeLocation: '인쇄실',
    culpritId: 'char-teacher-math',
    victimId: 'char-student-innocent',
    motive: '우수 학생 만들기 위한 부정 조작',
    motiveDetail: '수학 교사가 자신이 지도하는 학생을 전국 수학 경시대회에 내보내기 위해 성적을 조작하려 했으나, 실수로 다른 학생에게 누명을 씌웠다.',
    method: '시험지를 몰래 빼돌려 특정 학생에게 주고, 들킬 뻔하자 다른 학생 사물함에 증거를 숨김',
    methodDetail: '교사는 시험지를 빼내 자신의 제자에게 주었으나, 다른 교사가 의심하자 급하게 무고한 학생의 사물함에 시험지를 넣어 누명을 씌웠다.',

    characters: [
      {
        id: 'char-student-innocent',
        name: '정수진',
        role: 'victim',
        age: 17,
        gender: 'female',
        occupation: '2학년 학생',
        personality: '성실하고 정직함',
        appearance: '안경, 단정한 머리',
        background: '중위권 성적, 평범한 학생',
        alibi: {
          location: '도서관',
          time: '19:30',
          activity: '자습',
          witnesses: ['char-librarian'],
          hasHole: false
        },
        relationships: [],
        secrets: [],
        dialogues: [
          {
            topic: '시험지',
            lines: ['저는 시험지를 본 적 없어요!', '누가 제 사물함에 넣은 거예요!']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-teacher-math',
        name: '김영호',
        role: 'culprit',
        age: 45,
        gender: 'male',
        occupation: '수학 교사',
        personality: '야심차고 성과 지향적',
        appearance: '정장, 날카로운 눈빛',
        background: '20년 교직 경력, 경시대회 지도 담당',
        alibi: {
          location: '교무실',
          time: '19:30',
          activity: '야간 근무',
          witnesses: [],
          hasHole: true,
          holeDetail: '19:30~20:00 사이 자리 비움'
        },
        motive: {
          type: 'greed',
          description: '제자를 경시대회에서 우승시켜 명예 얻기',
          strength: 3
        },
        relationships: [
          { targetId: 'char-student-genius', type: '사제', description: '총애하는 제자' }
        ],
        secrets: [
          {
            id: 'secret-teacher-1',
            content: '시험지를 빼내 이민준에게 주었다',
            importance: 'critical',
            revealCondition: 'CCTV 및 통화 기록 확인'
          },
          {
            id: 'secret-teacher-2',
            content: '들킬 뻔하자 정수진 사물함에 시험지를 넣어 누명 씌움',
            importance: 'critical',
            revealCondition: '시간대 분석'
          }
        ],
        dialogues: [
          {
            topic: '시험지',
            lines: ['부정행위는 용납할 수 없어.', '정수진 학생이 가져갔다는 증거가 명백해.']
          },
          {
            topic: '이민준',
            lines: ['민준이는... 천재적인 학생이지.', '경시대회에 꼭 나가야 해.']
          }
        ],
        nervousTriggers: ['CCTV', '인쇄실', '시간']
      },
      {
        id: 'char-student-genius',
        name: '이민준',
        role: 'suspect',
        age: 17,
        gender: 'male',
        occupation: '2학년 학생',
        personality: '똑똑하지만 도덕성 부족',
        appearance: '자신감 넘치는 표정',
        background: '전교 1등, 수학 천재',
        alibi: {
          location: '학원',
          time: '19:30',
          activity: '수학 심화 수업',
          witnesses: ['학원 강사'],
          hasHole: false
        },
        motive: {
          type: 'greed',
          description: '완벽한 성적으로 특목고 진학',
          strength: 2
        },
        relationships: [
          { targetId: 'char-teacher-math', type: '제자', description: '김영호 선생님의 총애를 받음' }
        ],
        secrets: [
          {
            id: 'secret-genius-1',
            content: '시험 전날 김영호 선생님과 통화했고, 시험지를 미리 받았다',
            importance: 'critical',
            revealCondition: '휴대폰 기록 분석'
          }
        ],
        dialogues: [
          {
            topic: '시험',
            lines: ['시험? 쉬웠어요.', '...운이 좋았나봐요.']
          },
          {
            topic: '선생님',
            lines: ['김 선생님? 존경하는 분이에요.', '(긴장) 많이 배우고 있어요.']
          }
        ],
        nervousTriggers: ['시험지', '통화', '김영호']
      },
      {
        id: 'char-librarian',
        name: '최은영',
        role: 'witness',
        age: 50,
        gender: 'female',
        occupation: '사서',
        personality: '관찰력이 뛰어남',
        appearance: '온화한 인상, 안경',
        background: '15년 사서 근무',
        alibi: {
          location: '도서관',
          time: '19:30',
          activity: '야간 개방 관리',
          witnesses: ['char-student-innocent'],
          hasHole: false
        },
        relationships: [],
        secrets: [
          {
            id: 'secret-librarian-1',
            content: '정수진이 7시부터 10시까지 계속 도서관에 있었다',
            importance: 'major',
            revealCondition: '알리바이 확인'
          }
        ],
        dialogues: [
          {
            topic: '정수진',
            lines: ['수진이는 저녁 내내 여기 있었어요.', '인쇄실에 갈 시간이 없었어요.']
          }
        ],
        nervousTriggers: []
      }
    ],

    evidence: [
      {
        id: 'evidence-exam-paper',
        name: '시험지 사본',
        type: 'physical',
        description: '정수진 사물함에서 발견된 시험지',
        detailedDescription: '수학 중간고사 시험지. 하지만 정수진 지문이 없고, 김영호 지문만 발견됨.',
        location: '사물함',
        foundAt: '정수진 사물함',
        linkedCharacters: ['char-teacher-math', 'char-student-innocent'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: true,
        analysisResult: '김영호 교사 지문 검출, 정수진 지문 없음'
      },
      {
        id: 'evidence-cctv-print',
        name: '인쇄실 CCTV',
        type: 'digital',
        description: '인쇄실 CCTV 기록',
        detailedDescription: '19:30 김영호 교사 출입, 시험지 꺼내가는 장면 포착',
        location: '인쇄실',
        foundAt: 'CCTV 관제실',
        linkedCharacters: ['char-teacher-math'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-phone-record',
        name: '통화 기록',
        type: 'digital',
        description: '이민준 휴대폰 기록',
        detailedDescription: '시험 전날 밤 8시, 김영호 교사와 15분 통화',
        location: '휴대폰',
        foundAt: '이민준 휴대폰',
        linkedCharacters: ['char-teacher-math', 'char-student-genius'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-library-log',
        name: '도서관 출입 기록',
        type: 'digital',
        description: '정수진 도서관 이용 기록',
        detailedDescription: '19:00 입장, 22:00 퇴장',
        location: '도서관',
        foundAt: '도서관 시스템',
        linkedCharacters: ['char-student-innocent'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      }
    ],

    locations: [
      {
        id: 'loc-print-room',
        name: '인쇄실',
        description: '시험지를 보관하는 잠긴 방',
        atmosphere: '종이와 잉크 냄새, 조용함',
        objects: [
          {
            id: 'obj-cabinet',
            name: '시험지 보관함',
            description: '잠긴 캐비닛',
            examinationResult: '수학 시험지 한 부 없어짐',
            containsEvidence: 'evidence-cctv-print'
          }
        ],
        connectedTo: ['loc-hallway']
      },
      {
        id: 'loc-locker',
        name: '사물함 구역',
        description: '학생 사물함이 있는 복도',
        atmosphere: '학생들이 오가는 공간',
        objects: [
          {
            id: 'obj-locker-sujin',
            name: '정수진 사물함',
            description: '227번 사물함',
            examinationResult: '시험지 발견됨. 누군가 몰래 넣은 것으로 추정',
            containsEvidence: 'evidence-exam-paper'
          }
        ],
        connectedTo: ['loc-hallway']
      }
    ],

    timeline: [
      { time: '19:30', event: '김영호, 인쇄실에서 시험지 몰래 가져감', participants: ['char-teacher-math'], location: '인쇄실', importance: 'critical', isRevealed: false },
      { time: '20:00', event: '김영호, 이민준에게 전화로 시험 문제 유형 알려줌', participants: ['char-teacher-math', 'char-student-genius'], location: '전화', importance: 'critical', isRevealed: false },
      { time: '20:30', event: '다른 교사가 시험지 분실 발견, 수색 시작', participants: [], location: '교무실', importance: 'major', isRevealed: true },
      { time: '21:00', event: '김영호, 정수진 사물함에 시험지 몰래 넣음', participants: ['char-teacher-math'], location: '사물함 구역', importance: 'critical', isRevealed: false },
      { time: '21:30', event: '정수진 사물함에서 시험지 발견', participants: [], location: '사물함 구역', importance: 'major', isRevealed: true }
    ],

    solution: {
      summary: '김영호 교사가 제자를 위해 시험지를 빼돌렸다가 정수진에게 누명을 씌웠다.',
      detailedExplanation: [
        '김영호는 이민준을 경시대회에 출전시키기 위해 완벽한 성적이 필요했다.',
        '시험 전날, 인쇄실에서 시험지를 몰래 가져갔다.',
        '이민준에게 전화로 문제 유형과 답을 알려주었다.',
        '시험지 분실이 발각되자 급하게 정수진 사물함에 시험지를 숨겼다.',
        '하지만 CCTV, 지문, 통화기록이 진실을 밝혀냈다.',
        '정수진은 완벽한 알리바이가 있었다.'
      ],
      keyEvidence: ['evidence-exam-paper', 'evidence-cctv-print', 'evidence-phone-record', 'evidence-library-log'],
      howToSolve: [
        '시험지에서 지문 분석',
        'CCTV 확인',
        '정수진 알리바이 확인',
        '통화 기록 분석'
      ],
      commonMistakes: [
        '정수진을 범인으로 단정',
        '이민준을 주범으로 생각'
      ]
    },

    deductionKeywords: {
      who: ['김영호', '교사', '수학'],
      why: ['경시대회', '명예', '성과'],
      how: ['시험지', '누명', '사물함'],
      when: ['시험전날', '19:30'],
      where: ['인쇄실', '사물함']
    },

    tags: ['시험부정', '누명', '교사', 'CCTV', '지문'],
    author: 'DEDUCTIO',
    version: '1.0'
  },

  // ========================================
  // 시나리오 #5: 텅 빈 교실의 발자국
  // ========================================
  {
    id: 'mystery-005',
    title: '텅 빈 교실의 발자국',
    subtitle: '아무도 없어야 할 교실, 왜 발자국이?',
    type: 'mystery',
    difficulty: 'easy',
    estimatedTime: 15,

    prologue: [
      '방학 중인 학교, 3층 교실은 비어있어야 했다.',
      '그런데 먼지 쌓인 바닥에 선명한 발자국이...',
      '누군가 이곳에 왔다는 증거. 왜?'
    ],
    introduction: [
      '방학 중 학교에 발자국이 발견되었습니다.',
      '3-2반 교실, 먼지 위에 선명한 운동화 자국.',
      '경비는 아무도 들어오지 않았다고 하는데...',
      '누가, 왜 들어왔을까요?'
    ],
    setting: '청운고등학교 3층 교실 (방학 중)',

    crimeTime: '03:00',
    crimeLocation: '3-2반 교실',
    culpritId: 'char-student-runaway',
    victimId: undefined,
    motive: '가출 후 숨을 곳이 필요했음',
    motiveDetail: '학생이 가정 폭력을 피해 가출했고, 안전한 숨을 곳을 찾다 모교 교실에 몰래 들어왔다.',
    method: '후문 담을 넘어 침입, 교실에서 몇 일간 숨어 지냄',
    methodDetail: '후문 쪽 담이 낮아 넘을 수 있었고, 3층 교실 창문이 열려있어 침입했다. 낮에는 숨어있다가 밤에만 활동했다.',

    characters: [
      {
        id: 'char-student-runaway',
        name: '윤서아',
        role: 'culprit',
        age: 18,
        gender: 'female',
        occupation: '3학년 학생 (가출)',
        personality: '조용하고 겁이 많음',
        appearance: '창백한 얼굴, 지친 눈빛',
        background: '가정 폭력 피해자, 방학 중 가출',
        alibi: {
          location: '불명',
          time: '03:00',
          activity: '행방불명',
          witnesses: [],
          hasHole: true
        },
        motive: {
          type: 'fear',
          description: '숨을 곳이 필요했음',
          strength: 2
        },
        relationships: [],
        secrets: [
          {
            id: 'secret-runaway-1',
            content: '일주일 전부터 학교 교실에서 몰래 지내고 있었다',
            importance: 'critical',
            revealCondition: '교실 수색'
          }
        ],
        dialogues: [
          {
            topic: '가출',
            lines: ['...집에는 갈 수 없어요.', '여기만이 안전한 곳이었어요.']
          }
        ],
        nervousTriggers: ['집', '가족', '경찰']
      },
      {
        id: 'char-security',
        name: '조성철',
        role: 'witness',
        age: 58,
        gender: 'male',
        occupation: '경비',
        personality: '책임감 강함',
        appearance: '경비복, 손전등',
        background: '5년째 학교 경비 근무',
        alibi: {
          location: '경비실',
          time: '03:00',
          activity: '순찰 중',
          witnesses: [],
          hasHole: false
        },
        relationships: [],
        secrets: [
          {
            id: 'secret-security-1',
            content: '후문 쪽 담이 낮아서 누구나 넘을 수 있다는 것을 알고 있었다',
            importance: 'major',
            revealCondition: '순찰 경로 질문'
          }
        ],
        dialogues: [
          {
            topic: '침입',
            lines: ['정문은 확실히 잠겼어요.', '...후문 쪽은 담이 낮긴 해요.']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-teacher-homeroom',
        name: '박미선',
        role: 'witness',
        age: 42,
        gender: 'female',
        occupation: '3-2반 담임',
        personality: '따뜻하고 학생들을 잘 챙김',
        appearance: '부드러운 인상',
        background: '15년 교직 경력',
        alibi: {
          location: '자택',
          time: '03:00',
          activity: '수면',
          witnesses: ['가족'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-student-runaway', type: '사제', description: '윤서아 담임 교사' }
        ],
        secrets: [
          {
            id: 'secret-teacher-hr-1',
            content: '윤서아가 가정 폭력을 당하고 있다는 것을 알고 있었다',
            importance: 'major',
            revealCondition: '윤서아 신상 질문'
          }
        ],
        dialogues: [
          {
            topic: '윤서아',
            lines: ['서아는... 힘든 상황이에요.', '집에 문제가 있어서... 혹시 서아가 위험한 건 아닐까요?']
          }
        ],
        nervousTriggers: []
      }
    ],

    evidence: [
      {
        id: 'evidence-footprint',
        name: '발자국',
        type: 'physical',
        description: '먼지 위의 운동화 자국',
        detailedDescription: '240mm 크기 운동화, 윤서아가 신던 신발과 일치',
        location: '3-2반 교실',
        foundAt: '교실 바닥',
        linkedCharacters: ['char-student-runaway'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: true,
        analysisResult: '윤서아 운동화와 일치'
      },
      {
        id: 'evidence-blanket',
        name: '담요',
        type: 'physical',
        description: '교실 구석에 숨겨진 담요',
        detailedDescription: '윤서아가 사용하던 담요, 며칠간 사용한 흔적',
        location: '3-2반 교실',
        foundAt: '교실 수납장 안',
        linkedCharacters: ['char-student-runaway'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-food-wrapper',
        name: '과자 봉지',
        type: 'physical',
        description: '쓰레기통 속 과자 봉지',
        detailedDescription: '최근 먹은 것으로 보이는 여러 개의 과자 봉지',
        location: '3-2반 교실',
        foundAt: '쓰레기통',
        linkedCharacters: ['char-student-runaway'],
        isCritical: false,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-window',
        name: '열린 창문',
        type: 'physical',
        description: '3층 교실 창문',
        detailedDescription: '밖에서 타고 올라올 수 있는 구조. 비상계단과 연결됨.',
        location: '3-2반 교실',
        foundAt: '창문',
        linkedCharacters: ['char-student-runaway'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      }
    ],

    locations: [
      {
        id: 'loc-classroom',
        name: '3-2반 교실',
        description: '방학 중 비어있는 교실',
        atmosphere: '먼지 쌓이고 조용함',
        objects: [
          {
            id: 'obj-floor',
            name: '교실 바닥',
            description: '먼지가 쌓인 바닥',
            examinationResult: '선명한 발자국 발견',
            containsEvidence: 'evidence-footprint'
          },
          {
            id: 'obj-storage',
            name: '수납장',
            description: '교실 뒤 수납장',
            examinationResult: '담요와 개인 물품 숨겨져 있음',
            containsEvidence: 'evidence-blanket'
          }
        ],
        connectedTo: ['loc-hallway']
      },
      {
        id: 'loc-back-gate',
        name: '후문',
        description: '학교 뒤편 출입구',
        atmosphere: '담이 낮고 외진 곳',
        objects: [
          {
            id: 'obj-fence',
            name: '담장',
            description: '높이 1.5m의 낮은 담',
            examinationResult: '넘어온 흔적 발견'
          }
        ],
        connectedTo: ['loc-hallway']
      }
    ],

    timeline: [
      { time: '7일 전', event: '윤서아, 가정 폭력 피해 후 가출 결심', participants: ['char-student-runaway'], location: '자택', importance: 'major', isRevealed: false },
      { time: '6일 전 23:00', event: '윤서아, 후문 담 넘어 학교 침입', participants: ['char-student-runaway'], location: '후문', importance: 'critical', isRevealed: false },
      { time: '6일 전 23:30', event: '윤서아, 3-2반 교실에 정착', participants: ['char-student-runaway'], location: '3-2반', importance: 'critical', isRevealed: false },
      { time: '1일 전 03:00', event: '윤서아, 야간 활동 중 발자국 남김', participants: ['char-student-runaway'], location: '3-2반', importance: 'major', isRevealed: false },
      { time: '현재 10:00', event: '경비가 발자국 발견', participants: ['char-security'], location: '3-2반', importance: 'major', isRevealed: true }
    ],

    solution: {
      summary: '가출한 학생 윤서아가 학교 교실에 숨어 지내고 있었다.',
      detailedExplanation: [
        '윤서아는 가정 폭력을 피해 가출했다.',
        '안전한 숨을 곳으로 모교를 선택했다.',
        '후문 담을 넘어 3층 교실에 침입했다.',
        '낮에는 숨어있고 밤에만 활동하며 일주일간 지냈다.',
        '발자국, 담요, 과자 봉지가 증거로 남았다.'
      ],
      keyEvidence: ['evidence-footprint', 'evidence-blanket', 'evidence-food-wrapper', 'evidence-window'],
      howToSolve: [
        '발자국 크기 분석',
        '교실 수색',
        '침입 경로 파악',
        '학생 명단 확인'
      ],
      commonMistakes: [
        '외부 침입자를 의심',
        '범죄 목적으로 착각'
      ]
    },

    deductionKeywords: {
      who: ['윤서아', '학생', '3학년'],
      why: ['가출', '가정폭력', '숨을곳'],
      how: ['후문', '담넘기', '창문'],
      when: ['야간', '새벽', '일주일'],
      where: ['3-2반', '교실']
    },

    tags: ['가출', '학생', '침입', '발자국', '사회문제'],
    author: 'DEDUCTIO',
    version: '1.0'
  },

  // ========================================
  // 시나리오 #6: 복도에서 들리는 피아노 소리
  // ========================================
  {
    id: 'mystery-006',
    title: '복도에서 들리는 피아노 소리',
    subtitle: '한밤중, 아무도 없는 음악실에서 울려퍼지는 피아노 선율',
    type: 'mystery',
    difficulty: 'easy',
    estimatedTime: 15,

    prologue: [
      '밤 10시, 야간자율학습 중.',
      '복도에서 피아노 소리가 들린다.',
      '음악실은 분명 잠겨있는데...'
    ],
    introduction: [
      '야간자율학습 중 음악실에서 피아노 소리가 들립니다.',
      '음악실은 잠겨있고, 열쇠는 교무실에 보관되어 있습니다.',
      '여러 학생들이 소리를 들었다고 증언합니다.',
      '누가 연주하고 있는 걸까요?'
    ],
    setting: '청운고등학교 음악실 및 4층 복도',

    crimeTime: '22:00',
    crimeLocation: '음악실',
    culpritId: 'char-student-pianist',
    victimId: undefined,
    motive: '콩쿠르 연습을 위해 몰래 침입',
    motiveDetail: '피아노 콩쿠르가 일주일 앞으로 다가왔지만 집에 피아노가 없어 학교 피아노를 몰래 사용했다.',
    method: '음악 선생님 열쇠를 몰래 복사해 야간에 침입',
    methodDetail: '음악 선생님이 잠깐 자리를 비운 사이 열쇠를 복사했고, 야간자율학습 시간에 몰래 음악실에서 연습했다.',

    characters: [
      {
        id: 'char-student-pianist',
        name: '한예진',
        role: 'culprit',
        age: 17,
        gender: 'female',
        occupation: '2학년 학생',
        personality: '열정적이지만 다소 무모함',
        appearance: '긴 머리, 피아노 치는 손',
        background: '피아노 특기생, 가난한 집안',
        alibi: {
          location: '화장실',
          time: '22:00',
          activity: '화장실 간다고 했음',
          witnesses: [],
          hasHole: true,
          holeDetail: '30분 이상 자리 비움'
        },
        motive: {
          type: 'jealousy',
          description: '콩쿠르 연습이 절실했음',
          strength: 2
        },
        relationships: [],
        secrets: [
          {
            id: 'secret-pianist-1',
            content: '음악실 열쇠를 복사해서 가지고 있다',
            importance: 'critical',
            revealCondition: '가방 수색'
          }
        ],
        dialogues: [
          {
            topic: '피아노',
            lines: ['...저는 피아노 소리 못 들었어요.', '(긴장) 화장실 갔다 왔어요.']
          },
          {
            topic: '콩쿠르',
            lines: ['다음주 콩쿠르요? ...준비가 안 돼서 걱정이에요.', '집에 피아노가 없어서...']
          }
        ],
        nervousTriggers: ['열쇠', '음악실', '침입']
      },
      {
        id: 'char-student-witness1',
        name: '이지현',
        role: 'witness',
        age: 17,
        gender: 'female',
        occupation: '2학년 학생',
        personality: '호기심 많고 관찰력 좋음',
        appearance: '짧은 머리, 안경',
        background: '한예진과 같은 반',
        alibi: {
          location: '자습실',
          time: '22:00',
          activity: '공부 중',
          witnesses: ['여러 학생'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-student-pianist', type: '친구', description: '같은 반 친구' }
        ],
        secrets: [
          {
            id: 'secret-witness1-1',
            content: '예진이가 10시쯤 자리를 비웠고 오랫동안 돌아오지 않았다',
            importance: 'major',
            revealCondition: '알리바이 질문'
          }
        ],
        dialogues: [
          {
            topic: '피아노소리',
            lines: ['분명히 들었어요! 쇼팽 녹턴이었어요.', '예진이가 콩쿠르에서 칠 곡이에요.']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-teacher-music',
        name: '김소영',
        role: 'witness',
        age: 35,
        gender: 'female',
        occupation: '음악 교사',
        personality: '섬세하고 학생들을 이해함',
        appearance: '우아한 인상',
        background: '피아니스트 출신 교사',
        alibi: {
          location: '자택',
          time: '22:00',
          activity: '퇴근 후 휴식',
          witnesses: ['가족'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-student-pianist', type: '사제', description: '예진의 재능을 높이 평가함' }
        ],
        secrets: [
          {
            id: 'secret-music-1',
            content: '예진이가 경제적 어려움으로 피아노 연습을 못한다는 것을 알고 있다',
            importance: 'major',
            revealCondition: '예진 상황 질문'
          }
        ],
        dialogues: [
          {
            topic: '한예진',
            lines: ['예진이는 천재적인 재능이 있어요.', '하지만 집에 피아노가 없어서... 안타까워요.']
          }
        ],
        nervousTriggers: []
      }
    ],

    evidence: [
      {
        id: 'evidence-key-copy',
        name: '복제 열쇠',
        type: 'physical',
        description: '한예진 가방에서 발견된 음악실 열쇠',
        detailedDescription: '음악실 열쇠 복제본',
        location: '자습실',
        foundAt: '한예진 가방',
        linkedCharacters: ['char-student-pianist'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-piano-bench',
        name: '피아노 의자 높이',
        type: 'physical',
        description: '피아노 의자가 조정되어 있음',
        detailedDescription: '의자 높이가 한예진 신장에 맞게 조정됨',
        location: '음악실',
        foundAt: '그랜드 피아노 앞',
        linkedCharacters: ['char-student-pianist'],
        isCritical: false,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-testimony-song',
        name: '곡 목격 증언',
        type: 'testimony',
        description: '쇼팽 녹턴 연주 소리',
        detailedDescription: '여러 학생들이 쇼팽 녹턴을 들었다고 증언. 한예진 콩쿠르 곡과 일치',
        location: '복도',
        foundAt: '학생 증언',
        linkedCharacters: ['char-student-pianist'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-absence',
        name: '부재 증언',
        type: 'testimony',
        description: '한예진 부재 시간',
        detailedDescription: '이지현 증언: 예진이가 10시부터 30분 넘게 자리를 비웠다',
        location: '자습실',
        foundAt: '증언',
        linkedCharacters: ['char-student-pianist'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      }
    ],

    locations: [
      {
        id: 'loc-music-room',
        name: '음악실',
        description: '그랜드 피아노가 있는 음악실',
        atmosphere: '방음이 잘 되지 않아 복도까지 소리 들림',
        objects: [
          {
            id: 'obj-piano',
            name: '그랜드 피아노',
            description: '학교 자랑인 스타인웨이 피아노',
            examinationResult: '최근 연주한 흔적. 의자 높이가 조정되어 있음.',
            containsEvidence: 'evidence-piano-bench'
          }
        ],
        connectedTo: ['loc-hallway']
      },
      {
        id: 'loc-study-room',
        name: '자습실',
        description: '야간자율학습 장소',
        atmosphere: '조용하지만 복도 소리가 들림',
        objects: [],
        connectedTo: ['loc-hallway']
      }
    ],

    timeline: [
      { time: '21:50', event: '한예진, 화장실 간다며 자리 비움', participants: ['char-student-pianist'], location: '자습실', importance: 'major', isRevealed: false },
      { time: '22:00', event: '한예진, 음악실 침입하여 피아노 연습 시작', participants: ['char-student-pianist'], location: '음악실', importance: 'critical', isRevealed: false },
      { time: '22:05', event: '학생들, 복도에서 피아노 소리 듣기 시작', participants: ['char-student-witness1'], location: '복도', importance: 'major', isRevealed: true },
      { time: '22:25', event: '한예진, 연습 종료하고 음악실 나옴', participants: ['char-student-pianist'], location: '음악실', importance: 'critical', isRevealed: false },
      { time: '22:30', event: '한예진, 자습실로 복귀', participants: ['char-student-pianist'], location: '자습실', importance: 'major', isRevealed: false }
    ],

    solution: {
      summary: '한예진이 피아노 연습을 위해 열쇠를 복사하여 음악실에 몰래 들어갔다.',
      detailedExplanation: [
        '한예진은 콩쿠르를 일주일 앞두고 있었다.',
        '하지만 집에 피아노가 없어 연습할 곳이 없었다.',
        '음악실 열쇠를 몰래 복사했다.',
        '야간자율학습 시간, 화장실 간다며 자리를 비워 음악실로 갔다.',
        '30분간 쇼팽 녹턴을 연습했고, 이 소리가 복도로 새어나갔다.',
        '복제 열쇠와 증언이 범인을 특정했다.'
      ],
      keyEvidence: ['evidence-key-copy', 'evidence-testimony-song', 'evidence-absence'],
      howToSolve: [
        '연주된 곡 파악',
        '콩쿠르 참가자 확인',
        '부재 시간 확인',
        '가방 수색'
      ],
      commonMistakes: [
        '유령을 의심',
        '외부인을 범인으로 생각'
      ]
    },

    deductionKeywords: {
      who: ['한예진', '학생', '피아니스트'],
      why: ['콩쿠르', '연습', '피아노없음'],
      how: ['복제열쇠', '야간침입'],
      when: ['야간자율학습', '22:00'],
      where: ['음악실', '피아노']
    },

    tags: ['피아노', '음악실', '열쇠복제', '콩쿠르', '학생'],
    author: 'DEDUCTIO',
    version: '1.0'
  },

  // ========================================
  // 시나리오 #7: 옥상의 의문의 메시지
  // ========================================
  {
    id: 'mystery-007',
    title: '옥상의 의문의 메시지',
    subtitle: '옥상 바닥에 분필로 쓰인 암호문',
    type: 'mystery',
    difficulty: 'medium',
    estimatedTime: 20,

    prologue: [
      '옥상은 출입금지 구역이다.',
      '그런데 바닥에 누군가 메시지를 남겼다.',
      '"3-14, 16:30, 진실을 밝혀라" 무슨 뜻일까?'
    ],
    introduction: [
      '옥상에서 의문의 메시지가 발견되었습니다.',
      '"3-14, 16:30, 진실을 밝혀라"',
      '옥상은 잠겨있고 출입이 불가능한 곳입니다.',
      '이 메시지의 의미와 작성자를 찾아야 합니다.'
    ],
    setting: '청운고등학교 옥상',

    crimeTime: '16:00',
    crimeLocation: '옥상',
    culpritId: 'char-student-informant',
    victimId: 'char-bully',
    motive: '학교 폭력 신고를 위한 제보',
    motiveDetail: '익명 제보자가 3-14반에서 일어나는 학교 폭력을 알리기 위해 옥상에 메시지를 남겼다.',
    method: '비상계단을 통해 옥상 접근, 분필로 메시지 작성',
    methodDetail: '비상계단 끝 문이 고장나 열리는 것을 알고 있었다. 몰래 올라가 메시지를 남기고 내려왔다.',

    characters: [
      {
        id: 'char-student-informant',
        name: '최유라',
        role: 'culprit',
        age: 17,
        gender: 'female',
        occupation: '3학년 학생',
        personality: '정의감이 강하지만 소심함',
        appearance: '작은 체구, 조용한 인상',
        background: '학교 폭력을 목격했으나 직접 신고할 용기가 없었음',
        alibi: {
          location: '도서관',
          time: '16:00',
          activity: '독서',
          witnesses: ['char-librarian'],
          hasHole: true,
          holeDetail: '16:00~16:20 사이 화장실 다녀옴'
        },
        motive: {
          type: 'protection',
          description: '학교 폭력을 신고하고 싶었음',
          strength: 3
        },
        relationships: [
          { targetId: 'char-victim-bullying', type: '관찰자', description: '피해자를 안타깝게 여김' }
        ],
        secrets: [
          {
            id: 'secret-informant-1',
            content: '3-14반 학교 폭력을 목격했지만 보복이 두려워 익명으로 제보하려 했다',
            importance: 'critical',
            revealCondition: '메시지 의미 파악 후 심문'
          },
          {
            id: 'secret-informant-2',
            content: '분필 가루가 손과 옷에 묻어있다',
            importance: 'major',
            revealCondition: '신체 검사'
          }
        ],
        dialogues: [
          {
            topic: '메시지',
            lines: ['...몰라요.', '(떨리는 목소리) 저는 옥상에 간 적 없어요.']
          },
          {
            topic: '3-14반',
            lines: ['3-14반에... 안 좋은 일이 있는 것 같아요.', '누군가 도와줘야 해요.']
          }
        ],
        nervousTriggers: ['옥상', '분필', '신고']
      },
      {
        id: 'char-bully',
        name: '강민석',
        role: 'victim',
        age: 18,
        gender: 'male',
        occupation: '3-14반 학생',
        personality: '폭력적이고 지배욕 강함',
        appearance: '건장한 체격, 거친 인상',
        background: '3-14반에서 다른 학생을 괴롭힘',
        alibi: {
          location: '교실',
          time: '16:30',
          activity: '청소 중',
          witnesses: ['char-victim-bullying'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-victim-bullying', type: '가해자', description: '피해자를 지속적으로 괴롭힘' }
        ],
        secrets: [
          {
            id: 'secret-bully-1',
            content: '매일 16:30 청소시간에 피해자에게 폭력을 행사했다',
            importance: 'critical',
            revealCondition: '메시지 시간 의미 파악'
          }
        ],
        dialogues: [
          {
            topic: '청소',
            lines: ['청소? 그냥 하고 있어.', '(위협적) 뭐가 문제야?']
          }
        ],
        nervousTriggers: ['신고', '폭력', '증거']
      },
      {
        id: 'char-victim-bullying',
        name: '박준호',
        role: 'witness',
        age: 18,
        gender: 'male',
        occupation: '3-14반 학생',
        personality: '소극적이고 두려움에 떨고 있음',
        appearance: '멍 자국, 고개 숙인 자세',
        background: '강민석에게 지속적으로 폭력 당함',
        alibi: {
          location: '3-14반 교실',
          time: '16:30',
          activity: '청소 중',
          witnesses: ['char-bully'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-bully', type: '피해자', description: '폭력 피해자' }
        ],
        secrets: [
          {
            id: 'secret-victim-bully-1',
            content: '매일 청소시간에 폭력을 당하지만 말하지 못했다',
            importance: 'critical',
            revealCondition: '안전한 환경에서 면담'
          }
        ],
        dialogues: [
          {
            topic: '강민석',
            lines: ['...아무 일 없어요.', '(눈물) 제발... 그냥 넘어가주세요.']
          },
          {
            topic: '청소시간',
            lines: ['(떨며) 청소시간이 제일 무서워요.', '...이유는 말 못해요.']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-security-chief',
        name: '한동수',
        role: 'witness',
        age: 52,
        gender: 'male',
        occupation: '경비 팀장',
        personality: '책임감 있지만 관찰력 부족',
        appearance: '경비복, 열쇠뭉치',
        background: '10년째 학교 경비',
        alibi: {
          location: '경비실',
          time: '16:00',
          activity: '근무',
          witnesses: [],
          hasHole: false
        },
        relationships: [],
        secrets: [
          {
            id: 'secret-security-chief-1',
            content: '비상계단 옥상 문이 고장나서 잠기지 않는다는 것을 알고 있었지만 방치했다',
            importance: 'major',
            revealCondition: '옥상 접근 경로 질문'
          }
        ],
        dialogues: [
          {
            topic: '옥상',
            lines: ['옥상은 잠겨있어요.', '...음, 비상계단 쪽은... 수리가 필요하긴 해요.']
          }
        ],
        nervousTriggers: []
      }
    ],

    evidence: [
      {
        id: 'evidence-message',
        name: '옥상 메시지',
        type: 'physical',
        description: '분필로 쓰인 메시지',
        detailedDescription: '"3-14, 16:30, 진실을 밝혀라" - 3-14반, 16:30에 학교폭력 발생 암시',
        location: '옥상',
        foundAt: '옥상 바닥',
        linkedCharacters: ['char-student-informant'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: true,
        analysisResult: '메시지는 3-14반 청소시간 폭력을 가리킴'
      },
      {
        id: 'evidence-chalk-dust',
        name: '분필 가루',
        type: 'physical',
        description: '최유라 손과 옷의 분필 가루',
        detailedDescription: '흰색 분필 가루가 손과 교복 소매에 묻어있음',
        location: '도서관',
        foundAt: '최유라 신체',
        linkedCharacters: ['char-student-informant'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-door',
        name: '고장난 문',
        type: 'physical',
        description: '비상계단 옥상 문',
        detailedDescription: '잠금장치 고장으로 누구나 열 수 있음',
        location: '비상계단',
        foundAt: '옥상 입구',
        linkedCharacters: [],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-bruise',
        name: '박준호 멍 자국',
        type: 'physical',
        description: '팔과 등의 멍',
        detailedDescription: '오래되고 새로운 멍이 섞여있음. 지속적 폭력의 증거',
        location: '3-14반',
        foundAt: '박준호 신체',
        linkedCharacters: ['char-victim-bullying', 'char-bully'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      }
    ],

    locations: [
      {
        id: 'loc-rooftop',
        name: '옥상',
        description: '출입금지 구역',
        atmosphere: '바람 부는 높은 곳',
        objects: [
          {
            id: 'obj-message-floor',
            name: '바닥',
            description: '콘크리트 바닥',
            examinationResult: '분필로 쓰인 메시지 발견',
            containsEvidence: 'evidence-message'
          }
        ],
        connectedTo: ['loc-emergency-stairs']
      },
      {
        id: 'loc-emergency-stairs',
        name: '비상계단',
        description: '옥상으로 가는 계단',
        atmosphere: '좁고 어두운 계단',
        objects: [
          {
            id: 'obj-broken-door',
            name: '옥상 출입문',
            description: '잠금장치가 고장난 문',
            examinationResult: '누구나 열 수 있는 상태',
            containsEvidence: 'evidence-door'
          }
        ],
        connectedTo: ['loc-rooftop', 'loc-hallway']
      },
      {
        id: 'loc-classroom-314',
        name: '3-14반 교실',
        description: '문제의 교실',
        atmosphere: '청소시간의 긴장감',
        objects: [],
        connectedTo: ['loc-hallway']
      }
    ],

    timeline: [
      { time: '15:50', event: '최유라, 도서관에서 자리 비움', participants: ['char-student-informant'], location: '도서관', importance: 'major', isRevealed: false },
      { time: '16:00', event: '최유라, 비상계단 통해 옥상 접근', participants: ['char-student-informant'], location: '비상계단', importance: 'critical', isRevealed: false },
      { time: '16:05', event: '최유라, 옥상에 메시지 작성', participants: ['char-student-informant'], location: '옥상', importance: 'critical', isRevealed: false },
      { time: '16:20', event: '최유라, 도서관으로 복귀', participants: ['char-student-informant'], location: '도서관', importance: 'major', isRevealed: false },
      { time: '16:30', event: '강민석, 청소시간에 박준호 폭행', participants: ['char-bully', 'char-victim-bullying'], location: '3-14반', importance: 'critical', isRevealed: false },
      { time: '17:00', event: '경비가 옥상 메시지 발견', participants: ['char-security-chief'], location: '옥상', importance: 'major', isRevealed: true }
    ],

    solution: {
      summary: '최유라가 학교 폭력을 신고하기 위해 옥상에 암호 메시지를 남겼다.',
      detailedExplanation: [
        '최유라는 3-14반에서 일어나는 학교 폭력을 목격했다.',
        '직접 신고할 용기가 없어 익명으로 제보하려 했다.',
        '비상계단 문이 고장난 것을 알고 옥상에 접근했다.',
        '분필로 "3-14, 16:30, 진실을 밝혀라" 메시지를 남겼다.',
        '3-14는 반 번호, 16:30은 폭력이 일어나는 청소시간을 의미했다.',
        '메시지 덕분에 강민석의 학교 폭력이 드러났다.'
      ],
      keyEvidence: ['evidence-message', 'evidence-chalk-dust', 'evidence-door', 'evidence-bruise'],
      howToSolve: [
        '메시지 암호 해독',
        '3-14반 16:30 관찰',
        '분필 가루 발견',
        '옥상 접근 경로 확인'
      ],
      commonMistakes: [
        '메시지를 장난으로 치부',
        '시간과 장소의 의미를 파악하지 못함'
      ]
    },

    deductionKeywords: {
      who: ['최유라', '제보자', '목격자'],
      why: ['학교폭력', '신고', '정의'],
      how: ['옥상', '분필', '암호'],
      when: ['16:00', '16:30', '청소시간'],
      where: ['옥상', '3-14반']
    },

    tags: ['학교폭력', '암호', '옥상', '제보', '정의'],
    author: 'DEDUCTIO',
    version: '1.0'
  },

  // ========================================
  // 시나리오 #8: 화장실 거울에 나타난 글씨
  // ========================================
  {
    id: 'mystery-008',
    title: '화장실 거울에 나타난 글씨',
    subtitle: '김이 서렸을 때만 나타나는 경고 메시지',
    type: 'mystery',
    difficulty: 'easy',
    estimatedTime: 15,

    prologue: ['여학생 화장실', '뜨거운 물을 틀면 거울에 김이 서리고', '"조심해" 라는 글씨가 나타난다'],
    introduction: ['화장실 거울에 의문의 글씨가 발견되었습니다.', '김이 서렸을 때만 "조심해"라는 메시지가 나타납니다.', '누가, 왜 이런 메시지를 남겼을까요?'],
    setting: '청운고등학교 3층 여자 화장실',

    crimeTime: '07:30',
    crimeLocation: '여자 화장실',
    culpritId: 'char-friend-worried',
    victimId: 'char-target-student',
    motive: '친구를 위험으로부터 보호',
    motiveDetail: '친구가 스토킹 피해를 당하고 있다는 것을 알게 되었으나, 직접 말하면 믿지 않을 것 같아 경고 메시지를 남겼다.',
    method: '손가락으로 거울에 기름기 있는 글씨를 남김',
    methodDetail: '핸드크림을 바른 손으로 거울에 글씨를 쓰면, 김이 서렸을 때만 나타나는 원리를 이용했다.',

    characters: [
      {id: 'char-friend-worried', name: '서지은', role: 'culprit', age: 17, gender: 'female', occupation: '2학년', personality: '걱정이 많고 신중함', appearance: '안경, 걱정스런 표정', background: '친구를 지키려는 마음', alibi: {location: '교실', time: '07:30', activity: '조회 준비', witnesses: [], hasHole: true, holeDetail: '7시 20분경 화장실 다녀옴'}, motive: {type: 'protection', description: '친구 보호', strength: 3}, relationships: [{targetId: 'char-target-student', type: '친구', description: '절친'}], secrets: [{id: 'secret-1', content: '핸드크림이 묻은 손으로 거울에 메시지를 썼다', importance: 'critical', revealCondition: '손 검사'}], dialogues: [{topic: '메시지', lines: ['...무서워요.', '누가 그런 짓을...']}, {topic: '친구', lines: ['(떨며) 은주가 위험할까봐...', '누군가 은주를 지켜봐야 해요']}], nervousTriggers: ['은주', '위험', '스토킹']},
      {id: 'char-target-student', name: '김은주', role: 'victim', age: 17, gender: 'female', occupation: '2학년', personality: '밝고 무심함', appearance: '긴 머리, 활발함', background: '스토킹 피해 사실을 모름', alibi: {location: '교실', time: '07:30', activity: '조회', witnesses: ['char-friend-worried'], hasHole: false}, relationships: [{targetId: 'char-friend-worried', type: '친구', description: '절친'}], secrets: [{id: 'secret-2', content: '모르는 남학생이 계속 따라다닌다는 제보가 있었으나 본인은 모름', importance: 'major', revealCondition: '목격자 증언'}], dialogues: [{topic: '메시지', lines: ['조심하라니... 무슨 뜻이지?', '장난 아니에요?']}], nervousTriggers: []}
    ],

    evidence: [
      {id: 'evidence-mirror', name: '거울 메시지', type: 'physical', description: '김 서린 거울의 글씨', detailedDescription: '핸드크림 성분으로 쓰인 "조심해" 글씨', location: '화장실', foundAt: '거울', linkedCharacters: ['char-friend-worried'], isCritical: true, isRedHerring: false, discoveryDifficulty: 1, analysisRequired: true, analysisResult: '핸드크림 성분 검출'},
      {id: 'evidence-handcream', name: '핸드크림', type: 'physical', description: '서지은 가방의 핸드크림', detailedDescription: '거울 메시지와 동일한 성분', location: '교실', foundAt: '서지은 가방', linkedCharacters: ['char-friend-worried'], isCritical: true, isRedHerring: false, discoveryDifficulty: 2, analysisRequired: true, analysisResult: '동일 성분 확인'}
    ],

    locations: [
      {id: 'loc-bathroom', name: '여자 화장실', description: '3층 여자 화장실', atmosphere: '조용하고 깨끗함', objects: [{id: 'obj-mirror', name: '거울', description: '세면대 거울', examinationResult: '김 서리면 글씨 나타남', containsEvidence: 'evidence-mirror'}], connectedTo: ['loc-hallway']}
    ],

    timeline: [
      {time: '07:20', event: '서지은, 화장실에서 핸드크림으로 거울에 메시지 작성', participants: ['char-friend-worried'], location: '화장실', importance: 'critical', isRevealed: false},
      {time: '08:00', event: '학생들이 거울 메시지 발견', participants: [], location: '화장실', importance: 'major', isRevealed: true}
    ],

    solution: {
      summary: '서지은이 친구를 보호하기 위해 경고 메시지를 남겼다.',
      detailedExplanation: ['서지은은 은주가 스토킹 당하는 것을 목격했다.', '직접 말하면 믿지 않을 것 같아 익명 메시지를 남겼다.', '핸드크림을 이용해 거울에 "조심해"를 썼다.', '김이 서려야 보이는 메시지로 은주에게 경고했다.'],
      keyEvidence: ['evidence-mirror', 'evidence-handcream'],
      howToSolve: ['거울 메시지 성분 분석', '핸드크림 소지자 확인', '친구 관계 파악'],
      commonMistakes: ['유령 소행으로 착각', '장난으로 치부']
    },

    deductionKeywords: {who: ['서지은', '친구'], why: ['보호', '경고', '스토킹'], how: ['핸드크림', '거울', '김'], when: ['아침', '07:20'], where: ['화장실', '거울']},
    tags: ['거울', '메시지', '친구', '보호', '핸드크림'],
    author: 'DEDUCTIO',
    version: '1.0'
  },

  // ========================================
  // 시나리오 #9: 사물함 안의 협박장
  // ========================================
  {
    id: 'mystery-009',
    title: '사물함 안의 협박장',
    subtitle: '잠긴 사물함 안에서 발견된 협박 편지',
    type: 'mystery',
    difficulty: 'medium',
    estimatedTime: 18,

    prologue: ['학생의 사물함은 비밀번호로 잠겨있다.', '그런데 안에 협박 편지가...', '누가, 어떻게 넣었을까?'],
    introduction: ['학생 사물함에서 협박 편지가 발견되었습니다.', '사물함은 비밀번호로 잠겨있었습니다.', '비밀번호를 아는 사람은 본인뿐입니다.', '범인은 누구일까요?'],
    setting: '청운고등학교 복도 사물함',

    crimeTime: '12:30',
    crimeLocation: '복도',
    culpritId: 'char-cleaner-student',
    victimId: 'char-bully-target',
    motive: '괴롭힘에 대한 경고',
    motiveDetail: '청소 당번이 사물함을 청소하다가 우연히 비밀번호를 알게 되었고, 그 학생의 괴롭힘을 멈추게 하려고 협박장을 넣었다.',
    method: '청소 중 비밀번호를 알아내고 편지 투입',
    methodDetail: '사물함 위 먼지를 닦다가 자주 누르는 번호의 버튼만 깨끗한 것을 발견하고 비밀번호를 유추했다.',

    characters: [
      {id: 'char-cleaner-student', name: '이현수', role: 'culprit', age: 17, gender: 'male', occupation: '청소 당번', personality: '조용하고 정의로움', appearance: '평범한 외모', background: '괴롭힘을 목격하고 참지 못함', alibi: {location: '복도', time: '12:30', activity: '청소', witnesses: ['char-witness'], hasHole: false}, motive: {type: 'protection', description: '괴롭힘 중단', strength: 3}, relationships: [], secrets: [{id: 'secret-1', content: '사물함 버튼의 마모도로 비밀번호를 유추했다', importance: 'critical', revealCondition: '청소 방법 질문'}], dialogues: [{topic: '청소', lines: ['매일 복도 청소해요.', '사물함도 닦고...']}, {topic: '협박', lines: ['누군가는... 나쁜 짓을 멈춰야 해요.', '(떨리는 목소리) 제가 할 수 있는 건 이것뿐이었어요']}], nervousTriggers: ['비밀번호', '사물함', '협박']},
      {id: 'char-bully-target', name: '박재훈', role: 'victim', age: 18, gender: 'male', occupation: '3학년', personality: '거칠고 폭력적', appearance: '건장한 체격', background: '다른 학생들을 괴롭힘', alibi: {location: '교실', time: '12:30', activity: '점심', witnesses: [], hasHole: false}, relationships: [], secrets: [{id: 'secret-2', content: '여러 학생을 지속적으로 괴롭혀왔다', importance: 'major', revealCondition: '피해자 증언'}], dialogues: [{topic: '협박', lines: ['누가 감히!', '내 사물함에!']}], nervousTriggers: []}
    ],

    evidence: [
      {id: 'evidence-letter', name: '협박 편지', type: 'physical', description: '사물함 안 편지', detailedDescription: '"괴롭힘을 멈추지 않으면 모두에게 알리겠다"', location: '사물함', foundAt: '박재훈 사물함', linkedCharacters: ['char-cleaner-student'], isCritical: true, isRedHerring: false, discoveryDifficulty: 1, analysisRequired: false},
      {id: 'evidence-buttons', name: '사물함 버튼 마모', type: 'physical', description: '특정 번호만 깨끗함', detailedDescription: '2, 5, 8, 9 버튼이 다른 버튼보다 깨끗하고 자주 눌린 흔적', location: '복도', foundAt: '사물함', linkedCharacters: ['char-cleaner-student'], isCritical: true, isRedHerring: false, discoveryDifficulty: 2, analysisRequired: true, analysisResult: '비밀번호 2589 추정'},
      {id: 'evidence-cleaning', name: '청소 기록', type: 'testimony', description: '이현수 청소 담당', detailedDescription: '매일 해당 구역 청소, 사물함 접근 가능', location: '복도', foundAt: '청소 일지', linkedCharacters: ['char-cleaner-student'], isCritical: true, isRedHerring: false, discoveryDifficulty: 1, analysisRequired: false}
    ],

    locations: [
      {id: 'loc-locker-area', name: '사물함 복도', description: '학생 사물함이 즐비한 복도', atmosphere: '학생들이 오가는 공간', objects: [{id: 'obj-locker', name: '사물함', description: '비밀번호 잠금 사물함', examinationResult: '버튼 마모도로 비밀번호 유추 가능', containsEvidence: 'evidence-buttons'}], connectedTo: ['loc-hallway']}
    ],

    timeline: [
      {time: '12:20', event: '이현수, 복도 청소 중 사물함 버튼 마모 발견', participants: ['char-cleaner-student'], location: '복도', importance: 'major', isRevealed: false},
      {time: '12:30', event: '이현수, 비밀번호 유추하여 사물함 개방, 협박장 투입', participants: ['char-cleaner-student'], location: '복도', importance: 'critical', isRevealed: false},
      {time: '13:00', event: '박재훈, 협박장 발견', participants: ['char-bully-target'], location: '사물함', importance: 'major', isRevealed: true}
    ],

    solution: {
      summary: '청소 당번이 사물함 버튼 마모도로 비밀번호를 알아내 협박장을 넣었다.',
      detailedExplanation: ['이현수는 박재훈의 괴롭힘을 목격했다.', '청소하다 사물함 버튼의 마모도를 관찰했다.', '자주 누르는 번호를 유추해 비밀번호를 알아냈다.', '협박장을 넣어 괴롭힘을 멈추게 하려 했다.'],
      keyEvidence: ['evidence-letter', 'evidence-buttons', 'evidence-cleaning'],
      howToSolve: ['버튼 마모도 분석', '청소 담당자 확인', '괴롭힘 사실 확인'],
      commonMistakes: ['본인이 자작극했다고 의심', '친구가 비밀번호를 알고 있다고 생각']
    },

    deductionKeywords: {who: ['이현수', '청소당번'], why: ['괴롭힘', '정의', '경고'], how: ['버튼마모', '비밀번호', '관찰'], when: ['점심시간', '12:30'], where: ['사물함', '복도']},
    tags: ['사물함', '비밀번호', '괴롭힘', '청소', '관찰력'],
    author: 'DEDUCTIO',
    version: '1.0'
  },

  // ========================================
  // 시나리오 #10: 도서관 금서 목록의 비밀
  // ========================================
  {
    id: 'mystery-010',
    title: '도서관 금서 목록의 비밀',
    subtitle: '금서로 지정된 책들의 숨겨진 공통점',
    type: 'mystery',
    difficulty: 'hard',
    estimatedTime: 25,

    prologue: ['도서관에 갑자기 생긴 금서 목록.', '겉보기엔 관련 없어 보이는 책들...', '하지만 이 책들에는 공통된 비밀이 숨어있다.'],
    introduction: ['도서관에서 특정 책들이 금서로 지정되었습니다.', '사서는 교장의 지시라고 하지만, 이상합니다.', '금서들 사이의 공통점을 찾으면 진실이 밝혀질 것입니다.'],
    setting: '청운고등학교 도서관',

    crimeTime: '09:00',
    crimeLocation: '도서관',
    culpritId: 'char-vice-principal',
    victimId: 'char-principal-innocent',
    motive: '과거 비리 은폐',
    motiveDetail: '교감이 10년 전 입시 비리에 연루되었는데, 그 사실을 다룬 기사와 책들을 금서로 지정해 증거를 인멸하려 했다.',
    method: '교장 명의를 도용하여 금서 지정',
    methodDetail: '교장 직인을 몰래 사용해 금서 목록을 만들고, 모든 책에서 특정 페이지를 찢어냈다.',

    characters: [
      {id: 'char-vice-principal', name: '오태식', role: 'culprit', age: 58, gender: 'male', occupation: '교감', personality: '교활하고 은폐에 능함', appearance: '정장, 날카로운 눈빛', background: '10년 전 입시 비리 연루', alibi: {location: '교감실', time: '09:00', activity: '업무', witnesses: [], hasHole: true, holeDetail: '8시~9시 사이 도서관 방문'}, motive: {type: 'fear', description: '과거 비리 은폐', strength: 3}, relationships: [], secrets: [{id: 'secret-1', content: '10년 전 특정 학생들의 입시에 부정한 방법으로 개입했다', importance: 'critical', revealCondition: '금서 공통점 발견'}, {id: 'secret-2', content: '모든 금서에서 자신의 이름이 나오는 페이지를 찢었다', importance: 'critical', revealCondition: '책 조사'}], dialogues: [{topic: '금서', lines: ['교육적으로 부적절한 내용이라서...', '교장 선생님 지시였어요.']}, {topic: '과거', lines: ['(긴장) 10년 전? ...기억이 잘...', '저와 무슨 상관이죠?']}], nervousTriggers: ['입시', '비리', '10년전', '기사']},
      {id: 'char-principal-innocent', name: '김정민', role: 'victim', age: 60, gender: 'male', occupation: '교장', personality: '정직하고 원칙적', appearance: '온화한 인상', background: '금서 지정을 지시한 적 없음', alibi: {location: '외부 회의', time: '09:00', activity: '교육청 회의', witnesses: ['교육청 직원'], hasHole: false}, relationships: [], secrets: [{id: 'secret-3', content: '금서 목록에 대해 전혀 모르고 있다', importance: 'major', revealCondition: '교장 면담'}], dialogues: [{topic: '금서', lines: ['금서? 내가 지시한 적 없는데...', '누가 내 명의를 도용했군.']}], nervousTriggers: []},
      {id: 'char-librarian-sharp', name: '정혜린', role: 'witness', age: 45, gender: 'female', occupation: '사서', personality: '예리하고 의문을 품음', appearance: '안경, 지적인 인상', background: '이상한 점을 눈치챘으나 확신 없음', alibi: {location: '도서관', time: '09:00', activity: '업무', witnesses: [], hasHole: false}, relationships: [], secrets: [{id: 'secret-4', content: '금서들의 공통점을 발견했다 - 모두 10년 전 입시 관련 내용 포함', importance: 'critical', revealCondition: '금서 목록 분석'}, {id: 'secret-5', content: '교감이 몰래 도서관에 와서 책을 뒤적이는 것을 목격했다', importance: 'major', revealCondition: 'CCTV 확인'}], dialogues: [{topic: '금서', lines: ['이상해요... 이 책들은 서로 관련이 없어 보이는데...', '근데 공통점이... 10년 전 입시 사건을 다뤘어요.']}, {topic: '교감', lines: ['교감 선생님이... 새벽에 도서관에 오신 적이 있어요.', '책을 뒤적이시더라고요.']}], nervousTriggers: []}
    ],

    evidence: [
      {id: 'evidence-banned-list', name: '금서 목록', type: 'physical', description: '교장 명의 금서 목록', detailedDescription: '5권의 책이 금서로 지정됨. 교장 직인이 찍혀있으나 필체가 다름', location: '도서관', foundAt: '공지판', linkedCharacters: ['char-vice-principal'], isCritical: true, isRedHerring: false, discoveryDifficulty: 1, analysisRequired: true, analysisResult: '필체 분석 결과 교감 필체와 일치'},
      {id: 'evidence-torn-pages', name: '찢긴 페이지들', type: 'physical', description: '모든 금서의 특정 페이지 찢김', detailedDescription: '각 책에서 "오태식 교감"이라는 이름이 나오는 페이지가 찢겨져 있음', location: '도서관', foundAt: '금서들', linkedCharacters: ['char-vice-principal'], isCritical: true, isRedHerring: false, discoveryDifficulty: 2, analysisRequired: true, analysisResult: '모두 오태식 관련 페이지'},
      {id: 'evidence-article', name: '10년 전 신문 기사', type: 'digital', description: '입시 비리 기사', detailedDescription: '2014년 입시 부정 사건, 오태식 교감 연루 의혹', location: '인터넷 아카이브', foundAt: '검색', linkedCharacters: ['char-vice-principal'], isCritical: true, isRedHerring: false, discoveryDifficulty: 3, analysisRequired: false},
      {id: 'evidence-cctv', name: 'CCTV 기록', type: 'digital', description: '도서관 CCTV', detailedDescription: '오태식 교감이 새벽 2시에 도서관 침입, 책들을 뒤적이는 장면', location: '도서관', foundAt: 'CCTV', linkedCharacters: ['char-vice-principal'], isCritical: true, isRedHerring: false, discoveryDifficulty: 2, analysisRequired: false}
    ],

    locations: [
      {id: 'loc-library', name: '도서관', description: '학교 중앙 도서관', atmosphere: '조용하고 많은 책들', objects: [{id: 'obj-banned-shelf', name: '금서 서가', description: '금서로 지정된 책들', examinationResult: '모든 책에서 특정 페이지가 찢겨있음', containsEvidence: 'evidence-torn-pages'}], connectedTo: ['loc-hallway']}
    ],

    timeline: [
      {time: '02:00', event: '오태식, 도서관 침입하여 책 페이지 찢음', participants: ['char-vice-principal'], location: '도서관', importance: 'critical', isRevealed: false},
      {time: '08:00', event: '오태식, 위조 공문으로 금서 목록 게시', participants: ['char-vice-principal'], location: '도서관', importance: 'critical', isRevealed: false},
      {time: '09:00', event: '학생들이 금서 목록 발견', participants: [], location: '도서관', importance: 'major', isRevealed: true},
      {time: '10:00', event: '정혜린 사서가 이상함을 감지', participants: ['char-librarian-sharp'], location: '도서관', importance: 'major', isRevealed: false}
    ],

    solution: {
      summary: '교감이 과거 입시 비리를 은폐하기 위해 관련 책들을 금서로 지정하고 증거를 인멸했다.',
      detailedExplanation: ['오태식 교감은 10년 전 입시 비리에 연루되었다.', '자신을 언급한 책들을 발견하고 증거를 없애려 했다.', '교장 명의를 도용하여 금서 목록을 만들었다.', '새벽에 도서관에 침입해 자신의 이름이 나오는 페이지를 모두 찢었다.', '하지만 CCTV와 필체 분석으로 범행이 드러났다.'],
      keyEvidence: ['evidence-banned-list', 'evidence-torn-pages', 'evidence-article', 'evidence-cctv'],
      howToSolve: ['금서들의 공통점 찾기', '찢긴 페이지 분석', '필체 감정', 'CCTV 확인', '10년 전 사건 조사'],
      commonMistakes: ['교장이 진짜 지시했다고 믿음', '책 내용이 부적절해서라고 생각', '금서들의 공통점을 찾지 못함']
    },

    deductionKeywords: {who: ['오태식', '교감'], why: ['비리은폐', '입시부정', '과거'], how: ['명의도용', '페이지찢기', '금서지정'], when: ['새벽', '10년전'], where: ['도서관', '금서']},
    tags: ['도서관', '금서', '비리', '은폐', '과거', '복잡한추리'],
    author: 'DEDUCTIO',
    version: '1.0'
  },

  // ========================================
  // 시나리오 #11: 야간 자율학습 중 정전 사건
  // ========================================
  {
    id: 'mystery-011',
    title: '야간 자율학습 중 정전 사건',
    subtitle: '어둠 속에서 사라진 시험 답안지',
    type: 'mystery',
    difficulty: 'medium',
    estimatedTime: 20,

    prologue: ['야간자율학습 중 갑자기 정전.', '5분 후 전기가 들어왔을 때', '교탁 위의 내일 시험 답안지가 사라졌다.'],
    introduction: ['야간자율학습 중 정전이 발생했습니다.', '불이 꺼진 5분 사이, 답안지가 사라졌습니다.', '어둠 속에서 누군가 움직였습니다.', '범인을 찾아야 합니다.'],
    setting: '청운고등학교 3-1반 교실',

    crimeTime: '21:00',
    crimeLocation: '3-1반 교실',
    culpritId: 'char-desperate-student',
    victimId: undefined,
    motive: '성적 압박으로 인한 부정행위',
    motiveDetail: '성적이 떨어져 부모에게 혼날 처지였던 학생이 답안지를 훔쳐 시험을 무효화시키려 했다.',
    method: '전기실 차단기를 내려 정전을 일으킨 후 답안지 절취',
    methodDetail: '미리 전기실 위치를 파악하고, 자율학습 중 화장실 간다며 나가 차단기를 내렸다. 정전 혼란 속에 교실로 돌아와 답안지를 가져갔다.',

    characters: [
      {id: 'char-desperate-student', name: '장민혁', role: 'culprit', age: 18, gender: 'male', occupation: '3학년', personality: '압박감에 시달림', appearance: '피곤한 얼굴', background: '성적 하락으로 위기', alibi: {location: '교실', time: '21:00', activity: '자습', witnesses: [], hasHole: true, holeDetail: '20:55~21:05 화장실'}, motive: {type: 'fear', description: '시험 무효화', strength: 3}, relationships: [], secrets: [{id: 'secret-1', content: '정전 5분 전 교실을 나갔다', importance: 'critical', revealCondition: '자리 부재 확인'}, {id: 'secret-2', content: '손전등을 가지고 있었다', importance: 'major', revealCondition: '가방 수색'}], dialogues: [{topic: '정전', lines: ['정전? 깜짝 놀랐어요.', '(긴장) 아무것도 안 보였어요.']}, {topic: '시험', lines: ['내일 시험... 망할 것 같아요.', '부모님이... 성적이 더 떨어지면...']}], nervousTriggers: ['답안지', '성적', '전기실']},
      {id: 'char-monitor', name: '김서현', role: 'witness', age: 18, gender: 'female', occupation: '학급 회장', personality: '관찰력 좋음', appearance: '안경, 단정함', background: '반장으로서 책임감 있음', alibi: {location: '교실', time: '21:00', activity: '자습', witnesses: ['여러 학생'], hasHole: false}, relationships: [], secrets: [{id: 'secret-3', content: '정전 직전 민혁이가 나가는 것을 봤다', importance: 'major', revealCondition: '목격 질문'}, {id: 'secret-4', content: '어둠 속에서 손전등 빛을 봤다', importance: 'major', revealCondition: '정전 상황 질문'}], dialogues: [{topic: '정전', lines: ['갑자기 깜깜해졌어요.', '근데 누군가... 손전등을 켠 것 같았어요.']}, {topic: '민혁', lines: ['민혁이? 정전 직전에 나갔어요.', '화장실 간다고...']}], nervousTriggers: []}
    ],

    evidence: [
      {id: 'evidence-circuit-breaker', name: '차단기', type: 'physical', description: '내려진 전기실 차단기', detailedDescription: '3층 차단기만 의도적으로 내려져 있음', location: '전기실', foundAt: '전기실', linkedCharacters: ['char-desperate-student'], isCritical: true, isRedHerring: false, discoveryDifficulty: 1, analysisRequired: false},
      {id: 'evidence-flashlight', name: '손전등', type: 'physical', description: '민혁 가방 속 손전등', detailedDescription: '최근 사용한 흔적, 배터리 따뜻함', location: '교실', foundAt: '민혁 가방', linkedCharacters: ['char-desperate-student'], isCritical: true, isRedHerring: false, discoveryDifficulty: 2, analysisRequired: false},
      {id: 'evidence-answer-sheet', name: '찢어진 답안지', type: 'physical', description: '화장실 쓰레기통의 답안지 조각', detailedDescription: '작게 찢어진 답안지 조각들', location: '화장실', foundAt: '쓰레기통', linkedCharacters: ['char-desperate-student'], isCritical: true, isRedHerring: false, discoveryDifficulty: 2, analysisRequired: false},
      {id: 'evidence-absence', name: '부재 시간', type: 'testimony', description: '김서현 증언', detailedDescription: '장민혁이 정전 직전 자리를 비웠다', location: '교실', foundAt: '증언', linkedCharacters: ['char-desperate-student'], isCritical: true, isRedHerring: false, discoveryDifficulty: 1, analysisRequired: false}
    ],

    locations: [
      {id: 'loc-classroom-31', name: '3-1반 교실', description: '야간자율학습 교실', atmosphere: '조용한 학습 분위기', objects: [{id: 'obj-teachers-desk', name: '교탁', description: '답안지가 있던 곳', examinationResult: '답안지 사라짐'}], connectedTo: ['loc-hallway']},
      {id: 'loc-electric-room', name: '전기실', description: '3층 전기 관리실', atmosphere: '좁고 어두운 공간', objects: [{id: 'obj-breaker', name: '차단기', description: '전기 차단기', examinationResult: '의도적으로 내려진 흔적', containsEvidence: 'evidence-circuit-breaker'}], connectedTo: ['loc-hallway']}
    ],

    timeline: [
      {time: '20:55', event: '장민혁, 화장실 간다며 교실 나감', participants: ['char-desperate-student'], location: '교실', importance: 'major', isRevealed: false},
      {time: '20:58', event: '장민혁, 전기실에서 차단기 내림', participants: ['char-desperate-student'], location: '전기실', importance: 'critical', isRevealed: false},
      {time: '21:00', event: '정전 발생', participants: [], location: '3층', importance: 'major', isRevealed: true},
      {time: '21:02', event: '장민혁, 손전등으로 답안지 절취', participants: ['char-desperate-student'], location: '교실', importance: 'critical', isRevealed: false},
      {time: '21:05', event: '전기 복구, 답안지 분실 발견', participants: [], location: '교실', importance: 'major', isRevealed: true}
    ],

    solution: {
      summary: '장민혁이 성적 압박으로 정전을 일으켜 답안지를 훔쳤다.',
      detailedExplanation: ['장민혁은 성적 하락으로 부모의 압박을 받고 있었다.', '시험을 무효화시키기 위해 답안지를 훔치기로 결심했다.', '자습 시간에 전기실로 가서 차단기를 내렸다.', '어둠 속에서 손전등을 이용해 교탁의 답안지를 가져갔다.', '화장실에서 답안지를 찢어 버렸다.', '손전등, 부재 시간, 차단기 조작이 증거가 되었다.'],
      keyEvidence: ['evidence-circuit-breaker', 'evidence-flashlight', 'evidence-answer-sheet', 'evidence-absence'],
      howToSolve: ['차단기 상태 확인', '정전 시간 분석', '부재자 확인', '손전등 수색', '화장실 조사'],
      commonMistakes: ['사고로 인한 정전으로 착각', '외부인 침입으로 의심']
    },

    deductionKeywords: {who: ['장민혁', '학생'], why: ['성적압박', '시험무효화'], how: ['정전', '차단기', '손전등'], when: ['21:00', '야간자습'], where: ['교실', '전기실']},
    tags: ['정전', '답안지', '부정행위', '성적압박', '손전등'],
    author: 'DEDUCTIO',
    version: '1.0'
  },

  // ========================================
  // 시나리오 #12: 운동장의 미스터리 서클
  // ========================================
  {
    id: 'mystery-012',
    title: '운동장의 미스터리 서클',
    subtitle: '하룻밤 사이 나타난 거대한 원형 무늬',
    type: 'mystery',
    difficulty: 'easy',
    estimatedTime: 15,

    prologue: ['아침에 등교했더니', '운동장에 거대한 원형 무늬가...', 'UFO? 아니면 누군가의 장난?'],
    introduction: ['운동장에 거대한 원형 무늬가 나타났습니다.', '밤사이 누군가 만든 것 같습니다.', 'CCTV에도 찍히지 않았습니다.', '어떻게 만들어진 걸까요?'],
    setting: '청운고등학교 운동장',

    crimeTime: '04:00',
    crimeLocation: '운동장',
    culpritId: 'char-art-club',
    victimId: undefined,
    motive: '문화제 홍보 퍼포먼스',
    motiveDetail: '미술부가 다가오는 문화제를 홍보하기 위해 밤에 몰래 운동장에 거대한 작품을 만들었다.',
    method: '드론으로 CCTV 사각지대 파악 후 새벽에 제작',
    methodDetail: '미리 드론으로 CCTV 사각지대를 확인하고, 밧줄과 분필을 이용해 정교한 원형 무늬를 그렸다.',

    characters: [
      {id: 'char-art-club', name: '이예슬', role: 'culprit', age: 17, gender: 'female', occupation: '미술부 부장', personality: '창의적이고 대담함', appearance: '물감 묻은 옷', background: '예술적 퍼포먼스 좋아함', alibi: {location: '집', time: '04:00', activity: '수면', witnesses: [], hasHole: true}, motive: {type: 'ideology', description: '문화제 홍보', strength: 2}, relationships: [], secrets: [{id: 'secret-1', content: '미술부원들과 함께 새벽에 서클을 만들었다', importance: 'critical', revealCondition: '미술부 조사'}, {id: 'secret-2', content: '옷과 신발에 분필 가루가 묻어있다', importance: 'major', revealCondition: '신체 검사'}], dialogues: [{topic: '서클', lines: ['신기하죠? 예술 작품 같아요.', '(미소) 우리 문화제도 이렇게 신비로울 거예요.']}, {topic: '문화제', lines: ['다음주 문화제예요!', '모두 주목해줬으면 좋겠어요.']}], nervousTriggers: ['CCTV', '분필', '새벽']},
      {id: 'char-security-night', name: '김철호', role: 'witness', age: 55, gender: 'male', occupation: '야간 경비', personality: '성실하지만 순찰 구멍 있음', appearance: '경비복', background: '야간 근무 5년차', alibi: {location: '경비실', time: '04:00', activity: '순찰', witnesses: [], hasHole: true, holeDetail: '3시~5시 경비실에서 졸았음'}, relationships: [], secrets: [{id: 'secret-3', content: '새벽 3시~5시 경비실에서 잠깐 졸았다', importance: 'major', revealCondition: '솔직한 질문'}], dialogues: [{topic: '순찰', lines: ['매시간 순찰 돌았어요.', '...사실 새벽엔 좀 졸았어요.']}, {topic: '서클', lines: ['아침에 봤을 때 깜짝 놀랐어요.', '밤새 아무 소리도 못 들었어요.']}], nervousTriggers: []}
    ],

    evidence: [
      {id: 'evidence-circle', name: '원형 무늬', type: 'physical', description: '운동장의 거대한 서클', detailedDescription: '지름 30m의 정교한 기하학적 무늬, 분필로 그려짐', location: '운동장', foundAt: '운동장 중앙', linkedCharacters: ['char-art-club'], isCritical: true, isRedHerring: false, discoveryDifficulty: 1, analysisRequired: true, analysisResult: '흰색 분필 성분'},
      {id: 'evidence-rope', name: '밧줄 흔적', type: 'physical', description: '서클 중심의 밧줄 구멍', detailedDescription: '중심점에 못과 밧줄을 이용한 흔적', location: '운동장', foundAt: '중심점', linkedCharacters: ['char-art-club'], isCritical: true, isRedHerring: false, discoveryDifficulty: 2, analysisRequired: false},
      {id: 'evidence-chalk-dust', name: '분필 가루', type: 'physical', description: '예슬이 신발의 분필', detailedDescription: '신발과 바지에 묻은 흰색 분필 가루', location: '학교', foundAt: '이예슬', linkedCharacters: ['char-art-club'], isCritical: true, isRedHerring: false, discoveryDifficulty: 2, analysisRequired: true, analysisResult: '운동장 분필과 동일'},
      {id: 'evidence-poster', name: '문화제 포스터', type: 'physical', description: '미술부 문화제 포스터', detailedDescription: '운동장 서클과 동일한 디자인의 문화제 로고', location: '복도', foundAt: '게시판', linkedCharacters: ['char-art-club'], isCritical: true, isRedHerring: false, discoveryDifficulty: 1, analysisRequired: false}
    ],

    locations: [
      {id: 'loc-field', name: '운동장', description: '학교 메인 운동장', atmosphere: '넓은 공간', objects: [{id: 'obj-circle-center', name: '서클 중심', description: '기하학적 무늬의 중심점', examinationResult: '밧줄과 못 사용 흔적', containsEvidence: 'evidence-rope'}], connectedTo: ['loc-school-entrance']}
    ],

    timeline: [
      {time: '03:00', event: '경비 졸기 시작', participants: ['char-security-night'], location: '경비실', importance: 'major', isRevealed: false},
      {time: '04:00', event: '미술부원들, 운동장에서 서클 제작 시작', participants: ['char-art-club'], location: '운동장', importance: 'critical', isRevealed: false},
      {time: '05:30', event: '서클 완성 후 철수', participants: ['char-art-club'], location: '운동장', importance: 'critical', isRevealed: false},
      {time: '07:00', event: '등교 학생들이 서클 발견', participants: [], location: '운동장', importance: 'major', isRevealed: true}
    ],

    solution: {
      summary: '미술부가 문화제 홍보를 위해 운동장에 서클 아트를 만들었다.',
      detailedExplanation: ['미술부는 문화제 홍보 방법을 고민했다.', '경비가 새벽에 졸 것을 예상하고 계획을 세웠다.', '밧줄과 분필을 이용해 정교한 원형 무늬를 그렸다.', '문화제 로고와 동일한 디자인으로 홍보 효과를 노렸다.', '분필 가루와 디자인 일치로 범인 특정'],
      keyEvidence: ['evidence-circle', 'evidence-rope', 'evidence-chalk-dust', 'evidence-poster'],
      howToSolve: ['서클 제작 방법 추론', '분필 가루 확인', '문화제 포스터와 비교', '미술부 조사'],
      commonMistakes: ['UFO 소행으로 믿음', '외부인 침입으로 의심']
    },

    deductionKeywords: {who: ['이예슬', '미술부'], why: ['문화제', '홍보', '예술'], how: ['밧줄', '분필', '기하학'], when: ['새벽', '04:00'], where: ['운동장', '중앙']},
    tags: ['미스터리서클', '예술', '문화제', '홍보', '밧줄'],
    author: 'DEDUCTIO',
    version: '1.0'
  },

  // 시나리오 #13: 실험실 폭발의 진실
  {
    id: 'mystery-013',
    title: '실험실 폭발의 진실',
    subtitle: '과학실 폭발 사고, 실수인가 의도인가?',
    type: 'mystery',
    difficulty: 'hard',
    estimatedTime: 25,
    prologue: ['과학실에서 폭발음이 울렸다.', '다행히 부상자는 없었지만...', '이건 사고가 아니라 의도된 것이었다.'],
    introduction: ['과학실에서 폭발이 발생했습니다.', '실험 중 사고로 보이지만 이상한 점이 있습니다.', '누군가 의도적으로 폭발을 일으킨 것 같습니다.'],
    setting: '청운고등학교 과학실',
    crimeTime: '16:00',
    crimeLocation: '과학실',
    culpritId: 'char-rival',
    victimId: 'char-genius',
    motive: '과학경시대회 방해',
    motiveDetail: '경쟁자가 대회를 앞둔 천재 학생의 실험을 방해하기 위해 화학물질을 바꿔치기했다.',
    method: '실험 재료에 다른 물질을 섞어 폭발 유도',
    methodDetail: '점심시간에 몰래 과학실에 들어가 실험 재료를 바꿔치기했다.',
    characters: [
      {id: 'char-rival', name: '한지우', role: 'culprit', age: 18, gender: 'male', occupation: '3학년', personality: '경쟁심 강함', appearance: '냉정한 표정', background: '과학 2등', alibi: {location: '도서관', time: '16:00', activity: '공부', witnesses: [], hasHole: true, holeDetail: '점심시간 행방 불명'}, motive: {type: 'jealousy', description: '경쟁자 제거', strength: 3}, relationships: [], secrets: [{id: 'secret-1', content: '점심시간에 과학실 출입', importance: 'critical', revealCondition: 'CCTV'}], dialogues: [{topic: '폭발', lines: ['끔찍하네요.', '(냉담) 실험은 조심해야죠.']}], nervousTriggers: ['경시대회', '1등', '화학']},
      {id: 'char-genius', name: '이서준', role: 'victim', age: 18, gender: 'male', occupation: '3학년', personality: '천재적이지만 순진함', appearance: '실험복', background: '과학 천재', alibi: {location: '과학실', time: '16:00', activity: '실험', witnesses: [], hasHole: false}, relationships: [], secrets: [], dialogues: [{topic: '실험', lines: ['분명 제대로 했는데...', '이상해요. 재료가 바뀐 것 같아요.']}], nervousTriggers: []}
    ],
    evidence: [
      {id: 'evidence-chemical', name: '바뀐 화학물질', type: 'physical', description: '다른 물질로 교체됨', detailedDescription: '마그네슘 대신 칼륨이 들어있었음', location: '과학실', foundAt: '시약장', linkedCharacters: ['char-rival'], isCritical: true, isRedHerring: false, discoveryDifficulty: 2, analysisRequired: true, analysisResult: '의도적 교체'},
      {id: 'evidence-cctv-lunch', name: '점심시간 CCTV', type: 'digital', description: '한지우 과학실 침입', detailedDescription: '점심시간 한지우가 과학실 출입', location: '복도', foundAt: 'CCTV', linkedCharacters: ['char-rival'], isCritical: true, isRedHerring: false, discoveryDifficulty: 2, analysisRequired: false}
    ],
    locations: [{id: 'loc-lab', name: '과학실', description: '실험실', atmosphere: '화학 약품 냄새', objects: [], connectedTo: ['loc-hallway']}],
    timeline: [
      {time: '12:30', event: '한지우, 과학실 침입하여 화학물질 교체', participants: ['char-rival'], location: '과학실', importance: 'critical', isRevealed: false},
      {time: '16:00', event: '이서준 실험 중 폭발', participants: ['char-genius'], location: '과학실', importance: 'major', isRevealed: true}
    ],
    solution: {summary: '한지우가 경쟁자의 실험을 방해하기 위해 화학물질을 바꿔치기했다.', detailedExplanation: ['한지우는 과학경시대회 1등을 원했다.', '이서준이 우승 후보였기에 방해하려 했다.', '점심시간에 과학실에 침입했다.', '실험 재료를 위험한 물질로 바꿔치기했다.', '폭발이 일어나며 실험이 망가졌다.'], keyEvidence: ['evidence-chemical', 'evidence-cctv-lunch'], howToSolve: ['화학물질 분석', 'CCTV 확인', '경쟁 관계 파악'], commonMistakes: ['단순 실수로 착각']},
    deductionKeywords: {who: ['한지우', '경쟁자'], why: ['경시대회', '질투'], how: ['바꿔치기', '화학물질'], when: ['점심시간'], where: ['과학실']},
    tags: ['과학', '폭발', '경쟁', '바꿔치기', '경시대회'],
    author: 'DEDUCTIO',
    version: '1.0'
  },

  // 시나리오 #14: 사라진 동아리 회비
  {
    id: 'mystery-014',
    title: '사라진 동아리 회비',
    subtitle: '금고에서 사라진 50만원의 행방',
    type: 'mystery',
    difficulty: 'medium',
    estimatedTime: 18,
    prologue: ['동아리 회비 50만원이 사라졌다.', '금고는 잠겨있었고', '열쇠를 가진 사람은 세 명뿐...'],
    introduction: ['축구 동아리 회비가 사라졌습니다.', '금고는 잠겨있었고 열쇠는 세 명만 가지고 있습니다.', '범인은 이 중 한 명입니다.'],
    setting: '청운고등학교 동아리실',
    crimeTime: '15:00',
    crimeLocation: '동아리실',
    culpritId: 'char-vice',
    victimId: undefined,
    motive: '가족 치료비 마련',
    motiveDetail: '부동아리장이 아픈 동생의 치료비가 급해 회비를 빌리려다 들키지 않으려 훔쳤다.',
    method: '자신의 열쇠로 금고 개방',
    methodDetail: '동아리 활동 후 혼자 남아 금고를 열고 돈을 가져갔다.',
    characters: [
      {id: 'char-vice', name: '박상민', role: 'culprit', age: 17, gender: 'male', occupation: '부동아리장', personality: '책임감 있지만 절박함', appearance: '수척한 얼굴', background: '가정 형편 어려움', alibi: {location: '동아리실', time: '15:00', activity: '정리', witnesses: [], hasHole: false}, motive: {type: 'fear', description: '치료비 필요', strength: 3}, relationships: [], secrets: [{id: 'secret-1', content: '동생이 병원에 입원 중', importance: 'major', revealCondition: '가정 조사'}], dialogues: [{topic: '회비', lines: ['(떨며) 누가 가져갔을까요...']}, {topic: '가족', lines: ['동생이... 아파서...', '(눈물) 돈이 너무 필요했어요...']}], nervousTriggers: ['치료비', '병원']},
      {id: 'char-president', name: '김태현', role: 'witness', age: 18, gender: 'male', occupation: '동아리장', personality: '리더십 있음', appearance: '당당한 자세', background: '동아리 운영 책임자', alibi: {location: '학원', time: '15:00', activity: '수업', witnesses: ['학원 강사'], hasHole: false}, relationships: [], secrets: [{id: 'secret-2', content: '상민이 가정형편이 어렵다는 것을 알고 있었다', importance: 'major', revealCondition: '인간관계 질문'}], dialogues: [{topic: '상민', lines: ['상민이는... 힘든 상황이에요.', '동생 치료비 때문에...']}], nervousTriggers: []}
    ],
    evidence: [
      {id: 'evidence-safe', name: '열린 금고', type: 'physical', description: '정상적으로 열린 금고', detailedDescription: '강제로 연 흔적 없음. 열쇠로 정상 개방', location: '동아리실', foundAt: '금고', linkedCharacters: ['char-vice'], isCritical: true, isRedHerring: false, discoveryDifficulty: 1, analysisRequired: false},
      {id: 'evidence-hospital', name: '병원 진료비 고지서', type: 'physical', description: '상민 가방의 고지서', detailedDescription: '동생 입원비 50만원', location: '동아리실', foundAt: '상민 가방', linkedCharacters: ['char-vice'], isCritical: true, isRedHerring: false, discoveryDifficulty: 2, analysisRequired: false}
    ],
    locations: [{id: 'loc-club', name: '동아리실', description: '축구 동아리 방', atmosphere: '운동 용품 냄새', objects: [], connectedTo: ['loc-hallway']}],
    timeline: [
      {time: '14:30', event: '동아리 활동 종료, 부원들 귀가', participants: [], location: '동아리실', importance: 'major', isRevealed: false},
      {time: '15:00', event: '박상민 혼자 남아 금고 개방, 회비 절취', participants: ['char-vice'], location: '동아리실', importance: 'critical', isRevealed: false},
      {time: '16:00', event: '회비 분실 발견', participants: [], location: '동아리실', importance: 'major', isRevealed: true}
    ],
    solution: {summary: '박상민이 동생 치료비를 위해 회비를 훔쳤다.', detailedExplanation: ['박상민은 동생의 치료비 50만원이 급했다.', '동아리 활동 후 혼자 남았다.', '자신의 열쇠로 금고를 열고 돈을 가져갔다.'], keyEvidence: ['evidence-safe', 'evidence-hospital'], howToSolve: ['금고 개방 방식 확인', '열쇠 소지자 조사', '동기 파악'], commonMistakes: ['외부인 침입으로 의심']},
    deductionKeywords: {who: ['박상민', '부동아리장'], why: ['치료비', '절박함'], how: ['열쇠', '금고'], when: ['15:00'], where: ['동아리실']},
    tags: ['회비', '도난', '가족', '치료비', '딜레마'],
    author: 'DEDUCTIO',
    version: '1.0'
  },

  // 시나리오 #15-20: 간결한 형식으로 나머지 추가
  {id: 'mystery-015', title: '익명 게시판 협박글', subtitle: '학교 게시판에 올라온 의문의 협박', type: 'mystery', difficulty: 'medium', estimatedTime: 20, prologue: ['학교 익명 게시판에 협박글이 올라왔다.', '"진실을 밝히지 않으면 모두에게 알리겠다"'], introduction: ['익명 게시판에 협박 글이 올라왔습니다.', 'IP 추적이 불가능합니다.'], setting: '청운고등학교 온라인', crimeTime: '22:00', crimeLocation: '온라인', culpritId: 'char-hacker', victimId: 'char-corrupt', motive: '부정행위 폭로', motiveDetail: '학생이 교사의 성적 조작을 발견하고 익명으로 폭로 위협을 했다.', method: 'VPN 사용 익명 게시', methodDetail: '하지만 글 속에 자신만 알 수 있는 정보를 실수로 포함시켰다.', characters: [{id: 'char-hacker', name: '정우진', role: 'culprit', age: 18, gender: 'male', occupation: '컴퓨터부', personality: '정의로움', appearance: '후드티', background: 'IT 특기생', alibi: {location: '집', time: '22:00', activity: '온라인', witnesses: [], hasHole: false}, motive: {type: 'ideology', description: '부정 폭로', strength: 3}, relationships: [], secrets: [{id: 's1', content: '글에 자신만 아는 정보 포함', importance: 'critical', revealCondition: '글 분석'}], dialogues: [{topic: '게시글', lines: ['진실은... 밝혀져야죠.']}], nervousTriggers: ['IP', 'VPN']}], evidence: [{id: 'ev1', name: '협박 게시글', type: 'digital', description: '익명 글', detailedDescription: '특정 날짜 언급이 단서', location: '온라인', foundAt: '게시판', linkedCharacters: ['char-hacker'], isCritical: true, isRedHerring: false, discoveryDifficulty: 1, analysisRequired: true, analysisResult: '정우진만 알 수 있는 정보'}], locations: [], timeline: [{time: '22:00', event: '협박 글 게시', participants: ['char-hacker'], location: '온라인', importance: 'critical', isRevealed: false}], solution: {summary: '정우진이 교사의 성적 조작을 폭로하기 위해 익명 게시글을 올렸다.', detailedExplanation: ['VPN을 이용해 익명으로 협박글을 올렸다.', '하지만 글 속에 자신만 아는 정보를 포함시켰다.'], keyEvidence: ['ev1'], howToSolve: ['글 내용 분석', '특정 정보 출처 확인'], commonMistakes: ['IP 추적 불가로 포기']}, deductionKeywords: {who: ['정우진'], why: ['성적조작폭로'], how: ['VPN', '익명'], when: ['22:00'], where: ['온라인']}, tags: ['온라인', 'VPN', '협박'], author: 'DEDUCTIO', version: '1.0'},
  {id: 'mystery-016', title: '체육창고 감금 사건', subtitle: '누군가 학생을 창고에 가뒀다', type: 'mystery', difficulty: 'easy', estimatedTime: 15, prologue: ['방과 후, 체육창고에서 비명이 들렸다.'], introduction: ['체육창고에 학생이 갇혔습니다.'], setting: '청운고등학교 체육창고', crimeTime: '16:30', crimeLocation: '체육창고', culpritId: 'char-prankster', victimId: 'char-locked', motive: '장난', motiveDetail: '친구끼리 장난으로 가뒀으나 열쇠를 잃어버려 문제가 커졌다.', method: '장난으로 가둠', methodDetail: '친구가 창고 안에 있을 때 장난으로 문을 잠갔으나 열쇠를 잃어버렸다.', characters: [{id: 'char-prankster', name: '송민재', role: 'culprit', age: 17, gender: 'male', occupation: '2학년', personality: '장난기 많음', appearance: '활발함', background: '절친', alibi: {location: '교실', time: '16:30', activity: '청소', witnesses: [], hasHole: true}, motive: {type: 'accident', description: '장난', strength: 1}, relationships: [], secrets: [{id: 's1', content: '장난으로 가뒀다가 열쇠 분실', importance: 'critical', revealCondition: '추궁'}], dialogues: [{topic: '사건', lines: ['(땀) 장난이... 너무 심했나봐요...']}], nervousTriggers: ['열쇠']}], evidence: [{id: 'ev1', name: '자물쇠', type: 'physical', description: '민재 지문', detailedDescription: '민재 지문 발견', location: '창고', foundAt: '문', linkedCharacters: ['char-prankster'], isCritical: true, isRedHerring: false, discoveryDifficulty: 1, analysisRequired: true, analysisResult: '민재 지문'}], locations: [], timeline: [{time: '16:30', event: '송민재, 장난으로 문 잠금', participants: ['char-prankster'], location: '창고', importance: 'critical', isRevealed: false}], solution: {summary: '송민재가 장난으로 친구를 가뒀다가 열쇠를 잃어버렸다.', detailedExplanation: ['민재가 장난으로 창고 문을 잠갔다.', '금방 열어주려 했으나 열쇠를 잃어버렸다.'], keyEvidence: ['ev1'], howToSolve: ['자물쇠 지문 확인'], commonMistakes: ['악의적 범행으로 생각']}, deductionKeywords: {who: ['송민재'], why: ['장난'], how: ['자물쇠'], when: ['16:30'], where: ['체육창고']}, tags: ['감금', '장난', '친구'], author: 'DEDUCTIO', version: '1.0'},
  {id: 'mystery-017', title: '수학여행 방 바꿔치기', subtitle: '누군가 방 배정을 바꿨다', type: 'mystery', difficulty: 'medium', estimatedTime: 18, prologue: ['수학여행 방 배정표가 바뀌었다.'], introduction: ['수학여행 방 배정이 바뀌었습니다.'], setting: '청운고등학교', crimeTime: '19:00', crimeLocation: '게시판', culpritId: 'char-matchmaker', victimId: undefined, motive: '친구들 사이 좋게 하기', motiveDetail: '학급 분위기를 위해 사이 안 좋은 친구들을 같은 방에 배정했다.', method: '포토샵 조작', methodDetail: '원본 사진을 찍어 포토샵으로 이름을 바꾼 후 출력해서 붙였다.', characters: [{id: 'char-matchmaker', name: '윤하늘', role: 'culprit', age: 17, gender: 'female', occupation: '2학년', personality: '사교적', appearance: '밝은 미소', background: '반 분위기 메이커', alibi: {location: '컴퓨터실', time: '19:00', activity: '과제', witnesses: [], hasHole: false}, motive: {type: 'protection', description: '화해 유도', strength: 2}, relationships: [], secrets: [{id: 's1', content: '포토샵 파일이 USB에', importance: 'critical', revealCondition: 'USB 조사'}], dialogues: [{topic: '배정표', lines: ['어쩌면... 더 좋은 배정일지도요.']}], nervousTriggers: ['포토샵']}], evidence: [{id: 'ev1', name: '조작된 배정표', type: 'physical', description: '포토샵 흔적', detailedDescription: '포토샵으로 수정됨', location: '게시판', foundAt: '복도', linkedCharacters: ['char-matchmaker'], isCritical: true, isRedHerring: false, discoveryDifficulty: 1, analysisRequired: true, analysisResult: '포토샵 조작 확인'}], locations: [], timeline: [{time: '19:00', event: '포토샵 작업', participants: ['char-matchmaker'], location: '컴퓨터실', importance: 'critical', isRevealed: false}], solution: {summary: '윤하늘이 친구들 사이를 좋게 하려고 방 배정을 바꿨다.', detailedExplanation: ['윤하늘은 사이 안 좋은 친구들을 화해시키고 싶었다.', '원본을 사진 찍어 포토샵으로 조작했다.'], keyEvidence: ['ev1'], howToSolve: ['원본과 비교', '포토샵 흔적 찾기'], commonMistakes: ['악의적 의도로 판단']}, deductionKeywords: {who: ['윤하늘'], why: ['화해'], how: ['포토샵'], when: ['19:00'], where: ['게시판']}, tags: ['포토샵', '선의'], author: 'DEDUCTIO', version: '1.0'},
  {id: 'mystery-018', title: '동창회 사진 조작 사건', subtitle: '추억의 사진에 누군가가 없다', type: 'mystery', difficulty: 'medium', estimatedTime: 20, prologue: ['10년 전 동창회 사진', '그런데 한 명이 지워져 있다'], introduction: ['학교 역사관의 동창회 사진이 조작되었습니다.'], setting: '청운고등학교 역사관', crimeTime: '14:00', crimeLocation: '역사관', culpritId: 'char-jealous', victimId: 'char-success', motive: '질투와 열등감', motiveDetail: '교사가 성공한 동창을 질투하여 사진에서 지웠다.', method: '야간 침입 사진 교체', methodDetail: '원본 사진을 가져가 포토샵으로 조작 후 다시 걸었다.', characters: [{id: 'char-jealous', name: '최영수', role: 'culprit', age: 45, gender: 'male', occupation: '교사', personality: '열등감', appearance: '우울함', background: '같은 학번', alibi: {location: '교무실', time: '14:00', activity: '업무', witnesses: [], hasHole: true}, motive: {type: 'jealousy', description: '질투', strength: 3}, relationships: [], secrets: [{id: 's1', content: '야간 역사관 출입', importance: 'critical', revealCondition: '출입 기록'}], dialogues: [{topic: '사진', lines: ['(쓴웃음) 추억은... 좋은 것만은 아니죠.']}], nervousTriggers: ['성공', '동창']}], evidence: [{id: 'ev1', name: '조작된 사진', type: 'physical', description: '포토샵 흔적', detailedDescription: '한 명 지워짐', location: '역사관', foundAt: '벽', linkedCharacters: ['char-jealous'], isCritical: true, isRedHerring: false, discoveryDifficulty: 1, analysisRequired: true, analysisResult: '포토샵'}], locations: [], timeline: [{time: '02:00', event: '사진 교체', participants: ['char-jealous'], location: '역사관', importance: 'critical', isRevealed: false}], solution: {summary: '최영수 교사가 성공한 동창을 질투하여 사진에서 지웠다.', detailedExplanation: ['질투와 열등감에 사진을 조작했다.'], keyEvidence: ['ev1'], howToSolve: ['원본과 비교'], commonMistakes: ['학생 장난으로 착각']}, deductionKeywords: {who: ['최영수'], why: ['질투'], how: ['포토샵'], when: ['새벽'], where: ['역사관']}, tags: ['질투', '사진조작'], author: 'DEDUCTIO', version: '1.0'},
  {id: 'mystery-019', title: '학교 라디오 해킹', subtitle: '점심 방송이 갑자기 바뀌었다', type: 'mystery', difficulty: 'hard', estimatedTime: 22, prologue: ['점심 시간, 학교 방송에서 갑자기 낯선 목소리가 흘러나왔다'], introduction: ['점심 방송이 해킹당했습니다.'], setting: '청운고등학교 방송실', crimeTime: '12:30', crimeLocation: '방송실', culpritId: 'char-tech', victimId: 'char-board', motive: '학교 비리 폭로', motiveDetail: '학생이 학교 예산 비리를 발견하고 방송으로 폭로했다.', method: '방송 시스템 해킹', methodDetail: '미리 녹음한 파일을 원격으로 방송 시스템에 삽입했다.', characters: [{id: 'char-tech', name: '강민수', role: 'culprit', age: 18, gender: 'male', occupation: '방송부', personality: '정의로움', appearance: '노트북', background: 'IT 특기생', alibi: {location: '교실', time: '12:30', activity: '점심', witnesses: ['여러 학생'], hasHole: false}, motive: {type: 'ideology', description: '비리 폭로', strength: 3}, relationships: [], secrets: [{id: 's1', content: '녹음 파일 준비', importance: 'critical', revealCondition: '노트북 조사'}], dialogues: [{topic: '해킹', lines: ['진실은 밝혀져야죠.']}], nervousTriggers: ['IP']}], evidence: [{id: 'ev1', name: '녹음 파일', type: 'digital', description: '폭로 내용', detailedDescription: '예산 비리 폭로', location: '방송 시스템', foundAt: '서버', linkedCharacters: ['char-tech'], isCritical: true, isRedHerring: false, discoveryDifficulty: 1, analysisRequired: true, analysisResult: '민수 노트북 원본'}], locations: [], timeline: [{time: '12:30', event: '방송 해킹', participants: ['char-tech'], location: '방송실', importance: 'critical', isRevealed: false}], solution: {summary: '강민수가 학교 비리를 폭로하기 위해 방송을 해킹했다.', detailedExplanation: ['방송 시스템을 해킹하여 증거를 폭로했다.'], keyEvidence: ['ev1'], howToSolve: ['방송 시스템 분석'], commonMistakes: ['외부 해커로 의심']}, deductionKeywords: {who: ['강민수'], why: ['비리폭로'], how: ['해킹'], when: ['12:30'], where: ['방송실']}, tags: ['해킹', '비리폭로'], author: 'DEDUCTIO', version: '1.0'},
  {id: 'mystery-020', title: '졸업앨범 사진 교체', subtitle: '누군가의 사진이 바뀌어 있다', type: 'mystery', difficulty: 'medium', estimatedTime: 20, prologue: ['졸업앨범이 도착했다.', '그런데 한 학생의 사진이 전혀 다른 사람으로 바뀌어있다.'], introduction: ['졸업앨범에서 이상한 점이 발견되었습니다.'], setting: '청운고등학교', crimeTime: '인쇄 전', crimeLocation: '인쇄소', culpritId: 'char-committee', victimId: 'char-transferred', motive: '전학간 친구를 위한 장난', motiveDetail: '앨범위원이 전학간 친구를 추억하며 자신의 사진을 친구 사진으로 바꿨다.', method: '인쇄 파일 조작', methodDetail: '최종 파일을 인쇄소에 넘기기 전 포토샵으로 교체했다.', characters: [{id: 'char-committee', name: '정서윤', role: 'culprit', age: 18, gender: 'female', occupation: '졸업앨범위원', personality: '감성적', appearance: '눈물 많음', background: '친구 그리움', alibi: {location: '집', time: '파일 제출일', activity: '최종 검토', witnesses: [], hasHole: false}, motive: {type: 'jealousy', description: '친구 그리움', strength: 2}, relationships: [], secrets: [{id: 's1', content: 'PSD 파일이 USB에', importance: 'critical', revealCondition: 'USB'}], dialogues: [{topic: '사진', lines: ['(눈물) 유진이가... 너무 보고 싶었어요.']}], nervousTriggers: ['전학']}], evidence: [{id: 'ev1', name: '졸업앨범', type: 'physical', description: '교체된 사진', detailedDescription: '유진이 자리에 서윤이 사진', location: '학교', foundAt: '앨범', linkedCharacters: ['char-committee'], isCritical: true, isRedHerring: false, discoveryDifficulty: 1, analysisRequired: false}], locations: [], timeline: [{time: '2주 전', event: '파일 조작', participants: ['char-committee'], location: '집', importance: 'critical', isRevealed: false}], solution: {summary: '정서윤이 전학간 친구를 그리워하며 자신의 사진을 친구로 바꿨다.', detailedExplanation: ['유진이 갑자기 전학을 가게 되었다.', '서윤은 유진이 너무 그리워서 자신 대신 유진을 넣었다.'], keyEvidence: ['ev1'], howToSolve: ['사진 비교', 'PSD 파일 발견'], commonMistakes: ['인쇄소 실수로 착각']}, deductionKeywords: {who: ['정서윤'], why: ['그리움', '우정'], how: ['포토샵'], when: ['인쇄전'], where: ['인쇄소']}, tags: ['졸업앨범', '우정', '그리움'], author: 'DEDUCTIO', version: '1.0'}
];
