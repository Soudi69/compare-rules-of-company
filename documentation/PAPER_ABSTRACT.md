# Person 4 Paper Sections

## Abstract (197 words)

The growing adoption of artificial intelligence across industries has made corporate AI ethics governance a critical area of study. This paper presents **Apte** (AI Principle Tracker Ethos), a full-stack web application that enables systematic comparison and analysis of AI ethics policies across major technology companies. Our system ingests corporate AI ethics guidelines from sources including OpenAI, Google, Microsoft, Meta, and IBM, and applies a baseline comparison methodology to evaluate policy coverage, compliance scoring, red flag identification, and temporal evolution.

The platform features a **comparison dashboard** that enables side-by-side analysis of two companies' ethical frameworks, highlighting differences in policy scope, enforcement mechanisms, and governance maturity. A **session management** system allows users to track and revisit comparison histories. Backend analysis combines keyword coverage metrics with LLM-powered natural language assessment to produce structured compliance reports.

Preliminary results indicate significant variation in governance maturity across companies, with compliance scores ranging from 78 to 92 across our dataset. The tool demonstrates that automated policy analysis can surface actionable insights for regulators, investors, and corporate governance teams seeking to benchmark AI ethics practices.

## Conclusions (162 words)

This project has demonstrated the feasibility of building an automated system for comparing corporate AI ethics policies across organisations. The Apte platform successfully integrates a FastAPI backend with a React-based comparison dashboard, enabling users to perform structured side-by-side evaluations of corporate AI governance frameworks.

Key findings include: (1) policy coverage varies substantially across companies, with transparency and safety being the most commonly addressed topics; (2) compliance scores correlate with the frequency of policy updates; and (3) a baseline comparison method can effectively surface governance gaps.

**Limitations** include the reliance on mock datasets rather than real-time policy scraping, the small sample size of five companies, and the use of keyword-based metrics alongside LLM-generated analysis rather than validated NLP pipelines.

**Future work** should expand the dataset to include companies across diverse sectors and geographies, integrate validated NLP models for sentiment and topic analysis, and conduct user studies to evaluate the dashboard's effectiveness for decision-making.
