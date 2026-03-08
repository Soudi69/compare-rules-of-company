#!/bin/bash

# 🚀 AI Rules Analyzer - Smart Docker Launcher
# Automatically downloads prerequisites and starts the application

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
NC='\033[0m'

# Project directory
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Banner
print_banner() {
    echo ""
    echo -e "${MAGENTA}╔════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${MAGENTA}║                                                            ║${NC}"
    echo -e "${MAGENTA}║     🐳  AI Rules Analyzer - Smart Docker Launcher  🐳       ║${NC}"
    echo -e "${MAGENTA}║                                                            ║${NC}"
    echo -e "${MAGENTA}║  Comparing company AI ethical rules with LLM analysis     ║${NC}"
    echo -e "${MAGENTA}║                                                            ║${NC}"
    echo -e "${MAGENTA}╚════════════════════════════════════════════════════════════╝${NC}"
    echo ""
}

# Check if running on macOS
is_macos() {
    [[ "$OSTYPE" == "darwin"* ]]
}

# Check if running on Linux
is_linux() {
    [[ "$OSTYPE" == "linux-gnu"* ]]
}

# Check if command exists
command_exists() {
    command -v "$1" &> /dev/null
}

# Print status
print_status() {
    echo -e "${BLUE}→${NC} $1"
}

print_success() {
    echo -e "${GREEN}✅${NC} $1"
}

print_error() {
    echo -e "${RED}❌${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠️ ${NC} $1"
}

