import { describe, expect, it } from "vitest";

import { formatDate, formatMonthYear, formatNumber, formatYearRange } from "./format";

describe("formatNumber", () => {
  it("uses the locale's grouping separator", () => {
    expect(formatNumber(5600)).toBe("5.600");
    expect(formatNumber(7100, "en")).toBe("7,100");
  });
});

describe("formatDate / formatMonthYear", () => {
  // 2026-07-31T22:30Z is already 1 August in Istanbul: the display zone wins over UTC.
  const lateUtc = "2026-07-31T22:30:00Z";

  it("formats in Europe/Istanbul", () => {
    expect(formatDate(lateUtc)).toBe("1 Ağustos 2026");
    expect(formatDate(lateUtc, "en")).toBe("August 1, 2026");
  });

  it("month and year", () => {
    expect(formatMonthYear("2026-07-15T12:00:00Z")).toBe("Temmuz 2026");
    expect(formatMonthYear("2026-07-15T12:00:00Z", "en")).toBe("July 2026");
  });
});

describe("formatYearRange", () => {
  it("collapses equal years and leaves open ranges open", () => {
    expect(formatYearRange(2024, 2026)).toBe("2024–2026");
    expect(formatYearRange(2026, 2026)).toBe("2026");
    expect(formatYearRange(2026, null)).toBe("2026–");
  });
});
