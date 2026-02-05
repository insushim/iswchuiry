import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Play, BookOpen, Settings, Brain, Eye, MessageSquare,
  ChevronRight, Fingerprint, Clock, Users, MapPin, Target, Star
} from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } }
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }
};

function useTypewriter(text: string, speed = 70) {
  const [display, setDisplay] = useState('');
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      if (i < text.length) { setDisplay(text.slice(0, ++i)); }
      else clearInterval(t);
    }, speed);
    return () => clearInterval(t);
  }, [text, speed]);
  return display;
}

export function HomePage() {
  const navigate = useNavigate();
  const subtitle = useTypewriter('AI가 만드는 무한한 추리 세계', 70);

  const features = [
    { icon: Eye, title: '현장 조사', desc: '범죄 현장을 탐색하고 단서를 찾아내세요', color: 'from-blue-500 to-cyan-500' },
    { icon: MessageSquare, title: '심문', desc: '용의자들을 심문하고 거짓말을 밝혀내세요', color: 'from-purple-500 to-pink-500' },
    { icon: Brain, title: '추리', desc: '증거를 분석하고 진범을 지목하세요', color: 'from-amber-500 to-orange-500' }
  ];

  const stats = [
    { icon: Target, label: '시나리오', value: '102+' },
    { icon: MapPin, label: '사건 유형', value: '6종' },
    { icon: Clock, label: '난이도', value: '4단계' },
    { icon: Users, label: '캐릭터', value: '60+' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950/30 to-slate-900 overflow-hidden relative">
      {/* Ambient glow */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-amber-500/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-500/8 rounded-full blur-[100px] pointer-events-none" />

      <motion.div className="relative z-10 max-w-5xl mx-auto px-6 py-12" variants={container} initial="hidden" animate="show">
        {/* Header */}
        <motion.header variants={item} className="flex items-center justify-between mb-20">
          <div className="flex items-center gap-2">
            <Fingerprint className="w-7 h-7 text-amber-500" />
            <span className="text-lg font-bold tracking-wider text-slate-300">DEDUCTIO</span>
          </div>
        </motion.header>

        {/* Hero */}
        <div className="text-center mb-20">
          <motion.div variants={item}>
            <h1 className="text-7xl md:text-8xl font-black tracking-tight mb-4">
              <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">
                DEDUCTIO
              </span>
            </h1>
            <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-amber-500 to-transparent mb-6" />
          </motion.div>

          <motion.p variants={item} className="text-xl md:text-2xl text-amber-100/80 mb-12 h-10 font-light">
            {subtitle}<span className="animate-pulse text-amber-400">|</span>
          </motion.p>

          {/* CTA */}
          <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
            <motion.button
              onClick={() => navigate('/new-game')}
              className="group px-10 py-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl font-bold text-lg text-slate-900 shadow-xl shadow-amber-500/30"
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(251, 191, 36, 0.35)' }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="flex items-center gap-3">
                <Play className="w-6 h-6" fill="currentColor" />
                새 게임 시작
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>

            <motion.button
              onClick={() => navigate('/tutorial')}
              className="px-8 py-4 glass rounded-xl font-medium text-slate-200 hover:bg-white/10 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                튜토리얼
              </span>
            </motion.button>
          </motion.div>

          {/* Features */}
          <motion.div variants={item} className="grid md:grid-cols-3 gap-6 mb-16">
            {features.map((f, i) => (
              <motion.div key={i} className="glass p-8 rounded-2xl group" whileHover={{ scale: 1.03, y: -4 }}>
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${f.color} mb-4`}>
                  <f.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{f.title}</h3>
                <p className="text-slate-400">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {stats.map((s, i) => (
              <motion.div key={i} className="glass p-5 rounded-xl text-center" whileHover={{ scale: 1.05 }}>
                <s.icon className="w-7 h-7 text-amber-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{s.value}</div>
                <div className="text-sm text-slate-400">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Difficulty Preview */}
          <motion.div variants={item} className="glass p-8 rounded-2xl mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center justify-center gap-2">
              <Star className="w-6 h-6 text-amber-400" />
              난이도 시스템
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: '쉬움', color: 'from-green-500 to-emerald-600', detail: '3-4명 / 힌트 10회' },
                { name: '보통', color: 'from-blue-500 to-indigo-600', detail: '4-5명 / 힌트 5회' },
                { name: '어려움', color: 'from-orange-500 to-red-600', detail: '5-6명 / 힌트 3회' },
                { name: '전문가', color: 'from-purple-500 to-pink-600', detail: '6-7명 / 힌트 1회' }
              ].map((d, i) => (
                <div key={i} className="bg-slate-800/50 rounded-xl p-4 border border-white/5">
                  <div className={`h-2 rounded-full bg-gradient-to-r ${d.color} mb-3`} />
                  <div className="font-bold text-white mb-1">{d.name}</div>
                  <div className="text-xs text-slate-400">{d.detail}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Secondary */}
          <motion.div variants={item} className="flex justify-center gap-4">
            <motion.button
              onClick={() => navigate('/settings')}
              className="flex items-center gap-2 px-5 py-2.5 glass rounded-lg text-slate-300 hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <Settings className="w-4 h-4" />
              설정
            </motion.button>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer variants={item} className="text-center text-slate-500 pt-8 border-t border-white/5">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Fingerprint className="w-4 h-4 text-amber-500/60" />
            <span className="text-sm">DEDUCTIO v3.0</span>
          </div>
          <p className="text-xs">2026 ISW. AI 기반 추리 게임.</p>
        </motion.footer>
      </motion.div>
    </div>
  );
}
