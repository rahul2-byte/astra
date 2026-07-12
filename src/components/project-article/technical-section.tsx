import type { ReactNode } from "react";

type TechnicalSectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  evidence?: string;
  children: ReactNode;
};

export function TechnicalSection({ id, eyebrow, title, evidence, children }: TechnicalSectionProps) {
  return (
    <section id={id} className="scroll-mt-28 border-t soft-divider py-10 first:border-t-0 first:pt-0">
      <p className="section-label">{eyebrow}</p>
      <div className="mt-4 flex flex-wrap items-baseline justify-between gap-3">
        <h2 id={`${id}-heading`} className="font-display text-3xl font-semibold tracking-[-0.045em] md:text-4xl">
          {title}
        </h2>
        {evidence ? <span className="font-technical text-[0.65rem] uppercase tracking-wider text-[var(--muted)]">{evidence}</span> : null}
      </div>
      <div className="mt-5 space-y-4 text-[var(--muted)]">{children}</div>
    </section>
  );
}
