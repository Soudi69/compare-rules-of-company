# Quick Start: User Ratings & Aggregated Scores

## What's New?

✨ The application now features a **synthetic data system** that generates realistic user profiles with individual ratings. All scores displayed in the "Quick Review" view are now **aggregated from user feedback**, not static dummy data.

## How It Works

### 1. **Synthetic Users Generated Automatically**
- 50 realistic user profiles
- Different departments and expertise levels
- Each rated 2-5 different companies

### 2. **Individual User Ratings**
- Each user rates on 4 dimensions (1-10 scale):
  - **Ethics Principles**: AI ethical guidelines & commitments
  - **Privacy Protection**: Data protection & security practices
  - **Fairness & Bias**: Bias mitigation & equitable systems
  - **Transparency**: Disclosure & clarity in policies

### 3. **Real-Time Aggregation**
- All ratings are aggregated into average scores
- Overall score = average of 4 dimensions
- Trend calculated from recent vs older ratings
- Total rating count tracked

## User Journey

```
1. User selects company from sidebar (e.g., "Google")
   ↓
2. Clicks "Quick Review" button
   ↓
3. Frontend fetches: GET /synthetic/companies/Google/details
   ↓
4. Backend returns:
   - Aggregated scores from all users
   - Total ratings count
   - Rating trend
   ↓
5. UI displays in CompanySummaryView:
   - Overall score card (e.g., 7.6/10)
   - 4 dimension cards with progress bars
   - Trend indicator (↑ Improving, → Stable, ↓ Declining)
   - Rating information box
```

## Data Example

### Synthetic Users
```
50 users generated:
- John Smith (Engineering, Expert)
- Sarah Johnson (Product Management, Intermediate)
- Michael Brown (Ethics & Compliance, Expert)
- ... and 47 more
```

### Individual Ratings
```
User: Sarah Johnson
Company: Google
Ratings:
  - Ethics: 8/10
  - Privacy: 7/10
  - Fairness: 8/10
  - Transparency: 9/10
  Comment: "Strong commitment to AI ethics"
```

### Aggregated Result (Google)
```
Total Ratings: 24
Average Scores:
  - Ethics: 7.5/10
  - Privacy: 7.2/10
  - Fairness: 7.8/10
  - Transparency: 7.9/10
  - Overall: 7.6/10
Trend: ↑ Improving
```

## API Endpoints

### Get Company Summary (What We Use Now)
```bash
GET /synthetic/companies/{company_name}/details

Response:
{
  "aggregates": {
    "company_name": "Google",
    "total_ratings": 24,
    "avg_ethics_score": 7.5,
    "avg_privacy_score": 7.2,
    "avg_fairness_score": 7.8,
    "avg_transparency_score": 7.9,
    "avg_overall_score": 7.6,
    "rating_trend": "up",
    "last_updated": "2025-12-01T..."
  },
  "ratings": [
    {
      "rating_id": "rating_...",
      "user_name": "Sarah Johnson",
      "user_department": "Product Management",
      "ethics_score": 8,
      "privacy_score": 7,
      ...
    }
  ],
  "rating_count": 24
}
```

### Add New Rating (Future)
```bash
POST /synthetic/ratings

Body:
{
  "user_id": "user_abc123",
  "company_name": "Google",
  "ethics_score": 8,
  "privacy_score": 7,
  "fairness_score": 8,
  "transparency_score": 9,
  "comment": "Strong commitment to AI ethics"
}

Response:
{
  "rating": { ... },
  "updated_aggregates": { ... }  # Refreshed scores
}
```

### Get All Companies
```bash
GET /synthetic/companies/aggregates

Response:
{
  "aggregates": [
    { "company_name": "Google", "total_ratings": 24, ... },
    { "company_name": "Microsoft", "total_ratings": 23, ... },
    ...
  ],
  "total_companies": 7
}
```

## Frontend Components

### CompanySummaryView
Located in: `frontend/src/components/CompanySummaryView.tsx`

**Props:**
```typescript
interface CompanySummaryViewProps {
  companyName: string;  // e.g., "Google"
}
```

**Features:**
- Fetches data from `/synthetic/companies/{companyName}/details`
- Displays 4-card grid for dimension scores
- Shows overall score card with progress bar
- Displays trend indicator
- Loading and error states
- Score visualization (1-10 scale → 0-100% progress)

