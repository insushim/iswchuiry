import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import {
  ArrowLeft, User, MessageSquare, FileSearch,
  Lock, Unlock, ChevronRight, Brain, X, Sparkles,
  Shield, AlertTriangle, Eye
} from 'lucide-react';

const TOPIC_CONFIG: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  greeting: { label: '인사', icon: MessageSquare, color: 'text-blue-400' },
  alibi: { label: '알리바이', icon: Shield, color: 'text-green-400' },
  relationship: { label: '관계', icon: User, color: 'text-purple-400' },
  incident: { label: '사건 당일', icon: AlertTriangle, color: 'text-amber-400' },
  suspicious: { label: '의심되는 점', icon: Eye, color: 'text-red-400' }
};

export function InterrogationPhase() {
  const {
    currentCase, currentCharacter, interviewedCharacters,
    collectedEvidence, setCharacter, getDialogue,
    revealSecret, setPhase
  } = useGameStore();

  const [dialogues, setDialogues] = useState<{ text: string; type: 'system' | 'npc' | 'player' | 'reveal' }[]>([]);
  const [showEvidenceList, setShowEvidenceList] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const dialogueEndRef = useRef<HTMLDivElement>(null);

  // Progressive reveal: only show "중요" tag after collecting >60% of meaningful evidence
  const totalMeaningfulEvidence = currentCase ? currentCase.evidence.filter(e => !e.isRedHerring).length : 0;
  const collectionRate = totalMeaningfulEvidence > 0 ? collectedEvidence.length / totalMeaningfulEvidence : 0;
  const showCriticalTag = collectionRate > 0.6;

  useEffect(() => {
    dialogueEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [dialogues]);

  if (!currentCase) return null;

  const character = currentCase.characters.find(c => c.id === currentCharacter);
  const availableCharacters = currentCase.characters.filter(c => !c.isVictim);

  const handleSelectCharacter = (charId: string) => {
    setCharacter(charId);
    const char = currentCase.characters.find(c => c.id === charId);
    setDialogues([
      { text: `${char?.name}에게 다가갔다.`, type: 'system' },
      { text: '안녕하세요. 무슨 일이신가요?', type: 'npc' }
    ]);
    setSelectedTopic(null);
  };

  const handleSelectTopic = (topic: string) => {
    if (!currentCharacter) return;
    setSelectedTopic(topic);
    const topicLabel = TOPIC_CONFIG[topic]?.label || topic;
    const response = getDialogue(topic);
    setDialogues(prev => [
      ...prev,
      { text: `${topicLabel}에 대해 물었다.`, type: 'player' },
      ...response.map(r => ({ text: r, type: 'npc' as const }))
    ]);
  };

  const handlePresentEvidence = (evidenceId: string) => {
    if (!currentCharacter || !character) return;
    const evidence = currentCase.evidence.find(e => e.id === evidenceId);
    if (!evidence) return;
    setShowEvidenceList(false);

    setDialogues(prev => [...prev, { text: `${evidence.name}을(를) 제시했다.`, type: 'player' }]);

    const isCulprit = character.isCulprit;
    const isRelevant = evidence.linkedCharacters.includes(character.id) || evidence.isCritical;

    // 범인에게 관련 증거를 제시하면 → 동요 반응
    if (isCulprit && isRelevant) {
      const nervousResponses = [
        '...! 그, 그건... 어디서 찾은 거죠?',
        '(잠시 침묵) ...그것과 저는 관계없습니다.',
        '왜 저한테 그걸 보여주시는 건가요? (목소리가 떨린다)',
        '그건... 아마 누구든 할 수 있는 거 아닌가요?',
        '(눈을 피하며) 글쎄요, 잘 모르겠는데요...',
      ];
      setDialogues(prev => [
        ...prev,
        { text: `${character.name}이(가) 순간 당황한 기색을 보인다.`, type: 'system' },
        { text: nervousResponses[Math.floor(Math.random() * nervousResponses.length)], type: 'npc' }
      ]);

      // 동요 후 비밀 공개 가능
      const unrevealed = character.secrets.find(s => !s.isRevealed);
      if (unrevealed) {
        const revealed = revealSecret(currentCharacter, unrevealed.id);
        if (revealed) {
          setDialogues(prev => [
            ...prev,
            { text: `압박에 못 이겨 ${character.name}이(가) 입을 열었다...`, type: 'system' },
            { text: `사실은... ${unrevealed.content}`, type: 'reveal' }
          ]);
        }
      }
    }
    // 범인에게 무관한 증거 → 자신감 있는 반응
    else if (isCulprit && !isRelevant) {
      const calmResponses = [
        '그건 저와는 관계없는 것 같은데요.',
        '흥미롭네요. 하지만 제가 알 바는 아닌 것 같습니다.',
        '그게 사건과 어떤 관련이 있나요?',
      ];
      setDialogues(prev => [
        ...prev,
        { text: calmResponses[Math.floor(Math.random() * calmResponses.length)], type: 'npc' }
      ]);
    }
    // 무고한 사람에게 증거 제시 → 도움되는 반응
    else if (!isCulprit && isRelevant) {
      const helpfulResponses = [
        `음, 이건... 혹시 ${character.alibi.activity} 할 때 봤던 것 같기도 해요.`,
        '이거 어디서 찾았어요? 저도 비슷한 걸 본 적 있는데...',
        '이 증거라면, 다른 사람에게 물어보는 게 좋을 것 같아요.',
      ];
      setDialogues(prev => [
        ...prev,
        { text: helpfulResponses[Math.floor(Math.random() * helpfulResponses.length)], type: 'npc' }
      ]);

      const unrevealed = character.secrets.find(s => !s.isRevealed);
      if (unrevealed) {
        const revealed = revealSecret(currentCharacter, unrevealed.id);
        if (revealed) {
          setDialogues(prev => [
            ...prev,
            { text: `${character.name}이(가) 도움을 주려 한다.`, type: 'system' },
            { text: `참, 이건 알려드릴게요. ${unrevealed.content}`, type: 'reveal' }
          ]);
        }
      }
    }
    // 무고한 사람에게 무관한 증거 → 모르는 반응
    else {
      const unknownResponses = [
        '그건 잘 모르겠어요.',
        '처음 보는 건데요?',
        '그게 뭔지는 알겠는데, 저는 관련 없어요.',
      ];
      setDialogues(prev => [
        ...prev,
        { text: unknownResponses[Math.floor(Math.random() * unknownResponses.length)], type: 'npc' }
      ]);
    }
  };

  const handleEndInterview = () => {
    setCharacter(null);
    setDialogues([]);
    setSelectedTopic(null);
  };

  // Character selection screen
  if (!currentCharacter) {
    return (
      <div className="h-full flex flex-col">
        <motion.div
          className="p-5 bg-gradient-to-b from-purple-900/30 to-slate-800/50 backdrop-blur-sm border-b border-purple-500/20"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <MessageSquare size={20} className="text-purple-400" />
                심문할 인물 선택
              </h2>
              <p className="text-sm text-slate-400 mt-1">대화를 통해 정보를 얻고 비밀을 밝혀내세요</p>
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

        <div className="flex-1 p-5 overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {availableCharacters.map((char, i) => {
                const isInterviewed = interviewedCharacters.includes(char.id);
                const unrevealedSecrets = char.secrets.filter(s => !s.isRevealed).length;

                return (
                  <motion.button
                    key={char.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    onClick={() => handleSelectCharacter(char.id)}
                    className={`card text-left group relative overflow-hidden ${
                      isInterviewed ? 'border-green-500/30' : 'hover:border-purple-500/40'
                    }`}
                    whileHover={{ scale: 1.02, y: -3 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        isInterviewed
                          ? 'bg-gradient-to-br from-green-500/30 to-emerald-600/30'
                          : 'bg-gradient-to-br from-indigo-500 to-purple-600'
                      }`}>
                        <User size={24} className="text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-white truncate">{char.name}</h3>
                        <p className="text-xs text-slate-400 truncate">{char.occupation}</p>
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 line-clamp-2 mb-3">{char.personality}</p>

                    <div className="flex items-center gap-2 flex-wrap">
                      {isInterviewed && (
                        <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">
                          심문 완료
                        </span>
                      )}
                      {unrevealedSecrets > 0 && (
                        <span className="flex items-center gap-1 px-2 py-0.5 bg-red-500/15 text-red-400 text-xs rounded-full">
                          <Lock size={10} />
                          비밀 {unrevealedSecrets}개
                        </span>
                      )}
                      {char.secrets.some(s => s.isRevealed) && (
                        <span className="flex items-center gap-1 px-2 py-0.5 bg-amber-500/15 text-amber-400 text-xs rounded-full">
                          <Unlock size={10} />
                          공개됨
                        </span>
                      )}
                    </div>

                    {!isInterviewed && (
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-500/0 group-hover:from-purple-500/5 group-hover:to-indigo-500/5 transition-all pointer-events-none" />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        <motion.div
          className="p-4 bg-slate-900/90 backdrop-blur-lg border-t border-slate-700/60"
          initial={{ y: 60 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="max-w-5xl mx-auto flex justify-end">
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
        </motion.div>
      </div>
    );
  }

  // Interrogation screen
  return (
    <div className="h-full flex flex-col">
      {/* Character header */}
      <motion.div
        className="p-4 bg-gradient-to-b from-indigo-900/30 to-slate-800/50 backdrop-blur-sm border-b border-indigo-500/20"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <User size={24} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white">{character?.name}</h3>
              <p className="text-sm text-slate-400">{character?.occupation}</p>
            </div>
          </div>

          {character && character.secrets.length > 0 && (
            <div className="flex items-center gap-2">
              {character.secrets.map((secret) => (
                <motion.div
                  key={secret.id}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    secret.isRevealed
                      ? 'bg-amber-500/20 border border-amber-500/40'
                      : 'bg-red-500/20 border border-red-500/40'
                  }`}
                  animate={!secret.isRevealed ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {secret.isRevealed ? (
                    <Unlock size={14} className="text-amber-400" />
                  ) : (
                    <Lock size={14} className="text-red-400" />
                  )}
                </motion.div>
              ))}
            </div>
          )}

          <motion.button
            onClick={handleEndInterview}
            className="btn-secondary text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            대화 종료
          </motion.button>
        </div>
      </motion.div>

      {/* Dialogue area */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="max-w-2xl mx-auto space-y-3">
          <AnimatePresence>
            {dialogues.map((dialogue, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`p-4 rounded-xl ${
                  dialogue.type === 'system'
                    ? 'bg-slate-700/30 text-slate-400 text-sm italic text-center'
                    : dialogue.type === 'player'
                    ? 'bg-indigo-500/15 border border-indigo-500/30 text-indigo-200 text-sm ml-8'
                    : dialogue.type === 'reveal'
                    ? 'bg-gradient-to-r from-amber-500/15 to-orange-500/15 border border-amber-500/40 text-amber-200'
                    : 'bg-slate-800/80 border border-slate-700/60 text-white mr-8'
                }`}
              >
                {dialogue.type === 'reveal' && (
                  <div className="flex items-center gap-2 mb-2 text-amber-400 text-xs font-semibold">
                    <Sparkles size={14} />
                    비밀 공개!
                  </div>
                )}
                {dialogue.type === 'npc' && (
                  <span className="text-xs text-purple-400 font-medium block mb-1">{character?.name}</span>
                )}
                <p className="leading-relaxed">{dialogue.text}</p>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={dialogueEndRef} />
        </div>
      </div>

      {/* Topic selection & evidence */}
      <motion.div
        className="p-4 bg-slate-900/90 backdrop-blur-lg border-t border-slate-700/60"
        initial={{ y: 60 }}
        animate={{ y: 0 }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-3">
            {Object.entries(TOPIC_CONFIG).map(([key, config]) => {
              const Icon = config.icon;
              return (
                <motion.button
                  key={key}
                  onClick={() => handleSelectTopic(key)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-all ${
                    selectedTopic === key
                      ? 'bg-indigo-500/30 text-indigo-200 border border-indigo-500/50'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                  }`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Icon size={14} className={config.color} />
                  {config.label}
                </motion.button>
              );
            })}
          </div>

          <motion.button
            onClick={() => setShowEvidenceList(true)}
            disabled={collectedEvidence.length === 0}
            className="w-full btn-accent flex items-center justify-center gap-2"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <FileSearch size={18} />
            증거 제시하기 ({collectedEvidence.length})
          </motion.button>
        </div>
      </motion.div>

      {/* Evidence selection modal */}
      <AnimatePresence>
        {showEvidenceList && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowEvidenceList(false)}
            />
            <motion.div
              className="fixed inset-0 z-50 flex items-end justify-center p-4"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
            >
              <div className="card max-w-2xl w-full max-h-[60vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <FileSearch size={18} className="text-amber-400" />
                    제시할 증거 선택
                  </h3>
                  <button onClick={() => setShowEvidenceList(false)} className="p-2 hover:bg-slate-700 rounded-lg">
                    <X size={18} className="text-slate-400" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {collectedEvidence.map(evId => {
                    const evidence = currentCase.evidence.find(e => e.id === evId);
                    if (!evidence) return null;
                    return (
                      <motion.button
                        key={evId}
                        onClick={() => handlePresentEvidence(evId)}
                        className="card text-left hover:border-amber-500/50"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <h4 className="font-medium text-white text-sm mb-1">{evidence.name}</h4>
                        <p className="text-xs text-slate-400 line-clamp-2">{evidence.description}</p>
                        {evidence.isCritical && (
                          showCriticalTag
                            ? <span className="text-xs text-red-400 mt-1 inline-block">중요 증거</span>
                            : <span className="text-xs text-slate-500 mt-1 inline-block" title="이 증거를 잘 살펴보세요">?</span>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
