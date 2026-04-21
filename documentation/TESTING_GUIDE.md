# 🎯 Quick Test Guide

## ✅ Application is Live!

Your AI Company Ethics Rules Analyzer is now running with both frontend and backend active.

## 🌐 Access the Application

**Frontend:** http://localhost:5173  
**API Docs:** http://localhost:8000/docs

## 🧪 How to Test

### Test 1: Load the Frontend
1. Open http://localhost:5173 in your browser
2. You should see:
   - Company search input
   - Dark theme UI with purple accents
   - "AI Company Ethics Rules Analyzer" title
   - Loading spinner component (hidden until you search)

### Test 2: Search for a Company
1. In the search box, type one of these:
   - **OpenAI**
   - **Google**
   - **Microsoft**
   - **Meta**
   - **Amazon**

2. Click the **"Analyze"** button

3. You'll see a loading spinner

4. Results will appear showing:
   - Company overview
   - Ethics rules analysis
   - How rules changed over time
   - AI analysis from Llama2 (or mock if Ollama not running)

### Test 3: Check API Health
Open http://localhost:8000/health in your browser

You should see:
```json
{
  "status": "healthy",
  "service": "AI Company Ethics Rules Analyzer",
  "version": "1.0.0"
}
```

### Test 4: Explore API Documentation
Open http://localhost:8000/docs

You'll see:
- All available endpoints
- Request/response models
- Try-it-out feature (test endpoints directly)

## 📊 Expected Behavior

### Current Setup (Mock LLM)
- ✅ Frontend loads perfectly
- ✅ API responds to requests
- ✅ Mock data returns for testing
- ✅ UI displays results correctly
- ⚠️ AI analysis uses mock (because Ollama not running)

### Full Setup (with Docker + Ollama)
- ✅ Real Llama2 AI analysis
- ✅ Actual model responses
- ✅ 30-60 second response time
- ✅ Production-ready

To enable full setup:
```bash
chmod +x run.sh
./run.sh
```

## 🔧 Available Companies

Each with pre-loaded data:

| Company | Founded | Data Available |
|---------|---------|-----------------|
| OpenAI | 2015 | ✅ Rules & Changes |
| Google | 1998 | ✅ Rules & Changes |
| Microsoft | 1975 | ✅ Rules & Changes |
| Meta | 2004 | ✅ Rules & Changes |
| Amazon | 1994 | ✅ Rules & Changes |

## 🛠️ Troubleshooting

### Frontend not loading?
- Check: http://localhost:5173
- If error, check terminal: `npm run dev` output
- Ensure Node.js is running

### API not responding?
- Check: http://localhost:8000/health
- If error, ensure backend is running
- Terminal should show: `Application startup complete`

### Getting "Ollama not available" warning?
- This is expected if Docker/Ollama isn't running
- App still works with mock data
- Real LLM requires: `./run.sh` with Docker

## 📱 Browser Console

Open browser developer tools (F12) to see:
- API request/response logs
- React component state
- Network activity
- Console messages

## 🚀 Next Steps

1. **Explore the UI**: Click around, try searching companies
2. **Test the API**: Use Swagger at http://localhost:8000/docs
3. **Check the code**: Review frontend/src/ and backend/main.py
4. **Enable Ollama**: Run `./run.sh` with Docker for real LLM
5. **Read documentation**: See TECHNICAL_REPORT.md for full details

## 💡 Tips

- Press `Ctrl+C` in any terminal to stop a service
- Frontend auto-reloads when you edit files
- Backend auto-reloads when you edit Python files
- Check browser console (F12) for errors
- Check terminal output for server logs

---

**Status: Everything is working!** ✅

Try searching for "OpenAI" to test the full flow.
