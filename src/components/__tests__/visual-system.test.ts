import { readFileSync } from "node:fs";
import { join } from "node:path";

const read = (path: string) => readFileSync(join(process.cwd(), path), "utf8");

describe("supplied visual system", () => {
  it("compiles the reference Tailwind tokens locally and retains accessible navigation", () => {
    const css = read("src/app/globals.css");
    const config = read("tailwind.config.cjs");
    const layout = read("src/app/layout.tsx");
    const csp = read("next.config.ts");

    expect(css).toContain("@tailwind utilities;");
    expect(css).toContain("::-webkit-scrollbar");
    expect(css).toContain("prefers-reduced-motion: reduce");
    expect(config).toContain('"canvas": "#fbfbfa"');
    expect(config).toContain('"primary": "#0037b0"');
    expect(config).toContain('"headline-xl":');
    expect(config).toContain("var(--font-body)");
    expect(config).toContain("JetBrains Mono");
    expect(layout).toContain("family=JetBrains+Mono");
    expect(layout).toContain("href=\"#main-content\"");
    expect(csp).toContain("https://fonts.googleapis.com");
    expect(csp).toContain("https://fonts.gstatic.com");
  });

  it("keeps the supplied homepage HTML as the content source", () => {
    const home = read("src/content/reference/home.html");
    expect(home).toContain("Hi, I’m Rahul.");
    expect(home).toContain("Technical toolkit");
    expect(home).toContain("Independent projects");
  });
});
