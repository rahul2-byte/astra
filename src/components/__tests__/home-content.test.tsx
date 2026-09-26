import { render, screen, within } from "@testing-library/react";
import Home from "@/app/page";
import { site } from "@/content/site";
import { technologyGroups } from "@/content/technologies";
import { projects } from "@/content/projects";
import { metadata } from "@/app/page";

describe("home page", () => {
  it("introduces Rahul and includes his Intangles experience on the homepage", () => {
    render(<Home />);

    expect(screen.getByRole("heading", { level: 1, name: /hi, i’m rahul/i })).toBeInTheDocument();
    expect(screen.getByText(/machine learning engineer at intangles/i)).toBeInTheDocument();
    expect(screen.getByText(/4\+ years.*production machine-learning systems.*vehicle telemetry.*financial research/i)).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Experience" })).toBeInTheDocument();
    expect(screen.getByText("15%")).toBeInTheDocument();
    expect(screen.getByText("±2%")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /download résumé/i })).toHaveAttribute("href", site.resume);
    expect(screen.getByRole("link", { name: /download résumé/i })).toHaveAttribute("download", "Rahul-Singh-Resume.pdf");
    expect(screen.getAllByRole("link", { name: /rahulchand4299@gmail\.com/ }).some((link) => link.getAttribute("href") === `mailto:${site.email}`)).toBe(true);
    expect(screen.getAllByRole("link", { name: /phone/i }).some((link) => link.getAttribute("href") === site.phoneHref)).toBe(true);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    const technologyIcons = document.querySelectorAll(".technology-icon");
    expect(technologyIcons.length).toBeGreaterThan(0);
    expect([...technologyIcons].every((icon) => icon.getAttribute("aria-hidden") === "true")).toBe(true);
    expect(screen.getByRole("heading", { name: /technical toolkit/i })).toBeInTheDocument();
    expect(screen.getByRole("main").textContent).not.toMatch(/LangGraph|pgvector|DBSCAN|LOESS|OBD telemetry|sub-threshold|small thefts|OBD\/CAN|LSTM/i);
    for (const group of technologyGroups) {
      expect(screen.getByRole("heading", { name: group.title, level: 3 })).toBeInTheDocument();
      for (const technology of group.items) expect(screen.getAllByText(technology.name).length).toBeGreaterThan(0);
    }
    expect(screen.getByRole("heading", { name: /independent projects/i })).toBeInTheDocument();
    expect(screen.getByRole("main").textContent).toMatch(/Experience[\s\S]*Technical toolkit[\s\S]*Independent projects/);
    for (const project of projects) {
      expect(screen.getByRole("heading", { name: project.title, level: 3 })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: `Read ${project.title} case study` })).toHaveAttribute("href", `/projects/${project.slug}`);
    }
    expect(screen.getByRole("link", { name: /browse all projects/i })).toHaveAttribute("href", "/projects");
    const socials = within(screen.getByRole("navigation", { name: "Social links" }));
    expect(socials.getByRole("link", { name: /linkedin/i })).toHaveAttribute("href", site.linkedin);
    expect(socials.getByRole("link", { name: /github/i })).toHaveAttribute("href", site.github);
    for (const project of projects) {
      const repositoryLink = screen.getByRole("link", { name: `View ${project.title} repository on GitHub` });
      expect(repositoryLink).toHaveAttribute("href", project.repository);
      expect(repositoryLink).toHaveAttribute("rel", "noopener noreferrer");
      expect(repositoryLink).toHaveAttribute("target", "_blank");
    }
    expect(screen.queryByText(/spec tag recommender/i)).not.toBeInTheDocument();
  });

  it("publishes concise, current homepage metadata", () => {
    expect(metadata.title).toBe("Rahul Singh | Machine Learning Engineer at Intangles");
    expect(metadata.description).toMatch(/works with vehicle telemetry.*financial research/i);
  });
});
