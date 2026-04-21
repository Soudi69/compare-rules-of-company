# 🤖 Lightweight LLM Recommendations for Your System

## Your System Specs
- **CPU**: 6-Core Intel Core i7 @ 2.6 GHz
- **RAM**: 16 GB
- **Storage**: 686 GB available
- **OS**: macOS

---

## 📊 LLM Comparison Table

| Model | Size | RAM | Speed | Quality | Download | Recommended |
|-------|------|-----|-------|---------|----------|-------------|
| **Phi** | 2.7B | 4-6GB | ⚡⚡⚡ Very Fast | 7/10 | 5 min | ⭐⭐⭐⭐⭐ **BEST** |
| **Mistral 7B** | 7B | 8GB | ⚡⚡ Fast | 8/10 | 20 min | ⭐⭐⭐⭐ Excellent |
| **Neural Chat 7B** | 7B | 8-10GB | ⚡⚡ Fast | 7.5/10 | 20 min | ⭐⭐⭐⭐ Good |
| **Llama 2 7B** | 7B | 10GB | ⚡ Medium | 8.5/10 | 30 min | ⭐⭐⭐ OK |
| **Dolphin 2.2** | 7B | 8-10GB | ⚡⚡ Fast | 8/10 | 20 min | ⭐⭐⭐⭐ Good |
| **Orca 2** | 7B/13B | 8/12GB | ⚡⚡ Fast | 8.5/10 | 20/40 min | ⭐⭐⭐⭐ Excellent |

---

## 🌟 **TOP RECOMMENDATION: Microsoft Phi 2.7B**

### Why Phi?
✅ **Extremely lightweight** - Only 2.7B parameters  
✅ **Fast responses** - ~2-5 seconds per query  
✅ **Low memory** - Uses only 4-6GB RAM (leaves 10GB free)  
✅ **Small download** - ~5 minutes  
✅ **Excellent for your system** - Perfect fit for MacBook Pro  
✅ **High quality** - Surprisingly good for such a small model  
✅ **Great for ethics analysis** - Can understand nuanced content  

### Phi Performance
```
Model: microsoft/phi
Parameters: 2.7B
Download: 1.6GB
RAM Used: 4-6GB
Speed: ~3-5 seconds per response
Quality: 7/10 (excellent for size)
```

### Install Phi
```bash
ollama pull phi
```

---

## 🥈 **ALTERNATIVE: Mistral 7B (Balanced)**

### Why Mistral?
✅ **Better quality** than Phi  
✅ **Still lightweight** - 7B parameters  
✅ **Fast enough** - 5-8 seconds per query  
✅ **Uses 8GB RAM** - Still comfortable fit  
✅ **Excellent reasoning** - Better for complex analysis  
✅ **Good for business content** - Great for ethics analysis  

### Mistral Performance
```
Model: mistral
Parameters: 7B
Download: 4.1GB
RAM Used: 8GB
Speed: ~5-8 seconds per response
Quality: 8/10 (excellent balance)
```

### Install Mistral
```bash
ollama pull mistral
```

---

## 🥉 **THIRD: Dolphin 2.2 (If you want speed + quality)**

### Why Dolphin?
✅ **Fine-tuned for instruction following**  
✅ **Fast** - 4-7 seconds per query  
✅ **Good quality** - 8/10 rating  
✅ **Medium size** - 7B parameters  
✅ **Uses 8-10GB RAM** - Still comfortable  
✅ **Great for chat** - Conversational by design  

### Install Dolphin
```bash
ollama pull dolphin2.2:7b
```

---

## ⚡ **MY TOP 3 PICKS FOR YOUR SYSTEM**

### 1️⃣ **BEST: Phi 2.7B** (Most Recommended)
```
Use this if you want:
✓ Fastest response times
✓ Minimal system impact
✓ Smallest download
✓ Leaves most RAM free for other tasks
✓ Still good quality
```

**Install:**
```bash
ollama pull phi
```

**Update your backend:**
```python
# In backend/services/llm_service.py, change:
MODEL_NAME = "phi"  # Instead of "llama2"
```

### 2️⃣ **BALANCED: Mistral 7B**
```
Use this if you want:
✓ Better quality than Phi
✓ Faster than Llama2
✓ More capable for complex analysis
✓ Still lightweight
```

**Install:**
```bash
ollama pull mistral
```

### 3️⃣ **GOOD: Dolphin 2.2**
```
Use this if you want:
✓ Instruction-following specialist
✓ Better conversation quality
✓ Good speed
✓ Fine-tuned specifically for chat
```

**Install:**
```bash
ollama pull dolphin2.2:7b
```

---

## 📈 **Recommended for Your Use Case: ETHICS ANALYSIS**

Since you're analyzing company ethics rules, here's what matters:

| Requirement | Best Model |
|-------------|-----------|
| **Speed** | Phi 2.7B ⭐ |
| **Quality** | Mistral 7B ⭐ |
| **Balanced** | Dolphin 2.2 ⭐ |
| **Memory Efficient** | Phi 2.7B ⭐ |
| **Best Overall** | Mistral 7B |

---

## 🚀 **Quick Switch Guide**

