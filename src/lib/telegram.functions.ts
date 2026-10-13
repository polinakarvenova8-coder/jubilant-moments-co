import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// Telegram supergroup IDs are prefixed with -100.
const CHAT_ID = "-1001655077475";

const schema = z.object({
  source: z.enum(["quiz", "hero", "cta", "callback"]),
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(5).max(30),
  comment: z.string().max(1000).optional(),
  answers: z.record(z.string(), z.string().max(200)).optional(),
  page: z.string().max(500).optional(),
});

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const labels: Record<string, string> = {
  format: "Тип мероприятия",
  guests: "Количество участников",
  date: "Желаемая дата",
  city: "Город",
};

export const sendLeadToTelegram = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => schema.parse(d))
  .handler(async ({ data }) => {
    const token = process.env["TELEGRAM_BOT_TOKEN"];
    if (!token) throw new Error("TELEGRAM_BOT_TOKEN is not configured");

    const lines = [
      `<b>Новая заявка — ${data.source === "quiz" ? "Анкета из 5 шагов" : "Короткая форма"}</b>`,
      "",
      `<b>Имя:</b> ${esc(data.name)}`,
      `<b>Телефон:</b> ${esc(data.phone)}`,
    ];
    if (data.answers) {
      for (const [k, v] of Object.entries(data.answers)) {
        if (v) lines.push(`<b>${esc(labels[k] ?? k)}:</b> ${esc(v)}`);
      }
    }
    if (data.comment) lines.push(`<b>Комментарий:</b> ${esc(data.comment)}`);
    if (data.page) lines.push("", `Страница: ${esc(data.page)}`);

    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text: lines.join("\n"), parse_mode: "HTML" }),
    });
    const body = (await res.json().catch(() => null)) as { ok?: boolean; description?: string } | null;
    if (!res.ok || !body?.ok) {
      console.error(`Telegram sendMessage failed [${res.status}]`, body?.description);
      throw new Error("Telegram did not confirm delivery");
    }
    return { ok: true };
  });
