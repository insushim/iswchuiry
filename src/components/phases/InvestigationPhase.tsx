import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import {
  MapPin, Search, Eye, MessageSquare, Brain,
  ChevronRight, Lightbulb, X, Check, Sparkles,
  FileText, Camera, Users, HardDrive, Microscope, Navigation
} from 'lucide-react';

const EVIDENCE_ICONS: Record<string, React.ElementType> = {
  physical: Camera, testimony: Users, document: FileText, digital: HardDrive, forensic: Microscope
};
const EVIDENCE_COLORS: Record<string, string> = {
  physical: 'text-blue-400', testimony: 'text-purple-400', document: 'text-amber-400',
  digital: 'text-cyan-400', forensic: 'text-green-400'
};

export function InvestigationPhase() {
  const {
    currentCase, currentLocation, collectedEvidence, examinedObjects,
    setLocation, setPhase, examineObject, useHint, hintsRemaining
  } = useGameStore();

  const [showLocationMap, setShowLocationMap] = useState(false);
  const [showEvidencePanel, setShowEvidencePanel] = useState(false);
  const [examineResult, setExamineResult] = useState<{ message: string; found: boolean } | null>(null);
  const [hintMessage, setHintMessage] = useState<string | null>(null);

  if (!currentCase) return null;

  const location = currentCase.locations.find(l => l.id === currentLocation);
  const evidenceDetails = currentCase.evidence.filter(e => collectedEvidence.includes(e.id));

  const handleExamine = (objectId: string) => {
    const result = examineObject(objectId);
    setExamineResult(result);
    setTimeout(() => setExamineResult(null), 3500);
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
      {/* Location Header */}
      <motion.div
        className="p-5 bg-gradient-to-b from-slate-800/90 to-slate-800/50 backdrop-blur-sm border-b border-slate-700/60"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="max-w-5xl mx-auto flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <MapPin size={18} className="text-blue-400" />
              <h2 className="text-xl font-bold text-white">{location?.name || '장소 없음'}</h2>
            </div>
            <p className="text-sm text-slate-400">{location?.description}</p>
            {location?.atmosphere && (
              <p className="text-xs text-slate-500 mt-1 italic">{location.atmosphere}</p>
            )}
          </div>
          <motion.button
            onClick={() => setShowLocationMap(true)}
            className="btn-secondary flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Navigation size={16} />
            이동
          </motion.button>
        </div>
      </motion.div>

      {/* Main Investigation Area */}
      <div className="flex-1 p-5 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          {/* Objects Grid */}
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Search size={18} className="text-amber-400" />
            조사할 수 있는 것들
            <span className="text-xs text-slate-500 ml-2">
              ({location?.objects.filter(o => examinedObjects.includes(o.id)).length || 0}/{location?.objects.length || 0})
            </span>
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            <AnimatePresence>
              {location?.objects.map((obj, i) => {
                const isExamined = examinedObjects.includes(obj.id);
                return (
                  <motion.button
                    key={obj.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    onClick={() => !isExamined && handleExamine(obj.id)}
                    disabled={isExamined}
                    className={`card text-left group relative overflow-hidden ${
                      isExamined
                        ? 'opacity-60 border-green-500/20'
                        : 'hover:border-amber-500/40 cursor-pointer'
                    }`}
                    whileHover={!isExamined ? { scale: 1.02, y: -2 } : {}}
                    whileTap={!isExamined ? { scale: 0.98 } : {}}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <Eye size={18} className={isExamined ? 'text-green-400' : 'text-slate-400 group-hover:text-amber-400 transition-colors'} />
                      {isExamined && <Check size={16} className="text-green-400" />}
                    </div>
                    <h4 className="font-semibold text-white text-sm mb-1">{obj.name}</h4>
                    <p className="text-xs text-slate-400 line-clamp-2">{obj.description}</p>
                    {!isExamined && (
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-amber-500/0 group-hover:from-amber-500/5 group-hover:to-orange-500/5 transition-all pointer-events-none" />
                    )}
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Collected Evidence */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Sparkles size={18} className="text-green-400" />
              수집한 증거 ({collectedEvidence.length})
            </h3>
            {collectedEvidence.length > 0 && (
              <button onClick={() => setShowEvidencePanel(true)} className="text-sm text-indigo-400 hover:text-indigo-300">
                전체 보기
              </button>
            )}
          </div>

          <div className="space-y-2 mb-6">
            {evidenceDetails.slice(0, 5).map(ev => {
              const Icon = EVIDENCE_ICONS[ev.type] || FileText;
              const color = EVIDENCE_COLORS[ev.type] || 'text-slate-400';
              return (
                <motion.div
                  key={ev.id}
                  className="card bg-green-500/5 border-green-500/20 flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <div className={`w-8 h-8 rounded-full bg-slate-700/50 flex items-center justify-center ${color}`}>
                    <Icon size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-white text-sm truncate">{ev.name}</h4>
                    <p className="text-xs text-slate-400 truncate">{ev.description}</p>
                  </div>
                  {ev.isCritical && <span className="text-xs text-red-400 font-medium">중요</span>}
                </motion.div>
              );
            })}
            {collectedEvidence.length === 0 && (
              <p className="text-slate-500 text-center py-6 text-sm">물건을 조사하여 증거를 찾아보세요.</p>
            )}
          </div>
        </div>
      </div>

      {/* Examine Result Toast */}
      <AnimatePresence>
        {examineResult && (
          <motion.div
            className="fixed bottom-28 left-1/2 -translate-x-1/2 z-50 max-w-md w-full mx-4"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <div className={`card backdrop-blur-lg ${examineResult.found ? 'border-amber-500/50 bg-amber-500/10' : 'border-slate-600'}`}>
              <div className="flex items-center gap-3">
                {examineResult.found ? <Sparkles size={18} className="text-amber-400" /> : <Search size={18} className="text-slate-400" />}
                <p className="text-white text-sm">{examineResult.message}</p>
              </div>
            </div>
          </motion.div>
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

      {/* Bottom Navigation */}
      <motion.div
        className="p-4 bg-slate-900/90 backdrop-blur-lg border-t border-slate-700/60"
        initial={{ y: 60 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
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
            <motion.button
              onClick={() => setShowEvidencePanel(true)}
              className="btn-secondary flex items-center gap-2 text-sm"
              whileHover={{ scale: 1.03 }}
            >
              <FileText size={16} className="text-blue-400" />
              증거함 ({collectedEvidence.length})
            </motion.button>
          </div>

          <div className="flex gap-2">
            <motion.button
              onClick={() => setPhase('interrogation')}
              className="btn-secondary flex items-center gap-2"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <MessageSquare size={16} className="text-purple-400" />
              심문하기
            </motion.button>
            <motion.button
              onClick={() => setPhase('deduction')}
              disabled={collectedEvidence.length < 2}
              className="btn-primary flex items-center gap-2"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Brain size={16} />
              추론하기
              <ChevronRight size={14} />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Location Map Modal */}
      <AnimatePresence>
        {showLocationMap && (
          <>
            <motion.div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowLocationMap(false)} />
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="card max-w-lg w-full max-h-[80vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <MapPin size={20} className="text-blue-400" />
                    장소 이동
                  </h3>
                  <button onClick={() => setShowLocationMap(false)} className="p-2 hover:bg-slate-700 rounded-lg">
                    <X size={18} className="text-slate-400" />
                  </button>
                </div>
                <div className="space-y-2">
                  {currentCase.locations.map(loc => (
                    <motion.button
                      key={loc.id}
                      onClick={() => { setLocation(loc.id); setShowLocationMap(false); }}
                      className={`w-full card text-left ${loc.id === currentLocation ? 'border-blue-500/50 bg-blue-500/5' : 'hover:border-slate-500'}`}
                      whileHover={{ x: 4 }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-white">{loc.name}</h4>
                          <p className="text-xs text-slate-400">{loc.description}</p>
                        </div>
                        {loc.id === currentLocation && <span className="text-xs text-blue-400">현재</span>}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Evidence Panel Modal */}
      <AnimatePresence>
        {showEvidencePanel && (
          <>
            <motion.div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowEvidencePanel(false)} />
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="card max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Sparkles size={20} className="text-amber-400" />
                    증거함 ({collectedEvidence.length})
                  </h3>
                  <button onClick={() => setShowEvidencePanel(false)} className="p-2 hover:bg-slate-700 rounded-lg">
                    <X size={18} className="text-slate-400" />
                  </button>
                </div>
                {evidenceDetails.length === 0 ? (
                  <p className="text-slate-500 text-center py-8">수집한 증거가 없습니다.</p>
                ) : (
                  <div className="space-y-3">
                    {evidenceDetails.map(ev => {
                      const Icon = EVIDENCE_ICONS[ev.type] || FileText;
                      const color = EVIDENCE_COLORS[ev.type] || 'text-slate-400';
                      return (
                        <div key={ev.id} className="card bg-slate-800/50">
                          <div className="flex items-start gap-3">
                            <div className={`w-10 h-10 rounded-lg bg-slate-700/50 flex items-center justify-center ${color}`}>
                              <Icon size={20} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold text-white">{ev.name}</h4>
                                {ev.isCritical && <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs rounded">중요</span>}
                              </div>
                              <p className="text-sm text-slate-300">{ev.description}</p>
                              {ev.detailedDescription && (
                                <p className="text-xs text-slate-500 mt-2">{ev.detailedDescription}</p>
                              )}
                              <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
                                <MapPin size={12} />
                                <span>{ev.location}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
