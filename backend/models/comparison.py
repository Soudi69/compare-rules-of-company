"""
Comparison models for Person 4 — Baseline comparison output.
"""
from pydantic import BaseModel
from typing import List, Optional, Literal


class CategoryComparison(BaseModel):
    """Comparison of a single category between two companies."""
    category: str
    company_a_score: float
    company_b_score: float
    winner: Literal["company_a", "company_b", "tie"]
    difference: float
    insight: str


class ComparisonResult(BaseModel):
    """Full side-by-side comparison of two companies."""
    company_a: str
    company_b: str
    company_a_compliance: int
    company_b_compliance: int
    overall_winner: Literal["company_a", "company_b", "tie"]
    category_comparisons: List[CategoryComparison]
    company_a_strengths: List[str]
    company_b_strengths: List[str]
    company_a_weaknesses: List[str]
    company_b_weaknesses: List[str]
    shared_topics: List[str]
    unique_to_a: List[str]
    unique_to_b: List[str]
    summary: str
    recommendation: str
