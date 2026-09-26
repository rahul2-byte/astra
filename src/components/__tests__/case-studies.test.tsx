import { fireEvent, render, screen, cleanup, within } from "@testing-library/react";
import { afterEach } from "vitest";
import ProjectsPage from "@/app/projects/page";
import { EvidenceTableScroll } from "@/components/evidence-table-scroll";

afterEach(cleanup);

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

  it("shows FIN-AI's architecture and evidence limits", () => {
    render(<ProjectsPage />);
    const article = screen.getByRole("article", { name: "FIN-AI" });

    expect(within(article).getByText(/command-line assistant for researching NSE and BSE stocks/i)).toBeInTheDocument();
    expect(within(article).getByText(/limited number of tool turns/i)).toBeInTheDocument();
    expect(within(article).queryByText(/LangGraph|pgvector|llama\.cpp|streaming chat/i)).not.toBeInTheDocument();
    expect(within(article).getByText(/no published evaluation of financial-answer accuracy/i)).toBeInTheDocument();
  });

  it("keeps LoRA's trade-off and validation limits visible", () => {
    render(<ProjectsPage />);
    const article = screen.getByRole("article", { name: "LoRA Reproduction" });

    expect(within(article).getByRole("img", { name: /scatter plots comparing trainable parameter counts/i })).toBeInTheDocument();
    expect(within(article).getByText(/rerun wall time against trainable parameter count/i)).toBeInTheDocument();
    expect(within(article).getByRole("cell", { name: /0\.6928 ± 0\.0086/i })).toBeInTheDocument();
    expect(within(article).getByRole("cell", { name: /0\.9281 ± 0\.0046/i })).toBeInTheDocument();
    expect(within(article).getByText(/scroll horizontally to see every column/i)).toBeInTheDocument();
    expect(within(article).getByText(/not official GLUE test scores/i)).toBeInTheDocument();
    expect(within(article).getByText(/base RoBERTa is still needed/i)).toBeInTheDocument();
  });

  it("shows movie metrics and their benchmark limits on the same page", () => {
    render(<ProjectsPage />);
    const article = screen.getByRole("article", { name: "Movie Recommendation System" });

    expect(within(article).getByRole("cell", { name: "0.281976" })).toBeInTheDocument();
    expect(within(article).getByText(/50 requests with five seed films/i)).toBeInTheDocument();
    expect(within(article).getByText(/Lambda cold starts, API Gateway, production throughput/i)).toBeInTheDocument();
    expect(within(article).getByRole("link", { name: /live demo/i })).toHaveAttribute("href", "https://movie-recommendation-system-phi-eight.vercel.app/");
  });
});
