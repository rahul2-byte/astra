import {
  siDocker,
  siFastapi,
  siGithubactions,
  siHuggingface,
  siMlflow,
  siNextdotjs,
  siPostgresql,
  siPython,
  siPytorch,
  siRabbitmq,
  siScikitlearn,
  siTensorflow,
  type SimpleIcon,
} from "simple-icons";

export type Technology = { name: string; icon?: SimpleIcon };
export type TechnologyGroup = { title: string; items: Technology[] };

export const technologyGroups: TechnologyGroup[] = [
  {
    title: "Languages & Data",
    items: [
      { name: "Python", icon: siPython },
      { name: "SQL" },
      { name: "PostgreSQL", icon: siPostgresql },
      { name: "RabbitMQ", icon: siRabbitmq },
    ],
  },
  {
    title: "Machine Learning",
    items: [
      { name: "PyTorch", icon: siPytorch },
      { name: "TensorFlow / Keras", icon: siTensorflow },
      { name: "Hugging Face", icon: siHuggingface },
      { name: "scikit-learn", icon: siScikitlearn },
      { name: "LightGBM" },
      { name: "LoRA / PEFT" },
      { name: "Sentence Transformers" },
    ],
  },
  {
    title: "LLMs & Retrieval",
    items: [
      { name: "RAG Architecture" },
      { name: "Embeddings & Semantic Search" },
      { name: "FAISS" },
      { name: "MMR Reranking" },
    ],
  },
  {
    title: "APIs, Cloud & Delivery",
    items: [
      { name: "FastAPI", icon: siFastapi },
      { name: "Docker", icon: siDocker },
      { name: "AWS Lambda" },
      { name: "MLflow", icon: siMlflow },
      { name: "OpenTelemetry" },
      { name: "GitHub Actions", icon: siGithubactions },
      { name: "Next.js", icon: siNextdotjs },
    ],
  },
];
