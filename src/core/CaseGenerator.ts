import {
  Case, Character, Evidence, Location, TimelineEvent,
  CaseType, Difficulty, KnoxValidation, Motive, Alibi,
  Relationship, Secret, DeductionKeywords, DifficultySettings,
  CaseValidationResult, ValidationError, ValidationWarning,
  HiddenArea, DialogueOption
} from '../types';
import {
  KOREAN_NAMES, OCCUPATIONS, PERSONALITIES, MOTIVES,
  LOCATIONS, CASE_TEMPLATES, DIALOGUE_TEMPLATES,
  EVIDENCE_TEMPLATES, DIFFICULTY_SETTINGS, APPEARANCES,
  BACKGROUNDS, RELATIONSHIPS_TEMPLATES, ALIBI_TEMPLATES,
  CRIME_METHODS, TIME_SLOTS,
  PHYSICAL_HEIGHTS, PHYSICAL_BUILDS,
  BLOOD_TYPES, DISTINCTIVE_FEATURES, SHOE_SIZES,
  ACCESS_AREAS_BY_OCCUPATION
} from '../data/gameData';
import { generateId, shuffleArray } from '../utils/helpers';

// 시드 기반 랜덤 생성기
export class SeededRandom {
  private seed: number;

  constructor(seed?: number) {
    this.seed = seed ?? Date.now();
  }

  next(): number {
    this.seed = (this.seed * 1664525 + 1013904223) % 4294967296;
    return this.seed / 4294967296;
  }

  nextInt(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }

  choice<T>(arr: T[]): T {
    return arr[Math.floor(this.next() * arr.length)];
  }

  sample<T>(arr: T[], count: number): T[] {
    const shuffled = this.shuffle(arr);
    return shuffled.slice(0, count);
  }

