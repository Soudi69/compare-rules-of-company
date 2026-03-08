# 🐳 Complete Docker Setup - Quick Start

## ⚡ Ultra-Quick Start (5 minutes)

### Prerequisites Check
You need:
- ✅ Docker Desktop installed
- ✅ Ollama installed
- ✅ Project files downloaded

### One-Command Launch

```bash
# macOS/Linux
chmod +x docker-compose-setup.sh && ./docker-compose-setup.sh

# Windows (PowerShell)
.\docker-compose-setup.bat
```

Done! Services will start automatically.

---

## 📋 Prerequisites Installation

### Choose Your Operating System

#### 🍎 macOS
```bash
chmod +x install-prerequisites-mac.sh
./install-prerequisites-mac.sh
```

Then download:
- Docker Desktop: https://www.docker.com/products/docker-desktop
- Ollama: https://ollama.ai

#### 🐧 Linux (Ubuntu/Debian)
```bash
chmod +x install-prerequisites-linux.sh
sudo ./install-prerequisites-linux.sh
```

#### 🪟 Windows
- Run: `install-prerequisites-windows.bat`
- Then download and install:
  - Docker Desktop: https://www.docker.com/products/docker-desktop
  - Ollama: https://ollama.ai

---

## 🚀 Full Docker Setup Steps

### Step 1: Install Docker Desktop (GUI)

**macOS & Windows:**
1. Visit: https://www.docker.com/products/docker-desktop
2. Download for your OS
3. Install and launch
4. Verify:
```bash
docker --version
docker-compose --version
```

**Linux:**
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
```

### Step 2: Download Llama 2 Model

```bash
# Download once (4GB file)
ollama pull llama2

# Verify
ollama list
```

### Step 3: Start Services

**Automated Setup (Recommended):**

```bash
cd /Users/soudi/Documents/GitHub/compare-rules-of-company

# macOS/Linux
chmod +x docker-compose-setup.sh
./docker-compose-setup.sh

# Windows
docker-compose-setup.bat
```

**Manual Setup:**

```bash
cd /Users/soudi/Documents/GitHub/compare-rules-of-company

# Build images
docker-compose build

# Start services
docker-compose up -d

# Watch startup
docker-compose logs -f
```

### Step 4: Verify Services

```bash
# Check status
docker-compose ps

# Expected output:
# NAME               STATUS              PORTS
# ai-rules-ollama    Up (healthy)        0.0.0.0:11434→11434/tcp
# ai-rules-backend   Up (healthy)        0.0.0.0:8000→8000/tcp
# ai-rules-frontend  Up (healthy)        0.0.0.0:5173→5173/tcp
```

### Step 5: Access Application

Open your browser:
- **Frontend:** http://localhost:5173
- **API Docs:** http://localhost:8000/docs
- **Ollama API:** http://localhost:11434/api/tags

---

## 📊 What Gets Containerized

### Three Docker Containers:

```
1. OLLAMA (LLM Server)
   - Image: ollama/ollama:latest
   - Port: 11434
   - Volume: ollama_data (persists models)
   - Health: /api/tags endpoint

2. BACKEND (FastAPI)
   - Image: python:3.11-slim
   - Port: 8000
   - Depends on: Ollama
   - Health: /health endpoint

3. FRONTEND (React)
   - Image: node:18-alpine
   - Port: 5173
   - Depends on: Backend
   - Health: HTTP request to root
```

### Network:
- All connected via `ai-rules-network`
- Service-to-service communication enabled
- Backend talks to Ollama as `http://ollama:11434`

---

## 🎯 Common Docker Commands

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f ollama

# Last 50 lines
docker-compose logs --tail 50
```

### Stop/Start Services
```bash
# Stop all (keeps containers)
docker-compose stop

# Start all
docker-compose start

# Restart all
docker-compose restart

# Stop and remove everything
docker-compose down

# Stop and remove everything including volumes
docker-compose down -v
```

### Check Services
```bash
# Status
docker-compose ps

# Resource usage
docker stats

# Detailed info
docker-compose ps --all
```

### Execute Commands
```bash
# Python command in backend
docker-compose exec backend python -c "import sys; print(sys.version)"

# npm in frontend
docker-compose exec frontend npm list

# Shell access
docker-compose exec backend bash
docker-compose exec frontend sh
```

### Rebuild Images
```bash
# Rebuild without cache (forces fresh build)
docker-compose build --no-cache

# Rebuild specific service
docker-compose build --no-cache backend

