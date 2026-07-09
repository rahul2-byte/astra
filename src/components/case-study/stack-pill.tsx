import type { ReactNode } from "react";

export function StackPill({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-sm border border-slate-300/80 bg-white/40 px-3 py-1 text-sm font-medium text-slate-700">
      {children}
    </span>
  );
}
