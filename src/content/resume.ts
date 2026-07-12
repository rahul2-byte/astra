export const resumeHeader = {
  name: "Rahul Singh",
  role: "Machine Learning Engineer | Applied AI | LLM/RAG Systems",
  location: "Pune, Maharashtra, India",
  contacts: [
    { kind: "phone" as const, label: "+91 9027537314", href: "tel:+919027537314" },
    { kind: "email" as const, label: "rahulchand4299@gmail.com", href: "mailto:rahulchand4299@gmail.com" },
    { kind: "linkedin" as const, label: "LinkedIn", href: "https://www.linkedin.com/in/-rahul-singh22/" },
    { kind: "github" as const, label: "GitHub", href: "https://github.com/rahul2-byte" },
  ],
};

export const resumeSummary =
  "Machine Learning Engineer with 4+ years of production experience extending and shipping fuel analytics algorithms, building ML-backed detection systems, and developing applied AI workflows. Skilled in Python, scikit-learn, LightGBM, LangGraph, and retrieval-backed systems. Delivered production features including sub-threshold fuel-event detection, data-loss alerting, and a multi-stage movie recommendation system deployed on AWS Lambda.";

export const resumeSkillGroups = [
  {
    title: "Programming",
    items: ["Python", "SQL", "JavaScript/Node.js", "Git"],
  },
  {
    title: "Machine Learning",
    items: ["Pandas", "NumPy", "scikit-learn", "LightGBM", "XGBoost", "PyTorch", "Statistical Analysis"],
  },
  {
    title: "LLM/RAG",
    items: ["LangGraph", "pgvector", "sentence-transformers", "FAISS", "llama.cpp"],
  },
  {
    title: "Backend & Cloud",
    items: ["FastAPI", "Docker", "AWS Lambda", "API Gateway", "DynamoDB", "S3", "CI/CD"],
  },
  {
    title: "MLOps & Observability",
    items: ["MLflow", "Opik"],
  },
  {
    title: "Visualization",
    items: ["Matplotlib", "Seaborn"],
  },
];

export const resumeExperience = [
  {
    role: "Machine Learning Engineer",
    period: "April 2022–Present",
    company: "Intangles",
    location: "Pune, India",
    bullets: [
      "Extended and optimized a core DBSCAN + LOESS fuel event detection algorithm on OBD telemetry data, maintaining 95% alert accuracy across refill, theft, and data-loss events at scale.",
      "Built a sub-threshold fuel event detection system from scratch, capturing small thefts and refills previously missed by sensor limitations and existing threshold logic, now used as a core production feature in fuel analytics workflows.",
      "Built a data-loss detection system identifying missing fuel level, GPS, and telemetry signals during active vehicle movement, separating sensor dropout from genuine fuel events.",
      "Applied SMA-based smoothing on noisy fuel-level sensor data to extract the underlying signal before classification, reducing false positives by 15%.",
      "Refactored the Node.js fuel analytics codebase, fixing bugs in the level-consumption mapping and bin-based mean/SD computation, reclaiming 30+ hours weekly by reducing support queries from 6 to 2 per day.",
    ],
  },
];

export const resumeProjects = [
  {
    title: "FIN-AI - Multi-Agent Financial Intelligence Platform",
    href: "/projects/fin-ai",
    stack: ["FastAPI", "LangGraph", "pgvector", "llama.cpp", "Opik", "PyTorch"],
    bullets: [
      "Designed a multi-agent financial research platform using LangGraph and FastAPI, routing tasks across specialized research, validation, synthesis, and reporting agents.",
      "Built a retrieval pipeline using pgvector and sentence-transformers to retrieve financial news, filings, and market context for grounded AI responses.",
      "Integrated llama.cpp for local GGUF model inference, reducing dependency on external LLM APIs and enabling offline financial analysis workflows.",
      "Separated deterministic quantitative processing from LLM reasoning, ensuring calculations are handled through Python, Pandas, and NumPy instead of generative model output.",
      "Used observability traces to inspect retrieved context, agent outputs, latency, and unsupported-claim patterns across multi-agent financial analysis runs.",
    ],
  },
  {
    title: "Movie Recommendation System",
    href: "/projects/movie-recommendation-system",
    stack: ["FastAPI", "LightGBM", "FAISS", "AWS Lambda", "DynamoDB", "S3"],
    bullets: [
      "Architected a two-stage recommendation pipeline with candidate retrieval followed by LightGBM ranking, exposed through a FastAPI backend.",
      "Implemented multi-model candidate generation using ALS collaborative filtering, TF-IDF, content-based retrieval, and two-tower retrieval models.",
      "Used FAISS indexes to support efficient similarity search across retrieval models and serve personalized recommendation candidates at runtime.",
      "Built runtime feature generation for query-level and pairwise ranking features before scoring candidates with a LightGBM ranking model.",
      "Deployed the backend as a serverless application using AWS Lambda and API Gateway, with movie metadata in DynamoDB and model artifacts stored in S3.",
    ],
  },
];

export const resumeEducation = [
  {
    degree: "Diploma in Computer Science and Engineering",
    period: "Jul 2018 - Sep 2021",
    institution: "Government Polytechnic Kashipur",
    location: "Uttarakhand, India",
    score: "78.8%",
  },
];
