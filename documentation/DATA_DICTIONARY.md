# Data Dictionary

## Overview
This document describes all datasets used in the "AI Ethics Policy Analyzer" project, including their structure, fields, data types, and source information.

---

## Dataset 1: Companies (companies.json / companies.csv)

**Source:** Internal compilation + public databases (Crunchbase, Company House)  
**Format:** JSON / CSV  
**Records:** 5 (mock); production: 100+  
**Update Frequency:** Quarterly  

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| id | String | Unique company identifier | "company_1" |
| name | String | Company legal name | "OpenAI" |
| industry | String | Primary industry classification | "AI/Technology" |
| country | String | Headquarters country (ISO 3166-1 alpha-2) | "US" |
| employees | Integer | Total employee count (latest known) | 500 |
| founded | Integer | Year of establishment | 2015 |
| sector_code | String | NACE/SIC classification | "J62" |

**Data Quality Notes:**
- Employee counts are point-in-time estimates (source: latest public disclosure)
- Sector codes follow EU NACE Rev. 2 classification
- Country field uses standardized ISO codes

---

## Dataset 2: Policies (policies.json / policies.csv)

**Source:** Company websites, GitHub AI ethics repos, regulatory filings  
**Format:** JSON / CSV  
**Records:** 5 (mock); production: 50+  
**Update Frequency:** Continuous (web monitoring)  

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| id | String | Unique policy identifier | "policy_1" |
| company_id | String (FK) | Reference to company | "company_1" |
| title | String | Policy document title | "OpenAI AI Safety & Ethics Policy" |
| version | String | Policy version (semantic) | "2.1" |
| publish_date | Date (ISO 8601) | Official release/update date | "2025-06-15" |
| summary | Text | Executive summary or abstract | "Comprehensive framework for..." |
| key_topics | Array[String] | Indexed topics covered | ["safety", "alignment", "transparency"] |
| compliance_score | Integer (0-100) | Composite governance maturity score | 92 |

**Data Quality Notes:**
- Compliance score calculated using multi-factor model (coverage, specificity, enforcement mechanisms)
- Key topics extracted via NLP entity recognition
- Publish date sourced from policy header or Wayback Machine snapshots

---

## Dataset 3: Policy Timeline (policy_timeline.json / policy_timeline.csv)

**Source:** Version control diffs, policy repository archives, Wayback Machine  
**Format:** JSON / CSV  
**Records:** 5 (mock); production: 200+  
**Update Frequency:** Event-driven (when policies change)  

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| id | String | Unique change entry identifier | "change_1" |
| company_id | String (FK) | Reference to company | "company_1" |
| date | Date (ISO 8601) | Date of change | "2024-01-15" |
| version_old | String | Previous policy version | "1.0" |
| version_new | String | Updated policy version | "1.5" |
| change_category | String | Classification of change type | "safety_enhancement" |
| summary | Text | Description of modifications | "Added explicit red-teaming protocols" |

**Change Categories:**
- `safety_enhancement`: Addition/strengthening of safety protocols
- `scope_expansion`: Extension to new AI modalities or use cases
- `compliance_add`: New regulatory compliance measures
- `policy_hardening`: Stricter requirements or testing
- `governance_add`: New oversight or governance mechanisms

**Data Quality Notes:**
- Changes sourced from explicit policy documents where possible
- Dates are publication dates; internal review dates not available
- Categorization performed by domain expert review + NLP classification

---

## Dataset 4: Governance Indicators (governance_indicators.json / governance_indicators.csv)

**Source:** World Bank Worldwide Governance Indicators API  
**URL:** https://data.worldbank.org/  
**Format:** JSON / CSV  
**Records:** 5 (mock); production: 150+ (countries × years)  
**Update Frequency:** Annually (World Bank releases)  

| Field | Type | Description | Example | Range |
|-------|------|-------------|---------|-------|
| country | String | Country name | "US" | - |
| year | Integer | Year of measurement | 2023 | 1996-present |
| regulatory_quality | Float | Regulatory quality index | 1.42 | -2.5 to +2.5 |
| rule_of_law | Float | Rule of law index | 1.50 | -2.5 to +2.5 |
| control_corruption | Float | Control of corruption index | 1.33 | -2.5 to +2.5 |
| ai_regulation_index | Integer | Derived AI-specific regulation index | 65 | 0-100 |

