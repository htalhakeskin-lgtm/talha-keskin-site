import { publicEnv } from "@/lib/public-env";

/**
 * Identity and links shown in the shell (header, footer, share image).
 * There is deliberately no phone field anywhere (BR-ICR-001, PLAN.md K-05).
 * Page content (projects, story, skills) lives in content/*.ts from slice D-03.
 */
export const site = {
  url: publicEnv.NEXT_PUBLIC_SITE_URL,
  name: "Hasan Talha Keskin",
  shortName: "Talha Keskin",
  title: "Full Stack Yazılım Geliştirici",
  location: "Sakarya",
  email: "h.talhakeskin@gmail.com",
  github: "https://github.com/htalhakeskin-lgtm",
  linkedin: "https://www.linkedin.com/in/hasan-talha-keskin-407593274/",
} as const;
