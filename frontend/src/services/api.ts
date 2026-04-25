import axios from 'axios'
import type { AnalysisResult, Rating, DashboardSummary } from '../types'

const API_BASE_URL = 'http://localhost:8000'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 120000, // 2 minutes for LLM processing
  headers: {
    'Content-Type': 'application/json',
  }
})

export const analyzeCompanyRules = async (companyName: string): Promise<AnalysisResult> => {
  try {
    const response = await api.post<AnalysisResult>('/analyze', {
      company_name: companyName,
    })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.detail || error.message || 'Failed to analyze company')
    }
    throw error
  }
}

export const chatWithLLM = async (message: string, context?: string): Promise<string> => {
  try {
    const response = await api.post('/chat', {
      message,
      context: context || '',
    })
    return response.data.response
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.detail || error.message || 'Failed to get response from LLM')
    }
    throw error
  }
}

export const submitRating = async (rating: {
  company_name: string
  user_id: string
  user_name: string
  transparency_score: number
  fairness_score: number
  privacy_score: number
  accountability_score: number
  comment: string
}): Promise<Rating> => {
  try {
    const response = await api.post<Rating>('/ratings', rating)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.detail || 'Failed to submit rating')
    }
    throw error
  }
}

export const getCompanyRatings = async (companyName: string): Promise<Rating[]> => {
  try {
    const response = await api.get<Rating[]>(`/ratings/${companyName}`)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch ratings')
    }
    throw error
  }
}

export const getDashboardSummary = async (): Promise<DashboardSummary> => {
  try {
    const response = await api.get<DashboardSummary>('/ratings/analytics/summary')
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch dashboard')
    }
    throw error
  }
}

// ── Ethics Timeline APIs ────────────────────────────────────────────

export interface EthicsTimeline {
  company_name: string
  total_policies: number
  year_range: {
    start: number
    end: number
  }
  timeline: Array<{
    year: number
    policies: Array<{
      point: string
      category: string
      severity: 'low' | 'medium' | 'high'
      impact: string
    }>
  }>
}

export const getEthicsCompanies = async (): Promise<{companies: string[], total: number}> => {
  try {
    const response = await api.get<{companies: string[], total: number}>('/ethics/companies')
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch companies')
    }
    throw error
  }
}

export const getEthicsTimeline = async (companyName: string): Promise<EthicsTimeline> => {
  try {
    const response = await api.get<EthicsTimeline>(`/ethics/timeline/${companyName}`)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch ethics timeline')
    }
    throw error
  }
}

// ── Synthetic Data APIs (User Ratings & Aggregates) ─────────────────

export interface SyntheticUser {
  user_id: string
  name: string
  email: string
  department: string
  expertise_level: 'beginner' | 'intermediate' | 'expert'
  created_at: string
}

export interface CompanyAggregate {
  company_name: string
  total_ratings: number
  avg_ethics_score: number
  avg_privacy_score: number
  avg_fairness_score: number
  avg_transparency_score: number
  avg_overall_score: number
  rating_trend: 'up' | 'stable' | 'down'
  last_updated: string
}

export interface UserRating {
  rating_id: string
  user_id: string
  company_name: string
  ethics_score: number
  privacy_score: number
  fairness_score: number
  transparency_score: number
  comment: string
  created_at: string
}

export const getAllUsers = async (): Promise<{ users: SyntheticUser[], total: number }> => {
  try {
    const response = await api.get('/synthetic/users')
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch users')
    }
    throw error
  }
}

export const getUser = async (userId: string): Promise<SyntheticUser> => {
  try {
    const response = await api.get(`/synthetic/users/${userId}`)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch user')
    }
    throw error
  }
}

export const getAllCompanyAggregates = async (): Promise<{ aggregates: CompanyAggregate[], total_companies: number }> => {
  try {
    const response = await api.get('/synthetic/companies/aggregates')
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch aggregates')
    }
    throw error
  }
}

export const getCompanyAggregates = async (companyName: string): Promise<CompanyAggregate> => {
  try {
    const response = await api.get(`/synthetic/companies/${companyName}/aggregates`)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch company aggregates')
    }
    throw error
  }
}

export const getCompanyRatingDetails = async (companyName: string): Promise<{
  aggregates: {
    company_name: string
    total_ratings: number
    avg_ethics_score: number
    avg_privacy_score: number
    avg_fairness_score: number
    avg_transparency_score: number
    avg_overall_score: number
    rating_trend: 'up' | 'stable' | 'down'
    last_updated: string
  }
  ratings: Array<Rating>
  rating_count: number
}> => {
  try {
    const response = await api.get(`/ratings/company/${companyName}/details`)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch company details')
    }
    throw error
  }
}

export const getUserRatings = async (userId: string): Promise<{ user_id: string, ratings: UserRating[], total: number }> => {
  try {
    const response = await api.get(`/synthetic/users/${userId}/ratings`)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch user ratings')
    }
    throw error
  }
}

export const addUserRating = async (data: {
  user_id: string
  company_name: string
  ethics_score: number
  privacy_score: number
  fairness_score: number
  transparency_score: number
  comment?: string
}): Promise<{ rating: UserRating, updated_aggregates: CompanyAggregate }> => {
  try {
    const response = await api.post('/synthetic/ratings', data)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.detail || 'Failed to add rating')
    }
    throw error
  }
}

export default api
