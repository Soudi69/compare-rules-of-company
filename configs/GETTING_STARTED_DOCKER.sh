#!/usr/bin/env bash

# AI Rules Analyzer - Getting Started Guide
# This file is meant to be read, but can also be executed as a script

clear

cat << "EOF"

╔════════════════════════════════════════════════════════════════════════════╗
║                                                                            ║
║               🚀 AI Rules Analyzer - Docker Setup Guide                   ║
║                                                                            ║
║                 Your containerized application is ready!                  ║
║                                                                            ║
╚════════════════════════════════════════════════════════════════════════════╝

PROJECT LOCATION:
/Users/soudi/Documents/GitHub/compare-rules-of-company

STATUS: ✅ FULLY CONTAINERIZED & READY TO TEST

════════════════════════════════════════════════════════════════════════════════

🎯 QUICK START (Choose One)

═══════════════════════════════════════════════════════════════════════════════

OPTION 1: One-Click Launch ⭐ (RECOMMENDED)
─────────────────────────────────────────────────────────────────────────────

   cd /Users/soudi/Documents/GitHub/compare-rules-of-company
   chmod +x START_DOCKER.sh
   ./START_DOCKER.sh

   What it does:
   ✓ Checks for Docker & Ollama
   ✓ Downloads Llama 2 model if needed (4GB)
   ✓ Builds Docker images
   ✓ Starts all 3 containers (ollama, backend, frontend)
   ✓ Waits for health checks
   ✓ Shows you access URLs

   Time: 5-10 minutes (after prerequisites installed)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

OPTION 2: Check Prerequisites First
─────────────────────────────────────────────────────────────────────────────

   chmod +x SETUP_CHECKLIST.sh
   ./SETUP_CHECKLIST.sh

   This shows:
   ✓ What's installed (Docker, Ollama, etc.)
   ✓ What files are present
   ✓ What to do next

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

OPTION 3: Read Docs First
─────────────────────────────────────────────────────────────────────────────

   Choose your OS and install prerequisites:

   macOS:
      chmod +x install-prerequisites-mac.sh
      ./install-prerequisites-mac.sh

   Linux (Ubuntu/Debian):
      chmod +x install-prerequisites-linux.sh
      sudo ./install-prerequisites-linux.sh

   Windows:
      install-prerequisites-windows.bat

   Then run: ./START_DOCKER.sh

════════════════════════════════════════════════════════════════════════════════

📋 WHAT YOU NEED

─────────────────────────────────────────────────────────────────────────────

Before starting, you need:

✓ Docker Desktop     Download: https://www.docker.com/products/docker-desktop
✓ Ollama            Download: https://ollama.ai
✓ 10GB free space   For Docker images + Llama2 model
✓ 4GB+ RAM          For running containers

Use the installation scripts above to install these!

════════════════════════════════════════════════════════════════════════════════

🌐 AFTER SERVICES START

─────────────────────────────────────────────────────────────────────────────

Open in your browser:

   Frontend:        http://localhost:5173      (Main application)
   API Docs:        http://localhost:8000/docs (Interactive API)
   Ollama:          http://localhost:11434     (LLM server)

Check service status:
   docker-compose ps

View logs:
   docker-compose logs -f

════════════════════════════════════════════════════════════════════════════════

🎯 TEST THE APPLICATION

─────────────────────────────────────────────────────────────────────────────

1. Open http://localhost:5173 in your browser
2. Search for a company: OpenAI, Google, Microsoft, Meta, or Amazon
3. Click the Analyze button
4. Wait 30-60 seconds for LLM processing
5. Review the results:
   • Compliance score
   • Red flags with severity levels
   • Timeline of policy changes
   • Compliance recommendations

════════════════════════════════════════════════════════════════════════════════

📚 DOCUMENTATION

─────────────────────────────────────────────────────────────────────────────

Read these files for detailed information:

   Start here:
   • DOCKER_SETUP_GUIDE.md      ← Complete setup guide
   • DOCKER_QUICK_START.md      ← Quick reference

   For more info:
   • MANIFEST.md                ← What was created
   • DOCKER_COMPLETE.md         ← Final summary
   • DOCKER_GUIDE.md            ← Advanced topics
   • README.md                  ← Project overview

════════════════════════════════════════════════════════════════════════════════

⚡ QUICK COMMANDS

─────────────────────────────────────────────────────────────────────────────

Start everything:
   ./START_DOCKER.sh

Check status:
   docker-compose ps

View logs:
   docker-compose logs -f

Stop services:
   docker-compose stop

Restart services:
   docker-compose restart

Remove everything:
   docker-compose down

════════════════════════════════════════════════════════════════════════════════

🔍 TROUBLESHOOTING

─────────────────────────────────────────────────────────────────────────────

Docker not installed?
   → Download from: https://www.docker.com/products/docker-desktop

Ollama not installed?
   → Download from: https://ollama.ai

Docker not running?
   → macOS/Windows: Open Docker Desktop from Applications
   → Linux: sudo systemctl start docker

Port already in use?
   → lsof -i :5173  (find what's using the port)
   → kill -9 <PID>  (kill the process)

Services won't start?
   → Check logs: docker-compose logs
   → Rebuild: docker-compose build --no-cache

Need more help?
   → Read: DOCKER_SETUP_GUIDE.md
   → Read: DOCKER_GUIDE.md
   → Check logs: docker-compose logs -f

════════════════════════════════════════════════════════════════════════════════

🎉 YOU'RE READY!

─────────────────────────────────────────────────────────────────────────────

Your containerized AI Rules Analyzer is fully set up!

Next step:

   chmod +x START_DOCKER.sh && ./START_DOCKER.sh

Then open:

   http://localhost:5173

And start analyzing company AI ethics policies! 🚀

════════════════════════════════════════════════════════════════════════════════

For more information, see:

   📖 DOCKER_SETUP_GUIDE.md  (recommended starting point)
   📖 MANIFEST.md            (what was created)
   📖 DOCKER_QUICK_START.md  (commands reference)

Happy analyzing! 🎊

════════════════════════════════════════════════════════════════════════════════

EOF

# Show system status
echo ""
echo "CURRENT SYSTEM STATUS:"
echo "─────────────────────────────────────────────────────────────────────────────"

if command -v docker &> /dev/null; then
    echo "✓ Docker installed"
else
    echo "✗ Docker NOT found"
fi

if command -v docker-compose &> /dev/null; then
    echo "✓ Docker Compose installed"
else
    echo "✗ Docker Compose NOT found"
fi

if command -v ollama &> /dev/null; then
    echo "✓ Ollama installed"
else
    echo "✗ Ollama NOT found"
fi

echo ""
echo "Run SETUP_CHECKLIST.sh for detailed information"
echo ""
