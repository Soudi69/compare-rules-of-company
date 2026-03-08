import { AlertTriangle, CheckCircle, TrendingUp, AlertCircle } from 'lucide-react'
import type { AnalysisResult, RedFlag, TimelineChange, Recommendation } from '../types'

interface AnalysisResultsProps {
  analysis: AnalysisResult
}

export default function AnalysisResults({ analysis }: AnalysisResultsProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-900/20 border-red-600/30 text-red-400'
      case 'medium':
        return 'bg-yellow-900/20 border-yellow-600/30 text-yellow-400'
      case 'low':
        return 'bg-blue-900/20 border-blue-600/30 text-blue-400'
      default:
        return 'bg-dark-700/20 border-dark-600/30 text-dark-400'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-900/10 border-red-600/30'
      case 'important':
        return 'bg-purple-900/10 border-purple-600/30'
      case 'standard':
        return 'bg-blue-900/10 border-blue-600/30'
      default:
        return 'bg-dark-700/10 border-dark-600/30'
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'critical':
        return <AlertTriangle className="w-5 h-5 text-red-400" />
      case 'important':
        return <AlertCircle className="w-5 h-5 text-purple-400" />
      default:
        return <CheckCircle className="w-5 h-5 text-blue-400" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header with Compliance Score */}
      <div className="bg-gradient-to-r from-purple-900/20 to-dark-800 border border-purple-600/30 rounded-xl p-6 backdrop-blur-sm">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">{analysis.companyName}</h2>
            <p className="text-dark-400">AI Ethical Guidelines Analysis</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-purple-400 mb-1">
              {analysis.complianceScore}%
            </div>
            <p className="text-xs text-dark-400">Compliance Score</p>
          </div>
        </div>
        <p className="text-dark-300 leading-relaxed">{analysis.overallSummary}</p>
      </div>

      {/* Key Points */}
      {analysis.keyPoints.length > 0 && (
        <div className="bg-dark-800/50 border border-purple-900/20 rounded-xl p-6 backdrop-blur-sm">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-purple-400" />
            <span>Key Points</span>
          </h3>
          <div className="space-y-3">
            {analysis.keyPoints.map((point, idx) => (
              <div key={idx} className="flex space-x-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-dark-300">{point}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Red Flags */}
      {analysis.redFlags.length > 0 && (
        <div className="bg-dark-800/50 border border-red-900/20 rounded-xl p-6 backdrop-blur-sm">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <span>⚠️ Red Flags to Review</span>
          </h3>
          <div className="space-y-3">
            {analysis.redFlags.map((flag, idx) => (
              <div
                key={idx}
                className={`border rounded-lg p-4 backdrop-blur-sm ${getSeverityColor(flag.severity)}`}
              >
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">{flag.title}</h4>
                    <p className="text-sm opacity-90">{flag.description}</p>
                    {flag.year && (
                      <p className="text-xs mt-2 opacity-75">Year: {flag.year}</p>
                    )}
                  </div>
                  <span className="px-2 py-1 bg-black/30 rounded text-xs font-semibold uppercase whitespace-nowrap">
                    {flag.severity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Timeline Changes */}
      {analysis.timelineChanges.length > 0 && (
        <div className="bg-dark-800/50 border border-purple-900/20 rounded-xl p-6 backdrop-blur-sm">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-purple-400" />
            <span>Timeline of Changes</span>
          </h3>
          <div className="space-y-4">
            {analysis.timelineChanges.map((change, idx) => (
              <div key={idx} className="border-l-2 border-purple-600 pl-4 pb-4 last:pb-0">
                <div className="flex items-start space-x-3">
                  <div className="w-3 h-3 bg-purple-600 rounded-full mt-2 -ml-7 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-purple-400 mb-1">{change.year}</p>
                    <p className="text-dark-300 font-medium mb-1">{change.change}</p>
                    <p className="text-sm text-dark-400">{change.impact}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {analysis.recommendations.length > 0 && (
        <div className="bg-dark-800/50 border border-purple-900/20 rounded-xl p-6 backdrop-blur-sm">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span>Recommendations</span>
          </h3>
          <div className="space-y-3">
            {analysis.recommendations.map((rec, idx) => (
              <div
                key={idx}
                className={`border rounded-lg p-4 backdrop-blur-sm ${getPriorityColor(rec.priority)}`}
              >
                <div className="flex items-start space-x-3">
                  {getPriorityIcon(rec.priority)}
                  <div className="flex-1">
                    <h4 className="font-semibold text-white mb-1">{rec.title}</h4>
                    <p className="text-sm text-dark-300">{rec.description}</p>
                  </div>
                  <span className="px-2 py-1 bg-black/20 rounded text-xs font-semibold uppercase whitespace-nowrap text-dark-400">
                    {rec.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
