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
    <div className="border border-[var(--border)] bg-[var(--surface-elevated)] p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="metric-value text-4xl font-semibold">{metric.value}</p>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{metric.label}</p>
        </div>
        <span className="grid h-9 w-9 place-items-center bg-[var(--primary)]"><Icon className="h-4 w-4 flex-none" strokeWidth={1.7} /></span>
      </div>
      <p className="font-technical mt-3 text-[0.65rem] uppercase tracking-wider text-[var(--muted)]">{metric.source}</p>
    </div>
  );
}

export default function ProjectsPage() {
  const FeaturedIcon = projectDetails[featured.slug].Icon;

  return (
    <main className="section-shell py-16 md:py-24">
      <section className="surface-card technical-grid relative overflow-hidden p-7 md:p-10">
        <div className="signal-glow animate-signal pointer-events-none absolute -right-20 -top-24 h-72 w-72" />
        <p className="section-label">Projects</p>
        <h1 className="font-display mt-5 max-w-5xl text-5xl font-semibold leading-[1.02] tracking-[-0.055em] md:text-6xl">
          Selected case studies
        </h1>
        <p className="relative mt-6 max-w-4xl text-lg leading-8 text-[var(--muted)] md:text-xl">
          Focused project work across production ML, applied AI/RAG, and recommendation systems. Each card summarizes the problem, my contribution, key modules, stack, outcome, and the deeper case study link.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {heroStats.map((item) => (
            <div key={item} className="flex items-center gap-3 border border-[var(--border)] bg-[var(--card)] px-5 py-4 text-sm font-semibold">
              <span className="h-2 w-2 bg-[var(--primary)]" />{item}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 space-y-8">
        <article className="surface-card relative flex flex-col overflow-hidden p-7 md:p-8">
          <span className="absolute inset-x-0 top-0 h-1.5 bg-[var(--primary)]" />
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="section-label">Featured · {featured.category}</p>
              <h2 className="font-display mt-4 text-4xl font-semibold leading-tight tracking-[-0.05em]">
                {featured.title}
              </h2>
            </div>
            <span className="grid h-12 w-12 place-items-center border border-[var(--foreground)] bg-[var(--primary)]"><FeaturedIcon className="h-6 w-6 flex-none" strokeWidth={1.7} /></span>
          </div>

          <p className="mt-5 text-lg leading-8 text-[var(--muted)]">{featured.summary}</p>

          <div className="mt-7 grid gap-5 md:grid-cols-2">
            <section className="border border-[var(--border)] bg-[var(--surface-elevated)] p-5">
              <h3 className="font-technical text-[0.65rem] font-semibold uppercase tracking-wider text-[var(--muted)]">Purpose</h3>
              <p className="mt-3 leading-7 text-[var(--muted)]">{projectDetails[featured.slug].purpose}</p>
            </section>
            <section className="border border-[var(--border)] bg-[var(--surface-elevated)] p-5">
              <h3 className="font-technical text-[0.65rem] font-semibold uppercase tracking-wider text-[var(--muted)]">Role</h3>
              <p className="mt-3 leading-7 text-[var(--muted)]">{projectDetails[featured.slug].role}</p>
            </section>
          </div>

          <section className="mt-6 border border-[var(--border)] bg-[var(--surface-elevated)] p-5">
            <h3 className="font-technical text-[0.65rem] font-semibold uppercase tracking-wider text-[var(--muted)]">Key features</h3>
            <ul className="mt-4 grid gap-3 text-sm leading-6 text-[var(--muted)] md:grid-cols-2">
              {projectDetails[featured.slug].features.map((feature) => (
                <li key={feature} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 flex-none bg-[var(--primary-hover)]" />
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

          <Link className="text-link mt-7" href={`/projects/${featured.slug}`}>
            Open case study
            <ArrowUpRight className="link-arrow h-4 w-4" strokeWidth={1.7} />
          </Link>
        </article>

        <div className="supporting-project-grid grid items-start gap-8 lg:grid-cols-2">
          {supporting.map((study) => {
            const detail = projectDetails[study.slug];
            const Icon = detail.Icon;
            const metric = study.metrics[0];

            return (
              <article key={study.slug} className="surface-card-interactive flex flex-col p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="section-label">{study.category}</p>
                    <h2 className="font-display mt-4 text-3xl font-semibold leading-tight tracking-[-0.045em]">
                      {study.title.split(" — ")[0]}
                    </h2>
                  </div>
                  <span className="grid h-10 w-10 place-items-center bg-[var(--primary)]"><Icon className="h-5 w-5 flex-none" strokeWidth={1.7} /></span>
                </div>
                <p className="mt-4 leading-7 text-[var(--muted)]">{study.summary}</p>
                <div className="mt-5 grid gap-4">
                  <section className="border border-[var(--border)] bg-[var(--surface-elevated)] p-4">
                    <h3 className="font-technical text-[0.65rem] font-semibold uppercase tracking-wider text-[var(--muted)]">Problem solved</h3>
                    <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{detail.purpose}</p>
                  </section>
                  <section className="border border-[var(--border)] bg-[var(--surface-elevated)] p-4">
                    <h3 className="font-technical text-[0.65rem] font-semibold uppercase tracking-wider text-[var(--muted)]">Contribution</h3>
                    <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{detail.role}</p>
                  </section>
                </div>
                <ul className="mt-5 space-y-2 text-sm leading-6 text-[var(--muted)]">
                  {detail.features.map((feature) => (
                    <li key={feature} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 flex-none bg-[var(--primary-hover)]" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 border border-[var(--border)] bg-[var(--primary-soft)] p-4">
                  <p className="metric-value text-3xl font-semibold">{metric.value}</p>
                  <p className="mt-1 text-sm text-[var(--muted)]">{metric.label}</p>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {study.stack.slice(0, 6).map((item) => (
                    <StackPill key={item}>{item}</StackPill>
                  ))}
                </div>
                <Link className="text-link mt-6" href={`/projects/${study.slug}`}>
                  Open case study
                  <ArrowUpRight className="link-arrow h-4 w-4" strokeWidth={1.7} />
                </Link>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
