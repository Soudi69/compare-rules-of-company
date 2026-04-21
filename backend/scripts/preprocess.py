#!/usr/bin/env python3
"""
Data Preprocessing Pipeline for AI Ethics Policy Analyzer

This script:
1. Loads raw data from ingest_data.py outputs (data/raw/)
2. Performs data cleaning and validation
3. Applies text normalization (tokenization, stopword removal)
4. Outputs cleaned data to data/processed/
5. Logs quality metrics and issues

Usage:
    python backend/scripts/preprocess.py
"""

import json
import csv
import logging
from pathlib import Path
from collections import defaultdict
import re
from typing import Dict, List, Any, Tuple

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# ============================================================================
# CONFIGURATION
# ============================================================================

DATA_RAW_DIR = Path(__file__).parent.parent.parent / "data" / "raw"
DATA_PROCESSED_DIR = Path(__file__).parent.parent.parent / "data" / "processed"
DATA_PROCESSED_DIR.mkdir(parents=True, exist_ok=True)

# Common stopwords for English text
STOPWORDS = {
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'be', 'been',
    'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would',
    'could', 'should', 'may', 'might', 'must', 'can', 'that', 'this',
    'these', 'those', 'which', 'who', 'what', 'when', 'where', 'why', 'how',
    'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us',
    'them', 'my', 'your', 'his', 'her', 'its', 'our', 'their'
}

# ============================================================================
# TEXT NORMALIZATION
# ============================================================================

def normalize_text(text: str) -> str:
    """
    Normalize text by:
    - Converting to lowercase
    - Removing URLs
    - Removing email addresses
    - Removing special characters (keeping alphanumeric and spaces)
    - Collapsing multiple spaces
    
    Args:
        text: Raw text string
        
    Returns:
        Normalized text string
    """
    if not text or not isinstance(text, str):
        return ""
    
    # Convert to lowercase
    text = text.lower()
    
    # Remove URLs
    text = re.sub(r'http\S+|www\S+|https\S+', '', text, flags=re.MULTILINE)
    
    # Remove email addresses
    text = re.sub(r'\S+@\S+', '', text)
    
    # Remove special characters (keep alphanumeric, spaces, hyphens, periods)
    text = re.sub(r'[^\w\s\.\-]', '', text)
    
    # Collapse multiple spaces
    text = re.sub(r'\s+', ' ', text).strip()
    
    return text


def tokenize_text(text: str) -> List[str]:
    """
    Tokenize text into words.
    
    Args:
        text: Normalized text string
        
    Returns:
        List of tokens (words)
    """
    if not text:
        return []
    
    # Simple whitespace tokenization
    tokens = text.split()
    return tokens


def remove_stopwords(tokens: List[str]) -> List[str]:
    """
    Remove common English stopwords from token list.
    
    Args:
        tokens: List of tokens (words)
        
    Returns:
        List of tokens with stopwords removed
    """
    return [token for token in tokens if token not in STOPWORDS and len(token) > 2]


def preprocess_policy_text(text: str) -> Dict[str, Any]:
    """
    Comprehensive text preprocessing for policy documents.
    
    Args:
        text: Raw policy text
        
    Returns:
        Dictionary with normalized, tokenized, and processed text
    """
    normalized = normalize_text(text)
    tokens = tokenize_text(normalized)
    filtered_tokens = remove_stopwords(tokens)
    
    return {
        'original_length': len(text),
        'normalized_length': len(normalized),
        'word_count': len(tokens),
        'filtered_word_count': len(filtered_tokens),
        'normalized_text': normalized,
        'tokens': tokens,
        'filtered_tokens': filtered_tokens
    }


# ============================================================================
# DATA VALIDATION
# ============================================================================

def validate_company(company: Dict[str, Any]) -> Tuple[bool, List[str]]:
    """
    Validate company record for required fields and data quality.
    
    Args:
        company: Company record dictionary
        
    Returns:
        Tuple of (is_valid, list_of_issues)
    """
    issues = []
    
    # Check required fields
    required_fields = ['id', 'name', 'industry', 'founded']
    for field in required_fields:
        if field not in company or not company[field]:
            issues.append(f"Missing or empty field: {field}")
    
    # Validate data types
    if 'id' in company and not isinstance(company['id'], (int, str)):
        issues.append("Invalid type for 'id': should be int or string")
    
    if 'name' in company and not isinstance(company['name'], str):
        issues.append("Invalid type for 'name': should be string")
    
    if 'founded' in company and not isinstance(company['founded'], int):
        issues.append("Invalid type for 'founded': should be int (year)")
    
    # Validate founded year is reasonable (1900-2030)
    if 'founded' in company and isinstance(company['founded'], int):
        if not (1900 <= company['founded'] <= 2030):
            issues.append(f"Invalid founded year: {company['founded']}")
    
    return len(issues) == 0, issues


