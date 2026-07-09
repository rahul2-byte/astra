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
      <div className="flex items-baseline justify-between text-sm text-slate-700">
        <span className="font-medium">{entry.label}</span>
        <span className="font-mono text-slate-900">
          {entry.value} <span className="text-slate-500">{entry.unit}</span>
        </span>
      </div>
      <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-slate-200/70">
        <motion.div
          className="h-full rounded-full"
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
    <div className="glass-panel p-6">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-display text-xl font-semibold text-slate-900">{title}</h3>
        <span className="text-xs uppercase tracking-widest text-slate-500">{source}</span>
      </div>
      <div className="mt-5 space-y-5">
        <ComparisonRow entry={before} color="#94a3b8" max={max} reduced={reduced} />
        <ComparisonRow entry={after} color="#4f7fb8" max={max} reduced={reduced} />
      </div>
      <p className="mt-5 text-sm font-semibold text-[#2f5ea4]">{delta}</p>
    </div>
  );
}
