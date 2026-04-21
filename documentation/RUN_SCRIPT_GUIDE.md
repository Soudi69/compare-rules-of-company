# 🚀 run.sh - Complete Project Execution Guide

Your `run.sh` script is a comprehensive all-in-one tool to manage your entire project. No need to remember complex commands!

---

## 🎯 Quick Start

### Option 1: Start with Docker (Easiest, Recommended)
```bash
./run.sh start
```
✅ Handles everything: setup, builds, pulls images, starts servers  
✅ One command to run the entire application  
⏱️ Takes 5-10 minutes first time (downloads 4GB Llama2 model)  
⏱️ Takes 30 seconds on subsequent runs

### Option 2: Local Development (No Docker)

**Terminal 1 - Start Backend:**
```bash
./run.sh backend
```

**Terminal 2 - Start Frontend:**
```bash
./run.sh frontend
```

✅ Faster startup (30 seconds total)  
⚠️ Requires Python 3.11+ and Node.js 18+

---

## 📚 All Commands

### 🚀 Main Commands

| Command | Purpose | Terminal |
|---------|---------|----------|
| `./run.sh start` | Start everything with Docker | 1 |
| `./run.sh local-start` | Setup for local development | 1 |
| `./run.sh backend` | Start backend server only | Separate |
| `./run.sh frontend` | Start frontend server only | Separate |

### 🔧 Setup

| Command | Purpose |
|---------|---------|
| `./run.sh setup` | Setup entire project (Python venv + Node modules) |
| `./run.sh setup-backend` | Setup only backend |
| `./run.sh setup-frontend` | Setup only frontend |

### 📊 Data Processing

| Command | Purpose | Notes |
|---------|---------|-------|
| `./run.sh ingest` | Load raw data from sources | Single pass |
| `./run.sh preprocess` | Clean & normalize data | Generates processed files |
| `./run.sh analyze` | Analyze data with ML/NLP | Generates reports |
| `./run.sh process-all` | Run full pipeline | ingest → preprocess → analyze |

### 🏗️ Build & Deploy

| Command | Purpose |
|---------|---------|
| `./run.sh build` | Build optimized frontend (production) |
| `./run.sh docker-build` | Build Docker containers locally |
| `./run.sh docker-stop` | Stop Docker containers |

### 🛠️ Utilities

| Command | Purpose |
|---------|---------|
| `./run.sh check` | Check if dependencies installed |
| `./run.sh clean` | Remove build artifacts & cache |
| `./run.sh help` | Show help message |

---

## 🌐 Access Points

Once running, access your application:

| Service | URL | Purpose |
|---------|-----|---------|
| **Frontend** | http://localhost:5173 | Main web app (React) |
| **Backend** | http://localhost:8000 | FastAPI server |
| **API Docs** | http://localhost:8000/docs | Interactive API documentation (Swagger) |
| **Alternative Docs** | http://localhost:8000/redoc | ReDoc documentation |

---

## 📋 Examples

### Complete Workflow Example

```bash
# First time setup
./run.sh setup

# Start backend in one terminal
./run.sh backend

# Start frontend in another terminal
./run.sh frontend

# Open http://localhost:5173 in your browser
```

### Data Processing Example

```bash
# Setup if not done
./run.sh setup

# Process all data in one command
./run.sh process-all

# Or step by step
./run.sh ingest       # Load raw data
./run.sh preprocess   # Clean & normalize
./run.sh analyze      # Generate insights
```

### Production Build Example

```bash
./run.sh setup
./run.sh build        # Creates optimized dist/ folder
ls frontend/dist/     # See production files
```

### Docker Workflow

```bash
# First time (takes 5-10 min)
./run.sh start

# Subsequent times (takes 30 sec)
./run.sh start

# Stop containers
./run.sh docker-stop

# View logs (while running)
docker-compose logs -f
```

---

## 🛠️ Requirements

### For Local Development
- **Python 3.11+** - Check: `python3 --version`
- **Node.js 18+** - Check: `node --version`
- **npm** - Check: `npm --version`

### For Docker Mode
- **Docker Desktop** - Download from https://www.docker.com/products/docker-desktop
- Must be running before using `./run.sh start`

---

## ⚡ Performance Tips

### Fastest Startup
```bash
./run.sh backend    # Takes ~3 seconds
./run.sh frontend   # Takes ~5 seconds
```
✅ Total: ~8 seconds to be productive

### Docker Startup
First run: 5-10 minutes (downloads 4GB Llama2 model)  
Subsequent: 30 seconds

### Data Processing
- **Ingest**: ~5 seconds
- **Preprocess**: ~10 seconds
- **Analyze**: ~15 seconds
- **All three**: ~30 seconds

---

## 🐛 Troubleshooting

### "Docker daemon not running"
```bash
# Solution 1: Start Docker Desktop
# Then try: ./run.sh start

# Solution 2: Use local development instead
./run.sh backend
./run.sh frontend
```

### "Python command not found"
```bash
# Install Python 3.11+
# macOS: brew install python@3.11
# Then try: ./run.sh backend
```

### "npm command not found"
```bash
# Install Node.js 18+
# macOS: brew install node@18
# Then try: ./run.sh frontend
```

### Backend won't start ("Address already in use")
```bash
# Another process is using port 8000
# Find and kill it:
lsof -i :8000
kill -9 <PID>

# Then try: ./run.sh backend
```

### Frontend won't start ("Address already in use")
```bash
# Another process is using port 5173
# Find and kill it:
lsof -i :5173
kill -9 <PID>

# Then try: ./run.sh frontend
```

### "requirements.txt not found"
Ensure you're in the correct project directory:
```bash
cd /Users/soudi/Documents/GitHub/compare-rules-of-company
./run.sh backend
```

---

## 📂 Directory Structure

The script manages these directories:

```
project/
├── run.sh              ← This script
├── backend/
│   ├── .venv/          ← Python virtual environment (created by ./run.sh)
│   ├── requirements.txt
│   ├── main.py
│   └── scripts/
│       ├── ingest_data.py
│       ├── preprocess.py
│       └── analyze.py
├── frontend/
│   ├── node_modules/   ← Node packages (created by ./run.sh)
│   ├── package.json
│   ├── src/
│   └── dist/           ← Production build (created by ./run.sh build)
├── data/
│   ├── raw/            ← Input data
│   ├── processed/      ← Processed data
│   └── logs/           ← Processing logs
└── docker/
    └── docker-compose.yml
```

---

## 🚀 Next Steps

1. **First time?** Run: `./run.sh setup`
2. **Want to code?** Run: `./run.sh backend` + `./run.sh frontend`
3. **Processing data?** Run: `./run.sh process-all`
4. **Ready to ship?** Run: `./run.sh build`
5. **Running everything?** Run: `./run.sh start` (Docker)

---

## 📞 Support

For detailed command output, add `2>&1` to see both stdout and stderr:
```bash
./run.sh backend 2>&1
```

To see what the script is doing, open `run.sh` in an editor and read the comments.

---

## 🎓 Script Features

✅ **Automatic Setup** - Creates venv, installs deps automatically  
✅ **Color Output** - Easy to read, emoji indicators  
✅ **Error Handling** - Exits on first error, doesn't continue  
✅ **Flexible** - Works with Docker or local development  
✅ **Data Pipeline** - One command for entire processing  
✅ **Production Build** - Optimized output for deployment  
✅ **Cross-platform** - Works on macOS, Linux, Windows (Git Bash)  

---

**Last Updated:** 21 April 2026  
**Version:** 2.0 (Enhanced Multi-Purpose)
