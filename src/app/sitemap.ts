import type { MetadataRoute } from "next";
import { UNITS } from "@/data/units";
import { absoluteUrl, SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      // A one-pager has a single URL, so the images are the only thing left to
      // hand crawlers here — it is what gets the clinic photos into Google
      // Images. The generated OG card leads, the storefronts follow.
      images: [absoluteUrl("/opengraph-image"), ...UNITS.map((unit) => absoluteUrl(unit.image))],
    },
  ];
}
