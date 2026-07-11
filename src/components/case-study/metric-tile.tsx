"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Activity, Cpu, Database, Gauge } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type MetricTileProps = {
  value: string;
  label: string;
  source: string;
  iconName: string;
  spark?: number[];
};

const iconMap: Record<string, LucideIcon> = { Activity, Cpu, Database, Gauge };

export function MetricTile({ value, label, source, iconName, spark }: MetricTileProps) {
  const reduced = useReducedMotion();
  const Icon = iconMap[iconName] ?? Gauge;
  const polylinePoints = spark
    ? spark
        .map((v, i) => {
          const max = Math.max(...spark);
          const min = Math.min(...spark);
          const range = max - min || 1;
          const x = (i / Math.max(1, spark.length - 1)) * 100;
          const y = 30 - ((v - min) / range) * 24;
          return `${x},${y}`;
        })
        .join(" ")
    : null;

  return (
    <motion.div
      className="surface-card-interactive flex h-full flex-col justify-between p-6"
      initial={reduced ? false : { opacity: 0, y: 16 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="grid h-10 w-10 place-items-center bg-[var(--primary)]"><Icon aria-label="metric icon" className="h-5 w-5" strokeWidth={1.7} /></span>
        <span className="font-technical text-[0.65rem] uppercase tracking-wider text-[var(--muted)]">{source}</span>
      </div>
      <div className="mt-4 flex items-end justify-between gap-4">
        <span className="metric-value text-4xl font-semibold">{value}</span>
        {polylinePoints ? (
          <svg viewBox="0 0 100 32" className="h-9 w-24" aria-hidden="true">
            <polyline points={polylinePoints} fill="none" stroke="var(--primary-hover)" strokeWidth={2} />
          </svg>
        ) : null}
      </div>
      <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{label}</p>
    </motion.div>
  );
}
