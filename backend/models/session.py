"""
Session models for Person 4 — Session management.
"""
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime


class ComparisonEntry(BaseModel):
    """A single comparison stored in a session."""
    id: str
    company_a: str
    company_b: str
    winner: str
    summary: str
    timestamp: str


class Session(BaseModel):
    """A user session that tracks comparison history."""
    id: str
    user_id: Optional[str] = None
    created_at: str
    updated_at: str
    comparisons: List[ComparisonEntry] = []
    is_active: bool = True


class SessionCreateRequest(BaseModel):
    """Request body for creating a new session."""
    user_id: Optional[str] = None


class SessionUpdateRequest(BaseModel):
    """Request body for updating a session (adding a comparison entry)."""
    company_a: str
    company_b: str
    winner: str
    summary: str
