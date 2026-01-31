import React, { useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import {
  ArrowLeft, Brain, Target, CheckCircle, XCircle,
  Plus, ChevronRight, Lightbulb
} from 'lucide-react';

export function DeductionPhase() {
  const {
    currentCase,
    collectedEvidence,
    deductions,
    confirmedFacts,
    addDeduction,
    confirmDeductions,
    setPhase,
    useHint,
    hintsRemaining
  } = useGameStore();

  const [newDeduction, setNewDeduction] = useState({
    type: 'who' as 'who' | 'why' | 'how' | 'when' | 'where',
    statement: '',
    selectedEvidence: [] as string[]
  });
  const [confirmResult, setConfirmResult] = useState<{ correct: number; total: number } | null>(null);
  const [hintMessage, setHintMessage] = useState<string | null>(null);

  if (!currentCase) return null;

  const pendingDeductions = deductions.filter(d => !d.isConfirmed);
  const confirmedDeductions = deductions.filter(d => d.isConfirmed);

  const handleAddDeduction = () => {
    if (!newDeduction.statement.trim() || newDeduction.selectedEvidence.length === 0) return;

    addDeduction(
      newDeduction.type,
      newDeduction.statement,
      newDeduction.selectedEvidence
    );

    setNewDeduction({
      type: 'who',
      statement: '',
      selectedEvidence: []
    });
  };

  const handleConfirm = () => {
    if (pendingDeductions.length < 3) {
      alert('3개의 추론이 필요합니다.');
      return;
    }

    const result = confirmDeductions();
    setConfirmResult(result);

    setTimeout(() => setConfirmResult(null), 3000);
  };

  const handleUseHint = () => {
    const hint = useHint();
    if (hint) {
      setHintMessage(hint);
      setTimeout(() => setHintMessage(null), 5000);
    }
  };

  const toggleEvidence = (evId: string) => {
    setNewDeduction(prev => ({
      ...prev,
      selectedEvidence: prev.selectedEvidence.includes(evId)
        ? prev.selectedEvidence.filter(id => id !== evId)
        : [...prev.selectedEvidence, evId]
    }));
  };

  const typeLabels: Record<string, string> = {
    who: '누가 (범인)',
    why: '왜 (동기)',
    how: '어떻게 (방법)',
    when: '언제',
    where: '어디서'
  };

  return (
    <div className="h-full flex flex-col">
      {/* 헤더 */}
      <div className="p-4 bg-purple-900/20 border-b border-purple-500/30">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Brain className="text-purple-400" size={28} />
            <div>
              <h2 className="text-2xl font-bold text-white">추론 보드</h2>
              <p className="text-purple-300 text-sm">증거를 연결하여 사실을 밝혀내세요</p>
            </div>
          </div>

          <button
            onClick={() => setPhase('investigation')}
            className="btn-secondary flex items-center gap-2"
          >
            <ArrowLeft size={18} />
            조사로 돌아가기
          </button>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          {/* 왼쪽: 새 추론 작성 */}
          <div>
            <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
              <Plus size={18} className="text-purple-400" />
              새 추론 작성
            </h3>

            <div className="card space-y-4">
              {/* 추론 유형 선택 */}
              <div>
                <label className="block text-sm text-slate-400 mb-2">추론 유형</label>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(typeLabels).map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() => setNewDeduction(prev => ({ ...prev, type: key as 'who' | 'why' | 'how' | 'when' | 'where' }))}
                      className={`px-3 py-1 rounded-lg text-sm transition-all ${
                        newDeduction.type === key
                          ? 'bg-purple-500 text-white'
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 추론 내용 */}
              <div>
                <label className="block text-sm text-slate-400 mb-2">추론 내용</label>
                <textarea
                  value={newDeduction.statement}
                  onChange={(e) => setNewDeduction(prev => ({ ...prev, statement: e.target.value }))}
                  placeholder={`${typeLabels[newDeduction.type]}에 대한 추론을 작성하세요...`}
                  className="input h-24 resize-none"
                />
              </div>

              {/* 증거 선택 */}
              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  근거 증거 선택 ({newDeduction.selectedEvidence.length})
                </label>
                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                  {collectedEvidence.map(evId => {
                    const evidence = currentCase.evidence.find(e => e.id === evId);
                    if (!evidence) return null;

                    const isSelected = newDeduction.selectedEvidence.includes(evId);

                    return (
                      <button
                        key={evId}
                        onClick={() => toggleEvidence(evId)}
                        className={`px-3 py-1 rounded-lg text-sm transition-all ${
                          isSelected
                            ? 'bg-green-500/20 text-green-300 border border-green-500/50'
                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        }`}
                      >
                        {evidence.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={handleAddDeduction}
                disabled={!newDeduction.statement.trim() || newDeduction.selectedEvidence.length === 0}
                className="w-full btn-primary"
              >
                추론 추가
              </button>
            </div>

            {/* 힌트 버튼 */}
            <button
              onClick={handleUseHint}
              disabled={hintsRemaining <= 0}
              className="mt-4 w-full btn-secondary flex items-center justify-center gap-2"
            >
              <Lightbulb size={18} />
              힌트 사용 ({hintsRemaining})
            </button>
          </div>

          {/* 오른쪽: 대기 중인 추론 & 확정된 사실 */}
          <div className="space-y-6">
            {/* 대기 중인 추론 */}
            <div>
              <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                <Brain size={18} className="text-amber-400" />
                대기 중인 추론 ({pendingDeductions.length}/3)
              </h3>

              <div className="space-y-2">
                {pendingDeductions.map(ded => (
                  <div key={ded.id} className="card bg-amber-500/10 border-amber-500/30">
                    <div className="flex items-start gap-3">
                      <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 text-xs rounded">
                        {typeLabels[ded.type]}
                      </span>
                      <p className="text-white text-sm flex-1">{ded.statement}</p>
                    </div>
                  </div>
                ))}

                {pendingDeductions.length === 0 && (
                  <p className="text-slate-500 text-center py-4">
                    추론을 추가해주세요
                  </p>
                )}

                {pendingDeductions.length >= 3 && (
                  <button
                    onClick={handleConfirm}
                    className="w-full btn-accent mt-2"
                  >
                    3개 추론 확인하기
                  </button>
                )}
              </div>
            </div>

            {/* 확정된 사실 */}
            <div>
              <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                <CheckCircle size={18} className="text-green-400" />
                확정된 사실 ({confirmedFacts.length})
              </h3>

              <div className="space-y-2">
                {confirmedDeductions.filter(d => d.isCorrect).map(ded => (
                  <div key={ded.id} className="card bg-green-500/10 border-green-500/30">
                    <div className="flex items-start gap-3">
                      <CheckCircle size={16} className="text-green-400 mt-0.5" />
                      <p className="text-white text-sm flex-1">{ded.statement}</p>
                    </div>
                  </div>
                ))}

                {confirmedDeductions.filter(d => !d.isCorrect).map(ded => (
                  <div key={ded.id} className="card bg-red-500/10 border-red-500/30">
                    <div className="flex items-start gap-3">
                      <XCircle size={16} className="text-red-400 mt-0.5" />
                      <p className="text-slate-400 text-sm flex-1 line-through">{ded.statement}</p>
                    </div>
                  </div>
                ))}

                {confirmedFacts.length === 0 && (
                  <p className="text-slate-500 text-center py-4">
                    아직 확정된 사실이 없습니다
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 확인 결과 팝업 */}
      {confirmResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="card text-center p-8">
            <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
              confirmResult.correct === 3 ? 'bg-green-500' : 'bg-amber-500'
            }`}>
              {confirmResult.correct === 3 ? (
                <CheckCircle size={32} className="text-white" />
              ) : (
                <span className="text-2xl font-bold text-white">{confirmResult.correct}/3</span>
              )}
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              {confirmResult.correct === 3 ? '완벽합니다!' : `${confirmResult.correct}개 정답`}
            </h3>
            <p className="text-slate-400">
              {confirmResult.correct}개의 추론이 사실로 확정되었습니다
            </p>
          </div>
        </div>
      )}

      {/* 힌트 메시지 */}
      {hintMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 max-w-md w-full mx-4">
          <div className="card bg-purple-500/20 border-purple-500/50">
            <p className="text-purple-300">{hintMessage}</p>
          </div>
        </div>
      )}

      {/* 하단 네비게이션 */}
      <div className="p-4 bg-slate-900/80 backdrop-blur-sm border-t border-slate-700">
        <div className="max-w-4xl mx-auto flex justify-end">
          <button
            onClick={() => setPhase('accusation')}
            disabled={confirmedFacts.length < 2}
            className="btn-danger flex items-center gap-2"
          >
            <Target size={18} />
            범인 지목하기
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
