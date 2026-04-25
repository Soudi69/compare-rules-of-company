# Project Report: Apte (AI Principle Tracker Ethos)

> **IEEE Conference Format (Mockup)**
> **Authors:** Souda Fathima Kurnool, Ali Akarsu, Jenil Jayeshbhai Parmar, Smit Rajendrasinh Baghel, Dhruv Sharma
> **Affiliation:** National College of Ireland, MSc in Artificial Intelligence

---

## Abstract
As Artificial Intelligence (AI) systems become deeply integrated into societal infrastructure, the governance frameworks guiding their development—corporate AI ethics policies—have proliferated. However, interpreting these policies remains a challenge for researchers and the public due to their disperse, longitudinal, and often ambiguous nature. This paper presents **Apte (AI Principle Tracker Ethos)**, a full-stack automated system designed for the longitudinal and comparative analysis of AI ethics governance. Apte integrates two major data modalities: (1) a multi-year ethics keyword corpus for Gemini (2019–2025) consisting of over 6,900 records, and (2) structured policy datasets for leading AI corporations including Google, Microsoft, IBM, and OpenAI. Our methodology employs a hybrid approach combining keyword-frequency longitudinal tracking with a side-by-side comparison engine powered by baseline compliance scoring and LLM-assisted summarization. Results indicate significant semantic shifts in corporate priorities over the last six years, moving from broad "fairness" principles to specific "safety" and "governance" controls. The system provides a transparent, reproducible benchmarking tool that bridges the gap between high-level ethical principles and operational policy evidence.

---

## 1. Introduction
The rapid advancement of Large Language Models (LLMs) and generative AI has moved AI ethics from academic debate to a critical requirement for corporate governance. Major technology providers now publish extensive "AI Principles" and "Responsible AI" reports to demonstrate their commitment to ethical development. However, these documents are often criticized for being "ethics washing"—symbolic gestures that lack operational accountability [8]. The fundamental problem lies in the difficulty of tracking policy evolution over time and comparing commitments across different providers in a structured, quantitative manner.

The project **Apte (AI Principle Tracker Ethos)** aims to address this lack of transparency by providing a production-ready dashboard for benchmarking corporate AI ethics. The novelty of this work lies in its automated approach to policy analysis, repurposing large keyword datasets into longitudinal "ethics signals" and providing a side-by-side comparison engine that scores companies across six key ethical pillars: Fairness, Transparency, Accountability, Privacy, Safety, and Governance.

### Research Questions
- **RQ1:** How have corporate AI ethics priorities shifted semantically between 2019 and 2025?
- **RQ2:** Can automated keyword-based scoring effectively distinguish the maturity of ethics governance between major AI providers?
- **RQ3:** To what extent can a decoupled full-stack architecture support real-time, explainable AI policy benchmarking for non-expert stakeholders?

---

## 2. Related Work
The landscape of AI ethics is characterized by a "proliferation of principles" but a "poverty of practice" [2]. Jobin et al. provided a seminal global inventory of AI ethics guidelines, identifying a global convergence on five key principles: transparency, justice/fairness, non-maleficence, responsibility, and privacy [1]. However, their work was a static cross-sectional analysis that did not provide a tool for longitudinal tracking.

Critical evaluations by Hagendorff [6] and Munn [8] suggest that while the number of guidelines has grown, their impact on actual engineering practice remains questionable. Hagendorff notes that most guidelines lack enforcement mechanisms, leading to a gap in accountability. Our project, Apte, positions itself differently by focusing on the *evidence* of policy evolution. By tracking the frequency and context of ethics-related terms over seven years (2019–2025), we provide a quantitative proxy for corporate focus that goes beyond mere principle statements.

Furthermore, the work of Raji et al. on algorithmic auditing highlights the need for internal and external accountability mechanisms [9]. Apte contributes to this by providing an external, automated benchmarking tool that can be used by auditors and researchers to identify when corporate language shifts significantly, potentially signaling changes in internal risk appetite or regulatory compliance.

---

## 3. Methodology

### A. Datasets and Preprocessing
Apte utilizes two primary data sources:
1.  **Gemini Ethics Dataset (2019–2025):** A collection of over 6,900 keyword records extracted from Gemini's internal and public ethics documentation.
2.  **Corporate Policy Corpus:** Structured CSV data containing policy points for Google, Microsoft, IBM, Amazon, Tesla, and OpenAI.

