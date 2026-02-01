// ========================================
// 협박 시나리오 10개 - 수작업 제작
// ========================================

import { Scenario } from './types';

export const blackmailScenarios: Scenario[] = [
  {
    id: 'blackmail-001',
    title: '익명의 편지',
    subtitle: '매일 아침 사물함에 도착하는 협박 편지',
    type: 'blackmail',
    difficulty: 'medium',
    estimatedTime: 20,

    prologue: [
      '"네 비밀을 안다. 매일 점심값을 내놓아라."',
      '학생회장 이수현의 사물함에 매일 도착하는 협박 편지.',
      '대체 누가, 무슨 비밀을 알고 있는 걸까?'
    ],
    introduction: [
      '학생회장 이수현이 떨리는 목소리로 찾아왔습니다.',
      '"일주일째 협박 편지가 와요. 비밀을 안다면서..."',
      '"누군지 모르겠어요. 도와주세요."'
    ],
    setting: '청운고등학교 전반',

    crimeTime: '07:30',
    crimeLocation: '복도 사물함',
    culpritId: 'char-classmate',
    victimId: 'char-president',
    motive: '학생회장 선거에서 진 분노와 복수',
    motiveDetail: '장민서는 학생회장 선거에서 이수현에게 졌다. 선거 과정에서 이수현이 자신의 공약을 훔쳤다고 확신하며, 그녀의 비밀을 이용해 복수하려 했다.',
    method: '익명 편지를 매일 아침 사물함에 투입',
    methodDetail: '장민서는 이수현이 교내 연애금지 규칙을 어기고 있다는 것을 알았다. 매일 아침 일찍 등교해 사물함에 협박 편지를 넣었다.',

    characters: [
      {
        id: 'char-president',
        name: '이수현',
        role: 'victim',
        age: 17,
        gender: 'female',
        occupation: '학생회장 / 2학년',
        personality: '책임감 있고 인기 많음, 하지만 비밀이 있음',
        appearance: '단정한 외모, 항상 웃는 얼굴',
        background: '지난 선거에서 당선된 학생회장. 모범생 이미지.',
        alibi: {
          location: '교실',
          time: '07:30',
          activity: '등교 전',
          witnesses: [],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-classmate', type: '선거 경쟁자', description: '선거에서 이겼지만 관계가 서먹함' },
          { targetId: 'char-boyfriend', type: '비밀 연인', description: '교내 연애금지를 어기고 사귀는 중', isSecret: true }
        ],
        secrets: [
          {
            id: 'secret-president-1',
            content: '3학년 선배와 몰래 사귀고 있다',
            importance: 'critical',
            revealCondition: '협박 내용 분석 후'
          }
        ],
        dialogues: [
          {
            topic: '협박',
            lines: ['이 편지들... "네 비밀을 안다"고만 해요.', '정확히 뭘 아는지도 안 써요. 그게 더 무서워요.']
          },
          {
            topic: '비밀',
            lines: ['...사실 숨기고 있는 게 있어요.', '말하기 어렵지만... 선배랑 사귀고 있어요.']
          }
        ],
        nervousTriggers: ['연애', '선배', '비밀']
      },
      {
        id: 'char-classmate',
        name: '장민서',
        role: 'culprit',
        age: 17,
        gender: 'female',
        occupation: '전 학생회장 후보 / 2학년',
        personality: '야망이 크고 승부욕 강함, 패배를 인정 못함',
        appearance: '날카로운 인상, 항상 긴장한 표정',
        background: '선거에서 이수현에게 패배. 결과에 불복.',
        alibi: {
          location: '교실',
          time: '07:30',
          activity: '일찍 등교해 자습 중이었다고 주장',
          witnesses: [],
          hasHole: true,
          holeDetail: '7시 반 전에 복도에서 목격됨'
        },
        motive: {
          type: 'revenge',
          description: '선거 패배에 대한 복수',
          strength: 3
        },
        relationships: [
          { targetId: 'char-president', type: '선거 경쟁자', description: '선거에서 졌고 원한이 있음' }
        ],
        secrets: [
          {
            id: 'secret-classmate-1',
            content: '이수현의 연애 사실을 우연히 알게 됐다',
            importance: 'critical',
            revealCondition: '증거 제시 후'
          }
        ],
        dialogues: [
          {
            topic: '이수현',
            lines: ['수현이? 그래, 학생회장 잘 하고 있더라.', '선거요? 뭐, 결과는 결과죠. 인정해요.']
          },
          {
            topic: '아침',
            lines: ['저는 항상 일찍 와요. 자습하려고.', '(떨리는 목소리) 복도요? 아, 화장실 갔나...'],
            requiresEvidence: ['evidence-witness-morning']
          }
        ],
        nervousTriggers: ['선거', '편지', '복도', '사물함']
      },
      {
        id: 'char-boyfriend',
        name: '김태우',
        role: 'suspect',
        age: 18,
        gender: 'male',
        occupation: '3학년 학생',
        personality: '과묵하고 신중함',
        appearance: '키가 크고 무뚝뚝한 인상',
        background: '이수현과 비밀리에 사귀는 중.',
        alibi: {
          location: '학교 정문',
          time: '07:30',
          activity: '등교 중',
          witnesses: ['친구'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-president', type: '비밀 연인', description: '이수현과 사귀는 중', isSecret: true }
        ],
        secrets: [],
        dialogues: [
          {
            topic: '이수현',
            lines: ['...수현이가 협박당하고 있다고요?', '(걱정스럽게) 제가 도울 일이 있을까요?']
          },
          {
            topic: '연애',
            lines: ['네... 사실 저희 사귀고 있어요.', '교칙 위반인 건 아는데... 우리 진심이에요.']
          }
        ],
        nervousTriggers: ['연애', '비밀', '교칙']
      },
      {
        id: 'char-witness-student',
        name: '박지민',
        role: 'witness',
        age: 17,
        gender: 'female',
        occupation: '2학년 학생',
        personality: '관찰력이 뛰어남',
        appearance: '평범한 외모',
        background: '이수현과 같은 반. 아침마다 일찍 등교.',
        alibi: {
          location: '교실',
          time: '07:30',
          activity: '자습 중',
          witnesses: [],
          hasHole: false
        },
        relationships: [],
        secrets: [
          {
            id: 'secret-witness-1',
            content: '장민서가 이수현 사물함 근처에서 뭔가 넣는 것을 봤다',
            importance: 'critical',
            revealCondition: '사물함 질문 시'
          }
        ],
        dialogues: [
          {
            topic: '아침',
            lines: ['저도 아침 일찍 와요. 조용해서 좋거든요.', '...근데 요즘 민서도 일찍 오더라고요. 이상하게.']
          },
          {
            topic: '목격',
            lines: ['사실... 민서가 수현이 사물함 쪽에서 뭔가 하는 거 봤어요.', '편지 같은 거 넣는 것 같았는데...']
          }
        ],
        nervousTriggers: []
      }
    ],

    evidence: [
      {
        id: 'evidence-letters',
        name: '협박 편지들',
        type: 'document',
        description: '7통의 협박 편지',
        detailedDescription: '동일한 프린터로 출력된 편지들. "네 비밀을 안다. 점심값을 내놓아라."',
        location: '이수현 사물함',
        foundAt: '이수현 소지',
        linkedCharacters: ['char-classmate'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: true,
        analysisResult: '컴퓨터실 3번 프린터에서 출력된 것으로 확인'
      },
      {
        id: 'evidence-printer-log',
        name: '프린터 사용 기록',
        type: 'digital',
        description: '컴퓨터실 3번 프린터 사용 기록',
        detailedDescription: '편지가 출력된 시간대에 장민서가 컴퓨터실을 사용한 기록.',
        location: '컴퓨터실',
        foundAt: '시스템 로그',
        linkedCharacters: ['char-classmate'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-witness-morning',
        name: '박지민 목격 증언',
        type: 'testimony',
        description: '장민서가 사물함 근처에서 뭔가 넣는 것을 목격',
        detailedDescription: '"민서가 수현이 사물함 쪽에서 뭔가 하는 거 봤어요. 편지 같은 거 넣는 것 같았어요."',
        location: '복도',
        foundAt: '박지민 인터뷰',
        linkedCharacters: ['char-classmate'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-motive-election',
        name: '선거 기록',
        type: 'document',
        description: '작년 학생회장 선거 결과',
        detailedDescription: '이수현 52%, 장민서 48%. 근소한 차이로 이수현 당선.',
        location: '학생회실',
        foundAt: '선거 문서',
        linkedCharacters: ['char-president', 'char-classmate'],
        isCritical: false,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-redherring-boyfriend',
        name: '김태우 의심 증언',
        type: 'testimony',
        description: '김태우가 이수현에게 화난 적 있다는 증언',
        detailedDescription: '"태우 오빠가 수현이한테 비밀 연애 공개하자고 했는데 거절당해서 싸웠대요."',
        location: '교실',
        foundAt: '학생 인터뷰',
        linkedCharacters: ['char-boyfriend'],
        isCritical: false,
        isRedHerring: true,
        redHerringReason: '김태우는 이수현을 진심으로 걱정하며 협박범이 아님',
        discoveryDifficulty: 1,
        analysisRequired: false
      }
    ],

    locations: [
      {
        id: 'loc-locker',
        name: '사물함 복도',
        description: '학생들의 사물함이 있는 복도',
        atmosphere: '아침마다 학생들로 붐비지만 이른 아침은 한산',
        objects: [
          {
            id: 'obj-locker-suhyun',
            name: '이수현 사물함',
            description: '협박 편지가 매일 도착하는 사물함',
            examinationResult: '자물쇠는 멀쩡. 틈으로 편지를 넣을 수 있음.',
            containsEvidence: 'evidence-letters'
          }
        ],
        connectedTo: ['loc-classroom', 'loc-computer']
      },
      {
        id: 'loc-computer',
        name: '컴퓨터실',
        description: '학생들이 과제를 하는 컴퓨터실',
        atmosphere: '모니터 불빛과 프린터 소리',
        objects: [
          {
            id: 'obj-printer',
            name: '3번 프린터',
            description: '협박 편지가 출력된 프린터',
            examinationResult: '최근 사용 기록을 확인할 수 있다.',
            containsEvidence: 'evidence-printer-log'
          }
        ],
        connectedTo: ['loc-locker']
      }
    ],

    timeline: [
      { time: '1주 전', event: '장민서, 이수현의 연애 사실을 우연히 목격', participants: ['char-classmate'], location: '학교 뒷산', importance: 'critical', isRevealed: false },
      { time: '6일 전', event: '첫 협박 편지 발송', participants: ['char-classmate'], location: '컴퓨터실', importance: 'major', isRevealed: false },
      { time: '매일 07:20', event: '장민서, 일찍 등교하여 편지 투입', participants: ['char-classmate'], location: '사물함', importance: 'critical', isRevealed: false },
      { time: '오늘 07:30', event: '박지민, 장민서의 수상한 행동 목격', participants: ['char-witness-student', 'char-classmate'], location: '복도', importance: 'critical', isRevealed: false },
      { time: '오늘 08:00', event: '이수현, 협박 사실 신고', participants: ['char-president'], location: '교무실', importance: 'major', isRevealed: true }
    ],

    solution: {
      summary: '장민서가 선거 패배의 복수로 이수현의 비밀 연애를 이용해 협박했다.',
      detailedExplanation: [
        '장민서는 학생회장 선거에서 이수현에게 근소한 차이로 졌다.',
        '선거 결과에 불복하며 복수를 다짐했다.',
        '우연히 이수현이 3학년 선배와 사귀는 것을 목격했다.',
        '교내 연애금지 규칙 위반을 이용해 협박하기로 결심.',
        '컴퓨터실에서 협박 편지를 출력해 매일 아침 사물함에 넣었다.',
        '점심값을 요구하며 괴롭혔다.'
      ],
      keyEvidence: ['evidence-letters', 'evidence-printer-log', 'evidence-witness-morning', 'evidence-motive-election'],
      howToSolve: [
        '편지가 어떻게 사물함에 들어갔는지 확인',
        '매일 아침 일찍 오는 사람 파악',
        '프린터 사용 기록 확인',
        '피해자와 갈등이 있는 사람 찾기'
      ],
      commonMistakes: [
        '남자친구 김태우를 의심하는 것',
        '외부인 소행으로 단정짓는 것'
      ]
    },

    deductionKeywords: {
      who: ['장민서', '선거', '후보'],
      why: ['복수', '선거', '패배', '분노'],
      how: ['편지', '프린터', '사물함'],
      when: ['아침', '7시 반', '매일'],
      where: ['사물함', '복도', '컴퓨터실']
    },

    tags: ['협박', '학생회', '선거', '비밀연애', '복수'],
    author: 'DEDUCTIO Team',
    version: '1.0.0'
  },
  {
    id: 'blackmail-002',
    title: 'SNS 사진 협박',
    subtitle: '몰래 찍힌 사진으로 돈을 요구하는 익명의 메시지',
    type: 'blackmail',
    difficulty: 'easy',
    estimatedTime: 15,

    prologue: [
      '"이 사진 학교에 퍼뜨려질래? 50만원 준비해."',
      '윤지혜의 스마트폰으로 온 익명의 메시지.',
      '첨부된 사진은... 몰래 찍힌 자신의 모습이었다.'
    ],
    introduction: [
      '윤지혜가 떨리는 손으로 스마트폰을 보여줍니다.',
      '"이 사진... 언제 찍힌 건지도 몰라요."',
      '"누가 날 미행한 건가요? 돈을 줘야 할까요?"'
    ],
    setting: '청운고등학교 및 주변',

    crimeTime: '19:30',
    crimeLocation: 'SNS 메신저',
    culpritId: 'char-photographer',
    victimId: 'char-jihye',
    motive: '금전적 이득과 질투심',
    motiveDetail: '최승민은 윤지혜가 부유한 집안 출신인 것을 알고 있었다. 또한 자신이 좋아하는 선배와 지혜가 친하게 지내는 것을 보고 질투심이 생겼다. 돈도 벌고 괴롭힐 수 있다는 생각에 사진을 찍기 시작했다.',
    method: 'SNS 익명 계정으로 협박 메시지 발송',
    methodDetail: '최승민은 일주일간 지혜를 몰래 따라다니며 사진을 찍었다. PC방에서 익명 계정을 만들어 협박 메시지를 보냈다.',

    characters: [
      {
        id: 'char-jihye',
        name: '윤지혜',
        role: 'victim',
        age: 17,
        gender: 'female',
        occupation: '2학년 학생',
        personality: '조용하고 내성적, 부유한 집안 출신',
        appearance: '단정한 옷차림, 늘 조심스러운 표정',
        background: '부모님이 사업가. 조용히 학교생활을 하려 노력.',
        alibi: {
          location: '집',
          time: '19:30',
          activity: '협박 메시지를 받음',
          witnesses: ['부모님'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-photographer', type: '같은 반', description: '별로 대화한 적 없음' },
          { targetId: 'char-senior-friend', type: '친구', description: '선배와 친하게 지냄' }
        ],
        secrets: [
          {
            id: 'secret-jihye-1',
            content: '사진 속에서 선배와 단둘이 카페에 있는 모습',
            importance: 'major',
            revealCondition: '사진 확인 시'
          }
        ],
        dialogues: [
          {
            topic: '협박',
            lines: ['어젯밤에 갑자기 왔어요. 익명이에요.', '사진이... 진짜 무서워요. 누가 날 따라다닌 거잖아요.']
          },
          {
            topic: '사진',
            lines: ['선배랑 카페에 있을 때 찍힌 것 같아요.', '하지만... 우린 그냥 친구예요. 오해받을까 봐 걱정돼요.']
          }
        ],
        nervousTriggers: ['사진', '돈', '미행']
      },
      {
        id: 'char-photographer',
        name: '최승민',
        role: 'culprit',
        age: 17,
        gender: 'male',
        occupation: '2학년 학생',
        personality: '조용하지만 집착적, 금전적 욕심이 있음',
        appearance: '평범한 외모, 늘 모자를 눌러쓰고 다님',
        background: '가정 형편이 어려움. 지혜를 질투함.',
        alibi: {
          location: 'PC방',
          time: '19:30',
          activity: '게임을 하고 있었다고 주장',
          witnesses: ['PC방 알바'],
          hasHole: true,
          holeDetail: 'PC방 CCTV에서 SNS 접속 화면이 잠깐 보임'
        },
        motive: {
          type: 'greed',
          description: '금전적 이득과 질투심',
          strength: 3
        },
        relationships: [
          { targetId: 'char-jihye', type: '같은 반', description: '질투심을 가지고 있음' },
          { targetId: 'char-senior-friend', type: '짝사랑', description: '좋아하지만 관심받지 못함' }
        ],
        secrets: [
          {
            id: 'secret-photographer-1',
            content: '일주일간 지혜를 미행하며 사진 촬영',
            importance: 'critical',
            revealCondition: '카메라 롤 확인 시'
          },
          {
            id: 'secret-photographer-2',
            content: 'PC방에서 익명 계정 생성',
            importance: 'critical',
            revealCondition: 'CCTV 분석 시'
          }
        ],
        dialogues: [
          {
            topic: '지혜',
            lines: ['지혜요? 같은 반인데 별로 안 친해요.', '...부잣집 애라던데. 좋겠네요.']
          },
          {
            topic: 'PC방',
            lines: ['어제 PC방 갔었어요. 게임하고 왔는데요.', '(당황하며) 뭐 하러 CCTV를 봐요? 전 게임만 했다고요!'],
            requiresEvidence: ['evidence-pc-cctv']
          }
        ],
        nervousTriggers: ['사진', 'PC방', '계정', '질투']
      },
      {
        id: 'char-senior-friend',
        name: '강동현',
        role: 'suspect',
        age: 18,
        gender: 'male',
        occupation: '3학년 학생',
        personality: '다정하고 친절함',
        appearance: '인기 많은 외모',
        background: '지혜와 친하게 지내는 선배.',
        alibi: {
          location: '도서관',
          time: '19:30',
          activity: '공부 중',
          witnesses: ['도서관 사서'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-jihye', type: '친구', description: '후배와 친하게 지냄' }
        ],
        secrets: [],
        dialogues: [
          {
            topic: '지혜',
            lines: ['지혜요? 착한 후배죠. 공부도 잘하고.', '우린 그냥 친구예요. 오해 마세요.']
          },
          {
            topic: '사진',
            lines: ['협박당하고 있다고요? 정말요?', '제가 도울 일이 있다면 말해주세요.']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-witness-pcroom',
        name: '이한솔',
        role: 'witness',
        age: 22,
        gender: 'male',
        occupation: 'PC방 알바생',
        personality: '무심한 듯하지만 관찰력 좋음',
        appearance: '피곤한 얼굴',
        background: 'PC방에서 밤 알바 중.',
        alibi: {
          location: 'PC방',
          time: '19:30',
          activity: '근무 중',
          witnesses: [],
          hasHole: false
        },
        relationships: [],
        secrets: [
          {
            id: 'secret-witness-pc-1',
            content: '최승민이 게임이 아닌 SNS를 하는 걸 봤다',
            importance: 'critical',
            revealCondition: 'PC방 질문 시'
          }
        ],
        dialogues: [
          {
            topic: '최승민',
            lines: ['아, 그 애요? 어제 왔었어요.', '근데... 게임하는 척하면서 SNS 켜놓은 것 같던데요?']
          },
          {
            topic: 'CCTV',
            lines: ['네, CCTV 있어요. 확인하실래요?', '자리 위치도 기억나요. 구석 자리 썼어요.']
          }
        ],
        nervousTriggers: []
      }
    ],

    evidence: [
      {
        id: 'evidence-threat-message',
        name: '협박 메시지',
        type: 'digital',
        description: '익명 계정에서 온 협박 메시지와 사진',
        detailedDescription: '"이 사진 학교에 퍼뜨려질래? 50만원 준비해. 내일 지시할게." 첨부된 사진: 지혜가 선배와 카페에 있는 모습.',
        location: 'SNS 메신저',
        foundAt: '지혜 스마트폰',
        linkedCharacters: ['char-photographer'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: true,
        analysisResult: '사진의 메타데이터 분석 결과 일주일 전 촬영'
      },
      {
        id: 'evidence-photo-metadata',
        name: '사진 메타데이터',
        type: 'digital',
        description: '사진 파일의 상세 정보',
        detailedDescription: '촬영 일시, 위치 정보 등. 일주일간 다양한 장소에서 촬영됨.',
        location: '디지털 분석',
        foundAt: '사진 파일 분석',
        linkedCharacters: ['char-photographer'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: true,
        analysisResult: '동일한 기기에서 촬영된 사진들'
      },
      {
        id: 'evidence-pc-cctv',
        name: 'PC방 CCTV',
        type: 'digital',
        description: 'PC방 보안 카메라 영상',
        detailedDescription: '최승민이 19:15~19:45 사이 PC방에 있었음. 화면에 SNS가 잠깐 보임.',
        location: 'PC방',
        foundAt: 'PC방 CCTV',
        linkedCharacters: ['char-photographer'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-camera-roll',
        name: '최승민 카메라 롤',
        type: 'digital',
        description: '최승민 스마트폰의 사진첩',
        detailedDescription: '지혜를 몰래 찍은 수십 장의 사진. 날짜와 위치 정보가 일치.',
        location: '최승민 스마트폰',
        foundAt: '압수 수색',
        linkedCharacters: ['char-photographer'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      },
      {
        id: 'evidence-motive-jealousy',
        name: '질투 일기',
        type: 'document',
        description: '최승민의 일기장',
        detailedDescription: '"오늘도 동현 선배는 지혜한테만 웃어줬다. 부잣집 애라고 다냐? 돈도 많고... 불공평해."',
        location: '최승민 가방',
        foundAt: '최승민 소지품',
        linkedCharacters: ['char-photographer'],
        isCritical: false,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      }
    ],

    locations: [
      {
        id: 'loc-pcroom',
        name: 'PC방',
        description: '학교 근처 PC방',
        atmosphere: '어두운 조명과 게임 소리가 가득',
        objects: [
          {
            id: 'obj-pc-corner',
            name: '구석 자리 PC',
            description: '최승민이 사용한 자리',
            examinationResult: 'SNS 접속 기록과 익명 계정 생성 흔적 발견.',
            containsEvidence: 'evidence-pc-cctv'
          }
        ],
        connectedTo: ['loc-school', 'loc-cafe']
      },
      {
        id: 'loc-cafe',
        name: '학교 앞 카페',
        description: '학생들이 자주 가는 카페',
        atmosphere: '아늑하고 조용한 분위기',
        objects: [
          {
            id: 'obj-cafe-table',
            name: '창가 테이블',
            description: '사진이 찍힌 장소',
            examinationResult: '밖에서도 안이 잘 보이는 위치.',
            containsEvidence: undefined
          }
        ],
        connectedTo: ['loc-school']
      },
      {
        id: 'loc-school',
        name: '학교',
        description: '청운고등학교',
        atmosphere: '일상적인 학교 풍경',
        objects: [],
        connectedTo: ['loc-pcroom', 'loc-cafe']
      }
    ],

    timeline: [
      { time: '1주 전', event: '최승민, 지혜와 선배의 친밀함을 보고 질투', participants: ['char-photographer'], location: '학교', importance: 'major', isRevealed: false },
      { time: '6일 전~1일 전', event: '최승민, 지혜를 미행하며 사진 촬영', participants: ['char-photographer', 'char-jihye'], location: '여러 장소', importance: 'critical', isRevealed: false },
      { time: '어제 19:15', event: '최승민, PC방에서 익명 계정 생성', participants: ['char-photographer'], location: 'PC방', importance: 'critical', isRevealed: false },
      { time: '어제 19:30', event: '협박 메시지 발송', participants: ['char-photographer'], location: 'PC방', importance: 'critical', isRevealed: false },
      { time: '오늘 09:00', event: '지혜, 협박 사실 신고', participants: ['char-jihye'], location: '교무실', importance: 'major', isRevealed: true }
    ],

    solution: {
      summary: '최승민이 금전적 욕심과 질투심으로 지혜를 미행해 사진을 찍고 협박했다.',
      detailedExplanation: [
        '최승민은 좋아하는 선배가 지혜와 친하게 지내는 것을 질투했다.',
        '지혜가 부유한 집안 출신인 것을 알고 돈을 뜯어내기로 결심했다.',
        '일주일간 지혜를 미행하며 오해받을 만한 사진들을 촬영했다.',
        'PC방에서 익명 계정을 만들어 협박 메시지를 보냈다.',
        '50만원을 요구하며 사진을 퍼뜨리겠다고 협박했다.'
      ],
      keyEvidence: ['evidence-threat-message', 'evidence-pc-cctv', 'evidence-camera-roll', 'evidence-motive-jealousy'],
      howToSolve: [
        '협박 메시지와 사진의 출처 추적',
        'PC방 CCTV 확인으로 범인 특정',
        '최승민의 스마트폰에서 동일한 사진 발견',
        '동기 파악: 질투심과 금전적 욕심'
      ],
      commonMistakes: [
        '선배 강동현을 의심하는 것',
        '외부인 소행으로 생각하는 것'
      ]
    },

    deductionKeywords: {
      who: ['최승민', '같은 반', '질투'],
      why: ['돈', '질투', '선배'],
      how: ['사진', '미행', 'PC방', 'SNS'],
      when: ['일주일', '어제 저녁'],
      where: ['PC방', '카페', '학교']
    },

    tags: ['협박', 'SNS', '사진', '미행', '질투', '금전'],
    author: 'DEDUCTIO',
    version: '1.0'
  },
  {
    id: 'blackmail-003',
    title: '컨닝의 대가',
    subtitle: '시험 부정행위 목격 후 시작된 협박',
    type: 'blackmail',
    difficulty: 'medium',
    estimatedTime: 18,

    prologue: [
      '"네가 컨닝한 거 다 봤어. 선생님한테 말할까?"',
      '중간고사 이후 배준호에게 온 문자메시지.',
      '목격자는 대가를 요구하기 시작했다.'
    ],
    introduction: [
      '배준호가 창백한 얼굴로 찾아왔습니다.',
      '"시험 때 컨닝한 걸 누가 봤대요. 계속 심부름 시켜요."',
      '"이러다 끝이 없을 것 같아요. 도와주세요."'
    ],
    setting: '청운고등학교',

    crimeTime: '14:30',
    crimeLocation: '교실',
    culpritId: 'char-witness-exam',
    victimId: 'char-junho',
    motive: '권력 욕구와 우월감',
    motiveDetail: '정다은은 평소 배준호가 공부도 못하면서 잘난 척한다고 생각했다. 시험 중 컨닝하는 것을 목격하고, 이를 이용해 준호를 자신의 심부름꾼으로 만들어 우월감을 느끼고 싶었다.',
    method: '컨닝 목격 사실로 지속적인 심부름 요구',
    methodDetail: '정다은은 시험 중 뒷자리에서 준호가 옆 친구 답안지를 보는 것을 목격했다. 시험 다음 날부터 문자로 협박하며 숙제 대신 해주기, 물건 사오기 등을 요구했다.',

    characters: [
      {
        id: 'char-junho',
        name: '배준호',
        role: 'victim',
        age: 17,
        gender: 'male',
        occupation: '2학년 학생',
        personality: '외향적이지만 공부는 못함, 최근 스트레스받음',
        appearance: '운동선수 체격, 피곤한 표정',
        background: '운동부 소속. 성적 때문에 고민 중.',
        alibi: {
          location: '운동장',
          time: '14:30',
          activity: '체육 수업',
          witnesses: ['체육 선생님', '친구들'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-witness-exam', type: '같은 반', description: '최근 관계가 이상해짐' },
          { targetId: 'char-exam-friend', type: '친구', description: '옆자리 친구' }
        ],
        secrets: [
          {
            id: 'secret-junho-1',
            content: '중간고사 때 옆 친구 답안지를 보고 컨닝했다',
            importance: 'critical',
            revealCondition: '추궁 시 자백'
          }
        ],
        dialogues: [
          {
            topic: '협박',
            lines: ['시험 다음 날부터 시작됐어요. "컨닝 봤다"고...', '처음엔 숙제만 시켰는데, 이젠 매일 뭐라도 시켜요.']
          },
          {
            topic: '컨닝',
            lines: ['...사실이에요. 제가 잘못했어요.', '성적 때문에 너무 스트레스받아서... 변명의 여지가 없어요.']
          }
        ],
        nervousTriggers: ['시험', '컨닝', '부정행위']
      },
      {
        id: 'char-witness-exam',
        name: '정다은',
        role: 'culprit',
        age: 17,
        gender: 'female',
        occupation: '2학년 학생',
        personality: '똑똑하지만 지배욕이 강함, 우월감을 즐김',
        appearance: '깔끔한 외모, 냉소적인 미소',
        background: '성적 우수. 준호의 뒷자리에 앉음.',
        alibi: {
          location: '도서관',
          time: '14:30',
          activity: '자습 중',
          witnesses: [],
          hasHole: false
        },
        motive: {
          type: 'jealousy',
          description: '지배욕과 우월감',
          strength: 2
        },
        relationships: [
          { targetId: 'char-junho', type: '같은 반', description: '뒷자리에 앉으며 평소 무시함' }
        ],
        secrets: [
          {
            id: 'secret-daeun-1',
            content: '시험 중 준호의 컨닝을 목격했다',
            importance: 'critical',
            revealCondition: '좌석 배치 확인 시'
          },
          {
            id: 'secret-daeun-2',
            content: '준호에게 매일 심부름을 시키며 즐거워함',
            importance: 'major',
            revealCondition: '문자 기록 확인 시'
          }
        ],
        dialogues: [
          {
            topic: '준호',
            lines: ['준호요? 같은 반이에요. 별로 안 친해요.', '(비웃으며) 공부는 못해도 인기는 많더라고요.']
          },
          {
            topic: '시험',
            lines: ['저는 시험 잘 봤어요. 준비 많이 했거든요.', '(긴장하며) 뒷자리요? 네... 준호 앞자리였어요.'],
            requiresEvidence: ['evidence-seat-chart']
          }
        ],
        nervousTriggers: ['목격', '뒷자리', '협박', '문자']
      },
      {
        id: 'char-exam-friend',
        name: '최민재',
        role: 'suspect',
        age: 17,
        gender: 'male',
        occupation: '2학년 학생',
        personality: '성실하고 착함',
        appearance: '안경 쓴 모범생',
        background: '준호의 옆자리 친구. 공부 잘함.',
        alibi: {
          location: '교실',
          time: '14:30',
          activity: '쉬는 시간',
          witnesses: ['반 친구들'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-junho', type: '친구', description: '옆자리 친구' }
        ],
        secrets: [
          {
            id: 'secret-minjae-1',
            content: '시험 중 준호가 자기 답안지를 본 것을 알고 있음',
            importance: 'major',
            revealCondition: '시험 상황 질문 시'
          }
        ],
        dialogues: [
          {
            topic: '시험',
            lines: ['시험이요? 잘 봤어요.', '...준호가 뭔가 이상하긴 했어요. 자꾸 제 쪽을 보더라고요.']
          },
          {
            topic: '준호',
            lines: ['준호는 좋은 친구예요. 요즘 힘들어 보여요.', '제가 도와줄 수 있으면 좋겠어요.']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-teacher',
        name: '김선생님',
        role: 'witness',
        age: 35,
        gender: 'female',
        occupation: '담임 교사',
        personality: '엄격하지만 공정함',
        appearance: '카리스마 있는 외모',
        background: '부정행위에 대해 엄격한 원칙.',
        alibi: {
          location: '교무실',
          time: '14:30',
          activity: '업무 중',
          witnesses: [],
          hasHole: false
        },
        relationships: [],
        secrets: [
          {
            id: 'secret-teacher-1',
            content: '시험 감독 중 약간 의심스러운 점을 봤으나 확실하지 않아 넘어갔음',
            importance: 'minor',
            revealCondition: '시험 감독 질문 시'
          }
        ],
        dialogues: [
          {
            topic: '시험',
            lines: ['시험 감독은 제가 했어요.', '부정행위요? 확실히 본 건 없어요. 하지만...']
          },
          {
            topic: '준호',
            lines: ['준호는 운동은 잘하는데 공부는 힘들어하죠.', '요즘 더 힘들어 보이긴 해요.']
          }
        ],
        nervousTriggers: []
      }
    ],

    evidence: [
      {
        id: 'evidence-threat-texts',
        name: '협박 문자 기록',
        type: 'digital',
        description: '정다은이 보낸 협박성 문자들',
        detailedDescription: '"컨닝한 거 다 봤어. 오늘 내 숙제 해와." "편의점 가서 음료수 사와. 안 그러면 선생님한테 말할 거야."',
        location: 'SNS 메신저',
        foundAt: '준호 스마트폰',
        linkedCharacters: ['char-witness-exam'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-seat-chart',
        name: '시험 좌석 배치도',
        type: 'document',
        description: '중간고사 시험 좌석 배치',
        detailedDescription: '준호 옆자리: 최민재, 뒷자리: 정다은. 다은의 위치에서 준호의 행동이 잘 보임.',
        location: '교무실',
        foundAt: '시험 기록',
        linkedCharacters: ['char-witness-exam', 'char-junho'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-errand-list',
        name: '심부름 목록',
        type: 'document',
        description: '준호가 받은 심부름 목록',
        detailedDescription: '숙제 대신하기 3회, 물건 사오기 5회, 청소 대신하기 2회 등. 모두 정다은의 요구.',
        location: '준호 노트',
        foundAt: '준호 소지품',
        linkedCharacters: ['char-witness-exam'],
        isCritical: false,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-exam-paper',
        name: '시험지 분석',
        type: 'document',
        description: '준호와 민재의 시험지 비교',
        detailedDescription: '준호와 민재의 답안이 매우 유사. 틀린 문제까지 같은 오답.',
        location: '교무실',
        foundAt: '시험지 보관함',
        linkedCharacters: ['char-junho', 'char-exam-friend'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: true,
        analysisResult: '컨닝 증거 명백'
      },
      {
        id: 'evidence-diary',
        name: '정다은 일기',
        type: 'document',
        description: '정다은의 개인 일기장',
        detailedDescription: '"준호가 컨닝하는 거 봤다. ㅋㅋ 이걸로 맘대로 부릴 수 있겠네. 얼마나 버틸까?"',
        location: '정다은 사물함',
        foundAt: '압수 수색',
        linkedCharacters: ['char-witness-exam'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      }
    ],

    locations: [
      {
        id: 'loc-classroom',
        name: '교실',
        description: '2학년 교실',
        atmosphere: '시험의 긴장감이 남아있는 공간',
        objects: [
          {
            id: 'obj-junho-seat',
            name: '준호 자리',
            description: '시험 때 앉았던 자리',
            examinationResult: '옆자리(민재)의 답안지가 잘 보이는 위치.',
            containsEvidence: undefined
          },
          {
            id: 'obj-daeun-seat',
            name: '다은 자리',
            description: '준호 바로 뒤',
            examinationResult: '준호의 행동을 관찰하기 좋은 위치.',
            containsEvidence: 'evidence-seat-chart'
          }
        ],
        connectedTo: ['loc-hallway', 'loc-staff-room']
      },
      {
        id: 'loc-staff-room',
        name: '교무실',
        description: '교사들의 업무 공간',
        atmosphere: '서류와 시험지가 가득',
        objects: [
          {
            id: 'obj-exam-storage',
            name: '시험지 보관함',
            description: '채점된 시험지 보관',
            examinationResult: '준호와 민재의 답안이 거의 일치.',
            containsEvidence: 'evidence-exam-paper'
          }
        ],
        connectedTo: ['loc-classroom']
      },
      {
        id: 'loc-hallway',
        name: '복도',
        description: '교실 앞 복도',
        atmosphere: '학생들이 오가는 공간',
        objects: [],
        connectedTo: ['loc-classroom']
      }
    ],

    timeline: [
      { time: '1주 전', event: '중간고사 실시', participants: ['char-junho', 'char-witness-exam', 'char-exam-friend'], location: '교실', importance: 'critical', isRevealed: true },
      { time: '1주 전 14:30', event: '정다은, 준호의 컨닝 목격', participants: ['char-witness-exam', 'char-junho'], location: '교실', importance: 'critical', isRevealed: false },
      { time: '6일 전', event: '첫 협박 문자 발송', participants: ['char-witness-exam'], location: '교실', importance: 'major', isRevealed: false },
      { time: '5일 전~오늘', event: '지속적인 심부름 요구', participants: ['char-witness-exam', 'char-junho'], location: '여러 장소', importance: 'major', isRevealed: true },
      { time: '오늘 10:00', event: '준호, 협박 사실 신고', participants: ['char-junho'], location: '교무실', importance: 'major', isRevealed: true }
    ],

    solution: {
      summary: '정다은이 시험 중 준호의 컨닝을 목격하고, 이를 이용해 권력을 행사하며 협박했다.',
      detailedExplanation: [
        '중간고사에서 정다은은 준호 바로 뒷자리에 앉았다.',
        '시험 중 준호가 옆 친구 민재의 답안지를 보는 것을 목격했다.',
        '시험 다음 날부터 문자로 협박을 시작했다.',
        '준호를 자신의 심부름꾼으로 만들어 우월감을 즐겼다.',
        '숙제, 청소, 심부름 등을 계속 요구했다.'
      ],
      keyEvidence: ['evidence-threat-texts', 'evidence-seat-chart', 'evidence-exam-paper', 'evidence-diary'],
      howToSolve: [
        '협박 문자의 발신자 확인',
        '시험 좌석 배치 분석',
        '시험지 비교로 컨닝 확인',
        '정다은의 일기에서 동기 발견'
      ],
      commonMistakes: [
        '옆자리 민재를 의심하는 것',
        '선생님이 공범이라 생각하는 것'
      ]
    },

    deductionKeywords: {
      who: ['정다은', '뒷자리', '목격자'],
      why: ['지배욕', '우월감', '권력'],
      how: ['컨닝', '목격', '문자'],
      when: ['시험', '다음 날'],
      where: ['교실', '뒷자리']
    },

    tags: ['협박', '시험', '컨닝', '부정행위', '학교'],
    author: 'DEDUCTIO',
    version: '1.0'
  },
  {
    id: 'blackmail-004',
    title: '묻힌 과거',
    subtitle: '중학교 때 학폭 가해 사실을 알고 있는 누군가',
    type: 'blackmail',
    difficulty: 'hard',
    estimatedTime: 25,

    prologue: [
      '"중학교 때 네가 한 짓 기억나? 이제 대가를 치를 시간이야."',
      '학생회 부회장 한지우에게 온 익명의 이메일.',
      '그가 잊고 싶었던 과거가 다시 돌아왔다.'
    ],
    introduction: [
      '한지우가 떨리는 목소리로 이메일을 보여줍니다.',
      '"중학교 때... 제가 잘못한 일이 있어요."',
      '"그 일을 아는 사람은 없을 텐데... 대체 누가..."'
    ],
    setting: '청운고등학교',

    crimeTime: '22:00',
    crimeLocation: '이메일',
    culpritId: 'char-victim-past',
    victimId: 'char-jiwoo',
    motive: '과거 피해에 대한 복수',
    motiveDetail: '임서연은 중학교 때 한지우에게 심한 괴롭힘을 당했다. 전학을 가야 할 정도로 힘들었다. 우연히 지우가 같은 학교에 다니는 것을 알고, 과거의 상처를 갚기 위해 협박을 시작했다.',
    method: '익명 이메일로 과거 사실 폭로 협박',
    methodDetail: '임서연은 학교 근처 공용 와이파이를 이용해 익명 이메일 계정을 만들었다. 중학교 때의 증거 사진과 함께 협박 이메일을 보내며, 학교와 SNS에 폭로하겠다고 위협했다.',

    characters: [
      {
        id: 'char-jiwoo',
        name: '한지우',
        role: 'victim',
        age: 17,
        gender: 'male',
        occupation: '학생회 부회장 / 2학년',
        personality: '책임감 있고 성실함, 하지만 어두운 과거가 있음',
        appearance: '단정하고 모범생 같은 외모',
        background: '중학교 때 학폭 가해자였으나 반성하고 새로운 삶을 살고 있음.',
        alibi: {
          location: '집',
          time: '22:00',
          activity: '협박 이메일 받음',
          witnesses: ['가족'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-victim-past', type: '과거 가해-피해', description: '중학교 때 괴롭힘', isSecret: true }
        ],
        secrets: [
          {
            id: 'secret-jiwoo-1',
            content: '중학교 때 임서연을 괴롭혀 전학 보낸 과거',
            importance: 'critical',
            revealCondition: '추궁 시 자백'
          },
          {
            id: 'secret-jiwoo-2',
            content: '과거를 후회하며 상담 치료를 받고 있음',
            importance: 'major',
            revealCondition: '상담 기록 발견 시'
          }
        ],
        dialogues: [
          {
            topic: '협박',
            lines: ['어젯밤에 이메일이 왔어요. 제 과거를...', '누가 알고 있는지 모르겠어요. 무서워요.']
          },
          {
            topic: '과거',
            lines: ['...중학교 때 저는 최악이었어요.', '한 친구를 괴롭혔어요. 그 애는 결국 전학 갔고...', '평생 후회하고 있어요. 변하려고 노력했어요.']
          }
        ],
        nervousTriggers: ['중학교', '과거', '학폭', '전학']
      },
      {
        id: 'char-victim-past',
        name: '임서연',
        role: 'culprit',
        age: 17,
        gender: 'female',
        occupation: '1학년 학생 (전학생)',
        personality: '조용하지만 복수심에 사로잡혀 있음',
        appearance: '수줍은 외모, 눈빛이 날카로움',
        background: '중학교 때 지우에게 괴롭힘 당해 전학. 최근 이 학교로 전학옴.',
        alibi: {
          location: '도서관',
          time: '22:00',
          activity: '공부 중이었다고 주장',
          witnesses: [],
          hasHole: true,
          holeDetail: '도서관은 21시에 문을 닫음'
        },
        motive: {
          type: 'revenge',
          description: '과거 괴롭힘에 대한 복수',
          strength: 3
        },
        relationships: [
          { targetId: 'char-jiwoo', type: '과거 피해-가해', description: '중학교 때 괴롭힘 당함', isSecret: true }
        ],
        secrets: [
          {
            id: 'secret-seoyeon-1',
            content: '중학교 때 한지우에게 심한 괴롭힘을 당했다',
            importance: 'critical',
            revealCondition: '전학 기록 확인 시'
          },
          {
            id: 'secret-seoyeon-2',
            content: '우연히 지우가 같은 학교에 있는 것을 알고 복수 계획',
            importance: 'critical',
            revealCondition: '이메일 추적 시'
          },
          {
            id: 'secret-seoyeon-3',
            content: '심리 상담 기록에 복수 욕구가 기록되어 있음',
            importance: 'major',
            revealCondition: '상담 기록 확인 시'
          }
        ],
        dialogues: [
          {
            topic: '전학',
            lines: ['이번 학기에 전학 왔어요.', '새로운 시작이라고 생각했는데...']
          },
          {
            topic: '한지우',
            lines: ['(긴장하며) 한지우요? 학생회 부회장이죠?', '...잘은 모르는데요.'],
            requiresEvidence: ['evidence-past-record']
          },
          {
            topic: '과거',
            lines: ['(눈물을 글썽이며) 중학교 때... 힘들었어요.', '괴롭힘 당해서 전학 갔어요. 그 상처가 아직도...'],
            requiresEvidence: ['evidence-transfer-record']
          }
        ],
        nervousTriggers: ['중학교', '괴롭힘', '한지우', '복수']
      },
      {
        id: 'char-counselor',
        name: '박상담선생님',
        role: 'witness',
        age: 40,
        gender: 'female',
        occupation: '학교 상담사',
        personality: '따뜻하지만 비밀 엄수 원칙',
        appearance: '온화한 인상',
        background: '학생들의 고민을 상담하는 전문가.',
        alibi: {
          location: '상담실',
          time: '22:00',
          activity: '퇴근 후',
          witnesses: [],
          hasHole: false
        },
        relationships: [],
        secrets: [
          {
            id: 'secret-counselor-1',
            content: '한지우가 과거 학폭 가해를 후회하며 상담받고 있음',
            importance: 'major',
            revealCondition: '비밀 해제 요청 시'
          },
          {
            id: 'secret-counselor-2',
            content: '임서연도 상담을 받았는데 복수 욕구를 표현한 적 있음',
            importance: 'critical',
            revealCondition: '비밀 해제 요청 시'
          }
        ],
        dialogues: [
          {
            topic: '한지우',
            lines: ['지우 학생이요? 성실한 학생이죠.', '상담 내용은... 말씀드리기 어렵네요.']
          },
          {
            topic: '임서연',
            lines: ['서연 학생도 상담받고 있어요.', '(고민하다) 특별한 경우라면... 말씀드려야 할 것 같네요.']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-friend',
        name: '송민호',
        role: 'suspect',
        age: 17,
        gender: 'male',
        occupation: '2학년 학생',
        personality: '정의감 강함',
        appearance: '건장한 체격',
        background: '지우의 친한 친구.',
        alibi: {
          location: '집',
          time: '22:00',
          activity: '게임 중',
          witnesses: ['온라인 친구들'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-jiwoo', type: '절친', description: '지우의 가장 친한 친구' }
        ],
        secrets: [
          {
            id: 'secret-minho-1',
            content: '지우의 과거를 알고 있지만 변했다고 믿음',
            importance: 'minor',
            revealCondition: '지우 과거 질문 시'
          }
        ],
        dialogues: [
          {
            topic: '한지우',
            lines: ['지우는 제 절친이에요. 좋은 친구죠.', '과거요? ...알고 있어요. 하지만 지금은 완전히 달라요.']
          },
          {
            topic: '협박',
            lines: ['누가 지우를 협박한다고요?', '용서할 수 없네요. 제가 도와드릴게요.']
          }
        ],
        nervousTriggers: []
      }
    ],

    evidence: [
      {
        id: 'evidence-threat-email',
        name: '협박 이메일',
        type: 'digital',
        description: '익명 이메일 계정에서 온 협박',
        detailedDescription: '"중학교 때 네가 한 짓 기억나? 임서연을 괴롭혀서 전학 보낸 거. 증거도 다 있어. 학교와 SNS에 폭로할까?" 첨부: 중학교 때 사진들.',
        location: '이메일',
        foundAt: '지우 이메일',
        linkedCharacters: ['char-victim-past'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: true,
        analysisResult: '학교 근처 카페 와이파이에서 발송'
      },
      {
        id: 'evidence-past-record',
        name: '중학교 학폭 기록',
        type: 'document',
        description: '지우의 중학교 생활기록부',
        detailedDescription: '학교폭력 가해 사실 기재. 피해자: 임서연. 조치: 특별교육 이수.',
        location: '중학교 기록',
        foundAt: '교육청 자료',
        linkedCharacters: ['char-jiwoo', 'char-victim-past'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-transfer-record',
        name: '전학 기록',
        type: 'document',
        description: '임서연의 전학 이력',
        detailedDescription: '중학교 2학년 때 A중학교(지우와 같은 학교)에서 전학. 사유: 학교 부적응. 최근 청운고등학교로 전학옴.',
        location: '교무실',
        foundAt: '학적부',
        linkedCharacters: ['char-victim-past'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-counseling-record',
        name: '상담 기록',
        type: 'document',
        description: '임서연과 한지우의 상담 기록',
        detailedDescription: '서연: "과거 괴롭힘 트라우마. 가해자에 대한 분노와 복수 욕구 표현." 지우: "과거 학폭 가해 깊이 후회. 속죄하고 싶어 함."',
        location: '상담실',
        foundAt: '상담사 제공',
        linkedCharacters: ['char-victim-past', 'char-jiwoo'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      },
      {
        id: 'evidence-wifi-log',
        name: '카페 와이파이 로그',
        type: 'digital',
        description: '학교 앞 카페 와이파이 접속 기록',
        detailedDescription: '협박 이메일 발송 시각에 임서연의 스마트폰이 접속한 기록.',
        location: '카페',
        foundAt: '카페 시스템',
        linkedCharacters: ['char-victim-past'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: true,
        analysisResult: '임서연의 기기 MAC 주소 확인'
      }
    ],

    locations: [
      {
        id: 'loc-cafe-school',
        name: '학교 앞 카페',
        description: '학생들이 자주 가는 카페',
        atmosphere: '공부하는 학생들로 붐빔',
        objects: [
          {
            id: 'obj-wifi',
            name: '공용 와이파이',
            description: '누구나 사용 가능한 와이파이',
            examinationResult: '접속 기록 확인 가능. 협박 이메일 발송 시각에 임서연 접속.',
            containsEvidence: 'evidence-wifi-log'
          }
        ],
        connectedTo: ['loc-school']
      },
      {
        id: 'loc-counseling-room',
        name: '상담실',
        description: '학교 상담실',
        atmosphere: '조용하고 편안한 분위기',
        objects: [
          {
            id: 'obj-records',
            name: '상담 기록 파일',
            description: '학생들의 상담 내용',
            examinationResult: '서연과 지우의 상담 기록 발견.',
            containsEvidence: 'evidence-counseling-record'
          }
        ],
        connectedTo: ['loc-school']
      },
      {
        id: 'loc-school',
        name: '학교',
        description: '청운고등학교',
        atmosphere: '평범한 학교 풍경',
        objects: [],
        connectedTo: ['loc-cafe-school', 'loc-counseling-room']
      }
    ],

    timeline: [
      { time: '4년 전', event: '한지우, 임서연을 괴롭힘', participants: ['char-jiwoo', 'char-victim-past'], location: 'A중학교', importance: 'critical', isRevealed: false },
      { time: '3년 전', event: '임서연, 전학', participants: ['char-victim-past'], location: 'A중학교', importance: 'major', isRevealed: false },
      { time: '이번 학기', event: '임서연, 청운고등학교로 전학', participants: ['char-victim-past'], location: '청운고등학교', importance: 'major', isRevealed: true },
      { time: '2주 전', event: '임서연, 우연히 지우 발견하고 복수 결심', participants: ['char-victim-past'], location: '학교', importance: 'critical', isRevealed: false },
      { time: '어제 21:50', event: '임서연, 카페에서 협박 이메일 발송', participants: ['char-victim-past'], location: '카페', importance: 'critical', isRevealed: false },
      { time: '어제 22:00', event: '한지우, 협박 이메일 수신', participants: ['char-jiwoo'], location: '집', importance: 'major', isRevealed: true },
      { time: '오늘 09:00', event: '한지우, 협박 사실 신고', participants: ['char-jiwoo'], location: '교무실', importance: 'major', isRevealed: true }
    ],

    solution: {
      summary: '임서연이 중학교 때 괴롭힘 당한 과거를 복수하기 위해 한지우를 협박했다.',
      detailedExplanation: [
        '4년 전, 한지우는 중학교에서 임서연을 심하게 괴롭혔다.',
        '서연은 견디지 못하고 전학을 갔다.',
        '이번 학기 서연은 우연히 청운고로 전학 왔고, 지우를 발견했다.',
        '과거의 상처와 복수심에 사로잡혀 협박을 계획했다.',
        '카페 와이파이를 이용해 익명 이메일을 보내 과거를 폭로하겠다고 위협했다.',
        '지우가 학생회 부회장으로 성공한 모습을 보고 더 큰 분노를 느꼈다.'
      ],
      keyEvidence: ['evidence-threat-email', 'evidence-past-record', 'evidence-transfer-record', 'evidence-counseling-record', 'evidence-wifi-log'],
      howToSolve: [
        '이메일 발송 위치 추적',
        '중학교 기록 확인',
        '전학생 명단 확인',
        '상담 기록에서 복수 욕구 발견',
        '카페 와이파이 로그 분석'
      ],
      commonMistakes: [
        '친구 송민호를 의심하는 것',
        '현재 학교 관계에서만 동기를 찾는 것',
        '과거 기록을 확인하지 않는 것'
      ]
    },

    deductionKeywords: {
      who: ['임서연', '전학생', '피해자'],
      why: ['복수', '괴롭힘', '과거', '트라우마'],
      how: ['이메일', '와이파이', '익명'],
      when: ['어제 밤', '22시'],
      where: ['카페', '와이파이']
    },

    tags: ['협박', '학폭', '복수', '과거', '트라우마', '전학'],
    author: 'DEDUCTIO',
    version: '1.0'
  },
  {
    id: 'blackmail-005',
    title: '금지된 관계',
    subtitle: '선생님과 학생의 부적절한 관계 목격',
    type: 'blackmail',
    difficulty: 'hard',
    estimatedTime: 22,

    prologue: [
      '"그 선생님과 네 관계... 학교에 알려질 수밖에 없겠네."',
      '3학년 이유진에게 온 익명의 쪽지.',
      '누군가 그녀의 가장 큰 비밀을 알고 있다.'
    ],
    introduction: [
      '이유진이 떨리는 손으로 쪽지를 보여줍니다.',
      '"제 비밀을... 어떻게 알았는지 모르겠어요."',
      '"이게 알려지면 모든 게 끝나요. 도와주세요."'
    ],
    setting: '청운고등학교',

    crimeTime: '18:00',
    crimeLocation: '사물함',
    culpritId: 'char-classmate-jealous',
    victimId: 'char-yujin',
    motive: '질투와 경쟁심',
    motiveDetail: '박수진은 같은 반 이유진이 선생님에게 특별 대우를 받는 것을 질투했다. 우연히 유진과 담임 선생님이 친밀하게 대화하는 것을 목격하고, 의심하기 시작했다. 확신을 얻은 후, 이를 이용해 유진을 괴롭히고 싶었다.',
    method: '익명 쪽지로 협박하며 요구사항 전달',
    methodDetail: '박수진은 유진과 선생님의 관계를 확인한 후, 익명으로 쪽지를 써서 사물함에 넣었다. 처음엔 암시만 했지만, 점점 구체적인 요구를 하기 시작했다.',

    characters: [
      {
        id: 'char-yujin',
        name: '이유진',
        role: 'victim',
        age: 18,
        gender: 'female',
        occupation: '3학년 학생',
        personality: '성숙하고 조용함, 비밀을 안고 있음',
        appearance: '차분한 인상, 최근 불안해 보임',
        background: '우수한 학생. 담임 선생님과 복잡한 관계.',
        alibi: {
          location: '학원',
          time: '18:00',
          activity: '수업 중',
          witnesses: ['학원 선생님'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-teacher-inappropriate', type: '부적절한 관계', description: '담임 선생님과 경계를 넘은 관계', isSecret: true },
          { targetId: 'char-classmate-jealous', type: '같은 반', description: '별로 친하지 않음' }
        ],
        secrets: [
          {
            id: 'secret-yujin-1',
            content: '담임 선생님과 부적절한 관계를 맺고 있음',
            importance: 'critical',
            revealCondition: '추궁 시 자백'
          },
          {
            id: 'secret-yujin-2',
            content: '관계를 끊으려 하지만 선생님이 거부함',
            importance: 'major',
            revealCondition: '문자 기록 확인 시'
          }
        ],
        dialogues: [
          {
            topic: '협박',
            lines: ['일주일 전부터 쪽지가 와요. 제 비밀을 안다고...', '처음엔 애매했는데, 이젠 너무 구체적이에요.']
          },
          {
            topic: '비밀',
            lines: ['(눈물을 글썽이며) ...담임 선생님과... 선을 넘었어요.', '제가 먼저 좋아했지만... 이건 잘못된 거예요.', '끊으려고 했는데... 안 돼요.']
          }
        ],
        nervousTriggers: ['선생님', '관계', '비밀', '쪽지']
      },
      {
        id: 'char-classmate-jealous',
        name: '박수진',
        role: 'culprit',
        age: 18,
        gender: 'female',
        occupation: '3학년 학생',
        personality: '경쟁심 강하고 질투심 많음',
        appearance: '날카로운 눈매',
        background: '유진과 같은 반. 선생님의 관심을 받고 싶어 함.',
        alibi: {
          location: '학교',
          time: '18:00',
          activity: '자율학습 중',
          witnesses: ['친구들'],
          hasHole: true,
          holeDetail: '17:50경 사물함 복도에서 목격됨'
        },
        motive: {
          type: 'jealousy',
          description: '질투와 경쟁심',
          strength: 3
        },
        relationships: [
          { targetId: 'char-yujin', type: '같은 반', description: '질투하며 미워함' },
          { targetId: 'char-teacher-inappropriate', type: '학생-교사', description: '선생님의 관심을 받고 싶어 함' }
        ],
        secrets: [
          {
            id: 'secret-sujin-1',
            content: '유진과 선생님의 관계를 목격했다',
            importance: 'critical',
            revealCondition: 'CCTV 확인 시'
          },
          {
            id: 'secret-sujin-2',
            content: '쪽지 필적이 수진의 것과 일치',
            importance: 'critical',
            revealCondition: '필적 감정 시'
          }
        ],
        dialogues: [
          {
            topic: '유진',
            lines: ['유진이요? 공부 잘하죠.', '(비꼬며) 선생님한테 특별 대우 받는 것 같더라고요.']
          },
          {
            topic: '사물함',
            lines: ['저녁 6시요? 교실에 있었어요.', '(당황하며) 복도요? ...화장실 갔다 왔나 봐요.'],
            requiresEvidence: ['evidence-cctv-hallway']
          }
        ],
        nervousTriggers: ['쪽지', '목격', '필적', '질투']
      },
      {
        id: 'char-teacher-inappropriate',
        name: '최민수 선생님',
        role: 'suspect',
        age: 32,
        gender: 'male',
        occupation: '국어 교사 (3학년 담임)',
        personality: '카리스마 있지만 경계 의식 부족',
        appearance: '젊고 인기 많은 외모',
        background: '학생들에게 인기 많은 선생님.',
        alibi: {
          location: '교무실',
          time: '18:00',
          activity: '업무 중',
          witnesses: ['다른 교사들'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-yujin', type: '부적절한 관계', description: '학생과 선을 넘은 관계', isSecret: true }
        ],
        secrets: [
          {
            id: 'secret-teacher-1',
            content: '이유진과 부적절한 관계를 맺고 있음',
            importance: 'critical',
            revealCondition: '문자 기록 확인 시'
          },
          {
            id: 'secret-teacher-2',
            content: '관계를 끊으려는 유진을 설득하려 함',
            importance: 'major',
            revealCondition: '문자 내용 분석 시'
          }
        ],
        dialogues: [
          {
            topic: '유진',
            lines: ['이유진은... 우수한 학생입니다.', '(불편해하며) 다른 학생들과 똑같이 대합니다.']
          },
          {
            topic: '관계',
            lines: ['(긴장하며) 무슨 말씀이신지...', '...인정합니다. 제가 잘못했습니다.'],
            requiresEvidence: ['evidence-text-messages']
          }
        ],
        nervousTriggers: ['관계', '부적절', '유진']
      },
      {
        id: 'char-witness-janitor',
        name: '김경비',
        role: 'witness',
        age: 55,
        gender: 'male',
        occupation: '학교 경비',
        personality: '과묵하지만 관찰력 좋음',
        appearance: '무뚝뚝한 인상',
        background: '학교 경비. CCTV 관리.',
        alibi: {
          location: '경비실',
          time: '18:00',
          activity: '근무 중',
          witnesses: [],
          hasHole: false
        },
        relationships: [],
        secrets: [
          {
            id: 'secret-janitor-1',
            content: 'CCTV에서 박수진이 사물함에 쪽지 넣는 것을 봤다',
            importance: 'critical',
            revealCondition: 'CCTV 확인 요청 시'
          },
          {
            id: 'secret-janitor-2',
            content: '여러 번 유진과 선생님이 늦게까지 단둘이 있는 것을 목격',
            importance: 'major',
            revealCondition: '목격 여부 질문 시'
          }
        ],
        dialogues: [
          {
            topic: 'CCTV',
            lines: ['네, CCTV 있습니다. 확인해보시죠.', '17시 50분경에... 박수진 학생이 사물함 쪽에 있더군요.']
          },
          {
            topic: '목격',
            lines: ['이유진 학생이요? 성실한 학생이죠.', '...가끔 선생님과 늦게까지 남아있더라고요. 좀 이상하긴 했습니다.']
          }
        ],
        nervousTriggers: []
      }
    ],

    evidence: [
      {
        id: 'evidence-threat-notes',
        name: '협박 쪽지들',
        type: 'document',
        description: '5통의 익명 쪽지',
        detailedDescription: '"선생님과 네 관계... 특별하네." "이걸 학교가 알면 어떻게 될까?" "내 말 들어. 안 그러면..."',
        location: '유진 사물함',
        foundAt: '유진 소지',
        linkedCharacters: ['char-classmate-jealous'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: true,
        analysisResult: '필적 감정 결과 박수진의 글씨와 일치'
      },
      {
        id: 'evidence-cctv-hallway',
        name: '복도 CCTV',
        type: 'digital',
        description: '사물함 복도 보안 카메라',
        detailedDescription: '17:50경 박수진이 유진 사물함에 쪽지를 넣는 장면 포착.',
        location: '복도',
        foundAt: '경비실 CCTV',
        linkedCharacters: ['char-classmate-jealous'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-text-messages',
        name: '문자 메시지 기록',
        type: 'digital',
        description: '유진과 선생님의 문자',
        detailedDescription: '유진: "이제 그만해요. 이건 잘못된 거예요." 선생님: "우리 감정은 진짜야. 조금만 기다려." 등 부적절한 내용.',
        location: '스마트폰',
        foundAt: '유진 스마트폰',
        linkedCharacters: ['char-yujin', 'char-teacher-inappropriate'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-witness-testimony',
        name: '경비 증언',
        type: 'testimony',
        description: '김경비의 목격 증언',
        detailedDescription: '"여러 번 봤습니다. 유진 학생과 최 선생님이 늦게까지 단둘이 교실에 남아있는 걸요. 부적절해 보였습니다."',
        location: '경비실',
        foundAt: '경비 인터뷰',
        linkedCharacters: ['char-yujin', 'char-teacher-inappropriate'],
        isCritical: false,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-diary',
        name: '박수진 일기',
        type: 'document',
        description: '수진의 개인 일기장',
        detailedDescription: '"유진이만 특별 대우 받아. 불공평해. 오늘 둘이 있는 거 봤어. 확실해. 이걸 이용할 수 있을 것 같아."',
        location: '수진 가방',
        foundAt: '수진 소지품',
        linkedCharacters: ['char-classmate-jealous'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      }
    ],

    locations: [
      {
        id: 'loc-locker-hallway',
        name: '사물함 복도',
        description: '3학년 사물함이 있는 복도',
        atmosphere: '저녁이면 한산해지는 공간',
        objects: [
          {
            id: 'obj-yujin-locker',
            name: '유진 사물함',
            description: '협박 쪽지가 들어오는 사물함',
            examinationResult: '쪽지를 넣을 수 있는 틈이 있음.',
            containsEvidence: 'evidence-threat-notes'
          },
          {
            id: 'obj-cctv',
            name: 'CCTV 카메라',
            description: '복도를 감시하는 카메라',
            examinationResult: '수진이 쪽지 넣는 장면 포착.',
            containsEvidence: 'evidence-cctv-hallway'
          }
        ],
        connectedTo: ['loc-classroom-3', 'loc-security']
      },
      {
        id: 'loc-classroom-3',
        name: '3학년 교실',
        description: '유진과 수진의 교실',
        atmosphere: '자율학습 시간의 조용한 분위기',
        objects: [],
        connectedTo: ['loc-locker-hallway', 'loc-staff-room']
      },
      {
        id: 'loc-security',
        name: '경비실',
        description: '학교 경비실',
        atmosphere: 'CCTV 모니터가 여러 개',
        objects: [
          {
            id: 'obj-monitors',
            name: 'CCTV 모니터',
            description: '학교 전체를 감시',
            examinationResult: '복도 영상 확인 가능.',
            containsEvidence: 'evidence-cctv-hallway'
          }
        ],
        connectedTo: ['loc-locker-hallway']
      },
      {
        id: 'loc-staff-room',
        name: '교무실',
        description: '교사들의 업무 공간',
        atmosphere: '선생님들이 근무 중',
        objects: [],
        connectedTo: ['loc-classroom-3']
      }
    ],

    timeline: [
      { time: '1개월 전', event: '유진과 선생님, 부적절한 관계 시작', participants: ['char-yujin', 'char-teacher-inappropriate'], location: '학교', importance: 'critical', isRevealed: false },
      { time: '2주 전', event: '박수진, 둘의 관계를 목격하고 의심', participants: ['char-classmate-jealous'], location: '교실', importance: 'major', isRevealed: false },
      { time: '1주 전', event: '수진, 확신을 얻고 첫 쪽지 발송', participants: ['char-classmate-jealous'], location: '사물함', importance: 'critical', isRevealed: false },
      { time: '3일 전', event: '유진, 선생님에게 관계 끊자고 제안', participants: ['char-yujin', 'char-teacher-inappropriate'], location: '교실', importance: 'major', isRevealed: false },
      { time: '어제 17:50', event: '수진, 사물함에 쪽지 투입 (CCTV 포착)', participants: ['char-classmate-jealous'], location: '복도', importance: 'critical', isRevealed: false },
      { time: '오늘 08:00', event: '유진, 협박 사실 신고', participants: ['char-yujin'], location: '교무실', importance: 'major', isRevealed: true }
    ],

    solution: {
      summary: '박수진이 유진과 선생님의 부적절한 관계를 질투하여 협박했다.',
      detailedExplanation: [
        '박수진은 같은 반 유진이 담임 선생님에게 특별 대우를 받는 것을 질투했다.',
        '우연히 둘이 늦게까지 단둘이 있는 것을 목격하고 의심하기 시작했다.',
        '확신을 얻은 후, 익명 쪽지로 협박을 시작했다.',
        '처음엔 암시만 했지만 점점 구체적으로 요구하기 시작했다.',
        'CCTV에 사물함에 쪽지를 넣는 장면이 포착되었다.',
        '필적 감정 결과 수진의 글씨와 일치했다.'
      ],
      keyEvidence: ['evidence-threat-notes', 'evidence-cctv-hallway', 'evidence-diary', 'evidence-text-messages'],
      howToSolve: [
        'CCTV로 쪽지를 넣는 사람 확인',
        '필적 감정으로 범인 특정',
        '수진의 일기에서 동기 확인',
        '유진과 선생님의 문자로 협박 내용 확인'
      ],
      commonMistakes: [
        '선생님을 범인으로 의심하는 것',
        '부적절한 관계에만 집중하고 협박범을 놓치는 것'
      ]
    },

    deductionKeywords: {
      who: ['박수진', '같은 반', '질투'],
      why: ['질투', '경쟁', '특별 대우'],
      how: ['쪽지', '사물함', '목격'],
      when: ['일주일 전', '저녁'],
      where: ['사물함', '복도']
    },

    tags: ['협박', '부적절한 관계', '질투', '학교', '선생님'],
    author: 'DEDUCTIO',
    version: '1.0'
  },
  {
    id: 'blackmail-006',
    title: '가족의 비밀',
    subtitle: '아버지의 외도 사실을 알고 있는 누군가',
    type: 'blackmail',
    difficulty: 'medium',
    estimatedTime: 18,

    prologue: [
      '"네 아버지의 비밀... 어머니가 아시면 어떻게 될까?"',
      '고등학생 정우혁에게 온 익명의 문자.',
      '가족의 수치스러운 비밀이 누군가에게 발각됐다.'
    ],
    introduction: [
      '정우혁이 창백한 얼굴로 찾아왔습니다.',
      '"제 아버지 일을... 누군가 알고 있어요."',
      '"가족을 위해... 이 일을 해결해야 해요."'
    ],
    setting: '청운고등학교와 주변 지역',

    crimeTime: '15:30',
    crimeLocation: '학교 앞 카페',
    culpritId: 'char-private-detective',
    victimId: 'char-woohyuk',
    motive: '금전적 이득',
    motiveDetail: '사설 탐정 김철수는 우혁의 어머니로부터 의뢰를 받아 남편의 외도를 조사하던 중, 아들인 우혁이 이 사실을 모른다는 것을 알았다. 추가 수익을 얻기 위해 우혁을 직접 협박하기로 결심했다.',
    method: '익명 문자로 협박하며 돈 요구',
    methodDetail: '김철수는 선불폰을 이용해 우혁에게 문자를 보냈다. 증거 사진을 첨부하며 돈을 요구했고, 학교 앞 카페에서 만나자고 했다.',

    characters: [
      {
        id: 'char-woohyuk',
        name: '정우혁',
        role: 'victim',
        age: 17,
        gender: 'male',
        occupation: '2학년 학생',
        personality: '책임감 강하고 가족을 아낌',
        appearance: '침착한 외모, 최근 스트레스 받은 표정',
        background: '평범한 학생. 가정에 충실.',
        alibi: {
          location: '학교',
          time: '15:30',
          activity: '수업 중',
          witnesses: ['선생님, 친구들'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-private-detective', type: '모름', description: '범인을 알지 못함' },
          { targetId: 'char-father', type: '아들-아버지', description: '복잡한 감정' }
        ],
        secrets: [
          {
            id: 'secret-woohyuk-1',
            content: '아버지의 외도 사실을 최근에 알게 됨',
            importance: 'critical',
            revealCondition: '협박 내용 확인 시'
          }
        ],
        dialogues: [
          {
            topic: '협박',
            lines: ['문자로 왔어요. "네 아버지의 비밀을 안다"고...', '사진도 첨부돼 있었어요. 아버지가... 다른 여자와...']
          },
          {
            topic: '가족',
            lines: ['어머니는 아직 모르세요.', '이게 알려지면 우리 가족이 무너져요.']
          }
        ],
        nervousTriggers: ['아버지', '외도', '가족', '비밀']
      },
      {
        id: 'char-private-detective',
        name: '김철수',
        role: 'culprit',
        age: 42,
        gender: 'male',
        occupation: '사설 탐정',
        personality: '냉소적이고 돈에 집착함',
        appearance: '평범한 중년 남성',
        background: '사설 탐정 사무소 운영.',
        alibi: {
          location: '카페',
          time: '15:30',
          activity: '대기 중이었다고 주장',
          witnesses: [],
          hasHole: true,
          holeDetail: '선불폰 구매 기록 발견'
        },
        motive: {
          type: 'greed',
          description: '금전적 이득',
          strength: 3
        },
        relationships: [
          { targetId: 'char-woohyuk', type: '협박자-피해자', description: '우혁을 협박함' },
          { targetId: 'char-mother', type: '의뢰인-탐정', description: '우혁 어머니의 의뢰를 받음' }
        ],
        secrets: [
          {
            id: 'secret-detective-1',
            content: '우혁의 어머니로부터 의뢰를 받았음',
            importance: 'critical',
            revealCondition: '의뢰 기록 확인 시'
          },
          {
            id: 'secret-detective-2',
            content: '선불폰으로 협박 문자 발송',
            importance: 'critical',
            revealCondition: '전화 기록 추적 시'
          }
        ],
        dialogues: [
          {
            topic: '의뢰',
            lines: ['네, 정씨 부인의 의뢰를 받았습니다.', '남편 외도 조사였죠.']
          },
          {
            topic: '협박',
            lines: ['(당황하며) 협박이라니요? 증거가 있습니까?', '...인정합니다. 돈이 필요했어요.'],
            requiresEvidence: ['evidence-prepaid-phone']
          }
        ],
        nervousTriggers: ['선불폰', '문자', '협박', '돈']
      },
      {
        id: 'char-father',
        name: '정민호',
        role: 'suspect',
        age: 45,
        gender: 'male',
        occupation: '회사원',
        personality: '죄책감에 시달림',
        appearance: '피곤해 보이는 중년 남성',
        background: '우혁의 아버지. 외도 중.',
        alibi: {
          location: '회사',
          time: '15:30',
          activity: '업무 중',
          witnesses: ['동료들'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-woohyuk', type: '아버지-아들', description: '죄책감으로 대하기 힘듦' }
        ],
        secrets: [
          {
            id: 'secret-father-1',
            content: '6개월 전부터 외도 중',
            importance: 'critical',
            revealCondition: '탐정 보고서 확인 시'
          }
        ],
        dialogues: [
          {
            topic: '외도',
            lines: ['(고개 숙이며) ...사실입니다.', '가족에게 미안합니다.']
          }
        ],
        nervousTriggers: ['외도', '비밀', '가족']
      },
      {
        id: 'char-mother',
        name: '김수연',
        role: 'witness',
        age: 43,
        gender: 'female',
        occupation: '주부',
        personality: '의심 많고 불안함',
        appearance: '지친 표정의 여성',
        background: '우혁의 어머니. 남편을 의심함.',
        alibi: {
          location: '집',
          time: '15:30',
          activity: '집안일',
          witnesses: [],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-private-detective', type: '의뢰인-탐정', description: '남편 조사 의뢰' }
        ],
        secrets: [
          {
            id: 'secret-mother-1',
            content: '사설 탐정에게 남편 조사 의뢰',
            importance: 'major',
            revealCondition: '계약서 확인 시'
          }
        ],
        dialogues: [
          {
            topic: '의뢰',
            lines: ['남편이 이상해서... 탐정을 고용했어요.', '우혁이는 몰라요. 알면 충격받을까봐...']
          }
        ],
        nervousTriggers: ['외도', '탐정', '남편']
      }
    ],

    evidence: [
      {
        id: 'evidence-threat-text',
        name: '협박 문자',
        type: 'digital',
        description: '익명의 협박 문자',
        detailedDescription: '"네 아버지의 비밀을 안다. 100만원 준비해라. 학교 앞 카페에서 기다린다." + 외도 현장 사진',
        location: '스마트폰',
        foundAt: '우혁 스마트폰',
        linkedCharacters: ['char-private-detective'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: true,
        analysisResult: '선불폰에서 발송됨'
      },
      {
        id: 'evidence-prepaid-phone',
        name: '선불폰 구매 기록',
        type: 'document',
        description: '편의점 선불폰 구매 영수증',
        detailedDescription: '김철수의 신용카드로 구매한 선불폰 영수증. 협박 문자 발송 시각과 일치.',
        location: '편의점',
        foundAt: 'CCTV 및 영수증',
        linkedCharacters: ['char-private-detective'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      },
      {
        id: 'evidence-detective-contract',
        name: '탐정 의뢰 계약서',
        type: 'document',
        description: '사설 탐정 의뢰 계약서',
        detailedDescription: '김수연이 김철수에게 남편 외도 조사를 의뢰한 계약서. 우혁 아버지 정민호가 조사 대상.',
        location: '탐정 사무소',
        foundAt: '사무소 파일',
        linkedCharacters: ['char-mother', 'char-private-detective'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-affair-photos',
        name: '외도 증거 사진',
        type: 'physical',
        description: '정민호의 외도 현장 사진',
        detailedDescription: '탐정이 촬영한 외도 현장 사진들. 협박 문자에 첨부된 사진과 동일.',
        location: '탐정 사무소',
        foundAt: '사무소 파일',
        linkedCharacters: ['char-father', 'char-private-detective'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-cafe-cctv',
        name: '카페 CCTV',
        type: 'digital',
        description: '학교 앞 카페 보안 카메라',
        detailedDescription: '김철수가 15시부터 카페에서 대기하는 장면 포착.',
        location: '카페',
        foundAt: '카페 CCTV',
        linkedCharacters: ['char-private-detective'],
        isCritical: false,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      }
    ],

    locations: [
      {
        id: 'loc-school-cafe',
        name: '학교 앞 카페',
        description: '학생들이 자주 가는 카페',
        atmosphere: '시끄럽고 붐비는 공간',
        objects: [
          {
            id: 'obj-cafe-cctv',
            name: 'CCTV',
            description: '카페 보안 카메라',
            examinationResult: '김철수가 오랫동안 대기한 모습 포착.',
            containsEvidence: 'evidence-cafe-cctv'
          }
        ],
        connectedTo: ['loc-school', 'loc-convenience-store']
      },
      {
        id: 'loc-detective-office',
        name: '탐정 사무소',
        description: '김철수의 사설 탐정 사무소',
        atmosphere: '어둡고 좁은 공간',
        objects: [
          {
            id: 'obj-case-files',
            name: '사건 파일',
            description: '의뢰 건들의 기록',
            examinationResult: '김수연의 의뢰 계약서와 외도 증거 사진 발견.',
            containsEvidence: 'evidence-detective-contract'
          }
        ],
        connectedTo: ['loc-school-cafe']
      },
      {
        id: 'loc-convenience-store',
        name: '편의점',
        description: '학교 근처 편의점',
        atmosphere: '24시간 영업',
        objects: [
          {
            id: 'obj-receipt',
            name: '구매 영수증',
            description: '선불폰 구매 기록',
            examinationResult: '김철수의 카드로 선불폰 구매 확인.',
            containsEvidence: 'evidence-prepaid-phone'
          }
        ],
        connectedTo: ['loc-school-cafe']
      }
    ],

    timeline: [
      { time: '6개월 전', event: '정민호, 외도 시작', participants: ['char-father'], location: '미상', importance: 'major', isRevealed: false },
      { time: '1개월 전', event: '김수연, 탐정에게 남편 조사 의뢰', participants: ['char-mother', 'char-private-detective'], location: '탐정 사무소', importance: 'critical', isRevealed: false },
      { time: '2주 전', event: '김철수, 외도 증거 확보', participants: ['char-private-detective'], location: '미상', importance: 'critical', isRevealed: false },
      { time: '3일 전', event: '김철수, 선불폰 구매', participants: ['char-private-detective'], location: '편의점', importance: 'critical', isRevealed: false },
      { time: '어제 20:00', event: '우혁에게 협박 문자 발송', participants: ['char-private-detective'], location: '미상', importance: 'critical', isRevealed: false },
      { time: '오늘 09:00', event: '우혁, 협박 사실 신고', participants: ['char-woohyuk'], location: '학교', importance: 'major', isRevealed: true }
    ],

    solution: {
      summary: '사설 탐정 김철수가 의뢰인의 아들을 협박해 추가 수익을 얻으려 했다.',
      detailedExplanation: [
        '김철수는 우혁의 어머니로부터 남편 외도 조사를 의뢰받았다.',
        '조사 중 우혁이 아버지의 외도 사실을 모른다는 것을 알았다.',
        '탐정은 탐욕에 눈이 멀어 우혁을 직접 협박하기로 결심했다.',
        '선불폰을 구매해 익명으로 협박 문자를 보냈다.',
        '외도 증거 사진을 첨부하며 100만원을 요구했다.',
        '선불폰 구매 기록과 탐정 계약서로 범인이 특정되었다.'
      ],
      keyEvidence: ['evidence-threat-text', 'evidence-prepaid-phone', 'evidence-detective-contract', 'evidence-affair-photos'],
      howToSolve: [
        '협박 문자 분석으로 선불폰 확인',
        '선불폰 구매 기록 추적',
        '탐정 사무소에서 의뢰 계약서 발견',
        '외도 사진과 협박 문자 사진 대조'
      ],
      commonMistakes: [
        '아버지를 범인으로 의심하는 것',
        '선불폰 추적을 포기하는 것'
      ]
    },

    deductionKeywords: {
      who: ['김철수', '탐정', '의뢰받은 사람'],
      why: ['탐욕', '돈', '추가 수익'],
      how: ['선불폰', '문자', '협박'],
      when: ['어제 밤', '20시'],
      where: ['미상', '선불폰']
    },

    tags: ['협박', '외도', '탐정', '가족', '돈'],
    author: 'DEDUCTIO',
    version: '1.0'
  },
  {
    id: 'blackmail-007',
    title: '게임 아이템 빚',
    subtitle: '온라인 게임 거래 사기로 인한 협박',
    type: 'blackmail',
    difficulty: 'easy',
    estimatedTime: 15,

    prologue: [
      '"아이템 값 200만원 내일까지 안 갚으면 부모님한테 다 말한다."',
      '고등학생 박지훈에게 온 협박 메시지.',
      '게임에서 시작된 문제가 현실로 번졌다.'
    ],
    introduction: [
      '박지훈이 떨리는 목소리로 말합니다.',
      '"게임 아이템 거래하다가... 사기 당했어요."',
      '"이제 협박까지 받고 있어요. 도와주세요."'
    ],
    setting: '청운고등학교',

    crimeTime: '22:00',
    crimeLocation: '온라인',
    culpritId: 'char-scammer',
    victimId: 'char-jihoon',
    motive: '게임 아이템 사기 후 추가 금전 갈취',
    motiveDetail: '온라인 게임 아이템 거래 사기꾼 이동현은 박지훈에게 고가 아이템을 판매한 후 아이템을 주지 않고 잠적했다. 지훈이 환불을 요구하자, 오히려 더 많은 돈을 요구하며 협박하기 시작했다.',
    method: '게임 메신저와 카카오톡으로 협박',
    methodDetail: '이동현은 지훈이 미성년자 도박(게임 아이템 현금 거래)을 했다는 점을 이용해 부모님께 알리겠다고 협박했다. 추가로 200만원을 요구했다.',

    characters: [
      {
        id: 'char-jihoon',
        name: '박지훈',
        role: 'victim',
        age: 16,
        gender: 'male',
        occupation: '1학년 학생',
        personality: '게임을 좋아하고 순진함',
        appearance: '어려 보이는 외모',
        background: '평범한 학생. 온라인 게임에 빠져 있음.',
        alibi: {
          location: '집',
          time: '22:00',
          activity: '게임 중',
          witnesses: [],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-scammer', type: '피해자-가해자', description: '사기 당하고 협박받음' },
          { targetId: 'char-friend-gamer', type: '게임 친구', description: '같이 게임하는 친구' }
        ],
        secrets: [
          {
            id: 'secret-jihoon-1',
            content: '용돈과 저축한 돈 50만원을 게임 아이템에 사용',
            importance: 'critical',
            revealCondition: '거래 기록 확인 시'
          },
          {
            id: 'secret-jihoon-2',
            content: '부모님 몰래 게임 현금 거래',
            importance: 'major',
            revealCondition: '추궁 시'
          }
        ],
        dialogues: [
          {
            topic: '협박',
            lines: ['"200만원 내일까지 안 갚으면 부모님한테 다 말한다"고 해요.', '어떻게 해야 할지 모르겠어요...']
          },
          {
            topic: '거래',
            lines: ['게임에서 좋은 아이템이 있어서... 샀어요.', '50만원 줬는데 아이템은 안 줘요.', '환불 요구했더니 오히려 협박해요.']
          }
        ],
        nervousTriggers: ['게임', '돈', '부모님', '아이템']
      },
      {
        id: 'char-scammer',
        name: '이동현',
        role: 'culprit',
        age: 23,
        gender: 'male',
        occupation: '무직 (게임 아이템 사기꾼)',
        personality: '교활하고 양심 없음',
        appearance: '평범한 외모',
        background: '게임 아이템 거래 사기로 생활.',
        alibi: {
          location: 'PC방',
          time: '22:00',
          activity: '게임 중',
          witnesses: ['PC방 직원'],
          hasHole: true,
          holeDetail: '협박 메시지 발송 시각과 일치'
        },
        motive: {
          type: 'greed',
          description: '금전 갈취',
          strength: 3
        },
        relationships: [
          { targetId: 'char-jihoon', type: '가해자-피해자', description: '사기치고 협박함' }
        ],
        secrets: [
          {
            id: 'secret-scammer-1',
            content: '여러 명을 상대로 동일한 수법 사용',
            importance: 'critical',
            revealCondition: '거래 기록 조사 시'
          },
          {
            id: 'secret-scammer-2',
            content: '게임 계정으로 신원 추적 가능',
            importance: 'critical',
            revealCondition: '게임사 협조 시'
          }
        ],
        dialogues: [
          {
            topic: '거래',
            lines: ['(시치미 떼며) 거래? 무슨 거래요?', '증거가 있어요?']
          },
          {
            topic: '협박',
            lines: ['(당황하며) 협박이라니요?', '...알았어요. 제가 잘못했습니다.'],
            requiresEvidence: ['evidence-threat-messages']
          }
        ],
        nervousTriggers: ['거래 기록', 'IP', '게임 계정', '경찰']
      },
      {
        id: 'char-friend-gamer',
        name: '최준호',
        role: 'witness',
        age: 16,
        gender: 'male',
        occupation: '1학년 학생',
        personality: '게임을 좋아하고 의리 있음',
        appearance: '밝은 성격',
        background: '지훈과 같이 게임하는 친구.',
        alibi: {
          location: '집',
          time: '22:00',
          activity: '게임 중 (지훈과 함께)',
          witnesses: ['char-jihoon'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-jihoon', type: '친구', description: '같이 게임하는 친구' }
        ],
        secrets: [
          {
            id: 'secret-friend-1',
            content: '지훈이 거래하는 것을 말렸었음',
            importance: 'minor',
            revealCondition: '인터뷰 시'
          }
        ],
        dialogues: [
          {
            topic: '거래',
            lines: ['말렸어요. "그런 거래는 사기 많다"고...', '지훈이가 안 들었어요.']
          },
          {
            topic: '범인',
            lines: ['게임 아이디 기억해요. "DarkKnight99"였어요.']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-game-company',
        name: '게임 운영자',
        role: 'witness',
        age: 30,
        gender: 'male',
        occupation: '게임 회사 직원',
        personality: '협조적',
        appearance: '전문가 이미지',
        background: '게임 운영 및 관리.',
        alibi: {
          location: '회사',
          time: '22:00',
          activity: '야근',
          witnesses: [],
          hasHole: false
        },
        relationships: [],
        secrets: [
          {
            id: 'secret-game-1',
            content: 'DarkKnight99 계정의 실명 정보 보유',
            importance: 'critical',
            revealCondition: '협조 요청 시'
          }
        ],
        dialogues: [
          {
            topic: '계정',
            lines: ['네, 해당 계정 정보 제공 가능합니다.', '이동현이라는 사람으로 등록되어 있네요.', '다수의 거래 사기 신고가 접수되어 있습니다.']
          }
        ],
        nervousTriggers: []
      }
    ],

    evidence: [
      {
        id: 'evidence-threat-messages',
        name: '협박 메시지',
        type: 'digital',
        description: '카카오톡 협박 메시지',
        detailedDescription: '"200만원 내일까지. 안 그러면 부모님한테 네가 도박한 거 다 말한다." "경찰 신고해봐라. 니도 불법 거래했잖아."',
        location: '스마트폰',
        foundAt: '지훈 카카오톡',
        linkedCharacters: ['char-scammer'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-transaction-record',
        name: '거래 기록',
        type: 'digital',
        description: '게임 아이템 거래 내역',
        detailedDescription: '지훈이 "DarkKnight99"에게 50만원을 송금한 기록. 하지만 아이템은 전달되지 않음.',
        location: '게임 로그',
        foundAt: '게임 내 메시지',
        linkedCharacters: ['char-scammer', 'char-jihoon'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-account-info',
        name: '게임 계정 정보',
        type: 'digital',
        description: 'DarkKnight99 계정 실명 정보',
        detailedDescription: '게임사 제공 정보. 계정 소유자: 이동현 (23세). 다수의 사기 신고 이력.',
        location: '게임사 서버',
        foundAt: '게임사 협조',
        linkedCharacters: ['char-scammer'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-bank-transfer',
        name: '계좌 이체 내역',
        type: 'document',
        description: '지훈의 송금 내역',
        detailedDescription: '지훈이 이동현의 계좌로 50만원 송금. 받는 사람: 이동현.',
        location: '은행',
        foundAt: '지훈 통장',
        linkedCharacters: ['char-jihoon', 'char-scammer'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-pc-room-log',
        name: 'PC방 이용 기록',
        type: 'digital',
        description: 'PC방 로그인 기록',
        detailedDescription: '이동현이 협박 메시지 발송 시각에 PC방에서 게임 중. IP 주소 일치.',
        location: 'PC방',
        foundAt: 'PC방 기록',
        linkedCharacters: ['char-scammer'],
        isCritical: false,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      }
    ],

    locations: [
      {
        id: 'loc-jihoon-home',
        name: '지훈의 집',
        description: '박지훈의 방',
        atmosphere: '게임 포스터가 가득한 방',
        objects: [
          {
            id: 'obj-computer',
            name: '컴퓨터',
            description: '게임용 컴퓨터',
            examinationResult: '거래 기록과 협박 메시지 확인.',
            containsEvidence: 'evidence-threat-messages'
          }
        ],
        connectedTo: ['loc-school']
      },
      {
        id: 'loc-pc-room',
        name: 'PC방',
        description: '이동현이 자주 가는 PC방',
        atmosphere: '어둡고 담배 냄새',
        objects: [
          {
            id: 'obj-pc-log',
            name: '이용 기록',
            description: 'PC방 로그',
            examinationResult: '이동현의 이용 내역 확인.',
            containsEvidence: 'evidence-pc-room-log'
          }
        ],
        connectedTo: ['loc-jihoon-home']
      },
      {
        id: 'loc-game-company',
        name: '게임 회사',
        description: '게임 운영사',
        atmosphere: '깔끔한 사무실',
        objects: [
          {
            id: 'obj-server',
            name: '서버 데이터',
            description: '게임 계정 정보',
            examinationResult: 'DarkKnight99 계정 소유자 확인.',
            containsEvidence: 'evidence-account-info'
          }
        ],
        connectedTo: ['loc-pc-room']
      }
    ],

    timeline: [
      { time: '1개월 전', event: '지훈, 게임에서 DarkKnight99와 접촉', participants: ['char-jihoon', 'char-scammer'], location: '온라인', importance: 'major', isRevealed: false },
      { time: '2주 전', event: '지훈, 이동현에게 50만원 송금', participants: ['char-jihoon', 'char-scammer'], location: '온라인', importance: 'critical', isRevealed: false },
      { time: '1주 전', event: '지훈, 아이템 미전달로 환불 요구', participants: ['char-jihoon'], location: '온라인', importance: 'major', isRevealed: false },
      { time: '3일 전', event: '이동현, 협박 시작', participants: ['char-scammer'], location: 'PC방', importance: 'critical', isRevealed: false },
      { time: '어제 22:00', event: '이동현, 200만원 요구 협박 메시지 발송', participants: ['char-scammer'], location: 'PC방', importance: 'critical', isRevealed: false },
      { time: '오늘 10:00', event: '지훈, 협박 사실 신고', participants: ['char-jihoon'], location: '학교', importance: 'major', isRevealed: true }
    ],

    solution: {
      summary: '게임 아이템 사기꾼 이동현이 박지훈을 사기 친 후 추가로 협박해 돈을 갈취하려 했다.',
      detailedExplanation: [
        '이동현은 게임에서 고가 아이템을 판매한다고 속였다.',
        '지훈은 50만원을 송금했지만 아이템을 받지 못했다.',
        '환불을 요구하자 이동현은 오히려 협박을 시작했다.',
        '미성년자 도박(게임 현금 거래)을 했다며 부모님께 알리겠다고 위협했다.',
        '게임 계정 정보와 계좌 이체 내역으로 범인이 특정되었다.',
        '이동현은 여러 명을 대상으로 같은 수법을 사용한 상습범이었다.'
      ],
      keyEvidence: ['evidence-threat-messages', 'evidence-transaction-record', 'evidence-account-info', 'evidence-bank-transfer'],
      howToSolve: [
        '협박 메시지 확인',
        '거래 기록에서 게임 아이디 확인',
        '게임사에 계정 정보 요청',
        '계좌 이체 내역으로 실명 확인'
      ],
      commonMistakes: [
        '증거 부족으로 신고 포기',
        '게임사 협조를 구하지 않는 것'
      ]
    },

    deductionKeywords: {
      who: ['이동현', '사기꾼', 'DarkKnight99'],
      why: ['돈', '사기', '갈취'],
      how: ['게임 아이템', '협박 메시지', '카카오톡'],
      when: ['어제 밤', '22시'],
      where: ['PC방', '온라인']
    },

    tags: ['협박', '게임', '사기', '온라인', '미성년자', '돈'],
    author: 'DEDUCTIO',
    version: '1.0'
  },
  {
    id: 'blackmail-008',
    title: '학폭 증거',
    subtitle: '과거 학교폭력 영상으로 협박당하다',
    type: 'blackmail',
    difficulty: 'medium',
    estimatedTime: 20,

    prologue: [
      '"2년 전 네가 한 짓... 학교생활기록부에 기록되면 어떻게 될까?"',
      '학생회 부회장 강태민에게 온 협박 메시지.',
      '과거의 잘못이 현재를 위협하고 있다.'
    ],
    introduction: [
      '강태민이 창백한 얼굴로 찾아왔습니다.',
      '"중학교 때 일이... 누군가 알고 있어요."',
      '"영상까지 있다고 해요. 대학 못 가게 될 거예요."'
    ],
    setting: '청운고등학교',

    crimeTime: '21:00',
    crimeLocation: '온라인 메신저',
    culpritId: 'char-victim-brother',
    victimId: 'char-taemin',
    motive: '동생을 괴롭힌 가해자에 대한 복수',
    motiveDetail: '박준서의 동생 박준혁은 2년 전 중학교에서 강태민에게 심하게 괴롭힘을 당했다. 준혁은 여전히 트라우마에 시달리고 있고, 형 준서는 동생의 고통을 보며 복수를 결심했다. 태민이 학생회 부회장이 된 것을 보고 분노가 폭발했다.',
    method: '과거 학교폭력 영상으로 협박',
    methodDetail: '준서는 2년 전 태민이 준혁을 괴롭히는 영상을 우연히 발견했다. 익명 메신저를 통해 태민에게 영상을 보내며 학생부에 기록하겠다고 협박했다.',

    characters: [
      {
        id: 'char-taemin',
        name: '강태민',
        role: 'victim',
        age: 17,
        gender: 'male',
        occupation: '2학년 학생회 부회장',
        personality: '지금은 책임감 있지만 과거엔 문제아',
        appearance: '단정하고 리더십 있어 보임',
        background: '중학교 때 학교폭력 가해자였으나 반성하고 변화함.',
        alibi: {
          location: '학원',
          time: '21:00',
          activity: '자습',
          witnesses: ['학원 선생님'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-victim-brother', type: '모름', description: '범인을 알지 못함' },
          { targetId: 'char-past-victim', type: '과거 가해자-피해자', description: '2년 전 괴롭힘', isSecret: true }
        ],
        secrets: [
          {
            id: 'secret-taemin-1',
            content: '중학교 때 박준혁을 괴롭힌 적 있음',
            importance: 'critical',
            revealCondition: '협박 내용 확인 시'
          },
          {
            id: 'secret-taemin-2',
            content: '진심으로 반성하고 변화했지만 과거가 두려움',
            importance: 'major',
            revealCondition: '추궁 시'
          }
        ],
        dialogues: [
          {
            topic: '협박',
            lines: ['영상을 보냈어요. 제가... 중학교 때 한 짓이...', '학생부에 기록되면 대학 못 가요.']
          },
          {
            topic: '과거',
            lines: ['(눈물 글썽이며) 인정해요. 제가 나쁜 짓 했어요.', '그때는 어렸고... 변명이 안 되죠.', '정말 후회하고 있어요. 그래서 더 열심히 살려고...']
          }
        ],
        nervousTriggers: ['학폭', '과거', '영상', '학생부']
      },
      {
        id: 'char-victim-brother',
        name: '박준서',
        role: 'culprit',
        age: 19,
        gender: 'male',
        occupation: '대학생',
        personality: '동생을 아끼고 정의감 강함',
        appearance: '강인한 인상',
        background: '동생이 학폭 피해자. 복수를 결심.',
        alibi: {
          location: '집',
          time: '21:00',
          activity: '공부 중이었다고 주장',
          witnesses: [],
          hasHole: true,
          holeDetail: '같은 시각 메신저 활동 기록'
        },
        motive: {
          type: 'revenge',
          description: '동생을 괴롭힌 가해자에 대한 복수',
          strength: 3
        },
        relationships: [
          { targetId: 'char-taemin', type: '복수자-가해자', description: '동생을 괴롭힌 사람' },
          { targetId: 'char-past-victim', type: '형-동생', description: '피해자 동생' }
        ],
        secrets: [
          {
            id: 'secret-brother-1',
            content: '동생의 고통을 보며 복수를 계획',
            importance: 'critical',
            revealCondition: '추궁 시'
          },
          {
            id: 'secret-brother-2',
            content: '우연히 학폭 영상 발견',
            importance: 'critical',
            revealCondition: '영상 출처 추적 시'
          }
        ],
        dialogues: [
          {
            topic: '동생',
            lines: ['준혁이는 아직도 악몽을 꿔요.', '그때 일 때문에 상담 치료 받고 있어요.']
          },
          {
            topic: '협박',
            lines: ['(분노하며) 태민이 그런 짓을 하고도 잘 살고 있더라고요.', '동생은 고통받는데... 용서할 수 없었어요.', '...잘못했습니다.'],
            requiresEvidence: ['evidence-video']
          }
        ],
        nervousTriggers: ['동생', '영상', '복수', '태민']
      },
      {
        id: 'char-past-victim',
        name: '박준혁',
        role: 'witness',
        age: 17,
        gender: 'male',
        occupation: '2학년 학생',
        personality: '소극적이고 불안함',
        appearance: '위축된 모습',
        background: '2년 전 태민에게 괴롭힘 당함.',
        alibi: {
          location: '집',
          time: '21:00',
          activity: '방에서 휴식',
          witnesses: ['형 박준서'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-taemin', type: '피해자-가해자', description: '2년 전 괴롭힘 당함' },
          { targetId: 'char-victim-brother', type: '동생-형', description: '형이 자신을 보호함' }
        ],
        secrets: [
          {
            id: 'secret-victim-1',
            content: '여전히 트라우마에 시달림',
            importance: 'major',
            revealCondition: '인터뷰 시'
          },
          {
            id: 'secret-victim-2',
            content: '형이 복수하려는 것을 몰랐음',
            importance: 'minor',
            revealCondition: '확인 시'
          }
        ],
        dialogues: [
          {
            topic: '과거',
            lines: ['(떨리는 목소리로) 그때 일은... 말하기 싫어요.', '태민이가... 많이 괴롭혔어요.']
          },
          {
            topic: '형',
            lines: ['형이 이런 짓을 할 줄 몰랐어요.', '형은 저를 위해서...']
          }
        ],
        nervousTriggers: ['태민', '괴롭힘', '중학교']
      },
      {
        id: 'char-counselor',
        name: '이지은 상담사',
        role: 'witness',
        age: 35,
        gender: 'female',
        occupation: '학교 상담사',
        personality: '따뜻하고 전문적',
        appearance: '차분한 인상',
        background: '학생 상담 전문가.',
        alibi: {
          location: '상담실',
          time: '21:00',
          activity: '퇴근',
          witnesses: [],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-past-victim', type: '상담사-내담자', description: '준혁 상담 중' }
        ],
        secrets: [
          {
            id: 'secret-counselor-1',
            content: '준혁의 트라우마가 심각함을 알고 있음',
            importance: 'major',
            revealCondition: '상담 기록 확인 시'
          }
        ],
        dialogues: [
          {
            topic: '준혁',
            lines: ['박준혁 학생은... 여전히 어려움을 겪고 있어요.', '과거 학교폭력의 트라우마가 깊습니다.', '가해자를 마주치는 것조차 힘들어해요.']
          }
        ],
        nervousTriggers: []
      }
    ],

    evidence: [
      {
        id: 'evidence-video',
        name: '학교폭력 영상',
        type: 'digital',
        description: '2년 전 학교폭력 현장 영상',
        detailedDescription: '태민이 준혁을 괴롭히는 장면. 명확한 증거.',
        location: '온라인',
        foundAt: '협박 메시지 첨부 파일',
        linkedCharacters: ['char-taemin', 'char-past-victim'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-threat-message',
        name: '협박 메시지',
        type: 'digital',
        description: '익명 메신저 협박',
        detailedDescription: '"2년 전 네가 한 짓 기억나? 이 영상 학교에 제출하면 생기부 끝장이지?" "조용히 하고 싶으면 내 말 들어."',
        location: '메신저',
        foundAt: '태민 메신저',
        linkedCharacters: ['char-victim-brother'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: true,
        analysisResult: '메신저 계정 추적 가능'
      },
      {
        id: 'evidence-messenger-account',
        name: '메신저 계정 정보',
        type: 'digital',
        description: '협박 메시지 발신 계정',
        detailedDescription: '계정 생성 IP, 활동 기록 등. 박준서의 IP 주소와 일치.',
        location: '메신저 서버',
        foundAt: '메신저 회사 협조',
        linkedCharacters: ['char-victim-brother'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      },
      {
        id: 'evidence-counseling-record',
        name: '상담 기록',
        type: 'document',
        description: '박준혁의 상담 기록',
        detailedDescription: '준혁이 태민으로부터 당한 학교폭력 내용. 트라우마 치료 중.',
        location: '상담실',
        foundAt: '상담실 파일',
        linkedCharacters: ['char-past-victim', 'char-taemin'],
        isCritical: false,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-video-source',
        name: '영상 출처 기록',
        type: 'digital',
        description: '영상 파일 메타데이터',
        detailedDescription: '영상이 준서의 클라우드 계정에서 다운로드됨.',
        location: '디지털',
        foundAt: '파일 분석',
        linkedCharacters: ['char-victim-brother'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: true,
        analysisResult: '준서의 계정에서 업로드됨'
      }
    ],

    locations: [
      {
        id: 'loc-taemin-academy',
        name: '태민 학원',
        description: '강태민이 다니는 학원',
        atmosphere: '조용한 자습실',
        objects: [],
        connectedTo: ['loc-school']
      },
      {
        id: 'loc-brother-home',
        name: '박준서 집',
        description: '준서와 준혁의 집',
        atmosphere: '평범한 가정집',
        objects: [
          {
            id: 'obj-computer',
            name: '준서 컴퓨터',
            description: '준서의 개인 PC',
            examinationResult: '메신저 로그인 기록과 영상 파일 발견.',
            containsEvidence: 'evidence-messenger-account'
          }
        ],
        connectedTo: ['loc-school']
      },
      {
        id: 'loc-counseling-room',
        name: '상담실',
        description: '학교 상담실',
        atmosphere: '편안한 분위기',
        objects: [
          {
            id: 'obj-records',
            name: '상담 기록 파일',
            description: '학생 상담 기록',
            examinationResult: '준혁의 트라우마 치료 기록 확인.',
            containsEvidence: 'evidence-counseling-record'
          }
        ],
        connectedTo: ['loc-school']
      }
    ],

    timeline: [
      { time: '2년 전', event: '태민, 중학교에서 준혁 괴롭힘', participants: ['char-taemin', 'char-past-victim'], location: '중학교', importance: 'critical', isRevealed: false },
      { time: '1년 전', event: '준혁, 전학 후 상담 치료 시작', participants: ['char-past-victim'], location: '청운고', importance: 'major', isRevealed: false },
      { time: '3개월 전', event: '준서, 우연히 학폭 영상 발견', participants: ['char-victim-brother'], location: '집', importance: 'critical', isRevealed: false },
      { time: '1개월 전', event: '태민, 학생회 부회장 당선', participants: ['char-taemin'], location: '학교', importance: 'major', isRevealed: true },
      { time: '1주 전', event: '준서, 복수 결심하고 익명 계정 생성', participants: ['char-victim-brother'], location: '집', importance: 'critical', isRevealed: false },
      { time: '어제 21:00', event: '준서, 협박 메시지 발송', participants: ['char-victim-brother'], location: '집', importance: 'critical', isRevealed: false },
      { time: '오늘 09:00', event: '태민, 협박 사실 신고', participants: ['char-taemin'], location: '학교', importance: 'major', isRevealed: true }
    ],

    solution: {
      summary: '박준서가 동생을 괴롭힌 강태민에게 복수하기 위해 과거 학폭 영상으로 협박했다.',
      detailedExplanation: [
        '2년 전 태민은 중학교에서 준혁을 심하게 괴롭혔다.',
        '준혁은 트라우마로 여전히 상담 치료를 받고 있다.',
        '형 준서는 동생의 고통을 보며 복수를 결심했다.',
        '우연히 발견한 학폭 영상을 이용해 태민을 협박했다.',
        '태민이 학생회 부회장이 된 것을 보고 분노가 폭발했다.',
        '메신저 계정 추적과 영상 출처 분석으로 범인이 특정되었다.'
      ],
      keyEvidence: ['evidence-video', 'evidence-threat-message', 'evidence-messenger-account', 'evidence-video-source'],
      howToSolve: [
        '협박 메시지와 영상 확인',
        '메신저 계정 추적',
        '영상 파일 메타데이터 분석',
        '상담 기록으로 피해자 확인',
        'IP 주소로 범인 특정'
      ],
      commonMistakes: [
        '과거 피해자를 의심하는 것',
        '메신저 추적을 포기하는 것'
      ]
    },

    deductionKeywords: {
      who: ['박준서', '피해자 형', '복수자'],
      why: ['복수', '동생', '트라우마', '정의'],
      how: ['영상', '메신저', '협박'],
      when: ['어제 밤', '21시'],
      where: ['온라인', '메신저']
    },

    tags: ['협박', '학교폭력', '복수', '과거', '트라우마', '형제'],
    author: 'DEDUCTIO',
    version: '1.0'
  },
  {
    id: 'blackmail-009',
    title: '진로 방해',
    subtitle: '대학 추천서 취소를 협박하는 교사',
    type: 'blackmail',
    difficulty: 'hard',
    estimatedTime: 22,

    prologue: [
      '"내 말을 듣지 않으면 추천서를 취소하겠다."',
      '3학년 최서연에게 온 담임 선생님의 메시지.',
      '꿈꿔왔던 대학 진학이 위협받고 있다.'
    ],
    introduction: [
      '최서연이 떨리는 목소리로 말합니다.',
      '"선생님이... 추천서를 취소하겠대요."',
      '"부당한 요구를 하시는데... 어떡하죠?"'
    ],
    setting: '청운고등학교',

    crimeTime: '17:00',
    crimeLocation: '교무실',
    culpritId: 'char-teacher-corrupt',
    victimId: 'char-seoyeon',
    motive: '개인적 이득 (사교육 강요)',
    motiveDetail: '담임 교사 박영진은 자신의 부인이 운영하는 입시 컨설팅 업체를 이용하도록 서연을 강요했다. 서연이 거부하자 대학 추천서를 취소하겠다고 협박했다. 추천서 없이는 원하는 대학 진학이 어렵다는 것을 이용한 것이다.',
    method: '진로에 필수적인 추천서를 미끼로 협박',
    methodDetail: '박영진은 서연에게 "내 부인의 입시 컨설팅(300만원)을 받으면 더 좋은 추천서를 써주고, 거부하면 추천서를 취소하겠다"고 협박했다.',

    characters: [
      {
        id: 'char-seoyeon',
        name: '최서연',
        role: 'victim',
        age: 18,
        gender: 'female',
        occupation: '3학년 학생 (특목고 지망)',
        personality: '성실하고 꿈이 확고함',
        appearance: '지친 표정',
        background: '우수한 성적. 특목고 진학 준비 중.',
        alibi: {
          location: '교실',
          time: '17:00',
          activity: '자습',
          witnesses: ['친구들'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-teacher-corrupt', type: '학생-교사', description: '협박당하고 있음' }
        ],
        secrets: [
          {
            id: 'secret-seoyeon-1',
            content: '담임에게 부당한 요구를 받고 있음',
            importance: 'critical',
            revealCondition: '협박 내용 확인 시'
          }
        ],
        dialogues: [
          {
            topic: '협박',
            lines: ['"부인 컨설팅 받으라"고 하세요.', '300만원이나 해요. 부담스러워서 거절했더니...', '추천서 취소하겠다고 하셨어요.']
          },
          {
            topic: '추천서',
            lines: ['추천서 없으면 특목고 못 가요.', '선생님을 거역할 수가 없어요...']
          }
        ],
        nervousTriggers: ['추천서', '컨설팅', '선생님', '대학']
      },
      {
        id: 'char-teacher-corrupt',
        name: '박영진',
        role: 'culprit',
        age: 45,
        gender: 'male',
        occupation: '3학년 담임 교사',
        personality: '권위적이고 부패함',
        appearance: '위압적인 인상',
        background: '부인이 입시 컨설팅 업체 운영.',
        alibi: {
          location: '교무실',
          time: '17:00',
          activity: '업무 중',
          witnesses: ['다른 교사들'],
          hasHole: false
        },
        motive: {
          type: 'greed',
          description: '개인적 금전 이득 (부인 사업)',
          strength: 3
        },
        relationships: [
          { targetId: 'char-seoyeon', type: '교사-학생', description: '협박하고 있음' },
          { targetId: 'char-wife', type: '부부', description: '부인의 사업 홍보' }
        ],
        secrets: [
          {
            id: 'secret-teacher-1',
            content: '여러 학생에게 부인 컨설팅 강요',
            importance: 'critical',
            revealCondition: '다른 피해자 확인 시'
          },
          {
            id: 'secret-teacher-2',
            content: '추천서로 협박하는 문자 증거',
            importance: 'critical',
            revealCondition: '문자 기록 확인 시'
          }
        ],
        dialogues: [
          {
            topic: '컨설팅',
            lines: ['우리 반 학생들을 위해 좋은 서비스를 소개한 거죠.', '(당황하며) 강요는 아닙니다.']
          },
          {
            topic: '협박',
            lines: ['(화를 내며) 협박이라니요!', '...인정합니다. 제가 잘못했습니다.'],
            requiresEvidence: ['evidence-text-threat']
          }
        ],
        nervousTriggers: ['협박', '추천서', '컨설팅', '부인', '금전']
      },
      {
        id: 'char-wife',
        name: '강미숙',
        role: 'suspect',
        age: 43,
        gender: 'female',
        occupation: '입시 컨설팅 업체 대표',
        personality: '사업적이고 냉정함',
        appearance: '깔끔한 차림',
        background: '입시 컨설팅 사업 운영.',
        alibi: {
          location: '컨설팅 사무실',
          time: '17:00',
          activity: '상담 중',
          witnesses: ['고객들'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-teacher-corrupt', type: '부부', description: '남편이 학생들 소개' }
        ],
        secrets: [
          {
            id: 'secret-wife-1',
            content: '남편이 학생들에게 자신의 서비스를 강요하는 것을 알고 있음',
            importance: 'major',
            revealCondition: '추궁 시'
          }
        ],
        dialogues: [
          {
            topic: '사업',
            lines: ['합법적으로 사업하고 있어요.', '남편이 학생들에게 소개해준 건 맞아요.']
          },
          {
            topic: '강요',
            lines: ['(불편해하며) 강요했는지는... 몰랐어요.', '남편한테 확인해보세요.']
          }
        ],
        nervousTriggers: ['강요', '협박', '남편', '불법']
      },
      {
        id: 'char-victim-friend',
        name: '이지현',
        role: 'witness',
        age: 18,
        gender: 'female',
        occupation: '3학년 학생',
        personality: '정의감 강함',
        appearance: '또렷한 인상',
        background: '서연의 친구. 같은 반.',
        alibi: {
          location: '교실',
          time: '17:00',
          activity: '서연과 함께 자습',
          witnesses: ['char-seoyeon'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-seoyeon', type: '친구', description: '서연의 고민을 들어줌' }
        ],
        secrets: [
          {
            id: 'secret-friend-1',
            content: '자신도 같은 제안을 받았으나 거절함',
            importance: 'major',
            revealCondition: '인터뷰 시'
          }
        ],
        dialogues: [
          {
            topic: '선생님',
            lines: ['저도 제안받았어요. 컨설팅 받으라고...', '거절했더니 추천서 내용이 별로일 거라고 암시하셨어요.']
          },
          {
            topic: '서연',
            lines: ['서연이는 특목고 가야 해서... 더 압박받았을 거예요.']
          }
        ],
        nervousTriggers: []
      }
    ],

    evidence: [
      {
        id: 'evidence-text-threat',
        name: '협박 문자',
        type: 'digital',
        description: '박영진의 협박 메시지',
        detailedDescription: '"서연아, 다시 생각해봐. 컨설팅 안 받으면 추천서 쓰기 어려울 것 같아." "네 진로를 위해서야. 거절하면... 책임 못 진다."',
        location: '스마트폰',
        foundAt: '서연 카카오톡',
        linkedCharacters: ['char-teacher-corrupt'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-consulting-brochure',
        name: '컨설팅 안내 자료',
        type: 'document',
        description: '강미숙 입시 컨설팅 자료',
        detailedDescription: '"박영진 선생님 추천" 문구 포함. 가격: 300만원.',
        location: '교실',
        foundAt: '서연 소지',
        linkedCharacters: ['char-wife', 'char-teacher-corrupt'],
        isCritical: false,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-other-victims',
        name: '다른 피해자 증언',
        type: 'testimony',
        description: '같은 반 학생들 증언',
        detailedDescription: '이지현 포함 3명이 같은 제안을 받았다고 증언. 거절 시 추천서 내용이 부실할 것이라는 암시.',
        location: '학교',
        foundAt: '학생 인터뷰',
        linkedCharacters: ['char-victim-friend'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-recommendation-draft',
        name: '추천서 초안',
        type: 'document',
        description: '박영진이 작성한 추천서들',
        detailedDescription: '컨설팅 받은 학생은 극찬, 거절한 학생은 형식적 내용. 명백한 차별.',
        location: '교무실',
        foundAt: '선생님 서랍',
        linkedCharacters: ['char-teacher-corrupt'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      },
      {
        id: 'evidence-payment-record',
        name: '컨설팅 결제 기록',
        type: 'document',
        description: '강미숙 업체 결제 내역',
        detailedDescription: '박영진 반 학생 5명이 컨설팅 결제. 모두 3학년.',
        location: '컨설팅 업체',
        foundAt: '업체 장부',
        linkedCharacters: ['char-wife', 'char-teacher-corrupt'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      }
    ],

    locations: [
      {
        id: 'loc-staff-room',
        name: '교무실',
        description: '교사들의 업무 공간',
        atmosphere: '긴장된 분위기',
        objects: [
          {
            id: 'obj-drawer',
            name: '박영진 서랍',
            description: '선생님 개인 서랍',
            examinationResult: '추천서 초안들 발견. 차별적 내용 확인.',
            containsEvidence: 'evidence-recommendation-draft'
          }
        ],
        connectedTo: ['loc-classroom']
      },
      {
        id: 'loc-classroom',
        name: '3학년 교실',
        description: '서연의 교실',
        atmosphere: '학생들의 자습 공간',
        objects: [],
        connectedTo: ['loc-staff-room', 'loc-consulting-office']
      },
      {
        id: 'loc-consulting-office',
        name: '컨설팅 사무실',
        description: '강미숙의 입시 컨설팅 업체',
        atmosphere: '깔끔한 사무실',
        objects: [
          {
            id: 'obj-ledger',
            name: '결제 장부',
            description: '고객 결제 기록',
            examinationResult: '박영진 반 학생들의 결제 내역 확인.',
            containsEvidence: 'evidence-payment-record'
          }
        ],
        connectedTo: ['loc-classroom']
      }
    ],

    timeline: [
      { time: '6개월 전', event: '강미숙, 입시 컨설팅 업체 설립', participants: ['char-wife'], location: '컨설팅 사무실', importance: 'major', isRevealed: false },
      { time: '3개월 전', event: '박영진, 학생들에게 컨설팅 홍보 시작', participants: ['char-teacher-corrupt'], location: '교실', importance: 'critical', isRevealed: false },
      { time: '2개월 전', event: '5명 학생, 컨설팅 결제', participants: ['char-teacher-corrupt', 'char-wife'], location: '컨설팅 사무실', importance: 'major', isRevealed: false },
      { time: '1개월 전', event: '서연, 제안 거절', participants: ['char-seoyeon'], location: '교무실', importance: 'critical', isRevealed: false },
      { time: '2주 전', event: '박영진, 서연에게 협박 문자 발송', participants: ['char-teacher-corrupt'], location: '교무실', importance: 'critical', isRevealed: false },
      { time: '1주 전', event: '서연, 추천서 취소 협박 받음', participants: ['char-seoyeon', 'char-teacher-corrupt'], location: '교무실', importance: 'critical', isRevealed: false },
      { time: '오늘 10:00', event: '서연, 협박 사실 신고', participants: ['char-seoyeon'], location: '학교', importance: 'major', isRevealed: true }
    ],

    solution: {
      summary: '담임 교사 박영진이 부인의 입시 컨설팅 사업을 위해 학생들을 협박했다.',
      detailedExplanation: [
        '박영진의 부인은 입시 컨설팅 업체를 운영하고 있었다.',
        '박영진은 자신의 반 학생들에게 부인의 서비스를 강요했다.',
        '컨설팅을 받은 학생에게는 좋은 추천서를, 거절한 학생에게는 형식적인 추천서를 쓰겠다고 협박했다.',
        '서연은 고액의 컨설팅 비용을 부담스러워하며 거절했다.',
        '박영진은 서연의 진로에 필수적인 추천서를 미끼로 협박했다.',
        '문자 기록, 다른 피해자 증언, 추천서 초안 비교로 범행이 드러났다.'
      ],
      keyEvidence: ['evidence-text-threat', 'evidence-other-victims', 'evidence-recommendation-draft', 'evidence-payment-record'],
      howToSolve: [
        '협박 문자 확인',
        '다른 학생들 인터뷰',
        '추천서 초안 비교 분석',
        '컨설팅 결제 기록 확인',
        '교사 권한 남용 입증'
      ],
      commonMistakes: [
        '부인을 주범으로 의심하는 것',
        '증거 수집을 포기하는 것'
      ]
    },

    deductionKeywords: {
      who: ['박영진', '담임', '교사', '부패'],
      why: ['돈', '부인 사업', '개인 이득'],
      how: ['추천서', '협박', '진로'],
      when: ['2주 전', '1주 전'],
      where: ['교무실', '문자']
    },

    tags: ['협박', '교사', '부패', '입시', '추천서', '권한 남용'],
    author: 'DEDUCTIO',
    version: '1.0'
  },
  {
    id: 'blackmail-010',
    title: '익명의 편지',
    subtitle: '정체불명의 협박장과 숨겨진 비밀',
    type: 'blackmail',
    difficulty: 'medium',
    estimatedTime: 18,

    prologue: [
      '"네 비밀을 안다. 매주 금요일 체육관 뒤에 5만원을 놓아라."',
      '2학년 윤하영에게 도착한 검은 봉투.',
      '누가, 무엇을 알고 있는 걸까?'
    ],
    introduction: [
      '윤하영이 창백한 얼굴로 찾아왔습니다.',
      '"3주째 협박 편지가 와요. 돈을 요구해요."',
      '"누군지 전혀 모르겠어요. 도와주세요."'
    ],
    setting: '청운고등학교',

    crimeTime: '18:00',
    crimeLocation: '체육관 뒤 화단',
    culpritId: 'char-janitor-son',
    victimId: 'char-hayoung',
    motive: '가족의 생활비 마련',
    motiveDetail: '청소원 김순자의 아들 김민수는 어머니의 낮은 수입으로 어려운 생활을 하고 있었다. 우연히 윤하영이 시험 답안지를 미리 봤다는 사실을 알게 되었고, 생활비를 위해 협박을 결심했다. 체육관 뒤는 CCTV 사각지대라는 것을 알고 있었다.',
    method: '익명 편지로 협박하며 돈 요구',
    methodDetail: '민수는 체육관 청소를 돕는 척하며 사각지대를 파악했다. 매주 금요일 방과 후 체육관 뒤 화단에 돈을 두게 했고, 아무도 없을 때 회수했다.',

    characters: [
      {
        id: 'char-hayoung',
        name: '윤하영',
        role: 'victim',
        age: 17,
        gender: 'female',
        occupation: '2학년 학생',
        personality: '성적에 집착하고 불안함',
        appearance: '긴장된 표정',
        background: '성적 우수 학생. 비밀을 안고 있음.',
        alibi: {
          location: '학원',
          time: '18:00',
          activity: '수업 중',
          witnesses: ['학원 선생님'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-janitor-son', type: '모름', description: '범인을 알지 못함' }
        ],
        secrets: [
          {
            id: 'secret-hayoung-1',
            content: '중간고사 답안지를 미리 봤음',
            importance: 'critical',
            revealCondition: '협박 내용 분석 시'
          },
          {
            id: 'secret-hayoung-2',
            content: '교무실 청소 시간에 우연히 답안지 발견',
            importance: 'major',
            revealCondition: '추궁 시'
          }
        ],
        dialogues: [
          {
            topic: '협박',
            lines: ['"네 비밀을 안다"는 편지가 와요.', '매주 금요일 5만원을... 벌써 3주째예요.']
          },
          {
            topic: '비밀',
            lines: ['(떨리는 목소리로) ...시험 답안지를 봤어요.', '청소하다가 우연히... 어쩌다 보니...', '정말 후회하고 있어요.']
          }
        ],
        nervousTriggers: ['비밀', '답안지', '시험', '부정행위']
      },
      {
        id: 'char-janitor-son',
        name: '김민수',
        role: 'culprit',
        age: 20,
        gender: 'male',
        occupation: '알바생 (체육관 청소 보조)',
        personality: '조용하고 어려운 환경',
        appearance: '수척한 외모',
        background: '어머니(청소원)를 도우며 생활.',
        alibi: {
          location: '체육관',
          time: '18:00',
          activity: '청소 중이었다고 주장',
          witnesses: ['char-janitor-mother'],
          hasHole: true,
          holeDetail: '18:10경 화단 근처에서 목격됨'
        },
        motive: {
          type: 'greed',
          description: '가족 생활비 마련',
          strength: 3
        },
        relationships: [
          { targetId: 'char-hayoung', type: '협박자-피해자', description: '협박하고 있음' },
          { targetId: 'char-janitor-mother', type: '아들-어머니', description: '어머니를 돕고 싶어함' }
        ],
        secrets: [
          {
            id: 'secret-minsu-1',
            content: '체육관 청소 중 하영이 화단에 돈 두는 것 목격',
            importance: 'critical',
            revealCondition: 'CCTV 확인 시'
          },
          {
            id: 'secret-minsu-2',
            content: '어머니가 청소하다 답안지 이야기 들었음',
            importance: 'major',
            revealCondition: '추궁 시'
          }
        ],
        dialogues: [
          {
            topic: '체육관',
            lines: ['네, 어머니 청소 도와드려요.', '체육관 뒤는... 잘 모르는데요.']
          },
          {
            topic: '협박',
            lines: ['(고개 숙이며) ...미안해요.', '어머니가 아프셔서... 돈이 필요했어요.', '잘못했습니다.'],
            requiresEvidence: ['evidence-money-pickup-witness']
          }
        ],
        nervousTriggers: ['돈', '체육관 뒤', '편지', '어머니']
      },
      {
        id: 'char-janitor-mother',
        name: '김순자',
        role: 'witness',
        age: 52,
        gender: 'female',
        occupation: '학교 청소원',
        personality: '성실하고 힘듦',
        appearance: '지친 중년 여성',
        background: '학교 청소원. 아들과 단둘이 생활.',
        alibi: {
          location: '체육관',
          time: '18:00',
          activity: '청소 중',
          witnesses: ['다른 청소원'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-janitor-son', type: '어머니-아들', description: '아들을 사랑함' }
        ],
        secrets: [
          {
            id: 'secret-mother-1',
            content: '교무실 청소 중 답안지 사건 목격',
            importance: 'major',
            revealCondition: '인터뷰 시'
          },
          {
            id: 'secret-mother-2',
            content: '아들이 돈 문제로 고민하는 것을 알고 있음',
            importance: 'minor',
            revealCondition: '추궁 시'
          }
        ],
        dialogues: [
          {
            topic: '답안지',
            lines: ['청소하다가... 봤어요.', '윤하영 학생이 교무실에서 답안지를 보는 것 같더라고요.', '말하긴 좀... 그랬어요.']
          },
          {
            topic: '아들',
            lines: ['민수는 착한 애예요.', '요즘 돈 때문에 고민이 많았어요...', '(놀라며) 설마 민수가...?']
          }
        ],
        nervousTriggers: ['아들', '돈', '답안지']
      },
      {
        id: 'char-pe-teacher',
        name: '정태훈 체육교사',
        role: 'witness',
        age: 38,
        gender: 'male',
        occupation: '체육 교사',
        personality: '관찰력 좋음',
        appearance: '건장한 체격',
        background: '체육관 관리 담당.',
        alibi: {
          location: '체육관',
          time: '18:00',
          activity: '운동부 지도',
          witnesses: ['운동부 학생들'],
          hasHole: false
        },
        relationships: [],
        secrets: [
          {
            id: 'secret-pe-1',
            content: '18:10경 김민수가 화단에서 뭔가 줍는 것 목격',
            importance: 'critical',
            revealCondition: '목격 여부 질문 시'
          }
        ],
        dialogues: [
          {
            topic: '목격',
            lines: ['지난주 금요일... 민수가 화단 쪽에 있더라고요.', '뭔가 주우는 것 같았어요.', '이상하다고 생각했는데...']
          }
        ],
        nervousTriggers: []
      }
    ],

    evidence: [
      {
        id: 'evidence-threat-letters',
        name: '협박 편지 3통',
        type: 'document',
        description: '검은 봉투에 담긴 익명 편지',
        detailedDescription: '"네 비밀을 안다. 매주 금요일 체육관 뒤 화단에 5만원 놓아라. 안 그러면 학교에 알린다."',
        location: '하영 방',
        foundAt: '하영 소지',
        linkedCharacters: ['char-janitor-son'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: true,
        analysisResult: '저가 복사지 사용. 학교 인근 문방구 판매.'
      },
      {
        id: 'evidence-money-pickup-witness',
        name: '정태훈 목격 증언',
        type: 'testimony',
        description: '체육 교사의 목격 증언',
        detailedDescription: '지난주 금요일 18:10경 김민수가 체육관 뒤 화단에서 봉투를 줍는 것을 목격.',
        location: '체육관',
        foundAt: '증언',
        linkedCharacters: ['char-janitor-son'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-answer-sheet-incident',
        name: '청소원 증언',
        type: 'testimony',
        description: '김순자의 목격 증언',
        detailedDescription: '교무실 청소 중 윤하영이 답안지를 보는 것을 목격. 민수에게 이야기했다고 증언.',
        location: '교무실',
        foundAt: '청소원 인터뷰',
        linkedCharacters: ['char-hayoung', 'char-janitor-mother'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-stationery-receipt',
        name: '문방구 영수증',
        type: 'document',
        description: '복사지 구매 영수증',
        detailedDescription: '김민수가 협박 편지에 사용된 것과 동일한 검은 봉투와 복사지 구매.',
        location: '문방구',
        foundAt: 'CCTV 및 영수증',
        linkedCharacters: ['char-janitor-son'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      },
      {
        id: 'evidence-financial-records',
        name: '민수 통장 내역',
        type: 'document',
        description: '김민수 계좌 입금 기록',
        detailedDescription: '매주 금요일 5만원씩 현금 입금. 3주간 총 15만원.',
        location: '은행',
        foundAt: '통장 조회',
        linkedCharacters: ['char-janitor-son'],
        isCritical: false,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      }
    ],

    locations: [
      {
        id: 'loc-gym-back',
        name: '체육관 뒤 화단',
        description: 'CCTV 사각지대',
        atmosphere: '어둡고 한적한 공간',
        objects: [
          {
            id: 'obj-flowerbed',
            name: '화단',
            description: '돈을 두는 장소',
            examinationResult: '발자국 흔적 발견.',
            containsEvidence: undefined
          }
        ],
        connectedTo: ['loc-gym', 'loc-school']
      },
      {
        id: 'loc-gym',
        name: '체육관',
        description: '학교 체육관',
        atmosphere: '운동부 연습 중',
        objects: [
          {
            id: 'obj-cleaning-tools',
            name: '청소 도구',
            description: '김순자가 사용하는 청소 도구',
            examinationResult: '민수도 자주 청소 도움.',
            containsEvidence: undefined
          }
        ],
        connectedTo: ['loc-gym-back', 'loc-staff-room']
      },
      {
        id: 'loc-stationery-shop',
        name: '문방구',
        description: '학교 앞 문방구',
        atmosphere: '학생들이 자주 가는 곳',
        objects: [
          {
            id: 'obj-receipt',
            name: '구매 영수증',
            description: '민수의 구매 기록',
            examinationResult: '검은 봉투와 복사지 구매 확인.',
            containsEvidence: 'evidence-stationery-receipt'
          }
        ],
        connectedTo: ['loc-school']
      }
    ],

    timeline: [
      { time: '1개월 전', event: '김순자, 하영이 답안지 보는 것 목격', participants: ['char-janitor-mother', 'char-hayoung'], location: '교무실', importance: 'critical', isRevealed: false },
      { time: '3주 전', event: '김순자, 아들 민수에게 사실 전달', participants: ['char-janitor-mother', 'char-janitor-son'], location: '집', importance: 'major', isRevealed: false },
      { time: '3주 전', event: '민수, 협박 준비 (문방구에서 봉투 구매)', participants: ['char-janitor-son'], location: '문방구', importance: 'critical', isRevealed: false },
      { time: '3주 전 금요일', event: '첫 번째 협박 편지 발송 및 돈 회수', participants: ['char-janitor-son'], location: '체육관 뒤', importance: 'critical', isRevealed: false },
      { time: '2주 전 금요일', event: '두 번째 협박 편지 및 돈 회수', participants: ['char-janitor-son'], location: '체육관 뒤', importance: 'major', isRevealed: false },
      { time: '지난주 금요일 18:10', event: '민수, 돈 줍는 것을 정태훈 교사가 목격', participants: ['char-janitor-son', 'char-pe-teacher'], location: '체육관 뒤', importance: 'critical', isRevealed: false },
      { time: '오늘 09:00', event: '하영, 협박 사실 신고', participants: ['char-hayoung'], location: '학교', importance: 'major', isRevealed: true }
    ],

    solution: {
      summary: '청소원의 아들 김민수가 생활비를 위해 윤하영을 협박했다.',
      detailedExplanation: [
        '어머니 김순자는 교무실 청소 중 하영이 답안지를 보는 것을 목격했다.',
        '순자는 아들 민수에게 이 사실을 전했다.',
        '민수는 어려운 가정 형편 때문에 돈이 필요했다.',
        '하영의 비밀을 이용해 협박 편지를 보내기로 결심했다.',
        '체육관 뒤 화단이 CCTV 사각지대라는 것을 알고 있었다.',
        '3주간 매주 금요일 5만원씩 총 15만원을 받았다.',
        '정태훈 교사의 목격, 문방구 영수증, 통장 내역으로 범인이 특정되었다.'
      ],
      keyEvidence: ['evidence-threat-letters', 'evidence-money-pickup-witness', 'evidence-answer-sheet-incident', 'evidence-stationery-receipt'],
      howToSolve: [
        '협박 편지 분석',
        '체육관 뒤 조사',
        '목격자 인터뷰 (정태훈)',
        '청소원 인터뷰 (김순자)',
        '문방구 구매 기록 확인',
        '민수 통장 입금 내역 확인'
      ],
      commonMistakes: [
        '어머니를 범인으로 의심하는 것',
        'CCTV 사각지대 조사를 소홀히 하는 것'
      ]
    },

    deductionKeywords: {
      who: ['김민수', '청소원 아들', '알바생'],
      why: ['생활비', '가족', '돈'],
      how: ['편지', '화단', 'CCTV 사각지대'],
      when: ['매주 금요일', '18시'],
      where: ['체육관 뒤', '화단']
    },

    tags: ['협박', '익명', '생활비', '가족', '부정행위'],
    author: 'DEDUCTIO',
    version: '1.0'
  }
];
