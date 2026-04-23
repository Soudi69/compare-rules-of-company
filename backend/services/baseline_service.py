"""
Baseline Comparison Service for Person 4.

Implements a keyword-coverage + compliance-score baseline method to
compare two companies' AI ethics policies side-by-side.
"""
from typing import Dict, Any, List, Tuple
from models.comparison import ComparisonResult, CategoryComparison
from services.data_service import DataService


# Canonical keyword categories for AI ethics evaluation
EVALUATION_CATEGORIES = {
    "transparency": [
        "transparency", "transparent", "explain", "interpretab", "disclosure",
        "open", "clear", "understandable"
    ],
    "fairness": [
        "fair", "bias", "equit", "inclusi", "diverse", "discriminat",
        "equal", "justice"
    ],
    "accountability": [
        "accountab", "responsib", "ownership", "audit", "oversight",
        "governance", "compliance"
    ],
    "safety": [
        "safe", "security", "risk", "harm", "protect", "robust",
        "reliable", "testing"
    ],
    "privacy": [
        "privacy", "data protection", "consent", "confidential",
        "personal data", "gdpr", "regulation"
    ],
    "human_oversight": [
        "human", "control", "oversight", "review", "decision",
        "stakeholder", "engagement"
    ],
}


def _score_category(guidelines: List[str], keywords: List[str]) -> float:
    """
    Score how well a company's guidelines cover a keyword category.
    Returns 0-100 score.
    """
    if not guidelines:
        return 0.0

    combined_text = " ".join(guidelines).lower()
    hits = sum(1 for kw in keywords if kw in combined_text)
    return round((hits / len(keywords)) * 100, 1)


def _extract_topics(guidelines: List[str]) -> List[str]:
    """Extract which evaluation categories a company covers."""
    combined = " ".join(guidelines).lower()
    covered = []
    for cat, keywords in EVALUATION_CATEGORIES.items():
        if any(kw in combined for kw in keywords):
            covered.append(cat)
    return covered


def _identify_strengths_weaknesses(
    scores: Dict[str, float], threshold_high: float = 40.0, threshold_low: float = 25.0
) -> Tuple[List[str], List[str]]:
    """Identify strength and weakness categories from scores."""
    strengths = [cat for cat, score in scores.items() if score >= threshold_high]
    weaknesses = [cat for cat, score in scores.items() if score < threshold_low]
    return strengths, weaknesses


