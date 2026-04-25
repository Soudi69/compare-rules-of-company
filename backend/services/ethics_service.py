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
                        'statement': row.get('statement', ''),
                        'details': row.get('details', '')
                    })
        except Exception as e:
            print(f"Error reading CSV file {filepath}: {str(e)}")
        
        return policies
    
    def get_companies(self) -> List[str]:
        """Get list of all available companies"""
        companies = set()
        
        # Always add Gemini if we have Gemini datasets
        gemini_files = [
            'gemini_ethics_dataset.csv',
            '2019_gemini_ethics_dataset.csv',
            '2020_gemini_ethics_dataset.csv',
            '2022_gemini_ethics_dataset.csv',
            '2024_gemini_ethics_dataset.csv',
            '2025_gemini_ethics_dataset.csv',
        ]
        
        if any(os.path.exists(os.path.join(self.data_dir, f)) for f in gemini_files):
            companies.add('Gemini')
        
        # Scan all CSV files in data directory for company policies
        if os.path.exists(self.data_dir):
            for filename in os.listdir(self.data_dir):
                # Skip Gemini datasets (already handled)
                if 'gemini' in filename.lower():
                    continue
                    
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
        """Get formatted timeline data for a company
        
        If company_name is 'Gemini', returns AI ethics evolution from Gemini datasets.
        Otherwise, returns policy data from CSV files.
        """
        # Special handling for Gemini - use keyword-based ethics timeline
        if company_name.lower() == 'gemini':
            return self.get_gemini_timeline()
        
        # For other companies, use standard policy-based timeline
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
                'statement': policy.get('statement', ''),
                'details': policy.get('details', '')
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

    def load_gemini_ethics_keywords(self) -> Dict[str, Dict[int, int]]:
        """Load Gemini ethics keywords data from multiple year datasets
        
        Returns a dict mapping ethics categories to year->count mappings.
        Used to build a timeline showing Gemini's ethics evolution by keyword frequency.
        """
        ethics_keywords = {
            'fairness': {},
            'transparency': {},
            'privacy': {},
            'accountability': {},
            'safety': {},
            'beneficence': {},
            'honesty': {},
            'inclusion': {},
            'diversity': {},
            'accessibility': {},
            'equity': {},
            'governance': {},
            'oversight': {},
            'testing': {},
            'monitoring': {},
            'documentation': {},
            'risk_identification': {},
            'risk_mitigation': {},
            'harm_prevention': {},
            'collaboration': {},
            'engagement': {},
            'feedback': {},
            'sustainability': {},
            'future_risk': {},
            'societal_impact': {},
            'education': {},
            'prohibition': {},
            'limitation': {},
        }
        
        # Load all Gemini datasets (2019, 2020, 2022, 2024, 2025)
        years_to_load = [2019, 2020, 2022, 2024, 2025]
        
        for year in years_to_load:
            filename = self._get_csv_path(f'{year}_gemini_ethics_dataset.csv')
            if not os.path.exists(filename):
                continue
            
            year_keywords = {cat: [] for cat in ethics_keywords.keys()}
            
            try:
                with open(filename, 'r', encoding='utf-8') as f:
                    reader = csv.DictReader(f)
                    for row in reader:
                        word = row.get('WORD', '').strip()
                        if not word:
                            continue
                        
                        # Check each ethics category
                        for category in ethics_keywords.keys():
                            col_value = row.get(category, '').strip()
                            # If the category column has any value, word is associated with this ethics principle
                            if col_value:
                                year_keywords[category].append(word)
                
                # Store year-aggregated counts
                for category, words in year_keywords.items():
                    if category not in ethics_keywords:
                        ethics_keywords[category] = {}
                    ethics_keywords[category][year] = len(set(words))  # Count unique words per category per year
                    
            except Exception as e:
                print(f"Error reading Gemini dataset {year}: {str(e)}")
        
        return ethics_keywords
    
    def get_gemini_timeline(self) -> Dict[str, Any]:
        """Build a timeline of Gemini's AI ethics evolution based on keyword analysis
        
        Returns timeline data showing which ethics categories were emphasized by year
        """
        ethics_data = self.load_gemini_ethics_keywords()
        
        # Collect all years present in the data
        all_years = set()
        for category_data in ethics_data.values():
            all_years.update(category_data.keys())
        
        all_years = sorted(list(all_years))
        
        # Build timeline with year-by-year ethics focus
        timeline_entries = []
        for year in all_years:
            year_data = {
                'year': year,
                'policies': []
            }
            
            # Define human readable policy points based on the highest ranked keyword categories
            category_text_map = {
                'fairness': {
                    'point': 'Advanced Dataset Fairness Strategies',
                    'impact': 'Implemented proactive measures and evaluations to minimize dataset biases and ensure equitable representation across models.',
                    'statement': 'Models must be rigorously evaluated across diverse demographics to prevent disparate impact and algorithmic discrimination.',
                    'details': 'Fairness is central to responsible AI development. This policy mandates the continuous evolution of dataset curation processes to minimize implicit and explicit biases. Initiatives include expanded bias-bounty programs, the deployment of third-party algorithmic fairness auditors, and the active documentation of demographic representation across all foundational training data layers. Our goal is to ensure parity in performance across disparate demographic clusters.'
                },
                'privacy': {
                    'point': 'Deepened Privacy-First Sourcing',
                    'impact': 'Enhanced focus on data sanitization and privacy-preserving mechanisms during data collection and model training passes.',
                    'statement': 'User data collection must be minimized, transparently disclosed, and isolated from core model training weights.',
                    'details': 'Privacy engineering takes a foundational role. Not only are standard PII-scrubbing methodologies enforced, but the organization is pivoting toward differential privacy and federated learning mechanisms where possible. All datasets must undergo strict anonymization protocols before being cleared for neural model ingestion, guaranteeing that isolated data points cannot be traced back to actual individuals.'
                },
                'accountability': {
                    'point': 'Formalized Oversight Committees',
                    'impact': 'Established more formalized internal AI accountability processes, ethics review boards, and compliance checks.',
                    'statement': 'All major AI deployments require sign-off from an independent AI risk and ethics committee prior to launch.',
                    'details': 'Accountability structure requires a formalized chain of command regarding AI actions. This mandates that cross-functional ethics review boards evaluate products pre-launch. Post-launch, continuous auditing takes place, meaning engineers, project managers, and executives retain explicit operational accountability should critical model failure or severe unintended harms manifest.'
                },
                'safety': {
                    'point': 'Expanded Model Safety Testing',
                    'impact': 'Invested heavily in adversarial testing, red-teaming, and securing model limits against jailbreaks or harmful outputs.',
                    'statement': 'Generative models shall undergo rigorous adversarial red-teaming to ensure resilience against prompt injection and malicious exploit.',
                    'details': 'Safety is handled defensively through comprehensive internal red-teaming operations before any public interfacing. Specialized security and alignment researchers proactively stress-test the parameter limits to induce unexpected behaviors, toxic output, or security vulnerabilities (e.g. system prompt leaking, jailbreaks). Only after passing a statistical safety threshold are endpoints opened.'
                },
                'transparency': {
                    'point': 'Robust Transparency Disclosures',
                    'impact': 'Committed to clearer reporting metrics and model cards to provide insights into AI limitations and capabilities.',
                    'statement': 'Release channels must include comprehensive model cards detailing known limitations, training data sources, and evaluation metrics.',
                    'details': 'In our commitment to external transparency, all significant algorithmic infrastructures now demand comprehensive Model Cards. These public disclosures will outline intended use cases, severe out-of-scope behaviors, training demographic representations, evaluation metric outcomes, and environmental footprint data to keep the public thoroughly informed about what powers the systems they use.'
                },
                'risk_mitigation': {
                    'point': 'Systematic Risk Mitigations',
                    'impact': 'Adopted structured approaches to identifying, prioritizing, and systematically mitigating emerging AI risks.',
                    'statement': 'Potential systemic downstream risks must be documented and computationally constrained before enterprise deployment.'
                },
                'harm_prevention': {
                    'point': 'Proactive Harm Prevention',
                    'impact': 'Developed automated filters and heuristics actively designed to block the generation of dangerous or harmful instruction.',
                    'statement': 'The model is explicitly forbidden from generating instructions related to self-harm, illegal acts, or physical violence.',
                    'details': 'Constitutional constraints are applied physically and systematically to all layers of the model. Heuristics, output sanitizers, and classifier guardrails exist specifically to halt execution streams when the generation threatens tangible harm, assists in dangerous/illegal activities (e.g. biological threat synthesis, explicit CSAM), or drives severe self-harm enablement.'
                },
                'partnership': {
                    'point': 'Global AI Ethics',
                    'impact': 'Establishing global frameworks through broad external cooperation and enterprise synergy.',
                    'statement': 'Ensure international collaboration and alignment across the global governance landscape.',
                    'details': 'Partnership and international collaboration lie at the core of defining realistic standards for Global AI Ethics. This means cooperating with cross-border governmental bodies, international think-tanks, and competing enterprise entities to ensure global standards remain coherent, uniform, and inherently safe for humanity across international lines.'
                }
            }

            # Add each ethics category with word count for this year
            for category, years_dict in ethics_data.items():
                if year in years_dict:
                    count = years_dict[year]
                    
                    # We only create timeline items for high/medium significance to keep the timeline clean
                    if count > 50:
                        severity = 'high'
                    elif count > 20:
                        severity = 'medium'
                    else:
                        severity = 'low'
                    
                    readable_data = category_text_map.get(
                        category, 
                        {
                            'point': f'Enhanced {category.replace("_", " ").title()} Protocols',
                            'impact': f'Strengthened internal policies to elevate {category.replace("_", " ")} throughout the AI lifecycle.',
                            'statement': f'Ensure strict compliance with overarching {category.replace("_", " ")} standards and protocols.',
                            'details': f'This policy represents a comprehensive internal commitment to establishing rigid governance around {category.replace("_", " ")}. By prioritizing these aspects, the organization ensures that external stakeholders, internal developers, and global regulatory frameworks are aligned. Core actions include active monitoring, cross-border or institutional collaboration where applicable, and continuous iteration on the internal definition and enforcement of {category.replace("_", " ")}.'
                        }
                    )

                    year_data['policies'].append({
                        'point': readable_data['point'],
                        'category': category.replace("_", " ").title(),
                        'severity': severity,
                        'impact': readable_data['impact'],
                        'statement': readable_data['statement'],
                        'details': readable_data.get('details', '')
                    })
            
            # Sort by severity (high first) and limit to top 5 points per year for clarity
            severity_order = {'high': 0, 'medium': 1, 'low': 2}
            year_data['policies'].sort(key=lambda p: severity_order.get(p['severity'], 3))
            year_data['policies'] = year_data['policies'][:5]
            
            timeline_entries.append(year_data)
        
        return {
            'company_name': 'Gemini',
            'total_policies': sum(len(entry['policies']) for entry in timeline_entries),
            'year_range': {
                'start': min(all_years) if all_years else None,
                'end': max(all_years) if all_years else None,
            },
            'timeline': timeline_entries
        }
