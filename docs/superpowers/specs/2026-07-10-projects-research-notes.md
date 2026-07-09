# Projects Research-Note Case Studies Design

## Goal

Upgrade the three project case studies and the projects index to read like professional research notes for recruiters and ML hiring managers: every page leads with the strongest metric, then walks through Problem, Approach, Architecture, Results (with charts and tables), and Learnings, all rendered with the existing warm off-white visual language and small, purposeful animations.

## Approved Direction

- Add `framer-motion` dependency for: staggered fade/slide-in on metric tiles (`whileInView`), small number-tick animation on `MetricTile` values, and a subtle hover lift on chart cards. Keep the rest of the site (home, contact, resume) untouched.
- All charts are inline SVG authored as React components (no Recharts, no Chart.js). SVG works on the server, theming matches the existing palette, and recruiter screenshots stay sharp.
- New components in `src/components/case-study/`:
  - `metric-tile.tsx` — display number, sublabel, optional sparkline (`<polyline>`), `motion.div` with `whileInView={{ opacity: 1, y: 0 }}` from `initial={{ opacity: 0, y: 16 }}`.
  - `comparison-bars.tsx` — two paired horizontal bars with labels, percent delta, framer-motion width animation.
  - `trend-line.tsx` — inline SVG `<path>` with axes, gridlines, gradient fill under line, animated `stroke-dashoffset` reveal.
  - `architecture-flow.tsx` — flex row of SVG boxes connected by arrows, with caption underneath. Each box is a lucide icon + label.
  - `evidence-table.tsx` — semantic `<table>` with zebra rows, monospace metric cells, sticky header.
  - `stack-pill.tsx` — small chip used in hero and table.
  - `case-study-page.tsx` — orchestrates hero + sections; receives a typed `CaseStudy` object.
- Page structure (max width 1280px, `section-shell`):
  1. **Hero** — category badge ("Case study"), serif title, role/period line, stack chip row, three KPI `MetricTile`s.
  2. **Problem** — short prose + 3-4 bullets framed as the failure mode being addressed.
  3. **Approach** — prose paragraph + bullets covering technique, data, validation.
  4. **Architecture** — `ArchitectureFlow` SVG + caption explaining data/control flow.
  5. **Results** — primary chart (`ComparisonBars` or `TrendLine`) + supporting `EvidenceTable` with 4-6 rows + `StackPill` row.
  6. **Learnings & next improvements** — 2-3 sentence prose + 3 bullets.
- Projects index `/projects` upgraded to a research-note landing: hero "Selected case studies" + intro paragraph + 3-card grid where each card uses `MetricTile` for one big preview number, status badge, stack chips.
- New content module `src/content/case-studies.ts` exporting typed `caseStudies: Record<Slug, CaseStudy>` with `source` strings ("Resume", "Project artifact — pending real measurement") so future real metrics drop in cleanly.
- Delete the three `page.mdx` files in `src/app/projects/<slug>/` and replace with `page.tsx` rendering `<CaseStudyPage study={...} />`. Keep Next.js App Router conventions (per `node_modules/next/dist/docs/`).

## Per-project content

- **FIN-AI** (`/projects/fin-ai`)
  - Hero: title "FIN-AI — Multi-agent financial intelligence", role "Project / Applied AI", period "2024", stack `FastAPI`, `LangGraph`, `pgvector`, `llama.cpp`, `Opik`, `PyTorch`.
  - KPI tiles: `4` agents orchestrated, `<2s` retrieval latency, `12k+` source chunks indexed.
  - Architecture flow: User -> Orchestrator -> (Retriever | Analyst | Writer) -> Response (lucide-react icons `Network`, `Database`, `BarChart3`, `FileText` — imported as PascalCase aliases).
  - Comparison bars: With-RAG vs no-RAG answer quality (placeholder 78% vs 41%).
  - Evidence table: agent name, role, latency budget, model/tool.
- **Movie Recommendation System** (`/projects/movie-recommendation-system`)
  - Hero: title "Movie Recommendation System", role "Project / ML Engineering", period "2024", stack `FastAPI`, `LightGBM`, `FAISS`, `AWS Lambda`, `API Gateway`, `DynamoDB`, `S3`.
  - KPI tiles: `50k+` candidates pool, `120ms` p95 latency, `LightGBM` ranker model.
  - Architecture flow: Client -> API Gateway -> Lambda -> (FAISS retrieve | LightGBM rerank) -> Response.
  - Trend line: Precision@10 over training iterations (5 points placeholder curve).
  - Evidence table: component, tech, responsibility.
- **Production ML Systems at Intangles** (`/projects/production-ml-systems`)
  - Hero: title "Production ML Systems — Fuel event telemetry", role "Intangles, Pune", period "April 2022 – Present", stack `Python`, `DBSCAN`, `LOESS`, `SMA`, `Pandas`, `NumPy`, `Node.js`.
  - KPI tiles: `95%` alert accuracy maintained, `15%` false-positive reduction, `30+ hrs/week` reclaimed.
  - Architecture flow: Telemetry -> Cleaning -> Detection (DBSCAN + LOESS) -> Alerting -> Ops.
  - Comparison bars: alert noise per day before vs after (6 -> 2).
  - Evidence table: signal, problem, method, outcome.

## Constraints

- No exaggerated claims; Production ML case study stays high-level/non-confidential.
- Recruiter legibility over cleverness: every numeric value lives in `src/content/case-studies.ts` with a `source` label.
- Match existing palette (`--background #f7f3ea`, `--accent #4f7fb8`), typography (`font-display` serif, sans body), and `.glass-panel` surfaces.
- Animations are short (200-400ms), low-amplitude (y translate <= 16px, scale <= 1.02), and respect `prefers-reduced-motion` via `useReducedMotion()` from framer-motion.
- New tests must pass; production build must succeed; lint clean.

## Testing

- New file `src/components/__tests__/case-studies.test.tsx`:
  - Renders each case study route with hero title, three KPI numeric values, architecture flow caption, primary chart heading, evidence table headers.
  - Projects index renders three case study cards, each with one preview metric.
  - Uses mocked `next/link` if needed (verify existing test setup).
- Update `src/components/__tests__/core-pages.test.tsx` if any cross-page assertions change.
- Run `npm test -- --run`, `npm run lint`, `npm run build` before completion.

## File plan (high level)

- New: `src/content/case-studies.ts`, `src/components/case-study/{case-study-page,metric-tile,comparison-bars,trend-line,architecture-flow,evidence-table,stack-pill}.tsx`, `src/components/case-study/index.ts`, `src/components/__tests__/case-studies.test.tsx`.
- Updated: `src/app/projects/page.tsx`, `src/app/projects/fin-ai/page.tsx`, `src/app/projects/movie-recommendation-system/page.tsx`, `src/app/projects/production-ml-systems/page.tsx` (replace MDX).
- Deleted: `src/app/projects/fin-ai/page.mdx`, `src/app/projects/movie-recommendation-system/page.mdx`, `src/app/projects/production-ml-systems/page.mdx`.
- Dependency: add `framer-motion` to `package.json`.
- Spec/plan artifacts under `docs/superpowers/specs/2026-07-10-projects-research-notes.md` (this file) and `docs/superpowers/plans/2026-07-10-projects-research-notes.md`.
