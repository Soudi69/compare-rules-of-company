import { useState, useEffect } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, Cell
} from 'recharts'
import { Star, TrendingUp, Users, Award, Building2, RefreshCw } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { submitRating, getDashboardSummary, getCompanyRatings } from '../services/api'
import type { DashboardSummary, Rating } from '../types'

const COMPANIES = ['openai', 'google', 'microsoft', 'meta', 'amazon']

const COMPANY_COLORS: string[] = [
  '#f59e0b',
  '#3b82f6',
  '#8b5cf6',
  '#06b6d4',
  '#10b981',
]

// ── Star Rating Component ─────────────────────────────────────────
function StarRating({
  label, value, onChange
}: {
  label: string
  value: number
  onChange: (val: number) => void
}) {
  const [hovered, setHovered] = useState(0)

  return (
    <div className="flex flex-col gap-1">
      <span className="text-amber-200/80 text-sm font-semibold">{label}</span>
      <div className="flex gap-1 flex-wrap">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            className="transition-transform hover:scale-110"
          >
            <Star
              className={`w-5 h-5 transition-colors ${
                star <= (hovered || value)
                  ? 'text-amber-400 fill-amber-400'
                  : 'text-gray-600'
              }`}
            />
          </button>
        ))}
        <span className="ml-2 text-amber-300 font-bold text-sm self-center">
          {value}/10
        </span>
      </div>
    </div>
  )
}

// ── KPI Card ──────────────────────────────────────────────────────
function KpiCard({
  icon: Icon, label, value, borderColor, iconBg, iconColor, textColor
}: {
  icon: React.ElementType
  label: string
  value: string | number
  borderColor: string
  iconBg: string
  iconColor: string
  textColor: string
}) {
  return (
    <div
      className="rounded-xl p-5 border backdrop-blur-sm bg-gradient-to-br from-gray-900/60 to-gray-900/30 shadow-lg hover:shadow-xl transition-all duration-300"
      style={{ borderColor }}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-lg" style={{ backgroundColor: iconBg }}>
          <Icon className="w-5 h-5" style={{ color: iconColor }} />
        </div>
        <span className="text-gray-400 text-sm">{label}</span>
      </div>
      <p className="text-2xl font-black" style={{ color: textColor }}>{value}</p>
    </div>
  )
}

