#!/bin/bash

# 🐳 AI Rules Analyzer - Docker Setup Wizard
# Complete automated setup for macOS, Linux, and WSL2

set -e

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║  🐳 AI Rules Analyzer - Docker Setup Wizard               ║"
echo "║  Complete containerization with Ollama + FastAPI + React  ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Check prerequisites
check_prerequisites() {
    echo -e "${CYAN}📋 Checking prerequisites...${NC}"
    
    local missing=()
    
    if ! command -v docker &> /dev/null; then
        missing+=("Docker")
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        missing+=("Docker Compose")
    fi
    
    if ! command -v ollama &> /dev/null; then
        missing+=("Ollama")
    fi
    
    if [ ${#missing[@]} -eq 0 ]; then
        echo -e "${GREEN}✅ All prerequisites found!${NC}"
        return 0
    else
        echo -e "${RED}❌ Missing prerequisites:${NC}"
        for item in "${missing[@]}"; do
            echo -e "${RED}   • $item${NC}"
        done
        return 1
    fi
}

# Display installation instructions
show_installation_help() {
    echo ""
    echo -e "${YELLOW}📥 Please install missing prerequisites:${NC}"
    echo ""
    echo -e "${BLUE}macOS:${NC}"
    echo "  1. Docker Desktop: https://www.docker.com/products/docker-desktop"
    echo "  2. Ollama: https://ollama.ai"
    echo ""
    echo -e "${BLUE}Linux:${NC}"
    echo "  Run: sudo chmod +x install-prerequisites-linux.sh"
    echo "       sudo ./install-prerequisites-linux.sh"
    echo ""
    echo -e "${BLUE}Windows (WSL2):${NC}"
    echo "  1. Install WSL2: https://docs.microsoft.com/en-us/windows/wsl/install"
    echo "  2. Install Docker Desktop: https://www.docker.com/products/docker-desktop"
    echo "  3. Install Ollama: https://ollama.ai"
    echo ""
    echo -e "${YELLOW}After installation, run this script again.${NC}"
    echo ""
    exit 1
}

# Verify Docker daemon is running
verify_docker_running() {
    echo -e "${CYAN}🔍 Verifying Docker daemon is running...${NC}"
    
    if ! docker ps &> /dev/null; then
        echo -e "${RED}❌ Docker daemon is not running!${NC}"
        echo ""
        echo -e "${YELLOW}Please start Docker Desktop and try again.${NC}"
        echo ""
        echo -e "${BLUE}On macOS:${NC} Open Applications > Docker.app"
        echo -e "${BLUE}On Linux:${NC} Run: sudo systemctl start docker"
        echo -e "${BLUE}On Windows:${NC} Open Start menu > Docker Desktop"
        echo ""
        exit 1
    fi
    
    echo -e "${GREEN}✅ Docker is running!${NC}"
}

# Download Llama 2 model
download_llama2() {
    echo ""
    echo -e "${CYAN}🧠 Checking if Llama 2 model is available...${NC}"
    
    if ollama list | grep -q "llama2"; then
        echo -e "${GREEN}✅ Llama 2 model found!${NC}"
    else
        echo -e "${YELLOW}📥 Downloading Llama 2 model (4GB)...${NC}"
        echo -e "${YELLOW}   This takes 5-10 minutes depending on internet speed${NC}"
        echo ""
        
        ollama pull llama2
        
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✅ Llama 2 downloaded successfully!${NC}"
        else
            echo -e "${RED}❌ Failed to download Llama 2${NC}"
            echo -e "${YELLOW}   Try manually: ollama pull llama2${NC}"
            exit 1
        fi
    fi
}

# Build Docker images
build_images() {
    echo ""
    echo -e "${CYAN}🔨 Building Docker images...${NC}"
    echo -e "${YELLOW}   Backend (Python FastAPI)...${NC}"
    echo -e "${YELLOW}   Frontend (React with Vite)...${NC}"
    echo -e "${YELLOW}   (This takes 2-5 minutes)${NC}"
    echo ""
    
    if docker-compose build; then
        echo -e "${GREEN}✅ Docker images built successfully!${NC}"
    else
        echo -e "${RED}❌ Failed to build Docker images${NC}"
        echo -e "${YELLOW}   Check the output above for errors${NC}"
        exit 1
    fi
}

# Start services
start_services() {
    echo ""
    echo -e "${CYAN}🚀 Starting services...${NC}"
    
    if docker-compose up -d; then
        echo -e "${GREEN}✅ Services started!${NC}"
    else
        echo -e "${RED}❌ Failed to start services${NC}"
        exit 1
    fi
}

# Wait for health checks
wait_for_health() {
    echo ""
    echo -e "${CYAN}⏳ Waiting for services to be healthy...${NC}"
    echo -e "${YELLOW}   (Max 3 minutes for Ollama to load model)${NC}"
    echo ""
    
    local max_attempts=36  # 3 minutes with 5 second intervals
    local attempt=0
    
    while [ $attempt -lt $max_attempts ]; do
        echo -ne "\r${CYAN}   Checking... (${attempt}/${max_attempts})${NC}"
        
        local ollama_health=$(docker-compose exec -T ollama curl -s http://localhost:11434/api/tags > /dev/null 2>&1 && echo "healthy" || echo "unhealthy")
        local backend_health=$(docker-compose exec -T backend curl -s http://localhost:8000/health > /dev/null 2>&1 && echo "healthy" || echo "unhealthy")
        local frontend_health=$(docker-compose exec -T frontend curl -s http://localhost:5173/ > /dev/null 2>&1 && echo "healthy" || echo "unhealthy")
        
        if [ "$ollama_health" = "healthy" ] && [ "$backend_health" = "healthy" ] && [ "$frontend_health" = "healthy" ]; then
            echo ""
            echo -e "${GREEN}✅ All services are healthy!${NC}"
            return 0
        fi
        
        attempt=$((attempt + 1))
        sleep 5
    done
    
    echo ""
    echo -e "${YELLOW}⚠️  Timeout waiting for services (this is normal for first run)${NC}"
    echo -e "${YELLOW}   Services may still be starting, check status with:${NC}"
    echo -e "${BLUE}   docker-compose ps${NC}"
    return 0
}

# Display service status
show_status() {
    echo ""
    echo -e "${CYAN}📊 Service Status:${NC}"
    echo ""
    
    docker-compose ps
    
    echo ""
    echo -e "${GREEN}✅ Setup Complete!${NC}"
}

# Display access information
show_access_info() {
    echo ""
    echo -e "${CYAN}🌐 Access Your Application:${NC}"
    echo ""
    echo -e "${BLUE}Frontend (React UI):${NC}"
    echo -e "   ${GREEN}http://localhost:5173${NC}"
    echo ""
    echo -e "${BLUE}Backend API (FastAPI):${NC}"
    echo -e "   ${GREEN}http://localhost:8000${NC}"
    echo -e "   ${GREEN}http://localhost:8000/docs${NC} (Swagger UI)"
    echo ""
    echo -e "${BLUE}Ollama LLM Server:${NC}"
    echo -e "   ${GREEN}http://localhost:11434${NC}"
    echo ""
}

# Show useful commands
show_commands() {
    echo -e "${CYAN}📖 Useful Commands:${NC}"
    echo ""
    echo -e "${BLUE}View logs:${NC}"
    echo "   docker-compose logs -f"
    echo ""
    echo -e "${BLUE}Stop services:${NC}"
    echo "   docker-compose stop"
    echo ""
    echo -e "${BLUE}Start services:${NC}"
    echo "   docker-compose start"
    echo ""
    echo -e "${BLUE}Rebuild services:${NC}"
    echo "   docker-compose down && docker-compose build --no-cache && docker-compose up -d"
    echo ""
    echo -e "${BLUE}Check service logs:${NC}"
    echo "   docker-compose logs -f backend"
    echo "   docker-compose logs -f frontend"
    echo "   docker-compose logs -f ollama"
    echo ""
}

# Show next steps
show_next_steps() {
    echo -e "${CYAN}📋 Next Steps:${NC}"
    echo ""
    echo "1. Open your browser to: http://localhost:5173"
    echo "2. Search for a company (e.g., OpenAI, Google, Microsoft)"
    echo "3. Click the Analyze button"
    echo "4. Wait 30-60 seconds for LLM processing"
    echo "5. Review the analysis results"
    echo ""
}

# Show system info
show_system_info() {
    echo -e "${CYAN}💻 System Information:${NC}"
    echo ""
    echo -e "${BLUE}Docker:${NC}"
    docker --version
    echo ""
    echo -e "${BLUE}Docker Compose:${NC}"
    docker-compose --version
    echo ""
    echo -e "${BLUE}Ollama:${NC}"
    ollama -v 2>/dev/null || echo "Ollama installed"
    echo ""
}

# Main execution
main() {
    # Check prerequisites
    if ! check_prerequisites; then
        show_installation_help
    fi
    
    # Verify Docker is running
    verify_docker_running
    
    # Show system info
    show_system_info
    
    # Download Llama 2 if needed
    download_llama2
    
    # Build images
    build_images
    
    # Start services
    start_services
    
    # Wait for health
    wait_for_health
    
    # Show status
    show_status
    
    # Show access info
    show_access_info
    
    # Show commands
    show_commands
    
    # Show next steps
    show_next_steps
    
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${GREEN}🎉 Your containerized application is ready!${NC}"
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
}

# Run main function
main
