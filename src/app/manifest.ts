import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Clínica ROE - Raio-X Odontológico Especializado",
    short_name: "Clínica ROE",
    start_url: "/",
    display: "standalone",
    background_color: "#fefdff",
    theme_color: "#e6af2e",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
      },
      // An installable app needs a raster icon of at least 192px; the 1024px
      // logo already in /public covers both the 192 and 512 requirements.
      {
        src: "/logo.webp",
        sizes: "1024x1024",
        type: "image/webp",
        purpose: "any",
      },
    ],
  };
}
