import assert from "node:assert/strict";

const baseUrl = new URL(process.argv[2] ?? "http://localhost:3000");

for (const [path, content] of [
  ["/", "Experience at Intangles"],
  ["/projects", "Movie Recommendation System"],
]) {
  const response = await fetch(new URL(path, baseUrl));
  assert.equal(response.status, 200, `${path} should be a page`);
  assert.ok((await response.text()).includes(content), `${path} should include its main content`);
}

for (const [path, destination] of [
  ["/experience", "/#experience"],
  ["/projects/production-ml-systems", "/#experience"],
  ["/contact", "/#contact"],
  ["/writing", "/projects"],
  ["/resume", "/resume.pdf"],
  ["/projects/fin-ai", "/projects#fin-ai"],
  ["/projects/lora-reproduction", "/projects#lora-reproduction"],
  ["/projects/movie-recommendation-system", "/projects#movie-recommendation-system"],
]) {
  const response = await fetch(new URL(path, baseUrl), { redirect: "manual" });
  assert.equal(response.status, 308, `${path} should permanently redirect`);
  const location = response.headers.get("location");
  assert.ok(location, `${path} should provide a redirect location`);
  const target = new URL(location, baseUrl);
  assert.equal(`${target.pathname}${target.hash}`, destination, `${path} should point to ${destination}`);
}

const sitemap = await fetch(new URL("/sitemap.xml", baseUrl));
assert.equal(sitemap.status, 200, "sitemap should be available");
const sitemapPaths = [...(await sitemap.text()).matchAll(/<loc>(.*?)<\/loc>/g)]
  .map(([, url]) => new URL(url).pathname)
  .sort();
assert.deepEqual(sitemapPaths, ["/", "/projects"], "sitemap should list only the two pages");

console.log("Two-page routes, legacy redirects, and sitemap passed.");