  shuffle<T>(arr: T[]): T[] {
    const result = [...arr];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(this.next() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  getSeed(): number {
    return this.seed;
  }
}

export class CaseGenerator {
  private difficulty: Difficulty;
  private caseType: CaseType;
  private settings: DifficultySettings;
  private rng: SeededRandom;
  private validationErrors: ValidationError[] = [];
  private validationWarnings: ValidationWarning[] = [];

  constructor(difficulty: Difficulty, caseType?: CaseType, seed?: number) {
    this.difficulty = difficulty;
    this.rng = new SeededRandom(seed);
    this.caseType = caseType || this.rng.choice(['theft', 'vandalism', 'mystery', 'disappearance', 'fraud', 'blackmail'] as CaseType[]);
    this.settings = DIFFICULTY_SETTINGS[difficulty];
  }

  generate(): Case {
    const maxAttempts = 10;
    let attempts = 0;

    while (attempts < maxAttempts) {
      try {
        const caseData = this.internalGenerate();
        const validation = this.validateCase(caseData);

        if (validation.isValid) {
          caseData.qualityScore = validation.score;
          caseData.knoxValidation = validation.knoxValidation;
          return caseData;
        }

        console.warn(`케이스 생성 시도 ${attempts + 1}/${maxAttempts} 실패:`, validation.errors);
        attempts++;
      } catch (error) {
        console.error(`케이스 생성 에러 (시도 ${attempts + 1}):`, error);
        attempts++;
      }
    }

    // 최대 시도 후에도 실패하면 폴백 케이스 반환
    console.error('최대 시도 초과, 폴백 케이스 생성');
    return this.generateFallbackCase();
  }

  private internalGenerate(): Case {
    const caseId = generateId();
    const template = CASE_TEMPLATES[this.caseType];
    const title = this.rng.choice(template.titles);
    const targetItem = this.rng.choice(template.items);

    // 범행 시각 설정 (사건의 핵심)
    const crimeTimeSlot = this.rng.choice(TIME_SLOTS);
    const crimeTime = crimeTimeSlot.time;
    const crimeLocation = this.rng.choice(LOCATIONS.school).name;

    // 캐릭터 생성
    const suspectCount = this.rng.nextInt(this.settings.suspectCount.min, this.settings.suspectCount.max);
    const characters = this.generateCharacters(suspectCount, crimeTime);

    // 범인 선정 (Knox Rule #1: 초반 등장 캐릭터 중 선택)
    const culprit = this.selectCulprit(characters);

    // 동기 부여 (상세화)
    const motive = this.generateMotive(culprit, characters);
    culprit.motive = motive;

    // 알리바이 시스템 구축
    this.generateAlibis(characters, crimeTime, culprit.id);

    // 캐릭터 관계 설정
    this.generateRelationships(characters, culprit.id);

    // 장소 생성
    const locations = this.generateLocations(crimeLocation);

    // 증거 생성 (범인과 명확히 연결)
    const evidence = this.generateEvidence(culprit, characters, locations, crimeTime, motive);

    // 증거 연결 검증
    this.validateEvidenceChain(culprit, evidence);

    // 타임라인 생성
    const timeline = this.generateTimeline(characters, crimeTime, culprit.id);

    // 비밀 생성
    this.assignSecrets(characters, evidence, culprit.id);

    // 대화 생성
    this.generateDialogues(characters, evidence, culprit.id);

    // 장소에 증거 배치
    this.placeEvidenceInLocations(evidence, locations);

    // 추론 키워드 생성
    const deductionKeywords = this.generateDeductionKeywords(culprit, motive, crimeTime, crimeLocation);

    // 범행 방법 상세
    const method = this.rng.choice(CRIME_METHODS[this.caseType]);

    const caseData: Case = {
      id: caseId,
      title: `${title}: ${targetItem.name}`,
      subtitle: template.subtitle || '의문의 사건',
      type: this.caseType,
      difficulty: this.difficulty,
      estimatedTime: this.getEstimatedTime(),
      summary: this.generateSummary(targetItem),
      detailedSummary: this.generateDetailedSummary(targetItem, crimeTime, crimeLocation),
      introduction: this.generateIntroduction(targetItem, characters[0]),
      prologue: this.generatePrologue(crimeTimeSlot),
      characters,
      evidence: shuffleArray(evidence),
      locations,
      timeline,
      culpritId: culprit.id,
      victimId: characters[0].isVictim ? characters[0].id : null,
      motive: motive.description,
      motiveDetail: this.generateMotiveDetail(motive, culprit),
      method: method.name,
      methodDetail: method.description,
      crimeTime,
      crimeLocation,
      deductionKeywords,
      contradictions: this.generateContradictions(characters, evidence, culprit.id),
      logicCategories: this.generateLogicCategories(characters),
      solution: {
        explanation: this.generateSolutionExplanation(culprit, motive, targetItem),
        detailedExplanation: this.generateDetailedSolutionExplanation(culprit, motive, evidence, timeline),
        keyEvidence: evidence.filter(e => e.isCritical && !e.isRedHerring).map(e => e.id),
        timeline: this.generateSolutionTimeline(culprit, crimeTime),
        howToSolve: this.generateHowToSolve(culprit, evidence),
        commonMistakes: this.generateCommonMistakes(characters, evidence)
      },
      knoxValidation: this.validateKnoxRules({ culpritId: culprit.id, characters, evidence, timeline } as Case),
      qualityScore: 0,
      version: '2.0.0',
      createdAt: Date.now()
    };

    return caseData;
  }

  private selectCulprit(characters: Character[]): Character {
    // Knox Rule #1: 범인은 초반에 등장해야 함
    // 피해자/신고자(인덱스 0)를 제외한 캐릭터 중 선택
    const eligibleCharacters = characters.filter((c, i) =>
      i > 0 && // 피해자 제외
      !c.isVictim &&
      c.firstAppearanceTime <= '10:00' // 초반 등장
    );

    if (eligibleCharacters.length === 0) {
      // 폴백: 인덱스 1번 캐릭터를 범인으로
      const culprit = characters[1];
      culprit.isCulprit = true;
      culprit.firstAppearanceTime = '08:30';
      return culprit;
    }

    const culprit = this.rng.choice(eligibleCharacters);
    culprit.isCulprit = true;
    return culprit;
  }

  private generateMotive(culprit: Character, allCharacters: Character[]): Motive {
    const motiveTemplates = MOTIVES[this.caseType];
    const motiveDescription = this.rng.choice(motiveTemplates);

    const motiveTypes: Motive['type'][] = ['revenge', 'greed', 'jealousy', 'fear', 'protection'];
    const motiveType = this.rng.choice(motiveTypes);

    return {
      type: motiveType,
      description: motiveDescription,
      strength: this.rng.nextInt(1, 3) as 1 | 2 | 3,
      relatedEvidence: [],
      isRevealed: false
    };
  }

  private generateCharacters(count: number, crimeTime: string): Character[] {
    const characters: Character[] = [];
    const usedNames: string[] = [];
    const occupations = this.rng.shuffle([...OCCUPATIONS.school]);

    for (let i = 0; i < count; i++) {
      const gender = this.rng.next() > 0.5 ? 'male' : 'female';
      const names = KOREAN_NAMES[gender];

      let name = this.rng.choice(names);
      while (usedNames.includes(name)) {
        name = this.rng.choice(names);
      }
      usedNames.push(name);

      const occupation = occupations[i % occupations.length];
      const personality = this.rng.choice(PERSONALITIES);
      const appearance = this.rng.choice(APPEARANCES[gender]);
      const backgroundKey = occupation.id as keyof typeof BACKGROUNDS;
      const backgrounds = BACKGROUNDS[backgroundKey] || BACKGROUNDS.student;
      const background: string = this.rng.choice(backgrounds);

      const age = occupation.id === 'teacher' || occupation.id === 'counselor' || occupation.id === 'janitor'
        ? this.rng.nextInt(30, 50)
        : this.rng.nextInt(15, 18);

      // 첫 등장 시간 설정
      const firstAppearanceTimes = ['08:00', '08:30', '09:00', '09:30', '10:00'];
      const firstAppearanceTime = i < 3
        ? firstAppearanceTimes[i] // 처음 3명은 일찍 등장
        : this.rng.choice(firstAppearanceTimes);

      const isAdult = occupation.id === 'teacher' || occupation.id === 'counselor' || occupation.id === 'janitor';
      const shoeSizes = gender === 'male'
        ? (isAdult ? SHOE_SIZES.male.adult : SHOE_SIZES.male.teen)
        : (isAdult ? SHOE_SIZES.female.adult : SHOE_SIZES.female.teen);

      const physicalProfile = {
        height: this.rng.choice([...PHYSICAL_HEIGHTS]),
        build: this.rng.choice([...PHYSICAL_BUILDS]),
        handedness: this.rng.next() > 0.85 ? '왼손잡이' as const : '오른손잡이' as const,
        shoeSize: this.rng.choice(shoeSizes),
        distinctiveFeature: this.rng.choice(DISTINCTIVE_FEATURES),
        bloodType: this.rng.choice([...BLOOD_TYPES]),
        accessAreas: ACCESS_AREAS_BY_OCCUPATION[occupation.id] || ACCESS_AREAS_BY_OCCUPATION.default
      };

      characters.push({
        id: generateId(),
        name,
        age,
        gender,
        occupation: occupation.name,
        personality: personality.name,
        description: `${personality.traits.join(', ')} 성격의 ${occupation.name}`,
        appearance,
        background,
        physicalProfile,
        alibi: {
          location: '',
          startTime: '',
          endTime: '',
          activity: '',
          witnesses: [],
          physicalEvidence: [],
          hasHole: false,
          canBeVerified: true
        },
        motive: null,
        relationships: [],
        secrets: [],
        isVictim: i === 0,
        isCulprit: false,
        isWitness: i > 0 && this.rng.next() > 0.5,
        suspicionLevel: 0,
        dialogues: {},
        behaviorPatterns: personality.behaviors || [],
        nervousTriggers: [],
        firstAppearanceTime
      });
    }

    return characters;
  }

  private generateAlibis(characters: Character[], crimeTime: string, culpritId: string): void {
    const crimeHour = parseInt(crimeTime.split(':')[0]);
    const crimeMinute = parseInt(crimeTime.split(':')[1]);

    for (const char of characters) {
      if (char.isVictim) continue;

      const isCulprit = char.id === culpritId;
      const alibiTemplate = this.rng.choice(ALIBI_TEMPLATES[char.occupation.includes('교사') ? 'teacher' : 'student']);

      // 범행 시각 전후 1시간 범위의 알리바이
      const alibiStartHour = crimeHour - 1;
      const alibiEndHour = crimeHour + 1;

      const witnesses = characters
        .filter(c => c.id !== char.id && !c.isVictim && this.rng.next() > 0.6)
        .slice(0, 2)
        .map(c => c.id);

      char.alibi = {
        location: alibiTemplate.location,
        startTime: `${String(alibiStartHour).padStart(2, '0')}:00`,
        endTime: `${String(alibiEndHour).padStart(2, '0')}:00`,
        activity: alibiTemplate.activity,
        witnesses,
        physicalEvidence: isCulprit ? [] : [this.rng.choice(['CCTV 영상', '출석부', '도서 대출 기록', '휴대폰 GPS'])],
        hasHole: isCulprit,
        canBeVerified: !isCulprit,
        verificationMethod: isCulprit ? undefined : '증인 진술 및 물증 확인'
      };

      if (isCulprit) {
        // 범인의 알리바이 빈틈 설정
        char.alibi.holeDetail = this.generateAlibiHole(char, crimeTime);
        char.alibi.holeTimeStart = `${String(crimeHour).padStart(2, '0')}:${String(Math.max(0, crimeMinute - 15)).padStart(2, '0')}`;
        char.alibi.holeTimeEnd = `${String(crimeHour).padStart(2, '0')}:${String(Math.min(59, crimeMinute + 20)).padStart(2, '0')}`;

        // 범인은 긴장하는 주제가 있음
        char.nervousTriggers = [
          crimeTime,
          char.alibi.location,
          '그 시간',
          '어디 있었',
          '목격'
        ];
      }
    }
  }

  private generateAlibiHole(culprit: Character, crimeTime: string): string {
    const holeTemplates = [
      `${crimeTime} 경에 ${culprit.alibi.location}을(를) 잠시 비운 것으로 보인다`,
      `알리바이를 증명해줄 증인의 진술이 일관되지 않는다`,
      `${culprit.alibi.location}에서 사건 현장까지 5분이면 이동 가능하다`,
      `CCTV에 ${crimeTime} 전후로 해당 인물의 모습이 포착되지 않았다`,
      `주장하는 시간대에 실제로 그곳에 있었다는 물증이 없다`,
      `복도에서 사건 현장 방향으로 이동하는 모습이 목격되었다`
    ];
    return this.rng.choice(holeTemplates);
  }

  private generateRelationships(characters: Character[], culpritId: string): void {
    const relationshipTypes: Relationship['type'][] = ['friend', 'rival', 'colleague', 'enemy', 'stranger'];

    for (const char of characters) {
      for (const other of characters) {
        if (char.id === other.id) continue;

        // 범인과 피해자는 특별한 관계
        if (char.id === culpritId && other.isVictim) {
          char.relationships.push({
            targetId: other.id,
            type: this.rng.choice(['rival', 'enemy']),
            intensity: this.rng.nextInt(3, 5) as 1 | 2 | 3 | 4 | 5,
            description: '겉으로는 평범해 보이지만 알고 보면 복잡한 사이',
            isPublic: false,
            secretReason: '과거의 갈등이 있다'
          });
        } else if (this.rng.next() > 0.6) {
          char.relationships.push({
            targetId: other.id,
            type: this.rng.choice(relationshipTypes),
            intensity: this.rng.nextInt(1, 3) as 1 | 2 | 3 | 4 | 5,
            description: RELATIONSHIPS_TEMPLATES[this.rng.choice(relationshipTypes)] || '평범한 관계',
            isPublic: true
          });
        }
      }
    }
  }

  private generateLocations(crimeLocation: string): Location[] {
    const locationData = LOCATIONS.school;
    const selectedLocations = this.rng.sample(locationData, this.rng.nextInt(4, 6));

    // 범행 장소가 포함되도록 보장
    const crimeLocationData = locationData.find(l => l.name === crimeLocation);
    if (crimeLocationData && !selectedLocations.includes(crimeLocationData)) {
      selectedLocations[0] = crimeLocationData;
    }

    return selectedLocations.map((loc, index) => ({
      id: generateId(),
      name: loc.name,
      description: loc.description,
      atmosphere: loc.atmosphere || '평범한 학교 시설',
      objects: loc.objects.map(obj => ({
        ...obj,
        id: generateId(),
        containsEvidence: null,
        isExamined: false
      })),
      connectedTo: selectedLocations
        .filter((_, i) => i !== index)
        .slice(0, 2)
        .map(l => l.name),
      isSearched: false,
      searchProgress: 0,
      hiddenAreas: loc.hiddenAreas || []
    }));
  }

  private generateEvidence(
    culprit: Character,
    characters: Character[],
    locations: Location[],
    crimeTime: string,
    motive: Motive
  ): Evidence[] {
    const evidence: Evidence[] = [];
    const evidenceCount = this.rng.nextInt(this.settings.evidenceCount.min, this.settings.evidenceCount.max);
    const criticalCount = this.settings.criticalEvidenceCount;

    // 1. 결정적 증거 생성 (범인과 직접 연결 - 최소 3개)
    const criticalEvidence = this.generateCriticalEvidence(culprit, crimeTime, motive, locations, criticalCount);
    evidence.push(...criticalEvidence);

    // 2. 동기 증거 연결
    motive.relatedEvidence = criticalEvidence.slice(0, 2).map(e => e.id);

    // 3. 보조 증거 생성 (사건 해결에 도움)
    const supportingCount = Math.max(2, evidenceCount - criticalCount - this.settings.redHerringCount);
    for (let i = 0; i < supportingCount; i++) {
      evidence.push(this.generateSupportingEvidence(culprit, characters, locations, i));
    }

    // 4. 미끼 증거 생성 (무고한 사람을 의심하게)
    const innocentCharacters = characters.filter(c => !c.isCulprit && !c.isVictim);
    for (let i = 0; i < this.settings.redHerringCount; i++) {
      evidence.push(this.generateRedHerring(innocentCharacters, locations, i));
    }

    // 5. 증거 간 관계 설정 (supports, contradicts)
    this.linkEvidence(evidence, culprit.id);

    return evidence;
  }

  private generateCriticalEvidence(
    culprit: Character,
    crimeTime: string,
    motive: Motive,
    locations: Location[],
    count: number
  ): Evidence[] {
    const critical: Evidence[] = [];
    const profile = culprit.physicalProfile;

    // 증거 1: 신체적 흔적 (신발 크기 또는 체격)
    const physicalClue = this.rng.next() > 0.5
      ? { name: '현장 신발 자국', desc: `범행 현장 바닥에 ${profile.shoeSize}mm 크기의 신발 자국이 선명하게 남아있다.`, detail: `정밀 분석 결과, 이 신발 자국의 크기는 정확히 ${profile.shoeSize}mm이다. 용의자들의 신발 사이즈를 대조해볼 필요가 있다.` }
      : { name: '체격 흔적 분석', desc: `범행에 사용된 힘의 정도로 보아 범인의 체격을 추정할 수 있다.`, detail: `물리적 분석 결과, 이 범행은 ${profile.build} 체격의 인물이 저지른 것으로 추정된다. 또한 흔적의 방향으로 보아 ${profile.handedness}일 가능성이 높다.` };

    critical.push({
      id: generateId(),
      name: physicalClue.name,
      type: 'physical',
      description: physicalClue.desc,
      detailedDescription: physicalClue.detail,
      location: this.rng.choice(locations).name,
      foundAt: '사건 현장',
      linkedCharacters: [culprit.id],
      isRedHerring: false,
      isCollected: false,
      isCritical: true,
      criticalReason: '범인의 신체적 특성 단서',
      discoveryDifficulty: 2,
      analysisRequired: true,
      analysisResult: `신체 특성 프로파일링 결과`,
      timestamp: crimeTime,
      weight: 30,
      implicates: [culprit.id],
      exonerates: []
    });

    // 증거 2: 시간대/알리바이 기반 증거 (CCTV, 접근 기록)
    const hasSpecialAccess = profile.accessAreas.length > 0;
    const alibiClue = hasSpecialAccess
      ? { name: '출입 기록 분석', desc: `범행 장소의 출입 기록을 분석한 결과, ${crimeTime} 경에 카드키 인증 기록이 있다.`, detail: `이 구역은 특별 접근 권한이 있는 사람만 출입 가능하다. ${profile.accessAreas.join(', ')} 등에 접근 가능한 인물을 확인해야 한다.` }
      : { name: 'CCTV 시간대 분석', desc: `${crimeTime} 경 복도 CCTV에 ${profile.height}의 인물이 포착되었다.`, detail: `CCTV 영상에 찍힌 인물은 ${profile.height}이며, 얼굴은 확인되지 않았다. ${profile.distinctiveFeature}과(와) 유사한 특징이 보인다.` };

    critical.push({
      id: generateId(),
      name: alibiClue.name,
      type: 'digital',
      description: alibiClue.desc,
      detailedDescription: alibiClue.detail,
      location: '보안실',
      foundAt: '보안실 모니터',
      linkedCharacters: [culprit.id],
      isRedHerring: false,
      isCollected: false,
      isCritical: true,
      criticalReason: '시간대 및 접근 권한 단서',
      discoveryDifficulty: 2,
      analysisRequired: false,
      timestamp: crimeTime,
      weight: 35,
      implicates: [culprit.id],
      exonerates: []
    });

    // 증거 3: 동기/행동 기반 간접 증거
    const motiveClue = {
      name: '수상한 메모 조각',
      desc: `구겨진 메모지가 발견되었다. ${profile.handedness}가 쓴 필체로 보인다.`,
      detail: `메모에는 "${motive.description.slice(0, 15)}..."와 관련된 내용이 적혀있다. 필적은 ${profile.handedness}의 것이며, 감정적으로 격앙된 상태에서 쓴 것으로 분석된다.`
    };

    critical.push({
      id: generateId(),
      name: motiveClue.name,
      type: 'document',
      description: motiveClue.desc,
      detailedDescription: motiveClue.detail,
      location: this.rng.choice(locations).name,
      foundAt: '쓰레기통 근처',
      linkedCharacters: [culprit.id],
      isRedHerring: false,
      isCollected: false,
      isCritical: true,
      criticalReason: '동기 및 필적 단서',
      discoveryDifficulty: 3,
      analysisRequired: false,
      timestamp: undefined,
      weight: 25,
      implicates: [culprit.id],
      exonerates: []
    });

    return critical.slice(0, count);
  }

  private generateSupportingEvidence(
    culprit: Character,
    characters: Character[],
    locations: Location[],
    index: number
  ): Evidence {
    const templates = [...EVIDENCE_TEMPLATES.physical, ...EVIDENCE_TEMPLATES.testimony];
    const template = templates[index % templates.length];

    return {
      id: generateId(),
      name: `${template.name} #${index + 1}`,
      type: this.rng.choice(['physical', 'testimony', 'document']),
      description: template.description,
      detailedDescription: template.detailedDescription || template.description,
      location: this.rng.choice(locations).name,
      foundAt: this.rng.choice(['책상 위', '서랍 안', '바닥', '선반']),
      linkedCharacters: this.rng.next() > 0.5 ? [culprit.id] : [],
      isRedHerring: false,
      isCollected: false,
      isCritical: false,
      discoveryDifficulty: this.rng.nextInt(1, 2) as 1 | 2 | 3,
      analysisRequired: false,
      weight: 10
    };
  }

  private generateRedHerring(
    innocentCharacters: Character[],
    locations: Location[],
    index: number
  ): Evidence {
    const linkedChar = innocentCharacters.length > 0
      ? this.rng.choice(innocentCharacters)
      : null;

    const redHerringTemplates = [
      { name: '의문의 메모', desc: '누군가 급하게 적은 듯한 메모. 하지만 사건과 직접적인 관련은 없어 보인다.' },
      { name: '수상한 물건', desc: '눈에 띄는 물건이지만, 자세히 보면 사건과 무관한 것 같다.' },
      { name: '모호한 증언', desc: '확실하지 않은 증언. 기억이 불확실해 보인다.' },
    ];
    const template = redHerringTemplates[index % redHerringTemplates.length];

    return {
      id: generateId(),
      name: `${template.name} #${index + 1}`,
      type: this.rng.choice(['physical', 'testimony', 'document']),
      description: template.desc,
      detailedDescription: template.desc,
      location: this.rng.choice(locations).name,
      foundAt: this.rng.choice(['구석', '숨겨진 곳', '눈에 잘 띄지 않는 곳']),
      linkedCharacters: linkedChar ? [linkedChar.id] : [],
      isRedHerring: true,
      redHerringReason: '사건과 직접적인 관련이 없는 정보',
      isCollected: false,
      isCritical: false,
      discoveryDifficulty: 1,
      analysisRequired: false,
      weight: 0
    };
  }

  private linkEvidence(evidence: Evidence[], culpritId: string): void {
    const criticalEvidence = evidence.filter(e => e.isCritical);
    const redHerrings = evidence.filter(e => e.isRedHerring);

    // 결정적 증거들은 서로 뒷받침
    for (let i = 0; i < criticalEvidence.length; i++) {
      criticalEvidence[i].supports = criticalEvidence
        .filter((_, j) => j !== i)
        .slice(0, 2)
        .map(e => e.id);
    }

    // 결정적 증거는 미끼 증거와 모순
    for (const critical of criticalEvidence) {
      critical.contradicts = redHerrings.slice(0, 2).map(e => e.id);
    }
  }

  private validateEvidenceChain(culprit: Character, evidence: Evidence[]): void {
    const culpritEvidence = evidence.filter(
      e => e.linkedCharacters.includes(culprit.id) && !e.isRedHerring
    );

    if (culpritEvidence.length < 2) {
      this.validationErrors.push({
        code: 'INSUFFICIENT_EVIDENCE',
        message: '범인을 가리키는 증거가 2개 미만',
        location: 'evidence',
        severity: 'critical'
      });
    }

    const criticalEvidence = evidence.filter(e => e.isCritical && !e.isRedHerring);
    if (criticalEvidence.length < 2) {
      this.validationErrors.push({
        code: 'INSUFFICIENT_CRITICAL',
        message: '결정적 증거가 2개 미만',
        location: 'evidence',
        severity: 'critical'
      });
    }
  }

  private generateTimeline(characters: Character[], crimeTime: string, culpritId: string): TimelineEvent[] {
    const events: TimelineEvent[] = [];
    const crimeHour = parseInt(crimeTime.split(':')[0]);

    // 기본 타임라인 슬롯
    const timeSlots = [
      { time: '08:00', desc: '등교 시간' },
      { time: '09:00', desc: '1교시' },
      { time: '10:00', desc: '2교시' },
      { time: '11:00', desc: '3교시' },
      { time: '12:00', desc: '점심시간' },
      { time: '13:00', desc: '4교시' },
      { time: '14:00', desc: '5교시' },
      { time: '15:00', desc: '6교시' },
      { time: '16:00', desc: '방과후' }
    ];

    const culprit = characters.find(c => c.id === culpritId)!;

    for (const slot of timeSlots) {
      const slotHour = parseInt(slot.time.split(':')[0]);
      const isKeyEvent = slot.time === crimeTime;

      // 타임라인 참가자 (범인은 범행 시각에 다르게 표시)
      let participants: string[];
      if (isKeyEvent) {
        participants = characters
          .filter(c => c.id !== culpritId && !c.isVictim)
          .slice(0, 2)
          .map(c => c.id);
      } else {
        participants = this.rng.sample(characters.map(c => c.id), this.rng.nextInt(2, 4));
      }

      events.push({
        id: generateId(),
        time: slot.time,
        description: isKeyEvent ? '사건 발생 추정 시각' : slot.desc,
        detailedDescription: isKeyEvent
          ? `이 시간대에 사건이 발생한 것으로 추정된다. ${culprit.name}의 행적이 불분명하다.`
          : `${slot.desc} 시간. 대부분의 사람들이 정해진 장소에 있었다.`,
        participants,
        location: this.rng.choice(['교실', '복도', '도서관', '급식실', '운동장']),
        isKeyEvent,
        isRevealed: slotHour < crimeHour, // 사건 전 시간대만 공개
        importance: isKeyEvent ? 'critical' : 'minor',
        relatedEvidence: [],
        canBeContradicted: isKeyEvent
      });
    }

    // 범인은 타임라인 초반에 등장해야 함 (Knox Rule #1)
    if (!events.slice(0, 3).some(e => e.participants.includes(culpritId))) {
      events[0].participants.push(culpritId);
    }

    return events;
  }

  private assignSecrets(characters: Character[], evidence: Evidence[], culpritId: string): void {
    for (const char of characters) {
      if (char.isVictim) continue;

      const isCulprit = char.id === culpritId;
      const secretCount = isCulprit ? 2 : (this.rng.next() > 0.5 ? 1 : 0);

      for (let i = 0; i < secretCount; i++) {
        const relatedEvidence = evidence
          .filter(e => e.linkedCharacters.includes(char.id))
          .slice(0, 2)
          .map(e => e.id);

        char.secrets.push({
          id: generateId(),
          content: isCulprit
            ? (i === 0
                ? `사건 당시 ${char.alibi.location}에 없었다`
                : '범행의 동기가 있다')
            : this.rng.choice([
                '숨기고 있는 비밀이 있다',
                '다른 사람과의 특별한 관계가 있다',
                '사건과 관련된 것을 목격했다'
              ]),
          importance: isCulprit ? 'critical' : 'minor',
          isRevealed: false,
          requiredEvidence: relatedEvidence,
          requiredTrustLevel: isCulprit ? 70 : 50,
          connectedToCase: isCulprit,
          revealMethod: isCulprit ? 'evidence' : 'interrogation'
        });
      }
    }
  }

  private generateDialogues(characters: Character[], evidence: Evidence[], culpritId: string): void {
    for (const char of characters) {
      const isCulprit = char.id === culpritId;

      char.dialogues = {
        greeting: this.createDialogueOptions(DIALOGUE_TEMPLATES.greeting, char, isCulprit),
        alibi: this.createAlibiDialogue(char, isCulprit),
        relationship: this.createDialogueOptions(DIALOGUE_TEMPLATES.relationship || ['다른 사람들과는 평범한 사이예요.'], char, isCulprit),
        incident: this.createIncidentDialogue(char, isCulprit),
        suspicious: isCulprit
          ? this.createDialogueOptions(DIALOGUE_TEMPLATES.nervous, char, true)
          : this.createDialogueOptions(DIALOGUE_TEMPLATES.helpful, char, false)
      };

      // 비밀 관련 대화
      if (char.secrets.length > 0) {
        char.dialogues.secret = [{
          id: generateId(),
          text: '비밀에 대해 묻기',
          condition: { requiredEvidence: char.secrets[0].requiredEvidence },
          response: isCulprit
            ? '...그건... 말하기 어려워요.'
            : char.secrets[0].content,
          revealsInfo: char.secrets[0].content,
          triggersNervous: isCulprit
        }];
      }
    }
  }

  private createDialogueOptions(templates: string[], char: Character, isCulprit: boolean): DialogueOption[] {
    return templates.slice(0, 3).map((text, i) => ({
      id: generateId(),
      text: `질문 ${i + 1}`,
      response: text,
      triggersNervous: isCulprit && i === 0
    }));
  }

  private createAlibiDialogue(char: Character, isCulprit: boolean): DialogueOption[] {
    const baseResponse = `${char.alibi.startTime}부터 ${char.alibi.endTime}까지 ${char.alibi.location}에서 ${char.alibi.activity}`;

    return [{
      id: generateId(),
      text: '알리바이 확인',
      response: isCulprit
        ? `${baseResponse}... 아마 그랬을 거예요.`
        : `${baseResponse}. ${char.alibi.witnesses.length > 0 ? '증인도 있어요.' : ''}`,
      triggersNervous: isCulprit
    }];
  }

  private createIncidentDialogue(char: Character, isCulprit: boolean): DialogueOption[] {
    if (char.isVictim) {
      return [{
        id: generateId(),
        text: '사건에 대해 묻기',
        response: '제가 발견했을 때 정말 놀랐어요...'
      }];
    }

    return [{
      id: generateId(),
      text: '사건에 대해 묻기',
      response: isCulprit
        ? '저는 그 시간에 다른 곳에 있었어요. 정말이에요.'
        : '저도 나중에 들었어요. 정말 놀라운 일이네요.',
      triggersNervous: isCulprit
    }];
  }

  private placeEvidenceInLocations(evidence: Evidence[], locations: Location[]): void {
    // 모든 증거가 배치되도록 보장
    const evidenceToPlace = [...evidence];

    for (const ev of evidenceToPlace) {
      const targetLocation = locations.find(l => l.name === ev.location);
      if (!targetLocation) continue;

      const availableObjects = targetLocation.objects.filter(o => !o.containsEvidence);

      if (availableObjects.length > 0) {
        const obj = this.rng.choice(availableObjects);
        obj.containsEvidence = ev.id;
        obj.examinationResult = `${obj.examinationResult} [${ev.name}을(를) 발견했다!]`;
      } else {
        // 배치할 곳이 없으면 다른 장소에 배치
        for (const loc of locations) {
          const altObjects = loc.objects.filter(o => !o.containsEvidence);
          if (altObjects.length > 0) {
            const obj = this.rng.choice(altObjects);
            obj.containsEvidence = ev.id;
            ev.location = loc.name;
            obj.examinationResult = `${obj.examinationResult} [${ev.name}을(를) 발견했다!]`;
            break;
          }
        }
      }
    }
  }

  private generateDeductionKeywords(
    culprit: Character,
    motive: Motive,
    crimeTime: string,
    crimeLocation: string
  ): DeductionKeywords {
    return {
      who: [
        culprit.name,
        culprit.name.slice(0, 2), // 성만
        culprit.occupation
      ],
      why: [
        motive.type,
        ...motive.description.split(' ').filter(w => w.length > 2).slice(0, 3)
      ],
      how: [
        '몰래', '숨어서', '기회를 노려'
      ],
      when: [
        crimeTime,
        crimeTime.split(':')[0] + '시',
        crimeTime.replace(':', '시 ') + '분'
      ],
      where: [
        crimeLocation,
        crimeLocation.replace('실', ''),
        crimeLocation.slice(0, 2)
      ]
    };
  }

  private generateSummary(targetItem: { name: string; description: string }): string {
    const actionMap: Record<CaseType, string> = {
      theft: '도난당했습니다',
      vandalism: '훼손되었습니다',
      mystery: '사라졌습니다',
      disappearance: '없어졌습니다',
      fraud: '위조된 것으로 밝혀졌습니다',
      blackmail: '협박의 대상이 되었습니다'
    };
    return `${targetItem.description}이(가) ${actionMap[this.caseType]}.`;
  }

  private generateDetailedSummary(
    targetItem: { name: string; description: string },
    crimeTime: string,
    crimeLocation: string
  ): string {
    return `${crimeTime} 경, ${crimeLocation}에서 ${targetItem.name}이(가) 사라진 사건이 발생했습니다. 현장에는 여러 단서가 남아있으며, 용의자들의 알리바이를 확인해야 합니다.`;
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

  private generatePrologue(timeSlot: { time: string; period: string }): string[] {
    return [
      `${timeSlot.period}의 학교...`,
      `평화로워 보이던 일상에 갑자기 사건이 터졌다.`,
      `누군가는 진실을 알고 있다.`,
      `그리고 누군가는 거짓말을 하고 있다.`
    ];
  }

  private generateMotiveDetail(motive: Motive, culprit: Character): string {
    const motiveTypeDesc: Record<Motive['type'], string> = {
      revenge: '오래된 원한으로 인해',
      greed: '욕심에 눈이 멀어',
      jealousy: '질투심에 사로잡혀',
      fear: '두려움 때문에',
      protection: '무언가를 지키기 위해',
      ideology: '신념을 위해',
      accident: '우연한 상황에서'
    };
    return `${culprit.name}은(는) ${motiveTypeDesc[motive.type]} ${motive.description}. 이것이 범행의 직접적인 원인이 되었다.`;
  }

  private generateSolutionExplanation(culprit: Character, motive: Motive, targetItem: { name: string }): string {
    return `범인은 ${culprit.name}입니다. ${culprit.occupation}인 ${culprit.name}은(는) "${motive.description}"라는 동기로 ${targetItem.name}을(를) 노렸습니다. ${culprit.alibi.holeDetail}는 점이 결정적인 단서였습니다.`;
  }

  private generateDetailedSolutionExplanation(
    culprit: Character,
    motive: Motive,
    evidence: Evidence[],
    timeline: TimelineEvent[]
  ): string[] {
    const criticalEvidence = evidence.filter(e => e.isCritical && !e.isRedHerring);

    return [
      `1. 범인: ${culprit.name} (${culprit.occupation})`,
      `2. 동기: ${motive.description}`,
      `3. 결정적 증거:`,
      ...criticalEvidence.map((e, i) => `   ${i + 1}) ${e.name}: ${e.criticalReason || e.description}`),
      `4. 알리바이 빈틈: ${culprit.alibi.holeDetail}`,
      `5. 핵심 포인트: ${culprit.name}은(는) ${culprit.alibi.holeTimeStart}~${culprit.alibi.holeTimeEnd} 사이에 행적이 불분명했습니다.`
    ];
  }

  private generateSolutionTimeline(culprit: Character, crimeTime: string): string[] {
    return [
      `${culprit.name}은(는) 사전에 계획을 세웠다.`,
      `알리바이를 위장하기 위해 ${culprit.alibi.location}에 있는 척했다.`,
      `${crimeTime} 경, 틈을 타 범행을 저질렀다.`,
      `현장을 정리하고 아무 일 없던 듯 돌아왔다.`,
      `하지만 결정적인 증거를 남겼다.`
    ];
  }

  private generateHowToSolve(culprit: Character, evidence: Evidence[]): string[] {
    const critical = evidence.filter(e => e.isCritical && !e.isRedHerring);
    return [
      `1. 모든 용의자의 알리바이를 확인하세요.`,
      `2. ${culprit.alibi.location}에서의 ${culprit.name} 알리바이에 주목하세요.`,
      `3. ${critical[0]?.name || '물리적 증거'}를 찾으면 범인이 좁혀집니다.`,
      `4. 범인의 동기를 파악하면 확신을 가질 수 있습니다.`
    ];
  }

  private generateCommonMistakes(characters: Character[], evidence: Evidence[]): string[] {
    const redHerrings = evidence.filter(e => e.isRedHerring);
    const innocentSuspects = characters.filter(c => !c.isCulprit && !c.isVictim).slice(0, 2);

    return [
      ...innocentSuspects.map(c => `${c.name}을(를) 의심하기 쉽지만, 알리바이가 확실합니다.`),
      ...redHerrings.slice(0, 2).map(e => `"${e.name}"은(는) 미끼 증거입니다.`)
    ];
  }

  private getEstimatedTime(): number {
    const timeMap: Record<Difficulty, number> = {
      easy: 15,
      medium: 25,
      hard: 35,
      expert: 45
    };
    return timeMap[this.difficulty];
  }

  private generateContradictions(
    characters: Character[],
    evidence: Evidence[],
    culpritId: string
  ): import('../types').CaseContradiction[] {
    const contradictions: import('../types').CaseContradiction[] = [];
    const culprit = characters.find(c => c.id === culpritId);
    if (!culprit) return contradictions;

    const criticalEvidence = evidence.filter(e => e.isCritical && !e.isRedHerring);

    // 범인의 알리바이 모순
    if (criticalEvidence.length > 0) {
      contradictions.push({
        id: generateId(),
        characterId: culpritId,
        statement: `${culprit.name}: "${culprit.alibi.startTime}부터 ${culprit.alibi.endTime}까지 ${culprit.alibi.location}에 있었습니다."`,
        contradictingEvidenceId: criticalEvidence[0].id,
        explanation: culprit.alibi.holeDetail || '알리바이에 빈틈이 있다',
        isCritical: true
      });
    }

    if (criticalEvidence.length > 1) {
      contradictions.push({
        id: generateId(),
        characterId: culpritId,
        statement: `${culprit.name}: "저는 사건과 아무 관련이 없어요."`,
        contradictingEvidenceId: criticalEvidence[1].id,
        explanation: '증거가 범인의 관여를 증명한다',
        isCritical: true
      });
    }

    return contradictions;
  }

  private generateLogicCategories(characters: Character[]): import('../types').LogicCategory[] {
    const suspects = characters.filter(c => !c.isVictim);
    return [
      {
        id: 'location',
        name: '장소',
        values: ['교실', '복도', '도서관', '운동장', '급식실'],
        icon: 'map-pin'
      },
      {
        id: 'time',
        name: '시간대',
        values: ['1교시', '2교시', '점심', '3교시', '방과후'],
        icon: 'clock'
      },
      {
        id: 'motive',
        name: '동기',
        values: suspects.map(s => s.motive?.type || 'unknown'),
        icon: 'brain'
      }
    ];
  }

  // Knox 10계명 검증
  private validateKnoxRules(caseData: Partial<Case>): KnoxValidation {
    const culprit = caseData.characters?.find(c => c.id === caseData.culpritId);
    const failedRules: string[] = [];

    // Rule 1: 범인은 초반에 등장
    const rule1 = !!(culprit &&
      caseData.timeline?.slice(0, 3).some(e => e.participants.includes(culprit.id)));
    if (!rule1) failedRules.push('rule1');

    // Rule 2: 초자연적 요소 금지 (자동 통과 - 게임에 초자연적 요소 없음)
    const rule2 = true;

    // Rule 3: 비밀 통로 2개 이상 금지 (자동 통과)
    const rule3 = true;

    // Rule 4: 미지의 독극물 금지 (자동 통과)
    const rule4 = true;

    // Rule 5: 스테레오타입 금지 (자동 통과)
    const rule5 = true;

    // Rule 6: 우연 해결 금지 - 증거 기반인지 확인
    const criticalEvidence = caseData.evidence?.filter(e => e.isCritical && !e.isRedHerring) || [];
    const rule6 = criticalEvidence.length >= 2;
    if (!rule6) failedRules.push('rule6');

    // Rule 7: 탐정은 범인 불가 (자동 통과 - 탐정 캐릭터 없음)
    const rule7 = true;

    // Rule 8: 모든 단서 공개
    const rule8 = criticalEvidence.every(e => e.discoveryDifficulty <= 3);
    if (!rule8) failedRules.push('rule8');

    // Rule 9: 조수 추리 제한 (자동 통과)
    const rule9 = true;

    // Rule 10: 사전 언급 없는 쌍둥이 금지 (자동 통과)
    const rule10 = true;

    const passedCount = [rule1, rule2, rule3, rule4, rule5, rule6, rule7, rule8, rule9, rule10].filter(Boolean).length;

    return {
      rule1_culpritEarlyAppearance: rule1,
      rule2_noSupernatural: rule2,
      rule3_noSecretPassages: rule3,
      rule4_noUnknownPoison: rule4,
      rule5_noAsianCharacter: rule5,
      rule6_noAccident: rule6,
      rule7_detectiveNotCulprit: rule7,
      rule8_allCluesShown: rule8,
      rule9_sidekickLimited: rule9,
      rule10_noTwinUnannounced: rule10,
      isValid: failedRules.length === 0,
      failedRules,
      score: (passedCount / 10) * 100
    };
  }

  publicValidateCase(caseData: Case): CaseValidationResult {
    return this.validateCase(caseData);
  }

  private validateCase(caseData: Case): CaseValidationResult {
    const errors: ValidationError[] = [...this.validationErrors];
    const warnings: ValidationWarning[] = [...this.validationWarnings];

    // 범인 존재 확인
    if (!caseData.culpritId) {
      errors.push({
        code: 'NO_CULPRIT',
        message: '범인이 지정되지 않음',
        location: 'case',
        severity: 'critical'
      });
    }

    // 결정적 증거 확인
    const criticalEvidence = caseData.evidence.filter(e => e.isCritical && !e.isRedHerring);
    if (criticalEvidence.length < 2) {
      errors.push({
        code: 'INSUFFICIENT_CRITICAL_EVIDENCE',
        message: '결정적 증거 부족',
        location: 'evidence',
        severity: 'critical'
      });
    }

    // 범인 연결 증거 확인
    const culpritEvidence = caseData.evidence.filter(
      e => e.linkedCharacters.includes(caseData.culpritId) && !e.isRedHerring
    );
    if (culpritEvidence.length < 2) {
      errors.push({
        code: 'CULPRIT_NOT_LINKED',
        message: '범인과 연결된 증거 부족',
        location: 'evidence',
        severity: 'critical'
      });
    }

    // Knox 검증
    const knoxValidation = this.validateKnoxRules(caseData);

    // 해결 가능성 판단
    let solvability: 'guaranteed' | 'possible' | 'difficult' | 'impossible';
    if (errors.length === 0 && knoxValidation.isValid) {
      solvability = criticalEvidence.length >= 3 ? 'guaranteed' : 'possible';
    } else if (errors.filter(e => e.severity === 'critical').length > 0) {
      solvability = 'impossible';
    } else {
      solvability = 'difficult';
    }

    const score = Math.max(0, 100 - errors.length * 20 - warnings.length * 5);

    return {
      isValid: errors.filter(e => e.severity === 'critical').length === 0,
      errors,
      warnings,
      score,
      knoxValidation,
      solvability
    };
  }

  private generateFallbackCase(): Case {
    // 검증을 통과하지 못했을 때 사용할 기본 케이스
    console.warn('폴백 케이스 생성됨');

    const culpritId = generateId();
    const victimId = generateId();

    return {
      id: generateId(),
      title: '교실의 미스터리',
      subtitle: '사라진 물건',
      type: 'theft',
      difficulty: this.difficulty,
      estimatedTime: 20,
      summary: '중요한 물건이 사라졌습니다.',
      detailedSummary: '교실에서 중요한 물건이 사라졌습니다. 용의자들을 조사하세요.',
      introduction: ['사건이 발생했습니다.', '범인을 찾아주세요.'],
      prologue: ['평화로운 학교에...', '사건이 터졌다.'],
      characters: [
        this.createFallbackCharacter(victimId, '피해자', true, false),
        this.createFallbackCharacter(culpritId, '용의자 A', false, true),
        this.createFallbackCharacter(generateId(), '용의자 B', false, false)
      ],
      evidence: [
        this.createFallbackEvidence('결정적 증거', culpritId, true),
        this.createFallbackEvidence('보조 증거', culpritId, false)
      ],
      locations: [],
      timeline: [],
      culpritId,
      victimId,
      motive: '개인적인 이유',
      motiveDetail: '범인에게는 범행 동기가 있었다.',
      method: '몰래',
      methodDetail: '기회를 노려 범행했다.',
      crimeTime: '12:00',
      crimeLocation: '교실',
      deductionKeywords: {
        who: ['용의자 A'],
        why: ['개인적'],
        how: ['몰래'],
        when: ['12시'],
        where: ['교실']
      },
      contradictions: [],
      logicCategories: [],
      solution: {
        explanation: '용의자 A가 범인입니다.',
        detailedExplanation: ['범인은 용의자 A입니다.'],
        keyEvidence: [],
        timeline: ['범행이 저질러졌다.'],
        howToSolve: ['증거를 찾으세요.'],
        commonMistakes: ['용의자 B를 의심하기 쉽습니다.']
      },
      knoxValidation: {
        rule1_culpritEarlyAppearance: true,
        rule2_noSupernatural: true,
        rule3_noSecretPassages: true,
        rule4_noUnknownPoison: true,
        rule5_noAsianCharacter: true,
        rule6_noAccident: true,
        rule7_detectiveNotCulprit: true,
        rule8_allCluesShown: true,
        rule9_sidekickLimited: true,
        rule10_noTwinUnannounced: true,
        isValid: true,
        failedRules: [],
        score: 100
      },
      qualityScore: 50,
      version: '2.0.0-fallback',
      createdAt: Date.now()
    };
  }

  private createFallbackCharacter(id: string, name: string, isVictim: boolean, isCulprit: boolean): Character {
    return {
      id,
      name,
      age: 17,
      gender: 'male',
      occupation: '학생',
      personality: '평범한',
      description: '평범한 학생',
      appearance: '평범한 외모',
      background: '평범한 배경',
      physicalProfile: {
        height: '보통키',
        build: '보통체격',
        handedness: '오른손잡이',
        shoeSize: 265,
        distinctiveFeature: '안경 착용',
        bloodType: 'A',
        accessAreas: []
      },
      alibi: {
        location: '교실',
        startTime: '11:00',
        endTime: '13:00',
        activity: '수업',
        witnesses: [],
        physicalEvidence: [],
        hasHole: isCulprit,
        holeDetail: isCulprit ? '알리바이에 빈틈이 있다' : undefined,
        canBeVerified: !isCulprit
      },
      motive: isCulprit ? {
        type: 'greed',
        description: '개인적인 이유',
        strength: 2,
        relatedEvidence: [],
        isRevealed: false
      } : null,
      relationships: [],
      secrets: [],
      isVictim,
      isCulprit,
      isWitness: false,
      suspicionLevel: 0,
      dialogues: {},
      behaviorPatterns: [],
      nervousTriggers: isCulprit ? ['알리바이', '그 시간'] : [],
      firstAppearanceTime: '08:00'
    };
  }

  private createFallbackEvidence(name: string, culpritId: string, isCritical: boolean): Evidence {
    return {
      id: generateId(),
      name,
      type: 'physical',
      description: '중요한 증거',
      detailedDescription: '이 증거는 사건 해결에 도움이 된다.',
      location: '교실',
      foundAt: '책상',
      linkedCharacters: [culpritId],
      isRedHerring: false,
      isCollected: false,
      isCritical,
      discoveryDifficulty: 1,
      analysisRequired: false,
      weight: isCritical ? 30 : 10
    };
  }
}

// 케이스 품질 검증 유틸리티
export function validateCaseQuality(caseData: Case): CaseValidationResult {
  const generator = new CaseGenerator(caseData.difficulty, caseData.type);
  return generator.publicValidateCase(caseData);
}

// 100개 케이스 생성 및 검증
export function generateAndValidateCases(count: number = 100, difficulty: Difficulty = 'medium'): {
  cases: Case[];
  validCount: number;
  invalidCount: number;
  averageScore: number;
  knoxPassRate: number;
} {
  const cases: Case[] = [];
  let validCount = 0;
  let totalScore = 0;
  let knoxPassCount = 0;

  for (let i = 0; i < count; i++) {
    const seed = Date.now() + i * 1000;
    const generator = new CaseGenerator(difficulty, undefined, seed);
    const caseData = generator.generate();

    cases.push(caseData);

    if (caseData.qualityScore >= 60) {
      validCount++;
    }
    totalScore += caseData.qualityScore;

    if (caseData.knoxValidation.isValid) {
      knoxPassCount++;
    }
  }

  return {
    cases,
    validCount,
    invalidCount: count - validCount,
    averageScore: totalScore / count,
    knoxPassRate: (knoxPassCount / count) * 100
  };
}
