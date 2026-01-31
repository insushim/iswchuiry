import React, { useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import {
  MapPin, Search, Eye, MessageSquare, Brain,
  ChevronRight, Lightbulb, X, Check
} from 'lucide-react';

export function InvestigationPhase() {
  const {
    currentCase,
    currentLocation,
    collectedEvidence,
    examinedObjects,
    setLocation,
    setPhase,
    examineObject,
    useHint,
    hintsRemaining
  } = useGameStore();

  const [showLocationMap, setShowLocationMap] = useState(false);
  const [examineResult, setExamineResult] = useState<string | null>(null);
  const [hintMessage, setHintMessage] = useState<string | null>(null);

  if (!currentCase) return null;

  const location = currentCase.locations.find(l => l.id === currentLocation);

  const handleExamine = (objectId: string) => {
    const result = examineObject(objectId);
    setExamineResult(result.message);

    // 3초 후 메시지 제거
    setTimeout(() => setExamineResult(null), 3000);
  };

  const handleUseHint = () => {
    const hint = useHint();
    if (hint) {
      setHintMessage(hint);
      setTimeout(() => setHintMessage(null), 5000);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* 장소 정보 */}
      <div className="p-4 bg-slate-800/50 border-b border-slate-700">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <MapPin size={20} className="text-green-400" />
              {location?.name || '장소 없음'}
            </h2>
            <p className="text-sm text-slate-400">{location?.description}</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setShowLocationMap(true)}
              className="btn-secondary flex items-center gap-2"
            >
              <MapPin size={16} />
              이동
            </button>
          </div>
        </div>
      </div>

      {/* 메인 조사 영역 */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {/* 조사 가능한 물건들 */}
          <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
            <Search size={18} className="text-amber-400" />
            조사할 수 있는 것들
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
            {location?.objects.map(obj => {
              const isExamined = examinedObjects.includes(obj.id);

              return (
                <button
                  key={obj.id}
                  onClick={() => handleExamine(obj.id)}
                  disabled={isExamined}
                  className={`
                    card text-left transition-all transform hover:scale-102
                    ${isExamined
                      ? 'opacity-60 border-green-500/30'
                      : 'hover:border-amber-500/50 cursor-pointer'}
                  `}
                >
                  <div className="flex items-start justify-between mb-2">
                    <Eye size={18} className={isExamined ? 'text-green-400' : 'text-slate-400'} />
                    {isExamined && <Check size={16} className="text-green-400" />}
                  </div>
                  <h4 className="font-medium text-white">{obj.name}</h4>
                  <p className="text-xs text-slate-400">{obj.description}</p>
                </button>
              );
            })}
          </div>

          {/* 수집한 증거 */}
          <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
            <Search size={18} className="text-green-400" />
            수집한 증거 ({collectedEvidence.length})
          </h3>

          <div className="space-y-2 mb-6">
            {collectedEvidence.map(evId => {
              const evidence = currentCase.evidence.find(e => e.id === evId);
              if (!evidence) return null;

              return (
                <div key={evId} className="card bg-green-500/10 border-green-500/30">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Search size={16} className="text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{evidence.name}</h4>
                      <p className="text-xs text-slate-400">{evidence.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}

            {collectedEvidence.length === 0 && (
              <p className="text-slate-500 text-center py-4">
                아직 수집한 증거가 없습니다. 물건을 조사해보세요.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 조사 결과 팝업 */}
      {examineResult && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 max-w-md w-full mx-4 animate-fade-in">
          <div className="card bg-slate-900/95 backdrop-blur-sm border-amber-500/50">
            <p className="text-white">{examineResult}</p>
          </div>
        </div>
      )}

      {/* 힌트 메시지 */}
      {hintMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 max-w-md w-full mx-4 animate-fade-in">
          <div className="card bg-purple-500/20 border-purple-500/50">
            <p className="text-purple-300">{hintMessage}</p>
          </div>
        </div>
      )}

      {/* 하단 네비게이션 */}
      <div className="p-4 bg-slate-900/80 backdrop-blur-sm border-t border-slate-700">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={handleUseHint}
            disabled={hintsRemaining <= 0}
            className="btn-secondary flex items-center gap-2"
          >
            <Lightbulb size={18} />
            힌트 ({hintsRemaining})
          </button>

          <div className="flex gap-2">
            <button
              onClick={() => setPhase('interrogation')}
              className="btn-secondary flex items-center gap-2"
            >
              <MessageSquare size={18} />
              심문하기
            </button>

            <button
              onClick={() => setPhase('deduction')}
              disabled={collectedEvidence.length < 2}
              className="btn-primary flex items-center gap-2"
            >
              <Brain size={18} />
              추론하기
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* 장소 이동 모달 */}
      {showLocationMap && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
          <div className="card max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">장소 이동</h3>
              <button
                onClick={() => setShowLocationMap(false)}
                className="p-2 hover:bg-slate-700 rounded-lg"
              >
                <X size={20} className="text-slate-400" />
              </button>
            </div>

            <div className="space-y-2">
              {currentCase.locations.map(loc => (
                <button
                  key={loc.id}
                  onClick={() => {
                    setLocation(loc.id);
                    setShowLocationMap(false);
                  }}
                  className={`w-full card text-left transition-all ${
                    loc.id === currentLocation
                      ? 'border-indigo-500 bg-indigo-500/10'
                      : 'hover:border-slate-600'
                  }`}
                >
                  <h4 className="font-medium text-white">{loc.name}</h4>
                  <p className="text-xs text-slate-400">{loc.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
