import {
  Case, Character, Evidence, Location, TimelineEvent,
  CaseType, Difficulty
} from '../types';
import {
  KOREAN_NAMES, OCCUPATIONS, PERSONALITIES, MOTIVES,
  LOCATIONS, CASE_TEMPLATES, DIALOGUE_TEMPLATES,
  EVIDENCE_TEMPLATES, DIFFICULTY_SETTINGS
} from '../data/gameData';
import { generateId, randomChoice, randomInt, randomSample, shuffleArray } from '../utils/helpers';

export class CaseGenerator {
  private difficulty: Difficulty;
  private caseType: CaseType;
  private settings: typeof DIFFICULTY_SETTINGS.medium;

  constructor(difficulty: Difficulty, caseType?: CaseType) {
    this.difficulty = difficulty;
    this.caseType = caseType || randomChoice(['theft', 'vandalism', 'mystery', 'disappearance'] as CaseType[]);
    this.settings = DIFFICULTY_SETTINGS[difficulty];
  }

  generate(): Case {
    const caseId = generateId();
    const template = CASE_TEMPLATES[this.caseType];
    const title = randomChoice(template.titles);
    const targetItem = randomChoice(template.items);

    // 캐릭터 생성
    const suspectCount = randomInt(this.settings.suspectCount.min, this.settings.suspectCount.max);
    const characters = this.generateCharacters(suspectCount);

    // 범인 선정 (첫 번째 캐릭터는 피해자/신고자, 나머지 중 랜덤)
    const culpritIndex = randomInt(1, characters.length - 1);
    const culprit = characters[culpritIndex];
    culprit.isCulprit = true;

    // 동기 부여
    const motive = randomChoice(MOTIVES[this.caseType]);
    culprit.motive = motive;

    // 알리바이에 빈틈 추가
    culprit.alibi.hasHole = true;
    culprit.alibi.holeDetail = this.generateAlibiHole();

    // 장소 생성
    const locations = this.generateLocations();

    // 증거 생성
    const evidenceCount = randomInt(this.settings.evidenceCount.min, this.settings.evidenceCount.max);
    const evidence = this.generateEvidence(evidenceCount, culprit.id, locations);

    // 미끼 증거 추가
    const redHerrings = this.generateRedHerrings(this.settings.redHerringCount, characters, locations);
    evidence.push(...redHerrings);

    // 타임라인 생성
    const timeline = this.generateTimeline(characters);

    // 비밀 생성
    this.assignSecrets(characters, evidence);

    // 대화 생성
    this.generateDialogues(characters);

    // 장소에 증거 배치
    this.placeEvidenceInLocations(evidence, locations);

    const caseData: Case = {
      id: caseId,
      title: `${title}: ${targetItem.name}`,
      type: this.caseType,
      difficulty: this.difficulty,
      summary: `${targetItem.description}이(가) ${this.caseType === 'theft' ? '도난당했습니다' :
                this.caseType === 'vandalism' ? '훼손되었습니다' :
                this.caseType === 'disappearance' ? '사라졌습니다' : '문제가 생겼습니다'}.`,
      introduction: this.generateIntroduction(targetItem, characters[0]),
      characters,
      evidence: shuffleArray(evidence),
      locations,
      timeline,
      culpritId: culprit.id,
      victimId: characters[0].isVictim ? characters[0].id : null,
      motive,
      method: this.generateMethod(this.caseType),
      solution: {
        explanation: this.generateSolutionExplanation(culprit, motive, targetItem),
        keyEvidence: evidence.filter(e => e.isCritical && !e.isRedHerring).map(e => e.id),
        timeline: this.generateSolutionTimeline(culprit)
      }
    };

    // Knox 10계명 검증
    this.validateKnoxRules(caseData);

    return caseData;
  }

