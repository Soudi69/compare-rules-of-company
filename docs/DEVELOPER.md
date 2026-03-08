# Developer Guide

## Architecture Overview

```
User Browser (React)
        ↓
   Vite Dev Server (Port 5173)
        ↓
   API Proxy (/api → localhost:8000)
        ↓
FastAPI Backend (Port 8000)
        ↓
   LLM Service
        ↓
   Ollama Server (Port 11434)
        ↓
   Llama 2 Model
```

## Frontend Architecture

### Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── CompanyInput.tsx      # Input form
│   │   ├── AnalysisResults.tsx   # Results display
│   │   └── LoadingSpinner.tsx    # Loading animation
│   ├── services/
│   │   └── api.ts                # Axios API client
│   ├── types/
│   │   └── index.ts              # TypeScript types
│   ├── App.tsx                   # Main component
│   ├── main.tsx                  # Entry point
│   └── index.css                 # Global styles
├── index.html                    # HTML template
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

### Component Hierarchy

```
App (main state management)
├── Header
├── Main Layout (Grid)
│   ├── Sidebar
│   │   └── CompanyInput
│   └── Content
│       ├── ErrorMessage
│       ├── LoadingSpinner
│       └── AnalysisResults
│           ├── Summary Card
│           ├── Key Points
│           ├── Red Flags
│           ├── Timeline
│           └── Recommendations
└── Footer
```

### State Management

Using React hooks for simplicity:
- `isLoading`: API call state
- `analysis`: Cached analysis result
- `error`: Error messages

For larger apps, consider Redux or Zustand.

### API Communication

Located in `src/services/api.ts`:

```typescript
interface AnalyzeRequest {
  company_name: string
}

interface AnalysisResult {
  companyName: string
  overallSummary: string
  keyPoints: string[]
  redFlags: RedFlag[]
  timelineChanges: TimelineChange[]
  recommendations: Recommendation[]
  complianceScore: number
}
```

### Styling Approach

Using Tailwind CSS with custom dark theme:

```javascript
// tailwind.config.js
theme: {
  colors: {
    dark: { 50: '...', 900: '...' },
    purple: { 50: '...', 900: '...' }
  }
}
```

Classes are semantic:
- `bg-dark-800` for background
- `text-purple-400` for accents
- `border-purple-900/20` for subtle borders

## Backend Architecture

### Project Structure

```
backend/
├── models/
│   ├── __init__.py
│   └── analysis.py          # Pydantic models
├── services/
│   ├── __init__.py
│   ├── llm_service.py       # LLM providers
│   ├── analysis_service.py  # Business logic
│   └── data_service.py      # Company data
├── main.py                  # FastAPI app
├── requirements.txt
└── .env
```

### Data Flow

```
POST /analyze
    ↓
AnalysisService.analyze(company_name)
    ↓
DataService.get_company_guidelines()
    ↓
LLMService.generate(prompt)
    ↓
OllamaProvider.generate(prompt)
    ↓
HTTP POST to Ollama API
    ↓
Llama 2 Model Processing
    ↓
Response Parsing
    ↓
Return AnalysisResult JSON
```

### Service Layer

**LLMService**: Abstracts LLM provider selection
- `OllamaProvider`: HTTP calls to Ollama
- `MockLLMProvider`: Testing fallback

**AnalysisService**: Core business logic
- Prepares analysis prompts
- Parses LLM responses
- Handles result formatting

**DataService**: Data access layer
- Stores company guidelines in memory
- Could be replaced with database
- Provides CRUD operations

### Models (Pydantic)

Using Pydantic for:
- Request/response validation
- Type hints
- Auto API documentation
- Serialization

## Adding Features

### Add a New Company

1. Edit `backend/services/data_service.py`:

```python
COMPANY_GUIDELINES = {
    "company_name": {
        "guidelines": ["Guideline 1", "Guideline 2"],
        "timeline": {
            "2024": "Policy change",
            "2023": "Previous change"
        }
    }
}
```

2. Test with: `curl ... -d '{"company_name": "company_name"}'`

### Add New Analysis Fields

