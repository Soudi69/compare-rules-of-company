# 🚀 AI Rules Analyzer - Complete Setup & Launch Guide

## 📋 Project Overview

**What:** An AI-powered application that analyzes company ethical AI guidelines
**How:** Using Llama 2 LLM with Ollama for local inference
**Why:** Understand compliance requirements and identify red flags
**Where:** Completely local - no external API dependencies

---

## 🎯 What You Have

A **complete, production-ready** full-stack application:

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React/Vite)                    │
│                    Port: 5173 (localhost)                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Beautiful Dark UI (Purple & Black Theme)             │  │
│  │ - Company Search Form                                │  │
│  │ - Live Analysis Results                              │  │
│  │ - Red Flags with Severity                            │  │
│  │ - Timeline View                                      │  │
│  │ - Recommendations                                    │  │
│  │ - Compliance Score                                   │  │
│  └──────────────────────────────────────────────────────┘  │
│                            ↓                                │
│                    HTTP/JSON API Calls                      │
└────────────────────────────┬────────────────────────────────┘
                             │
┌────────────────────────────┴────────────────────────────────┐
│                    BACKEND (FastAPI)                        │
│                    Port: 8000 (localhost)                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ API Server (Python/FastAPI)                          │  │
│  │ - Handles analysis requests                          │  │
│  │ - Integrates with LLM service                        │  │
│  │ - Returns structured JSON                            │  │
│  └──────────────────────────────────────────────────────┘  │
│                            ↓                                │
│                     LLM Integration                         │
└────────────────────────────┬────────────────────────────────┘
                             │
┌────────────────────────────┴────────────────────────────────┐
│                      OLLAMA SERVER                          │
│                    Port: 11434 (localhost)                  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Local LLM Serving                                    │  │
│  │ - Llama 2 Model (7B parameters)                      │  │
│  │ - Processes analysis prompts                         │  │
│  │ - Returns intelligent insights                       │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔧 Installation Path

### Option A: Automatic Setup (Recommended)

```bash
# Navigate to project directory
cd /Users/soudi/Documents/GitHub/compare-rules-of-company

# Make script executable (macOS/Linux)
chmod +x setup.sh

# Run setup
./setup.sh
# OR on Windows: setup.bat
```

The script will:
✅ Check prerequisites (Node, Python, Ollama)
✅ Create Python virtual environment
✅ Install all backend dependencies
✅ Install all frontend dependencies
✅ Create .env file with defaults

### Option B: Manual Setup

**1. Install Ollama**
```bash
# Go to https://ollama.ai
# Download and install
# Then pull the model:
ollama pull llama2
```

**2. Backend Setup**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # macOS/Linux
# or: venv\Scripts\activate  # Windows

pip install -r requirements.txt
cp .env.example .env
```

**3. Frontend Setup**
```bash
cd frontend
npm install
```

---

## 🎬 Launching the Application

### Step 1: Start Ollama Server
**Terminal Window 1:**
```bash
ollama serve
```

Expected output:
```
binding 127.0.0.1:11434
```

⚠️ **KEEP THIS RUNNING** - Backend needs this!

### Step 2: Start Backend Server
**Terminal Window 2:**
```bash
cd backend
source venv/bin/activate    # macOS/Linux
# or: venv\Scripts\activate # Windows

python main.py
```

Expected output:
```
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
```

✅ Backend is ready!

### Step 3: Start Frontend Server
**Terminal Window 3:**
```bash
cd frontend
npm run dev
```

Expected output:
```
  ➜  Local:   http://localhost:5173/
```

✅ Frontend is ready!

### Step 4: Open in Browser

Navigate to: **http://localhost:5173**

You should see:
- Header with "AI Rules Analyzer" title
- Left sidebar with company search
- Center area with "Ready to analyze" message

---

## 🧪 Testing the Setup

### Test 1: Frontend Loads
- [ ] Can see the UI at http://localhost:5173
- [ ] Dark theme with purple accents visible
- [ ] Company input form present

### Test 2: Backend Running
- [ ] Verify health check:
```bash
curl http://localhost:8000/health
```
Expected: `{"status":"ok"}`

### Test 3: LLM Available
- [ ] Verify Ollama connection:
```bash
curl http://localhost:11434/api/tags
```
Expected: Shows available models

### Test 4: Full Analysis
1. Click on suggested company (e.g., "OpenAI")
2. Click "Analyze" button
3. Wait 30-60 seconds for processing
4. See analysis results appear

---

## 🎯 Using the Application

### First Analysis

1. **Enter Company Name**
   - Click on suggestion or type name
   - Try: "OpenAI", "Google", "Microsoft", "Meta", "Amazon"

2. **Click Analyze**
   - Watch the animated spinner
   - Processing happens on your machine
   - First request takes longest (model warming up)

3. **Review Results**
   - **Summary**: Overall assessment
   - **Key Points**: Important policy highlights
   - **Red Flags**: Issues to watch out for
   - **Timeline**: How policies evolved
   - **Recommendations**: Action items
   - **Score**: Compliance rating (0-100)

### Understanding Results

**Red Flag Severity:**
- 🔴 **High** - Potential compliance violation
- 🟡 **Medium** - Policy gap or unclear requirement
- 🔵 **Low** - Minor improvement area

**Recommendation Priority:**
- **Critical** - Must address immediately
- **Important** - Should address soon
- **Standard** - Optional enhancement

---

## 📊 Performance Expectations

| Metric | Time | Notes |
|--------|------|-------|
| First request | 30-60 sec | Model loads into memory |
| Subsequent | 20-40 sec | Model already loaded |
| With GPU | 5-15 sec | Requires RTX GPU |

**Tips to improve:**
- Use quantized model: `ollama pull llama2:q4`
- Run on dedicated GPU server
- Implement caching for repeated companies

---

## 🛠️ Useful Commands Reference

```bash
# Quick Start (from project root)
chmod +x setup.sh && ./setup.sh

