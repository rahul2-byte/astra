import type { ProjectArticleCaseStudy } from "@/content/project-article";

export const productionMlCaseStudy: ProjectArticleCaseStudy = {
  meta: {
    title: "Production ML Systems at Intangles",
    summary:
      "Ongoing production OBD telemetry analytics for fleet operations, focused on reliable fuel-event detection, data-quality checks, and alert quality under noisy real-world signals.",
    category: "Production ML · telemetry analytics · technical case study",
    role: "Machine Learning Engineer",
    duration: "April 2022 – present",
    status: "Ongoing professional work",
    stack: ["Python", "SQL", "Pandas", "NumPy", "scikit-learn", "DBSCAN", "LOESS", "SMA", "Node.js"],
    resourcesTitle: "Review professional evidence",
  },
  toc: [
    { id: "summary", label: "Executive summary" },
    { id: "problem", label: "Problem and scope" },
    { id: "contribution", label: "Contribution" },
    { id: "system-overview", label: "System overview" },
    { id: "signal-quality", label: "Signal quality" },
    { id: "detection-design", label: "Detection design" },
    { id: "workflow", label: "Operational workflow" },
    { id: "api-ux", label: "Signal methods" },
    { id: "evaluation", label: "Evaluation and outcomes" },
    { id: "reliability", label: "Reliability and confidentiality" },
    { id: "decisions", label: "Decisions" },
    { id: "skills", label: "Skills demonstrated" },
    { id: "limitations", label: "Limitations and next work" },
  ],
  resources: [
    {
      label: "View experience summary",
      href: "/experience",
      description: "Production ML role, outcomes, and related case studies",
      external: false,
    },
    {
      label: "View web resume",
      href: "/resume",
      description: "Recruiter-facing technical profile and work history",
      external: false,
    },
    {
      label: "Download technical resume",
      href: "/resume.pdf",
      description: "Resume-backed professional experience summary",
      external: false,
    },
  ],
  facts: [
    { value: "95%", label: "alert accuracy maintained" },
    { value: "15%", label: "false-positive reduction" },
    { value: "30+ hrs/week", label: "operational time reclaimed" },
  ],
  sections: [
    {
      id: "summary",
      eyebrow: "Executive technical summary",
      title: "Production fuel analytics for noisy fleet telemetry",
      paragraphs: [
        "At Intangles, I work on production OBD telemetry analytics for fleet operations, with a focus on making fuel-event alerts reliable when fuel-level, GPS, and related vehicle signals are noisy, incomplete, and operationally sensitive.",
        "My work primarily extends and optimizes an existing DBSCAN + LOESS fuel-event detection system, then strengthens the surrounding workflow with sub-threshold event detection, fuel/GPS/telemetry data-loss checks, SMA-based signal smoothing, and Node.js analytics improvements.",
        "The resulting alerts support customers as well as internal dashboards and support workflows. Internal review and production monitoring showed approximately 95% alert accuracy maintained and a 15% reduction in false positives; analytics refactoring also helped reduce support queries from approximately six to two per day and reclaim more than 30 operational hours per week.",
      ],
      callout: {
        title: "Confidentiality boundary",
        body: "This public case study is resume-backed and intentionally omits customer names, fleet volumes, telemetry schemas, thresholds, model parameters, proprietary rules, internal architecture, dashboards, and source code.",
      },
    },
    {
      id: "problem",
      eyebrow: "Problem definition",
      title: "An alert must be both accurate and operationally trustworthy",
      paragraphs: [
        "Fuel analytics must distinguish meaningful fuel events from ordinary sensor variation, missing signals, and vehicle movement. Too many false alerts create support load and weaken customer trust; overly conservative logic can miss lower-magnitude or unusual events.",
        "The engineering problem was to improve an established detection workflow without making it opaque or difficult to operate. Signal quality, explainability, alert reliability, and maintainable analytics code mattered alongside algorithmic performance.",
      ],
      bullets: [
        "Noisy fuel-level sensors can mimic genuine fuel movement.",
        "Fuel, GPS, and telemetry gaps can hide events or resemble them.",
        "Sub-threshold events can be missed by threshold-only logic.",
      ],
    },
    {
      id: "contribution",
      eyebrow: "My role",
      title: "Extending a production detection system and its reliability layers",
      paragraphs: [
        "I primarily extended and optimized an existing core DBSCAN + LOESS detection algorithm. My contribution covered the surrounding signal-quality, detection, and analytics improvements needed to keep fuel alerts useful in real production conditions.",
      ],
      bullets: [
        "Extended fuel-event detection for refill, theft, and data-loss event workflows.",
        "Built sub-threshold event detection for lower-magnitude events.",
        "Built fuel, GPS, and telemetry data-loss detection during active vehicle movement.",
        "Applied SMA smoothing before downstream classification and refactored Node.js analytics logic.",
      ],
    },
    {
      id: "signal-quality",
      eyebrow: "Data and signal quality",
      title: "Signal hygiene is a prerequisite for reliable classification",
      paragraphs: [
        "The public-safe system view centers on fuel level, GPS, and telemetry signals. Each can contain instability, gaps, or transitions that do not represent genuine fuel movement, so the pipeline must account for data quality before producing an operational alert.",
        "SMA smoothing is applied to noisy fuel-level readings to surface the underlying signal before downstream classification. Dedicated data-loss checks identify missing fuel, GPS, and telemetry information during vehicle movement, helping distinguish probable sensor dropout from genuine events.",
      ],
      callout: {
        title: "Data boundary",
        body: "Sampling intervals, schemas, vehicle identifiers, fleet size, retention policy, and internal feature definitions are confidential and are not published here.",
      },
    },
    {
      id: "detection-design",
      eyebrow: "Detection system design",
      title: "Extend explainable methods instead of adding unnecessary complexity",
      paragraphs: [
        "The existing event workflow combines DBSCAN and LOESS to work with noisy, local fuel-level patterns. I extended that workflow rather than replacing it with an opaque model, because stable operation and explainability are important in a customer-impacting alert system.",
        "SMA smoothing reduces short-term sensor noise, sub-threshold logic broadens coverage for lower-magnitude events, and data-loss detection checks whether the available context is sufficient to interpret fuel movement safely.",
      ],
    },
    {
      id: "api-ux",
      eyebrow: "Signal methods",
      title: "Each signal problem has a purpose-built public-safe treatment",
      paragraphs: [
        "The implementation combines complementary methods rather than relying on one rule. This table describes the public behaviour and purpose of each layer without exposing confidential thresholds, schemas, or code.",
      ],
    },
    {
      id: "evaluation",
      eyebrow: "Evaluation and outcomes",
      title: "Production monitoring connected alert quality to support impact",
      paragraphs: [
        "The 95% alert-accuracy and 15% false-positive figures were measured through internal review and production monitoring. They are presented as operational outcomes rather than a public benchmark, because the evaluation data, labels, dashboard configuration, and customer-specific breakdowns are confidential.",
        "The Node.js analytics refactor addressed level-consumption mapping and bin-based mean/standard-deviation computation issues. It helped reduce support queries from approximately six to two per day, reclaiming more than 30 operational hours per week.",
      ],
    },
    {
      id: "reliability",
      eyebrow: "Reliability, safety, and confidentiality",
      title: "Production improvements must respect both users and proprietary systems",
      paragraphs: [
        "This work operates in a customer-impacting production context. Improving alert quality means reducing avoidable noise, checking data loss explicitly, and keeping the analytics code understandable enough to support safe operational changes.",
        "The portfolio describes only public, resume-backed contribution. It does not provide production logs, customer records, source code, thresholds, internal alert-routing logic, or architecture specifics.",
      ],
    },
    {
      id: "limitations",
      eyebrow: "Limitations and future work",
      title: "The public narrative stays bounded by confidentiality",
      paragraphs: [
        "This is a high-level professional case study, not a reproducible open-source project. Public readers cannot inspect the proprietary dataset, implementation, infrastructure, evaluation set, or internal monitoring system.",
      ],
      bullets: [
        "Continue monitoring alert quality and support impact as real-world telemetry conditions evolve.",
        "Refine signal-quality and data-loss checks without exposing client-specific rules.",
        "Preserve explainability, reliability, and maintainability as the production workflow grows.",
      ],
    },
  ],
  systemOverview: {
    id: "system-overview",
    eyebrow: "System overview",
    title: "A production workflow from telemetry quality to operational alerting",
    evidence: "Resume-backed public summary",
    paragraphs: [
      "The public architecture separates the signal-quality and detection concerns from the alerting outcome. OBD telemetry is validated and smoothed before fuel-event, sub-threshold, and data-loss logic contribute to customer-facing and internal operational alerts.",
      "This is a conceptual, public-safe representation. It does not reveal the production ingestion stack, storage layer, service boundaries, parameter values, or customer-specific logic.",
    ],
  },
  workflow: {
    id: "workflow",
    eyebrow: "Operational workflow",
    title: "From incoming vehicle signals to actionable alert quality",
    paragraphs: [
      "Vehicle telemetry enters the production workflow as fuel-level, GPS, and related signals. Validation and SMA smoothing handle instability before the detection layers interpret possible fuel movement and lower-magnitude events.",
      "Fuel, GPS, and telemetry data-loss checks identify missing context during active movement. The resulting alert output supports customer-facing notifications as well as internal dashboards and support processes, while production monitoring informs ongoing quality improvement.",
    ],
  },
  flows: [
    {
      title: "Public-safe production ML flow",
      caption: "The diagram illustrates the system responsibilities without disclosing proprietary infrastructure, thresholds, or client-specific logic.",
      lanes: [
        {
          label: "Signal path",
          steps: [
            { title: "OBD telemetry", detail: "Fuel level, GPS, and related signals" },
            { title: "Validate and smooth", detail: "Signal checks and SMA cleanup" },
            { title: "Detect events", detail: "DBSCAN, LOESS, and sub-threshold logic" },
            { title: "Check data loss", detail: "Fuel, GPS, and telemetry gaps" },
          ],
        },
        {
          label: "Operational path",
          steps: [
            { title: "Alert output", detail: "Customer-facing and internal alerts" },
            { title: "Support workflow", detail: "Operational follow-through and monitoring" },
          ],
        },
      ],
    },
    {
      title: "Alert-quality improvement loop",
      caption: "The work treats monitored alert quality and operational feedback as inputs to continuous production improvement.",
      lanes: [
        {
          label: "Production loop",
          steps: [
            { title: "Review alerts", detail: "Internal review and production monitoring" },
            { title: "Improve reliability", detail: "Tune signal handling and analytics logic" },
            { title: "Reduce support load", detail: "Fewer avoidable false-positive workflows" },
          ],
        },
      ],
    },
  ],
  tables: {
    api: {
      title: "Signal to method to outcome",
      caption: "Each treatment addresses a production signal-quality or alert-reliability concern; proprietary implementation detail remains confidential.",
      columns: ["Signal or concern", "Problem", "Public-safe method", "Operational outcome"],
      rows: [
        { "Signal or concern": "Fuel level", Problem: "Noisy and unstable readings", "Public-safe method": "SMA smoothing", "Operational outcome": "More stable series before classification" },
        { "Signal or concern": "Fuel events", Problem: "Local patterns in noisy telemetry", "Public-safe method": "DBSCAN + LOESS extension", "Operational outcome": "Reliable event detection workflow" },
        { "Signal or concern": "Sub-threshold events", Problem: "Lower-magnitude events can be missed", "Public-safe method": "Dedicated sub-threshold detection", "Operational outcome": "Broader event coverage" },
        { "Signal or concern": "Data loss", Problem: "Silent fuel, GPS, or telemetry gaps", "Public-safe method": "Data-loss checks", "Operational outcome": "Better separation of dropout and genuine movement" },
        { "Signal or concern": "Analytics operations", Problem: "Mapping and bin-statistics bugs", "Public-safe method": "Node.js refactor", "Operational outcome": "Reduced support-query burden" },
      ],
    },
    decisions: {
      title: "Engineering decisions and trade-offs",
      caption: "The selected methods prioritize explainability, operational stability, and signal quality in a customer-impacting production environment.",
      columns: ["Decision", "Selected approach", "Reason", "Trade-off"],
      rows: [
        { Decision: "Event detection", "Selected approach": "Extend DBSCAN + LOESS workflow", Reason: "Build on an established, interpretable production system", "Trade-off": "Requires careful handling of noisy inputs and edge cases" },
        { Decision: "Signal processing", "Selected approach": "SMA smoothing before classification", Reason: "Stabilize noisy fuel-level readings", "Trade-off": "Must preserve meaningful movement" },
        { Decision: "Lower-magnitude events", "Selected approach": "Sub-threshold detection", Reason: "Recover events missed by threshold-only logic", "Trade-off": "Needs protection against increased alert noise" },
        { Decision: "Missing signals", "Selected approach": "Fuel, GPS, and telemetry data-loss checks", Reason: "Separate likely dropout from genuine movement", "Trade-off": "Missing context can still limit certainty" },
        { Decision: "Analytics maintenance", "Selected approach": "Node.js analytics refactor", Reason: "Improve operational reliability and support efficiency", "Trade-off": "Changes must be safe in an established codebase" },
      ],
    },
    skills: {
      title: "Skills demonstrated",
      caption: "Each capability is tied to a resume-backed, public-safe contribution.",
      columns: ["Capability", "Evidence"],
      rows: [
        { Capability: "Production ML", Evidence: "Extended and optimized live fuel-event detection workflows" },
        { Capability: "Telemetry analytics", Evidence: "Worked with noisy fuel-level, GPS, and vehicle telemetry signals" },
        { Capability: "Event detection", Evidence: "DBSCAN, LOESS, and sub-threshold event logic" },
        { Capability: "Data quality", Evidence: "Fuel, GPS, and telemetry data-loss detection" },
        { Capability: "Signal processing", Evidence: "SMA smoothing before downstream classification" },
        { Capability: "Backend analytics", Evidence: "Node.js refactor for level-consumption mapping and bin statistics" },
        { Capability: "Operational engineering", Evidence: "Alert-quality improvement and support-workload reduction" },
      ],
    },
  },
};
