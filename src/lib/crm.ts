/**
 * CRM integration point.
 *
 * All site forms funnel through submitLead(). Leads are delivered to the
 * Telegram group via a server function (token stays server-side). If
 * VITE_CRM_WEBHOOK_URL is set, the payload is additionally POSTed there.
 */
import { sendLeadToTelegram } from "./telegram.functions";

export type Lead = {
  source: "quiz" | "hero" | "cta" | "callback";
  name: string;
  phone: string;
  comment?: string;
  answers?: Record<string, string>;
};

export async function submitLead(lead: Lead): Promise<void> {
  const payload = {
    ...lead,
    page: typeof window !== "undefined" ? window.location.href : "",
    createdAt: new Date().toISOString(),
  };

  // Throws unless Telegram confirmed the message.
  await sendLeadToTelegram({ data: { ...lead, page: payload.page } });

  const endpoint = import.meta.env.VITE_CRM_WEBHOOK_URL as string | undefined;
  if (endpoint) {
    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch((e) => console.error("CRM webhook failed", e));
  }
}
