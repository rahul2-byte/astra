import type { FlowLane } from "@/content/project-article";
import { SectionReveal } from "@/components/motion/section-reveal";

type FlowDiagramProps = {
  title: string;
  caption: string;
  lanes: FlowLane[];
};

export function FlowDiagram({ title, caption, lanes }: FlowDiagramProps) {
  return (
    <SectionReveal>
      <figure className="surface-card my-8 overflow-hidden p-5 md:p-6" aria-labelledby={`${title}-title`}>
      <figcaption id={`${title}-title`} className="font-display text-2xl font-semibold tracking-[-0.04em]">{title}</figcaption>
      <div className="mt-6 space-y-5">
        {lanes.map((lane) => (
          <div key={lane.label} className="grid gap-3 lg:grid-cols-[10rem_1fr]">
            <p className="font-technical pt-3 text-[0.7rem] font-semibold uppercase tracking-wider text-[var(--muted)]">{lane.label}</p>
            <ol className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {lane.steps.map((step, index) => (
                <li key={step.title} className="relative border border-[var(--border)] bg-[var(--surface-elevated)] p-4">
                  <span className="font-technical text-xs text-[var(--primary-hover)]">{String(index + 1).padStart(2, "0")}</span>
                  <h4 className="font-display mt-3 text-lg font-semibold tracking-[-0.03em]">{step.title}</h4>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{step.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
      <p className="mt-6 border-t soft-divider pt-4 text-sm leading-6 text-[var(--muted)]">{caption}</p>
      </figure>
    </SectionReveal>
  );
}
