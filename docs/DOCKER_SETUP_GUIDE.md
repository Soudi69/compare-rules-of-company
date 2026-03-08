# 🐳 AI Rules Analyzer - Docker & Containerization Complete!

> **Your application is now fully containerized and ready to test!**

## 🚀 Quick Start (Choose Your Method)

### Method 1: **One-Command Setup** (Recommended for macOS/Linux)

```bash
cd /Users/soudi/Documents/GitHub/compare-rules-of-company
chmod +x START_DOCKER.sh
./START_DOCKER.sh
```

This script will:
1. ✅ Check for Docker, Docker Compose, and Ollama
2. ✅ Download Llama 2 model if needed (4GB)
3. ✅ Build all Docker images
4. ✅ Start all 3 containers
5. ✅ Wait for health checks
6. ✅ Show you access URLs

**Result:** Application runs at `http://localhost:5173` 🎉

---

### Method 2: **Manual Docker Commands**

```bash
cd /Users/soudi/Documents/GitHub/compare-rules-of-company

# 1. Check Docker is installed
docker --version

# 2. Download Llama 2 model (if not already done)
ollama pull llama2

# 3. Build all containers
docker-compose build

# 4. Start services
docker-compose up -d

# 5. View logs (optional)
docker-compose logs -f
```

Wait for services to start, then open http://localhost:5173

---

### Method 3: **Windows (Without WSL)**

Run the batch file:

```cmd
cd C:\path\to\project
docker-compose-setup.bat
```

---

## 📋 Prerequisites Installation

**Don't have Docker or Ollama yet?** Use these scripts:

### macOS
```bash
chmod +x install-prerequisites-mac.sh
./install-prerequisites-mac.sh
```

### Linux (Ubuntu/Debian)
```bash
chmod +x install-prerequisites-linux.sh
sudo ./install-prerequisites-linux.sh
```

### Windows
Double-click: `install-prerequisites-windows.bat`

---

## 🌐 What You Get (3 Containers)

| Container | Purpose | Port | Health Check |
|-----------|---------|------|--------------|
| **ollama** | Llama 2 LLM Server | 11434 | `/api/tags` |
| **backend** | FastAPI REST API | 8000 | `/health` |
| **frontend** | React Web UI | 5173 | HTTP GET `/` |

### 🔗 Service Architecture

```
[Your Browser]
        ↓
   [Frontend - React]
   (http://localhost:5173)
        ↓
   [Backend - FastAPI]
   (http://localhost:8000)
        ↓
   [Ollama - Llama2]
   (http://localhost:11434)
```

---

## 🎯 Access Your Application

After services start, open:

| URL | Purpose |
|-----|---------|
| `http://localhost:5173` | **Main Application UI** |
| `http://localhost:8000/docs` | **API Documentation (Swagger)** |
| `http://localhost:11434` | **Ollama LLM Server** |

---

## 📊 Docker Container Status

Check running containers:

```bash
docker-compose ps
```

Expected output:
```
NAME               STATUS              PORTS
ai-rules-ollama    Up (healthy)        0.0.0.0:11434→11434/tcp
ai-rules-backend   Up (healthy)        0.0.0.0:8000→8000/tcp
ai-rules-frontend  Up (healthy)        0.0.0.0:5173→5173/tcp
```

---

## 🔧 Useful Docker Commands

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f ollama

# Last 50 lines
docker-compose logs --tail 50 backend
```

### Control Services
```bash
# Stop (keeps data)
docker-compose stop

# Start
docker-compose start

# Restart
docker-compose restart

# Remove everything (deletes containers, keeps volumes)
docker-compose down

# Remove everything including data
docker-compose down -v
```

### Rebuild
```bash
# Full rebuild without cache
docker-compose build --no-cache
docker-compose up -d
```

---

## 📁 Project Structure

```
compare-rules-of-company/
├── 🐳 Docker Files
│   ├── Dockerfile.backend         # Python FastAPI container
│   ├── Dockerfile.frontend        # Node React container
│   ├── Dockerfile.ollama         # Ollama container
│   ├── docker-compose.yml        # Orchestration config
│   ├── .dockerignore            # Build exclusions
│   ├── START_DOCKER.sh          # One-click launcher ⭐
│   ├── docker-compose-setup.sh  # Manual setup script
│   └── docker-compose-setup.bat # Windows setup
│
├── 📚 Documentation
│   ├── DOCKER_QUICK_START.md    # This file
│   ├── DOCKER_GUIDE.md          # Detailed Docker guide
│   ├── README.md                # Project overview
│   └── ...
│
├── 🔧 Installation Scripts
│   ├── install-prerequisites-mac.sh
│   ├── install-prerequisites-linux.sh
│   └── install-prerequisites-windows.bat
│
├── 📂 backend/                   # FastAPI application
│   ├── main.py
│   ├── requirements.txt
│   └── ...
│
└── 📂 frontend/                  # React application
    ├── package.json
    ├── vite.config.ts
    └── ...
