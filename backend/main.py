from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from dotenv import load_dotenv
from services.llm_service import LLMService
from services.analysis_service import AnalysisService

load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title="AI Rules Analyzer",
    description="Analyze company AI ethical guidelines using Llama 2",
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

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
