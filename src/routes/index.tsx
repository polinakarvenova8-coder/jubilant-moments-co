import { createFileRoute } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Quiz } from "@/components/site/Quiz";
import { Testimonials } from "@/components/site/Testimonials";
import {
  ArrowUpRight,
  Building2,
  Cake,
  Check,
  Crown,
  Flame,
  Gift,
  Handshake,
  MountainSnow,
  PartyPopper,
  Snowflake,
  Sparkles,
  Users,
} from "lucide-react";

import hero from "@/assets/hero.jpg";
import cta from "@/assets/cta.jpg";
import fCulinary from "@/assets/f-culinary.jpg";
import fQuest from "@/assets/f-quest.jpg";
import fIntellect from "@/assets/f-intellect.jpg";
import fOlympic from "@/assets/f-olympic.jpg";
import fCocktail from "@/assets/f-cocktail.jpg";
import fMusic from "@/assets/f-music.jpg";
import fOutdoor from "@/assets/f-outdoor.jpg";
import fTheme from "@/assets/f-theme.jpg";
import cIt from "@/assets/c-it.jpg";
import cNature from "@/assets/c-nature.jpg";
import cAnniversary from "@/assets/c-anniversary.jpg";
import cGatsby from "@/assets/c-gatsby.jpg";
import cNewyear from "@/assets/c-newyear.jpg";

const TITLE = "Организация корпоративов и тимбилдингов под ключ — EVENTUM";
const DESCRIPTION =
  "Event-агентство полного цикла: корпоративы, тимбилдинги, юбилеи компаний и дни рождения для взрослых. 300+ мероприятий, от 10 до 500 участников, индивидуальный сценарий.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "EVENTUM",
          description: DESCRIPTION,
          telephone: "+7 (495) 123-45-67",
          email: "hello@eventum.ru",
          aggregateRating: { "@type": "AggregateRating", ratingValue: "5", reviewCount: "128" },
        }),
      },
    ],
  }),
  component: Index,
});

const audiences = [
  { icon: PartyPopper, title: "Корпоративы", text: "Вечера, о которых говорят весь год." },
  { icon: Handshake, title: "Тимбилдинги", text: "Командный дух без «принудительного веселья»." },
  { icon: Cake, title: "Дни рождения компании", text: "Праздник бренда и его людей." },
  { icon: Crown, title: "Юбилеи бизнеса", text: "Статусный формат для партнеров и топ-состава." },
  { icon: Gift, title: "Дни рождения взрослых", text: "Личные праздники 25–55 лет." },
  { icon: MountainSnow, title: "Выездные мероприятия", text: "Загород, база отдыха, другой город." },
  { icon: Snowflake, title: "Новогодние корпоративы", text: "Главная ночь сезона под ключ." },
  { icon: Sparkles, title: "VIP-мероприятия", text: "Закрытые события премиального уровня." },
];

const advantages = [
  {
    icon: Sparkles,
    title: "Уникальные сценарии",
    text: "Каждое мероприятие создается индивидуально — под цели, культуру и состав команды.",
  },
  {
    icon: Check,
    title: "Под ключ",
    text: "Берем на себя всю организацию: площадка, техника, кейтеринг, артисты, логистика.",
  },
  {
    icon: Users,
    title: "Опытная команда",
    text: "Профессиональные ведущие, event-менеджеры и продюсеры с опытом от 5 лет.",
  },
  {
    icon: Flame,
    title: "Гарантия эмоций",
    text: "Плотная программа и точный тайминг: гости не будут скучать ни минуты.",
  },
];

const formats = [
  { img: fCulinary, title: "Кулинарный баттл", text: "Команды готовят под руководством шефа." },
  { img: fQuest, title: "Адреналин-квест", text: "Динамика, загадки и работа на скорость." },
  { img: fIntellect, title: "Интеллектуальное шоу", text: "Формат ТВ-игры с ведущим и табло." },
  { img: fOlympic, title: "Олимпийские игры", text: "Активные состязания на воздухе." },
  { img: fCocktail, title: "Коктейльный баттл", text: "Миксология и авторские коктейли команд." },
  { img: fMusic, title: "Музыкальный квиз", text: "Живая группа, треки и азарт зала." },
  { img: fOutdoor, title: "Выездной тимбилдинг", text: "Загородная программа на 1–2 дня." },
  { img: fTheme, title: "Тематическая вечеринка", text: "Полное погружение: декор, дресс-код, шоу." },
];

