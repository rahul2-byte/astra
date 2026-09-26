import { render, screen, within } from "@testing-library/react";
import Home from "@/app/page";
import ProjectsPage from "@/app/projects/page";
import NotFound from "@/app/not-found";
import sitemap from "@/app/sitemap";
import { projects } from "@/content/projects";

describe("site structure", () => {
  it("keeps the introduction and Intangles experience on the home page", () => {
    render(<Home />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/hi, i’m rahul/i);
    expect(screen.getByRole("region", { name: /experience at intangles/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /fuel event detection/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /vehicle-tag suggestions/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /ev coolant estimates/i })).toBeInTheDocument();
  });

  it("keeps every project write-up on the single Projects page", () => {
    render(<ProjectsPage />);
    expect(screen.getByRole("heading", { name: /^my projects\.$/i, level: 1 })).toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(3);

    for (const project of projects) {
      const article = screen.getByRole("article", { name: project.title });
      expect(article).toHaveAttribute("id", project.slug);
      expect(within(article).getByRole("heading", { name: project.title, level: 2 })).toBeInTheDocument();
      expect(screen.getByRole("navigation", { name: /project sections/i }).querySelector(`a[href="#${project.slug}"]`)).toBeInTheDocument();
    }
    const ids = [...document.querySelectorAll("#main-content [id]")].map((element) => element.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("offers a clear recovery path for unknown routes", () => {
    render(<NotFound />);
    expect(screen.getByRole("heading", { level: 1, name: /this page isn’t here/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /return home/i })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: /browse projects/i })).toHaveAttribute("href", "/projects");
  });

  it("publishes only the home and Projects pages in the sitemap", () => {
    expect(sitemap().map(({ url }) => url)).toEqual([
      "http://localhost:3000",
      "http://localhost:3000/projects",
    ]);
  });
});
