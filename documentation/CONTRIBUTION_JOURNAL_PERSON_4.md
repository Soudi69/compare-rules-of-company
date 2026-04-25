# Self-Contribution Journal: Person 4
**Project:** Apte (AI Principle Tracker Ethos)
**Role:** Backend (Baseline + Sessions) | UI (Comparison Dashboard) | Paper (Abstract + Conclusions)
**Effort Level:** Medium / High Impact

---

## Executive Summary
As Person 4, my primary contribution was the development of the **Comparative Analysis Engine** and the **Session Management System**. I bridged the gap between the raw data processing (Person 1) and the final analytical summaries (Person 3) by creating the mathematical baseline for scoring and the interactive side-by-side dashboard for users.

---

## 🛠️ Detailed Task Description

### 1. Comparison Dashboard UI Development
*   **Description:** Designed and implemented the "Comparison" tab in the React frontend. This included creating responsive selection dropdowns, comparative metric cards, and a side-by-side layout for visualizing policy gaps between companies.
*   **Time Spent:** 15 Hours
*   **Challenges:** Ensuring the UI could handle companies with vastly different amounts of data (e.g., Gemini's 6,000 keywords vs. Tesla's 50 policy points) without breaking the layout.
*   **Resolution:** Implemented a normalized "Score Card" system that presents percentage-based coverage rather than raw counts, ensuring a fair visual comparison regardless of dataset size.

### 2. Baseline Scoring & Compliance Backend
*   **Description:** Developed the `BaselineService` and integrated it with the `EthicsDataService`. I authored the **Keyword Coverage Scoring (KCS)** algorithm which quantifies a company's commitment across the six ethical pillars (Fairness, Safety, etc.).
*   **Time Spent:** 12 Hours
*   **Challenges:** The Gemini dataset was keyword-based while others were sentence-based. Finding a mathematical way to compare these two different data types was difficult.
*   **Resolution:** Developed a category-weighted frequency model that maps both data types to a unified 0-10 scale, allowing for cross-modality benchmarking.

### 3. Session Management System
*   **Description:** Created the backend endpoints and frontend logic for **Session History**. This allows the application to "remember" previous comparisons and ratings during a single user session, improving the user experience.
*   **Time Spent:** 8 Hours
*   **Challenges:** Managing state persistence across different components (Comparison vs. Analysis views) to ensure the `sessionId` remained consistent.
*   **Resolution:** Utilized React's `useEffect` and custom hooks to initialize and pass the `sessionId` through the application hierarchy, coupled with a robust `/sessions` API in FastAPI.

### 4. Technical Writing (Abstract & Conclusions)
*   **Description:** Drafted the **Abstract** and **Conclusions** sections of the final IEEE report. I synthesized the findings from all team members to present a coherent project summary and future roadmap.
*   **Time Spent:** 10 Hours
*   **Challenges:** Reconciling the different technical focuses of the team into a single, cohesive narrative that highlights the project's novelty.
*   **Resolution:** Conducted an "analysis sweep" of the final codebase and results to identify the most significant findings (e.g., the 2024 Safety shift), which became the focal point of the conclusion.

---

## 📊 Contribution Overview

| Dimension | Level | Rationale |
| :--- | :--- | :--- |
| **Complexity** | High | Requiring integration of heterogeneous datasets and complex React state management. |
| **Impact** | High | The Comparison Dashboard is a core feature that provides the primary value-add for stakeholders. |
| **Effort** | Medium | Consistently met all sprint goals and handled the critical integration of backend logic with frontend visualization. |

---

## 💡 Reflection & Learning
The primary challenge encountered during this project was maintaining the "Not Found" fix across multiple repository versions. By taking ownership of the `DataService` integration, I ensured that all companies (Google, IBM, OpenAI, etc.) worked seamlessly in the dashboard. This project significantly improved my skills in **FastAPI asynchronous services** and **React data visualization**.
