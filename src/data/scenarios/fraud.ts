// ========================================
// 사기 시나리오 15개 - 수작업 제작
// ========================================

import { Scenario } from './types';

export const fraudScenarios: Scenario[] = [
  {
    id: 'fraud-001',
    title: '위조된 성적표',
    subtitle: '전교 1등의 성적이 조작되었다?',
    type: 'fraud',
    difficulty: 'medium',
    estimatedTime: 20,

    prologue: [
      '청운고 전교 1등 오세훈.',
      '그의 완벽한 성적표에 의혹이 제기되었다.',
      '성적 시스템에 접근한 흔적, 과연 진실은?'
    ],
    introduction: [
      '교무부장이 심각한 표정으로 찾아왔습니다.',
      '"성적 관리 시스템에 이상한 접속 기록이 발견됐어요."',
      '"그리고... 오세훈 학생의 성적이 변조된 것 같습니다."'
    ],
    setting: '청운고등학교 교무실 및 컴퓨터실',

    crimeTime: '23:00',
    crimeLocation: '교무실',
    culpritId: 'char-hacker',
    victimId: undefined,
    motive: '의대 진학을 위한 성적 조작',
    motiveDetail: '오세훈은 의대 진학이 목표였으나 수학 성적이 부족했다. 컴퓨터에 능통한 그는 야간에 교무실에 잠입해 성적을 조작했다.',
    method: '교사의 로그인 정보를 훔쳐 성적 시스템에 접근',
    methodDetail: '오세훈은 담임교사의 컴퓨터에 키로거를 설치해 비밀번호를 알아냈다. 야간 자습 후 교무실에 잠입해 수학 점수를 85점에서 98점으로 변조했다.',

    characters: [
      {
        id: 'char-hacker',
        name: '오세훈',
        role: 'culprit',
        age: 18,
        gender: 'male',
        occupation: '3학년 전교 1등',
        personality: '야망이 크고 수단을 가리지 않음, 겉으로는 모범생',
        appearance: '깔끔한 교복, 안경, 모범생 이미지',
        background: '어릴 때부터 1등만 해옴. 의대 진학이 목표.',
        alibi: {
          location: '독서실',
          time: '23:00',
          activity: '독서실에서 공부했다고 주장',
          witnesses: [],
          hasHole: true,
          holeDetail: '독서실 CCTV에 22:30에 퇴실 기록'
        },
        motive: {
          type: 'greed',
          description: '의대 진학을 위해 완벽한 성적이 필요했다',
          strength: 3
        },
        relationships: [
          { targetId: 'char-rival', type: '라이벌', description: '2등 김지원과 경쟁 관계' }
        ],
        secrets: [
          {
            id: 'secret-hacker-1',
            content: '실제 수학 점수는 85점이었다',
            importance: 'critical',
            revealCondition: '원본 답안지 발견 시'
          }
        ],
        dialogues: [
          {
            topic: '성적',
            lines: ['제 성적에 문제가 있다고요? 무슨 말씀이신지...', '전 항상 정정당당하게 공부했어요.']
          },
          {
            topic: '컴퓨터',
            lines: ['컴퓨터요? 기본 정도만요.', '해킹 같은 건 전혀 모릅니다.']
          }
        ],
        nervousTriggers: ['키로거', '로그인', '접속 기록', '원본 답안']
      },
      {
        id: 'char-rival',
        name: '김지원',
        role: 'suspect',
        age: 18,
        gender: 'female',
        occupation: '3학년 전교 2등',
        personality: '노력파, 정의로움',
        appearance: '수수한 외모, 항상 책을 들고 다님',
        background: '전교 2등이지만 항상 오세훈에게 밀림.',
        alibi: {
          location: '집',
          time: '23:00',
          activity: '집에서 공부 중',
          witnesses: ['가족'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-hacker', type: '라이벌', description: '오세훈과 1등 경쟁' }
        ],
        secrets: [],
        dialogues: [
          {
            topic: '오세훈',
            lines: ['세훈이? 성적 조작이요?', '사실 그 친구 수학 점수가 좀 이상하긴 했어요.', '모의고사 때 항상 제가 수학은 이겼거든요.']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-teacher-cs',
        name: '박정호',
        role: 'witness',
        age: 40,
        gender: 'male',
        occupation: '컴퓨터 교사 / 정보보안 담당',
        personality: '꼼꼼하고 기술적',
        appearance: '캐주얼한 복장, 노트북을 항상 들고 다님',
        background: '학교 IT 시스템 관리. 이상 접속 기록을 발견.',
        alibi: {
          location: '집',
          time: '23:00',
          activity: '퇴근 후 집에서 휴식',
          witnesses: ['가족'],
          hasHole: false
        },
        relationships: [],
        secrets: [],
        dialogues: [
          {
            topic: '접속 기록',
            lines: ['밤 11시에 누군가 성적 시스템에 접속했어요.', '담임선생님 계정으로요. 근데 선생님은 그 시간에 안 계셨죠.']
          },
          {
            topic: '키로거',
            lines: ['찾아보니 김 선생님 컴퓨터에 키로거가 설치되어 있었어요.', '누군가 의도적으로 비밀번호를 훔친 거예요.']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-homeroom',
        name: '김영미',
        role: 'witness',
        age: 45,
        gender: 'female',
        occupation: '3학년 담임교사',
        personality: '자상하고 학생들을 믿음',
        appearance: '단정한 정장, 부드러운 인상',
        background: '오세훈의 담임. 그를 신뢰해왔다.',
        alibi: {
          location: '집',
          time: '23:00',
          activity: '집에서 휴식',
          witnesses: ['가족'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-hacker', type: '담임-학생', description: '오세훈을 아끼고 신뢰함' }
        ],
        secrets: [],
        dialogues: [
          {
            topic: '컴퓨터',
            lines: ['제 컴퓨터에 키로거가요?', '최근에... 세훈이가 자료 복사한다고 제 컴퓨터 쓴 적이 있어요.']
          },
          {
            topic: '오세훈',
            lines: ['세훈이가 그랬다고요? 믿을 수 없어요...', '그렇게 착한 아이가...']
          }
        ],
        nervousTriggers: []
      }
    ],

    evidence: [
      {
        id: 'evidence-access-log',
        name: '성적 시스템 접속 기록',
        type: 'digital',
        description: '23:00에 김영미 계정으로 접속한 기록',
        detailedDescription: 'IP 주소는 학교 교무실. 김영미 교사는 그 시간 집에 있었음.',
        location: '서버실',
        foundAt: '시스템 로그',
        linkedCharacters: ['char-homeroom'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-keylogger',
        name: '키로거 프로그램',
        type: 'digital',
        description: '김영미 교사 컴퓨터에서 발견된 키로거',
        detailedDescription: '3일 전에 설치된 키로거. 모든 키 입력이 기록되어 있었음.',
        location: '교무실',
        foundAt: '김영미 컴퓨터',
        linkedCharacters: ['char-hacker'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: true,
        analysisResult: '키로거 설치 시점은 오세훈이 자료 복사하러 온 날'
      },
      {
        id: 'evidence-original-answer',
        name: '원본 답안지',
        type: 'document',
        description: '오세훈의 수학 원본 답안지',
        detailedDescription: '원본 점수는 85점. 시스템에는 98점으로 기록되어 있음.',
        location: '서류 보관실',
        foundAt: '수학 교사 서류함',
        linkedCharacters: ['char-hacker'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-cctv-study',
        name: '독서실 CCTV',
        type: 'digital',
        description: '오세훈이 22:30에 독서실을 나간 기록',
        detailedDescription: '주장한 것과 달리 밤 11시까지 독서실에 있지 않았음.',
        location: '독서실',
        foundAt: 'CCTV 녹화',
        linkedCharacters: ['char-hacker'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-redherring-jiwon',
        name: '김지원의 원한',
        type: 'testimony',
        description: '김지원이 오세훈에게 밀려 불만이 있었다는 증언',
        detailedDescription: '"지원이가 항상 2등이라고 불만이었대요."',
        location: '교실',
        foundAt: '학생 인터뷰',
        linkedCharacters: ['char-rival'],
        isCritical: false,
        isRedHerring: true,
        redHerringReason: '김지원은 정의롭고 동기가 없음',
        discoveryDifficulty: 1,
        analysisRequired: false
      }
    ],

    locations: [
      {
        id: 'loc-office',
        name: '교무실',
        description: '교사들의 업무 공간',
        atmosphere: '책상과 컴퓨터가 가득한 사무 공간',
        objects: [
          {
            id: 'obj-teacher-pc',
            name: '김영미 교사 컴퓨터',
            description: '담임교사의 업무용 컴퓨터',
            examinationResult: '키로거 프로그램이 설치되어 있다.',
            containsEvidence: 'evidence-keylogger'
          }
        ],
        connectedTo: ['loc-corridor']
      },
      {
        id: 'loc-server',
        name: '서버실',
        description: '학교 전산 시스템이 있는 방',
        atmosphere: '서버 팬 소리가 윙윙거리는 어두운 공간',
        objects: [
          {
            id: 'obj-server',
            name: '성적 서버',
            description: '성적 관리 시스템 서버',
            examinationResult: '접속 기록을 확인할 수 있다.',
            containsEvidence: 'evidence-access-log'
          }
        ],
        connectedTo: ['loc-corridor']
      }
    ],

    timeline: [
      { time: '3일 전', event: '오세훈, 자료 복사 명목으로 담임 컴퓨터 사용 (키로거 설치)', participants: ['char-hacker'], location: '교무실', importance: 'critical', isRevealed: false },
      { time: '22:00', event: '오세훈, 독서실에서 공부', participants: ['char-hacker'], location: '독서실', importance: 'minor', isRevealed: true },
      { time: '22:30', event: '오세훈, 독서실 퇴실 (CCTV 기록)', participants: ['char-hacker'], location: '독서실', importance: 'major', isRevealed: false },
      { time: '22:45', event: '오세훈, 학교 도착', participants: ['char-hacker'], location: '학교', importance: 'major', isRevealed: false },
      { time: '23:00', event: '성적 시스템 접속 및 점수 변조', participants: ['char-hacker'], location: '교무실', importance: 'critical', isRevealed: false },
      { time: '23:15', event: '오세훈 퇴교', participants: ['char-hacker'], location: '학교', importance: 'major', isRevealed: false },
      { time: '다음날', event: '이상 접속 기록 발견', participants: ['char-teacher-cs'], location: '서버실', importance: 'major', isRevealed: true }
    ],

    solution: {
      summary: '오세훈이 담임 컴퓨터에 키로거를 설치해 비밀번호를 훔치고 자신의 성적을 조작했다.',
      detailedExplanation: [
        '오세훈은 의대 진학을 위해 완벽한 성적이 필요했다.',
        '수학 성적이 85점으로 부족해 조작을 결심했다.',
        '자료 복사 명목으로 담임 컴퓨터에 키로거를 설치했다.',
        '키로거로 담임의 성적 시스템 비밀번호를 알아냈다.',
        '야간 자습 후 학교에 잠입해 성적을 조작했다.',
        '85점을 98점으로 변조했다.'
      ],
      keyEvidence: ['evidence-access-log', 'evidence-keylogger', 'evidence-original-answer', 'evidence-cctv-study'],
      howToSolve: [
        '접속 기록의 시간과 장소 확인',
        '해당 시간에 학교에 있을 수 있었던 사람 파악',
        '비밀번호 유출 경로 추적',
        '성적 변조 동기가 있는 사람 확인'
      ],
      commonMistakes: [
        '라이벌 김지원을 의심하는 것',
        '외부 해커 소행으로 단정짓는 것'
      ]
    },

    deductionKeywords: {
      who: ['오세훈', '전교 1등', '모범생'],
      why: ['의대', '성적', '진학', '욕심'],
      how: ['키로거', '해킹', '비밀번호', '접속'],
      when: ['11시', '23:00', '밤'],
      where: ['교무실', '성적 시스템', '서버']
    },

    tags: ['해킹', '성적조작', '키로거', '의대', '모범생'],
    author: 'DEDUCTIO Team',
    version: '1.0.0'
  },

  // ========================================
  // fraud-002: 가짜 장학금 사기
  // ========================================
  {
    id: 'fraud-002',
    title: '가짜 장학금 사기',
    subtitle: '장학금 명목으로 학생들의 돈을 뜯어낸 사기꾼',
    type: 'fraud',
    difficulty: 'easy',
    estimatedTime: 15,

    prologue: [
      '청운고 학생들에게 문자 메시지가 도착했다.',
      '"축하합니다! 우수 학생 장학금에 선정되셨습니다."',
      '하지만 이것은 치밀한 사기의 시작이었다.'
    ],
    introduction: [
      '학생부장이 급히 찾아왔습니다.',
      '"학생들이 장학금 명목으로 돈을 입금했다가 사기를 당했대요."',
      '"교육청 명의로 온 문자인데... 교육청은 그런 장학금이 없다고 합니다."'
    ],
    setting: '청운고등학교 및 온라인',

    crimeTime: '14:00',
    crimeLocation: '온라인 (학교 근처 PC방)',
    culpritId: 'char-dropout',
    victimId: undefined,
    motive: '생활비 마련',
    motiveDetail: '중퇴생 이진수는 생활비가 필요했다. 학교 내부 정보에 접근할 수 있었던 그는 학생들의 전화번호를 입수해 가짜 장학금 사기를 벌였다.',
    method: '대량 문자 발송 후 가짜 계좌로 입금 유도',
    methodDetail: '이진수는 발신번호 조작 서비스를 이용해 교육청 번호로 위장했다. "심사비 5만원을 입금하면 100만원 장학금 지급"이라는 문자를 보냈고, 15명의 학생이 입금했다.',

    characters: [
      {
        id: 'char-dropout',
        name: '이진수',
        role: 'culprit',
        age: 20,
        gender: 'male',
        occupation: '중퇴생 / 아르바이트',
        personality: '교활하고 돈에 집착, 변명을 잘함',
        appearance: '후드티, 찢어진 청바지, 무심한 표정',
        background: '2년 전 청운고를 자퇴. 학교 행정실에서 아르바이트한 경험이 있음.',
        alibi: {
          location: 'PC방',
          time: '14:00',
          activity: '게임했다고 주장',
          witnesses: [],
          hasHole: true,
          holeDetail: 'PC방 CCTV에 문자 발송 사이트 접속 기록'
        },
        motive: {
          type: 'greed',
          description: '생활비가 급하게 필요했다',
          strength: 2
        },
        relationships: [
          { targetId: 'char-victim-student', type: '선후배', description: '같은 학교 출신' }
        ],
        secrets: [
          {
            id: 'secret-dropout-1',
            content: '학교 행정실에서 일하며 학생 명단을 복사했다',
            importance: 'critical',
            revealCondition: '행정실 직원 증언'
          }
        ],
        dialogues: [
          {
            topic: '문자',
            lines: ['장학금 문자요? 저도 받았는데요.', '저는 속지 않았죠. 요즘 누가 그런 거 믿어요?']
          },
          {
            topic: '학교',
            lines: ['2년 전에 자퇴했어요.', '학교랑은 이제 아무 상관없습니다.']
          }
        ],
        nervousTriggers: ['행정실', '학생 명단', 'PC방', '발신번호']
      },
      {
        id: 'char-victim-student',
        name: '최민지',
        role: 'victim',
        age: 17,
        gender: 'female',
        occupation: '2학년 학생',
        personality: '순진하고 믿음이 많음',
        appearance: '깔끔한 교복, 긴 생머리',
        background: '가정 형편이 어려워 장학금을 간절히 원했음.',
        alibi: {
          location: '교실',
          time: '14:00',
          activity: '점심시간 후 교실에서 휴식',
          witnesses: ['친구들'],
          hasHole: false
        },
        relationships: [],
        secrets: [],
        dialogues: [
          {
            topic: '입금',
            lines: ['교육청에서 온 문자였어요...', '5만원만 내면 100만원 받는다고 해서...', '정말 바보 같았죠.']
          },
          {
            topic: '문자',
            lines: ['문자에 교육청 전화번호가 찍혀 있어서 믿었어요.', '링크를 클릭하니 진짜 같은 사이트였고요.']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-admin',
        name: '서미숙',
        role: 'witness',
        age: 50,
        gender: 'female',
        occupation: '행정실 직원',
        personality: '꼼꼼하지만 약간 무심함',
        appearance: '정장, 단정한 헤어스타일',
        background: '학교 행정실에서 20년째 근무 중.',
        alibi: {
          location: '행정실',
          time: '14:00',
          activity: '업무 중',
          witnesses: ['동료'],
          hasHole: false
        },
        relationships: [],
        secrets: [],
        dialogues: [
          {
            topic: '이진수',
            lines: ['아, 그 학생... 작년에 잠깐 아르바이트했었죠.', '성실하진 않았지만 컴퓨터는 잘 다뤘어요.']
          },
          {
            topic: '학생 명단',
            lines: ['명단이요? USB에 백업은 해뒀는데...', '잠깐, 제 컴퓨터에 누가 접근한 흔적이 있네요.']
          }
        ],
        nervousTriggers: []
      }
    ],

    evidence: [
      {
        id: 'evidence-fake-msg',
        name: '장학금 안내 문자',
        type: 'digital',
        description: '교육청 명의로 발송된 가짜 장학금 문자',
        detailedDescription: '발신번호는 교육청 대표번호로 위장. "우수학생 장학금 선정, 심사비 5만원 입금 시 100만원 지급"',
        location: '학생들 휴대폰',
        foundAt: '피해 학생 휴대폰',
        linkedCharacters: ['char-dropout'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-bank-account',
        name: '입금 계좌',
        type: 'document',
        description: '문자에 포함된 입금 계좌번호',
        detailedDescription: '이진수 명의 계좌. 총 75만원(5만원×15명) 입금됨.',
        location: '은행',
        foundAt: '문자 메시지 내용',
        linkedCharacters: ['char-dropout'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-pcroom-log',
        name: 'PC방 사용 기록',
        type: 'digital',
        description: 'PC방에서 문자 발송 사이트 접속 기록',
        detailedDescription: '14:00에 발신번호 조작 서비스 사이트 접속. 이진수 회원카드 사용.',
        location: 'PC방',
        foundAt: 'PC방 관리자 서버',
        linkedCharacters: ['char-dropout'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-student-list',
        name: '학생 명단 파일',
        type: 'digital',
        description: '행정실 컴퓨터에서 복사된 학생 전화번호 명단',
        detailedDescription: '작년 이진수가 아르바이트할 때 USB로 복사한 흔적 발견.',
        location: '행정실',
        foundAt: '행정실 컴퓨터 로그',
        linkedCharacters: ['char-dropout'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: true,
        analysisResult: '파일 접근 시점이 이진수 아르바이트 기간과 일치'
      }
    ],

    locations: [
      {
        id: 'loc-pcroom',
        name: 'PC방',
        description: '학교 근처 24시간 PC방',
        atmosphere: '담배 냄새와 키보드 소리가 섞인 어두운 공간',
        objects: [
          {
            id: 'obj-pc',
            name: '이진수가 사용한 PC',
            description: '3번 자리 컴퓨터',
            examinationResult: '문자 발송 사이트 방문 기록이 있다.',
            containsEvidence: 'evidence-pcroom-log'
          }
        ],
        connectedTo: []
      },
      {
        id: 'loc-admin-office',
        name: '행정실',
        description: '학교 행정 업무를 처리하는 곳',
        atmosphere: '서류와 프린터가 가득한 사무실',
        objects: [
          {
            id: 'obj-admin-pc',
            name: '행정실 컴퓨터',
            description: '학생 정보가 저장된 컴퓨터',
            examinationResult: '파일 접근 로그를 확인할 수 있다.',
            containsEvidence: 'evidence-student-list'
          }
        ],
        connectedTo: ['loc-corridor']
      }
    ],

    timeline: [
      { time: '작년', event: '이진수, 행정실 아르바이트하며 학생 명단 복사', participants: ['char-dropout'], location: '행정실', importance: 'critical', isRevealed: false },
      { time: '14:00', event: 'PC방에서 대량 문자 발송', participants: ['char-dropout'], location: 'PC방', importance: 'critical', isRevealed: false },
      { time: '14:10', event: '학생들에게 문자 도착', participants: ['char-victim-student'], location: '학교', importance: 'major', isRevealed: true },
      { time: '14:30', event: '15명의 학생이 입금', participants: ['char-victim-student'], location: '각자 위치', importance: 'major', isRevealed: true },
      { time: '16:00', event: '학생들이 사기임을 인지', participants: ['char-victim-student'], location: '학교', importance: 'major', isRevealed: true }
    ],

    solution: {
      summary: '중퇴생 이진수가 행정실에서 입수한 학생 명단으로 가짜 장학금 문자를 보내 75만원을 편취했다.',
      detailedExplanation: [
        '이진수는 작년 행정실 아르바이트 시절 학생 전화번호를 몰래 복사했다.',
        '생활비가 필요해지자 가짜 장학금 사기를 계획했다.',
        'PC방에서 발신번호 조작 서비스를 이용해 교육청 번호로 위장했다.',
        '학생들에게 대량 문자를 발송했다.',
        '순진한 학생 15명이 심사비 명목으로 5만원씩 입금했다.',
        '총 75만원을 편취한 후 잠적했다.'
      ],
      keyEvidence: ['evidence-bank-account', 'evidence-pcroom-log', 'evidence-student-list'],
      howToSolve: [
        '입금 계좌의 명의인 확인',
        'PC방 사용 기록 추적',
        '학생 명단 유출 경로 파악',
        '과거 행정실 출입 인물 조사'
      ],
      commonMistakes: [
        '외부 조직 범죄로 단정짓는 것',
        '행정실 직원을 의심하는 것'
      ]
    },

    deductionKeywords: {
      who: ['이진수', '중퇴생', '아르바이트'],
      why: ['생활비', '돈', '급전'],
      how: ['문자', '발신번호 조작', '명단'],
      when: ['14:00', '오후 2시'],
      where: ['PC방', '온라인']
    },

    tags: ['보이스피싱', '장학금', '사기', '문자', '발신번호조작'],
    author: 'DEDUCTIO Team',
    version: '1.0.0'
  },

  // ========================================
  // fraud-003: 시험 대리 응시
  // ========================================
  {
    id: 'fraud-003',
    title: '시험 대리 응시',
    subtitle: '쌍둥이를 이용한 완벽한 범죄?',
    type: 'fraud',
    difficulty: 'medium',
    estimatedTime: 18,

    prologue: [
      '전교 꼴찌 한태민이 갑자기 전교 10등 안에 들었다.',
      '담임교사는 기뻐했지만, 동료 교사는 의심했다.',
      '"저 학생, 시험 때 뭔가 이상했어요."'
    ],
    introduction: [
      '감독 교사가 교무실로 찾아왔습니다.',
      '"한태민 학생이... 시험 때 평소와 달랐어요."',
      '"목소리도, 필체도, 심지어 왼손잡이가 오른손으로 글을 썼어요."'
    ],
    setting: '청운고등학교 시험장',

    crimeTime: '09:00',
    crimeLocation: '3학년 2반 교실',
    culpritId: 'char-twin-brother',
    victimId: undefined,
    motive: '형제애와 돈',
    motiveDetail: '쌍둥이 형 한태준은 동생 한태민의 간절한 부탁을 받았다. "이번에 성적 안 오르면 유학 보낸대. 형만 믿는다." 또한 태민은 형에게 50만원을 주기로 약속했다.',
    method: '쌍둥이 형이 동생 대신 시험 응시',
    methodDetail: '한태준은 동생 교복과 이름표를 착용하고 시험장에 들어갔다. 평소 안 쓰던 오른손으로 글씨를 썼고, 동생의 필체를 흉내냈다. 감독 교사가 의심했지만 확신할 수 없었다.',

    characters: [
      {
        id: 'char-twin-brother',
        name: '한태준',
        role: 'culprit',
        age: 18,
        gender: 'male',
        occupation: '대학생 (서울대 1학년)',
        personality: '똑똑하고 동생을 아낌, 약간 오만함',
        appearance: '쌍둥이라 태민과 똑같이 생김, 안경',
        background: '일란성 쌍둥이. 서울대 재학 중. 동생과 달리 모범생.',
        alibi: {
          location: '대학교',
          time: '09:00',
          activity: '대학 강의 중이었다고 주장',
          witnesses: [],
          hasHole: true,
          holeDetail: '해당 시간 출석 기록 없음'
        },
        motive: {
          type: 'greed',
          description: '동생을 도와주고 싶었다',
          strength: 3
        },
        relationships: [
          { targetId: 'char-twin-student', type: '쌍둥이 형제', description: '일란성 쌍둥이' }
        ],
        secrets: [
          {
            id: 'secret-twin-1',
            content: '시험 당일 동생 교복을 입고 학교에 갔다',
            importance: 'critical',
            revealCondition: 'CCTV 또는 필체 분석'
          }
        ],
        dialogues: [
          {
            topic: '시험',
            lines: ['시험이요? 전 대학생인데요.', '동생 시험? 저는 그날 학교에 있었어요.']
          },
          {
            topic: '동생',
            lines: ['태민이가 요즘 공부 때문에 스트레스가 심해요.', '부모님이 너무 압박하셔서...']
          }
        ],
        nervousTriggers: ['필체', '왼손잡이', 'CCTV', '출석']
      },
      {
        id: 'char-twin-student',
        name: '한태민',
        role: 'suspect',
        age: 18,
        gender: 'male',
        occupation: '3학년 학생 (전교 꼴찌)',
        personality: '소심하고 압박감에 시달림',
        appearance: '쌍둥이라 형과 똑같이 생김, 안경',
        background: '공부를 못해 부모님께 압박을 받음. 형에게 의지.',
        alibi: {
          location: '집',
          time: '09:00',
          activity: '아파서 결석했다고 주장',
          witnesses: [],
          hasHole: true,
          holeDetail: '병원 진료 기록 없음'
        },
        relationships: [
          { targetId: 'char-twin-brother', type: '쌍둥이 형제', description: '일란성 쌍둥이' }
        ],
        secrets: [
          {
            id: 'secret-twin-2',
            content: '형에게 대리 시험을 부탁했다',
            importance: 'critical',
            revealCondition: '압박 심문'
          }
        ],
        dialogues: [
          {
            topic: '성적',
            lines: ['제가... 갑자기 잘한 거 이상하죠?', '정말 열심히 공부했어요...']
          },
          {
            topic: '결석',
            lines: ['그날 배가 아파서 집에 있었어요.', '시험은 형이... 아니 제가 봤어요.']
          }
        ],
        nervousTriggers: ['형', '쌍둥이', '필체', '왼손잡이']
      },
      {
        id: 'char-proctor',
        name: '정수진',
        role: 'witness',
        age: 35,
        gender: 'female',
        occupation: '수학 교사',
        personality: '관찰력이 뛰어나고 섬세함',
        appearance: '안경, 단정한 옷차림',
        background: '시험 감독을 맡았고, 한태민의 이상한 점을 발견.',
        alibi: {
          location: '시험장',
          time: '09:00',
          activity: '시험 감독',
          witnesses: ['학생들'],
          hasHole: false
        },
        relationships: [],
        secrets: [],
        dialogues: [
          {
            topic: '한태민',
            lines: ['태민이가 이상했어요.', '평소엔 왼손으로 쓰는데 그날은 오른손으로...', '목소리도 좀 달랐고, 자세도 달랐어요.']
          },
          {
            topic: '필체',
            lines: ['답안지를 보니 필체가 평소와 많이 다르더라고요.', '일부러 흉내 낸 것 같았어요.']
          }
        ],
        nervousTriggers: []
      }
    ],

    evidence: [
      {
        id: 'evidence-answer-sheet',
        name: '한태민 답안지',
        type: 'document',
        description: '시험 답안지',
        detailedDescription: '필체가 평소와 다름. 오른손으로 쓴 흔적. 점수는 95점으로 평소(30점대)와 큰 차이.',
        location: '교무실',
        foundAt: '시험 답안 보관함',
        linkedCharacters: ['char-twin-brother'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: true,
        analysisResult: '필체 감정 결과 다른 사람이 쓴 것으로 판명'
      },
      {
        id: 'evidence-attendance',
        name: '출석부',
        type: 'document',
        description: '시험 당일 출석 기록',
        detailedDescription: '한태민 출석, 한태준 대학 결석.',
        location: '교무실',
        foundAt: '출석부 및 대학 출석 기록',
        linkedCharacters: ['char-twin-brother', 'char-twin-student'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-cctv-entrance',
        name: '학교 정문 CCTV',
        type: 'digital',
        description: '시험 당일 아침 정문 CCTV',
        detailedDescription: '08:50에 "한태민"이 입장. 하지만 걸음걸이와 자세가 평소와 다름.',
        location: '정문',
        foundAt: 'CCTV 녹화',
        linkedCharacters: ['char-twin-brother'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: true,
        analysisResult: '걸음걸이 분석 결과 한태준으로 추정'
      },
      {
        id: 'evidence-previous-papers',
        name: '한태민 과거 답안지',
        type: 'document',
        description: '지난 시험 답안지들',
        detailedDescription: '모두 왼손으로 작성됨. 필체가 이번과 완전히 다름.',
        location: '교무실',
        foundAt: '시험 답안 보관함',
        linkedCharacters: ['char-twin-student'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      }
    ],

    locations: [
      {
        id: 'loc-exam-room',
        name: '3학년 2반 교실',
        description: '시험이 진행된 교실',
        atmosphere: '긴장감이 감도는 조용한 공간',
        objects: [
          {
            id: 'obj-desk',
            name: '한태민 자리',
            description: '창가 맨 뒤 자리',
            examinationResult: '특별한 흔적은 없다.',
            containsEvidence: undefined
          }
        ],
        connectedTo: ['loc-corridor']
      }
    ],

    timeline: [
      { time: '일주일 전', event: '한태민, 형에게 대리 시험 부탁 + 50만원 약속', participants: ['char-twin-student', 'char-twin-brother'], location: '집', importance: 'critical', isRevealed: false },
      { time: '08:50', event: '한태준, 동생 교복 입고 학교 입장', participants: ['char-twin-brother'], location: '정문', importance: 'critical', isRevealed: false },
      { time: '09:00', event: '시험 시작 - 한태준이 대신 응시', participants: ['char-twin-brother'], location: '시험장', importance: 'critical', isRevealed: false },
      { time: '09:30', event: '감독 교사가 이상함을 느낌', participants: ['char-proctor'], location: '시험장', importance: 'major', isRevealed: true },
      { time: '11:00', event: '시험 종료', participants: ['char-twin-brother'], location: '시험장', importance: 'minor', isRevealed: true },
      { time: '다음날', event: '답안지 채점 중 의혹 제기', participants: ['char-proctor'], location: '교무실', importance: 'major', isRevealed: true }
    ],

    solution: {
      summary: '일란성 쌍둥이 형 한태준이 동생 한태민 대신 시험을 치렀다.',
      detailedExplanation: [
        '한태민은 성적 압박에 시달렸고 유학을 가기 싫었다.',
        '쌍둥이 형 한태준에게 대리 시험을 부탁했다.',
        '한태준은 동생 교복과 이름표를 착용하고 학교에 들어갔다.',
        '평소 왼손잡이인 동생을 흉내내기 위해 오른손으로 글을 썼다.',
        '하지만 필체, 목소리, 걸음걸이에서 차이가 발견되었다.',
        '95점의 높은 점수는 서울대생 형의 실력이었다.'
      ],
      keyEvidence: ['evidence-answer-sheet', 'evidence-attendance', 'evidence-cctv-entrance', 'evidence-previous-papers'],
      howToSolve: [
        '필체 비교 분석',
        '왼손잡이 vs 오른손잡이 확인',
        'CCTV 걸음걸이 분석',
        '쌍둥이 형의 대학 출석 기록 확인'
      ],
      commonMistakes: [
        '한태민이 갑자기 공부를 잘하게 된 것으로 믿는 것',
        '타인의 도움 없이 혼자 했다고 생각하는 것'
      ]
    },

    deductionKeywords: {
      who: ['한태준', '쌍둥이', '형', '대학생'],
      why: ['형제애', '유학', '압박', '돈'],
      how: ['대리 시험', '교복', '변장'],
      when: ['09:00', '시험 시간'],
      where: ['시험장', '3학년 2반']
    },

    tags: ['대리시험', '쌍둥이', '필체', '부정행위'],
    author: 'DEDUCTIO Team',
    version: '1.0.0'
  },

  // ========================================
  // fraud-004: 위조 성적표
  // ========================================
  {
    id: 'fraud-004',
    title: '위조 성적표',
    subtitle: '포토샵으로 만든 완벽한 성적표',
    type: 'fraud',
    difficulty: 'easy',
    estimatedTime: 12,

    prologue: [
      '박민호의 부모님은 아들이 전교 5등이라고 자랑했다.',
      '하지만 담임교사는 고개를 갸우뚱했다.',
      '"박민호가 5등? 제가 알기론 30등인데..."'
    ],
    introduction: [
      '학부모 상담 날, 이상한 일이 발생했습니다.',
      '박민호의 어머니가 가져온 성적표와 학교 기록이 달랐습니다.',
      '"이건... 위조된 성적표입니다."'
    ],
    setting: '청운고등학교 상담실',

    crimeTime: '16:00',
    crimeLocation: '집 (온라인)',
    culpritId: 'char-photoshop-student',
    victimId: undefined,
    motive: '부모님의 기대와 압박',
    motiveDetail: '박민호는 부모님이 매번 1등만 요구하는 것에 지쳤다. 실제 성적은 중위권이지만 부모님 눈에는 낙제생. 포토샵을 배운 그는 성적표를 위조해 부모님을 속였다.',
    method: '포토샵으로 성적표 수정',
    methodDetail: '박민호는 학교 성적표 양식을 스캔한 후 포토샵으로 성적을 수정했다. 원본과 거의 구분이 안 될 정도로 정교했으나, 학교 직인이 미묘하게 달랐다.',

    characters: [
      {
        id: 'char-photoshop-student',
        name: '박민호',
        role: 'culprit',
        age: 17,
        gender: 'male',
        occupation: '2학년 학생',
        personality: '겉으로는 밝지만 속으로는 스트레스에 시달림',
        appearance: '단정한 교복, 밝은 표정',
        background: '디자인에 관심이 많아 포토샵을 독학. 부모님의 과도한 기대에 압박받음.',
        alibi: {
          location: '집',
          time: '16:00',
          activity: '방에서 공부 중',
          witnesses: ['부모'],
          hasHole: false
        },
        motive: {
          type: 'greed',
          description: '부모님의 실망을 피하고 싶었다',
          strength: 3
        },
        relationships: [
          { targetId: 'char-homeroom2', type: '담임-학생', description: '담임교사와 관계' }
        ],
        secrets: [
          {
            id: 'secret-photoshop-1',
            content: '포토샵으로 성적표를 여러 번 위조했다',
            importance: 'critical',
            revealCondition: '컴퓨터 파일 분석'
          }
        ],
        dialogues: [
          {
            topic: '성적표',
            lines: ['성적표요? 학교에서 받은 그대로인데요...', '위조라니... 말도 안 돼요.']
          },
          {
            topic: '포토샵',
            lines: ['포토샵은... 취미로 조금 배웠어요.', '성적표랑은 상관없어요!']
          }
        ],
        nervousTriggers: ['포토샵', '파일', '직인', '원본']
      },
      {
        id: 'char-homeroom2',
        name: '이현주',
        role: 'witness',
        age: 38,
        gender: 'female',
        occupation: '2학년 담임교사',
        personality: '따뜻하지만 원칙적',
        appearance: '정장, 부드러운 미소',
        background: '학생들을 아끼지만 부정에는 엄격함.',
        alibi: {
          location: '상담실',
          time: '16:00',
          activity: '학부모 상담 중',
          witnesses: ['학부모'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-photoshop-student', type: '담임-학생', description: '박민호 담임' }
        ],
        secrets: [],
        dialogues: [
          {
            topic: '성적',
            lines: ['민호는 전교 30등 정도예요.', '5등이라니... 이건 분명 위조입니다.']
          },
          {
            topic: '학부모',
            lines: ['민호 부모님이 성적에 너무 집착하세요.', '아이가 많이 힘들어하는 것 같아요.']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-parent',
        name: '박민호 어머니',
        role: 'victim',
        age: 45,
        gender: 'female',
        occupation: '전업주부',
        personality: '자녀 교육에 열성적, 완벽주의',
        appearance: '고급스러운 옷차림',
        background: '아들이 명문대에 가길 간절히 원함.',
        alibi: {
          location: '상담실',
          time: '16:00',
          activity: '상담 중',
          witnesses: ['담임교사'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-photoshop-student', type: '모자', description: '박민호의 어머니' }
        ],
        secrets: [],
        dialogues: [
          {
            topic: '성적표',
            lines: ['우리 민호가 5등이라고 해서 얼마나 기뻤는지...', '위조라니요? 민호가?', '어머... 우리 애가 왜...']
          }
        ],
        nervousTriggers: []
      }
    ],

    evidence: [
      {
        id: 'evidence-fake-report',
        name: '위조 성적표',
        type: 'document',
        description: '박민호가 집에 가져간 성적표',
        detailedDescription: '전교 5등으로 기재. 포토샵으로 수정한 흔적. 학교 직인이 미묘하게 다름.',
        location: '박민호 집',
        foundAt: '어머니가 가져옴',
        linkedCharacters: ['char-photoshop-student'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: true,
        analysisResult: '인쇄 품질과 직인 분석 결과 포토샵 편집 확인'
      },
      {
        id: 'evidence-real-report',
        name: '실제 성적표',
        type: 'document',
        description: '학교 기록상 박민호 성적표',
        detailedDescription: '전교 32등. 위조본과 비교하면 등수와 일부 과목 점수가 다름.',
        location: '교무실',
        foundAt: '학생 기록부',
        linkedCharacters: ['char-photoshop-student'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-psd-file',
        name: '포토샵 파일',
        type: 'digital',
        description: '박민호 컴퓨터에서 발견된 .psd 파일',
        detailedDescription: '성적표.psd 파일. 레이어를 보면 수정 과정이 그대로 남아있음.',
        location: '박민호 집',
        foundAt: '박민호 컴퓨터',
        linkedCharacters: ['char-photoshop-student'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-printer',
        name: '프린터 출력 기록',
        type: 'digital',
        description: '박민호 집 프린터 사용 기록',
        detailedDescription: '성적표 발급일에 여러 번 출력한 기록. 색 조정을 반복함.',
        location: '박민호 집',
        foundAt: '프린터 메모리',
        linkedCharacters: ['char-photoshop-student'],
        isCritical: false,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      }
    ],

    locations: [
      {
        id: 'loc-counseling-room',
        name: '상담실',
        description: '학부모 상담을 진행하는 공간',
        atmosphere: '따뜻하고 아늑한 분위기',
        objects: [
          {
            id: 'obj-report-comparison',
            name: '성적표 비교 자료',
            description: '위조본과 원본을 비교한 자료',
            examinationResult: '직인과 글씨체에서 차이가 발견된다.',
            containsEvidence: 'evidence-fake-report'
          }
        ],
        connectedTo: ['loc-corridor']
      },
      {
        id: 'loc-minho-room',
        name: '박민호 방',
        description: '박민호의 개인 공간',
        atmosphere: '깔끔하게 정리된 학생 방',
        objects: [
          {
            id: 'obj-minho-pc',
            name: '박민호 컴퓨터',
            description: '데스크톱 컴퓨터',
            examinationResult: '포토샵 파일과 성적표 이미지가 있다.',
            containsEvidence: 'evidence-psd-file'
          }
        ],
        connectedTo: []
      }
    ],

    timeline: [
      { time: '성적표 발급일', event: '학교에서 성적표 배부', participants: ['char-photoshop-student'], location: '학교', importance: 'minor', isRevealed: true },
      { time: '당일 저녁', event: '박민호, 성적표를 스캔하고 포토샵 작업 시작', participants: ['char-photoshop-student'], location: '집', importance: 'critical', isRevealed: false },
      { time: '당일 밤', event: '여러 번 출력하며 색 조정', participants: ['char-photoshop-student'], location: '집', importance: 'major', isRevealed: false },
      { time: '다음날', event: '위조 성적표를 부모님께 제출', participants: ['char-photoshop-student', 'char-parent'], location: '집', importance: 'major', isRevealed: false },
      { time: '상담 당일', event: '어머니가 위조 성적표를 들고 상담 참석', participants: ['char-parent', 'char-homeroom2'], location: '상담실', importance: 'major', isRevealed: true },
      { time: '16:00', event: '위조 사실 발각', participants: ['char-homeroom2', 'char-parent'], location: '상담실', importance: 'critical', isRevealed: true }
    ],

    solution: {
      summary: '박민호가 부모님의 압박을 피하기 위해 포토샵으로 성적표를 위조했다.',
      detailedExplanation: [
        '박민호는 매번 1등을 요구하는 부모님에게 지쳤다.',
        '실제 성적은 전교 32등이지만 부모님은 받아들이지 않았다.',
        '포토샵 실력을 이용해 성적표를 위조하기로 결심했다.',
        '원본 성적표를 스캔하고 등수와 점수를 수정했다.',
        '프린터로 여러 번 출력하며 원본과 똑같게 만들었다.',
        '위조 성적표를 부모님께 제출했으나 상담 시 발각되었다.'
      ],
      keyEvidence: ['evidence-fake-report', 'evidence-psd-file', 'evidence-real-report'],
      howToSolve: [
        '위조본과 원본 성적표 비교',
        '학교 직인 감정',
        '박민호 컴퓨터 파일 분석',
        '프린터 출력 기록 확인'
      ],
      commonMistakes: [
        '학교에서 실수로 잘못된 성적표를 발급했다고 생각하는 것',
        '다른 학생과 성적표가 바뀌었다고 추측하는 것'
      ]
    },

    deductionKeywords: {
      who: ['박민호', '학생', '2학년'],
      why: ['부모 압박', '기대', '실망'],
      how: ['포토샵', '위조', '인쇄'],
      when: ['성적표 발급일', '저녁'],
      where: ['집', '방']
    },

    tags: ['포토샵', '위조', '성적표', '부모압박'],
    author: 'DEDUCTIO Team',
    version: '1.0.0'
  },

  // ========================================
  // fraud-005: 가짜 추천서
  // ========================================
  {
    id: 'fraud-005',
    title: '가짜 추천서',
    subtitle: '교수 명의를 도용한 대입 추천서',
    type: 'fraud',
    difficulty: 'medium',
    estimatedTime: 20,

    prologue: [
      '명문대 입시에서 추천서는 당락을 결정한다.',
      '이수진은 유명 교수의 추천서를 제출했다.',
      '하지만 그 교수는 그녀를 알지도 못했다.'
    ],
    introduction: [
      '대학 입학처에서 연락이 왔습니다.',
      '"이수진 학생의 추천서에 문제가 있습니다."',
      '"추천인으로 기재된 교수님이 그런 추천서를 쓴 적이 없다고 하시네요."'
    ],
    setting: '청운고등학교 및 대학 입학처',

    crimeTime: '20:00',
    crimeLocation: '집 (온라인)',
    culpritId: 'char-ambitious-student',
    victimId: 'char-professor',
    motive: '명문대 합격 욕심',
    motiveDetail: '이수진은 서울대 입학이 간절했다. 내신과 수능은 충분했지만 추천서가 약했다. 인터넷에서 추천서 대필 업체를 발견했고, 유명 교수 명의로 추천서를 위조했다.',
    method: '추천서 대필 업체 이용 및 교수 서명 위조',
    methodDetail: '이수진은 100만원을 주고 추천서 대필 업체에 의뢰했다. 업체는 유명 교수의 이메일 양식과 서명을 위조해 완벽한 추천서를 만들었다. 하지만 대학 측이 교수에게 확인 전화를 걸면서 발각되었다.',

    characters: [
      {
        id: 'char-ambitious-student',
        name: '이수진',
        role: 'culprit',
        age: 18,
        gender: 'female',
        occupation: '3학년 학생',
        personality: '야망이 크고 목적을 위해 수단을 가리지 않음',
        appearance: '단정한 외모, 자신감 넘치는 표정',
        background: '전교 3등의 우수한 성적. 서울대 합격이 목표.',
        alibi: {
          location: '집',
          time: '20:00',
          activity: '입시 준비 중',
          witnesses: ['부모'],
          hasHole: false
        },
        motive: {
          type: 'greed',
          description: '명문대에 반드시 합격하고 싶었다',
          strength: 3
        },
        relationships: [
          { targetId: 'char-professor', type: '일면식 없음', description: '교수를 모름' }
        ],
        secrets: [
          {
            id: 'secret-letter-1',
            content: '추천서 대필 업체에 100만원을 지불했다',
            importance: 'critical',
            revealCondition: '은행 거래 내역 및 이메일 확인'
          }
        ],
        dialogues: [
          {
            topic: '추천서',
            lines: ['추천서요? 김 교수님께 직접 받았어요.', '제가 교수님 연구실에서 인턴도 했거든요.']
          },
          {
            topic: '교수',
            lines: ['김 교수님은 정말 좋은 분이세요.', '저를 아껴주셨어요.']
          }
        ],
        nervousTriggers: ['대필', '위조', '이메일', '업체']
      },
      {
        id: 'char-professor',
        name: '김철수',
        role: 'victim',
        age: 55,
        gender: 'male',
        occupation: '서울대 교수',
        personality: '원칙적이고 정직함',
        appearance: '회색 양복, 근엄한 인상',
        background: '저명한 학자. 제자들에게 엄격하지만 공정함.',
        alibi: {
          location: '연구실',
          time: '20:00',
          activity: '연구 중',
          witnesses: ['조교'],
          hasHole: false
        },
        relationships: [],
        secrets: [],
        dialogues: [
          {
            topic: '이수진',
            lines: ['이수진? 그런 학생 모릅니다.', '제 연구실 인턴? 그런 적 없어요.']
          },
          {
            topic: '추천서',
            lines: ['이건 제 서명이 아닙니다.', '누군가 제 명의를 도용한 거예요.']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-admission',
        name: '박지영',
        role: 'witness',
        age: 40,
        gender: 'female',
        occupation: '대학 입학처 직원',
        personality: '꼼꼼하고 의심이 많음',
        appearance: '정장, 안경',
        background: '입학 서류 검증 담당. 위조 추천서를 많이 봤음.',
        alibi: {
          location: '입학처',
          time: '20:00',
          activity: '퇴근 후 집',
          witnesses: ['가족'],
          hasHole: false
        },
        relationships: [],
        secrets: [],
        dialogues: [
          {
            topic: '추천서',
            lines: ['이 추천서... 뭔가 이상했어요.', '문체가 너무 완벽하고 형식적이었거든요.', '확인 전화를 드렸더니 교수님이 모르신다고...']
          },
          {
            topic: '대필 업체',
            lines: ['요즘 추천서 대필 업체가 성행한대요.', '학생들이 돈만 내면 완벽한 추천서를 만들어준다고...']
          }
        ],
        nervousTriggers: []
      }
    ],

    evidence: [
      {
        id: 'evidence-fake-letter',
        name: '위조 추천서',
        type: 'document',
        description: '김철수 교수 명의 추천서',
        detailedDescription: '완벽한 형식과 문장. 하지만 교수 본인은 작성한 적이 없음.',
        location: '대학 입학처',
        foundAt: '이수진 입학 서류',
        linkedCharacters: ['char-ambitious-student'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: true,
        analysisResult: '서명 필적 감정 결과 위조로 판명'
      },
      {
        id: 'evidence-email',
        name: '대필 업체 이메일',
        type: 'digital',
        description: '이수진과 대필 업체 간 이메일',
        detailedDescription: '"추천서 작성 완료. 100만원 입금 확인했습니다."',
        location: '이수진 이메일',
        foundAt: '이수진 이메일 계정',
        linkedCharacters: ['char-ambitious-student'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-bank-transfer',
        name: '계좌 이체 내역',
        type: 'document',
        description: '이수진이 대필 업체에 100만원 송금',
        detailedDescription: '거래 메모: "추천서"',
        location: '은행',
        foundAt: '이수진 통장',
        linkedCharacters: ['char-ambitious-student'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-professor-statement',
        name: '교수 진술서',
        type: 'testimony',
        description: '김철수 교수의 공식 진술',
        detailedDescription: '"이수진을 알지 못하며, 추천서를 쓴 적도 없다."',
        location: '대학',
        foundAt: '입학처 기록',
        linkedCharacters: ['char-professor'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      }
    ],

    locations: [
      {
        id: 'loc-sujin-room',
        name: '이수진 방',
        description: '이수진의 개인 공간',
        atmosphere: '입시 자료와 책으로 가득한 방',
        objects: [
          {
            id: 'obj-sujin-laptop',
            name: '이수진 노트북',
            description: '입시 준비용 노트북',
            examinationResult: '대필 업체와 주고받은 이메일이 있다.',
            containsEvidence: 'evidence-email'
          }
        ],
        connectedTo: []
      }
    ],

    timeline: [
      { time: '2개월 전', event: '이수진, 추천서 필요성 인지', participants: ['char-ambitious-student'], location: '학교', importance: 'minor', isRevealed: true },
      { time: '1개월 전', event: '대필 업체 발견 및 의뢰', participants: ['char-ambitious-student'], location: '집', importance: 'critical', isRevealed: false },
      { time: '3주 전', event: '100만원 송금', participants: ['char-ambitious-student'], location: '은행', importance: 'critical', isRevealed: false },
      { time: '2주 전', event: '위조 추천서 수령', participants: ['char-ambitious-student'], location: '이메일', importance: 'major', isRevealed: false },
      { time: '1주 전', event: '입학 서류 제출', participants: ['char-ambitious-student'], location: '대학', importance: 'major', isRevealed: true },
      { time: '어제', event: '입학처, 교수에게 확인 전화', participants: ['char-admission', 'char-professor'], location: '전화', importance: 'critical', isRevealed: true },
      { time: '오늘', event: '위조 사실 발각', participants: ['char-admission'], location: '입학처', importance: 'critical', isRevealed: true }
    ],

    solution: {
      summary: '이수진이 명문대 합격을 위해 대필 업체에 돈을 주고 교수 명의 추천서를 위조했다.',
      detailedExplanation: [
        '이수진은 서울대 합격이 간절했다.',
        '추천서가 약점이라고 판단했다.',
        '인터넷에서 추천서 대필 업체를 발견했다.',
        '100만원을 주고 유명 교수 명의 추천서를 의뢰했다.',
        '업체는 교수의 서명과 이메일 양식을 위조했다.',
        '완벽해 보였지만 대학 측 확인 전화로 발각되었다.'
      ],
      keyEvidence: ['evidence-fake-letter', 'evidence-email', 'evidence-bank-transfer', 'evidence-professor-statement'],
      howToSolve: [
        '추천인에게 직접 확인',
        '서명 필적 감정',
        '이수진 이메일 및 거래 내역 조사',
        '대필 업체 추적'
      ],
      commonMistakes: [
        '교수가 실수로 잊었다고 생각하는 것',
        '이수진이 정말 인턴을 했다고 믿는 것'
      ]
    },

    deductionKeywords: {
      who: ['이수진', '학생', '3학년'],
      why: ['명문대', '합격', '욕심'],
      how: ['대필', '위조', '업체'],
      when: ['1개월 전', '준비 기간'],
      where: ['온라인', '집']
    },

    tags: ['추천서', '위조', '대필', '입시부정'],
    author: 'DEDUCTIO Team',
    version: '1.0.0'
  },

  // ========================================
  // fraud-006: 동아리 회비 횡령
  // ========================================
  {
    id: 'fraud-006',
    title: '동아리 회비 횡령',
    subtitle: '사라진 200만원의 행방',
    type: 'fraud',
    difficulty: 'easy',
    estimatedTime: 15,

    prologue: [
      '청운고 댄스동아리는 전국대회를 준비 중이었다.',
      '회원들이 모은 회비 200만원.',
      '하지만 통장 잔액은 20만원밖에 남지 않았다.'
    ],
    introduction: [
      '동아리 부장이 급히 찾아왔습니다.',
      '"선생님, 회비가 거의 다 사라졌어요!"',
      '"회계 담당이 횡령한 것 같아요."'
    ],
    setting: '청운고등학교 동아리실',

    crimeTime: '지난 3개월',
    crimeLocation: '동아리실 및 온라인',
    culpritId: 'char-treasurer',
    victimId: undefined,
    motive: '명품 구매 욕구',
    motiveDetail: '회계 담당 정유나는 SNS에서 명품을 보며 질투를 느꼈다. 집안 형편이 어려워 명품을 살 수 없었던 그녀는 동아리 회비를 조금씩 빼돌리기 시작했다.',
    method: '가짜 영수증과 허위 지출 내역 작성',
    methodDetail: '정유나는 동아리 물품 구매 명목으로 돈을 인출했지만 실제로는 명품을 샀다. 가짜 영수증을 만들어 회계장부를 조작했고, 3개월간 180만원을 횡령했다.',

    characters: [
      {
        id: 'char-treasurer',
        name: '정유나',
        role: 'culprit',
        age: 17,
        gender: 'female',
        occupation: '2학년 / 동아리 회계',
        personality: '겉으로는 성실하지만 물욕이 강함',
        appearance: '최근 명품 가방과 신발 착용',
        background: '집안 형편이 어려움. SNS에서 또래들의 명품 자랑을 보며 박탈감을 느낌.',
        alibi: {
          location: '동아리실',
          time: '방과후',
          activity: '회계 업무',
          witnesses: ['동아리원'],
          hasHole: false
        },
        motive: {
          type: 'greed',
          description: '명품을 갖고 싶었다',
          strength: 2
        },
        relationships: [
          { targetId: 'char-club-leader', type: '동아리 동료', description: '부장과 회계' }
        ],
        secrets: [
          {
            id: 'secret-embezzle-1',
            content: '횡령한 돈으로 명품 가방과 신발을 샀다',
            importance: 'critical',
            revealCondition: '카드 영수증 및 SNS 확인'
          }
        ],
        dialogues: [
          {
            topic: '회비',
            lines: ['회비요? 다 물품 구매에 썼어요.', '영수증 다 있어요.']
          },
          {
            topic: '명품',
            lines: ['이거요? 아르바이트해서 샀어요.', '제 돈으로 산 건데 왜요?']
          }
        ],
        nervousTriggers: ['영수증', '지출', '명품', 'SNS']
      },
      {
        id: 'char-club-leader',
        name: '김도현',
        role: 'witness',
        age: 18,
        gender: 'male',
        occupation: '3학년 / 동아리 부장',
        personality: '책임감 강하고 정의로움',
        appearance: '운동복, 건강한 인상',
        background: '댄스동아리 부장. 전국대회 준비 중.',
        alibi: {
          location: '동아리실',
          time: '방과후',
          activity: '연습 지도',
          witnesses: ['동아리원'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-treasurer', type: '동아리 동료', description: '부장과 회계' }
        ],
        secrets: [],
        dialogues: [
          {
            topic: '회비',
            lines: ['200만원 모았는데 20만원밖에 안 남았어요.', '유나가 회계인데... 설마...']
          },
          {
            topic: '정유나',
            lines: ['요즘 유나 옷차림이 화려해졌어요.', '명품 가방도 들고 다니고...', '근데 유나네 집이 어렵다고 들었는데...']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-club-advisor',
        name: '최민석',
        role: 'witness',
        age: 32,
        gender: 'male',
        occupation: '체육 교사 / 동아리 지도교사',
        personality: '학생들을 믿지만 원칙은 지킴',
        appearance: '운동복, 친근한 인상',
        background: '동아리를 아끼고 학생들을 신뢰함.',
        alibi: {
          location: '체육관',
          time: '방과후',
          activity: '수업 및 동아리 지도',
          witnesses: ['학생들'],
          hasHole: false
        },
        relationships: [],
        secrets: [],
        dialogues: [
          {
            topic: '회계',
            lines: ['회계는 유나가 맡았죠.', '평소 성실해 보여서 믿었는데...']
          },
          {
            topic: '영수증',
            lines: ['영수증을 다시 확인해봤더니 이상한 게 많네요.', '같은 날짜에 다른 가게 영수증이 여러 장...']
          }
        ],
        nervousTriggers: []
      }
    ],

    evidence: [
      {
        id: 'evidence-fake-receipts',
        name: '가짜 영수증',
        type: 'document',
        description: '동아리 물품 구매 명목 영수증',
        detailedDescription: '인터넷에서 만든 가짜 영수증. 실제 가게에 확인하니 거래 내역 없음.',
        location: '동아리실',
        foundAt: '회계장부',
        linkedCharacters: ['char-treasurer'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: true,
        analysisResult: '영수증 번호 조회 결과 위조 확인'
      },
      {
        id: 'evidence-bank-statement',
        name: '통장 거래 내역',
        type: 'document',
        description: '동아리 통장 입출금 내역',
        detailedDescription: '지난 3개월간 18회 인출. 총 180만원. 모두 정유나가 인출.',
        location: '은행',
        foundAt: '동아리 통장',
        linkedCharacters: ['char-treasurer'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-luxury-items',
        name: '명품 구매 내역',
        type: 'document',
        description: '정유나의 명품 구매 카드 내역',
        detailedDescription: '최근 3개월간 명품 가방, 신발 등 총 170만원 구매.',
        location: '카드사',
        foundAt: '정유나 카드 내역',
        linkedCharacters: ['char-treasurer'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-sns',
        name: 'SNS 게시물',
        type: 'digital',
        description: '정유나의 SNS 명품 자랑 게시물',
        detailedDescription: '"오늘 드디어 샀다! #명품 #가방 #행복"',
        location: '온라인',
        foundAt: '정유나 SNS',
        linkedCharacters: ['char-treasurer'],
        isCritical: false,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      }
    ],

    locations: [
      {
        id: 'loc-club-room',
        name: '댄스동아리실',
        description: '동아리 활동 공간',
        atmosphere: '음악과 열정이 가득한 공간',
        objects: [
          {
            id: 'obj-account-book',
            name: '회계장부',
            description: '동아리 회비 관리 장부',
            examinationResult: '가짜 영수증이 많이 붙어있다.',
            containsEvidence: 'evidence-fake-receipts'
          }
        ],
        connectedTo: ['loc-corridor']
      }
    ],

    timeline: [
      { time: '3개월 전', event: '동아리 회비 200만원 모금 완료', participants: ['char-club-leader'], location: '동아리실', importance: 'minor', isRevealed: true },
      { time: '3개월 전~현재', event: '정유나, 가짜 영수증으로 18회 인출 (총 180만원)', participants: ['char-treasurer'], location: '은행', importance: 'critical', isRevealed: false },
      { time: '2개월 전', event: '첫 명품 가방 구매', participants: ['char-treasurer'], location: '백화점', importance: 'major', isRevealed: false },
      { time: '1개월 전', event: '명품 신발 구매 및 SNS 자랑', participants: ['char-treasurer'], location: '백화점', importance: 'major', isRevealed: false },
      { time: '어제', event: '김도현, 잔액 확인 후 충격', participants: ['char-club-leader'], location: '동아리실', importance: 'major', isRevealed: true },
      { time: '오늘', event: '영수증 조작 발각', participants: ['char-club-advisor'], location: '동아리실', importance: 'critical', isRevealed: true }
    ],

    solution: {
      summary: '회계 담당 정유나가 명품 구매를 위해 동아리 회비 180만원을 횡령했다.',
      detailedExplanation: [
        '정유나는 SNS에서 또래들의 명품 자랑을 보며 박탈감을 느꼈다.',
        '집안 형편이 어려워 명품을 살 수 없었다.',
        '동아리 회계를 맡으면서 유혹에 빠졌다.',
        '물품 구매 명목으로 돈을 인출한 후 명품을 샀다.',
        '가짜 영수증을 만들어 회계장부를 조작했다.',
        '3개월간 18회에 걸쳐 총 180만원을 횡령했다.'
      ],
      keyEvidence: ['evidence-bank-statement', 'evidence-fake-receipts', 'evidence-luxury-items'],
      howToSolve: [
        '통장 거래 내역 확인',
        '영수증 진위 확인',
        '정유나의 소비 패턴 조사',
        'SNS 및 카드 내역 분석'
      ],
      commonMistakes: [
        '다른 동아리원을 의심하는 것',
        '실제로 물품을 구매했다고 믿는 것'
      ]
    },

    deductionKeywords: {
      who: ['정유나', '회계', '2학년'],
      why: ['명품', '욕심', '박탈감'],
      how: ['가짜 영수증', '횡령', '인출'],
      when: ['3개월간', '18회'],
      where: ['동아리실', '은행']
    },

    tags: ['횡령', '동아리', '회비', '명품'],
    author: 'DEDUCTIO Team',
    version: '1.0.0'
  },

  // ========================================
  // fraud-007: 학교 물품 불법 판매
  // ========================================
  {
    id: 'fraud-007',
    title: '학교 물품 불법 판매',
    subtitle: '당근마켓에 올라온 학교 컴퓨터',
    type: 'fraud',
    difficulty: 'medium',
    estimatedTime: 18,

    prologue: [
      '청운고 컴퓨터실에서 노트북 3대가 사라졌다.',
      '얼마 후, 당근마켓에 같은 모델이 저렴하게 올라왔다.',
      '판매자는... 학교 관계자였다.'
    ],
    introduction: [
      '정보부장이 급히 찾아왔습니다.',
      '"컴퓨터실 노트북이 없어졌어요."',
      '"당근마켓을 확인했더니... 우리 학교 물품 같은데요?"'
    ],
    setting: '청운고등학교 컴퓨터실',

    crimeTime: '주말',
    crimeLocation: '컴퓨터실',
    culpritId: 'char-janitor',
    victimId: undefined,
    motive: '생활비 부족',
    motiveDetail: '청소 노동자 이만수는 낮은 급여로 생활이 어려웠다. 컴퓨터실 열쇠를 가지고 있던 그는 주말에 학교가 비는 것을 이용해 노트북을 훔쳐 팔기로 결심했다.',
    method: '주말에 학교 물품을 훔쳐 온라인 중고거래',
    methodDetail: '이만수는 주말 당직 근무를 자원했다. 아무도 없는 학교에서 컴퓨터실 노트북 3대를 훔쳤다. 자산 관리 스티커를 떼어내고 당근마켓에 올려 팔았다.',

    characters: [
      {
        id: 'char-janitor',
        name: '이만수',
        role: 'culprit',
        age: 52,
        gender: 'male',
        occupation: '학교 청소 노동자',
        personality: '과묵하고 생활고에 시달림',
        appearance: '작업복, 지친 표정',
        background: '학교에서 5년째 근무. 급여가 낮아 생활이 어려움.',
        alibi: {
          location: '학교',
          time: '주말 오전',
          activity: '당직 근무 중이었다고 주장',
          witnesses: [],
          hasHole: true,
          holeDetail: 'CCTV에 컴퓨터실 출입 기록'
        },
        motive: {
          type: 'greed',
          description: '생활비가 급하게 필요했다',
          strength: 2
        },
        relationships: [],
        secrets: [
          {
            id: 'secret-janitor-1',
            content: '당근마켓 계정으로 학교 물품을 판매했다',
            importance: 'critical',
            revealCondition: '당근마켓 판매자 추적'
          }
        ],
        dialogues: [
          {
            topic: '노트북',
            lines: ['노트북이요? 저는 청소만 해요.', '컴퓨터는 잘 몰라요.']
          },
          {
            topic: '주말 근무',
            lines: ['주말에 당직 섰어요.', '청소하고 시설 점검하고...']
          }
        ],
        nervousTriggers: ['당근마켓', '판매', 'CCTV', '열쇠']
      },
      {
        id: 'char-it-manager',
        name: '박정훈',
        role: 'witness',
        age: 38,
        gender: 'male',
        occupation: '정보부장',
        personality: '꼼꼼하고 책임감 강함',
        appearance: '캐주얼 복장, 노트북 항상 휴대',
        background: '학교 IT 자산 관리 담당.',
        alibi: {
          location: '집',
          time: '주말',
          activity: '휴식',
          witnesses: ['가족'],
          hasHole: false
        },
        relationships: [],
        secrets: [],
        dialogues: [
          {
            topic: '노트북',
            lines: ['월요일에 확인했더니 3대가 없어졌어요.', '자산 번호는 IT-2023-045, 046, 047번.']
          },
          {
            topic: '당근마켓',
            lines: ['우연히 당근마켓을 보다가 같은 모델을 발견했어요.', '사진을 보니 자산 스티커 뗀 흔적이...']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-buyer',
        name: '김준호',
        role: 'witness',
        age: 25,
        gender: 'male',
        occupation: '대학생',
        personality: '순진하고 의심이 없음',
        appearance: '편한 복장',
        background: '당근마켓에서 노트북을 구매한 학생.',
        alibi: {
          location: '카페',
          time: '주말',
          activity: '판매자와 거래',
          witnesses: ['카페 직원'],
          hasHole: false
        },
        relationships: [],
        secrets: [],
        dialogues: [
          {
            topic: '거래',
            lines: ['시세보다 싸길래 샀어요.', '판매자가 중년 남자였어요.', '작업복 입고 계셨던 것 같아요.']
          },
          {
            topic: '노트북',
            lines: ['노트북 뒷면에 스티커 자국이 있긴 했어요.', '근데 저는 몰랐어요...']
          }
        ],
        nervousTriggers: []
      }
    ],

    evidence: [
      {
        id: 'evidence-market-listing',
        name: '당근마켓 판매 글',
        type: 'digital',
        description: '노트북 판매 게시글',
        detailedDescription: '"노트북 3대 급처. 개당 30만원. 직거래만." 사진에서 자산 스티커 떼어낸 흔적 확인.',
        location: '온라인',
        foundAt: '당근마켓',
        linkedCharacters: ['char-janitor'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-cctv-computer-room',
        name: '컴퓨터실 CCTV',
        type: 'digital',
        description: '주말 오전 컴퓨터실 출입 기록',
        detailedDescription: '이만수가 노트북 3대를 가방에 넣어 나가는 모습.',
        location: '컴퓨터실',
        foundAt: 'CCTV 녹화',
        linkedCharacters: ['char-janitor'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-asset-log',
        name: '자산 관리 대장',
        type: 'document',
        description: '학교 컴퓨터 자산 목록',
        detailedDescription: 'IT-2023-045, 046, 047번 노트북 분실 기록.',
        location: '정보실',
        foundAt: '자산 관리 서류',
        linkedCharacters: [],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-transaction',
        name: '거래 기록',
        type: 'digital',
        description: '당근마켓 판매자와 구매자 거래 내역',
        detailedDescription: '판매자 계정 "이만수52". 3대 판매 완료. 총 90만원.',
        location: '온라인',
        foundAt: '당근마켓 시스템',
        linkedCharacters: ['char-janitor', 'char-buyer'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      }
    ],

    locations: [
      {
        id: 'loc-computer-lab',
        name: '컴퓨터실',
        description: '학생들의 컴퓨터 수업 공간',
        atmosphere: '컴퓨터들이 정렬된 조용한 공간',
        objects: [
          {
            id: 'obj-empty-desk',
            name: '빈 책상',
            description: '노트북이 있어야 할 자리',
            examinationResult: '노트북 3대가 사라졌다.',
            containsEvidence: undefined
          }
        ],
        connectedTo: ['loc-corridor']
      }
    ],

    timeline: [
      { time: '지난주 금요일', event: '이만수, 주말 당직 자원', participants: ['char-janitor'], location: '학교', importance: 'major', isRevealed: false },
      { time: '주말 오전 10:00', event: '이만수, 컴퓨터실 입장', participants: ['char-janitor'], location: '컴퓨터실', importance: 'critical', isRevealed: false },
      { time: '주말 오전 10:30', event: '노트북 3대 절도', participants: ['char-janitor'], location: '컴퓨터실', importance: 'critical', isRevealed: false },
      { time: '주말 오후', event: '당근마켓에 판매 글 게시', participants: ['char-janitor'], location: '집', importance: 'major', isRevealed: false },
      { time: '주말 저녁', event: '노트북 3대 판매 완료', participants: ['char-janitor', 'char-buyer'], location: '카페', importance: 'major', isRevealed: false },
      { time: '월요일', event: '박정훈, 노트북 분실 발견', participants: ['char-it-manager'], location: '컴퓨터실', importance: 'major', isRevealed: true },
      { time: '화요일', event: '당근마켓에서 의심 물품 발견', participants: ['char-it-manager'], location: '온라인', importance: 'critical', isRevealed: true }
    ],

    solution: {
      summary: '청소 노동자 이만수가 생활비를 위해 주말에 학교 노트북 3대를 훔쳐 당근마켓에 팔았다.',
      detailedExplanation: [
        '이만수는 낮은 급여로 생활고에 시달렸다.',
        '컴퓨터실 열쇠를 가지고 있었다.',
        '주말 당직을 자원해 학교가 비는 시간을 노렸다.',
        '주말 오전, 아무도 없을 때 노트북 3대를 훔쳤다.',
        '자산 관리 스티커를 떼어내고 당근마켓에 올렸다.',
        '시세보다 저렴하게 판매해 총 90만원을 벌었다.'
      ],
      keyEvidence: ['evidence-cctv-computer-room', 'evidence-market-listing', 'evidence-transaction'],
      howToSolve: [
        'CCTV 출입 기록 확인',
        '당근마켓 판매자 계정 추적',
        '구매자 증언 확보',
        '주말 당직 근무자 조사'
      ],
      commonMistakes: [
        '학생들을 의심하는 것',
        '외부 침입으로 단정짓는 것'
      ]
    },

    deductionKeywords: {
      who: ['이만수', '청소 노동자', '당직'],
      why: ['생활비', '급여', '가난'],
      how: ['절도', '당근마켓', '판매'],
      when: ['주말', '오전'],
      where: ['컴퓨터실', '학교']
    },

    tags: ['절도', '당근마켓', '학교물품', '횡령'],
    author: 'DEDUCTIO Team',
    version: '1.0.0'
  },

  // ========================================
  // fraud-008: 가짜 봉사활동 시간
  // ========================================
  {
    id: 'fraud-008',
    title: '가짜 봉사활동 시간',
    subtitle: '하지도 않은 봉사 100시간',
    type: 'fraud',
    difficulty: 'easy',
    estimatedTime: 15,

    prologue: [
      '대입 생활기록부에 봉사시간은 중요하다.',
      '강민지는 100시간의 봉사활동을 기록했다.',
      '하지만 실제로는 한 번도 가지 않았다.'
    ],
    introduction: [
      '자원봉사센터에서 연락이 왔습니다.',
      '"강민지 학생이 우리 센터에서 100시간 봉사했다고요?"',
      '"저희 기록에는 그런 학생이 없는데요..."'
    ],
    setting: '청운고등학교 및 자원봉사센터',

    crimeTime: '지난 6개월',
    crimeLocation: '온라인 및 학교',
    culpritId: 'char-volunteer-student',
    victimId: undefined,
    motive: '생기부 스펙 쌓기',
    motiveDetail: '강민지는 대입을 위해 봉사시간이 필요했다. 실제로 봉사할 시간은 없었던 그녀는 봉사확인서를 위조하고 담당 교사의 직인을 몰래 사용했다.',
    method: '봉사확인서 위조 및 직인 도용',
    methodDetail: '강민지는 자원봉사센터 확인서 양식을 다운로드해 포토샵으로 수정했다. 담당 교사가 자리를 비운 사이 직인을 사용해 도장을 찍었다. 6개월간 총 100시간의 가짜 봉사시간을 만들었다.',

    characters: [
      {
        id: 'char-volunteer-student',
        name: '강민지',
        role: 'culprit',
        age: 18,
        gender: 'female',
        occupation: '3학년 학생',
        personality: '스펙 쌓기에 집착, 요령이 좋음',
        appearance: '깔끔한 교복, 자신감 있는 표정',
        background: '명문대 진학 준비. 모든 것을 스펙으로 계산.',
        alibi: {
          location: '학원',
          time: '봉사시간에',
          activity: '학원 수업',
          witnesses: ['학원 강사'],
          hasHole: true,
          holeDetail: '봉사 시간대에 학원 출석 기록'
        },
        motive: {
          type: 'greed',
          description: '생활기록부를 채워야 했다',
          strength: 2
        },
        relationships: [
          { targetId: 'char-volunteer-teacher', type: '담당교사-학생', description: '봉사 담당 교사' }
        ],
        secrets: [
          {
            id: 'secret-volunteer-1',
            content: '실제로는 봉사활동에 한 번도 참여하지 않았다',
            importance: 'critical',
            revealCondition: '자원봉사센터 확인'
          }
        ],
        dialogues: [
          {
            topic: '봉사',
            lines: ['네, 매주 토요일 양로원에서 봉사했어요.', '어르신들 정말 좋아하셨어요.']
          },
          {
            topic: '확인서',
            lines: ['확인서요? 봉사센터에서 받았어요.', '담당 선생님께 제출했고요.']
          }
        ],
        nervousTriggers: ['봉사센터', '확인', '직인', '학원']
      },
      {
        id: 'char-volunteer-teacher',
        name: '윤서연',
        role: 'witness',
        age: 35,
        gender: 'female',
        occupation: '창체 담당 교사',
        personality: '바쁘고 서류를 대충 확인하는 편',
        appearance: '정장, 피곤한 표정',
        background: '여러 업무를 담당해 바쁨.',
        alibi: {
          location: '교무실',
          time: '업무 시간',
          activity: '행정 업무',
          witnesses: ['동료 교사'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-volunteer-student', type: '담당교사-학생', description: '강민지 봉사 담당' }
        ],
        secrets: [],
        dialogues: [
          {
            topic: '확인서',
            lines: ['민지가 확인서를 가져와서 그냥 받았어요.', '직인이 찍혀있길래 진짜인 줄...']
          },
          {
            topic: '직인',
            lines: ['제 직인이 책상 서랍에 있는데...', '가끔 자리를 비우니까 누가 쓸 수도...']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-volunteer-center',
        name: '이경희',
        role: 'witness',
        age: 50,
        gender: 'female',
        occupation: '자원봉사센터 직원',
        personality: '꼼꼼하고 기록을 철저히 관리',
        appearance: '단정한 옷차림',
        background: '봉사자 기록을 체계적으로 관리.',
        alibi: {
          location: '봉사센터',
          time: '근무 시간',
          activity: '업무',
          witnesses: ['동료'],
          hasHole: false
        },
        relationships: [],
        secrets: [],
        dialogues: [
          {
            topic: '강민지',
            lines: ['강민지요? 저희 명단에 없는데요.', '100시간이라니... 한 번도 오지 않았어요.']
          },
          {
            topic: '확인서',
            lines: ['이 확인서... 양식은 맞는데 저희가 발급한 게 아니에요.', '센터장 서명도 위조된 것 같고요.']
          }
        ],
        nervousTriggers: []
      }
    ],

    evidence: [
      {
        id: 'evidence-fake-certificate',
        name: '위조 봉사확인서',
        type: 'document',
        description: '강민지가 제출한 봉사확인서',
        detailedDescription: '자원봉사센터 양식. 100시간 기재. 하지만 센터 기록에 없음.',
        location: '학교',
        foundAt: '창체 서류함',
        linkedCharacters: ['char-volunteer-student'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: true,
        analysisResult: '센터 확인 결과 위조 확인'
      },
      {
        id: 'evidence-center-record',
        name: '봉사센터 참여자 명단',
        type: 'document',
        description: '지난 6개월 봉사자 기록',
        detailedDescription: '강민지 이름 없음. 해당 시간대 다른 학생들만 기록됨.',
        location: '봉사센터',
        foundAt: '봉사센터 데이터베이스',
        linkedCharacters: [],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-academy-attendance',
        name: '학원 출석부',
        type: 'document',
        description: '강민지 학원 출석 기록',
        detailedDescription: '봉사 시간대에 학원 수업 참석. 매주 토요일 오전 10시~12시.',
        location: '학원',
        foundAt: '학원 출석 시스템',
        linkedCharacters: ['char-volunteer-student'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-seal-access',
        name: 'CCTV - 교무실',
        type: 'digital',
        description: '강민지가 윤서연 교사 자리에 접근한 기록',
        detailedDescription: '교사 부재 시 서랍을 열고 직인을 사용한 모습.',
        location: '교무실',
        foundAt: 'CCTV 녹화',
        linkedCharacters: ['char-volunteer-student'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      }
    ],

    locations: [
      {
        id: 'loc-teacher-office2',
        name: '교무실',
        description: '교사들의 업무 공간',
        atmosphere: '바쁘게 움직이는 교사들',
        objects: [
          {
            id: 'obj-seal',
            name: '윤서연 교사 서랍',
            description: '직인이 보관된 서랍',
            examinationResult: '직인이 누구나 쉽게 접근할 수 있는 곳에 있다.',
            containsEvidence: undefined
          }
        ],
        connectedTo: ['loc-corridor']
      },
      {
        id: 'loc-volunteer-center',
        name: '자원봉사센터',
        description: '지역 자원봉사 관리 기관',
        atmosphere: '따뜻하고 정돈된 사무실',
        objects: [
          {
            id: 'obj-database',
            name: '봉사자 데이터베이스',
            description: '봉사자 참여 기록',
            examinationResult: '강민지의 기록이 전혀 없다.',
            containsEvidence: 'evidence-center-record'
          }
        ],
        connectedTo: []
      }
    ],

    timeline: [
      { time: '6개월 전', event: '강민지, 봉사시간 필요성 인지', participants: ['char-volunteer-student'], location: '학교', importance: 'minor', isRevealed: true },
      { time: '5개월 전', event: '봉사확인서 양식 다운로드 및 위조 시작', participants: ['char-volunteer-student'], location: '집', importance: 'critical', isRevealed: false },
      { time: '4개월 전', event: '교무실에서 직인 몰래 사용', participants: ['char-volunteer-student'], location: '교무실', importance: 'critical', isRevealed: false },
      { time: '지난 6개월', event: '매주 토요일 학원 출석 (봉사 시간대)', participants: ['char-volunteer-student'], location: '학원', importance: 'major', isRevealed: false },
      { time: '1개월 전', event: '위조 확인서 담당 교사에게 제출', participants: ['char-volunteer-student', 'char-volunteer-teacher'], location: '교무실', importance: 'major', isRevealed: false },
      { time: '어제', event: '봉사센터에서 학교로 확인 전화', participants: ['char-volunteer-center'], location: '전화', importance: 'critical', isRevealed: true },
      { time: '오늘', event: '위조 사실 발각', participants: ['char-volunteer-teacher'], location: '학교', importance: 'critical', isRevealed: true }
    ],

    solution: {
      summary: '강민지가 생기부 스펙을 위해 봉사확인서를 위조하고 담당 교사의 직인을 도용했다.',
      detailedExplanation: [
        '강민지는 대입을 위해 봉사시간이 필요했다.',
        '실제 봉사할 시간은 없었다. 학원에 다녀야 했기 때문.',
        '인터넷에서 봉사확인서 양식을 다운로드했다.',
        '포토샵으로 100시간 봉사 기록을 위조했다.',
        '교사가 자리를 비운 사이 직인을 몰래 사용했다.',
        '담당 교사에게 제출했으나 센터 확인 전화로 발각되었다.'
      ],
      keyEvidence: ['evidence-fake-certificate', 'evidence-center-record', 'evidence-academy-attendance', 'evidence-seal-access'],
      howToSolve: [
        '봉사센터에 직접 확인',
        '해당 시간대 강민지 행적 조사',
        '직인 사용 기록 및 CCTV 확인',
        '학원 출석부 대조'
      ],
      commonMistakes: [
        '센터 기록 실수라고 생각하는 것',
        '다른 학생과 혼동되었다고 추측하는 것'
      ]
    },

    deductionKeywords: {
      who: ['강민지', '3학년', '학생'],
      why: ['생기부', '스펙', '대입'],
      how: ['위조', '직인 도용', '포토샵'],
      when: ['6개월간', '매주 토요일'],
      where: ['교무실', '집']
    },

    tags: ['봉사활동', '위조', '생기부', '직인도용'],
    author: 'DEDUCTIO Team',
    version: '1.0.0'
  }

  // 나머지 7개 사기 시나리오 추가 예정...
];
