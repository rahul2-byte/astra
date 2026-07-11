"use client";

import { motion, useReducedMotion } from "framer-motion";

export type TrendPoint = { iteration: number; metric: number };

export type TrendLineProps = {
  title: string;
  yLabel: string;
  xLabel: string;
  points: TrendPoint[];
  source: string;
};

export function TrendLine({ title, yLabel, xLabel, points, source }: TrendLineProps) {
  const reduced = useReducedMotion();
  const width = 360;
  const height = 180;
  const padding = { top: 16, right: 16, bottom: 28, left: 40 };
  const innerW = width - padding.left - padding.right;
  const innerH = height - padding.top - padding.bottom;
  const xMin = Math.min(...points.map((p) => p.iteration));
  const xMax = Math.max(...points.map((p) => p.iteration));
  const yMin = 0;
  const yMax = Math.max(...points.map((p) => p.metric)) || 1;

  function toX(it: number) {
    return padding.left + ((it - xMin) / Math.max(1, xMax - xMin)) * innerW;
  }
  function toY(metric: number) {
    return padding.top + innerH - ((metric - yMin) / (yMax - yMin)) * innerH;
  }

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"}${toX(p.iteration)},${toY(p.metric)}`).join(" ");
  const fillPath = `${linePath} L${toX(xMax)},${padding.top + innerH} L${toX(xMin)},${padding.top + innerH} Z`;

  return (
    <div className="surface-card p-6">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-display text-xl font-semibold tracking-[-0.03em]">{title}</h3>
        <span className="font-technical text-[0.65rem] uppercase tracking-wider text-[var(--muted)]">{source}</span>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className="mt-4 w-full" role="img" aria-label={title}>
        <defs>
          <linearGradient id="trendFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--primary-hover)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--primary-hover)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((g) => (
          <line
            key={g}
            x1={padding.left}
            x2={padding.left + innerW}
            y1={padding.top + innerH * g}
            y2={padding.top + innerH * g}
            stroke="var(--border)"
            strokeDasharray="3 3"
          />
        ))}
        <motion.path
          d={fillPath}
          fill="url(#trendFill)"
          initial={reduced ? { opacity: 1 } : { opacity: 0 }}
          whileInView={reduced ? undefined : { opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
        />
        <motion.path
          d={linePath}
          fill="none"
          stroke="var(--primary-hover)"
          strokeWidth={2}
          initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
          whileInView={reduced ? undefined : { pathLength: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        {points.map((p) => (
          <circle key={p.iteration} cx={toX(p.iteration)} cy={toY(p.metric)} r={3.5} fill="var(--foreground)" />
        ))}
        <text x={padding.left} y={padding.top - 4} fontSize="10" fill="var(--muted)">
          {yLabel}
        </text>
        <text
          x={padding.left + innerW}
          y={height - 6}
          fontSize="10"
          fill="var(--muted)"
          textAnchor="end"
        >
          {xLabel}
        </text>
      </svg>
    </div>
  );
}
