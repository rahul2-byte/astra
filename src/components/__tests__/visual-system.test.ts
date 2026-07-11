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
    expect(home).toContain("font-display");
    expect(home).toContain("technical-grid");
    expect(home).toContain("surface-card");
    expect(home).toContain("status-badge");
    expect(home).toContain("from \"lucide-react\"");
    expect(home).toContain("MapPin");
    expect(home).toContain("Target");
    expect(home).toContain("Layers");
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
