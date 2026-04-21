import {
  AlertTriangle,
  CheckCircle,
  Calendar,
  Zap,
  Shield,
  Clock,
  ChevronDown,
} from 'lucide-react'
import type { AnalysisResult } from '../types'
import { useState } from 'react'

interface PolicyViewProps {
  analysis: AnalysisResult
  isLoading: boolean
}

export default function PolicyView({ analysis, isLoading }: PolicyViewProps) {
  const [expandedYear, setExpandedYear] = useState<number | null>(null)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-600/20 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-dark-400">Analyzing policy...</p>
        </div>
      </div>
    )
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'from-red-600/20 to-red-600/10 border-red-600/30'
      case 'medium':
        return 'from-yellow-600/20 to-yellow-600/10 border-yellow-600/30'
      default:
        return 'from-blue-600/20 to-blue-600/10 border-blue-600/30'
    }
  }

  const getSeverityBadgeColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-900/30 text-red-300 border-red-600/30'
      case 'medium':
        return 'bg-yellow-900/30 text-yellow-300 border-yellow-600/30'
      default:
        return 'bg-blue-900/30 text-blue-300 border-blue-600/30'
    }
  }

  return (
    <div className="space-y-6">
      {/* Overall Score Card */}
      <div className="bg-gradient-to-br from-dark-800 to-dark-900 border border-purple-900/20 rounded-xl p-6 backdrop-blur-sm">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-white text-lg font-semibold mb-2">
              {analysis.companyName}
            </h2>
            <p className="text-dark-400 text-sm">{analysis.overallSummary}</p>
          </div>

          {/* Compliance Score */}
          <div className="flex flex-col items-center">
            <div className="relative w-24 h-24 mb-2">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-dark-700"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="url(#scoreGradient)"
                  strokeWidth="8"
                  strokeDasharray={`${(analysis.complianceScore / 100) * 283} 283`}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient
                    id="scoreGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">
                  {analysis.complianceScore}%
                </span>
              </div>
            </div>
            <p className="text-xs text-dark-400 text-center">Compliance Score</p>
          </div>
        </div>
      </div>

      {/* Key Points */}
      {analysis.keyPoints.length > 0 && (
        <div className="bg-gradient-to-br from-dark-800 to-dark-900 border border-purple-900/20 rounded-xl p-6 backdrop-blur-sm">
          <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span>Key Points</span>
          </h3>
          <ul className="space-y-3">
            {analysis.keyPoints.map((point, idx) => (
              <li key={idx} className="flex space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-blue-400"></div>
                </div>
                <p className="text-dark-300 text-sm">{point}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Red Flags */}
      {analysis.redFlags.length > 0 && (
        <div className="bg-gradient-to-br from-dark-800 to-dark-900 border border-purple-900/20 rounded-xl p-6 backdrop-blur-sm">
          <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <span>Red Flags</span>
          </h3>
          <div className="space-y-3">
            {analysis.redFlags.map((flag, idx) => (
              <div
                key={idx}
                className={`bg-gradient-to-r ${getSeverityColor(flag.severity)} border rounded-lg p-4`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-white">{flag.title}</h4>
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold border ${getSeverityBadgeColor(flag.severity)}`}
                  >
                    {flag.severity.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm opacity-90 mb-2">{flag.description}</p>
                {flag.year && (
                  <p className="text-xs opacity-75 flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>Flagged in {flag.year}</span>
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Timeline */}
      {analysis.timelineChanges.length > 0 && (
        <div className="bg-gradient-to-br from-dark-800 to-dark-900 border border-purple-900/20 rounded-xl p-6 backdrop-blur-sm">
          <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
            <Clock className="w-5 h-5 text-blue-400" />
            <span>Policy Timeline</span>
          </h3>

          <div className="space-y-2">
            {analysis.timelineChanges
              .sort((a, b) => b.year - a.year)
              .map((change, idx) => (
                <div key={idx}>
                  <button
                    onClick={() =>
                      setExpandedYear(
                        expandedYear === change.year ? null : change.year
                      )
                    }
                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-dark-700/50 transition-colors group flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-blue-400"></div>
                      <div>
                        <p className="font-semibold text-white">{change.year}</p>
                        <p className="text-xs text-dark-400 line-clamp-1">
                          {change.change}
                        </p>
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-dark-500 transition-transform ${expandedYear === change.year ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {expandedYear === change.year && (
                    <div className="px-4 py-3 ml-2 border-l-2 border-purple-600/30 bg-dark-700/20 rounded">
                      <div className="space-y-2">
                        <div>
                          <p className="text-xs uppercase tracking-wide text-dark-500 font-semibold mb-1">
                            Change
                          </p>
                          <p className="text-sm text-white">{change.change}</p>
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-wide text-dark-500 font-semibold mb-1">
                            Impact
                          </p>
                          <p className="text-sm text-white">{change.impact}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {analysis.recommendations.length > 0 && (
        <div className="bg-gradient-to-br from-dark-800 to-dark-900 border border-purple-900/20 rounded-xl p-6 backdrop-blur-sm">
          <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            <span>Recommendations</span>
          </h3>
          <ul className="space-y-2">
            {analysis.recommendations.map((rec, idx) => (
              <li key={idx} className="flex space-x-3">
                <Shield className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                <p className="text-dark-300 text-sm">
                  {typeof rec === 'string' ? rec : rec.title}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
