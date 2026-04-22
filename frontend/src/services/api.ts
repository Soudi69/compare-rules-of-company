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

export default api
