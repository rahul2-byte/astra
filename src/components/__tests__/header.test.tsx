import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { Header } from "@/components/header";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("Header", () => {
  it("offers a direct desktop resume download", () => {
    render(<Header />);

    expect(screen.getByRole("link", { name: /download resume/i })).toHaveAttribute(
      "href",
      "/resume.pdf",
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

  it("marks the current navigation item", () => {
    render(<Header />);

    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("aria-current", "page");
  });

  it("closes mobile navigation with Escape", () => {
    render(<Header />);

    fireEvent.click(screen.getByRole("button", { name: /open navigation/i }));
    fireEvent.keyDown(window, { key: "Escape" });

    expect(screen.getByRole("button", { name: /open navigation/i })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });
});
