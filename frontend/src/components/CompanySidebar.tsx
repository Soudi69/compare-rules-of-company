import { useState } from 'react'
import { Compass, Star, Globe, ChevronRight, Zap } from 'lucide-react'
import type { Company } from '../types'

interface CompanySidebarProps {
  companies: Company[]
  selectedCompany: Company | null
  onSelectCompany: (company: Company) => void
  isLoading: boolean
}

// Mock company data
const MOCK_COMPANIES: Company[] = [
  {
    id: '1',
    name: 'Google',
    ticker: 'GOOGL',
    industry: 'Tech & AI',
    founded: 1998,
    description: 'Search, AI, and cloud services',
  },
  {
    id: '2',
    name: 'Microsoft',
    ticker: 'MSFT',
    industry: 'Tech & AI',
    founded: 1975,
    description: 'Software and AI platform leader',
  },
  {
    id: '3',
    name: 'OpenAI',
    ticker: 'OPENAI',
    industry: 'Generative AI',
    founded: 2015,
    description: 'Advanced AI research & deployment',
  },
  {
    id: '4',
    name: 'Amazon',
    ticker: 'AMZN',
    industry: 'E-commerce & Cloud',
    founded: 1994,
    description: 'Cloud services and AI applications',
  },
  {
    id: '5',
    name: 'Meta',
    ticker: 'META',
    industry: 'Social Media & AI',
    founded: 2004,
    description: 'Social platform with AI focus',
  },
  {
    id: '6',
    name: 'Anthropic',
    ticker: 'ANTH',
    industry: 'AI Safety & Research',
    founded: 2021,
    description: 'AI model safety & alignment',
  },
  {
    id: '7',
    name: 'Tesla',
    ticker: 'TSLA',
    industry: 'Autonomous Vehicles',
    founded: 2003,
    description: 'EV and autonomous driving innovation',
  },
]

export default function CompanySidebar({
  selectedCompany,
  onSelectCompany,
  isLoading,
}: CompanySidebarProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [favorites, setFavorites] = useState<string[]>([])

  const filteredCompanies = MOCK_COMPANIES.filter(
    (company) =>
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.industry.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const toggleFavorite = (companyId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setFavorites((prev) =>
      prev.includes(companyId)
        ? prev.filter((id) => id !== companyId)
        : [...prev, companyId]
    )
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-dark-800/80 via-dark-900/60 to-dark-900/80 border-r border-gradient-to-b from-purple-900/50 to-blue-900/20 backdrop-blur-sm">
      {/* Header with cosmic styling */}
      <div className="p-4 border-b border-purple-900/30 bg-gradient-to-r from-purple-900/10 to-blue-900/5 backdrop-blur-sm">
        <h2 className="text-lg font-bold text-white mb-3 flex items-center space-x-2">
          <div className="p-2 bg-gradient-to-br from-purple-600/40 to-blue-600/30 rounded-lg">
            <Globe className="w-5 h-5 text-purple-300 drop-shadow-lg" />
          </div>
          <span className="bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
            Explore
          </span>
        </h2>

        {/* Cosmic Search */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
          <Compass className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-purple-400 z-10" />
          <input
            type="text"
            placeholder="Search companies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="relative w-full bg-dark-700/60 border border-purple-900/40 rounded-xl pl-10 pr-3 py-2.5 text-sm text-white placeholder-dark-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-600/30 transition-all backdrop-blur-sm hover:border-purple-900/60"
          />
        </div>
      </div>

      {/* Companies List */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="p-3 space-y-2">
          {filteredCompanies.map((company) => (
            <button
              key={company.id}
              onClick={() => onSelectCompany(company)}
              disabled={isLoading}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed ${
                selectedCompany?.id === company.id
                  ? 'bg-gradient-to-r from-purple-600/40 to-blue-600/20 border border-purple-500/60 shadow-lg shadow-purple-500/20'
                  : 'bg-dark-800/40 hover:bg-dark-700/60 border border-purple-900/20 hover:border-purple-900/40'
              }`}
            >
              {/* Animated cosmic background */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              {selectedCompany?.id === company.id && (
                <div className="absolute inset-0 animate-pulse">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-transparent to-blue-600/20"></div>
                </div>
              )}

              <div className="relative flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <Globe className="w-5 h-5 text-gray-500 mb-2 group-hover:text-amber-500 transition-colors" />
                    <h3 className="font-bold text-white truncate group-hover:text-purple-200 transition-colors">
                      {company.name}
                    </h3>
                    {company.ticker && (
                      <span className="text-xs bg-gradient-to-r from-purple-600/40 to-blue-600/30 text-purple-200 px-2 py-1 rounded-lg whitespace-nowrap font-semibold border border-purple-500/30">
                        {company.ticker}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-purple-300/70 line-clamp-1 group-hover:text-purple-300/90 transition-colors">
                    {company.industry}
                  </p>
                </div>

                <div className="flex items-center space-x-1 ml-2">
                  <button
                    onClick={(e) => toggleFavorite(company.id, e)}
                    className="p-2 hover:bg-purple-600/30 rounded-lg transition-all duration-200 group/star"
                  >
                    <Star
                      className={`w-4 h-4 transition-all duration-200 ${
                        favorites.includes(company.id)
                          ? 'fill-yellow-400 text-yellow-400 drop-shadow-lg'
                          : 'text-purple-400/60 group-hover/star:text-yellow-400'
                      }`}
                    />
                  </button>
                  {selectedCompany?.id === company.id && (
                    <div className="p-1.5 rounded-lg bg-purple-600/40">
                      <ChevronRight className="w-4 h-4 text-purple-300 drop-shadow-lg" />
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Footer Info with cosmic styling */}
      <div className="p-4 border-t border-purple-900/30 bg-gradient-to-r from-purple-900/10 to-blue-900/5 backdrop-blur-sm">
        <div className="flex items-center justify-center space-x-2">
          <Zap className="w-3 h-3 text-purple-400/70" />
          <p className="text-xs text-purple-300/70 font-semibold">
            {filteredCompanies.length} companies
          </p>
          <Zap className="w-3 h-3 text-purple-400/70" />
        </div>
      </div>
    </div>
  )
}
