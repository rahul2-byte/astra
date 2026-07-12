import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const sourceRoot = join(process.cwd(), "src");

function readSource(path: string) {
  return readFileSync(join(sourceRoot, path), "utf8");
}

function readApplicationSource(directory = sourceRoot): string {
  return readdirSync(directory)
    .map((entry) => join(directory, entry))
    .filter((path) => !path.includes("/__tests__/"))
    .map((path) => {
      if (statSync(path).isDirectory()) return readApplicationSource(path);
      return /\.(css|ts|tsx)$/.test(path) ? readFileSync(path, "utf8") : "";
    })
    .join("\n");
}

describe("portfolio visual system", () => {
  it("uses the Signal Grid token, typography, motion, and surface language", () => {
    const globals = readSource("app/globals.css");
    const layout = readSource("app/layout.tsx");
    const home = readSource("components/home-sections.tsx");
    const homeHero = readSource("components/home/home-hero.tsx");
    const expertise = readSource("components/home/expertise-grid.tsx");
    const experience = readSource("app/experience/page.tsx");
    const projects = readSource("app/projects/page.tsx");
    const movieArticle = readSource("components/project-article/project-article-layout.tsx");
    const projectCard = readSource("components/project-card.tsx");
    const resume = readSource("app/resume/page.tsx");
    const contact = readSource("app/contact/page.tsx");
    const footer = readSource("components/footer.tsx");
    const allApplicationSource = readApplicationSource();
    const packageJson = JSON.parse(readFileSync(join(process.cwd(), "package.json"), "utf8")) as { name: string };

    expect(packageJson).toHaveProperty("name", "rahul-ml-portfolio");
    expect(existsSync(join(sourceRoot, "components/icon.tsx"))).toBe(false);
    expect(globals).toContain("--primary: #ffd43b");
    expect(globals).toContain("--cta-background: #171711");
    expect(globals).toContain("--font-display");
    expect(globals).toContain("--font-mono");
    expect(globals).toContain("max-width: 1280px");
    expect(globals).toContain("prefers-reduced-motion");
    expect(globals).toContain("@media print");
    expect(layout).toContain("Space_Grotesk");
    expect(layout).toContain("IBM_Plex_Mono");
    expect(home).toContain("@/components/home/home-hero");
    expect(home).toContain("@/components/home/featured-projects");
    expect(home).toContain("@/components/home/contact-cta");
    expect(home).not.toContain("from \"lucide-react\"");
    expect(homeHero).toContain("hero-viewport");
    expect(homeHero).toContain("metric-strip-item");
    expect(expertise).toContain("expertise-card");
    expect(expertise).toContain("expertise-capabilities");
    expect(experience).toContain("content-fit-grid");
    expect(projects).toContain("supporting-project-grid");
    expect(projects).not.toContain("lg:grid-cols-[1.15fr_0.85fr]");
    expect(movieArticle).toContain("section-shell");
    expect(movieArticle).toContain('aria-label="On this page"');
    expect(movieArticle).toContain("noopener noreferrer");
    expect(projectCard).toContain("surface-card-interactive");
    expect(projectCard).toContain("Network");
    expect(resume).toContain("surface-card");
    expect(resume).toContain("Download");
    expect(contact).toContain("Mail");
    expect(contact).toContain("Github");
    expect(contact).toContain("Linkedin");
    expect(footer).toContain("Rahul Singh&apos;s ML portfolio");
    expect(allApplicationSource).not.toMatch(/#4f7fb8|#2f5ea4|bg-blue-|bg-emerald-/i);
  });
});
