import React, { useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { ArrowLeft, Target, User, AlertTriangle, Check } from 'lucide-react';

export function AccusationPhase() {
  const {
    currentCase,
    confirmedFacts,
    makeAccusation,
    setPhase
  } = useGameStore();

  const [selectedSuspect, setSelectedSuspect] = useState<string | null>(null);
  const [step, setStep] = useState<'select' | 'confirm'>('select');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!currentCase) return null;

  const suspects = currentCase.characters.filter(c => !c.isVictim);
  const selectedCharacter = suspects.find(s => s.id === selectedSuspect);

  const handleSubmit = async () => {
    if (!selectedSuspect) return;

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    makeAccusation(selectedSuspect);
  };

  return (
    <div className="h-full flex flex-col">
      {/* 헤더 */}
      <div className="p-4 bg-red-900/20 border-b border-red-500/30">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Target className="text-red-400" size={28} />
            <div>
              <h2 className="text-2xl font-bold text-white">최종 고발</h2>
              <p className="text-red-300 text-sm">범인을 지목하세요</p>
            </div>
          </div>

          {step === 'select' && (
            <button
              onClick={() => setPhase('deduction')}
              className="btn-secondary flex items-center gap-2"
            >
              <ArrowLeft size={18} />
              돌아가기
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {step === 'select' ? (
            <>
              {/* 용의자 선택 */}
              <h3 className="text-xl font-bold text-white mb-6 text-center">
                범인이라고 생각하는 사람을 선택하세요
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {suspects.map((suspect) => (
                  <button
                    key={suspect.id}
                    onClick={() => setSelectedSuspect(suspect.id)}
                    className={`card text-center transition-all transform hover:scale-102 ${
                      selectedSuspect === suspect.id
                        ? 'ring-2 ring-red-500 bg-red-500/10'
                        : ''
                    }`}
                  >
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center mx-auto mb-3">
                      <User size={32} className="text-white" />
                    </div>
                    <h4 className="font-bold text-white">{suspect.name}</h4>
                    <p className="text-sm text-slate-400">{suspect.occupation}</p>

                    {selectedSuspect === suspect.id && (
                      <div className="mt-3 flex justify-center">
                        <span className="px-3 py-1 bg-red-500 text-white text-sm rounded-full">
                          선택됨
                        </span>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {selectedSuspect && (
                <div className="flex justify-center">
                  <button
                    onClick={() => setStep('confirm')}
                    className="btn-danger px-8 py-3 text-lg"
                  >
                    다음
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              {/* 최종 확인 */}
              <div className="text-center mb-8">
                <div className="w-24 h-24 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <AlertTriangle size={48} className="text-red-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">최종 확인</h3>
                <p className="text-slate-400">한 번 제출하면 되돌릴 수 없습니다</p>
              </div>

              <div className="card max-w-md mx-auto mb-8">
                <div className="text-center mb-4">
                  <p className="text-slate-400 text-sm">지목한 범인</p>
                  <p className="text-2xl font-bold text-red-400">{selectedCharacter?.name}</p>
                  <p className="text-slate-400">{selectedCharacter?.occupation}</p>
                </div>

                <div className="border-t border-slate-700 pt-4">
                  <p className="text-slate-400 text-sm mb-2">확보한 근거</p>
                  <ul className="space-y-1">
                    {confirmedFacts.slice(0, 3).map((fact, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Check size={14} className="text-green-400 mt-0.5" />
                        <span className="text-slate-300">{fact}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setStep('select')}
                  disabled={isSubmitting}
                  className="btn-secondary px-6 py-3"
                >
                  다시 선택
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="btn-danger px-8 py-3 text-lg flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      판결 중...
                    </>
                  ) : (
                    <>
                      <Target size={20} />
                      최종 고발!
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
