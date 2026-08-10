const RAW_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://clinicaroe.vercel.app";

/**
 * Never ends in a slash. Canonical links, the sitemap and the JSON-LD all
 * concatenate paths onto this, and a stray trailing slash turned those into
 * `//sitemap.xml` and `//images/...`, which Google reads as different URLs.
 */
export const SITE_URL = RAW_SITE_URL.replace(/\/+$/, "");

export const SITE_NAME = "Clínica ROE";

/**
 * Preview deployments must not be indexed: they would compete with the real
 * site for the same queries. `VERCEL_ENV` is unset outside Vercel, so local
 * builds and CI keep behaving like production.
 */
export const IS_PRODUCTION = !process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production";

/** Absolute URL for a site-relative path. Structured data cannot use relative ones. */
export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