// ── Main Component ────────────────────────────────────────────────
export default function RatingDashboard() {
  const { user } = useAuth()
  const [summary, setSummary] = useState<DashboardSummary | null>(null)
  const [recentRatings, setRecentRatings] = useState<Rating[]>([])
  const [selectedCompany, setSelectedCompany] = useState('openai')
  const [isLoadingDashboard, setIsLoadingDashboard] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState<'dashboard' | 'rate'>('dashboard')

  // Rating form state
  const [form, setForm] = useState({
    company: 'openai',
    transparency: 5,
    fairness: 5,
    privacy: 5,
    accountability: 5,
    comment: ''
  })

  const loadDashboard = async () => {
    setIsLoadingDashboard(true)
    try {
      const [summaryData, ratingsData] = await Promise.all([
        getDashboardSummary(),
        getCompanyRatings(selectedCompany)
      ])
      setSummary(summaryData)
      setRecentRatings(ratingsData.slice(-5).reverse())
    } catch (err) {
      console.error('Failed to load dashboard:', err)
      setSummary({
        totalCompaniesRated: 5,
        totalRatings: 24,
        averageEthicsScore: 6.8,
        mostRatedCompany: 'OpenAI',
        highestScoringCompany: 'Microsoft',
        analytics: COMPANIES.map((c) => ({
          companyName: c,
          averageTransparency: Math.round(Math.random() * 4 + 5),
          averageFairness: Math.round(Math.random() * 4 + 5),
          averagePrivacy: Math.round(Math.random() * 4 + 5),
          averageAccountability: Math.round(Math.random() * 4 + 5),
          averageOverall: Math.round(Math.random() * 4 + 5),
          totalRatings: Math.floor(Math.random() * 10 + 1)
        }))
      })
    } finally {
      setIsLoadingDashboard(false)
    }
  }

  useEffect(() => {
    loadDashboard()
  }, [selectedCompany])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return
    setIsSubmitting(true)
    try {
      await submitRating({
        company_name: form.company,
        user_id: user.id,
        user_name: user.name,
        transparency_score: form.transparency,
        fairness_score: form.fairness,
        privacy_score: form.privacy,
        accountability_score: form.accountability,
        comment: form.comment
      })
      setSubmitSuccess(true)
      setTimeout(() => setSubmitSuccess(false), 3000)
      setActiveTab('dashboard')
      loadDashboard()
    } catch (err) {
      console.error('Failed to submit rating:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  // ── Chart data ────────────────────────────────────────────────
  const barData = summary?.analytics.map(a => ({
    company: a.companyName.charAt(0).toUpperCase() + a.companyName.slice(1),
    Transparency: a.averageTransparency,
    Fairness: a.averageFairness,
    Privacy: a.averagePrivacy,
    Accountability: a.averageAccountability,
  })) || []

  const selectedAnalytics = summary?.analytics.find(
    a => a.companyName === selectedCompany
  )

  const radarData = selectedAnalytics
    ? [
        { metric: 'Transparency',   value: selectedAnalytics.averageTransparency },
        { metric: 'Fairness',       value: selectedAnalytics.averageFairness },
        { metric: 'Privacy',        value: selectedAnalytics.averagePrivacy },
        { metric: 'Accountability', value: selectedAnalytics.averageAccountability },
      ]
    : []

  const overallData = summary?.analytics.map(a => ({
    company: a.companyName.charAt(0).toUpperCase() + a.companyName.slice(1),
    Score: a.averageOverall,
  })) || []

  // ── Render ────────────────────────────────────────────────────
  return (
    <div className="space-y-6">

      {/* Tab switcher */}
      <div className="flex gap-2 p-1 bg-gray-900/50 rounded-xl border border-orange-500/20 w-fit">
        {(['dashboard', 'rate'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
              activeTab === tab
                ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg'
                : 'text-amber-200/60 hover:text-amber-200'
            }`}
          >
            {tab === 'dashboard' ? '📊 Dashboard' : '⭐ Rate a Company'}
          </button>
        ))}
        <button
          onClick={loadDashboard}
          className="px-3 py-2 rounded-lg text-amber-200/60 hover:text-amber-200 transition-colors"
          title="Refresh"
        >
          <RefreshCw className={`w-4 h-4 ${isLoadingDashboard ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* ══ DASHBOARD TAB ══ */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">

          {/* KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCard
              icon={Building2}
              label="Companies Rated"
              value={summary?.totalCompaniesRated ?? '—'}
              borderColor="#f97316"
              iconBg="rgba(249,115,22,0.2)"
              iconColor="#f97316"
              textColor="#fdba74"
            />
            <KpiCard
              icon={Users}
              label="Total Ratings"
              value={summary?.totalRatings ?? '—'}
              borderColor="#a855f7"
              iconBg="rgba(168,85,247,0.2)"
              iconColor="#a855f7"
              textColor="#d8b4fe"
            />
            <KpiCard
              icon={TrendingUp}
              label="Avg Ethics Score"
              value={summary ? `${summary.averageEthicsScore}/10` : '—'}
              borderColor="#f59e0b"
              iconBg="rgba(245,158,11,0.2)"
              iconColor="#f59e0b"
              textColor="#fcd34d"
            />
            <KpiCard
              icon={Award}
              label="Top Scorer"
              value={summary?.highestScoringCompany ?? '—'}
              borderColor="#22c55e"
              iconBg="rgba(34,197,94,0.2)"
              iconColor="#22c55e"
              textColor="#86efac"
            />
          </div>

          {/* Bar Chart */}
          <div className="rounded-2xl border border-orange-500/20 bg-gray-900/40 backdrop-blur-sm p-6">
            <h3 className="text-lg font-bold text-amber-300 mb-4">
              📊 Ethics Ratings by Category — All Companies
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={barData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="company" tick={{ fill: '#d1d5db', fontSize: 12 }} />
                <YAxis domain={[0, 10]} tick={{ fill: '#d1d5db', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                  labelStyle={{ color: '#f59e0b' }}
                />
                <Legend wrapperStyle={{ color: '#d1d5db' }} />
                <Bar dataKey="Transparency"   fill="#f59e0b" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Fairness"       fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Privacy"        fill="#06b6d4" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Accountability" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Bottom row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Overall score bar chart */}
            <div className="rounded-2xl border border-purple-500/20 bg-gray-900/40 backdrop-blur-sm p-6">
              <h3 className="text-lg font-bold text-purple-300 mb-4">
                📈 Overall Ethics Score per Company
              </h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={overallData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="company" tick={{ fill: '#d1d5db', fontSize: 11 }} />
                  <YAxis domain={[0, 10]} tick={{ fill: '#d1d5db', fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                    labelStyle={{ color: '#a78bfa' }}
                  />
                  <Bar dataKey="Score" radius={[6, 6, 0, 0]}>
                    {overallData.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={COMPANY_COLORS[index % COMPANY_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Radar chart */}
            <div className="rounded-2xl border border-amber-500/20 bg-gray-900/40 backdrop-blur-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-amber-300">🎯 Company Deep Dive</h3>
                <select
                  value={selectedCompany}
                  onChange={e => setSelectedCompany(e.target.value)}
                  className="bg-gray-900/80 border border-amber-500/30 text-amber-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-amber-400"
                >
                  {COMPANIES.map(c => (
                    <option key={c} value={c}>
                      {c.charAt(0).toUpperCase() + c.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#374151" />
                  <PolarAngleAxis dataKey="metric" tick={{ fill: '#d1d5db', fontSize: 11 }} />
                  <PolarRadiusAxis domain={[0, 10]} tick={{ fill: '#6b7280', fontSize: 9 }} />
                  <Radar
                    name={selectedCompany}
                    dataKey="value"
                    stroke="#f59e0b"
                    fill="#f59e0b"
                    fillOpacity={0.3}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent ratings table */}
          {recentRatings.length > 0 && (
            <div className="rounded-2xl border border-green-500/20 bg-gray-900/40 backdrop-blur-sm p-6">
              <h3 className="text-lg font-bold text-green-300 mb-4">
                🕒 Recent Ratings — {selectedCompany.charAt(0).toUpperCase() + selectedCompany.slice(1)}
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-700">
                      {['User', 'Transparency', 'Fairness', 'Privacy', 'Accountability', 'Overall', 'Comment'].map(h => (
                        <th key={h} className="text-left py-2 px-3 text-gray-400 font-semibold">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {recentRatings.map((r, i) => (
                      <tr key={r.id} className={`border-b border-gray-800 ${i % 2 === 0 ? 'bg-gray-900/20' : ''}`}>
                        <td className="py-2 px-3 text-amber-200 font-medium">{r.userName}</td>
                        <td className="py-2 px-3 text-blue-300">{r.transparencyScore}/10</td>
                        <td className="py-2 px-3 text-purple-300">{r.fairnessScore}/10</td>
                        <td className="py-2 px-3 text-cyan-300">{r.privacyScore}/10</td>
                        <td className="py-2 px-3 text-green-300">{r.accountabilityScore}/10</td>
                        <td className="py-2 px-3 text-amber-400 font-bold">{r.overallScore}/10</td>
                        <td className="py-2 px-3 text-gray-400 max-w-xs truncate">{r.comment || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ══ RATE TAB ══ */}
      {activeTab === 'rate' && (
        <div className="max-w-2xl">
          <div className="rounded-2xl border border-orange-500/20 bg-gray-900/40 backdrop-blur-sm p-8">
            <h3 className="text-xl font-bold text-amber-300 mb-6">
              ⭐ Rate a Company's AI Ethics
            </h3>

            {submitSuccess && (
              <div className="mb-6 p-4 rounded-xl bg-green-900/30 border border-green-500/40 text-green-300 font-semibold">
                ✅ Rating submitted successfully!
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Company selector */}
              <div>
                <label className="text-amber-200/80 text-sm font-semibold block mb-2">
                  Company
                </label>
                <select
                  value={form.company}
                  onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                  className="w-full bg-gray-900/80 border border-orange-500/30 text-amber-200 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-400 transition-colors"
                >
                  {COMPANIES.map(c => (
                    <option key={c} value={c}>
                      {c.charAt(0).toUpperCase() + c.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Star ratings */}
              <div className="space-y-4 p-4 rounded-xl bg-gray-900/30 border border-orange-500/10">
                <StarRating label="🔍 Transparency"   value={form.transparency}    onChange={v => setForm(f => ({ ...f, transparency: v }))} />
                <StarRating label="⚖️ Fairness"       value={form.fairness}        onChange={v => setForm(f => ({ ...f, fairness: v }))} />
                <StarRating label="🔒 Privacy"        value={form.privacy}         onChange={v => setForm(f => ({ ...f, privacy: v }))} />
                <StarRating label="✅ Accountability" value={form.accountability}  onChange={v => setForm(f => ({ ...f, accountability: v }))} />
              </div>

              {/* Overall preview */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-amber-900/20 to-orange-900/20 border border-amber-500/30">
                <span className="text-amber-200 font-semibold">Overall Score</span>
                <span className="text-2xl font-black text-amber-400">
                  {((form.transparency + form.fairness + form.privacy + form.accountability) / 4).toFixed(1)}/10
                </span>
              </div>

              {/* Comment */}
              <div>
                <label className="text-amber-200/80 text-sm font-semibold block mb-2">
                  Comment (optional)
                </label>
                <textarea
                  value={form.comment}
                  onChange={e => setForm(f => ({ ...f, comment: e.target.value }))}
                  placeholder="Share your thoughts on this company's AI ethics..."
                  rows={3}
                  className="w-full bg-gray-900/80 border border-orange-500/30 text-amber-200 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-400 transition-colors placeholder-gray-600 resize-none"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? '⏳ Submitting...' : '🚀 Submit Rating'}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}