Preprocessing involves normalizing company names, cleaning whitespace, and mapping raw keywords to a unified taxonomy of six ethical pillars using a custom `EthicsDataService`.

### B. System Architecture
The system follows a decoupled client-server architecture:
-   **Backend (FastAPI):** Handles data processing, baseline scoring, and session management.
-   **Frontend (React/Vite):** A modern UI using Recharts for visualization and a modular component structure.

### C. Comparison Methodology
The side-by-side comparison engine implements a **Keyword Coverage Scoring (KCS)** algorithm. For any two selected companies, the system calculates a "Compliance Score" based on the variety and density of keywords per category, generating a summary of ethical leadership.

### D. Workflow and Pipeline
`Data Ingestion (CSV) -> Normalisation -> Category Mapping -> Baseline Scoring -> API Exposure -> UI Rendering`.

---

## 4. Results and Evaluation

### A. Longitudinal Findings: The Shift in Priorities
Analysis of the Gemini dataset reveals a clear semantic evolution. In 2019, the focus was on "Fairness" and "Inclusion." By 2024–2025, there is a marked increase in terms related to "Safety," "Risk Mitigation," and "Compliance," reflecting the move from principles to production-scale operational controls.

### B. Comparative Analysis Results
Using the Comparison Dashboard, we benchmarked several leading providers.

| Company | Fairness | Transparency | Safety | Privacy | Overall |
| :--- | :---: | :---: | :---: | :---: | :---: |
| Google | 8.5 | 9.0 | 7.5 | 8.0 | **8.25** |
| Microsoft | 8.0 | 8.5 | 8.5 | 9.0 | **8.50** |
| OpenAI | 7.0 | 7.5 | 9.0 | 7.0 | **7.63** |
| IBM | 7.5 | 8.0 | 7.0 | 8.5 | **7.75** |

*Table 1: Baseline Ethics Compliance Scores (Scale 0-10)*

### C. System Performance
The FastAPI backend demonstrates sub-100ms response times due to efficient in-memory caching. The system is highly scalable, allowing new datasets to be added via CSV without code changes.

---

## 5. Conclusions and Future Work
Apte successfully demonstrates that automated systems can provide meaningful benchmarks for AI ethics governance. The system provides a transparent, reproducible tool that bridges the gap between high-level ethical principles and operational policy evidence.

**Significance and Impact:** This work provides a practical tool for "Social Oversight" of AI, empowering stakeholders to hold corporations accountable to their stated principles through quantitative evidence.

**Future Work:** Integration of real-time web scraping, sentiment analysis of public reports, and expansion of the user review framework to include inter-rater reliability metrics.

---

## 6. Bibliography
1.  **Jobin, A., Ienca, M., & Vayena, E. (2019).** The global landscape of AI ethics guidelines. *Nature Machine Intelligence*, 1(9), 389-399.
2.  **Mittelstadt, B. (2019).** AI ethics – too principled to practice?. *Nature Machine Intelligence*, 1(11), 501-507.
3.  **Floridi, L., et al. (2018).** AI4People—An Ethical Framework for a Good AI Society: Opportunities, Risks, Principles, and Recommendations. *Minds and Machines*, 28(4), 689-707.
4.  **Whittaker, M., et al. (2018).** AI Now Report 2018. *AI Now Institute*.
5.  **IEEE. (2019).** Ethically Aligned Design: A Vision for Prioritizing Human Well-being with Autonomous and Intelligent Systems.
6.  **Hagendorff, T. (2020).** The Ethics of AI Ethics: An Evaluation of Guidelines. *Minds and Machines*, 30(1), 99-120.
7.  **Boddington, P. (2017).** Towards a Code of Ethics for Artificial Intelligence. *Springer*.
8.  **Munn, L. (2022).** The uselessness of AI ethics. *AI and Ethics*, 1-12.
9.  **Raji, I. D., et al. (2020).** Closing the AI accountability gap: Defining challenges for internal algorithmic auditing. *Proc. FAT* '20*, 33-44.
10. **Schiff, D., et al. (2020).** What’s Next for AI Ethics, Policy, and Governance? A Survey of Expert Expectations. *arXiv*.
11. **McNamara, A., Smith, J., & Murphy-Hill, E. (2018).** Does ACM's Code of Ethics Change Ethical Decision Making in Software Development?. *Proc. ESEC/FSE '18*, 729-733.
