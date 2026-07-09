import Link from "next/link";
import { ArrowUpRight, Code2 as Github, Layers, Link as Linkedin, Mail, MapPin, Network, Target } from "lucide-react";
import { earlierWork, featuredProjects } from "@/content/projects";
import { skillGroups } from "@/content/skills";
import { proofMetrics, site } from "@/content/site";
import { ProjectCard } from "@/components/project-card";

export function HomeSections() {
  return (
    <main className="overflow-hidden">
      <section className="section-shell relative grid min-h-[calc(100vh-72px)] items-center gap-12 py-20 md:grid-cols-[1.4fr_0.8fr] lg:py-28">
        <div className="pointer-events-none absolute left-10 top-10 -z-10 h-96 w-96 rounded-full bg-blue-200/60 blur-3xl" />
        <div className="pointer-events-none absolute right-16 top-20 -z-10 h-80 w-80 rounded-full bg-emerald-100/70 blur-3xl" />
        <div>
          <p className="section-label">Machine Learning Engineer</p>
          <h1 className="font-display max-w-5xl text-5xl font-bold leading-[0.98] tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
            {site.headline}
          </h1>
          <p className="mt-6 max-w-3xl text-xl leading-8 text-slate-900">{site.summary}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <p className="status-badge text-sm font-medium">
              Production ML / Applied AI / Recommenders
            </p>
            <p className="status-badge text-sm font-medium">
              {site.openToRoles.replace("Open to ", "Available for ")}
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <Link className="btn-primary" href="/projects">
              View Projects
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.7} />
            </Link>
            <Link className="btn-secondary" href="/experience">
              View Experience
            </Link>
            <Link className="btn-secondary" href="/resume">
              View Resume
            </Link>
            <Link className="btn-secondary" href="/contact">
              Contact Rahul
            </Link>
          </div>
          <div className="mt-9 grid gap-3 sm:grid-cols-3">
            {[
              ["Production ML", "Fuel analytics, alerts, telemetry"],
              ["Applied AI/RAG", "LangGraph, pgvector, local LLMs"],
              ["Recommendations", "FAISS retrieval, LightGBM ranking"],
            ].map(([title, body]) => (
              <div key={title} className="rounded-2xl border border-slate-200/80 bg-white/45 p-4">
                <p className="font-semibold text-slate-900">{title}</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">{body}</p>
              </div>
            ))}
          </div>
        </div>
        <aside className="glass-panel relative overflow-hidden p-7 text-slate-950 lg:p-8">
          <div className="pointer-events-none absolute -right-12 -top-16 h-48 w-48 rounded-full bg-blue-200/50 blur-3xl" />
          <p className="section-label">Quick Facts</p>
          <h2 className="font-display mt-3 text-3xl font-bold tracking-tight">Recruiter snapshot</h2>
          <dl className="mt-7 space-y-7">
            <div className="grid grid-cols-[2rem_1fr] gap-4">
              <dt className="text-[#2f5ea4]"><MapPin className="h-6 w-6" strokeWidth={1.7} /></dt>
              <dd><span className="block font-semibold">Location</span><span className="mt-1 block">{site.location}</span></dd>
            </div>
            <div className="grid grid-cols-[2rem_1fr] gap-4">
              <dt className="text-[#2f5ea4]"><Target className="h-6 w-6" strokeWidth={1.7} /></dt>
              <dd><span className="block font-semibold">Target roles</span><span className="mt-1 block leading-6">{site.targetRoles.join(" / ")}</span></dd>
            </div>
            <div className="grid grid-cols-[2rem_1fr] gap-4">
              <dt className="text-[#2f5ea4]"><Layers className="h-6 w-6" strokeWidth={1.7} /></dt>
              <dd><span className="block font-semibold">Core stack</span><span className="mt-1 block leading-6">Python, SQL, Pandas, scikit-learn, FastAPI, LangGraph, FAISS, AWS</span></dd>
            </div>
          </dl>
          <div className="soft-divider mt-7 flex flex-wrap gap-5 border-t pt-5 text-sm">
            <a className="inline-flex items-center gap-1.5 hover:text-[#4f7fb8]" href={site.github}><Github className="h-5 w-5" strokeWidth={1.7} />GitHub</a>
            <a className="inline-flex items-center gap-1.5 hover:text-[#4f7fb8]" href={site.linkedin}><Linkedin className="h-5 w-5" strokeWidth={1.7} />LinkedIn</a>
            <a className="inline-flex items-center gap-1.5 hover:text-[#4f7fb8]" href={`mailto:${site.email}`}><Mail className="h-5 w-5" strokeWidth={1.7} />Email</a>
          </div>
        </aside>
      </section>

      <section className="border-y soft-divider bg-white/18 backdrop-blur-sm">
        <div className="section-shell grid gap-4 py-8 sm:grid-cols-2 md:grid-cols-4">
          {proofMetrics.map((metric) => (
            <div key={metric} className="glass-panel rounded-2xl px-5 py-4 text-sm font-semibold text-slate-850 shadow-none">
              {metric}
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell py-20">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="section-label">Experience anchor</p>
            <h2 className="font-display mt-4 text-4xl font-bold leading-tight tracking-tight text-slate-900">Production ML in noisy real-world telemetry.</h2>
          </div>
          <div className="glass-panel p-8">
            <p className="leading-8 text-slate-700">
              At Intangles, Rahul worked on fuel analytics, OBD telemetry, sub-threshold event detection, data-loss detection, and smoothing noisy fuel-level sensor signals. This section stays high-level by design while preserving the business outcomes from the resume.
            </p>
            <Link className="mt-6 inline-flex font-semibold text-[#2f5ea4] hover:text-slate-950" href="/experience">
              Read experience summary
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="section-shell">
          <div className="max-w-3xl">
            <p className="section-label">Featured work</p>
            <h2 className="font-display mt-4 text-4xl font-bold tracking-tight text-slate-900">Case studies that support the resume.</h2>
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-20">
        <p className="section-label">Skills snapshot</p>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <article key={group.title} className="glass-panel p-7">
              <h2 className="flex items-center gap-2 text-xl font-bold text-slate-950">
                {group.title === "Project-backed" ? <Network className="h-5 w-5 text-slate-700" strokeWidth={1.7} /> : <Layers className="h-5 w-5 text-slate-700" strokeWidth={1.7} />}
                {group.title}
              </h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="rounded-sm border border-slate-300/80 bg-white/30 px-3 py-1 text-sm text-slate-700">
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell pb-20">
        <div className="soft-divider border-y py-10">
          <p className="section-label">Earlier work / learning projects</p>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {earlierWork.map((item) => (
              <article key={item.title} className="glass-panel p-6 shadow-none">
                <h3 className="font-semibold text-slate-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-650">{item.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