def validate_policy(policy: Dict[str, Any]) -> Tuple[bool, List[str]]:
    """
    Validate policy record for required fields and data quality.
    
    Args:
        policy: Policy record dictionary
        
    Returns:
        Tuple of (is_valid, list_of_issues)
    """
    issues = []
    
    # Check required fields
    required_fields = ['id', 'company_id', 'title', 'content', 'published_date']
    for field in required_fields:
        if field not in policy or not policy[field]:
            issues.append(f"Missing or empty field: {field}")
    
    # Validate content not too short
    if 'content' in policy and isinstance(policy['content'], str):
        if len(policy['content']) < 50:
            issues.append(f"Policy content too short ({len(policy['content'])} chars)")
    
    return len(issues) == 0, issues


def validate_timeline(entry: Dict[str, Any]) -> Tuple[bool, List[str]]:
    """
    Validate policy timeline entry for required fields and data quality.
    
    Args:
        entry: Timeline entry dictionary
        
    Returns:
        Tuple of (is_valid, list_of_issues)
    """
    issues = []
    
    # Check required fields
    required_fields = ['id', 'policy_id', 'change_type', 'timestamp']
    for field in required_fields:
        if field not in entry or (entry[field] is None and field != 'description'):
            issues.append(f"Missing or empty field: {field}")
    
    return len(issues) == 0, issues


def validate_governance(record: Dict[str, Any]) -> Tuple[bool, List[str]]:
    """
    Validate governance indicator record for required fields and data quality.
    
    Args:
        record: Governance indicator record dictionary
        
    Returns:
        Tuple of (is_valid, list_of_issues)
    """
    issues = []
    
    # Check required fields
    required_fields = ['country', 'year', 'score']
    for field in required_fields:
        if field not in record or record[field] is None:
            issues.append(f"Missing or empty field: {field}")
    
    # Validate score is numeric and in range 0-100
    if 'score' in record:
        try:
            score = float(record['score'])
            if not (0 <= score <= 100):
                issues.append(f"Score out of range [0-100]: {score}")
        except (ValueError, TypeError):
            issues.append(f"Score not numeric: {record['score']}")
    
    # Validate year is reasonable
    if 'year' in record and isinstance(record['year'], int):
        if not (1990 <= record['year'] <= 2030):
            issues.append(f"Invalid year: {record['year']}")
    
    return len(issues) == 0, issues


# ============================================================================
# PREPROCESSING PIPELINES
# ============================================================================

def preprocess_companies(companies: List[Dict]) -> Tuple[List[Dict], Dict]:
    """
    Preprocess companies dataset.
    
    Args:
        companies: List of company records
        
    Returns:
        Tuple of (cleaned_companies, quality_metrics)
    """
    logger.info(f"Preprocessing {len(companies)} company records...")
    
    cleaned = []
    metrics = {
        'total': len(companies),
        'valid': 0,
        'invalid': 0,
        'issues': defaultdict(int)
    }
    
    for company in companies:
        is_valid, issues = validate_company(company)
        
        if is_valid:
            cleaned.append(company)
            metrics['valid'] += 1
        else:
            metrics['invalid'] += 1
            for issue in issues:
                metrics['issues'][issue] += 1
            logger.warning(f"Invalid company {company.get('id', 'unknown')}: {issues}")
    
    logger.info(f"✓ Companies: {metrics['valid']}/{metrics['total']} valid")
    if metrics['issues']:
        logger.warning(f"  Issues found: {dict(metrics['issues'])}")
    
    return cleaned, metrics


