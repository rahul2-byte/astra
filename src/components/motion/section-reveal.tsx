"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
};

export function SectionReveal({ children, className }: SectionRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const hasRevealed = useRef(false);
  const reducedMotion = useReducedMotion();

  function reveal() {
    if (reducedMotion || hasRevealed.current) return;

    const element = elementRef.current;
    if (!element?.animate) return;

    hasRevealed.current = true;
    element.animate(
      [
        { opacity: 0.92, transform: "translateY(var(--motion-distance-md))" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      {
        duration: 380,
        easing: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    );
  }

  return (
    <motion.div
      ref={elementRef}
      className={className ? `motion-reveal ${className}` : "motion-reveal"}
      initial={false}
      onViewportEnter={reveal}
      viewport={{ amount: 0.18, once: true }}
    >
      {children}
    </motion.div>
  );
}
