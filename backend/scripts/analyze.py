"""
Advanced Analysis Pipeline
NLP-based policy analysis, clustering, and trend detection
"""

import json
import logging
from pathlib import Path
from collections import defaultdict
from datetime import datetime

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Simple text analysis functions (placeholder for spaCy/transformers in production)
def calculate_policy_metrics(policy_text: str) -> dict:
    """Calculate basic metrics from policy text"""
    words = policy_text.lower().split()
    word_count = len(words)

    # Keyword presence (simplified)
    keywords = {
        "transparency": "transparent" in policy_text.lower(),
        "fairness": "fair" in policy_text.lower() or "bias" in policy_text.lower(),
        "accountability": "accountab" in policy_text.lower(),
        "privacy": "privacy" in policy_text.lower(),
        "safety": "safety" in policy_text.lower() or "safe" in policy_text.lower(),
        "human_control": "human" in policy_text.lower(),
    }

    coverage_score = sum(keywords.values()) / len(keywords) * 100
    
    return {
        "word_count": word_count,
        "keyword_coverage": coverage_score,
        "keywords_detected": keywords,
    }


def analyze_policy_evolution(timeline_data: list) -> dict:
    """Analyze how policies evolve over time"""
    changes_by_year = defaultdict(list)
    change_categories = defaultdict(int)

    for entry in timeline_data:
        year = datetime.fromisoformat(entry["date"]).year
        changes_by_year[year].append(entry)
        change_categories[entry["change_category"]] += 1

    return {
        "changes_by_year": dict(changes_by_year),
        "change_distribution": dict(change_categories),
        "total_changes": len(timeline_data),
        "trend": "increasing_rigor" if len(changes_by_year) > 2 else "stable",
    }


def cluster_companies(policies_data: list) -> dict:
    """Simple clustering of companies by policy characteristics"""
    high_compliance = []
    medium_compliance = []
    low_compliance = []

    for policy in policies_data:
        score = policy.get("compliance_score", 0)
        if score >= 85:
            high_compliance.append(policy["company_id"])
        elif score >= 70:
            medium_compliance.append(policy["company_id"])
        else:
            low_compliance.append(policy["company_id"])

    return {
        "high_governance_maturity": high_compliance,
        "medium_governance_maturity": medium_compliance,
        "low_governance_maturity": low_compliance,
        "clustering_method": "compliance_score_based",
    }


def run_analysis_pipeline(data_dir="data/raw"):
    """Execute full analysis pipeline"""
    logger.info("=" * 60)
    logger.info("Starting Advanced Analysis Pipeline")
    logger.info("=" * 60)

    # Load datasets
    data_files = {
        "companies": Path(data_dir) / "companies.json",
        "policies": Path(data_dir) / "policies.json",
        "timeline": Path(data_dir) / "policy_timeline.json",
        "governance": Path(data_dir) / "governance_indicators.json",
    }

    datasets = {}
    for name, filepath in data_files.items():
        if filepath.exists():
            with open(filepath) as f:
                datasets[name] = json.load(f)
                logger.info(f"✓ Loaded {name}: {len(datasets[name])} records")
        else:
            logger.warning(f"⚠ {name} not found at {filepath}")
            datasets[name] = []

    # Analysis 1: Policy Metrics
    logger.info("\n[Analysis 1] Computing Policy Metrics...")
    policy_metrics = {}
    for policy in datasets.get("policies", []):
        metrics = calculate_policy_metrics(policy.get("summary", ""))
        policy_metrics[policy["id"]] = {
            "company_id": policy["company_id"],
            "compliance_score": policy.get("compliance_score", 0),
            **metrics,
        }
    logger.info(f"✓ Analyzed {len(policy_metrics)} policies")

    # Analysis 2: Policy Evolution
    logger.info("\n[Analysis 2] Analyzing Policy Evolution...")
    evolution = analyze_policy_evolution(datasets.get("timeline", []))
    logger.info(f"✓ Trend: {evolution.get('trend', 'unknown')}")
    logger.info(f"✓ Total changes tracked: {evolution.get('total_changes', 0)}")

    # Analysis 3: Clustering
    logger.info("\n[Analysis 3] Clustering Companies by Governance Maturity...")
    clusters = cluster_companies(datasets.get("policies", []))
    logger.info(
        f"✓ High maturity: {len(clusters['high_governance_maturity'])} companies"
    )
    logger.info(
        f"✓ Medium maturity: {len(clusters['medium_governance_maturity'])} companies"
    )
    logger.info(
        f"✓ Low maturity: {len(clusters['low_governance_maturity'])} companies"
    )

    # Compile results
    results = {
        "timestamp": datetime.now().isoformat(),
        "pipeline_version": "1.0",
        "analyses": {
            "policy_metrics": policy_metrics,
            "evolution_trends": evolution,
            "company_clusters": clusters,
        },
        "insights": {
            "avg_compliance_score": sum(
                p.get("compliance_score", 0) for p in datasets.get("policies", [])
            )
            / max(len(datasets.get("policies", [])), 1),
            "most_common_change": max(
                evolution.get("change_distribution", {}).items(),
                key=lambda x: x[1],
                default=("unknown", 0),
            )[0],
            "policy_evolution_trend": evolution.get("trend", "unknown"),
        },
    }

    # Save results
    output_file = Path(data_dir) / "../processed/analysis_results.json"
    output_file.parent.mkdir(parents=True, exist_ok=True)
    with open(output_file, "w") as f:
        json.dump(results, f, indent=2)
    logger.info(f"\n✓ Results saved to {output_file}")

    logger.info("\n" + "=" * 60)
    logger.info("Analysis Complete!")
    logger.info("=" * 60)
    logger.info(f"Average Compliance Score: {results['insights']['avg_compliance_score']:.1f}")
    logger.info(
        f"Most Common Change Type: {results['insights']['most_common_change']}"
    )
    logger.info(f"Overall Policy Evolution Trend: {results['insights']['policy_evolution_trend']}")

    return results


if __name__ == "__main__":
    run_analysis_pipeline()
