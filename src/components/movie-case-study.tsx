import type { Project } from "@/content/projects";
import { EvidenceTableScroll } from "@/components/evidence-table-scroll";

const retrieval = [
  { name: "ALS", recall10: 0.063379, recall100: 0.351757, p50: 0.332, p95: 0.358, p99: 0.375 },
  { name: "Item graph", recall10: 0.058041, recall100: 0.273285, p50: 0.330, p95: 0.358, p99: 0.371 },
  { name: "Two-tower", recall10: 0.052333, recall100: 0.297732, p50: 0.317, p95: 0.351, p99: 0.365 },
  { name: "Content", recall10: 0.004477, recall100: 0.019587, p50: 0.332, p95: 0.361, p99: 0.376 },
];

const rankFeatures = [
  "retrieval_source_count",
  "retrieval_als_rank",
  "retrieval_als_score_normalized",
  "retrieval_item_graph_rank",
  "retrieval_item_graph_score_normalized",
  "retrieval_two_tower_rank",
  "retrieval_two_tower_score_normalized",
  "retrieval_content_rank",
  "retrieval_content_score_normalized",
  "candidate_train_interaction_count",
  "candidate_train_log_interaction_count",
];

const workflow = [
  { title: "Select seeds", detail: "Choose up to five movies from the catalog." },
  { title: "Retrieve", detail: "Four retrievers produce candidates for each seed." },
  { title: "Fuse and rank", detail: "Deduplicate, fuse ranks, then score with LightGBM." },
  { title: "Enrich results", detail: "Attach TMDB metadata and return recommendations." },
];

const sections = [
  ["why", "Why this approach"],
  ["funnel", "Recommendation funnel"],
  ["retrieval", "Candidate retrieval"],
  ["ranking", "LightGBM ranking"],
  ["evaluation", "Evaluation"],
  ["constraints", "Production trade-offs"],
  ["quickstart", "CLI quickstart"],
] as const;

