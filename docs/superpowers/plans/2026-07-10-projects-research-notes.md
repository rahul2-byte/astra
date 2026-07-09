# Projects Research-Note Case Studies Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade `/projects`, `/projects/fin-ai`, `/projects/movie-recommendation-system`, and `/projects/production-ml-systems` to recruiter-facing research-note case studies with hero metrics, framer-motion animations, inline SVG charts, architecture flow diagrams, evidence tables, and a richer projects index.

**Architecture:** Typed data module `src/content/case-studies.ts` drives seven small components in `src/components/case-study/` (`metric-tile`, `comparison-bars`, `trend-line`, `architecture-flow`, `evidence-table`, `stack-pill`, `case-study-page` orchestrator). Three `page.tsx` files replace their MDX siblings. framer-motion drives staggered KPI reveal, hover lift, comparison-bar width, trend-line `stroke-dashoffset`, and number tick on metric tiles; respects `prefers-reduced-motion` via `useReducedMotion`.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript strict, Tailwind 4, framer-motion (new), lucide-react, vitest + @testing-library/react (jsdom).

---

## File Map

- **Create:**
  - `src/content/case-studies.ts` — typed data for the three case studies.
  - `src/components/case-study/stack-pill.tsx` — small chip.
  - `src/components/case-study/metric-tile.tsx` — display number tile with motion.
  - `src/components/case-study/comparison-bars.tsx` — paired horizontal bars with motion.
  - `src/components/case-study/trend-line.tsx` — inline SVG line chart.
  - `src/components/case-study/architecture-flow.tsx` — SVG node + arrow flow.
  - `src/components/case-study/evidence-table.tsx` — semantic table.
  - `src/components/case-study/case-study-page.tsx` — orchestrator.
  - `src/components/case-study/index.ts` — barrel.
  - `src/components/__tests__/case-studies.test.tsx` — new test file.
  - `src/components/__tests__/case-study-components.test.tsx` — per-component tests.
- **Modify:**
  - `src/app/projects/page.tsx` — research-note index.
  - `src/app/projects/fin-ai/page.tsx` — replace MDX with typed page.
  - `src/app/projects/movie-recommendation-system/page.tsx` — replace MDX with typed page.
  - `src/app/projects/production-ml-systems/page.tsx` — replace MDX with typed page.
  - `package.json` — add `framer-motion` dependency.
- **Delete:**
  - `src/app/projects/fin-ai/page.mdx`
  - `src/app/projects/movie-recommendation-system/page.mdx`
  - `src/app/projects/production-ml-systems/page.mdx`

---

### Task 1: Add framer-motion dependency

**Files:**
- Modify: `package.json` (add to `dependencies`)

- [ ] **Step 1: Add framer-motion**

Open `package.json` and add `"framer-motion": "^11.11.0"` to the `dependencies` block (alphabetical between `eslint-config-next` and `lucide-react`).

- [ ] **Step 2: Install**

Run: `npm install`
Expected: completes with framer-motion added to lockfile.

- [ ] **Step 3: Verify import works**

Run: `node -e "require('framer-motion'); console.log('ok')"`
Expected: `ok`.

- [ ] **Step 4: Run baseline checks**

Run: `npm test -- --run && npm run lint && npm run build`
Expected: tests pass, lint clean, build succeeds (12 static routes as before).

---

### Task 2: Create case-studies data module

**Files:**
- Create: `src/content/case-studies.ts`

- [ ] **Step 1: Create the data module**

Create `src/content/case-studies.ts` with the following content:

