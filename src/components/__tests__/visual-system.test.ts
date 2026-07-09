import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const sourceRoot = join(process.cwd(), "src");

function readSource(path: string) {
  return readFileSync(join(sourceRoot, path), "utf8");
}

describe("portfolio visual system", () => {
  it("uses the reference-style dotted grid, serif display type, and glass surface language", () => {
    const globals = readSource("app/globals.css");
    const home = readSource("components/home-sections.tsx");
    const projectCard = readSource("components/project-card.tsx");
    const resume = readSource("app/resume/page.tsx");
    const contact = readSource("app/contact/page.tsx");
    const footer = readSource("components/footer.tsx");
    const packageJson = JSON.parse(readFileSync(join(process.cwd(), "package.json"), "utf8")) as { name: string };

    expect(packageJson).toHaveProperty("name", "rahul-ml-portfolio");
    expect(existsSync(join(sourceRoot, "components/icon.tsx"))).toBe(false);
    expect(globals).toContain("radial-gradient");
    expect(globals).toContain("--font-display");
    expect(globals).toContain("max-width: 1280px");
    expect(home).toContain("font-display");
    expect(home).toContain("glass-panel");
    expect(home).toContain("status-badge");
    expect(home).toContain("from \"lucide-react\"");
    expect(home).toContain("MapPin");
    expect(home).toContain("Target");
    expect(home).toContain("Layers");
    expect(projectCard).toContain("glass-panel");
    expect(projectCard).toContain("Network");
    expect(resume).toContain("glass-panel");
    expect(resume).toContain("Download");
    expect(contact).toContain("Mail");
    expect(contact).toContain("Github");
    expect(contact).toContain("Linkedin");
    expect(home).not.toContain("border-y border-slate-950");
    expect(footer).toContain("Rahul Singh&apos;s ML portfolio");
  });
});
