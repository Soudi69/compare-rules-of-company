# Synthetic Data System: User Ratings & Aggregates

## Overview

The application now features a **synthetic data system** that generates realistic user profiles with individual ratings for each company across four key dimensions (ethics, privacy, fairness, transparency). All ratings are automatically aggregated to provide real-time, user-driven company scores.

## Architecture

### Backend Components

#### 1. **SyntheticDataService** (`backend/services/synthetic_data_service.py`)

Core service for generating and managing synthetic user data and ratings.

**Key Features:**
- Generates 50 synthetic users with realistic profiles
- Creates 2-5 ratings per user for different companies
- Calculates aggregated scores from all user ratings
- Tracks rating trends over time
- Manages data persistence via JSON files

**Data Structure:**

```python
# User
{
  "user_id": "user_a1b2c3d4",
  "name": "John Smith",
  "email": "user@company.com",
  "department": "Engineering | Product Management | Ethics & Compliance | Research | Legal | Operations | Data Science",
  "expertise_level": "beginner | intermediate | expert",
  "created_at": "2025-12-01T10:30:00"
}

# Individual Rating
{
  "rating_id": "rating_x1y2z3w4",
  "user_id": "user_a1b2c3d4",
  "company_name": "Google",
  "ethics_score": 7,          # 1-10 scale
  "privacy_score": 8,         # 1-10 scale
  "fairness_score": 7,        # 1-10 scale
  "transparency_score": 8,    # 1-10 scale
  "comment": "Good policies overall",
  "created_at": "2025-12-01T10:30:00"
}

# Aggregated Score
{
  "company_name": "Google",
  "total_ratings": 15,
  "avg_ethics_score": 7.3,
  "avg_privacy_score": 7.8,
  "avg_fairness_score": 7.5,
  "avg_transparency_score": 7.9,
  "avg_overall_score": 7.6,
  "rating_trend": "up | stable | down",
  "last_updated": "2025-12-01T10:30:00"
}
```

### API Endpoints

#### User Management

```
GET  /synthetic/users
     → Returns: { users: [...], total: number }
     → Gets all synthetic users

GET  /synthetic/users/{user_id}
     → Returns: User object
     → Gets specific user by ID

GET  /synthetic/users/{user_id}/ratings
     → Returns: { user_id, ratings: [...], total: number }
     → Gets all ratings submitted by a user
```

#### Ratings Management

```
POST /synthetic/ratings
     → Body: { user_id, company_name, ethics_score, privacy_score, fairness_score, transparency_score, comment? }
     → Returns: { rating: Rating, updated_aggregates: CompanyAggregate }
     → Adds new rating and returns updated company aggregates
```

#### Aggregated Scores

```
GET  /synthetic/companies/aggregates
     → Returns: { aggregates: [...], total_companies: number }
     → Gets aggregated scores for ALL companies

GET  /synthetic/companies/{company_name}/aggregates
     → Returns: CompanyAggregate object
     → Gets aggregated scores for specific company

GET  /synthetic/companies/{company_name}/details
     → Returns: { aggregates: {...}, ratings: [...], rating_count: number }
     → Gets detailed rating information including individual user ratings
```

### Frontend Integration

#### CompanySummaryView Component

Displays aggregated user ratings for a selected company:

```tsx
<CompanySummaryView companyName="Google" />
```

**Features:**
- Fetches real-time aggregated scores from API
- Displays overall score (0-10 scale)
- Shows breakdown of 4 dimensions (Ethics, Privacy, Fairness, Transparency)
- Visualizes rating trend (improving/stable/declining)
- Shows total number of user ratings
- Includes loading and error states

**Score Display:**
- Scores on 1-10 scale are converted to percentage (1-10 → 0-100%) for visual progress bars
- Color-coded based on quality:
  - ✓ Excellent: >= 8
  - ✓ Good: 6-8
  - ✗ Needs Improvement: < 6

#### API Service (Frontend)

New functions in `frontend/src/services/api.ts`:

```typescript
// Fetch all companies' aggregated scores
getAllCompanyAggregates(): Promise<{ aggregates, total_companies }>

// Fetch specific company's aggregated scores
getCompanyAggregates(companyName: string): Promise<CompanyAggregate>

// Fetch company details with individual user ratings
getCompanyRatingDetails(companyName: string): Promise<{ aggregates, ratings, rating_count }>

// Get all users
getAllUsers(): Promise<{ users, total }>

// Get specific user
getUser(userId: string): Promise<SyntheticUser>

// Get user's ratings
getUserRatings(userId: string): Promise<{ user_id, ratings, total }>

// Add new user rating
addUserRating(data): Promise<{ rating, updated_aggregates }>
```