```ts
import { Activity, BarChart3, Cpu, Database, FileText, Gauge, Network, TriangleAlert } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type MetricTileData = {
  value: string;
  label: string;
  source: string;
  spark?: number[];
  iconName: string;
};

export type ComparisonPair = {
  label: string;
  before: { label: string; value: number; unit: string };
  after: { label: string; value: number; unit: string };
  delta: string;
  source: string;
};

export type TrendPoint = { iteration: number; metric: number };

export type TrendLineData = {
  title: string;
  yLabel: string;
  xLabel: string;
  points: TrendPoint[];
  source: string;
};

export type ArchitectureNode = {
  key: string;
  label: string;
  icon: LucideIcon;
  caption: string;
};

export type EvidenceRow = { [key: string]: string };
export type EvidenceTableData = {
  title: string;
  columns: string[];
  rows: EvidenceRow[];
  source: string;
};

export type CaseStudy = {
  slug: "fin-ai" | "movie-recommendation-system" | "production-ml-systems";
  category: string;
  title: string;
  role: string;
  period: string;
  stack: string[];
  summary: string;
  problem: { intro: string; bullets: string[] };
  approach: { intro: string; bullets: string[] };
  architecture: {
    caption: string;
    nodes: ArchitectureNode[];
  };
  metrics: MetricTileData[];
  result:
    | { kind: "comparison"; data: ComparisonPair }
    | { kind: "trend"; data: TrendLineData };
  evidence: EvidenceTableData;
  learnings: { intro: string; bullets: string[] };
};

export const caseStudies: Record<CaseStudy["slug"], CaseStudy> = {
  "fin-ai": {
    slug: "fin-ai",
    category: "Applied AI / RAG",
    title: "FIN-AI — Multi-agent financial intelligence",
    role: "Project · Applied AI",
    period: "2024",
    stack: ["FastAPI", "LangGraph", "pgvector", "llama.cpp", "Opik", "PyTorch"],
    summary:
      "Multi-agent platform that retrieves financial context, orchestrates analyst and writer agents, and returns grounded responses with observability traces.",
    problem: {
      intro:
        "Financial research workflows require gathering context, retrieving relevant documents, organizing signals, and presenting usable outputs. A single-prompt LLM call cannot ground answers in private sources or trace which evidence shaped which conclusion.",
      bullets: [
        "No retrieval grounding produced fabricated citations.",
        "Single-agent prompts drifted on multi-step tasks.",
        "No observability into which documents influenced answers.",
      ],
    },
    approach: {
      intro:
        "A FastAPI service routes requests through a LangGraph orchestrator that runs a retriever, analyst, and writer agent against a pgvector index, with Opik tracing and llama.cpp as the local model runtime.",
      bullets: [
        "pgvector store indexed with chunk-level embeddings.",
        "LangGraph state machine coordinates retriever → analyst → writer.",
        "Opik captures per-node traces for offline evaluation.",
        "llama.cpp enables reproducible local model execution.",
      ],
    },
    architecture: {
      caption: "User query → orchestrator → retriever / analyst / writer → grounded response.",
      nodes: [
        { key: "user", label: "User", icon: FileText, caption: "Natural-language query" },
        { key: "orchestrator", label: "Orchestrator", icon: Network, caption: "LangGraph state machine" },
        { key: "retriever", label: "Retriever", icon: Database, caption: "pgvector similarity search" },
        { key: "analyst", label: "Analyst", icon: BarChart3, caption: "Structured signal extraction" },
        { key: "writer", label: "Writer", icon: FileText, caption: "Grounded response composition" },
      ],
    },
    metrics: [
      { value: "4", label: "Agents orchestrated", source: "Project artifact", iconName: "Cpu" },
      { value: "<2s", label: "End-to-end retrieval latency", source: "Project artifact — pending real measurement", iconName: "Activity" },
      { value: "12k+", label: "Source chunks indexed", source: "Project artifact — pending real measurement", iconName: "Gauge" },
    ],
    result: {
      kind: "comparison",
      data: {
        label: "Answer quality (placeholder)",
        before: { label: "No-RAG baseline", value: 41, unit: "% grounded" },
        after: { label: "FIN-AI with RAG", value: 78, unit: "% grounded" },
        delta: "+37 pts",
        source: "Project artifact — pending real measurement",
      },
    },
    evidence: {
      title: "Agent responsibilities",
      columns: ["Agent", "Role", "Latency budget", "Model / tool"],
      rows: [
        { Agent: "Retriever", Role: "pgvector top-k", "Latency budget": "<400ms", "Model / tool": "pgvector + embeddings" },
        { Agent: "Analyst", Role: "Extract signals", "Latency budget": "<600ms", "Model / tool": "llama.cpp" },
        { Agent: "Writer", Role: "Compose response", "Latency budget": "<800ms", "Model / tool": "llama.cpp + prompts" },
        { Agent: "Orchestrator", Role: "State + retries", "Latency budget": "<200ms", "Model / tool": "LangGraph" },
      ],
      source: "Resume · Project artifact",
    },
    learnings: {
      intro:
        "Agent graphs need explicit failure handling: when the retriever returns empty results, the analyst must short-circuit instead of hallucinating.",
      bullets: [
        "Add an evaluation harness with a fixed question set.",
        "Cache retrieval embeddings to cut cold-start latency.",
        "Expose Opik traces to recruiters via a public demo URL.",
      ],
    },
  },
  "movie-recommendation-system": {
    slug: "movie-recommendation-system",
    category: "Recommendation systems",
    title: "Movie Recommendation System",
    role: "Project · ML Engineering",
    period: "2024",
    stack: ["FastAPI", "LightGBM", "FAISS", "AWS Lambda", "API Gateway", "DynamoDB", "S3"],
    summary:
      "Two-stage recommender combining FAISS candidate retrieval and a LightGBM ranker, deployed on AWS Lambda behind an API Gateway front door.",
    problem: {
      intro:
        "Recommenders must return relevant candidates quickly while still ranking for engagement. Pure vector similarity ignores ranking signals; pure learned rankers can't scale to large item catalogs.",
      bullets: [
        "Cold-start latency dominated by brute-force ranking.",
        "Single-stage retrieval produced near-duplicate suggestions.",
        "No observability into which stage shaped the final list.",
      ],
    },
    approach: {
      intro:
        "FAISS retrieves candidate pools from a precomputed embedding index, then a LightGBM ranker reranks using user-item features. The pipeline runs on AWS Lambda behind API Gateway, with DynamoDB for session state and S3 for embeddings.",
      bullets: [
        "FAISS approximate nearest neighbor for candidate retrieval.",
        "LightGBM ranker trained on historical engagement features.",
        "API Gateway + Lambda for serverless scaling.",
        "DynamoDB + S3 for embeddings, metadata, and session state.",
      ],
    },
    architecture: {
      caption: "Client request → API Gateway → Lambda → FAISS retrieve → LightGBM rerank → ranked list.",
      nodes: [
        { key: "client", label: "Client", icon: FileText, caption: "Web or service caller" },
        { key: "gateway", label: "API Gateway", icon: Network, caption: "Auth + throttling" },
        { key: "lambda", label: "Lambda", icon: Cpu, caption: "Orchestrates the pipeline" },
        { key: "faiss", label: "FAISS", icon: Database, caption: "Candidate retrieval" },
        { key: "ranker", label: "LightGBM ranker", icon: BarChart3, caption: "Final ranking" },
      ],
    },
    metrics: [
      { value: "50k+", label: "Candidate pool", source: "Project artifact — pending real measurement", iconName: "Database" },
      { value: "120ms", label: "p95 latency", source: "Project artifact — pending real measurement", iconName: "Activity" },
      { value: "LightGBM", label: "Reranker model", source: "Project artifact", iconName: "Cpu" },
    ],
    result: {
      kind: "trend",
      data: {
        title: "Precision@10 over training iterations",
        yLabel: "Precision@10",
        xLabel: "Iteration",
        points: [
          { iteration: 1, metric: 0.18 },
          { iteration: 2, metric: 0.24 },
          { iteration: 3, metric: 0.31 },
          { iteration: 4, metric: 0.36 },
          { iteration: 5, metric: 0.41 },
        ],
        source: "Project artifact — pending real measurement",
      },
    },
    evidence: {
      title: "Pipeline components",
      columns: ["Component", "Technology", "Responsibility"],
      rows: [
        { Component: "API Gateway", Technology: "AWS", Responsibility: "Auth, throttling, routing" },
        { Component: "Lambda", Technology: "Python", Responsibility: "Runs retrieval + ranker" },
        { Component: "FAISS", Technology: "FAISS", Responsibility: "Top-k candidate retrieval" },
        { Component: "Ranker", Technology: "LightGBM", Responsibility: "Final engagement-weighted ranking" },
        { Component: "Storage", Technology: "DynamoDB + S3", Responsibility: "Embeddings, metadata, sessions" },
      ],
      source: "Resume · Project artifact",
    },
    learnings: {
      intro:
        "Two-stage retrieval cleanly separates recall from ranking; reranker feature quality dominated offline metrics.",
      bullets: [
        "Add offline evaluation harness with held-out users.",
        "Move embeddings into a versioned S3 prefix for reproducibility.",
        "Expose ranking feature importance for recruiter demo.",
      ],
    },
  },
  "production-ml-systems": {
    slug: "production-ml-systems",
    category: "Production experience",
    title: "Production ML Systems — Fuel event telemetry",
    role: "Intangles · Pune",
    period: "April 2022 – Present",
    stack: ["Python", "DBSCAN", "LOESS", "SMA", "Pandas", "NumPy", "Node.js"],
    summary:
      "High-level case study of fuel-event detection on noisy OBD telemetry, including data-loss detection, alert-quality improvement, and support-impact reduction.",
    problem: {
      intro:
        "Production fuel analytics must tolerate noisy fuel-level sensors, GPS gaps, and occasional data loss. Alerts must remain trustworthy for operational teams without flooding support channels.",
      bullets: [
        "Noisy fuel-level sensors produced inconsistent readings.",
        "Data gaps silently dropped fuel events.",
        "Alert noise drove a high volume of support queries.",
      ],
    },
    approach: {
      intro:
        "Combined density-based clustering (DBSCAN) and local regression (LOESS) for event detection, SMA smoothing for signal cleanup, and statistical rules for data-loss detection. A Node.js refactor reclaimed operational time for the support team.",
      bullets: [
        "DBSCAN + LOESS detect fuel events on noisy series.",
        "Sub-threshold detection catches smaller fuel events.",
        "SMA smoothing stabilizes noisy fuel-level readings.",
        "Statistical rules detect data loss across fuel, GPS, telemetry.",
        "Node.js refactor reclaimed 30+ weekly support hours.",
      ],
    },
    architecture: {
      caption: "OBD telemetry → cleaning → detection (DBSCAN + LOESS) → alerting → ops.",
      nodes: [
        { key: "telemetry", label: "Telemetry", icon: Activity, caption: "OBD fuel + GPS signals" },
        { key: "cleaning", label: "Cleaning", icon: Cpu, caption: "SMA smoothing + validation" },
        { key: "detection", label: "Detection", icon: Network, caption: "DBSCAN + LOESS events" },
        { key: "alerting", label: "Alerting", icon: TriangleAlert, caption: "Thresholded, deduplicated" },
        { key: "ops", label: "Ops", icon: Gauge, caption: "Operator workflows" },
      ],
    },
    metrics: [
      { value: "95%", label: "Alert accuracy maintained", source: "Resume", iconName: "Gauge" },
      { value: "15%", label: "False-positive reduction", source: "Resume", iconName: "Activity" },
      { value: "30+ hrs/week", label: "Operational hours reclaimed", source: "Resume", iconName: "Cpu" },
    ],
    result: {
      kind: "comparison",
      data: {
        label: "Support queries per day",
        before: { label: "Before refactor", value: 6, unit: "queries/day" },
        after: { label: "After refactor", value: 2, unit: "queries/day" },
        delta: "−4 queries/day",
        source: "Resume",
      },
    },
    evidence: {
      title: "Signal → method → outcome",
      columns: ["Signal", "Problem", "Method", "Outcome"],
      rows: [
        { Signal: "Fuel level", Problem: "Noisy readings", Method: "SMA smoothing", Outcome: "Stable series" },
        { Signal: "Fuel events", Problem: "Cluster detection on noise", Method: "DBSCAN + LOESS", Outcome: "Reliable events" },
        { Signal: "Sub-threshold", Problem: "Missed small events", Method: "Sub-threshold rules", Outcome: "Recovered events" },
        { Signal: "Data loss", Problem: "Silent gaps", Method: "Statistical checks", Outcome: "Detected outages" },
      ],
      source: "Resume · Confidential details omitted",
    },
    learnings: {
      intro:
        "Production ML is more about signal hygiene and operational ergonomics than model novelty; even simple statistical methods compound into measurable business value.",
      bullets: [
        "Treat alert quality as a first-class deliverable.",
        "Quantify operational hours reclaimed, not just accuracy.",
        "Keep cross-functional support impact in every case study.",
      ],
    },
  },
};

export const caseStudySlugs = Object.keys(caseStudies) as CaseStudy["slug"][];
```

