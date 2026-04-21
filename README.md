# Apte: AI Principle Tracker Ethos

> **APTE** (AI Principle Tracker Ethos) - A comprehensive data-driven analysis of AI ethics policies across sectors and time, combining NLP, governance indicators, and temporal dynamics.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.11+](https://img.shields.io/badge/python-3.11+-blue)](https://www.python.org/downloads/)
[![React 18+](https://img.shields.io/badge/react-18+-61dafb)](https://reactjs.org/)

---

## 📋 Overview

**Project Name:** Apte (AI Principle Tracker Ethos)  
**Project Type:** Data-Driven AI Analysis (Team-based terminal assessment)  
**Duration:** 42 days (21 April – 24 April 2026)  
**Team Size:** 3–4 students  
**Module:** Programming for AI (MSCAI1/MSCAI1B)  
**Institution:** National College of Ireland  

### Research Question
*How do corporate AI ethics policies evolve across different industries and time periods, and what organizational/sectoral factors predict the stringency and comprehensiveness of AI governance frameworks?*

---

## 🎯 Learning Outcomes Addressed

| LO | Addressed By |
|----|--------------|
| **LO1** - AI programming languages/environments | Python, FastAPI, React, PostgreSQL, Docker |
| **LO2** - Challenges in implementing AI solutions | Data quality, NLP preprocessing, model selection |
| **LO3** - Software design for AI requirements | Full-stack architecture, ETL pipeline, API design |
| **LO4** - Evaluate & implement AI solutions | NLP analysis, clustering, trend forecasting |

---

## 🚀 Quick Start

### Prerequisites
- Python 3.11+
- Node.js 18+
- Docker & Docker Compose (optional)
- Git

### Local Development

**Terminal 1: Backend**
```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

**Terminal 2: Frontend**
```bash
cd frontend
npm install
npm run dev
```

**Access:** http://localhost:5173

### Docker Deployment

```bash
cd docker
docker-compose up -d
# Access: http://localhost:5173 (frontend), http://localhost:8000 (API)
```

---

## 📊 Data Pipeline

```bash
cd backend

# 1. Ingest data
python scripts/ingest_data.py

# 2. Preprocess & clean
python scripts/preprocess.py

# 3. Run analysis
python scripts/analyze.py
```

---

## 📁 Project Structure

```
compare-rules-of-company/
├── backend/                  # FastAPI + data pipeline
│   ├── scripts/
│   │   ├── ingest_data.py   # Fetch datasets
│   │   ├── preprocess.py    # Clean & transform
│   │   └── analyze.py       # NLP analysis
│   └── main.py              # API server
├── frontend/                 # React + TypeScript dashboard
│   └── src/
│       ├── components/       # UI components
│       └── context/          # State management
├── data/
│   ├── DATA_DICTIONARY.md   # Field descriptions
│   ├── raw/                 # Original datasets
│   └── processed/           # Analysis output
├── docker/                   # Containerization
│   └── docker-compose.yml
├── docs/
│   ├── PROJECT_BRIEF.md     # Overview
│   ├── REPORT_TEMPLATE.md   # IEEE report
│   └── API_DOCUMENTATION.md # API specs
└── README.md                 # This file
```

---

## 📈 Key Features

✅ **Multi-Dataset Integration** — 4 complementary datasets (policies, governance, metadata, timeline)  
✅ **NLP Analysis** — Sentiment, keyword detection, policy clustering  
✅ **Interactive Dashboard** — Login, company search, policy visualization  
✅ **End-to-End Pipeline** — Data ingestion → analysis → visualization  
✅ **Reproducible Workflow** — Documented scripts, Docker containerization  
✅ **Academic Rigor** — Proper methodology, evaluation metrics, limitations acknowledged  

---

## 🏆 Rubric Alignment

| Criterion | Weight | Status |
|-----------|--------|--------|
| Novelty of idea | 20% | ✓ Novel multi-dataset approach |
| Novelty in datasets | 10% | ✓ 4-dataset integration |
| Novelty in methods | 10% | ✓ End-to-end pipeline with NLP |
| Significance | 15% | ✓ Clear motivation & impact |
| Impact & usefulness | 15% | ✓ Practical dashboard tool |
| Datasets & preprocessing | 10% | ✓ Rigorous data management |
| Model implementation | 10% | ✓ Multiple models & metrics |
| Academic presentation | 10% | ✓ IEEE format, proper citations |

---

## 📝 Deliverables

### 1. Project Report (3,000 words, IEEE format)
→ `REPORT_TEMPLATE.md`

### 2. Video Presentation (≤10 min, MP4)
→ All team members; screen demos; key findings

### 3. Code Artefact (Single ZIP file)
→ All source code, data, scripts, config

### 4. Individual Project Journals (PDF per student)
→ `JOURNAL_TEMPLATE.md` (**MANDATORY**)

**Deadline:** 24 April 2026, 23:59 IST

---

## � API Endpoints

```
GET    /health              — Health check
POST   /analyze             — Analyze company ({"company_name": "OpenAI"})
GET    /companies           — List companies
GET    /policies            — All policies
GET    /trends              — Evolution trends
```

---

## 📚 Documentation

| File | Purpose |
|------|---------|
| `PROJECT_BRIEF.md` | High-level overview & architecture |
| `REPORT_TEMPLATE.md` | IEEE-formatted research paper (3000 words) |
| `JOURNAL_TEMPLATE.md` | Individual contribution log (per student) |
| `data/DATA_DICTIONARY.md` | Field descriptions & schemas |
| `docs/API_DOCUMENTATION.md` | API endpoint specifications |

---

## ✅ Before Submission Checklist

- [ ] Backend starts without errors
- [ ] Frontend loads & connects to API
- [ ] Data pipeline runs end-to-end
- [ ] Report written (3000 words, IEEE format)
- [ ] Video recorded (≤10 min, all members present)
- [ ] Code archived as single ZIP
- [ ] Individual journals submitted by each student
- [ ] No plagiarism (Turnitin screening)
- [ ] All files uploaded to correct Moodle links
- [ ] Deadline: **24 April 2026, 23:59 IST**

---

## 🎨 Tech Stack

**Backend:** Python 3.11, FastAPI, PostgreSQL, scikit-learn, spaCy  
**Frontend:** React 18, TypeScript, Vite, TailwindCSS, Lucide Icons  
**DevOps:** Docker, Docker Compose  
**Data:** JSON, CSV, PostgreSQL  

---

## 📄 License

MIT License — See `LICENSE` file

---

## 📧 Support

- See `docs/` for detailed documentation
- Check `TROUBLESHOOTING.md` for common issues
- Update project journals regularly (don't wait until deadline!)

---

**Last Updated:** 21 April 2026  
**Submission Deadline:** 24 April 2026  
**Module:** Programming for AI (MSCAI1/MSCAI1B)

*Built by AI Ethics Research Team — National College of Ireland*
| `cd docker && docker-compose down` | Remove everything |

## 📚 Documentation

See `docs/` folder for:
- Setup guides (local development)
- Docker documentation
- API reference
- Troubleshooting

## 🔗 URLs

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:5173 | Web interface |
| API | http://localhost:8000 | FastAPI server |
| Docs | http://localhost:8000/docs | Interactive API docs |

## 🧠 How It Works

1. **Frontend** (React): You search for a company
2. **Backend** (FastAPI): Processes the request
3. **LLM** (Ollama/Llama2): Analyzes the ethics rules
4. **Results**: Displayed with change analysis

## 📊 Pre-loaded Companies

- OpenAI
- Google
- Microsoft
- Meta
- Amazon

## ⚙️ Environment

First run takes 5-10 minutes to:
- Download Llama2 model (4GB)
- Build containers
- Initialize services

Subsequent runs start in seconds.

## 🐛 Troubleshooting

**Docker not running?**
- Open Docker Desktop application

**Port already in use?**
- Edit `docker/docker-compose.yml` and change port mappings

**Out of disk space?**
- Llama2 model requires 4GB
- Run `docker system prune` to clean up

For more help, see `docs/TROUBLESHOOTING.md`

## 📝 License

This project is for educational purposes.

---

**Ready to analyze?** Run `./run.sh` and open http://localhost:5173 🚀
