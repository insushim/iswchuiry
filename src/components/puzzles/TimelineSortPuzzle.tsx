import React, { useState, useEffect } from 'react';
import { motion, Reorder, AnimatePresence } from 'framer-motion';
import { TimelineSortData, TimelineCard } from '../../types/puzzles';
import { GripVertical, Check, X, Sparkles, Clock, User } from 'lucide-react';

interface TimelineSortPuzzleProps {
  data: TimelineSortData;
  onSolve: (score: number) => void;
}

interface PlacedCard extends TimelineCard {
  slotIndex: number;
}

type ValidationResult = 'none' | 'partial' | 'complete';

export function TimelineSortPuzzle({ data, onSolve }: TimelineSortPuzzleProps) {
  const totalSlots = data.events.length;

  // 미정렬 풀에 있는 카드들
  const [poolCards, setPoolCards] = useState<TimelineCard[]>([]);

  // 타임라인에 배치된 카드들
  const [timelineCards, setTimelineCards] = useState<PlacedCard[]>([]);

  // 검증 상태
  const [validationResult, setValidationResult] = useState<ValidationResult>('none');
  const [correctSlots, setCorrectSlots] = useState<Set<number>>(new Set());
  const [isCompleted, setIsCompleted] = useState(false);

  // 초기화: 카드를 섞어서 풀에 배치
  useEffect(() => {
    const shuffled = [...data.events].sort(() => Math.random() - 0.5);
    setPoolCards(shuffled);
  }, [data.events]);

  // 풀에서 타임라인으로 카드 추가 (첫 번째 빈 슬롯에)
  const handleAddToTimeline = (card: TimelineCard) => {
    if (timelineCards.length >= totalSlots) return;

    const newPlacedCard: PlacedCard = {
      ...card,
      slotIndex: timelineCards.length,
    };

    setTimelineCards(prev => [...prev, newPlacedCard]);
    setPoolCards(prev => prev.filter(c => c.id !== card.id));
    setValidationResult('none');
    setCorrectSlots(new Set());
  };

  // 타임라인에서 풀로 카드 제거
  const handleRemoveFromTimeline = (cardId: string) => {
    const card = timelineCards.find(c => c.id === cardId);
    if (!card) return;

    const { slotIndex, ...originalCard } = card;

    setPoolCards(prev => [...prev, originalCard]);
    setTimelineCards(prev => {
      const filtered = prev.filter(c => c.id !== cardId);
      // 슬롯 인덱스 재조정
      return filtered.map((c, idx) => ({ ...c, slotIndex: idx }));
    });
    setValidationResult('none');
    setCorrectSlots(new Set());
  };

  // 타임라인 내에서 카드 재정렬
  const handleReorder = (newOrder: PlacedCard[]) => {
    const reindexed = newOrder.map((card, idx) => ({
      ...card,
      slotIndex: idx,
    }));
    setTimelineCards(reindexed);
    setValidationResult('none');
    setCorrectSlots(new Set());
  };

  // 순서 검증
  const handleValidate = () => {
    if (timelineCards.length !== totalSlots) {
      setValidationResult('none');
      return;
    }

    const playerOrder = timelineCards.map(c => c.id);
    const correctOrder = data.correctOrder;

    let correctCount = 0;
    const newCorrectSlots = new Set<number>();

    playerOrder.forEach((id, idx) => {
      if (id === correctOrder[idx]) {
        correctCount++;
        newCorrectSlots.add(idx);
      }
    });

    setCorrectSlots(newCorrectSlots);

    if (correctCount === totalSlots) {
      // 완전 정답
      setValidationResult('complete');
      setIsCompleted(true);

      // 점수 계산 및 콜백 호출
      const score = 120;
      setTimeout(() => {
        onSolve(score);
      }, 2000);
    } else {
      // 부분 정답
      setValidationResult('partial');
    }
  };

  // 빈 슬롯 생성
  const emptySlots = Array.from({ length: totalSlots - timelineCards.length }, (_, i) => i);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8">
      {/* 제목 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <h2 className="text-3xl font-bold text-cyan-400 flex items-center justify-center gap-3">
          <Clock className="w-8 h-8" />
          사건의 순서를 맞춰보세요
        </h2>
        <p className="text-slate-400">
          카드를 클릭하여 타임라인에 배치하거나, 드래그하여 순서를 조정하세요
        </p>
      </motion.div>

      {/* 타임라인 정렬 영역 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 space-y-3"
      >
        <div className="flex items-center gap-2 text-slate-300 mb-4">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          <span className="font-semibold">타임라인</span>
          <span className="text-sm text-slate-500">
            ({timelineCards.length} / {totalSlots})
          </span>
        </div>

        {timelineCards.length === 0 ? (
          // 빈 타임라인 안내
          <div className="text-center py-12 text-slate-500">
            <Clock className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>아래에서 카드를 클릭하여 배치하세요</p>
          </div>
        ) : (
          // 재정렬 가능한 타임라인
          <Reorder.Group
            axis="y"
            values={timelineCards}
            onReorder={handleReorder}
            className="space-y-2"
          >
            <AnimatePresence mode="popLayout">
              {timelineCards.map((card, idx) => {
                const isCorrect = correctSlots.has(idx);
                const isWrong = validationResult === 'partial' && !isCorrect;

                return (
                  <Reorder.Item
                    key={card.id}
                    value={card}
                    dragListener={!isCompleted}
                    className="cursor-grab active:cursor-grabbing"
                  >
                    <motion.div
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        scale: isWrong ? [1, 1.05, 0.95, 1.05, 1] : 1,
                        backgroundColor: isCorrect
                          ? 'rgba(34, 197, 94, 0.2)'
                          : isWrong
                          ? 'rgba(251, 191, 36, 0.2)'
                          : 'rgba(30, 41, 59, 0.6)',
                      }}
                      transition={{
                        layout: { type: 'spring', stiffness: 300, damping: 30 },
                        backgroundColor: { duration: 0.3 },
                        scale: isWrong ? { duration: 0.5 } : { duration: 0.2 },
                      }}
                      onClick={() => !isCompleted && handleRemoveFromTimeline(card.id)}
                      className={`
                        relative flex items-center gap-4 p-4 rounded-xl
                        border backdrop-blur-sm
                        ${
                          isCorrect
                            ? 'border-green-500/50'
                            : isWrong
                            ? 'border-amber-500/50'
                            : 'border-white/10'
                        }
                        ${!isCompleted && 'hover:border-cyan-400/50 transition-colors'}
                      `}
                    >
                      {/* 슬롯 번호 */}
                      <div
                        className={`
                        flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
                        font-bold text-lg
                        ${
                          isCorrect
                            ? 'bg-green-500/20 text-green-400'
                            : isWrong
                            ? 'bg-amber-500/20 text-amber-400'
                            : 'bg-cyan-500/20 text-cyan-400'
                        }
                      `}
                      >
                        {idx + 1}
                      </div>

                      {/* 아이콘 */}
                      <div
                        className={`
                        flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center
                        text-2xl
                        ${
                          isCorrect
                            ? 'bg-green-500/10'
                            : isWrong
                            ? 'bg-amber-500/10'
                            : 'bg-slate-700/50'
                        }
                      `}
                      >
                        {card.icon}
                      </div>

                      {/* 내용 */}
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium">{card.text}</p>
                        {card.characterName && (
                          <div className="flex items-center gap-1.5 mt-1 text-sm text-slate-400">
                            <User className="w-3.5 h-3.5" />
                            <span>{card.characterName}</span>
                          </div>
                        )}
                      </div>

                      {/* 시간 힌트 */}
                      {card.timeHint && (
                        <div className="flex-shrink-0 text-sm text-slate-500 flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          {card.timeHint}
                        </div>
                      )}

                      {/* 드래그 핸들 */}
                      {!isCompleted && (
                        <GripVertical className="w-5 h-5 text-slate-600 flex-shrink-0" />
                      )}

                      {/* 정답/오답 표시 */}
                      {validationResult !== 'none' && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: 'spring', stiffness: 200 }}
                          className="absolute -right-2 -top-2"
                        >
                          {isCorrect ? (
                            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                              <Check className="w-5 h-5 text-white" />
                            </div>
                          ) : isWrong ? (
                            <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center">
                              <X className="w-5 h-5 text-white" />
                            </div>
                          ) : null}
                        </motion.div>
                      )}
                    </motion.div>
                  </Reorder.Item>
                );
              })}
            </AnimatePresence>
          </Reorder.Group>
        )}

        {/* 빈 슬롯 표시 */}
        {emptySlots.map((_, idx) => (
          <motion.div
            key={`empty-${idx}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative flex items-center gap-4 p-4 rounded-xl border-2 border-dashed border-slate-700/50 bg-slate-800/20"
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-700/30 flex items-center justify-center font-bold text-slate-600">
              {timelineCards.length + idx + 1}
            </div>
            <div className="flex-1 text-slate-600 italic">빈 슬롯</div>
            <motion.div
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute inset-0 rounded-xl bg-cyan-500/5"
            />
          </motion.div>
        ))}
      </motion.div>

      {/* 미정렬 카드 풀 */}
      {poolCards.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2 text-slate-300">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
            <span className="font-semibold">미정렬 카드</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {poolCards.map(card => (
              <motion.button
                key={card.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAddToTimeline(card)}
                className="relative p-4 rounded-xl bg-slate-800/60 backdrop-blur-sm border border-white/10 hover:border-cyan-400/50 transition-all text-left space-y-2 group"
              >
                {/* 아이콘 */}
                <div className="w-12 h-12 rounded-full bg-slate-700/50 flex items-center justify-center text-2xl mx-auto group-hover:scale-110 transition-transform">
                  {card.icon}
                </div>

                {/* 텍스트 */}
                <p className="text-sm text-white font-medium text-center line-clamp-2">
                  {card.text}
                </p>

                {/* 힌트들 */}
                {(card.timeHint || card.characterName) && (
                  <div className="space-y-1 text-xs text-slate-500">
                    {card.timeHint && (
                      <div className="flex items-center gap-1 justify-center">
                        <Clock className="w-3 h-3" />
                        <span>{card.timeHint}</span>
                      </div>
                    )}
                    {card.characterName && (
                      <div className="flex items-center gap-1 justify-center">
                        <User className="w-3 h-3" />
                        <span>{card.characterName}</span>
                      </div>
                    )}
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* 검증 버튼 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex justify-center"
      >
        <motion.button
          whileHover={!isCompleted && timelineCards.length === totalSlots ? { scale: 1.05 } : {}}
          whileTap={!isCompleted && timelineCards.length === totalSlots ? { scale: 0.95 } : {}}
          onClick={handleValidate}
          disabled={timelineCards.length !== totalSlots || isCompleted}
          className={`
            px-8 py-4 rounded-xl font-bold text-lg
            transition-all duration-300
            ${
              timelineCards.length === totalSlots && !isCompleted
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50'
                : 'bg-slate-700/50 text-slate-500 cursor-not-allowed'
            }
          `}
        >
          {isCompleted ? (
            <span className="flex items-center gap-2">
              <Check className="w-6 h-6" />
              완료!
            </span>
          ) : (
            '순서 확인하기'
          )}
        </motion.button>
      </motion.div>

      {/* 완료 축하 애니메이션 */}
      <AnimatePresence>
        {validationResult === 'complete' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 360],
              }}
              transition={{
                duration: 1,
                ease: 'easeInOut',
              }}
              className="text-8xl"
            >
              🎉
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 연결선 애니메이션 (완료 시) */}
      {isCompleted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 pointer-events-none"
        >
          {/* 타임라인 연결선 시각화는 CSS로 처리하거나 SVG로 그릴 수 있음 */}
        </motion.div>
      )}
    </div>
  );
}
