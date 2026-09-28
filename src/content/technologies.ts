export type Technology = { name: string };
export type TechnologyGroup = { title: string; items: Technology[] };

export const technologyGroups: TechnologyGroup[] = [
  {
    title: "Generative AI / LLMs",
    items: [
      { name: "LLM workflows" },
      { name: "RAG" },
      { name: "LangGraph" },
      { name: "Tool calling" },
      { name: "Structured outputs" },
      { name: "LoRA / parameter-efficient fine-tuning" },
    ],
  },
  {
    title: "ML / NLP",
    items: [
      { name: "PyTorch" },
      { name: "TensorFlow / Keras" },
      { name: "Hugging Face Transformers / PEFT" },
      { name: "scikit-learn" },
      { name: "LightGBM" },
      { name: "sentence-transformers" },
    ],
  },
  {
    title: "Retrieval",
    items: [
      { name: "Embeddings" },
      { name: "Semantic search" },
      { name: "pgvector" },
      { name: "Maximal Marginal Relevance (MMR) reranking" },
    ],
  },
  {
    title: "Backend / data",
    items: [
      { name: "Python" },
      { name: "SQL" },
      { name: "FastAPI" },
      { name: "REST APIs" },
      { name: "PostgreSQL" },
      { name: "RabbitMQ" },
    ],
  },
  {
    title: "MLOps / cloud",
    items: [
      { name: "Docker" },
      { name: "AWS" },
      { name: "MLflow" },
      { name: "OpenTelemetry" },
      { name: "GitHub Actions (CI/CD)" },
      { name: "Git" },
    ],
  },
];
