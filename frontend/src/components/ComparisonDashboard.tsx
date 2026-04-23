import React, { useState, useEffect } from 'react'
import { ArrowRight, Activity, Award, ShieldAlert, GitMerge, FileText } from 'lucide-react'
import { compareCompanies, fetchCompanies, addComparisonToSession } from '../services/api'
import type { ComparisonResult, CategoryComparison } from '../types'

interface ComparisonDashboardProps {
  sessionId?: string;
}

export default function ComparisonDashboard({ sessionId }: ComparisonDashboardProps) {
  const [companies, setCompanies] = useState<string[]>([])
  const [companyA, setCompanyA] = useState<string>('')
  const [companyB, setCompanyB] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<ComparisonResult | null>(null)

  useEffect(() => {
    const loadCompanies = async () => {
      try {
        const comps = await fetchCompanies()
        setCompanies(comps)
        if (comps.length >= 2) {
          setCompanyA(comps[0])
          setCompanyB(comps[1])
        }
      } catch (err) {
        console.error('Failed to load companies', err)
      }
    }
    loadCompanies()
  }, [])

  const handleCompare = async () => {
    if (!companyA || !companyB) {
      setError('Please select two companies.')
      return
    }
    if (companyA === companyB) {
      setError('Please select two different companies.')
      return
    }

    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const res = await compareCompanies(companyA, companyB)
      setResult(res)
      
      if (sessionId) {
        try {
          await addComparisonToSession(
            sessionId,
            companyA,
            companyB,
            res.overall_winner,
            res.summary
          )
        } catch (sessionErr) {
          console.error("Failed to save to session:", sessionErr)
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Comparison failed')
    } finally {
      setIsLoading(false)
    }
  }

  const renderWinnerBadge = (winner: string, labelA: string, labelB: string) => {
    if (winner === 'tie') return <span className="px-2 py-1 text-xs rounded-full bg-gray-600/50 text-gray-300 border border-gray-500">Tie</span>
    if (winner === 'company_a') return <span className="px-2 py-1 text-xs rounded-full bg-orange-600/50 text-orange-200 border border-orange-500 font-bold">{labelA} Wins</span>
    if (winner === 'company_b') return <span className="px-2 py-1 text-xs rounded-full bg-purple-600/50 text-purple-200 border border-purple-500 font-bold">{labelB} Wins</span>
    return null
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 h-full overflow-y-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-black bg-gradient-to-r from-amber-300 via-orange-300 to-purple-300 bg-clip-text text-transparent mb-2">
          Side-by-Side Comparison
        </h2>
        <p className="text-amber-200/80">
          Compare the AI ethics guidelines, compliance scores, and governance maturity of two companies.
        </p>
      </div>

      <div className="bg-gradient-to-br from-dark-800 to-dark-900 border border-orange-900/30 rounded-xl p-6 backdrop-blur-sm shadow-xl mb-8">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-amber-200/70 mb-2">First Company</label>
            <select 
              value={companyA} 
              onChange={(e) => setCompanyA(e.target.value)}
              className="w-full bg-dark-700/50 border border-orange-900/40 rounded-lg p-3 text-white focus:outline-none focus:border-orange-500"
            >
              {companies.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          
          <div className="flex items-center justify-center pt-6 px-4">
            <div className="bg-dark-700/50 rounded-full p-3 border border-purple-900/30">
              <GitMerge className="w-6 h-6 text-orange-400" />
            </div>
          </div>
          
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-amber-200/70 mb-2">Second Company</label>
            <select 
              value={companyB} 
              onChange={(e) => setCompanyB(e.target.value)}
              className="w-full bg-dark-700/50 border border-purple-900/40 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500"
            >
              {companies.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          
          <div className="pt-6 w-full md:w-auto">
            <button
              onClick={handleCompare}
              disabled={isLoading || !companyA || !companyB || companies.length < 2}
              className="w-full md:w-auto bg-gradient-to-r from-orange-600 to-purple-700 hover:from-orange-500 hover:to-purple-600 disabled:opacity-50 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? 'Analyzing...' : 'Compare'}
              {!isLoading && <ArrowRight className="w-5 h-5" />}
            </button>
          </div>
        </div>
        
        {error && (
          <div className="mt-4 p-3 bg-red-900/30 border border-red-500/50 rounded text-red-200 text-sm">
            {error}
          </div>
        )}
      </div>

      {result && (
        <div className="space-y-8 animate-fade-in">
          {/* Executive Summary Panel */}
          <div className="bg-gradient-to-r from-dark-800 to-dark-900 border border-amber-500/20 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-start gap-4">
              <Award className="w-8 h-8 text-amber-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Overall Verdict</h3>
                <p className="text-gray-300 leading-relaxed mb-4">{result.summary}</p>
                <div className="bg-dark-700/40 border border-dark-600 rounded-lg p-4">
                  <p className="text-amber-200 font-medium">Recommendation:</p>
                  <p className="text-gray-300 text-sm mt-1">{result.recommendation}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Side by Side Header */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-b from-orange-900/40 to-dark-800 border-t-4 border-orange-500 rounded-xl p-6 text-center shadow-lg">
              <h2 className="text-3xl font-black text-white mb-2">{result.company_a}</h2>
              <div className="inline-flex flex-col items-center">
                <span className="text-5xl font-bold text-orange-400">{result.company_a_compliance}</span>
                <span className="text-xs uppercase tracking-wider text-gray-400 mt-1">Compliance Score</span>
              </div>
              {result.overall_winner === 'company_a' && (
                <div className="mt-4 inline-flex items-center gap-1 bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full border border-orange-500/30 text-sm font-bold">
                  <Award className="w-4 h-4" /> Overall Winner
                </div>
              )}
            </div>
            
            <div className="bg-gradient-to-b from-purple-900/40 to-dark-800 border-t-4 border-purple-500 rounded-xl p-6 text-center shadow-lg">
              <h2 className="text-3xl font-black text-white mb-2">{result.company_b}</h2>
              <div className="inline-flex flex-col items-center">
                <span className="text-5xl font-bold text-purple-400">{result.company_b_compliance}</span>
                <span className="text-xs uppercase tracking-wider text-gray-400 mt-1">Compliance Score</span>
              </div>
              {result.overall_winner === 'company_b' && (
                <div className="mt-4 inline-flex items-center gap-1 bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full border border-purple-500/30 text-sm font-bold">
                  <Award className="w-4 h-4" /> Overall Winner
                </div>
              )}
            </div>
          </div>

          {/* Category Comparisons */}
          <div className="bg-dark-800/80 border border-dark-600 rounded-2xl overflow-hidden shadow-xl">
            <div className="bg-dark-900/80 px-6 py-4 border-b border-dark-600 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-bold text-white">Category Breakdown</h3>
            </div>
            
            <div className="divide-y divide-dark-600">
              {result.category_comparisons.map((cat: CategoryComparison, i: number) => (
                <div key={i} className="p-4 sm:p-6 hover:bg-dark-700/30 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-md font-bold text-gray-200 capitalize">{cat.category.replace('_', ' ')}</h4>
                    {renderWinnerBadge(cat.winner, result.company_a, result.company_b)}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-8 items-center relative">
                    <div className="text-right">
                      <div className="flex items-center justify-end gap-3 mb-1">
                        <span className="text-xl font-bold text-white">{cat.company_a_score.toFixed(1)}</span>
                      </div>
                      <div className="w-full bg-dark-900 h-2 rounded-full overflow-hidden flex justify-end">
                        <div 
                          className="bg-orange-500 h-full rounded-full" 
                          style={{ width: `${cat.company_a_score}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="absolute left-1/2 -ml-px top-0 bottom-0 w-px bg-dark-600 border-dashed border-l border-dark-500"></div>
                    
                    <div className="text-left">
                      <div className="flex items-center justify-start gap-3 mb-1">
                        <span className="text-xl font-bold text-white">{cat.company_b_score.toFixed(1)}</span>
                      </div>
                      <div className="w-full bg-dark-900 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-purple-500 h-full rounded-full" 
                          style={{ width: `${cat.company_b_score}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-400 mt-4 text-center italic">
                    "{cat.insight}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Strengths & Weaknesses */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="bg-dark-800/80 border border-green-900/30 rounded-xl p-5">
                <h4 className="flex items-center gap-2 text-green-400 font-bold mb-3 border-b border-green-900/30 pb-2">
                  <Award className="w-4 h-4" /> {result.company_a} Strengths
                </h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  {result.company_a_strengths.length > 0 
                    ? result.company_a_strengths.map((s, i) => <li key={i} className="capitalize">{s.replace('_', ' ')}</li>)
                    : <li className="text-gray-500">None identified</li>}
                </ul>
              </div>
              
              <div className="bg-dark-800/80 border border-red-900/30 rounded-xl p-5">
                <h4 className="flex items-center gap-2 text-red-400 font-bold mb-3 border-b border-red-900/30 pb-2">
                  <ShieldAlert className="w-4 h-4" /> {result.company_a} Weaknesses
                </h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  {result.company_a_weaknesses.length > 0 
                    ? result.company_a_weaknesses.map((s, i) => <li key={i} className="capitalize">{s.replace('_', ' ')}</li>)
                    : <li className="text-gray-500">None identified</li>}
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-dark-800/80 border border-green-900/30 rounded-xl p-5">
                <h4 className="flex items-center gap-2 text-green-400 font-bold mb-3 border-b border-green-900/30 pb-2">
                  <Award className="w-4 h-4" /> {result.company_b} Strengths
                </h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  {result.company_b_strengths.length > 0 
                    ? result.company_b_strengths.map((s, i) => <li key={i} className="capitalize">{s.replace('_', ' ')}</li>)
                    : <li className="text-gray-500">None identified</li>}
                </ul>
              </div>
              
              <div className="bg-dark-800/80 border border-red-900/30 rounded-xl p-5">
                <h4 className="flex items-center gap-2 text-red-400 font-bold mb-3 border-b border-red-900/30 pb-2">
                  <ShieldAlert className="w-4 h-4" /> {result.company_b} Weaknesses
                </h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  {result.company_b_weaknesses.length > 0 
                    ? result.company_b_weaknesses.map((s, i) => <li key={i} className="capitalize">{s.replace('_', ' ')}</li>)
                    : <li className="text-gray-500">None identified</li>}
                </ul>
              </div>
            </div>
          </div>

          {/* Topic Overlap */}
          <div className="bg-dark-800/80 border border-dark-600 rounded-xl p-6">
            <h3 className="flex items-center gap-2 text-lg font-bold text-white mb-4">
              <FileText className="w-5 h-5 text-blue-400" /> Topic Coverage Overlap
            </h3>
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Shared Topics</h4>
                <div className="flex flex-wrap gap-2">
                  {result.shared_topics.length > 0 ? result.shared_topics.map((t, i) => (
                    <span key={i} className="px-3 py-1 bg-blue-900/30 text-blue-300 rounded border border-blue-800/50 text-sm capitalize">
                      {t.replace('_', ' ')}
                    </span>
                  )) : <span className="text-sm text-gray-500">None</span>}
                </div>
              </div>
              
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Unique to {result.company_a}</h4>
                <div className="flex flex-wrap gap-2">
                  {result.unique_to_a.length > 0 ? result.unique_to_a.map((t, i) => (
                    <span key={i} className="px-3 py-1 bg-orange-900/30 text-orange-300 rounded border border-orange-800/50 text-sm capitalize">
                      {t.replace('_', ' ')}
                    </span>
                  )) : <span className="text-sm text-gray-500">None</span>}
                </div>
              </div>

              <div className="flex-1">
                <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Unique to {result.company_b}</h4>
                <div className="flex flex-wrap gap-2">
                  {result.unique_to_b.length > 0 ? result.unique_to_b.map((t, i) => (
                    <span key={i} className="px-3 py-1 bg-purple-900/30 text-purple-300 rounded border border-purple-800/50 text-sm capitalize">
                      {t.replace('_', ' ')}
                    </span>
                  )) : <span className="text-sm text-gray-500">None</span>}
                </div>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  )
}
