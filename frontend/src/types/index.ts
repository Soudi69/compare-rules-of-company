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

export interface Rating {
  id: string
  companyName: string
  userId: string
  userName: string
  transparencyScore: number
  fairnessScore: number
  privacyScore: number
  accountabilityScore: number
  overallScore: number
  comment: string
  createdAt: string
}

export interface RatingAnalytics {
  companyName: string
  averageTransparency: number
  averageFairness: number
  averagePrivacy: number
  averageAccountability: number
  averageOverall: number
  totalRatings: number
}

export interface DashboardSummary {
  totalCompaniesRated: number
  totalRatings: number
  averageEthicsScore: number
  mostRatedCompany: string
  highestScoringCompany: string
  analytics: RatingAnalytics[]
}