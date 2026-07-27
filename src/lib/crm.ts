/**
 * CRM integration point.
 *
 * All site forms funnel through submitLead(). To connect a CRM
 * (amoCRM, Bitrix24, HubSpot, Google Sheets, webhook и т.д.) set
 * VITE_CRM_WEBHOOK_URL and the payload below will be POSTed there.
 */
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

  const endpoint = import.meta.env.VITE_CRM_WEBHOOK_URL as string | undefined;

  if (!endpoint) {
    // No CRM connected yet — payload is ready for integration.
    console.info("[lead]", payload);
    await new Promise((r) => setTimeout(r, 600));
    return;
  }

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("CRM request failed");
}
