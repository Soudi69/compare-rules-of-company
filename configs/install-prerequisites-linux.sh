#!/bin/bash

echo "🚀 AI Rules Analyzer - Prerequisites Installer (Linux)"
echo "======================================================="
echo ""
echo "This script will install all required prerequisites:"
echo "  • Node.js 18+ (for frontend)"
echo "  • Python 3.8+ (for backend)"
echo "  • Docker & Docker Compose (for containerization)"
echo "  • Ollama (for Llama 2 LLM)"
echo ""
echo "System: $(uname -s)"
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Detect Linux distribution
if [ -f /etc/os-release ]; then
    . /etc/os-release
    OS=$ID
else
    OS=$(uname -s)
fi

echo "Detected OS: $OS"
echo ""

# Update package manager
echo -e "${YELLOW}Updating package manager...${NC}"
if command -v apt-get &> /dev/null; then
    sudo apt-get update -y
elif command -v yum &> /dev/null; then
    sudo yum update -y
fi
echo ""

# Install Node.js
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}Installing Node.js...${NC}"
    if command -v apt-get &> /dev/null; then
        curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
        sudo apt-get install -y nodejs
    elif command -v yum &> /dev/null; then
        sudo yum install -y nodejs npm
    fi
    echo -e "${GREEN}✓ Node.js $(node --version) installed${NC}"
else
    echo -e "${GREEN}✓ Node.js $(node --version) already installed${NC}"
fi

echo ""

# Install Python
if ! command -v python3 &> /dev/null; then
    echo -e "${YELLOW}Installing Python 3...${NC}"
    if command -v apt-get &> /dev/null; then
        sudo apt-get install -y python3 python3-pip python3-venv
    elif command -v yum &> /dev/null; then
        sudo yum install -y python3 python3-pip
    fi
    echo -e "${GREEN}✓ Python $(python3 --version) installed${NC}"
else
    echo -e "${GREEN}✓ Python $(python3 --version) already installed${NC}"
fi

echo ""

# Install Docker
if ! command -v docker &> /dev/null; then
    echo -e "${YELLOW}Installing Docker...${NC}"
    if command -v apt-get &> /dev/null; then
        curl -fsSL https://get.docker.com -o get-docker.sh
        sudo sh get-docker.sh
        rm get-docker.sh
    elif command -v yum &> /dev/null; then
        sudo yum install -y docker
        sudo systemctl start docker
    fi
    sudo usermod -aG docker $USER
    echo -e "${GREEN}✓ Docker installed${NC}"
    echo "  Note: You may need to log out and back in for group changes to take effect"
else
    echo -e "${GREEN}✓ Docker $(docker --version) already installed${NC}"
fi

echo ""

# Install Docker Compose
if ! command -v docker-compose &> /dev/null; then
    echo -e "${YELLOW}Installing Docker Compose...${NC}"
    sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    echo -e "${GREEN}✓ Docker Compose installed${NC}"
else
    echo -e "${GREEN}✓ Docker Compose already installed${NC}"
fi

echo ""

# Install Ollama
if ! command -v ollama &> /dev/null; then
    echo -e "${YELLOW}Installing Ollama...${NC}"
    curl -fsSL https://ollama.ai/install.sh | sh
    echo -e "${GREEN}✓ Ollama installed${NC}"
    echo "  Start Ollama with: ollama serve"
else
    echo -e "${GREEN}✓ Ollama already installed${NC}"
fi

echo ""
echo "=== Installation Summary ==="
echo ""

echo "Checking installed versions:"
echo ""

if command -v node &> /dev/null; then
    echo -e "${GREEN}✓ Node.js:${NC} $(node --version)"
else
    echo -e "${RED}✗ Node.js: NOT INSTALLED${NC}"
fi

if command -v python3 &> /dev/null; then
    echo -e "${GREEN}✓ Python:${NC} $(python3 --version)"
else
    echo -e "${RED}✗ Python: NOT INSTALLED${NC}"
fi

if command -v docker &> /dev/null; then
    echo -e "${GREEN}✓ Docker:${NC} $(docker --version)"
else
    echo -e "${RED}✗ Docker: NOT INSTALLED${NC}"
fi

if command -v docker-compose &> /dev/null; then
    echo -e "${GREEN}✓ Docker Compose:${NC} $(docker-compose --version)"
else
    echo -e "${RED}✗ Docker Compose: NOT INSTALLED${NC}"
fi

if command -v ollama &> /dev/null; then
    echo -e "${GREEN}✓ Ollama:${NC} installed"
else
    echo -e "${RED}✗ Ollama: NOT INSTALLED${NC}"
fi

echo ""
echo "=== Next Steps ==="
echo ""
echo "1. If running for first time with sudo, reset docker group:"
echo "   newgrp docker"
echo ""
echo "2. Download Llama 2 model:"
echo "   ollama pull llama2"
echo ""
echo "3. Start Ollama server (in one terminal):"
echo "   ollama serve"
echo ""
echo "4. In another terminal, navigate to project and start Docker:"
echo "   cd compare-rules-of-company"
echo "   chmod +x docker-compose-setup.sh"
echo "   ./docker-compose-setup.sh"
echo ""
echo "Happy coding! 🚀"
