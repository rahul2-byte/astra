import Link from "next/link";
import { ArrowUpRight, Network } from "lucide-react";
import { homeProjects } from "@/content/home";
import { StackPill } from "@/components/case-study/stack-pill";

export function FeaturedProjects() {
  return (
    <section className="section-shell py-20 md:py-28" aria-labelledby="featured-projects-title">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <p className="section-label">Featured work</p>
          <h2 id="featured-projects-title" className="font-display mt-5 text-4xl font-semibold tracking-[-0.055em] md:text-5xl">
            Case studies grounded in implementation details.
          </h2>
          <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
            Each study connects the technical problem, my contribution, the system design, and the available evidence.
          </p>
        </div>
        <Link className="text-link shrink-0" href="/projects">
          View All Projects <ArrowUpRight className="link-arrow h-4 w-4" aria-hidden />
        </Link>
      </div>

      <div className="mt-10 grid gap-6 lg:auto-rows-fr lg:grid-cols-3">
        {homeProjects.map((project, index) => (
          <article key={project.title} className="surface-card-interactive relative flex h-full flex-col overflow-hidden p-6 md:p-7">
            <span className="absolute inset-x-0 top-0 h-1 bg-[var(--primary)]" />
            <div className="flex items-center justify-between gap-4">
              <p className="section-label">{project.category}</p>
              <span className="font-technical text-xs text-[var(--muted)]">0{index + 1}</span>
            </div>
            <h3 className="font-display mt-6 text-3xl font-semibold leading-tight tracking-[-0.045em]">{project.title}</h3>

            <dl className="mt-6 divide-y divide-[var(--section-divider)] border-y soft-divider text-sm leading-6">
              <div className="py-4">
                <dt className="font-technical text-[0.65rem] uppercase tracking-wider text-[var(--muted)]">Problem</dt>
                <dd className="mt-2 text-[var(--muted)]">{project.problem}</dd>
              </div>
              <div className="py-4">
                <dt className="font-technical text-[0.65rem] uppercase tracking-wider text-[var(--muted)]">Contribution</dt>
                <dd className="mt-2 text-[var(--muted)]">{project.contribution}</dd>
              </div>
            </dl>

            <div className="mt-5 flex items-start gap-3 bg-[var(--primary-soft)] p-4">
              <Network className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.7} aria-hidden />
              <p className="font-technical text-[0.68rem] leading-5">{project.evidence}</p>
            </div>

            <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${project.title} technology stack`}>
              {project.stack.map((item) => <li key={item}><StackPill>{item}</StackPill></li>)}
            </ul>

            <Link className="text-link mt-6" href={project.href} aria-label={`View ${project.title} case study`}>
              View Case Study <ArrowUpRight className="link-arrow h-4 w-4" aria-hidden />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
