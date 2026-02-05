import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import {
  ArrowLeft, Brain, Target, CheckCircle, XCircle,
  Plus, ChevronRight, Lightbulb, X, Sparkles, Zap
} from 'lucide-react';

const TYPE_CONFIG: Record<string, { label: string; color: string; gradient: string }> = {
  who: { label: '누가 (범인)', color: 'text-red-400', gradient: 'from-red-500/20 to-red-600/10' },
  why: { label: '왜 (동기)', color: 'text-purple-400', gradient: 'from-purple-500/20 to-purple-600/10' },
  how: { label: '어떻게 (방법)', color: 'text-blue-400', gradient: 'from-blue-500/20 to-blue-600/10' },
  when: { label: '언제', color: 'text-amber-400', gradient: 'from-amber-500/20 to-amber-600/10' },
  where: { label: '어디서', color: 'text-green-400', gradient: 'from-green-500/20 to-green-600/10' }
};

export function DeductionPhase() {
  const {
    currentCase, collectedEvidence, deductions, confirmedFacts,
    addDeduction, confirmDeductions, setPhase, useHint, hintsRemaining
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
    addDeduction(newDeduction.type, newDeduction.statement, newDeduction.selectedEvidence);
    setNewDeduction({ type: 'who', statement: '', selectedEvidence: [] });
  };

  const handleConfirm = () => {
    if (pendingDeductions.length < 3) return;
    const result = confirmDeductions();
    setConfirmResult(result);
    setTimeout(() => setConfirmResult(null), 3500);
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

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <motion.div
        className="p-5 bg-gradient-to-b from-purple-900/30 to-slate-800/50 backdrop-blur-sm border-b border-purple-500/20"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <Brain className="text-purple-400" size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">추론 보드</h2>
              <p className="text-sm text-purple-300/80">증거를 연결하여 사실을 밝혀내세요</p>
            </div>
          </div>
          <motion.button
            onClick={() => setPhase('investigation')}
            className="btn-secondary flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={16} />
            조사로 돌아가기
          </motion.button>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="flex-1 p-5 overflow-y-auto">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          {/* Left: New deduction */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Plus size={18} className="text-purple-400" />
              새 추론 작성
            </h3>

            <div className="card space-y-5">
              {/* Type selection */}
              <div>
                <label className="block text-sm text-slate-400 mb-2">추론 유형</label>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(TYPE_CONFIG).map(([key, config]) => (
                    <motion.button
                      key={key}
                      onClick={() => setNewDeduction(prev => ({ ...prev, type: key as typeof prev.type }))}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        newDeduction.type === key
                          ? `bg-gradient-to-r ${config.gradient} ${config.color} border border-current/30`
                          : 'bg-slate-700/80 text-slate-300 hover:bg-slate-600'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {config.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Statement */}
              <div>
                <label className="block text-sm text-slate-400 mb-2">추론 내용</label>
                <textarea
                  value={newDeduction.statement}
                  onChange={(e) => setNewDeduction(prev => ({ ...prev, statement: e.target.value }))}
                  placeholder={`${TYPE_CONFIG[newDeduction.type].label}에 대한 추론을 작성하세요...`}
                  className="input h-24 resize-none"
                />
              </div>

              {/* Evidence selection */}
              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  근거 증거 선택
                  <span className="ml-2 text-indigo-400">({newDeduction.selectedEvidence.length}개)</span>
                </label>
                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-1">
                  {collectedEvidence.map(evId => {
                    const evidence = currentCase.evidence.find(e => e.id === evId);
                    if (!evidence) return null;
                    const isSelected = newDeduction.selectedEvidence.includes(evId);
                    return (
                      <motion.button
                        key={evId}
                        onClick={() => toggleEvidence(evId)}
                        className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                          isSelected
                            ? 'bg-green-500/20 text-green-300 border border-green-500/50'
                            : 'bg-slate-700/80 text-slate-300 hover:bg-slate-600 border border-transparent'
                        }`}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        {isSelected && <CheckCircle size={12} className="inline mr-1" />}
                        {evidence.name}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              <motion.button
                onClick={handleAddDeduction}
                disabled={!newDeduction.statement.trim() || newDeduction.selectedEvidence.length === 0}
                className="w-full btn-primary flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Plus size={16} />
                추론 추가
              </motion.button>
            </div>

            {/* Hint button */}
            <motion.button
              onClick={handleUseHint}
              disabled={hintsRemaining <= 0}
              className="mt-4 w-full btn-secondary flex items-center justify-center gap-2 text-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Lightbulb size={16} className="text-yellow-400" />
              힌트 사용 ({hintsRemaining})
            </motion.button>
          </motion.div>

          {/* Right: Pending & Confirmed */}
          <motion.div className="space-y-6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            {/* Pending deductions */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Zap size={18} className="text-amber-400" />
                대기 중인 추론
                <span className="text-sm font-normal text-slate-500">({pendingDeductions.length}/3)</span>
              </h3>

              <div className="space-y-3">
                <AnimatePresence>
                  {pendingDeductions.map((ded, i) => {
                    const config = TYPE_CONFIG[ded.type] || TYPE_CONFIG.who;
                    return (
                      <motion.div
                        key={ded.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ delay: i * 0.05 }}
                        className={`card bg-gradient-to-r ${config.gradient} border-amber-500/20`}
                      >
                        <div className="flex items-start gap-3">
                          <span className={`px-2 py-0.5 bg-slate-800/60 ${config.color} text-xs rounded-full font-medium`}>
                            {config.label}
                          </span>
                          <p className="text-white text-sm flex-1 leading-relaxed">{ded.statement}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>

                {pendingDeductions.length === 0 && (
                  <div className="text-center py-8">
                    <Brain size={32} className="text-slate-600 mx-auto mb-2" />
                    <p className="text-slate-500 text-sm">추론을 추가해주세요</p>
                  </div>
                )}

                {pendingDeductions.length >= 3 && (
                  <motion.button
                    onClick={handleConfirm}
                    className="w-full btn-accent flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    animate={{ boxShadow: ['0 0 10px rgba(251,191,36,0.2)', '0 0 25px rgba(251,191,36,0.4)', '0 0 10px rgba(251,191,36,0.2)'] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles size={16} />
                    3개 추론 확인하기
                  </motion.button>
                )}
              </div>
            </div>

            {/* Confirmed facts */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <CheckCircle size={18} className="text-green-400" />
                확정된 사실
                <span className="text-sm font-normal text-slate-500">({confirmedFacts.length})</span>
              </h3>

              <div className="space-y-2">
                <AnimatePresence>
                  {confirmedDeductions.filter(d => d.isCorrect).map(ded => (
                    <motion.div
                      key={ded.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="card bg-green-500/10 border-green-500/30"
                    >
                      <div className="flex items-start gap-3">
                        <CheckCircle size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                        <p className="text-white text-sm flex-1">{ded.statement}</p>
                      </div>
                    </motion.div>
                  ))}

                  {confirmedDeductions.filter(d => !d.isCorrect).map(ded => (
                    <motion.div
                      key={ded.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="card bg-red-500/10 border-red-500/30"
                    >
                      <div className="flex items-start gap-3">
                        <XCircle size={16} className="text-red-400 mt-0.5 flex-shrink-0" />
                        <p className="text-slate-400 text-sm flex-1 line-through">{ded.statement}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {confirmedFacts.length === 0 && confirmedDeductions.length === 0 && (
                  <div className="text-center py-6">
                    <p className="text-slate-500 text-sm">아직 확정된 사실이 없습니다</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Confirm Result Modal */}
      <AnimatePresence>
        {confirmResult && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="card text-center p-8 max-w-sm w-full">
                <motion.div
                  className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center ${
                    confirmResult.correct === 3 ? 'bg-gradient-to-br from-green-400 to-emerald-600' : 'bg-gradient-to-br from-amber-400 to-orange-600'
                  }`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', bounce: 0.5 }}
                >
                  {confirmResult.correct === 3 ? (
                    <Sparkles size={36} className="text-white" />
                  ) : (
                    <span className="text-3xl font-bold text-white">{confirmResult.correct}/3</span>
                  )}
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {confirmResult.correct === 3 ? '완벽합니다!' : `${confirmResult.correct}개 정답`}
                </h3>
                <p className="text-slate-400">
                  {confirmResult.correct}개의 추론이 사실로 확정되었습니다
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hint Toast */}
      <AnimatePresence>
        {hintMessage && (
          <motion.div
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 max-w-md w-full mx-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="card border-purple-500/40 bg-purple-500/10 backdrop-blur-lg">
              <div className="flex items-center gap-2">
                <Lightbulb size={16} className="text-purple-400" />
                <p className="text-purple-200 text-sm">{hintMessage}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom navigation */}
      <motion.div
        className="p-4 bg-slate-900/90 backdrop-blur-lg border-t border-slate-700/60"
        initial={{ y: 60 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <motion.button
            onClick={() => setPhase('interrogation')}
            className="btn-secondary flex items-center gap-2 text-sm"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <ArrowLeft size={14} />
            심문하기
          </motion.button>
          <motion.button
            onClick={() => setPhase('accusation')}
            disabled={confirmedFacts.length < 2}
            className="btn-danger flex items-center gap-2"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Target size={16} />
            범인 지목하기
            <ChevronRight size={14} />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
