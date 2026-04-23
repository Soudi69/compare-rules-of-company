# 🚀 Quick Start - Ethics Timeline Dashboard

## What You Get

✅ **Analyse Button** - Click to view company ethics timeline  
✅ **Timeline Visualization** - Dots + lines + years (2018-2022)  
✅ **Critical Points** - AI policy data for each year  
✅ **Color Coding** - Severity levels (high/medium/low)  
✅ **Company Coverage** - Google, Microsoft, IBM, Amazon, Meta, Tesla, Apple  

## Installation & Setup

### 1️⃣ Backend Setup
```bash
cd backend
python main.py
```
✨ Server running on `http://localhost:8000`

### 2️⃣ Frontend Setup
```bash
cd frontend
npm run dev
```
✨ Client running on `http://localhost:5173`

## How to Use

### Step 1: Select a Company
- Go to the **sidebar** on the left
- Click on any company (e.g., **Google**)

### Step 2: View Analysis
- Policy analysis displays automatically
- Scroll down to see "**Ethics Timeline**" section

### Step 3: Click Analyse Button
- Look for the **"Analyse"** button with gradient styling
- Shows: orange → purple gradient
- Has loading animation while fetching data

### Step 4: View Timeline
- **Dots** = Each year (2018-2022)
- **Lines** = Connect years together
- **Year labels** = Display beside dots

### Step 5: Explore Critical Points
- Click any year to expand/collapse
- View policy details:
  - 📌 **Point**: What the policy is about
  - 🏷️ **Category**: Ethics, Privacy, Fairness, etc.
  - ⚠️ **Severity**: High (red) / Medium (yellow) / Low (green)
  - 💡 **Impact**: How it affects users

## Example Data

### Google 2018
```
✨ AI must be beneficial for humanity
   Category: Ethics Principles
   Severity: 🟢 Low
   Impact: Foundational guideline for AI development
```

### Google 2020
```
🔒 Facial recognition policy updates
   Category: Privacy
   Severity: 🔴 High
   Impact: Restricted certain use cases
```

## Features

| Feature | Status |
|---------|--------|
| Timeline visualization | ✅ Working |
| Year dots & lines | ✅ Working |
| Expandable sections | ✅ Working |
| Color-coded severity | ✅ Working |
| Category badges | ✅ Working |
| Loading states | ✅ Working |
| Error handling | ✅ Working |
| Responsive design | ✅ Working |

## Keyboard Shortcuts

- **Click Analyse Button** = Load timeline
- **Click Year** = Toggle details
- **Scroll** = Browse timeline
- **Hover** = See more info

## Companies Available

- 🔵 **Google**
- 🟦 **Microsoft**
- 🔶 **IBM**
- 🔨 **Amazon**
- 📘 **Meta**
- 🚗 **Tesla**
- 🍎 **Apple**

## Troubleshooting

### "No ethics data found"
- Ensure backend is running
- Check CSV file exists in `/data/`
- Verify company name spelling

### Timeline not loading
- Check browser console for errors
- Verify backend endpoint: `GET /ethics/timeline/{company}`
- Restart both frontend and backend

### Styling looks wrong
- Hard refresh browser (Cmd+Shift+R or Ctrl+Shift+R)
- Clear browser cache
- Ensure Tailwind CSS is building

## File Locations

```
📦 Project
├── 🗂️ backend
│   ├── main.py                 ← API endpoints
│   └── services/
│       └── ethics_service.py   ← CSV data handling
├── 🗂️ frontend
│   └── src/
│       ├── components/
│       │   ├── EthicsTimeline.tsx    ← Timeline display
│       │   ├── AnalysisPanel.tsx     ← Analyse button
│       │   └── App.tsx              ← Main layout
│       └── services/
│           └── api.ts               ← API calls
└── 📊 data
    └── microsoft_ibm_amazon_ai_policies.csv ← Policy data
```

## Data Structure

### CSV Format
```csv
company_name,year,policy_point,category,severity,impact,status
Google,2018,"AI must be beneficial","Ethics Principles","low","...",active
```

### Timeline JSON
```json
{
  "year": 2018,
  "policies": [
    {
      "point": "AI must be beneficial",
      "category": "Ethics Principles",
      "severity": "low",
      "impact": "..."
    }
  ]
}
```

## API Endpoints

```
GET  /ethics/companies         → List all companies
GET  /ethics/timeline/{name}   → Get timeline for company
```

## Color Guide

| Color | Meaning |
|-------|---------|
| 🟢 Green | Low impact |
| 🟡 Yellow | Medium impact |
| 🔴 Red | High impact |
| 🟠 Orange | Primary color |
| 🟣 Purple | Secondary color |

## Pro Tips

💡 **Tip 1**: Click multiple companies to compare timelines  
💡 **Tip 2**: Use browser DevTools to inspect policy data  
💡 **Tip 3**: Export timeline screenshots for presentations  
💡 **Tip 4**: Read severity levels to understand impact priority  

## Support

Need help? Check these files:
- `ETHICS_TIMELINE_IMPLEMENTATION.md` - Full documentation
- `backend/services/ethics_service.py` - Data service code
- `frontend/src/components/EthicsTimeline.tsx` - Timeline component
- `frontend/src/components/AnalysisPanel.tsx` - Analyse button

---

**Version**: 1.0.0  
**Status**: ✅ Ready to Use  
**Last Updated**: Today  

**Happy exploring! 🚀✨**
