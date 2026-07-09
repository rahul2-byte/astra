import Link from "next/link";
import { ArrowUpRight, BrainCircuit, Code2, Database, Gauge, Network, ServerCog, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type DetailBlock = {
  title: string;
  items: string[];
  Icon: LucideIcon;
};

type ExperienceEntry = {
  title: string;
  period: string;
  category: string;
  context: string;
  role: string;
  stack: string[];
  details: DetailBlock[];
  outcome: string;
  href: string;
  linkLabel: string;
};

const heroMetrics = [
  { value: "4+ yrs", label: "production ML experience", full: "4+ yrs production ML experience" },
  { value: "95%", label: "alert accuracy", full: "95% alert accuracy" },
  { value: "15%", label: "false-positive reduction", full: "15% false-positive reduction" },
  { value: "30+ hrs/week", label: "reclaimed", full: "30+ hrs/week reclaimed" },
];

const entries: ExperienceEntry[] = [
  {
    title: "Machine Learning Engineer · Intangles",
    period: "April 2022 – Present",
    category: "Production ML",
    context:
      "Production fuel analytics on noisy OBD telemetry where fuel-level sensors, GPS gaps, data loss, and alert reliability directly affect operational workflows.",
    role:
      "Owned ML-backed detection and analytics improvements across event detection, smoothing, data-loss identification, alert-quality tuning, and Node.js analytics refactoring while keeping client-specific logic confidential.",
    stack: ["Python", "SQL", "Pandas", "NumPy", "scikit-learn", "DBSCAN", "LOESS", "SMA", "Node.js"],
    details: [
      {
        title: "Built",
        Icon: Wrench,
        items: [
          "DBSCAN + LOESS fuel event detection extension for refill, theft, and data-loss event workflows.",
          "Sub-threshold fuel event detection for smaller refills and thefts previously missed by threshold-only logic.",
          "Fuel, GPS, and telemetry data-loss detection to separate sensor dropout from genuine fuel movement.",
          "SMA smoothing pipeline to stabilize noisy fuel-level signals before downstream classification.",
        ],
      },
      {
        title: "Problems solved",
        Icon: Gauge,
        items: [
          "Reduced false positives caused by unstable sensor readings and noisy level transitions.",
          "Improved reliability of fuel alerts under real production data gaps and vehicle movement.",
          "Fixed level-consumption mapping and bin-based mean/SD computation bugs in the Node.js analytics codebase.",
        ],
      },
      {
        title: "Decisions and learnings",
        Icon: BrainCircuit,
        items: [
          "Used statistical and density-based approaches where explainability and operational stability mattered more than model complexity.",
          "Learned that production ML depends on signal hygiene, alert reliability, and support impact as much as algorithm choice.",
        ],
      },
    ],
    outcome:
      "Maintained 95% alert accuracy, reduced false positives by 15%, and helped reduce support queries from 6 to 2 per day, reclaiming 30+ weekly operational hours.",
    href: "/projects/production-ml-systems",
    linkLabel: "Open production ML case study",
  },
  {
    title: "FIN-AI · Multi-agent financial intelligence",
    period: "2024",
    category: "Applied AI / RAG",
    context:
      "Applied AI project focused on financial research workflows that require retrieval grounding, task orchestration, local inference, and traceable outputs.",
    role:
      "Designed the API boundary, retrieval flow, agent roles, local model path, and observability structure for a multi-agent RAG-style platform.",
    stack: ["FastAPI", "LangGraph", "pgvector", "sentence-transformers", "llama.cpp", "Opik", "PyTorch", "Pandas", "NumPy"],
    details: [
      {
        title: "Built",
        Icon: Network,
        items: [
          "FastAPI service boundary for request handling and workflow execution.",
          "LangGraph orchestrator coordinating retriever, analyst, writer, and validation-style responsibilities.",
          "pgvector-backed retrieval layer for freshness-aware context lookup.",
          "llama.cpp local inference path for GGUF model experimentation without relying fully on hosted LLM APIs.",
        ],
      },
      {
        title: "Problems solved",
        Icon: Database,
        items: [
          "Reduced ungrounded LLM responses by separating retrieval context from response synthesis.",
          "Added traceability for retrieved context, agent outputs, latency, and unsupported-claim patterns using Opik traces.",
          "Separated deterministic quantitative processing from LLM reasoning so calculations stay in Python/Pandas/NumPy.",
        ],
      },
      {
        title: "Decisions and learnings",
        Icon: BrainCircuit,
        items: [
          "Learned that agent systems need explicit failure paths when retrieval returns weak or empty context.",
          "Chose a modular agent graph instead of a single large prompt to make each workflow step inspectable.",
        ],
      },
    ],
    outcome:
      "Created portfolio-ready applied AI proof showing practical RAG, agent orchestration, local inference, backend API design, and observability skills.",
    href: "/projects/fin-ai",
    linkLabel: "Open FIN-AI case study",
  },
  {
    title: "Movie Recommendation System",
    period: "2024",
    category: "Recommendation systems",
    context:
      "Practical ML engineering project for serving personalized movie recommendations through a backend API and serverless AWS deployment path.",
    role:
      "Designed the two-stage recommender architecture, candidate retrieval layer, ranking flow, runtime feature generation, API service, and deployment boundaries.",
    stack: ["FastAPI", "LightGBM", "FAISS", "AWS Lambda", "API Gateway", "DynamoDB", "S3", "Python"],
    details: [
      {
        title: "Built",
        Icon: Code2,
        items: [
          "FAISS candidate retrieval across vectorized movie representations for fast similarity search.",
          "LightGBM reranking stage using runtime query-level and pairwise ranking features.",
          "FastAPI backend for recommendation requests, response shaping, and model-service boundaries.",
          "AWS Lambda and API Gateway deployment, with DynamoDB metadata/session storage and S3 artifact storage.",
        ],
      },
      {
        title: "Problems solved",
        Icon: ServerCog,
        items: [
          "Separated retrieval coverage from ranking quality instead of forcing one model to handle both jobs.",
          "Kept model artifacts outside the API bundle using S3 so serving logic stayed lighter and easier to update.",
          "Used DynamoDB for low-maintenance persistence around metadata and session-oriented access patterns.",
        ],
      },
      {
        title: "Decisions and learnings",
        Icon: BrainCircuit,
        items: [
          "Learned that recommendation quality depends on candidate diversity, feature design, latency budget, and deployment packaging.",
          "Chose a two-stage retrieval + ranking pipeline because it is easier to evaluate and operate than a monolithic recommender.",
        ],
      },
    ],
    outcome:
      "Built a project-backed recommender proof that demonstrates retrieval, ranking, API delivery, cloud deployment, and production-style model artifact handling.",
    href: "/projects/movie-recommendation-system",
    linkLabel: "Open movie recommendation case study",
  },
];

export default function ExperiencePage() {
  return (
    <main className="section-shell py-20">
      <section className="glass-panel relative overflow-hidden p-8 md:p-10">
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-blue-200/50 blur-3xl" />
        <p className="section-label">Experience</p>
        <h1 className="font-display mt-4 max-w-5xl text-5xl font-bold leading-tight tracking-tight text-slate-900 md:text-6xl">
          Production ML, Applied AI, and Recommendation Systems
        </h1>
        <p className="mt-6 max-w-4xl text-xl leading-8 text-slate-800">
          A timeline of hands-on work across production telemetry systems, multi-agent RAG, and recommender engineering. Each entry explains what I built, which technical decisions I made, the problems I solved, and what the work added to my engineering skills.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {heroMetrics.map((metric) => (
            <div key={metric.label} className="rounded-2xl border border-slate-200/80 bg-white/50 p-5">
              <span className="sr-only">{metric.full}</span>
              <p className="font-display text-3xl font-bold text-slate-900">{metric.value}</p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-widest text-slate-500">{metric.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 space-y-10">
        {entries.map((entry, index) => (
          <article key={entry.title} className="grid gap-6 md:grid-cols-[9rem_1fr]">
            <div className="relative hidden md:block">
              <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[#4f7fb8]/40" />
              <div className="sticky top-28 mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#4f7fb8]/30 bg-[#f7f3ea] font-display text-xl font-bold text-[#2f5ea4] shadow-[0_12px_40px_rgba(47,94,164,0.14)]">
                {index + 1}
              </div>
            </div>
            <div className="glass-panel p-7 md:p-8">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="section-label">{entry.category}</p>
                  <h2 className="font-display mt-3 text-3xl font-bold leading-tight text-slate-900">{entry.title}</h2>
                </div>
                <span className="rounded-full border border-slate-300/70 bg-white/50 px-4 py-2 text-sm font-semibold text-slate-600">
                  {entry.period}
                </span>
              </div>

              <div className="mt-6 grid gap-5 lg:grid-cols-2">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-500">Context</h3>
                  <p className="mt-3 leading-8 text-slate-700">{entry.context}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-500">My role</h3>
                  <p className="mt-3 leading-8 text-slate-700">{entry.role}</p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {entry.stack.map((item) => (
                  <span key={item} className="rounded-sm border border-slate-300/80 bg-white/40 px-3 py-1 text-sm font-medium text-slate-700">
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-7 grid gap-5 lg:grid-cols-3">
                {entry.details.map(({ title, items, Icon }) => (
                  <section key={title} className="rounded-2xl border border-slate-200/80 bg-white/45 p-5">
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-[#2f5ea4]" strokeWidth={1.7} />
                      <h3 className="font-display text-xl font-semibold text-slate-900">{title}</h3>
                    </div>
                    <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
                      {items.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[#4f7fb8]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>

              <div className="mt-7 rounded-2xl border border-[#4f7fb8]/25 bg-[#4f7fb8]/8 p-5">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-[#2f5ea4]">Outcome</h3>
                <p className="mt-3 leading-8 text-slate-800">{entry.outcome}</p>
              </div>

              <Link className="mt-6 inline-flex items-center gap-2 font-semibold text-[#2f5ea4] hover:text-slate-950" href={entry.href}>
                {entry.linkLabel}
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.7} />
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
