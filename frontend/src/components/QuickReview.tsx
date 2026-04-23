import React from 'react';
import { TrendingUp, AlertCircle, CheckCircle, Target } from 'lucide-react';

interface CompanySummary {
  company: string;
  ethicsScore: number;
  privacyScore: number;
  fairnessScore: number;
  transparencyScore: number;
  keyHighlight: string;
  mainConcern: string;
  trend: 'up' | 'down' | 'stable';
  totalPolicies: number;
}

interface QuickReviewProps {
  summaries: CompanySummary[];
}

const QuickReview: React.FC<QuickReviewProps> = ({ summaries }) => {
  const getScoreBgGradient = (score: number) => {
    if (score >= 80) return 'from-green-600/20 to-emerald-600/10';
    if (score >= 60) return 'from-yellow-600/20 to-amber-600/10';
    return 'from-red-600/20 to-orange-600/10';
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-5 h-5 text-green-400" />;
      case 'down':
        return <TrendingUp className="w-5 h-5 text-red-400 rotate-180" />;
      default:
        return <div className="w-5 h-5 text-gray-400">→</div>;
    }
  };

  return (
    <div className="w-full py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent mb-2">
          Quick Review
        </h2>
        <p className="text-gray-400">AI Ethics & Governance Assessment Across Companies</p>
      </div>

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {summaries.map((summary) => (
          <div
            key={summary.company}
            className={`relative overflow-hidden rounded-xl border border-orange-500/30 bg-gradient-to-br ${getScoreBgGradient(
              summary.ethicsScore
            )} backdrop-blur-sm p-6 hover:border-orange-500/60 transition-all duration-300 group`}
          >
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
            </div>

            <div className="relative z-10">
              {/* Header with company name and trend */}
              <div className="flex items-start justify-between mb-5">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">{summary.company}</h3>
                  <p className="text-xs text-gray-300">
                    {summary.totalPolicies} policies tracked
                  </p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white/10 backdrop-blur-sm">
                  {getTrendIcon(summary.trend)}
                  <span className="text-xs font-semibold text-white">
                    {summary.trend === 'up'
                      ? 'Improving'
                      : summary.trend === 'down'
                      ? 'Declining'
                      : 'Stable'}
                  </span>
                </div>
              </div>

              {/* Score Grid */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                {/* Ethics Score */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:bg-white/20 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-gray-200">Ethics</span>
                    <CheckCircle className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-2">
                    {summary.ethicsScore}
                  </div>
                  <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
                      style={{ width: `${summary.ethicsScore}%` }}
                    ></div>
                  </div>
                </div>

                {/* Privacy Score */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:bg-white/20 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-gray-200">Privacy</span>
                    <Target className="w-4 h-4 text-pink-400" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-2">
                    {summary.privacyScore}
                  </div>
                  <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-pink-500 to-pink-400 rounded-full"
                      style={{ width: `${summary.privacyScore}%` }}
                    ></div>
                  </div>
                </div>

                {/* Fairness Score */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:bg-white/20 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-gray-200">Fairness</span>
                    <CheckCircle className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-2">
                    {summary.fairnessScore}
                  </div>
                  <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full"
                      style={{ width: `${summary.fairnessScore}%` }}
                    ></div>
                  </div>
                </div>

                {/* Transparency Score */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:bg-white/20 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-gray-200">Transparency</span>
                    <AlertCircle className="w-4 h-4 text-yellow-400" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-2">
                    {summary.transparencyScore}
                  </div>
                  <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full"
                      style={{ width: `${summary.transparencyScore}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Highlight and Concern */}
              <div className="grid grid-cols-1 gap-3">
                {/* Key Highlight */}
                <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-green-300 mb-1">Strength</p>
                      <p className="text-sm text-green-100">{summary.keyHighlight}</p>
                    </div>
                  </div>
                </div>

                {/* Main Concern */}
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-red-300 mb-1">Area to Improve</p>
                      <p className="text-sm text-red-100">{summary.mainConcern}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Border shimmer effect */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Overall Stats */}
      <div className="mt-8 p-6 rounded-xl border border-purple-500/30 bg-gradient-to-br from-purple-600/20 to-orange-600/10 backdrop-blur-sm">
        <h3 className="text-lg font-semibold text-amber-200 mb-4">Industry Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">
              {Math.round(
                summaries.reduce((acc, s) => acc + s.ethicsScore, 0) /
                  summaries.length
              )}
            </div>
            <p className="text-xs text-gray-300">Average Ethics Score</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">
              {Math.round(
                summaries.reduce((acc, s) => acc + s.privacyScore, 0) /
                  summaries.length
              )}
            </div>
            <p className="text-xs text-gray-300">Average Privacy Score</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">
              {Math.round(
                summaries.reduce((acc, s) => acc + s.fairnessScore, 0) /
                  summaries.length
              )}
            </div>
            <p className="text-xs text-gray-300">Average Fairness Score</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">
              {Math.round(
                summaries.reduce((acc, s) => acc + s.transparencyScore, 0) /
                  summaries.length
              )}
            </div>
            <p className="text-xs text-gray-300">Average Transparency Score</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickReview;
