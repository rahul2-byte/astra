export type HomeMetric = {
  value: string;
  label: string;
};

export type ExpertiseArea = {
  title: string;
  description: string;
  capabilities: string[];
  iconName: "Gauge" | "Activity" | "Network" | "ServerCog";
};

export type HomeProject = {
  title: string;
  category: string;
  problem: string;
  contribution: string;
  evidence: string;
  stack: string[];
  href: string;
};

export const heroSkills = [
  "Production ML",
  "Python & SQL",
  "Telemetry & Time Series",
  "Event & Anomaly Detection",
  "RAG & AI Agents",
  "FastAPI",
  "Docker & AWS",
  "FAISS & LightGBM",
];

export const homeMetrics: HomeMetric[] = [
  { value: "4+ years", label: "Production ML experience" },
  { value: "95%", label: "Alert accuracy maintained" },
  { value: "15%", label: "False-positive reduction" },
  { value: "30+ hrs/week", label: "Operational time reclaimed" },
];

export const expertiseAreas: ExpertiseArea[] = [
  {
    title: "Production Machine Learning",
    description:
      "Detection systems, evaluation, error analysis, false-positive reduction, and reliable operation on noisy data.",
    capabilities: ["Feature engineering", "Model evaluation", "Production monitoring", "Error analysis"],
    iconName: "Gauge",
  },
  {
    title: "Telemetry & Time-Series Analytics",
    description:
      "OBD signals, fuel analytics, missing-data detection, event detection, DBSCAN, LOESS, and SMA smoothing.",
    capabilities: ["Sensor data", "Anomaly detection", "Signal smoothing", "Data-loss detection"],
    iconName: "Activity",
  },
  {
    title: "RAG, LLMs & AI Agents",
    description:
      "Retrieval pipelines, embeddings, vector databases, LangGraph orchestration, observability, and local inference.",
    capabilities: ["LangGraph", "pgvector", "Embeddings", "llama.cpp"],
    iconName: "Network",
  },
  {
    title: "ML APIs & Deployment",
    description:
      "FastAPI services, Docker workflows, AWS serverless deployment, vector retrieval, ranking, and model integration.",
    capabilities: ["FastAPI", "Docker", "AWS Lambda", "Model serving"],
    iconName: "ServerCog",
  },
];

export const homeProjects: HomeProject[] = [
  {
    title: "Production ML Systems at Intangles",
    category: "Production ML",
    problem:
      "Noisy OBD telemetry, sensor instability, missing signals, and operationally sensitive fuel alerts.",
    contribution:
      "Extended DBSCAN + LOESS detection, built sub-threshold and data-loss detection, applied SMA smoothing, and improved analytics code.",
    evidence: "95% alert accuracy maintained · 15% false-positive reduction",
    stack: ["Python", "Pandas", "scikit-learn", "DBSCAN", "LOESS", "SMA"],
    href: "/projects/production-ml-systems",
  },
  {
    title: "FIN-AI",
    category: "Applied AI / RAG",
    problem:
      "Financial research workflows need grounded retrieval, explicit orchestration, and inspectable outputs.",
    contribution:
      "Designed FastAPI boundaries, LangGraph agent flow, pgvector retrieval, local inference, and Opik tracing.",
    evidence: "Multi-agent RAG · Local inference · Traceable workflow",
    stack: ["FastAPI", "LangGraph", "pgvector", "llama.cpp", "Opik"],
    href: "/projects/fin-ai",
  },
  {
    title: "Movie Recommendation System",
    category: "Recommendation Systems",
    problem:
      "Personalized recommendations require efficient retrieval, ranking quality, and practical model delivery.",
    contribution:
      "Built FAISS candidate retrieval, LightGBM ranking, runtime features, FastAPI serving, and AWS deployment boundaries.",
    evidence: "Two-stage retrieval + ranking · Serverless delivery",
    stack: ["FAISS", "LightGBM", "FastAPI", "AWS Lambda", "DynamoDB"],
    href: "/projects/movie-recommendation-system",
  },
];

export const experienceHighlights = [
  "Maintained approximately 95% alert accuracy.",
  "Reduced false positives by approximately 15%.",
  "Reduced support queries from approximately six to two per day.",
];

export const contactRoleGroups = [
  "Machine Learning",
  "Applied AI",
  "Generative AI",
  "LLM & RAG",
  "NLP",
  "Data Science",
];
