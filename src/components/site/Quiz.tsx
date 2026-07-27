import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, Flame, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { submitLead } from "@/lib/crm";

type Step =
  | { kind: "options"; question: string; options: string[]; multi?: boolean }
  | { kind: "input"; question: string; placeholder: string; type?: string };

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

export function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string[]>>({});
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const total = steps.length + 1;
  const progress = Math.round((step / total) * 100);
  const current = steps[step];

  const select = (value: string) => {
    setAnswers((prev) => ({ ...prev, [step]: [value] }));
    setTimeout(() => setStep((s) => s + 1), 180);
  };

  const setText = (value: string) => setAnswers((prev) => ({ ...prev, [step]: [value] }));

  const canNext =
    !current || current.kind === "options" || (answers[step]?.[0] ?? "").trim().length > 0;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) return toast.error("Укажите имя");
    if (phone.replace(/\D/g, "").length < 10) return toast.error("Укажите корректный телефон");

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
        },
      });
      setDone(true);
    } catch {
      toast.error("Не удалось отправить заявку. Попробуйте позвонить нам.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="surface-card rounded-3xl p-6 md:p-10">
      {done ? (
        <div className="animate-rise flex flex-col items-center py-10 text-center">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-gradient-fire text-primary-foreground">
            <Check className="h-8 w-8" />
          </span>
          <h3 className="mt-6 text-2xl font-bold">Заявка принята</h3>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Шеф уже точит ножи. Менеджер пришлет программу шоу и расчет стоимости в течение 15
            минут.
          </p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>
              Шаг {step + 1} из {total}
            </span>
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
                        className={`rounded-xl border px-5 py-4 text-left text-sm font-semibold transition-all ${
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
                  placeholder={current.placeholder}
                  className="mt-6 w-full rounded-xl border border-border bg-secondary/40 px-5 py-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ember"
                />
              )}

              <div className="mt-8 flex items-center justify-between gap-3">
                <button
                  type="button"
                  disabled={step === 0}
                  onClick={() => setStep((s) => s - 1)}
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground disabled:opacity-30"
                >
                  <ArrowLeft className="h-4 w-4" /> Назад
                </button>
                <button
                  type="button"
                  disabled={!canNext}
                  onClick={() => setStep((s) => s + 1)}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-fire px-6 py-3 text-sm font-bold text-primary-foreground transition-transform hover:scale-105 disabled:opacity-40"
                >
                  Далее <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} className="animate-rise mt-8">
              <h3 className="text-xl font-bold md:text-2xl">Куда прислать расчет и программу?</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Отправим стоимость и сценарий шоу — без спама и навязчивых звонков.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={100}
                  placeholder="Имя"
                  className="rounded-xl border border-border bg-secondary/40 px-5 py-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ember"
                />
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  maxLength={30}
                  inputMode="tel"
                  placeholder="Телефон"
                  className="rounded-xl border border-border bg-secondary/40 px-5 py-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ember"
                />
              </div>
              <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <ArrowLeft className="h-4 w-4" /> Назад
                </button>
                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-fire px-7 py-3.5 text-sm font-bold text-primary-foreground transition-transform hover:scale-105 disabled:opacity-60"
                >
                  {sending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Flame className="h-4 w-4" />
                  )}
                  Получить стоимость
                </button>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.
              </p>
            </form>
          )}
        </>
      )}
    </div>
  );
}