Note: `MetricTileData.iconName` is typed as `string` and the orchestrator maps a known set (`Gauge`, `Activity`, `Cpu`) to the corresponding lucide-react icons; unknown names fall back to `Gauge`. This keeps data files flexible while letting the page render safe defaults.

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: passes. If the metric tile icon union causes errors, widen `MetricTileData.iconName` to `string` and continue.

- [ ] **Step 3: Run baseline checks**

Run: `npm test -- --run && npm run lint && npm run build`
Expected: tests pass, lint clean, build succeeds.

---

### Task 3: Build StackPill (TDD)

**Files:**
- Test: `src/components/__tests__/case-study-components.test.tsx`
- Create: `src/components/case-study/stack-pill.tsx`

- [ ] **Step 1: Write failing test**

Create `src/components/__tests__/case-study-components.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { StackPill } from "@/components/case-study/stack-pill";

describe("StackPill", () => {
  it("renders the stack label inside a rounded chip", () => {
    render(<StackPill>FastAPI</StackPill>);
    const pill = screen.getByText("FastAPI");
    expect(pill).toBeInTheDocument();
    expect(pill.className).toMatch(/rounded/);
    expect(pill.className).toMatch(/border/);
  });
});
```

- [ ] **Step 2: Run test to confirm fails**

Run: `npm test -- --run src/components/__tests__/case-study-components.test.tsx`
Expected: FAIL with "Cannot find module '@/components/case-study/stack-pill'".

- [ ] **Step 3: Implement StackPill**

Create `src/components/case-study/stack-pill.tsx`:

```tsx
import type { ReactNode } from "react";

export function StackPill({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-sm border border-slate-300/80 bg-white/40 px-3 py-1 text-sm font-medium text-slate-700">
      {children}
    </span>
  );
}
```

- [ ] **Step 4: Run test to confirm passes**

Run: `npm test -- --run src/components/__tests__/case-study-components.test.tsx`
Expected: PASS.

---

### Task 4: Build MetricTile (TDD)

**Files:**
- Test: `src/components/__tests__/case-study-components.test.tsx`
- Create: `src/components/case-study/metric-tile.tsx`

- [ ] **Step 1: Add failing test**

Add a `describe("MetricTile", ...)` block to `case-study-components.test.tsx`:

```tsx
import { Activity, Cpu, Gauge } from "lucide-react";
import { MetricTile } from "@/components/case-study/metric-tile";

describe("MetricTile", () => {
  it("renders the value, label, and source", () => {
    render(
      <MetricTile
        value="95%"
        label="Alert accuracy maintained"
        source="Resume"
        icon={Gauge}
      />,
    );
    expect(screen.getByText("95%")).toBeInTheDocument();
    expect(screen.getByText(/alert accuracy maintained/i)).toBeInTheDocument();
    expect(screen.getByText(/resume/i)).toBeInTheDocument();
  });

  it("renders an optional sparkline when spark points are provided", () => {
    const { container } = render(
      <MetricTile
        value="120ms"
        label="p95 latency"
        source="Project artifact"
        icon={Activity}
        spark={[1, 2, 3, 2, 4, 5]}
      />,
    );
    expect(container.querySelector("svg polyline")).not.toBeNull();
  });

  it("renders different icons based on the icon prop", () => {
    render(<MetricTile value="4" label="agents" source="Project artifact" icon={Cpu} />);
    expect(screen.getByLabelText("metric icon")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to confirm fails**

Run: `npm test -- --run src/components/__tests__/case-study-components.test.tsx -t MetricTile`
Expected: FAIL with "Cannot find module '@/components/case-study/metric-tile'".

- [ ] **Step 3: Implement MetricTile**

Create `src/components/case-study/metric-tile.tsx`:

```tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

export type MetricTileProps = {
  value: string;
  label: string;
  source: string;
  icon: LucideIcon;
  spark?: number[];
};

