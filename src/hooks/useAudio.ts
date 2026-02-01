import React, { useEffect, useRef, useCallback, useState, createContext, useContext } from 'react';

// 오디오 상태 관리
interface AudioState {
  isMuted: boolean;
  bgmVolume: number;
  sfxVolume: number;
  currentBgm: string | null;
}

// 오디오 URL (무료 라이선스 / 생성된 사운드)
// 실제 배포 시 적절한 라이선스의 음원으로 교체 필요
const AUDIO_URLS = {
  // BGM - Web Audio API로 생성
  bgm: {
    menu: 'menu',
    investigation: 'investigation',
    interrogation: 'interrogation',
    tension: 'tension',
    reveal: 'reveal',
    victory: 'victory',
    defeat: 'defeat'
  },
  // 효과음 - Web Audio API로 생성
  sfx: {
    click: 'click',
    evidence: 'evidence',
    secret: 'secret',
    correct: 'correct',
    wrong: 'wrong',
    hint: 'hint',
    transition: 'transition',
    typing: 'typing',
    suspense: 'suspense'
  }
};

// Web Audio API 컨텍스트
let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
}

// 음 생성 함수들
function createOscillatorSound(
  ctx: AudioContext,
  frequency: number,
  type: OscillatorType,
  duration: number,
  volume: number = 0.3
): void {
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);

  gainNode.gain.setValueAtTime(volume, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + duration);
}

// 화음 생성
function createChord(
  ctx: AudioContext,
  frequencies: number[],
  type: OscillatorType,
  duration: number,
  volume: number = 0.15
): void {
  frequencies.forEach(freq => {
    createOscillatorSound(ctx, freq, type, duration, volume);
  });
}

// 효과음 재생 함수들
const SFX_GENERATORS: Record<string, (ctx: AudioContext, volume: number) => void> = {
  click: (ctx, vol) => {
    createOscillatorSound(ctx, 800, 'sine', 0.05, vol * 0.5);
  },

  evidence: (ctx, vol) => {
    createOscillatorSound(ctx, 523, 'sine', 0.1, vol * 0.3);
    setTimeout(() => createOscillatorSound(ctx, 659, 'sine', 0.1, vol * 0.3), 100);
    setTimeout(() => createOscillatorSound(ctx, 784, 'sine', 0.2, vol * 0.3), 200);
  },

  secret: (ctx, vol) => {
    createChord(ctx, [392, 494, 587], 'triangle', 0.4, vol * 0.2);
  },

  correct: (ctx, vol) => {
    createOscillatorSound(ctx, 523, 'sine', 0.1, vol * 0.3);
    setTimeout(() => createOscillatorSound(ctx, 659, 'sine', 0.1, vol * 0.3), 100);
    setTimeout(() => createOscillatorSound(ctx, 784, 'sine', 0.15, vol * 0.3), 200);
    setTimeout(() => createOscillatorSound(ctx, 1047, 'sine', 0.3, vol * 0.3), 300);
  },

  wrong: (ctx, vol) => {
    createOscillatorSound(ctx, 200, 'sawtooth', 0.3, vol * 0.2);
    setTimeout(() => createOscillatorSound(ctx, 180, 'sawtooth', 0.4, vol * 0.2), 150);
  },

  hint: (ctx, vol) => {
    createChord(ctx, [440, 554, 659], 'sine', 0.3, vol * 0.2);
  },

  transition: (ctx, vol) => {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        createOscillatorSound(ctx, 300 + i * 100, 'sine', 0.1, vol * 0.15);
      }, i * 50);
    }
  },

  typing: (ctx, vol) => {
    createOscillatorSound(ctx, 400 + Math.random() * 200, 'square', 0.02, vol * 0.1);
  },

  suspense: (ctx, vol) => {
    createOscillatorSound(ctx, 100, 'sine', 1.5, vol * 0.1);
    createOscillatorSound(ctx, 150, 'sine', 1.5, vol * 0.08);
  }
};

// BGM 생성기 (간단한 패턴 반복)
class BGMGenerator {
  private ctx: AudioContext;
  private isPlaying: boolean = false;
  private intervalId: number | null = null;
  private volume: number = 0.1;
  private pattern: () => void;

  constructor(ctx: AudioContext, pattern: () => void) {
    this.ctx = ctx;
    this.pattern = pattern;
  }

  play(volume: number = 0.1) {
    this.volume = volume;
    this.isPlaying = true;
    this.runPattern();
  }

  stop() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private runPattern() {
    this.pattern();
    this.intervalId = window.setInterval(() => {
      if (this.isPlaying) {
        this.pattern();
      }
    }, 4000);
  }
}

