import csv
import json
import os
import uuid
from datetime import datetime
from typing import Dict, List, Optional, Any

class RatingService:
    """Service for managing company ethics ratings"""
    
    RATINGS_FILE = "ratings_db.json"
    RATINGS_CSV = os.path.join(os.path.dirname(__file__), '..', '..', 'data', 'ratings.csv')
    
    def __init__(self):
        self._ensure_db_exists()
    
    def _ensure_db_exists(self):
        """Create ratings storage if it doesn't exist"""
        # Ensure data directory exists
        os.makedirs(os.path.dirname(self.RATINGS_CSV), exist_ok=True)

        # Create CSV with header if missing
        if not os.path.exists(self.RATINGS_CSV):
            with open(self.RATINGS_CSV, 'w', newline='') as f:
                writer = csv.writer(f)
                writer.writerow([
                    'id', 'companyName', 'userId', 'userName',
                    'transparencyScore', 'fairnessScore', 'privacyScore',
                    'accountabilityScore', 'overallScore', 'comment', 'createdAt'
                ])

        # If legacy JSON exists and CSV is empty, migrate
        if os.path.exists(self.RATINGS_FILE):
            try:
                with open(self.RATINGS_CSV, 'r', newline='') as f:
                    has_rows = sum(1 for _ in f) > 1
                if not has_rows:
                    legacy = self._load_ratings_json()
                    if legacy:
                        self._save_ratings_csv(legacy, append=False)
            except Exception:
                pass
    
    def _load_ratings_json(self) -> List[Dict]:
        """Load all ratings from legacy JSON file"""
        try:
            with open(self.RATINGS_FILE, 'r') as f:
                return json.load(f)
        except (json.JSONDecodeError, FileNotFoundError):
            return []

    def _load_ratings(self) -> List[Dict]:
        """Load all ratings from CSV"""
        ratings: List[Dict] = []
        if not os.path.exists(self.RATINGS_CSV):
            return ratings
        try:
            with open(self.RATINGS_CSV, 'r', newline='') as f:
                reader = csv.DictReader(f)
                for row in reader:
                    if not row.get('id'):
                        continue
                    ratings.append({
                        "id": row.get("id"),
                        "companyName": row.get("companyName", "").lower().strip(),
                        "userId": row.get("userId", ""),
                        "userName": row.get("userName", ""),
                        "transparencyScore": float(row.get("transparencyScore", 0)),
                        "fairnessScore": float(row.get("fairnessScore", 0)),
                        "privacyScore": float(row.get("privacyScore", 0)),
                        "accountabilityScore": float(row.get("accountabilityScore", 0)),
                        "overallScore": float(row.get("overallScore", 0)),
                        "comment": row.get("comment", ""),
                        "createdAt": row.get("createdAt", ""),
                    })
        except Exception:
            return []
        return ratings
    
    def _save_ratings_csv(self, ratings: List[Dict], append: bool = False):
        """Save ratings to CSV"""
        mode = 'a' if append else 'w'
        with open(self.RATINGS_CSV, mode, newline='') as f:
            writer = csv.writer(f)
            if not append:
                writer.writerow([
                    'id', 'companyName', 'userId', 'userName',
                    'transparencyScore', 'fairnessScore', 'privacyScore',
                    'accountabilityScore', 'overallScore', 'comment', 'createdAt'
                ])
            for r in ratings:
                writer.writerow([
                    r.get("id"),
                    r.get("companyName"),
                    r.get("userId"),
                    r.get("userName"),
                    r.get("transparencyScore"),
                    r.get("fairnessScore"),
                    r.get("privacyScore"),
                    r.get("accountabilityScore"),
                    r.get("overallScore"),
                    r.get("comment"),
                    r.get("createdAt"),
                ])
    
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

        self._save_ratings_csv([rating], append=True)

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

    def get_company_details(self, company_name: str) -> Dict[str, Any]:
        """Get company aggregates and rating details for the Quick Review view"""
        ratings = self.get_company_ratings(company_name)

        if not ratings:
            aggregates = {
                "company_name": company_name.title(),
                "total_ratings": 0,
                "avg_ethics_score": 0,
                "avg_privacy_score": 0,
                "avg_fairness_score": 0,
                "avg_transparency_score": 0,
                "avg_overall_score": 0,
                "rating_trend": "stable",
                "last_updated": ""
            }
            return {
                "aggregates": aggregates,
                "ratings": [],
                "rating_count": 0
            }

        total = len(ratings)
        avg_transparency = round(sum(r["transparencyScore"] for r in ratings) / total, 1)
        avg_fairness = round(sum(r["fairnessScore"] for r in ratings) / total, 1)
        avg_privacy = round(sum(r["privacyScore"] for r in ratings) / total, 1)
        avg_accountability = round(sum(r["accountabilityScore"] for r in ratings) / total, 1)
        avg_overall = round(sum(r["overallScore"] for r in ratings) / total, 1)
        avg_ethics = avg_overall

        # Trend: compare last 30 days vs previous 30 days (simple heuristic)
        def parse_dt(val: str):
            try:
                return datetime.fromisoformat(val)
            except Exception:
                return None

        now = datetime.now()
        recent = []
        previous = []
        for r in ratings:
            dt = parse_dt(r.get("createdAt", ""))
            if not dt:
                continue
            if (now - dt).days <= 30:
                recent.append(r)
            elif 30 < (now - dt).days <= 60:
                previous.append(r)

        rating_trend = "stable"
        if recent and previous:
            recent_avg = sum(r["overallScore"] for r in recent) / len(recent)
            prev_avg = sum(r["overallScore"] for r in previous) / len(previous)
            if recent_avg - prev_avg >= 0.2:
                rating_trend = "up"
            elif prev_avg - recent_avg >= 0.2:
                rating_trend = "down"

        last_updated = max((r.get("createdAt", "") for r in ratings), default="")

        aggregates = {
            "company_name": company_name.title(),
            "total_ratings": total,
            "avg_ethics_score": avg_ethics,
            "avg_privacy_score": avg_privacy,
            "avg_fairness_score": avg_fairness,
            "avg_transparency_score": avg_transparency,
            "avg_overall_score": avg_overall,
            "rating_trend": rating_trend,
            "last_updated": last_updated
        }

        return {
            "aggregates": aggregates,
            "ratings": ratings,
            "rating_count": total
        }
    
    def get_dashboard_summary(self) -> Dict[str, Any]:
        """Get full dashboard summary across all companies"""
        all_ratings = self._load_ratings()
        default_companies = ["openai", "google", "microsoft", "meta", "amazon", "ibm", "apple", "tesla", "gemini"]
        companies_from_ratings = sorted({r["companyName"] for r in all_ratings})
        companies = list(dict.fromkeys(default_companies + companies_from_ratings))
        
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