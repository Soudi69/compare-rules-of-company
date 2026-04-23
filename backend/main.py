from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import os
from dotenv import load_dotenv
from services.llm_service import LLMService
from services.analysis_service import AnalysisService
from services.baseline_service import BaselineService
from services.session_service import SessionService
from models.session import SessionCreateRequest, SessionUpdateRequest

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
baseline_service = BaselineService()
session_service = SessionService()

class AnalyzeRequest(BaseModel):
    company_name: str

class CompareRequest(BaseModel):
    company_a: str
    company_b: str

# ──────────────────────────────────────────────────────────
# Original Routes
# ──────────────────────────────────────────────────────────
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
            "analyze": "/analyze (POST)",
            "compare": "/compare (POST)",
            "companies": "/companies (GET)",
            "sessions": "/sessions (GET/POST)",
            "session_detail": "/sessions/{session_id} (GET/PUT/DELETE)",
        }
    }

<<<<<<< HEAD
# ──────────────────────────────────────────────────────────
# Person 4: Baseline Comparison Routes
# ──────────────────────────────────────────────────────────

@app.post("/compare")
async def compare_companies(request: CompareRequest):
    """
    Compare two companies using the baseline method.
    
    Performs keyword-coverage analysis across 6 AI ethics categories
    and returns a structured side-by-side comparison.
    
    Args:
        request: CompareRequest with company_a and company_b names
        
    Returns:
        ComparisonResult with category scores, winner, strengths/weaknesses
    """
    try:
        if not request.company_a or not request.company_a.strip():
            raise HTTPException(status_code=400, detail="company_a is required")
        if not request.company_b or not request.company_b.strip():
            raise HTTPException(status_code=400, detail="company_b is required")
        if request.company_a.strip().lower() == request.company_b.strip().lower():
            raise HTTPException(status_code=400, detail="Please select two different companies")

        result = baseline_service.compare(request.company_a, request.company_b)
        return result

    except HTTPException as e:
        raise e
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error comparing companies: {str(e)}"
        )

@app.get("/companies")
async def list_companies():
    """
    List all available companies for comparison.
    
    Returns:
        List of company names
    """
    from services.data_service import DataService
    ds = DataService()
    companies = ds.get_all_companies()
    return {"companies": companies, "total": len(companies)}

# ──────────────────────────────────────────────────────────
# Person 4: Session Management Routes
# ──────────────────────────────────────────────────────────

@app.post("/sessions")
async def create_session(request: SessionCreateRequest = None):
    """
    Create a new session.
    
    Returns:
        Newly created session object
    """
    user_id = request.user_id if request else None
    session = session_service.create_session(user_id=user_id)
    return session

@app.get("/sessions")
async def list_sessions():
    """
    List all sessions.
    
    Returns:
        List of all session objects
    """
    sessions = session_service.list_sessions()
    return {"sessions": sessions, "total": len(sessions)}

@app.get("/sessions/{session_id}")
async def get_session(session_id: str):
    """
    Get a specific session by ID.
    
    Args:
        session_id: UUID of the session
        
    Returns:
        Session object with comparison history
    """
    session = session_service.get_session(session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    return session

@app.put("/sessions/{session_id}")
async def update_session(session_id: str, request: SessionUpdateRequest):
    """
    Add a comparison entry to a session.
    
    Args:
        session_id: UUID of the session
        request: Comparison details to add
        
    Returns:
        Updated session object
    """
    session = session_service.add_comparison(
        session_id=session_id,
        company_a=request.company_a,
        company_b=request.company_b,
        winner=request.winner,
        summary=request.summary,
    )
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    return session

@app.delete("/sessions/{session_id}")
async def delete_session(session_id: str):
    """
    Delete a session.
    
    Args:
        session_id: UUID of the session
        
    Returns:
        Success message
    """
    deleted = session_service.delete_session(session_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Session not found")
    return {"status": "deleted", "session_id": session_id}

@app.post("/sessions/{session_id}/reset")
async def reset_session(session_id: str):
    """
    Reset a session (clear comparisons but keep session alive).
    
    Args:
        session_id: UUID of the session
        
    Returns:
        Reset session object
    """
    session = session_service.reset_session(session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    return session
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
