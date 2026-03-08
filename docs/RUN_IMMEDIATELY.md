# 🚀 AI Rules Analyzer - Run It Now!

## ⚡ Quick Start (30 seconds)

### Prerequisites
You need **Docker Desktop** running on your machine.

**Don't have it?**
- Download from: https://www.docker.com/products/docker-desktop
- Install it
- Start Docker Desktop
- Then come back here

### Run It!

```bash
cd /Users/soudi/Documents/GitHub/compare-rules-of-company
chmod +x RUN_NOW.sh
./RUN_NOW.sh
```

**That's it!** The script will:
1. ✅ Check Docker is installed
2. ✅ Pull Ollama image
3. ✅ Build backend and frontend
4. ✅ Download Llama2 model (4GB, ~10 min first time)
5. ✅ Start all 3 services
6. ✅ Show you the access URLs

---

## 🌐 Access Your Application

Once running, open these in your browser:

| What | URL |
|------|-----|
| **Main App** | http://localhost:5173 |
| **API Docs** | http://localhost:8000/docs |

---

## 🎯 How to Use

1. **Open** http://localhost:5173
2. **Search** for a company (e.g., "OpenAI", "Google", "Microsoft")
3. **Click** "Analyze"
4. **Wait** 30-60 seconds
5. **See** the analysis results with red flags, timeline, recommendations

---

## ⚙️ What's Running

### 3 Docker Containers

```
Frontend (React)          Backend (FastAPI)         Ollama (Llama2 LLM)
http://localhost:5173  → http://localhost:8000  → http://localhost:11434
     (Your UI)              (API Server)              (AI Brain)
```

### Services
- **Ollama** - LLM inference server (official image from Docker Hub)
- **Backend** - FastAPI REST API (built from your code)
- **Frontend** - React UI (built from your code)

---

## 🔧 Useful Commands

```bash
# View logs
docker-compose logs -f

# Check status
docker-compose ps

# Stop services
docker-compose stop

# Start again
docker-compose start

# Stop and remove everything
docker-compose down
```

---

## 🆘 Troubleshooting

### "Docker not found"
→ Install Docker Desktop from https://docker.com

### "Docker daemon not running"
→ Start Docker Desktop (look in Applications/Start Menu)

### "Port already in use"
→ Something else is using port 5173 or 8000
→ Kill it: `lsof -i :5173` then `kill -9 <PID>`

### "Llama2 download taking forever"
→ Normal - it's 4GB and depends on your internet
→ Be patient, it's one-time only

### Services show errors
→ Check logs: `docker-compose logs`
→ Rebuild: `docker-compose build --no-cache`

---

## 📊 First Run Timeline

- **Download images:** 2-3 minutes
- **Download Llama2:** 5-10 minutes (depends on internet)
- **Build services:** 2-3 minutes
- **Start services:** 1 minute
- **Health checks:** 30-60 seconds
- **Total:** ~15-20 minutes

**Subsequent runs:** Much faster (2-5 minutes)

---

## ✅ Success Indicators

You'll know it's working when:

- ✅ All 3 containers show "Up" in `docker-compose ps`
- ✅ Frontend loads at http://localhost:5173
- ✅ API docs show at http://localhost:8000/docs
- ✅ You can search for companies
- ✅ Analysis completes in 30-60 seconds

---

## 🎊 That's It!

Your application is ready to use. Just:

1. Make the script executable
2. Run it
3. Open the browser
4. Start analyzing!

```bash
chmod +x RUN_NOW.sh && ./RUN_NOW.sh
```

Then open: **http://localhost:5173**

---

**Questions?** Check the detailed documentation in:
- `DOCKER_SETUP_GUIDE.md` - Full setup guide
- `DOCKER_QUICK_START.md` - Command reference

**Happy analyzing! 🚀**
