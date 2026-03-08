# Docker Compose Script - All in One
#!/bin/bash

set -e

echo "🚀 AI Rules Analyzer - Docker Setup & Launch"
echo "=============================================="
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed!"
    echo "Please install Docker from: https://www.docker.com/products/docker-desktop"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed!"
    echo "Please install Docker Compose from: https://docs.docker.com/compose/install/"
    exit 1
fi

echo "✓ Docker: $(docker --version)"
echo "✓ Docker Compose: $(docker-compose --version)"
echo ""

# Function to build images
build_images() {
    echo "📦 Building Docker images..."
    docker-compose build --no-cache
    echo "✓ Images built successfully!"
    echo ""
}

# Function to start services
start_services() {
    echo "🎬 Starting services with docker-compose..."
    docker-compose up -d
    echo "✓ Services starting..."
    echo ""
}

# Function to wait for services
wait_for_services() {
    echo "⏳ Waiting for services to be healthy..."
    echo ""
    
    # Wait for Ollama
    echo "  Waiting for Ollama (max 2 minutes)..."
    counter=0
    while [ $counter -lt 120 ]; do
        if docker-compose exec -T ollama curl -s http://localhost:11434/api/tags > /dev/null 2>&1; then
            echo "  ✓ Ollama is ready!"
            break
        fi
        counter=$((counter + 1))
        sleep 1
        if [ $((counter % 10)) -eq 0 ]; then
            echo "  ⏳ Still waiting... ($counter seconds)"
        fi
    done
    echo ""
    
    # Wait for Backend
    echo "  Waiting for Backend API (max 1 minute)..."
    counter=0
    while [ $counter -lt 60 ]; do
        if docker-compose exec -T backend curl -s http://localhost:8000/health > /dev/null 2>&1; then
            echo "  ✓ Backend is ready!"
            break
        fi
        counter=$((counter + 1))
        sleep 1
        if [ $((counter % 10)) -eq 0 ]; then
            echo "  ⏳ Still waiting... ($counter seconds)"
        fi
    done
    echo ""
    
    # Wait for Frontend
    echo "  Waiting for Frontend (max 30 seconds)..."
    counter=0
    while [ $counter -lt 30 ]; do
        if docker-compose exec -T frontend wget -q -O /dev/null http://localhost:5173/ 2>/dev/null; then
            echo "  ✓ Frontend is ready!"
            break
        fi
        counter=$((counter + 1))
        sleep 1
    done
    echo ""
}

# Function to show status
show_status() {
    echo "📊 Service Status:"
    echo "  🔧 Backend API: http://localhost:8000"
    echo "  📚 API Docs: http://localhost:8000/docs"
    echo "  🎨 Frontend: http://localhost:5173"
    echo "  🦙 Ollama: http://localhost:11434"
    echo ""
    
    # Show container status
    echo "📦 Containers:"
    docker-compose ps
    echo ""
}

# Function to show logs
show_logs() {
    echo "📜 Available Commands:"
    echo ""
    echo "  View logs:"
    echo "    docker-compose logs -f"
    echo "    docker-compose logs -f backend"
    echo "    docker-compose logs -f frontend"
    echo "    docker-compose logs -f ollama"
    echo ""
    echo "  Stop services:"
    echo "    docker-compose down"
    echo ""
    echo "  Restart services:"
    echo "    docker-compose restart"
    echo ""
}

# Main execution
echo "Step 1: Building Docker images..."
build_images

echo "Step 2: Starting services..."
start_services

echo "Step 3: Waiting for services to be ready..."
wait_for_services

echo "Step 4: Service status"
show_status

echo "✅ All services are running!"
echo ""
echo "🎉 You can now access the application:"
echo "   Frontend: http://localhost:5173"
echo "   Backend API: http://localhost:8000"
echo "   API Docs: http://localhost:8000/docs"
echo ""
show_logs

echo "Happy analyzing! 🚀"
