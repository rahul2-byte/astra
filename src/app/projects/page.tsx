import Link from "next/link";
import { Activity, ArrowUpRight, Cpu, Database, Gauge } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { StackPill } from "@/components/case-study/stack-pill";
import { caseStudies } from "@/content/case-studies";

const iconMap: Record<string, LucideIcon> = { Gauge, Activity, Cpu, Database };

export default function ProjectsPage() {
  return (
    <main className="section-shell py-20">
      <p className="section-label">Projects</p>
      <h1 className="font-display mt-4 text-5xl font-bold leading-tight tracking-tight text-slate-900 md:text-6xl">Selected case studies</h1>
      <p className="mt-6 max-w-3xl text-xl leading-8 text-slate-800">
        Each project is written like a concise research note: problem, approach, architecture, measurable signals, and evidence tables. Resume-backed metrics are labeled; project metrics are marked as pending real measurement where needed.
      </p>
      <section className="mt-10 grid gap-8 lg:grid-cols-3">
        {Object.values(caseStudies).map((study) => {
          const metric = study.metrics[0];
          const Icon = iconMap[metric.iconName] ?? Gauge;

          return (
            <article key={study.slug} className="glass-panel flex h-full flex-col overflow-hidden p-7 transition hover:-translate-y-1 hover:shadow-[0_26px_80px_rgba(15,23,42,0.12)]">
              <div className="flex items-center justify-between gap-4">
                <p className="section-label">{study.category}</p>
                <Icon className="h-5 w-5 text-[#2f5ea4]" strokeWidth={1.7} />
              </div>
              <h2 className="font-display mt-5 text-3xl font-bold leading-tight tracking-tight text-slate-900">
                {study.title.split(" — ")[0]}
              </h2>
              <p className="mt-4 flex-1 leading-7 text-slate-700">{study.summary}</p>
              <div className="mt-6 rounded-2xl border border-slate-200/80 bg-white/40 p-5">
                <p className="font-display text-4xl font-bold text-slate-900">{metric.value}</p>
                <p className="mt-2 text-sm leading-6 text-slate-700">{metric.label}</p>
                <p className="mt-3 text-xs uppercase tracking-widest text-slate-500">{metric.source}</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {study.stack.slice(0, 5).map((item) => (
                  <StackPill key={item}>{item}</StackPill>
                ))}
              </div>
              <Link className="mt-6 inline-flex items-center gap-2 font-semibold text-[#2f5ea4] hover:text-slate-950" href={`/projects/${study.slug}`}>
                Open research note
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.7} />
              </Link>
            </article>
          );
        })}
      </section>
    </main>
  );
}
