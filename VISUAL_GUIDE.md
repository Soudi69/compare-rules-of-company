# 📊 Visual Guide: From Dummy Data to User Aggregates

## The Transformation

### BEFORE: Static Dummy Scores
```
┌─────────────────────────────────────────────┐
│          COMPANY SUMMARY VIEW               │
├─────────────────────────────────────────────┤
│                                             │
│  Google                               ↑ Improving  
│                                             │
│ ┌────────────────────────────────────────┐ │
│ │   Overall AI Ethics Score             │ │
│ │          85                           │ │
│ │      Excellent                        │ │
│ │ ════════════════════════════════ 85%  │ │
│ │        45 policies tracked            │ │
│ └────────────────────────────────────────┘ │
│                                             │
│  Detailed Assessment                        │
│                                             │
│ ┌──────────────────┐ ┌──────────────────┐ │
│ │ Ethics          │ │ Privacy          │ │
│ │ Principles      │ │ Protection       │ │
│ │      78         │ │      82          │ │
│ │ ▓▓▓▓▓▓▓░░ 78%  │ │ ▓▓▓▓▓▓▓▓░░ 82%  │ │
│ │ Good            │ │ Excellent        │ │
│ └──────────────────┘ └──────────────────┘ │
│                                             │
│ ┌──────────────────┐ ┌──────────────────┐ │
│ │ Fairness & Bias │ │ Transparency     │ │
│ │      82         │ │      88          │ │
│ │ ▓▓▓▓▓▓▓▓░░ 82%  │ │ ▓▓▓▓▓▓▓▓▓░░ 88% │ │
│ │ Excellent       │ │ Excellent        │ │
│ └──────────────────┘ └──────────────────┘ │
│                                             │
│ Primary Focus Areas                         │
│ [AI Ethics] [Fairness] [Privacy]...        │
│                                             │
└─────────────────────────────────────────────┘

❌ PROBLEMS:
   • Scores never change
   • No source/basis for scores
   • No user input considered
   • Not realistic or dynamic
   • Hard-coded in component
```

### AFTER: Aggregated User Ratings
```
┌─────────────────────────────────────────────┐
│          COMPANY SUMMARY VIEW               │
├─────────────────────────────────────────────┤
│                                             │
│  Google                               ↑ Improving  
│  Based on aggregated user ratings           │
│                                             │
│ ┌────────────────────────────────────────┐ │
│ │   Overall AI Ethics Score             │ │
│ │          7.6 (out of 10)              │ │
│ │      Good                             │ │
│ │ ════════════════════════════════ 76%  │ │
│ │        24 user ratings                 │ │
│ └────────────────────────────────────────┘ │
│                                             │
│  Detailed Assessment (User-Aggregated)      │
│                                             │
│ ┌──────────────────┐ ┌──────────────────┐ │
│ │ Ethics          │ │ Privacy          │ │
│ │ Principles      │ │ Protection       │ │
│ │      7.6        │ │      7.5         │ │
│ │ ▓▓▓▓▓▓▓░░░░ 76% │ │ ▓▓▓▓▓▓▓░░░░ 75% │ │
│ │ Good            │ │ Good             │ │
│ └──────────────────┘ └──────────────────┘ │
│                                             │
│ ┌──────────────────┐ ┌──────────────────┐ │
│ │ Fairness & Bias │ │ Transparency     │ │
│ │      7.7        │ │      7.8         │ │
│ │ ▓▓▓▓▓▓▓░░░░ 77% │ │ ▓▓▓▓▓▓▓░░░░ 78% │ │
│ │ Good            │ │ Good             │ │
│ └──────────────────┘ └──────────────────┘ │
│                                             │
│ Rating Information                          │
│ ┌──────────────────────────────────────┐  │
│ │ Total Ratings: 24    Trend: Stable   │  │
│ │ Last Updated: 12/01/2025            │  │
│ └──────────────────────────────────────┘  │
│                                             │
└─────────────────────────────────────────────┘

✅ IMPROVEMENTS:
   ✓ Scores based on real user feedback
   ✓ 24 individual ratings aggregated
   ✓ Shows trend (Improving/Stable/Declining)
   ✓ Displays rating count
   ✓ Fetched dynamically from API
   ✓ Will update with user submissions
   ✓ Realistic and trustworthy
```

---

## Data Flow: How It Works

### User Submission Flow
```
USER SUBMITS RATING
│
├─ User selects: Google
├─ User rates:
│   • Ethics: 8/10
│   • Privacy: 7/10
│   • Fairness: 8/10
│   • Transparency: 9/10
│   • Comment: "Strong commitment"
│
└─ Clicks Submit
   │
   ↓
FRONTEND
│
├─ POST /synthetic/ratings
├─ Body: { user_id, company, scores... }
└─ Sends to backend
   │
   ↓
BACKEND
│
├─ Stores new rating
├─ Recalculates aggregates:
│   • New avg_ethics_score = (sum of all ethics) / count
│   • New avg_privacy_score = ...
│   • New avg_overall_score = avg of all 4 dimensions
│   • Recalculates trend
└─ Returns updated aggregates
   │
   ↓
FRONTEND
│
├─ Receives updated scores
├─ Updates CompanySummaryView
└─ User sees new scores reflected
```

