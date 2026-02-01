// ========================================
// 도난 시나리오 Part 3 (11-15)
// ========================================

import { Scenario } from './types';

export const theftScenariosPart3: Scenario[] = [
  // ============ THEFT-011: 과학실의 현미경 ============
  {
    id: 'theft-011',
    title: '과학실의 현미경',
    subtitle: '사라진 고가 장비',
    type: 'theft',
    difficulty: 'medium',
    estimatedTime: 25,

    prologue: [
      '최신형 전자현미경이 사라졌다.',
      '수천만원짜리 연구 장비.',
      '누가 이런 전문 장비를 훔쳤을까.'
    ],
    introduction: [
      '한빛고등학교 과학실.',
      '연구 프로젝트를 위해 구입한 3천만원짜리 전자현미경이 사라졌다.',
      '과학부만 접근할 수 있는 장소였다.'
    ],
    setting: '한빛고등학교 과학실',

    crimeTime: '19:30',
    crimeLocation: '과학실 연구실',
    culpritId: 'char-011-3',
    victimId: undefined,
    motive: '경제적 절박함',
    motiveDetail: '동생의 수술비를 마련하기 위해 고가 장비를 훔쳐 판매하려 함',
    method: '야간 작업 중 절도',
    methodDetail: '프로젝트 야간 작업 중 혼자 남아 현미경을 해체하여 가져감',

    characters: [
      {
        id: 'char-011-1',
        name: '이성준',
        role: 'witness',
        age: 42,
        gender: 'male',
        occupation: '생물 교사',
        personality: '열정적이고 연구에 집중함',
        appearance: '실험복을 입은 지적인 남성',
        background: '박사 학위 소지, 15년째 생물 교사',
        alibi: {
          location: '학회 세미나',
          time: '18:00-22:00',
          activity: '외부 학회 참석',
          witnesses: ['학회 관계자들'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-011-3', type: '사제', description: '재능 있는 제자로 아낌', isSecret: false }
        ],
        secrets: [],
        dialogues: [
          { topic: '현미경', lines: ['연구용 전자현미경이에요.', '3천만원이 넘는 고가 장비죠.'], revealsInfo: '현미경 가치' },
          { topic: '접근', lines: ['과학부 학생들만 출입할 수 있어요.', '특히 프로젝트 팀원들은 밤늦게까지 작업하죠.'], revealsInfo: '접근 가능자' }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-011-2',
        name: '박수진',
        role: 'witness',
        age: 17,
        gender: 'female',
        occupation: '과학부 부장',
        personality: '똑똑하고 관찰력이 뛰어남',
        appearance: '실험 노트를 항상 들고 다니는 여학생',
        background: '전국 과학경진대회 수상, 연구에 열정적',
        alibi: {
          location: '과학실',
          time: '17:00-19:00',
          activity: '실험 및 정리',
          witnesses: ['다른 과학부원'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-011-3', type: '과학부 동료', description: '같은 프로젝트 팀', isSecret: false }
        ],
        secrets: [
          { id: 'secret-011-1', content: '정우진이 요즘 전화 통화를 자주 하며 우는 것을 봤음', importance: 'major', revealCondition: '정우진에 대해 물을 때' }
        ],
        dialogues: [
          { topic: '현미경', lines: ['어제 밤까지 있었어요.', '우진이가 마지막으로 사용했을 거예요.'], revealsInfo: '마지막 사용자' },
          { topic: '정우진', lines: ['요즘 정우진이 좀 이상해요.', '복도에서 울면서 전화하는 걸 봤거든요.'], revealsInfo: '이상 징후' }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-011-3',
        name: '정우진',
        role: 'culprit',
        age: 18,
        gender: 'male',
        occupation: '과학부 학생',
        personality: '성실하지만 가족 문제로 힘들어함',
        appearance: '다크서클이 짙고 수척한 남학생',
        background: '뛰어난 과학 실력, 하지만 동생이 백혈병으로 수술비 필요',
        alibi: {
          location: '과학실',
          time: '19:00-20:30',
          activity: '프로젝트 야간 작업',
          witnesses: ['없음 (혼자)'],
          hasHole: true,
          holeDetail: '혼자 작업하며 현미경과 단둘이 있었음'
        },
        motive: {
          type: 'greed',
          description: '동생의 백혈병 수술비 2천만원이 급히 필요했고, 현미경을 팔면 될 것이라 생각',
          strength: 3
        },
        relationships: [],
        secrets: [
          { id: 'secret-011-2', content: '중고 장비 거래 사이트에 현미경 판매 글 올림', importance: 'critical', revealCondition: '인터넷 추적 또는 자백' }
        ],
        dialogues: [
          { topic: '현미경', lines: ['네... 어제 사용했어요.', '실험 끝나고 제자리에 뒀는데...'], revealsInfo: '부정' },
          { topic: '동생', lines: ['...동생이 아파요.', '수술비가... 너무 많이 필요해요.'], revealsInfo: '동기 암시' },
          { topic: '판매', lines: ['...미안해요.', '다른 방법이 없었어요.'], revealsInfo: '자백', requiresEvidence: ['evidence-011-4'] }
        ],
        nervousTriggers: ['동생', '수술', '돈', '판매', '해체']
      }
    ],

    evidence: [
      {
        id: 'evidence-011-1',
        name: '빈 현미경 받침대',
        type: 'physical',
        description: '현미경이 있던 자리',
        detailedDescription: '현미경 받침대만 남아있음. 고정 나사가 풀려있다.',
        location: '과학실',
        foundAt: 'loc-011-1',
        linkedCharacters: [],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-011-2',
        name: '과학실 출입 기록',
        type: 'document',
        description: '과학실 사용 로그',
        detailedDescription: '정우진이 19:00-20:30 사이 혼자 과학실을 사용한 기록.',
        location: '과학실',
        foundAt: 'loc-011-1',
        linkedCharacters: ['char-011-3'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-011-3',
        name: '현미경 부품',
        type: 'physical',
        description: '정우진 사물함에서 발견된 나사',
        detailedDescription: '현미경 고정용 특수 나사. 받침대의 나사와 일치.',
        location: '정우진 사물함',
        foundAt: 'loc-011-2',
        linkedCharacters: ['char-011-3'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: true,
        analysisResult: '받침대 나사와 완벽히 일치'
      },
      {
        id: 'evidence-011-4',
        name: '중고 거래 게시물',
        type: 'digital',
        description: '중고 과학장비 거래 사이트',
        detailedDescription: '"전자현미경 급매 2천만원" 게시물. 정우진 계정으로 등록됨.',
        location: '인터넷',
        foundAt: 'loc-011-3',
        linkedCharacters: ['char-011-3'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-011-5',
        name: '동생 진단서',
        type: 'document',
        description: '정우진 동생의 병원 진단서',
        detailedDescription: '급성 백혈병 진단. 수술비 2천만원 필요.',
        location: '정우진 가방',
        foundAt: 'loc-011-2',
        linkedCharacters: ['char-011-3'],
        isCritical: false,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      }
    ],

    locations: [
      {
        id: 'loc-011-1',
        name: '과학실',
        description: '각종 실험 장비가 있는 연구실',
        atmosphere: '첨단 장비들이 정렬되어 있다',
        objects: [
          { id: 'obj-1', name: '현미경 받침대', description: '비어있는 받침대', examinationResult: '나사가 풀려있음', containsEvidence: 'evidence-011-1' },
          { id: 'obj-2', name: '출입 기록부', description: '사용자 로그', examinationResult: '정우진 단독 사용', containsEvidence: 'evidence-011-2' }
        ],
        connectedTo: ['loc-011-2']
      },
      {
        id: 'loc-011-2',
        name: '과학부 사물함',
        description: '과학부 학생들의 개인 사물함',
        atmosphere: '실험복과 개인 물품이 있다',
        objects: [
          { id: 'obj-3', name: '정우진 사물함', description: '개인 사물함', examinationResult: '현미경 부품 발견', containsEvidence: 'evidence-011-3', isLocked: true, unlockMethod: '본인 동의 또는 강력한 증거' },
          { id: 'obj-4', name: '정우진 가방', description: '책가방', examinationResult: '진단서 발견', containsEvidence: 'evidence-011-5' }
        ],
        connectedTo: ['loc-011-1']
      },
      {
        id: 'loc-011-3',
        name: '인터넷',
        description: '중고 과학장비 거래 사이트',
        atmosphere: '온라인 공간',
        objects: [
          { id: 'obj-5', name: '판매 게시물', description: '현미경 판매 글', examinationResult: '정우진 계정 확인', containsEvidence: 'evidence-011-4' }
        ],
        connectedTo: []
      }
    ],

    timeline: [
      { time: '17:00', event: '과학부 실험 시작', participants: ['char-011-2', 'char-011-3'], location: 'loc-011-1', importance: 'minor', isRevealed: true },
      { time: '19:00', event: '다른 학생들 퇴실', participants: ['char-011-2'], location: 'loc-011-1', importance: 'major', isRevealed: true },
      { time: '19:00', event: '정우진 혼자 남음', participants: ['char-011-3'], location: 'loc-011-1', importance: 'critical', isRevealed: false },
      { time: '19:30', event: '현미경 해체 및 절취', participants: ['char-011-3'], location: 'loc-011-1', importance: 'critical', isRevealed: false },
      { time: '20:30', event: '정우진 퇴실', participants: ['char-011-3'], location: 'loc-011-1', importance: 'critical', isRevealed: false },
      { time: '다음날', event: '현미경 분실 발견', participants: ['char-011-1'], location: 'loc-011-1', importance: 'critical', isRevealed: true }
    ],

    solution: {
      summary: '정우진이 동생의 수술비를 마련하기 위해 고가 현미경을 훔쳐 판매하려 했다.',
      detailedExplanation: [
        '정우진의 동생이 급성 백혈병으로 2천만원의 수술비가 필요했다.',
        '야간 프로젝트 시간에 혼자 남아 현미경을 해체.',
        '중고 거래 사이트에 2천만원에 급매로 올렸다.',
        '절박한 상황이었지만 범죄는 범죄.',
        '출입 기록, 부품, 판매 게시물이 결정적 증거.'
      ],
      keyEvidence: ['evidence-011-2', 'evidence-011-3', 'evidence-011-4'],
      howToSolve: [
        '출입 기록에서 단독 사용자를 확인한다',
        '사물함에서 현미경 부품을 발견한다',
        '인터넷에서 판매 게시물을 찾는다',
        '동생의 상황에서 동기를 파악한다'
      ],
      commonMistakes: [
        '외부 도둑으로 생각함',
        '과학 교사를 의심함'
      ]
    },

    deductionKeywords: {
      who: ['정우진', '과학부'],
      why: ['동생', '수술비', '절박', '돈'],
      how: ['해체', '혼자', '야간 작업'],
      when: ['19:30', '저녁'],
      where: ['과학실', '연구실']
    },

    tags: ['과학실', '현미경', '수술비', '절박함', '가족'],
    author: 'DEDUCTIO',
    version: '1.0'
  },

  // ============ THEFT-012: 주차장의 차량 부품 ============
  {
    id: 'theft-012',
    title: '주차장의 차량 부품',
    subtitle: '사라진 명품 휠',
    type: 'theft',
    difficulty: 'medium',
    estimatedTime: 25,

    prologue: [
      '고급 차량의 휠이 사라졌다.',
      '주차장에서 벌어진 대담한 범죄.',
      '내부인의 소행일까.'
    ],
    introduction: [
      '한빛고등학교 교직원 주차장.',
      '교장 선생님의 외제차 휠 4개가 통째로 사라졌다.',
      '차는 벽돌로 받쳐진 채 발견되었다.'
    ],
    setting: '한빛고등학교 주차장',

    crimeTime: '03:00',
    crimeLocation: '교직원 주차장',
    culpritId: 'char-012-3',
    victimId: 'char-012-1',
    motive: '경제적 이득',
    motiveDetail: '생활비가 부족하여 고가의 휠을 훔쳐 암시장에 팔아 돈을 마련하려 함',
    method: '새벽 시간 절도',
    methodDetail: '경비원 순찰 패턴을 파악하여 새벽에 휠을 해체하여 가져감',

    characters: [
      {
        id: 'char-012-1',
        name: '김철수',
        role: 'victim',
        age: 58,
        gender: 'male',
        occupation: '교장',
        personality: '권위적이지만 학교를 아낌',
        appearance: '정장을 입은 위엄 있는 남성',
        background: '30년 교직 생활, 최근 고급 외제차 구입',
        alibi: {
          location: '자택',
          time: '밤새',
          activity: '수면',
          witnesses: ['배우자'],
          hasHole: false
        },
        relationships: [],
        secrets: [],
        dialogues: [
          { topic: '휠', lines: ['1개에 500만원씩 하는 휠이에요.', '맞춤 제작한 명품 휠이죠.'], revealsInfo: '휠 가치' },
          { topic: '주차장', lines: ['매일 같은 자리에 주차합니다.', 'CCTV가 있어 안전하다고 생각했는데...'], revealsInfo: 'CCTV 존재' }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-012-2',
        name: '박경호',
        role: 'witness',
        age: 62,
        gender: 'male',
        occupation: '야간 경비원',
        personality: '성실하지만 나이가 들어 다소 느림',
        appearance: '경비복을 입은 연로한 남성',
        background: '10년째 야간 경비, 규칙적인 순찰',
        alibi: {
          location: '학교 순찰',
          time: '22:00-06:00',
          activity: '야간 순찰',
          witnesses: ['순찰 일지'],
          hasHole: true,
          holeDetail: '2:30-3:30 사이 CCTV 사각지대 점검으로 주차장 비움'
        },
        relationships: [
          { targetId: 'char-012-3', type: '동료', description: '청소 직원과 같이 근무', isSecret: false }
        ],
        secrets: [
          { id: 'secret-012-1', content: '최근 청소부 이정민이 돈 이야기를 자주 했음', importance: 'major', revealCondition: '이정민에 대해 물을 때' }
        ],
        dialogues: [
          { topic: '순찰', lines: ['2시 반에서 3시 반 사이에 건물 반대편을 점검했어요.', '그 시간엔 주차장을 못 봤죠.'], revealsInfo: '순찰 공백' },
          { topic: '이정민', lines: ['정민씨가 요즘 돈 걱정을 많이 하더라고요.', '생활비가 부족하다고...'], revealsInfo: '동기 정황' }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-012-3',
        name: '이정민',
        role: 'culprit',
        age: 45,
        gender: 'male',
        occupation: '청소 직원',
        personality: '조용하지만 경제적으로 절박함',
        appearance: '청소복을 입은 마른 중년 남성',
        background: '홀로 두 아이를 키우며 생활비 부족',
        alibi: {
          location: '학교 청소',
          time: '21:00-05:00',
          activity: '야간 청소',
          witnesses: ['없음 (혼자)'],
          hasHole: true,
          holeDetail: '3시 전후 행적 불분명'
        },
        motive: {
          type: 'greed',
          description: '생활비가 부족하여 고가의 휠을 팔면 당분간 생활할 수 있을 것이라 판단',
          strength: 3
        },
        relationships: [],
        secrets: [
          { id: 'secret-012-2', content: '휠을 자동차 부품 암시장에 판매 시도', importance: 'critical', revealCondition: '자택 수색 또는 거래 추적' }
        ],
        dialogues: [
          { topic: '휠', lines: ['저는 청소만 했어요.', '차는 건드리지 않았는데요.'], revealsInfo: '부정' },
          { topic: '생활비', lines: ['...애들 학원비가 밀렸어요.', '어떻게든 돈을 마련해야 했어요.'], revealsInfo: '동기' },
          { topic: '암시장', lines: ['...잘못했어요.', '돌려드릴게요.'], revealsInfo: '자백', requiresEvidence: ['evidence-012-4'] }
        ],
        nervousTriggers: ['휠', '돈', '암시장', '새벽', '공구']
      }
    ],

    evidence: [
      {
        id: 'evidence-012-1',
        name: '벽돌로 받쳐진 차',
        type: 'physical',
        description: '휠이 없는 교장 차량',
        detailedDescription: '4개의 벽돌로 차체를 받쳐놓음. 휠 너트가 깔끔하게 풀림.',
        location: '주차장',
        foundAt: 'loc-012-1',
        linkedCharacters: [],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-012-2',
        name: '주차장 CCTV',
        type: 'digital',
        description: '주차장 감시 카메라',
        detailedDescription: '3시 5분경 청소복을 입은 사람이 수레를 끌고 주차장으로 들어옴. 이정민으로 확인됨.',
        location: '보안실',
        foundAt: 'loc-012-2',
        linkedCharacters: ['char-012-3'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-012-3',
        name: '공구',
        type: 'physical',
        description: '청소 창고에서 발견된 공구',
        detailedDescription: '렌치와 잭. 휠 너트 자국이 있음.',
        location: '청소 창고',
        foundAt: 'loc-012-3',
        linkedCharacters: ['char-012-3'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: true,
        analysisResult: '휠 너트와 일치하는 자국'
      },
      {
        id: 'evidence-012-4',
        name: '암시장 거래 문자',
        type: 'digital',
        description: '이정민 핸드폰 문자',
        detailedDescription: '"휠 4개 있음. 급매 1천만원" 부품상과의 거래 문자.',
        location: '이정민 핸드폰',
        foundAt: 'loc-012-4',
        linkedCharacters: ['char-012-3'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      },
      {
        id: 'evidence-012-5',
        name: '휠',
        type: 'physical',
        description: '이정민 집에서 발견된 휠',
        detailedDescription: '교장 차량의 휠 4개. 차대번호로 확인 가능.',
        location: '이정민 자택',
        foundAt: 'loc-012-4',
        linkedCharacters: ['char-012-3'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      }
    ],

    locations: [
      {
        id: 'loc-012-1',
        name: '주차장',
        description: '교직원 전용 주차장',
        atmosphere: '고급 차량들이 주차되어 있다',
        objects: [
          { id: 'obj-1', name: '교장 차량', description: '휠이 없는 차', examinationResult: '전문적으로 해체됨', containsEvidence: 'evidence-012-1' }
        ],
        connectedTo: ['loc-012-2', 'loc-012-3']
      },
      {
        id: 'loc-012-2',
        name: '보안실',
        description: 'CCTV 관제실',
        atmosphere: '모니터가 여러 대 있다',
        objects: [
          { id: 'obj-2', name: 'CCTV', description: '주차장 영상', examinationResult: '이정민 확인', containsEvidence: 'evidence-012-2' }
        ],
        connectedTo: ['loc-012-1']
      },
      {
        id: 'loc-012-3',
        name: '청소 창고',
        description: '청소 도구 보관소',
        atmosphere: '각종 청소 용품과 도구',
        objects: [
          { id: 'obj-3', name: '공구', description: '렌치와 잭', examinationResult: '휠 너트 자국', containsEvidence: 'evidence-012-3' }
        ],
        connectedTo: ['loc-012-1']
      },
      {
        id: 'loc-012-4',
        name: '이정민 자택',
        description: '이정민이 거주하는 집',
        atmosphere: '소박한 빌라',
        objects: [
          { id: 'obj-4', name: '휠', description: '방에 숨겨둔 휠', examinationResult: '교장 차량 것 확인', containsEvidence: 'evidence-012-5' }
        ],
        connectedTo: []
      }
    ],

    timeline: [
      { time: '21:00', event: '이정민 야간 청소 시작', participants: ['char-012-3'], location: '학교', importance: 'minor', isRevealed: true },
      { time: '02:30', event: '경비원 주차장 이탈', participants: ['char-012-2'], location: 'loc-012-1', importance: 'critical', isRevealed: false },
      { time: '03:00', event: '휠 해체 시작', participants: ['char-012-3'], location: 'loc-012-1', importance: 'critical', isRevealed: false },
      { time: '03:25', event: '휠 반출', participants: ['char-012-3'], location: 'loc-012-1', importance: 'critical', isRevealed: false },
      { time: '03:30', event: '경비원 복귀', participants: ['char-012-2'], location: 'loc-012-1', importance: 'major', isRevealed: false },
      { time: '08:00', event: '휠 도난 발견', participants: ['char-012-1'], location: 'loc-012-1', importance: 'critical', isRevealed: true }
    ],

    solution: {
      summary: '이정민이 생활비가 부족하여 경비원 순찰 공백을 이용해 고가 휠을 훔쳤다.',
      detailedExplanation: [
        '이정민은 홀로 두 아이를 키우며 생활비가 부족했다.',
        '경비원의 순찰 패턴을 파악하여 공백 시간을 노렸다.',
        '새벽 3시에 전문적으로 휠을 해체하여 가져갔다.',
        '암시장에 팔려고 집에 숨겨두었다.',
        'CCTV, 공구, 거래 문자가 결정적 증거.'
      ],
      keyEvidence: ['evidence-012-2', 'evidence-012-3', 'evidence-012-4', 'evidence-012-5'],
      howToSolve: [
        'CCTV에서 범행 시간대를 확인한다',
        '경비원 순찰 공백 시간을 파악한다',
        '청소 창고에서 공구를 발견한다',
        '암시장 거래 문자를 확인한다',
        '자택에서 휠을 발견한다'
      ],
      commonMistakes: [
        '외부 전문 도둑으로 생각함',
        '경비원을 의심함'
      ]
    },

    deductionKeywords: {
      who: ['이정민', '청소부'],
      why: ['생활비', '절박', '돈'],
      how: ['순찰 공백', '전문 해체', '새벽'],
      when: ['03:00', '새벽'],
      where: ['주차장', '교직원']
    },

    tags: ['주차장', '차량', '휠', '생활비', '내부인'],
    author: 'DEDUCTIO',
    version: '1.0'
  },

  // ============ THEFT-013: 급식실의 식기류 ============
  {
    id: 'theft-013',
    title: '급식실의 식기류',
    subtitle: '사라진 은식기',
    type: 'theft',
    difficulty: 'easy',
    estimatedTime: 20,

    prologue: [
      '고급 은식기 세트가 사라졌다.',
      '급식실에서 벌어진 소소한 범죄.',
      '하지만 범인은 누구일까.'
    ],
    introduction: [
      '한빛고등학교 급식실.',
      '기념행사용 고급 은식기 세트 30인분이 사라졌다.',
      '급식실 관계자만 접근할 수 있는 창고였다.'
    ],
    setting: '한빛고등학교 급식실',

    crimeTime: '15:00',
    crimeLocation: '급식실 창고',
    culpritId: 'char-013-3',
    victimId: undefined,
    motive: '개인적 이득',
    motiveDetail: '딸의 결혼 준비로 비용이 많이 들어 은식기를 팔아 비용을 마련하려 함',
    method: '근무 중 절도',
    methodDetail: '점심시간 이후 혼자 정리하면서 은식기를 챙겨 퇴근 시 가져감',

    characters: [
      {
        id: 'char-013-1',
        name: '최영희',
        role: 'witness',
        age: 50,
        gender: 'female',
        occupation: '급식실장',
        personality: '꼼꼼하고 책임감 있음',
        appearance: '조리복을 입은 단정한 여성',
        background: '20년째 급식실 근무, 위생과 관리에 철저',
        alibi: {
          location: '식자재 창고',
          time: '14:00-16:00',
          activity: '재고 확인',
          witnesses: ['식자재 업체 직원'],
          hasHole: false
        },
        relationships: [],
        secrets: [],
        dialogues: [
          { topic: '은식기', lines: ['개교기념일 행사용이에요.', '1세트에 50만원이 넘어요.'], revealsInfo: '은식기 가치' },
          { topic: '접근', lines: ['급식실 직원만 창고 열쇠가 있어요.', '3명뿐이죠.'], revealsInfo: '접근 가능자' }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-013-2',
        name: '김순자',
        role: 'witness',
        age: 45,
        gender: 'female',
        occupation: '조리사',
        personality: '솔직하고 털털함',
        appearance: '조리복을 입은 활발한 여성',
        background: '10년째 급식실 근무',
        alibi: {
          location: '주방',
          time: '14:00-15:00',
          activity: '설거지 및 정리',
          witnesses: ['다른 조리사'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-013-3', type: '동료', description: '같이 근무하는 동료', isSecret: false }
        ],
        secrets: [
          { id: 'secret-013-1', content: '박미란이 요즘 돈 이야기를 자주 했음', importance: 'major', revealCondition: '박미란에 대해 물을 때' }
        ],
        dialogues: [
          { topic: '은식기', lines: ['점심 끝나고 제가 창고 확인했을 땐 있었어요.', '3시쯤이었나...'], revealsInfo: '마지막 목격' },
          { topic: '박미란', lines: ['미란씨가 요즘 돈 걱정이 많더라고요.', '딸 결혼 준비한다면서요.'], revealsInfo: '동기 정황' }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-013-3',
        name: '박미란',
        role: 'culprit',
        age: 52,
        gender: 'female',
        occupation: '조리 보조',
        personality: '조용하지만 경제적 압박이 큼',
        appearance: '조리복을 입은 수척한 여성',
        background: '5년째 급식실 근무, 최근 딸 결혼 준비',
        alibi: {
          location: '급식실',
          time: '14:00-16:00',
          activity: '청소 및 정리',
          witnesses: ['없음 (혼자)'],
          hasHole: true,
          holeDetail: '혼자 정리 작업'
        },
        motive: {
          type: 'greed',
          description: '딸의 결혼 준비로 수천만원이 들어가는데 은식기를 팔면 당분간 도움이 될 것',
          strength: 2
        },
        relationships: [],
        secrets: [
          { id: 'secret-013-2', content: '은식기를 집에 숨기고 중고품 거래 사이트에 판매 시도', importance: 'critical', revealCondition: '자택 수색 또는 인터넷 추적' }
        ],
        dialogues: [
          { topic: '은식기', lines: ['저는 청소만 했어요.', '창고는 안 들어갔는데요.'], revealsInfo: '부정' },
          { topic: '딸 결혼', lines: ['네... 다음 달이에요.', '준비할 게 너무 많아서...'], revealsInfo: '동기' },
          { topic: '판매', lines: ['...미안해요.', '딸한테 부끄럽지 않게 해주고 싶었어요.'], revealsInfo: '자백', requiresEvidence: ['evidence-013-4'] }
        ],
        nervousTriggers: ['은식기', '딸', '결혼', '판매', '돈']
      }
    ],

    evidence: [
      {
        id: 'evidence-013-1',
        name: '빈 은식기 상자',
        type: 'physical',
        description: '은식기가 있던 상자',
        detailedDescription: '30인분 은식기 세트가 들어있던 고급 상자. 비어있음.',
        location: '급식실 창고',
        foundAt: 'loc-013-1',
        linkedCharacters: [],
        isCritical: false,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-013-2',
        name: '퇴근 CCTV',
        type: 'digital',
        description: '급식실 출구 CCTV',
        detailedDescription: '16시 10분 박미란이 큰 가방을 들고 퇴근하는 모습. 평소보다 무거워 보임.',
        location: '보안실',
        foundAt: 'loc-013-2',
        linkedCharacters: ['char-013-3'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-013-3',
        name: '근무 일지',
        type: 'document',
        description: '급식실 근무 기록',
        detailedDescription: '15:00-16:00 박미란 혼자 정리 및 청소 담당.',
        location: '급식실',
        foundAt: 'loc-013-1',
        linkedCharacters: ['char-013-3'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-013-4',
        name: '중고품 판매 게시물',
        type: 'digital',
        description: '중고품 거래 사이트',
        detailedDescription: '"은식기 세트 급매" 게시물. 박미란 계정으로 등록.',
        location: '인터넷',
        foundAt: 'loc-013-3',
        linkedCharacters: ['char-013-3'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-013-5',
        name: '은식기',
        type: 'physical',
        description: '박미란 집에서 발견된 은식기',
        detailedDescription: '학교 마크가 새겨진 은식기 세트.',
        location: '박미란 자택',
        foundAt: 'loc-013-4',
        linkedCharacters: ['char-013-3'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      }
    ],

    locations: [
      {
        id: 'loc-013-1',
        name: '급식실 창고',
        description: '식기와 용품을 보관하는 창고',
        atmosphere: '정돈된 선반과 상자들',
        objects: [
          { id: 'obj-1', name: '빈 상자', description: '은식기가 있던 곳', examinationResult: '비어있음', containsEvidence: 'evidence-013-1' },
          { id: 'obj-2', name: '근무 일지', description: '직원 업무 기록', examinationResult: '박미란 단독 작업', containsEvidence: 'evidence-013-3' }
        ],
        connectedTo: ['loc-013-2']
      },
      {
        id: 'loc-013-2',
        name: '보안실',
        description: 'CCTV 관제실',
        atmosphere: '모니터가 여러 대 있다',
        objects: [
          { id: 'obj-3', name: 'CCTV', description: '급식실 출구 영상', examinationResult: '박미란 큰 가방', containsEvidence: 'evidence-013-2' }
        ],
        connectedTo: ['loc-013-1']
      },
      {
        id: 'loc-013-3',
        name: '인터넷',
        description: '중고품 거래 사이트',
        atmosphere: '온라인 공간',
        objects: [
          { id: 'obj-4', name: '판매 게시물', description: '은식기 판매 글', examinationResult: '박미란 계정', containsEvidence: 'evidence-013-4' }
        ],
        connectedTo: []
      },
      {
        id: 'loc-013-4',
        name: '박미란 자택',
        description: '박미란이 거주하는 집',
        atmosphere: '결혼 준비물이 있는 집',
        objects: [
          { id: 'obj-5', name: '은식기', description: '숨겨둔 은식기', examinationResult: '학교 마크 확인', containsEvidence: 'evidence-013-5' }
        ],
        connectedTo: []
      }
    ],

    timeline: [
      { time: '14:00', event: '급식 정리 시작', participants: ['char-013-2', 'char-013-3'], location: 'loc-013-1', importance: 'minor', isRevealed: true },
      { time: '15:00', event: '박미란 혼자 남음', participants: ['char-013-3'], location: 'loc-013-1', importance: 'critical', isRevealed: false },
      { time: '15:00', event: '은식기 절취', participants: ['char-013-3'], location: 'loc-013-1', importance: 'critical', isRevealed: false },
      { time: '16:10', event: '박미란 큰 가방 들고 퇴근', participants: ['char-013-3'], location: 'loc-013-1', importance: 'critical', isRevealed: false },
      { time: '다음날', event: '은식기 분실 발견', participants: ['char-013-1'], location: 'loc-013-1', importance: 'critical', isRevealed: true }
    ],

    solution: {
      summary: '박미란이 딸의 결혼 준비 비용을 마련하기 위해 은식기를 훔쳤다.',
      detailedExplanation: [
        '박미란은 딸의 결혼 준비로 경제적 압박이 컸다.',
        '혼자 정리 작업을 하면서 은식기를 챙겼다.',
        '퇴근 시 큰 가방에 넣어 가져갔다.',
        '중고품 사이트에 판매 글을 올렸다.',
        'CCTV, 근무 일지, 판매 게시물이 결정적 증거.'
      ],
      keyEvidence: ['evidence-013-2', 'evidence-013-3', 'evidence-013-4', 'evidence-013-5'],
      howToSolve: [
        '근무 일지에서 혼자 작업한 사람을 확인한다',
        'CCTV에서 가방 크기를 확인한다',
        '인터넷에서 판매 게시물을 찾는다',
        '자택에서 은식기를 발견한다'
      ],
      commonMistakes: [
        '외부인 침입으로 생각함',
        '학생을 의심함'
      ]
    },

    deductionKeywords: {
      who: ['박미란', '조리 보조'],
      why: ['딸 결혼', '비용', '돈'],
      how: ['혼자 작업', '가방', '퇴근'],
      when: ['15:00', '오후'],
      where: ['급식실', '창고']
    },

    tags: ['급식실', '은식기', '결혼', '내부인'],
    author: 'DEDUCTIO',
    version: '1.0'
  },

  // ============ THEFT-014: 역사관의 유물 ============
  {
    id: 'theft-014',
    title: '역사관의 유물',
    subtitle: '사라진 조선시대 서적',
    type: 'theft',
    difficulty: 'hard',
    estimatedTime: 30,

    prologue: [
      '귀중한 고서가 사라졌다.',
      '역사관의 보물.',
      '문화재급 유물을 노린 범죄.'
    ],
    introduction: [
      '한빛고등학교 역사관.',
      '조선시대 서적 "실학서"가 전시대에서 사라졌다.',
      '문화재로 등록될 예정이던 귀중한 유물이었다.'
    ],
    setting: '한빛고등학교 역사관',

    crimeTime: '12:30',
    crimeLocation: '역사관 전시실',
    culpritId: 'char-014-4',
    victimId: undefined,
    motive: '수집욕과 탐욕',
    motiveDetail: '고서 수집가로 오랫동안 이 서적을 원했으나 학교가 판매를 거부. 결국 훔치기로 결심',
    method: '점심시간 절도',
    methodDetail: '역사관 관람 중 CCTV 사각지대를 이용해 전시품을 훔쳐 가방에 숨김',

    characters: [
      {
        id: 'char-014-1',
        name: '김정한',
        role: 'witness',
        age: 58,
        gender: 'male',
        occupation: '역사 교사 / 역사관 관장',
        personality: '학구적이고 문화재 보호에 열정적',
        appearance: '한복을 입은 고풍스러운 남성',
        background: '역사학 박사, 20년째 역사관 관리',
        alibi: {
          location: '교무실',
          time: '12:00-13:00',
          activity: '점심 식사',
          witnesses: ['다른 교사들'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-014-4', type: '지인', description: '고서 수집가로 알고 지냄', isSecret: false }
        ],
        secrets: [],
        dialogues: [
          { topic: '실학서', lines: ['조선 후기 실학서예요.', '문화재청에 등록 신청 중이었죠.'], revealsInfo: '서적 가치' },
          { topic: '보안', lines: ['점심시간엔 무인 운영이에요.', 'CCTV와 센서가 있지만...'], revealsInfo: '보안 허점' }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-014-2',
        name: '이수민',
        role: 'witness',
        age: 17,
        gender: 'female',
        occupation: '역사동아리 부장',
        personality: '역사를 좋아하고 관찰력이 뛰어남',
        appearance: '안경을 쓴 지적인 여학생',
        background: '역사동아리 부장, 역사관 자원봉사',
        alibi: {
          location: '도서관',
          time: '12:00-13:00',
          activity: '점심 후 자습',
          witnesses: ['도서관 사서'],
          hasHole: false
        },
        relationships: [],
        secrets: [
          { id: 'secret-014-1', content: '점심시간에 역사관에 낯선 중년 남성이 들어가는 것을 봤음', importance: 'critical', revealCondition: '점심시간에 대해 물을 때' }
        ],
        dialogues: [
          { topic: '실학서', lines: ['정말 귀한 책이에요.', '선생님이 자랑하셨죠.'], revealsInfo: '서적 중요도' },
          { topic: '낯선 사람', lines: ['점심시간에 역사관에 어떤 남자가 들어가는 걸 봤어요.', '정장 입은 중년 남성이었어요.'], revealsInfo: '용의자 목격' }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-014-3',
        name: '박준호',
        role: 'witness',
        age: 50,
        gender: 'male',
        occupation: '보안 담당자',
        personality: '꼼꼼하지만 형식적',
        appearance: '보안 제복을 입은 남성',
        background: '5년째 학교 보안 담당',
        alibi: {
          location: '보안실',
          time: '12:00-13:00',
          activity: 'CCTV 모니터링',
          witnesses: ['근무 일지'],
          hasHole: false
        },
        relationships: [],
        secrets: [
          { id: 'secret-014-2', content: 'CCTV 사각지대가 있다는 것을 알고 있었으나 보고 안 함', importance: 'major', revealCondition: 'CCTV에 대해 추궁할 때' }
        ],
        dialogues: [
          { topic: 'CCTV', lines: ['역사관 전체를 커버하고 있어요.', '...사실 전시대 뒤쪽은 사각지대가 있긴 해요.'], revealsInfo: 'CCTV 사각지대' },
          { topic: '방문자', lines: ['점심시간에 몇 명 들어갔어요.', '로그를 확인해볼까요?'], revealsInfo: '방문 기록' }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-014-4',
        name: '조인성',
        role: 'culprit',
        age: 55,
        gender: 'male',
        occupation: '고서 수집가',
        personality: '교양 있어 보이지만 탐욕스러움',
        appearance: '고급 정장을 입은 점잖은 중년 남성',
        background: '부유한 고서 수집가, 이 서적을 오래 탐냄',
        alibi: {
          location: '역사관',
          time: '12:20-12:40',
          activity: '역사관 관람',
          witnesses: ['방문자 명부'],
          hasHole: true,
          holeDetail: '혼자 관람, 행적 불분명'
        },
        motive: {
          type: 'greed',
          description: '고서 수집가로서 이 서적을 오랫동안 원했으나 학교가 판매를 거부. 소유욕이 범죄로 이어짐',
          strength: 3
        },
        relationships: [
          { targetId: 'char-014-1', type: '지인', description: '과거 서적 구매 시도', isSecret: true }
        ],
        secrets: [
          { id: 'secret-014-3', content: '서적을 자신의 개인 서재에 숨김', importance: 'critical', revealCondition: '자택 수색' }
        ],
        dialogues: [
          { topic: '실학서', lines: ['아, 그 서적이요?', '정말 아름다운 책이더군요.'], revealsInfo: '관심 표명' },
          { topic: '관람', lines: ['그냥 둘러봤을 뿐이에요.', '역사에 관심이 많거든요.'], revealsInfo: '변명' },
          { topic: '수집', lines: ['...저는 수집가예요.', '그 책을 꼭 갖고 싶었어요.'], revealsInfo: '동기', requiresEvidence: ['evidence-014-4'] }
        ],
        nervousTriggers: ['수집', '구매', '서재', '사각지대', '가방']
      }
    ],

    evidence: [
      {
        id: 'evidence-014-1',
        name: '빈 전시대',
        type: 'physical',
        description: '실학서가 있던 전시대',
        detailedDescription: '유리 케이스가 열려있고 서적만 사라짐. 잠금장치는 손상 없음.',
        location: '역사관',
        foundAt: 'loc-014-1',
        linkedCharacters: [],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: true,
        analysisResult: '정교하게 개봉, 전문가 수준'
      },
      {
        id: 'evidence-014-2',
        name: '방문자 명부',
        type: 'document',
        description: '역사관 출입 기록',
        detailedDescription: '12:20-12:40 사이 조인성 입장. 다른 방문자 없음.',
        location: '역사관',
        foundAt: 'loc-014-1',
        linkedCharacters: ['char-014-4'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-014-3',
        name: 'CCTV 영상',
        type: 'digital',
        description: '역사관 CCTV',
        detailedDescription: '조인성이 전시대 쪽으로 가는 모습. 하지만 전시대 뒤쪽은 사각지대.',
        location: '보안실',
        foundAt: 'loc-014-2',
        linkedCharacters: ['char-014-4'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: true,
        analysisResult: '퇴장 시 가방이 약간 불룩'
      },
      {
        id: 'evidence-014-4',
        name: '구매 시도 이메일',
        type: 'digital',
        description: '과거 구매 요청 이메일',
        detailedDescription: '3개월 전 조인성이 김정한에게 보낸 이메일. 5천만원에 구매 제안.',
        location: '김정한 이메일',
        foundAt: 'loc-014-1',
        linkedCharacters: ['char-014-4', 'char-014-1'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-014-5',
        name: '실학서',
        type: 'physical',
        description: '조인성 서재에서 발견된 서적',
        detailedDescription: '학교 역사관 소장 도장이 찍힌 실학서.',
        location: '조인성 자택 서재',
        foundAt: 'loc-014-3',
        linkedCharacters: ['char-014-4'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      }
    ],

    locations: [
      {
        id: 'loc-014-1',
        name: '역사관',
        description: '역사 유물을 전시하는 공간',
        atmosphere: '고풍스러운 전시품들이 정렬되어 있다',
        objects: [
          { id: 'obj-1', name: '빈 전시대', description: '서적이 있던 곳', examinationResult: '정교하게 개봉됨', containsEvidence: 'evidence-014-1' },
          { id: 'obj-2', name: '방문자 명부', description: '출입 기록부', examinationResult: '조인성 확인', containsEvidence: 'evidence-014-2' }
        ],
        connectedTo: ['loc-014-2']
      },
      {
        id: 'loc-014-2',
        name: '보안실',
        description: 'CCTV 관제실',
        atmosphere: '모니터가 여러 대 있다',
        objects: [
          { id: 'obj-3', name: 'CCTV', description: '역사관 영상', examinationResult: '조인성 가방 변화', containsEvidence: 'evidence-014-3' }
        ],
        connectedTo: ['loc-014-1']
      },
      {
        id: 'loc-014-3',
        name: '조인성 자택 서재',
        description: '고서로 가득한 개인 서재',
        atmosphere: '귀중한 서적들이 진열되어 있다',
        objects: [
          { id: 'obj-4', name: '실학서', description: '새로 추가된 서적', examinationResult: '학교 소장 도장!', containsEvidence: 'evidence-014-5' }
        ],
        connectedTo: []
      }
    ],

    timeline: [
      { time: '12:00', event: '점심시간 시작', participants: [], location: 'loc-014-1', importance: 'minor', isRevealed: true },
      { time: '12:20', event: '조인성 역사관 입장', participants: ['char-014-4'], location: 'loc-014-1', importance: 'critical', isRevealed: false },
      { time: '12:30', event: '서적 절취', participants: ['char-014-4'], location: 'loc-014-1', importance: 'critical', isRevealed: false },
      { time: '12:40', event: '조인성 역사관 퇴장', participants: ['char-014-4'], location: 'loc-014-1', importance: 'critical', isRevealed: false },
      { time: '13:30', event: '서적 분실 발견', participants: ['char-014-1'], location: 'loc-014-1', importance: 'critical', isRevealed: true }
    ],

    solution: {
      summary: '조인성이 오랫동안 탐낸 고서를 구매할 수 없자 점심시간을 이용해 훔쳤다.',
      detailedExplanation: [
        '조인성은 고서 수집가로 이 서적을 오래 원했다.',
        '3개월 전 5천만원에 구매를 제안했으나 학교가 거절.',
        '점심시간 무인 운영을 노려 역사관에 들어갔다.',
        'CCTV 사각지대를 이용해 전시대를 열고 서적을 가방에 숨김.',
        '방문 기록, CCTV, 구매 시도 이력이 결정적 증거.'
      ],
      keyEvidence: ['evidence-014-2', 'evidence-014-3', 'evidence-014-4', 'evidence-014-5'],
      howToSolve: [
        '방문자 명부에서 의심 인물을 특정한다',
        'CCTV에서 가방 변화를 확인한다',
        '과거 구매 시도 이력을 확인한다',
        'CCTV 사각지대를 파악한다',
        '자택 서재에서 서적을 발견한다'
      ],
      commonMistakes: [
        '학생을 의심함',
        '내부 관계자로 생각함'
      ]
    },

    deductionKeywords: {
      who: ['조인성', '수집가'],
      why: ['수집욕', '탐욕', '구매 거절'],
      how: ['사각지대', '점심시간', '가방'],
      when: ['12:30', '점심시간'],
      where: ['역사관', '전시실']
    },

    tags: ['역사관', '고서', '문화재', '수집가', '외부인'],
    author: 'DEDUCTIO',
    version: '1.0'
  },

  // ============ THEFT-015: IT실의 노트북 ============
  {
    id: 'theft-015',
    title: 'IT실의 노트북',
    subtitle: '사라진 최신 장비',
    type: 'theft',
    difficulty: 'medium',
    estimatedTime: 25,

    prologue: [
      '최신형 노트북 10대가 사라졌다.',
      'IT실에서 벌어진 대규모 절도.',
      '누가 이렇게 많은 장비를 가져갔을까.'
    ],
    introduction: [
      '한빛고등학교 IT실습실.',
      '코딩 교육용으로 구입한 최신형 노트북 10대가 밤사이 사라졌다.',
      'IT실은 보안이 철저한 곳이었는데 어떻게 된 일일까.'
    ],
    setting: '한빛고등학교 IT실습실',

    crimeTime: '23:00',
    crimeLocation: 'IT실습실',
    culpritId: 'char-015-3',
    victimId: undefined,
    motive: '경제적 이득',
    motiveDetail: '노트북을 중고로 팔아 빚을 갚으려 함. 학교 시스템에 대한 지식을 악용',
    method: '시스템 해킹 후 절도',
    methodDetail: '보안 시스템을 해킹하여 CCTV를 무력화하고 야간에 침입해 노트북을 가져감',

    characters: [
      {
        id: 'char-015-1',
        name: '장민수',
        role: 'witness',
        age: 38,
        gender: 'male',
        occupation: '정보 교사',
        personality: '기술에 정통하고 책임감 있음',
        appearance: '캐주얼한 복장의 젊은 교사',
        background: '컴퓨터공학 전공, 7년째 정보 교사',
        alibi: {
          location: '자택',
          time: '21:00-',
          activity: '퇴근 후 휴식',
          witnesses: ['가족'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-015-3', type: '사제', description: '컴퓨터 재능이 뛰어난 제자', isSecret: false }
        ],
        secrets: [],
        dialogues: [
          { topic: '노트북', lines: ['개당 200만원짜리 최신 모델이에요.', '총 2천만원어치죠.'], revealsInfo: '노트북 가치' },
          { topic: '보안', lines: ['출입카드와 CCTV로 철저히 관리했어요.', '어떻게 뚫렸는지...'], revealsInfo: '보안 시스템' }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-015-2',
        name: '최유진',
        role: 'witness',
        age: 17,
        gender: 'female',
        occupation: '정보 동아리 부장',
        personality: '똑똑하고 컴퓨터에 능숙함',
        appearance: '노트북을 들고 다니는 여학생',
        background: '프로그래밍 실력이 뛰어남',
        alibi: {
          location: '자택',
          time: '20:00-',
          activity: '귀가 후 온라인 수업',
          witnesses: ['온라인 수업 로그'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-015-3', type: '동아리 동료', description: '같은 정보 동아리', isSecret: false }
        ],
        secrets: [
          { id: 'secret-015-1', content: '강태민이 최근 학교 보안 시스템에 대해 질문을 많이 했음', importance: 'critical', revealCondition: '강태민에 대해 물을 때' }
        ],
        dialogues: [
          { topic: '노트북', lines: ['어제까지 다 있었어요.', '실습 끝나고 정리했거든요.'], revealsInfo: '마지막 확인' },
          { topic: '강태민', lines: ['태민이가 요즘 이상했어요.', '출입 시스템이랑 CCTV 위치를 자꾸 물어봤거든요.'], revealsInfo: '이상 징후' }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-015-3',
        name: '강태민',
        role: 'culprit',
        age: 18,
        gender: 'male',
        occupation: '정보 동아리 학생',
        personality: '컴퓨터에 천재적이나 도덕성 부족',
        appearance: '후드를 쓰고 다니는 남학생',
        background: '해킹 실력이 뛰어나지만 게임 빚으로 곤경',
        alibi: {
          location: 'PC방',
          time: '20:00-24:00',
          activity: '게임',
          witnesses: ['PC방 사장 (불확실)'],
          hasHole: true,
          holeDetail: 'PC방에서 자리를 비운 시간 있음'
        },
        motive: {
          type: 'greed',
          description: '게임 아이템 거래로 인한 빚 1천만원을 갚기 위해 노트북을 훔쳐 판매하려 함',
          strength: 3
        },
        relationships: [],
        secrets: [
          { id: 'secret-015-2', content: '보안 시스템을 해킹하여 CCTV를 무력화하고 침입', importance: 'critical', revealCondition: '시스템 로그 분석' }
        ],
        dialogues: [
          { topic: '노트북', lines: ['저는 PC방에 있었어요.', '게임하고 있었다고요.'], revealsInfo: '알리바이 주장' },
          { topic: '해킹', lines: ['...그냥 실력 시험해본 거예요.', '진짜 가져갈 생각은 아니었는데...'], revealsInfo: '변명' },
          { topic: '빚', lines: ['...돈이 필요했어요.', '갚을 방법이 없었어요.'], revealsInfo: '동기', requiresEvidence: ['evidence-015-4'] }
        ],
        nervousTriggers: ['해킹', '빚', '게임', 'CCTV', '시스템']
      }
    ],

    evidence: [
      {
        id: 'evidence-015-1',
        name: '빈 노트북 보관함',
        type: 'physical',
        description: '노트북이 있던 보관함',
        detailedDescription: '10대 보관함이 모두 비어있음. 잠금장치는 정상 해제됨.',
        location: 'IT실습실',
        foundAt: 'loc-015-1',
        linkedCharacters: [],
        isCritical: false,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-015-2',
        name: '보안 시스템 로그',
        type: 'digital',
        description: 'IT실 출입 및 CCTV 기록',
        detailedDescription: '23:00-23:30 사이 CCTV가 오프라인 상태. 출입 기록은 정상으로 위조됨.',
        location: '보안 서버',
        foundAt: 'loc-015-2',
        linkedCharacters: [],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: true,
        analysisResult: '해킹 흔적 발견'
      },
      {
        id: 'evidence-015-3',
        name: '해킹 도구',
        type: 'digital',
        description: '강태민 노트북에서 발견된 프로그램',
        detailedDescription: '학교 보안 시스템 해킹용 스크립트. 실행 시간이 어제 밤 22:50.',
        location: '강태민 노트북',
        foundAt: 'loc-015-3',
        linkedCharacters: ['char-015-3'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: true,
        analysisResult: '학교 시스템 접속 코드 일치'
      },
      {
        id: 'evidence-015-4',
        name: '중고 거래 채팅',
        type: 'digital',
        description: '강태민 핸드폰 메시지',
        detailedDescription: '"노트북 10대 있음. 급매 1천만원" 중고 거래상과의 대화.',
        location: '강태민 핸드폰',
        foundAt: 'loc-015-3',
        linkedCharacters: ['char-015-3'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-015-5',
        name: '노트북',
        type: 'physical',
        description: '강태민 집 창고에서 발견된 노트북',
        detailedDescription: '학교 IT실 자산 스티커가 붙은 노트북 10대.',
        location: '강태민 자택 창고',
        foundAt: 'loc-015-3',
        linkedCharacters: ['char-015-3'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      }
    ],

    locations: [
      {
        id: 'loc-015-1',
        name: 'IT실습실',
        description: '컴퓨터와 노트북이 있는 실습실',
        atmosphere: '최신 장비들이 정렬되어 있다',
        objects: [
          { id: 'obj-1', name: '보관함', description: '비어있는 노트북 보관함', examinationResult: '정상 해제됨', containsEvidence: 'evidence-015-1' }
        ],
        connectedTo: ['loc-015-2']
      },
      {
        id: 'loc-015-2',
        name: '보안실',
        description: '보안 시스템 서버실',
        atmosphere: '서버와 모니터가 있다',
        objects: [
          { id: 'obj-2', name: '보안 로그', description: '시스템 기록', examinationResult: '해킹 흔적', containsEvidence: 'evidence-015-2' }
        ],
        connectedTo: ['loc-015-1']
      },
      {
        id: 'loc-015-3',
        name: '강태민 자택',
        description: '강태민이 거주하는 집',
        atmosphere: '컴퓨터 장비가 많은 방',
        objects: [
          { id: 'obj-3', name: '강태민 노트북', description: '개인 노트북', examinationResult: '해킹 도구 발견', containsEvidence: 'evidence-015-3', isLocked: true, unlockMethod: '본인 동의 또는 강력한 증거' },
          { id: 'obj-4', name: '창고', description: '집 창고', examinationResult: '노트북 10대!', containsEvidence: 'evidence-015-5' }
        ],
        connectedTo: []
      }
    ],

    timeline: [
      { time: '22:50', event: '강태민 해킹 도구 실행', participants: ['char-015-3'], location: 'PC방', importance: 'critical', isRevealed: false },
      { time: '23:00', event: 'CCTV 무력화', participants: ['char-015-3'], location: 'loc-015-1', importance: 'critical', isRevealed: false },
      { time: '23:05', event: 'IT실 침입', participants: ['char-015-3'], location: 'loc-015-1', importance: 'critical', isRevealed: false },
      { time: '23:15', event: '노트북 절취', participants: ['char-015-3'], location: 'loc-015-1', importance: 'critical', isRevealed: false },
      { time: '23:30', event: '시스템 복구', participants: ['char-015-3'], location: 'loc-015-1', importance: 'critical', isRevealed: false },
      { time: '다음날 08:00', event: '노트북 분실 발견', participants: ['char-015-1'], location: 'loc-015-1', importance: 'critical', isRevealed: true }
    ],

    solution: {
      summary: '강태민이 게임 빚을 갚기 위해 보안 시스템을 해킹하고 노트북 10대를 훔쳤다.',
      detailedExplanation: [
        '강태민은 게임 아이템 거래로 1천만원의 빚이 생겼다.',
        '컴퓨터 실력을 악용하여 학교 보안 시스템을 해킹.',
        'CCTV를 무력화하고 야간에 IT실에 침입했다.',
        '노트북 10대를 가져가 중고로 팔려고 했다.',
        '보안 로그, 해킹 도구, 거래 메시지가 결정적 증거.'
      ],
      keyEvidence: ['evidence-015-2', 'evidence-015-3', 'evidence-015-4', 'evidence-015-5'],
      howToSolve: [
        '보안 시스템 로그를 분석한다',
        '해킹 흔적을 찾는다',
        '컴퓨터 실력이 뛰어난 인물을 특정한다',
        '개인 노트북에서 해킹 도구를 발견한다',
        '자택에서 노트북을 발견한다'
      ],
      commonMistakes: [
        '외부 전문 해커로 생각함',
        '교사를 의심함'
      ]
    },

    deductionKeywords: {
      who: ['강태민', '정보 동아리'],
      why: ['빚', '게임', '돈'],
      how: ['해킹', 'CCTV 무력화', '야간 침입'],
      when: ['23:00', '야간'],
      where: ['IT실습실', 'PC방']
    },

    tags: ['IT실', '노트북', '해킹', '게임 빚', '보안'],
    author: 'DEDUCTIO',
    version: '1.0'
  }
];

export default theftScenariosPart3;
