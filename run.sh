#!/bin/bash

################################################################################
# 🚀 Apte - AI Principle Tracker Ethos
# One-command quick start - just run ./run.sh
################################################################################

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

# Project paths
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$PROJECT_DIR/backend"
FRONTEND_DIR="$PROJECT_DIR/frontend"
DOCKER_DIR="$PROJECT_DIR/docker"

################################################################################
# UTILITY FUNCTIONS
################################################################################

################################################################################
# UTILITY FUNCTIONS
################################################################################

print_step() {
    echo -e "${MAGENTA}→ $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

################################################################################
# MAIN SCRIPT
################################################################################

clear

echo ""
echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  🚀 Apte - AI Principle Tracker Ethos                     ║${NC}"
echo -e "${BLUE}║  Starting your application...                             ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Check if Docker is available
echo -e "${BLUE}→ Checking Docker installation...${NC}"
if ! command -v docker &> /dev/null; then
    print_error "Docker not found. Using local mode instead."
    HAS_DOCKER=false
else
    print_success "Docker found"
    
    # Check if Docker daemon is running
    echo -e "${BLUE}→ Checking Docker daemon...${NC}"
    if ! docker ps &> /dev/null; then
        print_warning "Docker daemon not running. Using local mode instead."
        HAS_DOCKER=false
    else
        print_success "Docker daemon is running"
        HAS_DOCKER=true
    fi
fi

echo ""

# ============================================================================
# DOCKER MODE
# ============================================================================
if [ "$HAS_DOCKER" = true ]; then
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}→ Starting with Docker (fastest way!)${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    
    cd "$DOCKER_DIR"
    
    # Pull images
    echo -e "${YELLOW}  • Pulling latest images (first time takes a few minutes)...${NC}"
    docker pull ollama/ollama:latest > /dev/null 2>&1 &
    bg_pid=$!
    
    # Build services
    echo -e "${YELLOW}  • Building services...${NC}"
    docker-compose build --no-cache > /dev/null 2>&1 || true
    
    wait $bg_pid 2>/dev/null || true
    
    print_success "Images ready"
    echo ""
    
    # Start Ollama first
    echo -e "${YELLOW}  • Starting Ollama container...${NC}"
    docker-compose up -d ollama 2>/dev/null || true
    
    echo -e "${YELLOW}  • Waiting for Ollama to be ready...${NC}"
    sleep 3
    
    # Check if Llama2 model exists, if not download it
    if ! docker-compose exec -T ollama ollama list 2>/dev/null | grep -q "llama2"; then
        echo -e "${YELLOW}  • Downloading Llama2 model (4GB - one-time, 5-10 minutes)...${NC}"
        docker-compose exec -T ollama ollama pull llama2 > /dev/null 2>&1 || true
    fi
    
    echo ""
    
    # Start all services
    echo -e "${BLUE}→ Starting all services...${NC}"
    echo ""
    docker-compose up -d
    
    # Wait for services
    echo -e "${YELLOW}  • Waiting for services to be healthy...${NC}"
    sleep 5
    
    echo ""
    docker-compose ps
    
    echo ""
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${GREEN}✓ READY!${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo -e "${YELLOW}🌐 Open in your browser:${NC}"
    echo ""
    echo -e "${GREEN}   Frontend:  http://localhost:5173${NC}"
    echo -e "${GREEN}   API Docs:  http://localhost:8000/docs${NC}"
    echo ""
    echo -e "${YELLOW}To stop: ${CYAN}cd docker && docker-compose down${NC}"
    echo ""
    
# ============================================================================
# LOCAL MODE (No Docker)
# ============================================================================
else
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}→ Starting locally (no Docker)${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    
    # Setup backend
    echo -e "${YELLOW}  • Setting up backend...${NC}"
    cd "$BACKEND_DIR"
    
    if [ ! -d ".venv" ]; then
        print_step "Creating virtual environment..."
        python3 -m venv .venv
    fi
    
    source .venv/bin/activate
    
    if [ -f "requirements.txt" ]; then
        pip install -q -r requirements.txt 2>/dev/null || pip install -r requirements.txt
    fi
    
    print_success "Backend ready"
    echo ""
    
    # Setup frontend
    echo -e "${YELLOW}  • Setting up frontend...${NC}"
    cd "$FRONTEND_DIR"
    
    if [ ! -d "node_modules" ]; then
        npm install -q
    fi
    
    print_success "Frontend ready"
    echo ""
    
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${GREEN}✓ READY!${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    
    # Auto-start backend in background
    echo -e "${YELLOW}  • Starting backend server...${NC}"
    cd "$BACKEND_DIR"
    source .venv/bin/activate
    python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload > /tmp/backend.log 2>&1 &
    BACKEND_PID=$!
    sleep 2
    print_success "Backend started (PID: $BACKEND_PID)"
    echo ""
    
    # Auto-start frontend in background
    echo -e "${YELLOW}  • Starting frontend server...${NC}"
    cd "$FRONTEND_DIR"
    npm run dev > /tmp/frontend.log 2>&1 &
    FRONTEND_PID=$!
    sleep 3
    print_success "Frontend started (PID: $FRONTEND_PID)"
    echo ""
    
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${GREEN}✨ ALL SERVICES RUNNING!${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo -e "${YELLOW}🌐 Open in your browser:${NC}"
    echo ""
    echo -e "${GREEN}   Frontend:  http://localhost:5173${NC}"
    echo -e "${GREEN}   API Docs:  http://localhost:8000/docs${NC}"
    echo ""
    echo -e "${YELLOW}📝 Logs:${NC}"
    echo ""
    echo "   Backend:   tail -f /tmp/backend.log"
    echo "   Frontend:  tail -f /tmp/frontend.log"
    echo ""
    echo -e "${YELLOW}To stop services:${NC}"
    echo ""
    echo "   kill $BACKEND_PID  (backend)"
    echo "   kill $FRONTEND_PID (frontend)"
    echo ""
fi

echo ""
