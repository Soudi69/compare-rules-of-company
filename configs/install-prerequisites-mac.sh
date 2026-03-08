#!/bin/bash

echo "🚀 AI Rules Analyzer - Prerequisites Installer"
echo "=============================================="
echo ""
echo "This script will install all required prerequisites:"
echo "  • Node.js 18+ (for frontend)"
echo "  • Python 3.8+ (for backend)"
echo "  • Docker & Docker Compose (for containerization)"
echo "  • Ollama (for Llama 2 LLM)"
echo ""
echo "Checking your macOS system..."
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check for Homebrew
if ! command -v brew &> /dev/null; then
    echo -e "${YELLOW}Installing Homebrew...${NC}"
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    echo -e "${GREEN}✓ Homebrew installed${NC}"
else
    echo -e "${GREEN}✓ Homebrew already installed${NC}"
fi

echo ""

# Install Node.js
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}Installing Node.js...${NC}"
    brew install node
    echo -e "${GREEN}✓ Node.js $(node --version) installed${NC}"
else
    echo -e "${GREEN}✓ Node.js $(node --version) already installed${NC}"
fi

echo ""

# Install Python
if ! command -v python3 &> /dev/null; then
    echo -e "${YELLOW}Installing Python 3...${NC}"
    brew install python@3.11
    echo -e "${GREEN}✓ Python $(python3 --version) installed${NC}"
else
    echo -e "${GREEN}✓ Python $(python3 --version) already installed${NC}"
fi

echo ""

# Install Docker
if ! command -v docker &> /dev/null; then
    echo -e "${YELLOW}Installing Docker...${NC}"
    echo "Please visit: https://www.docker.com/products/docker-desktop"
    echo "Download and install Docker Desktop for macOS"
    echo ""
    echo "After installation, verify with: docker --version"
else
    echo -e "${GREEN}✓ Docker $(docker --version) already installed${NC}"
fi

echo ""

# Install Docker Compose (usually comes with Docker Desktop)
if ! command -v docker-compose &> /dev/null; then
    echo -e "${YELLOW}Installing Docker Compose...${NC}"
    brew install docker-compose
    echo -e "${GREEN}✓ Docker Compose installed${NC}"
else
    echo -e "${GREEN}✓ Docker Compose already installed${NC}"
fi

echo ""

# Install Ollama
if ! command -v ollama &> /dev/null; then
    echo -e "${YELLOW}Installing Ollama...${NC}"
    echo "Please visit: https://ollama.ai"
    echo "Download and install Ollama for macOS"
    echo ""
    echo "After installation, verify with: ollama --version"
else
    echo -e "${GREEN}✓ Ollama already installed${NC}"
fi

echo ""
echo "=== Installation Summary ==="
echo ""

# Final checks
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
    echo "  Install from: https://www.docker.com/products/docker-desktop"
fi

if command -v docker-compose &> /dev/null; then
    echo -e "${GREEN}✓ Docker Compose:${NC} $(docker-compose --version)"
else
    echo -e "${RED}✗ Docker Compose: NOT INSTALLED${NC}"
fi

if command -v ollama &> /dev/null; then
    echo -e "${GREEN}✓ Ollama:${NC} $(ollama --version)"
else
    echo -e "${RED}✗ Ollama: NOT INSTALLED${NC}"
    echo "  Install from: https://ollama.ai"
fi

echo ""
echo "=== Next Steps ==="
echo ""
echo "1. If Docker or Ollama are not installed:"
echo "   - Download from the links above"
echo "   - Install and start"
echo ""
echo "2. After installation, run the Docker setup:"
echo "   chmod +x docker-compose-setup.sh"
echo "   ./docker-compose-setup.sh"
echo ""
echo "3. Or run manual docker-compose:"
echo "   docker-compose up -d"
echo ""
echo "Happy coding! 🚀"
