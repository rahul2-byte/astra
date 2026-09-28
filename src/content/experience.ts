export const experience = {
  dates: "Apr 2022 – Present",
  outcomes: [
    { value: "150,000", label: "vehicles covered by Fuel Analytics" },
    { value: "530,000", label: "refill events each month" },
  ],
  workstreams: [
    {
      title: "Spec Tag recommender",
      points: [
        "Built an internal RAG recommender for 4–5 vehicle tags per request with LangGraph, FastAPI, sentence-transformer embeddings, a PyTorch projection network, pgvector, confidence tiers, and MMR reranking.",
        "At least one suggestion was kept on 97% of about 10,500 first requests over three months; p95 latency stayed under one second including Bedrock. Added RabbitMQ consumers and JSON, type, and deterministic checks before team review.",
      ],
    },
    {
      title: "Fuel Analytics",
      points: [
        "Extended DBSCAN/LOESS on OBD data for customer-facing analytics across 150,000 vehicles and about 530,000 monthly refill events; added detection for small events missed by existing thresholds or sensor limits.",
        "Moving-average smoothing cut monthly theft alerts from 7,500 to 6,375 (15%), checked across matched three-month periods with customer and account-manager feedback. Refill estimates were within ±5% per eligible event; missing logs, bad readings, outliers, and failed estimates were excluded.",
      ],
    },
    {
      title: "EV battery coolant temperature",
      points: [
        "Prepared irregular OBD/CAN data and ambient-temperature features for an existing TensorFlow/Keras LSTM pipeline, producing contextual and forecast health states.",
        "Added physical-bound checks and output clipping, with deterministic fallbacks for missing inputs or degraded inference.",
      ],
    },
    {
      title: "Production monitoring",
      points: [
        "Monitored Fuel Analytics and Spec Tag production releases using OpenTelemetry traces and MLflow/S3 artifacts.",
        "Debugged production releases using OpenTelemetry traces and MLflow/S3 artifacts.",
      ],
    },
  ],
};
