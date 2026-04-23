# Azure OpenAI Chat Integration Guide

## Overview

The Apte application now includes an integrated **AI Chat Assistant** powered by Azure OpenAI. Users can ask questions about AI ethics, policies, and get real-time responses from an LLM.

## Features

✨ **Key Features:**
- 💬 Real-time chat interface with message history
- 🔌 Integrated Azure OpenAI support
- 🎯 Context-aware responses (optional analysis context)
- 🔄 Fallback to Ollama if Azure OpenAI is unavailable
- 🎨 Beautiful cosmic UI with orange + purple theme
- ⚡ Responsive and smooth user experience

## Setup Instructions

### 1. Environment Variables (Backend)

Create a `.env` file in the `backend/` directory (never commit this):

```bash
# Required for Azure OpenAI
AZURE_OPENAI_ENDPOINT=https://your-resource-name.openai.azure.com/
AZURE_OPENAI_API_KEY=your_api_key_here
AZURE_OPENAI_MODEL=your_deployment_name_here

# Optional: Specify which provider to use
LLM_PROVIDER=azure_openai

# Or keep Ollama as backup
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama2
```

### 2. .env.example Reference

The template file is provided at `backend/.env.example`:

```bash
# ── Ollama Configuration (Default/Local) ──────────────────────────
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama2

# ── Azure OpenAI Configuration (Optional) ──────────────────────────
AZURE_OPENAI_ENDPOINT=https://your-resource-name.openai.azure.com/
AZURE_OPENAI_API_KEY=your_azure_openai_api_key_here
AZURE_OPENAI_MODEL=your_deployment_name_here

# ── LLM Provider Selection ──────────────────────────────────────────
LLM_PROVIDER=ollama
```

### 3. Security

⚠️ **IMPORTANT:** 
- The `.env` file is **automatically excluded** from git via `.gitignore`
- Never commit your API keys to version control
- Each developer should create their own `.env` file
- Use `.env.example` as a template

### 4. Getting Azure OpenAI Credentials

1. **Azure OpenAI Endpoint:** 
   - Found in Azure Portal → OpenAI Resource → Endpoint (copy the HTTPS URL)
   - Format: `https://your-resource-name.openai.azure.com/`

2. **API Key:** 
   - Found in Azure Portal → OpenAI Resource → Keys and Endpoint → Copy Key 1 or Key 2

3. **Model Deployment Name:** 
   - Found in Azure OpenAI Studio → Deployments (the name you gave your model)
   - Common example: `gpt-4`, `gpt-35-turbo`, etc.

## Architecture

### Backend

**File:** `backend/services/llm_service.py`

#### LLM Providers
```
LLMProvider (Abstract Base)
├── OllamaProvider (Local)
├── AzureOpenAIProvider (Cloud)
└── MockLLMProvider (Testing)
```

**LLMService** automatically:
1. Checks `LLM_PROVIDER` environment variable
2. Tries to initialize selected provider
3. Falls back to Ollama if Azure fails
4. Falls back to Mock if both fail

#### Chat Endpoint
**File:** `backend/main.py`

```python
POST /chat
{
  "message": "string",           # User query (required)
  "context": "string"            # Optional context
}

Response:
{
  "response": "string",          # LLM response
  "message": "string"            # Original message
}
```

### Frontend

**Chat Component:** `frontend/src/components/ChatBar.tsx`

**Features:**
- ✉️ Message display with timestamps
- 💬 Input form with send button
- ⏳ Loading indicator during API calls
- ❌ Error handling and display
- 🗑️ Clear chat history button
- 📱 Responsive design

**Props:**
```typescript
interface ChatBarProps {
  context?: string              // Optional analysis context
  onClose?: () => void         // Callback to close chat
}
```

**API Client:** `frontend/src/services/api.ts`

```typescript
export const chatWithLLM = async (
  message: string,
  context?: string
): Promise<string>
```

## Usage

### For Users

1. **Open Chat:**
   - Click the "💬 Chat" button in the header
   - Chat panel slides in from the right

2. **Send Messages:**
   - Type your question in the input field
   - Press Enter or click the Send button
   - Wait for the AI response

3. **Context:**
   - If you've selected a company for analysis, the chat automatically includes that context
   - The LLM will reference the current analysis in responses

4. **Clear History:**
   - Click the trash icon to clear all messages
   - Or click the X to close the chat

### For Developers

**Add chat to your component:**

```typescript
import ChatBar from './components/ChatBar'

function MyComponent() {
  const [isChatOpen, setIsChatOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsChatOpen(!isChatOpen)}>
        Toggle Chat
      </button>

      {isChatOpen && (
        <ChatBar 
          context="Optional context about current state"
          onClose={() => setIsChatOpen(false)}
        />
      )}
    </>
  )
}
```

## Testing

### Test Locally with Ollama (No Azure Needed)

```bash
# 1. Start Ollama
ollama serve

# 2. Pull a model
ollama pull llama2

# 3. Run the app
./run.sh

# 4. Test in UI
# Click "💬 Chat" and send a message
# It will use local Ollama instead of Azure
```

