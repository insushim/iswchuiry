import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import { ChevronRight, Search, FileText, Clock, Users, AlertTriangle } from 'lucide-react';

const DIFFICULTY_LABELS: Record<string, { label: string; color: string }> = {
  easy: { label: '쉬움', color: 'bg-green-500' },
  medium: { label: '보통', color: 'bg-blue-500' },
  hard: { label: '어려움', color: 'bg-orange-500' },
  expert: { label: '전문가', color: 'bg-red-500' }
};

const TYPE_LABELS: Record<string, string> = {
  theft: '도난', vandalism: '기물파손', mystery: '미스터리',
  disappearance: '실종', fraud: '사기', blackmail: '협박'
};

export function IntroPhase() {
  const { currentCase, setPhase } = useGameStore();
  const [stage, setStage] = useState<'file' | 'prologue' | 'intro'>('file');
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showButton, setShowButton] = useState(false);

  if (!currentCase) return null;

  const diff = DIFFICULTY_LABELS[currentCase.difficulty] || DIFFICULTY_LABELS.medium;
  const lines = stage === 'prologue' ? currentCase.prologue : currentCase.introduction;

  // Typing effect
  useEffect(() => {
    if (stage === 'file') return;
    if (currentLine >= lines.length) {
      setShowButton(true);
      return;
    }

    const line = lines[currentLine];
    let idx = 0;
    setIsTyping(true);
    setDisplayedText('');

    const interval = setInterval(() => {
      if (idx < line.length) {
        setDisplayedText(line.slice(0, idx + 1));
        idx++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 35);

    return () => clearInterval(interval);
  }, [currentLine, stage, lines]);

  const handleClick = () => {
    if (stage === 'file') {
      setStage('prologue');
      return;
    }
    if (isTyping) {
      setDisplayedText(lines[currentLine]);
      setIsTyping(false);
      return;
    }
    if (currentLine < lines.length - 1) {
      setCurrentLine(prev => prev + 1);
      return;
    }
    if (stage === 'prologue') {
      setStage('intro');
      setCurrentLine(0);
      setShowButton(false);
      return;
    }
    setPhase('investigation');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 cursor-pointer select-none" onClick={handleClick}>
      <AnimatePresence mode="wait">
        {/* Stage 1: Case File */}
        {stage === 'file' && (
          <motion.div
            key="file"
            className="flex-1 flex items-center justify-center p-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="max-w-lg w-full bg-slate-800/90 backdrop-blur-sm rounded-2xl border border-amber-500/30 overflow-hidden shadow-2xl shadow-amber-500/10"
              initial={{ y: 40, rotateX: 10 }}
              animate={{ y: 0, rotateX: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* File header */}
              <div className="bg-gradient-to-r from-amber-600/20 to-orange-600/20 border-b border-amber-500/20 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-amber-400">
                    <FileText className="w-5 h-5" />
                    <span className="text-sm font-bold tracking-wider">수사 의뢰서</span>
                  </div>
                  <div className={`px-3 py-1 ${diff.color} rounded-full text-xs font-bold text-white`}>
                    {diff.label}
                  </div>
                </div>
              </div>

              {/* File content */}
              <div className="p-6 space-y-5">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                  <h1 className="text-3xl font-bold text-white mb-1">{currentCase.title}</h1>
                  <p className="text-slate-400">{currentCase.subtitle}</p>
                </motion.div>

                <div className="h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent" />

                <motion.div className="grid grid-cols-2 gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                  <div className="flex items-center gap-2 text-slate-300">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    <span className="text-sm">{TYPE_LABELS[currentCase.type] || currentCase.type}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <span className="text-sm">약 {currentCase.estimatedTime}분</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Users className="w-4 h-4 text-purple-400" />
                    <span className="text-sm">용의자 {currentCase.characters.filter(c => !c.isVictim).length}명</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Search className="w-4 h-4 text-green-400" />
                    <span className="text-sm">증거 {currentCase.evidence.length}개</span>
                  </div>
                </motion.div>

                <motion.p
                  className="text-slate-400 text-sm leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  {currentCase.summary}
                </motion.p>

                <motion.div
                  className="text-center pt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <span className="text-amber-400/60 text-sm animate-pulse">클릭하여 시작</span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Stage 2 & 3: Prologue / Introduction */}
        {(stage === 'prologue' || stage === 'intro') && (
          <motion.div
            key={stage}
            className="flex-1 flex flex-col items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header */}
            <motion.div className="mb-8 text-center" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
              <div className="flex items-center justify-center gap-3 mb-3">
                <Search className="w-7 h-7 text-amber-400" />
                <span className="text-amber-400 text-lg font-medium">
                  {stage === 'prologue' ? '서막' : currentCase.title}
                </span>
              </div>
              {stage === 'intro' && (
                <p className="text-slate-500 text-sm">사건 브리핑</p>
              )}
            </motion.div>

            {/* Dialogue box */}
            <div className="w-full max-w-2xl">
              <motion.div
                className="glass p-8 min-h-[160px] flex items-center"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
              >
                <p className="text-xl text-white leading-relaxed w-full">
                  {displayedText}
                  {isTyping && <span className="animate-pulse text-amber-400">|</span>}
                </p>
              </motion.div>

              {/* Progress */}
              <div className="mt-4 flex items-center justify-between text-slate-500">
                <div className="flex gap-1.5">
                  {lines.map((_, i) => (
                    <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i <= currentLine ? 'bg-amber-400' : 'bg-slate-700'}`} />
                  ))}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span>클릭하여 계속</span>
                  <ChevronRight size={14} />
                </div>
              </div>
            </div>

            {/* Start button */}
            <AnimatePresence>
              {showButton && (
                <motion.div
                  className="mt-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.button
                    className="btn-accent px-10 py-4 text-lg flex items-center gap-3"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    animate={{ boxShadow: ['0 0 15px rgba(251,191,36,0.2)', '0 0 30px rgba(251,191,36,0.4)', '0 0 15px rgba(251,191,36,0.2)'] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {stage === 'prologue' ? '다음' : '조사 시작'}
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
