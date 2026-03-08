#!/bin/bash

# 🚀 AI Rules Analyzer - Simple Docker Run Script
# Updated for reorganized folder structure
# This script pulls pre-built images and starts everything

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
echo -e "${BLUE}║  🚀 AI Rules Analyzer - Quick Docker Start                ║${NC}"
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

# Navigate to docker directory for compose commands
cd docker

# Pull latest images
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}→ Pulling Docker images (first time takes a few minutes)${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

echo -e "${YELLOW}  • Pulling ollama/ollama:latest...${NC}"
docker pull ollama/ollama:latest

echo ""
echo -e "${YELLOW}  • Building backend (FastAPI)...${NC}"
docker-compose build backend --no-cache || true

echo ""
echo -e "${YELLOW}  • Building frontend (React)...${NC}"
docker-compose build frontend --no-cache || true

echo ""
echo -e "${GREEN}✓ Images ready${NC}"
echo ""

# Pull Llama2 model
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}→ Starting Ollama to download Llama2 model${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

echo -e "${YELLOW}  • Starting ollama container...${NC}"
docker-compose up -d ollama

echo ""
echo -e "${YELLOW}  • Waiting for Ollama to be ready (30-60 seconds)...${NC}"
sleep 5

# Wait for Ollama to be healthy
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

# Check if Llama2 model is already available
echo -e "${YELLOW}  • Checking for Llama2 model...${NC}"
if docker-compose exec -T ollama ollama list | grep -q "llama2"; then
    echo -e "${GREEN}  ✓ Llama2 model is available${NC}"
else
    echo -e "${YELLOW}  • Downloading Llama2 model (4GB - this takes 5-10 minutes)...${NC}"
    echo -e "${YELLOW}    Be patient, this is a one-time download!${NC}"
    echo ""
    docker-compose exec -T ollama ollama pull llama2
fi

echo ""

# Start all services
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}→ Starting all services${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

docker-compose up -d

echo ""
echo -e "${BLUE}→ Waiting for services to be healthy...${NC}"
echo ""

# Wait for all services to be healthy
max_wait=60
elapsed=0
while [ $elapsed -lt $max_wait ]; do
    all_healthy=true
    
    if ! docker-compose exec -T backend curl -s http://localhost:8000/health > /dev/null 2>&1; then
        all_healthy=false
    fi
    
    if [ "$all_healthy" = true ]; then
        echo -e "${GREEN}✓ All services are healthy!${NC}"
        break
    fi
    
    echo -ne "\r  Waiting for services... ${elapsed}s"
    sleep 2
    elapsed=$((elapsed + 2))
done

echo ""
echo ""

# Show status
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✓ SERVICES RUNNING${NC}"
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
echo -e "${GREEN}🎉 Your AI Rules Analyzer is running!${NC}"
echo ""
echo "1. Open http://localhost:5173 in your browser"
echo "2. Search for a company (OpenAI, Google, Microsoft, etc.)"
echo "3. Click Analyze"
echo "4. Wait 30-60 seconds for results"
echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
