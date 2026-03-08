from typing import Dict, Any, Optional

class DataService:
    """Service for fetching company AI guidelines data"""
    
    # Company guidelines database
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
                "2023": "Published framework for responsible AGI deployment",
                "2022": "Introduced usage policies for content generation",
                "2021": "Released API usage guidelines and best practices",
                "2020": "First iteration of ethical AI principles"
            }
        },
        "google": {
            "guidelines": [
                "AI Principles including fairness, interpretability, and accountability",
                "Prohibition of weaponization and high-risk applications",
                "Privacy-first approach to data processing",
                "Inclusive design considering diverse populations",
                "Regular third-party audits of AI systems",
                "Transparency reports on AI deployment",
                "Responsible innovation framework"
            ],
            "timeline": {
                "2023": "Updated AI Principles with stronger equity focus",
                "2022": "Expanded requirements for bias testing",
                "2021": "Established AI Ethics Board",
                "2020": "Published initial AI Principles framework",
                "2019": "First comprehensive AI Ethics guidelines"
            }
        },
        "microsoft": {
            "guidelines": [
                "Transparency about AI capabilities and use cases",
                "Accountability through clear ownership and documentation",
                "Fairness and inclusion in AI system design",
                "Responsible innovation with stakeholder engagement",
                "Privacy and security by design",
                "Human oversight for critical decisions",
                "Regular impact assessments"
            ],
            "timeline": {
                "2023": "Enhanced guidelines for generative AI",
                "2022": "Added requirements for transparency reports",
                "2021": "Established AI Responsible Innovation Council",
                "2020": "First version of responsible AI guidelines",
                "2019": "Initial ethical considerations framework"
            }
        },
        "meta": {
            "guidelines": [
                "Responsible AI research and development",
                "Commitment to identifying and mitigating harms",
                "Transparency in AI systems",
                "Fair and inclusive AI design",
                "Privacy and data protection",
                "Community feedback mechanisms",
                "Ongoing research in AI safety"
            ],
            "timeline": {
                "2023": "Updated guidelines addressing metaverse AI",
                "2022": "Released AI Responsible Innovation Policy",
                "2021": "Established Meta AI Ethics Board",
                "2020": "Published responsible AI research agenda",
                "2019": "First formal AI ethics guidelines"
            }
        },
        "amazon": {
            "guidelines": [
                "Customer trust and transparency",
                "Responsible machine learning practices",
                "Bias detection and mitigation",
                "Clear use case guidelines for AWS AI services",
                "Data security and privacy compliance",
                "Customer control and explainability",
                "Regular auditing of AI systems"
            ],
            "timeline": {
                "2023": "Enhanced Rekognition fairness requirements",
                "2022": "Updated ML service guidelines",
                "2021": "AWS Responsible AI guidelines publication",
                "2020": "Released AI fairness principles",
                "2019": "Initial responsible AI framework"
            }
        }
    }
    
    def get_company_guidelines(self, company_name: str) -> Optional[Dict[str, Any]]:
        """
        Get guidelines for a company
        
        Args:
            company_name: Name of the company
            
        Returns:
            Dictionary with guidelines or None if not found
        """
        normalized_name = company_name.lower().strip()
        return self.COMPANY_GUIDELINES.get(normalized_name)
    
    def get_all_companies(self) -> list:
        """Get list of all available companies"""
        return list(self.COMPANY_GUIDELINES.keys())
