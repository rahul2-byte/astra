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
  iconName: string;
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
        { key: "user", label: "User", iconName: "FileText", caption: "Natural-language query" },
        { key: "orchestrator", label: "Orchestrator", iconName: "Network", caption: "LangGraph state machine" },
        { key: "retriever", label: "Retriever", iconName: "Database", caption: "pgvector similarity search" },
        { key: "analyst", label: "Analyst", iconName: "BarChart3", caption: "Structured signal extraction" },
        { key: "writer", label: "Writer", iconName: "FileText", caption: "Grounded response composition" },
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
        { key: "client", label: "Client", iconName: "FileText", caption: "Web or service caller" },
        { key: "gateway", label: "API Gateway", iconName: "Network", caption: "Auth + throttling" },
        { key: "lambda", label: "Lambda", iconName: "Cpu", caption: "Orchestrates the pipeline" },
        { key: "faiss", label: "FAISS", iconName: "Database", caption: "Candidate retrieval" },
        { key: "ranker", label: "LightGBM ranker", iconName: "BarChart3", caption: "Final ranking" },
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
        { key: "telemetry", label: "Telemetry", iconName: "Activity", caption: "OBD fuel + GPS signals" },
        { key: "cleaning", label: "Cleaning", iconName: "Cpu", caption: "SMA smoothing + validation" },
        { key: "detection", label: "Detection", iconName: "Network", caption: "DBSCAN + LOESS events" },
        { key: "alerting", label: "Alerting", iconName: "TriangleAlert", caption: "Thresholded, deduplicated" },
        { key: "ops", label: "Ops", iconName: "Gauge", caption: "Operator workflows" },
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
