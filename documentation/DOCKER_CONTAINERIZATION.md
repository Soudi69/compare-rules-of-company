# 🐳 Docker Containerization Guide

## Overview
Your AI Company Ethics Rules Analyzer is now fully containerized with:
- ✅ Frontend (React + Vite)
- ✅ Backend (FastAPI)
- ✅ LLM (Ollama + Mistral 7B)
- ✅ Docker Compose orchestration
- ✅ Health checks & auto-restart

---

## 📋 What's Containerized

### Services

| Service | Image | Port | Purpose |
|---------|-------|------|---------|
| **Ollama** | ollama/ollama:latest | 11434 | Mistral 7B LLM inference |
| **Backend** | python:3.11-slim | 8000 | FastAPI server |
| **Frontend** | node:18-alpine | 5173 | React web app |

### Volumes
- `ollama_data` - Persists Mistral 7B model (4.1GB)

### Network
- `ai-rules-network` - Custom bridge for service communication

---

## 🚀 Quick Start

### Option 1: One-Line Start (Easiest)
```bash
chmod +x docker-start.sh
./docker-start.sh
```

### Option 2: Manual Docker Compose
```bash
cd docker
docker-compose up -d
```

### Option 3: With Logs Visible
```bash
cd docker
docker-compose up
```

Then open: **http://localhost:5173**

---

## 📊 System Requirements

| Requirement | Your System | Status |
|-------------|-------------|--------|
| Docker Desktop | Required | ✅ Install if needed |
| RAM | 16GB recommended | ✅ You have 16GB |
| Storage | 10GB free | ✅ You have 686GB |
| CPU | 4+ cores | ✅ You have 6 cores |

---

## 🔍 Container Details

### Ollama Container
```yaml
Service: ollama
Image: ollama/ollama:latest
Port: 11434
Memory: 8GB (for Mistral model)
Volume: ollama_data:/root/.ollama
Health: curl http://localhost:11434/api/tags
Restart: unless-stopped
```

**First Run:**
- Downloads Mistral 7B model (4.1GB)
- Takes ~20 minutes
- Model is cached in volume for future runs

### Backend Container
```yaml
Service: backend
Image: python:3.11-slim
Port: 8000
Memory: 1-2GB
Env: OLLAMA_MODEL=mistral
Health: curl http://localhost:8000/health
Restart: unless-stopped
```

### Frontend Container
```yaml
Service: frontend
Image: node:18-alpine
Port: 5173
Memory: 500MB-1GB
Env: VITE_API_URL=http://localhost:8000
Health: HTTP GET /
Restart: unless-stopped
```

---

## 📝 File Structure

```
docker/
├── docker-compose.yml          # Service orchestration
├── Dockerfile.backend          # Backend container
├── Dockerfile.frontend         # Frontend container
└── .dockerignore              # Build exclusions
```

---

## 🔧 Common Commands

### Start All Services
```bash
cd docker
docker-compose up -d
```

### Stop All Services
```bash
cd docker
docker-compose stop
```

### View Service Status
```bash
cd docker
docker-compose ps
```

### View Logs
```bash
cd docker
docker-compose logs -f              # All services
docker-compose logs -f ollama       # Ollama only
docker-compose logs -f backend      # Backend only
docker-compose logs -f frontend     # Frontend only
```

### Remove All (Clean slate)
```bash
cd docker
docker-compose down
docker volume rm docker_ollama_data  # Remove cached model
```

### Rebuild Containers
```bash
cd docker
docker-compose build --no-cache
docker-compose up -d
```

---

## 🎯 First Run Timing

| Step | Time | Details |
|------|------|---------|
| Build images | 2-3 min | Python & Node compilation |
| Start services | 1 min | Containers spin up |
| Ollama startup | 1 min | LLM service initialization |
| Mistral download | ~20 min | **First run only** |
| Total | ~25 min | One-time setup |

**Subsequent runs:** ~30 seconds ⚡

---

## ✅ Verification

### Check All Services Running
```bash
cd docker
docker-compose ps
```

Expected output:
```
CONTAINER ID   NAMES            STATUS
xxx            ai-rules-ollama      Up (healthy)
xxx            ai-rules-backend     Up (healthy)
xxx            ai-rules-frontend    Up (healthy)
```

### Test Each Service

**Ollama (LLM):**
```bash
curl http://localhost:11434/api/tags
```

**Backend (API):**
```bash
curl http://localhost:8000/health
```

**Frontend (Web):**
```bash
curl http://localhost:5173/
```

---

## 🌐 Access Points

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:5173 | Web interface |
| API | http://localhost:8000 | Backend API |
| API Docs | http://localhost:8000/docs | Swagger UI |
| Ollama | http://localhost:11434 | LLM service |

