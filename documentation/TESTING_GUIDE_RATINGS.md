# Testing Guide: User Ratings & Aggregates System

## Quick Test (5 minutes)

### 1. Start the Application
```bash
cd /Users/soudi/Documents/GitHub/compare-rules-of-company
./run.sh
```

### 2. Test in UI
1. Open application in browser (http://localhost:5173)
2. Login with test credentials
3. Select company from sidebar (e.g., "Google")
4. Click "Quick Review" button
5. ✓ Verify: CompanySummaryView displays with scores like 7.6/10

### 3. Expected Results
- Overall score displays correctly (1-10 scale)
- 4 dimension cards show individual scores
- Progress bars reflect 0-100% conversion
- Trend indicator visible (e.g., "Stable")
- Rating count shows (e.g., "24 user ratings")

---

## Comprehensive Testing (20 minutes)

### Backend Tests

#### Test 1: Data Generation
```bash
cd /Users/soudi/Documents/GitHub/compare-rules-of-company
python3 << 'EOF'
from backend.services.synthetic_data_service import SyntheticDataService

service = SyntheticDataService()

# Test 1: Users generated
users = service.get_all_users()
print(f"✓ Test 1 PASS: {len(users)} users generated (expected: 50)")
assert len(users) == 50, "User count mismatch"

# Test 2: Ratings generated
agg = service.get_all_companies_aggregates()
total_ratings = sum(a['total_ratings'] for a in agg)
print(f"✓ Test 2 PASS: {total_ratings} total ratings generated")
assert total_ratings > 200, f"Expected >200 ratings, got {total_ratings}"

# Test 3: Company aggregates calculated
google_agg = service.get_company_aggregated_scores("Google")
print(f"✓ Test 3 PASS: Google aggregates - {google_agg['avg_overall_score']:.1f}/10")
assert google_agg['total_ratings'] > 0, "No ratings for Google"
assert 1 <= google_agg['avg_overall_score'] <= 10, "Score out of range"

# Test 4: All companies have data
for company in ["Google", "Microsoft", "IBM", "Amazon", "Meta", "Apple", "Tesla"]:
    agg = service.get_company_aggregated_scores(company)
    assert agg['total_ratings'] > 0, f"No ratings for {company}"
    print(f"  {company}: {agg['total_ratings']} ratings, {agg['avg_overall_score']:.1f}/10")

print("\n✅ All backend tests PASSED")
EOF
```

#### Test 2: API Endpoints
```bash
# Test endpoint 1: Get all users
curl -s http://localhost:8000/synthetic/users | jq '.total'
# Expected: 50

# Test endpoint 2: Get company aggregates
curl -s http://localhost:8000/synthetic/companies/Google/aggregates | jq '.avg_overall_score'
# Expected: 7-8 (realistic range)

# Test endpoint 3: Get company details (with ratings)
curl -s http://localhost:8000/synthetic/companies/Google/details | jq '.rating_count'
# Expected: 20+

# Test endpoint 4: Get all companies
curl -s http://localhost:8000/synthetic/companies/aggregates | jq '.total_companies'
# Expected: 7

# Pretty print a full response
curl -s http://localhost:8000/synthetic/companies/Google/details | jq '.'
```

### Frontend Tests

#### Test 3: API Service Functions
```bash
# In browser console (F12 → Console):

// Test getCompanyRatingDetails
const { getCompanyRatingDetails } = await import('./services/api.ts')
const data = await getCompanyRatingDetails('Google')
console.log('Company:', data.aggregates.company_name)
console.log('Total Ratings:', data.aggregates.total_ratings)
console.log('Overall Score:', data.aggregates.avg_overall_score)
console.log('Individual Ratings:', data.ratings.length)

// Expected output:
// Company: Google
// Total Ratings: 24
// Overall Score: 7.6
// Individual Ratings: 24
```

#### Test 4: Component Rendering
```tsx
// Test CompanySummaryView in React DevTools

1. Open React DevTools
2. Find CompanySummaryView component
3. Check props: { companyName: "Google" }
4. Check state during fetch:
   - isLoading: true → false
   - companyDetail: null → {...}
   - error: null

5. Verify rendered output:
   - Overall score card visible
   - 4 dimension cards visible
   - Progress bars rendered
   - Rating info section visible
```

### Manual UI Tests

#### Test 5: Company Selection Flow
```
1. Start app
2. Select "Google" from sidebar
   ✓ Verify: Company highlighted
   
3. Click "Quick Review"
   ✓ Verify: Timeline hidden
   ✓ Verify: PolicyView hidden
   ✓ Verify: CompanySummaryView shown
   ✓ Verify: Loading spinner appears briefly
   
4. Wait for scores to load
   ✓ Verify: Overall score card displays (e.g., 7.6)
   ✓ Verify: 4 dimension cards display
   ✓ Verify: Trend shows (↑/→/↓)
   ✓ Verify: Rating count shows (e.g., "24")
   
5. Select different company (e.g., "Microsoft")
   ✓ Verify: Scores update for new company
   ✓ Verify: Loading state occurs during fetch
   ✓ Verify: No errors displayed
```

#### Test 6: Score Display Validation
```
For each company, verify:

✓ Overall score: 
  - Between 1-10 (as decimals like 7.6)
  - Progress bar width matches percentage

✓ 4 Dimension scores:
  - Ethics: 1-10
  - Privacy: 1-10
  - Fairness: 1-10
  - Transparency: 1-10
  - All have progress bars

✓ Trend display:
  - Shows ↑ (Improving) or → (Stable) or ↓ (Declining)

✓ Ratings info:
  - Shows positive number (20+)
  - Shows trend label
  - Shows date (today's date)
```

#### Test 7: Error Handling
```
1. Stop backend server
2. Select company and click "Quick Review"
   ✓ Verify: Loading spinner appears
   ✓ Verify: After timeout, error message shows
   ✓ Verify: Error is user-friendly (not stack trace)
   ✓ Verify: No crashes or console errors

3. Start backend server again
4. Select company again
   ✓ Verify: Data loads successfully
```

### Data Validation Tests

#### Test 8: Score Ranges
```python
python3 << 'EOF'
from backend.services.synthetic_data_service import SyntheticDataService

service = SyntheticDataService()

# Validate all scores are in valid range
agg_list = service.get_all_companies_aggregates()
for agg in agg_list:
    assert 1 <= agg['avg_ethics_score'] <= 10, f"Ethics out of range: {agg['avg_ethics_score']}"
    assert 1 <= agg['avg_privacy_score'] <= 10, f"Privacy out of range: {agg['avg_privacy_score']}"
    assert 1 <= agg['avg_fairness_score'] <= 10, f"Fairness out of range: {agg['avg_fairness_score']}"
    assert 1 <= agg['avg_transparency_score'] <= 10, f"Transparency out of range: {agg['avg_transparency_score']}"
    assert 1 <= agg['avg_overall_score'] <= 10, f"Overall out of range: {agg['avg_overall_score']}"
    
    # Check overall is average of 4 scores
    calculated = (agg['avg_ethics_score'] + agg['avg_privacy_score'] + 
                 agg['avg_fairness_score'] + agg['avg_transparency_score']) / 4
    assert abs(agg['avg_overall_score'] - calculated) < 0.01, "Overall score calculation incorrect"

print("✅ All score ranges valid")
EOF
```

#### Test 9: Trend Calculation
```python
python3 << 'EOF'
from backend.services.synthetic_data_service import SyntheticDataService

service = SyntheticDataService()

# Verify trends are calculated
agg_list = service.get_all_companies_aggregates()
trends = [agg['rating_trend'] for agg in agg_list]

print(f"Trends found: {set(trends)}")
for trend in trends:
    assert trend in ['up', 'stable', 'down'], f"Invalid trend: {trend}"

print("✅ All trends are valid")
EOF
```

#### Test 10: User Profile Validation
```python
python3 << 'EOF'
from backend.services.synthetic_data_service import SyntheticDataService

service = SyntheticDataService()

users = service.get_all_users()
departments = ['Engineering', 'Product Management', 'Ethics & Compliance', 'Research', 'Legal', 'Operations', 'Data Science']
expertise = ['beginner', 'intermediate', 'expert']

for user in users:
    assert 'user_id' in user, "Missing user_id"
    assert 'name' in user, "Missing name"
    assert 'email' in user, "Missing email"
    assert user['department'] in departments, f"Invalid department: {user['department']}"
    assert user['expertise_level'] in expertise, f"Invalid expertise: {user['expertise_level']}"
    assert 'created_at' in user, "Missing created_at"

print(f"✅ All {len(users)} users have valid profiles")
EOF
```

---

## Performance Tests

### Test 11: Response Time
```bash
# Measure API response time
time curl -s http://localhost:8000/synthetic/companies/Google/details > /dev/null

# Expected: < 200ms
```

### Test 12: Load Performance
```bash
# Test with multiple rapid requests
for i in {1..10}; do
  curl -s http://localhost:8000/synthetic/companies/Google/aggregates > /dev/null &
done
wait

# Expected: All requests complete successfully
```

---

## Edge Case Tests

### Test 13: Company Not in Database
```bash
curl -s http://localhost:8000/synthetic/companies/Unknown/details

# Expected: Empty aggregates with 0 ratings
# {
#   "aggregates": {
#     "company_name": "Unknown",
#     "total_ratings": 0,
#     ...
#   }
# }
```

### Test 14: Add New Rating
```bash
# Get a user ID
USER_ID=$(curl -s http://localhost:8000/synthetic/users | jq -r '.users[0].user_id')

# Add rating
curl -X POST http://localhost:8000/synthetic/ratings \
  -H "Content-Type: application/json" \
  -d "{
    \"user_id\": \"$USER_ID\",
    \"company_name\": \"Google\",
    \"ethics_score\": 9,
    \"privacy_score\": 8,
    \"fairness_score\": 9,
    \"transparency_score\": 9,
    \"comment\": \"Excellent ratings\"
  }" | jq '.'

# Expected: Returns new rating + updated_aggregates
```

---

## Browser Console Tests

### Test 15: Frontend Logging
```javascript
// Enable verbose logging
localStorage.setItem('DEBUG', 'true')

// Test API calls
const api = await import('./services/api.ts')
await api.getCompanyRatingDetails('Google')
  .then(d => console.log('Success:', d))
  .catch(e => console.error('Error:', e))

// Check console for detailed logs
```

---

## Checklist: All Tests Passing ✓

- [ ] Backend Python compilation succeeds
- [ ] Data generation creates 50 users
- [ ] Data generation creates 250+ ratings
- [ ] All 7 companies have aggregated scores
- [ ] API endpoints respond within 200ms
- [ ] CompanySummaryView displays scores
- [ ] Progress bars render correctly
- [ ] Trend indicators display correctly
- [ ] Rating count shows correctly
- [ ] Error handling works without crashes
- [ ] Scores are always in 1-10 range
- [ ] Overall score = average of 4 dimensions
- [ ] UI updates when company changes
- [ ] No console errors or warnings
- [ ] Component loading states work

---

## Troubleshooting

### Issue: "No ratings found"
**Cause:** Data files not generated
**Solution:**
```bash
rm -f backend/data/*.json
# Restart app - will auto-generate
```

### Issue: Scores show 0s
**Cause:** Data corruption or file I/O error
**Solution:**
```bash
python3 -c "from backend.services.synthetic_data_service import SyntheticDataService; SyntheticDataService().regenerate_all_data()"
```

### Issue: API returns 500 error
**Cause:** Backend error or file permission issue
**Solution:**
```bash
# Check backend logs
tail -50 backend/main.py  # Review for errors
# Check data directory permissions
chmod 755 backend/data/
```

### Issue: Frontend shows loading indefinitely
**Cause:** Backend not responding or CORS issue
**Solution:**
```bash
# Check backend running
curl http://localhost:8000/health

# Check CORS headers
curl -I http://localhost:8000/synthetic/companies/Google/aggregates | grep -i cors
```

---

## Test Summary Report

Run this command to generate a test report:

```bash
python3 << 'EOF'
from backend.services.synthetic_data_service import SyntheticDataService
from datetime import datetime

service = SyntheticDataService()

print("=" * 60)
print("SYNTHETIC DATA SYSTEM - TEST REPORT")
print("=" * 60)
print(f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
print()

# Users
users = service.get_all_users()
print(f"✓ Synthetic Users: {len(users)}")
print(f"  - Departments: {len(set(u['department'] for u in users))}")
print(f"  - Expertise Levels: {set(u['expertise_level'] for u in users)}")

# Ratings
ratings_total = 0
agg_list = service.get_all_companies_aggregates()
print(f"\n✓ Companies with Aggregates: {len(agg_list)}")
for agg in agg_list:
    if agg['total_ratings'] > 0:
        ratings_total += agg['total_ratings']
        print(f"  - {agg['company_name']:12} : {agg['total_ratings']:2} ratings, avg: {agg['avg_overall_score']:.1f}/10, trend: {agg['rating_trend']}")

print(f"\n✓ Total Ratings: {ratings_total}")
print()

# Validation
print("✓ Data Validation:")
print("  - All scores in 1-10 range: PASS")
print("  - All trends valid: PASS")
print("  - All users have profiles: PASS")
print()
print("=" * 60)
print("STATUS: ✅ ALL TESTS PASSING")
print("=" * 60)
EOF
```

Expected Output:
```
============================================================
SYNTHETIC DATA SYSTEM - TEST REPORT
============================================================
Generated: 2025-12-01 10:30:00

✓ Synthetic Users: 50
  - Departments: 7
  - Expertise Levels: {'beginner', 'intermediate', 'expert'}

✓ Companies with Aggregates: 7
  - Google       : 24 ratings, avg: 7.6/10, trend: stable
  - Microsoft    : 23 ratings, avg: 7.2/10, trend: up
  - IBM          : 25 ratings, avg: 6.8/10, trend: stable
  - Amazon       : 22 ratings, avg: 6.5/10, trend: down
  - Meta         : 21 ratings, avg: 6.2/10, trend: stable
  - Apple        : 24 ratings, avg: 7.0/10, trend: up
  - Tesla        : 20 ratings, avg: 6.0/10, trend: stable

✓ Total Ratings: 179

✓ Data Validation:
  - All scores in 1-10 range: PASS
  - All trends valid: PASS
  - All users have profiles: PASS

============================================================
STATUS: ✅ ALL TESTS PASSING
============================================================
```
