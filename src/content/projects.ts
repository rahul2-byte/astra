export type Project = {
  title: string;
  slug: string;
  category: string;
  summary: string;
  stack: string[];
  href: string;
  evidence: string;
  featured?: boolean;
};

export const featuredProjects: Project[] = [
  {
    title: "Production ML Systems at Intangles",
    slug: "production-ml-systems",
    category: "Production experience",
    summary:
      "High-level case study of fuel analytics, OBD telemetry, noisy sensor processing, and event detection work delivered in production constraints.",
    stack: ["Python", "SQL", "Pandas", "NumPy", "scikit-learn", "DBSCAN", "LOESS", "SMA"],
    href: "/projects/production-ml-systems",
    evidence: "Resume-backed outcomes; technical detail intentionally kept high-level.",
    featured: true,
  },
  {
    title: "FIN-AI",
    slug: "fin-ai",
    category: "Applied AI / RAG",
    summary:
      "Multi-agent financial intelligence platform using agent orchestration, local LLM workflows, vector storage, and observability-oriented tooling.",
    stack: ["FastAPI", "LangGraph", "pgvector", "llama.cpp", "Opik", "PyTorch", "Pandas", "NumPy"],
    href: "/projects/fin-ai",
    evidence: "Project-backed; add final repository, screenshots, diagrams, and demo links.",
    featured: true,
  },
  {
    title: "Movie Recommendation System",
    slug: "movie-recommendation-system",
    category: "Recommendation systems",
    summary:
      "Recommendation project combining API delivery, ranking/modeling, vector search, and serverless AWS deployment components.",
    stack: ["FastAPI", "LightGBM", "FAISS", "AWS Lambda", "API Gateway", "DynamoDB", "S3"],
    href: "/projects/movie-recommendation-system",
    evidence: "Project-backed; add final repository, architecture visuals, and demo details.",
    featured: true,
  },
];

export const earlierWork = [
  {
    title: "News Classification",
    summary:
      "Earlier ML learning project using a classic text classification workflow. Useful as learning history, not flagship proof.",
  },
  {
    title: "Diamond Price Prediction",
    summary:
      "Earlier regression project that shows foundational data science practice and should stay secondary to stronger work.",
  },
];
