import { useState } from 'react'
import { Search, ArrowRight } from 'lucide-react'

interface CompanyInputProps {
  onAnalyze: (companyName: string) => void
  isLoading: boolean
}

export default function CompanyInput({ onAnalyze, isLoading }: CompanyInputProps) {
  const [input, setInput] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      onAnalyze(input.trim())
    }
  }

  const suggestedCompanies = ['OpenAI', 'Google', 'Microsoft', 'Meta', 'Amazon']

  return (
    <div>
      {/* Input Card */}
      <div className="bg-gradient-to-br from-dark-800 to-dark-900 border border-purple-900/30 rounded-xl p-6 backdrop-blur-sm shadow-xl">
        <h2 className="text-lg font-semibold mb-4 text-white">Analyze Company</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-dark-500" />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter company name..."
              disabled={isLoading}
              className="w-full bg-dark-700/50 border border-purple-900/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-dark-500 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-dark-600 disabled:to-dark-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 group"
          >
            <span>{isLoading ? 'Analyzing...' : 'Analyze'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        {/* Suggested Companies */}
        <div className="mt-6 pt-6 border-t border-purple-900/20">
          <p className="text-xs uppercase tracking-wide text-dark-500 mb-3 font-semibold">
            Try these companies
          </p>
          <div className="space-y-2">
            {suggestedCompanies.map((company) => (
              <button
                key={company}
                onClick={() => {
                  setInput(company)
                  setTimeout(() => onAnalyze(company), 100)
                }}
                disabled={isLoading}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-purple-900/20 text-dark-300 hover:text-purple-300 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {company}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Info Card */}
      <div className="mt-6 bg-purple-900/10 border border-purple-900/20 rounded-xl p-4 backdrop-blur-sm">
        <h3 className="text-sm font-semibold text-purple-300 mb-2">What we analyze:</h3>
        <ul className="text-xs text-dark-400 space-y-1">
          <li>✓ AI ethical guidelines</li>
          <li>✓ Historical changes</li>
          <li>✓ Compliance requirements</li>
          <li>✓ Risk assessment</li>
        </ul>
      </div>
    </div>
  )
}
