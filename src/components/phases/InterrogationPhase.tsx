import React, { useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import {
  ArrowLeft, User, MessageSquare, FileSearch,
  Lock, Unlock, ChevronRight, Brain
} from 'lucide-react';

export function InterrogationPhase() {
  const {
    currentCase,
    currentCharacter,
    interviewedCharacters,
    collectedEvidence,
    setCharacter,
    getDialogue,
    revealSecret,
    setPhase
  } = useGameStore();

  const [dialogues, setDialogues] = useState<string[]>([]);
  const [showEvidenceList, setShowEvidenceList] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  if (!currentCase) return null;

  const character = currentCase.characters.find(c => c.id === currentCharacter);
  const availableCharacters = currentCase.characters.filter(c => !c.isVictim);

  const handleSelectCharacter = (charId: string) => {
    setCharacter(charId);
    setDialogues(['안녕하세요. 무슨 일이신가요?']);
    setSelectedTopic(null);
  };

  const handleSelectTopic = (topic: string) => {
    if (!currentCharacter) return;

    setSelectedTopic(topic);
    const response = getDialogue(topic);
    setDialogues(prev => [...prev, `[${topic}에 대해 물었다]`, ...response]);
  };

  const handlePresentEvidence = (evidenceId: string) => {
    if (!currentCharacter || !character) return;

    const evidence = currentCase.evidence.find(e => e.id === evidenceId);
    if (!evidence) return;

    setShowEvidenceList(false);
    setDialogues(prev => [...prev, `[${evidence.name}을(를) 제시했다]`]);

    // 비밀 공개 시도
    const unrevealed = character.secrets.find(s => !s.isRevealed);
    if (unrevealed) {
      const revealed = revealSecret(currentCharacter, unrevealed.id);
      if (revealed) {
        setDialogues(prev => [
          ...prev,
          `${character.name}의 표정이 변했다...`,
          `"사실은... ${unrevealed.content}"`
        ]);
      } else {
        setDialogues(prev => [...prev, `${character.name}: "그게 저와 무슨 상관이죠?"`]);
      }
    } else {
      setDialogues(prev => [...prev, `${character.name}: "이미 아는 내용이에요."`]);
    }
  };

  const handleEndInterview = () => {
    setCharacter(null);
    setDialogues([]);
    setSelectedTopic(null);
  };

  // 캐릭터 선택 화면
  if (!currentCharacter) {
    return (
      <div className="h-full p-4 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">심문할 인물 선택</h2>
              <p className="text-slate-400">대화를 통해 정보를 얻으세요</p>
            </div>
            <button
              onClick={() => setPhase('investigation')}
              className="btn-secondary flex items-center gap-2"
            >
              <ArrowLeft size={18} />
              조사로 돌아가기
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {availableCharacters.map((char) => {
              const isInterviewed = interviewedCharacters.includes(char.id);
              const hasSecrets = char.secrets.some(s => !s.isRevealed);

              return (
                <button
                  key={char.id}
                  onClick={() => handleSelectCharacter(char.id)}
                  className={`card text-left transition-all transform hover:scale-102 ${
                    isInterviewed ? 'border-green-500/30' : ''
                  }`}
                >
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-3">
                    <User size={28} className="text-white" />
                  </div>
                  <h3 className="font-bold text-white text-center">{char.name}</h3>
                  <p className="text-sm text-slate-400 text-center">{char.occupation}</p>

                  <div className="flex justify-center gap-2 mt-3">
                    {isInterviewed && (
                      <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded">
                        심문 완료
                      </span>
                    )}
                    {hasSecrets && (
                      <span className="flex items-center gap-1 text-xs text-amber-400">
                        <Lock size={12} />
                        비밀
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* 하단 버튼 */}
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={() => setPhase('deduction')}
              disabled={collectedEvidence.length < 2}
              className="btn-primary flex items-center gap-2"
            >
              <Brain size={18} />
              추론하기
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 심문 화면
  return (
    <div className="h-full flex flex-col">
      {/* 캐릭터 정보 */}
      <div className="p-4 bg-slate-800/50 border-b border-slate-700">
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

          {/* 비밀 상태 표시 */}
          {character && character.secrets.length > 0 && (
            <div className="flex items-center gap-2">
              {character.secrets.map((secret) => (
                <div
                  key={secret.id}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    secret.isRevealed ? 'bg-slate-700' : 'bg-red-500 animate-pulse'
                  }`}
                >
                  {secret.isRevealed ? (
                    <Unlock size={14} className="text-slate-400" />
                  ) : (
                    <Lock size={14} className="text-white" />
                  )}
                </div>
              ))}
            </div>
          )}

          <button
            onClick={handleEndInterview}
            className="btn-secondary"
          >
            대화 종료
          </button>
        </div>
      </div>

      {/* 대화 내용 */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="max-w-2xl mx-auto space-y-3">
          {dialogues.map((dialogue, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${
                dialogue.startsWith('[')
                  ? 'bg-slate-700/50 text-slate-400 text-sm italic'
                  : 'bg-slate-800 text-white'
              }`}
            >
              {dialogue}
            </div>
          ))}
        </div>
      </div>

      {/* 주제 선택 & 증거 제시 */}
      <div className="p-4 bg-slate-900/80 backdrop-blur-sm border-t border-slate-700">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-3">
            {['greeting', 'alibi', 'relationship', 'incident', 'suspicious'].map((topic) => {
              const topicNames: Record<string, string> = {
                greeting: '인사',
                alibi: '알리바이',
                relationship: '관계',
                incident: '사건 당일',
                suspicious: '의심되는 점'
              };

              return (
                <button
                  key={topic}
                  onClick={() => handleSelectTopic(topic)}
                  className={`btn-secondary text-sm ${
                    selectedTopic === topic ? 'ring-2 ring-indigo-500' : ''
                  }`}
                >
                  <MessageSquare size={14} className="mr-1" />
                  {topicNames[topic]}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setShowEvidenceList(true)}
            disabled={collectedEvidence.length === 0}
            className="w-full btn-accent flex items-center justify-center gap-2"
          >
            <FileSearch size={18} />
            증거 제시하기 ({collectedEvidence.length})
          </button>
        </div>
      </div>

      {/* 증거 선택 모달 */}
      {showEvidenceList && (
        <div className="fixed inset-0 z-50 flex items-end justify-center p-4 bg-black/70">
          <div
            className="absolute inset-0"
            onClick={() => setShowEvidenceList(false)}
          />
          <div className="relative card max-w-2xl w-full max-h-[60vh] overflow-y-auto">
            <h3 className="font-bold text-white mb-4">제시할 증거 선택</h3>
            <div className="grid grid-cols-2 gap-2">
              {collectedEvidence.map(evId => {
                const evidence = currentCase.evidence.find(e => e.id === evId);
                if (!evidence) return null;

                return (
                  <button
                    key={evId}
                    onClick={() => handlePresentEvidence(evId)}
                    className="card text-left hover:border-amber-500/50 transition-all"
                  >
                    <h4 className="font-medium text-white">{evidence.name}</h4>
                    <p className="text-xs text-slate-400 line-clamp-2">{evidence.description}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
