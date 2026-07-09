import type { CaseStudy } from "@/content/case-studies";
import { ArchitectureFlow } from "@/components/case-study/architecture-flow";
import { ComparisonBars } from "@/components/case-study/comparison-bars";
import { EvidenceTable } from "@/components/case-study/evidence-table";
import { MetricTile } from "@/components/case-study/metric-tile";
import { StackPill } from "@/components/case-study/stack-pill";
import { TrendLine } from "@/components/case-study/trend-line";

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

      <section className="mt-8 flex flex-wrap gap-2" aria-label="Technology stack">
        {study.stack.map((item) => (
          <StackPill key={item}>{item}</StackPill>
        ))}
      </section>

      <section className="mt-10 grid gap-6 md:grid-cols-3" aria-label="Key metrics">
        {study.metrics.map((metric) => (
          <MetricTile
            key={metric.label}
            value={metric.value}
            label={metric.label}
            source={metric.source}
            iconName={metric.iconName}
            spark={metric.spark}
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
