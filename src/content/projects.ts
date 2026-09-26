export type EvidenceTable = {
  caption: string;
  headings: string[];
  rows: string[][];
  note: string;
};

export type Project = {
  slug: string;
  number: string;
  title: string;
  category: string;
  summary: string;
  role: string;
  tools: string[];
  repository: string;
  evidenceLink: string;
  evidenceLabel: string;
  liveDemo?: string;
  problem: string;
  approach: string[];
  workflow: { title: string; detail: string }[];
  evidence?: EvidenceTable;
  resultFigure?: { src: string; alt: string; caption: string; width: number; height: number };
  limitation: string;
};

export const projects: Project[] = [
  {
    slug: "fin-ai",
    number: "01",
    title: "FIN-AI",
    category: "Financial research · applied AI",
    summary:
      "A command-line assistant for researching NSE and BSE stocks. It gathers provider data, runs deterministic calculations, and uses a bounded model-and-tool loop to draft reports.",
    role: "CLI and research workflow",
    tools: ["Python", "Hive", "Textual", "FastAPI", "YFinance", "Upstox", "TinyFish"],
    repository: "https://github.com/rahul2-byte/financial-analyst-system",
    evidenceLink: "https://github.com/rahul2-byte/financial-analyst-system/blob/main/README.md",
    evidenceLabel: "Read the README",
    problem:
      "A stock report can mix prices, company data, news, calculations, and an LLM summary. I wanted the sources to stay visible, so a polished answer could not hide a gap in the evidence.",
    approach: [
      "The main interface is a terminal app. It identifies the requested stock, gathers market or news data through registered tools, runs deterministic checks, then gives Hive a limited number of tool turns to draft a summary.",
      "Python handles the calculations. Results can be shown in Textual, plain text, or JSON. Citation and publication checks stop unsupported reports.",
      "Runs save transcripts, checkpoints, and provider snapshots locally. The snapshots let me replay selected runs without making the same live requests again.",
    ],
    workflow: [
      { title: "Choose a stock", detail: "Ask for clarification when a symbol is ambiguous." },
      { title: "Collect data", detail: "Gather market, company, and news data from providers." },
      { title: "Run the analysis", detail: "Use Python calculations and a limited number of model/tool turns." },
      { title: "Check the report", detail: "Validate citations, then render to Textual, plain text, or JSON." },
    ],
    limitation:
      "This is a local command-line prototype, not an investment product. The public repository has no evaluation of answer accuracy, investment performance, or production reliability. FastAPI serves only the root and health endpoints; it does not expose the research workflow. Provider data may be incomplete or unavailable.",
  },
  {
    slug: "lora-reproduction",
    number: "02",
    title: "LoRA Reproduction",
    category: "Parameter-efficient fine-tuning · research engineering",
    summary:
      "I implemented LoRA adapters for RoBERTa and ran 27 experiments. The adapters used far fewer trainable parameters, but results varied: SST-2 held up; MRPC did not.",
    role: "LoRA implementation and evaluation",
    tools: ["PyTorch", "RoBERTa", "Hugging Face", "PEFT", "CUDA", "pytest"],
    repository: "https://github.com/rahul2-byte/lora-reproduction",
    evidenceLink: "https://github.com/rahul2-byte/lora-reproduction/blob/main/docs/results.md",
    evidenceLabel: "Read the results",
    problem:
      "Fewer trainable weights do not tell you how well a fine-tuned model performs. I implemented LoRA for RoBERTa and compared it with full fine-tuning and a head-only baseline on two GLUE tasks.",
    approach: [
      "I added low-rank adapters to RoBERTa's query and value projections and froze the base model. Tests compare merged inference with the reference PEFT implementation.",
      "Across three seeds, I compared head-only training, full fine-tuning, and custom LoRA on MRPC and SST-2. I also ran a PEFT reference and eight single-seed MRPC ablations. Reports are generated from saved run artifacts.",
    ],
    workflow: [
      { title: "Set the protocol", detail: "Pin the model and data revisions; reserve GLUE validation for evaluation." },
      { title: "Train three ways", detail: "Compare head-only training, full fine-tuning, and LoRA across three seeds." },
      { title: "Record the costs", detail: "Track scores, trainable parameters, GPU memory, run time, and artifact size." },
      { title: "Review the results", detail: "Check the saved adapters and report the weak MRPC scores." },
    ],
    resultFigure: {
      src: "/images/projects/lora-efficiency.png",
      alt: "Scatter plots comparing trainable parameter counts and rerun times for head-only training, custom LoRA, and full fine-tuning on MRPC and SST-2.",
      caption: "Rerun wall time against trainable parameter count on MRPC and SST-2.",
      width: 1440,
      height: 592,
    },
    evidence: {
      caption: "Mean ± sample standard deviation across three seeds on GLUE validation sets, which were not used for tuning.",
      headings: ["Measure", "Custom LoRA", "Full fine-tuning", "Context"],
      rows: [
        ["Trainable parameters", "887,042", "124,647,170", "99.29% fewer trainable values"],
        ["Task artifact", "3.57 MB", "498.7 MB", "Base RoBERTa is still needed for LoRA inference"],
        ["SST-2 accuracy", "0.9281 ± 0.0046", "0.9304 ± 0.0024", "Close in this local validation study"],
        ["MRPC accuracy", "0.6928 ± 0.0086", "0.8717 ± 0.0051", "LoRA was weak under the shared settings"],
        ["Peak allocated GPU memory", "0.83–0.92 GiB", "2.35–2.41 GiB", "PyTorch allocation on one RTX 4050 laptop"],
      ],
      note:
        "All methods used three epochs and the same learning rate. These are validation results, not official GLUE test scores. On MRPC, the LoRA adapter predicted “positive” for most examples; its F1 score looks better than its accuracy.",
    },
    limitation:
      "This is a small study: two tasks, one model, three seeds, and one laptop GPU. The MRPC ablations used one seed. Memory and timing depend on that hardware, and using the adapter still requires the matching base model and tokenizer.",
  },
  {
    slug: "movie-recommendation-system",
    number: "03",
    title: "Movie Recommendation System",
    category: "Recommendation systems · full-stack ML",
    summary:
      "A movie recommender that starts with up to five films. Four retrieval models find candidates; rank fusion combines their lists, then LightGBM orders the results.",
    role: "Data pipeline, models, and web app",
    tools: ["Python", "PyTorch", "FAISS", "LightGBM", "FastAPI", "Next.js", "AWS Lambda"],
    repository: "https://github.com/rahul2-byte/movie-recommendation-system",
    evidenceLink: "https://github.com/rahul2-byte/movie-recommendation-system/blob/main/README.md",
    evidenceLabel: "Read the README",
    liveDemo: "https://movie-recommendation-system-phi-eight.vercel.app/",
    problem:
      "I wanted recommendations to reflect a few films someone picked, rather than just popularity. I also wanted to rerank a shortlist instead of scoring the full catalog.",
    approach: [
      "MovieLens and TMDB data feed two stages. ALS, item-graph, two-tower, and content models retrieve films; reciprocal-rank fusion combines their lists, and LightGBM reranks the candidates.",
      "Models, indexes, and feature data ship together in an immutable bundle. FastAPI serves requests locally or through Docker on AWS Lambda. The Next.js page handles search, up to five selected films, and results.",
      "The UI accepts mood labels, but the ranker ignores them. Recommendations use the selected films; no account is needed.",
    ],
    workflow: [
      { title: "Pick films", detail: "Choose up to five titles from the catalog." },
      { title: "Find candidates", detail: "Use ALS, item graph, two-tower, and content models." },
      { title: "Rank the list", detail: "Combine the retrieval lists, then rerank with LightGBM." },
      { title: "Show results", detail: "Add TMDB details and return the list through FastAPI." },
    ],
    evidence: {
      caption: "Offline ranking results. The latency test used 50 warm requests on a local machine.",
      headings: ["Measure", "Popularity", "Rank fusion", "LightGBM"],
      rows: [
        ["NDCG@10", "0.179199", "0.276502", "0.281976"],
        ["MAP@10", "0.118712", "0.192482", "0.195100"],
        ["MRR@10", "0.125135", "0.210940", "0.213656"],
      ],
      note:
        "The local benchmark sent 50 requests with five seed films. In-process p50/p95/p99 latency was 26.70/31.88/34.65 ms; HTTP with cached metadata was 32.02/35.35/37.38 ms. These figures do not include Lambda cold starts or production network overhead.",
    },
    limitation:
      "These are offline ranking metrics, not evidence that people liked the recommendations. The latency test covered 50 warm local requests; it does not capture Lambda cold starts, API Gateway, production throughput, or real usage. The ranker also cannot surface a film the retrieval stage missed.",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
