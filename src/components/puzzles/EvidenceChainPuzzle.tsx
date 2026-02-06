import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link2, Check, X, Trash2 } from 'lucide-react';
import { EvidenceChainData, ChainNode, ChainConnection } from '../../types/puzzles';

interface EvidenceChainPuzzleProps {
  data: EvidenceChainData;
  onSolve: (score: number) => void;
}

interface UserConnection {
  id: string;
  fromId: string;
  toId: string;
}

export function EvidenceChainPuzzle({ data, onSolve }: EvidenceChainPuzzleProps) {
  const [connections, setConnections] = useState<UserConnection[]>([]);
  const [connecting, setConnecting] = useState<string | null>(null);
  const [isSolved, setIsSolved] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [resultCorrect, setResultCorrect] = useState(0);
  const [resultWrong, setResultWrong] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);

  const handleNodeClick = (nodeId: string) => {
    if (isSolved) return;

    if (!connecting) {
      setConnecting(nodeId);
    } else if (connecting === nodeId) {
      setConnecting(null);
    } else {
      // 이미 같은 연결이 있는지 확인
      const exists = connections.some(
        c => (c.fromId === connecting && c.toId === nodeId) ||
             (c.fromId === nodeId && c.toId === connecting)
      );

      if (!exists) {
        setConnections(prev => [
          ...prev,
          { id: `${connecting}-${nodeId}`, fromId: connecting, toId: nodeId }
        ]);
      }
      setConnecting(null);
    }
  };

  const removeConnection = (connId: string) => {
    if (isSolved) return;
    setConnections(prev => prev.filter(c => c.id !== connId));
  };

  const handleCheck = () => {
    let correct = 0;
    let wrong = 0;

    // 사용자 연결과 정답 비교
    const correctSet = new Set(
      data.correctConnections.map(c => `${c.fromId}-${c.toId}`)
    );
    const correctSetReverse = new Set(
      data.correctConnections.map(c => `${c.toId}-${c.fromId}`)
    );

    connections.forEach(conn => {
      const key = `${conn.fromId}-${conn.toId}`;
      if (correctSet.has(key) || correctSetReverse.has(key)) {
        correct++;
      } else {
        wrong++;
      }
    });

    setResultCorrect(correct);
    setResultWrong(wrong);
    setShowResult(true);

    const totalRequired = data.correctConnections.length;
    if (correct >= totalRequired && wrong === 0) {
      setIsSolved(true);
      const score = 120;
      setTimeout(() => onSolve(score), 1500);
    } else if (correct >= totalRequired) {
      setIsSolved(true);
      const score = Math.max(40, 120 - wrong * 20);
      setTimeout(() => onSolve(score), 1500);
    }

    setTimeout(() => setShowResult(false), 3000);
  };

  const getNodePosition = (node: ChainNode) => ({
    x: node.x * 3,  // scale to SVG viewport
    y: node.y * 2.5
  });

  return (
    <div className="space-y-4">
      {/* 안내 */}
      <div className="flex items-center gap-2 text-sm text-slate-400">
        <Link2 size={16} className="text-blue-400" />
        <span>증거 노드를 클릭하여 연결하세요. 두 노드를 순서대로 클릭하면 연결됩니다.</span>
      </div>

      {/* 그래프 영역 */}
      <motion.div
        className="glass p-4 rounded-2xl relative"
        style={{ minHeight: '320px' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* SVG 연결선 */}
        <svg
          ref={svgRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 300 250"
          preserveAspectRatio="xMidYMid meet"
        >
          {connections.map(conn => {
            const from = data.nodes.find(n => n.id === conn.fromId);
            const to = data.nodes.find(n => n.id === conn.toId);
            if (!from || !to) return null;
            const fp = getNodePosition(from);
            const tp = getNodePosition(to);
            return (
              <g key={conn.id}>
                <line
                  x1={fp.x} y1={fp.y}
                  x2={tp.x} y2={tp.y}
                  stroke="rgba(59,130,246,0.5)"
                  strokeWidth="2"
                  strokeDasharray="6 3"
                />
                <circle
                  cx={(fp.x + tp.x) / 2}
                  cy={(fp.y + tp.y) / 2}
                  r="8"
                  fill="rgba(30,41,59,0.9)"
                  stroke="rgba(59,130,246,0.3)"
                  strokeWidth="1"
                  className="cursor-pointer pointer-events-auto"
                  onClick={() => removeConnection(conn.id)}
                />
                <text
                  x={(fp.x + tp.x) / 2}
                  y={(fp.y + tp.y) / 2 + 1}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="6"
                  fill="rgba(248,113,113,0.8)"
                  className="cursor-pointer pointer-events-auto"
                  onClick={() => removeConnection(conn.id)}
                >
                  ✕
                </text>
              </g>
            );
          })}
        </svg>

        {/* 증거 노드들 */}
        <div className="relative" style={{ minHeight: '280px' }}>
          {data.nodes.map(node => {
            const isConnecting = connecting === node.id;
            const hasConnection = connections.some(
              c => c.fromId === node.id || c.toId === node.id
            );

            return (
              <motion.button
                key={node.id}
                onClick={() => handleNodeClick(node.id)}
                disabled={isSolved}
                className={`absolute flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all max-w-[120px] ${
                  isConnecting
                    ? 'bg-blue-500/20 border-blue-500/60 shadow-lg shadow-blue-500/20 z-10'
                    : hasConnection
                    ? 'bg-slate-700/80 border-blue-500/30'
                    : 'bg-slate-800/80 border-white/10 hover:border-blue-400/40'
                }`}
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                animate={isConnecting ? {
                  boxShadow: ['0 0 10px rgba(59,130,246,0.3)', '0 0 25px rgba(59,130,246,0.5)', '0 0 10px rgba(59,130,246,0.3)']
                } : {}}
                transition={isConnecting ? { duration: 1, repeat: Infinity } : {}}
              >
                <span className="text-xl">{node.icon}</span>
                <span className="text-[10px] text-slate-300 text-center leading-tight">{node.label}</span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* 연결 목록 */}
      {connections.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-slate-500">연결된 증거 ({connections.length}개):</p>
          {connections.map(conn => {
            const from = data.nodes.find(n => n.id === conn.fromId);
            const to = data.nodes.find(n => n.id === conn.toId);
            return (
              <motion.div
                key={conn.id}
                className="flex items-center gap-2 p-2 bg-slate-800/50 rounded-lg text-xs"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <span className="text-slate-300">{from?.label}</span>
                <Link2 size={12} className="text-blue-400" />
                <span className="text-slate-300">{to?.label}</span>
                <button
                  onClick={() => removeConnection(conn.id)}
                  className="ml-auto p-1 hover:bg-slate-700 rounded"
                  disabled={isSolved}
                >
                  <Trash2 size={12} className="text-slate-500" />
                </button>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* 확인 버튼 */}
      <motion.button
        onClick={handleCheck}
        disabled={isSolved || connections.length === 0}
        className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl font-bold text-white disabled:opacity-50"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isSolved ? '연결 완료!' : '연결 확인하기'}
      </motion.button>

      {/* 결과 */}
      <AnimatePresence>
        {showResult && !isSolved && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-sm text-amber-300"
          >
            맞는 연결: {resultCorrect}개 / 잘못된 연결: {resultWrong}개
            {resultCorrect < data.correctConnections.length && (
              <span className="block text-xs text-slate-400 mt-1">
                더 많은 연결이 필요합니다 (필요: {data.correctConnections.length}개)
              </span>
            )}
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
            <Check size={40} className="text-emerald-400 mx-auto mb-2" />
            <p className="text-emerald-300 font-bold text-lg">증거 연결 성공!</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
