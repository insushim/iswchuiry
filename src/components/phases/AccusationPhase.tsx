import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import {
  ArrowLeft, Target, User, AlertTriangle, Check,
  ChevronRight, Shield, Gavel
} from 'lucide-react';

export function AccusationPhase() {
  const { currentCase, confirmedFacts, makeAccusation, setPhase } = useGameStore();
  const [selectedSuspect, setSelectedSuspect] = useState<string | null>(null);
  const [step, setStep] = useState<'select' | 'confirm'>('select');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!currentCase) return null;

  const suspects = currentCase.characters.filter(c => !c.isVictim);
  const selectedCharacter = suspects.find(s => s.id === selectedSuspect);

  const handleSubmit = async () => {
    if (!selectedSuspect) return;
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2500));
    makeAccusation(selectedSuspect);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <motion.div
        className="p-5 bg-gradient-to-b from-red-900/30 to-slate-800/50 backdrop-blur-sm border-b border-red-500/20"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
              <Gavel className="text-red-400" size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">최종 고발</h2>
              <p className="text-sm text-red-300/80">증거를 토대로 범인을 지목하세요</p>
            </div>
          </div>
          {step === 'select' && (
            <motion.button
              onClick={() => setPhase('deduction')}
              className="btn-secondary flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft size={16} />
              돌아가기
            </motion.button>
          )}
        </div>
      </motion.div>

      <div className="flex-1 p-5 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            {step === 'select' ? (
              <motion.div
                key="select"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">범인이라고 생각하는 사람은?</h3>
                  <p className="text-slate-400 text-sm">신중하게 선택하세요. 한 번의 기회뿐입니다.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  {suspects.map((suspect, i) => (
                    <motion.button
                      key={suspect.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      onClick={() => setSelectedSuspect(suspect.id)}
                      className={`card text-center relative overflow-hidden group ${
                        selectedSuspect === suspect.id
                          ? 'ring-2 ring-red-500 bg-red-500/10 border-red-500/40'
                          : 'hover:border-slate-500'
                      }`}
                      whileHover={{ scale: 1.03, y: -3 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <div className={`w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center transition-all ${
                        selectedSuspect === suspect.id
                          ? 'bg-gradient-to-br from-red-500 to-rose-600'
                          : 'bg-gradient-to-br from-slate-600 to-slate-700 group-hover:from-slate-500 group-hover:to-slate-600'
                      }`}>
                        <User size={28} className="text-white" />
                      </div>
                      <h4 className="font-bold text-white mb-1">{suspect.name}</h4>
                      <p className="text-xs text-slate-400">{suspect.occupation}</p>

                      <AnimatePresence>
                        {selectedSuspect === suspect.id && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            className="absolute top-2 right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
                          >
                            <Target size={14} className="text-white" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  ))}
                </div>

                <AnimatePresence>
                  {selectedSuspect && (
                    <motion.div
                      className="flex justify-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.button
                        onClick={() => setStep('confirm')}
                        className="btn-danger px-10 py-3 text-lg flex items-center gap-3"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        다음
                        <ChevronRight size={18} />
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                key="confirm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {/* Confirmation screen */}
                <div className="text-center mb-8">
                  <motion.div
                    className="w-24 h-24 rounded-full bg-red-500/15 border-2 border-red-500/40 flex items-center justify-center mx-auto mb-5"
                    animate={{ scale: [1, 1.05, 1], borderColor: ['rgba(239,68,68,0.4)', 'rgba(239,68,68,0.8)', 'rgba(239,68,68,0.4)'] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <AlertTriangle size={42} className="text-red-400" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2">최종 확인</h3>
                  <p className="text-slate-400">한 번 제출하면 되돌릴 수 없습니다</p>
                </div>

                <motion.div
                  className="card max-w-md mx-auto mb-8 border-red-500/20"
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                >
                  <div className="text-center mb-5">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center mx-auto mb-3">
                      <User size={28} className="text-white" />
                    </div>
                    <p className="text-xs text-slate-400 mb-1">지목한 범인</p>
                    <p className="text-2xl font-bold text-red-400">{selectedCharacter?.name}</p>
                    <p className="text-slate-400 text-sm">{selectedCharacter?.occupation}</p>
                  </div>

                  {confirmedFacts.length > 0 && (
                    <div className="border-t border-slate-700 pt-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Shield size={14} className="text-green-400" />
                        <p className="text-sm text-slate-400">확보한 근거</p>
                      </div>
                      <ul className="space-y-2">
                        {confirmedFacts.slice(0, 4).map((fact, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-start gap-2 text-sm"
                          >
                            <Check size={14} className="text-green-400 mt-0.5 flex-shrink-0" />
                            <span className="text-slate-300">{fact}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>

                <div className="flex justify-center gap-4">
                  <motion.button
                    onClick={() => setStep('select')}
                    disabled={isSubmitting}
                    className="btn-secondary px-6 py-3"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    다시 선택
                  </motion.button>
                  <motion.button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="btn-danger px-8 py-3 text-lg flex items-center gap-2"
                    whileHover={!isSubmitting ? { scale: 1.05 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.95 } : {}}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        />
                        판결 중...
                      </>
                    ) : (
                      <>
                        <Gavel size={20} />
                        최종 고발!
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