### Test with Azure OpenAI

```bash
# 1. Set up .env file with Azure credentials
# (see Setup Instructions above)

# 2. Run the app
./run.sh

# 3. Watch logs for provider initialization
# Should show: "Azure OpenAI initialized successfully"

# 4. Test in UI
# Click "💬 Chat" and send a message
```

### API Testing with curl

```bash
# Test chat endpoint
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What is AI ethics?",
    "context": "Analyzing corporate policies"
  }'

# Expected response
{
  "response": "AI ethics is...",
  "message": "What is AI ethics?"
}
```

## Troubleshooting

### Issue: "Failed to get response from LLM"

**Solutions:**
1. Check if backend is running: `curl http://localhost:8000/health`
2. If using Azure OpenAI:
   - Verify `.env` file exists in `backend/`
   - Check Azure credentials are correct
   - Ensure model deployment exists in Azure
3. If using Ollama:
   - Make sure Ollama is running: `ollama serve`
   - Verify model is installed: `ollama list`
   - Check Ollama responds: `curl http://localhost:11434/api/tags`

### Issue: "Could not connect to Azure OpenAI"

**Solutions:**
1. Verify endpoint URL is correct (should include `https://` and trailing `/`)
2. Check API key is valid (copy from Azure Portal)
3. Confirm deployment name exists in Azure
4. Check API version is supported (currently using `2024-02-15-preview`)

### Issue: Chat falls back to Ollama/Mock

**Expected behavior:**
- If Azure OpenAI fails to initialize, automatically falls back to Ollama
- If Ollama also fails, uses mock provider
- Check logs for warning messages

**To force Azure OpenAI:**
- Set `LLM_PROVIDER=azure_openai` in `.env`
- App will not fall back if this is set

## Configuration

### Environment Variables

| Variable | Required | Default | Example |
|----------|----------|---------|---------|
| `AZURE_OPENAI_ENDPOINT` | Yes* | - | `https://myresource.openai.azure.com/` |
| `AZURE_OPENAI_API_KEY` | Yes* | - | `abc123def456...` |
| `AZURE_OPENAI_MODEL` | Yes* | - | `gpt-4` |
| `LLM_PROVIDER` | No | `ollama` | `azure_openai` |
| `OLLAMA_BASE_URL` | No | `http://localhost:11434` | - |
| `OLLAMA_MODEL` | No | `llama2` | - |

*Only required if using Azure OpenAI

### Response Configuration

**Backend defaults:**
- Max tokens: 1000
- Temperature: 0.7 (balanced creativity/accuracy)
- System prompt: AI ethics and policy analyst

**Customize in `backend/main.py`:**
```python
response = llm_service.generate(
  prompt,
  max_tokens=2000  # Increase for longer responses
)
```

## File Structure

```
project/
├── backend/
│   ├── .env                    # Your credentials (IGNORED)
│   ├── .env.example            # Template (COMMITTED)
│   ├── .gitignore              # Excludes .env files
│   ├── main.py                 # Chat endpoint
│   └── services/
│       └── llm_service.py      # LLM providers
│
└── frontend/
    └── src/
        ├── App.tsx             # Chat button integration
        ├── services/
        │   └── api.ts          # Chat API client
        └── components/
            └── ChatBar.tsx     # Chat UI component
```

## Security Best Practices

✅ **DO:**
- Keep API keys in `.env` file (never commit)
- Use `.env.example` as template
- Rotate API keys regularly
- Use least-privileged Azure roles
- Enable API throttling/rate limiting

❌ **DON'T:**
- Hardcode API keys in source code
- Commit `.env` files to git
- Share API keys via email/chat
- Use production keys in development
- Log or print sensitive information

## API Rate Limits

Azure OpenAI has rate limits based on your tier:

- **Free tier:** Limited requests per minute
- **Standard tier:** Higher limits
- **Enterprise:** Custom limits

Configure in `backend/main.py` if needed:
```python
# Add rate limiting middleware
from slowapi import Limiter
```

## Performance Tips

1. **Response Time:**
   - Azure typically faster than local Ollama
   - First request may be slower (model loading)

2. **Token Optimization:**
   - More tokens = longer responses but slower
   - Adjust `max_tokens` parameter in backend

3. **Caching:**
   - Consider caching common questions
   - Implement in `frontend/src/services/api.ts`

## Next Steps

1. ✅ Set up `.env` file with Azure credentials
2. ✅ Test chat functionality
3. 📝 Customize system prompts as needed
4. 🎨 Adjust UI styling if desired
5. 🧪 Add unit tests for chat endpoint
6. 📊 Monitor Azure usage and costs

## Support

For issues or questions:
1. Check Azure OpenAI documentation: https://learn.microsoft.com/en-us/azure/ai-services/openai/
2. Review troubleshooting section above
3. Check application logs for errors
4. Test with Ollama as fallback

---

**Last Updated:** April 2026  
**Version:** 1.0.0  
**Status:** ✅ Production Ready
