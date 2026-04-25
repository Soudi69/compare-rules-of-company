from typing import Dict, Any, Optional, List
from services.ethics_service import EthicsDataService

class DataService:
    """Service for fetching company AI guidelines data"""
    
    def __init__(self):
        self.ethics_service = EthicsDataService()
        
    # Hardcoded company guidelines database (fallback or legacy)
    COMPANY_GUIDELINES = {
        "openai": {
            "guidelines": [
                "Commit to building AI systems that are safe and beneficial",
                "Transparency about AI capabilities and limitations",
                "Regular auditing and testing for bias and safety",
                "Responsible disclosure of security vulnerabilities",
                "Fair access and pricing for API services",
                "Research on interpretability and alignment",
                "Compliance with data privacy regulations"
            ],
            "timeline": {
                "2023": "Updated safety guidelines after GPT-4 release",
                "2022": "Introduced usage policies for content generation",
                "2021": "Released API usage guidelines and best practices",
                "2020": "First iteration of ethical AI principles"
            }
        }
    }
    
    def get_company_guidelines(self, company_name: str) -> Optional[Dict[str, Any]]:
        """
        Get guidelines for a company. First checks hardcoded data, then CSV data.
        
        Args:
            company_name: Name of the company
            
        Returns:
            Dictionary with guidelines or None if not found
        """
        normalized_name = company_name.lower().strip()
        
        # Check hardcoded data first
        data = self.COMPANY_GUIDELINES.get(normalized_name)
        if data:
            return data
            
        # If not found, try EthicsDataService (CSV)
        policies = self.ethics_service.load_company_policies(company_name)
        
        # Also check for Gemini specifically if requested
        if not policies and normalized_name == 'gemini':
            timeline = self.ethics_service.get_gemini_timeline()
            # Convert timeline to guidelines-like structure
            all_policies = []
            for entry in timeline.get('timeline', []):
                for p in entry.get('policies', []):
                    all_policies.append(p['point'])
            
            if all_policies:
                return {
                    "guidelines": list(set(all_policies)),
                    "timeline": {str(entry['year']): "Updated ethics focus" for entry in timeline.get('timeline', [])}
                }

        if policies:
            # Convert CSV policies to the expected dictionary format
            guidelines = [p['policy_point'] for p in policies if p.get('policy_point')]
            
            # Group timeline points by year
            timeline = {}
            for p in policies:
                year = str(p.get('year', 'Unknown'))
                if year != '0' and year != 'Unknown':
                    point = p.get('policy_point', 'Policy update')
                    if year not in timeline:
                        timeline[year] = point
                    else:
                        # Append if multiple points in same year
                        if len(timeline[year]) < 100: # limit length
                             timeline[year] += f"; {point}"

            return {
                "guidelines": guidelines,
                "timeline": timeline
            }
            
        return None
    
    def get_all_companies(self) -> List[str]:
        """Get list of all available companies from both sources"""
        hardcoded = list(self.COMPANY_GUIDELINES.keys())
        csv_based = self.ethics_service.get_companies()
        return sorted(list(set(hardcoded + [c.lower() for c in csv_based])))
