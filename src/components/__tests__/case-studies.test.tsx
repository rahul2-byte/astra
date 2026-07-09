import { render, screen } from "@testing-library/react";
import ProjectsPage from "@/app/projects/page";
import FinAiPage from "@/app/projects/fin-ai/page";
import MovieRecommendationPage from "@/app/projects/movie-recommendation-system/page";
import ProductionMlPage from "@/app/projects/production-ml-systems/page";

describe("research-note project pages", () => {
  it("renders the upgraded projects index with metrics and research-note links", () => {
    render(<ProjectsPage />);
    expect(screen.getByRole("heading", { name: /selected case studies/i })).toBeInTheDocument();
    expect(screen.getByText(/95%/i)).toBeInTheDocument();
    expect(screen.getByText(/4/i)).toBeInTheDocument();
    expect(screen.getByText(/50k\+/i)).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /open research note/i })).toHaveLength(3);
  });

  it("renders FIN-AI as a research-note case study", () => {
    render(<FinAiPage />);
    expect(screen.getByRole("heading", { name: /fin-ai — multi-agent financial intelligence/i })).toBeInTheDocument();
    expect(screen.getByText(/agents orchestrated/i)).toBeInTheDocument();
    expect(screen.getByText(/answer quality/i)).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /agent/i })).toBeInTheDocument();
  });

  it("renders Movie Recommendation with a trend chart and table", () => {
    render(<MovieRecommendationPage />);
    expect(screen.getByRole("heading", { name: /movie recommendation system/i })).toBeInTheDocument();
    expect(screen.getByText(/precision@10 over training iterations/i)).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /component/i })).toBeInTheDocument();
  });

  it("renders Production ML with resume-backed metrics", () => {
    render(<ProductionMlPage />);
    expect(screen.getByRole("heading", { name: /production ml systems — fuel event telemetry/i })).toBeInTheDocument();
    expect(screen.getByText(/alert accuracy maintained/i)).toBeInTheDocument();
    expect(screen.getByText(/support queries per day/i)).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /signal/i })).toBeInTheDocument();
  });
});
