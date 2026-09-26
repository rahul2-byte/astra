import { render, screen } from "@testing-library/react";
import Home from "@/app/page";
import { site, techStack } from "@/content/site";
import { metadata } from "@/app/page";

describe("home page", () => {
  it("introduces Rahul and includes his Intangles experience on the homepage", () => {
    render(<Home />);

    expect(screen.getByRole("heading", { level: 1, name: /hi, i’m rahul/i })).toBeInTheDocument();
    expect(screen.getByText(/machine learning engineer at intangles/i)).toBeInTheDocument();
    expect(screen.getByText(/noisy vehicle telemetry at intangles.*financial research, recommendations/i)).toBeInTheDocument();
    expect(screen.getByRole("region", { name: /experience at intangles/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /download résumé/i })).toHaveAttribute("href", site.resume);
    expect(screen.getByRole("link", { name: /download résumé/i })).toHaveAttribute("download", "Rahul-Singh-Resume.pdf");
    expect(screen.getByRole("link", { name: /rahulchand4299@gmail\.com/ })).toHaveAttribute("href", `mailto:${site.email}`);
    expect(screen.getByRole("link", { name: /9027537314/ })).toHaveAttribute("href", site.phoneHref);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /technologies i work with/i })).toBeInTheDocument();
    for (const technology of techStack) expect(screen.getByText(technology)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /personal projects/i })).toBeInTheDocument();
    expect(screen.getByRole("main").textContent).toMatch(/Experience[\s\S]*Technologies I work with[\s\S]*Personal projects/);
    expect(screen.getByRole("link", { name: /fin-ai/i })).toHaveAttribute("href", "/projects#fin-ai");
    expect(screen.getByRole("link", { name: /lora reproduction/i })).toHaveAttribute("href", "/projects#lora-reproduction");
    expect(screen.getByRole("link", { name: /movie recommendation system/i })).toHaveAttribute("href", "/projects#movie-recommendation-system");
    expect(screen.getByRole("link", { name: /view all project write-ups/i })).toHaveAttribute("href", "/projects");
    expect(screen.getByRole("link", { name: /linkedin/i })).toHaveAttribute("href", site.linkedin);
    expect(screen.getByRole("link", { name: /github/i })).toHaveAttribute("href", site.github);
    expect(screen.queryByText(/spec tag recommender/i)).not.toBeInTheDocument();
  });

  it("publishes concise, current homepage metadata", () => {
    expect(metadata.title).toBe("Rahul Singh | Machine Learning Engineer at Intangles");
    expect(metadata.description).toMatch(/works with vehicle telemetry.*financial research/i);
  });
});
