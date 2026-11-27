import type { MetadataRoute } from "next";

import { site } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} · ${site.title}`,
    short_name: site.shortName,
    start_url: "/",
    display: "browser",
    background_color: "#f5f3ee",
    theme_color: "#f5f3ee",
    icons: [{ src: "/icon.svg", type: "image/svg+xml", sizes: "any" }],
  };
}
