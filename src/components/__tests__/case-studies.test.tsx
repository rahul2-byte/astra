import { render, screen } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import ProjectsPage from "@/app/projects/page";
import FinAiPage from "@/app/projects/fin-ai/page";
import MovieRecommendationPage from "@/app/projects/movie-recommendation-system/page";
import ProductionMlPage from "@/app/projects/production-ml-systems/page";

describe("research-note project pages", () => {
  it("renders the upgraded projects index with featured and supporting cards", () => {
    render(<ProjectsPage />);
    expect(screen.getByRole("heading", { name: /selected case studies/i })).toBeInTheDocument();
    expect(screen.getByText(/3 focused studies/i)).toBeInTheDocument();
    expect(screen.getByText(/Production ML Systems/i)).toBeInTheDocument();
    expect(screen.getByText(/Purpose/i)).toBeInTheDocument();
    expect(screen.getByText(/Role/i)).toBeInTheDocument();
    expect(screen.getByText(/FIN-AI/i)).toBeInTheDocument();
    expect(screen.getByText(/Movie Recommendation System/i)).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /open case study/i })).toHaveLength(3);
    expect(screen.queryByRole("link", { name: /github/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /live demo/i })).not.toBeInTheDocument();
  });

  it("renders FIN-AI as an evidence-led local-first case study", () => {
    render(<FinAiPage />);
    expect(screen.getByRole("heading", { name: /^fin-ai$/i })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: /on this page/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /local-first design shaped by a 6 gb rtx 4050/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /agent/i })).toBeInTheDocument();
    expect(screen.getByText(/no live deployment, formal accuracy benchmark, latency benchmark/i)).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /view source on github/i })[0]).toHaveAttribute(
      "href",
      "https://github.com/rahul2-byte/financial-analyst-system",
    );
  });

  it("renders Movie Recommendation as an evidence-led technical case study", () => {
    render(<MovieRecommendationPage />);
    expect(screen.getByRole("heading", { name: /movie recommendation system/i })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: /on this page/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /system overview/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /decision/i })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /open live demo/i })[0]).toHaveAttribute(
      "href",
      "https://movie-recommendation-system-phi-eight.vercel.app/",
    );
    expect(screen.getByText(/not yet connected to retrieval or ranking/i)).toBeInTheDocument();
    expect(screen.queryByText(/precision@10 over training iterations/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/120ms/i)).not.toBeInTheDocument();
  });

  it("keeps Movie Recommendation preview claims evidence-backed", () => {
    const movieContent = readFileSync(join(process.cwd(), "src/content/case-studies.ts"), "utf8");

    expect(movieContent).not.toMatch(/50k\+|120ms|Precision@10 over training iterations/);
    expect(movieContent).toContain('value: "13"');
  });

  it("renders Production ML as a public-safe evidence-led case study", () => {
    render(<ProductionMlPage />);
    expect(screen.getByRole("heading", { name: /production ml systems at intangles/i })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: /on this page/i })).toBeInTheDocument();
    expect(screen.getAllByText(/alert accuracy maintained/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/support queries from approximately six to two per day/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/customer names, fleet volumes, telemetry schemas/i)).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /signal or concern/i })).toBeInTheDocument();
  });
});
