import AxeBuilder from "@axe-core/playwright";
import { expect, type Page, test } from "@playwright/test";

import { publicRoutes, widths } from "./routes";

/**
 * Mobile is a test, not a promise (07-mobil §10, MB-05). For every route and width:
 * no horizontal overflow, touch targets ≥ 44 px, inputs ≥ 16 px; axe at phone and laptop size.
 */

const MIN_TARGET = 44;

async function findOverflow(page: Page) {
  return page.evaluate(() => {
    const root = document.documentElement;
    if (root.scrollWidth <= root.clientWidth) return null;
    const offenders = [...document.querySelectorAll<HTMLElement>("body *")]
      .filter((el) => el.getBoundingClientRect().right > root.clientWidth + 1)
      .slice(0, 5)
      .map(
        (el) =>
          el.tagName.toLowerCase() +
          (el.id ? `#${el.id}` : "") +
          [...el.classList]
            .slice(0, 3)
            .map((name) => `.${name}`)
            .join(""),
      );
    return { scrollWidth: root.scrollWidth, clientWidth: root.clientWidth, offenders };
  });
}

async function findSmallTargets(page: Page) {
  return page.evaluate((min) => {
    const interactive = document.querySelectorAll<HTMLElement>(
      'a[href], button, input:not([type="hidden"]), select, textarea, [role="button"], [tabindex]:not([tabindex="-1"])',
    );
    return [...interactive]
      .filter((el) => {
        const style = getComputedStyle(el);
        if (
          style.visibility === "hidden" ||
          style.display === "none" ||
          el.closest("[aria-hidden='true']")
        )
          return false;
        // Inline links inside running text are exempt (WCAG 2.5.8 inline exception).
        if (el.tagName === "A" && el.closest("p, li") && style.display === "inline") return false;
        const box = el.getBoundingClientRect();
        if (box.width === 0 || box.height === 0) return false;
        return box.width < min || box.height < min;
      })
      .slice(0, 10)
      .map(
        (el) =>
          `${el.tagName.toLowerCase()} "${(el.textContent.trim() || (el.getAttribute("aria-label") ?? "")).slice(0, 30)}"`,
      );
  }, MIN_TARGET);
}

async function findSmallInputs(page: Page) {
  return page.evaluate(() =>
    [...document.querySelectorAll<HTMLElement>("input:not([type=hidden]), select, textarea")]
      .filter((el) => parseFloat(getComputedStyle(el).fontSize) < 16) // eslint-disable-line no-restricted-globals -- CSS pixel value, not money
      .map((el) => el.getAttribute("name") ?? el.tagName.toLowerCase()),
  );
}

for (const route of publicRoutes) {
  test.describe(route, () => {
    for (const width of widths) {
      test(`no overflow, touch targets and inputs at ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(route);
        await page.waitForLoadState("networkidle");

        expect.soft(await findOverflow(page), "horizontal overflow").toBeNull();
        if (width < 1024) {
          expect.soft(await findSmallTargets(page), "touch targets below 44px").toEqual([]);
          expect.soft(await findSmallInputs(page), "inputs below 16px (iOS zoom)").toEqual([]);
        }
      });
    }

    for (const width of [390, 1280]) {
      test(`axe has no serious or critical violations at ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(route);
        const results = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
          .analyze();
        const blocking = results.violations.filter(
          (v) => v.impact === "serious" || v.impact === "critical",
        );
        expect(blocking.map((v) => `${v.id}: ${v.nodes.length} node(s)`)).toEqual([]);
      });
    }
  });
}

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });

  // 07-mobil §4, MB-06: a tap before hydration (slow network) must still open the menu.
  test("mobile menu opens without JavaScript", async ({ page }) => {
    test.skip(test.info().project.name !== "mobile", "runs once");
    await page.goto("/");
    await page.getByRole("button", { name: "Menü" }).click();
    await expect(page.getByRole("navigation", { name: "Ana menü" })).toBeVisible();
  });
});

// 07-mobil §10, MB-07: a header that wraps onto two lines changes height between desktop widths;
// the overflow check cannot see that.
test("header keeps one line on desktop widths", async ({ page }) => {
  test.skip(test.info().project.name !== "desktop", "runs once");
  const heights: number[] = [];
  for (const width of [1024, 1280, 1536]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const box = await page.getByRole("banner").first().boundingBox();
    if (!box) throw new Error("no <header> (banner) on the page");
    heights.push(Math.round(box.height));
  }
  expect(
    Math.max(...heights) - Math.min(...heights),
    `banner heights ${heights.join(" / ")} px`,
  ).toBeLessThanOrEqual(4);
});