# Check prerequisites
check_and_install_prerequisites() {
    print_status "Checking for required software..."
    echo ""
    
    local missing_apps=()
    local install_brew=false
    
    # Check Docker
    if ! command_exists docker; then
        print_error "Docker not found"
        missing_apps+=("Docker")
    else
        print_success "Docker $(docker --version | cut -d' ' -f3)"
    fi
    
    # Check Docker Compose
    if ! command_exists docker-compose; then
        print_error "Docker Compose not found"
        missing_apps+=("Docker Compose")
    else
        print_success "Docker Compose $(docker-compose --version | cut -d' ' -f3)"
    fi
    
    # Check Ollama
    if ! command_exists ollama; then
        print_error "Ollama not found"
        missing_apps+=("Ollama")
    else
        print_success "Ollama installed"
    fi
    
    # If on macOS, offer Homebrew installation
    if [ ${#missing_apps[@]} -gt 0 ]; then
        echo ""
        echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
        echo -e "${YELLOW}Missing prerequisites: ${missing_apps[@]}${NC}"
        echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
        echo ""
        
        if is_macos && command_exists brew; then
            print_warning "Installing missing apps via Homebrew..."
            echo ""
            
            if [[ " ${missing_apps[@]} " =~ " Docker " ]]; then
                print_status "Installing Docker Desktop..."
                echo "→ Please visit: https://www.docker.com/products/docker-desktop"
                echo "→ Download and install, then run this script again"
                return 1
            fi
            
            if [[ " ${missing_apps[@]} " =~ " Ollama " ]]; then
                print_status "Installing Ollama..."
                echo "→ Please visit: https://ollama.ai"
                echo "→ Download and install, then run this script again"
                return 1
            fi
            
            return 1
        else
            echo ""
            if is_macos; then
                echo -e "${BLUE}macOS Installation:${NC}"
                echo "  1. Install Homebrew: https://brew.sh"
                echo "  2. brew install docker"
                echo "  3. Install Docker Desktop: https://www.docker.com/products/docker-desktop"
                echo "  4. brew install ollama"
                echo ""
            elif is_linux; then
                echo -e "${BLUE}Linux Installation:${NC}"
                echo "  Run: ${GREEN}sudo chmod +x ${PROJECT_DIR}/install-prerequisites-linux.sh${NC}"
                echo "       ${GREEN}sudo ${PROJECT_DIR}/install-prerequisites-linux.sh${NC}"
                echo ""
            else
                echo -e "${BLUE}Installation:${NC}"
                echo "  Visit https://www.docker.com/products/docker-desktop"
                echo "  Visit https://ollama.ai"
                echo ""
            fi
            
            return 1
        fi
    fi
    
    return 0
}

# Verify Docker is running
verify_docker_running() {
    print_status "Verifying Docker daemon is running..."
    
    if ! docker ps &> /dev/null; then
        print_error "Docker daemon is not running"
        echo ""
        
        if is_macos; then
            echo "Please start Docker Desktop:"
            echo "  • Open Applications > Docker.app"
            echo "  • Wait for Docker menu icon to appear"
            echo "  • Then run this script again"
        else
            echo "Please start Docker daemon:"
            echo "  Linux: sudo systemctl start docker"
            echo "  Then run this script again"
        fi
        
        return 1
    fi
    
    print_success "Docker daemon is running"
    return 0
}

# Download Ollama model
download_ollama_model() {
    print_status "Checking Ollama models..."
    
    if ollama list 2>/dev/null | grep -q "llama2"; then
        print_success "Llama 2 model is available"
        return 0
    fi
    
    echo ""
    echo -e "${YELLOW}Llama 2 model not found. Starting Ollama service...${NC}"
    echo ""
    
    # Start Ollama in background if not running
    if ! pgrep -x "ollama" > /dev/null; then
        print_status "Starting Ollama service..."
        
        if is_macos; then
            # Start Ollama (should start as service on macOS)
            if command_exists ollama; then
                ollama serve > /tmp/ollama.log 2>&1 &
                sleep 2
            fi
        fi
    fi
    
    print_status "Downloading Llama 2 model (4GB, takes 5-10 minutes)..."
    echo ""
    
    if ollama pull llama2; then
        print_success "Llama 2 model downloaded successfully"
        return 0
    else
        print_error "Failed to download Llama 2 model"
        echo "Try manually: ${BLUE}ollama pull llama2${NC}"
        return 1
    fi
}

# Build Docker images
build_docker_images() {
    echo ""
    print_status "Building Docker images..."
    echo ""
    
    cd "$PROJECT_DIR"
    
    if docker-compose build; then
        print_success "Docker images built successfully"
        return 0
    else
        print_error "Failed to build Docker images"
        echo ""
        echo "Try rebuilding without cache:"
        echo "  ${BLUE}docker-compose build --no-cache${NC}"
        return 1
    fi
}

# Start services
start_services() {
    echo ""
    print_status "Starting Docker containers..."
    echo ""
    
    cd "$PROJECT_DIR"
    
    if docker-compose up -d; then
        print_success "Docker containers started"
        return 0
    else
        print_error "Failed to start Docker containers"
        return 1
    fi
}

# Wait for services to be healthy
wait_for_services() {
    echo ""
    print_status "Waiting for services to be ready..."
    echo ""
    
    local max_wait=180  # 3 minutes
    local elapsed=0
    
    while [ $elapsed -lt $max_wait ]; do
        local status=$(docker-compose ps --format "{{.Status}}")
        
        if echo "$status" | grep -q "healthy"; then
            # Check if all services are up
            local count=$(docker-compose ps --format "{{.Status}}" | grep -c "Up\|healthy")
            local expected=3
            
            if [ "$count" -ge "$expected" ]; then
                print_success "All services are ready!"
                return 0
            fi
        fi
        
        echo -ne "\r${CYAN}⏳ Waiting... ${elapsed}s${NC}"
        sleep 5
        elapsed=$((elapsed + 5))
    done
    
    echo ""
    print_warning "Timeout waiting for services (may still be starting)"
    return 0
}

# Show service status
show_service_status() {
    echo ""
    print_status "Service Status:"
    echo ""
    docker-compose ps
}

# Show access information
show_access_info() {
    echo ""
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${CYAN}🌐 Access Your Application:${NC}"
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo -e "${BLUE}Frontend (React UI):${NC}"
    echo -e "   👉  ${GREEN}http://localhost:5173${NC}"
    echo ""
    echo -e "${BLUE}Backend API (FastAPI):${NC}"
    echo -e "   👉  ${GREEN}http://localhost:8000${NC}"
    echo -e "   📚  ${GREEN}http://localhost:8000/docs${NC} (Interactive API docs)"
    echo ""
    echo -e "${BLUE}Ollama LLM Server:${NC}"
    echo -e "   👉  ${GREEN}http://localhost:11434${NC}"
    echo ""
}

# Show useful commands
show_useful_commands() {
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${CYAN}📖 Useful Docker Commands:${NC}"
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo -e "${BLUE}View logs (all services):${NC}"
    echo "   ${CYAN}docker-compose logs -f${NC}"
    echo ""
    echo -e "${BLUE}View backend logs:${NC}"
    echo "   ${CYAN}docker-compose logs -f backend${NC}"
    echo ""
    echo -e "${BLUE}View frontend logs:${NC}"
    echo "   ${CYAN}docker-compose logs -f frontend${NC}"
    echo ""
    echo -e "${BLUE}Stop all services:${NC}"
    echo "   ${CYAN}docker-compose stop${NC}"
    echo ""
    echo -e "${BLUE}Start all services:${NC}"
    echo "   ${CYAN}docker-compose start${NC}"
    echo ""
    echo -e "${BLUE}Restart services:${NC}"
    echo "   ${CYAN}docker-compose restart${NC}"
    echo ""
    echo -e "${BLUE}Remove everything:${NC}"
    echo "   ${CYAN}docker-compose down${NC}"
    echo ""
}

# Show next steps
show_next_steps() {
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${CYAN}📋 Next Steps:${NC}"
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo "1️⃣  Open your web browser"
    echo "2️⃣  Visit: ${GREEN}http://localhost:5173${NC}"
    echo "3️⃣  Search for a company (e.g., OpenAI, Google, Microsoft, Meta, Amazon)"
    echo "4️⃣  Click the ${BLUE}Analyze${NC} button"
    echo "5️⃣  Wait 30-60 seconds for LLM analysis"
    echo "6️⃣  Review results: Red flags, timeline, recommendations"
    echo ""
    echo "💡 Tip: Check the API docs at ${GREEN}http://localhost:8000/docs${NC}"
    echo ""
}

# Show completion message
show_completion() {
    echo ""
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${GREEN}🎉 Setup Complete! Your application is ready to use! 🎉${NC}"
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
}

# Main execution
main() {
    print_banner
    
    # Check and install prerequisites
    if ! check_and_install_prerequisites; then
        echo ""
        print_error "Please install missing prerequisites and try again"
        exit 1
    fi
    
    echo ""
    
    # Verify Docker is running
    if ! verify_docker_running; then
        echo ""
        print_error "Please start Docker and try again"
        exit 1
    fi
    
    echo ""
    
    # Download Ollama model
    if ! download_ollama_model; then
        echo ""
        print_error "Could not download Ollama model"
        exit 1
    fi
    
    # Build Docker images
    if ! build_docker_images; then
        echo ""
        print_error "Failed to build Docker images"
        exit 1
    fi
    
    # Start services
    if ! start_services; then
        echo ""
        print_error "Failed to start services"
        exit 1
    fi
    
    # Wait for services
    wait_for_services
    
    # Show status
    show_service_status
    
    # Show access info
    show_access_info
    
    # Show useful commands
    show_useful_commands
    
    # Show next steps
    show_next_steps
    
    # Show completion
    show_completion
    
    echo "Questions? Check the documentation:"
    echo "  📖 DOCKER_QUICK_START.md"
    echo "  📖 DOCKER_GUIDE.md"
    echo "  📖 README.md"
    echo ""
    echo "Happy analyzing! 🚀"
    echo ""
}

# Run main
main
