# Experience Timeline Page Design

## Goal

Redesign `/experience` from a short high-level summary into a polished timeline narrative that shows Rahul's practical ML engineering growth through three focused entries: Intangles production ML, FIN-AI, and Movie Recommendation System.

## Approved Direction

- Use a timeline narrative layout, selected by the user in the visual companion.
- Keep content scope focused on:
  - `Machine Learning Engineer · Intangles` as the primary production experience.
  - `FIN-AI · Multi-agent financial intelligence` as applied AI / RAG project experience.
  - `Movie Recommendation System` as recommender / backend / cloud project experience.
- Do not add internships, freelance work, News Classification, or Diamond Price Prediction to this page.
- Keep confidential Intangles details high-level while making the engineering work specific and technical.

## Page Structure

1. **Hero**
   - Label: `Experience`
   - Heading: `Production ML, Applied AI, and Recommendation Systems`
   - Intro paragraph explaining the page as a timeline of hands-on work across production telemetry, multi-agent RAG, and recommendation systems.
   - Four metric tiles: `4+ yrs production ML`, `95% alert accuracy`, `15% false-positive reduction`, `30+ hrs/week reclaimed`.

2. **Timeline**
   - Vertical left rail on desktop; stacked cards on mobile.
   - Each entry uses a large glass card with period, title, context, role/responsibilities, built modules, technologies, problems, decisions, learnings, and outcome.

3. **Entry 1: Intangles**
   - Period: `April 2022 – Present`
   - Context: production fuel analytics on noisy OBD telemetry.
   - Role: ML Engineer working on event detection, alert quality, data-loss detection, smoothing, and analytics refactoring.
   - Built modules:
     - DBSCAN + LOESS fuel event detection extension.
     - Sub-threshold fuel event detection.
     - Fuel/GPS/telemetry data-loss detection.
     - SMA smoothing pipeline for noisy fuel-level signals.
     - Node.js fuel analytics refactor for level-consumption mapping and bin-based mean/SD calculations.
   - Tools: Python, SQL, Pandas, NumPy, scikit-learn, DBSCAN, LOESS, SMA, Node.js.
   - Problems solved: noisy sensors, false positives, missing telemetry signals, missed small events, support-query load.
   - Decisions: use statistical and density-based approaches instead of overfitting model-heavy logic; keep client/internal details omitted.
   - Learnings: production ML depends on signal quality, operational impact, measurable alert reliability, and maintainable analytics code.
   - Outcome: 95% alert accuracy maintained, 15% false-positive reduction, support queries reduced from 6 to 2 per day, 30+ weekly operational hours reclaimed.

4. **Entry 2: FIN-AI**
   - Period: `2024`
   - Context: applied AI project for financial research workflows.
   - Role: designed API, agent orchestration, retrieval, local inference, and observability flow.
   - Built modules:
     - FastAPI service boundary.
     - LangGraph orchestrator.
     - Retriever, analyst, writer agent roles.
     - pgvector retrieval store.
     - llama.cpp local inference setup.
     - Opik trace inspection.
   - Tools: FastAPI, LangGraph, pgvector, sentence-transformers, llama.cpp, Opik, PyTorch, Pandas, NumPy.
   - Problems solved: ungrounded LLM answers, lack of traceability, prompt drift in multi-step workflows.
   - Decisions: separate deterministic quantitative processing from LLM reasoning; use retrieval grounding; keep metrics marked as project artifacts pending real measurements.
   - Learnings: agent systems need explicit failure paths, context tracing, and evaluation examples.
   - Outcome: portfolio-ready applied AI proof linked to `/projects/fin-ai`.

5. **Entry 3: Movie Recommendation System**
   - Period: `2024`
   - Context: practical ML engineering project for personalized recommendations.
   - Role: designed two-stage recommender, API service, feature generation, vector retrieval, ranking, and AWS deployment.
   - Built modules:
     - Candidate retrieval with FAISS.
     - LightGBM reranking pipeline.
     - Runtime feature generation.
     - FastAPI backend.
     - AWS Lambda/API Gateway deployment.
     - DynamoDB metadata/session storage and S3 artifact storage.
   - Tools: FastAPI, LightGBM, FAISS, AWS Lambda, API Gateway, DynamoDB, S3, Python.
   - Problems solved: scalable candidate retrieval, ranking quality, serving model artifacts, cloud deployment boundary.
   - Decisions: use two-stage retrieval + ranking instead of one monolithic model; keep model artifacts outside the API bundle.
   - Learnings: recommender quality depends on retrieval coverage, feature design, latency budgets, and deployment packaging.
   - Outcome: portfolio-ready recommender proof linked to `/projects/movie-recommendation-system`.

## Visual Design

- Use existing site language: `section-shell`, `font-display`, `section-label`, `glass-panel`, warm off-white background, blue accents.
- Use Lucide icons for cards and callouts.
- Add visual hierarchy with:
  - metric tiles in the hero,
  - a vertical timeline rail,
  - per-entry subcards for `Built`, `Tools`, `Problems`, `Decisions`, `Learnings`, and `Outcome`,
  - stack chips and internal links to full project case studies.
- Keep animations minimal: use existing CSS hover lift only; no new animation dependency needed because framer-motion already exists but is not required here.

## Testing

- Update `src/components/__tests__/core-pages.test.tsx` so the Experience test asserts:
  - new heading `Production ML, Applied AI, and Recommendation Systems`,
  - Intangles timeline content,
  - FIN-AI entry content,
  - Movie Recommendation entry content,
  - links to `/projects/production-ml-systems`, `/projects/fin-ai`, and `/projects/movie-recommendation-system`,
  - key outcome metrics `95%`, `15%`, and `30+ hrs/week`.
- Run `npm test -- --run`, `npm run lint`, and `npm run build` after implementation.

## Constraints

- Do not invent internships, freelance entries, clients, dashboards, private thresholds, or confidential Intangles implementation details.
- Keep all Intangles technical details resume-backed and high-level.
- Do not add older beginner projects to this page.
- The page should be recruiter-friendly and technical, not a long essay.