# Then restart
docker-compose up -d
```

---

## 🔍 Troubleshooting Docker

### Services won't start
```bash
# 1. Check logs
docker-compose logs

# 2. Try rebuild
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# 3. Check Docker daemon
docker ps
```

### "Cannot connect to Docker daemon"
```bash
# macOS: Start Docker Desktop (check Applications)
# Linux: sudo systemctl start docker
# Windows: Start Docker Desktop from Start menu
```

### Port already in use
```bash
# Find what's using port 8000
lsof -i :8000

# Kill it
kill -9 <PID>

# Or change port in docker-compose.yml
# Change "8000:8000" to "8001:8000"
```

### Container crashes on startup
```bash
# View full logs
docker-compose logs backend

# Check specific line
docker-compose logs backend | grep ERROR

# Get container ID
docker ps -a | grep backend

# Inspect container
docker inspect <container_id>
```

### Out of disk space
```bash
# Remove unused images
docker image prune -a

# Remove unused volumes
docker volume prune

# Remove stopped containers
docker container prune

# See what's taking space
docker system df
```

---

## 🚨 File Locations & Structure

```
compare-rules-of-company/
├── Dockerfile.backend           # Backend Python container
├── Dockerfile.frontend          # Frontend Node container
├── Dockerfile.ollama           # Ollama container
├── docker-compose.yml          # Container orchestration
├── docker-compose-setup.sh     # Automated setup (macOS/Linux)
├── docker-compose-setup.bat    # Automated setup (Windows)
├── .dockerignore               # Files to exclude from images
├── DOCKER_QUICK_START.md       # This file
├── DOCKER_GUIDE.md             # Detailed Docker guide
├── install-prerequisites-*.sh  # OS-specific installers
├── backend/                    # Backend source code
│   ├── main.py
│   ├── requirements.txt
│   └── ...
└── frontend/                   # Frontend source code
    ├── package.json
    ├── src/
    └── ...
```

---

## 🎯 Testing Your Setup

### Test 1: Services Running
```bash
docker-compose ps
# All should show "Up" status
```

### Test 2: Backend API
```bash
curl http://localhost:8000/health
# Should return: {"status":"ok"}
```

### Test 3: API Documentation
```bash
# Open in browser:
http://localhost:8000/docs
```

### Test 4: Frontend Loads
```bash
# Open in browser:
http://localhost:5173
# Should see the UI
```

### Test 5: Full Analysis
1. Go to http://localhost:5173
2. Search for "OpenAI"
3. Click "Analyze"
4. Wait 30-60 seconds
5. See results

---

## 📈 Performance Tips

1. **First run takes time**
   - Building images: 2-5 minutes
   - LLM first inference: 30-60 seconds
   - Subsequent requests: 20-40 seconds

2. **Reduce image size**
   - Frontend uses alpine (small)
   - Backend uses slim Python image
   - Multi-stage builds

3. **Persist Ollama models**
   - Named volume `ollama_data`
   - Survives container restarts
   - Don't delete this volume!

4. **Health checks**
   - Automatic container restart on failure
   - Ensures services stay healthy
   - Visible in `docker-compose ps`

---

## 🔐 Security Notes

- ✅ No hardcoded passwords
- ✅ No environment secrets in Dockerfile
- ✅ Local network only (internal only)
- ⚠️ Add authentication for production
- ⚠️ Use HTTPS for production deployment

---

## 📚 Useful Links

| Resource | Link |
|----------|------|
| Docker Docs | https://docs.docker.com |
| Docker Compose | https://docs.docker.com/compose |
| Docker Hub | https://hub.docker.com |
| Ollama | https://ollama.ai |
| FastAPI | https://fastapi.tiangolo.com |
| React | https://react.dev |

---

## 🎯 Next Steps

1. ✅ Install Docker Desktop
2. ✅ Run install-prerequisites script
3. ✅ Download Llama 2 model: `ollama pull llama2`
4. ✅ Run: `./docker-compose-setup.sh`
5. ✅ Open: http://localhost:5173
6. ✅ Test with a company!

---

## 🆘 Getting Help

- Check logs: `docker-compose logs -f`
- Read DOCKER_GUIDE.md for detailed info
- Review troubleshooting section above
- Check individual Dockerfiles for comments

---

**You're ready to containerize! 🐳 Let's go!**

Quick commands to bookmark:
```bash
./docker-compose-setup.sh           # Start everything
docker-compose logs -f               # View logs
docker-compose down                  # Stop everything
docker-compose ps                    # Check status
```