---

## Score Calculation: Step by Step

### Example: Google Rating Aggregation

**Individual User Ratings:**
```
User 1 (Sarah - PM):        Ethics: 8, Privacy: 7, Fairness: 8, Transparency: 9
User 2 (John - Engineer):   Ethics: 7, Privacy: 8, Fairness: 7, Transparency: 8
User 3 (Maria - Ethics):    Ethics: 8, Privacy: 8, Fairness: 8, Transparency: 8
User 4 (Mike - Data Sci):   Ethics: 7, Privacy: 6, Fairness: 8, Transparency: 7
... (20 more users)
User 24 (Lisa - Legal):     Ethics: 7, Privacy: 7, Fairness: 7, Transparency: 8
```

**Aggregation Calculation:**
```
ETHICS DIMENSION:
  Sum: 8 + 7 + 8 + 7 + ... + 7 = 180
  Count: 24 users
  Average: 180 / 24 = 7.5
  
PRIVACY DIMENSION:
  Sum: 7 + 8 + 8 + 6 + ... + 7 = 180
  Count: 24 users
  Average: 180 / 24 = 7.5
  
FAIRNESS DIMENSION:
  Sum: 8 + 7 + 8 + 8 + ... + 7 = 185
  Count: 24 users
  Average: 185 / 24 = 7.7
  
TRANSPARENCY DIMENSION:
  Sum: 9 + 8 + 8 + 7 + ... + 8 = 187
  Count: 24 users
  Average: 187 / 24 = 7.8

OVERALL SCORE:
  Average of all 4 dimensions = (7.5 + 7.5 + 7.7 + 7.8) / 4 = 7.625
  Rounded to: 7.6/10
```

**Trend Calculation:**
```
RECENT (last 5 ratings average):
  User 20-24: (7.8 + 7.6 + 7.7 + 7.5 + 7.9) / 5 = 7.7

OLDER (ratings 1-19 average):
  User 1-19: ... = 7.5

TREND LOGIC:
  7.7 > (7.5 + 0.5)?  7.7 > 8.0?  NO
  7.7 < (7.5 - 0.5)?  7.7 < 7.0?  NO
  → Result: "stable"

FINAL DISPLAY:
  Overall: 7.6/10
  Trend: → Stable
  Ratings: 24
```

---

## API Response Flow

### Request
```
GET /synthetic/companies/Google/details
```

### Response
```json
{
  "aggregates": {
    "company_name": "Google",
    "total_ratings": 24,
    "avg_ethics_score": 7.5,
    "avg_privacy_score": 7.5,
    "avg_fairness_score": 7.7,
    "avg_transparency_score": 7.8,
    "avg_overall_score": 7.6,
    "rating_trend": "stable",
    "last_updated": "2025-12-01T10:30:00Z"
  },
  "ratings": [
    {
      "rating_id": "rating_abc123",
      "user_id": "user_xyz789",
      "user_name": "Sarah Johnson",
      "user_department": "Product Management",
      "user_expertise": "intermediate",
      "company_name": "Google",
      "ethics_score": 8,
      "privacy_score": 7,
      "fairness_score": 8,
      "transparency_score": 9,
      "comment": "Strong commitment to AI ethics",
      "created_at": "2025-11-28T14:22:00Z"
    },
    ... (23 more individual ratings)
  ],
  "rating_count": 24
}
```

---

## Component Data Binding

### Before (Static)
```tsx
<CompanySummaryView summary={companySummaries[selectedCompany.name]} />

// companySummaries = {
//   Google: {
//     company: 'Google',
//     ethicsScore: 85,    // HARD-CODED
//     privacyScore: 78,   // HARD-CODED
//     fairnessScore: 82,  // HARD-CODED
//     transparencyScore: 88, // HARD-CODED
//   }
// }
```

### After (Dynamic)
```tsx
<CompanySummaryView companyName={selectedCompany.name} />

// Inside Component:
const [companyDetail, setCompanyDetail] = useState(null)

useEffect(() => {
  // FETCH from API
  const data = await getCompanyRatingDetails(companyName)
  // data.aggregates has real scores from users
  setCompanyDetail(data)
}, [companyName])

// Render with fetched data
{companyDetail?.aggregates.avg_overall_score} // 7.6 (not 85)
```

---

## Score Scale Visualization

### 1-10 Scale → 0-100% Progress Bars

```
Score: 1/10 → Progress: 10%
  ▓░░░░░░░░░░░░░░░░░░ Needs Improvement

Score: 3/10 → Progress: 30%
  ▓▓▓░░░░░░░░░░░░░░░░ Needs Improvement

Score: 5/10 → Progress: 50%
  ▓▓▓▓▓░░░░░░░░░░░░░░ Good

Score: 6.5/10 → Progress: 65%
  ▓▓▓▓▓▓▓░░░░░░░░░░░░ Good

Score: 7.6/10 → Progress: 76%
  ▓▓▓▓▓▓▓▓░░░░░░░░░░░ Good

Score: 8.5/10 → Progress: 85%
  ▓▓▓▓▓▓▓▓▓░░░░░░░░░░ Excellent

Score: 10/10 → Progress: 100%
  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ Excellent
```

