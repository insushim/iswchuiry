// ========================================
// 절도 시나리오 20개 - 수작업 제작
// ========================================

import { Scenario } from './types';

export const theftScenarios: Scenario[] = [
  // ========================================
  // 시나리오 #1: 사라진 졸업앨범
  // ========================================
  {
    id: 'theft-001',
    title: '사라진 졸업앨범',
    subtitle: '30년 만의 동창회에서 벌어진 도난 사건',
    type: 'theft',
    difficulty: 'easy',
    estimatedTime: 15,

    prologue: [
      '한여름 밤, 청운고등학교 30주년 동창회가 열렸다.',
      '세월의 무게를 안고 모인 졸업생들 사이에서, 누군가 소중한 추억을 훔쳐갔다.',
      '1994년 졸업앨범... 그 안에는 어떤 비밀이 숨겨져 있었을까?'
    ],
    introduction: [
      '동창회장 김영호가 당신을 급히 불렀습니다.',
      '"1994년 졸업앨범이 사라졌어요. 전시대에 분명히 있었는데..."',
      '앨범에는 30년 전의 사진들과 함께, 모두가 쓴 미래의 자신에게 보내는 편지가 들어있습니다.'
    ],
    setting: '청운고등학교 강당 및 교실',

    crimeTime: '20:30',
    crimeLocation: '강당 전시대',
    culpritId: 'char-park',
    victimId: undefined,
    motive: '과거의 치부를 숨기기 위해',
    motiveDetail: '박지훈은 30년 전 작성한 편지에 자신의 어두운 비밀을 고백했었다. 현재 시장 출마를 앞두고 그 내용이 공개되면 정치 생명이 끝날 것을 두려워했다.',
    method: '정전 틈을 타 앨범을 훔침',
    methodDetail: '박지훈은 미리 복도 배전함 위치를 파악해두고, 8시 30분에 화장실을 간다는 핑계로 자리를 비웠다. 배전함을 조작해 강당 전등을 끄고, 어둠 속에서 앨범을 가방에 숨겼다.',

    characters: [
      {
        id: 'char-kim',
        name: '김영호',
        role: 'witness',
        age: 48,
        gender: 'male',
        occupation: '동창회장 / 중소기업 대표',
        personality: '책임감 있고 꼼꼼함',
        appearance: '건장한 체격, 흰머리가 섞인 단정한 헤어스타일',
        background: '고등학교 때 반장이었으며, 졸업 후에도 동창회를 이끌어왔다.',
        alibi: {
          location: '강당 무대',
          time: '20:30',
          activity: '축사 준비 중이었음',
          witnesses: ['char-lee'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-park', type: '동창', description: '고등학교 때부터 친한 친구' },
          { targetId: 'char-choi', type: '동창', description: '같은 반 출신' }
        ],
        secrets: [],
        dialogues: [
          {
            topic: '앨범',
            lines: ['그 앨범은 우리 모두의 추억이에요. 누가 그런 짓을...', '8시쯤 확인했을 때는 분명 있었어요.']
          },
          {
            topic: '정전',
            lines: ['갑자기 불이 나갔을 때 다들 놀랐죠. 한 5분 정도 암전이었나...']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-park',
        name: '박지훈',
        role: 'culprit',
        age: 48,
        gender: 'male',
        occupation: '시 의원 / 시장 출마 예정자',
        personality: '야심차고 계산적, 겉으로는 친근함',
        appearance: '깔끔한 정장, 자신감 넘치는 표정, 살짝 대머리',
        background: '고등학교 때는 눈에 띄지 않는 학생이었으나, 졸업 후 정계에 입문해 성공했다.',
        alibi: {
          location: '화장실',
          time: '20:30',
          activity: '화장실을 다녀왔다고 주장',
          witnesses: [],
          hasHole: true,
          holeDetail: '화장실은 강당에서 복도를 지나야 하며, 배전함도 그 복도에 있다'
        },
        motive: {
          type: 'fear',
          description: '30년 전 편지에 고백한 비밀이 드러날 것을 두려워함',
          strength: 3
        },
        relationships: [
          { targetId: 'char-kim', type: '동창', description: '김영호와 친한 친구 사이' },
          { targetId: 'char-choi', type: '과거 연인', description: '고등학교 때 잠깐 사귀었음', isSecret: true }
        ],
        secrets: [
          {
            id: 'secret-park-1',
            content: '30년 전 편지에 "최수연에게 했던 일을 평생 후회한다"고 썼다',
            importance: 'critical',
            revealCondition: '앨범 사진 분석 후 대면'
          }
        ],
        dialogues: [
          {
            topic: '앨범',
            lines: ['아, 그 앨범? 솔직히 30년 전 일이라... 기억도 가물가물해요.', '편지요? 뭘 썼는지 기억도 안 나네요. 하하.']
          },
          {
            topic: '정전',
            lines: ['그때 화장실에 있었어요. 불이 꺼져서 좀 당황했죠.'],
            requiresEvidence: ['evidence-blackout']
          },
          {
            topic: '최수연',
            lines: ['...그 이름은 왜 갑자기?', '아, 그냥... 동창이죠. 별로 친하진 않았어요.'],
            revealsInfo: '최수연 이름에 민감하게 반응'
          }
        ],
        nervousTriggers: ['편지', '최수연', '30년 전', '비밀']
      },
      {
        id: 'char-lee',
        name: '이정민',
        role: 'witness',
        age: 48,
        gender: 'female',
        occupation: '고등학교 교사',
        personality: '관찰력이 뛰어나고 꼼꼼함',
        appearance: '안경을 쓴 지적인 인상, 단정한 옷차림',
        background: '졸업 후 모교에서 교사가 되어 30년째 근무 중이다.',
        alibi: {
          location: '강당 무대 옆',
          time: '20:30',
          activity: '김영호와 축사 내용을 상의 중',
          witnesses: ['char-kim'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-kim', type: '동창', description: '고등학교 때부터 친구' },
          { targetId: 'char-park', type: '동창', description: '같은 반이었지만 친하지 않음' }
        ],
        secrets: [
          {
            id: 'secret-lee-1',
            content: '정전 직전 박지훈이 복도 쪽으로 나가는 것을 봤다',
            importance: 'major',
            revealCondition: '박지훈 알리바이 질문 시'
          }
        ],
        dialogues: [
          {
            topic: '정전',
            lines: ['불이 꺼지기 직전에... 사실 박지훈 씨가 복도 쪽으로 나가는 걸 봤어요.', '화장실 간다고 했는데, 방향이 좀 이상했어요.']
          },
          {
            topic: '앨범',
            lines: ['그 앨범엔 우리 모두의 편지가 있어요. 미래의 자신에게 쓴...', '솔직히 부끄러운 내용도 있겠죠. 30년 전 우리는 철없었으니까.']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-choi',
        name: '최수연',
        role: 'suspect',
        age: 48,
        gender: 'female',
        occupation: '심리상담사',
        personality: '차분하고 이해심 많음, 과거의 상처를 안고 있음',
        appearance: '온화한 인상, 긴 생머리, 약간 지친 듯한 눈',
        background: '고등학교 때 왕따를 당했으며, 그 경험이 심리상담사가 된 계기가 되었다.',
        alibi: {
          location: '강당 뒷자리',
          time: '20:30',
          activity: '혼자 앉아있었음',
          witnesses: [],
          hasHole: true,
          holeDetail: '증인이 없어 확인 불가'
        },
        relationships: [
          { targetId: 'char-park', type: '과거 가해자', description: '고등학교 때 박지훈에게 괴롭힘을 당함', isSecret: true }
        ],
        secrets: [
          {
            id: 'secret-choi-1',
            content: '박지훈이 고등학교 때 자신을 왕따시킨 주동자였다',
            importance: 'critical',
            revealCondition: '충분한 신뢰 관계 형성 후'
          }
        ],
        dialogues: [
          {
            topic: '앨범',
            lines: ['그 앨범... 솔직히 보고 싶지 않아요.', '고등학교 때 좋은 기억만 있는 건 아니라서요.']
          },
          {
            topic: '박지훈',
            lines: ['...', '그 사람과는 이야기하고 싶지 않아요.'],
            revealsInfo: '박지훈에 대한 강한 거부감'
          }
        ],
        nervousTriggers: ['고등학교', '왕따', '박지훈']
      }
    ],

    evidence: [
      {
        id: 'evidence-blackout',
        name: '배전함 조작 흔적',
        type: 'physical',
        description: '복도 배전함에서 발견된 최근 조작 흔적',
        detailedDescription: '배전함 레버에 기름기 있는 손자국이 남아있다. 누군가 최근에 만졌다는 증거.',
        location: '복도',
        foundAt: '강당에서 화장실로 가는 복도의 배전함',
        linkedCharacters: ['char-park'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false,
        timestamp: '20:30'
      },
      {
        id: 'evidence-testimony-lee',
        name: '이정민의 목격 진술',
        type: 'testimony',
        description: '정전 직전 박지훈이 복도로 나가는 것을 목격',
        detailedDescription: '"불이 꺼지기 직전에 박지훈 씨가 화장실 방향이 아닌 복도 끝으로 걸어가는 걸 봤어요."',
        location: '강당',
        foundAt: '이정민과의 대화',
        linkedCharacters: ['char-park', 'char-lee'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false,
        timestamp: '20:28'
      },
      {
        id: 'evidence-bag',
        name: '박지훈의 서류 가방',
        type: 'physical',
        description: '박지훈이 들고 온 커다란 서류 가방',
        detailedDescription: '동창회에 서류 가방을 들고 온 것이 이상하다. 가방 안쪽에 앨범 크기의 직사각형 자국이 있다.',
        location: '강당',
        foundAt: '박지훈 좌석 아래',
        linkedCharacters: ['char-park'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: true,
        analysisResult: '가방 내부에 앨범과 일치하는 크기의 압착 자국 발견'
      },
      {
        id: 'evidence-letter-fragment',
        name: '찢어진 편지 조각',
        type: 'document',
        description: '화장실 휴지통에서 발견된 편지 조각',
        detailedDescription: '"...수연에게 했던 일을..." 이라는 글씨가 적힌 종이 조각. 박지훈의 필체와 유사하다.',
        location: '화장실',
        foundAt: '남자 화장실 휴지통',
        linkedCharacters: ['char-park', 'char-choi'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: true,
        analysisResult: '필체 분석 결과 박지훈의 것으로 추정'
      },
      {
        id: 'evidence-photo-old',
        name: '1994년 반 단체사진',
        type: 'document',
        description: '누군가 떨어뜨린 옛날 사진',
        detailedDescription: '사진 속에서 최수연이 구석에 혼자 서있고, 박지훈이 무리와 함께 웃고 있다.',
        location: '강당',
        foundAt: '전시대 근처 바닥',
        linkedCharacters: ['char-park', 'char-choi'],
        isCritical: false,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-redherring-choi',
        name: '최수연의 수상한 행동',
        type: 'testimony',
        description: '정전 중 최수연이 전시대 근처에서 목격됨',
        detailedDescription: '한 동창이 정전 중 휴대폰 불빛으로 최수연이 전시대 근처에 있는 것을 봤다고 증언.',
        location: '강당',
        foundAt: '익명 동창의 진술',
        linkedCharacters: ['char-choi'],
        isCritical: false,
        isRedHerring: true,
        redHerringReason: '최수연은 앨범을 확인하러 갔다가 이미 사라진 것을 발견했을 뿐',
        discoveryDifficulty: 1,
        analysisRequired: false
      }
    ],

    locations: [
      {
        id: 'loc-hall',
        name: '강당',
        description: '동창회가 열리는 학교 강당',
        atmosphere: '30년 만에 모인 동창들의 웅성거림과 옛 추억이 떠도는 공간',
        objects: [
          {
            id: 'obj-stage',
            name: '무대',
            description: '축사와 공연이 진행될 무대',
            examinationResult: '무대 위에는 마이크와 단상이 준비되어 있다.'
          },
          {
            id: 'obj-display',
            name: '전시대',
            description: '졸업앨범과 추억의 물건들이 전시된 테이블',
            examinationResult: '앨범이 있던 자리가 비어있다. 먼지 자국으로 앨범 크기를 알 수 있다.',
            containsEvidence: 'evidence-photo-old'
          },
          {
            id: 'obj-seats',
            name: '좌석 구역',
            description: '동창들이 앉아있는 좌석들',
            examinationResult: '박지훈의 자리 아래에 큰 서류 가방이 있다.',
            containsEvidence: 'evidence-bag'
          }
        ],
        connectedTo: ['loc-corridor']
      },
      {
        id: 'loc-corridor',
        name: '복도',
        description: '강당에서 화장실로 이어지는 복도',
        atmosphere: '형광등 불빛 아래 조용한 학교 복도, 오래된 학교 냄새',
        objects: [
          {
            id: 'obj-panel',
            name: '배전함',
            description: '복도 중간에 있는 전기 배전함',
            examinationResult: '최근에 누군가 만진 흔적이 있다. 레버에 기름기 있는 손자국.',
            containsEvidence: 'evidence-blackout'
          },
          {
            id: 'obj-window',
            name: '창문',
            description: '운동장이 보이는 창문',
            examinationResult: '밖은 어두운 밤이다. 특별한 것은 없다.'
          }
        ],
        connectedTo: ['loc-hall', 'loc-restroom']
      },
      {
        id: 'loc-restroom',
        name: '화장실',
        description: '남자 화장실',
        atmosphere: '학교 화장실 특유의 소독약 냄새',
        objects: [
          {
            id: 'obj-trash',
            name: '휴지통',
            description: '화장실 구석의 휴지통',
            examinationResult: '일반 휴지 외에 종이 조각이 섞여 있다.',
            containsEvidence: 'evidence-letter-fragment'
          },
          {
            id: 'obj-mirror',
            name: '거울',
            description: '세면대 위 거울',
            examinationResult: '거울에 물방울 자국이 있다. 누군가 최근에 세수를 한 것 같다.'
          }
        ],
        connectedTo: ['loc-corridor']
      }
    ],

    timeline: [
      { time: '19:00', event: '동창회 시작, 동창들 입장', participants: ['char-kim', 'char-park', 'char-lee', 'char-choi'], location: '강당', importance: 'minor', isRevealed: true },
      { time: '19:30', event: '앨범 전시 시작, 모두 관람', participants: ['char-kim', 'char-park', 'char-lee', 'char-choi'], location: '전시대', importance: 'major', isRevealed: true },
      { time: '20:00', event: '김영호와 이정민 무대 준비', participants: ['char-kim', 'char-lee'], location: '무대', importance: 'minor', isRevealed: true },
      { time: '20:25', event: '박지훈, 화장실 간다며 자리를 뜸', participants: ['char-park'], location: '강당', importance: 'critical', isRevealed: false },
      { time: '20:28', event: '이정민, 박지훈이 복도로 나가는 것 목격', participants: ['char-lee', 'char-park'], location: '강당 입구', importance: 'critical', isRevealed: false },
      { time: '20:30', event: '정전 발생 (박지훈이 배전함 조작)', participants: ['char-park'], location: '복도', importance: 'critical', isRevealed: false },
      { time: '20:30', event: '박지훈, 암전 중 앨범 훔침', participants: ['char-park'], location: '전시대', importance: 'critical', isRevealed: false },
      { time: '20:35', event: '전기 복구', participants: [], location: '강당', importance: 'major', isRevealed: true },
      { time: '20:40', event: '앨범 도난 발견', participants: ['char-kim'], location: '전시대', importance: 'major', isRevealed: true }
    ],

    solution: {
      summary: '박지훈이 30년 전 편지에 쓴 비밀(최수연 왕따 가담)이 공개될 것을 두려워해 앨범을 훔쳤다.',
      detailedExplanation: [
        '박지훈은 시장 출마를 앞두고 있었다.',
        '30년 전 졸업앨범 속 편지에 "최수연에게 했던 일을 후회한다"고 썼었다.',
        '이 내용이 공개되면 왕따 가해자로 낙인찍혀 정치 생명이 끝날 것을 두려워했다.',
        '동창회 전 미리 배전함 위치를 파악했다.',
        '8시 25분 화장실을 핑계로 자리를 떴다.',
        '복도의 배전함을 조작해 정전을 일으켰다.',
        '5분간의 암전 동안 앨범을 가방에 숨겼다.',
        '화장실에서 편지를 확인 후 일부를 찢어 버렸다.'
      ],
      keyEvidence: ['evidence-blackout', 'evidence-testimony-lee', 'evidence-bag', 'evidence-letter-fragment'],
      howToSolve: [
        '정전이 우연인지, 누군가 의도적으로 일으킨 것인지 확인',
        '정전 시간대에 자리를 비운 사람 파악',
        '배전함 조작 흔적 발견',
        '박지훈의 알리바이 확인 및 목격 증언 수집',
        '앨범에 담긴 편지의 중요성 파악'
      ],
      commonMistakes: [
        '최수연을 범인으로 의심하는 것 - 동기는 있지만 물적 증거가 없음',
        '정전을 단순 사고로 치부하는 것',
        '박지훈의 알리바이를 그대로 믿는 것'
      ]
    },

    deductionKeywords: {
      who: ['박지훈', '시의원', '정치인'],
      why: ['편지', '비밀', '왕따', '과거', '정치', '출마', '두려움'],
      how: ['정전', '배전함', '암전', '불', '조작'],
      when: ['8시 30분', '20:30', '정전 중', '암전'],
      where: ['전시대', '강당', '배전함', '복도']
    },

    tags: ['동창회', '정전', '과거의 비밀', '정치인', '왕따'],
    author: 'DEDUCTIO Team',
    version: '1.0.0'
  },

  // ========================================
  // 시나리오 #2: 미술실의 도난
  // ========================================
  {
    id: 'theft-002',
    title: '미술실의 도난',
    subtitle: '전국대회 출품작이 사라진 밤',
    type: 'theft',
    difficulty: 'easy',
    estimatedTime: 15,

    prologue: [
      '청운고 미술반의 자랑, 전국대회 출품작 "새벽의 꿈".',
      '대회를 이틀 앞두고, 그 그림이 흔적도 없이 사라졌다.',
      '누가, 왜 이 그림을 가져갔을까?'
    ],
    introduction: [
      '미술반 고문 선생님이 다급하게 연락해왔습니다.',
      '"전국대회 출품작이 없어졌어요. 어젯밤까지 분명 있었는데..."',
      '대회까지 48시간, 범인을 찾아야 합니다.'
    ],
    setting: '청운고등학교 미술실 및 주변',

    crimeTime: '22:00',
    crimeLocation: '미술실',
    culpritId: 'char-seo',
    victimId: undefined,
    motive: '질투심과 열등감',
    motiveDetail: '서민재는 1년 내내 노력했지만 항상 한유진에게 밀렸다. 자신의 그림 대신 한유진의 그림이 출품작으로 선정되자 분노했다.',
    method: '야간 자율학습 후 미술실에 잠입해 그림을 가져감',
    methodDetail: '서민재는 미술실 창문 잠금장치가 고장난 것을 알고 있었다. 야자 후 학교에 남아 창문으로 침입해 그림을 가져갔다.',

    characters: [
      {
        id: 'char-han',
        name: '한유진',
        role: 'victim',
        age: 17,
        gender: 'female',
        occupation: '미술반 반장 / 3학년',
        personality: '재능있고 겸손함, 약간 소심',
        appearance: '긴 생머리, 항상 물감이 묻은 앞치마를 입음',
        background: '미술 영재로 불리며 매년 상을 휩쓸었다.',
        alibi: {
          location: '집',
          time: '22:00',
          activity: '집에서 다음 작품 스케치 중',
          witnesses: ['부모님'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-seo', type: '라이벌', description: '같은 미술반이지만 항상 비교당함' }
        ],
        secrets: [],
        dialogues: [
          {
            topic: '그림',
            lines: ['제 1년 작업물이에요... 대회에서 꼭 보여주고 싶었는데...', '누가 이런 짓을 한 건지 정말 모르겠어요.']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-seo',
        name: '서민재',
        role: 'culprit',
        age: 17,
        gender: 'male',
        occupation: '미술반 부반장 / 3학년',
        personality: '겉으로는 친절하지만 내면에 열등감',
        appearance: '단정한 외모, 항상 미소를 띠지만 눈은 차가움',
        background: '열심히 노력하지만 항상 한유진에게 밀려 2등.',
        alibi: {
          location: '독서실',
          time: '22:00',
          activity: '독서실에서 공부했다고 주장',
          witnesses: [],
          hasHole: true,
          holeDetail: 'CCTV에 21:30에 독서실을 나간 기록'
        },
        motive: {
          type: 'jealousy',
          description: '항상 2등이라는 열등감, 자신의 노력이 인정받지 못한다는 분노',
          strength: 3
        },
        relationships: [
          { targetId: 'char-han', type: '라이벌', description: '한유진을 동경하면서도 질투함' }
        ],
        secrets: [
          {
            id: 'secret-seo-1',
            content: '한유진의 그림을 자신의 집 지하실에 숨겼다',
            importance: 'critical',
            revealCondition: 'CCTV 증거 제시 후 추궁'
          }
        ],
        dialogues: [
          {
            topic: '그림',
            lines: ['유진이 작품이요? 정말 안타깝네요.', '범인이 빨리 잡혔으면 좋겠어요.']
          },
          {
            topic: '알리바이',
            lines: ['저는 독서실에 있었어요. 밤 11시까지요.'],
            requiresEvidence: ['evidence-cctv']
          }
        ],
        nervousTriggers: ['독서실', 'CCTV', '창문']
      },
      {
        id: 'char-teacher',
        name: '김미영',
        role: 'witness',
        age: 35,
        gender: 'female',
        occupation: '미술 교사 / 미술반 고문',
        personality: '학생들을 아끼는 열정적인 교사',
        appearance: '보헤미안 스타일, 다양한 액세서리',
        background: '10년 경력의 미술 교사, 전국대회 다수 입상 지도.',
        alibi: {
          location: '학교',
          time: '22:00',
          activity: '9시에 퇴근함',
          witnesses: ['경비원'],
          hasHole: false
        },
        relationships: [],
        secrets: [],
        dialogues: [
          {
            topic: '미술실',
            lines: ['미술실 창문 잠금장치가 고장났다는 건 미술반 애들만 알아요.', '수리 요청했는데 아직 안 됐거든요.']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-guard',
        name: '박수철',
        role: 'witness',
        age: 55,
        gender: 'male',
        occupation: '학교 경비원',
        personality: '무던하고 성실함',
        appearance: '경비원 제복, 피곤한 표정',
        background: '5년째 야간 경비를 담당.',
        alibi: {
          location: '경비실',
          time: '22:00',
          activity: '경비실에서 CCTV 모니터링',
          witnesses: [],
          hasHole: false
        },
        relationships: [],
        secrets: [],
        dialogues: [
          {
            topic: 'CCTV',
            lines: ['미술실 쪽 CCTV가 한 달 전에 고장났어요.', '근데 정문 CCTV는 멀쩡해요. 확인해보실래요?']
          }
        ],
        nervousTriggers: []
      }
    ],

    evidence: [
      {
        id: 'evidence-window',
        name: '열린 창문',
        type: 'physical',
        description: '미술실 창문이 열려있고 잠금장치가 고장',
        detailedDescription: '창문 잠금장치가 고장나있어 밖에서도 열 수 있다. 창틀에 흙 묻은 발자국.',
        location: '미술실',
        foundAt: '미술실 창가',
        linkedCharacters: ['char-seo'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false,
        timestamp: '22:00'
      },
      {
        id: 'evidence-cctv',
        name: '정문 CCTV 영상',
        type: 'digital',
        description: '서민재가 21:30에 독서실을 나가는 장면',
        detailedDescription: 'CCTV에 서민재가 21:30에 학교 방향으로 걸어가는 모습이 찍혀있다.',
        location: '경비실',
        foundAt: 'CCTV 녹화 파일',
        linkedCharacters: ['char-seo'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: true,
        analysisResult: '서민재가 독서실에서 학교 방향으로 이동하는 것 확인'
      },
      {
        id: 'evidence-paint',
        name: '물감 자국',
        type: 'forensic',
        description: '창문 근처에서 발견된 파란색 물감',
        detailedDescription: '한유진의 그림 "새벽의 꿈"에 사용된 특수 코발트 블루와 동일한 물감.',
        location: '미술실',
        foundAt: '창문 아래',
        linkedCharacters: [],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: true,
        analysisResult: '그림에 사용된 물감과 동일한 성분'
      },
      {
        id: 'evidence-sketch',
        name: '서민재의 스케치북',
        type: 'document',
        description: '서민재 책상에서 발견된 스케치북',
        detailedDescription: '스케치북 마지막 페이지에 "왜 항상 나는 2등인가"라고 적혀있다.',
        location: '미술실',
        foundAt: '서민재 자리',
        linkedCharacters: ['char-seo'],
        isCritical: false,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-redherring-outsider',
        name: '의문의 발자국',
        type: 'physical',
        description: '미술실 밖 화단에서 발견된 성인 남성 발자국',
        detailedDescription: '큰 사이즈의 운동화 발자국이 화단에 남아있다.',
        location: '미술실 밖',
        foundAt: '화단',
        linkedCharacters: [],
        isCritical: false,
        isRedHerring: true,
        redHerringReason: '조경 관리사가 낮에 작업하며 남긴 발자국',
        discoveryDifficulty: 1,
        analysisRequired: false
      }
    ],

    locations: [
      {
        id: 'loc-artroom',
        name: '미술실',
        description: '미술반이 활동하는 교실',
        atmosphere: '물감과 테레빈유 냄새, 완성되지 않은 작품들',
        objects: [
          {
            id: 'obj-easel',
            name: '이젤',
            description: '그림이 있던 이젤',
            examinationResult: '이젤이 비어있다. 그림이 있던 자리에 먼지 자국.',
            containsEvidence: undefined
          },
          {
            id: 'obj-window',
            name: '창문',
            description: '미술실 뒤쪽 창문',
            examinationResult: '잠금장치가 고장나있고 살짝 열려있다.',
            containsEvidence: 'evidence-window'
          },
          {
            id: 'obj-desk-seo',
            name: '서민재 책상',
            description: '서민재가 주로 사용하는 책상',
            examinationResult: '스케치북과 물감이 있다.',
            containsEvidence: 'evidence-sketch'
          }
        ],
        connectedTo: ['loc-corridor', 'loc-outside']
      },
      {
        id: 'loc-guardroom',
        name: '경비실',
        description: 'CCTV 모니터가 있는 경비실',
        atmosphere: '어두운 조명, 여러 개의 모니터 화면',
        objects: [
          {
            id: 'obj-monitor',
            name: 'CCTV 모니터',
            description: '학교 곳곳을 비추는 모니터들',
            examinationResult: '미술실 쪽 CCTV는 고장. 정문 CCTV는 작동 중.',
            containsEvidence: 'evidence-cctv'
          }
        ],
        connectedTo: ['loc-entrance']
      }
    ],

    timeline: [
      { time: '18:00', event: '미술반 활동 종료, 김미영 교사가 문 잠금', participants: ['char-teacher'], location: '미술실', importance: 'minor', isRevealed: true },
      { time: '19:00', event: '서민재, 독서실 입실', participants: ['char-seo'], location: '독서실', importance: 'minor', isRevealed: true },
      { time: '21:00', event: '김미영 교사 퇴근', participants: ['char-teacher'], location: '학교 정문', importance: 'minor', isRevealed: true },
      { time: '21:30', event: '서민재, 독서실 퇴실 (CCTV 포착)', participants: ['char-seo'], location: '독서실', importance: 'critical', isRevealed: false },
      { time: '21:45', event: '서민재, 학교 도착', participants: ['char-seo'], location: '학교 후문', importance: 'critical', isRevealed: false },
      { time: '22:00', event: '서민재, 창문으로 미술실 침입', participants: ['char-seo'], location: '미술실', importance: 'critical', isRevealed: false },
      { time: '22:10', event: '그림 탈취 후 도주', participants: ['char-seo'], location: '미술실', importance: 'critical', isRevealed: false },
      { time: '08:00', event: '다음날 아침, 도난 발견', participants: ['char-teacher', 'char-han'], location: '미술실', importance: 'major', isRevealed: true }
    ],

    solution: {
      summary: '서민재가 질투심에 한유진의 출품작을 훔쳤다.',
      detailedExplanation: [
        '서민재는 1년 내내 노력했지만 항상 한유진에게 밀렸다.',
        '전국대회 출품작으로 한유진의 그림이 선정되자 분노했다.',
        '미술실 창문 잠금장치가 고장난 것을 알고 있었다.',
        '야간자율학습 후 독서실을 나와 학교로 향했다.',
        '창문으로 미술실에 침입해 그림을 가져갔다.',
        '그림은 자신의 집에 숨겼다.'
      ],
      keyEvidence: ['evidence-window', 'evidence-cctv', 'evidence-paint', 'evidence-sketch'],
      howToSolve: [
        '침입 경로 파악 (고장난 창문)',
        '범행 시간대에 학교 근처에 있던 사람 확인',
        'CCTV로 알리바이 검증',
        '동기가 있는 사람 파악'
      ],
      commonMistakes: [
        '외부인 침입으로 단정짓는 것',
        '서민재의 알리바이를 그대로 믿는 것'
      ]
    },

    deductionKeywords: {
      who: ['서민재', '부반장', '미술반'],
      why: ['질투', '열등감', '2등', '출품작', '대회'],
      how: ['창문', '침입', '잠금장치', '고장'],
      when: ['10시', '22:00', '밤', '야간'],
      where: ['미술실', '창문', '독서실']
    },

    tags: ['미술', '질투', '야간침입', '대회', '학생'],
    author: 'DEDUCTIO Team',
    version: '1.0.0'
  },

  // ========================================
  // 시나리오 #3: 도서관의 희귀본
  // ========================================
  {
    id: 'theft-003',
    title: '도서관의 희귀본',
    subtitle: '100년 된 초판본이 사라지다',
    type: 'theft',
    difficulty: 'medium',
    estimatedTime: 20,

    prologue: [
      '청운고 도서관의 보물, 1924년 초판 "무정" 원본.',
      '유리 진열장 안에 소중히 보관되어 있던 그 책이',
      '개교기념일 아침, 흔적도 없이 사라졌다.'
    ],
    introduction: [
      '도서관 사서 선생님이 허둥대며 찾아왔습니다.',
      '"희귀본 진열장이 열려있어요! 초판본이 없어졌어요!"',
      '이 책은 시가 5천만 원 이상의 가치가 있습니다.'
    ],
    setting: '청운고등학교 도서관',

    crimeTime: '06:30',
    crimeLocation: '도서관 희귀본 코너',
    culpritId: 'char-librarian-son',
    victimId: undefined,
    motive: '아버지의 병원비를 마련하기 위해',
    motiveDetail: '도서관 사서의 아들 정우현은 아버지가 암 투병 중이라는 것을 알게 됐다. 치료비가 없어 희귀본을 팔아 병원비를 마련하려 했다.',
    method: '어머니의 열쇠를 복제해 새벽에 침입',
    methodDetail: '정우현은 어머니 정수정이 보관하는 진열장 열쇠를 몰래 복제했다. 개교기념일 새벽, 어머니가 출근하기 전 먼저 학교에 가서 책을 훔쳤다.',

    characters: [
      {
        id: 'char-librarian',
        name: '정수정',
        role: 'witness',
        age: 45,
        gender: 'female',
        occupation: '도서관 사서',
        personality: '꼼꼼하고 책을 사랑함',
        appearance: '안경을 쓴 온화한 인상',
        background: '20년째 학교 도서관을 관리. 희귀본 코너를 만든 장본인.',
        alibi: {
          location: '집',
          time: '06:30',
          activity: '출근 준비 중',
          witnesses: ['char-librarian-son'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-librarian-son', type: '가족', description: '아들과 함께 살고 있음' }
        ],
        secrets: [
          {
            id: 'secret-lib-1',
            content: '남편이 암 투병 중이며 치료비 때문에 어려움을 겪고 있다',
            importance: 'major',
            revealCondition: '충분한 신뢰 후'
          }
        ],
        dialogues: [
          {
            topic: '희귀본',
            lines: ['그 책은 제가 10년 전에 어렵게 구한 거예요.', '진열장 열쇠는 저만 가지고 있어요. 근데 어떻게...']
          },
          {
            topic: '열쇠',
            lines: ['진열장 열쇠는 항상 제 가방에 있어요.', '...근데 최근에 한번 잃어버린 적이 있긴 해요. 바로 찾았지만.']
          }
        ],
        nervousTriggers: ['열쇠', '가족']
      },
      {
        id: 'char-librarian-son',
        name: '정우현',
        role: 'culprit',
        age: 17,
        gender: 'male',
        occupation: '3학년 학생 / 사서 아들',
        personality: '착하고 효심이 깊음, 최근 우울해 보임',
        appearance: '마른 체형, 다크서클이 짙음',
        background: '어머니가 사서라 도서관을 자주 이용. 최근 성적이 급락.',
        alibi: {
          location: '집',
          time: '06:30',
          activity: '집에서 자고 있었다고 주장',
          witnesses: [],
          hasHole: true,
          holeDetail: '어머니가 출근할 때 방에 없었다는 이웃 목격담'
        },
        motive: {
          type: 'protection',
          description: '아버지의 암 치료비를 마련하려 함',
          strength: 3
        },
        relationships: [
          { targetId: 'char-librarian', type: '가족', description: '어머니' }
        ],
        secrets: [
          {
            id: 'secret-son-1',
            content: '아버지의 병원비 청구서를 우연히 보고 절망했다',
            importance: 'critical',
            revealCondition: '가족 상황 언급 시'
          }
        ],
        dialogues: [
          {
            topic: '희귀본',
            lines: ['그 책이요? 비싸다고 들었어요.', '어머니가 아끼시는 거라...']
          },
          {
            topic: '아버지',
            lines: ['...아버지는 지금 많이 편찮으세요.', '저희 집 사정이 좀 어려워요.'],
            revealsInfo: '가정의 경제적 어려움'
          }
        ],
        nervousTriggers: ['돈', '아버지', '병원']
      },
      {
        id: 'char-bookworm',
        name: '이서준',
        role: 'suspect',
        age: 17,
        gender: 'male',
        occupation: '도서부원 / 3학년',
        personality: '책벌레, 고서에 관심이 많음',
        appearance: '두꺼운 안경, 항상 책을 들고 다님',
        background: '도서관을 거의 집처럼 이용하는 학생.',
        alibi: {
          location: '집',
          time: '06:30',
          activity: '집에서 자고 있었음',
          witnesses: ['부모님'],
          hasHole: false
        },
        relationships: [],
        secrets: [],
        dialogues: [
          {
            topic: '희귀본',
            lines: ['그 책은 정말 대단한 거예요. 시가 5천만 원이 넘죠.', '저도 한번 만져보고 싶었는데... 진열장 안이라.']
          }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-security',
        name: '강민호',
        role: 'witness',
        age: 50,
        gender: 'male',
        occupation: '경비원',
        personality: '꼼꼼하고 규칙적',
        appearance: '경비원 제복, 단정한 헤어스타일',
        background: '새벽 경비 담당. CCTV 관리.',
        alibi: {
          location: '경비실',
          time: '06:30',
          activity: '순찰 후 경비실 복귀',
          witnesses: [],
          hasHole: false
        },
        relationships: [],
        secrets: [],
        dialogues: [
          {
            topic: 'CCTV',
            lines: ['도서관 내부 CCTV는 없어요. 예산 문제로.', '근데 정문 CCTV에 6시 반쯤 누가 들어가는 게 찍혔어요.']
          },
          {
            topic: '목격',
            lines: ['6시쯤 순찰 돌 때 도서관 쪽에서 불빛이 보인 것 같기도...', '근데 그때는 신경 안 썼어요.']
          }
        ],
        nervousTriggers: []
      }
    ],

    evidence: [
      {
        id: 'evidence-cctv-entrance',
        name: '정문 CCTV 영상',
        type: 'digital',
        description: '새벽 6시 20분경 후드를 쓴 인물이 입장',
        detailedDescription: '체형과 걸음걸이가 정우현과 유사. 후드 때문에 얼굴은 보이지 않음.',
        location: '경비실',
        foundAt: 'CCTV 저장장치',
        linkedCharacters: ['char-librarian-son'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: true,
        analysisResult: '체형 분석 결과 정우현과 93% 일치'
      },
      {
        id: 'evidence-duplicate-key',
        name: '복제된 열쇠',
        type: 'physical',
        description: '정우현의 가방에서 발견된 진열장 열쇠',
        detailedDescription: '원본과 동일한 규격의 열쇠. 최근 복제된 듯 번들거림.',
        location: '정우현 사물함',
        foundAt: '정우현 가방',
        linkedCharacters: ['char-librarian-son'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      },
      {
        id: 'evidence-receipt',
        name: '열쇠 복제 영수증',
        type: 'document',
        description: '3일 전 날짜의 열쇠 복제 영수증',
        detailedDescription: '학교 근처 철물점 영수증. 진열장 열쇠와 동일한 규격.',
        location: '정우현 방',
        foundAt: '책상 서랍',
        linkedCharacters: ['char-librarian-son'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      },
      {
        id: 'evidence-hospital-bill',
        name: '병원비 청구서',
        type: 'document',
        description: '정우현 아버지의 암 치료비 청구서',
        detailedDescription: '3천만 원이 넘는 치료비 청구서. 미납 경고 문구.',
        location: '정우현 집',
        foundAt: '정우현 방',
        linkedCharacters: ['char-librarian-son', 'char-librarian'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-neighbor',
        name: '이웃 주민 증언',
        type: 'testimony',
        description: '아침 일찍 정우현이 집을 나가는 것을 봤다는 증언',
        detailedDescription: '"6시쯤 우현이가 후드 쓰고 나가더라고요. 이른 아침에 웬일인가 했죠."',
        location: '정우현 집 근처',
        foundAt: '이웃 인터뷰',
        linkedCharacters: ['char-librarian-son'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-redherring-bookworm',
        name: '이서준의 고서 관심',
        type: 'testimony',
        description: '이서준이 희귀본에 대해 조사하고 있었다는 증언',
        detailedDescription: '이서준이 희귀본 가격을 알아보고 있었다고 다른 학생이 증언.',
        location: '도서관',
        foundAt: '학생 인터뷰',
        linkedCharacters: ['char-bookworm'],
        isCritical: false,
        isRedHerring: true,
        redHerringReason: '이서준은 순수한 학문적 관심으로 조사한 것',
        discoveryDifficulty: 1,
        analysisRequired: false
      }
    ],

    locations: [
      {
        id: 'loc-library',
        name: '도서관',
        description: '희귀본 코너가 있는 학교 도서관',
        atmosphere: '책 냄새와 조용한 분위기',
        objects: [
          {
            id: 'obj-display-case',
            name: '희귀본 진열장',
            description: '유리로 된 특별 진열장',
            examinationResult: '자물쇠가 열려있다. 강제로 연 흔적은 없음.',
            containsEvidence: undefined
          },
          {
            id: 'obj-librarian-desk',
            name: '사서 책상',
            description: '정수정 선생님의 책상',
            examinationResult: '서랍에 열쇠 관리 기록이 있다. 최근 열쇠를 한번 잃어버렸다고 기록.',
            containsEvidence: undefined
          }
        ],
        connectedTo: ['loc-corridor']
      },
      {
        id: 'loc-security',
        name: '경비실',
        description: 'CCTV 모니터가 있는 경비실',
        atmosphere: '어두운 조명, 여러 화면',
        objects: [
          {
            id: 'obj-cctv-monitor',
            name: 'CCTV 모니터',
            description: 'CCTV 화면들',
            examinationResult: '정문 CCTV에 새벽 6시 20분경 후드 쓴 인물 포착.',
            containsEvidence: 'evidence-cctv-entrance'
          }
        ],
        connectedTo: ['loc-entrance']
      }
    ],

    timeline: [
      { time: '06:00', event: '정우현, 집을 나섬 (이웃 목격)', participants: ['char-librarian-son'], location: '집', importance: 'critical', isRevealed: false },
      { time: '06:20', event: '후드 쓴 인물 학교 진입 (CCTV 포착)', participants: ['char-librarian-son'], location: '정문', importance: 'critical', isRevealed: false },
      { time: '06:30', event: '희귀본 도난', participants: ['char-librarian-son'], location: '도서관', importance: 'critical', isRevealed: false },
      { time: '06:45', event: '정우현 귀가', participants: ['char-librarian-son'], location: '집', importance: 'major', isRevealed: false },
      { time: '07:30', event: '정수정 출근', participants: ['char-librarian'], location: '도서관', importance: 'minor', isRevealed: true },
      { time: '08:00', event: '도난 발견', participants: ['char-librarian'], location: '도서관', importance: 'major', isRevealed: true }
    ],

    solution: {
      summary: '정우현이 아버지의 치료비를 마련하기 위해 어머니의 열쇠를 복제해 희귀본을 훔쳤다.',
      detailedExplanation: [
        '정우현은 아버지가 암 투병 중이며 치료비가 없다는 것을 알게 됐다.',
        '희귀본의 가치가 5천만 원 이상이라는 것을 알았다.',
        '어머니가 관리하는 진열장 열쇠를 몰래 복제했다.',
        '개교기념일 새벽, 어머니보다 먼저 학교에 갔다.',
        '복제한 열쇠로 진열장을 열고 책을 가져갔다.',
        '책을 팔아 치료비에 보태려 했다.'
      ],
      keyEvidence: ['evidence-cctv-entrance', 'evidence-duplicate-key', 'evidence-receipt', 'evidence-hospital-bill', 'evidence-neighbor'],
      howToSolve: [
        '진열장이 어떻게 열렸는지 확인 (강제가 아닌 열쇠)',
        '열쇠에 접근할 수 있는 사람 파악',
        'CCTV로 새벽 침입자 확인',
        '동기가 있는 사람 찾기'
      ],
      commonMistakes: [
        '도서부원 이서준을 의심하는 것',
        '외부 절도범으로 단정짓는 것',
        '정수정 사서를 의심하는 것'
      ]
    },

    deductionKeywords: {
      who: ['정우현', '사서 아들', '정수정 아들'],
      why: ['병원비', '치료비', '아버지', '암', '돈'],
      how: ['열쇠', '복제', '진열장'],
      when: ['새벽', '6시', '아침'],
      where: ['도서관', '진열장', '희귀본 코너']
    },

    tags: ['도서관', '희귀본', '효도', '병원비', '열쇠복제'],
    author: 'DEDUCTIO Team',
    version: '1.0.0'
  },

  // 나머지 17개 시나리오는 계속...
  // (분량 관계상 여기서는 3개만 상세 작성, 나머지는 별도 파일로)
];

// 추가 시나리오들 (간략 버전)
export const additionalTheftScenarios: Scenario[] = [
  // #4~#20은 별도 파일에서 추가
];