**Index Descriptions (World Bank):**
- **Regulatory Quality:** Reflects government's ability to formulate and implement sound policies
- **Rule of Law:** Reflects confidence in institutions and respect for contracts
- **Control of Corruption:** Measures perception of public sector corruption

**Data Quality Notes:**
- World Bank indices are standard errors-in-variables estimates (±0.5 precision typical)
- AI regulation index is derived metric (custom calculation based on country AI policy framework maturity)
- Missing values: Imputed using last-observation-carried-forward (LOCF) method
- Source: https://info.worldbank.org/governance/wgi/

---

## Data Storage Schema

### PostgreSQL Tables (Production)

```sql
-- Companies
CREATE TABLE companies (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  industry VARCHAR(100),
  country CHAR(2),
  employees INT,
  founded INT,
  sector_code VARCHAR(10),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Policies
CREATE TABLE policies (
  id VARCHAR(50) PRIMARY KEY,
  company_id VARCHAR(50) REFERENCES companies(id),
  title VARCHAR(255),
  version VARCHAR(20),
  publish_date DATE,
  summary TEXT,
  key_topics TEXT[],
  compliance_score INT CHECK (compliance_score >= 0 AND compliance_score <= 100),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Policy Changes (Timeline)
CREATE TABLE policy_changes (
  id VARCHAR(50) PRIMARY KEY,
  company_id VARCHAR(50) REFERENCES companies(id),
  change_date DATE,
  version_old VARCHAR(20),
  version_new VARCHAR(20),
  change_category VARCHAR(50),
  change_summary TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Governance Metrics
CREATE TABLE governance_metrics (
  id SERIAL PRIMARY KEY,
  country CHAR(2),
  measurement_year INT,
  regulatory_quality FLOAT,
  rule_of_law FLOAT,
  control_corruption FLOAT,
  ai_regulation_index INT,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(country, measurement_year)
);
```

---

## Data Lineage & Processing

```
Raw Data Sources
    ↓
[scripts/ingest_data.py] → JSON/CSV Files (data/raw/)
    ↓
[scripts/preprocess.py] → Cleaned Data (data/processed/)
    ↓
[scripts/analyze.py] → Analysis Results (data/results/)
    ↓
[PostgreSQL/MongoDB] → Persistent Storage
    ↓
[FastAPI Backend] → API Endpoints
    ↓
[React Frontend] → User Dashboard
```

---

## Data Quality & Limitations

### Known Issues
1. **Policy Completeness:** Not all companies publish formal AI ethics policies; some are implicit in broader governance frameworks
2. **Temporal Coverage:** Policy history before 2020 is sparse; Wayback Machine snapshots may be incomplete
3. **Standardization:** Policy document formats vary widely; NLP extraction may miss implicit content
4. **Geographic Bias:** Dataset focuses on US/EU companies; limited coverage of Asian and emerging market companies

### Mitigation Strategies
- Document data provenance and collection methodology
- Use multiple NLP models for cross-validation
- Include confidence scores in results
- Acknowledge limitations in final report

---

## Access & Reproducibility

### Required Files
- `data/raw/companies.json`
- `data/raw/policies.json`
- `data/raw/policy_timeline.json`
- `data/raw/governance_indicators.json`

### Loading Data (Python)
```python
import json
with open('data/raw/companies.json') as f:
    companies = json.load(f)
```

### Loading Data (SQL)
```sql
-- After running scripts/ingest_data.py
SELECT * FROM companies WHERE country = 'US';
SELECT * FROM policies ORDER BY compliance_score DESC;
SELECT * FROM policy_changes WHERE change_category = 'safety_enhancement';
```

---

## References

- World Bank Governance Indicators: https://data.worldbank.org/
- EU NACE Classification: https://ec.europa.eu/eurostat/
- ISO 3166-1 Country Codes: https://www.iso.org/iso-3166-country-codes.html

---

**Last Updated:** 21 April 2026  
**Version:** 1.0  
**Data Custodian:** AI Ethics Research Team
