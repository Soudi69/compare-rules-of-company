# NCI Programming for AI: Submission Guide

**Module:** Programming for AI (MSCAI1/MSCAI1B)  
**Assessment:** Terminal Assessment (70% of module mark)  
**Project:** AI Ethics Policy Analyzer  
**Deadline:** **Monday, 24 April 2026, 23:59 IST**  
**Submission Links:** Moodle (distinct links for each deliverable)

---

## 📋 Submission Checklist

Use this checklist to verify you have completed all required deliverables.

### ✅ Pre-Submission (Before 24 April, 23:59 IST)

#### Code & Data
- [ ] Backend code runs without errors (`python -m uvicorn main:app --reload`)
- [ ] Frontend loads at http://localhost:5173 without console errors
- [ ] Data pipeline executes end-to-end: `ingest_data.py` → `preprocess.py` → `analyze.py`
- [ ] All Python code follows PEP 8 style guide
- [ ] All TypeScript compiles without errors
- [ ] `.venv` excluded from Git (add to `.gitignore` if not already)
- [ ] `node_modules/` excluded from Git

#### Documentation
- [ ] `README.md` updated with quick start instructions
- [ ] `PROJECT_BRIEF.md` explains research question and datasets
- [ ] `data/DATA_DICTIONARY.md` documents all field definitions
- [ ] API endpoints tested & working
- [ ] All scripts have docstrings & comments

#### Deliverable 1: Project Report
- [ ] Report written: ~3,000 words (excluding references)
- [ ] Format: **IEEE Conference Format** (A4, 2-column, 10pt)
  - Download template: https://www.ieee.org/conferences_events/conferences/publishing/templates.html
  - Use LaTeX or Word template
- [ ] Sections present:
  - [ ] Abstract (150–200 words)
  - [ ] Introduction (problem statement, research question, novelty, significance)
  - [ ] Related Work (5–8 citations, critical evaluation)
  - [ ] Methodology (datasets, preprocessing, models, evaluation strategy)
  - [ ] Results (findings with tables/figures)
  - [ ] Discussion (interpretation, limitations, implications)
  - [ ] Conclusions & Future Work
  - [ ] Bibliography (IEEE style citations)
- [ ] Figures & tables (≥5 total) with captions
- [ ] In-text citations using IEEE style [1], [2], etc.
- [ ] **Front page includes:**
  - [ ] Full name of each team member (as per NCI official documents)
  - [ ] Student number for each member
  - [ ] Module code: MSCAI1 / MSCAI1B
  - [ ] Project title
  - [ ] Submission date
- [ ] **Save as PDF** (e.g., `AI_Ethics_Policy_Analyzer_Report.pdf`)
- [ ] File size < 10MB

