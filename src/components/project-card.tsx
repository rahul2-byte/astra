import Link from "next/link";
import { Network } from "lucide-react";
import type { Project } from "@/content/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="glass-panel flex h-full flex-col p-7 transition hover:-translate-y-1 hover:shadow-[0_26px_80px_rgba(15,23,42,0.12)]">
      <p className="section-label flex items-center gap-2"><Network className="h-4 w-4" strokeWidth={1.7} />{project.category}</p>
      <h3 className="font-display mt-5 text-3xl font-bold leading-tight tracking-tight text-slate-900">{project.title}</h3>
      <p className="mt-4 flex-1 leading-7 text-slate-700">{project.summary}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {project.stack.slice(0, 6).map((item) => (
          <span key={item} className="rounded-sm border border-slate-300/80 bg-white/30 px-3 py-1 text-sm text-slate-700">
            {item}
          </span>
        ))}
      </div>
      <p className="mt-5 text-sm leading-6 text-slate-500">{project.evidence}</p>
      <Link className="mt-6 font-semibold text-[#2f5ea4] hover:text-slate-950" href={project.href}>
        View case study
      </Link>
    </article>
  );
}