# Start Ollama (Terminal 1)
ollama serve

# Start Backend (Terminal 2)
cd backend && source venv/bin/activate && python main.py

# Start Frontend (Terminal 3)
cd frontend && npm run dev

# Open App
# Browser: http://localhost:5173

# Stop Services
# Press Ctrl+C in each terminal

# Test API
curl http://localhost:8000/health
curl -X POST http://localhost:8000/analyze \
  -H "Content-Type: application/json" \
  -d '{"company_name": "OpenAI"}'

# List Models
ollama list

# Download Different Model
ollama pull mistral      # Smaller, faster
ollama pull neural-chat  # Optimized
```

---

## 🚨 Common Issues & Quick Fixes

### Issue: "Could not connect to Ollama"
```bash
# Solution: Make sure Ollama is running
ollama serve

# If already running, check:
curl http://localhost:11434
```

### Issue: "Port 8000 already in use"
```bash
# macOS/Linux: Find and kill process
lsof -i :8000
kill -9 <PID>

# Windows: Find and kill process
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

### Issue: "Module not found" (Python)
```bash
# Rebuild virtual environment
cd backend
rm -rf venv
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Issue: "npm ERR!" (Node)
```bash
# Clear cache and reinstall
cd frontend
npm cache clean --force
rm -rf node_modules
npm install
```

### Issue: Slow First Response
- This is **normal** - LLM loads into memory
- First request: 30-60 seconds
- Subsequent: 20-40 seconds
- Keep Ollama running between requests

---

## 🎨 Customization Quick Guide

### Add a Company
Edit: `backend/services/data_service.py`
```python
"my_company": {
    "guidelines": ["Rule 1", "Rule 2"],
    "timeline": {"2024": "Update description"}
}
```

### Change Colors
Edit: `frontend/tailwind.config.js`
```javascript
colors: {
    dark: { /* your colors */ },
    purple: { /* your colors */ }
}
```

### Modify Analysis
Edit: `backend/services/analysis_service.py`
```python
# Update the analysis prompt
```

---

## 📚 Documentation Files to Explore

After setup, read these in order:

1. **QUICK_REFERENCE.md** - Command cheat sheet
2. **GETTING_STARTED.md** - Detailed installation
3. **README.md** - Features and API docs
4. **DEVELOPER.md** - For development/customization
5. **DEPLOYMENT.md** - For production use

---

## 🚀 Next Steps

### Immediate (Next 5 minutes)
- [ ] Run setup script
- [ ] Start all three services
- [ ] Test with one company
- [ ] Review analysis results

### Short Term (Today)
- [ ] Try different companies
- [ ] Customize colors
- [ ] Add your own company
- [ ] Read documentation

### Medium Term (This Week)
- [ ] Deploy with Docker
- [ ] Add database storage
- [ ] Implement caching
- [ ] Deploy to cloud

### Long Term
- [ ] Scale to production
- [ ] Add authentication
- [ ] Monitor performance
- [ ] Extend features

---

## 📞 Getting Help

### If Something Breaks

1. **Check logs**: Look at terminal output
2. **Try fix**: See "Common Issues" above
3. **Restart**: Stop and restart all services
4. **Reinstall**: Run setup script again
5. **Deep dive**: Check relevant documentation

### Resources

- **FastAPI Docs**: https://fastapi.tiangolo.com
- **React Docs**: https://react.dev
- **Ollama Guide**: https://github.com/ollama/ollama
- **Tailwind CSS**: https://tailwindcss.com

---

## ✨ What Makes This Special

✅ **No API Keys Needed** - Everything runs locally
✅ **Privacy First** - Your data never leaves your machine
✅ **Beautiful UI** - Modern dark theme with smooth animations
✅ **Easy to Extend** - Clean code, well documented
✅ **Production Ready** - Includes deployment configs
✅ **No Vendor Lock-in** - Open source stack

---

## 🎉 Ready to Launch!

```
Project: AI Rules Analyzer
Status:  ✅ Complete & Ready to Run
Setup:   🔧 Choose automatic or manual
Launch:  🚀 Three simple commands
Use:     📊 Analyze companies
Deploy:  ☁️ Docker/Cloud ready

You've got everything you need! 🙌
```

---

## Quick Reference Card

```
┌─────────────────────────────────────────────┐
│      AI RULES ANALYZER - QUICK START        │
├─────────────────────────────────────────────┤
│                                             │
│  1️⃣  Setup: ./setup.sh                     │
│                                             │
│  2️⃣  Terminal 1: ollama serve              │
│      Terminal 2: cd backend && python main │
│      Terminal 3: cd frontend && npm run dev│
│                                             │
│  3️⃣  Open: http://localhost:5173          │
│                                             │
│  4️⃣  Try: Click company → Analyze          │
│                                             │
│  ⏱️  First: 30-60 sec | Next: 20-40 sec    │
│                                             │
│  📖  Docs: See README.md                    │
│                                             │
└─────────────────────────────────────────────┘
```

---

**🌟 Enjoy analyzing company AI ethics policies! 🌟**

*Questions? Check the documentation or open an issue.*