### Usage in App
```tsx
<CompanySummaryView companyName={selectedCompany.name} />
```

## Score Scale Reference

**1-10 Scale Conversion to Labels:**
```
Score ≥ 8:  ✓ Excellent
Score 6-8:  ✓ Good
Score < 6:  ✗ Needs Improvement
```

**Visual Progress Bars:**
- All scores displayed as percentage (1-10 → 0-100%)
- Color-coded based on performance
- Shows numeric score (e.g., "7.6") above bar

## Data Files

Location: `backend/data/`

```
synthetic_users.json    (50 users, ~25KB)
synthetic_ratings.json  (250+ ratings, ~50KB)
```

These are auto-generated on first run.

## Testing

### View Generated Data
```bash
# Check users
curl http://localhost:8000/synthetic/users | jq '.total'
# Output: 50

# Check Google's aggregates
curl http://localhost:8000/synthetic/companies/Google/aggregates | jq
# Shows: avg_ethics_score, avg_privacy_score, etc.

# Check all companies
curl http://localhost:8000/synthetic/companies/aggregates | jq '.total_companies'
# Output: 7
```

### Reset Data
```python
from backend.services.synthetic_data_service import SyntheticDataService
service = SyntheticDataService()
service.regenerate_all_data()  # Clear and regenerate
```

## Files Modified/Created

### Backend
- ✅ **Created**: `backend/services/synthetic_data_service.py` (300+ lines)
- ✅ **Updated**: `backend/main.py` (added 7 new endpoints)

### Frontend
- ✅ **Updated**: `frontend/src/services/api.ts` (added 9 new functions)
- ✅ **Updated**: `frontend/src/components/CompanySummaryView.tsx` (now fetches live data)
- ✅ **Updated**: `frontend/src/App.tsx` (removed dummy data, now uses API)

### Documentation
- ✅ **Created**: `SYNTHETIC_DATA_SYSTEM.md` (comprehensive guide)

## Next Steps

### Immediate
- [ ] Run the application and test Quick Review button
- [ ] Verify scores display correctly
- [ ] Check trend indicators

### Future Enhancements
- [ ] Connect to real user authentication
- [ ] Allow users to submit their own ratings
- [ ] Add historical score tracking
- [ ] Implement comparison between users

## Performance

- **Data Generation**: ~100ms (one-time on startup)
- **Aggregation**: ~50ms per company
- **API Response**: ~100-200ms (file I/O + calculation)
- **UI Render**: <100ms

## Troubleshooting

### Scores show 0s
→ Synthetic data files may be corrupted
→ Solution: Delete `backend/data/*.json` and restart

### "No ratings found" error
→ Data generation failed
→ Solution: Check `backend/data/synthetic_ratings.json` exists

### Trend always shows "stable"
→ Normal - requires historical data variance
→ Will show "up"/"down" with real user interaction

## Architecture Diagram

```
┌─────────────────────────────────────────┐
│         Frontend (React)                │
│  ┌──────────────────────────────────┐  │
│  │  CompanySummaryView              │  │
│  │  - Fetches /synthetic/companies/ │  │
│  │  - Displays 4 score cards        │  │
│  │  - Shows trend & rating count    │  │
│  └──────────────────────────────────┘  │
└────────────┬──────────────────────────┘
             │
             │ HTTP GET/POST
             │
┌────────────▼──────────────────────────┐
│         Backend (FastAPI)             │
│  ┌──────────────────────────────────┐ │
│  │  main.py (API Endpoints)         │ │
│  │  - /synthetic/companies/...      │ │
│  │  - /synthetic/users/...          │ │
│  │  - /synthetic/ratings            │ │
│  └────────────┬─────────────────────┘ │
│               │                       │
│  ┌────────────▼─────────────────────┐ │
│  │  SyntheticDataService            │ │
│  │  - Manages users                 │ │
│  │  - Manages ratings               │ │
│  │  - Calculates aggregates         │ │
│  │  - Persists to JSON              │ │
│  └────────────┬─────────────────────┘ │
│               │                       │
│  ┌────────────▼─────────────────────┐ │
│  │  Data Files                      │ │
│  │  - synthetic_users.json          │ │
│  │  - synthetic_ratings.json        │ │
│  └──────────────────────────────────┘ │
└─────────────────────────────────────────┘
```
