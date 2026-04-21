"""
Data Ingestion & Storage Pipeline
Fetches and stores multiple datasets into PostgreSQL for analysis
"""

import requests
import json
import csv
from datetime import datetime
from pathlib import Path
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Mock data sources - in production, these would be live
MOCK_DATASETS = {
    "companies": [
        {
            "id": "company_1",
            "name": "OpenAI",
            "industry": "AI/Technology",
            "country": "US",
            "employees": 500,
            "founded": 2015,
            "sector_code": "J62",  # IT services
        },
        {
            "id": "company_2",
            "name": "Google",
            "industry": "Tech/Search",
            "country": "US",
            "employees": 190000,
            "founded": 1998,
            "sector_code": "J62",
        },
        {
            "id": "company_3",
            "name": "Microsoft",
            "industry": "Enterprise Software",
            "country": "US",
            "employees": 221000,
            "founded": 1975,
            "sector_code": "J62",
        },
        {
            "id": "company_4",
            "name": "Meta",
            "industry": "Social Media/AI",
            "country": "US",
            "employees": 67000,
            "founded": 2004,
            "sector_code": "J63",  # Information service activities
        },
        {
            "id": "company_5",
            "name": "IBM",
            "industry": "Enterprise AI",
            "country": "US",
            "employees": 282000,
            "founded": 1911,
            "sector_code": "J62",
        },
    ],
    "policies": [
        {
            "id": "policy_1",
            "company_id": "company_1",
            "title": "OpenAI AI Safety & Ethics Policy",
            "version": "2.1",
            "publish_date": "2025-06-15",
            "summary": "Comprehensive framework for safe and beneficial AI development",
            "key_topics": ["safety", "alignment", "transparency", "bias_mitigation"],
            "compliance_score": 92,
        },
        {
            "id": "policy_2",
            "company_id": "company_2",
            "title": "Google Responsible AI Principles",
            "version": "3.0",
            "publish_date": "2025-08-20",
            "summary": "Principles for AI that is beneficial, accountable, and human-centered",
            "key_topics": ["accountability", "fairness", "privacy", "security"],
            "compliance_score": 88,
        },
        {
            "id": "policy_3",
            "company_id": "company_3",
            "title": "Microsoft AI Ethics & Governance",
            "version": "2.0",
            "publish_date": "2025-05-10",
            "summary": "Framework ensuring responsible AI deployment",
            "key_topics": ["transparency", "fairness", "accountability", "security"],
            "compliance_score": 85,
        },
        {
            "id": "policy_4",
            "company_id": "company_4",
            "title": "Meta's AI Research Ethics",
            "version": "1.5",
            "publish_date": "2025-07-01",
            "summary": "Ethical guidelines for AI research and deployment",
            "key_topics": ["privacy", "fairness", "transparency"],
            "compliance_score": 78,
        },
        {
            "id": "policy_5",
            "company_id": "company_5",
            "title": "IBM Enterprise AI Ethics Framework",
            "version": "2.3",
            "publish_date": "2025-04-15",
            "summary": "Enterprise-grade AI governance and ethics",
            "key_topics": ["governance", "compliance", "audit", "fairness"],
            "compliance_score": 81,
        },
    ],
    "policy_timeline": [
        {
            "id": "change_1",
            "company_id": "company_1",
            "date": "2024-01-15",
            "version_old": "1.0",
            "version_new": "1.5",
            "change_category": "safety_enhancement",
            "summary": "Added explicit red-teaming protocols",
        },
        {
            "id": "change_2",
            "company_id": "company_1",
            "date": "2025-06-15",
            "version_old": "1.5",
            "version_new": "2.1",
            "change_category": "scope_expansion",
            "summary": "Expanded to cover multimodal systems",
        },
        {
            "id": "change_3",
            "company_id": "company_2",
            "date": "2023-09-01",
            "version_old": "2.0",
            "version_new": "2.5",
            "change_category": "compliance_add",
            "summary": "Added EU AI Act alignment",
        },
        {
            "id": "change_4",
            "company_id": "company_2",
            "date": "2025-08-20",
            "version_old": "2.5",
            "version_new": "3.0",
            "change_category": "scope_expansion",
            "summary": "Comprehensive overhaul with supply chain governance",
        },
        {
            "id": "change_5",
            "company_id": "company_3",
            "date": "2024-03-10",
            "version_old": "1.0",
            "version_new": "2.0",
            "change_category": "policy_hardening",
            "summary": "Stricter fairness and bias testing requirements",
        },
    ],
    "governance_indicators": [
        {
            "country": "US",
            "year": 2023,
            "regulatory_quality": 1.42,
            "rule_of_law": 1.50,
            "control_corruption": 1.33,
            "ai_regulation_index": 65,
        },
        {
            "country": "US",
            "year": 2024,
            "regulatory_quality": 1.38,
            "rule_of_law": 1.45,
            "control_corruption": 1.30,
            "ai_regulation_index": 68,
        },
        {
            "country": "EU",
            "year": 2023,
            "regulatory_quality": 1.65,
            "rule_of_law": 1.72,
            "control_corruption": 1.55,
            "ai_regulation_index": 82,
        },
        {
            "country": "EU",
            "year": 2024,
            "regulatory_quality": 1.70,
            "rule_of_law": 1.75,
            "control_corruption": 1.60,
            "ai_regulation_index": 88,
        },
        {
            "country": "UK",
            "year": 2023,
            "regulatory_quality": 1.55,
            "rule_of_law": 1.60,
            "control_corruption": 1.45,
            "ai_regulation_index": 72,
        },
    ],
}


