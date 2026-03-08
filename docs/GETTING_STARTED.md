# Getting Started with AI Rules Analyzer

## Installation Guide

### Step 1: Install Ollama (Required for LLM)

1. Download Ollama from [https://ollama.ai](https://ollama.ai)
2. Install and follow the setup wizard
3. Once installed, open a terminal and run:

```bash
ollama pull llama2
```

This downloads the Llama 2 model (about 4GB). Grab a coffee ☕ while this completes.

4. Start the Ollama server:

```bash
ollama serve
```

Keep this terminal open while you use the app. You should see:
```
binding 127.0.0.1:11434
```

### Step 2: Install Node.js and Python

**Node.js** (for frontend):
- Download from [https://nodejs.org](https://nodejs.org)
- Get version 16 or higher
- Verify: `node -v`

**Python** (for backend):
- Download from [https://www.python.org](https://www.python.org)
- Get version 3.8 or higher
- Verify: `python3 --version`

### Step 3: Run Setup Script

#### On macOS/Linux:

```bash
cd compare-rules-of-company
chmod +x setup.sh
./setup.sh
```

#### On Windows:

```bash
cd compare-rules-of-company
setup.bat
```

This will:
- ✓ Create Python virtual environment
- ✓ Install all Python dependencies
- ✓ Install all Node.js dependencies
- ✓ Set up environment files

### Step 4: Start the Application

You'll need 3 terminal windows:

**Terminal 1 - Ollama Server:**
```bash
ollama serve
```

**Terminal 2 - Backend API:**
```bash
cd backend
source venv/bin/activate  # On Windows: venv\Scripts\activate
python main.py
```

Expected output:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
```

**Terminal 3 - Frontend:**
```bash
cd frontend
npm run dev
```

Expected output:
```
  ➜  Local:   http://localhost:5173/
```

### Step 5: Open in Browser

Navigate to: [http://localhost:5173](http://localhost:5173)

## First Run

1. The app loads with a search box
2. Try one of the suggested companies (OpenAI, Google, Microsoft, Meta, Amazon)
3. Click "Analyze"
4. Wait 30-60 seconds for the LLM to process
5. Review the analysis results

## Troubleshooting First Run

### Problem: "Could not connect to Ollama"

**Solution:** 
1. Make sure Ollama is running: `ollama serve`
2. Try accessing [http://localhost:11434](http://localhost:11434) in browser
3. Restart Ollama if needed

### Problem: "Module not found" errors

**Solution:**
1. Ensure virtual environment is activated
2. Run `pip install -r requirements.txt` again
3. Check Python version: `python3 --version` (should be 3.8+)

### Problem: Port 8000 or 5173 already in use

**Solution:**
1. Kill the process using the port: `lsof -i :8000` (macOS/Linux)
2. Or change port in configuration files and restart

### Problem: Slow response

**Solution:**
1. First request is slowest (model warming up)
2. Subsequent requests are faster
3. Check your CPU/RAM usage
4. Can disable streaming for faster responses

## Testing the API

You can test the backend API directly:

```bash
curl -X POST http://localhost:8000/analyze \
  -H "Content-Type: application/json" \
  -d '{"company_name": "OpenAI"}'
```

## Next Steps

- Add more companies in `backend/services/data_service.py`
- Customize the analysis prompt in `backend/services/analysis_service.py`
- Modify the UI in `frontend/src/components/`
- Deploy to cloud (see DEPLOYMENT.md)

## Performance Tips

1. **First run is slowest**: Ollama loads the model into memory
2. **Faster responses**: Use smaller model variant
3. **Production**: Consider using ollama-py or running on GPU server
4. **Caching**: Add Redis for caching analysis results

## System Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| RAM | 8GB | 16GB+ |
| Storage | 10GB | 20GB+ |
| CPU | Dual Core | Quad Core+ |
| GPU | Optional | RTX 2060+ |

## Getting Help

- Check troubleshooting section in main README.md
- Review logs in terminal windows
- Check GitHub issues
- Read FastAPI docs: https://fastapi.tiangolo.com
- Read Ollama docs: https://github.com/ollama/ollama

## Security Notes

- This app runs locally by default
- No data is sent to external servers
- LLM runs on your machine
- For production, add authentication and API rate limiting

Happy analyzing! 🚀
