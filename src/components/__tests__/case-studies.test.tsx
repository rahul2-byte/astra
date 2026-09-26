import { fireEvent, render, screen, cleanup, within } from "@testing-library/react";
import { afterEach } from "vitest";
import ProjectDetailPage from "@/app/projects/[slug]/page";
import { EvidenceTableScroll } from "@/components/evidence-table-scroll";
import { projects } from "@/content/projects";

afterEach(cleanup);

async function renderStudy(slug: string) {
  render(await ProjectDetailPage({ params: Promise.resolve({ slug }) }));
  const project = projects.find(({ slug: projectSlug }) => projectSlug === slug);
  if (!project) throw new Error(`Missing test project: ${slug}`);
  return within(screen.getByRole("article", { name: project.title }));
}

describe("project write-ups", () => {
  it("scrolls evidence tables with the arrow keys and labels each hint", () => {
    const { getByRole } = render(
      <EvidenceTableScroll title="Test project" hintId="table-hint">
        <p id="table-hint">Scroll to see all columns.</p>
        <table><tbody><tr><td>Evidence</td></tr></tbody></table>
      </EvidenceTableScroll>,
    );
    const region = getByRole("region", { name: /test project evidence table/i });

    expect(region).toHaveAttribute("aria-describedby", "table-hint");
    fireEvent.keyDown(region, { key: "ArrowRight" });
    expect(region.scrollLeft).toBe(48);
    fireEvent.keyDown(region, { key: "ArrowLeft" });
    expect(region.scrollLeft).toBe(0);
  });

  it("shows FIN-AI's architecture and evidence limits on its own page", async () => {
    const article = await renderStudy("fin-ai");

    expect(article.getByRole("heading", { level: 1, name: "FIN-AI" })).toBeInTheDocument();
    expect(article.getByText(/command-line assistant for researching NSE and BSE stocks/i)).toBeInTheDocument();
    expect(article.getByText(/limited number of model\/tool turns/i)).toBeInTheDocument();
    expect(article.queryByText(/LangGraph|pgvector|llama\.cpp|streaming chat/i)).not.toBeInTheDocument();
    expect(article.getByText(/no published evaluation of financial-answer accuracy/i)).toBeInTheDocument();
  });

  it("keeps LoRA's trade-off and validation limits on its own page", async () => {
    const article = await renderStudy("lora-reproduction");

    expect(article.getByRole("heading", { level: 1, name: "LoRA Reproduction" })).toBeInTheDocument();
    expect(article.getByRole("img", { name: /scatter plots comparing trainable parameter counts/i })).toBeInTheDocument();
    expect(article.getByRole("cell", { name: /0\.6928 ± 0\.0086/i })).toBeInTheDocument();
    expect(article.getByRole("cell", { name: /0\.9281 ± 0\.0046/i })).toBeInTheDocument();
    expect(article.getByText(/scroll horizontally to see every column/i)).toBeInTheDocument();
    expect(article.getByText(/not official GLUE test scores/i)).toBeInTheDocument();
    expect(article.getByText(/base RoBERTa is still needed/i)).toBeInTheDocument();
  });

  it("shows movie metrics and benchmark limits on its own page", async () => {
    const article = await renderStudy("movie-recommendation-system");

    expect(article.getByRole("heading", { level: 1, name: "Movie Recommendation System" })).toBeInTheDocument();
    expect(article.getByRole("cell", { name: "0.281976" })).toBeInTheDocument();
    expect(article.getByText(/sent 50 requests with five seed films/i)).toBeInTheDocument();
    expect(article.getByText(/Lambda cold starts, API Gateway, production throughput/i)).toBeInTheDocument();
    expect(article.getByRole("link", { name: /live demo/i })).toHaveAttribute("href", "https://movie-recommendation-system-phi-eight.vercel.app/");
  });
});