// BGM 패턴들
const BGM_PATTERNS: Record<string, (ctx: AudioContext, vol: number) => () => void> = {
  menu: (ctx, vol) => () => {
    // 부드러운 코드 진행
    createChord(ctx, [261, 329, 392], 'sine', 2, vol * 0.15);
    setTimeout(() => createChord(ctx, [293, 369, 440], 'sine', 2, vol * 0.15), 2000);
  },

  investigation: (ctx, vol) => () => {
    // 긴장감 있는 베이스
    createOscillatorSound(ctx, 82, 'triangle', 0.5, vol * 0.2);
    setTimeout(() => createOscillatorSound(ctx, 98, 'triangle', 0.5, vol * 0.2), 1000);
    setTimeout(() => createOscillatorSound(ctx, 110, 'triangle', 0.5, vol * 0.2), 2000);
    setTimeout(() => createOscillatorSound(ctx, 98, 'triangle', 0.5, vol * 0.2), 3000);
  },

  interrogation: (ctx, vol) => () => {
    // 긴박한 리듬
    for (let i = 0; i < 4; i++) {
      setTimeout(() => {
        createOscillatorSound(ctx, 110, 'sawtooth', 0.1, vol * 0.15);
      }, i * 500);
      setTimeout(() => {
        createOscillatorSound(ctx, 82, 'sawtooth', 0.1, vol * 0.1);
      }, i * 500 + 250);
    }
  },

  tension: (ctx, vol) => () => {
    // 불안한 화음
    createChord(ctx, [196, 233, 277], 'sawtooth', 3, vol * 0.1);
  },

  reveal: (ctx, vol) => () => {
    // 드라마틱한 진행
    createChord(ctx, [196, 247, 294], 'sine', 2, vol * 0.15);
    setTimeout(() => createChord(ctx, [220, 277, 330], 'sine', 2, vol * 0.18), 2000);
  },

  victory: (ctx, vol) => () => {
    // 승리 팡파레
    createChord(ctx, [523, 659, 784], 'sine', 1, vol * 0.2);
    setTimeout(() => createChord(ctx, [587, 740, 880], 'sine', 1, vol * 0.2), 500);
    setTimeout(() => createChord(ctx, [659, 831, 988], 'sine', 2, vol * 0.25), 1000);
  },

  defeat: (ctx, vol) => () => {
    // 우울한 진행
    createChord(ctx, [196, 233, 294], 'sine', 3, vol * 0.12);
  }
};

// 현재 BGM 인스턴스
let currentBgmGenerator: BGMGenerator | null = null;

// 커스텀 훅
export function useAudio() {
  const [state, setState] = useState<AudioState>({
    isMuted: false,
    bgmVolume: 0.3,
    sfxVolume: 0.5,
    currentBgm: null
  });

  // 효과음 재생
  const playSfx = useCallback((soundName: keyof typeof AUDIO_URLS.sfx) => {
    if (state.isMuted) return;

    try {
      const ctx = getAudioContext();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const generator = SFX_GENERATORS[soundName];
      if (generator) {
        generator(ctx, state.sfxVolume);
      }
    } catch (e) {
      console.warn('Audio playback failed:', e);
    }
  }, [state.isMuted, state.sfxVolume]);

  // BGM 재생
  const playBgm = useCallback((bgmName: keyof typeof AUDIO_URLS.bgm) => {
    if (state.isMuted) return;

    try {
      // 이전 BGM 정지
      if (currentBgmGenerator) {
        currentBgmGenerator.stop();
      }

      const ctx = getAudioContext();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const patternFactory = BGM_PATTERNS[bgmName];
      if (patternFactory) {
        const pattern = patternFactory(ctx, state.bgmVolume);
        currentBgmGenerator = new BGMGenerator(ctx, pattern);
        currentBgmGenerator.play(state.bgmVolume);

        setState(prev => ({ ...prev, currentBgm: bgmName }));
      }
    } catch (e) {
      console.warn('BGM playback failed:', e);
    }
  }, [state.isMuted, state.bgmVolume]);

  // BGM 정지
  const stopBgm = useCallback(() => {
    if (currentBgmGenerator) {
      currentBgmGenerator.stop();
      currentBgmGenerator = null;
    }
    setState(prev => ({ ...prev, currentBgm: null }));
  }, []);

  // 음소거 토글
  const toggleMute = useCallback(() => {
    setState(prev => {
      const newMuted = !prev.isMuted;
      if (newMuted && currentBgmGenerator) {
        currentBgmGenerator.stop();
      }
      return { ...prev, isMuted: newMuted };
    });
  }, []);

  // 볼륨 설정
  const setBgmVolume = useCallback((volume: number) => {
    setState(prev => ({ ...prev, bgmVolume: Math.max(0, Math.min(1, volume)) }));
  }, []);

  const setSfxVolume = useCallback((volume: number) => {
    setState(prev => ({ ...prev, sfxVolume: Math.max(0, Math.min(1, volume)) }));
  }, []);

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      if (currentBgmGenerator) {
        currentBgmGenerator.stop();
      }
    };
  }, []);

  return {
    ...state,
    playSfx,
    playBgm,
    stopBgm,
    toggleMute,
    setBgmVolume,
    setSfxVolume
  };
}

// 오디오 컨텍스트 프로바이더
const AudioContextProvider = createContext<ReturnType<typeof useAudio> | null>(null);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const audio = useAudio();

  return React.createElement(
    AudioContextProvider.Provider,
    { value: audio },
    children
  );
}

export function useAudioContext() {
  const context = useContext(AudioContextProvider);
  if (!context) {
    throw new Error('useAudioContext must be used within AudioProvider');
  }
  return context;
}

export default useAudio;
