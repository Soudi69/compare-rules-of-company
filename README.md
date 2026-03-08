# AI Company Ethics Rules Analyzer

Analyze how AI ethics rules have changed across major tech companies over time using Llama 2 LLM.

## 🚀 Quick Start

### Requirements
- [Docker Desktop](https://www.docker.com/products/docker-desktop) installed and running
- ~5GB disk space for Llama2 model
- Internet connection (first run only, for model download)

### Run It Now

```bash
chmod +x run.sh
./run.sh
```

Then open: **http://localhost:5173**

## ✨ Features

- 🔍 Search any major tech company
- 🤖 AI-powered analysis with Llama2
- 📊 Compare rule changes over time
- 🌙 Dark theme UI

## 📁 Project Structure

```
.
├── run.sh                    # Start everything
├── README.md                 # This file
├── frontend/                 # React web application
├── backend/                  # FastAPI server
├── docker/                   # Docker configuration
├── docs/                     # Documentation
├── configs/                  # Configuration files
├── assets/                   # Static files
└── llm/                      # LLM configurations
```

## 🛠️ Commands

| Command | Purpose |
|---------|---------|
| `./run.sh` | Start everything |
| `cd docker && docker-compose ps` | Check service status |
| `cd docker && docker-compose logs -f` | View live logs |
| `cd docker && docker-compose stop` | Stop services |
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
