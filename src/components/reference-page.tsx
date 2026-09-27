import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ReferenceInteractions } from "@/components/reference-interactions";

export type ReferencePageName = "home" | "projects" | "lora" | "fin-ai" | "movie";

const navPaths: Record<string, string> = {
  about: "/#about",
  experience: "/#experience",
  skills: "/#skills",
  projects: "/projects",
  contact: "/#contact",
};

const studyPaths: Record<Exclude<ReferencePageName, "home" | "projects">, [string, string]> = {
  "fin-ai": ["/projects", "/projects/lora-reproduction"],
  lora: ["/projects/fin-ai", "/projects/movie-recommendation-system"],
  movie: ["/projects/lora-reproduction", "/projects/fin-ai"],
};

export function ReferencePage({ name }: { name: ReferencePageName }) {
  const document = readFileSync(join(process.cwd(), "src/content/reference", `${name}.html`), "utf8");
  const body = document.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1];
  if (!body) throw new Error(`Reference page ${name} has no body`);
  let content = body.replace(/\u00a0/g, " ").replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
  if (name === "lora" || name === "movie") {
    content = content.replace(/<main class="lg:col-span-9 space-y-12">([\s\S]*?)<\/main>/, '<div class="lg:col-span-9 space-y-12">$1</div>');
  }

  const adjacentPaths = name === "home" || name === "projects" ? undefined : studyPaths[name];
  let html = content.replace(/(<a\b[^>]*data-path="projects"[^>]*href=")#"([^>]*>)([\s\S]*?)<\/a>/g, (match, prefix: string, suffix: string, contents: string) => {
    const label = contents.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
    const destination = label.includes("PREVIOUS") ? adjacentPaths?.[0] : label.includes("NEXT") ? adjacentPaths?.[1] : undefined;
    return destination ? `${prefix}${destination}"${suffix}${contents}</a>` : match;
  });
  html = html.replace(/(<a\b[^>]*data-path="([^"]+)"[^>]*href=")#"/g, (_match, prefix: string, path: string) =>
    `${prefix}${navPaths[path] ?? "/"}"`,
  );
  let projectCardIndex = 0;
  html = html.replace(/(<a\b[^>]*href=")#"([^>]*>)([\s\S]*?)<\/a>/g, (_match, prefix: string, suffix: string, contents: string) => {
    const label = contents.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
    let destination = "/";

    if (label.includes("Résumé")) destination = "/resume_updated_fin_ai.pdf";
    else if (/\bHome\b/.test(label)) destination = "/";
    else if (/\bProjects\b/.test(label)) destination = "/projects";
    else if (label.includes("Case Study")) {
      const projectSlugs = ["fin-ai", "lora-reproduction", "movie-recommendation-system"];
      destination = `/projects/${projectSlugs[Math.min(projectCardIndex++, projectSlugs.length - 1)]}`;
    } else if (label.includes("PREVIOUS")) destination = studyPaths[name as keyof typeof studyPaths]?.[0] ?? "/projects";
    else if (label.includes("NEXT")) destination = studyPaths[name as keyof typeof studyPaths]?.[1] ?? "/projects";

    return `${prefix}${destination}"${suffix}${contents}</a>`;
  });
  html = html.replace('<main class="w-full pt-16 flex-1 bg-canvas">', '<main id="main-content" class="w-full pt-16 flex-1 bg-canvas">');

  // The HTML is a trusted, static reference supplied for this site.
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <ReferenceInteractions name={name} />
    </>
  );
}
