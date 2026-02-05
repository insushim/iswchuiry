import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Volume2, VolumeX, Type,
  Palette, Clock, RotateCcw, Save, Check, Fingerprint
} from 'lucide-react';

interface GameSettings {
  textSpeed: 'slow' | 'normal' | 'fast';
  autoAdvance: boolean;
  autoAdvanceDelay: number;
  soundEnabled: boolean;
  fontSize: 'small' | 'medium' | 'large';
  theme: 'dark' | 'midnight';
  showTimer: boolean;
  confirmAccusation: boolean;
}

const DEFAULT_SETTINGS: GameSettings = {
  textSpeed: 'normal',
  autoAdvance: false,
  autoAdvanceDelay: 3,
  soundEnabled: true,
  fontSize: 'medium',
  theme: 'dark',
  showTimer: true,
  confirmAccusation: true
};

const STORAGE_KEY = 'deductio-settings';

function loadSettings(): GameSettings {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
  } catch {}
  return DEFAULT_SETTINGS;
}

function saveSettings(settings: GameSettings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

export function SettingsPage() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<GameSettings>(loadSettings);
  const [saved, setSaved] = useState(false);

  const update = <K extends keyof GameSettings>(key: K, value: GameSettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    saveSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS);
    saveSettings(DEFAULT_SETTINGS);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950/30 to-slate-900">
      <motion.div
        className="max-w-2xl mx-auto px-6 py-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Header */}
        <motion.div variants={item} className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <motion.button
              onClick={() => navigate('/')}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowLeft size={20} className="text-slate-400" />
            </motion.button>
            <div>
              <h1 className="text-2xl font-bold text-white">설정</h1>
              <p className="text-sm text-slate-500">게임 환경을 설정하세요</p>
            </div>
          </div>
          <Fingerprint size={24} className="text-amber-500/40" />
        </motion.div>

        {/* Text Speed */}
        <motion.div variants={item} className="card mb-4">
          <div className="flex items-center gap-3 mb-4">
            <Type size={18} className="text-blue-400" />
            <h3 className="font-semibold text-white">텍스트 속도</h3>
          </div>
          <div className="flex gap-2">
            {([['slow', '느리게'], ['normal', '보통'], ['fast', '빠르게']] as const).map(([val, label]) => (
              <button
                key={val}
                onClick={() => update('textSpeed', val)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  settings.textSpeed === val
                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/50'
                    : 'bg-slate-700/50 text-slate-400 hover:bg-slate-700 border border-transparent'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Auto Advance */}
        <motion.div variants={item} className="card mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Clock size={18} className="text-green-400" />
              <div>
                <h3 className="font-semibold text-white">자동 진행</h3>
                <p className="text-xs text-slate-500">텍스트 완료 후 자동으로 다음 단계</p>
              </div>
            </div>
            <button
              onClick={() => update('autoAdvance', !settings.autoAdvance)}
              className={`w-12 h-7 rounded-full transition-all relative ${
                settings.autoAdvance ? 'bg-green-500' : 'bg-slate-600'
              }`}
            >
              <div className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${
                settings.autoAdvance ? 'translate-x-5' : 'translate-x-0.5'
              }`} />
            </button>
          </div>
          {settings.autoAdvance && (
            <div className="mt-4 pt-3 border-t border-slate-700">
              <label className="text-sm text-slate-400 mb-2 block">대기 시간: {settings.autoAdvanceDelay}초</label>
              <input
                type="range"
                min={1}
                max={10}
                value={settings.autoAdvanceDelay}
                onChange={(e) => update('autoAdvanceDelay', parseInt(e.target.value))}
                className="w-full accent-green-500"
              />
            </div>
          )}
        </motion.div>

        {/* Sound */}
        <motion.div variants={item} className="card mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {settings.soundEnabled ? (
                <Volume2 size={18} className="text-amber-400" />
              ) : (
                <VolumeX size={18} className="text-slate-500" />
              )}
              <h3 className="font-semibold text-white">효과음</h3>
            </div>
            <button
              onClick={() => update('soundEnabled', !settings.soundEnabled)}
              className={`w-12 h-7 rounded-full transition-all relative ${
                settings.soundEnabled ? 'bg-amber-500' : 'bg-slate-600'
              }`}
            >
              <div className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${
                settings.soundEnabled ? 'translate-x-5' : 'translate-x-0.5'
              }`} />
            </button>
          </div>
        </motion.div>

        {/* Font Size */}
        <motion.div variants={item} className="card mb-4">
          <div className="flex items-center gap-3 mb-4">
            <Type size={18} className="text-purple-400" />
            <h3 className="font-semibold text-white">글꼴 크기</h3>
          </div>
          <div className="flex gap-2">
            {([['small', '작게'], ['medium', '보통'], ['large', '크게']] as const).map(([val, label]) => (
              <button
                key={val}
                onClick={() => update('fontSize', val)}
                className={`flex-1 py-2.5 rounded-lg font-medium transition-all ${
                  settings.fontSize === val
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50'
                    : 'bg-slate-700/50 text-slate-400 hover:bg-slate-700 border border-transparent'
                } ${val === 'small' ? 'text-xs' : val === 'medium' ? 'text-sm' : 'text-base'}`}
              >
                {label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Show Timer */}
        <motion.div variants={item} className="card mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Clock size={18} className="text-cyan-400" />
              <div>
                <h3 className="font-semibold text-white">타이머 표시</h3>
                <p className="text-xs text-slate-500">게임 중 플레이 시간 표시</p>
              </div>
            </div>
            <button
              onClick={() => update('showTimer', !settings.showTimer)}
              className={`w-12 h-7 rounded-full transition-all relative ${
                settings.showTimer ? 'bg-cyan-500' : 'bg-slate-600'
              }`}
            >
              <div className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${
                settings.showTimer ? 'translate-x-5' : 'translate-x-0.5'
              }`} />
            </button>
          </div>
        </motion.div>

        {/* Confirm Accusation */}
        <motion.div variants={item} className="card mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Palette size={18} className="text-red-400" />
              <div>
                <h3 className="font-semibold text-white">고발 확인</h3>
                <p className="text-xs text-slate-500">최종 고발 전 확인 단계 표시</p>
              </div>
            </div>
            <button
              onClick={() => update('confirmAccusation', !settings.confirmAccusation)}
              className={`w-12 h-7 rounded-full transition-all relative ${
                settings.confirmAccusation ? 'bg-red-500' : 'bg-slate-600'
              }`}
            >
              <div className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${
                settings.confirmAccusation ? 'translate-x-5' : 'translate-x-0.5'
              }`} />
            </button>
          </div>
        </motion.div>

        {/* Buttons */}
        <motion.div variants={item} className="flex gap-3">
          <motion.button
            onClick={handleReset}
            className="flex-1 btn-secondary py-3 flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <RotateCcw size={16} />
            초기화
          </motion.button>
          <motion.button
            onClick={handleSave}
            className={`flex-1 py-3 flex items-center justify-center gap-2 rounded-lg font-semibold transition-all ${
              saved
                ? 'bg-green-500 text-white'
                : 'btn-accent'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {saved ? (
              <>
                <Check size={16} />
                저장됨
              </>
            ) : (
              <>
                <Save size={16} />
                저장
              </>
            )}
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
