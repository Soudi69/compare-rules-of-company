# 🚀 run.sh Quick Reference Card

Print this or keep it handy!

---

## 🎯 Most Common Commands

```bash
# Start everything (simplest!)
./run.sh start

# Start backend only
./run.sh backend

# Start frontend only  
./run.sh frontend

# Process all data
./run.sh process-all

# Show help
./run.sh help
```

---

## 📋 All Commands at a Glance

```
./run.sh help              Show this help menu
./run.sh start             Start with Docker (recommended)
./run.sh local-start       Setup for local development
./run.sh backend           Start backend server
./run.sh frontend          Start frontend server

./run.sh setup             Complete setup (local)
./run.sh setup-backend     Setup backend only
./run.sh setup-frontend    Setup frontend only

./run.sh ingest            Load data
./run.sh preprocess        Clean data
./run.sh analyze           Analyze data
./run.sh process-all       All three steps

./run.sh build             Build for production
./run.sh docker-build      Build Docker images
./run.sh docker-stop       Stop Docker containers

./run.sh check             Check dependencies
./run.sh clean             Clean build artifacts
```

---

## 🌐 Access URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend | http://localhost:8000 |
| API Docs | http://localhost:8000/docs |

---

## ⚡ Quickest Workflows

### Fastest (15 seconds)
```bash
# Terminal 1
./run.sh backend

# Terminal 2
./run.sh frontend

# Open http://localhost:5173
```

### Docker (First time only - 5-10 min)
```bash
./run.sh start
# Open http://localhost:5173
```

### Docker (Subsequent times - 30 sec)
```bash
./run.sh start
# Open http://localhost:5173
```

### Data Processing (30 seconds)
```bash
./run.sh process-all
```

### Production Build (2 minutes)
```bash
./run.sh build
# Check frontend/dist/ folder
```

---

## 🔍 Ports

- **Frontend:** Port **5173** (Vite dev server)
- **Backend:** Port **8000** (FastAPI)
- **Ollama:** Port **11434** (LLM, Docker only)

---

## 📍 Requirements

### Local Mode
- Python 3.11+ ✅
- Node.js 18+ ✅
- npm ✅

### Docker Mode
- Docker Desktop ✅
- 4GB disk space (for Llama2) ✅

---

## ❌ Common Issues

### "Docker daemon not running"
→ Start Docker Desktop

### "Port 8000 in use"
```bash
lsof -i :8000
kill -9 <PID>
```

### "Port 5173 in use"
```bash
lsof -i :5173
kill -9 <PID>
```

### "Python not found"
→ Install Python 3.11+ (brew install python@3.11)

### "Node not found"
→ Install Node.js 18+ (brew install node@18)

---

## 🎓 Tips

✨ **Pro Tip 1:** Use separate terminals for backend + frontend  
✨ **Pro Tip 2:** Check `./run.sh help` for full command list  
✨ **Pro Tip 3:** Use `docker-compose logs -f` to see live logs  
✨ **Pro Tip 4:** Run `./run.sh clean` to clean up build files  

---

## 📱 Development Workflow

```
1. ./run.sh backend         Start backend
   ↓
2. ./run.sh frontend        Start frontend  
   ↓
3. Open http://localhost:5173
   ↓
4. Make changes to code
   ↓
5. Browser auto-reloads
   ↓
6. Done! ✅
```

---

**Created:** 21 April 2026