export function MetricTile({ value, label, source, icon: Icon, spark }: MetricTileProps) {
  const reduced = useReducedMotion();
  const polylinePoints = spark
    ? spark
        .map((v, i) => {
          const max = Math.max(...spark);
          const min = Math.min(...spark);
          const range = max - min || 1;
          const x = (i / Math.max(1, spark.length - 1)) * 100;
          const y = 30 - ((v - min) / range) * 24;
          return `${x},${y}`;
        })
        .join(" ")
    : null;

  return (
    <motion.div
      className="glass-panel flex h-full flex-col justify-between p-6 transition hover:-translate-y-1"
      initial={reduced ? false : { opacity: 0, y: 16 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between gap-3">
        <Icon aria-label="metric icon" className="h-5 w-5 text-[#2f5ea4]" strokeWidth={1.7} />
        <span className="text-xs uppercase tracking-widest text-slate-500">{source}</span>
      </div>
      <div className="mt-4 flex items-end justify-between gap-4">
        <span className="font-display text-4xl font-bold text-slate-900">{value}</span>
        {polylinePoints ? (
          <svg viewBox="0 0 100 32" className="h-9 w-24" aria-hidden="true">
            <polyline points={polylinePoints} fill="none" stroke="#4f7fb8" strokeWidth={1.5} />
          </svg>
        ) : null}
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-700">{label}</p>
    </motion.div>
  );
}
```

- [ ] **Step 4: Run test to confirm passes**

Run: `npm test -- --run src/components/__tests__/case-study-components.test.tsx -t MetricTile`
Expected: PASS.

---

### Task 5: Build ComparisonBars (TDD)

**Files:**
- Test: `src/components/__tests__/case-study-components.test.tsx`
- Create: `src/components/case-study/comparison-bars.tsx`

- [ ] **Step 1: Add failing test**

Add a `describe("ComparisonBars", ...)` block to `case-study-components.test.tsx`:

```tsx
import { ComparisonBars } from "@/components/case-study/comparison-bars";

describe("ComparisonBars", () => {
  it("renders the before and after labels, units, and delta", () => {
    render(
      <ComparisonBars
        title="Support queries per day"
        before={{ label: "Before", value: 6, unit: "queries/day" }}
        after={{ label: "After", value: 2, unit: "queries/day" }}
        delta="−4 queries/day"
        source="Resume"
      />,
    );
    expect(screen.getByText(/support queries per day/i)).toBeInTheDocument();
    expect(screen.getByText(/before/i)).toBeInTheDocument();
    expect(screen.getByText(/after/i)).toBeInTheDocument();
    expect(screen.getByText(/−4 queries\/day/i)).toBeInTheDocument();
    expect(screen.getByText(/queries\/day/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to confirm fails**

Run: `npm test -- --run src/components/__tests__/case-study-components.test.tsx -t ComparisonBars`
Expected: FAIL with "Cannot find module '@/components/case-study/comparison-bars'".

- [ ] **Step 3: Implement ComparisonBars**

Create `src/components/case-study/comparison-bars.tsx`:

```tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";

export type ComparisonBarsProps = {
  title: string;
  before: { label: string; value: number; unit: string };
  after: { label: string; value: number; unit: string };
  delta: string;
  source: string;
};

export function ComparisonBars({ title, before, after, delta, source }: ComparisonBarsProps) {
  const reduced = useReducedMotion();
  const max = Math.max(before.value, after.value) || 1;

  function Row({ entry, color }: { entry: ComparisonBarsProps["before"]; color: string }) {
    const width = `${(entry.value / max) * 100}%`;
    return (
      <div>
        <div className="flex items-baseline justify-between text-sm text-slate-700">
          <span className="font-medium">{entry.label}</span>
          <span className="font-mono text-slate-900">
            {entry.value} <span className="text-slate-500">{entry.unit}</span>
          </span>
        </div>
        <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-slate-200/70">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: color }}
            initial={reduced ? { width } : { width: "0%" }}
            whileInView={reduced ? undefined : { width }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel p-6">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-display text-xl font-semibold text-slate-900">{title}</h3>
        <span className="text-xs uppercase tracking-widest text-slate-500">{source}</span>
      </div>
      <div className="mt-5 space-y-5">
        <Row entry={before} color="#94a3b8" />
        <Row entry={after} color="#4f7fb8" />
      </div>
      <p className="mt-5 text-sm font-semibold text-[#2f5ea4]">{delta}</p>
    </div>
  );
}
```

- [ ] **Step 4: Run test to confirm passes**

Run: `npm test -- --run src/components/__tests__/case-study-components.test.tsx -t ComparisonBars`
Expected: PASS.

---

### Task 6: Build TrendLine (TDD)

**Files:**
- Test: `src/components/__tests__/case-study-components.test.tsx`
- Create: `src/components/case-study/trend-line.tsx`

- [ ] **Step 1: Add failing test**

Add a `describe("TrendLine", ...)` block:

```tsx
import { TrendLine } from "@/components/case-study/trend-line";

describe("TrendLine", () => {
  it("renders the title, axis labels, and one dot per data point", () => {
    const { container } = render(
      <TrendLine
        title="Precision@10 over training iterations"
        yLabel="Precision@10"
        xLabel="Iteration"
        source="Project artifact"
        points={[
          { iteration: 1, metric: 0.18 },
          { iteration: 2, metric: 0.24 },
          { iteration: 3, metric: 0.31 },
        ]}
      />,
    );
    expect(screen.getByText(/precision@10 over training iterations/i)).toBeInTheDocument();
    expect(screen.getByText(/iteration/i)).toBeInTheDocument();
    expect(container.querySelectorAll("svg circle").length).toBe(3);
  });
});
```

- [ ] **Step 2: Run test to confirm fails**

Run: `npm test -- --run src/components/__tests__/case-study-components.test.tsx -t TrendLine`
Expected: FAIL with "Cannot find module '@/components/case-study/trend-line'".

- [ ] **Step 3: Implement TrendLine**

Create `src/components/case-study/trend-line.tsx`:

```tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";

export type TrendPoint = { iteration: number; metric: number };

export type TrendLineProps = {
  title: string;
  yLabel: string;
  xLabel: string;
  points: TrendPoint[];
  source: string;
};

export function TrendLine({ title, yLabel, xLabel, points, source }: TrendLineProps) {
  const reduced = useReducedMotion();
  const width = 360;
  const height = 180;
  const padding = { top: 16, right: 16, bottom: 28, left: 40 };
  const innerW = width - padding.left - padding.right;
  const innerH = height - padding.top - padding.bottom;
  const xMin = Math.min(...points.map((p) => p.iteration));
  const xMax = Math.max(...points.map((p) => p.iteration));
  const yMin = 0;
  const yMax = Math.max(...points.map((p) => p.metric)) || 1;

  function toX(it: number) {
    return padding.left + ((it - xMin) / Math.max(1, xMax - xMin)) * innerW;
  }
  function toY(metric: number) {
    return padding.top + innerH - ((metric - yMin) / (yMax - yMin)) * innerH;
  }

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"}${toX(p.iteration)},${toY(p.metric)}`).join(" ");
  const fillPath = `${linePath} L${toX(xMax)},${padding.top + innerH} L${toX(xMin)},${padding.top + innerH} Z`;

  return (
    <div className="glass-panel p-6">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-display text-xl font-semibold text-slate-900">{title}</h3>
        <span className="text-xs uppercase tracking-widest text-slate-500">{source}</span>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className="mt-4 w-full" role="img" aria-label={title}>
        <defs>
          <linearGradient id="trendFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#4f7fb8" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#4f7fb8" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((g) => (
          <line
            key={g}
            x1={padding.left}
            x2={padding.left + innerW}
            y1={padding.top + innerH * g}
            y2={padding.top + innerH * g}
            stroke="#cbd5e1"
            strokeDasharray="3 3"
          />
        ))}
        <motion.path
          d={fillPath}
          fill="url(#trendFill)"
          initial={reduced ? { opacity: 1 } : { opacity: 0 }}
          whileInView={reduced ? undefined : { opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
        />
        <motion.path
          d={linePath}
          fill="none"
          stroke="#4f7fb8"
          strokeWidth={2}
          initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
          whileInView={reduced ? undefined : { pathLength: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        {points.map((p) => (
          <circle key={p.iteration} cx={toX(p.iteration)} cy={toY(p.metric)} r={3.5} fill="#2f5ea4" />
        ))}
        <text x={padding.left} y={padding.top - 4} fontSize="10" fill="#475569">
          {yLabel}
        </text>
        <text
          x={padding.left + innerW}
          y={height - 6}
          fontSize="10"
          fill="#475569"
          textAnchor="end"
        >
          {xLabel}
        </text>
      </svg>
    </div>
  );
}
```

- [ ] **Step 4: Run test to confirm passes**

Run: `npm test -- --run src/components/__tests__/case-study-components.test.tsx -t TrendLine`
Expected: PASS.

---

### Task 7: Build ArchitectureFlow (TDD)

**Files:**
- Test: `src/components/__tests__/case-study-components.test.tsx`
- Create: `src/components/case-study/architecture-flow.tsx`

- [ ] **Step 1: Add failing test**

Add a `describe("ArchitectureFlow", ...)` block:

```tsx
import { Database, Network } from "lucide-react";
import { ArchitectureFlow } from "@/components/case-study/architecture-flow";

describe("ArchitectureFlow", () => {
  it("renders every node label, caption, and the caption line", () => {
    render(
      <ArchitectureFlow
        caption="A → B → C"
        nodes={[
          { key: "a", label: "A", icon: Network, caption: "first" },
          { key: "b", label: "B", icon: Database, caption: "second" },
          { key: "c", label: "C", icon: Network, caption: "third" },
        ]}
      />,
    );
    expect(screen.getByText(/a → b → c/i)).toBeInTheDocument();
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
    expect(screen.getByText("C")).toBeInTheDocument();
    expect(screen.getByText(/first/i)).toBeInTheDocument();
    expect(screen.getByText(/second/i)).toBeInTheDocument();
    expect(screen.getByText(/third/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to confirm fails**

Run: `npm test -- --run src/components/__tests__/case-study-components.test.tsx -t ArchitectureFlow`
Expected: FAIL with "Cannot find module '@/components/case-study/architecture-flow'".

- [ ] **Step 3: Implement ArchitectureFlow**

Create `src/components/case-study/architecture-flow.tsx`:

```tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import type { ArchitectureNode } from "@/content/case-studies";

export type { ArchitectureNode };

export function ArchitectureFlow({ nodes, caption }: { nodes: ArchitectureNode[]; caption: string }) {
  const reduced = useReducedMotion();
  const items: ReactNode[] = [];

  nodes.forEach((node, index) => {
    const Icon = node.icon;
    items.push(
      <motion.div
        key={node.key}
        className="glass-panel flex w-44 flex-col items-center gap-2 p-4 text-center"
        initial={reduced ? false : { opacity: 0, y: 12 }}
        whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.35, delay: index * 0.08, ease: "easeOut" }}
      >
        <Icon aria-label="architecture node" className="h-6 w-6 text-[#2f5ea4]" strokeWidth={1.7} />
        <span className="font-display text-lg font-semibold text-slate-900">{node.label}</span>
        <span className="text-xs leading-5 text-slate-600">{node.caption}</span>
      </motion.div>,
    );
    if (index < nodes.length - 1) {
      items.push(
        <svg
          key={`arrow-${node.key}`}
          viewBox="0 0 40 12"
          className="h-6 w-10 text-[#4f7fb8]"
          aria-hidden="true"
        >
          <line x1="0" y1="6" x2="34" y2="6" stroke="currentColor" strokeWidth="1.5" />
          <polyline points="30,2 36,6 30,10" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>,
      );
    }
  });

  return (
    <div className="glass-panel p-6">
      <p className="section-label">Architecture</p>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-3">{items}</div>
      <p className="mt-5 text-sm leading-6 text-slate-600">{caption}</p>
    </div>
  );
}
```

- [ ] **Step 4: Run test to confirm passes**

Run: `npm test -- --run src/components/__tests__/case-study-components.test.tsx -t ArchitectureFlow`
Expected: PASS.

---

### Task 8: Build EvidenceTable (TDD)

**Files:**
- Test: `src/components/__tests__/case-study-components.test.tsx`
- Create: `src/components/case-study/evidence-table.tsx`

- [ ] **Step 1: Add failing test**

Add a `describe("EvidenceTable", ...)` block:

```tsx
import { EvidenceTable } from "@/components/case-study/evidence-table";

describe("EvidenceTable", () => {
  it("renders the title, headers, and one row per evidence entry", () => {
    render(
      <EvidenceTable
        title="Signal → outcome"
        columns={["Signal", "Method", "Outcome"]}
        rows={[
          { Signal: "Fuel", Method: "SMA", Outcome: "Stable" },
          { Signal: "GPS", Method: "Gap check", Outcome: "Detected" },
        ]}
        source="Resume"
      />,
    );
    expect(screen.getByText(/signal → outcome/i)).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /signal/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /method/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /outcome/i })).toBeInTheDocument();
    expect(screen.getByText("Fuel")).toBeInTheDocument();
    expect(screen.getByText("GPS")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to confirm fails**

Run: `npm test -- --run src/components/__tests__/case-study-components.test.tsx -t EvidenceTable`
Expected: FAIL with "Cannot find module '@/components/case-study/evidence-table'".

- [ ] **Step 3: Implement EvidenceTable**

Create `src/components/case-study/evidence-table.tsx`:

```tsx
export type EvidenceTableProps = {
  title: string;
  columns: string[];
  rows: Record<string, string>[];
  source: string;
};

export function EvidenceTable({ title, columns, rows, source }: EvidenceTableProps) {
  return (
    <div className="glass-panel p-6">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-display text-xl font-semibold text-slate-900">{title}</h3>
        <span className="text-xs uppercase tracking-widest text-slate-500">{source}</span>
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full border-separate border-spacing-0 text-left text-sm">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column}
                  scope="col"
                  className="sticky top-0 bg-white/70 px-4 py-3 text-xs font-semibold uppercase tracking-widest text-slate-600"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-white/40" : "bg-transparent"}>
                {columns.map((column) => (
                  <td key={column} className="border-t border-slate-200/70 px-4 py-3 align-top text-slate-700">
                    {row[column]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Run test to confirm passes**

Run: `npm test -- --run src/components/__tests__/case-study-components.test.tsx -t EvidenceTable`
Expected: PASS.

---

### Task 9: Build CaseStudyPage orchestrator (TDD)

**Files:**
- Test: `src/components/__tests__/case-study-components.test.tsx`
- Create: `src/components/case-study/case-study-page.tsx`
- Create: `src/components/case-study/index.ts`

- [ ] **Step 1: Add failing test**

Add a `describe("CaseStudyPage", ...)` block:

```tsx
import { Activity, BarChart3, Cpu, Database, FileText, Network } from "lucide-react";
import { CaseStudyPage } from "@/components/case-study/case-study-page";
import type { CaseStudy } from "@/content/case-studies";

const fixture: CaseStudy = {
  slug: "fin-ai",
  category: "Applied AI / RAG",
  title: "FIN-AI Fixture",
  role: "Project",
  period: "2024",
  stack: ["FastAPI"],
  summary: "Fixture summary.",
  problem: { intro: "Problem intro.", bullets: ["Problem bullet"] },
  approach: { intro: "Approach intro.", bullets: ["Approach bullet"] },
  architecture: {
    caption: "User → Orchestrator → Response",
    nodes: [
      { key: "user", label: "User", icon: FileText, caption: "Input" },
      { key: "orchestrator", label: "Orchestrator", icon: Network, caption: "Routing" },
      { key: "retriever", label: "Retriever", icon: Database, caption: "Vector search" },
      { key: "analyst", label: "Analyst", icon: BarChart3, caption: "Analysis" },
      { key: "writer", label: "Writer", icon: FileText, caption: "Output" },
    ],
  },
  metrics: [
    { value: "4", label: "Agents", source: "Project artifact", iconName: "Cpu" },
    { value: "<2s", label: "Latency", source: "Project artifact", iconName: "Activity" },
    { value: "12k+", label: "Chunks", source: "Project artifact", iconName: "Cpu" },
  ],
  result: {
    kind: "comparison",
    data: {
      label: "Quality",
      before: { label: "Before", value: 41, unit: "% grounded" },
      after: { label: "After", value: 78, unit: "% grounded" },
      delta: "+37 pts",
      source: "Project artifact",
    },
  },
  evidence: {
    title: "Agents",
    columns: ["Agent", "Role", "Latency budget", "Model / tool"],
    rows: [
      { Agent: "Retriever", Role: "pgvector", "Latency budget": "<400ms", "Model / tool": "embeddings" },
    ],
    source: "Resume",
  },
  learnings: { intro: "Learnings intro.", bullets: ["Learnings bullet"] },
};

describe("CaseStudyPage", () => {
  it("renders the title, three metrics, architecture caption, evidence title, and result heading", () => {
    render(<CaseStudyPage study={fixture} />);
    expect(screen.getByRole("heading", { name: /fin-ai fixture/i })).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("<2s")).toBeInTheDocument();
    expect(screen.getByText("12k+")).toBeInTheDocument();
    expect(screen.getByText(/user → orchestrator → response/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /agents/i })).toBeInTheDocument();
    expect(screen.getByText(/quality/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to confirm fails**

Run: `npm test -- --run src/components/__tests__/case-study-components.test.tsx -t CaseStudyPage`
Expected: FAIL with "Cannot find module '@/components/case-study/case-study-page'".

- [ ] **Step 3: Implement CaseStudyPage**

Create `src/components/case-study/case-study-page.tsx`:

```tsx
import { Activity, Cpu, Gauge } from "lucide-react";
import type { CaseStudy } from "@/content/case-studies";
import { ArchitectureFlow } from "@/components/case-study/architecture-flow";
import { ComparisonBars } from "@/components/case-study/comparison-bars";
import { EvidenceTable } from "@/components/case-study/evidence-table";
import { MetricTile } from "@/components/case-study/metric-tile";
import { StackPill } from "@/components/case-study/stack-pill";
import { TrendLine } from "@/components/case-study/trend-line";

export type { CaseStudy };

const metricIconMap = { Gauge, Activity, Cpu } as const;

export function CaseStudyPage({ study }: { study: CaseStudy }) {
  return (
    <main className="section-shell py-20">
      <p className="section-label">{study.category}</p>
      <h1 className="font-display mt-4 text-5xl font-bold leading-tight tracking-tight text-slate-900 md:text-6xl">
        {study.title}
      </h1>
      <p className="mt-4 text-lg leading-7 text-slate-700">
        {study.role} · {study.period}
      </p>
      <p className="mt-6 max-w-3xl text-xl leading-8 text-slate-800">{study.summary}</p>

      <section className="mt-8 flex flex-wrap gap-2">
        {study.stack.map((item) => (
          <StackPill key={item}>{item}</StackPill>
        ))}
      </section>

      <section className="mt-10 grid gap-6 md:grid-cols-3">
        {study.metrics.map((metric) => (
          <MetricTile
            key={metric.label}
            value={metric.value}
            label={metric.label}
            source={metric.source}
            icon={metricIconMap[metric.iconName] ?? Gauge}
          />
        ))}
      </section>

      <section className="mt-14 grid gap-8 md:grid-cols-2">
        <article className="glass-panel p-7">
          <p className="section-label">Problem</p>
          <h2 className="font-display mt-4 text-3xl font-semibold text-slate-900">Problem framing</h2>
          <p className="mt-4 leading-8 text-slate-700">{study.problem.intro}</p>
          <ul className="mt-5 list-disc space-y-2 pl-6 text-slate-700">
            {study.problem.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </article>
        <article className="glass-panel p-7">
          <p className="section-label">Approach</p>
          <h2 className="font-display mt-4 text-3xl font-semibold text-slate-900">Approach</h2>
          <p className="mt-4 leading-8 text-slate-700">{study.approach.intro}</p>
          <ul className="mt-5 list-disc space-y-2 pl-6 text-slate-700">
            {study.approach.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="mt-10">
        <ArchitectureFlow nodes={study.architecture.nodes} caption={study.architecture.caption} />
      </section>

      <section className="mt-10 grid gap-8 lg:grid-cols-2">
        {study.result.kind === "comparison" ? (
          <ComparisonBars
            title={study.result.data.label}
            before={study.result.data.before}
            after={study.result.data.after}
            delta={study.result.data.delta}
            source={study.result.data.source}
          />
        ) : (
          <TrendLine
            title={study.result.data.title}
            yLabel={study.result.data.yLabel}
            xLabel={study.result.data.xLabel}
            points={study.result.data.points}
            source={study.result.data.source}
          />
        )}
        <EvidenceTable
          title={study.evidence.title}
          columns={study.evidence.columns}
          rows={study.evidence.rows}
          source={study.evidence.source}
        />
      </section>

      <section className="glass-panel mt-10 p-7">
        <p className="section-label">Learnings</p>
        <h2 className="font-display mt-4 text-3xl font-semibold text-slate-900">Learnings & next improvements</h2>
        <p className="mt-4 leading-8 text-slate-700">{study.learnings.intro}</p>
        <ul className="mt-5 list-disc space-y-2 pl-6 text-slate-700">
          {study.learnings.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
```

- [ ] **Step 4: Create barrel export**

Create `src/components/case-study/index.ts`:

```ts
export { CaseStudyPage } from "@/components/case-study/case-study-page";
export { MetricTile } from "@/components/case-study/metric-tile";
export { ComparisonBars } from "@/components/case-study/comparison-bars";
export { TrendLine } from "@/components/case-study/trend-line";
export { ArchitectureFlow } from "@/components/case-study/architecture-flow";
export { EvidenceTable } from "@/components/case-study/evidence-table";
export { StackPill } from "@/components/case-study/stack-pill";
```

- [ ] **Step 5: Run test to confirm passes**

Run: `npm test -- --run src/components/__tests__/case-study-components.test.tsx -t CaseStudyPage`
Expected: PASS.

- [ ] **Step 6: Run full suite**

Run: `npm test -- --run && npm run lint && npm run build`
Expected: tests pass, lint clean, build succeeds.

---

### Task 10: Wire FIN-AI page

**Files:**
- Create: `src/app/projects/fin-ai/page.tsx`
- Delete: `src/app/projects/fin-ai/page.mdx`

- [ ] **Step 1: Add failing route test**

Create `src/components/__tests__/case-studies.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import FinAiPage from "@/app/projects/fin-ai/page";

describe("FIN-AI case study page", () => {
  it("renders the hero title, KPI tiles, architecture caption, comparison, and evidence table", () => {
    render(<FinAiPage />);
    expect(
      screen.getByRole("heading", { name: /fin-ai — multi-agent financial intelligence/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("<2s")).toBeInTheDocument();
    expect(screen.getByText("12k+")).toBeInTheDocument();
    expect(screen.getByText(/orchestrator/i)).toBeInTheDocument();
    expect(screen.getByText(/no-rag baseline/i)).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /agent/i })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to confirm fails**

Run: `npm test -- --run src/components/__tests__/case-studies.test.tsx`
Expected: FAIL because the page is still MDX / not a typed page (or text not found).

- [ ] **Step 3: Replace MDX with typed page**

Create `src/app/projects/fin-ai/page.tsx`:

```tsx
import { CaseStudyPage } from "@/components/case-study/case-study-page";
import { caseStudies } from "@/content/case-studies";

export const metadata = {
  title: "FIN-AI | Rahul Singh",
  description: "Multi-agent financial intelligence platform case study for Rahul Singh's portfolio.",
};

export default function FinAiCaseStudy() {
  return <CaseStudyPage study={caseStudies["fin-ai"]} />;
}
```

Delete `src/app/projects/fin-ai/page.mdx`:

Run: `rm src/app/projects/fin-ai/page.mdx`

- [ ] **Step 4: Run test to confirm passes**

Run: `npm test -- --run src/components/__tests__/case-studies.test.tsx`
Expected: PASS.

---

### Task 11: Wire Movie Recommendation page

**Files:**
- Create: `src/app/projects/movie-recommendation-system/page.tsx`
- Delete: `src/app/projects/movie-recommendation-system/page.mdx`
- Test: `src/components/__tests__/case-studies.test.tsx`

- [ ] **Step 1: Add failing test**

Append to `src/components/__tests__/case-studies.test.tsx`:

```tsx
import MovieRecommendationPage from "@/app/projects/movie-recommendation-system/page";

describe("Movie Recommendation case study page", () => {
  it("renders the hero title, KPI tiles, trend-line chart, and evidence table", () => {
    render(<MovieRecommendationPage />);
    expect(
      screen.getByRole("heading", { name: /movie recommendation system/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/50k\+/i)).toBeInTheDocument();
    expect(screen.getByText(/120ms/i)).toBeInTheDocument();
    expect(screen.getByText(/precision@10 over training iterations/i)).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /component/i })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to confirm fails**

Run: `npm test -- --run src/components/__tests__/case-studies.test.tsx`
Expected: FAIL on Movie Recommendation describe block.

- [ ] **Step 3: Replace MDX with typed page**

Create `src/app/projects/movie-recommendation-system/page.tsx`:

```tsx
import { CaseStudyPage } from "@/components/case-study/case-study-page";
import { caseStudies } from "@/content/case-studies";

export const metadata = {
  title: "Movie Recommendation System | Rahul Singh",
  description: "Recommendation system case study for Rahul Singh's ML portfolio.",
};

export default function MovieRecommendationCaseStudy() {
  return <CaseStudyPage study={caseStudies["movie-recommendation-system"]} />;
}
```

Delete the MDX file:

Run: `rm src/app/projects/movie-recommendation-system/page.mdx`

- [ ] **Step 4: Run test to confirm passes**

Run: `npm test -- --run src/components/__tests__/case-studies.test.tsx`
Expected: PASS.

---

### Task 12: Wire Production ML page

**Files:**
- Create: `src/app/projects/production-ml-systems/page.tsx`
- Delete: `src/app/projects/production-ml-systems/page.mdx`
- Test: `src/components/__tests__/case-studies.test.tsx`

- [ ] **Step 1: Add failing test**

Append to `src/components/__tests__/case-studies.test.tsx`:

```tsx
import ProductionMlPage from "@/app/projects/production-ml-systems/page";

describe("Production ML case study page", () => {
  it("renders the hero title, KPI tiles, architecture caption, comparison, and evidence table", () => {
    render(<ProductionMlPage />);
    expect(
      screen.getByRole("heading", { name: /production ml systems — fuel event telemetry/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/95%/i)).toBeInTheDocument();
    expect(screen.getByText(/15%/i)).toBeInTheDocument();
    expect(screen.getByText(/30\+ hrs\/week/i)).toBeInTheDocument();
    expect(screen.getByText(/telemetry/i)).toBeInTheDocument();
    expect(screen.getByText(/before refactor/i)).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /signal/i })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to confirm fails**

Run: `npm test -- --run src/components/__tests__/case-studies.test.tsx`
Expected: FAIL on Production ML describe block.

- [ ] **Step 3: Replace MDX with typed page**

Create `src/app/projects/production-ml-systems/page.tsx`:

```tsx
import { CaseStudyPage } from "@/components/case-study/case-study-page";
import { caseStudies } from "@/content/case-studies";

export const metadata = {
  title: "Production ML Systems | Rahul Singh",
  description: "High-level production ML case study based on Rahul Singh's Intangles experience.",
};

export default function ProductionMlCaseStudy() {
  return <CaseStudyPage study={caseStudies["production-ml-systems"]} />;
}
```

Delete the MDX file:

Run: `rm src/app/projects/production-ml-systems/page.mdx`

- [ ] **Step 4: Run test to confirm passes**

Run: `npm test -- --run src/components/__tests__/case-studies.test.tsx`
Expected: PASS.

---

### Task 13: Upgrade projects index

**Files:**
- Modify: `src/app/projects/page.tsx`
- Test: `src/components/__tests__/case-studies.test.tsx`

- [ ] **Step 1: Add failing test**

Append to `src/components/__tests__/case-studies.test.tsx`:

```tsx
import ProjectsPage from "@/app/projects/page";
import { caseStudies } from "@/content/case-studies";

describe("Projects index", () => {
  it("renders all three case study cards with a preview metric and stack chip", () => {
    render(<ProjectsPage />);
    expect(
      screen.getByRole("heading", { name: /selected case studies/i }),
    ).toBeInTheDocument();
    for (const study of Object.values(caseStudies)) {
      expect(screen.getByText(study.title.split(" — ")[0])).toBeInTheDocument();
      expect(screen.getByText(study.metrics[0].value)).toBeInTheDocument();
      expect(screen.getByText(study.stack[0])).toBeInTheDocument();
    }
  });
});
```

- [ ] **Step 2: Run test to confirm fails**

Run: `npm test -- --run src/components/__tests__/case-studies.test.tsx`
Expected: FAIL on Projects index describe block (current heading is "Selected project work" and metric not rendered).

- [ ] **Step 3: Rewrite projects index**

Replace `src/app/projects/page.tsx`:

```tsx
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { caseStudies } from "@/content/case-studies";
import { Activity, Cpu, Gauge } from "lucide-react";
import { StackPill } from "@/components/case-study/stack-pill";

const iconMap = { Gauge, Activity, Cpu } as const;

export default function ProjectsPage() {
  return (
    <main className="section-shell py-20">
      <p className="section-label">Projects</p>
      <h1 className="font-display mt-4 text-5xl font-bold leading-tight tracking-tight text-slate-900 md:text-6xl">
        Selected case studies
      </h1>
      <p className="mt-6 max-w-3xl text-xl leading-8 text-slate-800">
        Each project below is presented as a research note: problem, approach, architecture, the strongest result,
        and supporting evidence. Numbers are resume-backed where available; remaining values are placeholder
        measurements pending public artifacts.
      </p>
      <section className="mt-10 grid gap-8 lg:grid-cols-3">
        {Object.values(caseStudies).map((study) => {
          const Icon = iconMap[study.metrics[0].iconName] ?? Gauge;
          return (
            <article key={study.slug} className="glass-panel flex h-full flex-col p-7 transition hover:-translate-y-1">
              <p className="section-label">{study.category}</p>
              <h2 className="font-display mt-4 text-3xl font-bold leading-tight tracking-tight text-slate-900">
                {study.title.split(" — ")[0]}
              </h2>
              <p className="mt-4 flex-1 leading-7 text-slate-700">{study.summary}</p>
              <div className="mt-6 flex items-end justify-between gap-4">
                <div>
                  <Icon className="h-5 w-5 text-[#2f5ea4]" strokeWidth={1.7} />
                  <p className="font-display mt-2 text-3xl font-bold text-slate-900">
                    {study.metrics[0].value}
                  </p>
                  <p className="text-sm text-slate-600">{study.metrics[0].label}</p>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {study.stack.slice(0, 4).map((item) => (
                  <StackPill key={item}>{item}</StackPill>
                ))}
              </div>
              <Link
                className="mt-6 inline-flex items-center gap-2 font-semibold text-[#2f5ea4] hover:text-slate-950"
                href={`/projects/${study.slug}`}
              >
                Open case study
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.7} />
              </Link>
            </article>
          );
        })}
      </section>
    </main>
  );
}
```

- [ ] **Step 4: Update existing core-pages test**

In `src/components/__tests__/core-pages.test.tsx`, find:

```tsx
it("renders the projects index with featured case studies", () => {
  render(<ProjectsPage />);
  expect(screen.getByRole("heading", { name: /selected project work/i })).toBeInTheDocument();
  expect(screen.getByText(/FIN-AI/i)).toBeInTheDocument();
});
```

Replace with:

```tsx
it("renders the projects index with featured case studies", () => {
  render(<ProjectsPage />);
  expect(screen.getByRole("heading", { name: /selected case studies/i })).toBeInTheDocument();
  expect(screen.getByText(/FIN-AI/i)).toBeInTheDocument();
});
```

- [ ] **Step 5: Run test to confirm passes**

Run: `npm test -- --run`
Expected: PASS.

---

### Task 14: Update visual-system test for new content

**Files:**
- Modify: `src/components/__tests__/visual-system.test.ts`

- [ ] **Step 1: Add assertions for case study components**

Add to the existing visual-system block in `visual-system.test.ts`:

```ts
const finAi = readSource("app/projects/fin-ai/page.tsx");
const movie = readSource("app/projects/movie-recommendation-system/page.tsx");
const production = readSource("app/projects/production-ml-systems/page.tsx");
const projectsIndex = readSource("app/projects/page.tsx");
const metricTile = readSource("components/case-study/metric-tile.tsx");
const trendLine = readSource("components/case-study/trend-line.tsx");
const comparison = readSource("components/case-study/comparison-bars.tsx");
const architecture = readSource("components/case-study/architecture-flow.tsx");

expect(packageJson).toContain("framer-motion");
expect(finAi).toContain("CaseStudyPage");
expect(movie).toContain("CaseStudyPage");
expect(production).toContain("CaseStudyPage");
expect(projectsIndex).toContain("Selected case studies");
expect(metricTile).toContain("glass-panel");
expect(metricTile).toContain("framer-motion");
expect(trendLine).toContain("<svg");
expect(comparison).toContain("whileInView");
expect(architecture).toContain("<svg");
expect(existsSync(join(sourceRoot, "app/projects/fin-ai/page.mdx"))).toBe(false);
expect(existsSync(join(sourceRoot, "app/projects/movie-recommendation-system/page.mdx"))).toBe(false);
expect(existsSync(join(sourceRoot, "app/projects/production-ml-systems/page.mdx"))).toBe(false);
```

- [ ] **Step 2: Run visual system test**

Run: `npm test -- --run src/components/__tests__/visual-system.test.ts`
Expected: PASS.

---

### Task 15: Final verification

**Files:** none

- [ ] **Step 1: Full test suite**

Run: `npm test -- --run`
Expected: all tests pass. List should include `core-pages.test.tsx`, `home-content.test.tsx`, `visual-system.test.ts`, `case-study-components.test.tsx`, `case-studies.test.tsx`.

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: clean.

- [ ] **Step 3: Production build**

Run: `npm run build`
Expected: build succeeds; static page count should include `/projects`, `/projects/fin-ai`, `/projects/movie-recommendation-system`, `/projects/production-ml-systems`.

- [ ] **Step 4: Typecheck**

Run: `npx tsc --noEmit`
Expected: clean.

- [ ] **Step 5: Verify no MDX remnants**

Run: `ls src/app/projects/fin-ai src/app/projects/movie-recommendation-system src/app/projects/production-ml-systems`
Expected: each directory contains only `page.tsx`.

---

## Self-Review Notes (filled after writing)

- **Spec coverage:**
  - Hero (category, title, role, period, stack, three KPI tiles) -> Tasks 9, 10, 11, 12.
  - Problem + Approach sections -> Task 9.
  - Architecture flow + caption -> Task 9 (via ArchitectureFlow from Task 7).
  - Results (comparison OR trend) + evidence table + stack chips -> Task 9 (via ComparisonBars/TrendLine/EvidenceTable from Tasks 5, 6, 8).
  - Learnings + bullets -> Task 9.
  - Projects index upgraded with MetricTile preview -> Task 13.
  - framer-motion added and used -> Tasks 1, 4, 5, 6, 7, 9, 13.
  - `prefers-reduced-motion` honored -> Tasks 4, 5, 6, 7 via `useReducedMotion`.
  - Source labels on every metric -> Tasks 4, 5, 6, 8, 9.
  - Resume numbers as placeholders -> Task 2 fixture data.
  - Tests for every page -> Tasks 10, 11, 12, 13, 14.
  - MDX files deleted -> Tasks 10, 11, 12.
- **Placeholder scan:** none — every step has code or commands.
- **Type consistency:** `MetricTileData.iconName` is `string` in Task 2 and mapped via the orchestrator's `iconMap` in Task 9 (`Gauge`, `Activity`, `Cpu` known, others fall back to `Gauge`). `ArchitectureNode` is owned by `case-studies.ts` and re-exported from `architecture-flow.tsx` so both the data module and the UI component share one source of truth.
