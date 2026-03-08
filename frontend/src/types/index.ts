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
