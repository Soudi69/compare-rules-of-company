# AI Ethics Policy Analyzer: A Comparative Study of Corporate AI Governance

## Project Overview

**Research Question:** How do ethical AI policies evolve across different industries and time periods, and what organizational/sectoral factors predict the stringency and comprehensiveness of AI governance frameworks?

**Significance:** As AI adoption accelerates globally, corporate AI ethics policies have become critical stakeholder artifacts. However, few systematic studies analyze their evolution, comparative rigor, and predictive indicators. This project addresses this gap by combining textual analysis, temporal dynamics, and cross-sector comparison to reveal patterns in AI governance maturity.

**Project Type:** Data-Driven AI Analysis with Multi-Dataset Integration  
**Team Size:** 3-4 students  
**Duration:** 42 days  
**Submission Date:** 24 April 2026

---

## Learning Outcomes Addressed

| LO | Addressed By |
|----|----|
| **LO1** - Analyse & evaluate AI programming languages/environments | Python, FastAPI, React; Docker containerization; database systems (PostgreSQL/MongoDB) |
| **LO2** - Assess challenges in implementing AI solutions | Data quality, NLP preprocessing, model selection, privacy concerns with corporate policies |
| **LO3** - Design & implement software for AI requirements | Full-stack architecture; ETL pipeline; API design; deployment considerations |
| **LO4** - Evaluate, design, implement AI solutions | NLP sentiment analysis; clustering algorithms; policy classification; trend forecasting |

---

## Datasets & Scope

### Dataset 1: Corporate AI Policy Corpus (Web-Scraped)
- **Source:** Company websites, GitHub repositories, public ethics boards
- **Records:** 150+ company policies (1000+ paragraphs after splitting)
- **Format:** Semi-structured (HTML/PDF → text extraction)
- **Fields:** company_name, industry, policy_text, publish_date, version

### Dataset 2: World Bank Governance Indicators
- **Source:** https://data.worldbank.org/
- **Records:** 1000+ (countries × years)
- **Format:** JSON/CSV via API
- **Fields:** country, year, regulatory_quality, rule_of_law, control_of_corruption

### Dataset 3: Company Financial & Sectoral Data
- **Source:** https://data.gov.ie/dataset?res_format=JSON
- **Records:** 500+ companies with sector/size classification
- **Format:** JSON
- **Fields:** company_id, sector, employees, founded_year, revenue

### Dataset 4: Temporal Policy Change Log
- **Source:** Version control, Wayback Machine snapshots
- **Records:** 2000+ version history entries
- **Format:** CSV (parsed from diffs)
- **Fields:** company_id, date, change_type, policy_section, modification

---

## Technical Architecture

### Tech Stack
- **Backend:** FastAPI (Python), PostgreSQL/MongoDB
- **Frontend:** React + TypeScript + Vite (Dashboard)
- **Data Pipeline:** Python (pandas, scikit-learn, spaCy)
- **Containerization:** Docker + Docker Compose
- **ML/NLP:** spaCy, transformers, scikit-learn

### Workflow

```
┌─────────────────┐
│  Data Ingestion │ (Web scraping, API calls)
└────────┬────────┘
         │
┌─────────▼────────┐
│  Storage (DB)    │ (PostgreSQL: raw policies & metadata)
└────────┬────────┘
         │
┌─────────▼────────────────┐
│  Preprocessing & Cleaning│ (NLP tokenization, stopword removal, lemmatization)
└────────┬────────────────┘
         │
┌─────────▼──────────────────┐
│  Feature Engineering       │ (Sentiment, complexity, coverage metrics)
└────────┬──────────────────┘
         │
┌─────────▼─────────────────────────────────┐
│  Analysis & Modeling                      │
│  - Clustering: K-means on policy profiles │
│  - Trends: Time-series analysis           │
│  - Classification: Governance rigor       │
└────────┬─────────────────────────────────┘
         │
┌─────────▼────────────────────┐
│  Visualization & Reporting   │ (Dashboards, charts, statistics)
└────────┬────────────────────┘
         │
┌─────────▼─────────────────┐
│  Output Storage (DB)      │ (Results, metrics, insights)
└──────────────────────────┘
```

---

## Project Deliverables

### 1. **Project Report** (3000 words, IEEE format)
- Abstract, Introduction, Related Work, Methodology, Results, Conclusions, Bibliography

### 2. **Video Presentation** (≤10 minutes)
- Problem statement, approach, findings, impact demonstration

### 3. **Code Artefact** (Single ZIP file)
- `backend/` - API, data pipeline, models
- `frontend/` - Dashboard
- `data/` - Preprocessed data samples, data dictionary
- `scripts/` - Setup, ingestion, analysis notebooks
- `docker-compose.yml`, `README.md`, `requirements.txt`

### 4. **Individual Project Journals** (PDF per student)
- Task tracking, time spent, challenges, resolutions

---

## How to Run

### Quick Start (Docker)
```bash
cd docker
bash docker-start.sh
# Access: http://localhost:5173 (frontend)
#         http://localhost:8000 (API)
```

### Local Development
```bash
# Backend
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python -m uvicorn main:app --reload

# Frontend
cd frontend
npm install
npm run dev
```

### Data Pipeline
```bash
cd backend
python scripts/ingest_data.py      # Fetch & store datasets
python scripts/preprocess.py        # Clean & transform
python scripts/analyze.py           # Run analysis
```

---

## Key Differentiators (Novelty)

1. **Novel Research Question:** Systematic analysis of policy evolution is understudied; most work is qualitative or single-company case studies.
2. **Multi-Dataset Integration:** Combines textual policies, governance indicators, financial data, and temporal changes—no prior work integrates all four.
3. **Technical Approach:** End-to-end pipeline with NLP + clustering + trend forecasting; moves beyond simple keyword search.
4. **Practical Impact:** Dashboard enables corporate risk teams and policymakers to benchmark and forecast AI governance maturity.

---

## Team Roles (Example)
- **Student 1:** Data ingestion, database design, ETL pipeline
- **Student 2:** NLP preprocessing, clustering analysis, feature engineering
- **Student 3:** Dashboard frontend, visualization, API design

---

## References & Resources
- IEEE Conference Templates: https://www.ieee.org/conferences_events/conferences/publishing/templates.html
- World Bank Data: https://data.worldbank.org/
- Open Data Portals: https://data.gov.ie/, https://catalog.data.gov/
- Academic Integrity Guide: https://libguides.ncirl.ie/academicintegrity

---

## Status
- **Project Start:** 21 April 2026
- **Submission Deadline:** 24 April 2026 (Updated with extended timeline)
- **Report Format:** PDF (IEEE)
- **Code Format:** ZIP archive
- **Presentation Format:** MP4 (≤10 min)

---

**Maintained by:** AI Ethics Policy Analysis Team  
**Last Updated:** 21 April 2026
