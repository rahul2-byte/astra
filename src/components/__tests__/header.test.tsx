import { render, screen, within } from "@testing-library/react";
import { Header } from "@/components/header";

describe("site navigation", () => {
  it("links to the portfolio sections and project index", () => {
    render(<Header />);
    const navigation = screen.getByRole("navigation", { name: /main navigation/i });

    expect(within(navigation).getByRole("link", { name: "About" })).toHaveAttribute("href", "/#about");
    expect(within(navigation).getByRole("link", { name: "Experience" })).toHaveAttribute("href", "/#experience");
    expect(within(navigation).getByRole("link", { name: "Skills" })).toHaveAttribute("href", "/#skills");
    expect(within(navigation).getByRole("link", { name: "Projects" })).toHaveAttribute("href", "/#projects");
    expect(within(navigation).queryByRole("link", { name: "Case Studies" })).not.toBeInTheDocument();
    expect(within(navigation).getByRole("link", { name: "Contact" })).toHaveAttribute("href", "/#contact");
  });
});
