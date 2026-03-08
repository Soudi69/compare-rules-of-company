# 🐳 Docker Setup Guide

## What is Containerization?

Containerization packages your entire application (code, dependencies, OS) into a single unit called a container. Benefits:

- ✅ **Same everywhere** - Works identically on any machine
- ✅ **No installation** - No need to install prerequisites manually
- ✅ **Easy deployment** - Deploy to cloud instantly
- ✅ **Isolated** - Each service runs independently
- ✅ **Easy to scale** - Run multiple instances easily

## Prerequisites

### Install Docker Desktop

**macOS & Windows:**
1. Download: https://www.docker.com/products/docker-desktop
2. Install and launch
3. Verify:
```bash
docker --version
docker-compose --version
```

**Linux (Ubuntu/Debian):**
```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verify
docker --version
docker-compose --version
```

## Docker Architecture

```
┌─────────────────────────────────────────────────────┐
│                 Your Application                    │
├─────────────────────────────────────────────────────┤
│                  Docker Desktop                     │
├─────────────────────────────────────────────────────┤
│                    Containers:                      │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐     │
│  │ Ollama   │    │ Backend  │    │ Frontend │     │
│  │ :11434   │    │ :8000    │    │ :5173    │     │
│  └──────────┘    └──────────┘    └──────────┘     │
├─────────────────────────────────────────────────────┤
│          Docker Engine (Virtualization)             │
├─────────────────────────────────────────────────────┤
│            Host Operating System (macOS/Linux/Win)  │
└─────────────────────────────────────────────────────┘
```

## One-Command Setup

```bash
# Make script executable (macOS/Linux)
chmod +x docker-compose-setup.sh

# Run setup
./docker-compose-setup.sh

# Windows: Just double-click docker-compose-setup.bat
```

This will:
1. ✅ Build all Docker images
2. ✅ Start all 3 services
3. ✅ Wait for services to be healthy
4. ✅ Show you the URLs

## Manual Docker Commands

### Build Images
```bash
# Build all images
docker-compose build

# Build without cache
docker-compose build --no-cache

# Build specific service
docker-compose build backend
```

### Start Services
```bash
# Start all services in background
docker-compose up -d

# Start and view logs
docker-compose up

# Start specific service
docker-compose up -d backend
```

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f ollama

# Last 100 lines
docker-compose logs --tail 100
```

### Stop Services
```bash
# Stop all services (keeps containers)
docker-compose stop

# Stop and remove containers
docker-compose down

# Remove everything (containers + volumes)
docker-compose down -v
```

### Check Status
```bash
# Show running containers
docker-compose ps

# Detailed info
docker-compose ps -a

# Check health
docker-compose ps
```

### Execute Commands
```bash
# Run command in backend
docker-compose exec backend python -c "import sys; print(sys.version)"

# Run command in frontend
docker-compose exec frontend npm --version

# Enter container shell
docker-compose exec backend bash
docker-compose exec frontend sh
```

### Other Useful Commands
```bash
# Restart services
docker-compose restart

# Restart specific service
docker-compose restart backend

# Pull latest images
docker-compose pull

# View resource usage
docker stats

# Clean up unused images
docker image prune
```

## File Structure

```
compare-rules-of-company/
├── Dockerfile.backend          # Backend container config
├── Dockerfile.frontend         # Frontend container config
├── Dockerfile.ollama          # Ollama container config
├── docker-compose.yml         # Container orchestration
├── docker-compose-setup.sh    # Automated setup (macOS/Linux)
├── docker-compose-setup.bat   # Automated setup (Windows)
├── .dockerignore              # Files to exclude from images
└── DOCKER_GUIDE.md           # This file
```

## What Each Dockerfile Does

### Dockerfile.backend
- Uses Python 3.11 slim image
- Installs dependencies from requirements.txt
- Exposes port 8000
- Runs FastAPI server
- Includes health check

### Dockerfile.frontend
- Uses Node 18 Alpine for small size
- Two-stage build (smaller final image)
- Builds React app with Vite
- Uses `serve` to run production build
- Exposes port 5173

### Dockerfile.ollama
- Uses official Ollama image
- Exposes port 11434
- Persists models in named volume

## Docker Compose Services

### Configuration (`docker-compose.yml`)

1. **ollama service**
   - LLM model server
   - Port: 11434
   - Health check: API tags endpoint
   - Data persisted in `ollama_data` volume

2. **backend service**
   - FastAPI application
   - Port: 8000
   - Depends on: ollama
   - Health check: /health endpoint
   - Environment: OLLAMA_BASE_URL

3. **frontend service**
   - React application
   - Port: 5173
   - Depends on: backend
   - Health check: HTTP request to root

4. **Network**
   - All services on `ai-rules-network`
   - Enables service-to-service communication
   - Backend talks to Ollama as `http://ollama:11434`

