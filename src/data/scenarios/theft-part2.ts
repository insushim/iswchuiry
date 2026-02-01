// ========================================
// 도난 시나리오 Part 2 (6-10)
// ========================================

import { Scenario } from './types';

export const theftScenariosPart2: Scenario[] = [
  // ============ THEFT-006: 화학실험실의 위험물 ============
  {
    id: 'theft-006',
    title: '화학실험실의 위험물',
    subtitle: '사라진 시약',
    type: 'theft',
    difficulty: 'medium',
    estimatedTime: 25,

    prologue: [
      '위험 화학물질이 사라졌다.',
      '누가, 왜 가져갔을까.',
      '테러인가, 복수인가.'
    ],
    introduction: [
      '한빛고등학교 화학실험실.',
      '정기 점검 중 위험 화학물질 몇 가지가 사라진 것을 발견했다.',
      '잘못 사용하면 위험한 물질들이었다.'
    ],
    setting: '한빛고등학교 화학실험실',

    crimeTime: '17:00',
    crimeLocation: '화학실험실 시약 보관함',
    culpritId: 'char-006-3',
    victimId: undefined,
    motive: '불법 제조',
    motiveDetail: '화학 지식을 이용해 불법 폭죽을 만들어 판매하려 함',
    method: '과학부 활동 중 절도',
    methodDetail: '과학부 활동 시간에 몰래 시약을 빼돌림',

    characters: [
      {
        id: 'char-006-1',
        name: '박영수',
        role: 'witness',
        age: 50,
        gender: 'male',
        occupation: '화학 교사',
        personality: '엄격하고 안전을 중시함',
        appearance: '흰 가운을 입은 근엄한 남성',
        background: '25년차 화학 교사, 시약 관리에 철저함',
        alibi: {
          location: '교무실',
          time: '16:30-17:30',
          activity: '회의',
          witnesses: ['다른 교사들'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-006-3', type: '사제', description: '과학부원', isSecret: false }
        ],
        secrets: [],
        dialogues: [
          { topic: '시약', lines: ['사라진 건 황산, 질산, 그리고 몇 가지 산화제예요.', '조합하면 위험한 것들이죠.'], revealsInfo: '도난 물질' },
          { topic: '접근자', lines: ['시약실 열쇠는 저와 과학부 부장만 가지고 있어요.', '실험 시간에만 개방하죠.'], revealsInfo: '접근 가능자' }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-006-2',
        name: '김서현',
        role: 'witness',
        age: 18,
        gender: 'female',
        occupation: '과학부 부장',
        personality: '성실하고 책임감 있음',
        appearance: '안경을 쓴 모범생 스타일 여학생',
        background: '과학 올림피아드 수상 경력, 의대 진학 목표',
        alibi: {
          location: '도서관',
          time: '16:00-18:00',
          activity: '자습',
          witnesses: ['도서관 사서'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-006-3', type: '과학부 동료', description: '같은 부원이나 최근 사이가 멀어짐', isSecret: true }
        ],
        secrets: [
          { id: 'secret-006-1', content: '최근 장민재가 이상한 질문을 많이 했음', importance: 'major', revealCondition: '장민재에 대해 물을 때' }
        ],
        dialogues: [
          { topic: '시약', lines: ['그 시약들이요? 조합하면 폭발물이 될 수 있어요.', '무섭네요...'], revealsInfo: '위험성' },
          { topic: '장민재', lines: ['요즘 좀 이상해요.', '화학 반응식 질문을 많이 하더라고요. 폭발 관련으로요.'], revealsInfo: '용의 정황' }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-006-3',
        name: '장민재',
        role: 'culprit',
        age: 17,
        gender: 'male',
        occupation: '과학부 부원',
        personality: '영리하지만 돈에 눈이 멂',
        appearance: '항상 스마트폰을 보는 남학생',
        background: '화학에 재능이 있으나 가정 형편이 어려움, SNS로 불법 폭죽 판매 시도',
        alibi: {
          location: '화학실험실',
          time: '16:30-17:30',
          activity: '실험 정리',
          witnesses: ['없음 (혼자)'],
          hasHole: true,
          holeDetail: '혼자 실험실에 남았음'
        },
        motive: {
          type: 'greed',
          description: '화학 지식을 이용해 불법 폭죽을 만들어 돈을 벌려고 함',
          strength: 2
        },
        relationships: [],
        secrets: [
          { id: 'secret-006-2', content: 'SNS로 불법 폭죽 판매 계획', importance: 'critical', revealCondition: 'SNS 확인 또는 추궁' }
        ],
        dialogues: [
          { topic: '시약', lines: ['저요? 그냥 실험 정리하고 있었어요.', '시약은 건드리지 않았는데요.'], revealsInfo: '부정' },
          { topic: 'SNS', lines: ['...그건 그냥 장난이에요.', '진짜 팔려고 한 건 아니에요.'], revealsInfo: '자백 암시', requiresEvidence: ['evidence-006-4'] }
        ],
        nervousTriggers: ['폭죽', 'SNS', '판매', '돈', '불법']
      }
    ],

    evidence: [
      {
        id: 'evidence-006-1',
        name: '시약 장부',
        type: 'document',
        description: '시약 사용 기록부',
        detailedDescription: '황산 500ml, 질산 300ml, 과망간산칼륨 100g이 기록 없이 사라짐.',
        location: '화학실험실',
        foundAt: 'loc-006-1',
        linkedCharacters: [],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-006-2',
        name: '실험실 출입 기록',
        type: 'document',
        description: '실험실 사용 로그',
        detailedDescription: '장민재가 16:30-17:30 사이 혼자 실험실을 사용한 기록.',
        location: '화학실험실',
        foundAt: 'loc-006-1',
        linkedCharacters: ['char-006-3'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-006-3',
        name: '장민재 가방',
        type: 'physical',
        description: '장민재의 책가방',
        detailedDescription: '가방 안에서 빈 시약병이 발견됨. 황산 라벨이 붙어있다.',
        location: '교실',
        foundAt: 'loc-006-2',
        linkedCharacters: ['char-006-3'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-006-4',
        name: 'SNS 게시물',
        type: 'digital',
        description: '장민재 SNS 계정의 판매 글',
        detailedDescription: '"수제 폭죽 팝니다. 화려한 불꽃 보장!" 이라는 게시물. 현재는 삭제되었으나 스크린샷 확보.',
        location: '인터넷',
        foundAt: 'loc-006-3',
        linkedCharacters: ['char-006-3'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-006-5',
        name: '화학 노트',
        type: 'document',
        description: '장민재의 개인 노트',
        detailedDescription: '폭발물 제조법이 상세히 적혀있음. 인터넷에서 찾은 것으로 보임.',
        location: '장민재 사물함',
        foundAt: 'loc-006-2',
        linkedCharacters: ['char-006-3'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      }
    ],

    locations: [
      {
        id: 'loc-006-1',
        name: '화학실험실',
        description: '각종 실험 기구와 시약이 있는 실험실',
        atmosphere: '화학 약품 냄새가 나고 안전 수칙이 붙어있다',
        objects: [
          { id: 'obj-1', name: '시약 장부', description: '사용 기록', examinationResult: '누락된 시약 확인', containsEvidence: 'evidence-006-1' },
          { id: 'obj-2', name: '출입 기록', description: '사용자 로그', examinationResult: '장민재 단독 사용 기록', containsEvidence: 'evidence-006-2' }
        ],
        connectedTo: ['loc-006-2']
      },
      {
        id: 'loc-006-2',
        name: '교실/사물함',
        description: '학생들의 교실과 사물함',
        atmosphere: '책상과 개인 물품이 있다',
        objects: [
          { id: 'obj-3', name: '장민재 가방', description: '책가방', examinationResult: '빈 시약병 발견', containsEvidence: 'evidence-006-3' },
          { id: 'obj-4', name: '장민재 사물함', description: '개인 사물함', examinationResult: '화학 노트 발견', containsEvidence: 'evidence-006-5', isLocked: true, unlockMethod: '본인 동의 또는 강력한 증거' }
        ],
        connectedTo: ['loc-006-1']
      },
      {
        id: 'loc-006-3',
        name: '인터넷/SNS',
        description: '장민재의 SNS 계정',
        atmosphere: '온라인 공간',
        objects: [
          { id: 'obj-5', name: 'SNS 게시물', description: '삭제된 판매 글', examinationResult: '스크린샷 확보', containsEvidence: 'evidence-006-4' }
        ],
        connectedTo: []
      }
    ],

    timeline: [
      { time: '16:30', event: '장민재 실험실 입장', participants: ['char-006-3'], location: 'loc-006-1', importance: 'critical', isRevealed: false },
      { time: '17:00', event: '시약 절취', participants: ['char-006-3'], location: 'loc-006-1', importance: 'critical', isRevealed: false },
      { time: '17:30', event: '장민재 실험실 퇴장', participants: ['char-006-3'], location: 'loc-006-1', importance: 'major', isRevealed: true },
      { time: '다음날', event: '시약 분실 발견', participants: ['char-006-1'], location: 'loc-006-1', importance: 'critical', isRevealed: true }
    ],

    solution: {
      summary: '장민재가 불법 폭죽을 만들어 팔기 위해 화학 시약을 훔쳤다.',
      detailedExplanation: [
        '장민재는 가정 형편이 어려워 돈을 벌고 싶었다.',
        '화학 지식을 이용해 폭죽을 만들어 SNS로 판매하려 함.',
        '과학부 활동 시간을 이용해 시약을 빼돌렸다.',
        '위험한 범죄로 이어질 수 있는 심각한 사안.',
        '시약 장부, 출입 기록, SNS 게시물이 결정적 증거.'
      ],
      keyEvidence: ['evidence-006-1', 'evidence-006-2', 'evidence-006-4', 'evidence-006-5'],
      howToSolve: [
        '시약 장부에서 누락된 물질을 확인한다',
        '출입 기록에서 단독 사용자를 확인한다',
        'SNS 검색으로 동기를 파악한다',
        '가방과 사물함에서 물증을 확보한다'
      ],
      commonMistakes: [
        '테러 목적으로 오해함',
        '외부 침입자로 생각함'
      ]
    },

    deductionKeywords: {
      who: ['장민재', '과학부'],
      why: ['돈', '판매', '폭죽', '불법'],
      how: ['과학부 활동', '단독 사용'],
      when: ['17:00', '방과 후'],
      where: ['화학실험실', '시약 보관함']
    },

    tags: ['화학실험실', '시약', '불법제조', '청소년 범죄'],
    author: 'DEDUCTIO',
    version: '1.0'
  },

  // ============ THEFT-007: 교무실의 시험지 ============
  {
    id: 'theft-007',
    title: '교무실의 시험지',
    subtitle: '유출된 기말고사',
    type: 'theft',
    difficulty: 'medium',
    estimatedTime: 25,

    prologue: [
      '기말고사 시험지가 유출되었다.',
      '누군가 교무실에 침입했다.',
      '성적을 위해 무엇이든 하는 학생.'
    ],
    introduction: [
      '기말고사를 일주일 앞둔 시점.',
      '수학 시험지가 학생들 사이에서 돌고 있다는 제보가 들어왔다.',
      '교무실 컴퓨터에서 시험지가 유출된 것으로 보인다.'
    ],
    setting: '한빛고등학교 교무실',

    crimeTime: '21:00',
    crimeLocation: '교무실',
    culpritId: 'char-007-3',
    victimId: undefined,
    motive: '성적 압박',
    motiveDetail: '부모님의 극심한 성적 압박으로 어떻게든 좋은 성적을 받아야 함',
    method: '야간 자율학습 중 침입',
    methodDetail: '야간 자율학습 시간에 몰래 교무실에 침입하여 USB로 시험지 복사',

    characters: [
      {
        id: 'char-007-1',
        name: '최정민',
        role: 'witness',
        age: 45,
        gender: 'male',
        occupation: '수학 교사',
        personality: '엄격하지만 공정함',
        appearance: '안경을 쓴 날카로운 인상의 남성',
        background: '15년차 수학 교사, 시험 출제 담당',
        alibi: {
          location: '자택',
          time: '20:00-',
          activity: '퇴근 후 휴식',
          witnesses: ['가족'],
          hasHole: false
        },
        relationships: [],
        secrets: [],
        dialogues: [
          { topic: '시험지', lines: ['제 컴퓨터에서 유출된 게 맞습니다.', 'USB 흔적이 남아있더라고요.'], revealsInfo: 'USB 사용 흔적' },
          { topic: '교무실', lines: ['저녁에는 잠겨있어야 하는데...', '야자 시간에 누가 들어왔나 봐요.'], revealsInfo: '침입 시간대' }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-007-2',
        name: '박지영',
        role: 'witness',
        age: 17,
        gender: 'female',
        occupation: '학생 (반장)',
        personality: '정의감이 강하고 성실함',
        appearance: '교복을 단정히 입은 여학생',
        background: '3년 내내 반장, 모범생',
        alibi: {
          location: '교실',
          time: '19:00-22:00',
          activity: '야간 자율학습',
          witnesses: ['담임 선생님'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-007-3', type: '같은 반', description: '같은 반 학생', isSecret: false }
        ],
        secrets: [
          { id: 'secret-007-1', content: '윤성호가 야자 중에 자리를 비운 것을 봤음', importance: 'critical', revealCondition: '야자 시간에 대해 물을 때' }
        ],
        dialogues: [
          { topic: '시험지', lines: ['시험지가 돌고 있다는 건 알아요.', '누가 그런 짓을 했는지...'], revealsInfo: '유출 인지' },
          { topic: '윤성호', lines: ['성호요? 야자 시간에 화장실 간다고 나갔어요.', '근데 30분은 넘게 없었던 것 같아요.'], revealsInfo: '알리바이 허점' }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-007-3',
        name: '윤성호',
        role: 'culprit',
        age: 17,
        gender: 'male',
        occupation: '학생',
        personality: '압박에 약하고 불안정함',
        appearance: '다크서클이 짙은 피곤해 보이는 남학생',
        background: '부모님의 극심한 성적 압박, 성적이 떨어지면 혼남',
        alibi: {
          location: '교실',
          time: '19:00-22:00',
          activity: '야간 자율학습',
          witnesses: ['없음 (중간에 이탈)'],
          hasHole: true,
          holeDetail: '21:00경 30분 이상 자리를 비움'
        },
        motive: {
          type: 'fear',
          description: '부모님의 극심한 성적 압박으로 이번 시험에서 반드시 좋은 성적이 필요',
          strength: 3
        },
        relationships: [],
        secrets: [
          { id: 'secret-007-2', content: 'USB로 시험지를 복사해 친구들에게 판매', importance: 'critical', revealCondition: 'USB 또는 판매 증거 확보' }
        ],
        dialogues: [
          { topic: '시험지', lines: ['저는 모르는 일이에요.', '...저도 돌아다니는 건 봤지만.'], revealsInfo: '회피' },
          { topic: '야자', lines: ['화장실 갔다 왔어요.', '...배탈이 나서요.'], revealsInfo: '변명' },
          { topic: '성적', lines: ['...부모님이 무서워요.', '이번에 떨어지면 진짜 큰일나요.'], revealsInfo: '동기 노출', requiresEvidence: ['evidence-007-4'] }
        ],
        nervousTriggers: ['USB', '교무실', '21시', '판매', '부모님']
      },
      {
        id: 'char-007-4',
        name: '김태준',
        role: 'witness',
        age: 17,
        gender: 'male',
        occupation: '학생',
        personality: '털털하고 솔직함',
        appearance: '편한 복장의 남학생',
        background: '성호와 같은 반, 시험지를 구매한 학생 중 하나',
        alibi: {
          location: '교실',
          time: '19:00-22:00',
          activity: '야간 자율학습',
          witnesses: ['다른 학생들'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-007-3', type: '같은 반', description: '같은 반 친구', isSecret: false }
        ],
        secrets: [
          { id: 'secret-007-3', content: '성호에게 3만원 주고 시험지를 샀음', importance: 'critical', revealCondition: '강하게 추궁하면 자백' }
        ],
        dialogues: [
          { topic: '시험지', lines: ['...네, 저도 샀어요.', '성호가 팔길래...'], revealsInfo: '판매 확인', requiresEvidence: ['evidence-007-3'] },
          { topic: '가격', lines: ['3만원이었어요.', '성호가 직접 복사해온 거라고...'], revealsInfo: '직접 범행 확인' }
        ],
        nervousTriggers: []
      }
    ],

    evidence: [
      {
        id: 'evidence-007-1',
        name: 'USB 접속 로그',
        type: 'digital',
        description: '교무실 컴퓨터 USB 접속 기록',
        detailedDescription: '21:15에 USB가 연결되어 "기말고사_수학.hwp" 파일이 복사됨.',
        location: '교무실',
        foundAt: 'loc-007-1',
        linkedCharacters: [],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: true,
        analysisResult: '21:15에 파일 복사 확인'
      },
      {
        id: 'evidence-007-2',
        name: '교무실 CCTV',
        type: 'digital',
        description: '교무실 복도 CCTV 영상',
        detailedDescription: '21:10에 교복을 입은 남학생이 교무실에 들어가 21:20에 나옴. 얼굴은 모자로 가림.',
        location: '보안실',
        foundAt: 'loc-007-3',
        linkedCharacters: ['char-007-3'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: true,
        analysisResult: '체형이 윤성호와 유사'
      },
      {
        id: 'evidence-007-3',
        name: '유출된 시험지',
        type: 'physical',
        description: '학생들 사이에 돌아다니는 시험지',
        detailedDescription: '수학 기말고사 시험지 복사본. 출처를 추적하면 윤성호에게 닿음.',
        location: '학생들',
        foundAt: 'loc-007-2',
        linkedCharacters: ['char-007-3'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-007-4',
        name: '윤성호 USB',
        type: 'physical',
        description: '윤성호의 개인 USB',
        detailedDescription: 'USB 안에 "기말고사_수학.hwp" 파일이 저장되어 있음.',
        location: '윤성호 필통',
        foundAt: 'loc-007-2',
        linkedCharacters: ['char-007-3'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-007-5',
        name: '카카오톡 대화',
        type: 'digital',
        description: '윤성호와 구매자들의 대화 기록',
        detailedDescription: '"시험지 있는데 3만원" "진짜임?" "교무실에서 직접 복사함" 등의 대화.',
        location: '김태준 핸드폰',
        foundAt: 'loc-007-2',
        linkedCharacters: ['char-007-3', 'char-007-4'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      }
    ],

    locations: [
      {
        id: 'loc-007-1',
        name: '교무실',
        description: '선생님들의 업무 공간',
        atmosphere: '책상과 컴퓨터가 줄지어 있다',
        objects: [
          { id: 'obj-1', name: '최정민 교사 컴퓨터', description: '수학 교사의 컴퓨터', examinationResult: 'USB 접속 로그 확인', containsEvidence: 'evidence-007-1' }
        ],
        connectedTo: ['loc-007-3']
      },
      {
        id: 'loc-007-2',
        name: '교실',
        description: '학생들의 교실',
        atmosphere: '책상과 의자가 줄지어 있다',
        objects: [
          { id: 'obj-2', name: '윤성호 필통', description: '필기구와 USB', examinationResult: 'USB에 시험지 파일', containsEvidence: 'evidence-007-4', isLocked: true, unlockMethod: '본인 동의 또는 강력한 증거' },
          { id: 'obj-3', name: '유출 시험지', description: '돌아다니는 복사본', examinationResult: '출처 추적 가능', containsEvidence: 'evidence-007-3' }
        ],
        connectedTo: ['loc-007-1']
      },
      {
        id: 'loc-007-3',
        name: '보안실',
        description: 'CCTV 관제실',
        atmosphere: '모니터가 여러 대 있다',
        objects: [
          { id: 'obj-4', name: 'CCTV', description: '교무실 복도 영상', examinationResult: '침입자 포착', containsEvidence: 'evidence-007-2' }
        ],
        connectedTo: ['loc-007-1']
      }
    ],

    timeline: [
      { time: '19:00', event: '야간 자율학습 시작', participants: ['char-007-2', 'char-007-3', 'char-007-4'], location: 'loc-007-2', importance: 'minor', isRevealed: true },
      { time: '21:00', event: '윤성호 자리 이탈', participants: ['char-007-3'], location: 'loc-007-2', importance: 'critical', isRevealed: false },
      { time: '21:10', event: '교무실 침입', participants: ['char-007-3'], location: 'loc-007-1', importance: 'critical', isRevealed: false },
      { time: '21:15', event: '시험지 복사', participants: ['char-007-3'], location: 'loc-007-1', importance: 'critical', isRevealed: false },
      { time: '21:20', event: '교무실 이탈', participants: ['char-007-3'], location: 'loc-007-1', importance: 'critical', isRevealed: false },
      { time: '21:30', event: '윤성호 교실 복귀', participants: ['char-007-3'], location: 'loc-007-2', importance: 'major', isRevealed: false },
      { time: '다음날', event: '시험지 유출 발각', participants: [], location: 'loc-007-2', importance: 'critical', isRevealed: true }
    ],

    solution: {
      summary: '윤성호가 성적 압박으로 야자 시간에 교무실에 침입하여 시험지를 훔쳐 판매했다.',
      detailedExplanation: [
        '윤성호는 부모님의 극심한 성적 압박에 시달리고 있었다.',
        '야간 자율학습 시간에 화장실 핑계로 빠져나와 교무실에 침입.',
        'USB로 시험지 파일을 복사한 뒤 친구들에게 판매.',
        '3만원씩 받고 여러 학생에게 팔았다.',
        'USB 로그, CCTV, 카톡 대화가 결정적 증거.'
      ],
      keyEvidence: ['evidence-007-1', 'evidence-007-2', 'evidence-007-4', 'evidence-007-5'],
      howToSolve: [
        'USB 접속 로그에서 시간대를 확인한다',
        'CCTV에서 침입자를 확인한다',
        '시험지 유통 경로를 추적한다',
        '구매자를 심문하여 판매자를 특정한다',
        'USB에서 물증을 확보한다'
      ],
      commonMistakes: [
        '교사 내부자를 의심함',
        '해킹으로 오해함'
      ]
    },

    deductionKeywords: {
      who: ['윤성호', '학생'],
      why: ['성적', '압박', '부모님', '돈'],
      how: ['USB', '야자', '침입'],
      when: ['21:00', '야간 자율학습'],
      where: ['교무실', '컴퓨터']
    },

    tags: ['시험지', '유출', '성적 압박', '야자'],
    author: 'DEDUCTIO',
    version: '1.0'
  },

  // ============ THEFT-008: 음악실의 명기 ============
  {
    id: 'theft-008',
    title: '음악실의 명기',
    subtitle: '사라진 바이올린',
    type: 'theft',
    difficulty: 'medium',
    estimatedTime: 30,

    prologue: [
      '100년 된 명품 바이올린이 사라졌다.',
      '음악실은 잠겨 있었다.',
      '누가 이 귀한 악기를 노렸는가.'
    ],
    introduction: [
      '한빛고등학교 음악실.',
      '교장 선생님이 기증한 100년 된 명품 바이올린이 사라졌다.',
      '이 바이올린은 학교의 보물이었다.'
    ],
    setting: '한빛고등학교 음악실',

    crimeTime: '18:30',
    crimeLocation: '음악실 악기 보관실',
    culpritId: 'char-008-3',
    victimId: undefined,
    motive: '절박함과 욕망',
    motiveDetail: '바이올린 콩쿠르에 나가기 위해 좋은 악기가 필요했고, 부모님은 사줄 형편이 안 됨',
    method: '연습 후 숨어있다 절도',
    methodDetail: '연습 후 악기실에 숨어있다가 모두가 떠난 뒤 바이올린을 챙겨 창문으로 탈출',

    characters: [
      {
        id: 'char-008-1',
        name: '김민정',
        role: 'witness',
        age: 40,
        gender: 'female',
        occupation: '음악 교사',
        personality: '예술적이고 학생들을 아낌',
        appearance: '우아한 분위기의 여성',
        background: '전직 오케스트라 바이올리니스트, 15년째 음악 교사',
        alibi: {
          location: '학교 밖 공연장',
          time: '18:00-21:00',
          activity: '외부 공연',
          witnesses: ['공연 관계자'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-008-3', type: '사제', description: '재능 있는 제자', isSecret: false }
        ],
        secrets: [],
        dialogues: [
          { topic: '바이올린', lines: ['그 바이올린은 시가 5천만원이 넘어요.', '교장 선생님이 직접 기증하신 거죠.'], revealsInfo: '바이올린 가치' },
          { topic: '음악실', lines: ['열쇠는 저만 가지고 있어요.', '...근데 창문이 좀 오래돼서 잠금이 불안해요.'], revealsInfo: '창문 취약점' }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-008-2',
        name: '박서준',
        role: 'witness',
        age: 18,
        gender: 'male',
        occupation: '오케스트라부 부장',
        personality: '책임감 있고 리더십이 있음',
        appearance: '첼로를 들고 다니는 점잖은 남학생',
        background: '오케스트라부 부장, 첼로 전공',
        alibi: {
          location: '음악실',
          time: '17:00-18:00',
          activity: '연습 후 정리',
          witnesses: ['오케스트라부원들'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-008-3', type: '오케스트라부 동료', description: '같은 부원', isSecret: false }
        ],
        secrets: [
          { id: 'secret-008-1', content: '채연이가 그 바이올린에 집착하는 걸 알고 있음', importance: 'major', revealCondition: '채연에 대해 물을 때' }
        ],
        dialogues: [
          { topic: '바이올린', lines: ['그 바이올린 정말 소리가 좋았어요.', '만져볼 기회가 거의 없었지만요.'], revealsInfo: '바이올린 접근 제한' },
          { topic: '이채연', lines: ['채연이요? 바이올린에 미친 애예요.', '그 바이올린으로 연습하고 싶다고 항상 말했죠.'], revealsInfo: '채연의 집착' }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-008-3',
        name: '이채연',
        role: 'culprit',
        age: 17,
        gender: 'female',
        occupation: '오케스트라부 바이올린 파트',
        personality: '재능 있지만 예민하고 집착이 강함',
        appearance: '바이올린 케이스를 항상 들고 다니는 소녀',
        background: '바이올린 신동이었으나 집안 사정으로 좋은 악기를 가지지 못함',
        alibi: {
          location: '음악실',
          time: '17:00-18:00',
          activity: '연습',
          witnesses: ['오케스트라부원들 (18시까지만)'],
          hasHole: true,
          holeDetail: '18시 이후 행적 불분명'
        },
        motive: {
          type: 'jealousy',
          description: '다가오는 콩쿠르에서 좋은 결과를 내려면 좋은 악기가 필요. 부모님은 형편이 안 됨.',
          strength: 3
        },
        relationships: [],
        secrets: [
          { id: 'secret-008-2', content: '연습 후 악기실에 숨어있다가 바이올린을 훔침', importance: 'critical', revealCondition: 'CCTV 또는 바이올린 발견' }
        ],
        dialogues: [
          { topic: '바이올린', lines: ['그 바이올린... 정말 소리가 좋았어요.', '제 것은 너무 낡아서...'], revealsInfo: '욕망 암시' },
          { topic: '연습', lines: ['연습하고 바로 집에 갔어요.', '...아무것도 몰라요.'], revealsInfo: '부정' },
          { topic: '콩쿠르', lines: ['한 달 뒤에 콩쿠르가 있어요.', '좋은 악기만 있으면 우승할 수 있는데...'], revealsInfo: '동기', requiresEvidence: ['evidence-008-3'] }
        ],
        nervousTriggers: ['악기', '집', '콩쿠르', '창문', '숨어']
      }
    ],

    evidence: [
      {
        id: 'evidence-008-1',
        name: '열린 창문',
        type: 'physical',
        description: '음악실 뒷창문',
        detailedDescription: '창문이 열려있고, 창틀에 작은 천 조각이 걸려있다. 교복 재질과 유사.',
        location: '음악실',
        foundAt: 'loc-008-1',
        linkedCharacters: [],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: true,
        analysisResult: '천 조각은 여학생 교복 재질'
      },
      {
        id: 'evidence-008-2',
        name: '음악실 CCTV',
        type: 'digital',
        description: '음악실 복도 CCTV 영상',
        detailedDescription: '18:00에 모두 나가는 것처럼 보이나, 이채연이 나가는 모습이 없음. 18:40에 창문 쪽에서 인기척.',
        location: '보안실',
        foundAt: 'loc-008-3',
        linkedCharacters: ['char-008-3'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: true,
        analysisResult: '이채연 퇴실 기록 없음'
      },
      {
        id: 'evidence-008-3',
        name: '콩쿠르 신청서',
        type: 'document',
        description: '이채연의 콩쿠르 참가 신청서',
        detailedDescription: '전국 바이올린 콩쿠르 참가 신청. 한 달 뒤 대회 예정.',
        location: '음악 교무실',
        foundAt: 'loc-008-2',
        linkedCharacters: ['char-008-3'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-008-4',
        name: '이채연 집에서 발견된 바이올린',
        type: 'physical',
        description: '이채연 방에 있던 바이올린',
        detailedDescription: '학교 기증품 바이올린. 케이스에 학교 마크가 있음.',
        location: '이채연 자택',
        foundAt: 'loc-008-4',
        linkedCharacters: ['char-008-3'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      },
      {
        id: 'evidence-008-5',
        name: '찢어진 교복',
        type: 'physical',
        description: '이채연 교복 치마',
        detailedDescription: '치마 뒷부분이 약간 찢어져 있음. 창문 천 조각과 일치.',
        location: '이채연 사물함',
        foundAt: 'loc-008-2',
        linkedCharacters: ['char-008-3'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: true,
        analysisResult: '창문 천 조각과 재질, 색상 일치'
      }
    ],

    locations: [
      {
        id: 'loc-008-1',
        name: '음악실',
        description: '각종 악기와 연습 공간이 있는 음악실',
        atmosphere: '악보와 악기들이 정돈되어 있다',
        objects: [
          { id: 'obj-1', name: '뒷창문', description: '열려있는 창문', examinationResult: '천 조각 발견', containsEvidence: 'evidence-008-1' }
        ],
        connectedTo: ['loc-008-2', 'loc-008-3']
      },
      {
        id: 'loc-008-2',
        name: '음악 교무실/사물함',
        description: '음악 교사의 교무실과 학생 사물함',
        atmosphere: '악보와 서류가 정리되어 있다',
        objects: [
          { id: 'obj-2', name: '콩쿠르 신청서', description: '참가 신청 서류', examinationResult: '이채연 신청 확인', containsEvidence: 'evidence-008-3' },
          { id: 'obj-3', name: '이채연 사물함', description: '개인 사물함', examinationResult: '찢어진 교복', containsEvidence: 'evidence-008-5', isLocked: true, unlockMethod: '본인 동의 또는 강력한 증거' }
        ],
        connectedTo: ['loc-008-1']
      },
      {
        id: 'loc-008-3',
        name: '보안실',
        description: 'CCTV 관제실',
        atmosphere: '모니터가 여러 대 있다',
        objects: [
          { id: 'obj-4', name: 'CCTV', description: '음악실 복도 영상', examinationResult: '이채연 퇴실 기록 없음', containsEvidence: 'evidence-008-2' }
        ],
        connectedTo: ['loc-008-1']
      },
      {
        id: 'loc-008-4',
        name: '이채연 자택',
        description: '이채연이 거주하는 집',
        atmosphere: '소박한 아파트',
        objects: [
          { id: 'obj-5', name: '바이올린', description: '방에 놓인 바이올린', examinationResult: '학교 기증품!', containsEvidence: 'evidence-008-4' }
        ],
        connectedTo: []
      }
    ],

    timeline: [
      { time: '17:00', event: '오케스트라부 연습 시작', participants: ['char-008-2', 'char-008-3'], location: 'loc-008-1', importance: 'minor', isRevealed: true },
      { time: '18:00', event: '연습 종료, 부원들 퇴장', participants: ['char-008-2'], location: 'loc-008-1', importance: 'major', isRevealed: true },
      { time: '18:00', event: '이채연 악기실에 숨음', participants: ['char-008-3'], location: 'loc-008-1', importance: 'critical', isRevealed: false },
      { time: '18:30', event: '바이올린 절취', participants: ['char-008-3'], location: 'loc-008-1', importance: 'critical', isRevealed: false },
      { time: '18:40', event: '창문으로 탈출', participants: ['char-008-3'], location: 'loc-008-1', importance: 'critical', isRevealed: false },
      { time: '다음날', event: '바이올린 분실 발견', participants: ['char-008-1'], location: 'loc-008-1', importance: 'critical', isRevealed: true }
    ],

    solution: {
      summary: '이채연이 콩쿠르를 위해 명품 바이올린을 훔쳤다. 연습 후 악기실에 숨어있다가 범행.',
      detailedExplanation: [
        '이채연은 바이올린 신동이었으나 집안 형편이 어려워 좋은 악기가 없었다.',
        '다가오는 콩쿠르에서 좋은 성적을 내려면 좋은 악기가 필수라고 생각.',
        '연습 후 악기실에 숨어있다가 모두 떠난 뒤 바이올린을 훔침.',
        '창문으로 탈출하면서 교복이 찢어짐.',
        'CCTV 퇴실 기록 부재, 창문 천 조각, 교복 손상이 결정적 증거.'
      ],
      keyEvidence: ['evidence-008-1', 'evidence-008-2', 'evidence-008-3', 'evidence-008-5'],
      howToSolve: [
        '침입 경로를 확인한다 (창문)',
        'CCTV에서 퇴실하지 않은 사람을 확인한다',
        '콩쿠르 일정에서 동기를 파악한다',
        '창문 천 조각과 교복을 대조한다',
        '자택 수색으로 바이올린을 발견한다'
      ],
      commonMistakes: [
        '외부 도둑으로 생각함',
        '교사를 의심함'
      ]
    },

    deductionKeywords: {
      who: ['이채연', '바이올린', '오케스트라'],
      why: ['콩쿠르', '악기', '형편', '욕망'],
      how: ['숨어있다', '창문', '탈출'],
      when: ['18:30', '저녁'],
      where: ['음악실', '악기실']
    },

    tags: ['음악실', '바이올린', '악기', '콩쿠르', '절박함'],
    author: 'DEDUCTIO',
    version: '1.0'
  },

  // ============ THEFT-009: 방송실의 장비 ============
  {
    id: 'theft-009',
    title: '방송실의 장비',
    subtitle: '유튜버의 욕망',
    type: 'theft',
    difficulty: 'easy',
    estimatedTime: 20,

    prologue: [
      '고가의 방송 장비가 사라졌다.',
      '방송부원 중 누군가의 소행.',
      '유명해지고 싶은 욕망이 범죄를 낳았다.'
    ],
    introduction: [
      '한빛고등학교 방송실.',
      '학교 축제를 위해 새로 구입한 고가의 카메라와 마이크가 사라졌다.',
      '방송실 열쇠는 방송부원들만 가지고 있었다.'
    ],
    setting: '한빛고등학교 방송실',

    crimeTime: '16:00',
    crimeLocation: '방송실 장비실',
    culpritId: 'char-009-3',
    victimId: undefined,
    motive: '개인적 욕망',
    motiveDetail: '유튜브 채널을 시작하고 싶었으나 장비가 없어서, 학교 장비를 개인용으로 사용하려 함',
    method: '방과 후 절도',
    methodDetail: '방과 후 방송실에 혼자 남아 장비를 가방에 넣어 가져감',

    characters: [
      {
        id: 'char-009-1',
        name: '정현우',
        role: 'witness',
        age: 35,
        gender: 'male',
        occupation: '방송부 담당 교사',
        personality: '창의적이고 학생들과 친함',
        appearance: '캐주얼한 복장의 젊은 교사',
        background: '전직 PD, 5년째 방송부 담당',
        alibi: {
          location: '회의실',
          time: '15:30-17:00',
          activity: '축제 준비 회의',
          witnesses: ['다른 교사들'],
          hasHole: false
        },
        relationships: [],
        secrets: [],
        dialogues: [
          { topic: '장비', lines: ['카메라가 200만원, 마이크가 50만원이에요.', '축제용으로 새로 산 건데...'], revealsInfo: '장비 가치' },
          { topic: '열쇠', lines: ['방송부원 5명이 열쇠를 가지고 있어요.', '방과 후 자유롭게 사용하라고요.'], revealsInfo: '접근 가능자' }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-009-2',
        name: '김하늘',
        role: 'witness',
        age: 17,
        gender: 'female',
        occupation: '방송부 부장',
        personality: '책임감 있고 꼼꼼함',
        appearance: '방송부 점퍼를 입은 활발한 여학생',
        background: '방송부 부장, 진행과 연출 담당',
        alibi: {
          location: '방송실',
          time: '15:00-15:30',
          activity: '장비 점검',
          witnesses: ['방송부원들'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-009-3', type: '방송부 동료', description: '같은 부원이나 최근 갈등', isSecret: true }
        ],
        secrets: [
          { id: 'secret-009-1', content: '송현이 유튜브 하고 싶다고 장비 빌려달라 했으나 거절했음', importance: 'major', revealCondition: '송현에 대해 물을 때' }
        ],
        dialogues: [
          { topic: '장비', lines: ['제가 마지막으로 점검했을 때는 있었어요.', '3시 반쯤이었을 거예요.'], revealsInfo: '마지막 목격' },
          { topic: '조송현', lines: ['송현이요? 유튜브 하고 싶다고 장비 빌려달라 했었어요.', '학교 거라서 안 된다고 했는데 좀 삐쳤더라고요.'], revealsInfo: '동기' }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-009-3',
        name: '조송현',
        role: 'culprit',
        age: 16,
        gender: 'male',
        occupation: '방송부 부원',
        personality: '욕심이 많고 충동적임',
        appearance: '셀카를 자주 찍는 트렌디한 남학생',
        background: '유튜버가 꿈, SNS 활동에 열심',
        alibi: {
          location: '방송실',
          time: '15:30-16:30',
          activity: '편집 작업',
          witnesses: ['없음 (혼자)'],
          hasHole: true,
          holeDetail: '혼자 남아있었음'
        },
        motive: {
          type: 'greed',
          description: '유튜브 채널을 시작하고 싶었으나 장비 살 돈이 없어서 학교 장비를 가져가기로 결심',
          strength: 2
        },
        relationships: [],
        secrets: [
          { id: 'secret-009-2', content: '장비를 집으로 가져가 유튜브 촬영에 사용', importance: 'critical', revealCondition: '집 수색 또는 유튜브 확인' }
        ],
        dialogues: [
          { topic: '장비', lines: ['저요? 전 편집만 하고 나왔어요.', '장비는 안 건드렸는데요.'], revealsInfo: '부정' },
          { topic: '유튜브', lines: ['유튜브요? 네, 하고 싶죠.', '장비가 없어서 못 하고 있어요.'], revealsInfo: '동기 노출' },
          { topic: '혼자', lines: ['잠깐 혼자 있었어요.', '...편집 마무리하느라.'], revealsInfo: '기회' }
        ],
        nervousTriggers: ['유튜브', '집', '장비', '가방', '촬영']
      }
    ],

    evidence: [
      {
        id: 'evidence-009-1',
        name: '빈 장비함',
        type: 'physical',
        description: '카메라와 마이크가 있던 장비함',
        detailedDescription: '비어있는 장비함. 카메라, 마이크, 삼각대가 사라짐.',
        location: '방송실',
        foundAt: 'loc-009-1',
        linkedCharacters: [],
        isCritical: false,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-009-2',
        name: '방송실 CCTV',
        type: 'digital',
        description: '방송실 복도 CCTV',
        detailedDescription: '16:15에 조송현이 큰 가방을 들고 나가는 모습. 들어갈 때보다 가방이 불룩함.',
        location: '보안실',
        foundAt: 'loc-009-2',
        linkedCharacters: ['char-009-3'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      },
      {
        id: 'evidence-009-3',
        name: '조송현 유튜브 채널',
        type: 'digital',
        description: '조송현이 개설한 유튜브 채널',
        detailedDescription: '어제 밤 업로드된 영상. 학교 장비와 동일한 카메라, 마이크로 촬영됨.',
        location: '인터넷',
        foundAt: 'loc-009-3',
        linkedCharacters: ['char-009-3'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: true,
        analysisResult: '영상 장비가 학교 것과 동일'
      },
      {
        id: 'evidence-009-4',
        name: '조송현 집에서 발견된 장비',
        type: 'physical',
        description: '조송현 방에 있던 촬영 장비',
        detailedDescription: '학교 방송실 장비. 학교 자산 스티커가 붙어있음.',
        location: '조송현 자택',
        foundAt: 'loc-009-4',
        linkedCharacters: ['char-009-3'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      }
    ],

    locations: [
      {
        id: 'loc-009-1',
        name: '방송실',
        description: '각종 방송 장비가 있는 공간',
        atmosphere: '모니터와 믹서가 설치되어 있다',
        objects: [
          { id: 'obj-1', name: '장비함', description: '비어있는 장비 보관함', examinationResult: '장비 도난 확인', containsEvidence: 'evidence-009-1' }
        ],
        connectedTo: ['loc-009-2']
      },
      {
        id: 'loc-009-2',
        name: '보안실',
        description: 'CCTV 관제실',
        atmosphere: '모니터가 여러 대 있다',
        objects: [
          { id: 'obj-2', name: 'CCTV', description: '방송실 복도 영상', examinationResult: '송현 퇴실 시 큰 가방', containsEvidence: 'evidence-009-2' }
        ],
        connectedTo: ['loc-009-1']
      },
      {
        id: 'loc-009-3',
        name: '인터넷',
        description: '조송현의 유튜브 채널',
        atmosphere: '온라인 공간',
        objects: [
          { id: 'obj-3', name: '유튜브 영상', description: '최근 업로드된 영상', examinationResult: '학교 장비로 촬영', containsEvidence: 'evidence-009-3' }
        ],
        connectedTo: []
      },
      {
        id: 'loc-009-4',
        name: '조송현 자택',
        description: '조송현이 거주하는 집',
        atmosphere: '촬영 장비가 설치된 방',
        objects: [
          { id: 'obj-4', name: '촬영 장비', description: '카메라와 마이크', examinationResult: '학교 자산 스티커!', containsEvidence: 'evidence-009-4' }
        ],
        connectedTo: []
      }
    ],

    timeline: [
      { time: '15:00', event: '방송부 활동 시작', participants: ['char-009-2', 'char-009-3'], location: 'loc-009-1', importance: 'minor', isRevealed: true },
      { time: '15:30', event: '김하늘 장비 점검 후 퇴실', participants: ['char-009-2'], location: 'loc-009-1', importance: 'major', isRevealed: true },
      { time: '15:30', event: '조송현 혼자 남음', participants: ['char-009-3'], location: 'loc-009-1', importance: 'critical', isRevealed: false },
      { time: '16:00', event: '장비 절취', participants: ['char-009-3'], location: 'loc-009-1', importance: 'critical', isRevealed: false },
      { time: '16:15', event: '조송현 가방 들고 퇴실', participants: ['char-009-3'], location: 'loc-009-1', importance: 'critical', isRevealed: false },
      { time: '다음날', event: '장비 분실 발견', participants: ['char-009-1'], location: 'loc-009-1', importance: 'critical', isRevealed: true }
    ],

    solution: {
      summary: '조송현이 유튜브를 위해 방송 장비를 훔쳐 집으로 가져갔다.',
      detailedExplanation: [
        '조송현은 유튜버가 되고 싶었으나 장비를 살 돈이 없었다.',
        '학교 장비를 빌려달라고 했으나 거절당함.',
        '방과 후 혼자 남아 장비를 가방에 넣어 가져갔다.',
        '집에서 유튜브 영상을 촬영해 업로드까지 함.',
        'CCTV 영상과 유튜브 채널이 결정적 증거.'
      ],
      keyEvidence: ['evidence-009-2', 'evidence-009-3', 'evidence-009-4'],
      howToSolve: [
        'CCTV에서 가방 크기 변화를 확인한다',
        '유튜브 검색으로 송현 채널을 찾는다',
        '영상 장비가 학교 것인지 확인한다',
        '자택 수색으로 물증을 확보한다'
      ],
      commonMistakes: [
        '외부인 침입으로 생각함',
        '장비 판매 목적으로 오해함'
      ]
    },

    deductionKeywords: {
      who: ['조송현', '방송부'],
      why: ['유튜브', '장비', '욕망'],
      how: ['가방', '혼자', '퇴실'],
      when: ['16:00', '방과 후'],
      where: ['방송실', '장비실']
    },

    tags: ['방송실', '유튜브', '장비', '욕망'],
    author: 'DEDUCTIO',
    version: '1.0'
  },

  // ============ THEFT-010: 기숙사의 현금 ============
  {
    id: 'theft-010',
    title: '기숙사의 현금',
    subtitle: '룸메이트를 의심하다',
    type: 'theft',
    difficulty: 'medium',
    estimatedTime: 25,

    prologue: [
      '기숙사에서 현금이 계속 사라진다.',
      '방 안에서 벌어지는 범죄.',
      '가장 가까운 사람이 범인일 수 있다.'
    ],
    introduction: [
      '한빛고등학교 기숙사.',
      '한 달 새 여러 방에서 현금 도난 신고가 접수되었다.',
      '모두 잠긴 방에서 일어난 일이었다.'
    ],
    setting: '한빛고등학교 기숙사',

    crimeTime: '새벽 2:00',
    crimeLocation: '기숙사 여러 방',
    culpritId: 'char-010-3',
    victimId: 'char-010-1',
    motive: '도박 빚',
    motiveDetail: '온라인 도박에 빠져 빚이 쌓였고, 갚기 위해 기숙사 친구들의 돈을 훔침',
    method: '마스터키 복제',
    methodDetail: '사감 선생님의 마스터키를 몰래 복제하여 새벽에 여러 방을 돌며 현금 절취',

    characters: [
      {
        id: 'char-010-1',
        name: '한지훈',
        role: 'victim',
        age: 17,
        gender: 'male',
        occupation: '기숙사생',
        personality: '털털하고 친화력이 좋음',
        appearance: '운동을 좋아하는 건강한 남학생',
        background: '지방 출신 기숙사생, 용돈을 아껴 모으는 중',
        alibi: {
          location: '기숙사 방',
          time: '22:00-07:00',
          activity: '수면',
          witnesses: ['룸메이트'],
          hasHole: false
        },
        relationships: [
          { targetId: 'char-010-3', type: '같은 층', description: '기숙사 같은 층', isSecret: false }
        ],
        secrets: [],
        dialogues: [
          { topic: '도난', lines: ['지갑에 5만원 있었는데 없어졌어요.', '분명 책상 서랍에 뒀는데...'], revealsInfo: '피해 상황' },
          { topic: '의심', lines: ['누가 그랬는지 모르겠어요.', '룸메이트는 아닐 거예요, 같이 자니까.'], revealsInfo: '룸메이트 배제' }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-010-2',
        name: '류승민',
        role: 'witness',
        age: 55,
        gender: 'male',
        occupation: '기숙사 사감',
        personality: '엄격하지만 학생들을 아낌',
        appearance: '교련복 같은 복장의 근엄한 중년 남성',
        background: '10년째 기숙사 사감, 마스터키 관리',
        alibi: {
          location: '사감실',
          time: '22:00-06:00',
          activity: '순찰 및 휴식',
          witnesses: ['순찰 기록'],
          hasHole: false
        },
        relationships: [],
        secrets: [
          { id: 'secret-010-1', content: '한 달 전 마스터키를 잠시 잃어버린 적 있음', importance: 'critical', revealCondition: '열쇠에 대해 추궁할 때' }
        ],
        dialogues: [
          { topic: '도난', lines: ['잠긴 방에서 어떻게... 이해가 안 가요.', '마스터키는 제가 관리하는데...'], revealsInfo: '잠금 상태' },
          { topic: '마스터키', lines: ['...사실 한 달 전에 잠깐 잃어버린 적 있어요.', '30분 만에 찾긴 했는데... 복제됐을 수도.'], revealsInfo: '열쇠 복제 가능성' }
        ],
        nervousTriggers: []
      },
      {
        id: 'char-010-3',
        name: '강태양',
        role: 'culprit',
        age: 18,
        gender: 'male',
        occupation: '기숙사생',
        personality: '겉으로는 밝으나 속으로 힘들어함',
        appearance: '항상 스마트폰을 보는 남학생',
        background: '도박에 빠져 빚이 쌓인 상태',
        alibi: {
          location: '기숙사 방',
          time: '22:00-07:00',
          activity: '수면',
          witnesses: ['룸메이트 (깊이 잠)'],
          hasHole: true,
          holeDetail: '룸메이트가 깊이 자서 외출 여부 모름'
        },
        motive: {
          type: 'greed',
          description: '온라인 도박 빚 200만원을 갚기 위해 기숙사 친구들 돈을 훔침',
          strength: 3
        },
        relationships: [],
        secrets: [
          { id: 'secret-010-2', content: '마스터키를 복제하여 새벽에 여러 방 침입', importance: 'critical', revealCondition: '복제 열쇠 발견 또는 도박 빚 확인' }
        ],
        dialogues: [
          { topic: '도난', lines: ['저도 피해자예요.', '제 방에서도 2만원 없어졌다고요.'], revealsInfo: '자작극 암시' },
          { topic: '도박', lines: ['...그냥 게임이에요.', '돈은 안 걸어요.'], revealsInfo: '회피', requiresEvidence: ['evidence-010-4'] },
          { topic: '마스터키', lines: ['그건 왜요?', '...저랑 무슨 상관이에요?'], revealsInfo: '민감 반응' }
        ],
        nervousTriggers: ['도박', '빚', '열쇠', '새벽', '복제']
      }
    ],

    evidence: [
      {
        id: 'evidence-010-1',
        name: '피해 목록',
        type: 'document',
        description: '도난 피해 신고 목록',
        detailedDescription: '한 달간 5개 방에서 총 25만원 도난. 모두 같은 층, 잠긴 방에서 발생.',
        location: '사감실',
        foundAt: 'loc-010-2',
        linkedCharacters: [],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 1,
        analysisRequired: false
      },
      {
        id: 'evidence-010-2',
        name: '복제 열쇠',
        type: 'physical',
        description: '강태양 소지품에서 발견된 열쇠',
        detailedDescription: '마스터키와 동일한 형태의 새 열쇠. 최근 복제된 것으로 보임.',
        location: '강태양 가방',
        foundAt: 'loc-010-1',
        linkedCharacters: ['char-010-3'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      },
      {
        id: 'evidence-010-3',
        name: '새벽 CCTV',
        type: 'digital',
        description: '기숙사 복도 CCTV',
        detailedDescription: '새벽 2시에 후드를 쓴 남학생이 여러 방을 드나드는 모습. 체형이 강태양과 유사.',
        location: '사감실',
        foundAt: 'loc-010-2',
        linkedCharacters: ['char-010-3'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: true,
        analysisResult: '체형과 걸음걸이가 강태양과 일치'
      },
      {
        id: 'evidence-010-4',
        name: '도박 사이트 접속 기록',
        type: 'digital',
        description: '강태양 핸드폰 인터넷 기록',
        detailedDescription: '불법 온라인 도박 사이트 접속 기록. 누적 손실 200만원 이상.',
        location: '강태양 핸드폰',
        foundAt: 'loc-010-1',
        linkedCharacters: ['char-010-3'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 3,
        analysisRequired: false
      },
      {
        id: 'evidence-010-5',
        name: '현금 뭉치',
        type: 'physical',
        description: '강태양 사물함에서 발견된 현금',
        detailedDescription: '15만원의 현금. 용돈 수준을 넘는 금액.',
        location: '강태양 사물함',
        foundAt: 'loc-010-1',
        linkedCharacters: ['char-010-3'],
        isCritical: true,
        isRedHerring: false,
        discoveryDifficulty: 2,
        analysisRequired: false
      }
    ],

    locations: [
      {
        id: 'loc-010-1',
        name: '기숙사 (강태양 방)',
        description: '강태양이 생활하는 기숙사 방',
        atmosphere: '2인실 구조, 책상과 침대가 있다',
        objects: [
          { id: 'obj-1', name: '강태양 가방', description: '개인 가방', examinationResult: '복제 열쇠 발견', containsEvidence: 'evidence-010-2', isLocked: true, unlockMethod: '본인 동의 또는 강력한 증거' },
          { id: 'obj-2', name: '강태양 사물함', description: '개인 사물함', examinationResult: '현금 발견', containsEvidence: 'evidence-010-5', isLocked: true, unlockMethod: '본인 동의 또는 강력한 증거' }
        ],
        connectedTo: ['loc-010-2']
      },
      {
        id: 'loc-010-2',
        name: '사감실',
        description: '사감 선생님의 사무실',
        atmosphere: 'CCTV 모니터와 열쇠 보관함이 있다',
        objects: [
          { id: 'obj-3', name: '피해 신고 목록', description: '도난 기록', examinationResult: '패턴 분석 가능', containsEvidence: 'evidence-010-1' },
          { id: 'obj-4', name: 'CCTV', description: '복도 영상', examinationResult: '새벽 침입자 포착', containsEvidence: 'evidence-010-3' }
        ],
        connectedTo: ['loc-010-1']
      }
    ],

    timeline: [
      { time: '한 달 전', event: '사감 마스터키 분실 및 회수', participants: ['char-010-2'], location: 'loc-010-2', importance: 'critical', isRevealed: false },
      { time: '한 달 전', event: '강태양 열쇠 복제', participants: ['char-010-3'], location: '외부', importance: 'critical', isRevealed: false },
      { time: '새벽 2:00', event: '강태양 방 이탈', participants: ['char-010-3'], location: 'loc-010-1', importance: 'critical', isRevealed: false },
      { time: '새벽 2:10-2:30', event: '여러 방 침입 및 절도', participants: ['char-010-3'], location: '기숙사 복도', importance: 'critical', isRevealed: false },
      { time: '새벽 2:35', event: '방 복귀', participants: ['char-010-3'], location: 'loc-010-1', importance: 'critical', isRevealed: false },
      { time: '다음날', event: '도난 신고', participants: ['char-010-1'], location: 'loc-010-2', importance: 'critical', isRevealed: true }
    ],

    solution: {
      summary: '강태양이 도박 빚을 갚기 위해 마스터키를 복제하여 새벽에 여러 방을 돌며 현금을 훔쳤다.',
      detailedExplanation: [
        '강태양은 온라인 도박에 빠져 200만원 이상의 빚이 쌓였다.',
        '한 달 전 사감이 마스터키를 잠시 잃어버린 틈에 복제.',
        '새벽 시간에 복제 열쇠로 여러 방을 돌며 현금을 훔침.',
        '자신도 피해자인 척하여 의심을 피하려 함.',
        '복제 열쇠, CCTV 영상, 도박 기록이 결정적 증거.'
      ],
      keyEvidence: ['evidence-010-2', 'evidence-010-3', 'evidence-010-4', 'evidence-010-5'],
      howToSolve: [
        '피해 패턴을 분석한다 (같은 층, 잠긴 방)',
        '마스터키 분실 이력을 확인한다',
        '새벽 CCTV를 확인한다',
        '도박 빚 등 동기를 파악한다',
        '소지품에서 복제 열쇠를 발견한다'
      ],
      commonMistakes: [
        '룸메이트를 의심함',
        '외부 침입자로 생각함'
      ]
    },

    deductionKeywords: {
      who: ['강태양', '기숙사생'],
      why: ['도박', '빚', '돈'],
      how: ['마스터키', '복제', '새벽'],
      when: ['새벽 2시'],
      where: ['기숙사', '복도']
    },

    tags: ['기숙사', '현금', '도박', '열쇠 복제'],
    author: 'DEDUCTIO',
    version: '1.0'
  }
];

export default theftScenariosPart2;
