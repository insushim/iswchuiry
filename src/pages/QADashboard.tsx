/**
 * QA 대시보드 - 게임 품질 분석 및 베타테스트 관리
 */

import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateScenario, validateAllScenarios, ValidationResult } from '../utils/gameValidator';
import { ALL_SCENARIOS, getScenariosByType, getScenariosByDifficulty } from '../data/scenarios';
import { Scenario } from '../data/scenarios/types';

// 점수에 따른 등급
function getGrade(score: number): { grade: string; color: string; emoji: string } {
  if (score >= 90) return { grade: 'S', color: 'text-yellow-400', emoji: '🏆' };
  if (score >= 80) return { grade: 'A', color: 'text-green-400', emoji: '✅' };
  if (score >= 70) return { grade: 'B', color: 'text-blue-400', emoji: '👍' };
  if (score >= 60) return { grade: 'C', color: 'text-orange-400', emoji: '⚠️' };
  if (score >= 50) return { grade: 'D', color: 'text-red-400', emoji: '❌' };
  return { grade: 'F', color: 'text-red-600', emoji: '🚫' };
}

// 검증 결과 카드
function ValidationCard({ title, result, icon }: {
  title: string;
  result: ValidationResult;
  icon: string;
}) {
  const { grade, color, emoji } = getGrade(result.score);

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{icon}</span>
          <h3 className="font-bold text-white">{title}</h3>
        </div>
        <div className={`text-2xl font-bold ${color}`}>
          {emoji} {grade}
        </div>
      </div>

      <div className="mb-3">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-slate-400">점수</span>
          <span className={color}>{result.score}/100</span>
        </div>
        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${
              result.score >= 80 ? 'bg-green-500' :
              result.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${result.score}%` }}
          />
        </div>
      </div>

      {result.errors.length > 0 && (
        <div className="mb-2">
          <p className="text-xs text-red-400 font-medium mb-1">
            오류 ({result.errors.length})
          </p>
          <ul className="space-y-1">
            {result.errors.slice(0, 3).map((error, i) => (
              <li key={i} className="text-xs text-red-300 flex items-start gap-1">
                <span className={
                  error.severity === 'critical' ? 'text-red-500' :
                  error.severity === 'major' ? 'text-orange-500' : 'text-yellow-500'
                }>●</span>
                {error.message}
              </li>
            ))}
            {result.errors.length > 3 && (
              <li className="text-xs text-slate-500">
                +{result.errors.length - 3}개 더...
              </li>
            )}
          </ul>
        </div>
      )}

      {result.warnings.length > 0 && (
        <div>
          <p className="text-xs text-yellow-400 font-medium mb-1">
            경고 ({result.warnings.length})
          </p>
          <ul className="space-y-1">
            {result.warnings.slice(0, 2).map((warning, i) => (
              <li key={i} className="text-xs text-yellow-300 flex items-start gap-1">
                <span className="text-yellow-500">△</span>
                {warning.message}
              </li>
            ))}
            {result.warnings.length > 2 && (
              <li className="text-xs text-slate-500">
                +{result.warnings.length - 2}개 더...
              </li>
            )}
          </ul>
        </div>
      )}

      {result.errors.length === 0 && result.warnings.length === 0 && (
        <p className="text-xs text-green-400">✓ 모든 검증 통과</p>
      )}
    </div>
  );
}

// 시나리오 상세 검증 모달
function ScenarioDetailModal({ scenario, onClose }: {
  scenario: Scenario;
  onClose: () => void;
}) {
  const validation = useMemo(() => validateScenario(scenario), [scenario]);

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">{scenario.title}</h2>
              <p className="text-sm text-slate-400">{scenario.id}</p>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* 종합 점수 */}
          <div className="text-center mb-6">
            <div className={`text-6xl font-bold ${getGrade(validation.overall.score).color}`}>
              {validation.overall.score}
            </div>
            <div className="text-slate-400">종합 점수</div>
            <div className={`text-2xl ${getGrade(validation.overall.score).color}`}>
              {getGrade(validation.overall.score).emoji} {getGrade(validation.overall.score).grade} 등급
            </div>
          </div>

          {/* 상세 검증 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <ValidationCard
              title="Knox 규칙"
              result={validation.knox}
              icon="📜"
            />
            <ValidationCard
              title="완성도"
              result={validation.completeness}
              icon="📝"
            />
            <ValidationCard
              title="플레이 가능성"
              result={validation.playability}
              icon="🎮"
            />
            <ValidationCard
              title="스토리 품질"
              result={validation.storyQuality}
              icon="📖"
            />
          </div>

          {/* 시나리오 정보 */}
          <div className="space-y-4">
            <div className="card">
              <h3 className="font-bold text-white mb-2">기본 정보</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div><span className="text-slate-400">유형:</span> <span className="text-white">{scenario.type}</span></div>
                <div><span className="text-slate-400">난이도:</span> <span className="text-white">{scenario.difficulty}</span></div>
                <div><span className="text-slate-400">캐릭터:</span> <span className="text-white">{scenario.characters.length}명</span></div>
                <div><span className="text-slate-400">증거:</span> <span className="text-white">{scenario.evidence.length}개</span></div>
                <div><span className="text-slate-400">장소:</span> <span className="text-white">{scenario.locations.length}곳</span></div>
                <div><span className="text-slate-400">예상 시간:</span> <span className="text-white">{scenario.estimatedTime}분</span></div>
              </div>
            </div>

            <div className="card">
              <h3 className="font-bold text-white mb-2">프롤로그</h3>
              <p className="text-sm text-slate-300">{scenario.prologue.join(' ')}</p>
            </div>

            <div className="card">
              <h3 className="font-bold text-white mb-2">캐릭터</h3>
              <div className="space-y-2">
                {scenario.characters.map(char => (
                  <div key={char.id} className="flex items-center gap-2 text-sm">
                    <span className={
                      char.role === 'culprit' ? 'text-red-400' :
                      char.role === 'victim' ? 'text-amber-400' : 'text-slate-300'
                    }>
                      {char.role === 'culprit' ? '🔴' : char.role === 'victim' ? '⚠️' : '👤'}
                    </span>
                    <span className="text-white font-medium">{char.name}</span>
                    <span className="text-slate-400">({char.occupation})</span>
                    {char.role === 'culprit' && <span className="text-xs bg-red-500/20 text-red-400 px-1 rounded">범인</span>}
                    {char.role === 'victim' && <span className="text-xs bg-amber-500/20 text-amber-400 px-1 rounded">피해자</span>}
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <h3 className="font-bold text-white mb-2">핵심 증거</h3>
              <div className="space-y-1">
                {scenario.evidence.filter(e => e.isCritical).map(evidence => (
                  <div key={evidence.id} className="text-sm">
                    <span className="text-amber-400">🔑</span>
                    <span className="text-white ml-2">{evidence.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 메인 대시보드
export default function QADashboard() {
  const navigate = useNavigate();
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [filter, setFilter] = useState<'all' | 'passed' | 'failed'>('all');
  const [sortBy, setSortBy] = useState<'score' | 'name' | 'type'>('score');

  // 전체 시나리오 검증
  const validationResults = useMemo(() => {
    return validateAllScenarios(ALL_SCENARIOS);
  }, []);

  // 필터링 및 정렬
  const filteredScenarios = useMemo(() => {
    let scenarios = [...ALL_SCENARIOS];

    // 필터
    if (filter === 'passed') {
      scenarios = scenarios.filter(s => {
        const result = validationResults.results.get(s.id);
        return result?.overall.isValid;
      });
    } else if (filter === 'failed') {
      scenarios = scenarios.filter(s => {
        const result = validationResults.results.get(s.id);
        return !result?.overall.isValid;
      });
    }

    // 정렬
    scenarios.sort((a, b) => {
      if (sortBy === 'score') {
        const scoreA = validationResults.results.get(a.id)?.overall.score || 0;
        const scoreB = validationResults.results.get(b.id)?.overall.score || 0;
        return scoreB - scoreA;
      } else if (sortBy === 'name') {
        return a.title.localeCompare(b.title);
      } else {
        return a.type.localeCompare(b.type);
      }
    });

    return scenarios;
  }, [filter, sortBy, validationResults]);

  const { summary } = validationResults;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950">
      {/* 헤더 */}
      <header className="bg-slate-900/80 border-b border-slate-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="text-slate-400 hover:text-white"
              >
                ← 돌아가기
              </button>
              <div>
                <h1 className="text-2xl font-bold text-white">QA 대시보드</h1>
                <p className="text-sm text-slate-400">게임 품질 분석 및 검증</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-white">{summary.averageScore}</div>
              <div className="text-sm text-slate-400">평균 점수</div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* 요약 통계 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="card text-center">
            <div className="text-4xl font-bold text-white">{summary.total}</div>
            <div className="text-sm text-slate-400">전체 시나리오</div>
          </div>
          <div className="card text-center">
            <div className="text-4xl font-bold text-green-400">{summary.passed}</div>
            <div className="text-sm text-slate-400">검증 통과</div>
          </div>
          <div className="card text-center">
            <div className="text-4xl font-bold text-red-400">{summary.failed}</div>
            <div className="text-sm text-slate-400">검증 실패</div>
          </div>
          <div className="card text-center">
            <div className={`text-4xl font-bold ${getGrade(summary.averageScore).color}`}>
              {getGrade(summary.averageScore).grade}
            </div>
            <div className="text-sm text-slate-400">평균 등급</div>
          </div>
        </div>

        {/* 통과율 차트 */}
        <div className="card mb-8">
          <h2 className="text-lg font-bold text-white mb-4">검증 현황</h2>
          <div className="h-4 bg-slate-700 rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-1000"
              style={{ width: `${summary.total > 0 ? (summary.passed / summary.total) * 100 : 0}%` }}
            />
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-green-400">통과 {summary.passed}개 ({summary.total > 0 ? Math.round((summary.passed / summary.total) * 100) : 0}%)</span>
            <span className="text-red-400">실패 {summary.failed}개 ({summary.total > 0 ? Math.round((summary.failed / summary.total) * 100) : 0}%)</span>
          </div>
        </div>

        {/* 자주 발생하는 이슈 */}
        {summary.commonIssues.length > 0 && (
          <div className="card mb-8">
            <h2 className="text-lg font-bold text-white mb-4">자주 발생하는 이슈</h2>
            <div className="space-y-2">
              {summary.commonIssues.slice(0, 5).map((issue, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">{issue.code}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-500"
                        style={{ width: `${summary.total > 0 ? (issue.count / summary.total) * 100 : 0}%` }}
                      />
                    </div>
                    <span className="text-sm text-amber-400 w-8">{issue.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 필터 및 정렬 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded text-sm ${
                filter === 'all' ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300'
              }`}
            >
              전체
            </button>
            <button
              onClick={() => setFilter('passed')}
              className={`px-3 py-1 rounded text-sm ${
                filter === 'passed' ? 'bg-green-600 text-white' : 'bg-slate-700 text-slate-300'
              }`}
            >
              통과
            </button>
            <button
              onClick={() => setFilter('failed')}
              className={`px-3 py-1 rounded text-sm ${
                filter === 'failed' ? 'bg-red-600 text-white' : 'bg-slate-700 text-slate-300'
              }`}
            >
              실패
            </button>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'score' | 'name' | 'type')}
            className="bg-slate-700 text-white rounded px-3 py-1 text-sm"
          >
            <option value="score">점수순</option>
            <option value="name">이름순</option>
            <option value="type">유형순</option>
          </select>
        </div>

        {/* 시나리오 목록 */}
        <div className="space-y-2">
          {filteredScenarios.map(scenario => {
            const result = validationResults.results.get(scenario.id);
            const score = result?.overall.score || 0;
            const { grade, color, emoji } = getGrade(score);

            return (
              <div
                key={scenario.id}
                onClick={() => setSelectedScenario(scenario)}
                className="card cursor-pointer hover:bg-slate-700/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`text-2xl ${color}`}>{emoji}</div>
                    <div>
                      <h3 className="font-bold text-white">{scenario.title}</h3>
                      <p className="text-sm text-slate-400">
                        {scenario.type} · 난이도: {scenario.difficulty}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className={`text-xl font-bold ${color}`}>{score}</div>
                      <div className="text-xs text-slate-400">점수</div>
                    </div>
                    <div className={`text-2xl font-bold ${color}`}>{grade}</div>
                    {result && !result.overall.isValid && (
                      <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs">
                        {result.overall.errors.filter(e => e.severity === 'critical').length} critical
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredScenarios.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">📭</div>
            <p className="text-slate-400">해당 조건의 시나리오가 없습니다</p>
          </div>
        )}
      </main>

      {/* 상세 모달 */}
      {selectedScenario && (
        <ScenarioDetailModal
          scenario={selectedScenario}
          onClose={() => setSelectedScenario(null)}
        />
      )}
    </div>
  );
}
