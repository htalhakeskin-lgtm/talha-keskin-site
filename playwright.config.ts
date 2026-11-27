import { defineConfig, devices } from "@playwright/test";

// End-to-end tests (14-test §2): mobile first, Turkish locale, Istanbul time zone.
const CI = Boolean(process.env.CI);
const baseURL = process.env.E2E_BASE_URL ?? "http://localhost:3000";
// The server is started on the port of baseURL, so another app on :3000 can be avoided with
// E2E_BASE_URL=http://localhost:3100.
const port = new URL(baseURL).port || "3000";

const shared = { locale: "tr-TR", timezoneId: "Europe/Istanbul" } as const;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: CI,
  retries: CI ? 1 : 0, // one retry for browser flakiness; a retried pass is reported as flaky (14-test §7)
  // CI: "list" streams one line per test so a hang is visible in the job log.
  reporter: CI ? [["list"], ["github"], ["html", { open: "never" }]] : "list",
  timeout: 30_000,
  expect: { timeout: 5_000 },
  use: { baseURL, trace: "retain-on-failure", screenshot: "only-on-failure", ...shared },
  projects: [
    { name: "mobile", use: { ...devices["Pixel 7"], ...shared }, testIgnore: /ekran-goruntusu/ },
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 800 }, ...shared },
      testIgnore: /ekran-goruntusu/,
    },
    // Weekly / before release: WebKit (iPhone).
    { name: "iphone", use: { ...devices["iPhone 14"], ...shared }, testIgnore: /ekran-goruntusu/ },
    // pnpm screenshots (19-portfolyo §3)
    { name: "portfolyo", testMatch: /ekran-goruntusu\.spec\.ts/, use: { ...shared } },
  ],
  webServer: {
    command: CI ? `pnpm start --port ${port}` : `pnpm dev --port ${port}`,
    url: baseURL,
    reuseExistingServer: !CI,
    timeout: 120_000,
  },
});
