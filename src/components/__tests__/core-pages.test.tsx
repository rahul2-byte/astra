import { render, screen, within } from "@testing-library/react";
import Home from "@/app/page";
import ProjectsPage from "@/app/projects/page";
import ProjectDetailPage, { generateStaticParams } from "@/app/projects/[slug]/page";
import NotFound from "@/app/not-found";
import sitemap from "@/app/sitemap";
import { projects } from "@/content/projects";

describe("site structure", () => {
  it("renders the supplied homepage and its experience content", () => {
    render(<Home />);
    const main = screen.getByRole("main");

    expect(main.querySelector("h1")?.textContent).not.toContain("\u00a0");
    expect(["about", "experience", "skills", "projects", "contact"].every((id) => main.querySelector(`#${id}`))).toBe(true);
    expect(within(main).getByRole("heading", { level: 1, name: /hi, i’m rahul/i })).toBeInTheDocument();
    expect(main.querySelector('a[href="#"]')).toBeNull();
    expect(within(main).getByRole("heading", { name: "Experience" })).toBeInTheDocument();
    expect(within(main).getByRole("heading", { name: /fuel event detection/i })).toBeInTheDocument();
    expect(within(main).getByRole("heading", { name: /vehicle-tag recommendations/i })).toBeInTheDocument();
    expect(within(main).getByRole("heading", { name: /ev coolant estimates/i })).toBeInTheDocument();
  });

  it("lists the supplied projects with working case-study and repository links", () => {
    render(<ProjectsPage />);
    const main = screen.getByRole("main");
    expect(within(main).getByRole("heading", { name: /independent projects & applied ml case studies/i, level: 1 })).toBeInTheDocument();
    expect(main.querySelector('a[href="#"]')).toBeNull();
    expect(main.querySelector("script")).toBeNull();
    expect(main.querySelector("#filter-container")).toBeNull();

    const caseStudyLinks = within(main).getAllByRole("link", { name: /case study/i });
    expect(caseStudyLinks).toHaveLength(projects.length);
    const cards = [...main.querySelectorAll<HTMLElement>(".project-card")];
    expect(cards).toHaveLength(projects.length);
    projects.forEach((project, index) => {
      expect(caseStudyLinks[index]).toHaveAttribute("href", `/projects/${project.slug}`);
      expect(within(main).getAllByText(project.title, { exact: false }).length).toBeGreaterThan(0);
      expect(within(main).getAllByRole("link").some((link) => link.getAttribute("href") === project.repository)).toBe(true);
    });
  });

  it("pre-renders the supplied case study for every existing project route", async () => {
    expect(generateStaticParams()).toEqual(projects.map(({ slug }) => ({ slug })));

    const headings = [
      ["fin-ai", /FIN-AI: Bounded Model-and-Tool Financial Research Assistant/],
      ["lora-reproduction", /LoRA Reproduction: Systematic Ablation on RoBERTa-base/],
      ["movie-recommendation-system", /Multi-Stage Movie Recommendation System: Hybrid Retrieval & Reranking/],
    ] as const;
    for (const [slug, heading] of headings) {
      const { container } = render(await ProjectDetailPage({ params: Promise.resolve({ slug }) }));
      expect(within(container).getByRole("heading", { level: 1, name: heading })).toBeInTheDocument();
      expect(within(container).getAllByRole("main")).toHaveLength(1);
      expect(container.querySelector('a[href="#"]')).toBeNull();
      expect(within(container).getByRole("navigation", { name: /breadcrumb/i })).toBeInTheDocument();
    }
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
