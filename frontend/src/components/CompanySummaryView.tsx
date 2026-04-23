import React, { useState, useEffect } from 'react';
import { TrendingUp, AlertCircle, CheckCircle, Target, Award } from 'lucide-react';
import { getCompanyRatingDetails } from '../services/api';
import LoadingSpinner from './LoadingSpinner';

interface CompanySummaryViewProps {
  companyName: string;
}

interface CompanyDetail {
  aggregates: {
    company_name: string;
    total_ratings: number;
    avg_ethics_score: number;
    avg_privacy_score: number;
    avg_fairness_score: number;
    avg_transparency_score: number;
    avg_overall_score: number;
    rating_trend: 'up' | 'stable' | 'down';
    last_updated: string;
  };
  ratings: Array<any>;
  rating_count: number;
}

const CompanySummaryView: React.FC<CompanySummaryViewProps> = ({ companyName }) => {
  const [companyDetail, setCompanyDetail] = useState<CompanyDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getCompanyRatingDetails(companyName);
        setCompanyDetail(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load company details');
        console.error('Error fetching company details:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (companyName) {
      fetchCompanyDetails();
    }
  }, [companyName]);

  const getScoreBgGradient = (score: number) => {
    if (score >= 8) return 'from-green-600/20 to-emerald-600/10';
    if (score >= 6) return 'from-yellow-600/20 to-amber-600/10';
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

  const getScoreLabel = (score: number) => {
    if (score >= 8) return 'Excellent';
    if (score >= 6) return 'Good';
    return 'Needs Improvement';
  };

  if (isLoading) {
    return (
      <div className="w-full py-8 px-4 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !companyDetail) {
    return (
      <div className="w-full py-8 px-4">
        <div className="rounded-xl border border-red-500/50 bg-gradient-to-br from-red-600/20 to-red-600/5 backdrop-blur-sm p-6">
          <div className="flex gap-4">
            <AlertCircle className="w-8 h-8 text-red-400 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-bold text-red-300 mb-2">Error Loading Data</h3>
              <p className="text-red-100">{error || 'Failed to load company details'}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { aggregates } = companyDetail;
  const summary = aggregates;

  // Convert 1-10 scale to 1-100 for visual display
  const overallScorePercent = Math.round((summary.avg_overall_score / 10) * 100);
  const ethicsPercent = Math.round((summary.avg_ethics_score / 10) * 100);
  const privacyPercent = Math.round((summary.avg_privacy_score / 10) * 100);
  const fairnessPercent = Math.round((summary.avg_fairness_score / 10) * 100);
  const transparencyPercent = Math.round((summary.avg_transparency_score / 10) * 100);

  return (
    <div className="w-full py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent mb-2">
              {summary.company_name}
            </h1>
            <p className="text-gray-400">Based on aggregated user ratings and feedback</p>
            <p className="text-sm text-gray-500 mt-2">Total Ratings: {summary.total_ratings}</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm">
            {getTrendIcon(summary.rating_trend as 'up' | 'down' | 'stable')}
            <span className="text-sm font-semibold text-white">
              {summary.rating_trend === 'up'
                ? 'Improving'
                : summary.rating_trend === 'down'
                ? 'Declining'
                : 'Stable'}
            </span>
          </div>
        </div>

        {/* Overall Score - Big Card */}
        <div className={`relative overflow-hidden rounded-xl border border-orange-500/30 bg-gradient-to-br ${getScoreBgGradient(
          summary.avg_overall_score
        )} backdrop-blur-sm p-8 mb-8`}>
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm font-semibold text-gray-300 mb-2">Overall AI Ethics Score</p>
                <div className="text-6xl font-bold text-white">{summary.avg_overall_score.toFixed(1)}</div>
                <p className="text-lg text-gray-200 mt-2">{getScoreLabel(summary.avg_overall_score)} (out of 10)</p>
              </div>
              <div className="text-right">
                <Award className="w-16 h-16 text-yellow-400 opacity-80 mb-2" />
                <p className="text-sm text-gray-300">{summary.total_ratings} user ratings</p>
              </div>
            </div>

            {/* Overall Progress Bar */}
            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-purple-500 rounded-full"
                style={{ width: `${overallScorePercent}%` }}
              ></div>
            </div>
          </div>

          {/* Border shimmer effect */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Detailed Scores - 2x2 Grid */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-amber-200 mb-6">Detailed Assessment (User-Aggregated)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Ethics Score */}
          <div className="relative overflow-hidden rounded-xl border border-blue-500/30 bg-gradient-to-br from-blue-600/20 to-blue-600/5 backdrop-blur-sm p-6 hover:border-blue-500/60 transition-all duration-300 group">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-semibold text-blue-300 mb-1">Ethics Principles</p>
                  <p className="text-xs text-gray-400">User-rated AI ethical guidelines</p>
                </div>
                <CheckCircle className="w-6 h-6 text-blue-400" />
              </div>
              <div className="text-5xl font-bold text-white mb-2">{summary.avg_ethics_score.toFixed(1)}</div>
              <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
                  style={{ width: `${ethicsPercent}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-400 mt-3">{getScoreLabel(summary.avg_ethics_score)}</p>
            </div>
          </div>

          {/* Privacy Score */}
          <div className="relative overflow-hidden rounded-xl border border-pink-500/30 bg-gradient-to-br from-pink-600/20 to-pink-600/5 backdrop-blur-sm p-6 hover:border-pink-500/60 transition-all duration-300 group">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-semibold text-pink-300 mb-1">Privacy Protection</p>
                  <p className="text-xs text-gray-400">User-rated data protection practices</p>
                </div>
                <Target className="w-6 h-6 text-pink-400" />
              </div>
              <div className="text-5xl font-bold text-white mb-2">{summary.avg_privacy_score.toFixed(1)}</div>
              <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-pink-500 to-pink-400 rounded-full"
                  style={{ width: `${privacyPercent}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-400 mt-3">{getScoreLabel(summary.avg_privacy_score)}</p>
            </div>
          </div>

          {/* Fairness Score */}
          <div className="relative overflow-hidden rounded-xl border border-purple-500/30 bg-gradient-to-br from-purple-600/20 to-purple-600/5 backdrop-blur-sm p-6 hover:border-purple-500/60 transition-all duration-300 group">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-semibold text-purple-300 mb-1">Fairness & Bias</p>
                  <p className="text-xs text-gray-400">User-rated bias mitigation</p>
                </div>
                <CheckCircle className="w-6 h-6 text-purple-400" />
              </div>
              <div className="text-5xl font-bold text-white mb-2">{summary.avg_fairness_score.toFixed(1)}</div>
              <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full"
                  style={{ width: `${fairnessPercent}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-400 mt-3">{getScoreLabel(summary.avg_fairness_score)}</p>
            </div>
          </div>

          {/* Transparency Score */}
          <div className="relative overflow-hidden rounded-xl border border-yellow-500/30 bg-gradient-to-br from-yellow-600/20 to-yellow-600/5 backdrop-blur-sm p-6 hover:border-yellow-500/60 transition-all duration-300 group">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-semibold text-yellow-300 mb-1">Transparency</p>
                  <p className="text-xs text-gray-400">User-rated disclosure clarity</p>
                </div>
                <AlertCircle className="w-6 h-6 text-yellow-400" />
              </div>
              <div className="text-5xl font-bold text-white mb-2">{summary.avg_transparency_score.toFixed(1)}</div>
              <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full"
                  style={{ width: `${transparencyPercent}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-400 mt-3">{getScoreLabel(summary.avg_transparency_score)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Rating Distribution */}
      <div className="rounded-xl border border-purple-500/30 bg-gradient-to-br from-purple-600/20 to-orange-600/10 backdrop-blur-sm p-6">
        <h3 className="text-lg font-bold text-amber-200 mb-4">Rating Information</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400">Total Ratings Collected</span>
            <span className="text-2xl font-bold text-orange-400">{summary.total_ratings}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-400">Current Trend</span>
            <span className="text-2xl font-bold text-purple-400 capitalize">{summary.rating_trend}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-400">Last Updated</span>
            <span className="text-sm text-gray-300">{new Date(summary.last_updated).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanySummaryView;
