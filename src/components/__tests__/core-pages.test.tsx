import { render, screen } from "@testing-library/react";
import Home from "@/app/page";
import ProjectsPage from "@/app/projects/page";
import ProjectDetailPage, { generateStaticParams } from "@/app/projects/[slug]/page";
import NotFound from "@/app/not-found";
import sitemap from "@/app/sitemap";
import { projects } from "@/content/projects";

describe("site structure", () => {
  it("keeps the profile and Intangles experience on the home page", () => {
    render(<Home />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/hi, i’m rahul/i);
    expect(screen.getByRole("region", { name: "Experience" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /fuel event detection/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /vehicle-tag recommendations/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /ev coolant estimates/i })).toBeInTheDocument();
  });

  it("lists all projects and links each to its own case-study page", () => {
    render(<ProjectsPage />);
    expect(screen.getByRole("heading", { name: "Projects", level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("list", { name: /all projects/i }).querySelectorAll(":scope > li")).toHaveLength(projects.length);

    for (const project of projects) {
      expect(screen.getByRole("link", { name: project.title })).toHaveAttribute("href", `/projects/${project.slug}`);
      expect(screen.getByRole("link", { name: `Read ${project.title} case study` })).toHaveAttribute("href", `/projects/${project.slug}`);
      expect(screen.getByRole("link", { name: `View ${project.title} repository on GitHub` })).toHaveAttribute("href", project.repository);
    }
  });

  it("pre-renders one detailed page per project", async () => {
    expect(generateStaticParams()).toEqual(projects.map(({ slug }) => ({ slug })));

    render(await ProjectDetailPage({ params: Promise.resolve({ slug: "fin-ai" }) }));
    expect(screen.getByRole("heading", { level: 1, name: "FIN-AI" })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: /breadcrumb/i })).toHaveAttribute("aria-label", "Breadcrumb");
  });

  it("offers a clear recovery path for unknown routes", () => {
    render(<NotFound />);
    expect(screen.getByRole("heading", { level: 1, name: /this page isn’t here/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /return home/i })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: /browse projects/i })).toHaveAttribute("href", "/projects");
  });

  it("includes every public page in the sitemap", () => {
    expect(sitemap().map(({ url }) => url)).toEqual([
      "http://localhost:3000",
      "http://localhost:3000/projects",
      ...projects.map(({ slug }) => `http://localhost:3000/projects/${slug}`),
    ]);
  });
});