#### Deliverable 2: Project Presentation
- [ ] Video recorded: **≤10 minutes** (strict limit)
- [ ] Format: **MP4 (h.264, AAC audio)**
- [ ] Bitrate: 5–10 Mbps (balance quality/file size)
- [ ] Resolution: 1920×1080 (Full HD) or 1280×720 (HD)
- [ ] File size: < 500MB (fits Moodle upload)
- [ ] **Content includes:**
  - [ ] Problem statement (what question you're answering)
  - [ ] Methodology (datasets, approach, workflow)
  - [ ] Key findings (main results, visualizations)
  - [ ] Impact & significance (why this work matters)
  - [ ] Live demo (show dashboard, API calls, or analysis output)
- [ ] **At start of video:**
  - [ ] Full names of all team members
  - [ ] Student numbers for each member
  - [ ] Module code
- [ ] **All team members present & speaking** (each should speak ≥1 min)
- [ ] Audio quality: Clear, no background noise
- [ ] Screen recording: If showing code/data, use large font for readability
- [ ] Save as: `AI_Ethics_Presentation_Team[X].mp4`

#### Deliverable 3: Code Artefact
- [ ] Archive format: **Single ZIP file** (or `.gz`)
- [ ] File naming: `AI_Ethics_Code_Artefact.zip`
- [ ] **Contents verify:**
  - [ ] `backend/` — All Python code, `.venv/`, `requirements.txt`
  - [ ] `frontend/` — All React/TypeScript code, `package.json`, `node_modules/` excluded
  - [ ] `data/` — Sample datasets (JSON/CSV), `DATA_DICTIONARY.md`
  - [ ] `scripts/` — Ingestion, preprocessing, analysis scripts
  - [ ] `docker/` — `docker-compose.yml`, Dockerfiles
  - [ ] `README.md` — Quick start instructions
  - [ ] `PROJECT_BRIEF.md` — High-level overview
  - [ ] `.gitignore` — Excludes `.venv`, `node_modules`, `.env`
  - [ ] `.git/` **excluded** (only source code, not history)
- [ ] Extract & test in clean directory:
  ```bash
  unzip AI_Ethics_Code_Artefact.zip
  cd compare-rules-of-company
  cd backend && python -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt
  python -m uvicorn main:app --reload
  # Should start without errors
  ```
- [ ] File size: < 100MB
- [ ] Save as: `AI_Ethics_Code_Artefact.zip`

#### Deliverable 4: Individual Project Journals
- [ ] **Each team member submits separately** (one per student)
- [ ] Format: **PDF**
- [ ] **Front page includes:**
  - [ ] Full name (as per NCI official documents)
  - [ ] Student number
  - [ ] Module code
  - [ ] Project title
- [ ] Content:
  - [ ] Dated entries (one per task/day)
  - [ ] Task description, time spent, challenges, solutions
  - [ ] Cumulative statistics (total hours, tasks completed)
  - [ ] Reflective comments (what went well, improvements)
  - [ ] Learning outcomes addressed
  - [ ] Final reflection (2–3 paragraphs)
  - [ ] Student signature (typed name)
- [ ] **Minimum:** 5–10 substantial entries (not one-word logs)
- [ ] At end: **Declaration of originality** (statement that work is own)
- [ ] Save as: `Journal_[FirstName]_[StudentNumber].pdf`
- [ ] File size: < 5MB
- [ ] **Submission mandatory** — Zero marks awarded to team member without journal

---

## 🔗 Moodle Submission Links

| Deliverable | Link | Deadline | Format | Notes |
|-------------|------|----------|--------|-------|
| **Project Report** | Project Report Turnitin Link | 24 Apr, 23:59 | PDF | Plagiarism screened |
| **Code Artefact** | Code Artefact Link | 24 Apr, 23:59 | ZIP | Single file only |
| **Video Presentation** | Project Presentation Link | 24 Apr, 23:59 | MP4 | ≤10 min, all members |
| **Project Journal** | Project Journal Turnitin Link | 24 Apr, 23:59 | PDF (per student) | **MANDATORY** — 1 per student |

---

## ⚠️ Critical Requirements

### Must Do's ✅
1. **Each deliverable uploaded to correct Moodle link** (wrong link = not received)
2. **Each team member submits journal** (missing journal = zero marks for that student for entire project)
3. **Report & journals screened by Turnitin** (no copying; proper citations required)
4. **Team names & student numbers on all documents** (front page, video start)
5. **Single file submissions** (report = 1 PDF, code = 1 ZIP, journal = 1 PDF per student)
6. **Deadline strictly enforced** (late submissions not accepted without NCI360 extension)

### Must NOT Do's ❌
1. **Don't submit without journal** (automatic zero marks)
2. **Don't miss deadline** (no extensions granted)
3. **Don't plagiarize** (Turnitin will detect; disciplinary action)
4. **Don't exceed limits** (report word count, video duration, file sizes)
5. **Don't include personal data** beyond required names/IDs
6. **Don't submit multiple files** (always use single archive/PDF)
7. **Don't use machine-generated writing** (disclose if used; Turnitin detects)

---

## 📐 Formatting & Style Guide

### Report Formatting
- **Template:** IEEE Conference (https://www.ieee.org/conferences_events/conferences/publishing/templates.html)
- **Page Layout:** A4, 2-column, 10pt font
- **Margins:** 1 inch (2.54 cm)
- **Line Spacing:** Single
- **References:** IEEE style [1], [2], etc. (full citations at end)
- **Figures & Tables:** Captioned, referenced in text

### Report Writing Style
- **Tone:** Academic, formal, professional
- **Clarity:** Avoid jargon; define technical terms
- **Evidence:** Support claims with citations or data
- **Objectivity:** Present both strengths & limitations
- **Grammar:** Proofread carefully; use spell-check

### Academic Integrity
- **Paraphrasing:** Cite source; rewrite in your own words
- **Direct Quotes:** Use sparingly; include quotation marks & citation
- **Figures:** If from external source, cite creator & source
- **Code:** If from Stack Overflow/GitHub, include comment with source URL
- **Declaration:** Statement that work is your own (required in journal)

---

## 🎯 Grading Criteria Reminder

| Criterion | Weight | How to Excel |
|-----------|--------|-------------|
| **Novelty of idea** | 20% | Emphasize unique research question in abstract & intro |
| **Novelty in datasets** | 10% | Show how 4-dataset integration is distinctive |
| **Novelty in method** | 10% | Document end-to-end pipeline; explain why novel |
| **Significance** | 15% | Clearly argue why problem matters; show impact |
| **Impact & usefulness** | 15% | Demonstrate practical value (dashboard, insights) |
| **Datasets & preprocessing** | 10% | Document data quality, cleaning, transformation |
| **Model implementation** | 10% | Show models, evaluation metrics, validation |
| **Academic presentation** | 10% | Clear writing, proper citations, professional format |

---

## 📞 Submission Support

### FAQs

**Q: Can I resubmit if I find an error?**  
A: No. Submit once before deadline. No resubmissions allowed. Double-check before uploading.

**Q: What if I miss the deadline?**  
A: Request extension via NCI360 *before* deadline. Unapproved late submissions not accepted.

**Q: Is group submission okay, or separate?**  
A: **Report, Code, Video:** One submission per team  
**Journal:** Each student submits individually (mandatory)

**Q: Can I use code from Stack Overflow?**  
A: Yes, with attribution. Include comment: `# From: [URL]`

**Q: Turnitin shows high similarity; is it plagiarism?**  
A: Not necessarily (citations, code, common phrases can increase %). Explain in comments. TAs review.

**Q: How are marks split if one student doesn't submit journal?**  
A: That student gets **zero marks for entire project** (70% of module). Others' marks unaffected.

---

## 📋 Final Verification

Before clicking "Upload," verify:

```
☐ Report
  ├─ ~3,000 words (excluding refs)
  ├─ IEEE format (A4, 2-col, 10pt)
  ├─ Names & student numbers on front page
  ├─ 6 sections + bibliography
  ├─ ≥5 figures/tables
  ├─ Saved as PDF
  └─ File < 10MB

☐ Code Artefact
  ├─ Single ZIP file
  ├─ All source code included
  ├─ Requirements.txt, package.json present
  ├─ DATA_DICTIONARY.md included
  ├─ README.md with quick start
  ├─ Tested extraction & run successful
  └─ File < 100MB

☐ Video Presentation
  ├─ ≤10 minutes
  ├─ MP4 format (h.264)
  ├─ Names & student numbers at start
  ├─ All team members present
  ├─ Problem, method, findings, impact covered
  ├─ Audio clear, video legible
  └─ File < 500MB

☐ Journal (per student)
  ├─ PDF format
  ├─ Name & student number on front
  ├─ ≥5 entries (date, task, hours, challenges, solutions)
  ├─ Reflective comments
  ├─ Learning outcomes addressed
  ├─ Final reflection (2–3 paragraphs)
  └─ File < 5MB

☐ Final Checks
  ├─ Each file uploaded to correct Moodle link
  ├─ Each student submitted journal
  ├─ Before 24 April, 23:59 IST
  ├─ No plagiarism (cited sources properly)
  └─ Files follow naming convention
```

---

## 🎓 After Submission

- **Turnitin Screening:** Report & journals scanned for plagiarism (allow 24–48 hrs)
- **Marks Released:** Approx. 4 weeks after submission
- **Feedback:** Available on Moodle gradebook (PDF with comments)
- **Appeals:** Submit via NCI360 within 5 working days if disputing marks

---

## 📞 Questions?

- **Module Coordinator:** [Dr. Abdul Razzaq, Jaswinder Singh, Shreyas Setlur Arun]
- **Moodle Forum:** Post questions in Project Discussion thread
- **NCI Submission Policy:** https://nci.edu (Moodle support)
- **Academic Integrity:** https://libguides.ncirl.ie/academicintegrity

---

**Submission Deadline: Monday, 24 April 2026, 23:59 IST**

*Good luck! Submit early, not at 23:59. Allow buffer for technical issues.*

---

**Created:** 21 April 2026  
**Last Updated:** 21 April 2026  
**Module:** Programming for AI (MSCAI1/MSCAI1B)
