import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const reviews = [
  {
    name: "Анна Ковалева",
    company: "HR-директор, Nordwind Group",
    text: "Организовали корпоратив на 180 человек за три недели. Сценарий попал в нашу культуру на 100%: команда до сих пор пересматривает фотографии и цитирует шутки ведущего.",
    initials: "АК",
  },
  {
    name: "Дмитрий Соколов",
    company: "Founder, ITL Systems",
    text: "Это первый тимбилдинг, с которого никто не ушел раньше времени. Разработчики и продажи наконец-то заговорили друг с другом — эффект держится уже полгода.",
    initials: "ДС",
  },
  {
    name: "Марина Левина",
    company: "Операционный директор, Aurum Retail",
    text: "Юбилей компании прошел на уровне закрытой премии: свет, звук, награждение, эмоции. Собственники были в восторге, гости — тем более.",
    initials: "МЛ",
  },
  {
    name: "Игорь Панов",
    company: "Частный клиент, 42 года",
    text: "Свой день рождения в стиле Гэтсби доверил ребятам полностью. Гости думали, что попали в кино. Ни одной организационной шероховатости за вечер.",
    initials: "ИП",
  },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  const r = reviews[i];
  const go = (d: number) => setI((v) => (v + d + reviews.length) % reviews.length);

  return (
    <div className="surface-card relative rounded-3xl p-8 md:p-14">
      <div key={i} className="animate-rise">
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, k) => (
            <Star key={k} className="h-4 w-4 fill-gold text-gold" />
          ))}
        </div>
        <p className="mt-6 font-display text-lg leading-relaxed md:text-2xl">«{r.text}»</p>
        <div className="mt-8 flex items-center gap-4">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-gradient-gold font-display text-base font-bold text-primary-foreground">
            {r.initials}
          </span>
          <div className="min-w-0">
            <div className="truncate font-semibold">{r.name}</div>
            <div className="truncate text-sm text-muted-foreground">{r.company}</div>
          </div>
        </div>
      </div>

      <div className="mt-10 flex items-center justify-between">
        <div className="flex gap-2">
          {reviews.map((_, k) => (
            <button
              key={k}
              type="button"
              aria-label={`Отзыв ${k + 1}`}
              onClick={() => setI(k)}
              className={`h-1.5 rounded-full transition-all ${
                k === i ? "w-8 bg-gradient-gold" : "w-3 bg-secondary"
              }`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Предыдущий отзыв"
            onClick={() => go(-1)}
            className="grid h-11 w-11 place-items-center rounded-full border border-border transition-colors hover:border-gold hover:text-gold"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Следующий отзыв"
            onClick={() => go(1)}
            className="grid h-11 w-11 place-items-center rounded-full border border-border transition-colors hover:border-gold hover:text-gold"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
