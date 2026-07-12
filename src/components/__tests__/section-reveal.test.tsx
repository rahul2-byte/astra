import { render, screen } from "@testing-library/react";
import { SectionReveal } from "@/components/motion/section-reveal";

describe("SectionReveal", () => {
  it("keeps its server-rendered content visible", () => {
    render(
      <SectionReveal>
        <p>Visible portfolio content</p>
      </SectionReveal>,
    );

    expect(screen.getByText("Visible portfolio content")).toBeVisible();
  });
});
