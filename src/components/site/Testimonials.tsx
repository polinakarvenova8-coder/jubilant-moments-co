import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

type Review = {
  name: string;
  role: string;
  text: string;
  type: "Компания" | "Частный клиент";
};

const reviews: Review[] = [
  {
    name: "Анна Ковалева",
    role: "HR-директор, IT-компания «Синапс»",
    type: "Компания",
    text: "Брали игру на 48 человек. Через 10 минут даже самые тихие разработчики кричали за свою команду. Ведущий держал зал как настоящий шеф — жестко, но с юмором. Лучший тимбилдинг за 5 лет.",
  },
  {
    name: "Максим Орлов",
    role: "Коммерческий директор, «Ретайл Групп»",
    type: "Компания",
    text: "Хотели корпоратив без унылых конкурсов. Получили полноценное шоу: 4 блюда, баттлы, финал с награждением. Фото и видео прислали через два дня — уже разошлись по соцсетям.",
  },
  {
    name: "Ирина Дементьева",
    role: "День рождения, 35 лет",
    type: "Частный клиент",
    text: "Отмечала день рождения с друзьями. Никто не умел готовить — и это вообще не мешало. Смеялись до слез, а в итоге съели то, что приготовили сами. Атмосфера дорогая, не «аниматоры».",
  },
  {
    name: "Сергей Титов",
    role: "Мальчишник, 12 человек",
    type: "Частный клиент",
    text: "Альтернатива банальному бару. Соревновательный азарт, фартуки, огонь на сковородах и адекватный ведущий. Жених до сих пор вспоминает финальную битву.",
  },
  {
    name: "Ольга Ремизова",
    role: "Руководитель отдела продаж, «Веста»",
    type: "Компания",
    text: "Организация на уровне: сценарий, тайминг, площадка, кейтеринг — все взяли на себя. Мне оставалось только привезти команду. Заявку закрыли за один звонок.",
  },
];

export function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % reviews.length), 7000);
    return () => clearInterval(t);
  }, []);

  const r = reviews[index];

  return (
    <div>
      <div className="surface-card relative rounded-3xl p-7 md:p-12">
        <div className="flex gap-1 text-ember">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-current" />
          ))}
        </div>
        <blockquote key={index} className="animate-rise mt-6 text-lg leading-relaxed md:text-2xl">
          «{r.text}»
        </blockquote>
        <div className="mt-8 flex items-center gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-fire font-display text-sm font-bold text-primary-foreground">
            {r.name
              .split(" ")
              .map((p) => p[0])
              .join("")}
          </span>
          <div className="min-w-0">
            <p className="truncate font-semibold">{r.name}</p>
            <p className="truncate text-sm text-muted-foreground">{r.role}</p>
          </div>
          <span className="ml-auto hidden rounded-full border border-border px-3 py-1 text-xs text-muted-foreground sm:block">
            {r.type}
          </span>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          aria-label="Предыдущий отзыв"
          onClick={() => setIndex((i) => (i - 1 + reviews.length) % reviews.length)}
          className="grid h-11 w-11 place-items-center rounded-full border border-border transition-colors hover:border-ember hover:text-ember"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex gap-2">
          {reviews.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Отзыв ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-7 bg-gradient-fire" : "w-2 bg-secondary"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Следующий отзыв"
          onClick={() => setIndex((i) => (i + 1) % reviews.length)}
          className="grid h-11 w-11 place-items-center rounded-full border border-border transition-colors hover:border-ember hover:text-ember"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
