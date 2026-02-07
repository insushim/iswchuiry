import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import {
  ArrowLeft, Brain, Target, CheckCircle, XCircle,
  ChevronRight, Lightbulb, Sparkles, Users, FileSearch, AlertTriangle
} from 'lucide-react';

const MOTIVE_OPTIONS = [
  { value: 'revenge', label: '복수', desc: '과거의 원한을 갚기 위해' },
  { value: 'greed', label: '탐욕', desc: '금전적/물질적 이득을 위해' },
  { value: 'jealousy', label: '질투', desc: '시기와 질투심에서 비롯' },
  { value: 'fear', label: '공포/은폐', desc: '비밀이 탄로날까 두려워서' },
  { value: 'protection', label: '보호/방어', desc: '누군가를 지키기 위해' },
];

export function DeductionPhase() {
  const {
    currentCase, collectedEvidence, confirmedFacts,
    selectionDeduction, setSelectionDeduction, submitSelectionDeduction,
    setPhase, useHint, hintsRemaining
  } = useGameStore();

  const [submitResult, setSubmitResult] = useState<{
    suspectCorrect: boolean;
    motiveCorrect: boolean;
    evidenceCorrect: boolean;
  } | null>(null);
  const [hintMessage, setHintMessage] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  if (!currentCase) return null;

  const suspects = currentCase.characters.filter(c => !c.isVictim);
  const evidenceList = currentCase.evidence.filter(e => collectedEvidence.includes(e.id));
  const allSelected = selectionDeduction.suspectId && selectionDeduction.motiveType && selectionDeduction.keyEvidenceId;

  const handleSubmit = () => {
    if (!allSelected || hasSubmitted) return;
    const result = submitSelectionDeduction();
    setSubmitResult(result);
    setHasSubmitted(true);
  };

  const handleUseHint = () => {
    const hint = useHint();
    if (hint) {
      setHintMessage(hint);
      setTimeout(() => setHintMessage(null), 5000);
    }
  };

  const correctCount = submitResult
    ? [submitResult.suspectCorrect, submitResult.motiveCorrect, submitResult.evidenceCorrect].filter(Boolean).length
    : 0;

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
              <p className="text-sm text-purple-300/80">증거를 분석하여 범인, 동기, 핵심 증거를 선택하세요</p>
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
        <div className="max-w-3xl mx-auto space-y-6">
          {/* 1. 범인 선택 */}
          <motion.div
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Users size={18} className="text-red-400" />
              <h3 className="text-lg font-semibold text-white">1. 범인은 누구인가?</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {suspects.map(suspect => {
                const isSelected = selectionDeduction.suspectId === suspect.id;
                const isCorrect = submitResult && isSelected ? submitResult.suspectCorrect : null;
                return (
                  <motion.button
                    key={suspect.id}
                    onClick={() => !hasSubmitted && setSelectionDeduction('suspectId', isSelected ? null : suspect.id)}
                    disabled={hasSubmitted}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isCorrect === true ? 'border-green-500 bg-green-500/15' :
                      isCorrect === false ? 'border-red-500 bg-red-500/15' :
                      isSelected ? 'border-red-500/60 bg-red-500/10' :
                      'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                    }`}
                    whileHover={!hasSubmitted ? { scale: 1.02 } : {}}
                    whileTap={!hasSubmitted ? { scale: 0.98 } : {}}
                  >
                    <div className="flex items-center gap-2">
                      {isCorrect === true && <CheckCircle size={16} className="text-green-400" />}
                      {isCorrect === false && <XCircle size={16} className="text-red-400" />}
                      {isCorrect === null && isSelected && <Target size={16} className="text-red-400" />}
                      <div>
                        <p className="font-semibold text-white text-sm">{suspect.name}</p>
                        <p className="text-xs text-slate-400">{suspect.occupation}</p>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* 2. 동기 선택 */}
          <motion.div
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle size={18} className="text-purple-400" />
              <h3 className="text-lg font-semibold text-white">2. 동기는 무엇인가?</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {MOTIVE_OPTIONS.map(option => {
                const isSelected = selectionDeduction.motiveType === option.value;
                const isCorrect = submitResult && isSelected ? submitResult.motiveCorrect : null;
                return (
                  <motion.button
                    key={option.value}
                    onClick={() => !hasSubmitted && setSelectionDeduction('motiveType', isSelected ? null : option.value)}
                    disabled={hasSubmitted}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isCorrect === true ? 'border-green-500 bg-green-500/15' :
                      isCorrect === false ? 'border-red-500 bg-red-500/15' :
                      isSelected ? 'border-purple-500/60 bg-purple-500/10' :
                      'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                    }`}
                    whileHover={!hasSubmitted ? { scale: 1.02 } : {}}
                    whileTap={!hasSubmitted ? { scale: 0.98 } : {}}
                  >
                    <div className="flex items-center gap-2">
                      {isCorrect === true && <CheckCircle size={16} className="text-green-400" />}
                      {isCorrect === false && <XCircle size={16} className="text-red-400" />}
                      <div>
                        <p className="font-semibold text-white text-sm">{option.label}</p>
                        <p className="text-xs text-slate-400">{option.desc}</p>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* 3. 핵심 증거 선택 */}
          <motion.div
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <FileSearch size={18} className="text-amber-400" />
              <h3 className="text-lg font-semibold text-white">3. 가장 결정적인 증거는?</h3>
            </div>
            {evidenceList.length === 0 ? (
              <p className="text-slate-500 text-sm text-center py-4">수집한 증거가 없습니다. 조사를 먼저 진행하세요.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-48 overflow-y-auto">
                {evidenceList.map(ev => {
                  const isSelected = selectionDeduction.keyEvidenceId === ev.id;
                  const isCorrect = submitResult && isSelected ? submitResult.evidenceCorrect : null;
                  return (
                    <motion.button
                      key={ev.id}
                      onClick={() => !hasSubmitted && setSelectionDeduction('keyEvidenceId', isSelected ? null : ev.id)}
                      disabled={hasSubmitted}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        isCorrect === true ? 'border-green-500 bg-green-500/15' :
                        isCorrect === false ? 'border-red-500 bg-red-500/15' :
                        isSelected ? 'border-amber-500/60 bg-amber-500/10' :
                        'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                      }`}
                      whileHover={!hasSubmitted ? { scale: 1.02 } : {}}
                      whileTap={!hasSubmitted ? { scale: 0.98 } : {}}
                    >
                      <p className="font-medium text-white text-sm">{ev.name}</p>
                      <p className="text-xs text-slate-400 line-clamp-2 mt-1">{ev.description}</p>
                    </motion.button>
                  );
                })}
              </div>
            )}
          </motion.div>

          {/* 추론 확인 버튼 */}
          {!hasSubmitted && (
            <motion.button
              onClick={handleSubmit}
              disabled={!allSelected}
              className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${
                allSelected
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-500 hover:to-indigo-500'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
              whileHover={allSelected ? { scale: 1.02 } : {}}
              whileTap={allSelected ? { scale: 0.98 } : {}}
              animate={allSelected ? {
                boxShadow: ['0 0 10px rgba(147,51,234,0.2)', '0 0 25px rgba(147,51,234,0.4)', '0 0 10px rgba(147,51,234,0.2)']
              } : {}}
              transition={allSelected ? { duration: 2, repeat: Infinity } : {}}
            >
              <Sparkles size={20} />
              추론 확인하기
            </motion.button>
          )}

          {/* 결과 표시 */}
          <AnimatePresence>
            {submitResult && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className={`card text-center p-6 ${
                  correctCount === 3
                    ? 'border-green-500/50 bg-green-500/10'
                    : correctCount >= 1
                    ? 'border-amber-500/50 bg-amber-500/10'
                    : 'border-red-500/50 bg-red-500/10'
                }`}
              >
                <div className={`text-5xl mb-3 ${correctCount === 3 ? '' : ''}`}>
                  {correctCount === 3 ? '🎉' : correctCount >= 2 ? '🤔' : correctCount >= 1 ? '😕' : '❌'}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {correctCount === 3 ? '완벽한 추리!' : `${correctCount}/3 정답`}
                </h3>
                <p className="text-slate-400 mb-4">
                  {correctCount === 3 ? '모든 추론이 정확합니다! 범인을 지목하세요.'
                    : correctCount >= 2 ? '거의 다 맞았습니다! 한 번 더 생각해보세요.'
                    : '증거를 다시 검토하고 용의자 프로필을 대조해보세요.'}
                </p>
                <div className="flex justify-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${submitResult.suspectCorrect ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    범인 {submitResult.suspectCorrect ? '✓' : '✗'}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${submitResult.motiveCorrect ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    동기 {submitResult.motiveCorrect ? '✓' : '✗'}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${submitResult.evidenceCorrect ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    증거 {submitResult.evidenceCorrect ? '✓' : '✗'}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

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
          <div className="flex gap-2">
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
              onClick={handleUseHint}
              disabled={hintsRemaining <= 0}
              className="btn-secondary flex items-center gap-2 text-sm"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Lightbulb size={16} className="text-yellow-400" />
              힌트 ({hintsRemaining})
            </motion.button>
          </div>
          <motion.button
            onClick={() => setPhase('accusation')}
            disabled={!hasSubmitted || correctCount < 1}
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
