export interface AnalysisResult {
  companyName: string
  overallSummary: string
  keyPoints: string[]
  redFlags: RedFlag[]
  timelineChanges: TimelineChange[]
  recommendations: Recommendation[]
  complianceScore: number
}

export interface RedFlag {
  title: string
  description: string
  severity: 'high' | 'medium' | 'low'
  year?: number
}

export interface TimelineChange {
  year: number
  change: string
  impact: string
}

export interface Recommendation {
  title: string
  description: string
  priority: 'critical' | 'important' | 'standard'
}

export interface User {
  id: string
  email: string
  name: string
  token: string
}

export interface Company {
  id: string
  name: string
  ticker?: string
  industry: string
  founded: number
  logo?: string
  description: string
}

export interface CompanyPolicy {
  id: string
  companyId: string
  year: number
  title: string
  summary: string
  keyPoints: string[]
  complianceScore: number
  lastUpdated: string
}

// ──────────────────────────────────────────────────────────
// Person 4: Comparison types
// ──────────────────────────────────────────────────────────

export interface CategoryComparison {
  category: string
  company_a_score: number
  company_b_score: number
  winner: 'company_a' | 'company_b' | 'tie'
  difference: number
  insight: string
}

export interface ComparisonResult {
  company_a: string
  company_b: string
  company_a_compliance: number
  company_b_compliance: number
  overall_winner: 'company_a' | 'company_b' | 'tie'
  category_comparisons: CategoryComparison[]
  company_a_strengths: string[]
  company_b_strengths: string[]
  company_a_weaknesses: string[]
  company_b_weaknesses: string[]
  shared_topics: string[]
  unique_to_a: string[]
  unique_to_b: string[]
  summary: string
  recommendation: string
}

// ──────────────────────────────────────────────────────────
// Person 4: Session types
// ──────────────────────────────────────────────────────────

export interface ComparisonEntry {
  id: string
  company_a: string
  company_b: string
  winner: string
  summary: string
  timestamp: string
}

export interface Session {
  id: string
  user_id?: string
  created_at: string
  updated_at: string
  comparisons: ComparisonEntry[]
  is_active: boolean
}
