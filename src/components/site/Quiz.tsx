import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Flame, Gift, Loader2, Video } from "lucide-react";
import { toast } from "sonner";
import { completeLeadSubmission, trackEvent } from "@/lib/analytics";
import { submitLead } from "@/lib/crm";
import { BOOKING_GIFT_CONDITION, GIFT_OPTIONS, getGiftName } from "@/lib/offer";

type Step =
  | { kind: "options"; question: string; options: string[] }
  | { kind: "input"; question: string; placeholder: string };

const steps: Step[] = [
  {
    kind: "options",
    question: "Тип мероприятия?",
    options: [
      "Корпоратив",
      "Тимбилдинг",
      "День рождения",
      "Юбилей компании",
      "Мальчишник / девичник",
      "Встреча друзей",
    ],
  },
  {
    kind: "options",
    question: "Количество участников?",
    options: ["8–15", "16–25", "26–40"],
  },
  {
    kind: "input",
    question: "Желаемая дата игры?",
    placeholder: "Например, 14 декабря",
  },
  {
    kind: "input",
    question: "В каком городе проводим?",
    placeholder: "Город",
  },
];

export function Quiz({ onDirtyChange }: { onDirtyChange?: (dirty: boolean) => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string[]>>({});
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [gift, setGift] = useState("");
  const [sending, setSending] = useState(false);
  const lock = useRef(false);
  const started = useRef(false);
  const [done, setDone] = useState(false);

  const total = 6;
  const progress = Math.round((step / total) * 100);
  const current = step < steps.length ? steps[step] : undefined;

  useEffect(() => {
    onDirtyChange?.(Boolean(Object.keys(answers).length || name || phone || gift));
  }, [answers, name, phone, gift, onDirtyChange]);

  const markStarted = () => {
    if (started.current) return;
    started.current = true;
    trackEvent("form_start", { form_name: "quiz" });
  };

  const select = (value: string) => {
    markStarted();
    setAnswers((prev) => ({ ...prev, [step]: [value] }));
    setTimeout(() => setStep((s) => Math.min(s + 1, steps.length)), 180);
  };

  const setText = (value: string) => {
    markStarted();
    setAnswers((prev) => ({ ...prev, [step]: [value] }));
  };

  const canNext = !current || current.kind === "options" || (answers[step]?.[0] ?? "").trim().length > 0;

  const validateContacts = () => {
    if (name.trim().length < 2) {
      toast.error("Укажите имя");
      return false;
    }
    if (phone.replace(/\D/g, "").length < 10) {
      toast.error("Укажите корректный телефон");
      return false;
    }
    return true;
  };

  const goToGift = (e: React.FormEvent) => {
    e.preventDefault();
    markStarted();
    if (validateContacts()) setStep(5);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateContacts()) {
      setStep(4);
      return;
    }
    if (!gift) return toast.error("Выберите подарок");
    if (lock.current) return;
    lock.current = true;
    setSending(true);
    try {
      await submitLead({
        source: "quiz",
        name: name.trim().slice(0, 100),
        phone: phone.trim().slice(0, 30),
        answers: {
          format: answers[0]?.[0] ?? "",
          guests: answers[1]?.[0] ?? "",
          date: answers[2]?.[0] ?? "",
          city: answers[3]?.[0] ?? "",
          gift: getGiftName(gift),
        },
      });
      setDone(true);
      completeLeadSubmission("quiz");
    } catch {
      toast.error("Не удалось отправить заявку. Все ответы и выбранный подарок сохранены — попробуйте ещё раз.");
      lock.current = false;
    } finally {
      setSending(false);
    }
  };

  if (done) {
    return (
      <div className="mt-8 flex items-center justify-center gap-3 rounded-2xl border border-ember/40 bg-ember/10 px-5 py-6 text-sm font-semibold text-ember">
        <Check className="h-5 w-5" /> Заявка отправлена. Переходим на страницу благодарности…
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Шаг {step + 1} из {total}</span>
        <span>{progress}%</span>
      </div>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-gradient-fire transition-all duration-500"
          style={{ width: `${Math.max(progress, 8)}%` }}
        />
      </div>

      {current ? (
        <div key={step} className="animate-rise mt-8">
          <h3 className="text-xl font-bold md:text-2xl">{current.question}</h3>
          {current.kind === "options" ? (
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {current.options.map((opt) => {
                const active = (answers[step] ?? []).includes(opt);
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => select(opt)}
                    className={`min-h-14 rounded-xl border px-5 py-4 text-left text-sm font-semibold transition-all ${
                      active
                        ? "border-ember bg-ember/10 text-ember"
                        : "border-border bg-secondary/40 text-foreground hover:border-ember/60 hover:bg-secondary"
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          ) : (
            <input
              value={answers[step]?.[0] ?? ""}
              onChange={(e) => setText(e.target.value)}
              maxLength={80}
              aria-label={current.question}
              placeholder={current.placeholder}
              className="mt-6 min-h-14 w-full rounded-xl border border-border bg-secondary/40 px-5 py-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ember"
            />
          )}

          <div className="mt-8 flex items-center justify-between gap-3">
            <button
              type="button"
              disabled={step === 0}
              onClick={() => setStep((s) => s - 1)}
              className="inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground disabled:opacity-30"
            >
              <ArrowLeft className="h-4 w-4" /> Назад
            </button>
            <button
              type="button"
              disabled={!canNext}
              onClick={() => setStep((s) => s + 1)}
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-gradient-fire px-6 py-3 text-sm font-bold text-primary-foreground transition-transform hover:scale-105 disabled:opacity-40"
            >
              Далее <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : step === 4 ? (
        <form onSubmit={goToGift} className="animate-rise mt-8">
          <h3 className="text-xl font-bold md:text-2xl">Куда прислать расчет и программу?</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Отправим стоимость и сценарий шоу — без спама и навязчивых звонков.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <input
              value={name}
              onChange={(e) => {
                markStarted();
                setName(e.target.value);
              }}
              maxLength={100}
              autoComplete="name"
              aria-label="Имя"
              placeholder="Имя"
              className="min-h-14 rounded-xl border border-border bg-secondary/40 px-5 py-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ember"
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
              aria-label="Телефон"
              placeholder="Телефон"
              className="min-h-14 rounded-xl border border-border bg-secondary/40 px-5 py-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ember"
            />
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setStep(3)}
              className="inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground"
            >
              <ArrowLeft className="h-4 w-4" /> Назад
            </button>
            <button
              type="submit"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-gradient-fire px-7 py-3.5 text-sm font-bold text-primary-foreground transition-transform hover:scale-105"
            >
              Выбрать подарок <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={submit} className="animate-rise mt-8">
          <h3 className="text-xl font-bold md:text-2xl">
            Выберите ваш подарок при бронировании в течение 5 дней!
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">{BOOKING_GIFT_CONDITION}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {GIFT_OPTIONS.map((option) => {
              const active = gift === option.id;
              const Icon = option.id === "black_boxes" ? Gift : Video;
              return (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    markStarted();
                    setGift(option.id);
                  }}
                  className={`min-h-40 rounded-2xl border p-5 text-left transition-all ${
                    active
                      ? "border-ember bg-ember/10"
                      : "border-border bg-secondary/40 hover:border-ember/60"
                  }`}
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-fire text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="mt-4 block font-bold">{option.name}</span>
                  <span className="mt-2 block text-sm text-muted-foreground">{option.description}</span>
                  {active && <span className="mt-3 flex items-center gap-1 text-sm font-semibold text-ember"><Check className="h-4 w-4" /> Выбрано</span>}
                </button>
              );
            })}
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setStep(4)}
              className="inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground"
            >
              <ArrowLeft className="h-4 w-4" /> Назад
            </button>
            <button
              type="submit"
              disabled={sending || !gift}
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-gradient-fire px-7 py-3.5 text-sm font-bold text-primary-foreground transition-transform hover:scale-105 disabled:opacity-50"
            >
              {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Flame className="h-4 w-4" />}
              Получить стоимость
            </button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.
          </p>
        </form>
      )}
    </div>
  );
}