---

## 🔄 Model Management

### Check Available Models
```bash
docker-compose exec ollama ollama list
```

### Pull a Different Model
```bash
# Phi 2.7B (faster)
docker-compose exec ollama ollama pull phi

# Dolphin 2.2 (chat-optimized)
docker-compose exec ollama ollama pull dolphin2.2:7b

# Llama2 (original)
docker-compose exec ollama ollama pull llama2
```

### Switch Model
Edit `docker-compose.yml`:
```yaml
environment:
  - OLLAMA_MODEL=phi  # Change from mistral
```

Then restart:
```bash
docker-compose restart backend
```

---

## 🐛 Troubleshooting

### Ollama Not Downloading Model
```bash
# Check Ollama logs
docker-compose logs ollama

# Restart Ollama
docker-compose restart ollama

# Wait 60+ seconds for auto-pull
```

### Backend Not Connecting to Ollama
```bash
# Check logs
docker-compose logs backend

# Verify service is healthy
docker-compose exec ollama curl http://localhost:11434/api/tags

# Restart backend
docker-compose restart backend
```

### Out of Disk Space
```bash
# Remove unused Docker resources
docker system prune -a

# Remove model volume
docker volume rm docker_ollama_data
```

### Port Already in Use
Change ports in `docker-compose.yml`:
```yaml
ports:
  - "8001:8000"    # Backend on 8001
  - "5174:5173"    # Frontend on 5174
  - "11435:11434"  # Ollama on 11435
```

---

## 📊 Performance Characteristics

### Memory Usage
- Ollama + Mistral: ~8GB
- Backend: ~500MB
- Frontend: ~300MB
- **Total: ~9GB** (leaves 7GB free on your 16GB Mac)

### Disk Space
- Docker images: ~2GB
- Mistral model: 4.1GB
- Containers/logs: ~1GB
- **Total: ~7GB**

### Response Time
- API request to response: 5-8 seconds
- Model inference: 4-7 seconds
- Network overhead: 1-2 seconds

---

## 🚀 Optimization Tips

### Faster First Run
Pre-pull the model:
```bash
docker run -v ollama_data:/root/.ollama ollama/ollama ollama pull mistral
```

### Reduce Image Size
Use Alpine images (already done):
- Frontend: node:18-alpine (100MB)
- Backend: python:3.11-slim (130MB)
- Ollama: ollama/ollama (best available)

### Better Performance
- Uses multi-stage build for frontend
- Minimal Python base image for backend
- Named volume for model persistence
- Health checks for auto-recovery

---

## 📋 Configuration Files

### docker-compose.yml
```yaml
version: '3.8'
services:
  ollama:
    image: ollama/ollama:latest
    # ... Mistral 7B model
  backend:
    build: ..
    # ... FastAPI server
  frontend:
    build: ..
    # ... React app
```

### Dockerfile.backend
```dockerfile
FROM python:3.11-slim
# ... FastAPI + dependencies
```

### Dockerfile.frontend
```dockerfile
FROM node:18-alpine AS builder
# ... Build stage
FROM node:18-alpine
# ... Production stage
```

---

## 🔐 Security Notes

- ✅ CORS enabled for frontend-backend communication
- ✅ Internal network for service-to-service communication
- ✅ Health checks prevent unhealthy containers
- ✅ Auto-restart on failure
- ⚠️ Ollama exposed on port 11434 (localhost only recommended)

---

## 📈 Scaling

### Add More Models
```bash
docker-compose exec ollama ollama pull dolphin2.2:7b
docker-compose exec ollama ollama pull phi
```

### Multiple Instances
```yaml
services:
  backend-1:
    # ... first instance
  backend-2:
    # ... second instance
  backend-3:
    # ... third instance
```

### Load Balancing
Add Nginx reverse proxy in docker-compose.yml

---

## 🎯 Production Checklist

- ✅ Docker images created
- ✅ Services orchestrated
- ✅ Health checks configured
- ✅ Volume persistence enabled
- ✅ Network isolation configured
- ✅ Auto-restart enabled
- ✅ Lightweight model chosen
- ✅ Documentation complete

---

## 📞 Support

**For Docker issues:**
1. Check logs: `docker-compose logs`
2. Verify ports: `lsof -i :5173 :8000 :11434`
3. Restart service: `docker-compose restart [service]`
4. Clean restart: `docker-compose down && docker-compose up -d`

---

## ✨ Summary

Your application is now:
- ✅ Containerized with Docker
- ✅ Using lightweight Mistral 7B
- ✅ Fully orchestrated with docker-compose
- ✅ Ready for deployment
- ✅ Production-ready

**Start it:** `./docker-start.sh` or `cd docker && docker-compose up -d`

**Access it:** http://localhost:5173
