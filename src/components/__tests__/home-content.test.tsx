import { render, screen, within } from "@testing-library/react";
import Home, { metadata } from "@/app/page";

describe("home page recruiter profile", () => {
  it("renders Rahul's identity, positioning, selected skills, and primary actions", () => {
    render(<Home />);

    expect(
      screen.getByText(/rahul singh · machine learning engineer · pune, india/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /i build reliable machine learning systems for noisy, real-world data/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/4\+ years of production experience building fuel analytics/i),
    ).toBeInTheDocument();
    const skills = screen.getByRole("list", { name: /selected technical skills/i });
    expect(within(skills).getByText(/^production ml$/i)).toBeInTheDocument();
    expect(within(skills).getByText(/^rag & ai agents$/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /view case studies/i })).toHaveAttribute(
      "href",
      "/projects",
    );
    expect(screen.getByRole("link", { name: /download resume/i })).toHaveAttribute(
      "href",
      "/resume.pdf",
    );
    expect(
      screen.getAllByRole("link", { name: /^contact me$/i }).some(
        (link) => link.getAttribute("href") === "/contact",
      ),
    ).toBe(true);
  });

  it("renders the complete recruiter information hierarchy and supported evidence", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { name: /production experience first\. applied ai depth next/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /core expertise/i })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /case studies grounded in implementation details/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /production ml at intangles/i })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /need the complete technical profile/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /open to machine learning and applied ai opportunities/i }),
    ).toBeInTheDocument();

    expect(screen.getByText(/portrait \/ verified/i)).toBeInTheDocument();
    expect(screen.getByText(/^rahul singh$/i)).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: /professional portrait of rahul singh/i }),
    ).toBeInTheDocument();
    expect(screen.getAllByText(/95%/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/15%/i).length).toBeGreaterThan(0);
    expect(
      screen.getByText(/support queries from approximately six to two per day/i),
    ).toBeInTheDocument();

    expect(screen.getByText(/production ml systems at intangles/i)).toBeInTheDocument();
    expect(screen.getByText(/^fin-ai$/i)).toBeInTheDocument();
    expect(screen.getByText(/^movie recommendation system$/i)).toBeInTheDocument();
    expect(screen.queryByText(/add final repository/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/earlier work \/ learning projects/i)).not.toBeInTheDocument();
  });

  it("connects experience, project, resume, and contact destinations explicitly", () => {
    render(<Home />);

    expect(screen.getByRole("link", { name: /view full experience/i })).toHaveAttribute(
      "href",
      "/experience",
    );
    expect(screen.getByRole("link", { name: /^view resume$/i })).toHaveAttribute(
      "href",
      "/resume",
    );
    expect(
      screen.getAllByRole("link", { name: /download resume|download pdf/i }).some(
        (link) => link.getAttribute("href") === "/resume.pdf",
      ),
    ).toBe(true);
    expect(screen.getByRole("link", { name: /view all projects/i })).toHaveAttribute(
      "href",
      "/projects",
    );
    expect(
      screen.getAllByRole("link", { name: /^contact me$/i }).some(
        (link) => link.getAttribute("href") === "/contact",
      ),
    ).toBe(true);
  });

  it("exports focused homepage metadata", () => {
    expect(metadata.title).toBe(
      "Rahul Singh — Machine Learning Engineer | Applied AI | LLM/RAG Systems",
    );
    expect(metadata.description).toMatch(/4\+ years of production experience/i);
    expect(metadata.openGraph).toMatchObject({
      title: "Rahul Singh — Machine Learning Engineer | Applied AI | LLM/RAG Systems",
    });
  });
});