export function MovieCaseStudy({ project }: { project: Project }) {
  const evidence = project.evidence;
  if (!evidence) return null;

  const metrics = evidence.rows.map(([name, baseline, fusion, ranker]) => ({
    name,
    baseline: Number(baseline),
    fusion: Number(fusion),
    ranker: Number(ranker),
  }));

  return (
    <article className="movie-study" aria-labelledby="movie-study-title">
      <header className="movie-study-heading">
        <p className="movie-study-kicker">Independent project <span>·</span> Recommendation systems</p>
        <h1 id="movie-study-title">Multi-Stage Movie Recommendation System: Hybrid Retrieval &amp; Reranking</h1>
        <p className="movie-study-deck">A two-stage recommendation system that combines four candidate retrievers, reciprocal-rank fusion, and LightGBM ranking. Choose up to five seed movies and receive personalized recommendations.</p>
        <ul className="movie-study-tags" aria-label="Project technologies">
          {project.tools.map((tool) => <li key={tool}>{tool}</li>)}
        </ul>
        <div className="movie-study-meta">
          <div><span>Data</span><strong>MovieLens 32M + TMDB</strong></div>
          <div><span>Candidate pool</span><strong>Up to 300 per request</strong></div>
          <div><span>Serving</span><strong>FastAPI · Docker · AWS Lambda</strong></div>
          <div><span>Evaluation</span><strong>Offline validation + local benchmark</strong></div>
        </div>
        <div className="movie-study-actions">
          <a className="text-link text-link-primary" href={project.repository} target="_blank" rel="noopener noreferrer">GitHub repository <span aria-hidden="true">↗</span></a>
          {project.liveDemo && <a className="text-link" href={project.liveDemo} target="_blank" rel="noopener noreferrer">Live demo <span aria-hidden="true">↗</span></a>}
          <a className="text-link" href={project.evidenceLink} target="_blank" rel="noopener noreferrer">Evaluation results <span aria-hidden="true">↗</span></a>
        </div>
      </header>

      <section id="movie-overview" className="movie-metrics" aria-label="Selected validation results">
        {metrics.map(({ name, baseline, ranker }) => {
          const gain = ((ranker / baseline - 1) * 100).toFixed(2);
          return <article className="movie-metric" key={name}><span>{name}</span><strong>{ranker.toFixed(6)}</strong><small>+{gain}% vs popularity</small></article>;
        })}
        <article className="movie-metric"><span>Warm serving p50</span><strong>26.70 ms</strong><small>In-process · 50 requests</small></article>
      </section>

      <div className="movie-study-content">
        <div className="movie-section-row">
          <aside className="movie-study-rail" aria-label="Project section navigation">
            <nav aria-label="On this page">
              <h2>On this page</h2>
              <ol>{sections.map(([id, label], index) => <li key={id}><a href={`#movie-${id}`}><span>{String(index + 1).padStart(2, "0")}</span>{label}</a></li>)}</ol>
            </nav>
          </aside>
          <section id="movie-why" className="movie-section">
            <SectionHeading number="01" eyebrow="Problem framing" title="Why I built it: the limits of a single retriever" />
            <p className="movie-lead">A useful recommendation system needs both broad candidate coverage and a way to order those candidates. Ranking cannot recover a relevant movie that retrieval never surfaced.</p>
            <div className="movie-three-cards">
              <article><span className="movie-card-mark">01</span><h3>Start from a few films</h3><p>{project.problem}</p></article>
              <article><span className="movie-card-mark">02</span><h3>Combine complementary signals</h3><p>ALS, item-graph, two-tower, and content retrieval generate candidates from each selected seed.</p></article>
              <article><span className="movie-card-mark">03</span><h3>Rank only what was found</h3><p>Reciprocal-rank fusion combines the lists; LightGBM reranks the capped candidate pool.</p></article>
            </div>
            <p className="movie-callout"><strong>Evaluation boundary</strong> Offline ranking scores measure recovery of later positive ratings, not online engagement or whether people liked the recommendations.</p>
          </section>
        </div>
        <div className="movie-section-row">
          <aside className="movie-study-rail" aria-label="Offline and online paths"><div className="movie-rail-note"><strong>Offline + online</strong><p>Training and evaluation run offline. Requests load a compatible immutable bundle.</p></div></aside>
          <section id="movie-funnel" className="movie-section">
            <SectionHeading number="02" eyebrow="System overview" title="The two-stage recommendation funnel" />
            <p className="movie-lead">The request path turns a small seed set into a bounded shortlist, then enriches the ranked results for display.</p>
            <ol className="movie-flow">
              {workflow.map((step, index) => <li key={step.title}><span className="movie-flow-number">0{index + 1}</span><h3>{step.title}</h3><p>{step.detail}</p></li>)}
            </ol>
            <div className="movie-pipeline" aria-label="Request pipeline">
              <span>Up to 5 seed films</span><b aria-hidden="true">→</b><span>4 retrievers</span><b aria-hidden="true">→</b><span>Deduplicate + cap at 300</span><b aria-hidden="true">→</b><span>RRF + LightGBM</span><b aria-hidden="true">→</b><span>TMDB metadata</span>
            </div>
            <div className="movie-flow-detail">
              <article><span className="movie-small-label">Offline model building</span><p>MovieLens ratings + TMDB metadata <b>→</b> chronological user split <b>→</b> four retrievers + ranker <b>→</b> validation <b>→</b> immutable model bundle</p></article>
              <article><span className="movie-small-label">Online recommendation</span><p>Seed IDs <b>→</b> parallel candidate retrieval <b>→</b> ID deduplication and seed exclusion <b>→</b> RRF features <b>→</b> ranking <b>→</b> metadata-enriched response</p></article>
            </div>
            <div className="movie-api-contract">
              <div><span className="movie-small-label">Request · POST /api/v1/recommend</span><code>{`{"seed_tmdb_ids":[603,238],"moods":["DARK"],"limit":20}`}</code><p>One to five positive TMDB IDs; the API bounds the requested result count from 1 to 150.</p></div>
              <div><span className="movie-small-label">Response contract</span><code>recommendations[] · tmdbId · title · rankScore</code><p>The frontend requests 20 results. <code>rankScore</code> is an ordering score, not a probability or user rating.</p></div>
            </div>
            <p className="movie-footnote">Training is not invoked during an online request. The recommendation path requires a compatible prebuilt model bundle.</p>
          </section>
        </div>
        <div className="movie-section-row">
          <aside className="movie-study-rail" aria-label="Candidate retrieval limits"><div className="movie-rail-note"><strong>Candidate limits</strong><p>Up to 200 candidates per seed and source; exclude seeds, deduplicate IDs, then cap the pool at 300.</p></div></aside>
          <section id="movie-retrieval" className="movie-section">
            <SectionHeading number="03" eyebrow="Candidate generation" title="Four retrieval paths, one fused shortlist" />
            <p className="movie-lead">Each seed is sent to ALS, item-graph, two-tower, and content retrievers. Candidates are deduplicated by TMDB ID, seeds are excluded, and the pool is capped before ranking.</p>
            <div className="movie-retriever-cards">
              <article><h3>ALS</h3><p>Latent item factors from positive user–movie interactions; seed item vectors drive lookup.</p><small>64 factors · 15 iterations</small></article>
              <article><h3>Item graph</h3><p>Binary co-occurrence neighbors, ranked with BM25-style weighting.</p><small>200 neighbors · BM25 graph</small></article>
              <article><h3>Two-tower</h3><p>Learned item embeddings searched by cosine similarity.</p><small>64 dimensions · 3 epochs</small></article>
              <article><h3>Content</h3><p>Weighted metadata text transformed with TF-IDF and SVD.</p><small>75k features · 256 dimensions</small></article>
            </div>
            <p id="movie-retrieval-hint" className="movie-table-hint">Scroll horizontally to view all columns.</p>
            <EvidenceTableScroll title="Offline retrieval results" hintId="movie-retrieval-hint">
              <table className="movie-data-table">
                <caption>Offline validation retrieval recall and local in-process latency</caption>
                <thead><tr><th scope="col">Retriever</th><th scope="col">Recall@10</th><th scope="col">Recall@100</th><th scope="col">P50</th><th scope="col">P95</th><th scope="col">P99</th></tr></thead>
                <tbody>{retrieval.map((item) => <tr key={item.name}><th scope="row">{item.name}</th><td>{item.recall10.toFixed(6)}</td><td>{item.recall100.toFixed(6)}</td><td>{item.p50.toFixed(3)} ms</td><td>{item.p95.toFixed(3)} ms</td><td>{item.p99.toFixed(3)} ms</td></tr>)}</tbody>
              </table>
            </EvidenceTableScroll>
            <p className="movie-footnote">Retrieval results cover 198,935 validation queries with zero recorded retrieval failures. Timings are local in-process measurements, not Lambda production latency.</p>
            <div className="movie-rrf"><div><span className="movie-small-label">Rank fusion</span><h3>Reciprocal-rank fusion</h3><p>Ranks are combined instead of raw similarity scores because the retrievers use incompatible score scales.</p></div><code>contribution = 1 / (60 + rank)</code></div>
            <div className="movie-code-window movie-rrf-code"><div className="movie-code-title"><span aria-hidden="true"><i /><i /><i /></span><span>Rank-based fusion · simplified</span></div><pre><code>{`# Each source map contains candidate ID -> one-based rank.
# A missing candidate contributes no fusion evidence.
scores = {}
for source_name, source_ranks in retriever_ranks.items():
    for movie_id, rank in source_ranks.items():
        if rank <= 0:
            continue
        contribution = 1.0 / (60 + rank)
        scores[movie_id] = scores.get(movie_id, 0.0) + contribution

# One dictionary entry per ID deduplicates across retrieval sources.
# Seeds are excluded before results are ranked.
eligible = {
    movie_id: score
    for movie_id, score in scores.items()
    if movie_id not in seed_ids
}

# Stable tie-break by ID; the fused score is an ordering signal.
ordered = sorted(eligible, key=lambda movie_id: (-eligible[movie_id], movie_id))
return ordered[:300]`}</code></pre></div>
          </section>
        </div>
        <div className="movie-section-row">
          <aside className="movie-study-rail" aria-label="Ranking feature contract"><div className="movie-rail-note"><strong>Ranker contract</strong><p>Eleven ordered features. The serialized schema must match training and inference.</p></div></aside>
          <section id="movie-ranking" className="movie-section">
            <SectionHeading number="04" eyebrow="Learned ordering" title="LightGBM reranking and 11 ranking features" />
            <p className="movie-lead">A LightGBM LambdaRank model scores the fused candidate pool using source counts, per-retriever ranks and normalized scores, plus candidate-popularity features.</p>
            <div className="movie-feature-groups">
              <article><h3>Retriever signals</h3><ul>{rankFeatures.slice(0, 9).map((feature) => <li key={feature}>{feature}</li>)}</ul></article>
              <article><h3>Candidate history</h3><ul>{rankFeatures.slice(9).map((feature) => <li key={feature}>{feature}</li>)}</ul></article>
            </div>
            <p className="movie-footnote">The feature order is versioned with the ranker schema and must stay aligned at inference time.</p>
            <div className="movie-model-config"><span>Objective <strong>LambdaRank</strong></span><span>Learning rate <strong>0.05</strong></span><span>Leaves <strong>31</strong></span><span>Boosting rounds <strong>up to 300</strong></span><span>Early stopping <strong>30 rounds</strong></span></div>
            <div className="movie-gain-chart">
              <div className="movie-chart-heading"><div><span className="movie-small-label">Feature contract · ranking_features.yaml</span><h3>11 inputs by signal family</h3></div><span>Count, not gain</span></div>
              <div className="movie-gain-row"><span>Agreement</span><div><i style={{ width: "12.5%" }} /></div><strong>1</strong></div>
              <div className="movie-gain-row"><span>Ranks + scores</span><div><i style={{ width: "100%" }} /></div><strong>8</strong></div>
              <div className="movie-gain-row"><span>Popularity</span><div><i style={{ width: "25%" }} /></div><strong>2</strong></div>
              <p>One source-agreement signal, four retriever rank/score pairs, and two candidate-history features.</p>
            </div>
            <div className="movie-gain-chart">
              <div className="movie-chart-heading"><div><span className="movie-small-label">Validation · LightGBM vs popularity</span><h3>Relative ranking-metric lift</h3></div><span>Higher is better</span></div>
              {metrics.map(({ name, baseline, ranker }) => {
                const gain = (ranker / baseline - 1) * 100;
                return <div className="movie-gain-row" key={name}><span>{name}</span><div><i style={{ width: `${Math.min(gain, 80) / 80 * 100}%` }} /></div><strong>+{gain.toFixed(2)}%</strong></div>;
              })}
              <p>Relative change calculated from the repository&apos;s validation metrics.</p>
            </div>
          </section>
        </div>
        <div className="movie-section-row">
          <aside className="movie-study-rail" aria-label="Validation protocol"><div className="movie-rail-note"><strong>Validation only</strong><p>Later per-user ratings ≥3.0. The untouched final test set is not reported as a result here.</p></div></aside>
          <section id="movie-evaluation" className="movie-section">
            <SectionHeading number="05" eyebrow="Validation results" title="Evaluation and comparative analysis" />
            <p className="movie-lead">The validation comparison includes popularity, rank-only reciprocal-rank fusion, and LightGBM. The final test partition is kept separate from iterative model selection.</p>
            <p id="movie-evaluation-hint" className="movie-table-hint">Scroll horizontally to view all columns.</p>
            <EvidenceTableScroll title="Ranking evaluation results" hintId="movie-evaluation-hint">
              <table className="movie-data-table movie-evaluation-table">
                <caption>{evidence.caption}</caption>
                <thead><tr>{evidence.headings.map((heading) => <th key={heading} scope="col">{heading}</th>)}</tr></thead>
                <tbody>{evidence.rows.map((row) => <tr key={row[0]}>{row.map((cell, index) => index === 0 ? <th key={cell} scope="row">{cell}</th> : <td key={`${row[0]}-${index}`}>{cell}</td>)}</tr>)}</tbody>
              </table>
            </EvidenceTableScroll>
            <div className="movie-benchmark-grid">
              <article><span>In-process model path</span><strong>26.70 / 31.88 / 34.65 ms</strong><small>p50 / p95 / p99 · 50 warm requests</small></article>
              <article><span>HTTP with cached metadata</span><strong>32.02 / 35.35 / 37.38 ms</strong><small>p50 / p95 / p99 · same local benchmark</small></article>
            </div>
            <p className="movie-footnote">{evidence.note}</p>
            <p className="movie-callout"><strong>Read the result in context</strong> The validation target is recovery of later ratings of 3.0 or higher. These metrics are not online engagement, user satisfaction, or final test-set results.</p>
            <p id="movie-baseline-hint" className="movie-table-hint">Scroll horizontally to view all columns.</p>
            <EvidenceTableScroll title="Popularity baseline by cutoff" hintId="movie-baseline-hint">
              <table className="movie-data-table"><caption>Validation retrieval metrics for the popularity baseline</caption><thead><tr><th scope="col">Metric</th><th scope="col">@10</th><th scope="col">@20</th><th scope="col">@50</th><th scope="col">@100</th><th scope="col">@200</th></tr></thead><tbody><tr><th scope="row">Recall</th><td>0.037519</td><td>0.069420</td><td>0.133767</td><td>0.212952</td><td>0.334661</td></tr><tr><th scope="row">Hit rate</th><td>0.295961</td><td>0.432272</td><td>0.635152</td><td>0.761420</td><td>0.856541</td></tr></tbody></table>
            </EvidenceTableScroll>
            <p className="movie-table-hint">Compression preserves list overlap, not ranking quality.</p>
            <EvidenceTableScroll title="Model bundle compression experiment">
              <table className="movie-data-table"><caption>Top-K Jaccard overlap vs the uncompressed reference bundle</caption><thead><tr><th scope="col">Variant</th><th scope="col">Bundle bytes</th><th scope="col">Top-100</th><th scope="col">Top-200</th><th scope="col">Top-300</th></tr></thead><tbody><tr><th scope="row">None</th><td>208,456,514</td><td>1.0000</td><td>1.0000</td><td>0.9802</td></tr><tr><th scope="row">FP16</th><td>151,515,849</td><td>1.0000</td><td>1.0000</td><td>0.9802</td></tr><tr><th scope="row">INT8</th><td>123,048,393</td><td>1.0000</td><td>1.0000</td><td>1.0000</td></tr><tr><th scope="row">SQ6</th><td>115,930,757</td><td>1.0000</td><td>0.9704</td><td>0.9481</td></tr><tr><th scope="row">SQ4</th><td>108,813,125</td><td>0.9608</td><td>0.9417</td><td>0.8127</td></tr></tbody></table>
            </EvidenceTableScroll>
            <p className="movie-footnote">Compression overlap is a stability signal; held-out ranking quality for compressed bundles is not yet established.</p>
          </section>
        </div>
        <div className="movie-section-row">
          <aside className="movie-study-rail" aria-label="Serving limitations"><div className="movie-rail-note"><strong>Serving boundary</strong><p>Warm local latency excludes Lambda cold starts, API Gateway, and production network variation.</p></div></aside>
          <section id="movie-constraints" className="movie-section">
            <SectionHeading number="06" eyebrow="System boundaries" title="Engineering constraints and production trade-offs" />
            <div className="movie-constraint-list">
              <article><span>01</span><div><h3>Retrieval sets the ceiling</h3><p>LightGBM only orders retrieved candidates. It cannot recover a relevant movie omitted by every retriever.</p></div></article>
              <article><span>02</span><div><h3>Warm local timings are not deployment latency</h3><p>The benchmark excludes Lambda cold starts, API Gateway overhead, production throughput, and network variability.</p></div></article>
              <article><span>03</span><div><h3>Mood labels do not affect ranking</h3><p>The UI accepts mood labels, but recommendations currently use the selected seed movies only.</p></div></article>
              <article><span>04</span><div><h3>No online engagement study</h3><p>The repository does not report A/B tests, click-through, watch starts, completion, diversity, or novelty metrics.</p></div></article>
            </div>
            <p className="movie-footnote">{project.limitation}</p>
          </section>
        </div>
        <div className="movie-section-row">
          <aside className="movie-study-rail" aria-label="Reproducibility note"><div className="movie-rail-note"><strong>Reproducibility</strong><p>The setup script prepares dependencies and source data; it does not train or start services.</p></div></aside>
          <section id="movie-quickstart" className="movie-section">
            <SectionHeading number="07" eyebrow="Repository guide" title="Codebase, artifacts and CLI quickstart" />
            <p className="movie-lead">The repository separates data preparation, training, offline evaluation, serving, and the Next.js frontend. Start with the locked setup script, then run the API and frontend in separate terminals.</p>
            <div className="movie-code-window">
              <div className="movie-code-title"><span aria-hidden="true"><i /><i /><i /></span><span>Quickstart · from the repository root</span></div>
              <pre><code>{`# Prepare the locked environment and source dataset
./start.sh

# Train a retriever offline (repeat for each model)
PYTHONPATH=backend uv run --frozen python -m training.retrieval.cli als

# Evaluate the validation split
PYTHONPATH=backend uv run --frozen python -m evaluation.cli popularity

# Start the API with an existing model bundle
MODEL_BUNDLE_DIR="$PWD/backend/model_bundle/<bundle-id>" \\
PYTHONPATH=backend uv run --frozen python -m uvicorn main:app \\
  --host 0.0.0.0 --port 8080

# In a second terminal, start the frontend
npm run dev --prefix frontend`}</code></pre>
            </div>
            <div className="movie-repo-links">
              <a href={project.repository} target="_blank" rel="noopener noreferrer"><span>Source</span><strong>Open the project repository ↗</strong></a>
              <a href={project.evidenceLink} target="_blank" rel="noopener noreferrer"><span>Evaluation</span><strong>Read the results and protocol ↗</strong></a>
            </div>
            <p className="movie-footnote">The setup script prepares dependencies and source data. It does not train models, create bundles, or start services.</p>
          </section>
        </div>
      </div>
    </article>
  );
}

function SectionHeading({ number, eyebrow, title }: { number: string; eyebrow: string; title: string }) {
  return <header className="movie-section-heading"><span>{number} / {eyebrow}</span><h2>{title}</h2></header>;
}
