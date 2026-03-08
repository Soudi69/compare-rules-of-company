import json
import re
from typing import Any, Dict, List
from models.analysis import (
    AnalysisResult,
    RedFlag,
    TimelineChange,
    Recommendation
)
from services.llm_service import LLMService
from services.data_service import DataService

class AnalysisService:
    """Service for analyzing company AI ethical guidelines"""
    
    def __init__(self, llm_service: LLMService):
        self.llm_service = llm_service
        self.data_service = DataService()
    
    def analyze(self, company_name: str) -> AnalysisResult:
        """
        Analyze company AI ethical guidelines
        
        Args:
            company_name: Name of the company to analyze
            
        Returns:
            AnalysisResult with detailed analysis
        """
        # Get company data
        company_data = self.data_service.get_company_guidelines(company_name)
        
        if not company_data:
            raise ValueError(f"No guidelines found for company: {company_name}")
        
        # Prepare prompt for LLM
        prompt = self._prepare_analysis_prompt(company_name, company_data)
        
        # Get LLM analysis
        llm_response = self.llm_service.generate(prompt, max_tokens=3000)
        
        # Parse response
        parsed_response = self._parse_llm_response(llm_response)
        
        # Create result object
        result = AnalysisResult(
            companyName=company_name,
            overallSummary=parsed_response.get(
                "overallSummary",
                "Analysis of company AI ethical guidelines"
            ),
            keyPoints=parsed_response.get("keyPoints", []),
            redFlags=[
                RedFlag(**flag) for flag in parsed_response.get("redFlags", [])
            ],
            timelineChanges=[
                TimelineChange(**change) for change in parsed_response.get("timelineChanges", [])
            ],
            recommendations=[
                Recommendation(**rec) for rec in parsed_response.get("recommendations", [])
            ],
            complianceScore=parsed_response.get("complianceScore", 65)
        )
        
        return result
    
    def _prepare_analysis_prompt(self, company_name: str, company_data: Dict[str, Any]) -> str:
        """Prepare the analysis prompt for the LLM"""
        
        guidelines_text = ""
        timeline = ""
        
        if "guidelines" in company_data:
            guidelines_text = "\n".join([
                f"- {guideline}" for guideline in company_data["guidelines"]
            ])
        
        if "timeline" in company_data:
            timeline = "\n".join([
                f"  {year}: {change}" 
                for year, change in sorted(company_data["timeline"].items(), reverse=True)
            ])
        
        prompt = f"""
You are an expert AI ethics and compliance analyst. Analyze the following company's AI ethical guidelines and provide a comprehensive assessment.

COMPANY: {company_name}

CURRENT AI ETHICAL GUIDELINES:
{guidelines_text if guidelines_text else "No specific guidelines provided"}

HISTORICAL CHANGES:
{timeline if timeline else "No historical data available"}

Please provide a detailed JSON analysis with the following structure:
{{
  "overallSummary": "A 2-3 sentence summary of the company's AI ethics stance",
  "keyPoints": [
    "Key point 1",
    "Key point 2",
    "Key point 3"
  ],
  "redFlags": [
    {{
      "title": "Red flag title",
      "description": "Description of the red flag and why it matters",
      "severity": "high|medium|low",
      "year": 2024
    }}
  ],
  "timelineChanges": [
    {{
      "year": 2024,
      "change": "What changed",
      "impact": "Impact of the change"
    }}
  ],
  "recommendations": [
    {{
      "title": "Recommendation title",
      "description": "What needs to be done",
      "priority": "critical|important|standard"
    }}
  ],
  "complianceScore": 75
}}

IMPORTANT: 
- Be critical and thorough in identifying potential issues
- Consider gaps in policies and undefined areas
- Flag any vague or ambiguous language that could be problematic
- Assess the evolution of policies over time
- Consider industry best practices and benchmarks
- Return ONLY valid JSON, no additional text

Return only the JSON object, no markdown formatting or code blocks.
"""
        return prompt
    
    def _parse_llm_response(self, response: str) -> Dict[str, Any]:
        """Parse LLM response into structured data"""
        try:
            # Try to extract JSON from response
            json_match = re.search(r'\{.*\}', response, re.DOTALL)
            if json_match:
                json_str = json_match.group(0)
                data = json.loads(json_str)
                return data
            
            # If no JSON found, return default structure
            return self._get_default_response()
        
        except (json.JSONDecodeError, AttributeError) as e:
            print(f"Error parsing LLM response: {e}")
            return self._get_default_response()
    
    def _get_default_response(self) -> Dict[str, Any]:
        """Get default response structure"""
        return {
            "overallSummary": "Analysis completed with default structure",
            "keyPoints": [
                "No specific data analyzed",
                "Please ensure company data is available"
            ],
            "redFlags": [],
            "timelineChanges": [],
            "recommendations": [],
            "complianceScore": 50
        }