  private generateCharacters(count: number): Character[] {
    const characters: Character[] = [];
    const usedNames: string[] = [];
    const occupations = shuffleArray([...OCCUPATIONS.school]);

    for (let i = 0; i < count; i++) {
      const gender = Math.random() > 0.5 ? 'male' : 'female';
      const names = KOREAN_NAMES[gender];

      let name = randomChoice(names);
      while (usedNames.includes(name)) {
        name = randomChoice(names);
      }
      usedNames.push(name);

      const occupation = occupations[i % occupations.length];
      const personality = randomChoice(PERSONALITIES);
      const age = occupation.id === 'teacher' || occupation.id === 'counselor' || occupation.id === 'janitor'
        ? randomInt(30, 50)
        : randomInt(15, 18);

      characters.push({
        id: generateId(),
        name,
        age,
        gender,
        occupation: occupation.name,
        personality: personality.name,
        description: `${personality.traits.join(', ')} 성격의 ${occupation.name}`,
        alibi: {
          location: randomChoice(['교실', '도서관', '복도', '급식실', '운동장']),
          time: '사건 발생 시각',
          activity: this.generateAlibiActivity(occupation.id),
          hasHole: false
        },
        motive: null,
        secrets: [],
        isVictim: i === 0,
        isCulprit: false,
        dialogues: {}
      });
    }

    return characters;
  }

  private generateAlibiActivity(occupation: string): string {
    const activities: Record<string, string[]> = {
      student: ['수업을 듣고 있었어요', '친구와 이야기하고 있었어요', '숙제를 하고 있었어요', '점심을 먹고 있었어요'],
      classPresident: ['반 회의를 진행하고 있었어요', '선생님 심부름을 하고 있었어요', '공지사항을 전달하고 있었어요'],
      clubLeader: ['동아리 활동 중이었어요', '동아리 회의를 하고 있었어요', '대회 준비를 하고 있었어요'],
      libraryHelper: ['도서 정리를 하고 있었어요', '대출 업무를 보고 있었어요', '서가를 정리하고 있었어요'],
      studentCouncil: ['학생회 회의 중이었어요', '행사 준비를 하고 있었어요', '학생회실에 있었어요'],
      teacher: ['수업 준비를 하고 있었어요', '채점을 하고 있었어요', '회의 중이었어요'],
      counselor: ['상담 중이었어요', '기록 정리를 하고 있었어요', '학부모와 통화 중이었어요'],
      janitor: ['청소를 하고 있었어요', '시설 점검 중이었어요', '수리를 하고 있었어요']
    };

    return randomChoice(activities[occupation] || activities.student);
  }

  private generateAlibiHole(): string {
    const holes = [
      '하지만 그 시간에 그곳에서 목격한 사람이 없다',
      '알리바이를 증명해줄 증인이 사건과 관련이 있다',
      '알리바이 장소와 사건 현장 사이를 이동할 시간이 충분했다',
      '알리바이 시간에 빈틈이 있다',
      '알리바이를 뒷받침하는 물증이 없다'
    ];
    return randomChoice(holes);
  }

  private generateLocations(): Location[] {
    const locationData = LOCATIONS.school;
    const selectedLocations = randomSample(locationData, randomInt(4, 6));

    return selectedLocations.map((loc, index) => ({
      id: generateId(),
      name: loc.name,
      description: loc.description,
      objects: loc.objects.map(obj => ({
        ...obj,
        id: generateId(),
        containsEvidence: null,
        isExamined: false
      })),
      connectedTo: selectedLocations
        .filter((_, i) => i !== index)
        .slice(0, 2)
        .map(l => l.name)
    }));
  }

  private generateEvidence(count: number, culpritId: string, locations: Location[]): Evidence[] {
    const evidence: Evidence[] = [];
    const templates = [
      ...EVIDENCE_TEMPLATES.physical,
      ...EVIDENCE_TEMPLATES.testimony,
      ...EVIDENCE_TEMPLATES.document
    ];

    // 최소 2개의 결정적 증거 생성 (범인과 연결)
    for (let i = 0; i < Math.min(3, count); i++) {
      const template = templates[i % templates.length];
      evidence.push({
        id: generateId(),
        name: template.name,
        type: i < 2 ? 'physical' : 'testimony',
        description: template.description,
        location: randomChoice(locations).name,
        linkedCharacters: [culpritId],
        isRedHerring: false,
        isCollected: false,
        isCritical: true
      });
    }

    // 나머지 증거 생성
    for (let i = 3; i < count; i++) {
      const template = randomChoice(templates);
      const type: 'physical' | 'testimony' | 'document' =
        Math.random() > 0.6 ? 'physical' : Math.random() > 0.5 ? 'testimony' : 'document';

      evidence.push({
        id: generateId(),
        name: `${template.name} #${i - 2}`,
        type,
        description: template.description,
        location: randomChoice(locations).name,
        linkedCharacters: [],
        isRedHerring: false,
        isCollected: false,
        isCritical: false
      });
    }

    return evidence;
  }

