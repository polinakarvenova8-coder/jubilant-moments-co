import { buildThankYouUrl, getAttribution } from "@/lib/attribution";

const SUBMITTED_KEY = "akshow_lead_submitted";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function trackEvent(event: string, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...params });
}

export function hasLeadSubmitted(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.sessionStorage.getItem(SUBMITTED_KEY) === "1";
  } catch {
    return false;
  }
}

export function completeLeadSubmission(formName: string): void {
  if (typeof window === "undefined") return;

  trackEvent("lead_submit_success", { form_name: formName });
  try {
    window.sessionStorage.setItem(SUBMITTED_KEY, "1");
  } catch {
    // Redirect must still happen when session storage is unavailable.
  }

  const target = buildThankYouUrl(getAttribution());
  trackEvent("thank_you_redirect", { page_path: "/tnx", page_location: target });
  window.location.assign(target);
}
