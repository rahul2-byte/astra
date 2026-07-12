import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { StackPill } from "@/components/case-study/stack-pill";
import { ArticleTable } from "@/components/project-article/article-table";
import { FlowDiagram } from "@/components/project-article/flow-diagram";
import { TechnicalSection } from "@/components/project-article/technical-section";
import { type ProjectArticleCaseStudy } from "@/content/project-article";

export function ProjectArticleLayout({ study }: { study: ProjectArticleCaseStudy }) {
  return (
    <main className="section-shell py-12 md:py-20">
      <header className="technical-grid relative overflow-hidden border-y border-[var(--border)] py-10 md:py-14">
        <div className="signal-glow pointer-events-none absolute -right-20 -top-20 h-72 w-72" />
        <div className="relative max-w-5xl">
          <p className="section-label">{study.meta.category}</p>
          <h1 className="font-display mt-5 text-5xl font-semibold leading-[1.02] tracking-[-0.06em] md:text-7xl">{study.meta.title}</h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-[var(--muted)] md:text-xl">{study.meta.summary}</p>
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 border-y soft-divider py-4 font-technical text-xs text-[var(--muted)]">
            <span>Role / {study.meta.role}</span><span>Duration / {study.meta.duration}</span><span>Status / {study.meta.status}</span>
          </div>
          <div className="mt-6 flex flex-wrap gap-2" aria-label="Technology stack">
            {study.meta.stack.map((item) => <StackPill key={item}>{item}</StackPill>)}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {study.resources.map((resource, index) => (
              <a key={resource.href} href={resource.href} target={resource.external === false ? undefined : "_blank"} rel={resource.external === false ? undefined : "noopener noreferrer"} className={index === 0 ? "btn-primary" : "btn-secondary"}>
                {resource.label}{resource.external === false ? <ArrowUpRight className="link-arrow h-4 w-4" strokeWidth={1.7} /> : <ExternalLink className="link-arrow h-4 w-4" strokeWidth={1.7} />}
              </a>
            ))}
          </div>
        </div>
      </header>

      <section className="grid border-b border-[var(--border)] sm:grid-cols-3" aria-label="Project facts">
        {study.facts.map((fact) => <div key={fact.label} className="border-b border-[var(--border)] px-5 py-6 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0"><p className="metric-value text-4xl font-semibold">{fact.value}</p><p className="mt-2 font-technical text-xs uppercase tracking-wider text-[var(--muted)]">{fact.label}</p></div>)}
      </section>

      <div className="mt-12 grid gap-10 lg:grid-cols-[12rem_minmax(0,1fr)] lg:items-start">
        <nav aria-label="On this page" className="hidden lg:sticky lg:top-24 lg:block">
          <p className="font-technical text-[0.7rem] font-semibold uppercase tracking-wider text-[var(--muted)]">On this page</p>
          <ol className="mt-4 space-y-2 border-l border-[var(--border)] pl-4 text-sm">
            {study.toc.map((item) => <li key={item.id}><a href={`#${item.id}`} className="text-[var(--muted)] transition-colors hover:text-[var(--foreground)]">{item.label}</a></li>)}
          </ol>
        </nav>

        <article className="min-w-0 max-w-4xl">
          {study.sections.slice(0, 3).map((section) => <ArticleSection key={section.id} section={section} study={study} />)}
          <ArticleSection section={study.systemOverview} study={study}>
            {study.flows.slice(0, 1).map((flow) => <FlowDiagram key={flow.title} {...flow} />)}
            {study.tables.agents ? <ArticleTable {...study.tables.agents} /> : null}
          </ArticleSection>
          {study.sections.slice(3, 5).map((section) => <ArticleSection key={section.id} section={section} study={study} />)}
          <ArticleSection section={study.workflow} study={study}>
            {study.flows.slice(1).map((flow) => <FlowDiagram key={flow.title} {...flow} />)}
          </ArticleSection>
          {study.sections.slice(5, 8).map((section) => <ArticleSection key={section.id} section={section} study={study} />)}
          <TechnicalSection id="decisions" eyebrow="Engineering judgment" title="Decisions and trade-offs">
            <p className="leading-8">The table documents the selected approaches, the alternatives considered, and the trade-offs that shape the implementation.</p>
            <ArticleTable {...study.tables.decisions} />
          </TechnicalSection>
          <TechnicalSection id="skills" eyebrow="Skills demonstrated" title="Implemented capabilities">
            <ArticleTable {...study.tables.skills} />
          </TechnicalSection>
          {study.sections.slice(8).map((section) => <ArticleSection key={section.id} section={section} study={study} />)}
          <section className="section-tone mt-10 p-6 md:p-8">
            <p className="section-label">Resources</p>
            <h2 className="font-display mt-4 text-3xl font-semibold tracking-[-0.045em]">{study.meta.resourcesTitle ?? "Explore the implementation"}</h2>
            <ul className="mt-6 grid gap-3 md:grid-cols-3">
              {study.resources.map((resource) => <li key={resource.href}><a href={resource.href} target={resource.external === false ? undefined : "_blank"} rel={resource.external === false ? undefined : "noopener noreferrer"} className="surface-card-interactive block h-full p-4"><span className="text-link">{resource.label}<ArrowUpRight className="link-arrow h-4 w-4" /></span><span className="mt-3 block text-sm leading-6 text-[var(--muted)]">{resource.description}</span></a></li>)}
            </ul>
            <Link href="/projects" className="text-link mt-8">Back to projects<ArrowUpRight className="link-arrow h-4 w-4" /></Link>
          </section>
        </article>
      </div>
    </main>
  );
}

function ArticleSection({ study, section, children }: { study: ProjectArticleCaseStudy; section: ProjectArticleCaseStudy["sections"][number]; children?: ReactNode }) {
  return (
    <TechnicalSection id={section.id} eyebrow={section.eyebrow} title={section.title} evidence={section.evidence}>
      {section.paragraphs.map((paragraph) => <p key={paragraph} className="leading-8">{paragraph}</p>)}
      {section.bullets ? <ul className="mt-5 space-y-3 border-l-2 border-[var(--primary)] pl-5 leading-7"><>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</></ul> : null}
      {section.callout ? <aside className="mt-6 border-l-4 border-l-[var(--primary)] bg-[var(--primary-soft)] p-5"><h3 className="font-technical text-xs font-semibold uppercase tracking-wider">{section.callout.title}</h3><p className="mt-3 leading-7 text-[var(--foreground)]">{section.callout.body}</p></aside> : null}
      {section.id === "api-ux" ? <ArticleTable {...study.tables.api} /> : null}
      {children}
    </TechnicalSection>
  );
}