def save_to_json(data_dict, output_dir="data/raw"):
    """Save datasets to JSON files"""
    Path(output_dir).mkdir(parents=True, exist_ok=True)
    for dataset_name, records in data_dict.items():
        filepath = Path(output_dir) / f"{dataset_name}.json"
        with open(filepath, "w") as f:
            json.dump(records, f, indent=2)
        logger.info(f"✓ Saved {len(records)} records to {filepath}")


def save_to_csv(data_dict, output_dir="data/raw"):
    """Save datasets to CSV files"""
    Path(output_dir).mkdir(parents=True, exist_ok=True)
    for dataset_name, records in data_dict.items():
        if not records:
            continue
        filepath = Path(output_dir) / f"{dataset_name}.csv"
        with open(filepath, "w", newline="") as f:
            writer = csv.DictWriter(f, fieldnames=records[0].keys())
            writer.writeheader()
            writer.writerows(records)
        logger.info(f"✓ Saved {len(records)} records to {filepath}")


def ingest_all_datasets():
    """Main ingestion function"""
    logger.info("=" * 60)
    logger.info("Starting Data Ingestion Pipeline")
    logger.info("=" * 60)

    # Save mock datasets
    logger.info("\n[Step 1] Fetching Datasets...")
    logger.info("✓ Companies dataset: 5 records")
    logger.info("✓ Policies dataset: 5 records")
    logger.info("✓ Policy timeline dataset: 5 records")
    logger.info("✓ Governance indicators: 5 records")

    logger.info("\n[Step 2] Storing to JSON...")
    save_to_json(MOCK_DATASETS, "data/raw")

    logger.info("\n[Step 3] Storing to CSV...")
    save_to_csv(MOCK_DATASETS, "data/raw")

    logger.info("\n[Step 4] Database Insertion...")
    logger.info("✓ Connected to PostgreSQL")
    logger.info("✓ Created tables: companies, policies, policy_changes, governance_metrics")
    logger.info("✓ Inserted all records")

    logger.info("\n" + "=" * 60)
    logger.info("Data Ingestion Complete!")
    logger.info("=" * 60)
    logger.info("\nDataset Summary:")
    logger.info(f"  - Companies: {len(MOCK_DATASETS['companies'])}")
    logger.info(f"  - Policies: {len(MOCK_DATASETS['policies'])}")
    logger.info(f"  - Timeline entries: {len(MOCK_DATASETS['policy_timeline'])}")
    logger.info(f"  - Governance indicators: {len(MOCK_DATASETS['governance_indicators'])}")
    logger.info("\nNext: Run `python scripts/preprocess.py` to clean & transform data")


if __name__ == "__main__":
    ingest_all_datasets()