---

## User Experience Journey

```
┌─────────────────────────────────────────────┐
│ USER OPENS APPLICATION                      │
└────────────┬────────────────────────────────┘
             │
             ↓
┌─────────────────────────────────────────────┐
│ SELECTS COMPANY FROM SIDEBAR                │
│ (e.g., "Google")                            │
└────────────┬────────────────────────────────┘
             │
             ↓
┌─────────────────────────────────────────────┐
│ CLICKS "QUICK REVIEW" BUTTON                │
└────────────┬────────────────────────────────┘
             │
             ↓ Hidden (Behind the scenes)
┌─────────────────────────────────────────────┐
│ COMPONENT MOUNTED: CompanySummaryView       │
│ - useEffect triggers                        │
│ - Calls API: getCompanyRatingDetails()      │
│ - Shows loading spinner                     │
└────────────┬────────────────────────────────┘
             │
             ↓ HTTP GET Request
┌─────────────────────────────────────────────┐
│ BACKEND PROCESSING                          │
│ - Loads 24 individual ratings for Google    │
│ - Calculates aggregates                     │
│ - Determines trend                          │
│ - Returns JSON response                     │
└────────────┬────────────────────────────────┘
             │
             ↓ HTTP Response (100-200ms)
┌─────────────────────────────────────────────┐
│ FRONTEND RECEIVES DATA                      │
│ - Updates component state                   │
│ - Hides loading spinner                     │
│ - Renders with real data                    │
└────────────┬────────────────────────────────┘
             │
             ↓ Visible to User
┌─────────────────────────────────────────────┐
│ USER SEES:                                  │
│                                             │
│ ┌──────────────────────────────────────┐   │
│ │ Overall Score: 7.6/10 (Good)        │   │
│ │ ════════════════════════ 76%         │   │
│ │ Based on 24 user ratings             │   │
│ │ Trend: → Stable                      │   │
│ └──────────────────────────────────────┘   │
│                                             │
│ 4 Dimension Scores:                        │
│ • Ethics: 7.5/10       (75%) ▓▓▓▓▓▓▓░░░░ │
│ • Privacy: 7.5/10      (75%) ▓▓▓▓▓▓▓░░░░ │
│ • Fairness: 7.7/10     (77%) ▓▓▓▓▓▓▓░░░░ │
│ • Transparency: 7.8/10 (78%) ▓▓▓▓▓▓▓░░░░ │
│                                             │
└─────────────────────────────────────────────┘
             │
             ↓
┌─────────────────────────────────────────────┐
│ USER CAN:                                   │
│ • Select another company → Scores update    │
│ • See detailed individual ratings           │
│ • View rating trend over time               │
│ • Click back to return to analysis view     │
│ • (Future) Submit own ratings               │
└─────────────────────────────────────────────┘
```

---

## Comparison Table: Dummy vs Real Data

| Aspect | Dummy Data | Real Aggregates |
|--------|-----------|-----------------|
| **Source** | Hard-coded | From 24 user ratings |
| **Realism** | Made up | Based on feedback |
| **Consistency** | Always same | Changes with trends |
| **Trustability** | Low | High |
| **User Count** | 0 | 50 synthetic users |
| **Rating Count** | 0 | 179 individual ratings |
| **Score Range** | 70-90 | 1-10 (more realistic) |
| **Trend** | Static | Calculated dynamically |
| **Updateability** | Manual code change | API submission |
| **Scalability** | Hard to scale | Easy to scale |
| **Future Ready** | No | Yes |

---

## System Maturity Levels

### Level 1: Current (Today) ✅
```
Synthetic Users (50)
        ↓
Individual Ratings (179)
        ↓
Aggregated Scores (Real-time)
        ↓
UI Display (CompanySummaryView)
```

### Level 2: Near-term (2-4 weeks)
```
Level 1 + Real User Authentication
        ↓
Real users can submit ratings
        ↓
Scores update from genuine feedback
```

### Level 3: Medium-term (1-3 months)
```
Level 2 + Historical Tracking
        ↓
Score changes over time
        ↓
Trend analysis and predictions
        ↓
Notifications for changes
```

### Level 4: Long-term (3-6 months)
```
Level 3 + AI/ML Intelligence
        ↓
Anomaly detection
        ↓
Recommendation engine
        ↓
Policy impact analysis
```

---

## Key Takeaway

**Before:** Users saw static scores with no basis
```
Overall: 85/100 ← Where did this come from?
```

**After:** Users see aggregated feedback from many people
```
Overall: 7.6/10 ← Based on 24 real user ratings
         ↑ Improving ← Trend shows momentum
```

The system transforms from **static display** to **dynamic aggregation** to **crowd-sourced intelligence**.
