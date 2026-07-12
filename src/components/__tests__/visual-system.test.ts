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
    const nextConfig = readFileSync(join(process.cwd(), "next.config.ts"), "utf8");
    const robots = readSource("app/robots.ts");
    const sitemap = readSource("app/sitemap.ts");
    const currentYear = readSource("components/current-year.tsx");
    const home = readSource("components/home-sections.tsx");
    const homeHero = readSource("components/home/home-hero.tsx");
    const expertise = readSource("components/home/expertise-grid.tsx");
    const experience = readSource("app/experience/page.tsx");
    const projects = readSource("app/projects/page.tsx");
    const movieArticle = readSource("components/project-article/project-article-layout.tsx");
    const resume = readSource("app/resume/page.tsx");
    const contact = readSource("app/contact/page.tsx");
    const footer = readSource("components/footer.tsx");
    const allApplicationSource = readApplicationSource();
    const packageJson = JSON.parse(readFileSync(join(process.cwd(), "package.json"), "utf8")) as { name: string };

    expect(packageJson).toHaveProperty("name", "rahul-ml-portfolio");
    expect(nextConfig).toContain("productionBrowserSourceMaps: false");
    expect(nextConfig).toContain("Content-Security-Policy");
    expect(nextConfig).toContain("X-Frame-Options");
    expect(nextConfig).toContain("X-Content-Type-Options");
    expect(nextConfig).toContain("Referrer-Policy");
    expect(nextConfig).toContain("Strict-Transport-Security");
    expect(nextConfig).toContain("Cross-Origin-Opener-Policy");
    expect(nextConfig).toContain("Cross-Origin-Resource-Policy");
    expect(existsSync(join(sourceRoot, "components/icon.tsx"))).toBe(false);
    expect(existsSync(join(sourceRoot, "components/project-card.tsx"))).toBe(false);
    expect(existsSync(join(sourceRoot, "components/case-study/case-study-page.tsx"))).toBe(false);
    expect(existsSync(join(sourceRoot, "mdx-components.tsx"))).toBe(false);
    expect(existsSync(join(sourceRoot, "content/projects.ts"))).toBe(false);
    expect(existsSync(join(sourceRoot, "content/skills.ts"))).toBe(false);
    expect(globals).toContain("--primary: #ffd43b");
    expect(globals).toContain("--bar-inactive: #aaa79d");
    expect(globals).toContain("--cta-background: #171711");
    expect(globals).toContain("--motion-fast: 160ms");
    expect(globals).toContain("--motion-enter: 380ms");
    expect(globals).toContain("--ease-enter");
    expect(home).toContain("SectionReveal");
    expect(globals).toContain(".surface-card-interactive:focus-within");
    expect(globals).toContain(".surface-card,\n.surface-card-interactive");
    expect(globals).toContain(".surface-card-interactive {\n  transition:");
    expect(globals).toContain(".btn-primary:active");
    expect(globals).toContain(".nav-link[aria-current=\"page\"]");
    expect(globals).toContain("--font-display");
    expect(globals).toContain("--font-mono");
    expect(globals).toContain("max-width: 1280px");
    expect(globals).toContain("prefers-reduced-motion");
    expect(globals).toContain("@media print");
    expect(layout).toContain("Space_Grotesk");
    expect(layout).toContain("IBM_Plex_Mono");
    expect(layout).toContain("metadataBase");
    expect(robots).toContain("MetadataRoute.Robots");
    expect(sitemap).toContain("MetadataRoute.Sitemap");
    expect(currentYear).toContain("suppressHydrationWarning");
    expect(home).toContain("@/components/home/home-hero");
    expect(home).toContain("@/components/home/featured-projects");
    expect(home).toContain("@/components/home/contact-cta");
    expect(home).not.toContain("from \"lucide-react\"");
    expect(homeHero).toContain("hero-viewport");
    expect(homeHero).toContain("metric-strip-item");
    expect(expertise).toContain("expertise-card");
    expect(expertise).toContain("expertise-capabilities");
    expect(experience).toContain("content-fit-grid");
    expect(experience).toContain("SectionReveal");
    expect(projects).toContain("supporting-project-grid");
    expect(projects).toContain("SectionReveal");
    expect(projects).not.toContain("lg:grid-cols-[1.15fr_0.85fr]");
    expect(movieArticle).toContain("section-shell");
    expect(movieArticle).toContain('aria-label="On this page"');
    expect(movieArticle).toContain("noopener noreferrer");
    expect(resume).toContain("surface-card");
    expect(resume).toContain("Download");
    expect(contact).toContain("Mail");
    expect(contact).toContain("Github");
    expect(contact).toContain("Linkedin");
    expect(contact).toContain("SectionReveal");
    expect(footer).toContain("Recruiter-focused ML portfolio");
    expect(footer).toContain("CurrentYear");
    expect(allApplicationSource).not.toMatch(/#4f7fb8|#2f5ea4|bg-blue-|bg-emerald-/i);
  });
});
