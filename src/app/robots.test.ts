import { describe, expect, it, vi } from "vitest";

const env = vi.hoisted(() => ({ INDEXABLE: true }));
vi.mock("@/lib/env", () => ({ env }));

const { default: robots } = await import("./robots");

/** What a crawler following `Disallow` prefixes may fetch (09-seo §3). */
function allowed(path: string): boolean {
  const rules = [robots().rules].flat();
  const disallow = rules.flatMap((rule) => [rule.disallow ?? []].flat());
  return !disallow.some((prefix) => path.startsWith(prefix));
}

describe("robots.txt (09-seo §3)", () => {
  it("production: public pages are crawlable, review and print pages are not", () => {
    env.INDEXABLE = true;
    expect(allowed("/")).toBe(true);
    expect(allowed("/tr/projeler")).toBe(true);
    for (const path of ["/stil", "/tr/cv/yazdir", "/en/cv/print"]) {
      expect(allowed(path), path).toBe(false);
    }
    expect(robots().sitemap).toMatch(/\/sitemap\.xml$/);
  });

  it("preview / local: nothing is crawled", () => {
    env.INDEXABLE = false;
    expect(allowed("/")).toBe(false);
  });
});
