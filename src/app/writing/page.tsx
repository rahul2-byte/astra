import Link from "next/link";
import { ArrowUpRight, FileText } from "lucide-react";

const categories = ["Production ML", "RAG systems", "Recommenders"];

export default function WritingPage() {
  return (
    <main className="section-shell py-16 md:py-24">
      <section className="surface-card technical-grid relative mx-auto max-w-5xl overflow-hidden p-7 md:p-12">
        <div className="signal-glow animate-signal pointer-events-none -right-20 -top-20 h-80 w-80" />
        <div className="relative grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div>
            <p className="section-label">Writing</p>
            <h1 className="font-display mt-5 text-5xl font-semibold leading-tight tracking-[-0.055em] md:text-6xl">Technical writing</h1>
            <p className="mt-6 max-w-2xl text-xl leading-8 text-[var(--muted)]">Technical notes and write-ups coming soon.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="btn-primary" href="/projects">Explore projects <ArrowUpRight className="link-arrow h-4 w-4" /></Link>
              <Link className="btn-secondary" href="/contact">Contact Rahul</Link>
            </div>
          </div>
          <aside className="border border-[var(--foreground)] bg-[var(--card)] p-6">
            <div className="flex items-center justify-between border-b soft-divider pb-5">
              <span className="font-technical text-xs font-semibold uppercase tracking-wider">Writing queue</span>
              <FileText className="h-5 w-5" />
            </div>
            <div className="divide-y divide-[var(--section-divider)]">
              {categories.map((category, index) => (
                <div key={category} className="flex items-center justify-between gap-4 py-5">
                  <span className="font-medium">{category}</span>
                  <span className="font-technical text-[0.65rem] uppercase tracking-wider text-[var(--muted)]">Soon / 0{index + 1}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
