import { expect, test } from "@playwright/test";

/**
 * Release gate 6 (11-guvenlik §8, NFR-04): security headers on public pages, and noindex on
 * every non-production build (previews and the local test server). Runs once.
 */

test.beforeEach(() => {
  test.skip(test.info().project.name !== "desktop", "runs once");
});

test("a public page carries the security headers and a CSP without eval", async ({ request }) => {
  const headers = (await request.get("/")).headers();
  expect(headers["strict-transport-security"]).toContain("max-age=");
  expect(headers["x-content-type-options"]).toBe("nosniff");
  expect(headers["x-frame-options"]).toBe("DENY");
  expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(headers["permissions-policy"]).toContain("camera=()");
  expect(headers["x-powered-by"]).toBeUndefined();
  const csp = headers["content-security-policy"] ?? "";
  expect(csp).toContain("object-src 'none'");
  // The portfolio frames projects but may itself never be framed (PLAN.md §16).
  expect(csp).toContain("frame-ancestors 'none'");
  expect(csp).not.toContain("unsafe-eval");
});

test("non-production builds say noindex", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
});
