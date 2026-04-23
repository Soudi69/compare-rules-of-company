import axios from 'axios'
import type { AnalysisResult, ComparisonResult, Session } from '../types'

const API_BASE_URL = 'http://localhost:8000'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 120000, // 2 minutes for LLM processing
  headers: {
    'Content-Type': 'application/json',
  }
})

// ──────────────────────────────────────────────────────────
// Original: Single-company analysis
// ──────────────────────────────────────────────────────────

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

// ──────────────────────────────────────────────────────────
// Person 4: Baseline Comparison
// ──────────────────────────────────────────────────────────

export const compareCompanies = async (
  companyA: string,
  companyB: string
): Promise<ComparisonResult> => {
  try {
    const response = await api.post<ComparisonResult>('/compare', {
      company_a: companyA,
      company_b: companyB,
    })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.detail || error.message || 'Failed to compare companies'
      )
    }
    throw error
  }
}

export const fetchCompanies = async (): Promise<string[]> => {
  try {
    const response = await api.get<{ companies: string[]; total: number }>('/companies')
    return response.data.companies
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch companies')
    }
    throw error
  }
}

// ──────────────────────────────────────────────────────────
// Person 4: Session Management
// ──────────────────────────────────────────────────────────

export const createSession = async (userId?: string): Promise<Session> => {
  const response = await api.post<Session>('/sessions', { user_id: userId || null })
  return response.data
}

export const getSession = async (sessionId: string): Promise<Session> => {
  const response = await api.get<Session>(`/sessions/${sessionId}`)
  return response.data
}

export const addComparisonToSession = async (
  sessionId: string,
  companyA: string,
  companyB: string,
  winner: string,
  summary: string
): Promise<Session> => {
  const response = await api.put<Session>(`/sessions/${sessionId}`, {
    company_a: companyA,
    company_b: companyB,
    winner,
    summary,
  })
  return response.data
}

export const deleteSession = async (sessionId: string): Promise<void> => {
  await api.delete(`/sessions/${sessionId}`)
}

export const resetSession = async (sessionId: string): Promise<Session> => {
  const response = await api.post<Session>(`/sessions/${sessionId}/reset`)
  return response.data
}

export default api
