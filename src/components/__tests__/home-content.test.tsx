import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("home page recruiter content", () => {
  it("renders Rahul's positioning, proof, featured work, and recruiter actions", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", {
        name: /machine learning engineer building practical ml, recommendation, and rag systems/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/4\+ years production experience/i)).toBeInTheDocument();
    expect(screen.getByText(/95% alert accuracy maintained/i)).toBeInTheDocument();
    expect(screen.getByText(/Production ML Systems at Intangles/i)).toBeInTheDocument();
    expect(screen.getByText(/FIN-AI/i)).toBeInTheDocument();
    expect(screen.getByText(/Movie Recommendation System/i)).toBeInTheDocument();
    expect(screen.getByText(/Production ML \/ Applied AI \/ Recommenders/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /view experience/i })).toHaveAttribute("href", "/experience");
    expect(screen.getByRole("link", { name: /contact rahul/i })).toHaveAttribute("href", "/contact");
    expect(screen.getAllByRole("link", { name: /view resume/i }).length).toBeGreaterThan(0);
    expect(
      screen.queryByRole("heading", {
        name: /recruiter-friendly portfolio, focused on real work/i,
      }),
    ).not.toBeInTheDocument();
  });
});