## Data Generation

### Synthetic User Generation

**50 users generated with:**
- Realistic names (from pool of 20 first names, 20 last names)
- Random departments (7 options)
- Random expertise levels (beginner, intermediate, expert)
- Random creation dates (within last 365 days)

### Rating Generation

**Per User:**
- 2-5 companies rated
- Scores influenced by company baseline reputation:
  - Google: 7.5 base
  - Microsoft: 7.2 base
  - IBM: 6.8 base
  - Amazon: 6.5 base
  - Meta: 6.2 base
  - Apple: 7.0 base
  - Tesla: 6.0 base

**Score Generation:**
- Gaussian distribution around company base score
- 1.5 point standard deviation for realism
- Constrained to 1-10 range

### Trend Calculation

Compares recent ratings (last 5) vs older ratings:
- `up`: Recent average > Older average + 0.5
- `down`: Recent average < Older average - 0.5
- `stable`: Otherwise

## Data Files

### Storage

```
backend/data/
├── synthetic_users.json      # All 50 synthetic users
└── synthetic_ratings.json    # All user ratings
```

### Format

**synthetic_users.json:**
```json
[
  {
    "user_id": "user_a1b2c3d4",
    "name": "John Smith",
    ...
  },
  ...
]
```

**synthetic_ratings.json:**
```json
[
  {
    "rating_id": "rating_x1y2z3w4",
    "user_id": "user_a1b2c3d4",
    ...
  },
  ...
]
```

## Usage Flow

### Initial Setup
1. Application starts
2. `SyntheticDataService` initializes
3. If data files don't exist, generates:
   - 50 synthetic users
   - ~250+ ratings (5 per user across 2-5 companies)

### Viewing Company Summary
1. User selects company from sidebar
2. Clicks "Quick Review" button
3. `CompanySummaryView` fetches:
   - Aggregated scores from `/synthetic/companies/{company}/details`
4. Displays:
   - Overall score (average of 4 dimensions)
   - Trend indicator
   - Total ratings count
   - Individual score cards with progress bars

### Adding New Rating
1. User submits rating via rating interface
2. POST request to `/synthetic/ratings`
3. New rating is stored
4. Aggregates are recalculated
5. Returns updated `CompanyAggregate` object
6. UI automatically refreshes with new scores

## Key Insights

### Score Aggregation Logic

```
avg_ethics_score = sum(all_ethics_scores) / total_ratings
avg_privacy_score = sum(all_privacy_scores) / total_ratings
avg_fairness_score = sum(all_fairness_scores) / total_ratings
avg_transparency_score = sum(all_transparency_scores) / total_ratings

avg_overall_score = (avg_ethics + avg_privacy + avg_fairness + avg_transparency) / 4
```

### Why Synthetic Data?

1. **Realistic Baseline:** Provides initial user feedback without requiring manual ratings
2. **Development Testing:** Allows feature development before real users join
3. **Demo Capabilities:** Showcases functionality with meaningful data
4. **Trend Analysis:** Can test trend calculation and visualization
5. **Performance:** Test with realistic data volumes

## Future Enhancements

### Immediate
- [ ] Connect ratings to policy text analysis
- [ ] Add weighting based on user expertise level
- [ ] Implement temporal tracking of score changes

### Medium-term
- [ ] Real user authentication and rating submission
- [ ] Historical score tracking for trend visualization
- [ ] Comparison scoring between users and averages
- [ ] Export ratings as PDF/CSV

### Long-term
- [ ] Machine learning on rating patterns
- [ ] Recommendation engine based on user preferences
- [ ] Community-driven policy suggestions
- [ ] Integration with policy change notifications

## Testing

### Generate Fresh Data
```python
from backend.services.synthetic_data_service import SyntheticDataService

service = SyntheticDataService()
# Clear and regenerate all data
service.regenerate_all_data()
```

### Verify Data
```bash
# Check users
curl http://localhost:8000/synthetic/users | jq '.total'

# Check aggregates for Google
curl http://localhost:8000/synthetic/companies/Google/aggregates | jq

# Check company details
curl http://localhost:8000/synthetic/companies/Google/details | jq '.rating_count'
```

## Performance Considerations

- **File I/O:** JSON file reads/writes on each operation (can be optimized to in-memory cache)
- **Aggregation:** Recalculated on each request (can be cached with TTL)
- **Data Size:** 50 users × 5 ratings ≈ 250-300 rating records (~50KB JSON)

## Related Documentation

- `backend/services/synthetic_data_service.py` - Implementation
- `backend/main.py` - API endpoint definitions
- `frontend/src/services/api.ts` - Frontend API calls
- `frontend/src/components/CompanySummaryView.tsx` - UI display
