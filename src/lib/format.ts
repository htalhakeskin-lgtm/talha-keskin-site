/**
 * Display formatting: the only place where numbers and dates become user-facing text
 * (KURALLAR C, 03-kod §8). The site shows no money, phone numbers or areas, so only numbers,
 * dates and year ranges are here. Locale-aware from the start; the i18n slice (D-02) passes
 * the active locale.
 */

export type AppLocale = "tr" | "en";

export const DISPLAY_TIME_ZONE = "Europe/Istanbul";
const INTL_LOCALE: Record<AppLocale, string> = { tr: "tr-TR", en: "en-US" };
/** En dash with thin spaces is overkill on small screens; "2024–2026" stays on one line. */
const EN_DASH = "–";

/** 5600 → "5.600" (tr) · "5,600" (en) */
export function formatNumber(value: number, locale: AppLocale = "tr"): string {
  return new Intl.NumberFormat(INTL_LOCALE[locale], { maximumFractionDigits: 2 }).format(value);
}

type DateInput = Date | string | number;
const toDate = (value: DateInput): Date => (value instanceof Date ? value : new Date(value));

/** "Temmuz 2026" (tr) · "July 2026" (en) */
export function formatMonthYear(value: DateInput, locale: AppLocale = "tr"): string {
  return new Intl.DateTimeFormat(INTL_LOCALE[locale], {
    month: "long",
    year: "numeric",
    timeZone: DISPLAY_TIME_ZONE,
  }).format(toDate(value));
}

/** "15 Ekim 2026" (tr) · "October 15, 2026" (en) */
export function formatDate(value: DateInput, locale: AppLocale = "tr"): string {
  return new Intl.DateTimeFormat(INTL_LOCALE[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: DISPLAY_TIME_ZONE,
  }).format(toDate(value));
}

/** (2024, 2026) → "2024–2026" · (2026, 2026) → "2026" · (2026, null) → "2026–" */
export function formatYearRange(start: number, end: number | null): string {
  if (end === null) return `${start}${EN_DASH}`;
  return start === end ? String(start) : `${start}${EN_DASH}${end}`;
}
