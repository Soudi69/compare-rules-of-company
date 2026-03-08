#!/bin/bash

# Visual summary of how to run the application

cat << 'EOF'

████████████████████████████████████████████████████████████████████████████████
█                                                                              █
█                  🚀 RUN YOUR AI RULES ANALYZER NOW! 🚀                     █
█                                                                              █
█                    Everything is ready. Just run one command!              █
█                                                                              █
████████████████████████████████████████████████████████████████████████████████

✅ WHAT YOU NEED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✓ Docker Desktop installed & running
✓ Terminal/Command Prompt open
✓ Your project files (already created)

Don't have Docker Desktop?
  Download: https://www.docker.com/products/docker-desktop
  Install it
  Start it (important!)
  Come back here

🚀 TO RUN YOUR APPLICATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Copy and paste this ONE command:

   cd /Users/soudi/Documents/GitHub/compare-rules-of-company && chmod +x RUN_NOW.sh && ./RUN_NOW.sh

That's it! The script will:

   1. ✅ Check Docker is installed
   2. ✅ Pull the official Ollama image
   3. ✅ Build your backend (FastAPI)
   4. ✅ Build your frontend (React)
   5. ✅ Download Llama2 model (4GB, first time only)
   6. ✅ Start all 3 containers
   7. ✅ Show you the URLs to open

🌐 THEN OPEN IN YOUR BROWSER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

After the script finishes, open:

   http://localhost:5173

That's your application! Search for a company and click Analyze.

📊 WHAT'S RUNNING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Your app runs 3 Docker containers:

   ┌─────────────────────────────────────────────────────────┐
   │                                                          │
   │  1. Ollama (Llama2 LLM)           port 11434            │
   │     └─ Official image from Docker Hub                   │
   │        Running local AI inference (no external APIs)    │
   │                                                          │
   │  2. Backend (FastAPI)              port 8000            │
   │     └─ Your Python API server                           │
   │        Connects to Ollama for AI analysis               │
   │                                                          │
   │  3. Frontend (React)               port 5173            │
   │     └─ Your beautiful UI                                │
   │        Users search companies here                      │
   │                                                          │
   └─────────────────────────────────────────────────────────┘

⏱️  TIME ESTIMATE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

First Run:
   • Download images: 2-3 min
   • Download Llama2: 5-10 min (depends on internet)
   • Build services: 2-3 min
   • Start & health check: 1-2 min
   
   TOTAL: ~15-20 minutes

Later Runs:
   • Much faster (2-5 minutes)
   • Llama2 already downloaded

🎯 WHAT TO DO WHILE WAITING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The script shows progress as it runs. You'll see:

   ✓ Checking Docker
   ✓ Pulling Ollama image
   ✓ Building backend
   ✓ Building frontend
   ✓ Downloading Llama2 (this takes time!)
   ✓ Starting services
   ✓ Waiting for health checks
   ✓ READY!

Just wait for it to finish.

🎉 WHEN IT'S READY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

You'll see this message:

   ✓ SERVICES RUNNING
   ✓ READY TO USE
   
   Open in browser:
   Frontend: http://localhost:5173
   API Docs: http://localhost:8000/docs

Then:
   1. Open http://localhost:5173 in your browser
   2. Search for a company (e.g., "OpenAI")
   3. Click "Analyze"
   4. Wait 30-60 seconds for the AI to process
   5. See the results with red flags and recommendations

📝 IF SOMETHING GOES WRONG
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

"Docker not found"
   → Install Docker Desktop from docker.com
   → Start Docker Desktop
   → Run the script again

"Docker daemon not running"
   → Open Docker Desktop
   → Wait for it to fully start
   → Run the script again

"Port already in use"
   → Something else is using port 5173 or 8000
   → Try again in a few minutes
   → Or read DOCKER_QUICK_START.md for solutions

Services won't start
   → Check logs: docker-compose logs
   → Rebuild: docker-compose build --no-cache
   → Try again: docker-compose up -d

❓ QUESTIONS?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Read these files for more info:

   📖 RUN_IMMEDIATELY.md      ← Start here for more details
   📖 DOCKER_QUICK_START.md   ← Command reference
   📖 DOCKER_SETUP_GUIDE.md   ← Complete setup guide

✅ CHECKLIST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Before you run:

   ☐ Docker Desktop is installed
   ☐ Docker Desktop is running
   ☐ You're in the project folder
   ☐ You have internet connection

Then:

   ☐ Run: chmod +x RUN_NOW.sh && ./RUN_NOW.sh
   ☐ Wait for "READY TO USE" message
   ☐ Open http://localhost:5173
   ☐ Test by searching for a company
   ☐ Enjoy! 🎉

🚀 LET'S GO!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Run this command NOW:

   cd /Users/soudi/Documents/GitHub/compare-rules-of-company && chmod +x RUN_NOW.sh && ./RUN_NOW.sh

Then open:

   http://localhost:5173

And start analyzing! 🎊

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Everything is ready. No more setup needed!

Your containerized AI Rules Analyzer is waiting to be used.

Let's make it run! 🚀

████████████████████████████████████████████████████████████████████████████████

EOF
