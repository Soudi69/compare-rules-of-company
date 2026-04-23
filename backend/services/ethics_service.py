import csv
from typing import List, Dict, Any
import os
from pathlib import Path

class EthicsDataService:
    """Service to load and manage ethics/AI policy data from CSV files"""
    
    def __init__(self, data_dir: str = None):
        if data_dir is None:
            # Default to backend/data directory
            data_dir = os.path.join(os.path.dirname(__file__), '..', '..', 'data')
        self.data_dir = data_dir
        self._cache: Dict[str, List[Dict[str, Any]]] = {}
    
    def _get_csv_path(self, filename: str) -> str:
        """Get the full path to a CSV file"""
        return os.path.join(self.data_dir, filename)
    
    def load_company_policies(self, company_name: str) -> List[Dict[str, Any]]:
        """Load policies for a specific company from CSV"""
        # Check cache first
        cache_key = company_name.lower()
        if cache_key in self._cache:
            return self._cache[cache_key]
        
        # Find the CSV file that contains this company
        policies = []
        
        # Try the combined file first
        combined_file = self._get_csv_path('microsoft_ibm_amazon_ai_policies.csv')
        if os.path.exists(combined_file):
            policies.extend(self._read_csv_file(combined_file, company_name))
        
        # Also try individual files
        individual_file = self._get_csv_path(f'{company_name.lower()}_ai_policies.csv')
        if os.path.exists(individual_file):
            policies.extend(self._read_csv_file(individual_file, company_name))
        
        # Cache the results
        self._cache[cache_key] = policies
        
        return policies
    
    def _read_csv_file(self, filepath: str, company_filter: str = None) -> List[Dict[str, Any]]:
        """Read and parse a CSV file"""
        policies = []
        
        if not os.path.exists(filepath):
            return policies
        
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                reader = csv.DictReader(f)
                for row in reader:
                    # Filter by company if specified
                    if company_filter:
                        if row.get('company_name', '').lower() != company_filter.lower():
                            continue
                    
                    # Convert year to int if possible
                    try:
                        year = int(row.get('year', 0))
                    except ValueError:
                        year = 0
                    
                    policies.append({
                        'company_name': row.get('company_name', ''),
                        'year': year,
                        'policy_point': row.get('policy_point', ''),
                        'category': row.get('category', ''),
                        'severity': row.get('severity', 'medium').lower(),
                        'impact': row.get('impact', ''),
                        'status': row.get('status', 'active'),
                    })
        except Exception as e:
            print(f"Error reading CSV file {filepath}: {str(e)}")
        
        return policies
    
    def get_companies(self) -> List[str]:
        """Get list of all available companies"""
        companies = set()
        
        # Scan all CSV files in data directory
        if os.path.exists(self.data_dir):
            for filename in os.listdir(self.data_dir):
                if filename.endswith('.csv'):
                    filepath = os.path.join(self.data_dir, filename)
                    try:
                        with open(filepath, 'r', encoding='utf-8') as f:
                            reader = csv.DictReader(f)
                            for row in reader:
                                company = row.get('company_name', '')
                                if company:
                                    companies.add(company)
                    except Exception as e:
                        print(f"Error reading companies from {filename}: {str(e)}")
        
        return sorted(list(companies))
    
    def get_timeline_data(self, company_name: str) -> Dict[str, Any]:
        """Get formatted timeline data for a company"""
        policies = self.load_company_policies(company_name)
        
        # Group by year
        timeline_by_year = {}
        for policy in policies:
            year = policy['year']
            if year not in timeline_by_year:
                timeline_by_year[year] = []
            
            timeline_by_year[year].append({
                'point': policy['policy_point'],
                'category': policy['category'],
                'severity': policy['severity'],
                'impact': policy['impact'],
            })
        
        # Format as array of year objects
        timeline_data = [
            {
                'year': year,
                'policies': timeline_by_year[year]
            }
            for year in sorted(timeline_by_year.keys())
        ]
        
        return {
            'company_name': company_name,
            'total_policies': len(policies),
            'year_range': {
                'start': min(timeline_by_year.keys()) if timeline_by_year else None,
                'end': max(timeline_by_year.keys()) if timeline_by_year else None,
            },
            'timeline': timeline_data
        }
    
    def clear_cache(self):
        """Clear the cache"""
        self._cache.clear()
