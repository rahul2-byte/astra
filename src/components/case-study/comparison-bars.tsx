"use client";

import { motion, useReducedMotion } from "framer-motion";

export type ComparisonBarsProps = {
  title: string;
  before: { label: string; value: number; unit: string };
  after: { label: string; value: number; unit: string };
  delta: string;
  source: string;
};

function ComparisonRow({
  entry,
  color,
  max,
  reduced,
}: {
  entry: ComparisonBarsProps["before"];
  color: string;
  max: number;
  reduced: boolean | null;
}) {
  const width = `${(entry.value / max) * 100}%`;

  return (
    <div>
      <div className="flex items-baseline justify-between text-sm text-[var(--muted)]">
        <span className="font-medium">{entry.label}</span>
        <span className="font-technical text-[var(--foreground)]">
          {entry.value} <span className="text-[var(--muted)]">{entry.unit}</span>
        </span>
      </div>
      <div className="mt-2 h-3 w-full overflow-hidden bg-[var(--surface-elevated)]">
        <motion.div
          className="h-full"
          style={{ backgroundColor: color }}
          initial={reduced ? { width } : { width: "0%" }}
          whileInView={reduced ? undefined : { width }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export function ComparisonBars({ title, before, after, delta, source }: ComparisonBarsProps) {
  const reduced = useReducedMotion();
  const max = Math.max(before.value, after.value) || 1;

  return (
    <div className="surface-card p-6">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-display text-xl font-semibold tracking-[-0.03em]">{title}</h3>
        <span className="font-technical text-[0.65rem] uppercase tracking-wider text-[var(--muted)]">{source}</span>
      </div>
      <div className="mt-5 space-y-5">
        <ComparisonRow entry={before} color="#aaa79d" max={max} reduced={reduced} />
        <ComparisonRow entry={after} color="var(--primary-hover)" max={max} reduced={reduced} />
      </div>
      <p className="mt-5 inline-flex bg-[var(--primary-soft)] px-3 py-2 font-technical text-xs font-semibold">{delta}</p>
    </div>
  );
}
