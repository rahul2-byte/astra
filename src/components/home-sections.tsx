import Link from "next/link";
import {
  ArrowUpRight,
  Code2 as Github,
  Layers,
  Link as Linkedin,
  Mail,
  MapPin,
  Network,
  Target,
} from "lucide-react";
import { earlierWork, featuredProjects } from "@/content/projects";
import { skillGroups } from "@/content/skills";
import { proofMetrics, site } from "@/content/site";
import { ProjectCard } from "@/components/project-card";
import { StackPill } from "@/components/case-study/stack-pill";

const capabilities = [
  ["01", "Production ML", "Fuel analytics, alerts, telemetry"],
  ["02", "Applied AI/RAG", "LangGraph, pgvector, local LLMs"],
  ["03", "Recommendations", "FAISS retrieval, LightGBM ranking"],
];

export function HomeSections() {
  return (
    <main className="overflow-hidden">
      <section className="technical-grid relative border-b soft-divider">
        <div className="signal-glow animate-signal pointer-events-none absolute -right-24 top-10 h-[28rem] w-[28rem]" />
        <div className="section-shell relative grid min-h-[calc(100vh-72px)] items-center gap-12 py-16 lg:grid-cols-[1.35fr_0.75fr] lg:py-24">
          <div>
            <div className="flex items-center gap-4">
              <p className="section-label">Machine Learning Engineer</p>
              <span className="font-technical text-[0.65rem] text-[var(--muted)]">PUNE / IN</span>
            </div>
            <h1 className="font-display mt-7 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.065em] text-[var(--foreground)] sm:text-6xl lg:text-[5.4rem]">
              {site.headline}
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-[var(--muted)] md:text-xl">{site.summary}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <p className="status-badge">Production ML / Applied AI / Recommenders</p>
              <p className="status-badge">{site.openToRoles.replace("Open to ", "Available for ")}</p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link className="btn-primary" href="/projects">
                View Projects <ArrowUpRight className="link-arrow h-4 w-4" aria-hidden />
              </Link>
              <Link className="btn-secondary" href="/experience">View Experience</Link>
              <Link className="btn-secondary" href="/resume">View Resume</Link>
              <Link className="btn-secondary" href="/contact">Contact Rahul</Link>
            </div>
            <div className="mt-10 grid border border-[var(--border)] bg-[var(--card)] sm:grid-cols-3">
              {capabilities.map(([index, title, body], position) => (
                <div key={title} className={`p-4 ${position > 0 ? "border-t border-[var(--border)] sm:border-l sm:border-t-0" : ""}`}>
                  <span className="font-technical text-[0.65rem] text-[var(--muted)]">{index}</span>
                  <p className="mt-3 font-semibold tracking-[-0.02em]">{title}</p>
                  <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{body}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="surface-card relative overflow-hidden p-6 lg:p-8">
            <div className="absolute inset-x-0 top-0 h-1.5 bg-[var(--primary)]" />
            <div className="flex items-start justify-between gap-5 border-b soft-divider pb-5">
              <div>
                <p className="section-label">Quick Facts</p>
                <h2 className="font-display mt-4 text-3xl font-semibold tracking-[-0.045em]">Recruiter snapshot</h2>
              </div>
              <span className="font-technical text-xs text-[var(--muted)]">RS-04</span>
            </div>
            <dl className="divide-y divide-[var(--section-divider)]">
              <div className="grid grid-cols-[2rem_1fr] gap-4 py-5">
                <dt><MapPin className="h-5 w-5" strokeWidth={1.7} aria-label="Location" /></dt>
                <dd><span className="font-technical text-[0.65rem] uppercase tracking-wider text-[var(--muted)]">Location</span><span className="mt-1 block font-medium">{site.location}</span></dd>
              </div>
              <div className="grid grid-cols-[2rem_1fr] gap-4 py-5">
                <dt><Target className="h-5 w-5" strokeWidth={1.7} aria-label="Target roles" /></dt>
                <dd><span className="font-technical text-[0.65rem] uppercase tracking-wider text-[var(--muted)]">Target roles</span><span className="mt-1 block text-sm leading-6">{site.targetRoles.join(" / ")}</span></dd>
              </div>
              <div className="grid grid-cols-[2rem_1fr] gap-4 py-5">
                <dt><Layers className="h-5 w-5" strokeWidth={1.7} aria-label="Core stack" /></dt>
                <dd><span className="font-technical text-[0.65rem] uppercase tracking-wider text-[var(--muted)]">Core stack</span><span className="mt-1 block text-sm leading-6">Python, SQL, Pandas, scikit-learn, FastAPI, LangGraph, FAISS, AWS</span></dd>
              </div>
            </dl>
            <div className="flex flex-wrap gap-x-5 gap-y-3 border-t soft-divider pt-5">
              <a className="text-link" href={site.github} target="_blank" rel="noreferrer"><Github className="h-4 w-4" />GitHub<ArrowUpRight className="link-arrow h-3.5 w-3.5" /></a>
              <a className="text-link" href={site.linkedin} target="_blank" rel="noreferrer"><Linkedin className="h-4 w-4" />LinkedIn<ArrowUpRight className="link-arrow h-3.5 w-3.5" /></a>
              <a className="text-link" href={`mailto:${site.email}`}><Mail className="h-4 w-4" />Email</a>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-[var(--foreground)] text-[var(--background)]">
        <div className="section-shell grid sm:grid-cols-2 lg:grid-cols-4">
          {proofMetrics.map((metric, index) => (
            <div key={metric} className={`flex min-h-28 items-center gap-4 py-6 ${index > 0 ? "border-t border-white/15 sm:border-l sm:border-t-0" : ""} ${index % 2 === 0 ? "sm:pr-6" : "sm:px-6"}`}>
              <span className="font-technical text-xs text-[var(--primary)]">0{index + 1}</span>
              <span className="text-sm font-medium leading-6">{metric}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell py-20 md:py-28">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <div>
            <p className="section-label">Experience anchor</p>
            <h2 className="font-display mt-5 text-4xl font-semibold leading-[1.05] tracking-[-0.05em] md:text-5xl">Production ML in noisy real-world telemetry.</h2>
          </div>
          <div className="surface-card border-l-4 border-l-[var(--primary)] p-7 md:p-9">
            <p className="text-lg leading-8 text-[var(--muted)]">At Intangles, Rahul worked on fuel analytics, OBD telemetry, sub-threshold event detection, data-loss detection, and smoothing noisy fuel-level sensor signals. This section stays high-level by design while preserving the business outcomes from the resume.</p>
            <Link className="text-link mt-7" href="/experience">Read experience summary <ArrowUpRight className="link-arrow h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      <section className="section-tone py-20 md:py-28">
        <div className="section-shell">
          <div className="max-w-3xl">
            <p className="section-label">Featured work</p>
            <h2 className="font-display mt-5 text-4xl font-semibold tracking-[-0.05em] md:text-5xl">Case studies that support the resume.</h2>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {featuredProjects.map((project) => <ProjectCard key={project.slug} project={project} />)}
          </div>
        </div>
      </section>

      <section className="section-shell py-20 md:py-28">
        <p className="section-label">Skills snapshot</p>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {skillGroups.map((group, index) => (
            <article key={group.title} className="surface-card p-7">
              <div className="flex items-start justify-between gap-4">
                <h2 className="flex items-center gap-2 text-xl font-semibold tracking-[-0.03em]">
                  {group.title === "Project-backed" ? <Network className="h-5 w-5" /> : <Layers className="h-5 w-5" />}
                  {group.title}
                </h2>
                <span className="font-technical text-xs text-[var(--muted)]">0{index + 1}</span>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">{group.items.map((item) => <StackPill key={item}>{item}</StackPill>)}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell pb-20 md:pb-28">
        <div className="border-y soft-divider py-10">
          <p className="section-label">Earlier work / learning projects</p>
          <div className="mt-7 grid gap-5 md:grid-cols-2">
            {earlierWork.map((item, index) => (
              <article key={item.title} className="surface-card p-6">
                <span className="font-technical text-xs text-[var(--muted)]">0{index + 1}</span>
                <h3 className="mt-4 font-semibold tracking-[-0.025em]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{item.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
