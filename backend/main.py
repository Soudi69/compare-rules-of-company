from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from dotenv import load_dotenv
from services.llm_service import LLMService
from services.analysis_service import AnalysisService
from services.rating_services import RatingService
from services.ethics_service import EthicsDataService
from services.synthetic_data_service import SyntheticDataService

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
ethics_service = EthicsDataService()
synthetic_data_service = SyntheticDataService()

# Models
class AnalyzeRequest(BaseModel):
    company_name: str

class ChatRequest(BaseModel):
    message: str
    context: str = ""  # Optional context about current analysis

class ChatResponse(BaseModel):
    response: str
    message: str

# Routes
@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "ok", "message": "AI Rules Analyzer is running"}

@app.post("/chat")
async def chat(request: ChatRequest):
    """
    Chat with the LLM about AI ethics and policies
    
    Args:
        request: ChatRequest containing user message and optional context
        
    Returns:
        ChatResponse with LLM response
    """
    try:
        if not request.message or not request.message.strip():
            raise HTTPException(status_code=400, detail="Message is required")
        
        # Build the prompt with context if provided
        prompt = request.message
        if request.context:
            prompt = f"Context: {request.context}\n\nUser Query: {request.message}"
        
        # Generate response from LLM
        response = llm_service.generate(prompt, max_tokens=1000)
        
        return ChatResponse(
            response=response,
            message=request.message
        )
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error processing chat: {str(e)}"
        )

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

# ── Ethics Timeline Routes ──────────────────────────────────────────

@app.get("/ethics/companies")
async def get_ethics_companies():
    """Get list of all available companies with ethics data"""
    try:
        companies = ethics_service.get_companies()
        return {
            "companies": companies,
            "total": len(companies)
        }
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error fetching companies: {str(e)}"
        )

@app.get("/ethics/timeline/{company_name}")
async def get_ethics_timeline(company_name: str):
    """Get ethics timeline data for a specific company"""
    try:
        if not company_name or not company_name.strip():
            raise HTTPException(status_code=400, detail="Company name is required")
        
        timeline_data = ethics_service.get_timeline_data(company_name)
        
        if not timeline_data.get('timeline'):
            raise HTTPException(
                status_code=404,
                detail=f"No ethics data found for {company_name}"
            )
        
        return timeline_data
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error fetching ethics timeline: {str(e)}"
        )

# ── Synthetic Data Routes (User Ratings & Aggregates) ───────────────

@app.get("/synthetic/users")
async def get_all_users():
    """Get all synthetic users"""
    try:
        users = synthetic_data_service.get_all_users()
        return {
            "users": users,
            "total": len(users)
        }
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error fetching users: {str(e)}"
        )

@app.get("/synthetic/users/{user_id}")
async def get_user(user_id: str):
    """Get a specific user by ID"""
    try:
        user = synthetic_data_service.get_user_by_id(user_id)
        if not user:
            raise HTTPException(
                status_code=404,
                detail=f"User {user_id} not found"
            )
        return user
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error fetching user: {str(e)}"
        )

@app.get("/synthetic/companies/aggregates")
async def get_all_company_aggregates():
    """Get aggregated scores for all companies"""
    try:
        aggregates = synthetic_data_service.get_all_companies_aggregates()
        return {
            "aggregates": aggregates,
            "total_companies": len(aggregates)
        }
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error fetching aggregates: {str(e)}"
        )

@app.get("/synthetic/companies/{company_name}/aggregates")
async def get_company_aggregates(company_name: str):
    """Get aggregated scores for a specific company"""
    try:
        if not company_name or not company_name.strip():
            raise HTTPException(status_code=400, detail="Company name is required")
        
        aggregates = synthetic_data_service.get_company_aggregated_scores(company_name)
        return aggregates
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error fetching company aggregates: {str(e)}"
        )

@app.get("/synthetic/companies/{company_name}/details")
async def get_company_rating_details(company_name: str):
    """Get detailed rating information for a company"""
    try:
        if not company_name or not company_name.strip():
            raise HTTPException(status_code=400, detail="Company name is required")
        
        details = synthetic_data_service.get_company_rating_details(company_name)
        return details
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error fetching company details: {str(e)}"
        )

@app.get("/synthetic/users/{user_id}/ratings")
async def get_user_ratings(user_id: str):
    """Get all ratings submitted by a specific user"""
    try:
        if not user_id or not user_id.strip():
            raise HTTPException(status_code=400, detail="User ID is required")
        
        ratings = synthetic_data_service.get_user_ratings(user_id)
        return {
            "user_id": user_id,
            "ratings": ratings,
            "total": len(ratings)
        }
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error fetching user ratings: {str(e)}"
        )

class AddRatingRequest(BaseModel):
    user_id: str
    company_name: str
    ethics_score: int
    privacy_score: int
    fairness_score: int
    transparency_score: int
    comment: str = ""

@app.post("/synthetic/ratings")
async def add_user_rating(request: AddRatingRequest):
    """Add a new rating from a user for a company"""
    try:
        # Validate scores
        for score in [request.ethics_score, request.privacy_score, 
                     request.fairness_score, request.transparency_score]:
            if not (1 <= score <= 10):
                raise HTTPException(
                    status_code=400,
                    detail="All scores must be between 1 and 10"
                )
        
        rating = synthetic_data_service.add_user_rating(
            user_id=request.user_id,
            company_name=request.company_name,
            ethics_score=request.ethics_score,
            privacy_score=request.privacy_score,
            fairness_score=request.fairness_score,
            transparency_score=request.transparency_score,
            comment=request.comment
        )
        
        # Return the new rating along with updated aggregates
        aggregates = synthetic_data_service.get_company_aggregated_scores(request.company_name)
        
        return {
            "rating": rating,
            "updated_aggregates": aggregates
        }
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error adding rating: {str(e)}"
        )
    
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
