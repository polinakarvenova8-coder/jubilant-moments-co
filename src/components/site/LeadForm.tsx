import { useState } from "react";
import { Check, Flame, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { submitLead, type Lead } from "@/lib/crm";

export function LeadForm({
  source,
  buttonLabel = "Получить программу",
  className = "",
}: {
  source: Lead["source"];
  buttonLabel?: string;
  className?: string;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) return toast.error("Укажите имя");
    if (phone.replace(/\D/g, "").length < 10) return toast.error("Укажите корректный телефон");
    setSending(true);
    try {
      await submitLead({ source, name: name.trim().slice(0, 100), phone: phone.trim().slice(0, 30) });
      setDone(true);
      toast.success("Заявка отправлена — свяжемся в течение 15 минут");
    } catch {
      toast.error("Не удалось отправить заявку. Попробуйте позвонить нам.");
    } finally {
      setSending(false);
    }
  };

  if (done) {
    return (
      <div className={`flex items-center gap-3 rounded-2xl border border-ember/40 bg-ember/10 px-5 py-4 text-sm font-semibold text-ember ${className}`}>
        <Check className="h-5 w-5" /> Заявка принята — скоро позвоним
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={`flex flex-col gap-3 sm:flex-row ${className}`}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        maxLength={100}
        placeholder="Имя"
        aria-label="Имя"
        className="min-w-0 flex-1 rounded-full border border-border bg-background/70 px-5 py-3.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ember"
      />
      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        maxLength={30}
        inputMode="tel"
        placeholder="Телефон"
        aria-label="Телефон"
        className="min-w-0 flex-1 rounded-full border border-border bg-background/70 px-5 py-3.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ember"
      />
      <button
        type="submit"
        disabled={sending}
        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-fire px-7 py-3.5 text-sm font-bold text-primary-foreground transition-transform hover:scale-105 disabled:opacity-60"
      >
        {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Flame className="h-4 w-4" />}
        {buttonLabel}
      </button>
    </form>
  );
}
