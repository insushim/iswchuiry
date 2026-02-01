// ========================================
// 특별 시나리오 10개 - 수작업 제작 (고난이도/복합)
// ========================================

import { Scenario } from './types';

export const specialScenarios: Scenario[] = [
  {
    id: 'special-001',
    title: '졸업식의 비밀',
    subtitle: '10년 전 졸업식에서 무슨 일이?',
    type: 'special',
    difficulty: 'expert',
    estimatedTime: 35,

    prologue: [
      '10년 전, 청운고 졸업식.',
      '그날 이후 한 학생이 실종되었고, 사건은 미해결로 남았다.',
      '10년 만에 돌아온 동창들 사이에서, 과거의 진실이 드러나려 한다.'
    ],
    introduction: [
      '청운고 10주년 동창회 준비위원장이 연락해왔습니다.',
      '"10년 전 실종된 정민혁을 기억하시나요?"',
      '"최근 그 사건과 관련된 편지가 도착했어요. 진실을 밝혀주세요."'
    ],
    setting: '청운고등학교 (현재) / 10년 전 회상',

    crimeTime: '10년 전 졸업식',
    crimeLocation: '학교 옥상',
    culpritId: 'char-hidden-culprit',
    victimId: 'char-missing-person',
    motive: '10년 전 학교폭력의 은폐',
    motiveDetail: '정민혁은 10년 전 학교폭력 피해자였다. 범인들은 졸업식 날 민혁을 협박하다 사고로 죽게 했고, 시신을 학교 어딘가에 숨겼다.',
    method: '옥상에서 밀어 떨어뜨림 후 시신 은폐',
    methodDetail: '졸업식 날, 가해자들은 정민혁을 옥상으로 불러 폭행했다. 실수로 옥상 난간에서 떨어진 민혁을 발견하고, 증거를 없애기 위해 학교 지하 창고에 시신을 숨겼다.',

    characters: [
      {
        id: 'char-missing-person',
        name: '정민혁',
        role: 'victim',
        age: 28,
        gender: 'male',
        occupation: '실종자 (10년 전 졸업생)',
        personality: '내성적이고 소심했음',
        appearance: '마른 체형, 안경',
        background: '10년 전 왕따를 당했으며 졸업식 날 실종.',
        alibi: {
          location: '불명',
          time: '10년 전',
          activity: '실종',
          witnesses: [],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-hidden-culprit', type: '피해자-가해자', description: '10년 전 학교폭력 피해', isSecret: true }
        ],
        secrets: [],
        dialogues: [],
        nervousTriggers: []
      },
      {
        id: 'char-hidden-culprit',
        name: '윤성호',
        role: 'culprit',
        age: 28,
        gender: 'male',
        occupation: '대기업 과장 / 동창회 준비위원',
        personality: '겉으로는 성공한 사업가, 내면에 죄책감',
        appearance: '깔끔한 정장, 지친 눈빛',
        background: '10년 전 일진 그룹의 리더. 현재는 성공한 직장인.',
        alibi: {
          location: '회사',
          time: '현재',
          activity: '업무 중',
          witnesses: ['동료'],
          hasHole: false
        },
        motive: {
          type: 'fear',
          description: '10년 전 사고의 진실이 드러날 것을 두려워함',
          strength: 3
        },
        relationships: [
          { targetId: 'char-missing-person', type: '가해자-피해자', description: '10년 전 정민혁을 괴롭혔음', isSecret: true },
          { targetId: 'char-accomplice-past', type: '공범', description: '함께 사건을 은폐함', isSecret: true }
        ],
        secrets: [
          {
            id: 'secret-culprit-1',
            content: '10년 전 졸업식 날 정민혁을 옥상에서 밀었다',
            importance: 'critical',
            revealCondition: '모든 증거 수집 후 대면'
          }
        ],
        dialogues: [
          {
            topic: '정민혁',
            lines: ['민혁이요? 같은 반이었죠.', '실종 사건... 안타까웠어요.', '(눈을 피하며) 그날 무슨 일이 있었는지는 저도 몰라요.']
          },
          {
            topic: '10년 전',
            lines: ['졸업식이요? 기억이 가물가물하네요.', '다들 졸업에 들떠있었으니까...'],
            requiresEvidence: ['evidence-old-photo']
          }
        ],
        nervousTriggers: ['옥상', '10년 전', '정민혁', '졸업식', '지하']
      },
      {
        id: 'char-accomplice-past',
        name: '강준영',
        role: 'suspect',
        age: 28,
        gender: 'male',
        occupation: '자영업 / 동창',
        personality: '과거에 시달리며 살아옴, 죄책감',
        appearance: '초췌한 모습, 불안한 눈빛',
        background: '10년 전 윤성호의 추종자. 사건 이후 삶이 무너짐.',
        alibi: {
          location: '가게',
          time: '현재',
          activity: '가게 운영',
          witnesses: [],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-hidden-culprit', type: '공범', description: '10년 전 함께 사건에 연루됨' },
          { targetId: 'char-missing-person', type: '가해자-피해자', description: '같이 괴롭혔음' }
        ],
        secrets: [
          {
            id: 'secret-accomplice-1',
            content: '10년 동안 죄책감에 시달려왔다. 진실을 말하고 싶다.',
            importance: 'major',
            revealCondition: '단독 면담 시'
          }
        ],
        dialogues: [
          {
            topic: '정민혁',
            lines: ['(긴 침묵) ...민혁이.', '(떨리는 목소리) 10년 동안... 잊은 적이 없어요.']
          },
          {
            topic: '진실',
            lines: ['더 이상 못 참겠어요.', '성호가... 우리가... 그날...', '민혁이는... 옥상에서...'],
            requiresEvidence: ['evidence-letter']
          }
        ],
        nervousTriggers: ['옥상', '졸업식', '정민혁', '그날']
      },
      {
        id: 'char-sender',
        name: '김서영',
        role: 'witness',
        age: 28,
        gender: 'female',
        occupation: '기자 / 동창',
        personality: '정의롭고 진실을 추구함',
        appearance: '단호한 표정, 기자다운 날카로운 눈빛',
        background: '정민혁과 같은 반이었던 동창. 현재 기자로 활동하며 진실을 파헤치고 있다.',
        alibi: {
          location: '신문사',
          time: '현재',
          activity: '취재 중',
          witnesses: ['동료 기자'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-missing-person', type: '친구', description: '정민혁의 유일한 친구였음' }
        ],
        secrets: [],
        dialogues: [
          {
            topic: '편지',
            lines: ['제가 보낸 거예요. 익명의 편지.', '10년 동안 조사해왔어요. 민혁이에게 무슨 일이 있었는지.']
          },
          {
            topic: '증거',
            lines: ['당시 CCTV가 삭제됐어요. 누군가 의도적으로.', '하지만 백업 테이프가 있을 거예요. 옛날 경비실에.']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-old-guard',
        name: '박만복',
        role: 'witness',
        age: 65,
        gender: 'male',
        occupation: '전 학교 경비원 (은퇴)',
        personality: '과묵하고 양심적',
        appearance: '늙은 모습, 후회 어린 눈빛',
        background: '10년 전 학교 경비원. 당시 뭔가를 봤지만 입을 다물었다.',
        alibi: {
          location: '집',
          time: '현재',
          activity: '은퇴 생활',
          witnesses: [],
          hasHole: false
        },
        relationships: [],
        secrets: [
          {
            id: 'secret-guard-1',
            content: '10년 전 CCTV에 뭔가 찍힌 것을 봤지만 협박당해 삭제했다',
            importance: 'critical',
            revealCondition: '김서영 정보 제공 후'
          }
        ],
        dialogues: [
          {
            topic: '10년 전',
            lines: ['(한숨) 그때 일이... 아직도 가슴에 남아있어요.', '봤어요. 그 애들이 옥상에서 뭔가 하는 걸.']
          },
          {
            topic: 'CCTV',
            lines: ['테이프요? ...숨겨뒀어요. 창고에.', '양심의 가책에... 못 버렸어요.']
          }
        ],
        nervousTriggers: ['CCTV', '옥상', '테이프']
      }
    ],

    evidence: [
      {
        id: 'evidence-letter',
        name: '익명의 편지',
        type: 'document',
        description: '10년 만에 도착한 편지',
        detailedDescription: '"정민혁은 실종된 게 아닙니다. 졸업식 날 무슨 일이 있었는지 조사하세요."',
        location: '동창회 사무실',
        foundAt: '우편함',
        linkedCharacters: ['char-sender'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-old-photo',
        name: '10년 전 졸업사진',
        type: 'document',
        description: '졸업식 날 찍은 단체 사진',
        detailedDescription: '사진 한쪽에 정민혁이 혼자 서있다. 윤성호와 강준영이 그를 노려보고 있다.',
        location: '학교 자료실',
        foundAt: '졸업앨범',
        linkedCharacters: ['char-hidden-culprit', 'char-accomplice-past', 'char-missing-person'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-cctv-tape',
        name: '10년 전 CCTV 테이프',
        type: 'digital',
        description: '삭제됐다던 CCTV의 백업 테이프',
        detailedDescription: '옥상에서 윤성호와 강준영이 정민혁을 밀치는 장면이 담겨있다.',
        location: '옛 경비실 창고',
        foundAt: '박만복이 숨겨둔 테이프',
        linkedCharacters: ['char-hidden-culprit', 'char-accomplice-past', 'char-missing-person'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: true,
        analysisResult: '화질이 좋지 않지만 세 사람의 실루엣과 추락 장면이 확인됨'
      },
      {
        id: 'evidence-basement-door',
        name: '지하 창고 잠금장치',
        type: 'physical',
        description: '10년째 열리지 않는 지하 창고 문',
        detailedDescription: '학교 지하에 10년간 봉인된 창고가 있다. 열쇠가 분실됐다고 한다.',
        location: '학교 지하',
        foundAt: '학교 지하 복도 끝',
        linkedCharacters: [],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-confession-tape',
        name: '강준영의 자백',
        type: 'testimony',
        description: '강준영이 10년 만에 털어놓은 진실',
        detailedDescription: '"성호가 민혁이를 밀었어요. 난간에서. 떨어져서... 우리는 지하 창고에..."',
        location: '동창회장',
        foundAt: '강준영 면담',
        linkedCharacters: ['char-accomplice-past', 'char-hidden-culprit'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      },
      {
        id: 'evidence-remains',
        name: '지하 창고의 유골',
        type: 'forensic',
        description: '10년 만에 발견된 유골',
        detailedDescription: '지하 창고를 열자 인골과 10년 전 교복이 발견됐다.',
        location: '학교 지하 창고',
        foundAt: '봉인된 창고 내부',
        linkedCharacters: ['char-missing-person'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: true,
        analysisResult: 'DNA 검사 결과 정민혁으로 확인'
      }
    ],

    locations: [
      {
        id: 'loc-school-present',
        name: '청운고등학교 (현재)',
        description: '10년이 지난 학교',
        atmosphere: '낯익으면서도 변한 공간, 과거의 기억이 떠오름',
        objects: [
          {
            id: 'obj-archive',
            name: '자료실',
            description: '졸업앨범과 기록물 보관소',
            examinationResult: '10년 전 졸업앨범을 찾을 수 있다.',
            containsEvidence: 'evidence-old-photo'
          }
        ],
        connectedTo: ['loc-rooftop', 'loc-basement']
      },
      {
        id: 'loc-rooftop',
        name: '옥상',
        description: '10년 전 사건의 현장',
        atmosphere: '바람이 불고 쓸쓸한 공간, 불길한 기운',
        objects: [
          {
            id: 'obj-railing',
            name: '난간',
            description: '10년 전 사고가 난 난간',
            examinationResult: '오래된 난간. 수리된 흔적이 있다.'
          }
        ],
        connectedTo: ['loc-school-present']
      },
      {
        id: 'loc-basement',
        name: '지하 창고',
        description: '10년간 봉인된 비밀의 공간',
        atmosphere: '먼지와 어둠, 불길한 냄새',
        objects: [
          {
            id: 'obj-sealed-door',
            name: '봉인된 문',
            description: '10년간 열리지 않은 문',
            examinationResult: '잠금장치를 부수면 열 수 있다.',
            isLocked: true,
            unlockMethod: '강준영 자백 후 경찰과 함께'
          }
        ],
        hiddenAreas: [
          {
            id: 'hidden-remains',
            name: '창고 안쪽',
            description: '어둠 속에 뭔가가 있다',
            discoveryCondition: '문을 열고 조명을 비춤',
            containsEvidence: ['evidence-remains']
          }
        ],
        connectedTo: ['loc-school-present']
      },
      {
        id: 'loc-old-guard-room',
        name: '옛 경비실 창고',
        description: '은퇴한 경비원이 사용하던 창고',
        atmosphere: '낡은 물건들이 쌓인 창고',
        objects: [
          {
            id: 'obj-box',
            name: '오래된 상자',
            description: '경비원이 남긴 물건들',
            examinationResult: 'CCTV 테이프가 숨겨져 있다.',
            containsEvidence: 'evidence-cctv-tape'
          }
        ],
        connectedTo: ['loc-school-present']
      }
    ],

    timeline: [
      { time: '10년 전 졸업식', event: '정민혁이 윤성호/강준영에게 불려감', participants: ['char-hidden-culprit', 'char-accomplice-past', 'char-missing-person'], location: '옥상', importance: 'critical', isRevealed: false },
      { time: '10년 전 졸업식', event: '옥상에서 정민혁 추락', participants: ['char-hidden-culprit', 'char-accomplice-past', 'char-missing-person'], location: '옥상', importance: 'critical', isRevealed: false },
      { time: '10년 전 졸업식', event: '시신을 지하 창고에 은닉', participants: ['char-hidden-culprit', 'char-accomplice-past'], location: '지하 창고', importance: 'critical', isRevealed: false },
      { time: '10년 전', event: '경비원, CCTV 테이프 삭제 강요받음', participants: ['char-old-guard', 'char-hidden-culprit'], location: '경비실', importance: 'major', isRevealed: false },
      { time: '현재', event: '익명의 편지 도착', participants: ['char-sender'], location: '동창회', importance: 'major', isRevealed: true },
      { time: '현재', event: '조사 시작', participants: [], location: '학교', importance: 'major', isRevealed: true }
    ],

    solution: {
      summary: '윤성호가 10년 전 졸업식 날 정민혁을 옥상에서 밀어 죽이고, 강준영과 함께 시신을 지하 창고에 숨겼다.',
      detailedExplanation: [
        '정민혁은 10년 전 윤성호 일당에게 학교폭력을 당해왔다.',
        '졸업식 날, 가해자들은 민혁을 옥상으로 불렀다.',
        '협박과 폭행 중 윤성호가 민혁을 밀어 난간에서 떨어뜨렸다.',
        '패닉 상태에서 두 사람은 시신을 지하 창고에 숨겼다.',
        '경비원에게 CCTV 삭제를 강요하고 입을 막았다.',
        '10년간 비밀로 남아있었으나, 진실을 추구한 기자가 조사를 시작했다.',
        'CCTV 백업 테이프와 강준영의 자백으로 진실이 밝혀졌다.'
      ],
      keyEvidence: ['evidence-letter', 'evidence-cctv-tape', 'evidence-confession-tape', 'evidence-remains'],
      howToSolve: [
        '익명의 편지 발신자 추적',
        '10년 전 정민혁과 갈등이 있던 사람 파악',
        '삭제된 CCTV의 백업 존재 여부 확인',
        '공범 중 약한 고리 찾아 자백 유도',
        '지하 창고 조사'
      ],
      commonMistakes: [
        '외부인에 의한 납치로 단정짓는 것',
        '10년이 지나 증거가 없다고 포기하는 것'
      ]
    },

    deductionKeywords: {
      who: ['윤성호', '강준영', '10년 전'],
      why: ['학교폭력', '은폐', '두려움', '비밀'],
      how: ['밀침', '추락', '은닉', '지하 창고'],
      when: ['10년 전', '졸업식', '과거'],
      where: ['옥상', '지하 창고', '난간']
    },

    tags: ['콜드케이스', '10년', '학교폭력', '살인', '은폐'],
    author: 'DEDUCTIO Team',
    version: '1.0.0'
  },

  // ========================================
  // special-002: 10년 전 미해결 사건 재조사
  // ========================================
  {
    id: 'special-002',
    title: '붉은 교실의 저주',
    subtitle: '10년 전 미해결 사건이 다시 수면 위로',
    type: 'special',
    difficulty: 'hard',
    estimatedTime: 30,

    prologue: [
      '10년 전, 3학년 5반 교실에서 화재가 발생했다.',
      '한 명의 학생이 사망했고, 방화 혐의는 입증되지 못했다.',
      '그런데 최근, 같은 교실에서 이상한 일이 계속 일어나고 있다.'
    ],
    introduction: [
      '청운고 교감 선생님이 연락해왔습니다.',
      '"10년 전 화재 사건 기억하시나요?"',
      '"최근 3-5 교실에서 이상한 메시지가 계속 발견됩니다. 조사해주세요."'
    ],
    setting: '청운고등학교 3학년 5반 교실',

    crimeTime: '10년 전 야간자율학습 시간',
    crimeLocation: '3-5 교실',
    culpritId: 'char-arsonist',
    victimId: 'char-fire-victim',
    motive: '경쟁 제거와 질투',
    motiveDetail: '피해자 한지수는 전교 1등이었고, 범인 최민서는 항상 2등이었다. 대학 추천을 받기 위해 지수를 제거하려 했다.',
    method: '알코올 램프를 이용한 방화',
    methodDetail: '야간자율학습이 끝난 후, 최민서는 한지수의 책상에 알코올을 뿌리고 램프를 넘어뜨렸다. 지수는 잠들어 있었고 연기에 질식해 사망했다.',

    characters: [
      {
        id: 'char-fire-victim',
        name: '한지수',
        role: 'victim',
        age: 28,
        gender: 'female',
        occupation: '사망자 (10년 전 학생)',
        personality: '완벽주의자, 성실함',
        appearance: '단정한 외모, 안경',
        background: '10년 전 전교 1등. 화재로 사망.',
        alibi: {
          location: '교실',
          time: '10년 전 밤 10시',
          activity: '자습 중 잠들어 있었음',
          witnesses: [],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-arsonist', type: '라이벌', description: '항상 1등 경쟁' }
        ],
        secrets: [],
        dialogues: [],
        nervousTriggers: []
      },
      {
        id: 'char-arsonist',
        name: '최민서',
        role: 'culprit',
        age: 28,
        gender: 'female',
        occupation: '대학 교수 / 졸업생',
        personality: '완벽주의, 경쟁심 강함, 죄책감',
        appearance: '우아한 외모, 냉정한 눈빛',
        background: '10년 전 전교 2등. 현재는 성공한 교수이지만 과거의 죄책감에 시달림.',
        alibi: {
          location: '도서관',
          time: '10년 전 밤 10시',
          activity: '공부 중',
          witnesses: ['도서관 사서'],
          hasHole: true
        },
        motive: {
          type: 'greed',
          description: '1등이 되고 대학 추천을 받기 위해',
          strength: 3
        },
        relationships: [
          { targetId: 'char-fire-victim', type: '라이벌', description: '한지수를 질투하고 증오함', isSecret: true }
        ],
        secrets: [
          {
            id: 'secret-arsonist-1',
            content: '10년 전 화재는 자신이 일으킨 것',
            importance: 'critical',
            revealCondition: '알리바이 허점 발견 + 증거 제시'
          }
        ],
        dialogues: [
          {
            topic: '10년 전 화재',
            lines: ['끔찍한 사건이었죠.', '지수는... 좋은 친구였어요.', '(눈을 피하며) 그날 밤 전 도서관에 있었어요.']
          },
          {
            topic: '경쟁',
            lines: ['지수는 항상 완벽했죠.', '전... 2등이었어요. 항상.'],
            requiresEvidence: ['evidence-grade-book']
          }
        ],
        nervousTriggers: ['화재', '알코올', '1등', '한지수', '그날 밤']
      },
      {
        id: 'char-witness-student',
        name: '박소연',
        role: 'witness',
        age: 28,
        gender: 'female',
        occupation: '회사원 / 졸업생',
        personality: '관찰력 좋음, 조용함',
        appearance: '수수한 외모',
        background: '10년 전 같은 반 학생. 그날 밤 뭔가를 봤다.',
        alibi: {
          location: '화장실',
          time: '10년 전 밤 10시',
          activity: '화장실에서 돌아오는 중',
          witnesses: [],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-arsonist', type: '친구', description: '같은 반 친구' }
        ],
        secrets: [
          {
            id: 'secret-witness-1',
            content: '그날 밤 복도에서 최민서가 교실로 들어가는 것을 봤다',
            importance: 'critical',
            revealCondition: '신뢰 관계 형성 후'
          }
        ],
        dialogues: [
          {
            topic: '그날 밤',
            lines: ['화장실 갔다 오는 길이었어요.', '복도에서... 누군가를 봤어요.', '(망설이며) 민서였던 것 같아요.']
          }
        ],
        nervousTriggers: ['화재', '그날 밤', '복도']
      },
      {
        id: 'char-teacher-past',
        name: '김동현',
        role: 'witness',
        age: 55,
        gender: 'male',
        occupation: '퇴직 교사',
        personality: '엄격하고 원칙적',
        appearance: '백발의 노교사',
        background: '10년 전 3-5반 담임. 당시 사건 조사에 협조했다.',
        alibi: {
          location: '교무실',
          time: '10년 전 밤 10시',
          activity: '업무 중',
          witnesses: ['동료 교사'],
          hasHole: false
        },
        relationships: [],
        secrets: [
          {
            id: 'secret-teacher-1',
            content: '당시 최민서의 알리바이가 의심스러웠지만 증거가 없어 덮었다',
            importance: 'major',
            revealCondition: '사건 재조사 시'
          }
        ],
        dialogues: [
          {
            topic: '당시 조사',
            lines: ['증거가 없었어요. 모두 불 때문에...', '하지만... 민서의 알리바이가 이상했어요.', '도서관 사서는 10시 정각에 봤다고 했지만, 화재는 10시 10분에 발생했거든요.']
          }
        ],
        nervousTriggers: ['증거', '알리바이']
      },
      {
        id: 'char-janitor',
        name: '이정수',
        role: 'witness',
        age: 50,
        gender: 'male',
        occupation: '학교 관리인',
        personality: '묵묵함, 관찰력',
        appearance: '평범한 관리인',
        background: '10년 전부터 학교에 근무. 최근 교실에서 이상한 일이 일어나는 것을 발견.',
        alibi: {
          location: '관리실',
          time: '현재',
          activity: '순찰',
          witnesses: [],
          hasHole: false
        },
        relationships: [],
        secrets: [],
        dialogues: [
          {
            topic: '이상한 일',
            lines: ['매일 아침 3-5 교실 칠판에 메시지가 써져 있어요.', '"진실을 밝혀라" "살인자를 찾아라" 이런 것들...', 'CCTV를 확인했지만 아무도 안 들어왔어요. 이상해요.']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-librarian',
        name: '윤미희',
        role: 'witness',
        age: 52,
        gender: 'female',
        occupation: '도서관 사서',
        personality: '꼼꼼함, 기억력 좋음',
        appearance: '안경 쓴 사서',
        background: '10년 전부터 학교 도서관 사서. 최민서의 알리바이 증인.',
        alibi: {
          location: '도서관',
          time: '10년 전 밤 10시',
          activity: '근무 중',
          witnesses: [],
          hasHole: false
        },
        relationships: [],
        secrets: [
          {
            id: 'secret-librarian-1',
            content: '최민서를 10시 정각에 봤지만, 10시 15분에는 없었다',
            importance: 'critical',
            revealCondition: '정확한 시간 추궁 시'
          }
        ],
        dialogues: [
          {
            topic: '최민서 알리바이',
            lines: ['10시에 도서관에 있었어요. 확실해요.', '(재차 질문하면) ...10시 15분쯤 화재 소식 듣고 찾아봤는데 없더라고요.', '어? 그럼 10시에서 15분 사이에 나간 거네요...']
          }
        ],
        nervousTriggers: ['시간', '알리바이']
      }
    ],

    evidence: [
      {
        id: 'evidence-blackboard-message',
        name: '칠판 메시지',
        type: 'document',
        description: '매일 아침 발견되는 분필 메시지',
        detailedDescription: '"진실을 밝혀라" "살인자는 아직 살아있다" 등의 메시지가 매일 써져 있다.',
        location: '3-5 교실',
        foundAt: '칠판',
        linkedCharacters: [],
        isCritical: false,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-fire-report',
        name: '10년 전 화재 보고서',
        type: 'document',
        description: '당시 소방서 화재 조사 보고서',
        detailedDescription: '발화 지점: 한지수의 책상. 발화 원인: 알코올 램프 추정. 사망 원인: 연기 흡입.',
        location: '경찰서 자료실',
        foundAt: '보관 파일',
        linkedCharacters: ['char-fire-victim'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-grade-book',
        name: '10년 전 성적표',
        type: 'document',
        description: '당시 3-5반 성적 기록',
        detailedDescription: '1등: 한지수 (평균 98.5점), 2등: 최민서 (평균 98.3점). 0.2점 차이.',
        location: '교무실 자료실',
        foundAt: '성적 기록부',
        linkedCharacters: ['char-fire-victim', 'char-arsonist'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-alcohol-bottle',
        name: '알코올 병 파편',
        type: 'physical',
        description: '화재 현장에서 발견된 유리 파편',
        detailedDescription: '당시 증거물로 보관. 실험용 알코올 병의 파편.',
        location: '증거 보관소',
        foundAt: '화재 현장 증거물',
        linkedCharacters: [],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: true,
        analysisResult: '지문이 남아있으나 10년 전 기술로는 식별 불가. 최신 기술로 재분석하면 최민서의 지문 발견.'
      },
      {
        id: 'evidence-witness-testimony',
        name: '박소연의 증언',
        type: 'testimony',
        description: '10년 만에 털어놓은 목격담',
        detailedDescription: '"10시 5분쯤 화장실 갔다 오는데, 복도에서 민서를 봤어요. 교실 쪽으로 가더라고요."',
        location: '면담실',
        foundAt: '박소연 증언',
        linkedCharacters: ['char-witness-student', 'char-arsonist'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      },
      {
        id: 'evidence-library-log',
        name: '도서관 출입 기록',
        type: 'document',
        description: '10년 전 도서관 출입부',
        detailedDescription: '최민서: 입실 19:00, 퇴실 기록 없음 (화재 발생으로 기록 중단)',
        location: '도서관',
        foundAt: '보관 기록',
        linkedCharacters: ['char-arsonist'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-cctv-gap',
        name: 'CCTV 공백',
        type: 'digital',
        description: '10년 전 CCTV 기록의 이상한 공백',
        detailedDescription: '3층 복도 CCTV가 22:00~22:10 사이 정지. 관리자 권한으로 일시 정지됨.',
        location: '보안실',
        foundAt: 'CCTV 기록',
        linkedCharacters: [],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: true,
        analysisResult: '최민서의 아버지가 당시 학교 이사. 권한 남용 의혹.'
      },
      {
        id: 'evidence-diary',
        name: '한지수의 일기',
        type: 'document',
        description: '피해자가 남긴 일기장',
        detailedDescription: '"민서가 요즘 이상해. 날 보는 눈빛이 무서워. 경쟁이 심해지고 있어."',
        location: '유품 보관함',
        foundAt: '한지수 집',
        linkedCharacters: ['char-fire-victim', 'char-arsonist'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-recommendation-letter',
        name: '대학 추천서',
        type: 'document',
        description: '화재 사건 후 최민서가 받은 추천서',
        detailedDescription: '한지수 사망 후, 최민서가 전교 1등이 되어 명문대 추천을 받았다.',
        location: '교무실 기록',
        foundAt: '진학 자료',
        linkedCharacters: ['char-arsonist'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-confession',
        name: '최민서의 자백',
        type: 'testimony',
        description: '모든 증거 제시 후 털어놓은 진실',
        detailedDescription: '"10년 동안... 매일 악몽을 꿨어요. 지수가... 1등이 되고 싶었어요. 그것뿐이었어요..."',
        location: '조사실',
        foundAt: '최종 대면',
        linkedCharacters: ['char-arsonist'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      }
    ],

    locations: [
      {
        id: 'loc-classroom-3-5',
        name: '3학년 5반 교실',
        description: '10년 전 화재가 발생한 교실',
        atmosphere: '묘한 긴장감, 칠판에 매일 메시지가 나타남',
        objects: [
          {
            id: 'obj-blackboard',
            name: '칠판',
            description: '메시지가 써지는 칠판',
            examinationResult: '분필 성분 분석 결과 현재 학교에서 사용하는 분필이 아님. 10년 전 제품.',
            containsEvidence: 'evidence-blackboard-message'
          },
          {
            id: 'obj-jisu-desk',
            name: '한지수의 책상',
            description: '화재 발화 지점',
            examinationResult: '책상은 교체되었으나 바닥에 타버린 흔적이 남아있다.'
          }
        ],
        connectedTo: ['loc-corridor', 'loc-library']
      },
      {
        id: 'loc-corridor',
        name: '3층 복도',
        description: '교실과 도서관을 잇는 복도',
        atmosphere: '긴 복도, CCTV 사각지대',
        objects: [
          {
            id: 'obj-cctv',
            name: 'CCTV',
            description: '복도 감시 카메라',
            examinationResult: '10년 전 22:00~22:10 사이 녹화 중단 기록 발견.',
            containsEvidence: 'evidence-cctv-gap'
          }
        ],
        connectedTo: ['loc-classroom-3-5', 'loc-library', 'loc-restroom']
      },
      {
        id: 'loc-library',
        name: '도서관',
        description: '최민서의 알리바이 장소',
        atmosphere: '조용하고 정돈된 공간',
        objects: [
          {
            id: 'obj-library-log',
            name: '출입 기록부',
            description: '방문자 기록',
            examinationResult: '최민서의 입실 기록은 있으나 퇴실 기록 없음.',
            containsEvidence: 'evidence-library-log'
          }
        ],
        connectedTo: ['loc-corridor']
      },
      {
        id: 'loc-restroom',
        name: '3층 화장실',
        description: '박소연이 갔던 장소',
        atmosphere: '평범한 화장실',
        objects: [],
        connectedTo: ['loc-corridor']
      },
      {
        id: 'loc-evidence-room',
        name: '경찰서 증거 보관소',
        description: '10년 전 증거물 보관',
        atmosphere: '먼지 쌓인 증거물들',
        objects: [
          {
            id: 'obj-evidence-box',
            name: '화재 사건 증거 상자',
            description: '당시 수거한 증거물',
            examinationResult: '알코올 병 파편, 타버린 책상 조각 등',
            containsEvidence: 'evidence-alcohol-bottle'
          }
        ],
        connectedTo: []
      },
      {
        id: 'loc-staff-room',
        name: '교무실',
        description: '교사들의 업무 공간',
        atmosphere: '서류와 기록으로 가득',
        objects: [
          {
            id: 'obj-grade-records',
            name: '성적 기록 보관함',
            description: '과거 성적 자료',
            examinationResult: '10년 전 3-5반 성적표 발견.',
            containsEvidence: 'evidence-grade-book'
          },
          {
            id: 'obj-recommendation',
            name: '진학 자료',
            description: '대학 추천 관련 문서',
            examinationResult: '최민서의 추천서 발견.',
            containsEvidence: 'evidence-recommendation-letter'
          }
        ],
        connectedTo: ['loc-corridor']
      }
    ],

    timeline: [
      { time: '10년 전 19:00', event: '최민서 도서관 입실', participants: ['char-arsonist'], location: '도서관', importance: 'major', isRevealed: false },
      { time: '10년 전 22:00', event: '야간자율학습 종료', participants: [], location: '교실', importance: 'major', isRevealed: false },
      { time: '10년 전 22:00', event: '3층 복도 CCTV 정지', participants: [], location: '복도', importance: 'critical', isRevealed: false },
      { time: '10년 전 22:05', event: '박소연 화장실 다녀오는 중 최민서 목격', participants: ['char-witness-student', 'char-arsonist'], location: '복도', importance: 'critical', isRevealed: false },
      { time: '10년 전 22:07', event: '최민서가 교실에서 알코올 램프 작동', participants: ['char-arsonist'], location: '3-5 교실', importance: 'critical', isRevealed: false },
      { time: '10년 전 22:10', event: '화재 발생', participants: ['char-fire-victim'], location: '3-5 교실', importance: 'critical', isRevealed: true },
      { time: '10년 전 22:10', event: 'CCTV 재작동', participants: [], location: '복도', importance: 'major', isRevealed: false },
      { time: '10년 전 22:15', event: '소방서 출동, 한지수 사망 확인', participants: [], location: '3-5 교실', importance: 'critical', isRevealed: true },
      { time: '현재', event: '칠판 메시지 발견, 조사 시작', participants: [], location: '3-5 교실', importance: 'major', isRevealed: true }
    ],

    solution: {
      summary: '최민서가 1등이 되기 위해 한지수를 알코올 램프로 방화 살해했다.',
      detailedExplanation: [
        '최민서는 항상 2등이었고, 한지수와 0.2점 차이로 1등을 놓쳤다.',
        '대학 추천은 1등에게만 주어졌고, 최민서는 절박했다.',
        '야간자율학습 후, 최민서는 아버지의 권한으로 CCTV를 정지시켰다.',
        '도서관 알리바이를 만들고, 22:00~22:10 사이에 교실로 잠입했다.',
        '잠들어 있던 한지수의 책상에 알코올을 뿌리고 램프를 넘어뜨렸다.',
        '화재가 발생하고 지수는 연기에 질식해 사망했다.',
        '최민서는 다시 도서관으로 돌아가려 했으나 박소연에게 목격당했다.',
        '사건 후 최민서는 1등이 되어 명문대 추천을 받았다.',
        '10년 후, 죄책감에 시달리며 칠판에 메시지를 남기고 있다.'
      ],
      keyEvidence: ['evidence-alcohol-bottle', 'evidence-witness-testimony', 'evidence-cctv-gap', 'evidence-library-log'],
      howToSolve: [
        '칠판 메시지의 출처 조사',
        '10년 전 화재 보고서 재검토',
        '성적 경쟁 관계 파악',
        '알리바이 시간대 정밀 분석',
        '목격자 박소연의 증언 확보',
        '알코올 병 파편 재분석'
      ],
      commonMistakes: [
        '단순 사고로 결론짓는 것',
        '칠판 메시지를 유령의 짓으로 생각하는 것',
        '알리바이를 액면 그대로 믿는 것'
      ]
    },

    deductionKeywords: {
      who: ['최민서', '2등', '경쟁자'],
      why: ['1등', '대학 추천', '질투', '야망'],
      how: ['방화', '알코올', '램프', 'CCTV 조작'],
      when: ['22:05~22:10', '야간자율학습 후', '10년 전'],
      where: ['3-5 교실', '한지수 책상', '도서관']
    },

    tags: ['방화', '살인', '경쟁', '학교', '콜드케이스'],
    author: 'DEDUCTIO',
    version: '1.0'
  },

  // ========================================
  // special-003: 연쇄 익명 협박 사건
  // ========================================
  {
    id: 'special-003',
    title: '그림자 속의 심판자',
    subtitle: '익명의 협박범이 학교를 공포에 몰아넣다',
    type: 'special',
    difficulty: 'hard',
    estimatedTime: 28,

    prologue: [
      '최근 청운고에서 연쇄 협박 사건이 발생했다.',
      '학생회장, 교사, 이사장까지... 협박 대상은 계속 늘어나고 있다.',
      '협박범은 각자의 비밀을 알고 있으며, "정의의 심판"이라 자칭한다.'
    ],
    introduction: [
      '학교 이사장이 긴급히 연락해왔습니다.',
      '"익명의 협박 편지가 계속 도착하고 있습니다."',
      '"각자의 과거 비밀을 정확히 알고 있어요. 범인을 찾아주세요."'
    ],
    setting: '청운고등학교',

    crimeTime: '최근 2주간',
    crimeLocation: '다양한 장소',
    culpritId: 'char-justice-seeker',
    victimId: 'multiple',
    motive: '과거 학교폭력 피해에 대한 복수',
    motiveDetail: '협박범은 5년 전 학교폭력으로 자퇴한 학생. 가해자들이 처벌받지 않고 잘 살아가는 것을 보고 직접 심판하기로 결심.',
    method: '익명 협박 편지와 사이버 스토킹',
    methodDetail: '과거 피해자 기록, 학교 내부 시스템 해킹, SNS 추적 등으로 비밀을 캐내고 협박 편지를 발송.',

    characters: [
      {
        id: 'char-justice-seeker',
        name: '이진우',
        role: 'culprit',
        age: 23,
        gender: 'male',
        occupation: 'IT 프리랜서 / 전 학생',
        personality: '조용하고 계획적, 정의감 강함, 복수심',
        appearance: '수수한 외모, 후드티를 즐겨 입음',
        background: '5년 전 학교폭력으로 자퇴. 현재 해킹 실력을 갖춘 IT 전문가.',
        alibi: {
          location: '자택',
          time: '협박 편지 발송 시간',
          activity: '재택근무',
          witnesses: [],
          hasHole: true
        },
        motive: {
          type: 'revenge',
          description: '5년 전 학교폭력 가해자들에 대한 복수',
          strength: 3
        },
        relationships: [
          { targetId: 'char-president', type: '피해자-가해자', description: '5년 전 괴롭힘 당함', isSecret: true },
          { targetId: 'char-teacher-target', type: '피해자-방관자', description: '선생님이 외면함', isSecret: true }
        ],
        secrets: [
          {
            id: 'secret-hacker-1',
            content: '학교 서버를 해킹해 모든 비밀을 캐냈다',
            importance: 'critical',
            revealCondition: 'IP 추적 + 해킹 흔적 발견'
          }
        ],
        dialogues: [
          {
            topic: '정의',
            lines: ['정의는 반드시 실현되어야 합니다.', '가해자들이 처벌받지 않는다면, 누군가는 심판해야죠.']
          }
        ],
        nervousTriggers: ['5년 전', '학교폭력', '자퇴', '해킹']
      },
      {
        id: 'char-president',
        name: '강태양',
        role: 'victim',
        age: 18,
        gender: 'male',
        occupation: '학생회장',
        personality: '카리스마 있지만 과거에 문제 있음',
        appearance: '준수한 외모, 자신감 넘침',
        background: '현재 학생회장. 5년 전 중학교 때 일진이었다.',
        alibi: {
          location: '학생회실',
          time: '협박 편지 수령 시',
          activity: '업무 중',
          witnesses: ['학생회 임원'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-justice-seeker', type: '가해자-피해자', description: '5년 전 괴롭혔음', isSecret: true }
        ],
        secrets: [
          {
            id: 'secret-president-1',
            content: '5년 전 이진우를 괴롭혀 자퇴하게 만들었다',
            importance: 'critical',
            revealCondition: '협박 편지 내용 분석'
          }
        ],
        dialogues: [
          {
            topic: '협박 편지',
            lines: ['누가 이런 짓을... 내 과거를 어떻게 알았지?', '(당황하며) 5년 전 일은... 철없었을 때야.']
          }
        ],
        nervousTriggers: ['5년 전', '중학교', '일진', '이진우']
      },
      {
        id: 'char-teacher-target',
        name: '박진수',
        role: 'victim',
        age: 45,
        gender: 'male',
        occupation: '교사',
        personality: '소극적, 책임 회피',
        appearance: '피곤한 표정',
        background: '5년 전 담임. 학교폭력을 알았지만 외면했다.',
        alibi: {
          location: '교무실',
          time: '협박 편지 수령 시',
          activity: '수업 준비',
          witnesses: ['동료 교사'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-justice-seeker', type: '방관자-피해자', description: '학교폭력 외면' }
        ],
        secrets: [
          {
            id: 'secret-teacher-1',
            content: '5년 전 학교폭력을 알았지만 귀찮아서 외면했다',
            importance: 'major',
            revealCondition: '협박 편지 내용'
          }
        ],
        dialogues: [
          {
            topic: '5년 전',
            lines: ['(긴장하며) 그때... 몰랐어요.', '(거짓말) 학생들 사이 일은 잘 몰랐다고요.']
          }
        ],
        nervousTriggers: ['5년 전', '학교폭력', '방관']
      },
      {
        id: 'char-chairman',
        name: '최재석',
        role: 'victim',
        age: 60,
        gender: 'male',
        occupation: '학교 이사장',
        personality: '권위적, 체면 중시',
        appearance: '정장 차림, 위압감',
        background: '5년 전 사건을 은폐하고 이진우 가족에게 합의금을 주고 덮었다.',
        alibi: {
          location: '이사장실',
          time: '협박 편지 수령 시',
          activity: '회의 중',
          witnesses: ['비서'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-justice-seeker', type: '가해자-피해자', description: '사건 은폐' }
        ],
        secrets: [
          {
            id: 'secret-chairman-1',
            content: '5년 전 사건을 은폐하고 돈으로 해결했다',
            importance: 'critical',
            revealCondition: '협박 편지 + 금융 기록'
          }
        ],
        dialogues: [
          {
            topic: '은폐',
            lines: ['(화를 내며) 5년 전 일은 합법적으로 처리했다!', '합의금도 주고 깨끗이 끝난 일이야.']
          }
        ],
        nervousTriggers: ['은폐', '합의금', '5년 전']
      },
      {
        id: 'char-it-teacher',
        name: '김민준',
        role: 'witness',
        age: 35,
        gender: 'male',
        occupation: '정보 교사',
        personality: '분석적, 기술에 능함',
        appearance: '안경 쓴 젊은 교사',
        background: '학교 서버 관리자. 최근 해킹 흔적을 발견했다.',
        alibi: {
          location: '컴퓨터실',
          time: '해킹 발생 시',
          activity: '수업 중',
          witnesses: ['학생들'],
          hasHole: false
        },
        relationships: [],
        secrets: [
          {
            id: 'secret-it-1',
            content: '학교 서버 로그에서 의심스러운 접속 기록 발견',
            importance: 'critical',
            revealCondition: '서버 조사 요청 시'
          }
        ],
        dialogues: [
          {
            topic: '해킹',
            lines: ['서버 로그를 확인했더니... 2주 전부터 불법 접속이 있었어요.', 'IP를 추적했는데 VPN으로 우회했네요. 하지만 패턴 분석으로 범위를 좁힐 수 있어요.']
          }
        ],
        nervousTriggers: ['서버', '해킹', '로그']
      },
      {
        id: 'char-friend',
        name: '정수아',
        role: 'witness',
        age: 23,
        gender: 'female',
        occupation: '대학생 / 이진우의 친구',
        personality: '따뜻하고 걱정 많음',
        appearance: '수수한 대학생',
        background: '이진우의 유일한 친구. 그의 과거를 알고 있다.',
        alibi: {
          location: '대학교',
          time: '현재',
          activity: '수업',
          witnesses: ['동기들'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-justice-seeker', type: '친구', description: '진우를 걱정함' }
        ],
        secrets: [
          {
            id: 'secret-friend-1',
            content: '이진우가 최근 학교 이야기를 많이 했다',
            importance: 'major',
            revealCondition: '이진우에 대한 정보 요청 시'
          }
        ],
        dialogues: [
          {
            topic: '이진우',
            lines: ['진우는... 5년 전 일로 많이 힘들어했어요.', '최근에 "정의를 실현하고 싶다"는 말을 자주 했어요.', '(걱정스럽게) 설마... 진우가?']
          }
        ],
        nervousTriggers: ['이진우', '복수', '정의']
      },
      {
        id: 'char-security',
        name: '오철민',
        role: 'witness',
        age: 50,
        gender: 'male',
        occupation: '학교 경비',
        personality: '관찰력 좋음',
        appearance: '경비 유니폼',
        background: '학교 정문 경비. 최근 수상한 인물을 목격했다.',
        alibi: {
          location: '정문',
          time: '협박 편지 투입 시간',
          activity: '근무 중',
          witnesses: [],
          hasHole: false
        },
        relationships: [],
        secrets: [],
        dialogues: [
          {
            topic: '수상한 인물',
            lines: ['며칠 전 새벽, 후드티 입은 사람이 학교 주변을 배회했어요.', 'CCTV에 찍혔을 텐데... 얼굴은 안 보였어요.']
          }
        ],
        nervousTriggers: []
      }
    ],

    evidence: [
      {
        id: 'evidence-threat-letter-1',
        name: '강태양에게 온 협박 편지',
        type: 'document',
        description: '학생회장에게 온 첫 번째 편지',
        detailedDescription: '"5년 전 너의 죄를 기억하는가? 이진우를 괴롭혀 자퇴시킨 것을. 정의의 심판이 시작된다."',
        location: '학생회실',
        foundAt: '학생회장 책상',
        linkedCharacters: ['char-president', 'char-justice-seeker'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: true,
        analysisResult: '프린터 잉크 분석 결과 일반 가정용 프린터. 지문 없음.'
      },
      {
        id: 'evidence-threat-letter-2',
        name: '박진수 교사에게 온 협박 편지',
        type: 'document',
        description: '교사에게 온 두 번째 편지',
        detailedDescription: '"당신은 학교폭력을 알고도 외면했다. 방관자도 공범이다. 책임을 져라."',
        location: '교무실',
        foundAt: '박진수 책상',
        linkedCharacters: ['char-teacher-target', 'char-justice-seeker'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-threat-letter-3',
        name: '최재석 이사장에게 온 협박 편지',
        type: 'document',
        description: '이사장에게 온 세 번째 편지',
        detailedDescription: '"돈으로 진실을 묻었다고 생각하는가? 은폐한 죄, 반드시 대가를 치를 것이다."',
        location: '이사장실',
        foundAt: '이사장 책상',
        linkedCharacters: ['char-chairman', 'char-justice-seeker'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-server-log',
        name: '학교 서버 접속 로그',
        type: 'digital',
        description: '비정상 접속 기록',
        detailedDescription: '2주 전부터 외부 IP에서 학교 서버에 불법 접속. 학생 기록, 교사 인사 파일 등 조회.',
        location: '서버실',
        foundAt: '김민준 교사가 발견',
        linkedCharacters: ['char-justice-seeker'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: true,
        analysisResult: 'VPN 우회했으나 접속 패턴 분석 결과 특정 지역 범위 좁혀짐.'
      },
      {
        id: 'evidence-cctv-footage',
        name: 'CCTV 영상',
        type: 'digital',
        description: '학교 주변 CCTV',
        detailedDescription: '새벽 시간 후드티 입은 인물이 학교 우편함에 편지를 투입하는 모습.',
        location: '보안실',
        foundAt: 'CCTV 기록',
        linkedCharacters: [],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: true,
        analysisResult: '얼굴은 안 보이나 체격과 걸음걸이로 20대 남성 추정.'
      },
      {
        id: 'evidence-old-record',
        name: '5년 전 학교폭력 기록',
        type: 'document',
        description: '은폐된 학교폭력 사건 파일',
        detailedDescription: '피해자: 이진우. 가해자: 강태양 외 2명. 처리: 합의금 지급 후 종결.',
        location: '이사장실 금고',
        foundAt: '비밀 서류',
        linkedCharacters: ['char-justice-seeker', 'char-president', 'char-chairman'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      },
      {
        id: 'evidence-settlement-money',
        name: '합의금 송금 기록',
        type: 'document',
        description: '5년 전 이진우 가족에게 보낸 돈',
        detailedDescription: '학교 법인 → 이진우 부모 계좌. 금액: 5000만원.',
        location: '회계 기록',
        foundAt: '금융 자료',
        linkedCharacters: ['char-chairman', 'char-justice-seeker'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      },
      {
        id: 'evidence-jinwoo-laptop',
        name: '이진우의 노트북',
        type: 'digital',
        description: '압수된 이진우의 컴퓨터',
        detailedDescription: '해킹 도구, 학교 서버 접속 기록, 협박 편지 초안 파일 발견.',
        location: '이진우 자택',
        foundAt: '압수 수색',
        linkedCharacters: ['char-justice-seeker'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: true,
        analysisResult: '결정적 증거. 모든 협박 활동의 흔적.'
      },
      {
        id: 'evidence-friend-testimony',
        name: '정수아의 증언',
        type: 'testimony',
        description: '이진우 친구의 증언',
        detailedDescription: '"진우가 최근 복수 계획을 세운다고 했어요. 하지만 누구도 다치게 하지 않겠다고..."',
        location: '조사실',
        foundAt: '정수아 면담',
        linkedCharacters: ['char-justice-seeker', 'char-friend'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-confession',
        name: '이진우의 자백',
        type: 'testimony',
        description: '최종 대면 시 자백',
        detailedDescription: '"전 아무도 해치지 않았어요. 그저... 그들이 자신의 죄를 자각하길 바랐을 뿐입니다."',
        location: '조사실',
        foundAt: '최종 대면',
        linkedCharacters: ['char-justice-seeker'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      }
    ],

    locations: [
      {
        id: 'loc-student-council',
        name: '학생회실',
        description: '첫 협박 편지가 도착한 곳',
        atmosphere: '긴장감 도는 공간',
        objects: [
          {
            id: 'obj-president-desk',
            name: '회장 책상',
            description: '협박 편지가 놓여 있었던 곳',
            examinationResult: '협박 편지 발견. 필적 분석 필요.',
            containsEvidence: 'evidence-threat-letter-1'
          }
        ],
        connectedTo: ['loc-corridor']
      },
      {
        id: 'loc-staff-room-2',
        name: '교무실',
        description: '박진수 교사의 업무 공간',
        atmosphere: '불안한 분위기',
        objects: [
          {
            id: 'obj-teacher-desk',
            name: '박진수 책상',
            description: '협박 편지 수령',
            examinationResult: '두 번째 협박 편지 발견. 같은 필적으로 보임.',
            containsEvidence: 'evidence-threat-letter-2'
          }
        ],
        connectedTo: ['loc-corridor']
      },
      {
        id: 'loc-chairman-office',
        name: '이사장실',
        description: '최재석 이사장의 집무실',
        atmosphere: '권위적이고 위압적',
        objects: [
          {
            id: 'obj-safe',
            name: '금고',
            description: '비밀 서류 보관',
            examinationResult: '5년 전 학교폭력 관련 기록 발견.',
            isLocked: true,
            unlockMethod: '이사장 허가 또는 수색 영장',
            containsEvidence: 'evidence-old-record'
          }
        ],
        connectedTo: []
      },
      {
        id: 'loc-server-room',
        name: '서버실',
        description: '학교 전산망 중앙',
        atmosphere: '냉각기 소리가 들리는 차가운 공간',
        objects: [
          {
            id: 'obj-server',
            name: '메인 서버',
            description: '학교 데이터 저장',
            examinationResult: '불법 접속 로그 발견.',
            containsEvidence: 'evidence-server-log'
          }
        ],
        connectedTo: ['loc-computer-lab']
      },
      {
        id: 'loc-computer-lab',
        name: '컴퓨터실',
        description: '김민준 교사의 업무 공간',
        atmosphere: '컴퓨터들이 늘어선 교실',
        objects: [],
        connectedTo: ['loc-server-room']
      },
      {
        id: 'loc-security-office',
        name: '보안실',
        description: 'CCTV 모니터링 센터',
        atmosphere: '모니터 불빛이 깜빡이는 어두운 방',
        objects: [
          {
            id: 'obj-cctv-system',
            name: 'CCTV 시스템',
            description: '학교 전체 감시',
            examinationResult: '협박 편지 배달자의 동영상 기록 확인 가능.',
            containsEvidence: 'evidence-cctv-footage'
          }
        ],
        connectedTo: []
      },
      {
        id: 'loc-jinwoo-home',
        name: '이진우 자택',
        description: '이진우가 살고 있는 원룸',
        atmosphere: '어두컴컴하고 정리되지 않은 공간',
        objects: [
          {
            id: 'obj-laptop',
            name: '노트북',
            description: '이진우의 작업용 컴퓨터',
            examinationResult: '압수 수색 영장으로 확보.',
            containsEvidence: 'evidence-jinwoo-laptop'
          }
        ],
        connectedTo: []
      }
    ],

    timeline: [
      { time: '5년 전', event: '이진우 학교폭력 피해 및 자퇴', participants: ['char-justice-seeker', 'char-president'], location: '학교', importance: 'critical', isRevealed: false },
      { time: '5년 전', event: '학교 측 사건 은폐 및 합의금 지급', participants: ['char-chairman'], location: '이사장실', importance: 'critical', isRevealed: false },
      { time: '2주 전', event: '이진우가 학교 서버 해킹 시작', participants: ['char-justice-seeker'], location: '자택', importance: 'critical', isRevealed: false },
      { time: '1주 전', event: '강태양에게 첫 협박 편지 발송', participants: ['char-justice-seeker'], location: '학생회실', importance: 'critical', isRevealed: true },
      { time: '5일 전', event: '박진수 교사에게 협박 편지 발송', participants: ['char-justice-seeker'], location: '교무실', importance: 'major', isRevealed: true },
      { time: '3일 전', event: '최재석 이사장에게 협박 편지 발송', participants: ['char-justice-seeker'], location: '이사장실', importance: 'major', isRevealed: true },
      { time: '2일 전', event: '김민준 교사가 서버 해킹 발견', participants: ['char-it-teacher'], location: '서버실', importance: 'major', isRevealed: false },
      { time: '현재', event: '조사 시작', participants: [], location: '학교', importance: 'major', isRevealed: true }
    ],

    solution: {
      summary: '이진우가 5년 전 학교폭력 가해자들에게 익명 협박 편지를 보내 정의의 심판을 실행했다.',
      detailedExplanation: [
        '5년 전 이진우는 강태양 등에게 학교폭력을 당했다.',
        '담임 박진수는 알고도 외면했고, 이사장은 돈으로 사건을 은폐했다.',
        '이진우는 자퇴 후 IT 기술을 배워 해커가 되었다.',
        '2주 전, 학교 서버를 해킹해 모든 비밀 정보를 수집했다.',
        '가해자, 방관자, 은폐자 각각에게 협박 편지를 발송했다.',
        '폭력적 복수가 아닌, 죄책감을 느끼게 하는 심리적 압박이 목적이었다.',
        '서버 로그, CCTV, 노트북 증거로 범인이 밝혀졌다.'
      ],
      keyEvidence: ['evidence-server-log', 'evidence-jinwoo-laptop', 'evidence-old-record', 'evidence-threat-letter-1'],
      howToSolve: [
        '협박 편지들의 공통점 분석 (5년 전 사건)',
        '서버 해킹 추적',
        '5년 전 학교폭력 사건 재조사',
        '이진우의 행방과 현재 상황 파악',
        '노트북 압수 및 분석'
      ],
      commonMistakes: [
        '내부 학생 소행으로만 생각하는 것',
        '협박 편지를 단순 장난으로 치부하는 것',
        '해킹 실력을 과소평가하는 것'
      ]
    },

    deductionKeywords: {
      who: ['이진우', '전 학생', '해커', '피해자'],
      why: ['복수', '정의', '학교폭력', '5년 전'],
      how: ['해킹', '협박 편지', 'VPN', '서버 침입'],
      when: ['2주 전부터', '5년 전 사건', '연쇄적'],
      where: ['학교 서버', '자택', '학생회실', '교무실', '이사장실']
    },

    tags: ['사이버범죄', '복수', '학교폭력', '해킹', '협박'],
    author: 'DEDUCTIO',
    version: '1.0'
  },

  // ========================================
  // special-004: 동시다발 절도 사건
  // ========================================
  {
    id: 'special-004',
    title: '유령 도둑의 예술',
    subtitle: '3일간 7건의 절도, 범인은 한 명',
    type: 'special',
    difficulty: 'expert',
    estimatedTime: 32,

    prologue: [
      '최근 3일간 청운고에서 7건의 절도 사건이 발생했다.',
      '학생 사물함, 교무실, 동아리실, 심지어 교장실까지.',
      '범인은 CCTV도 피하고, 흔적도 남기지 않는 유령처럼 움직인다.'
    ],
    introduction: [
      '학교 경찰관이 연락해왔습니다.',
      '"동시다발적인 절도 사건이 발생하고 있습니다."',
      '"범인은 학교 구조를 완벽히 알고 있고, 보안 시스템까지 파악하고 있습니다."'
    ],
    setting: '청운고등학교 전체',

    crimeTime: '최근 3일간',
    crimeLocation: '학교 전역',
    culpritId: 'char-janitor-son',
    victimId: 'multiple',
    motive: '아버지 병원비 마련',
    motiveDetail: '범인의 아버지(학교 관리인)가 중병에 걸렸고, 병원비가 급히 필요했다. 학교 구조를 잘 아는 아들이 절도를 저질렀다.',
    method: 'CCTV 사각지대 이용, 마스터키 활용',
    methodDetail: '아버지가 관리인이라 학교 구조와 보안 시스템을 완벽히 알고 있었다. 아버지의 마스터키를 몰래 복사해 사용.',

    characters: [
      {
        id: 'char-janitor-son',
        name: '박준혁',
        role: 'culprit',
        age: 25,
        gender: 'male',
        occupation: '아르바이트생 / 관리인의 아들',
        personality: '효자, 절박함, 죄책감',
        appearance: '평범한 청년, 피곤한 눈빛',
        background: '학교 관리인 박영수의 아들. 아버지가 암 투병 중.',
        alibi: {
          location: '편의점',
          time: '절도 발생 시간',
          activity: '야간 알바',
          witnesses: ['편의점 손님'],
          hasHole: true
        },
        motive: {
          type: 'protection',
          description: '아버지 병원비 마련을 위한 절박한 선택',
          strength: 3
        },
        relationships: [
          { targetId: 'char-janitor-father', type: '부자', description: '아버지를 위해 범죄 저지름' }
        ],
        secrets: [
          {
            id: 'secret-thief-1',
            content: '아버지 몰래 마스터키를 복사해 학교에 침입했다',
            importance: 'critical',
            revealCondition: '마스터키 흔적 + 알리바이 허점 발견'
          }
        ],
        dialogues: [
          {
            topic: '아버지',
            lines: ['(눈물 글썽이며) 아버지가... 암이에요.', '병원비가... 3천만원이 필요한데...']
          },
          {
            topic: '절도',
            lines: ['(부들부들 떨며) 저였어요.', '아버지를 살리기 위해서... 다른 방법이 없었어요.']
          }
        ],
        nervousTriggers: ['마스터키', '병원비', '아버지', 'CCTV']
      },
      {
        id: 'char-janitor-father',
        name: '박영수',
        role: 'witness',
        age: 58,
        gender: 'male',
        occupation: '학교 관리인',
        personality: '성실하고 책임감 강함',
        appearance: '수척한 체격, 병색',
        background: '20년간 학교에서 근무. 최근 암 진단.',
        alibi: {
          location: '병원',
          time: '절도 발생 시간',
          activity: '입원 치료',
          witnesses: ['간호사'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-janitor-son', type: '부자', description: '아들을 걱정함' }
        ],
        secrets: [
          {
            id: 'secret-janitor-1',
            content: '마스터키가 복사된 것을 최근 알았지만 설마 아들이...',
            importance: 'critical',
            revealCondition: '마스터키 조사 시'
          }
        ],
        dialogues: [
          {
            topic: '마스터키',
            lines: ['(당황하며) 마스터키가... 복사됐다고요?', '(충격) 준혁이가... 설마...', '(울먹이며) 제가 아파서... 아이가 잘못된 길로...']
          }
        ],
        nervousTriggers: ['마스터키', '아들', '병원비']
      },
      {
        id: 'char-victim-1',
        name: '김다은',
        role: 'victim',
        age: 17,
        gender: 'female',
        occupation: '학생',
        personality: '명랑함',
        appearance: '평범한 여학생',
        background: '사물함에서 현금 10만원 도난.',
        alibi: {
          location: '교실',
          time: '절도 발생 시',
          activity: '수업 중',
          witnesses: ['같은 반 학생들'],
          hasHole: false
        },
        relationships: [],
        secrets: [],
        dialogues: [
          {
            topic: '절도',
            lines: ['사물함 문이 열려있었어요.', '용돈 10만원이 없어졌어요.']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-victim-2',
        name: '이현우 교사',
        role: 'victim',
        age: 42,
        gender: 'male',
        occupation: '교사',
        personality: '신경질적',
        appearance: '안경 쓴 중년 교사',
        background: '교무실 책상에서 노트북 도난.',
        alibi: {
          location: '강당',
          time: '절도 발생 시',
          activity: '회의 중',
          witnesses: ['동료 교사들'],
          hasHole: false
        },
        relationships: [],
        secrets: [],
        dialogues: [
          {
            topic: '절도',
            lines: ['노트북이 없어졌어요!', '200만원짜리인데!', '범인을 꼭 찾아주세요!']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-victim-3',
        name: '최서준',
        role: 'victim',
        age: 18,
        gender: 'male',
        occupation: '학생회 총무',
        personality: '꼼꼼함',
        appearance: '안경 쓴 학생',
        background: '학생회비 100만원 도난.',
        alibi: {
          location: '도서관',
          time: '절도 발생 시',
          activity: '공부 중',
          witnesses: ['도서관 학생들'],
          hasHole: false
        },
        relationships: [],
        secrets: [],
        dialogues: [
          {
            topic: '절도',
            lines: ['학생회비 100만원이 사라졌어요!', '금고 비밀번호를 누가 알았을까요?']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-security-guard',
        name: '정호석',
        role: 'witness',
        age: 45,
        gender: 'male',
        occupation: '경비원',
        personality: '책임감 있음',
        appearance: '경비 유니폼',
        background: '학교 야간 경비. CCTV 모니터링 담당.',
        alibi: {
          location: '경비실',
          time: '절도 발생 시간',
          activity: '순찰 중',
          witnesses: [],
          hasHole: false
        },
        relationships: [],
        secrets: [
          {
            id: 'secret-security-1',
            content: 'CCTV 사각지대를 완벽히 아는 사람은 관리인뿐',
            importance: 'major',
            revealCondition: 'CCTV 분석 후'
          }
        ],
        dialogues: [
          {
            topic: 'CCTV',
            lines: ['이상해요. CCTV에 한 번도 안 찍혔어요.', '사각지대만 골라서 움직인 것 같아요.', '그 동선을... 관리인 박영수씨만 알고 있는데...']
          }
        ],
        nervousTriggers: ['CCTV', '사각지대']
      },
      {
        id: 'char-detective',
        name: '강민호',
        role: 'witness',
        age: 38,
        gender: 'male',
        occupation: '학교 전담 경찰관',
        personality: '분석적, 냉철함',
        appearance: '정장 차림',
        background: '절도 사건 조사 중.',
        alibi: {
          location: '경찰서',
          time: '절도 발생 전',
          activity: '다른 사건 처리',
          witnesses: ['동료'],
          hasHole: false
        },
        relationships: [],
        secrets: [],
        dialogues: [
          {
            topic: '범행 패턴',
            lines: ['범인은 학교 내부인일 가능성이 높습니다.', '모든 잠긴 문을 열었어요. 마스터키가 있다는 뜻이죠.', '관리인의 마스터키를 조사해야겠습니다.']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-friend',
        name: '윤지수',
        role: 'witness',
        age: 25,
        gender: 'female',
        occupation: '박준혁의 여자친구',
        personality: '따뜻하고 걱정 많음',
        appearance: '수수한 외모',
        background: '준혁의 상황을 알고 있다.',
        alibi: {
          location: '집',
          time: '절도 발생 시',
          activity: '휴식',
          witnesses: [],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-janitor-son', type: '연인', description: '준혁을 걱정함' }
        ],
        secrets: [
          {
            id: 'secret-girlfriend-1',
            content: '준혁이 최근 돈 문제로 고민이 많았다',
            importance: 'major',
            revealCondition: '준혁 주변 조사 시'
          }
        ],
        dialogues: [
          {
            topic: '준혁',
            lines: ['준혁이가... 요즘 너무 힘들어해요.', '아버지 병원비 때문에... 아르바이트만으로는 부족해서...', '(걱정스럽게) 설마... 이상한 짓은 안 했겠죠?']
          }
        ],
        nervousTriggers: ['준혁', '돈', '병원비']
      }
    ],

    evidence: [
      {
        id: 'evidence-theft-list',
        name: '절도 피해 목록',
        type: 'document',
        description: '3일간 발생한 7건의 절도 내역',
        detailedDescription: '1일차: 사물함 현금 10만원, 교무실 노트북 / 2일차: 학생회비 100만원, 미술실 태블릿 / 3일차: 과학실 현미경, 음악실 기타, 교장실 골동품',
        location: '경찰서',
        foundAt: '사건 기록',
        linkedCharacters: [],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-cctv-blind-spot',
        name: 'CCTV 사각지대 분석',
        type: 'digital',
        description: 'CCTV에 단 한 번도 찍히지 않은 동선',
        detailedDescription: '범인은 모든 CCTV 사각지대를 완벽히 파악하고 움직였다. 이 동선을 아는 사람은 관리인뿐.',
        location: '보안실',
        foundAt: 'CCTV 분석',
        linkedCharacters: ['char-janitor-father'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: true,
        analysisResult: '관리인만 알 수 있는 완벽한 사각지대 이동.'
      },
      {
        id: 'evidence-master-key',
        name: '마스터키 복사본',
        type: 'physical',
        description: '박준혁이 복사한 마스터키',
        detailedDescription: '아버지의 마스터키를 몰래 복제. 모든 문을 열 수 있다.',
        location: '박준혁 집',
        foundAt: '압수 수색',
        linkedCharacters: ['char-janitor-son', 'char-janitor-father'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      },
      {
        id: 'evidence-stolen-items',
        name: '훔친 물건들',
        type: 'physical',
        description: '박준혁 집 창고에서 발견된 도난품',
        detailedDescription: '노트북, 태블릿, 현미경, 기타, 골동품 등 대부분의 물건이 발견됨.',
        location: '박준혁 집',
        foundAt: '압수 수색',
        linkedCharacters: ['char-janitor-son'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      },
      {
        id: 'evidence-hospital-bill',
        name: '병원 진료비 청구서',
        type: 'document',
        description: '박영수의 암 치료비 고지서',
        detailedDescription: '총 치료비: 3,200만원. 긴급 수술 필요.',
        location: '박준혁 집',
        foundAt: '서류 더미',
        linkedCharacters: ['char-janitor-father', 'char-janitor-son'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-alibi-hole',
        name: '알리바이 허점',
        type: 'testimony',
        description: '편의점 CCTV 확인 결과',
        detailedDescription: '박준혁은 알바 중 1~2시간씩 자리를 비웠다. "화장실 간다"고 했으나 실제로는 학교에 간 것.',
        location: '편의점',
        foundAt: 'CCTV 기록',
        linkedCharacters: ['char-janitor-son'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: true,
        analysisResult: '알바 중 학교 가서 절도 후 복귀.'
      },
      {
        id: 'evidence-pawn-shop',
        name: '중고 거래 내역',
        type: 'document',
        description: '박준혁이 물건을 팔려던 기록',
        detailedDescription: '노트북과 태블릿을 중고 사이트에 올렸으나 아직 판매 전.',
        location: '온라인',
        foundAt: '중고 거래 사이트',
        linkedCharacters: ['char-janitor-son'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      },
      {
        id: 'evidence-confession',
        name: '박준혁의 자백',
        type: 'testimony',
        description: '모든 증거 제시 후 자백',
        detailedDescription: '"죄송합니다... 아버지를 살리고 싶었어요. 돈을 벌 시간이 없었어요. 물건은 다 돌려드릴게요..."',
        location: '조사실',
        foundAt: '최종 대면',
        linkedCharacters: ['char-janitor-son'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      },
      {
        id: 'evidence-school-map',
        name: '학교 평면도',
        type: 'document',
        description: 'CCTV 사각지대 표시된 지도',
        detailedDescription: '박준혁이 아버지에게서 얻은 학교 구조도. CCTV 위치와 사각지대가 표시되어 있다.',
        location: '박준혁 집',
        foundAt: '책상 서랍',
        linkedCharacters: ['char-janitor-son', 'char-janitor-father'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      },
      {
        id: 'evidence-fingerprints',
        name: '지문 감식 결과',
        type: 'forensic',
        description: '절도 현장에서 채취한 지문',
        detailedDescription: '여러 장소에서 동일한 지문 발견. 박준혁의 지문과 일치.',
        location: '국과수',
        foundAt: '감식 결과',
        linkedCharacters: ['char-janitor-son'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: true,
        analysisResult: '모든 절도 현장에서 박준혁의 지문 발견.'
      }
    ],

    locations: [
      {
        id: 'loc-student-locker',
        name: '학생 사물함 구역',
        description: '첫 절도 발생 장소',
        atmosphere: '복도에 늘어선 사물함들',
        objects: [
          {
            id: 'obj-locker',
            name: '김다은 사물함',
            description: '강제로 열린 흔적',
            examinationResult: '마스터키로 열림. 지문 발견.',
            containsEvidence: 'evidence-fingerprints'
          }
        ],
        connectedTo: ['loc-corridor']
      },
      {
        id: 'loc-staff-office',
        name: '교무실',
        description: '노트북 도난 장소',
        atmosphere: '교사들의 업무 공간',
        objects: [
          {
            id: 'obj-teacher-desk',
            name: '이현우 책상',
            description: '노트북이 있던 자리',
            examinationResult: '지문 발견.'
          }
        ],
        connectedTo: ['loc-corridor']
      },
      {
        id: 'loc-student-council-room',
        name: '학생회실',
        description: '학생회비 도난 장소',
        atmosphere: '학생회 업무 공간',
        objects: [
          {
            id: 'obj-safe',
            name: '금고',
            description: '학생회비 보관',
            examinationResult: '마스터키로 학생회실 문을 연 후 금고 비밀번호 추측.'
          }
        ],
        connectedTo: ['loc-corridor']
      },
      {
        id: 'loc-art-room',
        name: '미술실',
        description: '태블릿 도난 장소',
        atmosphere: '미술 작품들이 전시된 교실',
        objects: [],
        connectedTo: ['loc-corridor']
      },
      {
        id: 'loc-science-lab',
        name: '과학실',
        description: '현미경 도난 장소',
        atmosphere: '실험 기구들이 놓인 실험실',
        objects: [],
        connectedTo: ['loc-corridor']
      },
      {
        id: 'loc-music-room',
        name: '음악실',
        description: '기타 도난 장소',
        atmosphere: '악기들이 있는 음악 교실',
        objects: [],
        connectedTo: ['loc-corridor']
      },
      {
        id: 'loc-principal-office',
        name: '교장실',
        description: '골동품 도난 장소',
        atmosphere: '권위적인 공간',
        objects: [
          {
            id: 'obj-antique',
            name: '골동품 진열대',
            description: '비어있는 진열대',
            examinationResult: '마스터키로 교장실 침입.'
          }
        ],
        connectedTo: ['loc-corridor']
      },
      {
        id: 'loc-security-room',
        name: '보안실',
        description: 'CCTV 모니터링 센터',
        atmosphere: '모니터들이 늘어선 방',
        objects: [
          {
            id: 'obj-cctv-monitor',
            name: 'CCTV 모니터',
            description: '학교 전체 감시',
            examinationResult: '사각지대 분석 가능.',
            containsEvidence: 'evidence-cctv-blind-spot'
          }
        ],
        connectedTo: []
      },
      {
        id: 'loc-junhyuk-home',
        name: '박준혁 집',
        description: '범인의 거주지',
        atmosphere: '어두컴컴하고 물건이 쌓인 원룸',
        objects: [
          {
            id: 'obj-storage',
            name: '창고',
            description: '물건들이 쌓인 공간',
            examinationResult: '도난품 발견.',
            containsEvidence: 'evidence-stolen-items'
          },
          {
            id: 'obj-desk-drawer',
            name: '책상 서랍',
            description: '서류와 지도',
            examinationResult: '학교 평면도와 사각지대 표시 지도 발견.',
            containsEvidence: 'evidence-school-map'
          }
        ],
        connectedTo: []
      }
    ],

    timeline: [
      { time: '3일 전 23:00', event: '첫 절도 - 사물함 현금', participants: ['char-janitor-son'], location: '사물함', importance: 'critical', isRevealed: false },
      { time: '3일 전 23:30', event: '첫 절도 - 교무실 노트북', participants: ['char-janitor-son'], location: '교무실', importance: 'critical', isRevealed: false },
      { time: '2일 전 23:00', event: '둘째 날 절도 - 학생회비', participants: ['char-janitor-son'], location: '학생회실', importance: 'critical', isRevealed: false },
      { time: '2일 전 23:45', event: '둘째 날 절도 - 미술실 태블릿', participants: ['char-janitor-son'], location: '미술실', importance: 'critical', isRevealed: false },
      { time: '1일 전 23:00', event: '셋째 날 절도 - 과학실 현미경', participants: ['char-janitor-son'], location: '과학실', importance: 'critical', isRevealed: false },
      { time: '1일 전 23:30', event: '셋째 날 절도 - 음악실 기타', participants: ['char-janitor-son'], location: '음악실', importance: 'critical', isRevealed: false },
      { time: '1일 전 24:00', event: '셋째 날 절도 - 교장실 골동품', participants: ['char-janitor-son'], location: '교장실', importance: 'critical', isRevealed: false },
      { time: '현재', event: '조사 시작, 패턴 분석', participants: ['char-detective'], location: '학교', importance: 'major', isRevealed: true }
    ],

    solution: {
      summary: '박준혁이 아버지 병원비를 마련하기 위해 아버지의 마스터키를 복사해 학교에서 연쇄 절도를 저질렀다.',
      detailedExplanation: [
        '박준혁의 아버지 박영수는 학교 관리인으로 20년간 근무했다.',
        '최근 암 진단을 받아 3천만원의 치료비가 필요했다.',
        '박준혁은 아르바이트로는 돈을 모을 시간이 없었다.',
        '아버지가 관리인이라 학교 구조와 CCTV 사각지대를 완벽히 알고 있었다.',
        '아버지 몰래 마스터키를 복사했다.',
        '야간 알바 중 1~2시간씩 자리를 비워 학교에 침입했다.',
        '3일간 7건의 절도를 저질렀고, 물건을 팔아 병원비를 마련하려 했다.',
        'CCTV 사각지대 분석, 마스터키 발견, 지문 감식으로 범인이 밝혀졌다.'
      ],
      keyEvidence: ['evidence-master-key', 'evidence-cctv-blind-spot', 'evidence-stolen-items', 'evidence-fingerprints'],
      howToSolve: [
        '절도 피해 목록 분석 (패턴 파악)',
        'CCTV 사각지대 분석 (내부인 추정)',
        '마스터키 소지자 조사',
        '관리인 박영수 및 가족 조사',
        '박준혁 알리바이 검증',
        '박준혁 집 압수 수색'
      ],
      commonMistakes: [
        '여러 명의 범인으로 생각하는 것',
        '학생 소행으로만 의심하는 것',
        '단순 도둑으로 치부하고 동기를 파악하지 않는 것'
      ]
    },

    deductionKeywords: {
      who: ['박준혁', '관리인 아들', '아르바이트생'],
      why: ['병원비', '아버지', '절박함', '효심'],
      how: ['마스터키', 'CCTV 사각지대', '내부 구조 파악'],
      when: ['3일간', '야간', '알바 중'],
      where: ['학교 전역', '7개 장소', '사각지대']
    },

    tags: ['절도', '연쇄범죄', '내부인', '효자', '절박함'],
    author: 'DEDUCTIO',
    version: '1.0'
  },

  // ========================================
  // special-005: 교내 스파이 사건
  // ========================================
  {
    id: 'special-005',
    title: '스파이 게임',
    subtitle: '학교 안의 산업 스파이',
    type: 'special',
    difficulty: 'expert',
    estimatedTime: 30,

    prologue: [
      '청운고의 과학 동아리가 국제 대회에서 우승할 발명품을 개발 중이다.',
      '그런데 경쟁 학교가 같은 아이디어로 먼저 출원했다.',
      '누군가 내부 정보를 유출하고 있다.'
    ],
    introduction: [
      '과학 동아리 지도교사가 연락해왔습니다.',
      '"우리 발명품 설계도가 유출됐습니다."',
      '"내부에 스파이가 있습니다. 찾아주세요."'
    ],
    setting: '청운고등학교 과학관',

    crimeTime: '최근 3주간',
    crimeLocation: '과학 동아리실',
    culpritId: 'char-spy',
    victimId: 'char-club-leader',
    motive: '금전 및 경쟁심',
    motiveDetail: '스파이는 경쟁 학교에서 거액을 받고 정보를 유출했다. 또한 개인적으로도 동아리 리더에게 질투를 느꼈다.',
    method: '숨겨진 카메라와 USB 복사',
    methodDetail: '동아리실에 초소형 카메라를 설치하고, 컴퓨터에 접근해 설계도를 USB에 복사했다.',

    characters: [
      {
        id: 'char-club-leader',
        name: '한지민',
        role: 'victim',
        age: 18,
        gender: 'female',
        occupation: '과학 동아리 부장',
        personality: '천재적, 열정적',
        appearance: '단발머리, 실험복',
        background: '발명품의 주 개발자. 국제 대회 우승 후보.',
        alibi: {
          location: '동아리실',
          time: '유출 시간',
          activity: '실험 중',
          witnesses: ['동아리 부원들'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-spy', type: '선후배', description: '같은 동아리' }
        ],
        secrets: [],
        dialogues: [
          {
            topic: '유출',
            lines: ['설계도가... 어떻게 나갔을까요?', '이 파일은 암호화했는데...', '누군가 내부에서...']
          }
        ],
        nervousTriggers: ['유출', '경쟁 학교']
      },
      {
        id: 'char-spy',
        name: '박성진',
        role: 'culprit',
        age: 17,
        gender: 'male',
        occupation: '과학 동아리 부원',
        personality: '영리하지만 질투심 많음',
        appearance: '안경, 차분한 외모',
        background: '동아리 2인자. 항상 한지민에게 밀렸다.',
        alibi: {
          location: '도서관',
          time: '유출 시간',
          activity: '자료 조사',
          witnesses: [],
          hasHole: true
        },
        motive: {
          type: 'greed',
          description: '금전 + 질투',
          strength: 3
        },
        relationships: [
          { targetId: 'char-club-leader', type: '라이벌', description: '질투함', isSecret: true },
          { targetId: 'char-rival-school', type: '공범', description: '돈 받고 정보 유출', isSecret: true }
        ],
        secrets: [
          {
            id: 'secret-spy-1',
            content: '경쟁 학교에서 500만원을 받고 설계도 유출',
            importance: 'critical',
            revealCondition: '은행 계좌 조사 + 카메라 발견'
          }
        ],
        dialogues: [
          {
            topic: '지민',
            lines: ['지민이는... 천재죠.', '(쓴웃음) 전 항상 2등이었어요.']
          }
        ],
        nervousTriggers: ['USB', '카메라', '경쟁 학교', '돈']
      },
      {
        id: 'char-rival-school',
        name: '김태훈',
        role: 'witness',
        age: 45,
        gender: 'male',
        occupation: '경쟁 학교 교사',
        personality: '교활함',
        appearance: '정장 차림',
        background: '박성진에게 접근해 스파이로 포섭했다.',
        alibi: {
          location: '경쟁 학교',
          time: '유출 시간',
          activity: '수업 중',
          witnesses: ['학생들'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-spy', type: '공범', description: '스파이 지시' }
        ],
        secrets: [
          {
            id: 'secret-rival-1',
            content: '박성진에게 500만원을 지급하고 정보를 받았다',
            importance: 'critical',
            revealCondition: '송금 기록 + 메시지 기록'
          }
        ],
        dialogues: [
          {
            topic: '박성진',
            lines: ['(긴장하며) 모르는 학생인데요?', '(증거 제시하면) ...합법적인 자문료였습니다.']
          }
        ],
        nervousTriggers: ['박성진', '송금', '설계도']
      },
      {
        id: 'char-teacher',
        name: '이상윤',
        role: 'witness',
        age: 42,
        gender: 'male',
        occupation: '과학 동아리 지도교사',
        personality: '열정적, 학생들 아낌',
        appearance: '과학 교사 모습',
        background: '동아리를 지도하며 발명품 개발을 돕고 있다.',
        alibi: {
          location: '교무실',
          time: '유출 시간',
          activity: '업무',
          witnesses: ['동료'],
          hasHole: false
        },
        relationships: [],
        secrets: [],
        dialogues: [
          {
            topic: '발명품',
            lines: ['아이들이 3년간 연구한 거예요.', '절대 이런 식으로 끝낼 순 없어요.', '범인을 꼭 찾아주세요!']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-club-member-1',
        name: '정수아',
        role: 'witness',
        age: 17,
        gender: 'female',
        occupation: '동아리 부원',
        personality: '관찰력 좋음',
        appearance: '동그란 안경',
        background: '동아리 회계. 최근 성진이가 이상하다고 느낌.',
        alibi: {
          location: '동아리실',
          time: '유출 시간',
          activity: '실험 보조',
          witnesses: ['다른 부원들'],
          hasHole: false
        },
        relationships: [],
        secrets: [
          {
            id: 'secret-witness-1',
            content: '성진이가 최근 컴퓨터 앞에 혼자 있는 걸 여러 번 봤다',
            importance: 'major',
            revealCondition: '동아리 부원 면담'
          }
        ],
        dialogues: [
          {
            topic: '성진',
            lines: ['성진이가... 요즘 이상해요.', '늦게까지 혼자 남아있고...', '컴퓨터 앞에서 뭔가 하더라고요.']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-it-expert',
        name: '최민수',
        role: 'witness',
        age: 35,
        gender: 'male',
        occupation: '학교 IT 관리자',
        personality: '분석적',
        appearance: '캐주얼 복장',
        background: '컴퓨터 보안 전문가. 숨겨진 카메라를 발견했다.',
        alibi: {
          location: 'IT실',
          time: '유출 시간',
          activity: '서버 관리',
          witnesses: [],
          hasHole: false
        },
        relationships: [],
        secrets: [],
        dialogues: [
          {
            topic: '카메라',
            lines: ['동아리실을 조사했더니... 초소형 카메라가 있었어요.', '책꽂이 뒤에 숨겨져 있었죠.', 'SD카드 분석하면 범인을 찾을 수 있을 겁니다.']
          }
        ],
        nervousTriggers: []
      }
    ],

    evidence: [
      {
        id: 'evidence-blueprint',
        name: '유출된 설계도',
        type: 'document',
        description: '경쟁 학교가 제출한 설계도',
        detailedDescription: '청운고 발명품과 99% 동일. 일부 세부사항만 변경됨.',
        location: '대회 사무국',
        foundAt: '제출 서류',
        linkedCharacters: [],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: true,
        analysisResult: '원본과 거의 동일. 명백한 유출.'
      },
      {
        id: 'evidence-spy-camera',
        name: '초소형 카메라',
        type: 'physical',
        description: '동아리실 책꽂이에서 발견',
        detailedDescription: '3주간 녹화된 SD카드 포함. 설계도 작업 과정이 전부 촬영됨.',
        location: '동아리실',
        foundAt: '책꽂이 뒤',
        linkedCharacters: [],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: true,
        analysisResult: 'SD카드에 박성진이 카메라를 설치하는 모습 촬영됨.'
      },
      {
        id: 'evidence-usb-log',
        name: 'USB 사용 기록',
        type: 'digital',
        description: '동아리 컴퓨터 로그',
        detailedDescription: '2주 전, 박성진 계정으로 설계도 파일이 USB에 복사됨.',
        location: '동아리실 컴퓨터',
        foundAt: '시스템 로그',
        linkedCharacters: ['char-spy'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-money-transfer',
        name: '송금 기록',
        type: 'document',
        description: '김태훈 → 박성진 500만원',
        detailedDescription: '2주 전 송금. 메모: "자문료"',
        location: '은행',
        foundAt: '계좌 조회',
        linkedCharacters: ['char-spy', 'char-rival-school'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      },
      {
        id: 'evidence-message',
        name: '암호화 메시지',
        type: 'digital',
        description: '박성진과 김태훈의 대화',
        detailedDescription: '"자료 받았습니다. 약속한 금액 부탁드립니다." "입금 완료. 수고했네."',
        location: '박성진 핸드폰',
        foundAt: '메신저 앱',
        linkedCharacters: ['char-spy', 'char-rival-school'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      },
      {
        id: 'evidence-witness-testimony',
        name: '정수아 증언',
        type: 'testimony',
        description: '박성진의 수상한 행동 목격',
        detailedDescription: '늦은 시간 혼자 컴퓨터 사용, USB 꽂는 모습 목격.',
        location: '조사실',
        foundAt: '정수아 면담',
        linkedCharacters: ['char-spy'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-confession',
        name: '박성진 자백',
        type: 'testimony',
        description: '모든 증거 제시 후 자백',
        detailedDescription: '"지민이가... 항상 1등이었어요. 전 평생 2등... 돈도 필요했고... 죄송합니다..."',
        location: '조사실',
        foundAt: '최종 대면',
        linkedCharacters: ['char-spy'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      }
    ],

    locations: [
      {
        id: 'loc-science-club',
        name: '과학 동아리실',
        description: '발명품 개발 공간',
        atmosphere: '실험 기구와 설계도가 가득',
        objects: [
          {
            id: 'obj-bookshelf',
            name: '책꽂이',
            description: '과학 서적들',
            examinationResult: '뒤쪽에 카메라 발견.',
            containsEvidence: 'evidence-spy-camera'
          },
          {
            id: 'obj-computer',
            name: '동아리 컴퓨터',
            description: '설계 작업용',
            examinationResult: 'USB 접속 기록 발견. 설계도 파일 복사 흔적 있음.',
            containsEvidence: 'evidence-usb-log'
          }
        ],
        connectedTo: ['loc-science-building']
      },
      {
        id: 'loc-science-building',
        name: '과학관',
        description: '과학 실험실들이 모인 건물',
        atmosphere: '실험 냄새가 나는 복도',
        objects: [],
        connectedTo: ['loc-science-club']
      },
      {
        id: 'loc-rival-school',
        name: '경쟁 학교',
        description: '설계도를 도용한 학교',
        atmosphere: '긴장감 도는 분위기',
        objects: [],
        connectedTo: []
      }
    ],

    timeline: [
      { time: '3주 전', event: '박성진, 김태훈과 접촉', participants: ['char-spy', 'char-rival-school'], location: '카페', importance: 'critical', isRevealed: false },
      { time: '3주 전', event: '동아리실에 카메라 설치', participants: ['char-spy'], location: '동아리실', importance: 'critical', isRevealed: false },
      { time: '2주 전', event: 'USB로 설계도 복사', participants: ['char-spy'], location: '동아리실', importance: 'critical', isRevealed: false },
      { time: '2주 전', event: '김태훈에게 자료 전달', participants: ['char-spy', 'char-rival-school'], location: '외부', importance: 'critical', isRevealed: false },
      { time: '2주 전', event: '500만원 송금', participants: ['char-rival-school'], location: '은행', importance: 'critical', isRevealed: false },
      { time: '1주 전', event: '경쟁 학교, 같은 발명품으로 출원', participants: ['char-rival-school'], location: '경쟁 학교', importance: 'critical', isRevealed: true },
      { time: '현재', event: '유출 발각, 조사 시작', participants: [], location: '동아리실', importance: 'major', isRevealed: true }
    ],

    solution: {
      summary: '박성진이 질투와 금전 욕심으로 동아리실에 카메라를 설치하고 설계도를 경쟁 학교에 유출했다.',
      detailedExplanation: [
        '박성진은 항상 한지민에게 밀려 2등이었다.',
        '경쟁 학교 김태훈이 500만원을 제안하며 접근했다.',
        '돈과 질투심에 박성진은 제안을 받아들였다.',
        '동아리실에 초소형 카메라를 설치해 작업 과정을 녹화했다.',
        '컴퓨터에 접근해 설계도를 USB에 복사했다.',
        '김태훈에게 자료를 넘기고 500만원을 받았다.',
        '경쟁 학교는 같은 발명품으로 먼저 출원했다.',
        '카메라 발견, USB 로그, 송금 기록으로 범행이 밝혀졌다.'
      ],
      keyEvidence: ['evidence-spy-camera', 'evidence-usb-log', 'evidence-money-transfer', 'evidence-message'],
      howToSolve: [
        '유출 경로 분석',
        '동아리실 정밀 조사 (카메라 발견)',
        '컴퓨터 로그 확인',
        '동아리 부원들 동선 파악',
        '박성진 금융 거래 조사',
        '경쟁 학교와의 연결고리 발견'
      ],
      commonMistakes: [
        '외부 해킹으로만 생각하는 것',
        '단순 도용으로 치부하는 것',
        '내부인을 의심하지 않는 것'
      ]
    },

    deductionKeywords: {
      who: ['박성진', '동아리 부원', '2인자'],
      why: ['질투', '금전', '2등 콤플렉스'],
      how: ['카메라', 'USB 복사', '내부 정보'],
      when: ['3주간', '2주 전 복사', '최근'],
      where: ['동아리실', '컴퓨터', '책꽂이']
    },

    tags: ['산업스파이', '정보유출', '질투', '금전', '배신'],
    author: 'DEDUCTIO',
    version: '1.0'
  },

  // ========================================
  // special-006: 졸업생의 복수
  // ========================================
  {
    id: 'special-006',
    title: '졸업생의 복수',
    subtitle: '5년 전 퇴학생이 돌아왔다',
    type: 'special',
    difficulty: 'expert',
    estimatedTime: 35,

    prologue: [
      '청운고에 새로운 실습 교사가 부임했다.',
      '그런데 그와 관련된 교사들에게 이상한 일이 벌어지기 시작했다.',
      '5년 전, 억울하게 퇴학당한 학생이 있었다...'
    ],
    introduction: [
      '교무주임이 급하게 연락해왔습니다.',
      '"김 선생님이 쓰러졌습니다. 독극물 같아요."',
      '"최근 부임한 실습 교사가 수상해요."'
    ],
    setting: '청운고등학교 전체',

    crimeTime: '12:30',
    crimeLocation: '교무실',
    culpritId: 'char-revenge-teacher',
    victimId: 'char-victim-teacher',
    motive: '5년 전 억울한 퇴학에 대한 복수',
    motiveDetail: '범인은 5년 전 누명을 쓰고 퇴학당했다. 성형과 이름 변경 후 실습 교사로 돌아와 당시 자신을 퇴학시킨 교사들에게 복수를 계획했다.',
    method: '혈압약에 독극물을 혼합',
    methodDetail: '피해자의 혈압약을 빼돌려 독극물을 섞었다. 피해자가 점심 후 약을 먹자 쓰러졌다.',

    characters: [
      {
        id: 'char-revenge-teacher',
        name: '이준서 (구 박민호)',
        role: 'culprit',
        age: 23,
        gender: 'male',
        occupation: '실습 교사 (복수자)',
        personality: '냉정하고 치밀함, 분노를 숨김',
        appearance: '성형으로 변한 얼굴, 차분한 인상',
        background: '5년 전 절도 누명을 쓰고 퇴학. 진범은 당시 교감의 아들이었다.',
        alibi: {
          location: '2학년 교실',
          time: '12:30',
          activity: '수업 준비 중',
          witnesses: [],
          hasHole: true,
          holeDetail: '점심시간에 교무실 출입 기록'
        },
        motive: {
          type: 'revenge',
          description: '억울한 퇴학에 대한 복수',
          strength: 3
        },
        relationships: [
          { targetId: 'char-victim-teacher', type: '원수', description: '자신을 퇴학시킨 장본인', isSecret: true }
        ],
        secrets: [
          {
            id: 'secret-revenge-1',
            content: '5년 전 퇴학당한 박민호가 성형 후 돌아왔다',
            importance: 'critical',
            revealCondition: '졸업앨범 대조 + 신원 조회'
          }
        ],
        dialogues: [
          {
            topic: '부임',
            lines: ['이 학교에 특별한 감정은 없습니다.', '(눈빛 변화) 그냥... 좋은 학교라고 들었어요.']
          }
        ],
        nervousTriggers: ['박민호', '5년 전', '퇴학', '졸업앨범']
      },
      {
        id: 'char-victim-teacher',
        name: '김영호',
        role: 'victim',
        age: 55,
        gender: 'male',
        occupation: '교감',
        personality: '권위적, 엄격함',
        appearance: '흰머리, 안경',
        background: '5년 전 박민호 퇴학을 주도한 인물.',
        alibi: {
          location: '교무실',
          time: '12:30',
          activity: '점심 식사 후 약 복용',
          witnesses: ['교사들'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-real-thief', type: '아버지', description: '아들의 죄를 덮어줌', isSecret: true }
        ],
        secrets: [
          {
            id: 'secret-victim-1',
            content: '아들 대신 박민호에게 누명을 씌웠다',
            importance: 'critical',
            revealCondition: '5년 전 사건 기록 조사'
          }
        ],
        dialogues: [
          {
            topic: '과거',
            lines: ['(기침) 5년 전요? 그때 일은... 적법하게 처리됐습니다.']
          }
        ],
        nervousTriggers: ['박민호', '아들', '그때']
      },
      {
        id: 'char-real-thief',
        name: '김준영',
        role: 'witness',
        age: 22,
        gender: 'male',
        occupation: '대학생 (진범)',
        personality: '겁이 많고 죄책감에 시달림',
        appearance: '창백한 얼굴',
        background: '5년 전 실제 절도범. 아버지가 덮어줬다.',
        alibi: {
          location: '대학교',
          time: '12:30',
          activity: '수업 중',
          witnesses: ['동기'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-victim-teacher', type: '아들', description: '아버지에게 보호받음' }
        ],
        secrets: [
          {
            id: 'secret-real-1',
            content: '5년 전 절도의 진범',
            importance: 'critical',
            revealCondition: '추궁 시 자백'
          }
        ],
        dialogues: [
          {
            topic: '5년 전',
            lines: ['(떨림) 그... 그건...', '저 때문이에요. 다 제 잘못이에요!']
          }
        ],
        nervousTriggers: ['절도', '박민호', '진실']
      },
      {
        id: 'char-old-teacher',
        name: '박정숙',
        role: 'witness',
        age: 58,
        gender: 'female',
        occupation: '국어 교사',
        personality: '정의로움, 후회',
        appearance: '온화한 인상',
        background: '5년 전 박민호 퇴학에 반대했지만 묵인했다.',
        alibi: {
          location: '교실',
          time: '12:30',
          activity: '학생 상담',
          witnesses: ['학생'],
          hasHole: false
        },
        relationships: [],
        secrets: [],
        dialogues: [
          {
            topic: '5년 전',
            lines: ['그때 더 싸웠어야 했는데...', '민호는 억울했어요. 알고 있었지만...']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-nurse',
        name: '이수진',
        role: 'witness',
        age: 35,
        gender: 'female',
        occupation: '보건 교사',
        personality: '관찰력 좋음',
        appearance: '흰 가운',
        background: '실습 교사의 수상한 행동을 목격.',
        alibi: {
          location: '보건실',
          time: '12:30',
          activity: '근무 중',
          witnesses: ['학생들'],
          hasHole: false
        },
        relationships: [],
        secrets: [],
        dialogues: [
          {
            topic: '실습 교사',
            lines: ['그분... 이상해요.', '교감 선생님 약 가방 근처에서 봤어요.']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-detective',
        name: '형사',
        role: 'bystander',
        age: 40,
        gender: 'male',
        occupation: '형사',
        personality: '신중함',
        appearance: '평범한 정장',
        background: '사건 조사 담당.',
        alibi: {
          location: '외부',
          time: '12:30',
          activity: '출동 전',
          witnesses: [],
          hasHole: false
        },
        relationships: [],
        secrets: [],
        dialogues: [],
        nervousTriggers: []
      }
    ],

    evidence: [
      {
        id: 'evidence-poison',
        name: '독극물 성분 분석',
        type: 'forensic',
        description: '피해자 혈액에서 발견된 독극물',
        detailedDescription: '일반적으로 구하기 어려운 독극물. 화학 전공자가 합성 가능.',
        location: '병원',
        foundAt: '피해자 혈액',
        linkedCharacters: ['char-revenge-teacher'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: true,
        analysisResult: '범인이 화학 지식이 있음을 암시'
      },
      {
        id: 'evidence-pill-switch',
        name: '교체된 약',
        type: 'physical',
        description: '피해자의 혈압약에서 발견된 독극물',
        detailedDescription: '혈압약 캡슐이 교묘하게 열렸다 닫힌 흔적.',
        location: '교무실',
        foundAt: '피해자 책상',
        linkedCharacters: ['char-revenge-teacher'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: true,
        analysisResult: '약이 조작되었음'
      },
      {
        id: 'evidence-entry-log',
        name: '교무실 출입 기록',
        type: 'document',
        description: '점심시간 교무실 출입 기록',
        detailedDescription: '실습 교사가 12시 15분에 교무실에 들어갔다.',
        location: '행정실',
        foundAt: '출입 기록부',
        linkedCharacters: ['char-revenge-teacher'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-old-album',
        name: '5년 전 졸업앨범',
        type: 'document',
        description: '퇴학생 박민호의 사진',
        detailedDescription: '실습 교사와 박민호의 눈, 귀 등이 일치.',
        location: '교무실',
        foundAt: '기록 보관실',
        linkedCharacters: ['char-revenge-teacher'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: true,
        analysisResult: '성형했지만 일부 특징 일치'
      },
      {
        id: 'evidence-old-case',
        name: '5년 전 사건 기록',
        type: 'document',
        description: '박민호 퇴학 관련 기록',
        detailedDescription: '증거가 불충분했고 목격자 진술도 애매했다.',
        location: '행정실',
        foundAt: '문서 보관함',
        linkedCharacters: ['char-victim-teacher', 'char-real-thief'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-identity',
        name: '신원 조회 결과',
        type: 'digital',
        description: '실습 교사 이준서의 신원',
        detailedDescription: '5년 전 법적 개명. 이전 이름: 박민호.',
        location: '경찰서',
        foundAt: '신원 조회',
        linkedCharacters: ['char-revenge-teacher'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: true,
        analysisResult: '실습 교사 = 박민호'
      },
      {
        id: 'evidence-nurse-testimony',
        name: '보건 교사 증언',
        type: 'testimony',
        description: '수상한 행동 목격',
        detailedDescription: '실습 교사가 교감 책상 근처에서 뭔가를 만지는 것을 봤다.',
        location: '보건실',
        foundAt: '보건 교사 진술',
        linkedCharacters: ['char-revenge-teacher', 'char-nurse'],
        isCritical: false,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-surgery-record',
        name: '성형 수술 기록',
        type: 'document',
        description: '범인의 성형 기록',
        detailedDescription: '3년 전 대대적인 안면 성형 수술.',
        location: '병원',
        foundAt: '의료 기록',
        linkedCharacters: ['char-revenge-teacher'],
        isCritical: false,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: true,
        analysisResult: '신원 은폐 목적'
      }
    ],

    locations: [
      {
        id: 'loc-staff-room',
        name: '교무실',
        description: '교사들의 업무 공간',
        atmosphere: '긴장된 분위기',
        objects: [
          { id: 'obj-desk', name: '교감 책상', description: '피해자의 책상', examinationResult: '약통 발견', containsEvidence: 'evidence-pill-switch' },
          { id: 'obj-entry', name: '출입 기록부', description: '출입 기록', examinationResult: '점심시간 기록 확인', containsEvidence: 'evidence-entry-log' }
        ],
        connectedTo: ['loc-archive', 'loc-health-room']
      },
      {
        id: 'loc-archive',
        name: '기록 보관실',
        description: '과거 문서들이 보관된 곳',
        atmosphere: '먼지 쌓인 분위기',
        objects: [
          { id: 'obj-album', name: '졸업앨범', description: '과거 졸업앨범들', examinationResult: '5년 전 앨범에서 박민호 발견', containsEvidence: 'evidence-old-album' },
          { id: 'obj-case-file', name: '사건 기록', description: '퇴학 관련 문서', examinationResult: '박민호 퇴학 기록', containsEvidence: 'evidence-old-case' }
        ],
        connectedTo: ['loc-staff-room']
      },
      {
        id: 'loc-health-room',
        name: '보건실',
        description: '학생 건강 관리 공간',
        atmosphere: '깨끗하고 하얀',
        objects: [
          { id: 'obj-nurse-desk', name: '보건 교사 책상', description: '근무 장소', examinationResult: '증언 확보 가능', containsEvidence: 'evidence-nurse-testimony' }
        ],
        connectedTo: ['loc-staff-room']
      },
      {
        id: 'loc-hospital',
        name: '병원',
        description: '피해자가 이송된 곳',
        atmosphere: '응급실 긴박함',
        objects: [
          { id: 'obj-blood-test', name: '혈액 검사 결과', description: '독극물 검출', examinationResult: '독극물 성분 분석', containsEvidence: 'evidence-poison' }
        ],
        connectedTo: []
      },
      {
        id: 'loc-police',
        name: '경찰서',
        description: '수사 기관',
        atmosphere: '공식적',
        objects: [
          { id: 'obj-identity', name: '신원 조회 시스템', description: '개명 기록 검색', examinationResult: '이준서 = 박민호', containsEvidence: 'evidence-identity' }
        ],
        connectedTo: []
      }
    ],

    timeline: [
      { time: '5년 전', event: '박민호 억울한 퇴학', participants: ['char-revenge-teacher', 'char-victim-teacher', 'char-real-thief'], location: '학교', importance: 'critical', isRevealed: false },
      { time: '3년 전', event: '박민호 성형 및 개명', participants: ['char-revenge-teacher'], location: '병원', importance: 'major', isRevealed: false },
      { time: '1개월 전', event: '이준서(박민호) 실습 교사 부임', participants: ['char-revenge-teacher'], location: '학교', importance: 'critical', isRevealed: true },
      { time: '어제', event: '교감 약통 교체', participants: ['char-revenge-teacher'], location: '교무실', importance: 'critical', isRevealed: false },
      { time: '12:15', event: '교무실 침입', participants: ['char-revenge-teacher'], location: '교무실', importance: 'critical', isRevealed: false },
      { time: '12:30', event: '교감 약 복용 후 쓰러짐', participants: ['char-victim-teacher'], location: '교무실', importance: 'critical', isRevealed: true },
      { time: '12:35', event: '119 신고', participants: ['char-old-teacher'], location: '교무실', importance: 'major', isRevealed: true }
    ],

    solution: {
      summary: '5년 전 억울하게 퇴학당한 박민호가 성형과 개명 후 실습 교사로 돌아와 자신을 퇴학시킨 교감에게 복수했다.',
      detailedExplanation: [
        '5년 전, 교감의 아들 김준영이 저지른 절도가 박민호에게 누명이 씌워졌다.',
        '교감은 아들을 보호하기 위해 증거를 조작하고 박민호를 퇴학시켰다.',
        '박민호는 성형과 개명을 거쳐 이준서라는 새 신원으로 실습 교사가 되었다.',
        '학교에 부임 후 교감의 약을 독극물로 교체해 복수를 감행했다.',
        '졸업앨범 대조, 신원 조회, 약 조작 증거로 범인이 밝혀졌다.'
      ],
      keyEvidence: ['evidence-poison', 'evidence-pill-switch', 'evidence-old-album', 'evidence-identity'],
      howToSolve: [
        '독극물 성분 분석으로 범행 방법 파악',
        '교무실 출입 기록 확인',
        '보건 교사 증언 청취',
        '5년 전 사건 기록 조사',
        '졸업앨범에서 박민호 사진 확인',
        '실습 교사 신원 조회로 정체 확인'
      ],
      commonMistakes: [
        '외부인 침입으로 생각하는 것',
        '과거 사건과 연결 짓지 못하는 것',
        '성형으로 바뀐 외모에 속는 것'
      ]
    },

    deductionKeywords: {
      who: ['이준서', '박민호', '실습 교사', '퇴학생'],
      why: ['복수', '누명', '억울함', '퇴학'],
      how: ['독극물', '약 교체', '혈압약'],
      when: ['점심시간', '12시 30분'],
      where: ['교무실', '책상']
    },

    tags: ['복수', '누명', '성형', '독살', '과거사건'],
    author: 'DEDUCTIO',
    version: '1.0'
  },

  // ========================================
  // special-007: 학교 역사의 비밀
  // ========================================
  {
    id: 'special-007',
    title: '학교 역사의 비밀',
    subtitle: '50년 전 설립의 어두운 진실',
    type: 'special',
    difficulty: 'expert',
    estimatedTime: 40,

    prologue: [
      '청운고 50주년 기념관 공사 중 지하에서 유골이 발견되었다.',
      '50년 전, 학교 설립 과정에서 무슨 일이 있었던 걸까?',
      '그리고 이 사실을 조사하던 역사 교사가 실종되었다.'
    ],
    introduction: [
      '공사 현장에서 급보가 왔습니다.',
      '"지하에서 유골이 나왔습니다!"',
      '"그리고 이걸 조사하던 한 교사가 사라졌어요."'
    ],
    setting: '청운고등학교 50주년 기념관 공사 현장',

    crimeTime: '02:00',
    crimeLocation: '공사 현장',
    culpritId: 'char-chairman',
    victimId: 'char-history-teacher',
    motive: '50년 전 조부의 범죄 은폐',
    motiveDetail: '현 이사장의 조부가 50년 전 원 토지 소유자를 살해하고 땅을 강탈해 학교를 세웠다. 이 사실이 밝혀지면 학교와 가문이 몰락한다.',
    method: '공사 현장에서 추락사로 위장',
    methodDetail: '역사 교사가 증거를 찾자, 이사장이 비서를 시켜 공사 현장 3층에서 밀어 추락사로 위장했다.',

    characters: [
      {
        id: 'char-chairman',
        name: '박재훈',
        role: 'culprit',
        age: 65,
        gender: 'male',
        occupation: '학교 이사장',
        personality: '권위적, 냉혹함',
        appearance: '고급 정장, 흰머리',
        background: '3대째 학교를 운영. 조부의 비밀을 알고 있다.',
        alibi: {
          location: '자택',
          time: '02:00',
          activity: '수면 중',
          witnesses: ['가정부'],
          hasHole: true,
          holeDetail: '직접 범행은 안 했지만 지시했다'
        },
        motive: {
          type: 'fear',
          description: '가문과 학교 몰락을 막기 위해',
          strength: 3
        },
        relationships: [
          { targetId: 'char-secretary', type: '고용주', description: '충성스러운 비서에게 범행 지시' }
        ],
        secrets: [
          {
            id: 'secret-chairman-1',
            content: '조부가 50년 전 토지 소유자를 살해',
            importance: 'critical',
            revealCondition: '유골 신원 확인 + 토지 문서'
          }
        ],
        dialogues: [
          {
            topic: '유골',
            lines: ['공사 중단하고 조용히 처리해.', '(분노) 이건 학교 명예의 문제야!']
          }
        ],
        nervousTriggers: ['유골', '50년 전', '조부', '토지']
      },
      {
        id: 'char-secretary',
        name: '김동수',
        role: 'suspect',
        age: 45,
        gender: 'male',
        occupation: '이사장 비서',
        personality: '충성스럽고 냉정함',
        appearance: '검은 정장, 무표정',
        background: '20년간 이사장을 보좌. 실제 범행 실행자.',
        alibi: {
          location: '이사장 자택',
          time: '02:00',
          activity: '대기 중',
          witnesses: [],
          hasHole: true,
          holeDetail: '새벽에 외출한 흔적'
        },
        motive: {
          type: 'protection',
          description: '이사장 보호 및 자기 보신',
          strength: 3
        },
        relationships: [
          { targetId: 'char-chairman', type: '비서', description: '무조건적 충성' }
        ],
        secrets: [
          {
            id: 'secret-secretary-1',
            content: '역사 교사를 밀어서 살해',
            importance: 'critical',
            revealCondition: 'CCTV + 지문'
          }
        ],
        dialogues: [
          {
            topic: '그날 밤',
            lines: ['저는 이사장님 댁에 있었습니다.', '(동요) 공사 현장요? 왜 제가 거기를...']
          }
        ],
        nervousTriggers: ['새벽', 'CCTV', '장갑', '현장']
      },
      {
        id: 'char-history-teacher',
        name: '한민수',
        role: 'victim',
        age: 50,
        gender: 'male',
        occupation: '역사 교사 (피해자)',
        personality: '정의로움, 진실 추구',
        appearance: '안경, 학자 풍모',
        background: '학교 역사 연구 중 진실을 발견했다.',
        alibi: {
          location: '공사 현장',
          time: '02:00',
          activity: '증거 조사 중',
          witnesses: [],
          hasHole: false
        },
        relationships: [],
        secrets: [
          {
            id: 'secret-victim-1',
            content: '50년 전 진실을 발견했다',
            importance: 'critical',
            revealCondition: '연구 노트 발견'
          }
        ],
        dialogues: [],
        nervousTriggers: []
      },
      {
        id: 'char-construction-chief',
        name: '이정환',
        role: 'witness',
        age: 55,
        gender: 'male',
        occupation: '공사 현장 소장',
        personality: '성실함',
        appearance: '안전모, 작업복',
        background: '유골을 발견하고 신고한 인물.',
        alibi: {
          location: '자택',
          time: '02:00',
          activity: '수면 중',
          witnesses: ['아내'],
          hasHole: false
        },
        relationships: [],
        secrets: [],
        dialogues: [
          {
            topic: '발견',
            lines: ['기초 공사 중에 뼈가 나왔어요.', '이사장님이 조용히 하라고 했는데...']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-descendant',
        name: '김영자',
        role: 'witness',
        age: 75,
        gender: 'female',
        occupation: '원 토지 소유자 손녀',
        personality: '슬픔, 원한',
        appearance: '늙은 할머니',
        background: '50년 전 실종된 토지 소유자의 손녀.',
        alibi: {
          location: '요양원',
          time: '02:00',
          activity: '입원 중',
          witnesses: ['간호사'],
          hasHole: false
        },
        relationships: [],
        secrets: [
          {
            id: 'secret-descendant-1',
            content: '할아버지가 학교 땅을 팔지 않았다고 주장',
            importance: 'major',
            revealCondition: '면담 시'
          }
        ],
        dialogues: [
          {
            topic: '과거',
            lines: ['할아버지는 그 땅을 절대 안 팔았어요.', '어느 날 갑자기 사라지셨어요...']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-forensic',
        name: '최수민',
        role: 'bystander',
        age: 38,
        gender: 'female',
        occupation: '법의학자',
        personality: '분석적',
        appearance: '하얀 가운',
        background: '유골 분석 담당.',
        alibi: {
          location: '연구소',
          time: '02:00',
          activity: '근무 외',
          witnesses: [],
          hasHole: false
        },
        relationships: [],
        secrets: [],
        dialogues: [
          {
            topic: '유골',
            lines: ['유골은 약 50년 전 사망으로 추정됩니다.', '두개골에 둔기로 인한 골절이 있어요.']
          }
        ],
        nervousTriggers: []
      }
    ],

    evidence: [
      {
        id: 'evidence-bones',
        name: '발견된 유골',
        type: 'forensic',
        description: '공사 현장 지하에서 발견된 인골',
        detailedDescription: '50년 전 사망 추정. 두개골에 둔기 골절 흔적.',
        location: '공사 현장',
        foundAt: '지하 1m',
        linkedCharacters: ['char-chairman'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: true,
        analysisResult: '살해 흔적이 있는 50년 전 유골'
      },
      {
        id: 'evidence-land-doc',
        name: '50년 전 토지 문서',
        type: 'document',
        description: '학교 설립 당시 토지 거래 문서',
        detailedDescription: '토지 소유자 서명이 위조된 흔적.',
        location: '등기소',
        foundAt: '옛 기록',
        linkedCharacters: ['char-chairman'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: true,
        analysisResult: '서명 위조 확인'
      },
      {
        id: 'evidence-research-notes',
        name: '역사 교사 연구 노트',
        type: 'document',
        description: '피해자가 남긴 연구 기록',
        detailedDescription: '50년 전 토지 강탈과 실종 사건 조사 내용.',
        location: '피해자 사무실',
        foundAt: '책상 서랍',
        linkedCharacters: ['char-history-teacher', 'char-chairman'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-cctv-night',
        name: '새벽 CCTV 영상',
        type: 'digital',
        description: '공사 현장 CCTV',
        detailedDescription: '새벽 2시 비서가 현장에 있는 모습.',
        location: '보안실',
        foundAt: 'CCTV 서버',
        linkedCharacters: ['char-secretary'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-fingerprints',
        name: '현장 지문',
        type: 'forensic',
        description: '추락 현장 난간 지문',
        detailedDescription: '비서 김동수의 지문과 일치.',
        location: '공사 현장',
        foundAt: '3층 난간',
        linkedCharacters: ['char-secretary'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: true,
        analysisResult: '비서 지문 일치'
      },
      {
        id: 'evidence-phone-records',
        name: '통화 기록',
        type: 'digital',
        description: '이사장과 비서 간 새벽 통화',
        detailedDescription: '새벽 1시 30분 5분간 통화.',
        location: '통신사',
        foundAt: '통화 기록',
        linkedCharacters: ['char-chairman', 'char-secretary'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-descendant-testimony',
        name: '손녀 증언',
        type: 'testimony',
        description: '원 토지 소유자 손녀의 증언',
        detailedDescription: '할아버지가 땅을 팔지 않았고 갑자기 실종됐다.',
        location: '요양원',
        foundAt: '면담',
        linkedCharacters: ['char-descendant'],
        isCritical: false,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-old-photo',
        name: '50년 전 기공식 사진',
        type: 'document',
        description: '학교 기공식 사진',
        detailedDescription: '현 이사장 조부와 실종자가 함께 찍힌 사진.',
        location: '학교 역사관',
        foundAt: '사진첩',
        linkedCharacters: ['char-chairman'],
        isCritical: false,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      }
    ],

    locations: [
      {
        id: 'loc-construction',
        name: '공사 현장',
        description: '50주년 기념관 공사 현장',
        atmosphere: '먼지와 소음',
        objects: [
          { id: 'obj-excavation', name: '발굴 현장', description: '유골 발견 장소', examinationResult: '50년 된 유골', containsEvidence: 'evidence-bones' },
          { id: 'obj-railing', name: '3층 난간', description: '피해자 추락 지점', examinationResult: '지문 발견', containsEvidence: 'evidence-fingerprints' }
        ],
        connectedTo: ['loc-security']
      },
      {
        id: 'loc-security',
        name: '보안실',
        description: 'CCTV 관제 센터',
        atmosphere: '모니터 빛',
        objects: [
          { id: 'obj-cctv-server', name: 'CCTV 서버', description: '영상 저장소', examinationResult: '새벽 영상 확인', containsEvidence: 'evidence-cctv-night' }
        ],
        connectedTo: ['loc-construction']
      },
      {
        id: 'loc-victim-office',
        name: '피해자 사무실',
        description: '역사 교사의 연구실',
        atmosphere: '책과 자료로 가득',
        objects: [
          { id: 'obj-desk', name: '책상', description: '연구 노트', examinationResult: '중요 발견 기록', containsEvidence: 'evidence-research-notes' }
        ],
        connectedTo: ['loc-archive']
      },
      {
        id: 'loc-archive',
        name: '역사 자료실',
        description: '학교 역사 자료 보관',
        atmosphere: '오래된 냄새',
        objects: [
          { id: 'obj-photo-album', name: '사진첩', description: '옛날 사진들', examinationResult: '기공식 사진 발견', containsEvidence: 'evidence-old-photo' }
        ],
        connectedTo: ['loc-victim-office']
      },
      {
        id: 'loc-registry',
        name: '등기소',
        description: '토지 등기 기관',
        atmosphere: '공식적',
        objects: [
          { id: 'obj-records', name: '토지 기록', description: '50년 전 거래 문서', examinationResult: '서명 위조 흔적', containsEvidence: 'evidence-land-doc' }
        ],
        connectedTo: []
      }
    ],

    timeline: [
      { time: '50년 전', event: '토지 소유자 살해 및 매장', participants: ['char-chairman'], location: '현 학교 부지', importance: 'critical', isRevealed: false },
      { time: '50년 전', event: '토지 문서 위조 및 학교 설립', participants: ['char-chairman'], location: '등기소', importance: 'critical', isRevealed: false },
      { time: '1주일 전', event: '공사 중 유골 발견', participants: ['char-construction-chief'], location: '공사 현장', importance: 'critical', isRevealed: true },
      { time: '3일 전', event: '역사 교사 조사 시작', participants: ['char-history-teacher'], location: '사무실', importance: 'major', isRevealed: true },
      { time: '어제', event: '역사 교사가 이사장에게 진실 언급', participants: ['char-history-teacher', 'char-chairman'], location: '이사장실', importance: 'critical', isRevealed: false },
      { time: '01:30', event: '이사장이 비서에게 전화', participants: ['char-chairman', 'char-secretary'], location: '이사장 자택', importance: 'critical', isRevealed: false },
      { time: '02:00', event: '비서가 역사 교사를 밀어 살해', participants: ['char-secretary', 'char-history-teacher'], location: '공사 현장', importance: 'critical', isRevealed: false }
    ],

    solution: {
      summary: '50년 전 학교 설립자(현 이사장 조부)가 토지 소유자를 살해하고 땅을 강탈했다. 이를 발견한 역사 교사가 이사장 지시로 비서에게 살해당했다.',
      detailedExplanation: [
        '50년 전, 현 이사장의 조부가 학교 부지 소유자를 살해하고 매장했다.',
        '토지 문서를 위조하여 학교를 설립했다.',
        '공사 중 유골이 발견되자 역사 교사가 진실을 조사했다.',
        '교사가 이사장에게 진실을 알린 뒤, 이사장은 비서에게 처리를 지시했다.',
        '비서가 새벽에 교사를 공사 현장에서 밀어 살해했다.'
      ],
      keyEvidence: ['evidence-bones', 'evidence-land-doc', 'evidence-cctv-night', 'evidence-fingerprints', 'evidence-phone-records'],
      howToSolve: [
        '유골 법의학 분석',
        '50년 전 토지 문서 조사',
        '피해자 연구 노트 확인',
        'CCTV 영상 분석',
        '비서 알리바이 검증',
        '통화 기록 확보'
      ],
      commonMistakes: [
        '유골 사건과 교사 사건을 별개로 보는 것',
        '이사장을 직접 범인으로 지목하는 것',
        '50년 전 사건을 무시하는 것'
      ]
    },

    deductionKeywords: {
      who: ['박재훈', '이사장', '김동수', '비서'],
      why: ['은폐', '가문', '토지 강탈'],
      how: ['추락', '살해 지시', '공사 현장'],
      when: ['새벽 2시'],
      where: ['공사 현장', '3층']
    },

    tags: ['역사', '살인', '은폐', '토지강탈', '가문비밀'],
    author: 'DEDUCTIO',
    version: '1.0'
  },

  // ========================================
  // special-008: 타임캡슐의 비밀
  // ========================================
  {
    id: 'special-008',
    title: '타임캡슐의 비밀',
    subtitle: '20년 전 묻힌 진실',
    type: 'special',
    difficulty: 'expert',
    estimatedTime: 35,

    prologue: [
      '청운고 40주년 기념으로 20년 전 묻은 타임캡슐을 개봉했다.',
      '그 안에서 "20년 후에 이것을 보는 사람에게"라는 편지와 함께',
      '충격적인 살인 증거가 발견되었다.'
    ],
    introduction: [
      '동창회장이 급히 연락해왔습니다.',
      '"타임캡슐에서 이상한 게 나왔어요."',
      '"20년 전 사건의 진짜 증거라고 써있어요."'
    ],
    setting: '청운고등학교 운동장',

    crimeTime: '20년 전 + 현재',
    crimeLocation: '체육관 뒤',
    culpritId: 'char-teacher-then',
    victimId: 'char-student-then',
    motive: '불륜 관계 폭로 위협에 대한 입막음',
    motiveDetail: '20년 전, 교사와 학생의 불륜 관계를 다른 학생이 알게 되었다. 교사는 폭로를 막기 위해 그 학생을 살해하고 자살로 위장했다.',
    method: '둔기로 기절시킨 후 목을 매달아 자살로 위장',
    methodDetail: '피해자를 체육관 뒤로 유인해 둔기로 기절시킨 후 목을 매달았다. 모두가 자살로 믿었다.',

    characters: [
      {
        id: 'char-teacher-then',
        name: '이영수 (현재 교감)',
        role: 'culprit',
        age: 50,
        gender: 'male',
        occupation: '현재 교감 (20년 전 교사)',
        personality: '위선적, 권위적',
        appearance: '점잖은 외모',
        background: '20년 전 교사로 재직, 현재는 교감이 되었다.',
        alibi: {
          location: '교무실',
          time: '현재',
          activity: '근무 중',
          witnesses: ['교사들'],
          hasHole: false
        },
        motive: {
          type: 'fear',
          description: '불륜 폭로 방지',
          strength: 3
        },
        relationships: [
          { targetId: 'char-girlfriend-then', type: '불륜', description: '20년 전 학생과 불륜', isSecret: true }
        ],
        secrets: [
          {
            id: 'secret-killer-1',
            content: '20년 전 학생을 살해하고 자살로 위장',
            importance: 'critical',
            revealCondition: '타임캡슐 증거 + DNA'
          }
        ],
        dialogues: [
          {
            topic: '20년 전',
            lines: ['그때 일은... 모두가 슬퍼했죠.', '(동요) 그 학생 자살 말이에요? 안타까운 일이었어요.']
          }
        ],
        nervousTriggers: ['타임캡슐', '자살', '증거', '20년 전', 'DNA']
      },
      {
        id: 'char-student-then',
        name: '김민정 (20년 전 피해자)',
        role: 'victim',
        age: 17,
        gender: 'female',
        occupation: '당시 학생 (피해자)',
        personality: '정의로움',
        appearance: '(사진으로만 확인)',
        background: '20년 전 자살로 처리됨. 실제로는 살해당함.',
        alibi: {
          location: '체육관 뒤',
          time: '20년 전',
          activity: '피해자',
          witnesses: [],
          hasHole: false
        },
        relationships: [],
        secrets: [
          {
            id: 'secret-victim-1',
            content: '교사와 학생의 불륜을 목격하고 신고하려 함',
            importance: 'critical',
            revealCondition: '일기장 발견'
          }
        ],
        dialogues: [],
        nervousTriggers: []
      },
      {
        id: 'char-girlfriend-then',
        name: '박수연 (현재 교사)',
        role: 'witness',
        age: 37,
        gender: 'female',
        occupation: '현재 교사 (20년 전 학생)',
        personality: '죄책감에 시달림',
        appearance: '우울한 표정',
        background: '20년 전 이영수와 불륜. 졸업 후 교사가 되어 돌아옴.',
        alibi: {
          location: '교실',
          time: '현재',
          activity: '수업 중',
          witnesses: ['학생들'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-teacher-then', type: '과거 연인', description: '불륜 관계였음', isSecret: true }
        ],
        secrets: [
          {
            id: 'secret-girlfriend-1',
            content: '민정의 죽음이 자기 때문임을 알고 있다',
            importance: 'major',
            revealCondition: '추궁 시'
          }
        ],
        dialogues: [
          {
            topic: '민정',
            lines: ['(눈물) 민정이... 그 애는 내 친구였어요.', '내 잘못이에요. 다 내 잘못...']
          }
        ],
        nervousTriggers: ['민정', '불륜', '그때']
      },
      {
        id: 'char-witness-then',
        name: '정호진 (현재 동창회장)',
        role: 'witness',
        age: 37,
        gender: 'male',
        occupation: '동창회장 (20년 전 학생)',
        personality: '정의로움',
        appearance: '성공한 사업가 풍',
        background: '20년 전 민정과 같은 반. 타임캡슐을 개봉한 인물.',
        alibi: {
          location: '운동장',
          time: '타임캡슐 개봉 시',
          activity: '개봉식 주관',
          witnesses: ['동창들'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-student-then', type: '친구', description: '민정의 친구였음' }
        ],
        secrets: [],
        dialogues: [
          {
            topic: '발견',
            lines: ['타임캡슐에서 USB가 나왔어요.', '민정이가 넣은 것 같아요. "진실"이라고 써있었어요.']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-capsule-maker',
        name: '최준호 (20년 전 타임캡슐 담당)',
        role: 'witness',
        age: 55,
        gender: 'male',
        occupation: '당시 교사 (현재 퇴직)',
        personality: '회피적',
        appearance: '늙어 보임',
        background: '20년 전 타임캡슐 행사를 담당했다.',
        alibi: {
          location: '자택',
          time: '현재',
          activity: '퇴직 후 생활',
          witnesses: ['가족'],
          hasHole: false
        },
        relationships: [],
        secrets: [
          {
            id: 'secret-capsule-1',
            content: '민정이 몰래 뭔가를 넣는 것을 봤지만 무시했다',
            importance: 'minor',
            revealCondition: '면담 시'
          }
        ],
        dialogues: [
          {
            topic: '타임캡슐',
            lines: ['그때 민정이가 뭔가 넣더라고요.', '나중에 알려줄 비밀이라고 했어요...']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-forensic',
        name: '법의학자',
        role: 'bystander',
        age: 45,
        gender: 'female',
        occupation: '법의학자',
        personality: '과학적',
        appearance: '하얀 가운',
        background: '증거 분석 담당.',
        alibi: {
          location: '연구소',
          time: '현재',
          activity: '분석 중',
          witnesses: [],
          hasHole: false
        },
        relationships: [],
        secrets: [],
        dialogues: [
          {
            topic: '분석',
            lines: ['USB 영상에 범행 장면이 있어요.', '20년이 지났지만 DNA 분석 가능합니다.']
          }
        ],
        nervousTriggers: []
      }
    ],

    evidence: [
      {
        id: 'evidence-usb',
        name: '타임캡슐 USB',
        type: 'digital',
        description: '20년 전 묻힌 USB',
        detailedDescription: '민정이 남긴 영상. 이영수와 수연의 불륜 현장 촬영.',
        location: '타임캡슐',
        foundAt: '운동장',
        linkedCharacters: ['char-teacher-then', 'char-girlfriend-then'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: true,
        analysisResult: '불륜 증거 영상'
      },
      {
        id: 'evidence-letter',
        name: '민정의 편지',
        type: 'document',
        description: '"20년 후에 이것을 보는 사람에게"',
        detailedDescription: '자신이 위험할 수 있다는 내용. 진실을 밝혀달라는 요청.',
        location: '타임캡슐',
        foundAt: 'USB와 함께',
        linkedCharacters: ['char-student-then'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-diary',
        name: '민정의 일기장',
        type: 'document',
        description: '20년 전 일기',
        detailedDescription: '불륜 목격 내용과 신고 계획이 적혀 있다.',
        location: '민정 가족',
        foundAt: '유품',
        linkedCharacters: ['char-student-then', 'char-teacher-then'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-autopsy-old',
        name: '당시 부검 기록',
        type: 'forensic',
        description: '20년 전 부검 기록',
        detailedDescription: '자살로 결론났지만, 후두부에 타박상 기록이 있다.',
        location: '경찰서',
        foundAt: '옛 기록',
        linkedCharacters: ['char-student-then'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: true,
        analysisResult: '기절 후 목 맴 가능성'
      },
      {
        id: 'evidence-dna',
        name: 'DNA 분석',
        type: 'forensic',
        description: 'USB에서 발견된 DNA',
        detailedDescription: '이영수의 DNA가 USB 표면에서 발견됨.',
        location: '연구소',
        foundAt: 'USB 분석',
        linkedCharacters: ['char-teacher-then'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: true,
        analysisResult: '이영수가 USB를 만졌음'
      },
      {
        id: 'evidence-confession',
        name: '박수연 증언',
        type: 'testimony',
        description: '과거 연인의 증언',
        detailedDescription: '이영수가 민정을 만나러 간다고 했던 것을 기억.',
        location: '학교',
        foundAt: '면담',
        linkedCharacters: ['char-girlfriend-then', 'char-teacher-then'],
        isCritical: false,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-timeline-match',
        name: '시간대 분석',
        type: 'document',
        description: '20년 전 그날 기록',
        detailedDescription: '이영수의 부재 시간과 민정 사망 시간 일치.',
        location: '학교 기록',
        foundAt: '당시 출석부',
        linkedCharacters: ['char-teacher-then'],
        isCritical: false,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-motive-doc',
        name: '협박 편지 초안',
        type: 'document',
        description: '민정이 쓴 협박 편지 초안',
        detailedDescription: '불륜을 신고하겠다는 내용. 이영수에게 보내려 했다.',
        location: '민정 가족',
        foundAt: '유품 중',
        linkedCharacters: ['char-student-then', 'char-teacher-then'],
        isCritical: false,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      }
    ],

    locations: [
      {
        id: 'loc-playground',
        name: '운동장 (타임캡슐 매장지)',
        description: '타임캡슐이 묻혀 있던 곳',
        atmosphere: '추억과 긴장',
        objects: [
          { id: 'obj-capsule', name: '타임캡슐', description: '20년 전 묻힌 캡슐', examinationResult: 'USB와 편지 발견', containsEvidence: 'evidence-usb' }
        ],
        connectedTo: ['loc-gym-back']
      },
      {
        id: 'loc-gym-back',
        name: '체육관 뒤 (범행 현장)',
        description: '20년 전 민정이 발견된 곳',
        atmosphere: '음침함',
        objects: [
          { id: 'obj-tree', name: '나무', description: '민정이 매달렸던 나무', examinationResult: '20년 전 사건 현장' }
        ],
        connectedTo: ['loc-playground', 'loc-staff-room']
      },
      {
        id: 'loc-staff-room',
        name: '교무실',
        description: '현재 교감이 근무하는 곳',
        atmosphere: '권위적',
        objects: [
          { id: 'obj-desk', name: '교감 책상', description: '이영수의 책상', examinationResult: '20년 전 사진들' }
        ],
        connectedTo: ['loc-gym-back']
      },
      {
        id: 'loc-victim-family',
        name: '민정 가족 집',
        description: '피해자 가족의 집',
        atmosphere: '슬픔',
        objects: [
          { id: 'obj-diary', name: '일기장', description: '민정의 유품', examinationResult: '불륜 목격 기록', containsEvidence: 'evidence-diary' },
          { id: 'obj-letter-draft', name: '편지 초안', description: '쓰다 만 편지', examinationResult: '협박 내용', containsEvidence: 'evidence-motive-doc' }
        ],
        connectedTo: []
      },
      {
        id: 'loc-police-archive',
        name: '경찰서 기록보관소',
        description: '옛 사건 기록',
        atmosphere: '공식적',
        objects: [
          { id: 'obj-case-file', name: '사건 파일', description: '20년 전 자살 사건', examinationResult: '부검 기록 발견', containsEvidence: 'evidence-autopsy-old' }
        ],
        connectedTo: []
      }
    ],

    timeline: [
      { time: '20년 전 - 3개월 전', event: '민정이 이영수와 수연의 불륜 목격', participants: ['char-student-then'], location: '학교', importance: 'critical', isRevealed: false },
      { time: '20년 전 - 1주일 전', event: '민정이 USB에 증거 저장 및 타임캡슐에 보관', participants: ['char-student-then'], location: '운동장', importance: 'critical', isRevealed: false },
      { time: '20년 전 - 당일', event: '민정이 이영수에게 폭로 예고', participants: ['char-student-then', 'char-teacher-then'], location: '학교', importance: 'critical', isRevealed: false },
      { time: '20년 전 - 당일 저녁', event: '이영수가 민정을 유인해 살해', participants: ['char-teacher-then', 'char-student-then'], location: '체육관 뒤', importance: 'critical', isRevealed: false },
      { time: '20년 전 - 다음날', event: '민정 시신 발견, 자살로 처리', participants: ['char-student-then'], location: '체육관 뒤', importance: 'major', isRevealed: true },
      { time: '현재', event: '타임캡슐 개봉, 증거 발견', participants: ['char-witness-then'], location: '운동장', importance: 'critical', isRevealed: true },
      { time: '현재', event: '수사 시작', participants: ['char-forensic'], location: '학교', importance: 'major', isRevealed: true }
    ],

    solution: {
      summary: '20년 전 교사 이영수는 불륜을 목격한 학생 민정을 살해하고 자살로 위장했다. 민정은 죽기 전 증거를 타임캡슐에 숨겨두었다.',
      detailedExplanation: [
        '이영수는 당시 학생 박수연과 불륜 관계였다.',
        '같은 반 민정이 이를 목격하고 증거를 확보했다.',
        '민정은 만일을 대비해 증거를 타임캡슐에 숨겼다.',
        '이영수는 폭로를 막기 위해 민정을 살해하고 자살로 위장했다.',
        '20년 후 타임캡슐이 열리며 진실이 밝혀졌다.'
      ],
      keyEvidence: ['evidence-usb', 'evidence-letter', 'evidence-diary', 'evidence-autopsy-old', 'evidence-dna'],
      howToSolve: [
        '타임캡슐 USB 영상 분석',
        '민정의 편지와 일기장 확인',
        '20년 전 부검 기록 재검토',
        'DNA 분석으로 이영수 연결',
        '박수연 증언 확보'
      ],
      commonMistakes: [
        '자살로 믿는 것',
        '박수연을 범인으로 의심하는 것',
        '타임캡슐 증거를 무시하는 것'
      ]
    },

    deductionKeywords: {
      who: ['이영수', '교감', '당시 교사'],
      why: ['불륜', '입막음', '폭로 방지'],
      how: ['둔기', '목맴', '자살 위장'],
      when: ['20년 전'],
      where: ['체육관 뒤']
    },

    tags: ['타임캡슐', '콜드케이스', '불륜', '살인', '자살위장'],
    author: 'DEDUCTIO',
    version: '1.0'
  },

  // ========================================
  // special-009: 학교 전설의 진실
  // ========================================
  {
    id: 'special-009',
    title: '학교 전설의 진실',
    subtitle: '유령 전설 뒤에 숨겨진 30년 전 사건',
    type: 'special',
    difficulty: 'expert',
    estimatedTime: 38,

    prologue: [
      '청운고에는 "피아노 유령" 전설이 있다.',
      '30년 전 음악실에서 사라진 여학생의 피아노 소리가 밤마다 들린다고.',
      '그런데 최근 음악실 공사 중 벽 안에서 유골이 발견되었다.'
    ],
    introduction: [
      '학교에서 긴급 연락이 왔습니다.',
      '"음악실 벽에서 유골이 나왔어요!"',
      '"30년 전 실종된 그 여학생인 것 같아요."'
    ],
    setting: '청운고등학교 음악실',

    crimeTime: '30년 전',
    crimeLocation: '음악실',
    culpritId: 'char-old-principal',
    victimId: 'char-missing-student',
    motive: '성범죄 은폐',
    motiveDetail: '30년 전 당시 교장이 음악 영재 학생을 성추행했다. 학생이 저항하다 사고로 사망하자 시신을 벽 안에 숨겼다.',
    method: '우발적 사고 후 시신 은닉',
    methodDetail: '성추행 시도 중 학생이 저항하다 피아노에 머리를 부딪쳐 사망. 교장은 벽을 뜯어 시신을 숨기고 실종으로 처리했다.',

    characters: [
      {
        id: 'char-old-principal',
        name: '정태수',
        role: 'culprit',
        age: 75,
        gender: 'male',
        occupation: '전 교장 (30년 전)',
        personality: '위선적, 교활함',
        appearance: '늙은 노인, 휠체어',
        background: '30년간 비밀을 숨기고 살았다. 현재 요양원.',
        alibi: {
          location: '요양원',
          time: '현재',
          activity: '요양 중',
          witnesses: ['간호사'],
          hasHole: false
        },
        motive: {
          type: 'fear',
          description: '범죄 은폐',
          strength: 3
        },
        relationships: [
          { targetId: 'char-missing-student', type: '가해자', description: '성범죄 시도', isSecret: true }
        ],
        secrets: [
          {
            id: 'secret-principal-1',
            content: '30년 전 학생을 사고로 죽이고 벽에 숨겼다',
            importance: 'critical',
            revealCondition: '유골 발견 + DNA'
          }
        ],
        dialogues: [
          {
            topic: '30년 전',
            lines: ['(떨림) 그 학생... 가출한 거예요.', '(극도로 동요) 유골이요? 그건... 그건...']
          }
        ],
        nervousTriggers: ['유골', '음악실', '그 학생', '벽']
      },
      {
        id: 'char-missing-student',
        name: '윤미라',
        role: 'victim',
        age: 17,
        gender: 'female',
        occupation: '당시 음악 영재 (피해자)',
        personality: '순수함, 재능 있음',
        appearance: '(사진으로만 확인)',
        background: '30년 전 "가출"로 처리됨. 실제로는 음악실에서 사망.',
        alibi: {
          location: '음악실',
          time: '30년 전',
          activity: '피해자',
          witnesses: [],
          hasHole: false
        },
        relationships: [],
        secrets: [],
        dialogues: [],
        nervousTriggers: []
      },
      {
        id: 'char-old-janitor',
        name: '김복순',
        role: 'witness',
        age: 80,
        gender: 'female',
        occupation: '전 관리인',
        personality: '죄책감',
        appearance: '노파',
        background: '30년 전 이상한 소리를 들었지만 무시했다.',
        alibi: {
          location: '자택',
          time: '현재',
          activity: '은퇴 생활',
          witnesses: ['가족'],
          hasHole: false
        },
        relationships: [],
        secrets: [
          {
            id: 'secret-janitor-1',
            content: '그날 밤 교장이 벽돌과 시멘트를 가져가는 것을 봤다',
            importance: 'critical',
            revealCondition: '면담 시'
          }
        ],
        dialogues: [
          {
            topic: '그날 밤',
            lines: ['그날 밤... 이상한 소리가 났어요.', '교장님이 벽돌을 가져가더라고요. 왜 그런지...']
          }
        ],
        nervousTriggers: ['그날 밤', '교장', '벽']
      },
      {
        id: 'char-victim-mother',
        name: '윤정희',
        role: 'witness',
        age: 68,
        gender: 'female',
        occupation: '피해자 어머니',
        personality: '슬픔, 집착',
        appearance: '늙고 지친 모습',
        background: '30년간 딸을 찾았다.',
        alibi: {
          location: '자택',
          time: '현재',
          activity: '생활',
          witnesses: [],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-missing-student', type: '어머니', description: '30년간 딸을 찾음' }
        ],
        secrets: [],
        dialogues: [
          {
            topic: '딸',
            lines: ['미라는 가출할 아이가 아니에요.', '(울음) 30년을 기다렸어요...']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-current-music-teacher',
        name: '한소영',
        role: 'witness',
        age: 35,
        gender: 'female',
        occupation: '현재 음악 교사',
        personality: '호기심',
        appearance: '밝은 인상',
        background: '유령 전설에 관심을 가지고 조사했다.',
        alibi: {
          location: '음악실',
          time: '발견 시',
          activity: '공사 감독',
          witnesses: ['작업자들'],
          hasHole: false
        },
        relationships: [],
        secrets: [],
        dialogues: [
          {
            topic: '발견',
            lines: ['벽을 뜯다가... 유골이 나왔어요.', '유령 전설이 진짜였다니...']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-forensic',
        name: '법의학자',
        role: 'bystander',
        age: 45,
        gender: 'male',
        occupation: '법의학자',
        personality: '분석적',
        appearance: '하얀 가운',
        background: '유골 분석 담당.',
        alibi: {
          location: '연구소',
          time: '현재',
          activity: '분석 중',
          witnesses: [],
          hasHole: false
        },
        relationships: [],
        secrets: [],
        dialogues: [
          {
            topic: '유골',
            lines: ['사망 시점은 약 30년 전입니다.', '두개골 측면에 강한 충격 흔적이 있어요.']
          }
        ],
        nervousTriggers: []
      }
    ],

    evidence: [
      {
        id: 'evidence-skeleton',
        name: '벽 안의 유골',
        type: 'forensic',
        description: '음악실 벽에서 발견된 유골',
        detailedDescription: '30년 전 사망 추정. 두개골에 충격 흔적.',
        location: '음악실',
        foundAt: '벽 안',
        linkedCharacters: ['char-missing-student'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: true,
        analysisResult: '윤미라로 신원 확인'
      },
      {
        id: 'evidence-dna-match',
        name: 'DNA 대조 결과',
        type: 'forensic',
        description: '유골과 어머니 DNA 대조',
        detailedDescription: '윤정희와 친자 관계 확인.',
        location: '연구소',
        foundAt: 'DNA 분석',
        linkedCharacters: ['char-missing-student', 'char-victim-mother'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: true,
        analysisResult: '피해자 신원 확정'
      },
      {
        id: 'evidence-janitor-testimony',
        name: '관리인 증언',
        type: 'testimony',
        description: '30년 전 목격 증언',
        detailedDescription: '교장이 벽돌과 시멘트를 가져갔다.',
        location: '관리인 자택',
        foundAt: '면담',
        linkedCharacters: ['char-old-janitor', 'char-old-principal'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-wall-analysis',
        name: '벽 분석',
        type: 'forensic',
        description: '음악실 벽 재료 분석',
        detailedDescription: '30년 전 한 부분만 새로 시공된 흔적.',
        location: '음악실',
        foundAt: '벽',
        linkedCharacters: ['char-old-principal'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: true,
        analysisResult: '범행 은폐 흔적'
      },
      {
        id: 'evidence-missing-report',
        name: '30년 전 실종 신고',
        type: 'document',
        description: '윤미라 실종 신고 기록',
        detailedDescription: '마지막 목격 장소: 음악실. 교장이 "가출"이라고 주장.',
        location: '경찰서',
        foundAt: '기록 보관소',
        linkedCharacters: ['char-missing-student', 'char-old-principal'],
        isCritical: false,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-piano-blood',
        name: '피아노 혈흔',
        type: 'forensic',
        description: '오래된 피아노에서 발견된 혈흔',
        detailedDescription: '피아노 모서리에서 30년 된 혈흔 발견.',
        location: '음악실',
        foundAt: '피아노',
        linkedCharacters: ['char-missing-student'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: true,
        analysisResult: '윤미라 DNA 일치'
      },
      {
        id: 'evidence-principal-confession',
        name: '교장 자백',
        type: 'testimony',
        description: '정태수의 자백',
        detailedDescription: '증거 제시 후 모든 것을 자백.',
        location: '요양원',
        foundAt: '면담',
        linkedCharacters: ['char-old-principal'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      },
      {
        id: 'evidence-diary',
        name: '미라의 일기',
        type: 'document',
        description: '피해자의 일기장',
        detailedDescription: '교장의 부적절한 행동 언급.',
        location: '피해자 가족',
        foundAt: '유품',
        linkedCharacters: ['char-missing-student', 'char-old-principal'],
        isCritical: false,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      }
    ],

    locations: [
      {
        id: 'loc-music-room',
        name: '음악실',
        description: '유령 전설의 무대',
        atmosphere: '으스스함',
        objects: [
          { id: 'obj-wall', name: '벽', description: '유골 발견 장소', examinationResult: '30년 전 시공 흔적', containsEvidence: 'evidence-skeleton' },
          { id: 'obj-piano', name: '피아노', description: '30년 된 그랜드 피아노', examinationResult: '모서리에 혈흔', containsEvidence: 'evidence-piano-blood' }
        ],
        connectedTo: ['loc-principal-office']
      },
      {
        id: 'loc-principal-office',
        name: '교장실',
        description: '당시 교장의 사무실',
        atmosphere: '권위적',
        objects: [
          { id: 'obj-old-records', name: '옛 기록', description: '30년 전 서류', examinationResult: '실종 처리 기록' }
        ],
        connectedTo: ['loc-music-room']
      },
      {
        id: 'loc-nursing-home',
        name: '요양원',
        description: '전 교장이 있는 곳',
        atmosphere: '쇠락함',
        objects: [
          { id: 'obj-principal-room', name: '정태수 병실', description: '전 교장의 방', examinationResult: '자백 가능', containsEvidence: 'evidence-principal-confession' }
        ],
        connectedTo: []
      },
      {
        id: 'loc-victim-home',
        name: '피해자 가족 집',
        description: '30년간 딸을 기다린 곳',
        atmosphere: '슬픔',
        objects: [
          { id: 'obj-diary', name: '일기장', description: '미라의 유품', examinationResult: '교장 행동 언급', containsEvidence: 'evidence-diary' }
        ],
        connectedTo: []
      },
      {
        id: 'loc-police-archive',
        name: '경찰 기록보관소',
        description: '30년 전 사건 기록',
        atmosphere: '공식적',
        objects: [
          { id: 'obj-case-file', name: '실종 사건 파일', description: '윤미라 실종', examinationResult: '마지막 목격: 음악실', containsEvidence: 'evidence-missing-report' }
        ],
        connectedTo: []
      }
    ],

    timeline: [
      { time: '30년 전', event: '윤미라 음악 영재로 교장에게 주목받음', participants: ['char-missing-student', 'char-old-principal'], location: '학교', importance: 'major', isRevealed: false },
      { time: '30년 전 사건 당일', event: '교장이 미라를 음악실로 불러냄', participants: ['char-old-principal', 'char-missing-student'], location: '음악실', importance: 'critical', isRevealed: false },
      { time: '30년 전 사건 당일', event: '성추행 시도 중 미라 저항, 피아노에 부딪쳐 사망', participants: ['char-old-principal', 'char-missing-student'], location: '음악실', importance: 'critical', isRevealed: false },
      { time: '30년 전 그날 밤', event: '교장이 벽을 뜯고 시신 은닉', participants: ['char-old-principal'], location: '음악실', importance: 'critical', isRevealed: false },
      { time: '30년 전 다음날', event: '미라 실종 신고, 교장이 "가출" 주장', participants: ['char-old-principal', 'char-victim-mother'], location: '학교', importance: 'major', isRevealed: true },
      { time: '현재', event: '음악실 공사 중 유골 발견', participants: ['char-current-music-teacher'], location: '음악실', importance: 'critical', isRevealed: true },
      { time: '현재', event: '수사 시작', participants: ['char-forensic'], location: '학교', importance: 'major', isRevealed: true }
    ],

    solution: {
      summary: '30년 전 교장 정태수가 음악 영재 윤미라를 성추행하려다 저항을 받아 우발적으로 사망케 하고 시신을 벽 안에 숨겼다.',
      detailedExplanation: [
        '정태수는 음악 영재 윤미라에게 집착했다.',
        '어느 날 밤 미라를 음악실로 불러 성추행을 시도했다.',
        '미라가 강하게 저항하다 피아노에 부딪쳐 사망했다.',
        '교장은 벽을 뜯어 시신을 숨기고 "가출"로 처리했다.',
        '30년간 유령 전설로만 남았다가 공사 중 유골이 발견되었다.'
      ],
      keyEvidence: ['evidence-skeleton', 'evidence-piano-blood', 'evidence-janitor-testimony', 'evidence-wall-analysis', 'evidence-dna-match'],
      howToSolve: [
        '유골 신원 확인 (DNA)',
        '벽 시공 시기 분석',
        '피아노 혈흔 검사',
        '관리인 증언 확보',
        '전 교장 면담 및 자백 유도'
      ],
      commonMistakes: [
        '유령 전설로만 생각하는 것',
        '단순 사고사로 추정하는 것',
        '성범죄 동기를 놓치는 것'
      ]
    },

    deductionKeywords: {
      who: ['정태수', '전 교장'],
      why: ['성추행', '은폐', '입막음'],
      how: ['우발적 사고', '벽에 은닉'],
      when: ['30년 전'],
      where: ['음악실', '벽 안']
    },

    tags: ['유령전설', '콜드케이스', '성범죄', '시신은닉', '음악실'],
    author: 'DEDUCTIO',
    version: '1.0'
  },

  // ========================================
  // special-010: 연쇄 사건의 진실 (최종)
  // ========================================
  {
    id: 'special-010',
    title: '연쇄 사건의 진실',
    subtitle: '모든 사건의 배후 - 마스터마인드',
    type: 'special',
    difficulty: 'expert',
    estimatedTime: 45,

    prologue: [
      '청운고에서 1년간 발생한 수많은 사건들.',
      '절도, 협박, 실종, 기물파손... 모두 무관해 보였다.',
      '하지만 누군가가 이 모든 것을 조종하고 있었다면?'
    ],
    introduction: [
      '형사가 긴급히 연락해왔습니다.',
      '"청운고 사건들 분석 결과, 공통점을 발견했습니다."',
      '"누군가 모든 사건을 계획적으로 일으켰어요."'
    ],
    setting: '청운고등학교 전체',

    crimeTime: '1년간',
    crimeLocation: '학교 전체',
    culpritId: 'char-mastermind',
    victimId: 'char-all-victims',
    motive: '학교 사유화를 위한 조직적 음모',
    motiveDetail: '재벌 2세가 학교 부지를 사들여 개발하려 했다. 학교 평판을 무너뜨리기 위해 1년간 사건들을 조종했다.',
    method: '각종 범죄자들을 매수하고 조종',
    methodDetail: '절도범, 협박범, 방화범 등을 돈과 협박으로 조종해 학교에서 사건을 일으키게 했다.',

    characters: [
      {
        id: 'char-mastermind',
        name: '강준혁',
        role: 'culprit',
        age: 28,
        gender: 'male',
        occupation: '재벌 2세 / 부동산 개발업자',
        personality: '교활하고 야심적',
        appearance: '고급 정장, 세련됨',
        background: '대기업 회장 아들. 학교 부지를 사들여 고급 아파트를 짓으려 함.',
        alibi: {
          location: '회사',
          time: '각 사건 시',
          activity: '업무 중',
          witnesses: ['비서'],
          hasHole: true,
          holeDetail: '모든 사건과 금전 연결'
        },
        motive: {
          type: 'greed',
          description: '학교 부지 강제 매입을 위한 평판 하락 유도',
          strength: 3
        },
        relationships: [
          { targetId: 'char-fixer', type: '고용', description: '범죄 실행 담당자' }
        ],
        secrets: [
          {
            id: 'secret-mastermind-1',
            content: '1년간 모든 학교 사건의 배후',
            importance: 'critical',
            revealCondition: '금전 추적 + 통화 기록'
          }
        ],
        dialogues: [
          {
            topic: '학교',
            lines: ['그 학교요? 그냥 투자 대상일 뿐입니다.', '(비웃음) 사건들이요? 저와 무슨 상관이죠?']
          }
        ],
        nervousTriggers: ['송금 기록', '해결사', '통화 기록', '부지 매입']
      },
      {
        id: 'char-fixer',
        name: '박창수',
        role: 'suspect',
        age: 45,
        gender: 'male',
        occupation: '해결사 / 브로커',
        personality: '냉혹하고 실용적',
        appearance: '검은 옷, 무표정',
        background: '강준혁이 고용한 해결사. 범죄자들을 모집하고 관리.',
        alibi: {
          location: '불명',
          time: '각 사건 시',
          activity: '불명',
          witnesses: [],
          hasHole: true,
          holeDetail: '각 범인들과 접촉'
        },
        motive: {
          type: 'greed',
          description: '고액 보수',
          strength: 3
        },
        relationships: [
          { targetId: 'char-mastermind', type: '고용인', description: '범죄 조율' }
        ],
        secrets: [
          {
            id: 'secret-fixer-1',
            content: '모든 범인들을 모집하고 지시함',
            importance: 'critical',
            revealCondition: '범인들 증언 + 통화 기록'
          }
        ],
        dialogues: [
          {
            topic: '사건들',
            lines: ['(침묵) 알 게 뭐요.', '(협박 시) 거래하죠. 내 위에 있는 사람 정보를 드릴게요.']
          }
        ],
        nervousTriggers: ['녹음', '범인들', '증거']
      },
      {
        id: 'char-all-victims',
        name: '청운고 구성원 전체',
        role: 'victim',
        age: 0,
        gender: 'male',
        occupation: '학교 전체',
        personality: '다양함',
        appearance: '다양함',
        background: '1년간 수많은 피해를 입음.',
        alibi: {
          location: '학교',
          time: '1년간',
          activity: '피해',
          witnesses: [],
          hasHole: false
        },
        relationships: [],
        secrets: [],
        dialogues: [],
        nervousTriggers: []
      },
      {
        id: 'char-principal-current',
        name: '이정민',
        role: 'witness',
        age: 55,
        gender: 'male',
        occupation: '현 교장',
        personality: '고민 많음',
        appearance: '지친 표정',
        background: '1년간의 사건들로 고통받고 있음.',
        alibi: {
          location: '학교',
          time: '현재',
          activity: '근무 중',
          witnesses: ['교사들'],
          hasHole: false
        },
        relationships: [],
        secrets: [
          {
            id: 'secret-principal-1',
            content: '재벌 측에서 학교 매각 압력을 받고 있음',
            importance: 'major',
            revealCondition: '면담 시'
          }
        ],
        dialogues: [
          {
            topic: '사건들',
            lines: ['1년 동안 정말 힘들었습니다.', '누군가가... 의도적으로 학교를 망가뜨리는 것 같아요.']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-detective',
        name: '김형석',
        role: 'witness',
        age: 48,
        gender: 'male',
        occupation: '형사',
        personality: '끈기 있음',
        appearance: '형사 풍모',
        background: '청운고 사건들의 연관성을 처음 발견.',
        alibi: {
          location: '경찰서',
          time: '현재',
          activity: '수사 중',
          witnesses: ['동료'],
          hasHole: false
        },
        relationships: [],
        secrets: [],
        dialogues: [
          {
            topic: '분석',
            lines: ['모든 사건에 공통점이 있어요.', '같은 번호로 연락받은 흔적이 있습니다.']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-ex-criminal',
        name: '이동민',
        role: 'witness',
        age: 25,
        gender: 'male',
        occupation: '과거 절도범 (체포됨)',
        personality: '두려움',
        appearance: '수감자 복장',
        background: '학교 절도로 체포됨. 누군가의 지시였다고 증언.',
        alibi: {
          location: '구치소',
          time: '현재',
          activity: '수감 중',
          witnesses: [],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-fixer', type: '피고용', description: '범행 지시받음' }
        ],
        secrets: [
          {
            id: 'secret-ex-criminal-1',
            content: '해결사한테 돈 받고 절도했다',
            importance: 'critical',
            revealCondition: '거래 제안 시'
          }
        ],
        dialogues: [
          {
            topic: '배후',
            lines: ['저 혼자 한 게 아니에요!', '돈 받고 했어요. 그 사람... 검은 옷 입은 아저씨가...']
          }
        ],
        nervousTriggers: []
      }
    ],

    evidence: [
      {
        id: 'evidence-pattern-analysis',
        name: '사건 패턴 분석',
        type: 'document',
        description: '1년간 사건들의 공통점',
        detailedDescription: '모든 사건이 학교 평판을 떨어뜨리는 방향으로 진행됨.',
        location: '경찰서',
        foundAt: '분석 보고서',
        linkedCharacters: ['char-mastermind'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: true,
        analysisResult: '조직적 범행 패턴'
      },
      {
        id: 'evidence-phone-trace',
        name: '공통 연락처 추적',
        type: 'digital',
        description: '모든 범인들이 같은 번호와 연락',
        detailedDescription: '대포폰이지만 위치 추적 가능.',
        location: '통신사',
        foundAt: '통화 기록',
        linkedCharacters: ['char-fixer'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: true,
        analysisResult: '해결사 연결'
      },
      {
        id: 'evidence-money-trail',
        name: '자금 추적',
        type: 'digital',
        description: '범인들에게 입금된 돈의 출처',
        detailedDescription: '해결사 계좌 → 재벌 페이퍼 컴퍼니.',
        location: '금융감독원',
        foundAt: '계좌 추적',
        linkedCharacters: ['char-mastermind', 'char-fixer'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: true,
        analysisResult: '강준혁 연결'
      },
      {
        id: 'evidence-criminal-testimony',
        name: '범인 증언',
        type: 'testimony',
        description: '체포된 범인의 진술',
        detailedDescription: '검은 옷 남자에게 돈 받고 범행 지시.',
        location: '구치소',
        foundAt: '면담',
        linkedCharacters: ['char-ex-criminal', 'char-fixer'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-land-purchase',
        name: '부지 매입 시도 기록',
        type: 'document',
        description: '강준혁의 학교 부지 매입 시도',
        detailedDescription: '3번 거절당한 기록. 매입 실패 후 사건 시작.',
        location: '학교 행정실',
        foundAt: '문서',
        linkedCharacters: ['char-mastermind'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-meeting-record',
        name: '회의 녹음',
        type: 'digital',
        description: '마스터마인드와 해결사 회의',
        detailedDescription: '학교를 망가뜨려 매입하자는 내용.',
        location: '해결사 차량',
        foundAt: '블랙박스',
        linkedCharacters: ['char-mastermind', 'char-fixer'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      },
      {
        id: 'evidence-principal-pressure',
        name: '매각 압력 증거',
        type: 'document',
        description: '교장에게 보낸 협박 편지',
        detailedDescription: '학교를 팔지 않으면 더 큰 사건을 일으키겠다.',
        location: '교장실',
        foundAt: '금고',
        linkedCharacters: ['char-mastermind', 'char-principal-current'],
        isCritical: false,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-fixer-confession',
        name: '해결사 자백',
        type: 'testimony',
        description: '박창수의 자백',
        detailedDescription: '강준혁의 지시로 모든 것을 조율했다고 진술.',
        location: '경찰서',
        foundAt: '심문',
        linkedCharacters: ['char-fixer', 'char-mastermind'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      },
      {
        id: 'evidence-timeline-correlation',
        name: '시간대 상관관계',
        type: 'document',
        description: '사건 발생과 매입 시도 시점',
        detailedDescription: '매입 거절 직후마다 사건 발생.',
        location: '경찰서',
        foundAt: '분석',
        linkedCharacters: ['char-mastermind'],
        isCritical: false,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: true,
        analysisResult: '인과관계 확인'
      },
      {
        id: 'evidence-company-link',
        name: '페이퍼 컴퍼니 연결',
        type: 'document',
        description: '자금 세탁용 회사',
        detailedDescription: '강준혁 소유 페이퍼 컴퍼니 → 해결사 계좌.',
        location: '국세청',
        foundAt: '기업 조회',
        linkedCharacters: ['char-mastermind'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: true,
        analysisResult: '자금 연결 확정'
      }
    ],

    locations: [
      {
        id: 'loc-police-hq',
        name: '경찰서',
        description: '수사 본부',
        atmosphere: '긴장감',
        objects: [
          { id: 'obj-analysis', name: '분석 보고서', description: '사건 패턴 분석', examinationResult: '조직적 범행', containsEvidence: 'evidence-pattern-analysis' }
        ],
        connectedTo: ['loc-prison', 'loc-school']
      },
      {
        id: 'loc-prison',
        name: '구치소',
        description: '체포된 범인 수감',
        atmosphere: '삭막함',
        objects: [
          { id: 'obj-criminal-cell', name: '수감자 면담실', description: '이동민 면담', examinationResult: '해결사 정보', containsEvidence: 'evidence-criminal-testimony' }
        ],
        connectedTo: ['loc-police-hq']
      },
      {
        id: 'loc-school',
        name: '청운고등학교',
        description: '모든 사건의 무대',
        atmosphere: '피폐함',
        objects: [
          { id: 'obj-principal-safe', name: '교장 금고', description: '협박 편지', examinationResult: '매각 압력', containsEvidence: 'evidence-principal-pressure' }
        ],
        connectedTo: ['loc-police-hq', 'loc-admin']
      },
      {
        id: 'loc-admin',
        name: '학교 행정실',
        description: '행정 기록 보관',
        atmosphere: '사무적',
        objects: [
          { id: 'obj-purchase-record', name: '매입 시도 기록', description: '거절된 제안들', examinationResult: '매입 실패 후 사건', containsEvidence: 'evidence-land-purchase' }
        ],
        connectedTo: ['loc-school']
      },
      {
        id: 'loc-fixer-hideout',
        name: '해결사 아지트',
        description: '박창수의 근거지',
        atmosphere: '어둡고 위험',
        objects: [
          { id: 'obj-car', name: '차량', description: '블랙박스 장착', examinationResult: '회의 녹음', containsEvidence: 'evidence-meeting-record' }
        ],
        connectedTo: []
      },
      {
        id: 'loc-company-office',
        name: '강준혁 회사',
        description: '재벌 본사',
        atmosphere: '화려함',
        objects: [
          { id: 'obj-office', name: '대표실', description: '증거 없음', examinationResult: '페이퍼 컴퍼니 흔적' }
        ],
        connectedTo: []
      }
    ],

    timeline: [
      { time: '1년 전 - 3개월 전', event: '강준혁 학교 부지 매입 3차례 거절', participants: ['char-mastermind', 'char-principal-current'], location: '학교', importance: 'critical', isRevealed: false },
      { time: '1년 전', event: '강준혁이 해결사 고용', participants: ['char-mastermind', 'char-fixer'], location: '불명', importance: 'critical', isRevealed: false },
      { time: '11개월 전', event: '첫 번째 사건 - 기물파손', participants: ['char-fixer'], location: '학교', importance: 'major', isRevealed: true },
      { time: '8개월 전', event: '두 번째 사건 - 연쇄 절도', participants: ['char-ex-criminal', 'char-fixer'], location: '학교', importance: 'major', isRevealed: true },
      { time: '5개월 전', event: '세 번째 사건 - 협박', participants: ['char-fixer'], location: '학교', importance: 'major', isRevealed: true },
      { time: '2개월 전', event: '네 번째 사건 - 실종(위장)', participants: ['char-fixer'], location: '학교', importance: 'major', isRevealed: true },
      { time: '1개월 전', event: '이동민 체포, 배후 존재 언급', participants: ['char-ex-criminal', 'char-detective'], location: '경찰서', importance: 'critical', isRevealed: true },
      { time: '현재', event: '형사가 패턴 발견, 전면 수사', participants: ['char-detective'], location: '경찰서', importance: 'critical', isRevealed: true },
      { time: '현재', event: '해결사 체포 및 자백', participants: ['char-fixer', 'char-detective'], location: '경찰서', importance: 'critical', isRevealed: false },
      { time: '현재', event: '마스터마인드 검거', participants: ['char-mastermind', 'char-detective'], location: '회사', importance: 'critical', isRevealed: false }
    ],

    solution: {
      summary: '재벌 2세 강준혁이 학교 부지를 사들이기 위해 해결사를 고용해 1년간 각종 사건을 조종하며 학교 평판을 떨어뜨렸다.',
      detailedExplanation: [
        '강준혁은 청운고 부지에 고급 아파트를 짓고 싶었다.',
        '매입이 3번 거절되자, 학교를 망가뜨려 강제 매각을 유도하기로 했다.',
        '해결사 박창수를 고용해 각종 범죄자들을 모집했다.',
        '1년간 절도, 협박, 기물파손, 실종 등 사건을 조종했다.',
        '체포된 범인의 증언으로 해결사가 검거되고, 자금 추적으로 마스터마인드가 밝혀졌다.'
      ],
      keyEvidence: ['evidence-pattern-analysis', 'evidence-money-trail', 'evidence-criminal-testimony', 'evidence-meeting-record', 'evidence-fixer-confession'],
      howToSolve: [
        '사건 패턴 분석 (모두 평판 하락 유도)',
        '범인들의 공통 연락처 추적',
        '체포된 범인 증언 확보',
        '자금 흐름 추적',
        '해결사 체포 및 자백',
        '마스터마인드 특정'
      ],
      commonMistakes: [
        '개별 사건으로만 보는 것',
        '학교 내부인을 의심하는 것',
        '자금 추적을 하지 않는 것'
      ]
    },

    deductionKeywords: {
      who: ['강준혁', '재벌', '마스터마인드', '박창수', '해결사'],
      why: ['부지 매입', '개발', '강제 매각', '탐욕'],
      how: ['매수', '조종', '해결사', '범죄 사주'],
      when: ['1년간', '매입 거절 후'],
      where: ['학교 전체', '외부에서 조종']
    },

    tags: ['마스터마인드', '조직범죄', '부동산', '음모', '연쇄사건', '최종시나리오'],
    author: 'DEDUCTIO',
    version: '1.0'
  }
];
