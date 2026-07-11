import type { ReactNode } from "react";

export function StackPill({ children }: { children: ReactNode }) {
  return <span className="stack-pill">{children}</span>;
}
