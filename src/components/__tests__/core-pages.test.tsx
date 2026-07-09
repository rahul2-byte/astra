import { render, screen } from "@testing-library/react";
import ContactPage from "@/app/contact/page";
import ExperiencePage from "@/app/experience/page";
import ProjectsPage from "@/app/projects/page";
import ResumePage from "@/app/resume/page";
import WritingPage from "@/app/writing/page";

describe("core recruiter pages", () => {
  it("renders the detailed timeline experience page", () => {
    render(<ExperiencePage />);
    expect(
      screen.getByRole("heading", { name: /production ml, applied ai, and recommendation systems/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/machine learning engineer · intangles/i)).toBeInTheDocument();
    expect(screen.getByText(/dbscan \+ loess fuel event detection/i)).toBeInTheDocument();
    expect(screen.getByText(/sub-threshold fuel event detection/i)).toBeInTheDocument();
    expect(screen.getByText(/fin-ai · multi-agent financial intelligence/i)).toBeInTheDocument();
    expect(screen.getByText(/langgraph orchestrator/i)).toBeInTheDocument();
    expect(screen.getByText(/movie recommendation system/i)).toBeInTheDocument();
    expect(screen.getByText(/faiss candidate retrieval/i)).toBeInTheDocument();
    expect(screen.getAllByText(/95% alert accuracy/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/15% false-positive reduction/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/30\+ hrs\/week reclaimed/i).length).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: /open production ml case study/i })).toHaveAttribute(
      "href",
      "/projects/production-ml-systems",
    );
    expect(screen.getByRole("link", { name: /open fin-ai case study/i })).toHaveAttribute("href", "/projects/fin-ai");
    expect(screen.getByRole("link", { name: /open movie recommendation case study/i })).toHaveAttribute(
      "href",
      "/projects/movie-recommendation-system",
    );
  });

  it("renders the projects index with featured case studies", () => {
    render(<ProjectsPage />);
    expect(screen.getByRole("heading", { name: /selected case studies/i })).toBeInTheDocument();
    expect(screen.getByText(/FIN-AI/i)).toBeInTheDocument();
  });

  it("renders resume, contact, and writing utility pages", () => {
    render(<ResumePage />);
    expect(screen.getByRole("heading", { name: /^rahul singh$/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /experience/i })).toBeInTheDocument();

    render(<ContactPage />);
    expect(screen.getByRole("heading", { name: /get in touch/i })).toBeInTheDocument();

    render(<WritingPage />);
    expect(screen.getByText(/technical notes and write-ups coming soon/i)).toBeInTheDocument();
  });

  it("renders Rahul's final contact links and resume URL", () => {
    render(<ContactPage />);

    expect(screen.getByRole("link", { name: /email rahulchand4299@gmail\.com/i })).toHaveAttribute(
      "href",
      "mailto:rahulchand4299@gmail.com",
    );
    expect(
      screen.getByRole("link", { name: /linkedin linkedin\.com\/in\/-rahul-singh22/i }),
    ).toHaveAttribute("href", "https://www.linkedin.com/in/-rahul-singh22/");
    expect(screen.getByRole("link", { name: /github github\.com\/rahul2-byte/i })).toHaveAttribute(
      "href",
      "https://github.com/rahul2-byte",
    );
    expect(screen.getByRole("link", { name: /phone \+91 9027537314/i })).toHaveAttribute(
      "href",
      "tel:+919027537314",
    );
    expect(screen.queryByText(/best for:/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/for recruiter outreach, ml roles, ai\/rag opportunities/i)).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /download technical resume/i })).toHaveAttribute(
      "href",
      "/ML_Engineer_resume.pdf",
    );

    render(<ResumePage />);
    expect(screen.getAllByRole("link", { name: /download pdf/i }).length).toBeGreaterThan(0);
    expect(
      screen.getAllByRole("link", { name: /download pdf/i }).at(-1),
    ).toHaveAttribute("href", "/ML_Engineer_resume.pdf");
  });

  it("renders the resume with full content, skill groups, projects, and education", () => {
    render(<ResumePage />);

    expect(screen.getByRole("heading", { name: /^rahul singh$/i })).toBeInTheDocument();
    expect(screen.getByText(/machine learning engineer with 4\+ years of production experience/i)).toBeInTheDocument();

    expect(screen.getByRole("heading", { name: /skills/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /^programming$/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /^machine learning$/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /^llm\/rag$/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /^backend & cloud$/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /^mlops & observability$/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /^visualization$/i })).toBeInTheDocument();
    expect(screen.getAllByText(/lightgbm/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/langgraph/i).length).toBeGreaterThan(0);

    expect(screen.getByRole("heading", { name: /professional experience/i })).toBeInTheDocument();
    expect(screen.getByText(/april 2022 - present/i)).toBeInTheDocument();
    expect(screen.getByText(/intangles/i)).toBeInTheDocument();
    expect(screen.getByText(/95% alert accuracy/i)).toBeInTheDocument();
    expect(screen.getByText(/reclaiming 30\+ hours weekly/i)).toBeInTheDocument();

    expect(screen.getByRole("heading", { name: /personal projects/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /FIN-AI/i })).toHaveAttribute("href", "/projects/fin-ai");
    expect(screen.getByRole("link", { name: /movie recommendation system/i })).toHaveAttribute(
      "href",
      "/projects/movie-recommendation-system",
    );
    expect(screen.getByText(/freshness-aware rag pipeline/i)).toBeInTheDocument();
    expect(screen.getByText(/two-stage recommendation pipeline/i)).toBeInTheDocument();

    expect(screen.getByRole("heading", { name: /education/i })).toBeInTheDocument();
    expect(screen.getByText(/diploma in computer science and engineering/i)).toBeInTheDocument();
    expect(screen.getByText(/government polytechnic kashipur/i)).toBeInTheDocument();
    expect(screen.getByText(/78\.8%/i)).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /download pdf/i })).toHaveAttribute(
      "href",
      "/ML_Engineer_resume.pdf",
    );
    expect(screen.getByRole("link", { name: /download pdf/i })).toHaveAttribute(
      "download",
      "Rahul-Singh-ML-Engineer-Resume.pdf",
    );

    expect(screen.queryByRole("button", { name: /copy share link/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /open in new tab/i })).not.toBeInTheDocument();
    expect(screen.queryByTitle(/resume pdf/i)).not.toBeInTheDocument();
  });
});
