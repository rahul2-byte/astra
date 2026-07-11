import Link from "next/link";
import { ArrowUpRight, Network } from "lucide-react";
import type { Project } from "@/content/projects";
import { StackPill } from "@/components/case-study/stack-pill";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="surface-card-interactive relative flex h-full flex-col overflow-hidden p-7">
      <span className="absolute inset-x-0 top-0 h-1 bg-[var(--primary)]" />
      <p className="section-label flex items-center gap-2"><Network className="h-4 w-4" strokeWidth={1.7} />{project.category}</p>
      <h3 className="font-display mt-5 text-3xl font-semibold leading-tight tracking-[-0.04em] text-[var(--foreground)]">{project.title}</h3>
      <p className="mt-4 flex-1 leading-7 text-[var(--muted)]">{project.summary}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {project.stack.slice(0, 6).map((item) => (
          <StackPill key={item}>{item}</StackPill>
        ))}
      </div>
      <p className="mt-5 border-t soft-divider pt-5 text-sm leading-6 text-[var(--muted)]">{project.evidence}</p>
      <Link className="text-link mt-6" href={project.href}>
        View case study <ArrowUpRight className="link-arrow h-4 w-4" aria-hidden />
      </Link>
    </article>
  );
}
