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
    ],
  };
}
