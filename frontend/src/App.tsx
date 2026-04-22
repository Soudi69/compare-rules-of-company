import { useState } from 'react'
import { Sparkles, LogOut, Star, Zap, Globe } from 'lucide-react'
import { useAuth } from './context/AuthContext'
import LoginScreen from './components/LoginScreen'
import CompanySidebar from './components/CompanySidebar'
import PolicyView from './components/PolicyView'
import { analyzeCompanyRules } from './services/api'
import type { AnalysisResult, Company } from './types'
import RatingDashboard from './components/RatingDashboard'

function App() {
  const { user, isAuthenticated, logout } = useAuth()
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [activeView, setActiveView] = useState<'analysis' | 'ratings'>('analysis')

  const handleSelectCompany = async (company: Company) => {
    setSelectedCompany(company)
    setIsLoading(true)
    setError(null)
    setAnalysis(null)

    try {
      const result = await analyzeCompanyRules(company.name)
      setAnalysis(result)
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An error occurred during analysis'
      setError(errorMessage)
      console.error('Analysis error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isAuthenticated) {
    return <LoginScreen />
  }

  return (
    <div className="h-screen bg-gradient-dark flex flex-col overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Aurora-like gradient background with orange + purple */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-600/20 rounded-full filter blur-3xl animate-float"></div>
        <div className="absolute -bottom-20 right-1/4 w-80 h-80 bg-purple-600/20 rounded-full filter blur-3xl animate-aurora-wave"></div>
        <div className="absolute top-1/2 right-0 w-72 h-72 bg-orange-600/20 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Header with enhanced cosmic styling */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-gradient-to-r from-dark-900/90 via-dark-900/95 to-dark-900/90 border-b border-gradient-to-r from-orange-900/50 via-purple-900/30 to-orange-900/50 shadow-2xl">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Cosmic logo */}
              <div className="relative p-3 bg-gradient-to-br from-orange-600/30 to-purple-600/20 rounded-xl border border-orange-500/50 shadow-lg shadow-orange-500/20 hover:shadow-xl hover:shadow-orange-500/30 transition-all duration-300">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-600/20 to-purple-600/10 animate-pulse"></div>
                <Sparkles className="w-6 h-6 text-amber-300 relative z-10 drop-shadow-lg" />
              </div>
              {/* Navigation tabs */}
<div className="flex gap-2 ml-6">
  <button
    onClick={() => setActiveView('analysis')}
    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
      activeView === 'analysis'
        ? 'bg-orange-600/30 text-amber-300 border border-orange-500/50'
        : 'text-amber-200/50 hover:text-amber-200'
    }`}
  >
    🔍 Analysis
  </button>
  <button
    onClick={() => setActiveView('ratings')}
    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
      activeView === 'ratings'
        ? 'bg-orange-600/30 text-amber-300 border border-orange-500/50'
        : 'text-amber-200/50 hover:text-amber-200'
    }`}
  >
    ⭐ Ratings
  </button>
</div>

              <div>
                <h1 className="text-2xl font-black bg-gradient-to-r from-amber-300 via-orange-300 to-purple-300 bg-clip-text text-transparent drop-shadow-lg">
                  ✨ Apte
                </h1>
                <p className="text-xs text-amber-200/80 font-semibold uppercase tracking-wider">
                  AI Principle Tracker Ethos
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-3 px-4 py-2 rounded-lg bg-gradient-to-r from-orange-900/20 to-purple-900/20 border border-orange-500/30 backdrop-blur-sm">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-purple-600 flex items-center justify-center shadow-lg shadow-orange-500/50">
                  <span className="text-white font-bold text-sm drop-shadow-lg">
                    {user?.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{user?.name}</p>
                  <p className="text-amber-200/70 text-xs">{user?.email}</p>
                </div>
              </div>

              <button
                onClick={logout}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-red-600/20 to-pink-600/20 hover:from-red-600/40 hover:to-pink-600/40 text-red-300 hover:text-red-200 border border-red-500/30 hover:border-red-400/50 transition-all duration-200 text-sm font-semibold shadow-lg hover:shadow-xl hover:shadow-red-500/20"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden relative z-10">
        {/* Left Sidebar - Companies */}
        <div className="w-80 border-r border-gradient-to-b from-orange-900/30 to-purple-900/20 bg-gradient-to-b from-dark-900/50 to-dark-900/20 backdrop-blur-sm overflow-hidden">
          <CompanySidebar
            companies={[]}
            selectedCompany={selectedCompany}
            onSelectCompany={handleSelectCompany}
            isLoading={isLoading}
          />
        </div>

{/* Right Content */}
<div className="flex-1 overflow-y-auto bg-gradient-to-b from-dark-900/30 to-dark-900/10">
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

    {activeView === 'analysis' ? (
      <>
        {error && (
          <div className="bg-gradient-to-r from-red-900/30 to-red-900/10 border border-red-600/50 rounded-2xl p-6 mb-6 backdrop-blur-sm shadow-xl shadow-red-500/10 animate-pulse">
            <div className="flex items-start space-x-3">
              <Zap className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-200 font-semibold">{error}</p>
            </div>
          </div>
        )}

        {selectedCompany && analysis && (
          <div className="animate-fade-in">
            <PolicyView analysis={analysis} isLoading={isLoading} />
          </div>
        )}

        {!selectedCompany && !analysis && !isLoading && !error && (
          <div className="flex items-center justify-center h-96">
            <div className="text-center max-w-md">

              <div className="relative p-8 mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-purple-600/20 rounded-full blur-2xl animate-pulse"></div>
                <div className="relative flex items-center justify-center space-x-2">
                  <Star className="w-8 h-8 text-amber-400 animate-cosmic-spin" />
                  <Globe className="w-10 h-10 text-orange-400 animate-float" />
                  <Sparkles className="w-8 h-8 text-purple-400 animate-cosmic-spin" />
                </div>
              </div>

              <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-300 to-purple-300 bg-clip-text text-transparent mb-3">
                Welcome to Apte
              </h2>

              <p className="text-amber-200/80 mb-4 leading-relaxed">
                Explore corporate AI ethical guidelines and principles. Analyze how companies approach artificial intelligence governance.
              </p>

              <p className="text-sm text-amber-200/60 font-semibold uppercase tracking-widest">
                Select a company to begin →
              </p>

            </div>
          </div>
        )}
      </>
     ) : (
               <div className="animate-fade-in">
          <RatingDashboard />
        </div>
      )}
            </div>
      </div>
    </div>
  </div>
  )
}

export default App