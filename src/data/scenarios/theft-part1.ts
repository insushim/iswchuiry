// ========================================
// 도난 시나리오 Part 1 (1-10)
// ========================================

import { Scenario } from './types';

export const theftScenariosPart1: Scenario[] = [
  // ============ THEFT-001: 사라진 졸업앨범 ============
  {
    id: 'theft-001',
    title: '사라진 졸업앨범',
    subtitle: '동창회의 비밀',
    type: 'theft',
    difficulty: 'easy',
    estimatedTime: 25,

    prologue: [
      '10년 만에 열린 동창회.',
      '추억의 졸업앨범이 사라졌다.',
      '누군가 과거를 숨기려 한다.'
    ],
    introduction: [
      '서울 시내 한 호텔 연회장에서 열린 한빛고등학교 10주년 동창회.',
      '행사의 하이라이트였던 졸업앨범 전시가 시작되려던 순간, 앨범이 사라진 것을 발견했다.',
      '앨범에는 모두의 졸업사진과 함께, 당시 학교 축제 사진들이 담겨 있었다.'
    ],
    setting: '서울 시내 호텔 연회장, 10주년 동창회',

    crimeTime: '19:30',
    crimeLocation: '연회장 전시 테이블',
    culpritId: 'char-001-3',
    victimId: undefined,
    motive: '과거 은폐',
    motiveDetail: '졸업앨범에 있는 학교 축제 사진에서 자신의 학교폭력 장면이 찍혀 있어, 현재 국회의원 후보로 출마한 자신의 이미지를 보호하기 위해',
    method: '정전을 이용한 절도',
    methodDetail: '미리 매수한 호텔 직원을 통해 19:30에 잠시 정전을 일으키고, 그 틈에 앨범을 가방에 숨김',

    characters: [
      {
        id: 'char-001-1',
        name: '김동창',
        role: 'witness',
        age: 28,
        gender: 'male',
        occupation: '동창회 총무',
        personality: '꼼꼼하고 책임감이 강함',
        appearance: '안경을 쓴 평범한 인상의 남성',
        background: '고등학교 시절 반장을 맡았으며, 동창회 준비를 도맡아 함',
        alibi: {
          location: '연회장 입구',
          time: '19:25-19:35',
          activity: '늦게 도착한 동창 맞이',
          witnesses: ['호텔 직원'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-001-2', type: '동창', description: '같은 반 친구', isSecret: false }
        ],
        secrets: [],
        dialogues: [
          { topic: '앨범', lines: ['제가 직접 가져왔어요. 분명 테이블 위에 뒀는데...', '정전되기 전까지는 확실히 있었습니다.'], revealsInfo: '앨범 위치 확인' },
          { topic: '정전', lines: ['갑자기 불이 나갔어요. 한 30초 정도였나...', '다들 당황했죠.'], revealsInfo: '정전 시간' }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-001-2',
        name: '이수진',
        role: 'witness',
        age: 28,
        gender: 'female',
        occupation: '프리랜서 사진작가',
        personality: '관찰력이 뛰어나고 호기심이 많음',
        appearance: '카메라를 항상 들고 다니는 활발한 여성',
        background: '고등학교 시절 사진반 부장, 졸업앨범 사진 일부를 촬영함',
        alibi: {
          location: '연회장 중앙',
          time: '19:25-19:35',
          activity: '동창들 사진 촬영',
          witnesses: ['여러 동창'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-001-3', type: '동창', description: '같은 반이었으나 사이가 좋지 않았음', isSecret: true }
        ],
        secrets: [
          { id: 'secret-001-1', content: '박정호가 학교 축제 때 후배를 괴롭히는 장면을 찍은 적 있음', importance: 'critical', revealCondition: '앨범 사진에 대해 추궁할 때' }
        ],
        dialogues: [
          { topic: '앨범', lines: ['제가 찍은 사진도 많이 들어있어요.', '특히 축제 사진들... 다양한 장면이 담겨있죠.'], revealsInfo: '앨범 내용' },
          { topic: '박정호', lines: ['...그 사람 요즘 정치한다면서요?', '고등학교 때랑 많이 달라졌더라고요.'], revealsInfo: '박정호 현재 상황', requiresEvidence: ['evidence-001-3'] }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-001-3',
        name: '박정호',
        role: 'culprit',
        age: 28,
        gender: 'male',
        occupation: '국회의원 후보',
        personality: '야망이 크고 이미지 관리에 철저함',
        appearance: '깔끔한 정장을 입은 자신감 넘치는 남성',
        background: '고등학교 시절 학생회장, 현재 최연소 국회의원 후보로 주목받고 있음',
        alibi: {
          location: '연회장 한쪽 구석',
          time: '19:25-19:35',
          activity: '지인과 대화',
          witnesses: ['비서'],
          hasHole: true,
          holeDetail: '비서는 정전 중 박정호를 보지 못했다고 함'
        },
        motive: {
          type: 'fear',
          description: '졸업앨범 축제 사진에 자신이 후배를 괴롭히는 장면이 찍혀 있어, 정치 생명에 치명적인 스캔들이 될 것을 우려',
          strength: 3
        },
        relationships: [
          { targetId: 'char-001-4', type: '고용관계', description: '호텔 직원을 매수', isSecret: true }
        ],
        secrets: [
          { id: 'secret-001-2', content: '호텔 직원에게 돈을 주고 정전을 부탁함', importance: 'critical', revealCondition: '호텔 직원 심문 또는 CCTV 확인' }
        ],
        dialogues: [
          { topic: '앨범', lines: ['아, 앨범이요? 저도 보고 싶었는데 아쉽네요.', '범인이 빨리 잡히면 좋겠습니다.'], revealsInfo: '거짓 관심' },
          { topic: '정전', lines: ['갑자기 깜깜해져서 당황했죠.', '핸드폰 불빛으로 겨우 버텼습니다.'], revealsInfo: '알리바이 주장' },
          { topic: '학창시절', lines: ['...좋은 추억만 있죠.', '저는 학생회 활동 열심히 했어요.'], revealsInfo: '과거 회피', requiresEvidence: ['evidence-001-5'] }
        ],
        nervousTriggers: ['학교폭력', '축제 사진', '후배']
      },
      {
        id: 'char-001-4',
        name: '최민수',
        role: 'witness',
        age: 35,
        gender: 'male',
        occupation: '호텔 직원',
        personality: '소심하고 돈에 약함',
        appearance: '호텔 유니폼을 입은 평범한 중년 남성',
        background: '호텔에서 7년째 근무, 최근 빚 문제로 고민 중',
        alibi: {
          location: '전기실',
          time: '19:28-19:32',
          activity: '전기 점검',
          witnesses: ['없음'],
          hasHole: true,
          holeDetail: '정전 시간과 정확히 일치'
        },
        relationships: [
          { targetId: 'char-001-3', type: '매수관계', description: '박정호에게 돈을 받음', isSecret: true }
        ],
        secrets: [
          { id: 'secret-001-3', content: '박정호에게 300만원을 받고 정전을 일으킴', importance: 'critical', revealCondition: '강하게 추궁하거나 통장 거래 내역 증거 제시' }
        ],
        dialogues: [
          { topic: '정전', lines: ['갑자기 발생한 거예요.', '오래된 건물이라 가끔 그래요.'], revealsInfo: '거짓 해명' },
          { topic: '수상한 사람', lines: ['글쎄요... 특별히 본 건 없는데...', '...'], revealsInfo: '회피' }
        ],
        nervousTriggers: ['돈', '통장', '매수', 'CCTV']
      },
      {
        id: 'char-001-5',
        name: '정미영',
        role: 'witness',
        age: 28,
        gender: 'female',
        occupation: '변호사',
        personality: '논리적이고 정의감이 강함',
        appearance: '지적인 인상의 단정한 여성',
        background: '고등학교 시절 박정호에게 괴롭힘을 당한 후배의 친구',
        alibi: {
          location: '연회장',
          time: '19:25-19:35',
          activity: '다른 동창과 대화',
          witnesses: ['여러 동창'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-001-3', type: '적대', description: '과거 사건으로 박정호를 싫어함', isSecret: false }
        ],
        secrets: [
          { id: 'secret-001-4', content: '박정호의 과거 학교폭력을 알고 있음', importance: 'major', revealCondition: '박정호에 대해 물을 때' }
        ],
        dialogues: [
          { topic: '박정호', lines: ['그 사람이 정치를 한다니 웃기죠.', '고등학교 때 정말 심했어요.'], revealsInfo: '박정호 과거' },
          { topic: '앨범', lines: ['그 앨범에 증거가 있었는데...', '축제 때 찍힌 사진 말이에요.'], revealsInfo: '앨범의 중요성' }
        ],
        nervousTriggers: []
      }
    ],

    evidence: [
      {
        id: 'evidence-001-1',
        name: '빈 전시 테이블',
        type: 'physical',
        description: '졸업앨범이 놓여있던 테이블. 앨범이 사라졌다.',
        detailedDescription: '테이블보 위에 앨범이 놓여있던 흔적이 있다. 먼지 패턴으로 보아 큰 책 크기의 물건이 있었던 것이 분명하다.',
        location: '연회장 전시 공간',
        foundAt: 'loc-001-1',
        linkedCharacters: [],
        isCritical: false,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-001-2',
        name: '정전 기록',
        type: 'document',
        description: '호텔 전기 시스템 로그',
        detailedDescription: '19:30:00에 수동으로 전원이 차단되었다가 19:30:45에 복구됨. 자동 차단이 아닌 수동 조작의 흔적.',
        location: '호텔 관리실',
        foundAt: 'loc-001-3',
        linkedCharacters: ['char-001-4'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: true,
        analysisResult: '정전은 자연 발생이 아닌 의도적 조작이었음'
      },
      {
        id: 'evidence-001-3',
        name: '박정호 선거 포스터',
        type: 'document',
        description: '국회의원 후보 박정호의 선거 홍보물',
        detailedDescription: '"깨끗한 정치, 새로운 시작" 이라는 슬로건과 함께 청렴한 이미지를 강조하고 있다.',
        location: '연회장',
        foundAt: 'loc-001-1',
        linkedCharacters: ['char-001-3'],
        isCritical: false,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-001-4',
        name: '통장 거래 내역',
        type: 'document',
        description: '호텔 직원 최민수의 최근 거래 내역',
        detailedDescription: '어제 날짜로 300만원이 현금 입금되어 있다. 출처 불명.',
        location: '호텔 직원 사물함',
        foundAt: 'loc-001-4',
        linkedCharacters: ['char-001-4', 'char-001-3'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      },
      {
        id: 'evidence-001-5',
        name: '오래된 사진',
        type: 'physical',
        description: '이수진이 가지고 있던 축제 사진 사본',
        detailedDescription: '졸업앨범에 실린 것과 같은 축제 사진. 구석에 박정호가 후배의 멱살을 잡고 있는 장면이 찍혀있다.',
        location: '이수진 가방',
        foundAt: 'loc-001-1',
        linkedCharacters: ['char-001-2', 'char-001-3'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-001-6',
        name: 'CCTV 영상',
        type: 'digital',
        description: '연회장 CCTV 녹화 영상',
        detailedDescription: '정전 직전 박정호가 전시 테이블 근처로 이동하는 모습이 찍혀있다. 정전 후에는 화면이 어둡다.',
        location: '호텔 보안실',
        foundAt: 'loc-001-3',
        linkedCharacters: ['char-001-3'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: true,
        analysisResult: '박정호가 정전 직전 테이블 근처에 있었음 확인'
      },
      {
        id: 'evidence-001-7',
        name: '박정호의 가방',
        type: 'physical',
        description: '박정호가 들고 온 서류 가방',
        detailedDescription: '평소보다 불룩해 보이는 가방. 본인은 서류가 많다고 주장.',
        location: '연회장 클로크룸',
        foundAt: 'loc-001-2',
        linkedCharacters: ['char-001-3'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      }
    ],

    locations: [
      {
        id: 'loc-001-1',
        name: '연회장',
        description: '동창회가 열리고 있는 넓은 연회장',
        atmosphere: '화려한 조명과 동창들의 웃음소리로 가득하다',
        objects: [
          { id: 'obj-1', name: '전시 테이블', description: '앨범이 놓여있던 테이블', examinationResult: '먼지 패턴으로 보아 큰 책이 있었던 흔적', containsEvidence: 'evidence-001-1' },
          { id: 'obj-2', name: '박정호 포스터', description: '벽에 붙은 선거 포스터', examinationResult: '깨끗한 이미지를 강조하는 홍보물', containsEvidence: 'evidence-001-3' }
        ],
        connectedTo: ['loc-001-2', 'loc-001-3']
      },
      {
        id: 'loc-001-2',
        name: '클로크룸',
        description: '손님들의 짐을 보관하는 공간',
        atmosphere: '조용하고 어두운 편이다',
        objects: [
          { id: 'obj-3', name: '박정호 가방', description: '불룩한 서류 가방', examinationResult: '가방 안에 졸업앨범이 숨겨져 있다', containsEvidence: 'evidence-001-7', isLocked: true, unlockMethod: '박정호 동의 또는 강력한 증거' }
        ],
        connectedTo: ['loc-001-1']
      },
      {
        id: 'loc-001-3',
        name: '호텔 관리 구역',
        description: '호텔 직원만 출입 가능한 구역',
        atmosphere: '형광등 불빛 아래 기계음이 들린다',
        objects: [
          { id: 'obj-4', name: '전기 패널', description: '건물 전체 전력을 관리하는 패널', examinationResult: '최근 수동 조작된 흔적', containsEvidence: 'evidence-001-2' },
          { id: 'obj-5', name: 'CCTV 모니터', description: '보안 카메라 영상을 보여주는 모니터', examinationResult: '정전 전후 영상 확인 가능', containsEvidence: 'evidence-001-6' }
        ],
        connectedTo: ['loc-001-1', 'loc-001-4']
      },
      {
        id: 'loc-001-4',
        name: '직원 휴게실',
        description: '호텔 직원들의 휴게 공간',
        atmosphere: '낡은 소파와 사물함이 있다',
        objects: [
          { id: 'obj-6', name: '최민수 사물함', description: '호텔 직원의 개인 사물함', examinationResult: '통장과 개인 물품 발견', containsEvidence: 'evidence-001-4', isLocked: true, unlockMethod: '최민수 동의 또는 관리자 열쇠' }
        ],
        connectedTo: ['loc-001-3']
      }
    ],

    timeline: [
      { time: '18:00', event: '동창회 시작', participants: ['char-001-1', 'char-001-2', 'char-001-3', 'char-001-5'], location: 'loc-001-1', importance: 'minor', isRevealed: true },
      { time: '19:00', event: '졸업앨범 전시 준비', participants: ['char-001-1'], location: 'loc-001-1', importance: 'major', isRevealed: true },
      { time: '19:25', event: '박정호, 전시 테이블 근처로 이동', participants: ['char-001-3'], location: 'loc-001-1', importance: 'critical', isRevealed: false },
      { time: '19:28', event: '최민수, 전기실로 이동', participants: ['char-001-4'], location: 'loc-001-3', importance: 'critical', isRevealed: false },
      { time: '19:30', event: '정전 발생', participants: [], location: 'loc-001-1', importance: 'critical', isRevealed: true },
      { time: '19:30', event: '박정호, 앨범 절취', participants: ['char-001-3'], location: 'loc-001-1', importance: 'critical', isRevealed: false },
      { time: '19:31', event: '전력 복구', participants: [], location: 'loc-001-1', importance: 'major', isRevealed: true },
      { time: '19:35', event: '앨범 분실 발견', participants: ['char-001-1'], location: 'loc-001-1', importance: 'critical', isRevealed: true }
    ],

    solution: {
      summary: '박정호가 호텔 직원을 매수하여 정전을 일으키고, 그 틈에 자신의 과거 학교폭력 증거가 담긴 졸업앨범을 훔쳤다.',
      detailedExplanation: [
        '박정호는 국회의원 후보로서 깨끗한 이미지가 필수적이었다.',
        '졸업앨범에는 그가 고등학교 시절 후배를 괴롭히는 장면이 찍힌 사진이 있었다.',
        '그는 호텔 직원 최민수에게 300만원을 주고 정전을 일으키도록 매수했다.',
        '45초간의 정전 동안 앨범을 자신의 가방에 숨겼다.',
        '정전이 의도적이었다는 것과, 그가 정전 직전 테이블 근처에 있었다는 CCTV 영상이 결정적 증거다.'
      ],
      keyEvidence: ['evidence-001-2', 'evidence-001-5', 'evidence-001-6', 'evidence-001-4'],
      howToSolve: [
        '정전이 자연 발생이 아닌 수동 조작이었음을 밝힌다',
        '호텔 직원의 수상한 입금 내역을 확인한다',
        'CCTV 영상에서 박정호의 수상한 움직임을 포착한다',
        '이수진에게서 축제 사진 사본을 확보하여 동기를 파악한다',
        '박정호의 가방에서 앨범을 발견한다'
      ],
      commonMistakes: [
        '정전을 단순 사고로 치부함',
        '호텔 직원을 주범으로 오해함',
        '동기 파악 없이 물증만 추적함'
      ]
    },

    deductionKeywords: {
      who: ['박정호', '국회의원', '후보', '학생회장'],
      why: ['학교폭력', '과거', '이미지', '스캔들', '선거'],
      how: ['정전', '매수', '호텔 직원', '가방'],
      when: ['19:30', '정전 중', '45초'],
      where: ['연회장', '전시 테이블']
    },

    tags: ['동창회', '정치인', '학교폭력', '과거은폐', '매수'],
    author: 'DEDUCTIO',
    version: '1.0'
  },

  // ============ THEFT-002: 미술실의 도난 ============
  {
    id: 'theft-002',
    title: '미술실의 도난',
    subtitle: '질투의 붓',
    type: 'theft',
    difficulty: 'easy',
    estimatedTime: 20,

    prologue: [
      '교내 미술대회 전날 밤.',
      '우승 후보의 작품이 사라졌다.',
      '예술을 향한 열정이 범죄가 되었다.'
    ],
    introduction: [
      '한빛고등학교 미술실.',
      '내일 열릴 교내 미술대회를 앞두고 출품작들이 전시되어 있었다.',
      '그런데 아침이 되자 우승 후보였던 작품 하나가 사라진 것을 발견했다.'
    ],
    setting: '한빛고등학교 미술실',

    crimeTime: '22:00',
    crimeLocation: '미술실 전시 공간',
    culpritId: 'char-002-3',
    victimId: 'char-002-1',
    motive: '질투',
    motiveDetail: '자신보다 뛰어난 재능을 가진 피해자의 작품이 우승하면, 미술대학 추천 기회를 놓치게 됨',
    method: '야간 침입',
    methodDetail: '미술부 창고 열쇠를 이용해 야간에 학교에 침입, 작품을 훔쳐 창고에 숨김',

    characters: [
      {
        id: 'char-002-1',
        name: '윤서연',
        role: 'victim',
        age: 18,
        gender: 'female',
        occupation: '미술부 부원',
        personality: '순수하고 예술에 대한 열정이 가득함',
        appearance: '물감 자국이 묻은 앞치마를 자주 입는 소녀',
        background: '어린 시절부터 그림에 재능을 보여온 학생, 미술대학 진학이 목표',
        alibi: {
          location: '자택',
          time: '21:00-07:00',
          activity: '수면',
          witnesses: ['부모님'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-002-3', type: '미술부 동료', description: '같은 미술부이나 실력 차이로 관계가 불편함', isSecret: true }
        ],
        secrets: [],
        dialogues: [
          { topic: '작품', lines: ['3개월이나 준비한 작품이에요...', '이번 대회에 모든 걸 걸었는데...'], revealsInfo: '작품의 중요성' },
          { topic: '용의자', lines: ['누가 이런 짓을... 경쟁자가 한 걸까요?', '미술부 애들 중에는 없을 거예요.'], revealsInfo: '순진한 추측' }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-002-2',
        name: '김태호',
        role: 'witness',
        age: 45,
        gender: 'male',
        occupation: '미술 교사',
        personality: '학생들을 아끼는 따뜻한 성격',
        appearance: '항상 베레모를 쓰고 다니는 중년 남성',
        background: '20년차 미술 교사, 윤서연의 재능을 높이 평가함',
        alibi: {
          location: '자택',
          time: '20:00-07:00',
          activity: '심사 준비',
          witnesses: ['배우자'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-002-1', type: '사제', description: '재능있는 제자', isSecret: false },
          { targetId: 'char-002-3', type: '사제', description: '노력하는 제자', isSecret: false }
        ],
        secrets: [],
        dialogues: [
          { topic: '대회', lines: ['윤서연 작품은 압도적이었어요.', '솔직히 우승은 거의 확정이었죠.'], revealsInfo: '서연 우승 확정적' },
          { topic: '미술실 열쇠', lines: ['미술부 간부들은 창고 열쇠를 가지고 있어요.', '저녁에 남아서 작업하는 경우가 많거든요.'], revealsInfo: '열쇠 접근 가능자' }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-002-3',
        name: '한지민',
        role: 'culprit',
        age: 18,
        gender: 'female',
        occupation: '미술부 부장',
        personality: '완벽주의적이고 승부욕이 강함',
        appearance: '단정하게 묶은 머리와 날카로운 눈매의 소녀',
        background: '미술부 부장으로 열심히 활동해왔으나, 윤서연의 천재성에 늘 열등감을 느낌',
        alibi: {
          location: '자택',
          time: '21:00-07:00',
          activity: '수면',
          witnesses: ['없음 (부모님 출장)'],
          hasHole: true,
          holeDetail: '혼자 있었다고 주장하나 증명 불가'
        },
        motive: {
          type: 'jealousy',
          description: '윤서연이 우승하면 미술대학 추천 기회를 놓치게 되어, 작품을 없애 대회 자체를 무산시키려 함',
          strength: 3
        },
        relationships: [
          { targetId: 'char-002-1', type: '라이벌', description: '겉으로는 친한 척하나 속으로 질투', isSecret: true }
        ],
        secrets: [
          { id: 'secret-002-1', content: '밤에 학교에 침입해 작품을 훔쳐 창고에 숨김', importance: 'critical', revealCondition: '창고 수색 또는 증거 제시' }
        ],
        dialogues: [
          { topic: '작품', lines: ['정말 충격이에요. 서연이 불쌍해요.', '누가 이런 비열한 짓을...'], revealsInfo: '거짓 동정' },
          { topic: '어젯밤', lines: ['저는 집에서 쉬었어요.', '부모님은 출장 중이시지만, 정말이에요.'], revealsInfo: '알리바이 없음' },
          { topic: '대회', lines: ['서연이가 우승할 거라고 다들 생각했죠.', '...저도 열심히 준비했는데.'], revealsInfo: '질투심 노출', requiresEvidence: ['evidence-002-4'] }
        ],
        nervousTriggers: ['창고', '열쇠', '질투', '추천서']
      },
      {
        id: 'char-002-4',
        name: '박준영',
        role: 'witness',
        age: 18,
        gender: 'male',
        occupation: '미술부 부원',
        personality: '관찰력이 좋고 솔직함',
        appearance: '편한 복장의 느긋해 보이는 남학생',
        background: '미술부에서 조각을 전공, 회화 대회에는 참가하지 않음',
        alibi: {
          location: '자택',
          time: '21:00-07:00',
          activity: '게임',
          witnesses: ['온라인 친구들'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-002-3', type: '미술부 동료', description: '같은 부원', isSecret: false }
        ],
        secrets: [
          { id: 'secret-002-2', content: '지민이가 서연이 작품에 대해 불평하는 걸 들은 적 있음', importance: 'major', revealCondition: '지민에 대해 물을 때' }
        ],
        dialogues: [
          { topic: '지민', lines: ['지민이요? 열심히 하는 애인데...', '근데 서연이한테 좀 예민하더라고요.'], revealsInfo: '지민의 질투' },
          { topic: '어제', lines: ['어제 저녁에 지민이가 미술실에 뭔가 두고 왔다고 하던데.', '열쇠 가지고 있으니까 괜찮다고 했어요.'], revealsInfo: '지민의 열쇠 소지' }
        ],
        nervousTriggers: []
      }
    ],

    evidence: [
      {
        id: 'evidence-002-1',
        name: '빈 전시대',
        type: 'physical',
        description: '윤서연의 작품이 놓여있던 자리',
        detailedDescription: '이름표만 덩그러니 남아있다. "윤서연 - 봄의 기억"',
        location: '미술실',
        foundAt: 'loc-002-1',
        linkedCharacters: ['char-002-1'],
        isCritical: false,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-002-2',
        name: '창고 열쇠 사용 기록',
        type: 'document',
        description: '미술실 창고 열쇠 대여 기록',
        detailedDescription: '한지민이 창고 열쇠를 대여 중인 것으로 기록되어 있다.',
        location: '미술 교무실',
        foundAt: 'loc-002-3',
        linkedCharacters: ['char-002-3'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-002-3',
        name: '창고 안 작품',
        type: 'physical',
        description: '창고 구석에 숨겨진 캔버스',
        detailedDescription: '윤서연의 서명이 있는 유화 작품. 손상 없이 천으로 덮여 있었다.',
        location: '미술실 창고',
        foundAt: 'loc-002-2',
        linkedCharacters: ['char-002-1', 'char-002-3'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-002-4',
        name: '미술대학 추천서 초안',
        type: 'document',
        description: '김태호 선생님이 작성 중이던 추천서',
        detailedDescription: '윤서연에 대한 추천서로, "올해 대회 우승자에게 추천서를 쓸 예정"이라는 메모가 있다.',
        location: '미술 교무실',
        foundAt: 'loc-002-3',
        linkedCharacters: ['char-002-1', 'char-002-2'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-002-5',
        name: '학교 후문 CCTV',
        type: 'digital',
        description: '어젯밤 학교 후문 보안 카메라 영상',
        detailedDescription: '22:05에 교복을 입은 여학생이 후문으로 들어가고, 22:30에 나가는 모습. 얼굴은 확인 어려우나 체형은 한지민과 유사.',
        location: '학교 보안실',
        foundAt: 'loc-002-4',
        linkedCharacters: ['char-002-3'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: true,
        analysisResult: '체형 분석 결과 한지민과 90% 일치'
      },
      {
        id: 'evidence-002-6',
        name: '물감 자국',
        type: 'physical',
        description: '한지민 신발에 묻은 물감',
        detailedDescription: '한지민의 실내화에 노란색 물감이 묻어있다. 윤서연의 작품에 사용된 것과 같은 색상.',
        location: '미술실 신발장',
        foundAt: 'loc-002-1',
        linkedCharacters: ['char-002-3'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: true,
        analysisResult: '물감 성분이 윤서연 작품의 것과 일치'
      }
    ],

    locations: [
      {
        id: 'loc-002-1',
        name: '미술실',
        description: '대회 출품작들이 전시된 미술실',
        atmosphere: '유화 냄새와 함께 작품들이 늘어서 있다',
        objects: [
          { id: 'obj-1', name: '빈 전시대', description: '서연의 작품이 있던 자리', examinationResult: '이름표만 남아있다', containsEvidence: 'evidence-002-1' },
          { id: 'obj-2', name: '신발장', description: '미술부원들의 실내화가 있는 곳', examinationResult: '한지민 신발에 노란 물감 자국', containsEvidence: 'evidence-002-6' }
        ],
        connectedTo: ['loc-002-2', 'loc-002-3']
      },
      {
        id: 'loc-002-2',
        name: '미술실 창고',
        description: '미술 도구와 재료를 보관하는 창고',
        atmosphere: '먼지가 쌓인 캔버스와 물감들이 가득하다',
        objects: [
          { id: 'obj-3', name: '숨겨진 캔버스', description: '천으로 덮인 캔버스', examinationResult: '윤서연의 작품!', containsEvidence: 'evidence-002-3', isLocked: true, unlockMethod: '창고 수색' }
        ],
        connectedTo: ['loc-002-1']
      },
      {
        id: 'loc-002-3',
        name: '미술 교무실',
        description: '미술 선생님의 교무실',
        atmosphere: '깔끔하게 정돈된 책상과 서류들',
        objects: [
          { id: 'obj-4', name: '열쇠 대여 장부', description: '창고 열쇠 대여 기록', examinationResult: '한지민이 열쇠 대여 중', containsEvidence: 'evidence-002-2' },
          { id: 'obj-5', name: '추천서 초안', description: '책상 위 서류', examinationResult: '대회 우승자에게 추천서 예정', containsEvidence: 'evidence-002-4' }
        ],
        connectedTo: ['loc-002-1']
      },
      {
        id: 'loc-002-4',
        name: '학교 보안실',
        description: 'CCTV 모니터가 있는 보안실',
        atmosphere: '여러 대의 모니터가 깜빡이고 있다',
        objects: [
          { id: 'obj-6', name: 'CCTV 녹화장치', description: '어젯밤 영상을 확인할 수 있다', examinationResult: '밤에 침입한 여학생 포착', containsEvidence: 'evidence-002-5' }
        ],
        connectedTo: []
      }
    ],

    timeline: [
      { time: '17:00', event: '미술대회 출품작 전시 완료', participants: ['char-002-2'], location: 'loc-002-1', importance: 'major', isRevealed: true },
      { time: '18:00', event: '미술실 문 잠금', participants: ['char-002-2'], location: 'loc-002-1', importance: 'minor', isRevealed: true },
      { time: '22:05', event: '한지민, 학교 후문 진입', participants: ['char-002-3'], location: 'loc-002-4', importance: 'critical', isRevealed: false },
      { time: '22:15', event: '한지민, 작품 절취', participants: ['char-002-3'], location: 'loc-002-1', importance: 'critical', isRevealed: false },
      { time: '22:20', event: '작품을 창고에 숨김', participants: ['char-002-3'], location: 'loc-002-2', importance: 'critical', isRevealed: false },
      { time: '22:30', event: '한지민, 학교 후문 이탈', participants: ['char-002-3'], location: 'loc-002-4', importance: 'critical', isRevealed: false },
      { time: '08:00', event: '작품 분실 발견', participants: ['char-002-2', 'char-002-1'], location: 'loc-002-1', importance: 'critical', isRevealed: true }
    ],

    solution: {
      summary: '한지민이 질투심에 윤서연의 작품을 훔쳐 창고에 숨겼다. 대회 우승자에게 미술대학 추천서가 주어지기 때문.',
      detailedExplanation: [
        '한지민은 미술부 부장이지만, 윤서연의 천재적 재능에 늘 열등감을 느꼈다.',
        '이번 대회 우승자에게 미술대학 추천서가 주어진다는 것을 알고, 윤서연의 우승을 막기로 결심.',
        '밤에 창고 열쇠를 이용해 학교에 침입, 작품을 훔쳐 창고에 숨겼다.',
        '작품을 파괴하지 않은 것은 어딘가 양심의 가책이 있었기 때문.',
        'CCTV, 열쇠 기록, 물감 자국이 결정적 증거가 된다.'
      ],
      keyEvidence: ['evidence-002-2', 'evidence-002-3', 'evidence-002-5', 'evidence-002-6'],
      howToSolve: [
        '열쇠 대여 기록에서 접근 가능자를 파악한다',
        '추천서 정보에서 동기를 유추한다',
        'CCTV에서 침입자를 확인한다',
        '창고를 수색하여 작품을 발견한다',
        '물감 자국으로 범인을 특정한다'
      ],
      commonMistakes: [
        '외부인 침입으로 생각함',
        '동기를 파악하지 못함',
        '창고 수색을 하지 않음'
      ]
    },

    deductionKeywords: {
      who: ['한지민', '미술부 부장', '열쇠 소지자'],
      why: ['질투', '추천서', '미술대학', '열등감'],
      how: ['열쇠', '야간 침입', '창고'],
      when: ['22:00', '밤', '대회 전날'],
      where: ['미술실', '창고']
    },

    tags: ['학교', '미술', '질투', '경쟁', '청소년'],
    author: 'DEDUCTIO',
    version: '1.0'
  },

  // ============ THEFT-003: 도서관의 희귀본 ============
  {
    id: 'theft-003',
    title: '도서관의 희귀본',
    subtitle: '아버지를 위한 범죄',
    type: 'theft',
    difficulty: 'medium',
    estimatedTime: 30,

    prologue: [
      '100년 된 희귀 고서가 사라졌다.',
      '도서관 사서만이 알던 비밀 장소에서.',
      '효도인가, 범죄인가.'
    ],
    introduction: [
      '한빛고등학교 도서관에는 개교 100주년을 기념해 기증받은 희귀 고서가 있었다.',
      '특별 전시를 앞두고 서고를 확인하니, 책이 사라져 있었다.',
      '잠긴 서고에서 책이 사라지는 것은 불가능한 일이었다.'
    ],
    setting: '한빛고등학교 도서관 특별 서고',

    crimeTime: '18:00',
    crimeLocation: '도서관 특별 서고',
    culpritId: 'char-003-3',
    victimId: undefined,
    motive: '절박함',
    motiveDetail: '아버지의 병원비가 급히 필요했고, 희귀본의 가치를 알고 있어 팔아 돈을 마련하려 함',
    method: '서고 열쇠 복제',
    methodDetail: '도서부 활동 중 서고 열쇠를 몰래 복제해두었다가 범행에 사용',

    characters: [
      {
        id: 'char-003-1',
        name: '송민지',
        role: 'witness',
        age: 52,
        gender: 'female',
        occupation: '도서관 사서',
        personality: '책을 사랑하고 꼼꼼함',
        appearance: '안경을 쓴 단정한 중년 여성',
        background: '30년째 이 학교 도서관을 지키고 있음',
        alibi: {
          location: '도서관 카운터',
          time: '17:30-18:30',
          activity: '대출/반납 업무',
          witnesses: ['여러 학생'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-003-3', type: '도서부 담당', description: '성실한 도서부원으로 신뢰함', isSecret: false }
        ],
        secrets: [],
        dialogues: [
          { topic: '희귀본', lines: ['그 책은 가치가 엄청나요. 경매에 나오면 수천만원은 할 걸요.', '특별 서고에 안전하게 보관했는데...'], revealsInfo: '책의 가치' },
          { topic: '서고 열쇠', lines: ['열쇠는 저만 가지고 있어요.', '...그런데 한 번 복제할 기회가 있었을 수도...'], revealsInfo: '열쇠 복제 가능성' }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-003-2',
        name: '이정훈',
        role: 'witness',
        age: 17,
        gender: 'male',
        occupation: '도서부 부장',
        personality: '성실하고 책임감 있음',
        appearance: '도서부 배지를 단 모범생 스타일',
        background: '3년째 도서부 활동, 송민지 사서의 신임을 받음',
        alibi: {
          location: '도서관 열람실',
          time: '17:00-19:00',
          activity: '자습',
          witnesses: ['다른 학생들'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-003-3', type: '도서부 동료', description: '같은 도서부 후배', isSecret: false }
        ],
        secrets: [
          { id: 'secret-003-1', content: '서고 열쇠가 한 번 분실되었다가 발견된 적 있음', importance: 'major', revealCondition: '열쇠에 대해 추궁할 때' }
        ],
        dialogues: [
          { topic: '희귀본', lines: ['그 책 정말 귀한 건데요.', '아는 사람이 거의 없는 책이에요.'], revealsInfo: '소수만 알고 있음' },
          { topic: '서고', lines: ['서고에 들어갈 수 있는 건 사서 선생님뿐이에요.', '...근데 열쇠가 한 번 분실된 적 있어요.'], revealsInfo: '열쇠 분실 이력' }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-003-3',
        name: '최은호',
        role: 'culprit',
        age: 17,
        gender: 'male',
        occupation: '도서부 부원',
        personality: '조용하고 내성적, 가족에 대한 책임감이 강함',
        appearance: '창백한 얼굴에 피곤해 보이는 소년',
        background: '도서부 활동을 하며 책의 가치를 배움. 최근 아버지가 큰 병을 앓고 있음',
        alibi: {
          location: '도서관',
          time: '17:30-18:00',
          activity: '도서 정리',
          witnesses: ['없음 (서고 근처 혼자 작업)'],
          hasHole: true,
          holeDetail: '혼자 서고 근처에서 작업했다고 함'
        },
        motive: {
          type: 'protection',
          description: '아버지의 수술비가 급히 필요. 희귀본을 팔아 돈을 마련하려 했음',
          strength: 3
        },
        relationships: [
          { targetId: 'char-003-1', type: '도서부 담당', description: '신뢰받는 부원', isSecret: false }
        ],
        secrets: [
          { id: 'secret-003-2', content: '복제한 열쇠로 서고에 들어가 책을 훔침', importance: 'critical', revealCondition: '가방 수색 또는 복제 열쇠 발견' }
        ],
        dialogues: [
          { topic: '희귀본', lines: ['그 책이요? 네, 가치가 높다고 들었어요.', '...도서부 활동하면서 알게 됐죠.'], revealsInfo: '책 가치 인지' },
          { topic: '가정', lines: ['...아버지가 많이 편찮으세요.', '수술비가...'], revealsInfo: '동기 노출' },
          { topic: '어제', lines: ['저는 서가 정리하고 있었어요.', '...혼자서요.'], revealsInfo: '알리바이 없음' }
        ],
        nervousTriggers: ['열쇠', '복제', '아버지', '병원비', '가방']
      },
      {
        id: 'char-003-4',
        name: '박도윤',
        role: 'suspect',
        age: 17,
        gender: 'male',
        occupation: '학생',
        personality: '허세가 있고 돈을 좋아함',
        appearance: '비싼 옷을 입고 다니는 부잣집 아들 스타일',
        background: '학교에서 유명한 부잣집 아들, 희귀품 수집 취미',
        alibi: {
          location: '학교 밖 PC방',
          time: '17:00-19:00',
          activity: '게임',
          witnesses: ['PC방 직원'],
          hasHole: false
        },
        relationships: [],
        secrets: [],
        dialogues: [
          { topic: '희귀본', lines: ['그 책? 몇 천만원짜리라던데.', '아버지한테 사달라고 할까 생각했는데.'], revealsInfo: '책 가치 인지, 알리바이 있음' },
          { topic: '최은호', lines: ['걔요? 도서부애잖아요.', '집이 좀 어렵다고 들었는데.'], revealsInfo: '은호 가정환경' }
        ],
        nervousTriggers: []
      }
    ],

    evidence: [
      {
        id: 'evidence-003-1',
        name: '빈 서가',
        type: 'physical',
        description: '희귀본이 있던 자리',
        detailedDescription: '먼지 패턴으로 보아 최근까지 책이 있었던 것이 분명하다.',
        location: '특별 서고',
        foundAt: 'loc-003-2',
        linkedCharacters: [],
        isCritical: false,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-003-2',
        name: '열쇠 복제 영수증',
        type: 'document',
        description: '학교 근처 열쇠집 영수증',
        detailedDescription: '2주 전 날짜로 서고 열쇠와 같은 형태의 열쇠 복제 기록. 학생 할인이 적용되어 있다.',
        location: '학교 근처 열쇠가게',
        foundAt: 'loc-003-4',
        linkedCharacters: ['char-003-3'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      },
      {
        id: 'evidence-003-3',
        name: '최은호 가방',
        type: 'physical',
        description: '최은호의 책가방',
        detailedDescription: '책가방 바닥에서 고서 특유의 오래된 종이 냄새가 남아있다. 희귀본 크기에 맞는 흔적.',
        location: '교실',
        foundAt: 'loc-003-3',
        linkedCharacters: ['char-003-3'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: true,
        analysisResult: '가방 내부에서 고서 성분 검출'
      },
      {
        id: 'evidence-003-4',
        name: '복제 열쇠',
        type: 'physical',
        description: '최은호 필통에서 발견된 열쇠',
        detailedDescription: '서고 열쇠와 동일한 형태의 새 열쇠. 기름칠이 새것이다.',
        location: '최은호 사물함',
        foundAt: 'loc-003-3',
        linkedCharacters: ['char-003-3'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      },
      {
        id: 'evidence-003-5',
        name: '아버지 진단서 사본',
        type: 'document',
        description: '최은호 아버지의 병원 진단서',
        detailedDescription: '간암 3기 진단. 급히 수술이 필요하며, 예상 비용은 5천만원 이상.',
        location: '최은호 사물함',
        foundAt: 'loc-003-3',
        linkedCharacters: ['char-003-3'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      },
      {
        id: 'evidence-003-6',
        name: '고서 시세 검색 기록',
        type: 'digital',
        description: '도서관 컴퓨터 검색 기록',
        detailedDescription: '최은호의 도서관 계정으로 "희귀 고서 판매", "고서 경매", "책 시세"를 검색한 기록.',
        location: '도서관',
        foundAt: 'loc-003-1',
        linkedCharacters: ['char-003-3'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      }
    ],

    locations: [
      {
        id: 'loc-003-1',
        name: '도서관 열람실',
        description: '학생들이 자습하는 열람실',
        atmosphere: '조용한 분위기, 책장 넘기는 소리만 들린다',
        objects: [
          { id: 'obj-1', name: '도서관 컴퓨터', description: '검색용 컴퓨터', examinationResult: '검색 기록 확인 가능', containsEvidence: 'evidence-003-6' }
        ],
        connectedTo: ['loc-003-2']
      },
      {
        id: 'loc-003-2',
        name: '특별 서고',
        description: '희귀 자료를 보관하는 잠긴 서고',
        atmosphere: '오래된 책 냄새가 가득하다',
        objects: [
          { id: 'obj-2', name: '빈 서가', description: '희귀본이 있던 자리', examinationResult: '책이 사라졌다', containsEvidence: 'evidence-003-1' }
        ],
        connectedTo: ['loc-003-1']
      },
      {
        id: 'loc-003-3',
        name: '교실/사물함',
        description: '학생들의 개인 물품 보관 공간',
        atmosphere: '여러 학생들의 물건이 섞여있다',
        objects: [
          { id: 'obj-3', name: '최은호 가방', description: '낡은 책가방', examinationResult: '오래된 책 냄새', containsEvidence: 'evidence-003-3' },
          { id: 'obj-4', name: '최은호 사물함', description: '개인 사물함', examinationResult: '열쇠와 진단서 발견', containsEvidence: 'evidence-003-4', isLocked: true, unlockMethod: '본인 동의 또는 강력한 증거' }
        ],
        connectedTo: []
      },
      {
        id: 'loc-003-4',
        name: '학교 근처 열쇠가게',
        description: '학교에서 5분 거리의 작은 열쇠집',
        atmosphere: '각종 열쇠와 도구가 진열되어 있다',
        objects: [
          { id: 'obj-5', name: '영수증 보관함', description: '최근 영수증 기록', examinationResult: '학생 할인 열쇠 복제 기록', containsEvidence: 'evidence-003-2' }
        ],
        connectedTo: []
      }
    ],

    timeline: [
      { time: '2주 전', event: '최은호, 열쇠 복제', participants: ['char-003-3'], location: 'loc-003-4', importance: 'critical', isRevealed: false },
      { time: '1주 전', event: '아버지 간암 진단', participants: ['char-003-3'], location: '병원', importance: 'major', isRevealed: false },
      { time: '17:30', event: '최은호, 도서 정리 시작', participants: ['char-003-3'], location: 'loc-003-1', importance: 'minor', isRevealed: true },
      { time: '17:50', event: '사서, 카운터 업무에 집중', participants: ['char-003-1'], location: 'loc-003-1', importance: 'minor', isRevealed: true },
      { time: '18:00', event: '최은호, 복제 열쇠로 서고 침입', participants: ['char-003-3'], location: 'loc-003-2', importance: 'critical', isRevealed: false },
      { time: '18:05', event: '희귀본 절취', participants: ['char-003-3'], location: 'loc-003-2', importance: 'critical', isRevealed: false },
      { time: '다음날 09:00', event: '도난 발견', participants: ['char-003-1'], location: 'loc-003-2', importance: 'critical', isRevealed: true }
    ],

    solution: {
      summary: '최은호가 아버지 수술비 마련을 위해 복제한 열쇠로 서고에 침입하여 희귀본을 훔쳤다.',
      detailedExplanation: [
        '최은호의 아버지가 간암으로 급히 수술이 필요했으나 가정 형편이 어려웠다.',
        '도서부 활동 중 희귀본의 가치를 알게 된 최은호는 이를 팔아 수술비를 마련하기로 결심.',
        '2주 전 열쇠가 잠시 분실되었을 때 복제해두었다.',
        '모두가 바쁜 틈을 타 복제 열쇠로 서고에 들어가 책을 훔쳤다.',
        '절박한 상황이었지만 범죄는 범죄라는 교훈.'
      ],
      keyEvidence: ['evidence-003-2', 'evidence-003-4', 'evidence-003-5', 'evidence-003-6'],
      howToSolve: [
        '서고 접근 가능자를 파악한다',
        '열쇠 분실 이력을 확인한다',
        '검색 기록에서 동기를 유추한다',
        '열쇠 복제 영수증을 찾는다',
        '가방과 사물함에서 결정적 증거를 발견한다'
      ],
      commonMistakes: [
        '부잣집 아들(박도윤)을 범인으로 의심',
        '외부인 침입으로 생각함',
        '동기 파악 없이 물증만 추적'
      ]
    },

    deductionKeywords: {
      who: ['최은호', '도서부', '학생'],
      why: ['아버지', '수술비', '병원비', '간암', '돈'],
      how: ['열쇠 복제', '서고', '침입'],
      when: ['18:00', '저녁'],
      where: ['도서관', '서고', '특별 서고']
    },

    tags: ['도서관', '희귀본', '가족애', '절박함', '학생'],
    author: 'DEDUCTIO',
    version: '1.0'
  },

  // ============ THEFT-004: 급식실의 비밀 ============
  {
    id: 'theft-004',
    title: '급식실의 비밀',
    subtitle: '사라진 식재료',
    type: 'theft',
    difficulty: 'easy',
    estimatedTime: 20,

    prologue: [
      '급식 예산이 자꾸 부족하다.',
      '창고의 식재료가 조금씩 사라지고 있다.',
      '누군가 조직적으로 횡령하고 있다.'
    ],
    introduction: [
      '한빛고등학교 급식실.',
      '영양사가 식재료 재고를 확인하다 이상한 점을 발견했다.',
      '장부와 실제 재고가 맞지 않는 것이다. 누군가 조금씩 식재료를 빼돌리고 있었다.'
    ],
    setting: '한빛고등학교 급식실 및 창고',

    crimeTime: '06:00',
    crimeLocation: '급식실 창고',
    culpritId: 'char-004-2',
    victimId: undefined,
    motive: '사익 추구',
    motiveDetail: '식재료를 빼돌려 자신의 식당에 공급하여 부당 이득',
    method: '장부 조작과 새벽 절도',
    methodDetail: '새벽에 출근하여 식재료를 빼돌리고, 장부를 조작하여 소비량을 부풀림',

    characters: [
      {
        id: 'char-004-1',
        name: '김영희',
        role: 'witness',
        age: 45,
        gender: 'female',
        occupation: '영양사',
        personality: '꼼꼼하고 정직함',
        appearance: '위생모를 쓴 깔끔한 중년 여성',
        background: '10년차 학교 영양사, 최근 예산 부족에 의문을 품음',
        alibi: {
          location: '자택',
          time: '05:00-07:00',
          activity: '출근 준비',
          witnesses: ['가족'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-004-2', type: '동료', description: '조리사와 함께 근무', isSecret: false }
        ],
        secrets: [],
        dialogues: [
          { topic: '예산', lines: ['이상해요. 분명 예산대로 구매했는데 재고가 부족해요.', '한 달에 식재료비가 100만원 이상 새고 있어요.'], revealsInfo: '도난 규모' },
          { topic: '직원들', lines: ['새벽에 출근하는 건 이 조리사님뿐이에요.', '창고 열쇠도 가지고 계시고요.'], revealsInfo: '용의자 특정' }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-004-2',
        name: '이춘복',
        role: 'culprit',
        age: 55,
        gender: 'male',
        occupation: '수석 조리사',
        personality: '겉으로는 온화하나 속으로는 탐욕스러움',
        appearance: '조리복을 입은 후덕해 보이는 남성',
        background: '20년차 조리사, 최근 부인이 식당을 개업함',
        alibi: {
          location: '급식실',
          time: '05:30-',
          activity: '조리 준비',
          witnesses: ['없음 (혼자 출근)'],
          hasHole: true,
          holeDetail: '새벽에 혼자 출근하여 아무도 모름'
        },
        motive: {
          type: 'greed',
          description: '빼돌린 식재료를 부인이 운영하는 식당에 공급하여 원가 절감',
          strength: 3
        },
        relationships: [
          { targetId: 'char-004-1', type: '동료', description: '영양사와 함께 근무', isSecret: false }
        ],
        secrets: [
          { id: 'secret-004-1', content: '새벽마다 식재료를 자신의 차에 싣고 나감', importance: 'critical', revealCondition: 'CCTV 또는 차량 확인' }
        ],
        dialogues: [
          { topic: '재고', lines: ['에이, 조리하다 보면 좀 버려지는 것도 있고 그래요.', '음식물 쓰레기가 많이 나오잖아요.'], revealsInfo: '변명' },
          { topic: '새벽 출근', lines: ['전 일찍 와서 준비하는 스타일이에요.', '재료 손질하려면 시간이 필요하거든요.'], revealsInfo: '새벽 출근 정당화' },
          { topic: '부인 식당', lines: ['...그건 왜요?', '우리 집 일이랑 학교 일은 별개예요.'], revealsInfo: '민감 반응', requiresEvidence: ['evidence-004-4'] }
        ],
        nervousTriggers: ['식당', 'CCTV', '새벽', '차', '장부']
      },
      {
        id: 'char-004-3',
        name: '박미숙',
        role: 'witness',
        age: 48,
        gender: 'female',
        occupation: '조리원',
        personality: '수다스럽고 눈치가 빠름',
        appearance: '앞치마를 두른 활발한 중년 여성',
        background: '5년차 조리원, 이춘복의 행동을 수상하게 여김',
        alibi: {
          location: '자택',
          time: '05:00-07:00',
          activity: '출근 준비',
          witnesses: ['가족'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-004-2', type: '동료', description: '같이 일하는 조리원', isSecret: false }
        ],
        secrets: [
          { id: 'secret-004-2', content: '이춘복이 새벽에 뭔가를 차에 싣는 걸 본 적 있음', importance: 'critical', revealCondition: '이춘복에 대해 물을 때' }
        ],
        dialogues: [
          { topic: '이춘복', lines: ['그 양반 요즘 새벽에 뭘 하는지...', '한 번은 차 트렁크에 뭘 싣더라고요.'], revealsInfo: '목격 증언' },
          { topic: '재고', lines: ['저도 이상하다 싶었어요.', '분명 어제 있던 고기가 오늘 없고 그래요.'], revealsInfo: '도난 인지' }
        ],
        nervousTriggers: []
      }
    ],

    evidence: [
      {
        id: 'evidence-004-1',
        name: '재고 장부',
        type: 'document',
        description: '식재료 입출고 기록부',
        detailedDescription: '조리에 사용된 양이 비정상적으로 많이 기록되어 있다. 특히 고기류가 심하다.',
        location: '급식실 사무실',
        foundAt: 'loc-004-1',
        linkedCharacters: ['char-004-2'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: true,
        analysisResult: '실제 급식 인원 대비 재료 사용량이 30% 과다'
      },
      {
        id: 'evidence-004-2',
        name: '새벽 CCTV',
        type: 'digital',
        description: '급식실 주차장 CCTV 영상',
        detailedDescription: '이춘복이 새벽 5:50에 박스를 차 트렁크에 싣는 모습이 찍혀있다.',
        location: '학교 보안실',
        foundAt: 'loc-004-3',
        linkedCharacters: ['char-004-2'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-004-3',
        name: '이춘복 차량 트렁크',
        type: 'physical',
        description: '이춘복 승용차 트렁크',
        detailedDescription: '학교 급식용 식재료 박스와 동일한 박스가 발견됨. 납품업체 스티커 부착.',
        location: '학교 주차장',
        foundAt: 'loc-004-4',
        linkedCharacters: ['char-004-2'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-004-4',
        name: '부인 식당 매입 장부',
        type: 'document',
        description: '이춘복 부인 식당의 식재료 구매 기록',
        detailedDescription: '식재료 매입가가 시세보다 현저히 낮거나, 매입 기록 없이 재료가 사용된 흔적.',
        location: '외부 조사',
        foundAt: 'loc-004-5',
        linkedCharacters: ['char-004-2'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: true,
        analysisResult: '학교 도난 시기와 식당 저가 매입 시기가 일치'
      }
    ],

    locations: [
      {
        id: 'loc-004-1',
        name: '급식실 사무실',
        description: '영양사와 조리사가 사용하는 사무 공간',
        atmosphere: '서류와 식단표가 벽에 붙어있다',
        objects: [
          { id: 'obj-1', name: '재고 장부', description: '식재료 입출고 기록', examinationResult: '비정상적인 사용량', containsEvidence: 'evidence-004-1' }
        ],
        connectedTo: ['loc-004-2']
      },
      {
        id: 'loc-004-2',
        name: '급식실 창고',
        description: '식재료를 보관하는 대형 냉장 창고',
        atmosphere: '차가운 공기와 함께 각종 식재료가 쌓여있다',
        objects: [
          { id: 'obj-2', name: '식재료', description: '각종 육류, 야채 등', examinationResult: '장부 대비 실제 재고 부족' }
        ],
        connectedTo: ['loc-004-1']
      },
      {
        id: 'loc-004-3',
        name: '학교 보안실',
        description: 'CCTV 모니터가 있는 보안실',
        atmosphere: '여러 대의 모니터가 학교 곳곳을 비추고 있다',
        objects: [
          { id: 'obj-3', name: 'CCTV 녹화장치', description: '주차장 영상 확인 가능', examinationResult: '새벽 이춘복 행동 포착', containsEvidence: 'evidence-004-2' }
        ],
        connectedTo: []
      },
      {
        id: 'loc-004-4',
        name: '학교 주차장',
        description: '교직원 전용 주차장',
        atmosphere: '여러 차량이 주차되어 있다',
        objects: [
          { id: 'obj-4', name: '이춘복 차량', description: '검은색 승용차', examinationResult: '트렁크에 급식용 박스', containsEvidence: 'evidence-004-3', isLocked: true, unlockMethod: '본인 동의 또는 강력한 증거' }
        ],
        connectedTo: []
      },
      {
        id: 'loc-004-5',
        name: '춘복이네 식당',
        description: '이춘복 부인이 운영하는 동네 식당',
        atmosphere: '소박한 가정식 식당',
        objects: [
          { id: 'obj-5', name: '매입 장부', description: '식재료 구매 기록', examinationResult: '비정상적인 저가 또는 무기록 매입', containsEvidence: 'evidence-004-4' }
        ],
        connectedTo: []
      }
    ],

    timeline: [
      { time: '05:30', event: '이춘복 새벽 출근', participants: ['char-004-2'], location: 'loc-004-2', importance: 'critical', isRevealed: false },
      { time: '05:50', event: '식재료를 차에 적재', participants: ['char-004-2'], location: 'loc-004-4', importance: 'critical', isRevealed: false },
      { time: '06:00', event: '장부 조작', participants: ['char-004-2'], location: 'loc-004-1', importance: 'critical', isRevealed: false },
      { time: '07:00', event: '다른 직원들 출근', participants: ['char-004-1', 'char-004-3'], location: 'loc-004-1', importance: 'minor', isRevealed: true },
      { time: '10:00', event: '재고 불일치 발견', participants: ['char-004-1'], location: 'loc-004-2', importance: 'critical', isRevealed: true }
    ],

    solution: {
      summary: '수석 조리사 이춘복이 새벽에 식재료를 빼돌려 부인의 식당에 공급하고 있었다.',
      detailedExplanation: [
        '이춘복은 부인이 식당을 개업하자 원가 절감을 위해 학교 식재료를 빼돌리기 시작.',
        '새벽 일찍 출근하여 아무도 없을 때 식재료를 차에 싣고 나감.',
        '장부를 조작하여 조리에 사용된 양을 부풀려 기록.',
        '한 달에 100만원 이상의 식재료가 도난당하고 있었다.',
        'CCTV 영상과 장부 분석, 차량 트렁크가 결정적 증거.'
      ],
      keyEvidence: ['evidence-004-1', 'evidence-004-2', 'evidence-004-3', 'evidence-004-4'],
      howToSolve: [
        '재고 장부와 실제 재고를 대조한다',
        '새벽 CCTV를 확인한다',
        '차량 트렁크를 수색한다',
        '부인 식당의 매입 기록을 조사한다'
      ],
      commonMistakes: [
        '단순 재고 오류로 생각함',
        '배달 업체 문제로 오해함'
      ]
    },

    deductionKeywords: {
      who: ['이춘복', '조리사', '수석'],
      why: ['부인', '식당', '돈', '탐욕'],
      how: ['새벽', '차', '장부 조작'],
      when: ['05:50', '새벽'],
      where: ['급식실', '창고', '주차장']
    },

    tags: ['급식실', '횡령', '식재료', '직원 범죄'],
    author: 'DEDUCTIO',
    version: '1.0'
  },

  // ============ THEFT-005: 체육창고의 도난 ============
  {
    id: 'theft-005',
    title: '체육창고의 도난',
    subtitle: '사라진 트로피',
    type: 'theft',
    difficulty: 'easy',
    estimatedTime: 20,

    prologue: [
      '전국대회 우승 트로피가 사라졌다.',
      '체육창고는 잠겨 있었다.',
      '내부자의 소행인가.'
    ],
    introduction: [
      '한빛고등학교 체육관.',
      '다음 주 학교 홍보를 위해 전시할 예정이었던 전국대회 우승 트로피가 사라졌다.',
      '체육창고는 잠겨 있었고, 열쇠는 체육 교사만 가지고 있었다.'
    ],
    setting: '한빛고등학교 체육관 및 체육창고',

    crimeTime: '16:30',
    crimeLocation: '체육창고',
    culpritId: 'char-005-3',
    victimId: undefined,
    motive: '원한',
    motiveDetail: '과거 불공정한 대우로 선수 생활을 포기해야 했던 원한',
    method: '분실한 척 열쇠 복제',
    methodDetail: '과거 체육부 시절 열쇠를 복제해두었다가 범행에 사용',

    characters: [
      {
        id: 'char-005-1',
        name: '강동원',
        role: 'witness',
        age: 38,
        gender: 'male',
        occupation: '체육 교사',
        personality: '열정적이고 학생들을 아낌',
        appearance: '운동복을 입은 건장한 남성',
        background: '전직 축구 선수 출신, 10년째 체육 교사',
        alibi: {
          location: '운동장',
          time: '16:00-17:00',
          activity: '축구부 훈련 지도',
          witnesses: ['축구부원들'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-005-3', type: '사제', description: '과거 제자', isSecret: false }
        ],
        secrets: [],
        dialogues: [
          { topic: '트로피', lines: ['그 트로피는 우리 학교의 자랑이에요.', '5년 전 전국대회 우승 트로피죠.'], revealsInfo: '트로피 가치' },
          { topic: '열쇠', lines: ['열쇠는 저만 가지고 있어요.', '...근데 예전에 한 번 분실한 적이 있긴 해요.'], revealsInfo: '열쇠 분실 이력' }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-005-2',
        name: '이민호',
        role: 'witness',
        age: 17,
        gender: 'male',
        occupation: '축구부 주장',
        personality: '리더십이 있고 정의감이 강함',
        appearance: '축구 유니폼을 입은 건강한 남학생',
        background: '3년째 축구부 활동, 차기 프로 유망주',
        alibi: {
          location: '운동장',
          time: '16:00-17:30',
          activity: '축구 훈련',
          witnesses: ['축구부원들'],
          hasHole: false
        },
        relationships: [],
        secrets: [
          { id: 'secret-005-1', content: '오늘 체육관 근처에서 졸업생을 봤음', importance: 'critical', revealCondition: '체육관 근처 상황 물을 때' }
        ],
        dialogues: [
          { topic: '트로피', lines: ['저희 축구부 트로피인데 분하죠.', '누가 그런 짓을...'], revealsInfo: '분노' },
          { topic: '오늘', lines: ['훈련 중에 잠깐 봤는데요.', '졸업생 선배 한 분이 체육관 쪽으로 가더라고요.'], revealsInfo: '목격 증언' }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-005-3',
        name: '정태현',
        role: 'culprit',
        age: 23,
        gender: 'male',
        occupation: '졸업생 (현재 무직)',
        personality: '내성적이고 원한을 품기 쉬움',
        appearance: '후드티를 입은 창백한 청년',
        background: '과거 축구부 에이스였으나 부상 후 불공정한 대우로 퇴부, 대학 진학 실패',
        alibi: {
          location: '학교 근처',
          time: '16:00-17:00',
          activity: '산책',
          witnesses: ['없음'],
          hasHole: true,
          holeDetail: '혼자였다고 주장'
        },
        motive: {
          type: 'revenge',
          description: '부상 후 버림받은 것에 대한 원한으로, 학교의 자랑인 트로피를 빼앗아 복수',
          strength: 3
        },
        relationships: [
          { targetId: 'char-005-1', type: '원한', description: '과거 은사였으나 버림받았다 느낌', isSecret: true }
        ],
        secrets: [
          { id: 'secret-005-2', content: '5년 전 체육부 시절 열쇠를 복제해둠', importance: 'critical', revealCondition: '열쇠 복제 추궁' }
        ],
        dialogues: [
          { topic: '학교', lines: ['그냥 근처 지나가다 들른 거예요.', '옛날 생각나서요.'], revealsInfo: '학교 방문 인정' },
          { topic: '트로피', lines: ['...그 트로피요?', '제가 있을 때 딴 건데... 저는 아무것도 못 받았죠.'], revealsInfo: '원한 노출' },
          { topic: '과거', lines: ['부상당했을 때 아무도 안 도와줬어요.', '그냥 버려졌죠.'], revealsInfo: '동기' }
        ],
        nervousTriggers: ['열쇠', '복제', '그때', '부상', '퇴부']
      }
    ],

    evidence: [
      {
        id: 'evidence-005-1',
        name: '빈 진열장',
        type: 'physical',
        description: '트로피가 있던 진열장',
        detailedDescription: '유리 진열장에 트로피가 있던 자리만 먼지 없이 깨끗하다.',
        location: '체육창고',
        foundAt: 'loc-005-2',
        linkedCharacters: [],
        isCritical: false,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-005-2',
        name: '복제 열쇠',
        type: 'physical',
        description: '정태현이 소지한 열쇠',
        detailedDescription: '체육창고 열쇠와 동일한 형태. 5년 정도 된 것으로 보이는 낡은 열쇠.',
        location: '정태현 소지품',
        foundAt: 'loc-005-3',
        linkedCharacters: ['char-005-3'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-005-3',
        name: 'CCTV 영상',
        type: 'digital',
        description: '체육관 입구 CCTV',
        detailedDescription: '16:25에 후드를 쓴 남성이 체육관에 들어가 16:35에 나오는 모습. 손에 큰 물건을 들고 있음.',
        location: '학교 보안실',
        foundAt: 'loc-005-4',
        linkedCharacters: ['char-005-3'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: true,
        analysisResult: '체형과 걸음걸이가 정태현과 일치'
      },
      {
        id: 'evidence-005-4',
        name: '졸업앨범',
        type: 'document',
        description: '5년 전 졸업앨범',
        detailedDescription: '정태현이 축구부 유니폼을 입고 있는 사진. 그 해 전국대회 우승 당시 주전 멤버였음.',
        location: '교무실',
        foundAt: 'loc-005-5',
        linkedCharacters: ['char-005-3'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-005-5',
        name: '트로피',
        type: 'physical',
        description: '정태현 집에서 발견된 트로피',
        detailedDescription: '한빛고등학교 전국대회 우승 트로피. 정태현의 방에 전시되어 있었음.',
        location: '정태현 자택',
        foundAt: 'loc-005-6',
        linkedCharacters: ['char-005-3'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      }
    ],

    locations: [
      {
        id: 'loc-005-1',
        name: '체육관',
        description: '학교 체육관 본관',
        atmosphere: '농구 골대와 각종 체육 시설이 있다',
        objects: [],
        connectedTo: ['loc-005-2']
      },
      {
        id: 'loc-005-2',
        name: '체육창고',
        description: '체육 용품과 트로피를 보관하는 창고',
        atmosphere: '각종 공과 운동기구가 쌓여있다',
        objects: [
          { id: 'obj-1', name: '트로피 진열장', description: '유리 진열장', examinationResult: '트로피 자리만 깨끗함', containsEvidence: 'evidence-005-1' }
        ],
        connectedTo: ['loc-005-1']
      },
      {
        id: 'loc-005-3',
        name: '학교 정문 앞',
        description: '정태현을 만난 장소',
        atmosphere: '학교 입구, 학생들이 오가는 곳',
        objects: [
          { id: 'obj-2', name: '정태현 소지품', description: '가방과 주머니', examinationResult: '낡은 열쇠 발견', containsEvidence: 'evidence-005-2', isLocked: true, unlockMethod: '본인 동의 또는 강력한 증거' }
        ],
        connectedTo: []
      },
      {
        id: 'loc-005-4',
        name: '학교 보안실',
        description: 'CCTV 관제실',
        atmosphere: '모니터가 여러 대 있다',
        objects: [
          { id: 'obj-3', name: 'CCTV', description: '체육관 영상', examinationResult: '수상한 인물 포착', containsEvidence: 'evidence-005-3' }
        ],
        connectedTo: []
      },
      {
        id: 'loc-005-5',
        name: '교무실',
        description: '선생님들의 업무 공간',
        atmosphere: '책상과 서류가 가득하다',
        objects: [
          { id: 'obj-4', name: '졸업앨범', description: '과거 앨범', examinationResult: '정태현 정보 확인', containsEvidence: 'evidence-005-4' }
        ],
        connectedTo: []
      },
      {
        id: 'loc-005-6',
        name: '정태현 자택',
        description: '정태현이 거주하는 원룸',
        atmosphere: '작고 어두운 방',
        objects: [
          { id: 'obj-5', name: '트로피', description: '방 한쪽에 전시된 트로피', examinationResult: '한빛고 트로피!', containsEvidence: 'evidence-005-5' }
        ],
        connectedTo: []
      }
    ],

    timeline: [
      { time: '16:00', event: '축구부 훈련 시작', participants: ['char-005-1', 'char-005-2'], location: '운동장', importance: 'minor', isRevealed: true },
      { time: '16:20', event: '정태현 학교 도착', participants: ['char-005-3'], location: '학교 정문', importance: 'major', isRevealed: false },
      { time: '16:25', event: '정태현 체육관 진입', participants: ['char-005-3'], location: 'loc-005-1', importance: 'critical', isRevealed: false },
      { time: '16:30', event: '트로피 절취', participants: ['char-005-3'], location: 'loc-005-2', importance: 'critical', isRevealed: false },
      { time: '16:35', event: '정태현 체육관 이탈', participants: ['char-005-3'], location: 'loc-005-1', importance: 'critical', isRevealed: false },
      { time: '17:00', event: '트로피 분실 발견', participants: ['char-005-1'], location: 'loc-005-2', importance: 'critical', isRevealed: true }
    ],

    solution: {
      summary: '졸업생 정태현이 과거 열쇠 복제를 이용해 원한을 품고 트로피를 훔쳤다.',
      detailedExplanation: [
        '정태현은 5년 전 축구부 에이스였으나 부상 후 버림받았다고 느꼈다.',
        '당시 체육창고 열쇠를 복제해두었다.',
        '학교의 자랑인 트로피를 빼앗아 복수하기로 결심.',
        '훈련 중 아무도 없는 틈을 타 범행을 저질렀다.',
        '트로피는 자신의 방에 전시해두었다.'
      ],
      keyEvidence: ['evidence-005-2', 'evidence-005-3', 'evidence-005-4', 'evidence-005-5'],
      howToSolve: [
        'CCTV에서 수상한 인물을 확인한다',
        '졸업앨범에서 과거 축구부원을 조사한다',
        '정태현의 동기를 파악한다',
        '소지품에서 열쇠를 발견한다',
        '자택 수색으로 트로피를 찾는다'
      ],
      commonMistakes: [
        '현재 학생을 의심함',
        '외부인 무단침입으로 생각함'
      ]
    },

    deductionKeywords: {
      who: ['정태현', '졸업생', '축구부'],
      why: ['원한', '복수', '부상', '버림받음'],
      how: ['열쇠 복제', '5년 전'],
      when: ['16:30', '오후'],
      where: ['체육창고', '체육관']
    },

    tags: ['체육관', '트로피', '졸업생', '원한', '복수'],
    author: 'DEDUCTIO',
    version: '1.0'
  }
];

export default theftScenariosPart1;
