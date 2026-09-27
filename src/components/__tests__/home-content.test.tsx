import { render, screen, within } from "@testing-library/react";
import Home from "@/app/page";
import { site } from "@/content/site";
import { projects } from "@/content/projects";
import { metadata } from "@/app/page";

describe("home page", () => {
  it("uses the supplied portfolio content and working links", () => {
    render(<Home />);
    const main = screen.getByRole("main");

    expect(within(main).getByRole("heading", { level: 1, name: /hi, i’m rahul/i })).toBeInTheDocument();
    expect(within(main).getByText(/machine learning engineer at intangles/i)).toBeInTheDocument();
    expect(within(main).getByText(/4\+ years.*production ML systems.*vehicle telemetry.*financial research/i)).toBeInTheDocument();
    expect(within(main).getByRole("heading", { name: "Experience" })).toBeInTheDocument();
    expect(within(main).getByText("15%")).toBeInTheDocument();
    expect(within(main).getByText("±2%")).toBeInTheDocument();
    expect(within(main).getByRole("heading", { name: "Technical toolkit" })).toBeInTheDocument();
    expect(within(main).getByText("Python · SQL · PostgreSQL · RabbitMQ")).toBeInTheDocument();
    expect(main.querySelector("#skills .bg-surface, #skills .bg-surface-container-low")).toBeNull();
    expect(within(main).getByRole("heading", { name: "Independent projects" })).toBeInTheDocument();
    expect(screen.getAllByRole("link").some((link) => link.getAttribute("href") === site.resume)).toBe(true);
    expect(screen.getAllByRole("link").some((link) => link.getAttribute("href") === `mailto:${site.email}`)).toBe(true);
    expect(screen.getAllByRole("link").some((link) => link.getAttribute("href") === site.phoneHref)).toBe(true);
    expect(screen.getByRole("link", { name: "GitHub Profile" })).toHaveAttribute("href", site.github);
    expect(screen.getByRole("link", { name: "LinkedIn Profile" })).toHaveAttribute("href", site.linkedin);

    const caseStudyLinks = within(main).getAllByRole("link", { name: /case study/i });
    expect(caseStudyLinks).toHaveLength(projects.length);
    projects.forEach((project, index) => {
      expect(caseStudyLinks[index]).toHaveAttribute("href", `/projects/${project.slug}`);
    });
  });

  it("publishes concise, current homepage metadata", () => {
    expect(metadata.title).toBe("Rahul Singh | Machine Learning Engineer at Intangles");
    expect(metadata.description).toMatch(/4\+ years.*vehicle telemetry.*financial research/i);
  });
});