```

---

## 🐛 Troubleshooting

### "Cannot connect to Docker daemon"
```bash
# Start Docker Desktop (macOS/Windows)
# Or on Linux:
sudo systemctl start docker
```

### "Port already in use (8000, 5173, etc)"
```bash
# Find process using port 8000
lsof -i :8000

# Kill it
kill -9 <PID>

# Or change port in docker-compose.yml
```

### "Ollama not found"
```bash
# Install Ollama
# macOS/Linux: https://ollama.ai
# Windows: https://ollama.ai

# Then download model
ollama pull llama2
```

### Container exits immediately
```bash
# Check logs
docker-compose logs backend

# Rebuild
docker-compose build --no-cache backend
```

### "Health check failed"
```bash
# Wait a bit longer (first run can take 3-5 minutes)
docker-compose ps

# Check logs
docker-compose logs ollama
```

### Out of disk space
```bash
# Remove unused images
docker image prune -a

# Remove unused volumes
docker volume prune

# See what's using space
docker system df
```

---

## ✅ Testing the Application

### Test 1: Services Running
```bash
docker-compose ps
# All containers should show "Up (healthy)"
```

### Test 2: Backend API
```bash
curl http://localhost:8000/health
# Should return: {"status":"ok"}
```

### Test 3: Open UI
1. Go to http://localhost:5173
2. Should see the search form

### Test 4: Full Analysis
1. Search for "OpenAI"
2. Click "Analyze"
3. Wait 30-60 seconds
4. See compliance analysis with:
   - Red flags
   - Timeline of changes
   - Compliance recommendations

---

## 📊 What's Containerized

### Backend Container
- **Base Image:** `python:3.11-slim`
- **Framework:** FastAPI
- **Port:** 8000
- **Features:**
  - REST API endpoints
  - CORS support
  - Ollama integration
  - Health checks

### Frontend Container
- **Base Image:** `node:18-alpine` (multi-stage)
- **Framework:** React 18
- **Build Tool:** Vite
- **Port:** 5173
- **Features:**
  - Beautiful dark UI
  - Real-time analysis
  - Responsive design

### Ollama Container
- **Base Image:** `ollama/ollama:latest`
- **Model:** Llama 2 (7B parameters)
- **Port:** 11434
- **Features:**
  - Local LLM inference
  - No external APIs
  - Persistent storage

---

## 🎯 Docker Features Implemented

✅ **Health Checks** - Auto-restart on failure
✅ **Service Dependencies** - Correct startup order
✅ **Networking** - Internal service communication
✅ **Volumes** - Data persistence across restarts
✅ **Environment Variables** - Configuration management
✅ **Multi-stage Builds** - Optimized frontend image
✅ **Docker Compose** - One-command orchestration
✅ **.dockerignore** - Clean builds

---

## 💡 Pro Tips

1. **First Run Takes Time**
   - Ollama model loading: 1-2 minutes
   - First inference: 30-60 seconds
   - Subsequent requests: 20-40 seconds

2. **Keep Ollama Data**
   - Named volume `ollama_data` persists models
   - Don't use `docker-compose down -v` unless you want to delete data

3. **Check Logs Regularly**
   - Helps debug issues
   - Shows LLM processing

4. **Monitor Resources**
   - Use `docker stats` to see CPU/memory
   - Ollama uses GPU if available

5. **Clean Up Space**
   - `docker system prune` removes unused images
   - Only do when you're sure you won't need them

---

## 📚 More Documentation

| Document | Purpose |
|----------|---------|
| **DOCKER_QUICK_START.md** | Quick reference for Docker commands |
| **DOCKER_GUIDE.md** | Detailed Docker documentation |
| **README.md** | Project overview |
| **GETTING_STARTED.md** | Initial setup guide |
| **DEPLOYMENT.md** | Production deployment |

---

## 🎉 You're All Set!

Your containerized application is ready to run!

### Quick Commands to Remember:

```bash
# Start everything
./START_DOCKER.sh

# View logs
docker-compose logs -f

# Stop services
docker-compose stop

# Remove everything
docker-compose down
```

---

## 🆘 Still Need Help?

1. Check **DOCKER_GUIDE.md** for detailed information
2. View logs: `docker-compose logs -f`
3. Verify Docker installation: `docker --version`
4. Check Ollama: `ollama list`
5. Review individual Dockerfiles for comments

---

**Happy analyzing! 🚀**

*Transform company AI ethics documentation into clear, actionable compliance insights.*

---

**Last updated:** 2024
**Version:** 1.0
