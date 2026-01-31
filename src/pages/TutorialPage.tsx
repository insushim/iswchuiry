import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, MessageSquare, Brain, Target } from 'lucide-react';

export function TutorialPage() {
  const navigate = useNavigate();

  const steps = [
    {
      icon: Search,
      title: '1. 조사하기',
      description: '다양한 장소를 탐색하고 물건을 조사하여 증거를 수집하세요. 모든 단서가 중요할 수 있습니다.'
    },
    {
      icon: MessageSquare,
      title: '2. 심문하기',
      description: '용의자들과 대화하여 정보를 얻으세요. 증거를 제시하면 비밀을 밝혀낼 수 있습니다.'
    },
    {
      icon: Brain,
      title: '3. 추론하기',
      description: '수집한 증거를 바탕으로 추론을 작성하세요. 3개의 추론을 한 번에 확인하여 사실을 확정할 수 있습니다.'
    },
    {
      icon: Target,
      title: '4. 범인 지목하기',
      description: '충분한 증거와 사실이 모이면 범인을 지목하세요. 신중하게 결정하세요!'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-slate-400 hover:text-white mb-8"
        >
          <ArrowLeft size={20} />
          돌아가기
        </button>

        <h1 className="text-3xl font-bold text-white mb-8">게임 방법</h1>

        <div className="space-y-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="card flex gap-4">
                <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                  <Icon size={24} className="text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{step.title}</h3>
                  <p className="text-slate-400">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 card bg-amber-500/10 border-amber-500/30">
          <h3 className="font-bold text-amber-400 mb-2">팁</h3>
          <ul className="space-y-2 text-slate-300 text-sm">
            <li>모든 장소와 물건을 꼼꼼히 조사하세요.</li>
            <li>용의자들의 알리바이에 빈틈이 있는지 확인하세요.</li>
            <li>힌트는 아껴서 사용하세요. 점수에 영향을 줍니다.</li>
            <li>미끼 증거에 속지 마세요!</li>
          </ul>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => navigate('/new-game')}
            className="btn-accent px-8 py-3"
          >
            게임 시작하기
          </button>
        </div>
      </div>
    </div>
  );
}