  private generateRedHerrings(count: number, characters: Character[], locations: Location[]): Evidence[] {
    const redHerrings: Evidence[] = [];
    const innocentCharacters = characters.filter(c => !c.isCulprit && !c.isVictim);

    for (let i = 0; i < count; i++) {
      const linkedChar = innocentCharacters.length > 0 ? randomChoice(innocentCharacters) : null;
      redHerrings.push({
        id: generateId(),
        name: `수상한 ${randomChoice(['메모', '흔적', '물건', '증언'])} #${i + 1}`,
        type: randomChoice(['physical', 'testimony', 'document']),
        description: '언뜻 보면 중요해 보이지만, 사건과 직접적인 관련이 없다.',
        location: randomChoice(locations).name,
        linkedCharacters: linkedChar ? [linkedChar.id] : [],
        isRedHerring: true,
        isCollected: false,
        isCritical: false
      });
    }

    return redHerrings;
  }

  private generateTimeline(characters: Character[]): TimelineEvent[] {
    const events: TimelineEvent[] = [];
    const times = ['08:00', '09:30', '10:00', '11:30', '12:00', '13:30', '14:00', '15:30', '16:00'];

    for (let i = 0; i < times.length; i++) {
      const participants = randomSample(characters.map(c => c.id), randomInt(1, 3));
      events.push({
        id: generateId(),
        time: times[i],
        description: this.generateTimelineDescription(i === 4),
        participants,
        location: randomChoice(['교실', '복도', '도서관', '급식실']),
        isKeyEvent: i === 4, // 사건 발생 시점
        isRevealed: i < 3 // 처음 몇 개만 공개
      });
    }

    return events;
  }

  private generateTimelineDescription(isKeyEvent: boolean): string {
    if (isKeyEvent) {
      return '이 시간에 사건이 발생한 것으로 추정됨';
    }

    const descriptions = [
      '평범한 일과가 진행됨',
      '여러 학생들이 오가는 모습이 목격됨',
      '특별한 이상 없이 시간이 흐름',
      '일부 학생들이 이동하는 모습이 보임'
    ];
    return randomChoice(descriptions);
  }

  private assignSecrets(characters: Character[], evidence: Evidence[]): void {
    const nonVictimChars = characters.filter(c => !c.isVictim);

    for (const char of nonVictimChars) {
      if (Math.random() > 0.4 || char.isCulprit) {
        const secretContent = char.isCulprit
          ? `사건 당시 ${char.alibi.location}에 없었다는 것을 알고 있다`
          : randomChoice([
            '다른 사람에게 말하지 못한 비밀이 있다',
            '누군가와 특별한 관계가 있다',
            '사건과 관련된 것을 목격했다',
            '숨기고 싶은 과거가 있다'
          ]);

        const relatedEvidence = evidence
          .filter(() => Math.random() > 0.7)
          .slice(0, 2)
          .map(e => e.id);

        char.secrets.push({
          id: generateId(),
          content: secretContent,
          isRevealed: false,
          requiredEvidence: relatedEvidence
        });
      }
    }
  }

  private generateDialogues(characters: Character[]): void {
    for (const char of characters) {
      char.dialogues = {
        greeting: [randomChoice(DIALOGUE_TEMPLATES.greeting)],
        alibi: [
          DIALOGUE_TEMPLATES.alibi[0]
            .replace('{activity}', char.alibi.activity)
            .replace('{time}', char.alibi.time)
            .replace('{location}', char.alibi.location)
            .replace('{witness}', '친구')
        ],
        relationship: [
          `다른 사람들과는 그냥 평범한 사이예요.`,
          char.isCulprit ? '모든 사람들과 잘 지내는 편이에요.' : '특별히 친한 사람은 많지 않아요.'
        ],
        incident: [
          char.isVictim
            ? '제가 발견했을 때 정말 놀랐어요...'
            : char.isCulprit
              ? '저는 그 시간에 다른 곳에 있었어요.'
              : '저도 나중에 들었어요. 정말 놀라운 일이네요.'
        ],
        suspicious: char.isCulprit
          ? [randomChoice(DIALOGUE_TEMPLATES.nervous)]
          : [randomChoice(DIALOGUE_TEMPLATES.helpful)]
      };

      // 비밀 관련 대화
      if (char.secrets.length > 0) {
        char.dialogues.secret = [
          DIALOGUE_TEMPLATES.secretReveal[0].replace('{secret}', char.secrets[0].content)
        ];
      }
    }
  }

