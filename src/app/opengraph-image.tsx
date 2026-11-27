import { ImageResponse } from "next/og";

import { site } from "@/config/site";

/**
 * Default share image (09-seo §2, SEO-06) in the concept's colours (GK-20).
 * Built-in font (Geist) covers Turkish letters; the IBM Plex TTF arrives with the SEO slice (D-11),
 * together with per-locale and per-project images.
 */

export const alt = `${site.name} · ${site.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "#f5f3ee",
        color: "#15171c",
        backgroundImage:
          "linear-gradient(to right, #e4e0d7 1px, transparent 1px), linear-gradient(to bottom, #e4e0d7 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}
    >
      <div style={{ display: "flex", fontSize: 26, letterSpacing: 1, color: "#b93d0b" }}>
        Full stack · {site.location}
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 80, fontWeight: 700, lineHeight: 1.05 }}>{site.name}</div>
        <div style={{ marginTop: 20, fontSize: 36, color: "#5b5f68" }}>{site.title}</div>
      </div>
    </div>,
    size,
  );
}
