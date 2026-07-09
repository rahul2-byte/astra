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
        className="glass-panel flex w-44 flex-col items-center gap-2 p-4 text-center"
        initial={reduced ? false : { opacity: 0, y: 12 }}
        whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.35, delay: index * 0.08, ease: "easeOut" }}
      >
        <Icon aria-label="architecture node" className="h-6 w-6 text-[#2f5ea4]" strokeWidth={1.7} />
        <span className="font-display text-lg font-semibold text-slate-900">{node.label}</span>
        <span className="text-xs leading-5 text-slate-600">{node.caption}</span>
      </motion.div>,
    );
    if (index < nodes.length - 1) {
      items.push(
        <svg
          key={`arrow-${node.key}`}
          viewBox="0 0 40 12"
          className="h-6 w-10 text-[#4f7fb8]"
          aria-hidden="true"
        >
          <line x1="0" y1="6" x2="34" y2="6" stroke="currentColor" strokeWidth="1.5" />
          <polyline points="30,2 36,6 30,10" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>,
      );
    }
  });

  return (
    <div className="glass-panel p-6">
      <p className="section-label">Architecture</p>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-3">{items}</div>
      <p className="mt-5 text-sm leading-6 text-slate-600">{caption}</p>
    </div>
  );
}
