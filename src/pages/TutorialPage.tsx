import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, Search, MessageSquare, Brain, Target,
  MapPin, Eye, HelpCircle, Trophy, ChevronRight, CheckCircle,
  Lightbulb, AlertTriangle, Sparkles
} from 'lucide-react';

interface TutorialStep {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  iconColor: string;
  content: React.ReactNode;
  tips: string[];
  interactiveDemo?: React.ReactNode;
}

export function TutorialPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [demoState, setDemoState] = useState({
    objectExamined: false,
    evidenceCollected: false,
    questionAsked: false,
    deductionMade: false,
    accusationMade: false
  });

  const steps: TutorialStep[] = [
    {
      id: 'intro',
      title: '추리 게임에 오신 것을 환영합니다',
      subtitle: 'DEDUCTIO의 세계로 들어가 보세요',
      icon: Sparkles,
      iconColor: 'text-amber-400',
      content: (
        <div className="space-y-4">
          <p className="text-slate-300">
            <span className="text-amber-400 font-bold">DEDUCTIO</span>는 당신의 추리력을 시험하는 게임입니다.
          </p>
          <p className="text-slate-300">
            각 사건에서 당신은 탐정이 되어 <span className="text-indigo-400">증거를 수집</span>하고,
            <span className="text-emerald-400"> 용의자를 심문</span>하며,
            <span className="text-purple-400"> 논리적 추론</span>을 통해 진범을 찾아야 합니다.
          </p>
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
            <h4 className="text-white font-bold mb-2 flex items-center gap-2">
              <AlertTriangle size={16} className="text-amber-400" />
              Knox의 10계명
            </h4>
            <p className="text-sm text-slate-400">
              모든 사건은 공정하게 설계되어 있습니다. 범인은 항상 초반에 등장하고,
              해결에 필요한 모든 단서는 당신에게 공개됩니다.
            </p>
          </div>
        </div>
      ),
      tips: [
        '모든 사건은 논리적으로 해결 가능합니다',
        '범인은 반드시 등장인물 중 한 명입니다',
        '결정적 증거를 찾는 것이 핵심입니다'
      ]
    },
    {
      id: 'investigation',
      title: '1단계: 조사하기',
      subtitle: '장소를 탐색하고 증거를 수집하세요',
      icon: Search,
      iconColor: 'text-blue-400',
      content: (
        <div className="space-y-4">
          <p className="text-slate-300">
            사건 현장과 관련 장소들을 <span className="text-blue-400 font-bold">꼼꼼히 조사</span>하세요.
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
              <MapPin size={20} className="text-blue-400 mb-2" />
              <h5 className="text-white text-sm font-bold">장소 이동</h5>
              <p className="text-xs text-slate-400">다양한 장소를 방문하여 단서를 찾으세요</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
              <Eye size={20} className="text-emerald-400 mb-2" />
              <h5 className="text-white text-sm font-bold">물건 조사</h5>
              <p className="text-xs text-slate-400">물건을 클릭하면 자세히 조사할 수 있습니다</p>
            </div>
          </div>
        </div>
      ),
      tips: [
        '모든 물건을 빠짐없이 조사하세요',
        '어떤 증거는 분석이 필요할 수 있습니다',
        '숨겨진 장소가 있을 수도 있습니다'
      ],
      interactiveDemo: (
        <InteractiveInvestigationDemo
          onExamine={() => setDemoState(s => ({ ...s, objectExamined: true }))}
          onCollect={() => setDemoState(s => ({ ...s, evidenceCollected: true }))}
          objectExamined={demoState.objectExamined}
          evidenceCollected={demoState.evidenceCollected}
        />
      )
    },
    {
      id: 'interrogation',
      title: '2단계: 심문하기',
      subtitle: '용의자들과 대화하고 정보를 캐내세요',
      icon: MessageSquare,
      iconColor: 'text-emerald-400',
      content: (
        <div className="space-y-4">
          <p className="text-slate-300">
            용의자들과 <span className="text-emerald-400 font-bold">대화</span>하여 정보를 얻으세요.
            <span className="text-amber-400"> 증거를 제시</span>하면 숨겨진 비밀을 밝혀낼 수 있습니다.
          </p>
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
            <h5 className="text-white text-sm font-bold mb-2">알리바이 확인</h5>
            <p className="text-xs text-slate-400">
              각 용의자의 알리바이를 확인하세요. <span className="text-red-400">알리바이에 빈틈</span>이 있는
              사람이 범인일 가능성이 높습니다.
            </p>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4 border border-amber-500/30">
            <h5 className="text-amber-400 text-sm font-bold mb-2">💡 증거 제시</h5>
            <p className="text-xs text-slate-400">
              수집한 증거를 대화 중에 제시하면, 용의자가 동요하거나 새로운 정보를 말할 수 있습니다.
            </p>
          </div>
        </div>
      ),
      tips: [
        '용의자의 표정 변화에 주목하세요',
        '같은 질문을 여러 번 해도 됩니다',
        '증거를 제시하는 타이밍이 중요합니다'
      ],
      interactiveDemo: (
        <InteractiveInterrogationDemo
          onAsk={() => setDemoState(s => ({ ...s, questionAsked: true }))}
          questionAsked={demoState.questionAsked}
        />
      )
    },
    {
      id: 'deduction',
      title: '3단계: 추론하기',
      subtitle: '증거를 연결하고 사실을 도출하세요',
      icon: Brain,
      iconColor: 'text-purple-400',
      content: (
        <div className="space-y-4">
          <p className="text-slate-300">
            수집한 증거를 바탕으로 <span className="text-purple-400 font-bold">추론</span>을 작성하세요.
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <span className="px-2 py-1 rounded bg-red-500/20 text-red-400">WHO</span>
              <span className="text-slate-400">범인이 누구인지</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="px-2 py-1 rounded bg-amber-500/20 text-amber-400">WHY</span>
              <span className="text-slate-400">범행 동기가 무엇인지</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="px-2 py-1 rounded bg-blue-500/20 text-blue-400">HOW</span>
              <span className="text-slate-400">어떤 방법으로 범행했는지</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-400">WHEN</span>
              <span className="text-slate-400">언제 범행이 일어났는지</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="px-2 py-1 rounded bg-purple-500/20 text-purple-400">WHERE</span>
              <span className="text-slate-400">어디서 범행이 일어났는지</span>
            </div>
          </div>
        </div>
      ),
      tips: [
        '추론은 3개씩 한 번에 검증됩니다',
        '틀린 추론도 힌트가 될 수 있습니다',
        '증거 없이 추측만 하면 점수가 낮아집니다'
      ],
      interactiveDemo: (
        <InteractiveDeductionDemo
          onDeduction={() => setDemoState(s => ({ ...s, deductionMade: true }))}
          deductionMade={demoState.deductionMade}
        />
      )
    },
    {
      id: 'accusation',
      title: '4단계: 범인 지목',
      subtitle: '확신이 들면 범인을 지목하세요',
      icon: Target,
      iconColor: 'text-red-400',
      content: (
        <div className="space-y-4">
          <p className="text-slate-300">
            충분한 증거와 추론이 모이면 <span className="text-red-400 font-bold">범인을 지목</span>하세요.
          </p>
          <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/30">
            <h5 className="text-red-400 font-bold mb-2 flex items-center gap-2">
              <AlertTriangle size={16} />
              주의
            </h5>
            <p className="text-sm text-slate-300">
              범인 지목은 <span className="text-white font-bold">한 번만</span> 가능합니다!
              틀리면 게임이 끝나니 신중하게 결정하세요.
            </p>
          </div>
          <div className="space-y-2">
            <h5 className="text-white text-sm font-bold">점수 계산</h5>
            <ul className="text-xs text-slate-400 space-y-1">
              <li>• 정답 시 기본 500점</li>
              <li>• 난이도 배율 적용 (쉬움 x1 ~ 전문가 x3)</li>
              <li>• 힌트 미사용 보너스</li>
              <li>• 빠른 클리어 보너스</li>
              <li>• 증거 수집률 보너스</li>
            </ul>
          </div>
        </div>
      ),
      tips: [
        '모든 증거가 한 사람을 가리킬 때 지목하세요',
        '알리바이 빈틈 + 동기 + 증거가 핵심입니다',
        '미끼 증거(레드헤링)에 속지 마세요!'
      ]
    },
    {
      id: 'complete',
      title: '튜토리얼 완료!',
      subtitle: '이제 실전 사건에 도전하세요',
      icon: Trophy,
      iconColor: 'text-amber-400',
      content: (
        <div className="space-y-4 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <p className="text-xl text-white font-bold">
            준비 완료!
          </p>
          <p className="text-slate-300">
            이제 실제 사건을 해결할 준비가 되었습니다.
            <br />첫 사건은 '쉬움' 난이도로 시작하는 것을 추천합니다.
          </p>
          <div className="flex flex-col gap-3 mt-6">
            <button
              onClick={() => navigate('/new-game')}
              className="btn-accent py-4 text-lg flex items-center justify-center gap-2"
            >
              <Sparkles size={20} />
              첫 사건 시작하기
            </button>
          </div>
        </div>
      ),
      tips: []
    }
  ];

  const currentStepData = steps[currentStep];

  const goToNextStep = () => {
    setCompletedSteps(prev => new Set(prev).add(currentStep));
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950">
      {/* 헤더 */}
      <div className="p-4 border-b border-slate-800">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="hidden sm:inline">홈으로</span>
          </button>

          {/* 진행 표시 */}
          <div className="flex items-center gap-1">
            {steps.map((step, i) => (
              <div
                key={step.id}
                className={`
                  w-2 h-2 rounded-full transition-all cursor-pointer
                  ${i === currentStep ? 'w-6 bg-amber-400' :
                    completedSteps.has(i) ? 'bg-emerald-400' : 'bg-slate-600'}
                `}
                onClick={() => setCurrentStep(i)}
              />
            ))}
          </div>

          <span className="text-sm text-slate-400">
            {currentStep + 1} / {steps.length}
          </span>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="max-w-3xl mx-auto p-4 md:p-8">
        <div className="text-center mb-8">
          {/* 아이콘 */}
          <div className={`
            w-20 h-20 mx-auto mb-4 rounded-2xl
            bg-gradient-to-br from-slate-800 to-slate-900
            flex items-center justify-center
            border border-slate-700
          `}>
            <currentStepData.icon size={36} className={currentStepData.iconColor} />
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            {currentStepData.title}
          </h1>
          <p className="text-slate-400">
            {currentStepData.subtitle}
          </p>
        </div>

        {/* 컨텐츠 카드 */}
        <div className="card mb-6">
          {currentStepData.content}
        </div>

        {/* 인터랙티브 데모 */}
        {currentStepData.interactiveDemo && (
          <div className="card mb-6 bg-slate-800/50 border-dashed border-2 border-slate-600">
            <h4 className="text-sm font-bold text-slate-400 mb-3 flex items-center gap-2">
              <Lightbulb size={16} className="text-amber-400" />
              직접 해보기
            </h4>
            {currentStepData.interactiveDemo}
          </div>
        )}

        {/* 팁 */}
        {currentStepData.tips.length > 0 && (
          <div className="card bg-amber-500/5 border-amber-500/20 mb-6">
            <h4 className="text-amber-400 font-bold mb-3 flex items-center gap-2">
              <HelpCircle size={16} />
              팁
            </h4>
            <ul className="space-y-2">
              {currentStepData.tips.map((tip, i) => (
                <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                  <CheckCircle size={14} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 네비게이션 버튼 */}
        <div className="flex items-center justify-between">
          <button
            onClick={goToPrevStep}
            disabled={currentStep === 0}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
              ${currentStep === 0
                ? 'text-slate-600 cursor-not-allowed'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'}
            `}
          >
            <ArrowLeft size={18} />
            이전
          </button>

          {currentStep < steps.length - 1 ? (
            <button
              onClick={goToNextStep}
              className="btn-accent flex items-center gap-2"
            >
              다음
              <ArrowRight size={18} />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

// 인터랙티브 데모 컴포넌트들
function InteractiveInvestigationDemo({
  onExamine,
  onCollect,
  objectExamined,
  evidenceCollected
}: {
  onExamine: () => void;
  onCollect: () => void;
  objectExamined: boolean;
  evidenceCollected: boolean;
}) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-400">아래 물건을 클릭해서 조사해보세요:</p>

      <div className="flex gap-4 justify-center">
        <button
          onClick={onExamine}
          disabled={objectExamined}
          className={`
            p-4 rounded-lg border-2 transition-all
            ${objectExamined
              ? 'border-emerald-500 bg-emerald-500/10'
              : 'border-slate-600 hover:border-blue-400 hover:bg-blue-500/10'}
          `}
        >
          <span className="text-3xl">📋</span>
          <p className="text-xs mt-1 text-slate-400">
            {objectExamined ? '조사 완료!' : '수상한 서류'}
          </p>
        </button>

        {objectExamined && (
          <button
            onClick={onCollect}
            disabled={evidenceCollected}
            className={`
              p-4 rounded-lg border-2 transition-all animate-pulse
              ${evidenceCollected
                ? 'border-amber-500 bg-amber-500/10 animate-none'
                : 'border-amber-500 bg-amber-500/10'}
            `}
          >
            <span className="text-3xl">📝</span>
            <p className="text-xs mt-1 text-amber-400">
              {evidenceCollected ? '수집 완료!' : '증거 수집'}
            </p>
          </button>
        )}
      </div>

      {evidenceCollected && (
        <div className="text-center text-emerald-400 text-sm">
          ✓ 첫 증거를 수집했습니다! 이런 식으로 단서를 모으세요.
        </div>
      )}
    </div>
  );
}

function InteractiveInterrogationDemo({
  onAsk,
  questionAsked
}: {
  onAsk: () => void;
  questionAsked: boolean;
}) {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center text-2xl">
          👤
        </div>
        <div>
          <p className="text-white font-bold">용의자 김모씨</p>
          <p className="text-xs text-slate-400">학생 / 32세</p>
        </div>
      </div>

      <p className="text-sm text-slate-400">질문할 주제를 선택하세요:</p>

      <div className="flex flex-wrap gap-2">
        {['알리바이', '관계', '목격담'].map(topic => (
          <button
            key={topic}
            onClick={() => {
              setSelectedTopic(topic);
              onAsk();
            }}
            className={`
              px-3 py-1.5 rounded text-sm transition-all
              ${selectedTopic === topic
                ? 'bg-emerald-500 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}
            `}
          >
            {topic}
          </button>
        ))}
      </div>

      {questionAsked && selectedTopic && (
        <div className="bg-slate-800 rounded-lg p-3 border border-slate-700">
          <p className="text-sm text-slate-300">
            "그 시간에요? 저는 도서관에 있었어요... (눈을 피하며)"
          </p>
          <p className="text-xs text-amber-400 mt-2">
            💡 용의자가 불안해 보입니다. 더 캐물어 보세요!
          </p>
        </div>
      )}
    </div>
  );
}

function InteractiveDeductionDemo({
  onDeduction,
  deductionMade
}: {
  onDeduction: () => void;
  deductionMade: boolean;
}) {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    if (input.trim()) {
      onDeduction();
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-400">추론을 작성해보세요:</p>

      <div className="flex gap-2">
        <select className="bg-slate-700 border border-slate-600 rounded px-3 py-2 text-sm text-white">
          <option>WHO (범인)</option>
          <option>WHY (동기)</option>
          <option>HOW (방법)</option>
        </select>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="예: 범인은 김모씨다. 왜냐하면..."
          className="flex-1 bg-slate-700 border border-slate-600 rounded px-3 py-2 text-sm text-white placeholder:text-slate-500"
          disabled={deductionMade}
        />
        <button
          onClick={handleSubmit}
          disabled={deductionMade || !input.trim()}
          className="btn-accent px-4 disabled:opacity-50"
        >
          제출
        </button>
      </div>

      {deductionMade && (
        <div className="text-center text-emerald-400 text-sm">
          ✓ 추론이 기록되었습니다! 3개가 모이면 검증할 수 있습니다.
        </div>
      )}
    </div>
  );
}

export default TutorialPage;
