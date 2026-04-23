"""
Session Service for Person 4.

In-memory session store with CRUD operations.
Sessions track comparison history for each user.
"""
import uuid
from datetime import datetime
from typing import Dict, Optional, List
from models.session import Session, ComparisonEntry


class SessionService:
    """
    In-memory session management.

    Stores sessions in a dict keyed by session ID.
    Each session holds a list of comparison entries.
    """

    def __init__(self):
        self._sessions: Dict[str, Session] = {}

    def create_session(self, user_id: Optional[str] = None) -> Session:
        """
        Create a new session.

        Args:
            user_id: Optional user identifier

        Returns:
            Newly created Session object
        """
        session_id = str(uuid.uuid4())
        now = datetime.utcnow().isoformat()
        session = Session(
            id=session_id,
            user_id=user_id,
            created_at=now,
            updated_at=now,
            comparisons=[],
            is_active=True,
        )
        self._sessions[session_id] = session
        return session

    def get_session(self, session_id: str) -> Optional[Session]:
        """
        Retrieve a session by ID.

        Args:
            session_id: The session identifier

        Returns:
            Session if found, None otherwise
        """
        return self._sessions.get(session_id)

    def list_sessions(self) -> List[Session]:
        """
        List all active sessions.

        Returns:
            List of all Session objects
        """
        return list(self._sessions.values())

    def add_comparison(
        self,
        session_id: str,
        company_a: str,
        company_b: str,
        winner: str,
        summary: str,
    ) -> Optional[Session]:
        """
        Add a comparison entry to an existing session.

        Args:
            session_id: The session to update
            company_a: First company name
            company_b: Second company name
            winner: Winner name or "tie"
            summary: Brief comparison summary

        Returns:
            Updated Session, or None if session not found
        """
        session = self._sessions.get(session_id)
        if not session:
            return None

        entry = ComparisonEntry(
            id=str(uuid.uuid4()),
            company_a=company_a,
            company_b=company_b,
            winner=winner,
            summary=summary,
            timestamp=datetime.utcnow().isoformat(),
        )
        session.comparisons.append(entry)
        session.updated_at = datetime.utcnow().isoformat()
        self._sessions[session_id] = session
        return session

    def delete_session(self, session_id: str) -> bool:
        """
        Delete a session.

        Args:
            session_id: The session to delete

        Returns:
            True if deleted, False if not found
        """
        if session_id in self._sessions:
            del self._sessions[session_id]
            return True
        return False

    def reset_session(self, session_id: str) -> Optional[Session]:
        """
        Reset a session (clear all comparisons but keep the session).

        Args:
            session_id: The session to reset

        Returns:
            Reset Session, or None if not found
        """
        session = self._sessions.get(session_id)
        if not session:
            return None

        session.comparisons = []
        session.updated_at = datetime.utcnow().isoformat()
        self._sessions[session_id] = session
        return session
