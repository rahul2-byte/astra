import { cleanup, render } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { AmbientMLBackground } from "./AmbientMLBackground";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

function renderAtWidth(width: number) {
  let seed = 1234567;
  vi.spyOn(Math, "random").mockImplementation(() => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 0x1_0000_0000;
  });
  vi.stubGlobal("innerWidth", width);
  vi.stubGlobal("innerHeight", 600);
  vi.stubGlobal("matchMedia", () => ({ matches: false }));
  vi.stubGlobal("requestAnimationFrame", () => 1);
  vi.stubGlobal("cancelAnimationFrame", () => {});

  return render(<AmbientMLBackground />).container;
}

it("places all 75 ambient elements on desktop", () => {
  const container = renderAtWidth(1200);
  const visible = [...container.querySelectorAll<HTMLElement>(".ambient-event")]
    .filter((element) => element.style.visibility === "visible");

  expect(visible).toHaveLength(75);
});

it("reduces the active ambient elements on mobile", () => {
  const container = renderAtWidth(390);
  const visible = [...container.querySelectorAll<HTMLElement>(".ambient-event")]
    .filter((element) => element.style.visibility === "visible");

  expect(visible).toHaveLength(8);
});