class BaselineService:
    """
    Baseline comparison service.

    Uses keyword-coverage scoring across 6 AI ethics categories to
    produce a structured comparison between two companies.
    """

    def __init__(self):
        self.data_service = DataService()

    def compare(self, company_a: str, company_b: str) -> ComparisonResult:
        """
        Compare two companies using the baseline method.

        Args:
            company_a: Name of first company
            company_b: Name of second company

        Returns:
            ComparisonResult with full side-by-side analysis

        Raises:
            ValueError: If either company is not found
        """
        data_a = self.data_service.get_company_guidelines(company_a)
        data_b = self.data_service.get_company_guidelines(company_b)

        if not data_a:
            raise ValueError(f"No guidelines found for company: {company_a}")
        if not data_b:
            raise ValueError(f"No guidelines found for company: {company_b}")

        guidelines_a = data_a.get("guidelines", [])
        guidelines_b = data_b.get("guidelines", [])

        # Score each category for both companies
        scores_a: Dict[str, float] = {}
        scores_b: Dict[str, float] = {}
        category_comparisons: List[CategoryComparison] = []

        a_wins = 0
        b_wins = 0

        for category, keywords in EVALUATION_CATEGORIES.items():
            score_a = _score_category(guidelines_a, keywords)
            score_b = _score_category(guidelines_b, keywords)
            scores_a[category] = score_a
            scores_b[category] = score_b

            diff = round(score_a - score_b, 1)
            if diff > 0:
                winner = "company_a"
                a_wins += 1
                insight = f"{company_a} has stronger {category} coverage by {abs(diff):.1f} points"
            elif diff < 0:
                winner = "company_b"
                b_wins += 1
                insight = f"{company_b} has stronger {category} coverage by {abs(diff):.1f} points"
            else:
                winner = "tie"
                insight = f"Both companies have equal {category} coverage"

            category_comparisons.append(CategoryComparison(
                category=category,
                company_a_score=score_a,
                company_b_score=score_b,
                winner=winner,
                difference=abs(diff),
                insight=insight,
            ))

        # Determine overall winner
        if a_wins > b_wins:
            overall_winner = "company_a"
        elif b_wins > a_wins:
            overall_winner = "company_b"
        else:
            overall_winner = "tie"

        # Strengths & weaknesses
        strengths_a, weaknesses_a = _identify_strengths_weaknesses(scores_a)
        strengths_b, weaknesses_b = _identify_strengths_weaknesses(scores_b)

        # Topic overlap analysis
        topics_a = set(_extract_topics(guidelines_a))
        topics_b = set(_extract_topics(guidelines_b))
        shared = sorted(topics_a & topics_b)
        unique_a = sorted(topics_a - topics_b)
        unique_b = sorted(topics_b - topics_a)

        # Compliance scores from data
        compliance_a = self._get_compliance_score(company_a)
        compliance_b = self._get_compliance_score(company_b)

        # Build summary
        winner_name = (
            company_a if overall_winner == "company_a"
            else company_b if overall_winner == "company_b"
            else "Neither (tie)"
        )
        summary = (
            f"Baseline comparison of {company_a} vs {company_b} across "
            f"{len(EVALUATION_CATEGORIES)} AI ethics categories. "
            f"{winner_name} leads overall, winning {max(a_wins, b_wins)} of "
            f"{len(EVALUATION_CATEGORIES)} categories. "
            f"Compliance scores: {company_a} ({compliance_a}%) vs "
            f"{company_b} ({compliance_b}%)."
        )

        recommendation = self._generate_recommendation(
            company_a, company_b, overall_winner, weaknesses_a, weaknesses_b
        )

        return ComparisonResult(
            company_a=company_a,
            company_b=company_b,
            company_a_compliance=compliance_a,
            company_b_compliance=compliance_b,
            overall_winner=overall_winner,
            category_comparisons=category_comparisons,
            company_a_strengths=strengths_a,
            company_b_strengths=strengths_b,
            company_a_weaknesses=weaknesses_a,
            company_b_weaknesses=weaknesses_b,
            shared_topics=shared,
            unique_to_a=unique_a,
            unique_to_b=unique_b,
            summary=summary,
            recommendation=recommendation,
        )

    def _get_compliance_score(self, company_name: str) -> int:
        """Get compliance score for a company from ingested data."""
        # Map from data_service guidelines to ingest_data policy scores
        score_map = {
            "openai": 92,
            "google": 88,
            "microsoft": 85,
            "meta": 78,
            "amazon": 81,
            "ibm": 81,
            "apple": 70,
        }
        return score_map.get(company_name.lower().strip(), 65)

    def _generate_recommendation(
        self,
        company_a: str,
        company_b: str,
        overall_winner: str,
        weaknesses_a: List[str],
        weaknesses_b: List[str],
    ) -> str:
        """Generate a recommendation based on comparison results."""
        parts = []
        if overall_winner == "company_a":
            parts.append(
                f"{company_a} demonstrates stronger overall AI ethics governance."
            )
        elif overall_winner == "company_b":
            parts.append(
                f"{company_b} demonstrates stronger overall AI ethics governance."
            )
        else:
            parts.append("Both companies show comparable AI ethics governance maturity.")

        if weaknesses_a:
            parts.append(
                f"{company_a} should improve in: {', '.join(weaknesses_a)}."
            )
        if weaknesses_b:
            parts.append(
                f"{company_b} should improve in: {', '.join(weaknesses_b)}."
            )

        return " ".join(parts)
