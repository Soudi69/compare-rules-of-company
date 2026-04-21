import axios from 'axios'
import type { AnalysisResult } from '../types'

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

export default api
