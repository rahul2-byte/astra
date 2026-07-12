import type { ProjectArticleCaseStudy } from "@/content/project-article";

export const finAiCaseStudy: ProjectArticleCaseStudy = {
  meta: {
    title: "FIN-AI",
    summary:
      "A local-first, multi-agent financial research assistant for Indian-market questions, combining live YFinance data, Exa research retrieval, LangGraph orchestration, and local LLM inference.",
    category: "Applied AI · multi-agent systems · technical case study",
    role: "Solo engineer",
    duration: "Two months",
    status: "Local work-in-progress prototype",
    stack: ["Next.js", "FastAPI", "LangGraph", "llama.cpp", "YFinance", "Exa", "pgvector", "Opik"],
  },
  toc: [
    { id: "summary", label: "Executive summary" },
    { id: "problem", label: "Problem and scope" },
    { id: "contribution", label: "Contribution" },
    { id: "system-overview", label: "System architecture" },
    { id: "data-evidence", label: "Data and evidence" },
    { id: "local-inference", label: "Local LLM setup" },
    { id: "workflow", label: "Request workflow" },
    { id: "api-ux", label: "API and chat UX" },
    { id: "evaluation", label: "Observability and evaluation" },
    { id: "challenges", label: "Challenges and safety" },
    { id: "decisions", label: "Decisions" },
    { id: "skills", label: "Skills demonstrated" },
    { id: "limitations", label: "Limitations and next work" },
  ],
  resources: [
    {
      label: "View source on GitHub",
      href: "https://github.com/rahul2-byte/financial-analyst-system",
      description: "Local-first multi-agent research implementation",
    },
    {
      label: "YFinance documentation",
      href: "https://ranaroussi.github.io/yfinance/",
      description: "Market and fundamental-data integration reference",
    },
    {
      label: "Exa documentation",
      href: "https://docs.exa.ai/",
      description: "News and research retrieval integration reference",
    },
  ],
  facts: [
    { value: "13", label: "graph workflow stages" },
    { value: "5", label: "specialist agent roles" },
    { value: "6 GB", label: "local GPU memory budget" },
  ],
  sections: [
    {
      id: "summary",
      eyebrow: "Executive technical summary",
      title: "Grounded financial research without a hosted LLM provider",
      paragraphs: [
        "FIN-AI is a conversational financial research assistant focused on Indian-market questions. It retrieves live market and fundamental information through YFinance, gathers topical news and research context through Exa, and coordinates specialized agents before producing a consolidated response.",
        "I built the project to test a capable local LLM workflow on a 6 GB NVIDIA RTX 4050 GPU. The core reasoning loop uses a quantized GGUF model served through llama.cpp rather than a hosted LLM provider, so memory limits, retrieval quality, and workflow control became explicit engineering constraints.",
        "The architecture separates deterministic data retrieval from LLM reasoning. LangGraph coordinates routing, planning, specialist analysis, synthesis, critique, conflict resolution, validation, and evaluation. Opik traces were reviewed during development to inspect agent execution and tool behaviour.",
      ],
      callout: {
        title: "Evidence boundary",
        body: "FIN-AI is a local, work-in-progress prototype. It has no live deployment, formal accuracy benchmark, latency measurement, cost analysis, or financial-performance claim.",
      },
    },
    {
      id: "problem",
      eyebrow: "Problem definition",
      title: "Financial questions require evidence, not a confident single prompt",
      paragraphs: [
        "A useful financial-research response may need current price history, company fundamentals, market context, and news at the same time. A generic chatbot answer cannot reliably provide that context unless it retrieves the relevant evidence and makes uncertainty visible.",
        "The AI-system problem is to decide what evidence a question requires, collect it from appropriate tools, coordinate multiple analytical viewpoints, and prevent major unsupported claims from reaching the final answer. The engineering problem is to do this locally under a constrained GPU budget while still supporting a responsive chat flow.",
      ],
      bullets: [
        "Retrieve live market and fundamental inputs from YFinance.",
        "Use Exa for news and research context rather than relying on model memory.",
        "Separate specialist perspectives from final synthesis and validation.",
      ],
    },
    {
      id: "contribution",
      eyebrow: "My role",
      title: "Solo ownership from local inference to chat delivery",
      paragraphs: [
        "This was a solo, two-month project. I designed the local-first architecture, implemented the LangGraph workflow and specialist-agent boundaries, integrated the YFinance and Exa data sources, configured llama.cpp inference, built the FastAPI streaming backend, connected the Next.js chat experience, and reviewed Opik traces.",
      ],
      bullets: [
        "Defined data, tool, and deterministic-calculation boundaries for financial research.",
        "Implemented graph stages for planning, retrieval, analysis, critique, conflict handling, and validation.",
        "Connected a local PostgreSQL/pgvector service, local inference runtime, backend, and web interface.",
      ],
    },
    {
      id: "data-evidence",
      eyebrow: "Data and evidence pipeline",
      title: "Live APIs provide the research context at request time",
      paragraphs: [
        "FIN-AI does not use a fixed training dataset, static financial-document corpus, or claimed record count. It retrieves information dynamically when a user asks a question, which keeps the research context current but makes external-source availability and relevance part of the system's reliability boundary.",
        "YFinance is the structured-data source for market history, company fundamentals, statements, and related market inputs. Exa provides news and research context. The workflow combines these evidence types rather than treating either one as a complete answer on its own.",
        "Quantitative financial calculations are intentionally kept deterministic rather than delegated to the LLM. The language model interprets and synthesizes retrieved context; it should not invent or calculate financial ratios or forecasts.",
      ],
      callout: {
        title: "Data scope",
        body: "The project does not ingest additional filings or a proprietary document collection. Data freshness, source coverage, and API availability remain external dependencies.",
      },
    },
    {
      id: "local-inference",
      eyebrow: "Local LLM and infrastructure",
      title: "A local-first design shaped by a 6 GB RTX 4050",
      paragraphs: [
        "The reasoning model is served locally as a quantized GGUF model through llama.cpp. The configuration also uses a local embedding model and a PostgreSQL database with pgvector, keeping the principal AI workflow self-hosted during testing.",
        "This approach was selected to test LLM-agent capability on available consumer hardware without using a hosted LLM API. It trades the headroom of large cloud models for direct control over inference, local experimentation, and a clearer understanding of hardware constraints.",
      ],
      bullets: [
        "Local llama.cpp server for quantized GGUF inference.",
        "PostgreSQL with pgvector for local persistence and vector-search support.",
        "Environment-driven configuration for database, observability, and external API credentials.",
      ],
    },
    {
      id: "api-ux",
      eyebrow: "API and user experience",
      title: "A streaming chat boundary around the research graph",
      paragraphs: [
        "The Next.js interface accepts a financial research question and sends it to the FastAPI backend. FastAPI initializes the workflow state and streams the resulting response so that the chat UI does not need to wait for the full graph to complete before rendering output.",
        "The frontend is currently a functional work-in-progress interface, not a finished consumer product. No screenshots or deployed demo are presented in this case study.",
      ],
    },
    {
      id: "evaluation",
      eyebrow: "Observability and evaluation",
      title: "Traces were reviewed; performance claims are intentionally absent",
      paragraphs: [
        "Opik traces were reviewed during development to inspect agent progression and tool execution. This gave visibility into how requests moved through routing, retrieval, specialist analysis, synthesis, and validation stages.",
        "Formal offline or online evaluation has not been completed. The project does not currently claim retrieval relevance, groundedness, agent-routing accuracy, response quality, latency, throughput, cost, or financial-prediction metrics.",
        "A useful next step is a curated set of Indian-market research questions that evaluates source coverage, evidence grounding, route selection, workflow completion, and the practical usefulness of the final response.",
      ],
    },
    {
      id: "challenges",
      eyebrow: "Challenges and safety",
      title: "Control, disagreement, and live-source risk matter in financial workflows",
      paragraphs: [
        "The local GPU budget constrains model size, quantization, context use, and runtime behaviour. FIN-AI addresses this through a retrieval-first architecture, specialist roles, explicit workflow stages, and validation rather than assuming a model alone can provide reliable research.",
        "Financial questions also create a risk of unsupported confidence. The workflow includes critic, conflict-resolution, and validation stages designed to catch weak evidence, unresolved disagreement, and unsupported major claims before a final response is returned.",
        "These are architecture-level controls, not a guarantee of factual correctness. External content should be treated as untrusted context, and FIN-AI should not be represented as investment advice or a production financial-advice system.",
      ],
    },
    {
      id: "limitations",
      eyebrow: "Limitations and future work",
      title: "The next milestone is measurable reliability",
      paragraphs: [
        "FIN-AI is local-only, has no production users, and lacks formal benchmark results. It depends on YFinance and Exa for live data, has no proprietary document corpus, and does not yet include production authentication, rate limiting, operational monitoring, or a user-study feedback loop.",
      ],
      bullets: [
        "Immediate: add source links in the UI, screenshots, a financial-information disclaimer, and an evaluation question set.",
        "Medium-term: measure retrieval relevance, groundedness, routing correctness, and workflow completion; compare the graph with a simpler single-agent baseline.",
        "Production-scale: add authentication, rate limits, resilient API fallbacks, prompt-injection defences, monitoring, audit-log policy, and caching controls.",
      ],
    },
  ],
  systemOverview: {
    id: "system-overview",
    eyebrow: "System architecture",
    title: "A graph coordinates evidence, specialist analysis, and validation",
    evidence: "Code-backed workflow",
    paragraphs: [
      "The architecture separates data acquisition, reasoning orchestration, and response delivery. Next.js provides the chat interface; FastAPI manages the streaming boundary; LangGraph holds shared state and controls the research workflow; YFinance and Exa provide external evidence; and llama.cpp hosts the local reasoning model.",
      "The graph registers thirteen stages: router, goal, data check, data plan, data fetch, research plan, research context, research execution, synthesis, critic, conflict resolution, validation, and evaluator. Five specialist roles contribute fundamental, technical, sentiment, macro, and contrarian perspectives.",
    ],
  },
  workflow: {
    id: "workflow",
    eyebrow: "End-to-end workflow",
    title: "From question to a validated streamed response",
    paragraphs: [
      "A user submits a research question through the chat interface. The backend initializes graph state, routes the question, defines the research goal, checks the required data, and plans YFinance and Exa retrieval before specialist analysis begins.",
      "Specialist outputs are synthesized into a draft. The critic reviews weaknesses, conflict resolution handles material disagreements, and validation checks whether major claims are supported before the backend streams the final response to the user.",
    ],
  },
  flows: [
    {
      title: "FIN-AI architecture",
      caption: "The system intentionally separates live-data retrieval, local LLM reasoning, and response delivery so each boundary can be inspected independently.",
      lanes: [
        {
          label: "Product boundary",
          steps: [
            { title: "Next.js chat", detail: "Financial research question" },
            { title: "FastAPI", detail: "Streaming request boundary" },
          ],
        },
        {
          label: "Research graph",
          steps: [
            { title: "Plan", detail: "Route, goal, and data requirements" },
            { title: "Retrieve", detail: "YFinance and Exa evidence" },
            { title: "Analyse", detail: "Specialist-agent viewpoints" },
            { title: "Validate", detail: "Critique and conflict checks" },
          ],
        },
      ],
    },
    {
      title: "Research request workflow",
      caption: "The graph uses explicit planning and validation stages instead of allowing a single prompt to directly produce a financial conclusion.",
      lanes: [
        {
          label: "Evidence path",
          steps: [
            { title: "Question", detail: "User research request" },
            { title: "Data plan", detail: "Determine required inputs" },
            { title: "Fetch context", detail: "Market data and research" },
          ],
        },
        {
          label: "Reasoning path",
          steps: [
            { title: "Specialists", detail: "Five analytical viewpoints" },
            { title: "Synthesis", detail: "Combine supported findings" },
            { title: "Validation", detail: "Check claims and conflicts" },
            { title: "Stream", detail: "Return response to chat" },
          ],
        },
      ],
    },
  ],
  tables: {
    agents: {
      title: "Specialist analysis agents",
      caption: "Each role contributes a distinct perspective; the synthesis and validation stages are responsible for reconciling the outputs.",
      columns: ["Agent", "Responsibility", "Primary inputs", "Output"],
      rows: [
        { Agent: "Fundamental", Responsibility: "Interpret company fundamentals and statements", "Primary inputs": "YFinance fundamental data", Output: "Fundamental findings" },
        { Agent: "Technical", Responsibility: "Interpret price and technical context", "Primary inputs": "Market history and indicators", Output: "Technical findings" },
        { Agent: "Sentiment", Responsibility: "Review news and research context", "Primary inputs": "Exa search results", Output: "Narrative and sentiment context" },
        { Agent: "Macro", Responsibility: "Add broader market context when needed", "Primary inputs": "Retrieved market-oriented inputs", Output: "Macro context" },
        { Agent: "Contrarian", Responsibility: "Challenge assumptions and surface risks", "Primary inputs": "Specialist findings and evidence", Output: "Counterarguments and gaps" },
      ],
    },
    api: {
      title: "Backend surface",
      caption: "The backend exposes the chat boundary and health-oriented service checks without exposing internal agent state directly to the client.",
      columns: ["Method", "Endpoint", "Purpose", "Output"],
      rows: [
        { Method: "POST", Endpoint: "/api/chat", Purpose: "Run the financial-research workflow", Output: "Streamed chat response" },
        { Method: "GET", Endpoint: "Health endpoint", Purpose: "Report service and dependency readiness", Output: "Service status" },
      ],
    },
    decisions: {
      title: "Engineering decisions and trade-offs",
      caption: "The choices prioritize inspectable local experimentation over unmeasured production claims.",
      columns: ["Decision", "Selected approach", "Reason", "Trade-off"],
      rows: [
        { Decision: "LLM runtime", "Selected approach": "Local GGUF model via llama.cpp", Reason: "Test LLM agents on the available RTX 4050", "Trade-off": "Tighter capability and memory headroom than hosted models" },
        { Decision: "Workflow", "Selected approach": "LangGraph multi-agent pipeline", Reason: "Explicit state, routing, and validation", "Trade-off": "More orchestration complexity" },
        { Decision: "Market data", "Selected approach": "YFinance", Reason: "Live structured market and fundamental inputs", "Trade-off": "External data availability dependency" },
        { Decision: "News context", "Selected approach": "Exa", Reason: "Current research context beyond price data", "Trade-off": "Search relevance and source quality vary" },
        { Decision: "Validation", "Selected approach": "Critic, conflict, and validation nodes", Reason: "Reduce unsupported major claims", "Trade-off": "More graph stages before response" },
        { Decision: "Persistence", "Selected approach": "PostgreSQL with pgvector", Reason: "Local vector-storage support", "Trade-off": "Requires local database setup" },
      ],
    },
    skills: {
      title: "Skills demonstrated",
      caption: "Each listed capability is linked to an implemented FIN-AI boundary.",
      columns: ["Capability", "Evidence"],
      rows: [
        { Capability: "Agentic AI systems", Evidence: "LangGraph workflow with routing, specialist roles, validation, and stateful handoffs" },
        { Capability: "Local LLM engineering", Evidence: "Quantized local inference through llama.cpp under a 6 GB GPU constraint" },
        { Capability: "Retrieval systems", Evidence: "Live YFinance and Exa evidence integrated into the research workflow" },
        { Capability: "Backend engineering", Evidence: "FastAPI streaming boundary and environment-driven service configuration" },
        { Capability: "Frontend integration", Evidence: "Next.js conversational interface connected to the graph" },
        { Capability: "Observability", Evidence: "Opik trace review for agent and tool execution" },
      ],
    },
  },
};
