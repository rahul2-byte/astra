import type { ProjectArticleCaseStudy } from "@/content/project-article";

export type MovieRecommendationCaseStudy = ProjectArticleCaseStudy;

export const movieRecommendationCaseStudy: MovieRecommendationCaseStudy = {
  meta: {
    title: "Movie Recommendation System",
    summary:
      "A deployed, two-stage movie discovery system that turns selected films into ranked recommendations through multi-source retrieval, metadata-driven features, and LightGBM reranking.",
    category: "Recommendation systems · technical case study",
    role: "Solo engineer",
    duration: "Two months",
    status: "Live deployed project",
    stack: ["Next.js", "FastAPI", "FAISS", "LightGBM", "AWS Lambda", "DynamoDB", "S3"],
  },
  toc: [
    { id: "summary", label: "Executive summary" },
    { id: "problem", label: "Problem and scope" },
    { id: "contribution", label: "Contribution" },
    { id: "system-overview", label: "System overview" },
    { id: "data-lifecycle", label: "Data lifecycle" },
    { id: "recommendation-design", label: "Recommendation design" },
    { id: "workflow", label: "Request workflow" },
    { id: "api-ux", label: "API and UX" },
    { id: "deployment", label: "Deployment" },
    { id: "evaluation", label: "Evaluation status" },
    { id: "decisions", label: "Decisions" },
    { id: "limitations", label: "Limitations and next work" },
  ],
  resources: [
    {
      label: "Open live demo",
      href: "https://movie-recommendation-system-phi-eight.vercel.app/",
      description: "Deployed Next.js movie discovery experience",
    },
    {
      label: "View source on GitHub",
      href: "https://github.com/rahul2-byte/movie-recommendation-system",
      description: "Full-stack implementation and deployment configuration",
    },
    {
      label: "MovieLens 32M dataset",
      href: "https://grouplens.org/datasets/movielens/32m/",
      description: "Official GroupLens dataset documentation",
    },
  ],
  facts: [
    { value: "4", label: "retrieval sources" },
    { value: "5", label: "maximum seed movies" },
    { value: "2", label: "recommendation stages" },
  ],
  sections: [
    {
      id: "summary",
      eyebrow: "Executive technical summary",
      title: "From a handful of films to a ranked discovery list",
      paragraphs: [
        "The product starts with up to five movies selected by a user. Those choices become a compact taste profile used to retrieve a broad candidate set from several recommendation representations, then to rank the most relevant candidates for the final list.",
        "The serving path combines TF-IDF, content-based, ALS, and two-tower retrieval artifacts. It merges their candidates, removes the original seed movies, fetches metadata from DynamoDB, builds query–candidate features at request time, and uses a LightGBM LambdaRank model for final ordering.",
        "I built the project independently over two months, including data preparation, metadata enrichment, artifact generation, FastAPI serving, the Next.js experience, and the AWS/Vercel deployment boundaries.",
      ],
      callout: {
        title: "Evidence boundary",
        body: "The system is deployed and functional, but comprehensive offline evaluation and extensive MLflow analysis have not yet been completed. This case study intentionally avoids unmeasured quality, latency, or engagement claims.",
      },
    },
    {
      id: "problem",
      eyebrow: "Problem definition",
      title: "Discovery is more nuanced than genre filtering",
      paragraphs: [
        "Users can often name films they enjoyed but cannot fully describe the combination of tone, era, themes, pacing, or metadata that made those films relevant. A global popularity list ignores that context.",
        "The machine learning problem is to find relevant items from a large catalog without applying expensive ranking logic to every item at request time. The engineering problem is to connect offline artifacts, movie metadata, an API boundary, and a responsive product flow.",
      ],
      bullets: [
        "Generate a broad candidate pool from multiple recommendation signals.",
        "Use richer metadata features for final ordering.",
        "Return an enriched movie result that the frontend can display directly.",
      ],
    },
    {
      id: "contribution",
      eyebrow: "My role",
      title: "End-to-end ownership across data, models, product, and deployment",
      paragraphs: [
        "This was a solo project. I implemented the MovieLens preparation path, TMDB and OMDb/IMDb enrichment integration, retrieval and ranker artifact workflows, FastAPI service, Next.js client experience, DynamoDB/S3 access, and cloud deployment configuration.",
      ],
      bullets: [
        "Prepared and enriched MovieLens-derived metadata for model and product use.",
        "Built multi-source retrieval, runtime feature generation, and LightGBM reranking boundaries.",
        "Delivered search, seed selection, recommendation results, deployment automation, and basic request instrumentation.",
      ],
    },
    {
      id: "data-lifecycle",
      eyebrow: "Data lifecycle",
      title: "MovieLens interactions become product-ready movie records",
      paragraphs: [
        "The primary source is MovieLens 32M. The repository expects movies, ratings, links, and tags files, using MovieLens movie IDs as the internal identifier. The links file maps those records to TMDB and IMDb identifiers for enrichment.",
        "The enrichment workflow fetches TMDB details, credits, and keywords, then supplements usable records with OMDb/IMDb data. It batches work, checkpoints progress, tracks failed IDs, and can retry failures before the final dataset is merged.",
        "Metadata preparation lowercases and trims selected strings, normalizes list fields, deduplicates movie IDs, filters ratings to enriched movies, consolidates user tags, and serializes records safely for DynamoDB.",
      ],
      callout: {
        title: "Dataset scope",
        body: "MovieLens 32M contains ratings and tags, while TMDB and OMDb/IMDb add product-facing metadata. Final filtered record counts are not stored as reproducible repository evidence and are not claimed here.",
      },
    },
    {
      id: "recommendation-design",
      eyebrow: "Recommendation design",
      title: "Retrieve broadly, then rank with metadata context",
      paragraphs: [
        "Each retriever loads an embedding matrix, FAISS index, and MovieLens-ID mapping. For a request, the system averages embeddings for seed movies available to that retriever and searches the corresponding index for similar items.",
        "The recall service runs TF-IDF, content-based, ALS, and two-tower retrieval concurrently. It merges candidates by movie ID, retains source provenance and source-specific scores, removes seed movies, and passes the merged set to the ranking stage.",
        "The feature builder uses seed metadata and candidate metadata to construct query averages, candidate quality fields, genre and tag overlap, and year/runtime distance features. LightGBM then predicts relevance scores and orders the final results.",
      ],
      bullets: [
        "Query profile: average seed rating, release year, and runtime.",
        "Candidate attributes: ratings, vote counts, popularity, IMDb values, year, and runtime.",
        "Interaction features: genre overlap, tag overlap, year distance, and runtime distance.",
      ],
      callout: {
        title: "Current behavior",
        body: "Mood and genre controls are implemented in the frontend as refinement inputs, but they are not yet connected to retrieval or ranking. Seed movie IDs are the current model input.",
      },
    },
    {
      id: "api-ux",
      eyebrow: "API and user experience",
      title: "A complete discovery flow, not a notebook-only interface",
      paragraphs: [
        "The Next.js application supports catalog browsing, autocomplete-based seed selection, optional mood/genre controls, loading and error states, persistent selection state, and a recommendation result grid with movie detail views.",
        "FastAPI validates request shape, exposes catalog and movie routes, generates recommendations through the pipeline, and returns enriched movie records. Recommendation responses are intentionally shaped for the frontend rather than exposing internal artifact details directly.",
      ],
    },
    {
      id: "deployment",
      eyebrow: "Deployment and reliability",
      title: "Separate frontend delivery from AWS model serving",
      paragraphs: [
        "The frontend is deployed on Vercel. The backend is packaged as a Python Lambda container behind API Gateway, with Docker, AWS SAM, Amazon ECR, and GitHub Actions configuration included in the repository.",
        "DynamoDB serves online movie metadata. S3 supplies model artifacts, which are cached in Lambda’s temporary filesystem. Basic MLflow instrumentation aggregates request latency, impressions, clicks, and sampled traces, but it is not yet a complete monitoring or experiment-management practice.",
      ],
    },
    {
      id: "evaluation",
      eyebrow: "Evaluation strategy",
      title: "The architecture is ready for evaluation; the evidence is not yet complete",
      paragraphs: [
        "The ranker configuration targets LambdaRank with NDCG evaluation settings, and the repository contains grouped split and metric-logging paths. However, there are no stored benchmark reports that support numerical quality claims for the deployed system.",
        "The next evaluation phase should compare popularity-only, individual retrieval sources, retrieval without reranking, and the complete pipeline using Recall@K, NDCG@K, coverage, diversity, and qualitative seed-to-result review sets.",
      ],
    },
    {
      id: "limitations",
      eyebrow: "Limitations and future work",
      title: "The next gains come from evidence, not decoration",
      paragraphs: [
        "The current system does not yet include robust offline evaluation reports, diversity-aware reranking, a full cold-start onboarding flow, mature backend integration tests, or comprehensive production monitoring. DynamoDB title search is scan-oriented and would need a stronger indexing strategy at larger scale.",
      ],
      bullets: [
        "Immediate: wire mood/genre inputs into retrieval filters or ranking features and add reproducible offline baselines.",
        "Medium-term: add diversity reranking, cold-start preferences, retrieval ablations, and a qualitative evaluation set.",
        "Production-scale: version datasets, artifacts, feature schemas, and indexes together; add integration tests, latency measurement, alerting, and rate limits.",
      ],
    },
  ],
  systemOverview: {
    id: "system-overview",
    eyebrow: "System overview",
    title: "System overview",
    evidence: "Code-backed architecture",
    paragraphs: [
      "The system keeps offline data preparation separate from online request handling. DynamoDB is the primary metadata source for serving; S3 holds the retrieval and ranking artifacts used by the Lambda runtime.",
    ],
  },
  workflow: {
    id: "workflow",
    eyebrow: "End-to-end workflow",
    title: "A request crosses product, retrieval, ranking, and metadata layers",
    paragraphs: [
      "The frontend persists selected seed movies locally, posts them to the recommendation API, and routes a successful response to the recommendations view. The backend creates a request ID, initializes the pipeline lazily, and logs stage-level work as the request progresses.",
      "The backend fetches seed metadata, retrieves candidates concurrently, filters candidates without metadata, builds runtime features, ranks candidates, and returns enriched movies for the results view.",
    ],
  },
  flows: [
    {
      title: "Offline data and artifact lifecycle",
      caption: "The product joins interaction data with enriched metadata before producing online-serving records and model artifacts.",
      lanes: [
        {
          label: "Data preparation",
          steps: [
            { title: "MovieLens 32M", detail: "movies, ratings, links, and tags" },
            { title: "Metadata enrichment", detail: "TMDB plus OMDb/IMDb fields" },
            { title: "Validation and merge", detail: "normalization, dedupe, tag grouping" },
          ],
        },
        {
          label: "Serving inputs",
          steps: [
            { title: "DynamoDB", detail: "movie metadata for online responses" },
            { title: "S3 artifacts", detail: "embeddings, FAISS indexes, ranker" },
          ],
        },
      ],
    },
    {
      title: "Online recommendation request",
      caption: "Four retrieval sources create recall; runtime features and LightGBM decide final ordering.",
      lanes: [
        {
          label: "Product request",
          steps: [
            { title: "Select seeds", detail: "up to five movies in Next.js" },
            { title: "POST /recommend", detail: "FastAPI via API Gateway and Lambda" },
          ],
        },
        {
          label: "Recommendation pipeline",
          steps: [
            { title: "Four retrievers", detail: "TF-IDF, content, ALS, two-tower" },
            { title: "Merge candidates", detail: "exclude seeds and keep source traces" },
            { title: "Build features", detail: "metadata overlap and distance fields" },
            { title: "LightGBM rerank", detail: "return ranked enriched movies" },
          ],
        },
      ],
    },
  ],
  tables: {
    api: {
      title: "API surface",
      caption: "The backend supports both discovery browsing and personalized recommendation requests.",
      columns: ["Method", "Endpoint", "Purpose"],
      rows: [
        { Method: "GET", Endpoint: "/ping", Purpose: "Lightweight service response" },
        { Method: "GET", Endpoint: "/api/v1/catalog/*", Purpose: "Trending, popular, and new catalog views" },
        { Method: "GET", Endpoint: "/api/v1/movies/search?q=", Purpose: "Seed-movie autocomplete" },
        { Method: "GET", Endpoint: "/api/v1/movies/{movie_id}", Purpose: "Movie detail by MovieLens ID" },
        { Method: "POST", Endpoint: "/api/v1/recommend", Purpose: "Retrieve and rank personalized recommendations" },
        { Method: "POST", Endpoint: "/api/v1/recommend/click", Purpose: "Basic click instrumentation" },
      ],
    },
    decisions: {
      title: "Engineering decisions and trade-offs",
      caption: "The design favors a maintainable two-stage serving boundary over a single all-purpose model.",
      columns: ["Decision", "Selected approach", "Reason", "Trade-off"],
      rows: [
        { Decision: "Recommendation architecture", "Selected approach": "Retrieval plus reranking", Reason: "Separates broad recall from detailed ordering", "Trade-off": "Requires aligned artifacts and feature schemas" },
        { Decision: "Candidate generation", "Selected approach": "Four retrieval sources", Reason: "Combines different similarity signals", "Trade-off": "More artifacts to validate and maintain" },
        { Decision: "Vector search", "Selected approach": "FAISS inner-product indexes", Reason: "Efficient search over item representations", "Trade-off": "Embedding, index, and ID-map versions must match" },
        { Decision: "Final ranking", "Selected approach": "LightGBM LambdaRank", Reason: "Uses metadata overlap and quality signals", "Trade-off": "Needs consistent training and serving features" },
        { Decision: "Online storage", "Selected approach": "DynamoDB metadata and S3 artifacts", Reason: "Separates movie records from model files", "Trade-off": "Cold-start and artifact lineage need monitoring" },
        { Decision: "Deployment", "Selected approach": "Lambda, API Gateway, Vercel", Reason: "Clear serverless backend and frontend boundaries", "Trade-off": "Dependency size and artifact loading affect cold starts" },
      ],
    },
    skills: {
      title: "Skills demonstrated",
      caption: "Each capability is tied to an implemented project boundary.",
      columns: ["Capability", "Evidence"],
      rows: [
        { Capability: "Data engineering", Evidence: "MovieLens preparation, enrichment, normalization, and DynamoDB-safe serialization" },
        { Capability: "Recommender systems", Evidence: "Multi-source retrieval, candidate provenance, FAISS search, and reranking" },
        { Capability: "Feature engineering", Evidence: "Seed-profile statistics, metadata quality, genre/tag overlap, and distance features" },
        { Capability: "Backend engineering", Evidence: "FastAPI, typed requests, lazy pipeline initialization, S3, and DynamoDB" },
        { Capability: "Frontend engineering", Evidence: "Next.js discovery flow, persisted seeds, loading/error states, and result views" },
        { Capability: "Cloud delivery", Evidence: "Docker, Lambda, API Gateway, SAM, ECR, GitHub Actions, and Vercel" },
      ],
    },
  },
};
