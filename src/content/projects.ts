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
      "A CLI-first NSE/BSE financial research agent with deterministic lookup routes, bounded LLM tool execution, fail-closed evidence checks, and replayable evaluation.",
    role: "CLI and research workflow",
    tools: ["Python", "Hive", "Textual", "FastAPI", "YFinance", "Upstox", "TinyFish"],
    repository: "https://github.com/rahul2-byte/financial-analyst-system",
    evidenceLink: "https://github.com/rahul2-byte/financial-analyst-system/blob/main/README.md",
    evidenceLabel: "Read the README",
    problem:
      "Stock research combines prices, company data, news, calculations, and model-written summaries. I built FIN-AI to keep sources visible so a polished report cannot hide missing evidence.",
    approach: [
      "The CLI uses deterministic lookup routes and bounded LLM tool execution across nine schema-defined tools. Financial calculations run in Python, not as LLM-generated arithmetic.",
      "Fail-closed publication checks reject reports with missing citations, unsupported major claims, or numeric facts without verified data; failed checks return limited-evidence results.",
      "A 150-case live/replay evaluation uses provider snapshots and transcripts to inspect tool decisions and replay failures without live provider calls.",
    ],
    workflow: [
      { title: "Choose a stock", detail: "Resolve the NSE/BSE stock request through deterministic lookup routes." },
      { title: "Collect data", detail: "Use bounded LLM tool execution across nine schema-defined tools." },
      { title: "Run the analysis", detail: "Run financial calculations in Python, not with LLM-generated arithmetic." },
      { title: "Check the report", detail: "Fail closed on missing citations, unsupported major claims, or unverified numeric facts." },
    ],
    evidence: {
      caption: "One live run from the 150-case live/replay evaluation; terminal success measures execution, not answer accuracy.",
      headings: ["Measure", "Observed result", "Context"],
      rows: [
        ["Terminal successes", "143 / 150 (95.3%)", "One live run"],
        ["End-to-end p50 latency", "45.7 s", "One live run"],
        ["End-to-end p95 latency", "110.3 s", "One live run"],
      ],
      note: "The evaluation records execution outcomes and latency. Terminal success is not a measure of financial-answer accuracy or investment performance.",
    },
    limitation:
      "This is a local command-line prototype, not an investment product. The public repository has no evaluation of answer accuracy, investment performance, or production reliability. FastAPI serves only the root and health endpoints; it does not expose the research workflow. Provider data may be incomplete or unavailable.",
  },
  {
    slug: "lora-reproduction",
    number: "02",
    title: "LoRA Reproduction",
    category: "Parameter-efficient fine-tuning · research engineering",
    summary:
      "I implemented LoRA adapters for RoBERTa and ran 27 experiments. They used far fewer trainable parameters; SST-2 stayed close to full fine-tuning, while MRPC accuracy fell.",
    role: "LoRA implementation and evaluation",
    tools: ["PyTorch", "RoBERTa", "Hugging Face", "PEFT", "CUDA", "pytest"],
    repository: "https://github.com/rahul2-byte/lora-reproduction",
    evidenceLink: "https://github.com/rahul2-byte/lora-reproduction/blob/main/docs/results.md",
    evidenceLabel: "Read the results",
    problem:
      "Parameter count alone does not show task performance. I implemented LoRA for RoBERTa and compared it with full fine-tuning and a classifier-head baseline on MRPC and SST-2.",
    approach: [
      "I implemented custom PyTorch LoRA adapters for RoBERTa query/value projections, with frozen base weights, rank/alpha scaling, adapter dropout, paper-style initialization, safe module injection, and merged-inference export. Tests validate forward parity with PEFT.",
      "The reproducible 27-run GLUE study includes 18 core MRPC/SST-2 runs across three seeds, one PEFT reference run, and eight rank, scaling, and module-placement ablations. Reports come from saved run artifacts.",
    ],
    workflow: [
      { title: "Set the protocol", detail: "Pin model and data revisions; use GLUE validation only for evaluation." },
      { title: "Train three ways", detail: "Compare head-only training, full fine-tuning, and LoRA across three seeds." },
      { title: "Record the costs", detail: "Track scores, trainable parameters, GPU memory, run time, and artifact size." },
      { title: "Review the results", detail: "Check the saved adapters and report the weak MRPC scores." },
    ],
    resultFigure: {
      src: "/images/projects/lora-efficiency.png",
      alt: "Scatter plots compare trainable parameter counts and rerun times for head-only training, custom LoRA, and full fine-tuning on MRPC and SST-2.",
      caption: "Rerun time versus trainable parameter count on MRPC and SST-2.",
      width: 1440,
      height: 592,
    },
    evidence: {
      caption: "Mean ± sample standard deviation across three seeds on GLUE validation sets, which were not used for tuning.",
      headings: ["Measure", "Custom LoRA", "Full fine-tuning", "Context"],
      rows: [
        ["Trainable parameters", "887,042", "124,647,170", "99.29% fewer trainable values"],
        ["Task artifact", "3.57 MB", "498.7 MB", "99.28% smaller; base RoBERTa is still needed for LoRA inference"],
        ["SST-2 accuracy", "0.9281 ± 0.0046", "0.9304 ± 0.0024", "Close in this local validation study"],
        ["MRPC accuracy", "0.6928 ± 0.0086", "0.8717 ± 0.0051", "LoRA was weak under the shared settings"],
        ["Peak allocated GPU memory", "0.83–0.92 GiB", "2.35–2.41 GiB", "61.9–64.6% lower PyTorch allocation on one RTX 4050 laptop"],
      ],
      note:
        "All methods used three epochs and the same learning rate. These are validation results, not official GLUE test scores. LoRA predictions on MRPC skewed heavily positive, so F1 alone overstates performance; read it alongside accuracy.",
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
      "A movie recommender seeded with up to five films. Four retrieval models generate candidates; rank fusion combines their lists, and LightGBM reranks the shortlist.",
    role: "Data pipeline, models, and web app",
    tools: ["Python", "PyTorch", "FAISS", "LightGBM", "FastAPI", "Next.js", "AWS Lambda"],
    repository: "https://github.com/rahul2-byte/movie-recommendation-system",
    evidenceLink: "https://github.com/rahul2-byte/movie-recommendation-system/blob/main/README.md",
    evidenceLabel: "Read the README",
    liveDemo: "https://movie-recommendation-system-phi-eight.vercel.app/",
    problem:
      "I wanted recommendations to reflect a few films someone picked, rather than just popularity. I also wanted to rerank a shortlist instead of scoring the full catalog.",
    approach: [
      "MovieLens and TMDB data feed a two-stage pipeline. ALS, item-graph, two-tower, and content models retrieve films; reciprocal-rank fusion combines their lists, and LightGBM reranks the shortlist.",
      "Models, indexes, and feature data ship in an immutable bundle. FastAPI serves requests locally or in Docker on AWS Lambda. The Next.js interface lets people search, choose up to five films, and review recommendations.",
      "The interface includes mood labels, but they do not affect ranking yet. Recommendations use the selected films, and no account is needed.",
    ],
    workflow: [
      { title: "Choose films", detail: "Pick up to five titles from the catalog." },
      { title: "Find candidates", detail: "Retrieve films with ALS, item-graph, two-tower, and content models." },
      { title: "Rank the list", detail: "Fuse the retrieval lists, then rerank candidates with LightGBM." },
      { title: "Show results", detail: "Add TMDB details and return recommendations through FastAPI." },
    ],
    evidence: {
      caption: "Offline ranking metrics. Latency was measured across 50 warm requests on a local machine.",
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
