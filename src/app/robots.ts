import type { MetadataRoute } from "next";
import { absoluteUrl, IS_PRODUCTION, SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // A preview deployment serves the same copy as production. Left crawlable it
  // would compete with the real site for its own queries, so shut it out
  // entirely and point nothing at a sitemap.
  if (!IS_PRODUCTION) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: SITE_URL,
  };
}
