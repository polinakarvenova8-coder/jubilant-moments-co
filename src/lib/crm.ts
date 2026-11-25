/**
 * All site forms funnel through submitLead(). Telegram must confirm delivery
 * before the promise resolves. The optional existing CRM webhook is preserved.
 */
import { getAttribution, type Attribution } from "@/lib/attribution";
import { sendLeadToTelegram } from "./telegram.functions";

export type Lead = {
  source: "quiz" | "hero" | "cta" | "callback";
  name: string;
  phone: string;
  comment?: string;
  answers?: Record<string, string>;
  marketing?: Attribution;
};

export async function submitLead(lead: Lead): Promise<void> {
  const marketing = { ...getAttribution(), ...lead.marketing };
  const payload = {
    ...lead,
    marketing,
    page: typeof window !== "undefined" ? window.location.href : "",
    createdAt: new Date().toISOString(),
  };

  // Throws unless Telegram confirmed the message.
  await sendLeadToTelegram({
    data: {
      source: lead.source,
      name: lead.name,
      phone: lead.phone,
      comment: lead.comment,
      answers: lead.answers,
      marketing,
      page: payload.page,
    },
  });

  const endpoint = import.meta.env.VITE_CRM_WEBHOOK_URL as string | undefined;
  if (endpoint) {
    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch((e) => console.error("CRM webhook failed", e));
  }
}
