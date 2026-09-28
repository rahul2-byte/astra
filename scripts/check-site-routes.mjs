import assert from "node:assert/strict";

const baseUrl = new URL(process.argv[2] ?? "http://localhost:3000");
const projects = [
  ["fin-ai", "FIN-AI"],
  ["lora-reproduction", "LoRA Reproduction"],
  ["movie-recommendation-system", "Movie Recommendation System"],
];

for (const [path, content] of [
  ["/", "Applied AI / Machine Learning Engineer at Intangles"],
  ["/projects", "FIN-AI"],
  ...projects.map(([slug, title]) => [`/projects/${slug}`, title]),
]) {
  const response = await fetch(new URL(path, baseUrl));
  assert.equal(response.status, 200, `${path} should be a page`);
  const html = await response.text();
  assert.ok(html.includes(content), `${path} should include ${content}`);
  if (path.startsWith("/projects/") && path !== "/projects") {
    assert.ok(html.includes("Why I built it"), `${path} should include its case study`);
  }
}

for (const [path, destination] of [
  ["/experience", "/#experience"],
  ["/projects/production-ml-systems", "/#experience"],
  ["/contact", "/#contact"],
  ["/writing", "/projects"],
  ["/resume", "/Rahul_Singh_Applied_AI_ML_Engineer_Resume.pdf"],
  ["/resume.pdf", "/Rahul_Singh_Applied_AI_ML_Engineer_Resume.pdf"],
  ["/resume_updated_fin_ai.pdf", "/Rahul_Singh_Applied_AI_ML_Engineer_Resume.pdf"],
]) {
  const response = await fetch(new URL(path, baseUrl), { redirect: "manual" });
  assert.equal(response.status, 308, `${path} should permanently redirect`);
  const location = response.headers.get("location");
  assert.ok(location, `${path} should provide a redirect location`);
  const target = new URL(location, baseUrl);
  assert.equal(`${target.pathname}${target.hash}`, destination, `${path} should point to ${destination}`);
}

const unknownProject = await fetch(new URL("/projects/not-a-project", baseUrl));
assert.equal(unknownProject.status, 404, "unknown project slugs should return 404");

const resume = await fetch(new URL("/Rahul_Singh_Applied_AI_ML_Engineer_Resume.pdf", baseUrl));
assert.equal(resume.status, 200, "current resume should be available");
assert.ok((await resume.arrayBuffer()).byteLength > 0, "resume response should not be empty");

const sitemap = await fetch(new URL("/sitemap.xml", baseUrl));
assert.equal(sitemap.status, 200, "sitemap should be available");
const sitemapPaths = [...(await sitemap.text()).matchAll(/<loc>(.*?)<\/loc>/g)]
  .map(([, url]) => new URL(url).pathname)
  .sort();
assert.deepEqual(
  sitemapPaths,
  ["/", "/projects", ...projects.map(([slug]) => `/projects/${slug}`)].sort(),
  "sitemap should list all canonical pages",
);

console.log("Project index, detail pages, legacy redirects, resume, and sitemap passed.");
