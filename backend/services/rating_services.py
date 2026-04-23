import json
import os
import uuid
from datetime import datetime
from typing import Dict, List, Optional, Any

class RatingService:
    """Service for managing company ethics ratings"""
    
    RATINGS_FILE = "ratings_db.json"
    
    def __init__(self):
        self._ensure_db_exists()
    
    def _ensure_db_exists(self):
        """Create ratings file if it doesn't exist"""
        if not os.path.exists(self.RATINGS_FILE):
            with open(self.RATINGS_FILE, 'w') as f:
                json.dump([], f)
    
    def _load_ratings(self) -> List[Dict]:
        """Load all ratings from file"""
        try:
            with open(self.RATINGS_FILE, 'r') as f:
                return json.load(f)
        except (json.JSONDecodeError, FileNotFoundError):
            return []
    
    def _save_ratings(self, ratings: List[Dict]):
        """Save ratings to file"""
        with open(self.RATINGS_FILE, 'w') as f:
            json.dump(ratings, f, indent=2)
    
    def add_rating(
        self,
        company_name: str,
        user_id: str,
        user_name: str,
        transparency_score: int,
        fairness_score: int,
        privacy_score: int,
        accountability_score: int,
        comment: str = ""
    ) -> Dict[str, Any]:
        """Add a new rating for a company"""
        
        # Calculate overall score
        overall_score = round(
            (transparency_score + fairness_score + 
             privacy_score + accountability_score) / 4, 1
        )
        
        rating = {
            "id": str(uuid.uuid4()),
            "companyName": company_name.lower().strip(),
            "userId": user_id,
            "userName": user_name,
            "transparencyScore": transparency_score,
            "fairnessScore": fairness_score,
            "privacyScore": privacy_score,
            "accountabilityScore": accountability_score,
            "overallScore": overall_score,
            "comment": comment,
            "createdAt": datetime.now().isoformat()
        }
        
        ratings = self._load_ratings()
        ratings.append(rating)
        self._save_ratings(ratings)
        
        return rating
    
    def get_company_ratings(self, company_name: str) -> List[Dict]:
        """Get all ratings for a specific company"""
        ratings = self._load_ratings()
        return [
            r for r in ratings 
            if r["companyName"] == company_name.lower().strip()
        ]
    
    def get_company_analytics(self, company_name: str) -> Dict[str, Any]:
        """Get analytics for a specific company"""
        ratings = self.get_company_ratings(company_name)
        
        if not ratings:
            return {
                "companyName": company_name,
                "averageTransparency": 0,
                "averageFairness": 0,
                "averagePrivacy": 0,
                "averageAccountability": 0,
                "averageOverall": 0,
                "totalRatings": 0
            }
        
        total = len(ratings)
        return {
            "companyName": company_name,
            "averageTransparency": round(
                sum(r["transparencyScore"] for r in ratings) / total, 1),
            "averageFairness": round(
                sum(r["fairnessScore"] for r in ratings) / total, 1),
            "averagePrivacy": round(
                sum(r["privacyScore"] for r in ratings) / total, 1),
            "averageAccountability": round(
                sum(r["accountabilityScore"] for r in ratings) / total, 1),
            "averageOverall": round(
                sum(r["overallScore"] for r in ratings) / total, 1),
            "totalRatings": total
        }
    
    def get_dashboard_summary(self) -> Dict[str, Any]:
        """Get full dashboard summary across all companies"""
        all_ratings = self._load_ratings()
        companies = ["openai", "google", "microsoft", "meta", "amazon"]
        
        analytics = [
            self.get_company_analytics(company) 
            for company in companies
        ]
        
        # Filter companies that have ratings
        rated = [a for a in analytics if a["totalRatings"] > 0]
        
        if not rated:
            return {
                "totalCompaniesRated": 0,
                "totalRatings": 0,
                "averageEthicsScore": 0,
                "mostRatedCompany": "N/A",
                "highestScoringCompany": "N/A",
                "analytics": analytics
            }
        
        most_rated = max(rated, key=lambda x: x["totalRatings"])
        highest_scoring = max(rated, key=lambda x: x["averageOverall"])
        avg_score = round(
            sum(a["averageOverall"] for a in rated) / len(rated), 1
        )
        
        return {
            "totalCompaniesRated": len(rated),
            "totalRatings": len(all_ratings),
            "averageEthicsScore": avg_score,
            "mostRatedCompany": most_rated["companyName"].title(),
            "highestScoringCompany": highest_scoring["companyName"].title(),
            "analytics": analytics
        }