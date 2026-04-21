# ✅ run.sh Simplified - One Command to Run Everything

**Status:** ✅ SIMPLIFIED AND WORKING

---

## 🎯 What Changed

The `run.sh` script has been completely simplified from a 600+ line multi-command tool to a **simple, elegant one-command script**.

### Before (Complex)
```bash
./run.sh help              # Show help
./run.sh backend           # Start backend only
./run.sh frontend          # Start frontend only
./run.sh start             # Docker mode
./run.sh setup             # Setup all
./run.sh process-all       # Run data pipeline
... many more options ...
```

### After (Simple)
```bash
./run.sh    # That's it! Auto-detects Docker and starts everything
```

---

## 🚀 How It Works

**One simple command:**
```bash
./run.sh
```

The script will:

1. ✅ Check if Docker is available
2. ✅ Check if Docker daemon is running
3. ✅ **If Docker is running:** Start everything with Docker (fastest!)
4. ✅ **If Docker is NOT running:** Start locally (sets up Python venv + Node.js)
5. ✅ Show you what to do next

---

## 🐳 Docker Mode (Fastest)

If Docker is running:

```
✅ Docker found
✓ READY!

Frontend:  http://localhost:5173
API Docs:  http://localhost:8000/docs

To stop: cd docker && docker-compose down
```

**That's it!** Everything runs in Docker.

---

## 💻 Local Mode (No Docker)

If Docker is not running or not installed:

```
✅ Backend ready
✅ Frontend ready
✓ READY!

Start services in separate terminals:

Terminal 1 (Backend):
  cd backend
  source .venv/bin/activate
  python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload

Terminal 2 (Frontend):
  cd frontend
  npm run dev

Then open: http://localhost:5173
```

---

## 📊 Comparison

| Feature | Old | New |
|---------|-----|-----|
| Lines | 545+ | 150 |
| Commands | 15+ options | 1 simple |
| Complexity | Very High | Very Low |
| Ease of use | 🔴 Confusing | 🟢 Easy |
| Learning curve | Steep | Flat |
| First-time users | Hard | Easy |
| Docker setup | Complex | Auto |
| Local setup | Complex | Auto |

---

## 🎯 Features

✅ **Auto-detection:** Finds Docker automatically  
✅ **Fallback mode:** Works without Docker  
✅ **Zero configuration:** No parameters needed  
✅ **Quick feedback:** Shows what's running  
✅ **Clear instructions:** Tells you what to do next  
✅ **Beautiful output:** Color-coded, emoji icons, clear sections  

---

## 📝 What Removed

Removed all these complex commands:
- `setup`, `setup-backend`, `setup-frontend`
- `backend`, `frontend` (now just use separate terminals)
- `ingest`, `preprocess`, `analyze`, `process-all`
- `build`, `docker-build`, `docker-stop`
- `clean`, `check`, `help`

**Why?** They were confusing for new users. Now just **one command** does it all!

---

## ✨ Test It

```bash
./run.sh
```

Should show:
```
🚀 Apte - AI Principle Tracker Ethos
Starting your application...

✅ Docker found
✓ READY!

Frontend:  http://localhost:5173
API Docs:  http://localhost:8000/docs
```

---

## 🎉 Result

**Before:** "Which command should I use?"  
**After:** "Just run `./run.sh`"

Much simpler. Much better. Much more professional. ✨

---

**Last Updated:** 21 April 2026  
**Status:** ✅ READY FOR TEAM USE