### To use Phi instead of Llama2:

**Step 1: Pull Phi**
```bash
ollama pull phi
```

**Step 2: Update your code** (Optional - set default)
Edit `backend/services/llm_service.py`:
```python
# Change this line:
MODEL_NAME = "phi"  # From "llama2"
```

**Step 3: Test it**
```bash
# Your app will automatically use Phi
# Just start normally with:
./run.sh
# Or: npm run dev (frontend) + python backend/main.py
```

---

## 📊 **Side-by-Side Comparison for Your System**

### On Your MacBook Pro (16GB RAM)

```
PHI 2.7B
├── Download Time: ~5 minutes
├── Model Size: 1.6GB
├── RAM Used: 4-6GB
├── Free RAM After: ~10-12GB ✅
├── Speed: ~3-5 sec/query
└── Quality: 7/10 ✅ BEST FOR YOUR SYSTEM

MISTRAL 7B
├── Download Time: ~20 minutes
├── Model Size: 4.1GB
├── RAM Used: 8GB
├── Free RAM After: ~8GB ✅
├── Speed: ~5-8 sec/query
└── Quality: 8/10 ✅ BEST QUALITY

LLAMA2 7B (Current)
├── Download Time: ~30 minutes
├── Model Size: 3.8GB
├── RAM Used: 10GB
├── Free RAM After: ~6GB ⚠️
├── Speed: ~8-15 sec/query
└── Quality: 8.5/10
```

---

## 💡 **My Recommendation for You**

**🏆 USE MISTRAL 7B**

### Why?
1. **Perfect balance** - Quality vs Speed
2. **Ideal for your system** - 16GB RAM is perfect for 7B models
3. **Good ethics analysis** - Better understanding of nuanced text
4. **Reasonable speed** - 5-8 seconds is acceptable
5. **Not too big, not too small** - Goldilocks zone

### If speed is critical:
**Use Phi 2.7B** - Instant responses, minimal overhead

### If you want best quality:
**Use Mistral 7B** - Best all-around

---

## 🔧 **Implementation: Switching Models**

### Option 1: Use `ollama` command (Recommended)
```bash
# Phi
ollama pull phi
ollama run phi

# Mistral
ollama pull mistral
ollama run mistral

# Dolphin
ollama pull dolphin2.2:7b
ollama run dolphin2.2:7b
```

### Option 2: Update your app for default model
Edit `backend/services/llm_service.py`:
```python
# Line ~10
self.model_name = os.getenv("LLM_MODEL", "mistral")  # Change from "llama2"
```

### Option 3: Set via environment variable
```bash
export LLM_MODEL=mistral
./run.sh
```

---

## ✅ **Quick Comparison: All Models on 16GB Mac**

| Model | Download | Size | RAM | Speed | Quality | ✓ Recommended |
|-------|----------|------|-----|-------|---------|--------------|
| Phi | 5m | 1.6GB | 4GB | ⚡⚡⚡ 3-5s | 7/10 | ✓ Fast Track |
| Mistral | 20m | 4.1GB | 8GB | ⚡⚡ 5-8s | 8/10 | ✓ **BEST** |
| Dolphin | 20m | 3.6GB | 8GB | ⚡⚡ 4-7s | 8/10 | ✓ Good |
| Orca 2 | 25m | 5.2GB | 10GB | ⚡⚡ 5-10s | 8.5/10 | ✓ Premium |
| Llama2 | 30m | 3.8GB | 10GB | ⚡ 8-15s | 8.5/10 | ~ Current |

---

## 🎯 **Final Recommendation**

### For Your System: **MISTRAL 7B** 🏆

```bash
# 1. Pull the model
ollama pull mistral

# 2. Test it
ollama run mistral

# 3. Use in your app (automatic via Ollama)
./run.sh
```

**Why Mistral?**
- ✅ Best quality/speed ratio
- ✅ Perfect for your 16GB system
- ✅ Excellent for ethics analysis
- ✅ Not too slow, not too heavy
- ✅ Still room for other apps

**Time Investment:**
- Download: ~20 minutes (one time)
- Setup: ~2 minutes
- Response time: ~5-8 seconds per query

---

## 📝 **Alternative: If you want FASTEST**

Use **Phi 2.7B** instead:
```bash
ollama pull phi
```

**Pros:**
- Download in 5 minutes
- ~3-5 second responses
- Uses minimal RAM

**Cons:**
- Slightly lower quality (still very good)
- May struggle with complex analysis

---

## 🎓 **LLM Size Guide**

```
2.7B (Phi)      = TINY (Very Fast, Lower Quality)
7B (Mistral)    = SMALL (Fast, Good Quality) ← BEST FOR YOU
13B (Orca)      = MEDIUM (Slow, Better Quality)
70B             = LARGE (Very Slow, Excellent Quality)
```

Your 16GB RAM is perfect for **7B models** (Mistral, Dolphin, Llama2).

---

**My Final Pick: MISTRAL 7B** ⭐⭐⭐⭐⭐

It hits the sweet spot for your MacBook Pro!

Would you like me to:
1. Update your app to use Mistral?
2. Provide installation instructions?
3. Create a script to test different models?
