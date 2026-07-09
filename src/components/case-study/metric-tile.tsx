"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

export type MetricTileProps = {
  value: string;
  label: string;
  source: string;
  icon: LucideIcon;
  spark?: number[];
};

export function MetricTile({ value, label, source, icon: Icon, spark }: MetricTileProps) {
  const reduced = useReducedMotion();
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
      className="glass-panel flex h-full flex-col justify-between p-6 transition hover:-translate-y-1"
      initial={reduced ? false : { opacity: 0, y: 16 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between gap-3">
        <Icon aria-label="metric icon" className="h-5 w-5 text-[#2f5ea4]" strokeWidth={1.7} />
        <span className="text-xs uppercase tracking-widest text-slate-500">{source}</span>
      </div>
      <div className="mt-4 flex items-end justify-between gap-4">
        <span className="font-display text-4xl font-bold text-slate-900">{value}</span>
        {polylinePoints ? (
          <svg viewBox="0 0 100 32" className="h-9 w-24" aria-hidden="true">
            <polyline points={polylinePoints} fill="none" stroke="#4f7fb8" strokeWidth={1.5} />
          </svg>
        ) : null}
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-700">{label}</p>
    </motion.div>
  );
}
