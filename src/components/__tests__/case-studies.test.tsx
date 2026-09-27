import { fireEvent, render, cleanup, within } from "@testing-library/react";
import { afterEach } from "vitest";
import ProjectDetailPage from "@/app/projects/[slug]/page";
import { EvidenceTableScroll } from "@/components/evidence-table-scroll";

afterEach(cleanup);

async function renderStudy(slug: string) {
  const { container } = render(await ProjectDetailPage({ params: Promise.resolve({ slug }) }));
  return within(container);
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

  it("renders the supplied FIN-AI architecture and constraints", async () => {
    const page = await renderStudy("fin-ai");

    expect(page.getByRole("heading", { level: 1, name: /FIN-AI: Bounded Model-and-Tool Financial Research Assistant/ })).toBeInTheDocument();
    expect(page.getByRole("heading", { name: /Bounded Tool-and-Model Pipeline Architecture/ })).toBeInTheDocument();
    expect(page.getByRole("heading", { name: /Practical Engineering Limitations/ })).toBeInTheDocument();
    expect(page.getByRole("link", { name: /previous case study/i })).toHaveAttribute("href", "/projects");
    expect(page.getByRole("link", { name: /next case study/i })).toHaveAttribute("href", "/projects/lora-reproduction");
  });

  it("renders the supplied LoRA results and limitations", async () => {
    const page = await renderStudy("lora-reproduction");

    expect(page.getByRole("heading", { level: 1, name: /LoRA Reproduction: Systematic Ablation on RoBERTa-base/ })).toBeInTheDocument();
    expect(page.getByRole("heading", { name: /Comparative Performance Matrix/ })).toBeInTheDocument();
    expect(page.getByText(/0\.6928 ± 0\.0086/)).toBeInTheDocument();
    expect(page.getByText(/not official withheld test server submissions/i)).toBeInTheDocument();
    expect(page.getByRole("link", { name: /previous project/i })).toHaveAttribute("href", "/projects/fin-ai");
    expect(page.getByRole("link", { name: /next project/i })).toHaveAttribute("href", "/projects/movie-recommendation-system");
  });

  it("renders the supplied movie retrieval and reranking study", async () => {
    const page = await renderStudy("movie-recommendation-system");

    expect(page.getAllByRole("main")[0].querySelector("script")).toBeNull();
    expect(page.getByRole("heading", { level: 1, name: /Multi-Stage Movie Recommendation System: Hybrid Retrieval & Reranking/ })).toBeInTheDocument();
    expect(page.getByRole("heading", { name: /4-Way Retrieval Funnel & Reciprocal Rank Fusion/ })).toBeInTheDocument();
    expect(page.getByRole("heading", { name: /LightGBM Reranking & 32 Cross-Features/ })).toBeInTheDocument();
    const evaluationTable = page.getByRole("region", { name: /evaluation & comparative analysis/i });
    fireEvent.keyDown(evaluationTable, { key: "ArrowRight" });
    expect(evaluationTable.scrollLeft).toBe(48);
    fireEvent.keyDown(evaluationTable, { key: "ArrowLeft" });
    expect(evaluationTable.scrollLeft).toBe(0);
    expect(page.getByRole("link", { name: /previous case study/i })).toHaveAttribute("href", "/projects/lora-reproduction");
    expect(page.getByRole("link", { name: /next case study/i })).toHaveAttribute("href", "/projects/fin-ai");
  });
});