def preprocess_policies(policies: List[Dict]) -> Tuple[List[Dict], Dict]:
    """
    Preprocess policies dataset with text normalization.
    
    Args:
        policies: List of policy records
        
    Returns:
        Tuple of (cleaned_policies, quality_metrics)
    """
    logger.info(f"Preprocessing {len(policies)} policy records...")
    
    cleaned = []
    metrics = {
        'total': len(policies),
        'valid': 0,
        'invalid': 0,
        'original_chars': 0,
        'normalized_chars': 0,
        'avg_tokens': 0,
        'issues': defaultdict(int)
    }
    
    total_tokens = 0
    
    for policy in policies:
        is_valid, issues = validate_policy(policy)
        
        if is_valid:
            # Preprocess text
            text_prep = preprocess_policy_text(policy.get('content', ''))
            
            # Add preprocessing results to policy
            policy['content_normalized'] = text_prep['normalized_text']
            policy['tokens'] = text_prep['filtered_tokens']
            policy['word_count'] = text_prep['filtered_word_count']
            
            metrics['original_chars'] += text_prep['original_length']
            metrics['normalized_chars'] += text_prep['normalized_length']
            total_tokens += text_prep['filtered_word_count']
            
            cleaned.append(policy)
            metrics['valid'] += 1
        else:
            metrics['invalid'] += 1
            for issue in issues:
                metrics['issues'][issue] += 1
            logger.warning(f"Invalid policy {policy.get('id', 'unknown')}: {issues}")
    
    if cleaned:
        metrics['avg_tokens'] = total_tokens / len(cleaned)
    
    logger.info(f"✓ Policies: {metrics['valid']}/{metrics['total']} valid")
    logger.info(f"  Text stats: {metrics['original_chars']} → {metrics['normalized_chars']} chars, "
                f"avg {metrics['avg_tokens']:.1f} tokens/policy")
    if metrics['issues']:
        logger.warning(f"  Issues found: {dict(metrics['issues'])}")
    
    return cleaned, metrics


def preprocess_timeline(timeline: List[Dict]) -> Tuple[List[Dict], Dict]:
    """
    Preprocess policy timeline dataset.
    
    Args:
        timeline: List of timeline entry records
        
    Returns:
        Tuple of (cleaned_timeline, quality_metrics)
    """
    logger.info(f"Preprocessing {len(timeline)} timeline records...")
    
    cleaned = []
    metrics = {
        'total': len(timeline),
        'valid': 0,
        'invalid': 0,
        'by_type': defaultdict(int),
        'issues': defaultdict(int)
    }
    
    for entry in timeline:
        is_valid, issues = validate_timeline(entry)
        
        if is_valid:
            cleaned.append(entry)
            metrics['valid'] += 1
            change_type = entry.get('change_type', 'unknown')
            metrics['by_type'][change_type] += 1
        else:
            metrics['invalid'] += 1
            for issue in issues:
                metrics['issues'][issue] += 1
    
    logger.info(f"✓ Timeline: {metrics['valid']}/{metrics['total']} valid")
    logger.info(f"  By type: {dict(metrics['by_type'])}")
    if metrics['issues']:
        logger.warning(f"  Issues found: {dict(metrics['issues'])}")
    
    return cleaned, metrics


def preprocess_governance(governance: List[Dict]) -> Tuple[List[Dict], Dict]:
    """
    Preprocess governance indicators dataset.
    
    Args:
        governance: List of governance indicator records
        
    Returns:
        Tuple of (cleaned_governance, quality_metrics)
    """
    logger.info(f"Preprocessing {len(governance)} governance records...")
    
    cleaned = []
    metrics = {
        'total': len(governance),
        'valid': 0,
        'invalid': 0,
        'avg_score': 0,
        'score_min': float('inf'),
        'score_max': float('-inf'),
        'issues': defaultdict(int)
    }
    
    total_score = 0
    
    for record in governance:
        is_valid, issues = validate_governance(record)
        
        if is_valid:
            cleaned.append(record)
            metrics['valid'] += 1
            
            score = float(record.get('score', 0))
            total_score += score
            metrics['score_min'] = min(metrics['score_min'], score)
            metrics['score_max'] = max(metrics['score_max'], score)
        else:
            metrics['invalid'] += 1
            for issue in issues:
                metrics['issues'][issue] += 1
    
    if cleaned:
        metrics['avg_score'] = total_score / len(cleaned)
    
    logger.info(f"✓ Governance: {metrics['valid']}/{metrics['total']} valid")
    logger.info(f"  Score range: {metrics['score_min']:.2f} - {metrics['score_max']:.2f} "
                f"(avg: {metrics['avg_score']:.2f})")
    if metrics['issues']:
        logger.warning(f"  Issues found: {dict(metrics['issues'])}")
    
    return cleaned, metrics


# ============================================================================
# FILE I/O
# ============================================================================

def load_json_file(filepath: Path) -> List[Dict]:
    """Load JSON file and return data."""
    if not filepath.exists():
        logger.warning(f"File not found: {filepath}")
        return []
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            return json.load(f)
    except json.JSONDecodeError as e:
        logger.error(f"Failed to parse JSON from {filepath}: {e}")
        return []


def save_json_file(data: List[Dict], filepath: Path) -> None:
    """Save data to JSON file."""
    filepath.parent.mkdir(parents=True, exist_ok=True)
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    logger.info(f"✓ Saved {len(data)} records to {filepath.name}")


