export const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "yclid",
  "gclid",
  "fbclid",
  "msclkid",
] as const;

export type Attribution = Partial<Record<(typeof ATTRIBUTION_KEYS)[number], string>>;

const STORAGE_KEY = "akshow_attribution";
export const THANK_YOU_URL = "https://akshow.ru/tnx";

export function readAttribution(search: string): Attribution {
  const params = new URLSearchParams(search);
  const result: Attribution = {};

  for (const key of ATTRIBUTION_KEYS) {
    const value = params.get(key)?.trim().slice(0, 200);
    if (value) result[key] = value;
  }

  return result;
}

export function getAttribution(): Attribution {
  if (typeof window === "undefined") return {};

  let stored: Attribution = {};
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (raw) stored = readAttribution(`?${new URLSearchParams(JSON.parse(raw)).toString()}`);
  } catch {
    stored = {};
  }

  const merged = { ...stored, ...readAttribution(window.location.search) };
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  } catch {
    // The current URL still provides attribution when storage is unavailable.
  }
  return merged;
}

export function buildThankYouUrl(attribution: Attribution): string {
  const url = new URL(THANK_YOU_URL);
  for (const key of ATTRIBUTION_KEYS) {
    const value = attribution[key];
    if (value) url.searchParams.set(key, value);
  }
  return url.toString();
}
