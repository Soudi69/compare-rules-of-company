from pydantic import BaseModel
from typing import List, Literal

class RedFlag(BaseModel):
    title: str
    description: str
    severity: Literal["high", "medium", "low"]
    year: int = None

class TimelineChange(BaseModel):
    year: int
    change: str
    impact: str

class Recommendation(BaseModel):
    title: str
    description: str
    priority: Literal["critical", "important", "standard"]

class AnalysisResult(BaseModel):
    companyName: str
    overallSummary: str
    keyPoints: List[str]
    redFlags: List[RedFlag]
    timelineChanges: List[TimelineChange]
    recommendations: List[Recommendation]
    complianceScore: int
    
    class Config:
        schema_extra = {
            "example": {
                "companyName": "OpenAI",
                "overallSummary": "OpenAI demonstrates strong commitment to AI safety",
                "keyPoints": ["Research-focused approach", "Transparency in deployment"],
                "redFlags": [],
                "timelineChanges": [],
                "recommendations": [],
                "complianceScore": 85
            }
        }
