# Self-Contribution Journal: Person 4
**Project:** Apte (AI Principle Tracker Ethos)
**Status:** Completed
**Effort:** Substantial / High-Impact

---

### 1. Abstract
The **Apte (AI Principle Tracker Ethos)** project is a comprehensive full-stack analytical platform designed to benchmark corporate AI ethics policies. As **Person 4**, my role focused on the development of the system's "Analytical Core." This involved architecting the side-by-side comparison engine, implementing the backend scoring logic for baseline compliance, and ensuring data continuity across sessions. By bridging the gap between raw data ingestion and high-level visualization, I enabled the project's primary research objective: providing an automated, quantitative tool for evaluating corporate ethical commitments from 2019 to 2025.

### 2. Contribution to the Project
My technical and academic contributions were central to the project's functionality and documentation:
*   **Comparison Dashboard UI:** I developed the interactive "Comparison" module in React. This feature allows users to select two disparate companies (e.g., Google vs. OpenAI) and see a side-by-side breakdown of their ethical coverage across six pillars.
*   **Baseline Scoring Algorithm (KCS):** I designed and implemented the **Keyword Coverage Scoring (KCS)** algorithm in the Python backend. This logic translates raw policy text and ethics keywords into normalized 0-10 scores, enabling the system's benchmarking capabilities.
*   **Session Management System:** I built the RESTful API and frontend hooks for session management. This system ensures that user comparisons and ratings are persisted throughout a session, providing a seamless analytical workflow.
*   **Data Integration (Gemini Corpus):** I oversaw the integration of the multi-year Gemini ethics keyword corpus (6,900+ records), ensuring that longitudinal data was correctly mapped to modern ethics categories.
*   **Technical Reporting:** I authored the **Abstract** and **Conclusions** for the final IEEE project report, synthesizing the collective work of the team into a professional academic narrative.

### 3. Challenges and Resolution
*   **Challenge 1: Data Modality Mismatch.** The project required comparing word-frequency data (Gemini) with sentence-based policy points (Google/Microsoft). 
    *   *Resolution:* I implemented a normalization layer in the `EthicsDataService` that calculates "Category Density" rather than raw counts, allowing for an "apples-to-apples" comparison across heterogeneous datasets.
*   **Challenge 2: System "Not Found" Errors.** During integration, several companies were returning 404 errors because they were present in the CSVs but not in the hardcoded comparison list.
    *   *Resolution:* I refactored the `DataService` to dynamically query the `EthicsDataService` as a fallback, ensuring that any company discovered in the datasets would be automatically available for analysis and comparison.
*   **Challenge 3: Backend/Frontend Synchronization.** Maintaining session state across different React views was initially prone to data loss.
    *   *Resolution:* I implemented a centralized `sessionId` initialization using React's `useEffect` hook, which synchronizes with the backend on app load and persists across all analytical modules.

### 4. Outcome of the Project
The successful implementation of my modules resulted in a high-impact analytical tool with several key outcomes:
*   **Automated Benchmarking:** The project now provides real-time, quantitative comparisons for over 6 major AI providers, moving beyond manual survey methods.
*   **Longitudinal Insights:** Through the Gemini integration, the project surfaced a critical industry shift from "Fairness" (2019) to "Operational Safety" (2025).
*   **User Empowerment:** The Comparison Dashboard empowers non-expert stakeholders to identify "Governance Gaps" in corporate policies with a single click.
*   **Academic Rigour:** The final project report, complete with automated scoring tables and professional diagrams, meets the IEEE standards for conference-level publications, providing a strong foundation for further research in AI governance.
