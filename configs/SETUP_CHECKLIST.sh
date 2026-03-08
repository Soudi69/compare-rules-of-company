#!/bin/bash

# 🎯 AI Rules Analyzer - Docker Setup Checklist
# Visual checklist to track your setup progress

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

clear

echo ""
echo -e "${CYAN}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║                                                            ║${NC}"
echo -e "${CYAN}║   🎯 AI Rules Analyzer - Docker Setup Checklist           ║${NC}"
echo -e "${CYAN}║                                                            ║${NC}"
echo -e "${CYAN}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Phase 1: Prerequisites
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}📋 Phase 1: Prerequisites${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

if command -v docker &> /dev/null; then
    echo -e "${GREEN}☑ Docker installed${NC} ($(docker --version | cut -d' ' -f3))"
else
    echo -e "${RED}☐ Docker - MISSING${NC}"
    echo "  Install from: https://www.docker.com/products/docker-desktop"
fi

if command -v docker-compose &> /dev/null; then
    echo -e "${GREEN}☑ Docker Compose installed${NC} ($(docker-compose --version | cut -d' ' -f3))"
else
    echo -e "${RED}☐ Docker Compose - MISSING${NC}"
    echo "  Comes with Docker Desktop"
fi

if command -v ollama &> /dev/null; then
    echo -e "${GREEN}☑ Ollama installed${NC}"
else
    echo -e "${RED}☐ Ollama - MISSING${NC}"
    echo "  Install from: https://ollama.ai"
fi

echo ""
echo -e "${YELLOW}→ If any are missing, run the installation script:${NC}"
echo "  macOS:  ./install-prerequisites-mac.sh"
echo "  Linux:  sudo ./install-prerequisites-linux.sh"
echo "  Windows: install-prerequisites-windows.bat"
echo ""

# Phase 2: Project Files
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}📁 Phase 2: Docker Configuration Files${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

check_file() {
    if [ -f "$PROJECT_DIR/$1" ]; then
        echo -e "${GREEN}☑ $1${NC}"
    else
        echo -e "${RED}☐ $1 - MISSING${NC}"
    fi
}

echo "Docker Files:"
check_file "docker-compose.yml"
check_file "Dockerfile.backend"
check_file "Dockerfile.frontend"
check_file "Dockerfile.ollama"
check_file ".dockerignore"

echo ""
echo "Setup Scripts:"
check_file "START_DOCKER.sh"
check_file "docker-compose-setup.sh"
check_file "docker-compose-setup.bat"

echo ""
echo "Installation Scripts:"
check_file "install-prerequisites-mac.sh"
check_file "install-prerequisites-linux.sh"
check_file "install-prerequisites-windows.bat"

echo ""
echo -e "${YELLOW}→ All files should be present in: ${PROJECT_DIR}${NC}"
echo ""

# Phase 3: Getting Started
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}🚀 Phase 3: Getting Started${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

echo "Choose one of these options:"
echo ""
echo -e "${CYAN}Option 1: One-Click Setup (Recommended)${NC}"
echo "  Command: chmod +x START_DOCKER.sh && ./START_DOCKER.sh"
echo "  Time: 5-10 minutes"
echo "  What it does: Installs, builds, and starts everything"
echo ""

echo -e "${CYAN}Option 2: Manual Setup${NC}"
echo "  1. Download Ollama model: ollama pull llama2"
echo "  2. Build images: docker-compose build"
echo "  3. Start services: docker-compose up -d"
echo "  Time: 10-20 minutes"
echo ""

echo -e "${CYAN}Option 3: Check Documentation First${NC}"
echo "  Read: DOCKER_SETUP_GUIDE.md"
echo "  Then run: ./START_DOCKER.sh"
echo ""

# Phase 4: Service Status
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}📊 Phase 4: Service Status${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

echo -e "${YELLOW}→ After running startup script, check status with:${NC}"
echo "  docker-compose ps"
echo ""
echo "Expected output:"
echo "  NAME               STATUS         PORTS"
echo "  ai-rules-ollama    Up (healthy)   0.0.0.0:11434→11434/tcp"
echo "  ai-rules-backend   Up (healthy)   0.0.0.0:8000→8000/tcp"
echo "  ai-rules-frontend  Up (healthy)   0.0.0.0:5173→5173/tcp"
echo ""

# Phase 5: Access Application
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}🌐 Phase 5: Access Your Application${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

echo -e "${CYAN}Once services are running, open in your browser:${NC}"
echo ""
echo -e "${GREEN}Frontend:${NC}  http://localhost:5173"
echo -e "${GREEN}API Docs:${NC}  http://localhost:8000/docs"
echo -e "${GREEN}Ollama:${NC}    http://localhost:11434"
echo ""

# Phase 6: Testing
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}✅ Phase 6: Testing Your Setup${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

echo -e "${CYAN}Test 1: Services Running${NC}"
echo "  Run: docker-compose ps"
echo "  Look for: All containers say 'Up (healthy)'"
echo ""

echo -e "${CYAN}Test 2: Backend API${NC}"
echo "  Run: curl http://localhost:8000/health"
echo "  Look for: {\"status\":\"ok\"}"
echo ""

echo -e "${CYAN}Test 3: Frontend Loads${NC}"
echo "  Open: http://localhost:5173"
echo "  Look for: Search form with company suggestions"
echo ""

echo -e "${CYAN}Test 4: Full Analysis${NC}"
echo "  1. Search for 'OpenAI'"
echo "  2. Click 'Analyze'"
echo "  3. Wait 30-60 seconds"
echo "  4. See results with red flags, timeline, recommendations"
echo ""

# Quick Commands
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}⚡ Quick Commands${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

echo -e "${CYAN}Start everything:${NC}"
echo "  ./START_DOCKER.sh"
echo ""

echo -e "${CYAN}View logs:${NC}"
echo "  docker-compose logs -f"
echo ""

echo -e "${CYAN}Stop services:${NC}"
echo "  docker-compose stop"
echo ""

echo -e "${CYAN}Restart services:${NC}"
echo "  docker-compose restart"
echo ""

echo -e "${CYAN}Remove containers:${NC}"
echo "  docker-compose down"
echo ""

# Help
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}📚 Documentation${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

echo "Read these files for more info:"
echo "  • DOCKER_SETUP_GUIDE.md    ← Start here"
echo "  • DOCKER_QUICK_START.md    ← Command reference"
echo "  • DOCKER_GUIDE.md          ← Advanced topics"
echo "  • README.md                ← Project overview"
echo ""

# Recommendation
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}🎯 Recommended Next Step${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

if command -v docker &> /dev/null && command -v ollama &> /dev/null; then
    echo -e "${GREEN}✅ Prerequisites installed! Ready to start!${NC}"
    echo ""
    echo "Run: chmod +x START_DOCKER.sh && ./START_DOCKER.sh"
    echo ""
else
    echo -e "${YELLOW}⚠️  Please install missing prerequisites first${NC}"
    echo ""
    if [[ "$OSTYPE" == "darwin"* ]]; then
        echo "macOS:"
        echo "  chmod +x install-prerequisites-mac.sh"
        echo "  ./install-prerequisites-mac.sh"
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        echo "Linux:"
        echo "  chmod +x install-prerequisites-linux.sh"
        echo "  sudo ./install-prerequisites-linux.sh"
    else
        echo "Windows:"
        echo "  install-prerequisites-windows.bat"
    fi
    echo ""
fi

echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "Questions? Check the documentation or review docker-compose.yml"
echo ""
echo "Happy analyzing! 🚀"
echo ""
