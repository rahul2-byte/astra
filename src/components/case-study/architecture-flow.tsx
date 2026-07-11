"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Activity, BarChart3, Cpu, Database, FileText, Gauge, Network, TriangleAlert } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import type { ArchitectureNode } from "@/content/case-studies";

export type { ArchitectureNode };

const iconMap: Record<string, LucideIcon> = {
  Activity,
  BarChart3,
  Cpu,
  Database,
  FileText,
  Gauge,
  Network,
  TriangleAlert,
};

export function ArchitectureFlow({ nodes, caption }: { nodes: ArchitectureNode[]; caption: string }) {
  const reduced = useReducedMotion();
  const items: ReactNode[] = [];

  nodes.forEach((node, index) => {
    const Icon = iconMap[node.iconName] ?? Network;
    items.push(
      <motion.div
        key={node.key}
        className="surface-card flex w-44 shrink-0 flex-col items-center gap-2 p-4 text-center"
        initial={reduced ? false : { opacity: 0, y: 12 }}
        whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.35, delay: index * 0.08, ease: "easeOut" }}
      >
        <span className="grid h-10 w-10 place-items-center bg-[var(--primary)]"><Icon aria-label="architecture node" className="h-5 w-5" strokeWidth={1.7} /></span>
        <span className="font-display text-lg font-semibold tracking-[-0.03em]">{node.label}</span>
        <span className="text-xs leading-5 text-[var(--muted)]">{node.caption}</span>
      </motion.div>,
    );
    if (index < nodes.length - 1) {
      items.push(
        <svg
          key={`arrow-${node.key}`}
          viewBox="0 0 40 12"
          className="h-6 w-10 shrink-0 text-[var(--primary-hover)]"
          aria-hidden="true"
        >
          <line x1="0" y1="6" x2="34" y2="6" stroke="currentColor" strokeWidth="1.5" />
          <polyline points="30,2 36,6 30,10" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>,
      );
    }
  });

  return (
    <div className="surface-card p-6">
      <p className="section-label">Architecture</p>
      <div className="mt-5 overflow-x-auto pb-3" tabIndex={0} aria-label="Architecture flow diagram">
        <div className="flex min-w-max items-center justify-center gap-3">{items}</div>
      </div>
      <p className="mt-5 border-t soft-divider pt-5 text-sm leading-6 text-[var(--muted)]">{caption}</p>
    </div>
  );
}
