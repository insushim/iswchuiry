// ========================================
// 도난 시나리오 Part 4 (16-20)
// ========================================

import { Scenario } from './types';

export const theftScenariosPart4: Scenario[] = [
  // ============ THEFT-016: 체육 창고의 스포츠 용품 ============
  {
    id: 'theft-016',
    title: '체육 창고의 스포츠 용품',
    subtitle: '사라진 고가 운동화',
    type: 'theft',
    difficulty: 'easy',
    estimatedTime: 20,

    prologue: [
      '체육 창고에서 고가의 운동화가 사라졌다.',
      '농구부 선수들의 전용 신발.',
      '누가 이 귀한 장비를 훔쳤는가.'
    ],
    introduction: [
      '한빛고등학교 체육 창고.',
      '농구부 전용으로 구입한 고가의 운동화 5켤레가 사라졌다.',
      '체육 창고는 체육 선생님만 열쇠를 가지고 있었다.'
    ],
    setting: '한빛고등학교 체육 창고',

    crimeTime: '19:00',
    crimeLocation: '체육 창고',
    culpritId: 'char-016-3',
    victimId: undefined,
    motive: '판매 목적',
    motiveDetail: '중고 거래 사이트에 팔아 용돈을 벌려고 함',
    method: '체육 시간 후 절도',
    methodDetail: '체육 시간 후 창고 정리를 핑계로 남아 운동화를 챙김',

    characters: [
      {
        id: 'char-016-1',
        name: '김동훈',
        role: 'witness',
        age: 40,
        gender: 'male',
        occupation: '체육 교사',
        personality: '활동적이고 학생들과 친함',
        appearance: '운동복을 입은 근육질 남성',
        background: '전직 농구 선수 출신, 10년째 체육 교사',
        alibi: {
          location: '교무실',
          time: '18:30-20:00',
          activity: '회의',
          witnesses: ['다른 교사들'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-016-3', type: '사제', description: '농구부원', isSecret: false }
        ],
        secrets: [],
        dialogues: [
          { topic: '운동화', lines: ['한 켤레에 30만원씩 하는 농구화예요.', '대회용으로 새로 산 건데...'], revealsInfo: '운동화 가치' },
          { topic: '창고', lines: ['열쇠는 제가 관리해요.', '체육 시간 후엔 농구부원들이 정리하죠.'], revealsInfo: '접근 가능자' }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-016-2',
        name: '박준혁',
        role: 'witness',
        age: 18,
        gender: 'male',
        occupation: '농구부 주장',
        personality: '책임감 있고 리더십이 강함',
        appearance: '키가 큰 건장한 남학생',
        background: '농구부 주장, 대학 스카웃 대상',
        alibi: {
          location: '체육관',
          time: '17:00-19:00',
          activity: '농구 연습',
          witnesses: ['농구부원들'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-016-3', type: '농구부 동료', description: '같은 부원', isSecret: false }
        ],
        secrets: [
          { id: 'secret-016-1', content: '민수가 중고 거래를 자주 한다는 것을 알고 있음', importance: 'major', revealCondition: '민수에 대해 물을 때' }
        ],
        dialogues: [
          { topic: '운동화', lines: ['그 운동화 정말 좋았는데...', '대회에 꼭 필요했어요.'], revealsInfo: '피해 심각성' },
          { topic: '최민수', lines: ['민수요? 요즘 돈이 필요하다고 했어요.', '중고 거래 앱을 자주 보더라고요.'], revealsInfo: '동기 암시' }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-016-3',
        name: '최민수',
        role: 'culprit',
        age: 17,
        gender: 'male',
        occupation: '농구부 부원',
        personality: '욕심이 많고 충동적임',
        appearance: '항상 핸드폰을 보는 남학생',
        background: '가정 형편이 어려워 용돈이 부족함',
        alibi: {
          location: '체육 창고',
          time: '18:30-19:30',
          activity: '창고 정리',
          witnesses: ['없음 (혼자)'],
          hasHole: true,
          holeDetail: '혼자 창고에 남아있었음'
        },
        motive: {
          type: 'greed',
          description: '고가의 운동화를 중고로 팔아 용돈을 벌려고 함',
          strength: 2
        },
        relationships: [],
        secrets: [
          { id: 'secret-016-2', content: '중고 거래 앱에 운동화를 올려 판매 시도', importance: 'critical', revealCondition: '중고 거래 앱 확인' }
        ],
        dialogues: [
          { topic: '운동화', lines: ['저요? 저도 피해자예요.', '제 운동화도 없어졌다고요.'], revealsInfo: '자작극' },
          { topic: '중고거래', lines: ['...그냥 필요 없는 거 파는 거예요.', '운동화는 아니에요.'], revealsInfo: '회피' },
          { topic: '창고', lines: ['정리하고 나왔어요.', '...아무것도 안 봤는데요.'], revealsInfo: '부정' }
        ],
        nervousTriggers: ['중고', '판매', '앱', '돈', '혼자']
      }
    ],

    evidence: [
      {
        id: 'evidence-016-1',
        name: '빈 운동화 박스',
        type: 'physical',
        description: '운동화가 있던 박스',
        detailedDescription: '5켤레의 운동화가 들어있던 박스가 비어있음.',
        location: '체육 창고',
        foundAt: 'loc-016-1',
        linkedCharacters: [],
        isCritical: false,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-016-2',
        name: '체육관 CCTV',
        type: 'digital',
        description: '체육관 입구 CCTV 영상',
        detailedDescription: '19:15에 최민수가 큰 가방을 들고 나가는 모습. 들어갈 때보다 가방이 불룩함.',
        location: '보안실',
        foundAt: 'loc-016-3',
        linkedCharacters: ['char-016-3'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-016-3',
        name: '중고 거래 게시글',
        type: 'digital',
        description: '중고 거래 앱의 판매 게시글',
        detailedDescription: '"새 농구화 팝니다. 한 번도 안 신음. 25만원" 학교 운동화와 동일한 모델. 판매자는 "민수123".',
        location: '인터넷',
        foundAt: 'loc-016-4',
        linkedCharacters: ['char-016-3'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: true,
        analysisResult: '학교 운동화와 동일 모델, 판매자 닉네임이 최민수 암시'
      },
      {
        id: 'evidence-016-4',
        name: '최민수 집에서 발견된 운동화',
        type: 'physical',
        description: '최민수 방에 있던 운동화',
        detailedDescription: '학교 농구부 운동화 3켤레. 박스에 학교 구매 스티커가 붙어있음.',
        location: '최민수 자택',
        foundAt: 'loc-016-2',
        linkedCharacters: ['char-016-3'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      },
      {
        id: 'evidence-016-5',
        name: '판매 대화 기록',
        type: 'digital',
        description: '중고 거래 앱 채팅',
        detailedDescription: '구매자와의 대화. "2켤레는 이미 팔렸어요. 3켤레 남았습니다."',
        location: '최민수 핸드폰',
        foundAt: 'loc-016-2',
        linkedCharacters: ['char-016-3'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      }
    ],

    locations: [
      {
        id: 'loc-016-1',
        name: '체육 창고',
        description: '각종 체육 용품이 보관된 창고',
        atmosphere: '농구공과 매트가 쌓여있다',
        objects: [
          { id: 'obj-1', name: '운동화 박스', description: '비어있는 박스', examinationResult: '운동화 도난 확인', containsEvidence: 'evidence-016-1' }
        ],
        connectedTo: ['loc-016-3']
      },
      {
        id: 'loc-016-2',
        name: '최민수 자택',
        description: '최민수가 거주하는 집',
        atmosphere: '소박한 아파트',
        objects: [
          { id: 'obj-2', name: '운동화', description: '방에 있는 운동화', examinationResult: '학교 구매 스티커 발견', containsEvidence: 'evidence-016-4' }
        ],
        connectedTo: []
      },
      {
        id: 'loc-016-3',
        name: '보안실',
        description: 'CCTV 관제실',
        atmosphere: '모니터가 여러 대 있다',
        objects: [
          { id: 'obj-3', name: 'CCTV', description: '체육관 입구 영상', examinationResult: '민수 퇴실 시 큰 가방', containsEvidence: 'evidence-016-2' }
        ],
        connectedTo: ['loc-016-1']
      },
      {
        id: 'loc-016-4',
        name: '인터넷',
        description: '중고 거래 앱',
        atmosphere: '온라인 공간',
        objects: [
          { id: 'obj-4', name: '판매 게시글', description: '운동화 판매 글', examinationResult: '학교 것과 동일 모델', containsEvidence: 'evidence-016-3' }
        ],
        connectedTo: []
      }
    ],

    timeline: [
      { time: '17:00', event: '농구부 연습 시작', participants: ['char-016-2', 'char-016-3'], location: '체육관', importance: 'minor', isRevealed: true },
      { time: '18:30', event: '연습 종료, 부원들 퇴장', participants: ['char-016-2'], location: '체육관', importance: 'major', isRevealed: true },
      { time: '18:30', event: '최민수 창고에 혼자 남음', participants: ['char-016-3'], location: 'loc-016-1', importance: 'critical', isRevealed: false },
      { time: '19:00', event: '운동화 절취', participants: ['char-016-3'], location: 'loc-016-1', importance: 'critical', isRevealed: false },
      { time: '19:15', event: '최민수 가방 들고 퇴실', participants: ['char-016-3'], location: 'loc-016-1', importance: 'critical', isRevealed: false },
      { time: '다음날', event: '운동화 분실 발견', participants: ['char-016-1'], location: 'loc-016-1', importance: 'critical', isRevealed: true }
    ],

    solution: {
      summary: '최민수가 용돈을 벌기 위해 농구부 운동화를 훔쳐 중고 거래 앱에 판매했다.',
      detailedExplanation: [
        '최민수는 가정 형편이 어려워 용돈이 부족했다.',
        '고가의 농구화를 팔면 돈이 될 것이라 생각.',
        '창고 정리를 핑계로 혼자 남아 운동화를 가방에 넣어 가져감.',
        '중고 거래 앱에 올려 2켤레는 이미 판매, 3켤레는 집에 보관.',
        'CCTV 영상과 중고 거래 게시글이 결정적 증거.'
      ],
      keyEvidence: ['evidence-016-2', 'evidence-016-3', 'evidence-016-4', 'evidence-016-5'],
      howToSolve: [
        'CCTV에서 가방 크기 변화를 확인한다',
        '중고 거래 앱에서 동일 모델 검색',
        '판매자 계정을 추적한다',
        '자택 수색으로 남은 운동화를 발견한다'
      ],
      commonMistakes: [
        '외부인 침입으로 생각함',
        '다른 부원을 의심함'
      ]
    },

    deductionKeywords: {
      who: ['최민수', '농구부'],
      why: ['돈', '용돈', '판매', '형편'],
      how: ['창고 정리', '가방', '혼자'],
      when: ['19:00', '저녁'],
      where: ['체육 창고', '농구부']
    },

    tags: ['체육 창고', '운동화', '중고거래', '농구부'],
    author: 'DEDUCTIO',
    version: '1.0'
  },

  // ============ THEFT-017: 교무실의 개인정보 USB ============
  {
    id: 'theft-017',
    title: '교무실의 개인정보 USB',
    subtitle: '사라진 학생 정보',
    type: 'theft',
    difficulty: 'hard',
    estimatedTime: 35,

    prologue: [
      '학생 전체의 개인정보가 담긴 USB가 사라졌다.',
      '내부자의 소행인가, 외부 침입인가.',
      '정보 유출은 심각한 범죄다.'
    ],
    introduction: [
      '한빛고등학교 교무실.',
      '전교생의 주소, 전화번호, 성적 등이 담긴 USB가 분실되었다.',
      '교무실 금고에 보관 중이었으나 흔적도 없이 사라졌다.'
    ],
    setting: '한빛고등학교 교무실',

    crimeTime: '22:00',
    crimeLocation: '교무실 금고',
    culpritId: 'char-017-4',
    victimId: undefined,
    motive: '범죄 목적',
    motiveDetail: '학생 정보를 보이스피싱 조직에 판매하려 함',
    method: '금고 비밀번호 유출',
    methodDetail: '청소 시간에 몰래 교사가 금고 여는 것을 관찰하여 비밀번호를 알아냄',

    characters: [
      {
        id: 'char-017-1',
        name: '이상희',
        role: 'witness',
        age: 50,
        gender: 'female',
        occupation: '교무부장',
        personality: '철저하고 원칙적임',
        appearance: '정장을 입은 단정한 여성',
        background: '25년차 교사, 개인정보 관리 책임자',
        alibi: {
          location: '자택',
          time: '21:00-',
          activity: '퇴근 후 휴식',
          witnesses: ['가족'],
          hasHole: false
        },
        relationships: [],
        secrets: [
          { id: 'secret-017-1', content: '금고 비밀번호를 최근 변경하지 않음 (규정 위반)', importance: 'major', revealCondition: '금고 관리에 대해 추궁' }
        ],
        dialogues: [
          { topic: 'USB', lines: ['전교생 개인정보가 다 들어있어요.', '유출되면 큰일이에요.'], revealsInfo: 'USB 중요성' },
          { topic: '금고', lines: ['비밀번호는 저만 알아요.', '...사실 6개월째 안 바꿨어요. 규정은 매월인데...'], revealsInfo: '보안 허점' }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-017-2',
        name: '박철수',
        role: 'witness',
        age: 55,
        gender: 'male',
        occupation: '보안 담당 교사',
        personality: '꼼꼼하고 의심이 많음',
        appearance: '근엄한 표정의 중년 남성',
        background: '학교 보안 총괄, CCTV 관리',
        alibi: {
          location: '보안실',
          time: '20:00-23:00',
          activity: 'CCTV 점검',
          witnesses: ['CCTV 기록'],
          hasHole: false
        },
        relationships: [],
        secrets: [
          { id: 'secret-017-2', content: '교무실 CCTV가 고장나서 당일 녹화 안 됨', importance: 'critical', revealCondition: 'CCTV 요청 시' }
        ],
        dialogues: [
          { topic: 'CCTV', lines: ['...죄송합니다. 교무실 CCTV가 고장났어요.', '당일 영상이 없습니다.'], revealsInfo: '증거 부재' },
          { topic: '출입', lines: ['야간에는 교무실이 잠겨요.', '마스터키는 야간 경비만 가지고 있죠.'], revealsInfo: '접근 제한' }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-017-3',
        name: '김영철',
        role: 'witness',
        age: 60,
        gender: 'male',
        occupation: '야간 경비',
        personality: '성실하고 책임감 있음',
        appearance: '경비복을 입은 노년 남성',
        background: '5년째 학교 야간 경비',
        alibi: {
          location: '경비실/순찰',
          time: '18:00-06:00',
          activity: '야간 근무',
          witnesses: ['근무 일지'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-017-4', type: '동료', description: '청소 직원과 친분', isSecret: false }
        ],
        secrets: [
          { id: 'secret-017-3', content: '청소 직원 한정숙이 늦게까지 남아있는 것을 자주 봤음', importance: 'major', revealCondition: '야간 상황에 대해 물을 때' }
        ],
        dialogues: [
          { topic: '순찰', lines: ['22시에 교무실 지나갔는데 불은 꺼져있었어요.', '이상한 건 못 봤습니다.'], revealsInfo: '외부 침입 없음' },
          { topic: '한정숙', lines: ['정숙씨요? 청소하시는 분이죠.', '늦게까지 일하시더라고요. 성실하신 분이에요.'], revealsInfo: '용의자 암시' }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-017-4',
        name: '한정숙',
        role: 'culprit',
        age: 45,
        gender: 'female',
        occupation: '청소 직원',
        personality: '조용하지만 욕심이 많음',
        appearance: '청소복을 입은 중년 여성',
        background: '2년째 학교 청소 직원, 경제적으로 어려움',
        alibi: {
          location: '교무실',
          time: '21:30-22:30',
          activity: '청소',
          witnesses: ['없음 (혼자)'],
          hasHole: true,
          holeDetail: '야간 청소 시간에 혼자 교무실에 있었음'
        },
        motive: {
          type: 'greed',
          description: '보이스피싱 조직에 학생 정보를 팔아 큰돈을 벌려고 함',
          strength: 3
        },
        relationships: [],
        secrets: [
          { id: 'secret-017-4', content: '몇 주 전부터 교사가 금고 여는 것을 관찰하여 비밀번호를 알아냄', importance: 'critical', revealCondition: '금고 접근 가능성 추궁' },
          { id: 'secret-017-5', content: '보이스피싱 조직과 연락 중', importance: 'critical', revealCondition: '핸드폰 확인' }
        ],
        dialogues: [
          { topic: 'USB', lines: ['저는 청소만 해요.', '교무실 일은 모르는데요.'], revealsInfo: '부정' },
          { topic: '금고', lines: ['금고요? 그런 게 있는지도 몰랐어요.', '...청소하면서 본 적 없어요.'], revealsInfo: '거짓말' },
          { topic: '야간', lines: ['청소하고 바로 갔어요.', '10시쯤 끝났을 거예요.'], revealsInfo: '시간대 일치' }
        ],
        nervousTriggers: ['금고', '비밀번호', '보이스피싱', '정보', '판매']
      }
    ],

    evidence: [
      {
        id: 'evidence-017-1',
        name: '빈 금고',
        type: 'physical',
        description: '교무실 금고',
        detailedDescription: 'USB가 보관되어 있던 금고가 열려있고 비어있음. 파손 흔적 없음.',
        location: '교무실',
        foundAt: 'loc-017-1',
        linkedCharacters: [],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: true,
        analysisResult: '비밀번호로 정상 개폐, 파손 없음'
      },
      {
        id: 'evidence-017-2',
        name: '청소 일지',
        type: 'document',
        description: '청소 직원 근무 기록',
        detailedDescription: '한정숙이 22:00에 교무실 청소를 했다는 기록.',
        location: '관리실',
        foundAt: 'loc-017-2',
        linkedCharacters: ['char-017-4'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-017-3',
        name: '한정숙 메모',
        type: 'physical',
        description: '한정숙 사물함에서 발견된 메모',
        detailedDescription: '숫자 조합 "1-9-8-5"가 적혀있음. 금고 비밀번호와 일치.',
        location: '한정숙 사물함',
        foundAt: 'loc-017-3',
        linkedCharacters: ['char-017-4'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: true,
        analysisResult: '금고 비밀번호와 완전 일치'
      },
      {
        id: 'evidence-017-4',
        name: '보이스피싱 조직 연락',
        type: 'digital',
        description: '한정숙 핸드폰 메시지',
        detailedDescription: '"학생 정보 500명분 있음. 얼마 줄 수 있나요?" "명당 5천원. 250만원 준다" 등의 대화.',
        location: '한정숙 핸드폰',
        foundAt: 'loc-017-3',
        linkedCharacters: ['char-017-4'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      },
      {
        id: 'evidence-017-5',
        name: 'USB (회수)',
        type: 'physical',
        description: '한정숙 집에서 발견된 USB',
        detailedDescription: '학교 개인정보 USB. 아직 거래 전이라 보관 중이었음.',
        location: '한정숙 자택',
        foundAt: 'loc-017-4',
        linkedCharacters: ['char-017-4'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      },
      {
        id: 'evidence-017-6',
        name: '교사 관찰 메모',
        type: 'document',
        description: '한정숙이 작성한 관찰 일지',
        detailedDescription: '"이상희 선생님 오후 3시 금고 열기" "금고 위치 교무실 서랍장 뒤" 등 관찰 내용.',
        location: '한정숙 사물함',
        foundAt: 'loc-017-3',
        linkedCharacters: ['char-017-4', 'char-017-1'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      }
    ],

    locations: [
      {
        id: 'loc-017-1',
        name: '교무실',
        description: '교사들의 업무 공간',
        atmosphere: '책상과 서류가 정돈되어 있다',
        objects: [
          { id: 'obj-1', name: '금고', description: '열려있는 빈 금고', examinationResult: '비밀번호 개폐, 파손 없음', containsEvidence: 'evidence-017-1' }
        ],
        connectedTo: ['loc-017-2']
      },
      {
        id: 'loc-017-2',
        name: '관리실',
        description: '청소 직원들의 사무실',
        atmosphere: '청소 도구와 서류가 있다',
        objects: [
          { id: 'obj-2', name: '청소 일지', description: '근무 기록부', examinationResult: '한정숙 22시 교무실 청소', containsEvidence: 'evidence-017-2' }
        ],
        connectedTo: ['loc-017-1', 'loc-017-3']
      },
      {
        id: 'loc-017-3',
        name: '한정숙 사물함',
        description: '청소 직원 사물함',
        atmosphere: '개인 물품 보관 공간',
        objects: [
          { id: 'obj-3', name: '메모', description: '숫자 메모', examinationResult: '금고 비밀번호!', containsEvidence: 'evidence-017-3', isLocked: true, unlockMethod: '본인 동의 또는 강력한 증거' },
          { id: 'obj-4', name: '관찰 일지', description: '교사 관찰 기록', examinationResult: '금고 사용 시간 기록', containsEvidence: 'evidence-017-6', isLocked: true, unlockMethod: '본인 동의 또는 강력한 증거' }
        ],
        connectedTo: ['loc-017-2']
      },
      {
        id: 'loc-017-4',
        name: '한정숙 자택',
        description: '한정숙이 거주하는 집',
        atmosphere: '소박한 원룸',
        objects: [
          { id: 'obj-5', name: 'USB', description: '학교 개인정보 USB', examinationResult: '학교 것이 맞음!', containsEvidence: 'evidence-017-5' }
        ],
        connectedTo: []
      }
    ],

    timeline: [
      { time: '몇 주 전', event: '한정숙 금고 비밀번호 관찰 시작', participants: ['char-017-4'], location: 'loc-017-1', importance: 'critical', isRevealed: false },
      { time: '21:30', event: '한정숙 교무실 청소 시작', participants: ['char-017-4'], location: 'loc-017-1', importance: 'major', isRevealed: true },
      { time: '22:00', event: '금고 개방 및 USB 절취', participants: ['char-017-4'], location: 'loc-017-1', importance: 'critical', isRevealed: false },
      { time: '22:30', event: '청소 종료 및 퇴실', participants: ['char-017-4'], location: 'loc-017-1', importance: 'major', isRevealed: false },
      { time: '다음날', event: 'USB 분실 발견', participants: ['char-017-1'], location: 'loc-017-1', importance: 'critical', isRevealed: true }
    ],

    solution: {
      summary: '청소 직원 한정숙이 금고 비밀번호를 몰래 알아내어 개인정보 USB를 훔쳐 보이스피싱 조직에 팔려고 했다.',
      detailedExplanation: [
        '한정숙은 경제적으로 어려워 큰돈이 필요했다.',
        '몇 주 전부터 청소 중 교사가 금고 여는 것을 관찰하여 비밀번호를 알아냄.',
        '야간 청소 시간을 이용해 금고를 열고 USB를 훔침.',
        '보이스피싱 조직에 학생 정보를 팔아 250만원을 받으려 함.',
        '비밀번호 메모, 보이스피싱 대화, USB 발견이 결정적 증거.'
      ],
      keyEvidence: ['evidence-017-1', 'evidence-017-3', 'evidence-017-4', 'evidence-017-5', 'evidence-017-6'],
      howToSolve: [
        '금고가 비밀번호로 열렸음을 확인한다',
        '야간 청소 기록에서 접근 가능자를 찾는다',
        '청소 직원의 사물함을 수색한다',
        '비밀번호 메모를 발견한다',
        '핸드폰에서 범죄 조직과의 연락을 확인한다',
        '자택에서 USB를 회수한다'
      ],
      commonMistakes: [
        '교사 내부자를 의심함',
        '외부 해킹으로 오해함',
        '학생을 의심함'
      ]
    },

    deductionKeywords: {
      who: ['한정숙', '청소 직원'],
      why: ['돈', '보이스피싱', '판매', '경제적 어려움'],
      how: ['금고 비밀번호', '관찰', '야간 청소'],
      when: ['22:00', '야간'],
      where: ['교무실', '금고']
    },

    tags: ['개인정보', 'USB', '보이스피싱', '금고', '내부자'],
    author: 'DEDUCTIO',
    version: '1.0'
  },

  // ============ THEFT-018: 미술실의 전시회 작품 ============
  {
    id: 'theft-018',
    title: '미술실의 전시회 작품',
    subtitle: '사라진 우수작',
    type: 'theft',
    difficulty: 'medium',
    estimatedTime: 25,

    prologue: [
      '전시회를 앞둔 우수 작품이 사라졌다.',
      '미술부 내부의 갈등.',
      '질투가 범죄를 만들었다.'
    ],
    introduction: [
      '한빛고등학교 미술실.',
      '전국 학생 미술 전시회에 출품할 우수 작품이 사라졌다.',
      '미술 선생님이 가장 아끼던 학생의 작품이었다.'
    ],
    setting: '한빛고등학교 미술실',

    crimeTime: '17:30',
    crimeLocation: '미술실 작품 보관실',
    culpritId: 'char-018-3',
    victimId: 'char-018-2',
    motive: '질투와 경쟁심',
    motiveDetail: '자신보다 뛰어난 후배의 작품이 출품되는 것을 견딜 수 없었음',
    method: '방과 후 절도 및 훼손',
    methodDetail: '방과 후 작품을 가져가 훼손한 뒤 쓰레기통에 버림',

    characters: [
      {
        id: 'char-018-1',
        name: '송미영',
        role: 'witness',
        age: 38,
        gender: 'female',
        occupation: '미술 교사',
        personality: '예술적이고 학생들을 아낌',
        appearance: '물감이 묻은 앞치마를 입은 예술가 느낌의 여성',
        background: '유명 화가 출신, 10년째 미술 교사',
        alibi: {
          location: '회의실',
          time: '17:00-19:00',
          activity: '전시회 준비 회의',
          witnesses: ['다른 교사들'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-018-2', type: '사제', description: '재능 있는 제자', isSecret: false },
          { targetId: 'char-018-3', type: '사제', description: '미술부 부장', isSecret: false }
        ],
        secrets: [],
        dialogues: [
          { topic: '작품', lines: ['정말 훌륭한 작품이었어요.', '전시회에서 상을 탈 수 있었을 텐데...'], revealsInfo: '작품 가치' },
          { topic: '미술부', lines: ['수진이와 민아가 같은 부원이에요.', '...최근에 좀 사이가 안 좋더라고요.'], revealsInfo: '갈등 존재' }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-018-2',
        name: '이수진',
        role: 'victim',
        age: 16,
        gender: 'female',
        occupation: '미술부 부원',
        personality: '재능이 뛰어나고 겸손함',
        appearance: '그림을 좋아하는 순수한 여학생',
        background: '미술 영재, 전국 대회 수상 경력',
        alibi: {
          location: '도서관',
          time: '17:00-19:00',
          activity: '미술 자료 조사',
          witnesses: ['도서관 사서'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-018-3', type: '미술부 선후배', description: '선배와 후배', isSecret: false }
        ],
        secrets: [],
        dialogues: [
          { topic: '작품', lines: ['3개월 동안 그린 거예요...', '전시회에 나가는 게 꿈이었는데...'], revealsInfo: '피해 심각성' },
          { topic: '김민아', lines: ['민아 선배요?', '최근에 저한테 좀 차갑더라고요. 이유는 모르겠어요.'], revealsInfo: '관계 악화' }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-018-3',
        name: '김민아',
        role: 'culprit',
        age: 18,
        gender: 'female',
        occupation: '미술부 부장',
        personality: '재능은 있으나 질투심이 강함',
        appearance: '프라이드가 강해 보이는 여학생',
        background: '미술부 부장이었으나 후배에게 실력으로 밀림',
        alibi: {
          location: '미술실',
          time: '17:00-18:00',
          activity: '작품 정리',
          witnesses: ['없음 (혼자)'],
          hasHole: true,
          holeDetail: '혼자 미술실에 남아있었음'
        },
        motive: {
          type: 'greed',
          description: '후배인 수진이 자신보다 뛰어난 작품으로 전시회에 출품되는 것을 질투함',
          strength: 3
        },
        relationships: [],
        secrets: [
          { id: 'secret-018-1', content: '수진 작품을 훼손하여 쓰레기통에 버림', importance: 'critical', revealCondition: '쓰레기통 수색 또는 추궁' }
        ],
        dialogues: [
          { topic: '작품', lines: ['저도 누가 그랬는지 모르겠어요.', '...참 나쁜 짓이죠.'], revealsInfo: '무관심 가장' },
          { topic: '이수진', lines: ['수진이요? 재능 있죠.', '...저보다 더 잘 그리더라고요.'], revealsInfo: '질투 암시' },
          { topic: '전시회', lines: ['제 작품은 떨어졌어요.', '수진이만 선발됐죠. ...축하해줬어요.'], revealsInfo: '거짓 축하' }
        ],
        nervousTriggers: ['질투', '수진', '전시회', '떨어짐', '훼손']
      },
      {
        id: 'char-018-4',
        name: '박지훈',
        role: 'witness',
        age: 17,
        gender: 'male',
        occupation: '미술부 부원',
        personality: '관찰력이 좋고 솔직함',
        appearance: '스케치북을 들고 다니는 남학생',
        background: '미술부 부원, 조용히 그림 그리는 것을 좋아함',
        alibi: {
          location: '미술실',
          time: '17:00-17:15',
          activity: '붓 정리',
          witnesses: ['김민아'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-018-3', type: '미술부 동료', description: '같은 부원', isSecret: false }
        ],
        secrets: [
          { id: 'secret-018-2', content: '민아 선배가 수진이 작품을 노려보는 걸 여러 번 봤음', importance: 'major', revealCondition: '민아에 대해 물을 때' }
        ],
        dialogues: [
          { topic: '작품', lines: ['수진이 작품 정말 좋았어요.', '왜 누가 그런 짓을...'], revealsInfo: '작품 우수성' },
          { topic: '김민아', lines: ['민아 선배가 수진이 작품을 자주 쳐다봤어요.', '표정이 좀... 안 좋더라고요.'], revealsInfo: '질투 목격' }
        ],
        nervousTriggers: []
      }
    ],

    evidence: [
      {
        id: 'evidence-018-1',
        name: '빈 작품 보관함',
        type: 'physical',
        description: '수진이 작품이 있던 보관함',
        detailedDescription: '작품이 사라지고 비어있음.',
        location: '미술실',
        foundAt: 'loc-018-1',
        linkedCharacters: [],
        isCritical: false,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-018-2',
        name: '미술실 CCTV',
        type: 'digital',
        description: '미술실 복도 CCTV 영상',
        detailedDescription: '17:35에 김민아가 큰 캔버스를 들고 나가는 모습.',
        location: '보안실',
        foundAt: 'loc-018-3',
        linkedCharacters: ['char-018-3'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-018-3',
        name: '훼손된 작품',
        type: 'physical',
        description: '학교 뒤편 쓰레기통에서 발견',
        detailedDescription: '수진이 작품이 찢어지고 물감이 덧칠되어 훼손됨. 복원 불가능.',
        location: '학교 뒤편 쓰레기통',
        foundAt: 'loc-018-2',
        linkedCharacters: ['char-018-2'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      },
      {
        id: 'evidence-018-4',
        name: '김민아 손에 묻은 물감',
        type: 'physical',
        description: '김민아 손톱 밑 물감',
        detailedDescription: '수진이 작품에 사용된 것과 동일한 색상의 물감이 김민아 손톱 밑에 묻어있음.',
        location: '김민아',
        foundAt: 'loc-018-1',
        linkedCharacters: ['char-018-3'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: true,
        analysisResult: '수진이 작품 물감과 색상 일치'
      },
      {
        id: 'evidence-018-5',
        name: '김민아 일기',
        type: 'document',
        description: '김민아의 개인 일기장',
        detailedDescription: '"왜 내가 아니라 수진이지? 난 3년이나 했는데... 너무 억울해" 등의 내용.',
        location: '김민아 사물함',
        foundAt: 'loc-018-1',
        linkedCharacters: ['char-018-3'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      }
    ],

    locations: [
      {
        id: 'loc-018-1',
        name: '미술실',
        description: '그림과 조각품이 있는 미술 작업실',
        atmosphere: '물감 냄새와 작품들이 전시되어 있다',
        objects: [
          { id: 'obj-1', name: '작품 보관함', description: '비어있는 보관함', examinationResult: '작품 사라짐', containsEvidence: 'evidence-018-1' },
          { id: 'obj-2', name: '김민아 손', description: '물감 흔적', examinationResult: '수진이 작품 물감', containsEvidence: 'evidence-018-4' }
        ],
        connectedTo: ['loc-018-2', 'loc-018-3']
      },
      {
        id: 'loc-018-2',
        name: '학교 뒤편 쓰레기통',
        description: '학교 뒤편 야외 쓰레기 수거 장소',
        atmosphere: '쓰레기통이 줄지어 있다',
        objects: [
          { id: 'obj-3', name: '훼손된 작품', description: '찢어진 캔버스', examinationResult: '수진이 작품 확인', containsEvidence: 'evidence-018-3' }
        ],
        connectedTo: ['loc-018-1']
      },
      {
        id: 'loc-018-3',
        name: '보안실',
        description: 'CCTV 관제실',
        atmosphere: '모니터가 여러 대 있다',
        objects: [
          { id: 'obj-4', name: 'CCTV', description: '미술실 복도 영상', examinationResult: '민아가 캔버스 들고 나감', containsEvidence: 'evidence-018-2' }
        ],
        connectedTo: ['loc-018-1']
      }
    ],

    timeline: [
      { time: '17:00', event: '미술부 활동 종료', participants: ['char-018-2', 'char-018-3', 'char-018-4'], location: 'loc-018-1', importance: 'minor', isRevealed: true },
      { time: '17:15', event: '박지훈 퇴실', participants: ['char-018-4'], location: 'loc-018-1', importance: 'minor', isRevealed: true },
      { time: '17:30', event: '김민아 작품 절취', participants: ['char-018-3'], location: 'loc-018-1', importance: 'critical', isRevealed: false },
      { time: '17:35', event: '김민아 캔버스 들고 퇴실', participants: ['char-018-3'], location: 'loc-018-1', importance: 'critical', isRevealed: false },
      { time: '17:40', event: '작품 훼손 및 투기', participants: ['char-018-3'], location: 'loc-018-2', importance: 'critical', isRevealed: false },
      { time: '다음날', event: '작품 분실 발견', participants: ['char-018-1'], location: 'loc-018-1', importance: 'critical', isRevealed: true }
    ],

    solution: {
      summary: '미술부 부장 김민아가 질투심으로 후배 이수진의 우수 작품을 훔쳐 훼손하고 버렸다.',
      detailedExplanation: [
        '김민아는 3년간 미술부 부장으로 활동했으나 전시회에 선발되지 못함.',
        '1학년 후배 이수진이 자신보다 뛰어난 작품으로 선발되자 심한 질투심을 느낌.',
        '방과 후 혼자 남아 수진이 작품을 가져가 훼손한 뒤 쓰레기통에 버림.',
        '손에 묻은 물감, CCTV 영상, 일기장이 결정적 증거.',
        '질투와 경쟁심이 만든 비극적 범죄.'
      ],
      keyEvidence: ['evidence-018-2', 'evidence-018-3', 'evidence-018-4', 'evidence-018-5'],
      howToSolve: [
        'CCTV에서 캔버스를 들고 나간 사람을 확인한다',
        '쓰레기통을 수색하여 훼손된 작품을 발견한다',
        '김민아 손에 묻은 물감을 확인한다',
        '일기장에서 질투의 동기를 확인한다'
      ],
      commonMistakes: [
        '외부인 침입으로 생각함',
        '다른 부원을 의심함'
      ]
    },

    deductionKeywords: {
      who: ['김민아', '미술부 부장'],
      why: ['질투', '경쟁', '전시회', '선발'],
      how: ['훼손', '쓰레기통', '혼자'],
      when: ['17:30', '방과 후'],
      where: ['미술실', '작품 보관실']
    },

    tags: ['미술실', '작품', '질투', '훼손', '전시회'],
    author: 'DEDUCTIO',
    version: '1.0'
  },

  // ============ THEFT-019: 도서관의 희귀본 추가 도난 ============
  {
    id: 'theft-019',
    title: '도서관의 희귀본 추가 도난',
    subtitle: '또다시 사라진 고서',
    type: 'theft',
    difficulty: 'medium',
    estimatedTime: 30,

    prologue: [
      '이전 사건 이후 보안을 강화했지만...',
      '또다시 희귀본이 사라졌다.',
      '이번엔 다른 범인인가, 같은 범인인가.'
    ],
    introduction: [
      '한빛고등학교 도서관.',
      '이전에 희귀본 도난 사건이 있은 후 보안을 강화했으나,',
      '또다시 귀중한 고서 2권이 사라졌다.'
    ],
    setting: '한빛고등학교 도서관',

    crimeTime: '20:00',
    crimeLocation: '도서관 귀중본 서고',
    culpritId: 'char-019-3',
    victimId: undefined,
    motive: '컬렉션 욕구',
    motiveDetail: '희귀본 수집가로서 개인 소장하고 싶었음',
    method: 'RFID 태그 무력화',
    methodDetail: 'RFID 차단 가방을 사용하여 경보 시스템을 우회',

    characters: [
      {
        id: 'char-019-1',
        name: '최은영',
        role: 'witness',
        age: 45,
        gender: 'female',
        occupation: '사서',
        personality: '책을 사랑하고 세심함',
        appearance: '안경을 쓴 지적인 중년 여성',
        background: '20년차 사서, 희귀본 관리 전문',
        alibi: {
          location: '자택',
          time: '19:00-',
          activity: '퇴근 후 휴식',
          witnesses: ['가족'],
          hasHole: false
        },
        relationships: [],
        secrets: [
          { id: 'secret-019-1', content: 'RFID 시스템에 취약점이 있다는 것을 알고 있었으나 보고하지 않음', importance: 'major', revealCondition: '보안 시스템에 대해 추궁' }
        ],
        dialogues: [
          { topic: '희귀본', lines: ['조선시대 문집 2권이에요.', '시가로 각각 500만원 정도 할 거예요.'], revealsInfo: '책 가치' },
          { topic: '보안', lines: ['RFID 시스템을 강화했는데...', '...사실 차단 가방 같은 걸로 우회할 수 있긴 해요.'], revealsInfo: '보안 취약점' }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-019-2',
        name: '강동민',
        role: 'witness',
        age: 18,
        gender: 'male',
        occupation: '도서부 부장',
        personality: '책을 좋아하고 성실함',
        appearance: '두꺼운 책을 들고 다니는 남학생',
        background: '도서부 부장, 사서 보조 역할',
        alibi: {
          location: '도서관',
          time: '17:00-18:30',
          activity: '책 정리',
          witnesses: ['사서'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-019-3', type: '도서부 동료', description: '같은 부원', isSecret: false }
        ],
        secrets: [
          { id: 'secret-019-2', content: '윤서가 희귀본에 유난히 관심이 많았음', importance: 'major', revealCondition: '윤서에 대해 물을 때' }
        ],
        dialogues: [
          { topic: '희귀본', lines: ['진짜 귀한 책이에요.', '누가 이런 짓을...'], revealsInfo: '책 중요성' },
          { topic: '박윤서', lines: ['윤서가 희귀본 코너를 자주 갔어요.', '고서에 관심이 많더라고요.'], revealsInfo: '용의자 암시' }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-019-3',
        name: '박윤서',
        role: 'culprit',
        age: 17,
        gender: 'female',
        occupation: '도서부 부원',
        personality: '조용하고 책에 집착함',
        appearance: '항상 책을 읽고 있는 여학생',
        background: '고서 수집에 집착, 부유한 집안',
        alibi: {
          location: '도서관',
          time: '19:30-20:30',
          activity: '자율학습',
          witnesses: ['없음 (야간 개방 시간)'],
          hasHole: true,
          holeDetail: '야간 개방 시간에 혼자 있었음'
        },
        motive: {
          type: 'greed',
          description: '희귀본 컬렉터로서 학교 고서를 개인 소장하고 싶었음',
          strength: 3
        },
        relationships: [],
        secrets: [
          { id: 'secret-019-3', content: 'RFID 차단 가방으로 경보 우회', importance: 'critical', revealCondition: '가방 수색' },
          { id: 'secret-019-4', content: '집에 고서 컬렉션 방이 따로 있음', importance: 'critical', revealCondition: '자택 수색' }
        ],
        dialogues: [
          { topic: '희귀본', lines: ['저도 좋아하긴 해요.', '...그냥 관심이 있을 뿐이에요.'], revealsInfo: '관심 인정' },
          { topic: '야간', lines: ['자율학습하고 있었어요.', '...혼자 조용히 공부했어요.'], revealsInfo: '기회' },
          { topic: '컬렉션', lines: ['...제 취미예요.', '고서는 예술이잖아요.'], revealsInfo: '집착' }
        ],
        nervousTriggers: ['RFID', '가방', '컬렉션', '고서', '소장']
      }
    ],

    evidence: [
      {
        id: 'evidence-019-1',
        name: '빈 서가',
        type: 'physical',
        description: '희귀본이 있던 서가',
        detailedDescription: '조선시대 문집 2권이 사라짐. RFID 태그는 그대로 있음.',
        location: '도서관 귀중본 서고',
        foundAt: 'loc-019-1',
        linkedCharacters: [],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: true,
        analysisResult: 'RFID 태그는 그대로, 경보 미작동'
      },
      {
        id: 'evidence-019-2',
        name: '도서관 출입 기록',
        type: 'digital',
        description: '야간 개방 시간 출입 기록',
        detailedDescription: '19:30-20:30 사이 박윤서만 도서관에 있었음.',
        location: '도서관',
        foundAt: 'loc-019-1',
        linkedCharacters: ['char-019-3'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-019-3',
        name: 'RFID 차단 가방',
        type: 'physical',
        description: '박윤서 사물함에서 발견',
        detailedDescription: '은박 소재의 RFID 차단 가방. 온라인 쇼핑몰 구매 기록 있음.',
        location: '박윤서 사물함',
        foundAt: 'loc-019-2',
        linkedCharacters: ['char-019-3'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-019-4',
        name: '온라인 구매 기록',
        type: 'digital',
        description: '박윤서 쇼핑 내역',
        detailedDescription: '"RFID 차단 가방" 구매 기록. 도난 사건 일주일 전 구매.',
        location: '박윤서 핸드폰',
        foundAt: 'loc-019-2',
        linkedCharacters: ['char-019-3'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-019-5',
        name: '박윤서 집 컬렉션',
        type: 'physical',
        description: '박윤서 자택 컬렉션 룸',
        detailedDescription: '학교 희귀본 2권 포함, 수십 권의 고서가 진열되어 있음.',
        location: '박윤서 자택',
        foundAt: 'loc-019-3',
        linkedCharacters: ['char-019-3'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      },
      {
        id: 'evidence-019-6',
        name: '고서 커뮤니티 활동',
        type: 'digital',
        description: '박윤서의 온라인 활동',
        detailedDescription: '고서 수집 커뮤니티에서 "조선시대 문집 구합니다" 글 다수. 집착 수준의 활동.',
        location: '인터넷',
        foundAt: 'loc-019-4',
        linkedCharacters: ['char-019-3'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      }
    ],

    locations: [
      {
        id: 'loc-019-1',
        name: '도서관',
        description: '학교 도서관 및 귀중본 서고',
        atmosphere: '조용하고 책 냄새가 난다',
        objects: [
          { id: 'obj-1', name: '귀중본 서가', description: '희귀본이 있던 자리', examinationResult: 'RFID 태그만 남음', containsEvidence: 'evidence-019-1' },
          { id: 'obj-2', name: '출입 기록', description: '전자 출입 시스템', examinationResult: '박윤서만 있었음', containsEvidence: 'evidence-019-2' }
        ],
        connectedTo: ['loc-019-2']
      },
      {
        id: 'loc-019-2',
        name: '박윤서 사물함',
        description: '도서부 사물함',
        atmosphere: '책과 개인 물품이 있다',
        objects: [
          { id: 'obj-3', name: 'RFID 차단 가방', description: '은박 소재 가방', examinationResult: '경보 우회 도구', containsEvidence: 'evidence-019-3', isLocked: true, unlockMethod: '본인 동의 또는 강력한 증거' }
        ],
        connectedTo: ['loc-019-1']
      },
      {
        id: 'loc-019-3',
        name: '박윤서 자택',
        description: '박윤서가 거주하는 고급 주택',
        atmosphere: '컬렉션 룸이 따로 있다',
        objects: [
          { id: 'obj-4', name: '고서 컬렉션', description: '진열된 희귀본들', examinationResult: '학교 책 발견!', containsEvidence: 'evidence-019-5' }
        ],
        connectedTo: []
      },
      {
        id: 'loc-019-4',
        name: '인터넷',
        description: '고서 수집 커뮤니티',
        atmosphere: '온라인 공간',
        objects: [
          { id: 'obj-5', name: '커뮤니티 글', description: '윤서의 활동 내역', examinationResult: '집착 수준 확인', containsEvidence: 'evidence-019-6' }
        ],
        connectedTo: []
      }
    ],

    timeline: [
      { time: '일주일 전', event: 'RFID 차단 가방 구매', participants: ['char-019-3'], location: '온라인', importance: 'critical', isRevealed: false },
      { time: '19:30', event: '박윤서 도서관 입장', participants: ['char-019-3'], location: 'loc-019-1', importance: 'major', isRevealed: true },
      { time: '20:00', event: 'RFID 차단 가방으로 희귀본 절취', participants: ['char-019-3'], location: 'loc-019-1', importance: 'critical', isRevealed: false },
      { time: '20:30', event: '박윤서 도서관 퇴장', participants: ['char-019-3'], location: 'loc-019-1', importance: 'major', isRevealed: true },
      { time: '다음날', event: '희귀본 분실 발견', participants: ['char-019-1'], location: 'loc-019-1', importance: 'critical', isRevealed: true }
    ],

    solution: {
      summary: '도서부원 박윤서가 고서 컬렉션 욕구로 RFID 차단 가방을 이용해 희귀본을 훔쳐 개인 소장했다.',
      detailedExplanation: [
        '박윤서는 고서 수집에 집착하는 컬렉터였다.',
        '학교 희귀본을 개인 소장하고 싶어 범행을 계획.',
        '일주일 전 RFID 차단 가방을 구매하여 준비.',
        '야간 개방 시간을 이용해 혼자 도서관에 남아 범행.',
        'RFID 차단 가방으로 경보 시스템을 우회하여 책을 가져감.',
        '자택 컬렉션 룸에 학교 희귀본을 진열.'
      ],
      keyEvidence: ['evidence-019-1', 'evidence-019-2', 'evidence-019-3', 'evidence-019-5', 'evidence-019-6'],
      howToSolve: [
        'RFID 태그가 그대로인데 경보가 안 울린 이유를 파악',
        '야간 출입 기록에서 단독 사용자를 확인',
        'RFID 차단 가방 구매 기록을 추적',
        '고서 커뮤니티에서 집착 정도를 확인',
        '자택을 수색하여 희귀본을 발견'
      ],
      commonMistakes: [
        '외부 도둑으로 생각함',
        '시스템 해킹으로 오해함'
      ]
    },

    deductionKeywords: {
      who: ['박윤서', '도서부'],
      why: ['컬렉션', '집착', '소장', '고서'],
      how: ['RFID 차단', '가방', '야간'],
      when: ['20:00', '야간 개방'],
      where: ['도서관', '귀중본 서고']
    },

    tags: ['도서관', '희귀본', 'RFID', '컬렉션', '고서'],
    author: 'DEDUCTIO',
    version: '1.0'
  },

  // ============ THEFT-020: 학교 매점의 현금 ============
  {
    id: 'theft-020',
    title: '학교 매점의 현금',
    subtitle: '또다시 사라진 매출금',
    type: 'theft',
    difficulty: 'easy',
    estimatedTime: 20,

    prologue: [
      '학교 매점에서 현금이 사라졌다.',
      '매일 반복되는 소액 절도.',
      '내부인의 소행이 확실하다.'
    ],
    introduction: [
      '한빛고등학교 학생 매점.',
      '일주일째 매일 3-5만원씩 현금이 사라지고 있다.',
      '매점 아주머니는 손님이 많아 범인을 특정하지 못하고 있다.'
    ],
    setting: '한빛고등학교 학생 매점',

    crimeTime: '13:00',
    crimeLocation: '매점 금고',
    culpritId: 'char-020-3',
    victimId: 'char-020-1',
    motive: '개인적 욕망',
    motiveDetail: '게임 아이템 구매 등 용돈이 부족하여 반복 절도',
    method: '점심시간 혼잡 이용',
    methodDetail: '점심시간 혼잡할 때 금고가 열려있는 틈을 타 현금 절취',

    characters: [
      {
        id: 'char-020-1',
        name: '박순자',
        role: 'victim',
        age: 55,
        gender: 'female',
        occupation: '매점 운영자',
        personality: '친절하지만 관찰력이 부족함',
        appearance: '앞치마를 입은 중년 여성',
        background: '10년째 학교 매점 운영',
        alibi: {
          location: '매점',
          time: '12:00-14:00',
          activity: '점심시간 영업',
          witnesses: ['학생들'],
          hasHole: false
        },
        relationships: [],
        secrets: [],
        dialogues: [
          { topic: '도난', lines: ['일주일째 매일 돈이 없어져요.', '점심시간에 사람이 너무 많아서...'], revealsInfo: '반복 절도' },
          { topic: '금고', lines: ['바쁠 땐 금고를 열어두고 일해요.', '그게 문제였나 봐요.'], revealsInfo: '보안 허점' }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-020-2',
        name: '이현수',
        role: 'witness',
        age: 17,
        gender: 'male',
        occupation: '학생',
        personality: '관찰력이 좋음',
        appearance: '매점을 자주 이용하는 남학생',
        background: '매일 매점에서 빵을 사먹음',
        alibi: {
          location: '매점',
          time: '13:00',
          activity: '간식 구매',
          witnesses: ['다른 학생들'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-020-3', type: '같은 반', description: '같은 반 친구', isSecret: false }
        ],
        secrets: [
          { id: 'secret-020-1', content: '승우가 매일 매점에 오는데 물건은 안 사는 걸 봤음', importance: 'major', revealCondition: '승우에 대해 물을 때' }
        ],
        dialogues: [
          { topic: '도난', lines: ['저도 이상하다고 생각했어요.', '매일 점심시간에 일어나는 것 같아요.'], revealsInfo: '시간대' },
          { topic: '장승우', lines: ['승우가 매일 매점에 와요.', '근데 물건은 안 사고 왔다 갔다 해요. 이상하죠?'], revealsInfo: '의심스러운 행동' }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-020-3',
        name: '장승우',
        role: 'culprit',
        age: 16,
        gender: 'male',
        occupation: '학생',
        personality: '충동적이고 게임에 빠져있음',
        appearance: '항상 핸드폰을 보는 남학생',
        background: '게임 과몰입, 용돈 부족',
        alibi: {
          location: '매점',
          time: '13:00',
          activity: '매점 방문',
          witnesses: ['학생들 (구매는 안 함)'],
          hasHole: true,
          holeDetail: '매점에 왔으나 물건 구매 기록 없음'
        },
        motive: {
          type: 'greed',
          description: '게임 아이템 구매 등 용돈이 부족해 매일 소액을 훔침',
          strength: 2
        },
        relationships: [],
        secrets: [
          { id: 'secret-020-2', content: '점심시간마다 금고에서 3-5만원씩 가져감', importance: 'critical', revealCondition: 'CCTV 확인 또는 추궁' }
        ],
        dialogues: [
          { topic: '매점', lines: ['네, 자주 가요.', '...그냥 구경만 하고 나와요.'], revealsInfo: '변명' },
          { topic: '게임', lines: ['게임 좀 해요.', '아이템 사려면 돈이 필요하긴 하죠.'], revealsInfo: '동기' },
          { topic: '돈', lines: ['...용돈이 부족해요.', '부모님이 안 주셔서...'], revealsInfo: '필요성' }
        ],
        nervousTriggers: ['금고', '현금', '게임', '아이템', '매일']
      }
    ],

    evidence: [
      {
        id: 'evidence-020-1',
        name: '매출 장부',
        type: 'document',
        description: '매점 매출 기록',
        detailedDescription: '일주일간 매일 3-5만원씩 총 28만원 부족. 모두 점심시간에 발생.',
        location: '매점',
        foundAt: 'loc-020-1',
        linkedCharacters: [],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-020-2',
        name: '매점 CCTV',
        type: 'digital',
        description: '매점 내부 CCTV 영상',
        detailedDescription: '장승우가 매일 점심시간에 매점을 방문하나 구매는 하지 않음. 금고 근처를 자주 지나감.',
        location: '보안실',
        foundAt: 'loc-020-2',
        linkedCharacters: ['char-020-3'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: true,
        analysisResult: '승우가 금고에 손을 뻗는 장면 포착'
      },
      {
        id: 'evidence-020-3',
        name: '게임 결제 내역',
        type: 'digital',
        description: '장승우 게임 계정 결제 기록',
        detailedDescription: '일주일간 총 25만원 게임 아이템 구매. 도난액과 거의 일치.',
        location: '장승우 핸드폰',
        foundAt: 'loc-020-3',
        linkedCharacters: ['char-020-3'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: true,
        analysisResult: '도난액과 지출액 일치'
      },
      {
        id: 'evidence-020-4',
        name: '현금 소지',
        type: 'physical',
        description: '장승우가 소지한 현금',
        detailedDescription: '지갑에 4만원의 현금. 용돈을 받지 않는다고 했으나 현금 보유.',
        location: '장승우',
        foundAt: 'loc-020-3',
        linkedCharacters: ['char-020-3'],
        isCritical: false,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      }
    ],

    locations: [
      {
        id: 'loc-020-1',
        name: '매점',
        description: '학생들이 간식을 사는 매점',
        atmosphere: '과자와 음료가 진열되어 있다',
        objects: [
          { id: 'obj-1', name: '매출 장부', description: '매출 기록부', examinationResult: '일주일간 28만원 부족', containsEvidence: 'evidence-020-1' },
          { id: 'obj-2', name: '금고', description: '현금 보관함', examinationResult: '점심시간 개방 상태', containsEvidence: undefined }
        ],
        connectedTo: ['loc-020-2']
      },
      {
        id: 'loc-020-2',
        name: '보안실',
        description: 'CCTV 관제실',
        atmosphere: '모니터가 여러 대 있다',
        objects: [
          { id: 'obj-3', name: 'CCTV', description: '매점 내부 영상', examinationResult: '승우가 금고에 손 뻗음', containsEvidence: 'evidence-020-2' }
        ],
        connectedTo: ['loc-020-1']
      },
      {
        id: 'loc-020-3',
        name: '장승우 (소지품)',
        description: '장승우의 개인 물품',
        atmosphere: '핸드폰과 지갑',
        objects: [
          { id: 'obj-4', name: '핸드폰', description: '게임 앱 설치', examinationResult: '25만원 결제 기록', containsEvidence: 'evidence-020-3' },
          { id: 'obj-5', name: '지갑', description: '개인 지갑', examinationResult: '4만원 현금', containsEvidence: 'evidence-020-4' }
        ],
        connectedTo: []
      }
    ],

    timeline: [
      { time: '월요일 13:00', event: '첫 번째 절도 (5만원)', participants: ['char-020-3'], location: 'loc-020-1', importance: 'critical', isRevealed: false },
      { time: '화요일 13:00', event: '두 번째 절도 (4만원)', participants: ['char-020-3'], location: 'loc-020-1', importance: 'critical', isRevealed: false },
      { time: '수요일 13:00', event: '세 번째 절도 (3만원)', participants: ['char-020-3'], location: 'loc-020-1', importance: 'critical', isRevealed: false },
      { time: '목요일 13:00', event: '네 번째 절도 (5만원)', participants: ['char-020-3'], location: 'loc-020-1', importance: 'critical', isRevealed: false },
      { time: '금요일 13:00', event: '다섯 번째 절도 (4만원)', participants: ['char-020-3'], location: 'loc-020-1', importance: 'critical', isRevealed: false },
      { time: '토요일 13:00', event: '여섯 번째 절도 (3만원)', participants: ['char-020-3'], location: 'loc-020-1', importance: 'critical', isRevealed: false },
      { time: '일요일 13:00', event: '일곱 번째 절도 (4만원)', participants: ['char-020-3'], location: 'loc-020-1', importance: 'critical', isRevealed: false },
      { time: '월요일', event: '도난 신고', participants: ['char-020-1'], location: 'loc-020-1', importance: 'critical', isRevealed: true }
    ],

    solution: {
      summary: '학생 장승우가 게임 아이템 구매 비용을 위해 일주일간 매일 매점 금고에서 소액을 훔쳤다.',
      detailedExplanation: [
        '장승우는 게임에 과몰입하여 아이템 구매가 필요했으나 용돈이 부족.',
        '점심시간에 매점이 혼잡하고 금고가 열려있는 것을 발견.',
        '일주일간 매일 점심시간마다 3-5만원씩 총 28만원을 훔침.',
        '훔친 돈으로 게임 아이템을 구매.',
        'CCTV 영상과 게임 결제 내역이 결정적 증거.'
      ],
      keyEvidence: ['evidence-020-1', 'evidence-020-2', 'evidence-020-3'],
      howToSolve: [
        '매출 장부에서 도난 패턴을 확인한다 (매일 점심시간)',
        'CCTV에서 의심스러운 행동을 확인한다',
        '게임 결제 내역과 도난액을 비교한다',
        '승우를 추궁하여 자백을 받는다'
      ],
      commonMistakes: [
        '외부인 침입으로 생각함',
        '매점 아주머니를 의심함'
      ]
    },

    deductionKeywords: {
      who: ['장승우', '학생'],
      why: ['게임', '아이템', '용돈', '부족'],
      how: ['점심시간', '혼잡', '금고 개방'],
      when: ['13:00', '점심시간', '매일'],
      where: ['매점', '금고']
    },

    tags: ['매점', '현금', '게임', '반복 절도', '소액'],
    author: 'DEDUCTIO',
    version: '1.0'
  }
];

export default theftScenariosPart4;
