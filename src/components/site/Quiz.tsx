import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";

type Step = {
  question: string;
  options: string[];
  multi?: boolean;
};

const steps: Step[] = [
  {
    question: "Какой формат мероприятия?",
    options: ["Корпоратив", "Тимбилдинг", "День рождения", "Юбилей компании"],
  },
  {
    question: "Количество участников?",
    options: ["До 20", "20–50", "50–100", "Более 100"],
  },
  {
    question: "Где планируется мероприятие?",
    options: ["В помещении", "На природе", "Пока не решили"],
  },
  {
    question: "Нужны дополнительные услуги?",
    options: ["Ведущий", "DJ", "Фотограф", "Видеооператор", "Кейтеринг", "Декор"],
    multi: true,
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

  const select = (value: string) => {
    const current = answers[step] ?? [];
    const multi = steps[step].multi;
    const next = multi
      ? current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value]
      : [value];
    setAnswers({ ...answers, [step]: next });
    if (!multi) setTimeout(() => setStep((s) => s + 1), 220);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) return toast.error("Укажите имя");
    if (phone.replace(/\D/g, "").length < 10) return toast.error("Укажите корректный телефон");
    setSending(true);
    // CRM-ready payload: подключите сюда webhook вашей CRM
    const payload = {
      name: name.trim().slice(0, 100),
      phone: phone.trim().slice(0, 30),
      answers: steps.map((s, i) => ({ question: s.question, answer: answers[i] ?? [] })),
      source: "quiz",
    };
    console.info("lead", payload);
    setTimeout(() => {
      setSending(false);
      setDone(true);
      toast.success("Заявка отправлена! Свяжемся с вами в течение 15 минут.");
    }, 700);
  };

  return (
    <div className="surface-card rounded-3xl p-6 md:p-10">
      {done ? (
        <div className="flex flex-col items-center py-16 text-center">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-gradient-gold text-primary-foreground">
            <Check className="h-8 w-8" />
          </span>
          <h3 className="mt-6 text-2xl font-bold">Заявка принята</h3>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Менеджер подготовит 2–3 концепции и расчет стоимости и свяжется с вами в течение 15
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
              className="h-full rounded-full bg-gradient-gold transition-all duration-500"
              style={{ width: `${Math.max(progress, 8)}%` }}
            />
          </div>

          {step < steps.length ? (
            <div key={step} className="animate-rise mt-8">
              <h3 className="text-xl font-bold md:text-2xl">{steps[step].question}</h3>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {steps[step].options.map((opt) => {
                  const active = (answers[step] ?? []).includes(opt);
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => select(opt)}
                      className={`rounded-xl border px-5 py-4 text-left text-sm font-semibold transition-all ${
                        active
                          ? "border-gold bg-gold/10 text-gold"
                          : "border-border bg-secondary/40 text-foreground hover:border-gold/60 hover:bg-secondary"
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
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
                  onClick={() => setStep((s) => s + 1)}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-gold px-6 py-3 text-sm font-bold text-primary-foreground transition-transform hover:scale-105"
                >
                  Далее <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} className="animate-rise mt-8">
              <h3 className="text-xl font-bold md:text-2xl">Куда отправить расчет?</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Пришлем идеи и стоимость — без спама и навязчивых звонков.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={100}
                  placeholder="Имя"
                  className="rounded-xl border border-border bg-secondary/40 px-5 py-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-gold"
                />
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  maxLength={30}
                  inputMode="tel"
                  placeholder="Телефон"
                  className="rounded-xl border border-border bg-secondary/40 px-5 py-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-gold"
                />
              </div>
              <div className="mt-8 flex items-center justify-between gap-3">
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
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-gold px-7 py-3.5 text-sm font-bold text-primary-foreground transition-transform hover:scale-105 disabled:opacity-70"
                >
                  {sending && <Loader2 className="h-4 w-4 animate-spin" />}
                  Получить предложение
                </button>
              </div>
            </form>
          )}
        </>
      )}
    </div>
  );
}
