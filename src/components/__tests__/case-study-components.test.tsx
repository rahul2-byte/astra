import { render, screen } from "@testing-library/react";
import { StackPill } from "@/components/case-study/stack-pill";

describe("StackPill", () => {
  it("renders the stack label inside a rounded chip", () => {
    render(<StackPill>FastAPI</StackPill>);
    const pill = screen.getByText("FastAPI");
    expect(pill).toBeInTheDocument();
    expect(pill.className).toMatch(/rounded/);
    expect(pill.className).toMatch(/border/);
  });
});
