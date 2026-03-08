#!/bin/bash

echo "🚀 AI Rules Analyzer - Setup Script"
echo "===================================="
echo ""

# Check prerequisites
echo "✓ Checking prerequisites..."

if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ from https://nodejs.org"
    exit 1
fi

if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8+ from https://www.python.org"
    exit 1
fi

if ! command -v ollama &> /dev/null; then
    echo "⚠️  Ollama is not installed. Please install from https://ollama.ai"
    echo "   After installation, run: ollama pull llama2"
    echo "   Then start it with: ollama serve"
    exit 1
fi

echo "✓ Node.js: $(node -v)"
echo "✓ Python: $(python3 --version)"
echo "✓ Ollama: installed"
echo ""

# Backend setup
echo "📦 Setting up backend..."
cd backend

# Create virtual environment
if [ ! -d "venv" ]; then
    python3 -m venv venv
    echo "✓ Virtual environment created"
fi

# Activate virtual environment
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
echo "✓ Backend dependencies installed"

# Copy env file
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo "✓ .env file created"
fi

cd ..

# Frontend setup
echo "📦 Setting up frontend..."
cd frontend

# Install dependencies
npm install
echo "✓ Frontend dependencies installed"

cd ..

echo ""
echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo ""
echo "1. Start Ollama (in a new terminal):"
echo "   ollama serve"
echo ""
echo "2. Start the backend (in another terminal):"
echo "   cd backend"
echo "   source venv/bin/activate"
echo "   python main.py"
echo ""
echo "3. Start the frontend (in another terminal):"
echo "   cd frontend"
echo "   npm run dev"
echo ""
echo "4. Open http://localhost:5173 in your browser"
echo ""
echo "🎉 Happy analyzing!"