1. Update `AnalysisResult` model in `backend/models/analysis.py`
2. Update analysis prompt in `backend/services/analysis_service.py`
3. Add React component in `frontend/src/components/AnalysisResults.tsx`
4. Add TypeScript type in `frontend/src/types/index.ts`

### Add New LLM Provider

1. Create new provider class extending `LLMProvider`:

```python
class HuggingFaceProvider(LLMProvider):
    def generate(self, prompt: str) -> str:
        # Implementation
        pass
```

2. Register in `LLMService.__init__()`:

```python
if use_huggingface:
    provider = HuggingFaceProvider()
```

### Customize Analysis Prompt

Edit `_prepare_analysis_prompt()` in `analysis_service.py`:

```python
prompt = f"""
Your custom prompt here
Company: {company_name}
Guidelines: {guidelines_text}
...
"""
```

## Testing

### Frontend Testing

```bash
cd frontend
npm install @testing-library/react vitest
npm test
```

### Backend Testing

```bash
cd backend
pip install pytest pytest-asyncio
pytest
```

### Manual API Testing

```bash
# Health check
curl http://localhost:8000/health

# Analyze company
curl -X POST http://localhost:8000/analyze \
  -H "Content-Type: application/json" \
  -d '{"company_name": "OpenAI"}'
```

## Performance Optimization

### Frontend
- Lazy load components with React.lazy()
- Memoize expensive computations with useMemo
- Use React.memo for pure components
- Implement pagination for long lists

### Backend
- Cache analysis results in Redis
- Implement request queuing for concurrent analyses
- Add response compression
- Use connection pooling for database

### LLM
- Use smaller model variant (default llama2 is 7B)
- Implement response caching
- Batch similar requests
- Use prompt optimization techniques

## Debugging

### Frontend
```javascript
// Browser DevTools
console.log('Debug:', data)
// React DevTools browser extension
// Vite source maps
```

### Backend
```python
# Print debugging
print(f"Debug: {variable}")
# Python debugger
import pdb; pdb.set_trace()
# FastAPI docs
# http://localhost:8000/docs
```

### LLM/Ollama
```bash
# Check if Ollama is running
curl http://localhost:11434/api/tags

# Monitor Ollama logs
ollama serve  # check output
```

## Deployment

See DEPLOYMENT.md for:
- Docker containerization
- Cloud deployment (AWS, GCP, Azure)
- Production configuration
- Environment management

## Code Style

### Frontend (TypeScript/React)
```typescript
// Use functional components
const MyComponent: React.FC<Props> = ({ prop }) => {
  return <div>{prop}</div>
}

// Use descriptive names
const handleAnalyzeCompany = () => {}

// Type everything
interface Props {
  name: string
  score: number
}
```

### Backend (Python)
```python
# Use type hints
def analyze(company_name: str) -> AnalysisResult:
    pass

# Follow PEP 8
class MyService:
    def __init__(self):
        self.provider = None

# Docstrings for public methods
"""Analyze company guidelines"""
```

## Useful Commands

### Frontend
```bash
cd frontend
npm run dev           # Development server
npm run build         # Build for production
npm run preview       # Preview build
npm run type-check    # Type checking
```

### Backend
```bash
cd backend
source venv/bin/activate
python main.py        # Run server
pytest               # Run tests
pip freeze           # List dependencies
```

### General
```bash
# Restart services
^C  # Stop current process
# Run command again

# Check logs
tail -f output.log

# Kill port
lsof -i :8000  # Find process
kill -9 <PID>  # Kill it
```

## Resources

- FastAPI: https://fastapi.tiangolo.com
- React: https://react.dev
- TypeScript: https://www.typescriptlang.org
- Tailwind CSS: https://tailwindcss.com
- Ollama: https://github.com/ollama/ollama
- Pydantic: https://docs.pydantic.dev

## Contributing

1. Create feature branch: `git checkout -b feature/name`
2. Make changes and test
3. Commit with clear message: `git commit -m "Add feature: name"`
4. Push and create pull request

## Questions?

Check the main README.md or open a GitHub issue.
