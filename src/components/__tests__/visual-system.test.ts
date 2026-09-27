import { readFileSync } from "node:fs";
import { join } from "node:path";

const read = (path: string) => readFileSync(join(process.cwd(), path), "utf8");

describe("reference-inspired visual system", () => {
  it("uses self-hosted display and body fonts with accessible motion states", () => {
    const css = read("src/app/globals.css");
    const layout = read("src/app/layout.tsx");

    expect(css).toContain("--paper: #fbfcff");
    expect(css).toContain("--blue-primary: #2446ad");
    expect(css).toContain("--blue-secondary: #3157c8");
    expect(css).toContain("--blue-tertiary: #edf2ff");
    expect(css).toContain("--accent: var(--blue-secondary)");
    expect(css).toContain(".site-header { background: var(--blue-tertiary)");
    expect(css).toContain(".site-footer { padding-block: 1.5rem; border-top: 1px solid rgb(49 87 200 / 30%); background: var(--blue-primary)");
    expect(css).toContain("--font-display-stack");
    expect(css).not.toContain("text-transform: lowercase");
    expect(css).not.toContain("100vw - 100%");
    expect(css).toContain("prefers-reduced-motion: reduce");
    expect(css).toContain("forced-colors: active");
    expect(layout).toContain("next/font/google");
    expect(layout).toContain("skip-link");
  });

  it("keeps the previous profile introduction and Intangles experience", () => {
    const home = read("src/components/home-page.tsx");
    expect(home).toContain("Hi, I’m Rahul.");
    expect(home).toContain("Intangles");
  });
});
