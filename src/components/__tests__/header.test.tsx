import { fireEvent, render, screen } from "@testing-library/react";
import { Header } from "@/components/header";

describe("Header", () => {
  it("offers a direct desktop resume download", () => {
    render(<Header />);

    expect(screen.getByRole("link", { name: /download resume/i })).toHaveAttribute(
      "href",
      "/ML_Engineer_resume.pdf",
    );
  });

  it("opens and closes the mobile navigation", () => {
    render(<Header />);

    const trigger = screen.getByRole("button", { name: /open navigation/i });
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(trigger);

    expect(screen.getByRole("button", { name: /close navigation/i })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    expect(screen.getByRole("navigation", { name: /mobile navigation/i })).toBeInTheDocument();
  });
});
