from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from dotenv import load_dotenv
from services.llm_service import LLMService
from services.analysis_service import AnalysisService
from services.rating_services import RatingService

load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title="Apte - AI Principle Tracker Ethos",
    description="Analyze corporate AI ethics policies across sectors using advanced NLP and governance analysis",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize services
llm_service = LLMService()
analysis_service = AnalysisService(llm_service)
rating_service = RatingService()

# Models
class AnalyzeRequest(BaseModel):
    company_name: str

# Routes
@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "ok", "message": "AI Rules Analyzer is running"}

@app.post("/analyze")
async def analyze_company(request: AnalyzeRequest):
    """
    Analyze company AI ethical guidelines
    
    Args:
        request: AnalyzeRequest containing company name
        
    Returns:
        Analysis result with insights, red flags, and recommendations
    """
    try:
        if not request.company_name or not request.company_name.strip():
            raise HTTPException(status_code=400, detail="Company name is required")
        
        # Perform analysis
        result = analysis_service.analyze(request.company_name)
        return result
    
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error analyzing company: {str(e)}"
        )

@app.get("/")
async def root():
    """Root endpoint with API information"""
    return {
        "name": "AI Rules Analyzer API",
        "version": "1.0.0",
        "endpoints": {
            "health": "/health",
            "analyze": "/analyze (POST)"
        }
    }

# ── Rating Models ──────────────────────────────────────────────────

class RatingRequest(BaseModel):
    company_name: str
    user_id: str
    user_name: str
    transparency_score: int
    fairness_score: int
    privacy_score: int
    accountability_score: int
    comment: str = ""

# ── Rating Routes ──────────────────────────────────────────────────

@app.post("/ratings")
async def submit_rating(request: RatingRequest):
    """Submit a rating for a company"""
    try:
        # Validate scores are between 1-10
        scores = [
            request.transparency_score,
            request.fairness_score,
            request.privacy_score,
            request.accountability_score
        ]
        for score in scores:
            if not 1 <= score <= 10:
                raise HTTPException(
                    status_code=400,
                    detail="All scores must be between 1 and 10"
                )
        
        result = rating_service.add_rating(
            company_name=request.company_name,
            user_id=request.user_id,
            user_name=request.user_name,
            transparency_score=request.transparency_score,
            fairness_score=request.fairness_score,
            privacy_score=request.privacy_score,
            accountability_score=request.accountability_score,
            comment=request.comment
        )
        return result
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error submitting rating: {str(e)}"
        )

@app.get("/ratings/{company_name}")
async def get_company_ratings(company_name: str):
    """Get all ratings for a company"""
    try:
        ratings = rating_service.get_company_ratings(company_name)
        return ratings
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error fetching ratings: {str(e)}"
        )

@app.get("/ratings/analytics/summary")
async def get_dashboard_summary():
    """Get full dashboard analytics summary"""
    try:
        summary = rating_service.get_dashboard_summary()
        return summary
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error fetching dashboard: {str(e)}"
        )
    
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
