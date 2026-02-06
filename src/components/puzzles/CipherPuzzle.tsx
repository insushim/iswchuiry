import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, RotateCcw, Check, ChevronUp, ChevronDown, Eye } from 'lucide-react';
import { CipherData } from '../../types/puzzles';

interface CipherPuzzleProps {
  data: CipherData;
  onSolve: (score: number) => void;
}

// 한글 자모 배열
const CHOSUNG = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
const JUNGSUNG = ['ㅏ','ㅐ','ㅑ','ㅒ','ㅓ','ㅔ','ㅕ','ㅖ','ㅗ','ㅘ','ㅙ','ㅚ','ㅛ','ㅜ','ㅝ','ㅞ','ㅟ','ㅠ','ㅡ','ㅢ','ㅣ'];
const JONGSUNG = ['','ㄱ','ㄲ','ㄳ','ㄴ','ㄵ','ㄶ','ㄷ','ㄹ','ㄺ','ㄻ','ㄼ','ㄽ','ㄾ','ㄿ','ㅀ','ㅁ','ㅂ','ㅄ','ㅅ','ㅆ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];

function decomposeHangul(char: string): [number, number, number] | null {
  const code = char.charCodeAt(0) - 0xAC00;
  if (code < 0 || code > 11171) return null;
  const cho = Math.floor(code / 588);
  const jung = Math.floor((code % 588) / 28);
  const jong = code % 28;
  return [cho, jung, jong];
}

function composeHangul(cho: number, jung: number, jong: number): string {
  return String.fromCharCode(0xAC00 + cho * 588 + jung * 28 + jong);
}

function shiftKorean(text: string, shift: number): string {
  return text.split('').map(ch => {
    const decomposed = decomposeHangul(ch);
    if (!decomposed) return ch;
    const [cho, jung, jong] = decomposed;
    const newCho = ((cho + shift) % 19 + 19) % 19;
    const newJung = ((jung + shift) % 21 + 21) % 21;
    const newJong = jong === 0 ? 0 : ((jong - 1 + shift) % 27 + 27) % 27 + 1;
    return composeHangul(newCho, newJung, newJong);
  }).join('');
}

function reverseText(text: string): string {
  return text.split('').reverse().join('');
}

function decodeNumber(text: string, keyMap: Record<string, string>): string {
  return text.split('-').map(n => keyMap[n] || n).join('');
}

export function CipherPuzzle({ data, onSolve }: CipherPuzzleProps) {
  const [currentShift, setCurrentShift] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isSolved, setIsSolved] = useState(false);
  const [showError, setShowError] = useState(false);
  const [revealedChars, setRevealedChars] = useState<Set<number>>(
    new Set(data.partialReveal || [])
  );

  const decodedPreview = useMemo(() => {
    if (data.cipherType === 'caesar-ko') {
      return shiftKorean(data.encodedText, -currentShift);
    }
    if (data.cipherType === 'reverse') {
      return reverseText(data.encodedText);
    }
    if (data.cipherType === 'number' && data.keyMap) {
      return decodeNumber(data.encodedText, data.keyMap);
    }
    return data.encodedText;
  }, [data, currentShift]);

  const handleCheck = () => {
    const answer = data.cipherType === 'caesar-ko' ? decodedPreview : userInput;
    const normalized = answer.replace(/\s+/g, '').toLowerCase();
    const solutionNorm = data.solution.replace(/\s+/g, '').toLowerCase();

    if (normalized === solutionNorm) {
      setIsSolved(true);
      const score = Math.max(40, 120 - attempts * 20);
      setTimeout(() => onSolve(score), 1500);
    } else {
      setAttempts(prev => prev + 1);
      setShowError(true);
      setTimeout(() => setShowError(false), 1500);
    }
  };

  const handleCaesarSubmit = () => {
    if (currentShift === (data.shift || 0)) {
      setIsSolved(true);
      const score = Math.max(40, 120 - attempts * 20);
      setTimeout(() => onSolve(score), 1500);
    } else {
      setAttempts(prev => prev + 1);
      setShowError(true);
      setTimeout(() => setShowError(false), 1500);
    }
  };

  return (
    <div className="space-y-6">
      {/* 암호문 표시 */}
      <motion.div
        className="glass p-6 rounded-2xl text-center"
        animate={showError ? { x: [-5, 5, -5, 5, 0] } : {}}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <Lock size={20} className="text-amber-400" />
          <h3 className="text-sm font-medium text-slate-400">암호화된 메시지</h3>
        </div>

        <div className="p-4 bg-slate-800/80 rounded-xl border border-amber-500/20 mb-4">
          <p className="text-lg font-mono text-amber-300 tracking-wider break-all leading-relaxed">
            {data.encodedText.split('').map((ch, i) => (
              <span key={i} className={revealedChars.has(i) ? 'text-green-400 font-bold' : ''}>
                {revealedChars.has(i) ? data.solution[i] || ch : ch}
              </span>
            ))}
          </p>
        </div>

        {data.cipherType === 'caesar-ko' && (
          <div className="text-xs text-slate-500 mb-2">
            한글 자모를 이동시켜 원문을 복원하세요
          </div>
        )}
        {data.cipherType === 'reverse' && (
          <div className="text-xs text-slate-500 mb-2">
            거꾸로 읽어보세요
          </div>
        )}
        {data.cipherType === 'number' && (
          <div className="text-xs text-slate-500 mb-2">
            숫자가 글자를 나타냅니다
          </div>
        )}
      </motion.div>

      {/* 시저 암호: 다이얼 UI */}
      {data.cipherType === 'caesar-ko' && (
        <motion.div
          className="glass p-6 rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-4">
            <p className="text-sm text-slate-400 mb-3">자모 이동량</p>
            <div className="flex items-center justify-center gap-4">
              <motion.button
                onClick={() => setCurrentShift(prev => ((prev - 1) % 19 + 19) % 19)}
                className="w-12 h-12 rounded-xl bg-slate-700 hover:bg-slate-600 flex items-center justify-center transition-colors"
                whileTap={{ scale: 0.9 }}
              >
                <ChevronDown size={24} className="text-slate-300" />
              </motion.button>

              <motion.div
                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/25"
                key={currentShift}
                initial={{ scale: 0.8, rotateX: -90 }}
                animate={{ scale: 1, rotateX: 0 }}
                transition={{ type: 'spring', bounce: 0.4 }}
              >
                <span className="text-3xl font-black text-white">{currentShift}</span>
              </motion.div>

              <motion.button
                onClick={() => setCurrentShift(prev => (prev + 1) % 19)}
                className="w-12 h-12 rounded-xl bg-slate-700 hover:bg-slate-600 flex items-center justify-center transition-colors"
                whileTap={{ scale: 0.9 }}
              >
                <ChevronUp size={24} className="text-slate-300" />
              </motion.button>
            </div>
          </div>

          {/* 디코딩 미리보기 */}
          <div className="p-4 bg-slate-800/60 rounded-xl border border-white/5">
            <p className="text-xs text-slate-500 mb-2">복호화 결과:</p>
            <p className="text-lg text-white font-medium tracking-wide break-all">
              {decodedPreview}
            </p>
          </div>

          <motion.button
            onClick={handleCaesarSubmit}
            disabled={isSolved}
            className="w-full mt-4 py-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl font-bold text-slate-900 disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSolved ? '해독 완료!' : '이 이동량으로 해독'}
          </motion.button>
        </motion.div>
      )}

      {/* 역순/숫자: 텍스트 입력 */}
      {(data.cipherType === 'reverse' || data.cipherType === 'number' || data.cipherType === 'substitute') && (
        <motion.div
          className="glass p-6 rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {data.cipherType === 'reverse' && (
            <div className="p-4 bg-slate-800/60 rounded-xl border border-white/5 mb-4">
              <p className="text-xs text-slate-500 mb-2">뒤집기 결과:</p>
              <p className="text-lg text-cyan-300 font-medium">{decodedPreview}</p>
            </div>
          )}

          <input
            type="text"
            value={userInput}
            onChange={e => setUserInput(e.target.value)}
            placeholder="해독된 메시지를 입력하세요..."
            className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white placeholder:text-slate-600 focus:border-amber-500/50 focus:outline-none"
            disabled={isSolved}
          />

          <motion.button
            onClick={handleCheck}
            disabled={isSolved || !userInput.trim()}
            className="w-full mt-4 py-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl font-bold text-slate-900 disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSolved ? '해독 완료!' : '정답 확인'}
          </motion.button>
        </motion.div>
      )}

      {/* 에러 메시지 */}
      <AnimatePresence>
        {showError && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center text-red-400 text-sm"
          >
            틀렸습니다. 다시 시도해보세요. (시도: {attempts}회)
          </motion.div>
        )}
      </AnimatePresence>

      {/* 성공 */}
      <AnimatePresence>
        {isSolved && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl"
          >
            <motion.div
              initial={{ rotate: -180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: 'spring', bounce: 0.5 }}
            >
              <Check size={40} className="text-emerald-400 mx-auto mb-2" />
            </motion.div>
            <p className="text-emerald-300 font-bold text-lg">암호 해독 성공!</p>
            <p className="text-slate-400 text-sm mt-1">"{data.solution}"</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
