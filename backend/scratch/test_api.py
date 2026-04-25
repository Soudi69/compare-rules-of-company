import requests
import json

def test_compare(a, b):
    print(f"Testing {a} vs {b}...")
    try:
        resp = requests.post("http://localhost:8000/compare", json={"company_a": a, "company_b": b})
        if resp.status_code == 200:
            print(f"  SUCCESS: {resp.json().get('summary')[:100]}...")
        else:
            print(f"  FAILED: {resp.status_code} - {resp.text}")
    except Exception as e:
        print(f"  ERROR: {e}")

test_compare("google", "microsoft")
test_compare("gemini", "ibm")
test_compare("openai", "amazon")
