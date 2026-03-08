import { useState } from 'react'
import { Sparkles, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react'
import CompanyInput from './components/CompanyInput'
import AnalysisResults from './components/AnalysisResults'
import LoadingSpinner from './components/LoadingSpinner'
import { analyzeCompanyRules } from './services/api'
import type { AnalysisResult } from './types'

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleAnalyze = async (companyName: string) => {
    setIsLoading(true)
    setError(null)
    setAnalysis(null)

    try {
      const result = await analyzeCompanyRules(companyName)
      setAnalysis(result)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during analysis'
      setError(errorMessage)
      console.error('Analysis error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-dark bg-fixed">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-dark-900/80 border-b border-purple-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-600/20 rounded-lg">
                <Sparkles className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                  AI Rules Analyzer
                </h1>
                <p className="text-sm text-dark-400">Compare company ethical guidelines over time</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Input */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <CompanyInput onAnalyze={handleAnalyze} isLoading={isLoading} />
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="lg:col-span-2">
            {error && (
              <div className="bg-red-900/20 border border-red-600/30 rounded-xl p-6 mb-6 backdrop-blur-sm">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-red-400 mb-1">Analysis Error</h3>
                    <p className="text-red-300/80">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {isLoading && <LoadingSpinner />}

            {analysis && !isLoading && <AnalysisResults analysis={analysis} />}

            {!isLoading && !analysis && !error && (
              <div className="bg-dark-800/50 backdrop-blur-sm border border-purple-900/20 rounded-xl p-12 text-center">
                <div className="max-w-md mx-auto">
                  <div className="p-4 bg-purple-900/20 rounded-full w-fit mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-purple-400" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2 text-white">Ready to analyze</h2>
                  <p className="text-dark-400">
                    Enter a company name to get started. We'll analyze their AI ethical guidelines and highlight key changes and red flags.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-purple-900/20 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-dark-500 text-sm">
            Powered by Llama 2 • AI Rules Analyzer v1.0
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
