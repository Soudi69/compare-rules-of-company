# Quick Setup: Azure OpenAI Chat

## 30-Second Setup

### 1️⃣ Create Backend `.env` File

Create `backend/.env`:

```bash
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/
AZURE_OPENAI_API_KEY=your_api_key_here
AZURE_OPENAI_MODEL=gpt-4
LLM_PROVIDER=azure_openai
```

**Get your values from:**
- **Endpoint:** Azure Portal → Your OpenAI Resource → Endpoint
- **API Key:** Azure Portal → Keys & Endpoints → Key 1
- **Model:** Your deployment name in Azure OpenAI Studio

### 2️⃣ Start the App

```bash
./run.sh
```

### 3️⃣ Test Chat

1. Open: http://localhost:5173
2. Login
3. Click **💬 Chat** button in header
4. Type: "What is AI ethics?"
5. Get instant response! ✨

## File Security

✅ `.env` is in `.gitignore` - safe to add credentials  
✅ `.env.example` shows what variables you need  
✅ No secrets will be committed to git  

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Chat button not responding | Check backend running: `curl http://localhost:8000/health` |
| "Failed to get response" | Verify `.env` file in `backend/` directory |
| No `.env` file created | Copy `backend/.env.example` → `backend/.env` |
| Azure error | Check endpoint, API key, and model deployment name |

## Full Documentation

→ See `documentation/AZURE_OPENAI_CHAT_GUIDE.md` for complete guide

---

**That's it! 🚀 Your chat is ready.**
