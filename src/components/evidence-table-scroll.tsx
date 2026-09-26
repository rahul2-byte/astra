"use client";

import type { KeyboardEvent, ReactNode } from "react";

export function EvidenceTableScroll({ title, hintId, children }: { title: string; hintId?: string; children: ReactNode }) {
  function scrollWithArrowKeys(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.currentTarget.scrollLeft += event.key === "ArrowRight" ? 48 : -48;
    event.preventDefault();
  }

  return (
    <div
      className="evidence-table-wrap"
      role="region"
      aria-label={`${title} evidence table`}
      aria-describedby={hintId}
      tabIndex={0}
      onKeyDown={scrollWithArrowKeys}
    >
      {children}
    </div>
  );
}
