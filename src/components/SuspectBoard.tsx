import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { User, HelpCircle, Check, X, ChevronDown, ChevronUp } from 'lucide-react';

interface SuspectBoardProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SuspectBoard({ isOpen, onClose }: SuspectBoardProps) {
  const { currentCase, suspectNotes, toggleSuspectNote, collectedEvidence } = useGameStore();
  const [expandedId, setExpandedId] = React.useState<string | null>(null);

  if (!currentCase || !isOpen) return null;

  const suspects = currentCase.characters.filter(c => !c.isVictim);
  const evidenceDetails = currentCase.evidence.filter(e => collectedEvidence.includes(e.id));

  return (
    // 모달 오버레이
    <>
      <motion.div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
      >
        <div className="card max-w-4xl w-full max-h-[85vh] overflow-y-auto">
          {/* 헤더 */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                🔍 용의자 프로필 보드
              </h3>
              <p className="text-sm text-slate-400 mt-1">
                증거의 특성과 용의자 프로필을 대조하세요. 클릭으로 의심/무혐의 표시
              </p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-700 rounded-lg">
              <X size={18} className="text-slate-400" />
            </button>
          </div>

          {/* 수집된 증거에서 추출된 범인 특성 힌트 */}
          {evidenceDetails.length > 0 && (
            <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl">
              <h4 className="text-sm font-semibold text-amber-400 mb-2">📋 증거에서 확인된 범인 특성</h4>
              <div className="flex flex-wrap gap-2">
                {evidenceDetails.filter(e => e.isCritical).map(ev => (
                  <span key={ev.id} className="px-3 py-1 bg-amber-500/20 text-amber-200 text-xs rounded-full">
                    {ev.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 용의자 리스트 */}
          <div className="space-y-3">
            {suspects.map((suspect, i) => {
              const note = suspectNotes[suspect.id] || 'unknown';
              const isExpanded = expandedId === suspect.id;
              const profile = suspect.physicalProfile;

              return (
                <motion.div
                  key={suspect.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`rounded-xl border transition-all ${
                    note === 'suspected'
                      ? 'border-red-500/50 bg-red-500/10'
                      : note === 'eliminated'
                      ? 'border-green-500/30 bg-green-500/5 opacity-60'
                      : 'border-slate-700 bg-slate-800/50'
                  }`}
                >
                  {/* 용의자 헤더 - 클릭으로 확장 */}
                  <div className="p-4 flex items-center gap-4">
                    {/* 마킹 버튼 */}
                    <motion.button
                      onClick={() => toggleSuspectNote(suspect.id)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                        note === 'suspected'
                          ? 'bg-red-500/30 border-2 border-red-500'
                          : note === 'eliminated'
                          ? 'bg-green-500/30 border-2 border-green-500'
                          : 'bg-slate-700 border-2 border-slate-600 hover:border-slate-500'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {note === 'suspected' && <HelpCircle size={18} className="text-red-400" />}
                      {note === 'eliminated' && <Check size={18} className="text-green-400" />}
                      {note === 'unknown' && <User size={18} className="text-slate-400" />}
                    </motion.button>

                    {/* 기본 정보 */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-white">{suspect.name}</h4>
                        <span className="text-xs text-slate-400">({suspect.occupation})</span>
                        {note === 'suspected' && (
                          <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs rounded-full">용의</span>
                        )}
                        {note === 'eliminated' && (
                          <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">무혐의</span>
                        )}
                      </div>
                      {/* 프로필 요약 한 줄 */}
                      <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1">
                        <span className="text-xs text-slate-500">키: {profile.height}</span>
                        <span className="text-xs text-slate-500">체격: {profile.build}</span>
                        <span className="text-xs text-slate-500">신발: {profile.shoeSize}mm</span>
                        <span className="text-xs text-slate-500">{profile.handedness}</span>
                      </div>
                    </div>

                    {/* 확장 토글 */}
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : suspect.id)}
                      className="p-2 hover:bg-slate-700 rounded-lg"
                    >
                      {isExpanded ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
                    </button>
                  </div>

                  {/* 확장된 상세 정보 */}
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      className="px-4 pb-4 border-t border-slate-700/50"
                    >
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
                        <div className="p-2 bg-slate-800/80 rounded-lg">
                          <span className="text-xs text-slate-500 block">혈액형</span>
                          <span className="text-sm text-white font-medium">{profile.bloodType}형</span>
                        </div>
                        <div className="p-2 bg-slate-800/80 rounded-lg">
                          <span className="text-xs text-slate-500 block">특징</span>
                          <span className="text-sm text-white font-medium">{profile.distinctiveFeature}</span>
                        </div>
                        <div className="p-2 bg-slate-800/80 rounded-lg">
                          <span className="text-xs text-slate-500 block">접근 가능 구역</span>
                          <span className="text-sm text-white font-medium">
                            {profile.accessAreas.length > 0 ? profile.accessAreas.join(', ') : '일반 구역만'}
                          </span>
                        </div>
                        <div className="p-2 bg-slate-800/80 rounded-lg">
                          <span className="text-xs text-slate-500 block">성격</span>
                          <span className="text-sm text-white font-medium">{suspect.personality}</span>
                        </div>
                        <div className="p-2 bg-slate-800/80 rounded-lg">
                          <span className="text-xs text-slate-500 block">알리바이</span>
                          <span className="text-sm text-white font-medium">
                            {suspect.alibi.activity} ({suspect.alibi.startTime}~{suspect.alibi.endTime})
                          </span>
                        </div>
                        <div className="p-2 bg-slate-800/80 rounded-lg">
                          <span className="text-xs text-slate-500 block">알리바이 검증</span>
                          <span className={`text-sm font-medium ${suspect.alibi.physicalEvidence.length > 0 ? 'text-green-400' : 'text-amber-400'}`}>
                            {suspect.alibi.physicalEvidence.length > 0 ? '물증 있음' : '물증 없음'}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* 하단 안내 */}
          <div className="mt-4 text-center text-xs text-slate-500">
            아이콘 클릭: 미정 → 용의 → 무혐의 → 미정 순환
          </div>
        </div>
      </motion.div>
    </>
  );
}