const steps = [
  { n: "01", title: "Оставляете заявку", text: "Короткий бриф или звонок — 5 минут вашего времени." },
  { n: "02", title: "Мы предлагаем концепции", text: "2–3 идеи с визуализацией и таймингом." },
  { n: "03", title: "Согласовываем программу и бюджет", text: "Прозрачная смета без скрытых доплат." },
  { n: "04", title: "Проводим мероприятие", text: "Продюсер и команда работают на площадке." },
  {
    n: "05",
    title: "Вы получаете восторг гостей и сильную команду",
    text: "Фото- и видеоотчет, обратная связь участников.",
  },
];

const cases = [
  {
    img: cIt,
    title: "Корпоратив IT-компании",
    people: "50 участников",
    text: "Лофт, интерактивное шоу и награждение команд — вечер в духе продуктового релиза.",
    wide: true,
  },
  {
    img: cNature,
    title: "Тимбилдинг на природе",
    people: "120 участников",
    text: "Выездная программа с состязаниями и вечерним костром на закате.",
  },
  {
    img: cAnniversary,
    title: "Юбилей компании",
    people: "200 участников",
    text: "Гала-ужин, световое шоу и церемония награждения сотрудников.",
  },
  {
    img: cGatsby,
    title: "День рождения в стиле Гэтсби",
    people: "40 участников",
    text: "Ар-деко, джаз-бэнд, дресс-код и авторский бар до утра.",
  },
  {
    img: cNewyear,
    title: "Новогодний корпоратив",
    people: "150 участников",
    text: "Главная ночь года: конфетти, диджей-сет и фейерверк-финал.",
    wide: true,
  },
];

const stats = [
  { v: "300+", l: "мероприятий" },
  { v: "15 000+", l: "участников" },
  { v: "95%", l: "клиентов приходят повторно" },
  { v: "5 лет", l: "на рынке" },
];

