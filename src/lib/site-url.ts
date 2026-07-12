function normalizeUrl(url: string) {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

export function getSiteUrl() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (siteUrl) return normalizeUrl(siteUrl);

  const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelProductionUrl) return normalizeUrl(`https://${vercelProductionUrl}`);

  const vercelPreviewUrl = process.env.VERCEL_URL;
  if (vercelPreviewUrl) return normalizeUrl(`https://${vercelPreviewUrl}`);

  return "http://localhost:3000";
}
