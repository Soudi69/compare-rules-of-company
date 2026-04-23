"""
Synthetic Data Service - Generate and manage user ratings with aggregated scores
"""
import json
import os
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Any
from dataclasses import dataclass, asdict
import random
from uuid import uuid4

@dataclass
class User:
    """User model"""
    user_id: str
    name: str
    email: str
    department: str
    expertise_level: str  # 'beginner', 'intermediate', 'expert'
    created_at: str

@dataclass
class UserRating:
    """Individual user rating for a company"""
    rating_id: str
    user_id: str
    company_name: str
    ethics_score: int  # 1-10
    privacy_score: int  # 1-10
    fairness_score: int  # 1-10
    transparency_score: int  # 1-10
    comment: str
    created_at: str

@dataclass
class AggregatedScore:
    """Aggregated score for a company across all users"""
    company_name: str
    total_ratings: int
    avg_ethics_score: float
    avg_privacy_score: float
    avg_fairness_score: float
    avg_transparency_score: float
    avg_overall_score: float
    rating_trend: str  # 'up', 'stable', 'down'
    last_updated: str


class SyntheticDataService:
    """Generate and manage synthetic user data and ratings"""
    
    USERS_FILE = "backend/data/synthetic_users.json"
    RATINGS_FILE = "backend/data/synthetic_ratings.json"
    
    # Companies list
    COMPANIES = ["Google", "Microsoft", "IBM", "Amazon", "Meta", "Apple", "Tesla"]
    
    # Departments
    DEPARTMENTS = [
        "Engineering",
        "Product Management",
        "Ethics & Compliance",
        "Research",
        "Legal",
        "Operations",
        "Data Science"
    ]
    
    # Expertise levels
    EXPERTISE_LEVELS = ["beginner", "intermediate", "expert"]
    
    # First names and last names for generating realistic user names
    FIRST_NAMES = [
        "John", "Jane", "Michael", "Sarah", "David", "Emma", "James",
        "Lisa", "Robert", "Maria", "William", "Jennifer", "Richard",
        "Patricia", "Thomas", "Linda", "Charles", "Barbara", "Daniel", "Nancy"
    ]
    
    LAST_NAMES = [
        "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller",
        "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez",
        "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin"
    ]
    
    def __init__(self):
        """Initialize the service"""
        self._ensure_data_files_exist()
    
    def _ensure_data_files_exist(self):
        """Ensure data directories and files exist"""
        os.makedirs("backend/data", exist_ok=True)
        
        if not os.path.exists(self.USERS_FILE):
            # Generate synthetic users
            users = self._generate_synthetic_users(50)
            self._save_users(users)
        
        if not os.path.exists(self.RATINGS_FILE):
            # Generate synthetic ratings
            users = self._load_users()
            ratings = self._generate_synthetic_ratings(users, 5)  # 5 ratings per user
            self._save_ratings(ratings)
    
    def _generate_synthetic_users(self, count: int = 50) -> List[Dict]:
        """Generate synthetic users"""
        users = []
        for i in range(count):
            user = {
                "user_id": f"user_{str(uuid4())[:8]}",
                "name": f"{random.choice(self.FIRST_NAMES)} {random.choice(self.LAST_NAMES)}",
                "email": f"user{i+1}@company.com",
                "department": random.choice(self.DEPARTMENTS),
                "expertise_level": random.choice(self.EXPERTISE_LEVELS),
                "created_at": (datetime.now() - timedelta(days=random.randint(1, 365))).isoformat()
            }
            users.append(user)
        return users
    
    def _generate_synthetic_ratings(self, users: List[Dict], ratings_per_user: int = 5) -> List[Dict]:
        """Generate synthetic ratings for companies"""
        ratings = []
        
        for user in users:
            # Each user rates different companies
            rated_companies = random.sample(self.COMPANIES, k=random.randint(2, 5))
            
            for company in rated_companies:
                # Adjust scores based on company reputation (for realism)
                company_base_score = self._get_company_base_score(company)
                
                # Generate scores with some variance around base score
                rating = {
                    "rating_id": f"rating_{str(uuid4())[:8]}",
                    "user_id": user["user_id"],
                    "company_name": company,
                    "ethics_score": self._generate_score(company_base_score, variance=1.5),
                    "privacy_score": self._generate_score(company_base_score, variance=1.5),
                    "fairness_score": self._generate_score(company_base_score, variance=1.5),
                    "transparency_score": self._generate_score(company_base_score, variance=1.5),
                    "comment": random.choice([
                        "Good policies overall",
                        "Needs improvement in transparency",
                        "Strong ethics framework",
                        "Could be better on privacy",
                        "Excellent fairness guidelines",
                        "Average performance",
                        "Outstanding commitment",
                        "Room for growth",
                        "Solid foundation",
                        "Leading in the industry"
                    ]),
                    "created_at": (datetime.now() - timedelta(days=random.randint(1, 180))).isoformat()
                }
                ratings.append(rating)
        
        return ratings
    
    def _get_company_base_score(self, company: str) -> float:
        """Get base score for a company (for realistic variance)"""
        base_scores = {
            "Google": 7.5,
            "Microsoft": 7.2,
            "IBM": 6.8,
            "Amazon": 6.5,
            "Meta": 6.2,
            "Apple": 7.0,
            "Tesla": 6.0
        }
        return base_scores.get(company, 6.5)
    
    def _generate_score(self, base_score: float, variance: float = 1.5) -> int:
        """Generate a score with variance around base score"""
        score = base_score + random.gauss(0, variance)
        return max(1, min(10, int(round(score))))
    
    def _load_users(self) -> List[Dict]:
        """Load users from file"""
        try:
            with open(self.USERS_FILE, 'r') as f:
                return json.load(f)
        except (json.JSONDecodeError, FileNotFoundError):
            return []
    
    def _save_users(self, users: List[Dict]):
        """Save users to file"""
        with open(self.USERS_FILE, 'w') as f:
            json.dump(users, f, indent=2)
    
    def _load_ratings(self) -> List[Dict]:
        """Load ratings from file"""
        try:
            with open(self.RATINGS_FILE, 'r') as f:
                return json.load(f)
        except (json.JSONDecodeError, FileNotFoundError):
            return []
    
    def _save_ratings(self, ratings: List[Dict]):
        """Save ratings to file"""
        with open(self.RATINGS_FILE, 'w') as f:
            json.dump(ratings, f, indent=2)
    
    def get_all_users(self) -> List[Dict]:
        """Get all users"""
        return self._load_users()
    
    def get_user_by_id(self, user_id: str) -> Optional[Dict]:
        """Get user by ID"""
        users = self._load_users()
        return next((u for u in users if u["user_id"] == user_id), None)
    
    def get_user_ratings(self, user_id: str) -> List[Dict]:
        """Get all ratings by a specific user"""
        ratings = self._load_ratings()
        return [r for r in ratings if r["user_id"] == user_id]
    
    def add_user_rating(
        self,
        user_id: str,
        company_name: str,
        ethics_score: int,
        privacy_score: int,
        fairness_score: int,
        transparency_score: int,
        comment: str = ""
    ) -> Dict:
        """Add a new user rating"""
        # Validate scores
        for score in [ethics_score, privacy_score, fairness_score, transparency_score]:
            if not (1 <= score <= 10):
                raise ValueError("Scores must be between 1 and 10")
        
        # Verify user exists
        if not self.get_user_by_id(user_id):
            raise ValueError(f"User {user_id} not found")
        
        rating = {
            "rating_id": f"rating_{str(uuid4())[:8]}",
            "user_id": user_id,
            "company_name": company_name,
            "ethics_score": ethics_score,
            "privacy_score": privacy_score,
            "fairness_score": fairness_score,
            "transparency_score": transparency_score,
            "comment": comment,
            "created_at": datetime.now().isoformat()
        }
        
        ratings = self._load_ratings()
        ratings.append(rating)
        self._save_ratings(ratings)
        
        return rating
    
    def get_company_aggregated_scores(self, company_name: str) -> Dict:
        """Get aggregated scores for a company across all users"""
        ratings = self._load_ratings()
        company_ratings = [r for r in ratings if r["company_name"] == company_name]
        
        if not company_ratings:
            return {
                "company_name": company_name,
                "total_ratings": 0,
                "avg_ethics_score": 0,
                "avg_privacy_score": 0,
                "avg_fairness_score": 0,
                "avg_transparency_score": 0,
                "avg_overall_score": 0,
                "rating_trend": "stable",
                "last_updated": datetime.now().isoformat()
            }
        
        total = len(company_ratings)
        avg_ethics = sum(r["ethics_score"] for r in company_ratings) / total
        avg_privacy = sum(r["privacy_score"] for r in company_ratings) / total
        avg_fairness = sum(r["fairness_score"] for r in company_ratings) / total
        avg_transparency = sum(r["transparency_score"] for r in company_ratings) / total
        avg_overall = (avg_ethics + avg_privacy + avg_fairness + avg_transparency) / 4
        
        # Calculate trend (compare recent vs older ratings)
        recent = company_ratings[-5:] if len(company_ratings) > 5 else company_ratings
        older = company_ratings[:-5] if len(company_ratings) > 5 else []
        
        trend = "stable"
        if older:
            recent_avg = sum(r["ethics_score"] + r["privacy_score"] + 
                           r["fairness_score"] + r["transparency_score"] for r in recent) / (len(recent) * 4)
            older_avg = sum(r["ethics_score"] + r["privacy_score"] + 
                          r["fairness_score"] + r["transparency_score"] for r in older) / (len(older) * 4)
            if recent_avg > older_avg + 0.5:
                trend = "up"
            elif recent_avg < older_avg - 0.5:
                trend = "down"
        
        return {
            "company_name": company_name,
            "total_ratings": total,
            "avg_ethics_score": round(avg_ethics, 1),
            "avg_privacy_score": round(avg_privacy, 1),
            "avg_fairness_score": round(avg_fairness, 1),
            "avg_transparency_score": round(avg_transparency, 1),
            "avg_overall_score": round(avg_overall, 1),
            "rating_trend": trend,
            "last_updated": datetime.now().isoformat()
        }
    
    def get_all_companies_aggregates(self) -> List[Dict]:
        """Get aggregated scores for all companies"""
        return [
            self.get_company_aggregated_scores(company)
            for company in self.COMPANIES
        ]
    
    def get_company_rating_details(self, company_name: str) -> Dict:
        """Get detailed rating information for a company"""
        ratings = self._load_ratings()
        company_ratings = [r for r in ratings if r["company_name"] == company_name]
        users = {u["user_id"]: u for u in self._load_users()}
        
        detailed_ratings = []
        for rating in company_ratings:
            user = users.get(rating["user_id"], {})
            detailed_ratings.append({
                **rating,
                "user_name": user.get("name", "Unknown"),
                "user_department": user.get("department", "Unknown"),
                "user_expertise": user.get("expertise_level", "unknown")
            })
        
        aggregates = self.get_company_aggregated_scores(company_name)
        
        return {
            "aggregates": aggregates,
            "ratings": detailed_ratings,
            "rating_count": len(detailed_ratings)
        }
    
    def regenerate_all_data(self):
        """Regenerate all synthetic data (useful for testing)"""
        users = self._generate_synthetic_users(50)
        self._save_users(users)
        
        ratings = self._generate_synthetic_ratings(users, 5)
        self._save_ratings(ratings)
