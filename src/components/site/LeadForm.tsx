import { useEffect, useRef, useState } from "react";
import { Check, Flame, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { completeLeadSubmission, trackEvent } from "@/lib/analytics";
import { submitLead, type Lead } from "@/lib/crm";

export function LeadForm({
  source,
  buttonLabel = "Получить программу",
  className = "",
  onDirtyChange,
}: {
  source: Lead["source"];
  buttonLabel?: string;
  className?: string;
  onDirtyChange?: (dirty: boolean) => void;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sending, setSending] = useState(false);
  const lock = useRef(false);
  const started = useRef(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    onDirtyChange?.(Boolean(name || phone));
  }, [name, phone, onDirtyChange]);

  const markStarted = () => {
    if (started.current) return;
    started.current = true;
    trackEvent("form_start", { form_name: `short_${source}` });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    markStarted();
    if (name.trim().length < 2) return toast.error("Укажите имя");
    if (phone.replace(/\D/g, "").length < 10) return toast.error("Укажите корректный телефон");
    if (lock.current) return;
    lock.current = true;
    setSending(true);
    try {
      await submitLead({ source, name: name.trim().slice(0, 100), phone: phone.trim().slice(0, 30) });
      setDone(true);
      completeLeadSubmission(`short_${source}`);
    } catch {
      toast.error("Не удалось отправить заявку. Данные сохранены — попробуйте ещё раз или позвоните нам.");
      lock.current = false;
    } finally {
      setSending(false);
    }
  };

  if (done) {
    return (
      <div className={`flex items-center gap-3 rounded-2xl border border-ember/40 bg-ember/10 px-5 py-4 text-sm font-semibold text-ember ${className}`}>
        <Check className="h-5 w-5" /> Заявка отправлена. Переходим на страницу благодарности…
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={`flex flex-col gap-3 ${className}`}>
      <input
        value={name}
        onChange={(e) => {
          markStarted();
          setName(e.target.value);
        }}
        maxLength={100}
        autoComplete="name"
        placeholder="Имя"
        aria-label="Имя"
        className="min-w-0 flex-1 rounded-full border border-border bg-background/70 px-5 py-3.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ember"
      />
      <input
        value={phone}
        onChange={(e) => {
          markStarted();
          setPhone(e.target.value);
        }}
        maxLength={30}
        autoComplete="tel"
        inputMode="tel"
        placeholder="Телефон"
        aria-label="Телефон"
        className="min-w-0 flex-1 rounded-full border border-border bg-background/70 px-5 py-3.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ember"
      />
      <button
        type="submit"
        disabled={sending}
        className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-fire px-7 py-3.5 text-sm font-bold text-primary-foreground transition-transform hover:scale-105 disabled:opacity-60"
      >
        {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Flame className="h-4 w-4" />}
        {buttonLabel}
      </button>
    </form>
  );
}
