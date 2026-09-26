import type { Metadata } from "next";
import { ProjectCaseStudy } from "@/components/project-case-study";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Rahul Singh's projects in financial research, LoRA fine-tuning, and movie recommendations.",
};

export default function ProjectsPage() {
  return (
    <main id="main-content" className="shell projects-page">
      <header className="page-intro">
        <h1>My projects.</h1>
        <p>Three projects from my own time: a financial research tool, a LoRA study, and a movie recommender. The write-ups include results and their limits.</p>
      </header>
      <nav className="project-index" aria-label="Project sections">
        {projects.map((project) => <a key={project.slug} href={`#${project.slug}`}>{project.title}</a>)}
      </nav>
      <div className="project-details">
        {projects.map((project) => <ProjectCaseStudy key={project.slug} project={project} />)}
      </div>
    </main>
  );
}