const faq = [
  {
    q: "Сколько стоит мероприятие?",
    a: "Стоимость зависит от формата, количества гостей и площадки. Камерные форматы стартуют от 150 000 ₽, масштабные корпоративы рассчитываются индивидуально. После квиза вы получите точную вилку бюджета.",
  },
  {
    q: "За сколько дней нужно бронировать?",
    a: "Оптимально — за 3–6 недель. Новогодний сезон бронируют с сентября. Срочные проекты берем от 7 дней при наличии свободной команды.",
  },
  {
    q: "Работаете ли вы в других городах?",
    a: "Да. Реализуем проекты по всей России и в странах СНГ: выезжает продюсерская группа, подрядчиков подбираем локально.",
  },
  {
    q: "Можно ли провести мероприятие на нашей площадке?",
    a: "Конечно. Мы адаптируем программу под ваш офис, загородную базу или собственное пространство и берем на себя техническое оснащение.",
  },
  {
    q: "Есть ли готовые программы?",
    a: "Да, у нас более 20 отработанных форматов. Каждый из них мы адаптируем под вашу команду, цели и tone of voice компании.",
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-center" />
      <Header />

      {/* HERO */}
      <section id="hero" className="relative flex min-h-[100svh] items-center overflow-hidden">
        <img
          src={hero}
          alt="Корпоратив: команда аплодирует под золотой конфетти"
          width={1920}
          height={1088}
          className="animate-slow-zoom absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-veil)" }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-background/50" aria-hidden />

        <div className="relative mx-auto w-full max-w-7xl px-5 pt-28 pb-16 lg:px-8">
          <span className="eyebrow animate-rise">Event-агентство полного цикла</span>
          <h1 className="animate-rise mt-5 max-w-4xl text-4xl leading-[1.05] font-extrabold sm:text-5xl lg:text-7xl">
            Корпоративы, тимбилдинги и праздники,{" "}
            <span className="text-gradient-gold">которые запоминаются</span>
          </h1>
          <p className="animate-rise mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
            Создаем мероприятия под ключ для компаний и взрослых компаний друзей. От камерных
            вечеринок до масштабных корпоративов.
          </p>

          <div className="animate-rise mt-9 flex flex-wrap gap-3">
            <a
              href="#quiz"
              className="glow-gold rounded-full bg-gradient-gold px-8 py-4 text-sm font-bold text-primary-foreground transition-transform hover:scale-105"
            >
              Получить программу
            </a>
            <a
              href="#quiz"
              className="rounded-full border border-gold/50 px-8 py-4 text-sm font-bold text-gold transition-colors hover:bg-gold/10"
            >
              Рассчитать стоимость
            </a>
          </div>

          <ul className="animate-rise mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Более 300 проведенных мероприятий",
              "От 10 до 500 участников",
              "Организация под ключ",
              "Индивидуальный сценарий",
            ].map((f) => (
              <li
                key={f}
                className="flex items-start gap-2 rounded-xl border border-border bg-background/40 px-4 py-3 text-sm backdrop-blur-sm"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ДЛЯ КОГО */}
      <section id="for-whom" className="section-pad mx-auto max-w-7xl px-5 lg:px-8">
        <span className="eyebrow">Для кого</span>
        <h2 className="mt-4 max-w-3xl text-3xl font-extrabold md:text-5xl">
          Форматы для бизнеса и частных клиентов
        </h2>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="surface-card group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/50"
            >
              <Icon className="h-7 w-7 text-gold transition-transform group-hover:scale-110" />
              <h3 className="mt-5 text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ПОЧЕМУ НАС ВЫБИРАЮТ */}
      <section className="border-y border-border bg-graphite/40">
        <div className="section-pad mx-auto max-w-7xl px-5 lg:px-8">
          <span className="eyebrow">Почему нас выбирают</span>
          <h2 className="mt-4 max-w-3xl text-3xl font-extrabold md:text-5xl">
            Спокойствие заказчика и эмоции гостей
          </h2>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {advantages.map(({ icon: Icon, title, text }) => (
              <article key={title} className="surface-card rounded-2xl p-7">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-gold text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-6 text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ФОРМАТЫ */}
      <section id="formats" className="section-pad mx-auto max-w-7xl px-5 lg:px-8">
        <span className="eyebrow">Популярные форматы</span>
        <h2 className="mt-4 max-w-3xl text-3xl font-extrabold md:text-5xl">
          Программы, которые заводят зал
        </h2>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {formats.map((f) => (
            <article
              key={f.title}
              className="surface-card group overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/50"
            >
              <div className="relative aspect-4/3 overflow-hidden">
                <img
                  src={f.img}
                  alt={f.title}
                  loading="lazy"
                  width={900}
                  height={700}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-card to-transparent" />
              </div>
              <div className="p-5">
                <h3 className="text-base font-bold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.text}</p>
                <a
                  href="#quiz"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-gold"
                >
                  Подробнее <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ПРОЦЕСС */}
      <section id="process" className="border-y border-border bg-graphite/40">
        <div className="section-pad mx-auto max-w-7xl px-5 lg:px-8">
          <span className="eyebrow">Как проходит мероприятие</span>
          <h2 className="mt-4 max-w-3xl text-3xl font-extrabold md:text-5xl">
            Пять шагов от заявки до оваций
          </h2>
          <ol className="mt-12 grid gap-4 md:grid-cols-3 lg:grid-cols-5">
            {steps.map((s) => (
              <li key={s.n} className="surface-card relative rounded-2xl p-6">
                <span className="font-display text-4xl font-black text-gradient-gold">{s.n}</span>
                <h3 className="mt-4 text-base font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10">
            <a
              href="#quiz"
              className="inline-flex rounded-full bg-gradient-gold px-8 py-4 text-sm font-bold text-primary-foreground transition-transform hover:scale-105"
            >
              Начать с бесплатной концепции
            </a>
          </div>
        </div>
      </section>

      {/* КЕЙСЫ */}
      <section id="cases" className="section-pad mx-auto max-w-7xl px-5 lg:px-8">
        <span className="eyebrow">Наши проекты</span>
        <h2 className="mt-4 max-w-3xl text-3xl font-extrabold md:text-5xl">
          Кейсы, которыми гордимся
        </h2>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {cases.map((c) => (
            <article
              key={c.title}
              className={`group relative overflow-hidden rounded-3xl border border-border ${
                c.wide ? "lg:col-span-2" : ""
              }`}
            >
              <img
                src={c.img}
                alt={c.title}
                loading="lazy"
                width={1200}
                height={800}
                className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-105 md:h-96"
              />
              <div className="absolute inset-0 bg-linear-to-t from-background via-background/50 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-background/60 px-3 py-1 text-xs font-bold text-gold backdrop-blur-sm">
                  <Building2 className="h-3.5 w-3.5" /> {c.people}
                </span>
                <h3 className="mt-3 text-xl font-bold md:text-2xl">{c.title}</h3>
                <p className="mt-2 max-w-md text-sm text-muted-foreground">{c.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ЦИФРЫ */}
      <section className="border-y border-border bg-graphite/40">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          {stats.map((s) => (
            <div key={s.l} className="text-center md:text-left">
              <div className="font-display text-4xl font-black text-gradient-gold md:text-6xl">
                {s.v}
              </div>
              <div className="mt-2 text-sm text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ОТЗЫВЫ */}
      <section id="reviews" className="section-pad mx-auto max-w-5xl px-5 lg:px-8">
        <span className="eyebrow">Отзывы</span>
        <h2 className="mt-4 mb-12 text-3xl font-extrabold md:text-5xl">Что говорят клиенты</h2>
        <Testimonials />
      </section>

      {/* КВИЗ */}
      <section id="quiz" className="border-y border-border bg-graphite/40">
        <div className="section-pad mx-auto grid max-w-7xl items-start gap-12 px-5 lg:grid-cols-2 lg:px-8">
          <div className="lg:sticky lg:top-28">
            <span className="eyebrow">Расчет стоимости</span>
            <h2 className="mt-4 text-3xl font-extrabold md:text-5xl">
              Узнайте бюджет вашего мероприятия за 1 минуту
            </h2>
            <p className="mt-5 text-muted-foreground">
              Ответьте на 4 вопроса — пришлем 2–3 концепции и прозрачную смету. Без предоплаты и
              обязательств.
            </p>
            <ul className="mt-8 space-y-3 text-sm">
              {[
                "Ответ менеджера в течение 15 минут",
                "Концепции с визуализацией и таймингом",
                "Фиксированная смета без скрытых доплат",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <Quiz />
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section-pad mx-auto max-w-4xl px-5 lg:px-8">
        <span className="eyebrow">FAQ</span>
        <h2 className="mt-4 mb-10 text-3xl font-extrabold md:text-5xl">Частые вопросы</h2>
        <Accordion type="single" collapsible className="w-full">
          {faq.map((f, i) => (
            <AccordionItem key={f.q} value={`i${i}`} className="border-border">
              <AccordionTrigger className="text-left text-base font-semibold hover:text-gold md:text-lg">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* ФИНАЛЬНЫЙ CTA */}
      <section className="relative overflow-hidden">
        <img
          src={cta}
          alt="Награждение команды на корпоративе"
          loading="lazy"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-background/80" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-5 py-24 text-center md:py-32 lg:px-8">
          <h2 className="text-3xl font-extrabold md:text-5xl">
            Давайте создадим мероприятие,{" "}
            <span className="text-gradient-gold">о котором будут говорить еще долго</span>
          </h2>
          <p className="mt-5 text-muted-foreground md:text-lg">
            Получите несколько идей и расчет стоимости уже сегодня
          </p>
          <a
            href="#quiz"
            className="glow-gold mt-9 inline-flex rounded-full bg-gradient-gold px-10 py-4 text-sm font-bold text-primary-foreground transition-transform hover:scale-105"
          >
            Получить предложение
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