  private placeEvidenceInLocations(evidence: Evidence[], locations: Location[]): void {
    for (const ev of evidence) {
      const location = locations.find(l => l.name === ev.location);
      if (location && location.objects.length > 0) {
        const availableObjects = location.objects.filter(o => !o.containsEvidence);
        if (availableObjects.length > 0) {
          const obj = randomChoice(availableObjects);
          obj.containsEvidence = ev.id;
          obj.examinationResult = `${obj.examinationResult} [${ev.name}을(를) 발견했다!]`;
        }
      }
    }
  }

  private generateIntroduction(targetItem: { name: string; description: string }, reporter: Character): string[] {
    return [
      `${reporter.name}: "큰일났어요! ${targetItem.name}이(가) 사라졌어요!"`,
      `당신은 이 사건을 해결하기 위해 호출되었습니다.`,
      `${targetItem.description}`,
      `용의자들을 심문하고 증거를 수집하여 진범을 찾아내세요.`,
      `주의: 모든 용의자는 거짓말을 할 수 있습니다.`
    ];
  }

  private generateMethod(caseType: CaseType): string {
    const methods: Record<CaseType, string[]> = {
      theft: ['몰래 가져감', '다른 물건으로 교체', '공범과 협력'],
      vandalism: ['직접 파손', '도구를 사용한 훼손', '우연을 가장함'],
      mystery: ['협박 편지 작성', '소문 유포', '증거 조작'],
      disappearance: ['은닉', '파기', '이동']
    };
    return randomChoice(methods[caseType]);
  }

  private generateSolutionExplanation(culprit: Character, motive: string, targetItem: { name: string }): string {
    return `범인은 ${culprit.name}입니다. ${culprit.occupation}인 ${culprit.name}은(는) ${motive}는 동기로 ${targetItem.name}을(를) 표적으로 삼았습니다. ${culprit.alibi.holeDetail}는 점이 결정적인 단서였습니다.`;
  }

  private generateSolutionTimeline(culprit: Character): string[] {
    return [
      `${culprit.name}은(는) 사전에 계획을 세웠다.`,
      `알리바이를 위장하기 위해 ${culprit.alibi.location}에 있는 척했다.`,
      `틈을 타 범행을 저질렀다.`,
      `현장을 정리하고 아무 일 없던 듯 돌아왔다.`
    ];
  }

  private validateKnoxRules(caseData: Case): void {
    // Knox 10계명 검증
    const culprit = caseData.characters.find(c => c.id === caseData.culpritId)!;

    // 1. 범인은 초반에 등장해야 함
    if (caseData.timeline.length > 0) {
      const firstEvents = caseData.timeline.slice(0, Math.ceil(caseData.timeline.length / 2));
      const culpritAppearsEarly = firstEvents.some(e => e.participants.includes(culprit.id));
      if (!culpritAppearsEarly) {
        caseData.timeline[0].participants.push(culprit.id);
      }
    }

    // 2. 최소 2개의 결정적 증거
    const criticalEvidence = caseData.evidence.filter(e => e.isCritical && !e.isRedHerring);
    if (criticalEvidence.length < 2) {
      console.warn('Warning: Less than 2 critical evidences');
    }

    // 3. 최소 1개의 범인과 연결된 증거
    const linkedToCulprit = caseData.evidence.filter(e => e.linkedCharacters.includes(culprit.id));
    if (linkedToCulprit.length < 1) {
      caseData.evidence[0].linkedCharacters.push(culprit.id);
    }

    // 4. 범인의 알리바이에 빈틈이 있어야 함
    if (!culprit.alibi.hasHole) {
      culprit.alibi.hasHole = true;
      culprit.alibi.holeDetail = '증인이 없다';
    }
  }
}
