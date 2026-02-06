import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Fingerprint, Lock, Trophy, Award } from 'lucide-react';
import { useMetaStore } from '../store/metaStore';
import {
  ACHIEVEMENTS, AchievementDef,
  getRarityColor, getRarityName, getCategoryName
} from '../data/achievements';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 0.1 } }
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } }
};

type CategoryFilter = 'all' | AchievementDef['category'];

const CATEGORY_TABS: { key: CategoryFilter; label: string }[] = [
  { key: 'all', label: '전체' },
  { key: 'mastery', label: '숙련' },
  { key: 'streak', label: '연속' },
  { key: 'collection', label: '수집' },
  { key: 'speed', label: '속도' },
  { key: 'exploration', label: '탐험' },
  { key: 'special', label: '특수' },
];

export function AchievementsPage() {
  const navigate = useNavigate();
  const { unlockedAchievements, achievementProgress } = useMetaStore();
  const [filter, setFilter] = useState<CategoryFilter>('all');

  const unlockedIds = new Set(unlockedAchievements.map(a => a.id));
  const totalUnlocked = unlockedIds.size;
  const totalAchievements = ACHIEVEMENTS.length;
  const pct = Math.round((totalUnlocked / totalAchievements) * 100);

  const filtered = filter === 'all'
    ? ACHIEVEMENTS
    : ACHIEVEMENTS.filter(a => a.category === filter);

  const sortedAchievements = [...filtered].sort((a, b) => {
    const aUnlocked = unlockedIds.has(a.id) ? 0 : 1;
    const bUnlocked = unlockedIds.has(b.id) ? 0 : 1;
    return aUnlocked - bUnlocked;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950/30 to-slate-900">
      <motion.div className="max-w-3xl mx-auto px-4 sm:px-6 py-8" variants={container} initial="hidden" animate="show">
        {/* Header */}
        <motion.div variants={item} className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <motion.button onClick={() => navigate('/')} className="p-2 hover:bg-slate-800 rounded-lg transition-colors" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <ArrowLeft size={20} className="text-slate-400" />
            </motion.button>
            <h1 className="text-2xl font-bold text-white">업적</h1>
          </div>
          <Fingerprint size={24} className="text-amber-500/40" />
        </motion.div>

        {/* Summary */}
        <motion.div variants={item} className="glass p-5 rounded-2xl mb-6">
          <div className="flex items-center gap-4 mb-3">
            <Trophy size={24} className="text-amber-400" />
            <div className="flex-1">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-slate-400">{totalUnlocked}/{totalAchievements} 업적 해금</span>
                <span className="text-amber-400 font-bold">{pct}%</span>
              </div>
              <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            {['common', 'rare', 'epic', 'legendary'].map(rarity => {
              const count = ACHIEVEMENTS.filter(a => a.rarity === rarity as AchievementDef['rarity'] && unlockedIds.has(a.id)).length;
              const total = ACHIEVEMENTS.filter(a => a.rarity === rarity as AchievementDef['rarity']).length;
              return (
                <span key={rarity} className="px-2 py-1 rounded-full text-xs border" style={{ borderColor: getRarityColor(rarity as AchievementDef['rarity']), color: getRarityColor(rarity as AchievementDef['rarity']) }}>
                  {getRarityName(rarity as AchievementDef['rarity'])} {count}/{total}
                </span>
              );
            })}
          </div>
        </motion.div>

        {/* Category Tabs */}
        <motion.div variants={item} className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {CATEGORY_TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                filter === tab.key
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-slate-800/50 text-slate-400 border border-transparent hover:bg-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Achievement Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <AnimatePresence mode="popLayout">
            {sortedAchievements.map((ach, i) => {
              const isUnlocked = unlockedIds.has(ach.id);
              const unlockData = unlockedAchievements.find(a => a.id === ach.id);
              const progress = achievementProgress[ach.id] || 0;
              const rarityColor = getRarityColor(ach.rarity);

              return (
                <motion.div
                  key={ach.id}
                  layout
                  variants={item}
                  className={`relative overflow-hidden rounded-xl border transition-all ${
                    isUnlocked
                      ? 'bg-slate-800/60 border-white/10'
                      : 'bg-slate-800/30 border-white/5 opacity-60'
                  }`}
                  style={{ borderLeftWidth: 3, borderLeftColor: isUnlocked ? rarityColor : '#334155' }}
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`text-2xl w-10 h-10 flex items-center justify-center rounded-lg ${
                        isUnlocked ? 'bg-slate-700/50' : 'bg-slate-800/80'
                      }`}>
                        {isUnlocked ? ach.icon : <Lock size={16} className="text-slate-600" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className={`text-sm font-bold truncate ${isUnlocked ? 'text-white' : 'text-slate-500'}`}>
                            {ach.name}
                          </h4>
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-medium" style={{ backgroundColor: `${rarityColor}20`, color: rarityColor }}>
                            {getRarityName(ach.rarity)}
                          </span>
                        </div>
                        <p className={`text-xs mb-1 ${isUnlocked ? 'text-slate-400' : 'text-slate-600'}`}>
                          {ach.description}
                        </p>
                        <p className="text-[10px] text-slate-600">{ach.condition}</p>

                        {ach.maxProgress && !isUnlocked && (
                          <div className="mt-2">
                            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                              <div className="h-full rounded-full" style={{ width: `${Math.min(100, (progress / ach.maxProgress) * 100)}%`, backgroundColor: rarityColor }} />
                            </div>
                            <p className="text-[10px] text-slate-600 mt-0.5">{progress}/{ach.maxProgress}</p>
                          </div>
                        )}

                        {isUnlocked && unlockData && (
                          <p className="text-[10px] text-amber-500/60 mt-1">
                            {new Date(unlockData.unlockedAt).toLocaleDateString('ko-KR')} 해금
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {isUnlocked && (
                    <div className="absolute top-2 right-2">
                      <Award size={14} className="text-amber-400/40" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {sortedAchievements.length === 0 && (
          <div className="text-center py-12">
            <Trophy size={40} className="text-slate-600 mx-auto mb-3" />
            <p className="text-slate-500">이 카테고리에 업적이 없습니다</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
