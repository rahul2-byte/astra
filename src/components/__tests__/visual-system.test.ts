import { readFileSync } from "node:fs";
import { join } from "node:path";

const read = (path: string) => readFileSync(join(process.cwd(), path), "utf8");

describe("reference-inspired visual system", () => {
  it("uses self-hosted display and body fonts with accessible motion states", () => {
    const css = read("src/app/globals.css");
    const layout = read("src/app/layout.tsx");

    expect(css).toContain("--paper: #fbfcff");
    expect(css).toContain("--accent: #3157c8");
    expect(css).toContain("--font-display-stack");
    expect(css).toContain("prefers-reduced-motion: reduce");
    expect(css).toContain("forced-colors: active");
    expect(layout).toContain("next/font/google");
    expect(layout).toContain("skip-link");
  });

  it("keeps the profile introduction visible without entrance animation", () => {
    const home = read("src/components/home-page.tsx");
    expect(home).not.toMatch(/SectionReveal|framer-motion|animate-/);
    expect(home).toContain("Hi, I’m Rahul.");
    expect(home).toContain("Intangles");
  });
});