## Port Mapping

| Service | Container Port | Host Port |
|---------|--------|-----------|
| Ollama | 11434 | 11434 |
| Backend | 8000 | 8000 |
| Frontend | 5173 | 5173 |

Access:
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs
- Ollama: http://localhost:11434

## Volumes

### Named Volumes
- `ollama_data` - Persists Llama 2 model
  - Survives container restarts
  - Stored in Docker's managed location

### Bind Mounts
- Application code is copied into images
- No hot reload (changes require rebuild)

## Networks

### ai-rules-network (Custom Bridge)
- All 3 services connected
- Internal DNS resolution
- Backend can reach Ollama as `http://ollama:11434`
- Frontend can reach Backend as `http://backend:8000`

## Health Checks

Each service has health checks:

```yaml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:8000/health"]
  interval: 30s        # Check every 30 seconds
  timeout: 10s         # Wait 10 seconds for response
  retries: 3           # Fail after 3 consecutive failures
  start_period: 30s    # Wait 30 seconds before first check
```

Benefits:
- Docker automatically restarts unhealthy containers
- docker-compose waits for healthy services

## Troubleshooting

### Services won't start
```bash
# Check logs
docker-compose logs

# Check specific service
docker-compose logs backend

# Check Docker daemon
docker ps

# Restart Docker daemon (Docker Desktop)
# Click menu > Restart
```

### Port already in use
```bash
# Find what's using port 8000
lsof -i :8000

# Kill process
kill -9 <PID>

# Or change port in docker-compose.yml
# "8000:8000" → "8001:8000"
```

### Out of disk space
```bash
# Clean up unused images
docker image prune -a

# Clean up unused volumes
docker volume prune

# Remove all stopped containers
docker container prune
```

### Container is stuck
```bash
# Force stop
docker-compose kill

# Remove
docker-compose down

# Start fresh
docker-compose up -d
```

## Performance Tips

1. **Use smaller images**
   - alpine versions (Node, Python)
   - Saves disk space and bandwidth

2. **Build caching**
   - Layers are cached
   - Change order from frequently-changing to stable
   - Speeds up subsequent builds

3. **Multi-stage builds**
   - Frontend uses builder stage
   - Final image only has production files
   - Reduces image size

4. **Resource limits** (optional in docker-compose.yml)
```yaml
services:
  backend:
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
```

## Deployment to Cloud

### AWS (ECS)
```bash
# Push to ECR
aws ecr get-login-password | docker login --username AWS --password-stdin <account>.dkr.ecr.<region>.amazonaws.com
docker tag ai-rules-backend:latest <account>.dkr.ecr.<region>.amazonaws.com/ai-rules-backend:latest
docker push <account>.dkr.ecr.<region>.amazonaws.com/ai-rules-backend:latest
```

### Docker Hub
```bash
# Push to Docker Hub
docker login
docker tag ai-rules-backend:latest yourusername/ai-rules-backend:latest
docker push yourusername/ai-rules-backend:latest
```

### Kubernetes
```bash
# Create k8s manifests from docker-compose
kompose convert -f docker-compose.yml

# Or use Helm charts
```

See `DEPLOYMENT.md` for more cloud options.

## Resources

- Docker Docs: https://docs.docker.com
- Docker Compose Docs: https://docs.docker.com/compose
- Docker Hub: https://hub.docker.com
- Best Practices: https://docs.docker.com/develop/develop-images/dockerfile_best-practices/

## Next Steps

1. ✅ Install Docker Desktop
2. ✅ Run `./docker-compose-setup.sh`
3. ✅ Wait for services to start
4. ✅ Open http://localhost:5173
5. ✅ Test the application!

---

**Happy containerizing!** 🐳
