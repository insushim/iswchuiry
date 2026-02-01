// ========================================
// 사기 시나리오 Part 2 (009-015)
// ========================================

import { Scenario } from './types';

export const fraudScenariosPart2: Scenario[] = [
  // ============ FRAUD-009: 위조 출석부 ============
  {
    id: 'fraud-009',
    title: '위조 출석부',
    subtitle: '조작된 출결 기록',
    type: 'fraud',
    difficulty: 'medium',
    estimatedTime: 20,

    prologue: [
      '완벽한 출석률의 학생.',
      '그러나 기록은 조작되어 있었다.',
      '상을 받기 위한 거짓말.'
    ],
    introduction: [
      '한빛고등학교 학생부.',
      '개근상 후보인 이수민의 출석 기록에 의혹이 제기되었다.',
      '분명 결석한 날이 있었는데 기록에는 없다.'
    ],
    setting: '한빛고등학교 학생부실',

    crimeTime: '17:30',
    crimeLocation: '학생부실',
    culpritId: 'char-009-3',
    victimId: undefined,
    motive: '장학금과 상장',
    motiveDetail: '개근상을 받으면 장학금을 받을 수 있어서 출석부를 조작',
    method: '전자 출석부 해킹',
    methodDetail: '담임교사 계정으로 로그인하여 결석 기록을 출석으로 변경',

    characters: [
      {
        id: 'char-009-1',
        name: '박선영',
        role: 'witness',
        age: 38,
        gender: 'female',
        occupation: '학생부장',
        personality: '꼼꼼하고 원칙적임',
        appearance: '정장을 입은 단정한 여성',
        background: '10년차 학생부장, 출결 관리 담당',
        alibi: {
          location: '회의실',
          time: '17:00-18:30',
          activity: '교무 회의',
          witnesses: ['다른 교사들'],
          hasHole: false
        },
        relationships: [],
        secrets: [],
        dialogues: [
          { topic: '출석부', lines: ['이수민 학생 기록이 이상해요.', '분명 11월 5일 결석했는데 출석으로 되어있어요.'], revealsInfo: '조작 발견' },
          { topic: '시스템', lines: ['전자 출석부는 담임만 수정할 수 있어요.', '근데 담임 선생님은 그날 수정 안 했대요.'], revealsInfo: '해킹 가능성' }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-009-2',
        name: '최민준',
        role: 'witness',
        age: 42,
        gender: 'male',
        occupation: '2학년 담임교사',
        personality: '자상하고 학생들을 신뢰함',
        appearance: '안경을 쓴 온화한 인상의 남성',
        background: '이수민의 담임, 컴퓨터에 서툴러서 비밀번호를 메모해둠',
        alibi: {
          location: '자택',
          time: '17:00-',
          activity: '퇴근 후 휴식',
          witnesses: ['가족'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-009-3', type: '사제', description: '담임-학생 관계', isSecret: false }
        ],
        secrets: [
          { id: 'secret-009-1', content: '비밀번호를 책상 서랍에 메모해둠', importance: 'critical', revealCondition: '비밀번호 관리에 대해 물을 때' }
        ],
        dialogues: [
          { topic: '출석부', lines: ['제가 수정한 적 없어요.', '근데... 누가 제 계정으로 접속했나봐요.'], revealsInfo: '계정 도용' },
          { topic: '비밀번호', lines: ['...사실 비밀번호를 메모해뒀어요.', '책상 서랍에요. 자주 잊어버려서...'], revealsInfo: '보안 허점' }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-009-3',
        name: '이수민',
        role: 'culprit',
        age: 17,
        gender: 'female',
        occupation: '2학년 학생',
        personality: '성실해 보이지만 욕심이 많음',
        appearance: '단정한 교복의 모범생 이미지',
        background: '장학금이 절실한 상황, 개근상 조건이 필요함',
        alibi: {
          location: '교실',
          time: '17:00-17:30',
          activity: '청소 당번',
          witnesses: ['청소 당번 친구들 (17:15까지만)'],
          hasHole: true,
          holeDetail: '17:15 이후 행적 불분명'
        },
        motive: {
          type: 'greed',
          description: '개근상을 받으면 장학금 50만원이 나오는데 한 번 결석한 기록이 있어서 조작',
          strength: 2
        },
        relationships: [],
        secrets: [
          { id: 'secret-009-2', content: '담임 선생님 책상 서랍에서 비밀번호를 보고 출석부 수정', importance: 'critical', revealCondition: '접속 로그 또는 추궁' }
        ],
        dialogues: [
          { topic: '개근상', lines: ['네, 개근상 받을 예정이에요.', '장학금도 나온다고 해서...'], revealsInfo: '동기' },
          { topic: '11월 5일', lines: ['그날요? 학교 왔었어요.', '...분명히 왔는데요.'], revealsInfo: '거짓말' },
          { topic: '출석부', lines: ['제가 왜 출석부를요?', '...저는 그냥 학생인데요.'], revealsInfo: '회피', requiresEvidence: ['evidence-009-2'] }
        ],
        nervousTriggers: ['비밀번호', '로그인', '11월 5일', '결석', '서랍']
      },
      {
        id: 'char-009-4',
        name: '김나영',
        role: 'witness',
        age: 17,
        gender: 'female',
        occupation: '2학년 학생 (같은 반)',
        personality: '솔직하고 정의로움',
        appearance: '활발한 인상의 여학생',
        background: '이수민과 같은 반, 진실을 알고 있음',
        alibi: {
          location: '집',
          time: '17:00-',
          activity: '귀가',
          witnesses: ['가족'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-009-3', type: '같은 반', description: '반 친구', isSecret: false }
        ],
        secrets: [
          { id: 'secret-009-3', content: '11월 5일 수민이가 아파서 결석한 걸 알고 있음', importance: 'critical', revealCondition: '11월 5일에 대해 물을 때' }
        ],
        dialogues: [
          { topic: '11월 5일', lines: ['그날 수민이 안 왔어요.', '아프다고 연락 받았거든요.'], revealsInfo: '결석 확인' },
          { topic: '수민', lines: ['수민이 장학금 꼭 받아야 한다고 했어요.', '그래서 걱정했는데...'], revealsInfo: '절박함' }
        ],
        nervousTriggers: []
      }
    ],

    evidence: [
      {
        id: 'evidence-009-1',
        name: '출석부 수정 기록',
        type: 'digital',
        description: '전자 출석부 시스템 로그',
        detailedDescription: '11월 6일 17:20에 최민준 계정으로 접속하여 11월 5일 이수민 출석 상태를 결석→출석으로 변경.',
        location: '학생부실 서버',
        foundAt: 'loc-009-1',
        linkedCharacters: [],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-009-2',
        name: '접속 IP 주소',
        type: 'digital',
        description: '출석부 접속 IP 기록',
        detailedDescription: '17:20 접속 IP는 교무실이 아닌 학생부실 컴퓨터에서 접속됨.',
        location: '학생부실 서버',
        foundAt: 'loc-009-1',
        linkedCharacters: [],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: true,
        analysisResult: '학생부실 컴퓨터에서 접속'
      },
      {
        id: 'evidence-009-3',
        name: 'CCTV 영상',
        type: 'digital',
        description: '학생부실 복도 CCTV',
        detailedDescription: '17:18에 이수민이 학생부실에 들어가 17:25에 나오는 모습.',
        location: '보안실',
        foundAt: 'loc-009-3',
        linkedCharacters: ['char-009-3'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-009-4',
        name: '비밀번호 메모지',
        type: 'document',
        description: '최민준 선생님 서랍의 메모지',
        detailedDescription: '출석부 계정 ID와 비밀번호가 적혀있는 포스트잇.',
        location: '교무실 최민준 책상',
        foundAt: 'loc-009-2',
        linkedCharacters: ['char-009-2'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-009-5',
        name: '11월 5일 결석 증명',
        type: 'testimony',
        description: '김나영의 증언 및 카톡 기록',
        detailedDescription: '11월 5일 이수민이 "아파서 학교 못 간다"고 보낸 카톡 메시지.',
        location: '김나영 핸드폰',
        foundAt: 'loc-009-4',
        linkedCharacters: ['char-009-3', 'char-009-4'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      }
    ],

    locations: [
      {
        id: 'loc-009-1',
        name: '학생부실',
        description: '학생 관리 업무를 담당하는 사무실',
        atmosphere: '서류와 컴퓨터가 있는 사무 공간',
        objects: [
          { id: 'obj-1', name: '출석부 서버', description: '전자 출석부 시스템', examinationResult: '수정 로그 확인', containsEvidence: 'evidence-009-1' },
          { id: 'obj-2', name: 'IP 기록', description: '접속 IP 로그', examinationResult: '학생부실 컴퓨터 IP', containsEvidence: 'evidence-009-2' }
        ],
        connectedTo: ['loc-009-2', 'loc-009-3']
      },
      {
        id: 'loc-009-2',
        name: '교무실',
        description: '교사들의 업무 공간',
        atmosphere: '책상과 컴퓨터가 줄지어 있다',
        objects: [
          { id: 'obj-3', name: '최민준 책상 서랍', description: '담임 선생님의 서랍', examinationResult: '비밀번호 메모 발견', containsEvidence: 'evidence-009-4' }
        ],
        connectedTo: ['loc-009-1']
      },
      {
        id: 'loc-009-3',
        name: '보안실',
        description: 'CCTV 관제실',
        atmosphere: '모니터가 여러 대 있다',
        objects: [
          { id: 'obj-4', name: 'CCTV', description: '학생부실 복도 영상', examinationResult: '이수민 출입 확인', containsEvidence: 'evidence-009-3' }
        ],
        connectedTo: ['loc-009-1']
      },
      {
        id: 'loc-009-4',
        name: '김나영 증언/핸드폰',
        description: '목격자 김나영',
        atmosphere: '증거 제공',
        objects: [
          { id: 'obj-5', name: '카톡 기록', description: '11월 5일 대화', examinationResult: '결석 확인', containsEvidence: 'evidence-009-5' }
        ],
        connectedTo: []
      }
    ],

    timeline: [
      { time: '11월 5일', event: '이수민 결석 (병가)', participants: ['char-009-3'], location: '자택', importance: 'critical', isRevealed: false },
      { time: '11월 6일 17:15', event: '청소 당번 종료', participants: ['char-009-3'], location: '교실', importance: 'minor', isRevealed: true },
      { time: '11월 6일 17:18', event: '학생부실 침입', participants: ['char-009-3'], location: 'loc-009-1', importance: 'critical', isRevealed: false },
      { time: '11월 6일 17:20', event: '출석부 조작', participants: ['char-009-3'], location: 'loc-009-1', importance: 'critical', isRevealed: false },
      { time: '11월 6일 17:25', event: '학생부실 퇴장', participants: ['char-009-3'], location: 'loc-009-1', importance: 'major', isRevealed: false },
      { time: '다음 주', event: '출석부 이상 발견', participants: ['char-009-1'], location: 'loc-009-1', importance: 'critical', isRevealed: true }
    ],

    solution: {
      summary: '이수민이 개근상 장학금을 받기 위해 담임 선생님 비밀번호를 훔쳐 출석부를 조작했다.',
      detailedExplanation: [
        '이수민은 11월 5일 아파서 결석했으나 개근상이 필요했다.',
        '개근상을 받으면 50만원 장학금이 나오는 상황.',
        '담임 선생님이 비밀번호를 서랍에 메모해둔 것을 알게 됨.',
        '청소 당번 후 학생부실에 침입하여 출석부를 수정.',
        '결석 기록을 출석으로 변경하여 개근 기록을 만듦.',
        '접속 로그, CCTV, 카톡 기록이 결정적 증거.'
      ],
      keyEvidence: ['evidence-009-1', 'evidence-009-2', 'evidence-009-3', 'evidence-009-5'],
      howToSolve: [
        '출석부 수정 로그를 확인한다',
        '접속 IP와 시간을 분석한다',
        'CCTV에서 학생부실 출입자를 확인한다',
        '11월 5일 실제 출석 여부를 확인한다',
        '비밀번호 유출 경로를 파악한다'
      ],
      commonMistakes: [
        '담임 선생님이 조작했다고 생각함',
        '시스템 오류로 오해함'
      ]
    },

    deductionKeywords: {
      who: ['이수민', '학생', '개근상 후보'],
      why: ['장학금', '개근상', '돈'],
      how: ['비밀번호', '출석부', '해킹'],
      when: ['17:20', '청소 당번 후'],
      where: ['학생부실', '컴퓨터']
    },

    tags: ['출석부', '조작', '개근상', '장학금', '해킹'],
    author: 'DEDUCTIO',
    version: '1.0'
  },

  // ============ FRAUD-010: 학원 할인 사기 ============
  {
    id: 'fraud-010',
    title: '학원 할인 사기',
    subtitle: '가짜 수강생 명단',
    type: 'fraud',
    difficulty: 'easy',
    estimatedTime: 20,

    prologue: [
      '인기 학원의 할인 혜택.',
      '그러나 명단은 조작되어 있었다.',
      '친구를 이용한 사기.'
    ],
    introduction: [
      '스타 학원 영어반.',
      '친구 추천 할인 이벤트가 열렸는데 수강생 명단에 이상한 점이 발견되었다.',
      '존재하지 않는 학생들이 다수 포함되어 있다.'
    ],
    setting: '스타 학원',

    crimeTime: '11월 한 달간',
    crimeLocation: '학원 사무실',
    culpritId: 'char-010-2',
    victimId: undefined,
    motive: '할인 혜택 독점',
    motiveDetail: '친구 추천 할인으로 자신의 수강료를 거의 무료로 만들기 위해 가짜 추천인을 등록',
    method: '허위 명단 작성',
    methodDetail: '존재하지 않는 친구 이름과 연락처를 허위로 작성하여 추천 할인 누적',

    characters: [
      {
        id: 'char-010-1',
        name: '정수연',
        role: 'witness',
        age: 35,
        gender: 'female',
        occupation: '학원 원장',
        personality: '친절하지만 원칙적임',
        appearance: '단정한 정장 차림의 여성',
        background: '10년째 학원 운영, 학생 관리에 철저함',
        alibi: {
          location: '학원 사무실',
          time: '평일 오후',
          activity: '업무',
          witnesses: ['직원들'],
          hasHole: false
        },
        relationships: [],
        secrets: [],
        dialogues: [
          { topic: '할인', lines: ['친구 추천하면 둘 다 10% 할인해줘요.', '5명 추천하면 50% 할인이죠.'], revealsInfo: '할인 제도' },
          { topic: '명단', lines: ['박지훈 학생이 추천한 친구들이... 이상해요.', '연락이 안 되고, 수업도 안 들어요.'], revealsInfo: '의혹' }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-010-2',
        name: '박지훈',
        role: 'culprit',
        age: 16,
        gender: 'male',
        occupation: '학원생',
        personality: '영리하지만 도덕성이 부족함',
        appearance: '똑똑해 보이는 남학생',
        background: '학원비 부담을 느끼고 있었음',
        alibi: {
          location: '학원',
          time: '수업 시간',
          activity: '영어 수업',
          witnesses: ['다른 학생들'],
          hasHole: false
        },
        motive: {
          type: 'greed',
          description: '친구 추천 할인을 악용하여 거의 무료로 학원을 다니려고 함',
          strength: 2
        },
        relationships: [],
        secrets: [
          { id: 'secret-010-1', content: '가짜 친구 5명을 등록하여 50% 할인 받음', importance: 'critical', revealCondition: '명단 확인 또는 추궁' }
        ],
        dialogues: [
          { topic: '추천', lines: ['친구들 많이 추천했죠.', '다들 학원 다니고 싶어 해서요.'], revealsInfo: '주장' },
          { topic: '연락', lines: ['...요즘 바빠서 연락 잘 안 되나봐요.', '곧 올 거예요.'], revealsInfo: '변명' },
          { topic: '할인', lines: ['50% 할인 받았어요.', '...제가 많이 추천해서요.'], revealsInfo: '동기', requiresEvidence: ['evidence-010-2'] }
        ],
        nervousTriggers: ['가짜', '연락처', '존재하지 않는', '확인', '허위']
      },
      {
        id: 'char-010-3',
        name: '이민서',
        role: 'witness',
        age: 16,
        gender: 'female',
        occupation: '학원생',
        personality: '관찰력이 좋고 정직함',
        appearance: '성실해 보이는 여학생',
        background: '박지훈과 같은 학원, 의혹을 눈치챔',
        alibi: {
          location: '학원',
          time: '수업 시간',
          activity: '영어 수업',
          witnesses: ['다른 학생들'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-010-2', type: '같은 학원', description: '학원 동기', isSecret: false }
        ],
        secrets: [
          { id: 'secret-010-2', content: '지훈이가 추천했다는 친구들을 본 적이 없음', importance: 'major', revealCondition: '추천 친구에 대해 물을 때' }
        ],
        dialogues: [
          { topic: '추천', lines: ['지훈이가 친구 많이 추천했다는데...', '전 한 번도 못 봤어요.'], revealsInfo: '목격 부재' },
          { topic: '할인', lines: ['지훈이만 엄청 싸게 다니더라고요.', '50%나 할인받았대요.'], revealsInfo: '이득' }
        ],
        nervousTriggers: []
      }
    ],

    evidence: [
      {
        id: 'evidence-010-1',
        name: '추천 명단',
        type: 'document',
        description: '박지훈이 추천한 학생 명단',
        detailedDescription: '김철수, 이영희, 박민지, 최동욱, 정수진 5명. 모두 연락 불가.',
        location: '학원 사무실',
        foundAt: 'loc-010-1',
        linkedCharacters: ['char-010-2'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-010-2',
        name: '연락처 확인 결과',
        type: 'document',
        description: '추천 학생들 연락처 조사',
        detailedDescription: '5개 번호 모두 존재하지 않거나 전혀 다른 사람.',
        location: '학원 사무실',
        foundAt: 'loc-010-1',
        linkedCharacters: ['char-010-2'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-010-3',
        name: '할인 내역서',
        type: 'document',
        description: '박지훈 할인 기록',
        detailedDescription: '5명 추천으로 50% 할인 적용. 월 30만원→15만원.',
        location: '학원 사무실',
        foundAt: 'loc-010-1',
        linkedCharacters: ['char-010-2'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-010-4',
        name: '출석부',
        type: 'document',
        description: '학원 출석부',
        detailedDescription: '추천된 5명의 학생은 한 번도 출석한 적 없음.',
        location: '학원 사무실',
        foundAt: 'loc-010-1',
        linkedCharacters: ['char-010-2'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-010-5',
        name: '신청서 필체',
        type: 'physical',
        description: '5명의 수강 신청서',
        detailedDescription: '5장의 신청서 필체가 모두 동일. 박지훈 필체와 유사.',
        location: '학원 사무실',
        foundAt: 'loc-010-1',
        linkedCharacters: ['char-010-2'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: true,
        analysisResult: '필체 감정 결과 모두 동일인 작성'
      }
    ],

    locations: [
      {
        id: 'loc-010-1',
        name: '학원 사무실',
        description: '학생 등록 및 관리 사무실',
        atmosphere: '서류와 컴퓨터가 있는 사무 공간',
        objects: [
          { id: 'obj-1', name: '추천 명단', description: '추천 학생 목록', examinationResult: '5명 등록 확인', containsEvidence: 'evidence-010-1' },
          { id: 'obj-2', name: '할인 내역', description: '박지훈 할인 기록', examinationResult: '50% 할인 확인', containsEvidence: 'evidence-010-3' },
          { id: 'obj-3', name: '출석부', description: '수업 출석 기록', examinationResult: '5명 출석 기록 없음', containsEvidence: 'evidence-010-4' },
          { id: 'obj-4', name: '신청서 파일', description: '수강 신청서 보관함', examinationResult: '필체 동일', containsEvidence: 'evidence-010-5' }
        ],
        connectedTo: []
      }
    ],

    timeline: [
      { time: '11월 1일', event: '할인 이벤트 시작', participants: ['char-010-1'], location: 'loc-010-1', importance: 'minor', isRevealed: true },
      { time: '11월 3일', event: '박지훈 첫 번째 추천 등록', participants: ['char-010-2'], location: 'loc-010-1', importance: 'major', isRevealed: false },
      { time: '11월 중순', event: '5명 추천 완료, 50% 할인 적용', participants: ['char-010-2'], location: 'loc-010-1', importance: 'critical', isRevealed: false },
      { time: '11월 말', event: '추천 학생들 연락 시도 실패', participants: ['char-010-1'], location: 'loc-010-1', importance: 'major', isRevealed: true },
      { time: '12월 초', event: '의혹 제기 및 조사 시작', participants: ['char-010-1'], location: 'loc-010-1', importance: 'critical', isRevealed: true }
    ],

    solution: {
      summary: '박지훈이 친구 추천 할인을 악용하여 가짜 학생 5명을 등록해 50% 할인을 받았다.',
      detailedExplanation: [
        '박지훈은 학원비 부담을 느끼고 있었다.',
        '친구 추천 할인 제도를 악용하기로 결심.',
        '존재하지 않는 친구 5명의 신청서를 작성.',
        '가짜 연락처를 기입하여 등록 완료.',
        '50% 할인 혜택을 받아 월 15만원만 지불.',
        '연락 불가, 출석 기록 없음, 필체 동일이 결정적 증거.'
      ],
      keyEvidence: ['evidence-010-1', 'evidence-010-2', 'evidence-010-4', 'evidence-010-5'],
      howToSolve: [
        '추천 명단을 확인한다',
        '연락처 유효성을 검증한다',
        '출석 기록을 확인한다',
        '신청서 필체를 대조한다',
        '할인 혜택 규모를 파악한다'
      ],
      commonMistakes: [
        '진짜 친구들이 바빠서 안 온다고 생각함',
        '단순 실수로 오해함'
      ]
    },

    deductionKeywords: {
      who: ['박지훈', '학원생'],
      why: ['할인', '학원비', '돈'],
      how: ['가짜 명단', '허위 등록', '필체'],
      when: ['11월', '한 달간'],
      where: ['학원', '사무실']
    },

    tags: ['학원', '할인', '사기', '허위 등록'],
    author: 'DEDUCTIO',
    version: '1.0'
  },

  // ============ FRAUD-011: 교복 중고거래 사기 ============
  {
    id: 'fraud-011',
    title: '교복 중고거래 사기',
    subtitle: '사라진 교복과 돈',
    type: 'fraud',
    difficulty: 'easy',
    estimatedTime: 15,

    prologue: [
      '중고 교복을 판다는 글.',
      '돈을 보냈지만 교복은 오지 않았다.',
      '학생을 노린 먹튀 사기.'
    ],
    introduction: [
      '한빛고 학생 커뮤니티.',
      '중고 교복 판매 글이 올라왔고 여러 학생이 돈을 송금했다.',
      '그러나 교복은 배송되지 않았고 판매자는 잠적했다.'
    ],
    setting: '온라인 학생 커뮤니티',

    crimeTime: '2주간',
    crimeLocation: '온라인',
    culpritId: 'char-011-2',
    victimId: 'char-011-1',
    motive: '용돈 벌이',
    motiveDetail: '교복을 실제로 가지고 있지 않으면서 판매 글을 올려 선입금만 받고 잠적',
    method: '선입금 사기',
    methodDetail: '중고 교복 판매 글을 올리고 계좌로 입금받은 뒤 연락 두절',

    characters: [
      {
        id: 'char-011-1',
        name: '김서윤',
        role: 'victim',
        age: 16,
        gender: 'female',
        occupation: '1학년 학생',
        personality: '순진하고 믿음이 많음',
        appearance: '키가 작은 여학생',
        background: '교복 사이즈가 안 맞아 중고로 바꾸려 했음',
        alibi: {
          location: '자택',
          time: '거래 시간',
          activity: '온라인 거래',
          witnesses: [],
          hasHole: false
        },
        relationships: [],
        secrets: [],
        dialogues: [
          { topic: '거래', lines: ['교복 산다는 글 보고 5만원 보냈어요.', '근데 교복이 안 와요...'], revealsInfo: '피해 상황' },
          { topic: '판매자', lines: ['닉네임은 "교복천사"였어요.', '친절하게 답변해줬는데...'], revealsInfo: '판매자 정보' }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-011-2',
        name: '정우진',
        role: 'culprit',
        age: 17,
        gender: 'male',
        occupation: '2학년 학생',
        personality: '돈에 집착하고 양심이 부족함',
        appearance: '평범한 남학생',
        background: '용돈이 부족해서 온라인 사기 시도',
        alibi: {
          location: '자택/학교',
          time: '거래 시간',
          activity: '온라인 활동',
          witnesses: [],
          hasHole: false
        },
        motive: {
          type: 'greed',
          description: '용돈이 부족해서 교복 판매 사기로 돈을 벌려고 함',
          strength: 2
        },
        relationships: [],
        secrets: [
          { id: 'secret-011-1', content: '실제 교복을 가지고 있지 않으면서 판매 글을 올림', importance: 'critical', revealCondition: '계좌 추적 또는 IP 확인' }
        ],
        dialogues: [
          { topic: '교복천사', lines: ['...그게 저예요.', '장난으로 한 거였어요.'], revealsInfo: '자백 암시', requiresEvidence: ['evidence-011-3'] },
          { topic: '돈', lines: ['...부모님한테 용돈 못 받아서...', '잘못했어요.'], revealsInfo: '동기', requiresEvidence: ['evidence-011-3'] }
        ],
        nervousTriggers: ['교복천사', '계좌', 'IP', '송금', '사기']
      },
      {
        id: 'char-011-3',
        name: '이하은',
        role: 'witness',
        age: 16,
        gender: 'female',
        occupation: '2학년 학생',
        personality: 'IT에 능통하고 정의로움',
        appearance: '안경을 쓴 똑똑해 보이는 여학생',
        background: '커뮤니티 운영자, 사기 추적 중',
        alibi: {
          location: '자택',
          time: '조사 시간',
          activity: 'IP 추적',
          witnesses: [],
          hasHole: false
        },
        relationships: [],
        secrets: [
          { id: 'secret-011-2', content: '판매자 IP를 추적하여 학교 근처임을 확인', importance: 'major', revealCondition: 'IP 추적 요청 시' }
        ],
        dialogues: [
          { topic: 'IP 추적', lines: ['판매자 IP 추적했어요.', '우리 학교 근처에서 접속했더라고요.'], revealsInfo: 'IP 정보' },
          { topic: '피해자', lines: ['서윤이 말고도 3명 더 당했어요.', '총 20만원 정도요.'], revealsInfo: '피해 규모' }
        ],
        nervousTriggers: []
      }
    ],

    evidence: [
      {
        id: 'evidence-011-1',
        name: '판매 게시글',
        type: 'digital',
        description: '커뮤니티에 올라온 교복 판매 글',
        detailedDescription: '"중고 교복 팝니다. 상태 최상. 선입금 후 배송." 사진은 인터넷에서 퍼온 것.',
        location: '온라인 커뮤니티',
        foundAt: 'loc-011-1',
        linkedCharacters: ['char-011-2'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: true,
        analysisResult: '사진은 다른 사이트에서 도용'
      },
      {
        id: 'evidence-011-2',
        name: '입금 계좌',
        type: 'document',
        description: '판매자가 알려준 계좌번호',
        detailedDescription: '예금주 "정우진". 2주간 4명에게서 총 20만원 입금받음.',
        location: '은행 조회',
        foundAt: 'loc-011-2',
        linkedCharacters: ['char-011-2'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-011-3',
        name: 'IP 추적 결과',
        type: 'digital',
        description: '판매 글 작성 IP',
        detailedDescription: '한빛고 근처 주거지역에서 접속. 정우진 집 주소와 일치.',
        location: '온라인',
        foundAt: 'loc-011-1',
        linkedCharacters: ['char-011-2'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: true,
        analysisResult: '정우진 집 근처 IP'
      },
      {
        id: 'evidence-011-4',
        name: '대화 기록',
        type: 'digital',
        description: '판매자와 피해자의 대화',
        detailedDescription: '"입금 확인했어요. 내일 배송할게요" 이후 연락 두절.',
        location: '커뮤니티 쪽지',
        foundAt: 'loc-011-1',
        linkedCharacters: ['char-011-1', 'char-011-2'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      }
    ],

    locations: [
      {
        id: 'loc-011-1',
        name: '온라인 커뮤니티',
        description: '학생들이 사용하는 학교 커뮤니티',
        atmosphere: '온라인 공간',
        objects: [
          { id: 'obj-1', name: '판매 글', description: '교복 판매 게시글', examinationResult: '사진 도용 확인', containsEvidence: 'evidence-011-1' },
          { id: 'obj-2', name: 'IP 로그', description: '작성자 IP 기록', examinationResult: 'IP 추적', containsEvidence: 'evidence-011-3' },
          { id: 'obj-3', name: '쪽지', description: '대화 내용', examinationResult: '사기 정황', containsEvidence: 'evidence-011-4' }
        ],
        connectedTo: []
      },
      {
        id: 'loc-011-2',
        name: '은행',
        description: '계좌 조회',
        atmosphere: '금융 기록',
        objects: [
          { id: 'obj-4', name: '계좌 내역', description: '입금 기록', examinationResult: '정우진 명의 확인', containsEvidence: 'evidence-011-2' }
        ],
        connectedTo: []
      }
    ],

    timeline: [
      { time: '2주 전', event: '판매 글 게시', participants: ['char-011-2'], location: 'loc-011-1', importance: 'critical', isRevealed: true },
      { time: '2주간', event: '4명에게 입금 받음', participants: ['char-011-2'], location: 'loc-011-2', importance: 'critical', isRevealed: false },
      { time: '1주 전', event: '배송 약속 후 연락 두절', participants: ['char-011-2'], location: 'loc-011-1', importance: 'critical', isRevealed: true },
      { time: '현재', event: '피해자들 신고 및 조사', participants: ['char-011-1', 'char-011-3'], location: 'loc-011-1', importance: 'critical', isRevealed: true }
    ],

    solution: {
      summary: '정우진이 교복을 가지고 있지 않으면서 판매 글을 올려 선입금만 받고 잠적하는 사기를 쳤다.',
      detailedExplanation: [
        '정우진은 용돈이 부족했다.',
        '중고 교복 판매 글을 올리고 사진은 인터넷에서 도용.',
        '4명에게 선입금을 받아 총 20만원을 챙김.',
        '배송 약속 후 연락을 끊음.',
        '계좌번호, IP 주소가 결정적 증거.'
      ],
      keyEvidence: ['evidence-011-1', 'evidence-011-2', 'evidence-011-3'],
      howToSolve: [
        '판매 글의 사진 출처를 확인한다',
        '입금 계좌 예금주를 확인한다',
        'IP 추적으로 작성자 위치를 파악한다',
        '피해자 수와 금액을 집계한다'
      ],
      commonMistakes: [
        '배송이 늦어진 것뿐이라고 생각함',
        '외부인 소행으로 오해함'
      ]
    },

    deductionKeywords: {
      who: ['정우진', '교복천사', '학생'],
      why: ['용돈', '돈'],
      how: ['선입금', '사기', '도용'],
      when: ['2주간'],
      where: ['온라인', '커뮤니티']
    },

    tags: ['중고거래', '사기', '온라인', '선입금'],
    author: 'DEDUCTIO',
    version: '1.0'
  },

  // ============ FRAUD-012: 급식비 횡령 ============
  {
    id: 'fraud-012',
    title: '급식비 횡령',
    subtitle: '사라진 급식 회계',
    type: 'fraud',
    difficulty: 'medium',
    estimatedTime: 25,

    prologue: [
      '반 급식비가 사라졌다.',
      '회계 담당이 횡령했다.',
      '신뢰를 저버린 학생.'
    ],
    introduction: [
      '한빛고 2학년 3반.',
      '급식비 회계를 맡은 학급 총무가 300만원을 횡령한 혐의를 받고 있다.',
      '반 학생들이 낸 급식비가 학교에 전달되지 않았다.'
    ],
    setting: '한빛고등학교 2학년 3반',

    crimeTime: '3개월간',
    crimeLocation: '교실/회계 계좌',
    culpritId: 'char-012-2',
    victimId: undefined,
    motive: '게임 과금',
    motiveDetail: '게임에 빠져 과금을 위해 급식비를 유용',
    method: '회계 조작',
    methodDetail: '학생들에게 급식비를 받고도 학교에 납부하지 않고 개인적으로 사용',

    characters: [
      {
        id: 'char-012-1',
        name: '최진영',
        role: 'witness',
        age: 43,
        gender: 'female',
        occupation: '2학년 3반 담임',
        personality: '책임감 있고 학생들을 잘 챙김',
        appearance: '단정한 정장의 중년 여성',
        background: '15년차 교사, 회계에 민감함',
        alibi: {
          location: '교무실',
          time: '업무 시간',
          activity: '수업 및 업무',
          witnesses: ['다른 교사들'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-012-2', type: '사제', description: '총무 학생 담당', isSecret: false }
        ],
        secrets: [],
        dialogues: [
          { topic: '급식비', lines: ['학교에서 납부 안 됐다고 연락 왔어요.', '총무한테 물어봐야겠어요.'], revealsInfo: '미납 확인' },
          { topic: '총무', lines: ['현수가 3개월째 총무예요.', '성실해서 믿었는데...'], revealsInfo: '담당자' }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-012-2',
        name: '강현수',
        role: 'culprit',
        age: 17,
        gender: 'male',
        occupation: '2학년 3반 총무',
        personality: '겉으로는 성실하나 게임에 중독됨',
        appearance: '항상 스마트폰을 보는 남학생',
        background: '게임 과금에 수백만원 사용',
        alibi: {
          location: '교실/자택',
          time: '급식비 수금 시간',
          activity: '급식비 수금',
          witnesses: ['반 학생들'],
          hasHole: false
        },
        motive: {
          type: 'greed',
          description: '게임 과금에 빠져 급식비를 개인 용도로 사용',
          strength: 3
        },
        relationships: [],
        secrets: [
          { id: 'secret-012-1', content: '급식비를 학교에 납부하지 않고 게임 과금에 사용', importance: 'critical', revealCondition: '계좌 내역 또는 게임 기록 확인' }
        ],
        dialogues: [
          { topic: '급식비', lines: ['...납부했는데요?', '확인해보세요.'], revealsInfo: '거짓말' },
          { topic: '게임', lines: ['게임이요? 그냥 가끔...', '과금은 안 해요.'], revealsInfo: '부정', requiresEvidence: ['evidence-012-3'] },
          { topic: '계좌', lines: ['...잘못했어요.', '게임에서 손을 못 뗐어요.'], revealsInfo: '자백', requiresEvidence: ['evidence-012-2'] }
        ],
        nervousTriggers: ['납부', '계좌', '게임', '과금', '영수증']
      },
      {
        id: 'char-012-3',
        name: '박수진',
        role: 'witness',
        age: 17,
        gender: 'female',
        occupation: '2학년 3반 학생',
        personality: '꼼꼼하고 의심이 많음',
        appearance: '진지한 인상의 여학생',
        background: '급식비를 냈는데 미납 통지를 받음',
        alibi: {
          location: '교실',
          time: '급식비 납부 시간',
          activity: '급식비 납부',
          witnesses: ['다른 학생들'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-012-2', type: '같은 반', description: '반 친구', isSecret: false }
        ],
        secrets: [
          { id: 'secret-012-2', content: '급식비를 현금으로 현수에게 줬는데 학교에서 미납이라고 함', importance: 'major', revealCondition: '급식비 납부에 대해 물을 때' }
        ],
        dialogues: [
          { topic: '급식비', lines: ['저 분명 냈어요!', '현수한테 10만원 줬거든요.'], revealsInfo: '납부 확인' },
          { topic: '영수증', lines: ['영수증 달라고 했는데 나중에 준다고...', '아직도 안 줘요.'], revealsInfo: '의혹' }
        ],
        nervousTriggers: []
      }
    ],

    evidence: [
      {
        id: 'evidence-012-1',
        name: '학교 급식비 납부 내역',
        type: 'document',
        description: '2학년 3반 급식비 납부 기록',
        detailedDescription: '최근 3개월간 납부 기록 없음. 총 300만원 미납.',
        location: '행정실',
        foundAt: 'loc-012-2',
        linkedCharacters: [],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-012-2',
        name: '강현수 계좌 내역',
        type: 'document',
        description: '총무 개인 계좌',
        detailedDescription: '학생들에게 받은 급식비 입금 내역은 있으나, 학교 납부 출금 내역 없음. 대신 게임 과금 내역 다수.',
        location: '은행',
        foundAt: 'loc-012-3',
        linkedCharacters: ['char-012-2'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      },
      {
        id: 'evidence-012-3',
        name: '게임 결제 내역',
        type: 'digital',
        description: '강현수 게임 계정',
        detailedDescription: '최근 3개월간 총 280만원 과금. 급식비 횡령 시기와 일치.',
        location: '게임사 서버',
        foundAt: 'loc-012-4',
        linkedCharacters: ['char-012-2'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: true,
        analysisResult: '횡령 금액과 과금 금액 거의 일치'
      },
      {
        id: 'evidence-012-4',
        name: '학생 납부 증언',
        type: 'testimony',
        description: '반 학생들의 증언',
        detailedDescription: '30명의 학생이 모두 급식비를 현수에게 냈다고 증언. 총 300만원.',
        location: '교실',
        foundAt: 'loc-012-1',
        linkedCharacters: ['char-012-2'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-012-5',
        name: '회계 장부',
        type: 'document',
        description: '강현수가 작성한 회계 장부',
        detailedDescription: '학교 납부 완료로 기록되어 있으나 영수증 없음.',
        location: '교실 총무 서랍',
        foundAt: 'loc-012-1',
        linkedCharacters: ['char-012-2'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      }
    ],

    locations: [
      {
        id: 'loc-012-1',
        name: '2학년 3반 교실',
        description: '학생들의 교실',
        atmosphere: '책상과 의자가 줄지어 있다',
        objects: [
          { id: 'obj-1', name: '총무 서랍', description: '회계 서류 보관', examinationResult: '회계 장부 확인', containsEvidence: 'evidence-012-5' },
          { id: 'obj-2', name: '학생 증언', description: '납부 확인', examinationResult: '모두 납부했다고 증언', containsEvidence: 'evidence-012-4' }
        ],
        connectedTo: ['loc-012-2']
      },
      {
        id: 'loc-012-2',
        name: '행정실',
        description: '학교 회계 관리 부서',
        atmosphere: '서류와 컴퓨터가 있다',
        objects: [
          { id: 'obj-3', name: '급식비 납부 기록', description: '반별 납부 내역', examinationResult: '2-3반 미납 확인', containsEvidence: 'evidence-012-1' }
        ],
        connectedTo: ['loc-012-1']
      },
      {
        id: 'loc-012-3',
        name: '은행',
        description: '계좌 조회',
        atmosphere: '금융 기록',
        objects: [
          { id: 'obj-4', name: '계좌 내역', description: '강현수 계좌', examinationResult: '게임 과금 다수', containsEvidence: 'evidence-012-2' }
        ],
        connectedTo: []
      },
      {
        id: 'loc-012-4',
        name: '게임사 서버',
        description: '게임 결제 기록',
        atmosphere: '온라인',
        objects: [
          { id: 'obj-5', name: '결제 내역', description: '과금 기록', examinationResult: '280만원 과금', containsEvidence: 'evidence-012-3' }
        ],
        connectedTo: []
      }
    ],

    timeline: [
      { time: '3개월 전', event: '강현수 총무 임명', participants: ['char-012-1', 'char-012-2'], location: 'loc-012-1', importance: 'minor', isRevealed: true },
      { time: '3개월간', event: '급식비 수금 및 횡령', participants: ['char-012-2'], location: 'loc-012-1', importance: 'critical', isRevealed: false },
      { time: '3개월간', event: '게임 과금 280만원', participants: ['char-012-2'], location: 'loc-012-4', importance: 'critical', isRevealed: false },
      { time: '현재', event: '학교에서 미납 통지', participants: ['char-012-1'], location: 'loc-012-2', importance: 'critical', isRevealed: true }
    ],

    solution: {
      summary: '강현수가 총무로서 받은 급식비 300만원을 학교에 납부하지 않고 게임 과금에 사용했다.',
      detailedExplanation: [
        '강현수는 게임에 중독되어 있었다.',
        '총무로 임명되어 급식비를 관리하게 됨.',
        '학생들에게 급식비를 받았으나 학교에 납부하지 않음.',
        '3개월간 총 300만원을 횡령하여 게임 과금에 사용.',
        '학교 납부 기록 부재, 계좌 내역, 게임 과금 기록이 결정적 증거.'
      ],
      keyEvidence: ['evidence-012-1', 'evidence-012-2', 'evidence-012-3', 'evidence-012-4'],
      howToSolve: [
        '학교 급식비 납부 기록을 확인한다',
        '학생들이 실제 납부했는지 증언을 받는다',
        '총무 계좌 내역을 조회한다',
        '게임 과금 내역을 확인한다',
        '횡령 금액과 과금 금액을 비교한다'
      ],
      commonMistakes: [
        '학교 행정 실수로 오해함',
        '총무가 잊어버린 것으로 생각함'
      ]
    },

    deductionKeywords: {
      who: ['강현수', '총무'],
      why: ['게임', '과금', '중독'],
      how: ['횡령', '미납부', '회계 조작'],
      when: ['3개월간'],
      where: ['교실', '계좌']
    },

    tags: ['급식비', '횡령', '게임 중독', '총무'],
    author: 'DEDUCTIO',
    version: '1.0'
  },

  // ============ FRAUD-013: 학교 행사 티켓 사기 ============
  {
    id: 'fraud-013',
    title: '학교 행사 티켓 사기',
    subtitle: '가짜 축제 티켓',
    type: 'fraud',
    difficulty: 'easy',
    estimatedTime: 20,

    prologue: [
      '학교 축제 입장권 판매.',
      '그러나 티켓은 위조였다.',
      '학생들을 속인 사기.'
    ],
    introduction: [
      '한빛고 축제 D-3.',
      '온라인으로 입장권을 판다는 학생이 나타났다.',
      '여러 학생이 구매했으나 티켓은 가짜였다.'
    ],
    setting: '한빛고등학교 축제 준비 기간',

    crimeTime: '1주일간',
    crimeLocation: '온라인/학교',
    culpritId: 'char-013-2',
    victimId: 'char-013-1',
    motive: '용돈 벌이',
    motiveDetail: '학교 축제는 무료인데 유료인 것처럼 속여 입장권을 판매',
    method: '위조 티켓 판매',
    methodDetail: '학교 로고를 도용하여 가짜 티켓을 만들어 판매',

    characters: [
      {
        id: 'char-013-1',
        name: '윤지우',
        role: 'victim',
        age: 15,
        gender: 'male',
        occupation: '1학년 학생',
        personality: '축제를 기대하던 순수한 학생',
        appearance: '밝은 인상의 남학생',
        background: '타지역 출신이라 학교 사정을 잘 모름',
        alibi: {
          location: '자택',
          time: '티켓 구매 시간',
          activity: '온라인 구매',
          witnesses: [],
          hasHole: false
        },
        relationships: [],
        secrets: [],
        dialogues: [
          { topic: '티켓', lines: ['입장권 샀는데 가짜래요...', '5천원 날렸어요.'], revealsInfo: '피해 상황' },
          { topic: '판매자', lines: ['"축제왕"이라는 닉네임이었어요.', '학생회라고 했어요.'], revealsInfo: '판매자 정보' }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-013-2',
        name: '한태민',
        role: 'culprit',
        age: 17,
        gender: 'male',
        occupation: '2학년 학생',
        personality: '영리하지만 도덕성 부족',
        appearance: '말이 많은 사교적인 남학생',
        background: '용돈이 부족해서 사기 시도',
        alibi: {
          location: '학교/자택',
          time: '티켓 판매 기간',
          activity: '온라인 활동',
          witnesses: [],
          hasHole: false
        },
        motive: {
          type: 'greed',
          description: '학교 축제가 무료인 것을 이용해 가짜 입장권을 만들어 판매',
          strength: 2
        },
        relationships: [],
        secrets: [
          { id: 'secret-013-1', content: '집에서 프린터로 가짜 티켓을 제작하여 판매', importance: 'critical', revealCondition: '티켓 감정 또는 집 수색' }
        ],
        dialogues: [
          { topic: '축제왕', lines: ['...그게 저예요.', '장난이었어요.'], revealsInfo: '인정', requiresEvidence: ['evidence-013-3'] },
          { topic: '티켓', lines: ['...잘못했어요.', '돈 돌려드릴게요.'], revealsInfo: '자백', requiresEvidence: ['evidence-013-2'] }
        ],
        nervousTriggers: ['축제왕', '프린터', '위조', '학생회', '무료']
      },
      {
        id: 'char-013-3',
        name: '김민재',
        role: 'witness',
        age: 18,
        gender: 'male',
        occupation: '학생회장',
        personality: '책임감 있고 정의로움',
        appearance: '학생회 배지를 단 남학생',
        background: '축제 주최자, 사기 파악',
        alibi: {
          location: '학생회실',
          time: '축제 준비',
          activity: '준비 회의',
          witnesses: ['학생회원들'],
          hasHole: false
        },
        relationships: [],
        secrets: [
          { id: 'secret-013-2', content: '학교 축제는 원래 무료이며 입장권이 필요 없음', importance: 'critical', revealCondition: '축제 정보 확인' }
        ],
        dialogues: [
          { topic: '축제', lines: ['우리 축제는 무료예요.', '입장권 같은 거 없어요!'], revealsInfo: '무료 행사' },
          { topic: '티켓', lines: ['누가 가짜로 만들어 판 거예요.', '학생회 이름도 함부로 쓰고...'], revealsInfo: '사기 확인' }
        ],
        nervousTriggers: []
      }
    ],

    evidence: [
      {
        id: 'evidence-013-1',
        name: '가짜 티켓',
        type: 'physical',
        description: '피해자들이 산 입장권',
        detailedDescription: '학교 로고와 "한빛고 축제 입장권"이라는 문구. 집에서 프린터로 출력한 것.',
        location: '피해자들',
        foundAt: 'loc-013-1',
        linkedCharacters: ['char-013-2'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: true,
        analysisResult: '일반 프린터 출력물, 정식 티켓 아님'
      },
      {
        id: 'evidence-013-2',
        name: '판매 계좌',
        type: 'document',
        description: '티켓 대금 입금 계좌',
        detailedDescription: '예금주 "한태민". 1주일간 15명에게 총 7만5천원 받음.',
        location: '은행',
        foundAt: 'loc-013-3',
        linkedCharacters: ['char-013-2'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-013-3',
        name: '온라인 판매 글',
        type: 'digital',
        description: '학교 커뮤니티 판매 글',
        detailedDescription: '"축제왕"이 올린 글. "학생회에서 판매. 선착순 한정." IP는 한태민 집.',
        location: '온라인',
        foundAt: 'loc-013-2',
        linkedCharacters: ['char-013-2'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: true,
        analysisResult: 'IP 주소 추적 결과 한태민 집'
      },
      {
        id: 'evidence-013-4',
        name: '학생회 공지',
        type: 'document',
        description: '학생회 공식 공지',
        detailedDescription: '"축제는 무료입니다. 입장권을 판매하는 행위는 사기이니 주의하세요."',
        location: '학교 게시판',
        foundAt: 'loc-013-4',
        linkedCharacters: ['char-013-3'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-013-5',
        name: '프린터 출력물',
        type: 'physical',
        description: '한태민 집에서 발견된 티켓 원본',
        detailedDescription: '가짜 티켓과 동일한 디자인. 컴퓨터 파일과 프린터 잉크 잔량 확인.',
        location: '한태민 자택',
        foundAt: 'loc-013-5',
        linkedCharacters: ['char-013-2'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      }
    ],

    locations: [
      {
        id: 'loc-013-1',
        name: '학교',
        description: '피해자들이 모인 곳',
        atmosphere: '축제 준비 중',
        objects: [
          { id: 'obj-1', name: '가짜 티켓', description: '피해자들이 산 티켓', examinationResult: '프린터 출력물', containsEvidence: 'evidence-013-1' }
        ],
        connectedTo: ['loc-013-4']
      },
      {
        id: 'loc-013-2',
        name: '온라인 커뮤니티',
        description: '티켓 판매 장소',
        atmosphere: '온라인 공간',
        objects: [
          { id: 'obj-2', name: '판매 글', description: '축제왕의 글', examinationResult: 'IP 추적', containsEvidence: 'evidence-013-3' }
        ],
        connectedTo: []
      },
      {
        id: 'loc-013-3',
        name: '은행',
        description: '계좌 조회',
        atmosphere: '금융 기록',
        objects: [
          { id: 'obj-3', name: '계좌 내역', description: '한태민 계좌', examinationResult: '7만5천원 입금', containsEvidence: 'evidence-013-2' }
        ],
        connectedTo: []
      },
      {
        id: 'loc-013-4',
        name: '학교 게시판/학생회실',
        description: '학생회 공간',
        atmosphere: '축제 준비 중',
        objects: [
          { id: 'obj-4', name: '공지문', description: '무료 축제 안내', examinationResult: '입장권 필요 없음', containsEvidence: 'evidence-013-4' }
        ],
        connectedTo: ['loc-013-1']
      },
      {
        id: 'loc-013-5',
        name: '한태민 자택',
        description: '범인의 집',
        atmosphere: '프린터와 컴퓨터',
        objects: [
          { id: 'obj-5', name: '프린터', description: '티켓 출력 프린터', examinationResult: '티켓 원본 발견', containsEvidence: 'evidence-013-5' }
        ],
        connectedTo: []
      }
    ],

    timeline: [
      { time: '1주 전', event: '축제왕 계정으로 판매 글 게시', participants: ['char-013-2'], location: 'loc-013-2', importance: 'critical', isRevealed: true },
      { time: '1주간', event: '15명에게 티켓 판매', participants: ['char-013-2'], location: 'loc-013-2', importance: 'critical', isRevealed: false },
      { time: '축제 2일 전', event: '학생회 무료 축제 공지', participants: ['char-013-3'], location: 'loc-013-4', importance: 'major', isRevealed: true },
      { time: '축제 1일 전', event: '가짜 티켓 판명, 피해자들 신고', participants: ['char-013-1'], location: 'loc-013-1', importance: 'critical', isRevealed: true }
    ],

    solution: {
      summary: '한태민이 무료인 학교 축제를 유료로 속이고 가짜 입장권을 만들어 판매하는 사기를 쳤다.',
      detailedExplanation: [
        '한태민은 용돈이 필요했다.',
        '학교 축제가 무료인 것을 이용하기로 결심.',
        '집 프린터로 가짜 입장권을 제작.',
        '학생회 이름을 사칭하여 온라인에서 판매.',
        '1주일간 15명에게 총 7만5천원을 벌어들임.',
        '티켓 감정, 계좌 추적, IP 주소가 결정적 증거.'
      ],
      keyEvidence: ['evidence-013-1', 'evidence-013-2', 'evidence-013-3', 'evidence-013-4', 'evidence-013-5'],
      howToSolve: [
        '티켓이 정식인지 학생회에 확인한다',
        '축제가 유료인지 확인한다',
        '판매자 계좌를 추적한다',
        'IP 주소로 판매자를 특정한다',
        '집에서 티켓 제작 증거를 찾는다'
      ],
      commonMistakes: [
        '학생회가 정말 판매한다고 믿음',
        '정식 티켓으로 착각함'
      ]
    },

    deductionKeywords: {
      who: ['한태민', '축제왕'],
      why: ['용돈', '돈'],
      how: ['위조', '프린터', '사칭'],
      when: ['1주일간', '축제 전'],
      where: ['온라인', '자택']
    },

    tags: ['축제', '티켓', '위조', '사기'],
    author: 'DEDUCTIO',
    version: '1.0'
  },

  // ============ FRAUD-014: 가짜 교사 사칭 ============
  {
    id: 'fraud-014',
    title: '가짜 교사 사칭',
    subtitle: '위장한 범죄자',
    type: 'fraud',
    difficulty: 'hard',
    estimatedTime: 30,

    prologue: [
      '새로 온 실습 교사.',
      '그러나 그는 교사가 아니었다.',
      '학교에 침투한 사기꾼.'
    ],
    introduction: [
      '한빛고등학교.',
      '"김준혁" 교생 실습생이 2주간 학교에서 활동했다.',
      '그러나 대학에 문의한 결과 그런 학생은 존재하지 않았다.'
    ],
    setting: '한빛고등학교',

    crimeTime: '2주간',
    crimeLocation: '학교 전체',
    culpritId: 'char-014-1',
    victimId: undefined,
    motive: '개인정보 탈취',
    motiveDetail: '교사로 위장하여 학생 개인정보를 수집해 판매하려 함',
    method: '신분 위조',
    methodDetail: '가짜 교생증과 서류를 만들어 학교에 침투',

    characters: [
      {
        id: 'char-014-1',
        name: '김준혁 (가명)',
        role: 'culprit',
        age: 28,
        gender: 'male',
        occupation: '사기꾼 (교생 사칭)',
        personality: '영리하고 연기력이 뛰어남',
        appearance: '단정한 정장, 안경, 교사 같은 분위기',
        background: '개인정보 브로커, 여러 학교를 돌며 사기',
        alibi: {
          location: '학교',
          time: '근무 시간',
          activity: '교생 활동',
          witnesses: ['교사들, 학생들'],
          hasHole: false
        },
        motive: {
          type: 'greed',
          description: '학생 개인정보를 수집하여 불법 판매하려 함',
          strength: 3
        },
        relationships: [],
        secrets: [
          { id: 'secret-014-1', content: '실제로는 교생이 아니며 대학에 등록된 적 없음', importance: 'critical', revealCondition: '대학 확인' },
          { id: 'secret-014-2', content: 'USB에 학생 300명의 개인정보 저장', importance: 'critical', revealCondition: 'USB 확보' }
        ],
        dialogues: [
          { topic: '교생', lines: ['서울대 교육학과에서 왔습니다.', '교생 실습 열심히 하겠습니다.'], revealsInfo: '거짓 신분' },
          { topic: '개인정보', lines: ['학생 관리를 위해 명단이 필요해요.', '담임 선생님께 부탁드려도 될까요?'], revealsInfo: '정보 수집 시도' },
          { topic: '대학', lines: ['...확인하셨어요?', '그건... 오해예요.'], revealsInfo: '당황', requiresEvidence: ['evidence-014-1'] }
        ],
        nervousTriggers: ['대학', '확인', '신분증', '교생증', '개인정보']
      },
      {
        id: 'char-014-2',
        name: '이상훈',
        role: 'witness',
        age: 50,
        gender: 'male',
        occupation: '교감',
        personality: '경험이 많고 의심이 많음',
        appearance: '근엄한 인상의 중년 남성',
        background: '30년차 교사, 뭔가 이상함을 느낌',
        alibi: {
          location: '교감실',
          time: '근무 시간',
          activity: '행정 업무',
          witnesses: ['교직원들'],
          hasHole: false
        },
        relationships: [],
        secrets: [
          { id: 'secret-014-3', content: '김준혁의 행동이 수상해서 대학에 확인 전화를 했음', importance: 'critical', revealCondition: '의심 사유 질문' }
        ],
        dialogues: [
          { topic: '김준혁', lines: ['뭔가 이상해요.', '교생치고는 너무 학생 정보에 관심이 많아요.'], revealsInfo: '의심' },
          { topic: '대학 확인', lines: ['서울대에 전화했더니...', '김준혁이라는 교생 실습생은 없대요!'], revealsInfo: '신분 허위' }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-014-3',
        name: '박지민',
        role: 'witness',
        age: 17,
        gender: 'female',
        occupation: '2학년 학생',
        personality: '관찰력이 좋음',
        appearance: '똑똑해 보이는 여학생',
        background: '김준혁이 이상한 질문을 많이 하는 것을 눈치챔',
        alibi: {
          location: '교실',
          time: '수업 시간',
          activity: '수업',
          witnesses: ['다른 학생들'],
          hasHole: false
        },
        relationships: [],
        secrets: [
          { id: 'secret-014-4', content: '김준혁이 학생들 핸드폰 번호와 주소를 물어봤음', importance: 'major', revealCondition: '김준혁 행동에 대해 물을 때' }
        ],
        dialogues: [
          { topic: '김준혁', lines: ['저한테 핸드폰 번호 물어봤어요.', '주소도 물어보고... 이상하지 않아요?'], revealsInfo: '수상한 행동' },
          { topic: 'USB', lines: ['USB 항상 들고 다니더라고요.', '뭘 그렇게 열심히 적는지...'], revealsInfo: '정보 수집' }
        ],
        nervousTriggers: []
      }
    ],

    evidence: [
      {
        id: 'evidence-014-1',
        name: '대학 확인 결과',
        type: 'document',
        description: '서울대 교육학과 회신',
        detailedDescription: '"김준혁"이라는 이름의 교생 실습생은 등록되지 않았음. 해당 학기 실습생 명단에도 없음.',
        location: '교감실',
        foundAt: 'loc-014-1',
        linkedCharacters: ['char-014-1'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-014-2',
        name: '위조 교생증',
        type: 'physical',
        description: '김준혁의 교생증',
        detailedDescription: '대학 로고와 사진이 있으나 홀로그램이 없고 종이 질감이 이상함. 위조로 판명.',
        location: '김준혁 소지품',
        foundAt: 'loc-014-2',
        linkedCharacters: ['char-014-1'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: true,
        analysisResult: '정품 교생증과 다름, 위조품'
      },
      {
        id: 'evidence-014-3',
        name: 'USB 개인정보',
        type: 'digital',
        description: '김준혁의 USB',
        detailedDescription: '학생 300명의 이름, 생년월일, 주소, 핸드폰 번호가 저장되어 있음.',
        location: '김준혁 가방',
        foundAt: 'loc-014-2',
        linkedCharacters: ['char-014-1'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      },
      {
        id: 'evidence-014-4',
        name: '다크웹 거래 기록',
        type: 'digital',
        description: '김준혁 노트북',
        detailedDescription: '개인정보 판매 사이트 접속 기록. "학생 DB 300건 판매 준비 중"이라는 글.',
        location: '김준혁 노트북',
        foundAt: 'loc-014-2',
        linkedCharacters: ['char-014-1'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      },
      {
        id: 'evidence-014-5',
        name: '이전 학교 사기 기록',
        type: 'document',
        description: '경찰 조회 결과',
        detailedDescription: '동일 수법으로 3개 학교에서 사기. 실명은 "이동진". 개인정보 판매 전과.',
        location: '경찰서',
        foundAt: 'loc-014-3',
        linkedCharacters: ['char-014-1'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      }
    ],

    locations: [
      {
        id: 'loc-014-1',
        name: '교감실',
        description: '교감 선생님의 사무실',
        atmosphere: '근엄한 분위기',
        objects: [
          { id: 'obj-1', name: '대학 회신 문서', description: '확인 결과', examinationResult: '김준혁 실습생 없음', containsEvidence: 'evidence-014-1' }
        ],
        connectedTo: ['loc-014-2']
      },
      {
        id: 'loc-014-2',
        name: '교생 숙소/가방',
        description: '김준혁이 머물던 곳',
        atmosphere: '의심스러운 물품들',
        objects: [
          { id: 'obj-2', name: '교생증', description: '신분증', examinationResult: '위조품', containsEvidence: 'evidence-014-2' },
          { id: 'obj-3', name: 'USB', description: '개인정보 저장', examinationResult: '학생 300명 정보', containsEvidence: 'evidence-014-3' },
          { id: 'obj-4', name: '노트북', description: '개인 노트북', examinationResult: '다크웹 거래 기록', containsEvidence: 'evidence-014-4' }
        ],
        connectedTo: ['loc-014-1']
      },
      {
        id: 'loc-014-3',
        name: '경찰서',
        description: '경찰 조회',
        atmosphere: '수사 기관',
        objects: [
          { id: 'obj-5', name: '전과 기록', description: '범죄 이력', examinationResult: '동일 수법 3건', containsEvidence: 'evidence-014-5' }
        ],
        connectedTo: []
      }
    ],

    timeline: [
      { time: '2주 전', event: '"김준혁" 교생 실습 시작', participants: ['char-014-1'], location: 'loc-014-1', importance: 'critical', isRevealed: true },
      { time: '2주간', event: '학생 개인정보 수집', participants: ['char-014-1'], location: '학교', importance: 'critical', isRevealed: false },
      { time: '1주 전', event: '교감 의심 시작', participants: ['char-014-2'], location: 'loc-014-1', importance: 'major', isRevealed: false },
      { time: '3일 전', event: '대학에 확인 전화', participants: ['char-014-2'], location: 'loc-014-1', importance: 'critical', isRevealed: false },
      { time: '현재', event: '신분 허위 발각, 경찰 신고', participants: ['char-014-2'], location: 'loc-014-1', importance: 'critical', isRevealed: true }
    ],

    solution: {
      summary: '"김준혁"은 교생이 아닌 개인정보 브로커로, 위조 신분으로 학교에 침투하여 학생 정보를 수집했다.',
      detailedExplanation: [
        '범인의 실명은 "이동진", 개인정보 판매 전과자.',
        '위조 교생증과 서류로 학교에 침투.',
        '2주간 교생으로 활동하며 학생 300명의 개인정보 수집.',
        'USB에 정보를 저장하고 다크웹에서 판매 준비.',
        '교감의 대학 확인으로 신분 허위가 드러남.',
        '대학 회신, 위조 교생증, USB, 다크웹 기록이 결정적 증거.'
      ],
      keyEvidence: ['evidence-014-1', 'evidence-014-2', 'evidence-014-3', 'evidence-014-4', 'evidence-014-5'],
      howToSolve: [
        '대학에 교생 실습생 명단을 확인한다',
        '교생증을 감정한다',
        '소지품에서 개인정보 수집 증거를 찾는다',
        '노트북과 USB를 확인한다',
        '경찰에 신원 조회를 의뢰한다'
      ],
      commonMistakes: [
        '진짜 교생으로 믿음',
        '단순 실수나 착오로 생각함'
      ]
    },

    deductionKeywords: {
      who: ['김준혁', '이동진', '사기꾼'],
      why: ['개인정보', '판매', '돈'],
      how: ['위조', '사칭', '신분'],
      when: ['2주간'],
      where: ['학교', '교실']
    },

    tags: ['교사 사칭', '신분 위조', '개인정보', '다크웹'],
    author: 'DEDUCTIO',
    version: '1.0'
  },

  // ============ FRAUD-015: 수학여행비 횡령 ============
  {
    id: 'fraud-015',
    title: '수학여행비 횡령',
    subtitle: '사라진 여행 경비',
    type: 'fraud',
    difficulty: 'medium',
    estimatedTime: 25,

    prologue: [
      '기대했던 수학여행.',
      '그러나 여행비가 사라졌다.',
      '담당 교사의 배신.'
    ],
    introduction: [
      '한빛고 2학년 수학여행 D-10.',
      '학년 전체가 낸 수학여행비 5000만원이 사라졌다.',
      '담당 교사의 계좌에서 이상한 출금 내역이 발견되었다.'
    ],
    setting: '한빛고등학교',

    crimeTime: '3개월간',
    crimeLocation: '회계 계좌',
    culpritId: 'char-015-1',
    victimId: undefined,
    motive: '빚 갚기',
    motiveDetail: '개인 빚을 갚기 위해 수학여행비를 횡령',
    method: '회계 조작',
    methodDetail: '수학여행비 계좌에서 개인 계좌로 이체 후 허위 영수증 작성',

    characters: [
      {
        id: 'char-015-1',
        name: '정민수',
        role: 'culprit',
        age: 45,
        gender: 'male',
        occupation: '2학년 부장 교사',
        personality: '겉으로는 성실하나 개인 문제로 고민',
        appearance: '피곤해 보이는 중년 남성',
        background: '사업 실패로 빚 3000만원, 수학여행 담당',
        alibi: {
          location: '학교/은행',
          time: '횡령 기간',
          activity: '회계 업무',
          witnesses: ['교직원들'],
          hasHole: false
        },
        motive: {
          type: 'greed',
          description: '사업 실패로 생긴 3000만원 빚을 갚기 위해 수학여행비 횡령',
          strength: 3
        },
        relationships: [],
        secrets: [
          { id: 'secret-015-1', content: '수학여행비 계좌에서 3000만원을 개인 계좌로 이체', importance: 'critical', revealCondition: '계좌 내역 확인' },
          { id: 'secret-015-2', content: '허위 영수증을 만들어 지출을 정당화하려 함', importance: 'critical', revealCondition: '영수증 감정' }
        ],
        dialogues: [
          { topic: '수학여행비', lines: ['모두 여행사에 납부했습니다.', '영수증도 있어요.'], revealsInfo: '거짓 주장' },
          { topic: '계좌', lines: ['제 개인 계좌요?', '그건... 다른 업무 때문에...'], revealsInfo: '회피', requiresEvidence: ['evidence-015-2'] },
          { topic: '빚', lines: ['...사업이 망해서...', '갚으려고 했어요, 진짜로...'], revealsInfo: '자백', requiresEvidence: ['evidence-015-2', 'evidence-015-4'] }
        ],
        nervousTriggers: ['계좌', '이체', '빚', '사업', '영수증']
      },
      {
        id: 'char-015-2',
        name: '김현아',
        role: 'witness',
        age: 38,
        gender: 'female',
        occupation: '행정실장',
        personality: '꼼꼼하고 원칙적임',
        appearance: '단정한 정장의 여성',
        background: '학교 회계 관리 담당, 이상 징후 발견',
        alibi: {
          location: '행정실',
          time: '근무 시간',
          activity: '회계 감사',
          witnesses: ['행정실 직원들'],
          hasHole: false
        },
        relationships: [],
        secrets: [
          { id: 'secret-015-3', content: '수학여행비 계좌에서 정민수 계좌로 이체 발견', importance: 'critical', revealCondition: '회계 감사 결과' }
        ],
        dialogues: [
          { topic: '수학여행비', lines: ['계좌 확인했는데... 이상해요.', '여행사 납부 기록이 없어요.'], revealsInfo: '미납' },
          { topic: '이체', lines: ['정민수 선생님 개인 계좌로 3000만원이 이체됐어요.', '2주 전에요.'], revealsInfo: '횡령 증거' }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-015-3',
        name: '박수현',
        role: 'witness',
        age: 17,
        gender: 'female',
        occupation: '2학년 학생회 총무',
        personality: '책임감 있고 걱정이 많음',
        appearance: '진지한 인상의 여학생',
        background: '수학여행 준비 위원, 여행 취소 위기를 걱정',
        alibi: {
          location: '학교',
          time: '방과 후',
          activity: '학생회 활동',
          witnesses: ['학생회원들'],
          hasHole: false
        },
        relationships: [],
        secrets: [],
        dialogues: [
          { topic: '수학여행', lines: ['여행사에서 입금 안 됐다고 연락 왔어요.', '취소될 수도 있대요...'], revealsInfo: '위기 상황' },
          { topic: '정민수', lines: ['선생님이 분명 납부했다고 하셨는데...', '이해가 안 가요.'], revealsInfo: '의문' }
        ],
        nervousTriggers: []
      }
    ],

    evidence: [
      {
        id: 'evidence-015-1',
        name: '수학여행비 계좌 내역',
        type: 'document',
        description: '학년 수학여행비 계좌',
        detailedDescription: '학생 500명이 각 10만원씩 납부. 총 5000만원 입금. 그러나 여행사로 나간 돈은 2000만원뿐.',
        location: '은행',
        foundAt: 'loc-015-2',
        linkedCharacters: [],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-015-2',
        name: '정민수 개인 계좌 이체 내역',
        type: 'document',
        description: '정민수 계좌',
        detailedDescription: '2주 전 수학여행비 계좌에서 3000만원 이체 받음. 같은 날 대부업체에 3000만원 상환.',
        location: '은행',
        foundAt: 'loc-015-2',
        linkedCharacters: ['char-015-1'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      },
      {
        id: 'evidence-015-3',
        name: '위조 영수증',
        type: 'document',
        description: '여행사 영수증',
        detailedDescription: '5000만원 납부 영수증이나 여행사에 확인 결과 2000만원만 입금됨. 영수증 위조.',
        location: '행정실',
        foundAt: 'loc-015-1',
        linkedCharacters: ['char-015-1'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: true,
        analysisResult: '영수증 날짜와 도장이 조작됨'
      },
      {
        id: 'evidence-015-4',
        name: '대부업체 거래 기록',
        type: 'document',
        description: '정민수 빚 상환 기록',
        detailedDescription: '2주 전 3000만원 일시 상환. 출처는 본인 계좌.',
        location: '대부업체',
        foundAt: 'loc-015-3',
        linkedCharacters: ['char-015-1'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      },
      {
        id: 'evidence-015-5',
        name: '여행사 확인서',
        type: 'document',
        description: '여행사 공식 문서',
        detailedDescription: '"2000만원만 입금되었으며 나머지 3000만원 미납. 여행 진행 불가." ',
        location: '여행사',
        foundAt: 'loc-015-4',
        linkedCharacters: [],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      }
    ],

    locations: [
      {
        id: 'loc-015-1',
        name: '행정실',
        description: '학교 회계 관리 부서',
        atmosphere: '서류와 컴퓨터',
        objects: [
          { id: 'obj-1', name: '영수증', description: '여행사 영수증', examinationResult: '위조 판명', containsEvidence: 'evidence-015-3' }
        ],
        connectedTo: ['loc-015-2']
      },
      {
        id: 'loc-015-2',
        name: '은행',
        description: '계좌 조회',
        atmosphere: '금융 기록',
        objects: [
          { id: 'obj-2', name: '수학여행비 계좌', description: '학년 계좌', examinationResult: '3000만원 부족', containsEvidence: 'evidence-015-1' },
          { id: 'obj-3', name: '정민수 계좌', description: '개인 계좌', examinationResult: '3000만원 이체 및 상환', containsEvidence: 'evidence-015-2' }
        ],
        connectedTo: ['loc-015-1']
      },
      {
        id: 'loc-015-3',
        name: '대부업체',
        description: '정민수 채무처',
        atmosphere: '금융 기록',
        objects: [
          { id: 'obj-4', name: '상환 기록', description: '빚 상환', examinationResult: '3000만원 상환', containsEvidence: 'evidence-015-4' }
        ],
        connectedTo: []
      },
      {
        id: 'loc-015-4',
        name: '여행사',
        description: '수학여행 대행사',
        atmosphere: '여행 업체',
        objects: [
          { id: 'obj-5', name: '확인서', description: '입금 확인', examinationResult: '2000만원만 입금', containsEvidence: 'evidence-015-5' }
        ],
        connectedTo: []
      }
    ],

    timeline: [
      { time: '3개월 전', event: '정민수 수학여행 담당 임명', participants: ['char-015-1'], location: '학교', importance: 'minor', isRevealed: true },
      { time: '3개월간', event: '학생들 수학여행비 납부 (총 5000만원)', participants: ['학생들'], location: 'loc-015-2', importance: 'major', isRevealed: true },
      { time: '2주 전', event: '정민수 개인 계좌로 3000만원 이체', participants: ['char-015-1'], location: 'loc-015-2', importance: 'critical', isRevealed: false },
      { time: '2주 전', event: '대부업체에 3000만원 상환', participants: ['char-015-1'], location: 'loc-015-3', importance: 'critical', isRevealed: false },
      { time: '1주 전', event: '여행사 2000만원만 입금 확인', participants: ['여행사'], location: 'loc-015-4', importance: 'critical', isRevealed: true },
      { time: '현재', event: '행정실 회계 감사로 횡령 발각', participants: ['char-015-2'], location: 'loc-015-1', importance: 'critical', isRevealed: true }
    ],

    solution: {
      summary: '정민수 교사가 사업 실패로 생긴 빚을 갚기 위해 수학여행비 3000만원을 횡령했다.',
      detailedExplanation: [
        '정민수는 사업 실패로 3000만원 빚이 있었다.',
        '수학여행 담당을 맡게 되면서 유혹에 빠짐.',
        '학생들이 낸 5000만원 중 2000만원만 여행사에 납부.',
        '나머지 3000만원을 개인 계좌로 이체하여 빚 상환.',
        '위조 영수증으로 정상 납부한 것처럼 위장.',
        '계좌 이체 내역, 대부업체 상환 기록이 결정적 증거.'
      ],
      keyEvidence: ['evidence-015-1', 'evidence-015-2', 'evidence-015-3', 'evidence-015-4', 'evidence-015-5'],
      howToSolve: [
        '수학여행비 계좌 잔액을 확인한다',
        '여행사에 실제 입금액을 확인한다',
        '정민수 개인 계좌 이체 내역을 조회한다',
        '영수증을 감정한다',
        '빚 상환 기록을 확인한다'
      ],
      commonMistakes: [
        '회계 실수로 생각함',
        '여행사 문제로 오해함'
      ]
    },

    deductionKeywords: {
      who: ['정민수', '교사', '담당'],
      why: ['빚', '사업 실패', '상환'],
      how: ['횡령', '이체', '위조 영수증'],
      when: ['2주 전', '3개월간'],
      where: ['계좌', '은행']
    },

    tags: ['수학여행', '횡령', '교사', '빚'],
    author: 'DEDUCTIO',
    version: '1.0'
  }
];

export default fraudScenariosPart2;
