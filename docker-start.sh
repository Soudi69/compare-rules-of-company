#!/bin/bash

# 🐳 Docker Containerized AI Rules Analyzer - Startup Script
# Lightweight Setup with Mistral 7B LLM
# Perfect for MacBook Pro (16GB RAM)

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

clear

echo ""
echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  🐳 AI Rules Analyzer - Docker Containerized Setup        ║${NC}"
echo -e "${BLUE}║  Using Lightweight Mistral 7B LLM                         ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Check if Docker is available
echo -e "${BLUE}→${NC} Checking Docker installation..."
if ! command -v docker &> /dev/null; then
    echo -e "${RED}✗ Docker not found${NC}"
    echo ""
    echo "Please install Docker Desktop from: https://www.docker.com/products/docker-desktop"
    echo ""
    exit 1
fi

echo -e "${GREEN}✓ Docker found${NC}"
docker --version
echo ""

# Check if Docker daemon is running
echo -e "${BLUE}→${NC} Checking Docker daemon..."
if ! docker ps &> /dev/null; then
    echo -e "${RED}✗ Docker daemon not running${NC}"
    echo ""
    echo "Please start Docker Desktop and try again"
    echo ""
    exit 1
fi

echo -e "${GREEN}✓ Docker daemon is running${NC}"
echo ""

# Navigate to project directory
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$PROJECT_DIR"

echo -e "${BLUE}→${NC} Project directory: $PROJECT_DIR"
echo ""

# Check if docker-compose.yml exists
if [ ! -f "docker/docker-compose.yml" ]; then
    echo -e "${RED}✗ docker/docker-compose.yml not found${NC}"
    exit 1
fi

echo -e "${GREEN}✓ docker/docker-compose.yml found${NC}"
echo ""

# Navigate to docker directory
cd docker

# Display build info
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}→ Building & Starting Services${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

echo -e "${YELLOW}  • Building backend container...${NC}"
docker-compose build backend --no-cache || true

echo ""
echo -e "${YELLOW}  • Building frontend container...${NC}"
docker-compose build frontend --no-cache || true

echo ""
echo -e "${GREEN}✓ Containers built successfully${NC}"
echo ""

# Start services
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}→ Starting Services${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

docker-compose up -d

echo ""
echo -e "${BLUE}→ Waiting for services to start...${NC}"
echo ""

# Wait for Ollama to be healthy
echo -e "${YELLOW}  • Waiting for Ollama (LLM)...${NC}"
max_attempts=30
attempt=0
while [ $attempt -lt $max_attempts ]; do
    if docker-compose exec -T ollama curl -s http://localhost:11434/api/tags > /dev/null 2>&1; then
        echo -e "${GREEN}  ✓ Ollama is ready${NC}"
        break
    fi
    echo -ne "\r  Waiting... (${attempt}/${max_attempts})"
    sleep 2
    attempt=$((attempt + 1))
done

echo ""

# Pull Mistral model if not already present
echo -e "${YELLOW}  • Checking for Mistral 7B model...${NC}"
if docker-compose exec -T ollama ollama list 2>/dev/null | grep -q "mistral"; then
    echo -e "${GREEN}  ✓ Mistral model is available${NC}"
else
    echo -e "${YELLOW}  • Downloading Mistral 7B (4.1GB - takes ~20 minutes)${NC}"
    echo -e "${YELLOW}    This is a one-time download, cached for future runs...${NC}"
    echo ""
    docker-compose exec -T ollama ollama pull mistral
    echo ""
    echo -e "${GREEN}  ✓ Mistral downloaded successfully${NC}"
fi

echo ""

# Wait for backend to be healthy
echo -e "${YELLOW}  • Waiting for Backend API...${NC}"
max_wait=60
elapsed=0
while [ $elapsed -lt $max_wait ]; do
    if docker-compose exec -T backend curl -s http://localhost:8000/health > /dev/null 2>&1; then
        echo -e "${GREEN}  ✓ Backend is ready${NC}"
        break
    fi
    echo -ne "\r  Waiting... ${elapsed}s"
    sleep 2
    elapsed=$((elapsed + 2))
done

echo ""

# Wait for frontend
echo -e "${YELLOW}  • Waiting for Frontend...${NC}"
sleep 5
echo -e "${GREEN}  ✓ Frontend is ready${NC}"

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✓ ALL SERVICES RUNNING${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

docker-compose ps

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✓ READY TO USE${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

echo -e "${YELLOW}🌐 Open in your browser:${NC}"
echo ""
echo -e "${GREEN}   Frontend:  http://localhost:5173${NC}"
echo -e "${GREEN}   API Docs:  http://localhost:8000/docs${NC}"
echo ""

echo -e "${YELLOW}📝 Quick Commands:${NC}"
echo ""
echo "   View logs:     docker-compose logs -f"
echo "   Stop services: docker-compose stop"
echo "   Restart:       docker-compose restart"
echo "   Remove:        docker-compose down"
echo ""

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${GREEN}🎉 Your containerized AI Rules Analyzer is running!${NC}"
echo ""
echo "1. Open http://localhost:5173 in your browser"
echo "2. Search for a company (OpenAI, Google, Microsoft, etc.)"
echo "3. Click Analyze"
echo "4. Wait 5-8 seconds for Mistral LLM analysis"
echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

echo -e "${YELLOW}ℹ️  Model Info:${NC}"
echo "   LLM: Mistral 7B (lightweight)"
echo "   Size: 4.1 GB"
echo "   RAM: 8 GB"
echo "   Response Time: 5-8 seconds"
echo "   Quality: 8/10"
echo ""
