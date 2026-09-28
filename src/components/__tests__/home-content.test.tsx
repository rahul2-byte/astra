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
    expect(screen.getByText(/applied ai \/ machine learning engineer at intangles/i)).toBeInTheDocument();
    expect(screen.getByText(/4\+ years.*production vehicle-telemetry models.*internal RAG recommender/i)).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Experience" })).toBeInTheDocument();
    expect(screen.getByText("150,000")).toBeInTheDocument();
    expect(screen.getByText("530,000")).toBeInTheDocument();
    expect(screen.getByText(/97% of about 10,500 first requests over three months/i)).toBeInTheDocument();
    expect(screen.getByText(/cut monthly theft alerts from 7,500 to 6,375 \(15%\)/i)).toBeInTheDocument();
    expect(screen.getByText(/within ±5% per eligible event/i)).toBeInTheDocument();
    expect(screen.getByText(/Monitored Fuel Analytics and Spec Tag production releases/i)).toBeInTheDocument();
    expect(screen.getByText(/Debugged production releases using OpenTelemetry traces/i)).toBeInTheDocument();
    const workstreams = screen.getByRole("article", { name: "Machine Learning Engineer at Intangles" }).querySelectorAll(".experience-workstreams > li");
    expect(workstreams.length).toBeGreaterThan(0);
    expect([...workstreams].every((workstream) => workstream.querySelectorAll(".experience-points > li").length === 2)).toBe(true);
    expect(screen.getByRole("heading", { name: "Education" })).toBeInTheDocument();
    expect(screen.getByText("Government Polytechnic Kashipur")).toBeInTheDocument();
    expect(screen.getByText("Diploma in Computer Science and Engineering · Uttarakhand, India")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /download resume/i })).toHaveAttribute("href", site.resume);
    expect(screen.getByRole("link", { name: /download resume/i })).toHaveAttribute("download", "Rahul-Singh-Resume.pdf");
    expect(screen.getAllByRole("link", { name: /rahulchand4299@gmail\.com/ }).some((link) => link.getAttribute("href") === `mailto:${site.email}`)).toBe(true);
    expect(screen.getAllByRole("link", { name: /phone/i }).some((link) => link.getAttribute("href") === site.phoneHref)).toBe(true);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(document.querySelector(".technology-item")).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Skills & tools" })).toBeInTheDocument();
    expect(screen.getByRole("main").textContent).toMatch(/LangGraph|pgvector|DBSCAN|LOESS|OBD telemetry|sub-threshold|OBD\/CAN|LSTM/i);
    for (const group of technologyGroups) {
      expect(screen.getByRole("heading", { name: group.title, level: 3 })).toBeInTheDocument();
      expect(screen.getByText(group.items.map(({ name }) => name).join(" · "))).toBeInTheDocument();
    }
    expect(screen.getByRole("heading", { name: /independent projects/i })).toBeInTheDocument();
    expect(screen.getByRole("main").textContent).toMatch(/Experience[\s\S]*Skills & tools[\s\S]*Independent projects[\s\S]*Education/);
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
    expect(screen.getByRole("heading", { name: /spec tag recommender/i })).toBeInTheDocument();
  });

  it("publishes concise, current homepage metadata", () => {
    expect(metadata.title).toBe("Rahul Singh | Applied AI / Machine Learning Engineer at Intangles");
    expect(metadata.description).toMatch(/4\+ years.*vehicle-telemetry models.*financial research agent/i);
  });
});
