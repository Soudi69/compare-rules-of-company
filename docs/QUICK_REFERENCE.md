# Quick Start Commands

## Installation

### One-Command Setup (macOS/Linux)

```bash
chmod +x setup.sh && ./setup.sh
```

### One-Command Setup (Windows)

```cmd
setup.bat
```

## Running the Application

### Terminal 1: Start Ollama

```bash
ollama serve
```

### Terminal 2: Start Backend

```bash
cd backend
source venv/bin/activate  # macOS/Linux
# or
venv\Scripts\activate.bat  # Windows

python main.py
```

### Terminal 3: Start Frontend

```bash
cd frontend
npm run dev
```

### Open Browser

```
http://localhost:5173
```

## Common Commands

### Frontend

```bash
cd frontend
npm install      # Install dependencies
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm test         # Run tests
```

### Backend

```bash
cd backend
source venv/bin/activate

pip install -r requirements.txt  # Install dependencies
python main.py                   # Run server
pytest                           # Run tests
pip freeze                       # List all packages
```

### LLM/Ollama

```bash
ollama list              # List installed models
ollama pull llama2       # Download llama2 model
ollama pull llama2:q4    # Download quantized version (smaller)
ollama serve             # Start server
curl http://localhost:11434/api/tags  # Check connection
```

## API Testing

### Test Backend Health

```bash
curl http://localhost:8000/health
```

### Test Analysis API

```bash
curl -X POST http://localhost:8000/analyze \
  -H "Content-Type: application/json" \
  -d '{"company_name": "OpenAI"}'
```

### With jq for pretty output

```bash
curl -s -X POST http://localhost:8000/analyze \
  -H "Content-Type: application/json" \
  -d '{"company_name": "OpenAI"}' | jq
```

## Environment Setup

### Python Virtual Environment

```bash
cd backend

# Create
python3 -m venv venv

# Activate (macOS/Linux)
source venv/bin/activate

# Activate (Windows)
venv\Scripts\activate

# Deactivate
deactivate

# Check active environment
which python  # macOS/Linux
where python  # Windows
```

### Node Versions

```bash
# Check Node version
node -v

# Check npm version
npm -v

# Update npm
npm install -g npm@latest
```

## Troubleshooting Quick Fixes

### Ollama Connection Error

```bash
# Check if running
curl http://localhost:11434

# Restart Ollama
# Kill terminal and run:
ollama serve
```

### Port Already in Use

```bash
# macOS/Linux - Find and kill process
lsof -i :8000
kill -9 <PID>

# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

### Clear npm Cache

```bash
npm cache clean --force
npm install
```

### Rebuild Python Dependencies

```bash
pip install --force-reinstall -r requirements.txt
```

### Fresh Start

```bash
# Backend
rm -rf backend/venv
python3 -m venv backend/venv
source backend/venv/bin/activate
pip install -r backend/requirements.txt

# Frontend
rm -rf frontend/node_modules
npm install --prefix frontend
```

## Environment Variables

### Backend (.env)

```env
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama2
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:8000
```

## Production Build

```bash
# Build frontend
cd frontend
npm run build
# Output in frontend/dist

# Build backend
# Already production-ready with FastAPI
```

## Docker Quick Commands

```bash
# Build image
docker build -t ai-rules:latest .

# Run container
docker run -p 8000:8000 ai-rules:latest

# View running containers
docker ps

# View logs
docker logs <container_id>

# Stop container
docker stop <container_id>
```

## Useful Links

- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs
- Swagger UI: http://localhost:8000/docs#/
- ReDoc: http://localhost:8000/redoc
- Ollama: http://localhost:11434

## File Locations

```
compare-rules-of-company/
├── frontend/          # React app
├── backend/           # FastAPI app
├── README.md          # Main docs
├── GETTING_STARTED.md # Setup guide
├── DEVELOPER.md       # Development guide
├── DEPLOYMENT.md      # Deployment guide
├── QUICK_REFERENCE.md # This file
├── setup.sh          # Auto setup (macOS/Linux)
└── setup.bat         # Auto setup (Windows)
```

## Tips & Tricks

### Speed Up First Request

The first request to Ollama takes longer because it loads the model into memory.
Subsequent requests are much faster.

### Use Smaller Models

```bash
ollama pull mistral      # Faster, smaller
ollama pull neural-chat  # Optimized
```

### Monitor Resource Usage

```bash
# macOS/Linux
top      # Process monitor
free -h  # Memory usage
du -sh   # Disk usage

# Windows
tasklist
taskkill /PID <ID> /F
```

### Save API Response

```bash
curl -s http://localhost:8000/analyze \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"company_name": "OpenAI"}' > response.json
```

## Support

- 📖 Check README.md
- 🚀 See GETTING_STARTED.md
- 👨‍💻 Check DEVELOPER.md
- 🐳 See DEPLOYMENT.md
- 🐛 Debug using logs

**Happy coding!** ✨
