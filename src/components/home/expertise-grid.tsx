import { Activity, Gauge, Network, ServerCog } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { expertiseAreas } from "@/content/home";
import type { ExpertiseArea } from "@/content/home";

const iconMap: Record<ExpertiseArea["iconName"], LucideIcon> = {
  Gauge,
  Activity,
  Network,
  ServerCog,
};

export function ExpertiseGrid() {
  return (
    <section className="section-tone py-20 md:py-28" aria-labelledby="expertise-title">
      <div className="section-shell">
        <div className="max-w-3xl">
          <p className="section-label">Technical capability</p>
          <h2 id="expertise-title" className="font-display mt-5 text-4xl font-semibold tracking-[-0.055em] md:text-5xl">
            Core expertise
          </h2>
          <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
            Production-backed strengths and applied-AI capabilities organized around the systems they support.
          </p>
        </div>

        <div className="mt-10 grid gap-px overflow-hidden border border-[var(--border)] bg-[var(--border)] md:grid-cols-2 xl:grid-cols-4">
          {expertiseAreas.map((area, index) => {
            const Icon = iconMap[area.iconName];
            return (
              <article key={area.title} className="bg-[var(--card)] p-6 md:p-7">
                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-11 w-11 place-items-center bg-[var(--primary)]">
                    <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden />
                  </span>
                  <span className="font-technical text-xs text-[var(--muted)]">0{index + 1}</span>
                </div>
                <h3 className="font-display mt-7 text-2xl font-semibold leading-tight tracking-[-0.04em]">{area.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{area.description}</p>
                <ul className="mt-6 space-y-2 border-t soft-divider pt-5 text-xs text-[var(--muted)]">
                  {area.capabilities.map((capability) => (
                    <li key={capability} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 bg-[var(--primary-hover)]" />{capability}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
