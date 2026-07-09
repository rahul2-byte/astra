import Link from "next/link";
import { Activity, ArrowUpRight, BrainCircuit, Cpu, Database, Gauge, Network } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { StackPill } from "@/components/case-study/stack-pill";
import { caseStudies } from "@/content/case-studies";

const iconMap: Record<string, LucideIcon> = { Activity, Cpu, Database, Gauge };

const heroStats = [
  "3 focused studies",
  "Production + projects",
  "ML / RAG / Recommenders",
];

const featured = caseStudies["production-ml-systems"];
const supporting = [caseStudies["fin-ai"], caseStudies["movie-recommendation-system"]];

const projectDetails = {
  "production-ml-systems": {
    purpose:
      "Improve fuel-event reliability on noisy OBD telemetry while keeping operational alerts trustworthy for support and fleet workflows.",
    role:
      "Extended detection logic, built data-loss and smoothing modules, tuned alert quality, and refactored Node.js analytics code around fuel-consumption calculations.",
    features: [
      "DBSCAN + LOESS fuel event detection",
      "Sub-threshold event detection",
      "Fuel/GPS/telemetry data-loss checks",
      "SMA smoothing for noisy level sensors",
    ],
    Icon: Gauge,
  },
  "fin-ai": {
    purpose:
      "Support financial research workflows with retrieval-grounded, traceable multi-agent responses instead of single-prompt LLM output.",
    role:
      "Designed the FastAPI boundary, LangGraph workflow, retriever/analyst/writer responsibilities, pgvector retrieval, local inference path, and Opik tracing flow.",
    features: [
      "LangGraph orchestrator",
      "pgvector retrieval layer",
      "llama.cpp local inference",
    ],
    Icon: Network,
  },
  "movie-recommendation-system": {
    purpose:
      "Serve personalized movie recommendations using a practical two-stage retrieval and ranking architecture.",
    role:
      "Built FAISS candidate retrieval, LightGBM reranking, runtime feature generation, FastAPI serving, and AWS Lambda/API Gateway deployment boundaries.",
    features: [
      "FAISS candidate retrieval",
      "LightGBM ranking pipeline",
      "AWS Lambda/API Gateway backend",
    ],
    Icon: BrainCircuit,
  },
} as const;

function MetricPreview({ metric }: { metric: (typeof featured.metrics)[number] }) {
  const Icon = iconMap[metric.iconName] ?? Gauge;

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white/45 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-display text-4xl font-bold text-slate-900">{metric.value}</p>
          <p className="mt-2 text-sm leading-6 text-slate-700">{metric.label}</p>
        </div>
        <Icon className="h-5 w-5 flex-none text-[#2f5ea4]" strokeWidth={1.7} />
      </div>
      <p className="mt-3 text-xs uppercase tracking-widest text-slate-500">{metric.source}</p>
    </div>
  );
}

export default function ProjectsPage() {
  const FeaturedIcon = projectDetails[featured.slug].Icon;

  return (
    <main className="section-shell py-20">
      <section className="glass-panel relative overflow-hidden p-8 md:p-10">
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-blue-200/50 blur-3xl" />
        <p className="section-label">Projects</p>
        <h1 className="font-display mt-4 max-w-5xl text-5xl font-bold leading-tight tracking-tight text-slate-900 md:text-6xl">
          Selected case studies
        </h1>
        <p className="mt-6 max-w-4xl text-xl leading-8 text-slate-800">
          Focused project work across production ML, applied AI/RAG, and recommendation systems. Each card summarizes the problem, my contribution, key modules, stack, outcome, and the deeper case study link.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {heroStats.map((item) => (
            <div key={item} className="rounded-2xl border border-slate-200/80 bg-white/50 px-5 py-4 text-sm font-semibold text-slate-800">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <article className="glass-panel flex min-h-full flex-col p-7 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="section-label">Featured · {featured.category}</p>
              <h2 className="font-display mt-4 text-4xl font-bold leading-tight tracking-tight text-slate-900">
                {featured.title}
              </h2>
            </div>
            <FeaturedIcon className="h-7 w-7 flex-none text-[#2f5ea4]" strokeWidth={1.7} />
          </div>

          <p className="mt-5 text-lg leading-8 text-slate-700">{featured.summary}</p>

          <div className="mt-7 grid gap-5 md:grid-cols-2">
            <section className="rounded-2xl border border-slate-200/80 bg-white/45 p-5">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-500">Purpose</h3>
              <p className="mt-3 leading-7 text-slate-700">{projectDetails[featured.slug].purpose}</p>
            </section>
            <section className="rounded-2xl border border-slate-200/80 bg-white/45 p-5">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-500">Role</h3>
              <p className="mt-3 leading-7 text-slate-700">{projectDetails[featured.slug].role}</p>
            </section>
          </div>

          <section className="mt-6 rounded-2xl border border-slate-200/80 bg-white/45 p-5">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-500">Key features</h3>
            <ul className="mt-4 grid gap-3 text-sm leading-6 text-slate-700 md:grid-cols-2">
              {projectDetails[featured.slug].features.map((feature) => (
                <li key={feature} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[#4f7fb8]" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {featured.metrics.map((metric) => (
              <MetricPreview key={metric.label} metric={metric} />
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {featured.stack.map((item) => (
              <StackPill key={item}>{item}</StackPill>
            ))}
          </div>

          <Link className="mt-7 inline-flex items-center gap-2 font-semibold text-[#2f5ea4] hover:text-slate-950" href={`/projects/${featured.slug}`}>
            Open case study
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.7} />
          </Link>
        </article>

        <div className="grid gap-8">
          {supporting.map((study) => {
            const detail = projectDetails[study.slug];
            const Icon = detail.Icon;
            const metric = study.metrics[0];

            return (
              <article key={study.slug} className="glass-panel flex h-full flex-col p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="section-label">{study.category}</p>
                    <h2 className="font-display mt-4 text-3xl font-bold leading-tight tracking-tight text-slate-900">
                      {study.title.split(" — ")[0]}
                    </h2>
                  </div>
                  <Icon className="h-6 w-6 flex-none text-[#2f5ea4]" strokeWidth={1.7} />
                </div>
                <p className="mt-4 leading-7 text-slate-700">{study.summary}</p>
                <div className="mt-5 grid gap-4">
                  <section className="rounded-2xl border border-slate-200/80 bg-white/45 p-4">
                    <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500">Problem solved</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-700">{detail.purpose}</p>
                  </section>
                  <section className="rounded-2xl border border-slate-200/80 bg-white/45 p-4">
                    <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500">Contribution</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-700">{detail.role}</p>
                  </section>
                </div>
                <ul className="mt-5 space-y-2 text-sm leading-6 text-slate-700">
                  {detail.features.map((feature) => (
                    <li key={feature} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[#4f7fb8]" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 rounded-2xl border border-slate-200/80 bg-white/45 p-4">
                  <p className="font-display text-3xl font-bold text-slate-900">{metric.value}</p>
                  <p className="mt-1 text-sm text-slate-700">{metric.label}</p>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {study.stack.slice(0, 6).map((item) => (
                    <StackPill key={item}>{item}</StackPill>
                  ))}
                </div>
                <Link className="mt-6 inline-flex items-center gap-2 font-semibold text-[#2f5ea4] hover:text-slate-950" href={`/projects/${study.slug}`}>
                  Open case study
                  <ArrowUpRight className="h-4 w-4" strokeWidth={1.7} />
                </Link>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
