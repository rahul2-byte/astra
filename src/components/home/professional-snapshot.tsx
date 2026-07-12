import { BriefcaseBusiness, Target } from "lucide-react";

const roleFocus = [
  "Machine Learning Engineer",
  "Applied AI Engineer",
  "LLM / RAG Engineer",
  "Data Scientist",
];

export function ProfessionalSnapshot() {
  return (
    <section className="section-shell py-20 md:py-28" aria-labelledby="professional-snapshot-title">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div>
          <p className="section-label">Professional snapshot</p>
          <h2 id="professional-snapshot-title" className="font-display mt-5 text-4xl font-semibold leading-[1.04] tracking-[-0.055em] md:text-5xl">
            Production experience first. Applied AI depth next.
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-[1fr_0.72fr]">
          <div className="border-l-4 border-l-[var(--primary)] pl-6 text-lg leading-8 text-[var(--muted)]">
            <p>
              I work on machine learning problems where real-world data is noisy, incomplete, and operationally
              important. At Intangles, I have built and improved systems for fuel-event detection, telemetry data
              loss, signal smoothing, and analytics reliability.
            </p>
            <p className="mt-5">
              Alongside production work, I build applied AI and recommendation projects that show how I design
              retrieval pipelines, multi-stage workflows, backend APIs, and deployed ML systems.
            </p>
          </div>
          <aside className="surface-card p-6">
            <div className="flex items-center justify-between border-b soft-divider pb-4">
              <span className="font-technical text-[0.65rem] uppercase tracking-wider text-[var(--muted)]">Role focus</span>
              <Target className="h-5 w-5" strokeWidth={1.6} aria-hidden />
            </div>
            <ul className="mt-4 divide-y divide-[var(--section-divider)]">
              {roleFocus.map((role) => (
                <li key={role} className="flex items-center gap-3 py-3 text-sm font-medium">
                  <BriefcaseBusiness className="h-4 w-4 text-[var(--primary-hover)]" aria-hidden />
                  {role}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
