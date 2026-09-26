import { render, screen, within } from "@testing-library/react";
import { Header } from "@/components/header";

describe("site navigation", () => {
  it("links only to the two main pages", () => {
    render(<Header />);
    const navigation = screen.getByRole("navigation", { name: /main navigation/i });

    expect(within(navigation).getByRole("link", { name: /home/i })).toHaveAttribute("href", "/");
    expect(within(navigation).getByRole("link", { name: /projects/i })).toHaveAttribute("href", "/projects");
    expect(within(navigation).getAllByRole("link")).toHaveLength(2);
  });
});