def save_csv_file(data: List[Dict], filepath: Path) -> None:
    """Save data to CSV file."""
    if not data:
        logger.warning(f"No data to save to {filepath}")
        return
    
    filepath.parent.mkdir(parents=True, exist_ok=True)
    fieldnames = data[0].keys()
    
    with open(filepath, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(data)
    
    logger.info(f"✓ Saved {len(data)} records to {filepath.name}")


# ============================================================================
# MAIN PREPROCESSING PIPELINE
# ============================================================================

def run_preprocessing_pipeline() -> Dict[str, Any]:
    """
    Run complete preprocessing pipeline on all datasets.
    
    Returns:
        Dictionary with all quality metrics
    """
    logger.info("="*70)
    logger.info("AI ETHICS POLICY ANALYZER - DATA PREPROCESSING PIPELINE")
    logger.info("="*70)
    
    all_metrics = {}
    
    # ---- COMPANIES ----
    logger.info("\n📋 PROCESSING COMPANIES...")
    companies = load_json_file(DATA_RAW_DIR / "companies.json")
    companies_clean, metrics = preprocess_companies(companies)
    all_metrics['companies'] = metrics
    save_json_file(companies_clean, DATA_PROCESSED_DIR / "companies_clean.json")
    save_csv_file(companies_clean, DATA_PROCESSED_DIR / "companies_clean.csv")
    
    # ---- POLICIES ----
    logger.info("\n📄 PROCESSING POLICIES...")
    policies = load_json_file(DATA_RAW_DIR / "policies.json")
    policies_clean, metrics = preprocess_policies(policies)
    all_metrics['policies'] = metrics
    save_json_file(policies_clean, DATA_PROCESSED_DIR / "policies_clean.json")
    
    # Save policy summary (original + normalized fields)
    policies_summary = [
        {
            'id': p.get('id'),
            'company_id': p.get('company_id'),
            'title': p.get('title'),
            'word_count': p.get('word_count'),
            'published_date': p.get('published_date')
        }
        for p in policies_clean
    ]
    save_csv_file(policies_summary, DATA_PROCESSED_DIR / "policies_summary.csv")
    
    # ---- TIMELINE ----
    logger.info("\n⏳ PROCESSING POLICY TIMELINE...")
    timeline = load_json_file(DATA_RAW_DIR / "policy_timeline.json")
    timeline_clean, metrics = preprocess_timeline(timeline)
    all_metrics['timeline'] = metrics
    save_json_file(timeline_clean, DATA_PROCESSED_DIR / "policy_timeline_clean.json")
    save_csv_file(timeline_clean, DATA_PROCESSED_DIR / "policy_timeline_clean.csv")
    
    # ---- GOVERNANCE INDICATORS ----
    logger.info("\n🏛️  PROCESSING GOVERNANCE INDICATORS...")
    governance = load_json_file(DATA_RAW_DIR / "governance_indicators.json")
    governance_clean, metrics = preprocess_governance(governance)
    all_metrics['governance'] = metrics
    save_json_file(governance_clean, DATA_PROCESSED_DIR / "governance_indicators_clean.json")
    save_csv_file(governance_clean, DATA_PROCESSED_DIR / "governance_indicators_clean.csv")
    
    # ---- SUMMARY REPORT ----
    logger.info("\n" + "="*70)
    logger.info("📊 PREPROCESSING SUMMARY")
    logger.info("="*70)
    
    summary = {
        'timestamp': str(Path(__file__).stat().st_mtime),
        'total_records_input': sum(m['total'] for m in all_metrics.values()),
        'total_records_valid': sum(m['valid'] for m in all_metrics.values()),
        'total_records_invalid': sum(m['invalid'] for m in all_metrics.values()),
        'datasets': all_metrics
    }
    
    logger.info(f"\nTotal records processed: {summary['total_records_input']}")
    logger.info(f"Valid records: {summary['total_records_valid']}")
    logger.info(f"Invalid records: {summary['total_records_invalid']}")
    logger.info(f"Data quality: {summary['total_records_valid']/max(summary['total_records_input'], 1)*100:.1f}%")
    
    # Save summary
    with open(DATA_PROCESSED_DIR / "preprocessing_summary.json", 'w') as f:
        json.dump(summary, f, indent=2)
    
    logger.info(f"\n✓ All cleaned data saved to {DATA_PROCESSED_DIR}/")
    logger.info("="*70)
    
    return summary


# ============================================================================
# ENTRY POINT
# ============================================================================

if __name__ == "__main__":
    try:
        result = run_preprocessing_pipeline()
        print("\n✅ Preprocessing complete!")
        exit(0)
    except Exception as e:
        logger.error(f"❌ Preprocessing failed: {e}", exc_info=True)
        exit(1)
