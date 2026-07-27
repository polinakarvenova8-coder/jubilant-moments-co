import { createFileRoute } from "@tanstack/react-router";
import {
  Award,
  ChefHat,
  Clock,
  Flame,
  Camera,
  HeartHandshake,
  Sparkles,
  Swords,
  Trophy,
  Users,
  Utensils,
} from "lucide-react";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Quiz } from "@/components/site/Quiz";
import { Testimonials } from "@/components/site/Testimonials";
import { Reveal } from "@/components/site/Reveal";
import { LeadForm } from "@/components/site/LeadForm";
import { StickyCta } from "@/components/site/StickyCta";
import { Toaster } from "@/components/ui/sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import hero from "@/assets/hk-hero.jpg";
import emotion from "@/assets/hk-emotion.jpg";
import chef from "@/assets/hk-chef.jpg";
import battle from "@/assets/hk-battle.jpg";
import win from "@/assets/hk-win.jpg";
import g1 from "@/assets/hk-g1.jpg";
import g2 from "@/assets/hk-g2.jpg";
import g3 from "@/assets/hk-g3.jpg";
import g4 from "@/assets/hk-g4.jpg";
import g5 from "@/assets/hk-g5.jpg";
import cta from "@/assets/hk-cta.jpg";

const TITLE = "Кулинарное квест-шоу «Адская кухня» для корпоративов | FIRE KITCHEN SHOW";
const DESCRIPTION =
  "Кулинарное квест-шоу в стиле Адской кухни для взрослых: корпоративы, тимбилдинги, дни рождения, мальчишники. От 8 до 80 участников, ведущий-шоумен, настоящие испытания.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "FIRE KITCHEN SHOW",
          description: DESCRIPTION,
          telephone: "+7 (495) 123-45-67",
          email: "hello@firekitchenshow.ru",
          priceRange: "$$$",
          address: { "@type": "PostalAddress", addressCountry: "RU", addressLocality: "Москва" },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "5.0",
            reviewCount: "312",
          },
        }),
      },
    ],
  }),
  component: Landing,
});

const heroBenefits = [
  "От 8 до 80 участников",
  "Ведущий-шоумен",
  "Настоящие кулинарные испытания",
  "Командные соревнования",
  "Подходит даже тем, кто не умеет готовить",
];

const steps = [
  { icon: Users, title: "Деление на команды", text: "Жеребьевка, названия, бригады и капитаны." },
  { icon: ChefHat, title: "Знакомство с шефом", text: "Ведущий задает правила и накаляет градус." },
  { icon: Utensils, title: "Серия испытаний", text: "Слепая дегустация, скорость, точность, вкус." },
  { icon: Swords, title: "Командные баттлы", text: "Команда против команды, счет на табло." },
  { icon: Flame, title: "Финальная битва", text: "Главное блюдо шоу и защита перед жюри." },
  { icon: Trophy, title: "Награждение", text: "Медали, титул шефа и общий стол с ужином." },
];

const formats = [
  { title: "Корпоратив", text: "Шоу-программа вместо скучного банкета.", img: g4 },
  { title: "Тимбилдинг", text: "Реальная командная работа под давлением.", img: battle },
  { title: "День рождения", text: "Взрослый праздник с азартом и юмором.", img: g2 },
  { title: "Юбилей компании", text: "Масштабный формат до 80 участников.", img: win },
  { title: "Мальчишник", text: "Огонь, мясо, соревнование и хороший финал.", img: g5 },
  { title: "Девичник", text: "Коктейли, десерты и много смеха.", img: g3 },
  { title: "Выпускной для взрослых групп", text: "Встреча курса или потока в новом формате.", img: emotion },
];

const advantages = [
  { icon: Sparkles, title: "Уникальный формат", text: "Не мастер-класс и не квиз — полноценное шоу с драматургией." },
  { icon: ChefHat, title: "Не требует навыков", text: "Шеф и су-шефы ведут за руку: получится у каждого." },
  { icon: HeartHandshake, title: "Сильное командообразование", text: "Общая цель, роли, дедлайн — команда раскрывается за час." },
  { icon: Users, title: "Для любого возраста", text: "Работает и для 25, и для 55 — проверено сотнями игр." },
  { icon: Clock, title: "Готовые сценарии", text: "Запуск от 3 дней: площадка, продукты, техника — на нас." },
  { icon: Camera, title: "Фото и видео после", text: "Профессиональный репортаж и динамичный ролик для соцсетей." },
];

const gallery = [
  { src: battle, alt: "Кулинарный баттл двух команд", cls: "md:col-span-2 md:row-span-2" },
  { src: g2, alt: "Эмоции участницы кулинарного шоу", cls: "" },
  { src: g5, alt: "Огонь на сковороде во время испытания", cls: "" },
  { src: win, alt: "Награждение победителей кулинарного шоу", cls: "md:col-span-2" },
  { src: g1, alt: "Скоростная нарезка на испытании", cls: "" },
  { src: g3, alt: "Финальное блюдо участников", cls: "" },
];

const stats = [
  { value: "500+", label: "проведенных игр" },
  { value: "20 000+", label: "участников" },
  { value: "98%", label: "довольных гостей" },
  { value: "5.0", label: "средняя оценка" },
];

const faq = [
  {
    q: "Сколько длится игра?",
    a: "Стандартный формат — 2,5–3 часа: знакомство с шефом, 4–5 испытаний, финальная битва и награждение. Дальше по желанию остается общий ужин из приготовленных блюд.",
  },
  {
    q: "Нужен ли опыт готовки?",
    a: "Нет. Все испытания рассчитаны на новичков: шеф показывает технику, су-шефы страхуют команды. Половина наших гостей до игры не готовила ничего сложнее яичницы.",
  },
  {
    q: "Можно ли участвовать большой компанией?",
    a: "Да, мы проводим игры от 8 до 80 человек. Для групп больше 40 участников подключаем второго ведущего и делим зал на бригады.",
  },
  {
    q: "Есть ли корпоративные пакеты?",
    a: "Да: «Базовый» (шоу + ужин), «Бизнес» (шоу, кейтеринг, фотограф) и «Премиум» (шоу, видеоролик, декор, брендирование фартуков и наградной церемонии). Работаем по договору и с закрывающими документами.",
  },
  {
    q: "Можно ли заказать фотографа?",
    a: "Да, фотограф и видеооператор входят в пакеты «Бизнес» и «Премиум» или заказываются отдельно. Фото передаем в течение 2 дней, ролик — до 5 дней.",
  },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <StickyCta />
      <Toaster position="top-center" />

      <main>
        {/* 1. HERO */}
        <section id="hero" className="relative flex min-h-[100svh] items-center overflow-hidden">
          <img
            src={hero}
            alt="Команда в черных фартуках на профессиональной кухне во время кулинарного шоу"
            width={1920}
            height={1088}
            className="animate-slow-zoom absolute inset-0 h-full w-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: "var(--gradient-veil)" }}
            aria-hidden
          />
          <div className="relative mx-auto w-full max-w-7xl px-5 pt-28 pb-20 lg:px-8">
            <p className="animate-rise eyebrow">Кулинарное квест-шоу для взрослых</p>
            <h1 className="animate-rise mt-5 max-w-4xl text-4xl leading-[1.05] font-extrabold md:text-6xl lg:text-7xl">
              Почувствуйте себя участниками настоящей{" "}
              <span className="text-gradient-fire">Адской кухни</span>
            </h1>
            <p className="animate-rise mt-6 max-w-2xl text-base text-muted-foreground md:text-xl">
              Кулинарное квест-шоу для корпоративов, дней рождения и компаний друзей.
            </p>

            <div className="animate-rise mt-9 flex flex-wrap gap-3">
              <a
                href="#quiz"
                className="glow-fire inline-flex items-center gap-2 rounded-full bg-gradient-fire px-7 py-4 text-sm font-bold text-primary-foreground transition-transform hover:scale-105"
              >
                <Flame className="h-4 w-4" /> Забронировать игру
              </a>
              <a
                href="#quiz"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background/40 px-7 py-4 text-sm font-bold backdrop-blur-md transition-colors hover:border-ember hover:text-ember"
              >
                Получить стоимость
              </a>
            </div>

            <ul className="animate-rise mt-10 grid max-w-4xl gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
              {heroBenefits.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-foreground/90">
                  <span className="mt-0.5 text-ember">✓</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 2. ЭМОЦИИ */}
        <section id="emotions" className="section-pad mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <p className="eyebrow">Атмосфера</p>
              <h2 className="mt-4 text-3xl font-extrabold md:text-5xl">
                Здесь не смотрят шоу.
                <br />
                <span className="text-gradient-fire">Здесь становятся его участниками.</span>
              </h2>
              <p className="mt-6 max-w-xl text-muted-foreground">
                Участники делятся на команды, проходят испытания, соревнуются за победу и получают
                море эмоций. Черные фартуки, гул кухни, огонь на сковородах, крик шефа и табло со
                счетом — все как в телевизионном шоу, только главные герои здесь вы.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  { v: "3 часа", l: "чистого драйва" },
                  { v: "5 испытаний", l: "и финальная битва" },
                  { v: "1 команда", l: "после финала" },
                ].map((i) => (
                  <div key={i.v} className="surface-card rounded-2xl p-5">
                    <p className="font-display text-xl font-bold text-ember">{i.v}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{i.l}</p>
                  </div>
                ))}
              </div>
              <LeadForm source="hero" className="mt-8 max-w-2xl" buttonLabel="Получить программу" />
            </Reveal>

            <Reveal delay={120} className="grid grid-cols-2 gap-4">
              <img
                src={emotion}
                alt="Гости смеются во время кулинарного квест-шоу"
                loading="lazy"
                width={1600}
                height={1000}
                className="col-span-2 h-64 w-full rounded-3xl object-cover md:h-80"
              />
              <img
                src={chef}
                alt="Ведущий-шеф на кулинарном шоу"
                loading="lazy"
                width={1200}
                height={1500}
                className="h-56 w-full rounded-3xl object-cover md:h-72"
              />
              <img
                src={g5}
                alt="Огонь на сковороде"
                loading="lazy"
                width={1200}
                height={900}
                className="h-56 w-full rounded-3xl object-cover md:h-72"
              />
            </Reveal>
          </div>
        </section>

        {/* 3. КАК ПРОХОДИТ ИГРА */}
        <section id="how" className="border-y border-border bg-graphite/40">
          <div className="section-pad mx-auto max-w-7xl px-5 lg:px-8">
            <Reveal>
              <p className="eyebrow">Сценарий вечера</p>
              <h2 className="mt-4 max-w-3xl text-3xl font-extrabold md:text-5xl">
                Как проходит игра
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {steps.map((s, i) => (
                <Reveal key={s.title} delay={i * 70}>
                  <div className="surface-card h-full rounded-2xl p-6">
                    <div className="flex items-center justify-between">
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-fire text-primary-foreground">
                        <s.icon className="h-5 w-5" />
                      </span>
                      <span className="font-display text-3xl font-black text-secondary-foreground/15">
                        0{i + 1}
                      </span>
                    </div>
                    <h3 className="mt-5 text-lg font-bold">{s.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 4. ФОРМАТЫ */}
        <section id="formats" className="section-pad mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <p className="eyebrow">Поводы</p>
            <h2 className="mt-4 max-w-3xl text-3xl font-extrabold md:text-5xl">
              Форматы, под которые адаптируем шоу
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {formats.map((f, i) => (
              <Reveal key={f.title} delay={i * 60}>
                <article className="group relative h-72 overflow-hidden rounded-3xl border border-border">
                  <img
                    src={f.img}
                    alt={f.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="text-xl font-bold">{f.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{f.text}</p>
                    <a
                      href="#quiz"
                      className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-ember"
                    >
                      Рассчитать стоимость <Flame className="h-4 w-4" />
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
            <Reveal delay={420}>
              <div className="surface-card flex h-72 flex-col justify-center rounded-3xl p-7">
                <h3 className="text-xl font-bold">Свой повод?</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Соберем сценарий под вашу задачу и количество гостей.
                </p>
                <a
                  href="#quiz"
                  className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-gradient-fire px-6 py-3 text-sm font-bold text-primary-foreground"
                >
                  Обсудить формат
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 5. ПОЧЕМУ ВЫБИРАЮТ НАС */}
        <section className="border-y border-border bg-graphite/40">
          <div className="section-pad mx-auto max-w-7xl px-5 lg:px-8">
            <Reveal>
              <p className="eyebrow">Почему нас выбирают</p>
              <h2 className="mt-4 max-w-3xl text-3xl font-extrabold md:text-5xl">
                Шоу, которое продает себя эмоциями гостей
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {advantages.map((a, i) => (
                <Reveal key={a.title} delay={i * 60}>
                  <div className="surface-card h-full rounded-2xl p-6">
                    <span className="grid h-11 w-11 place-items-center rounded-xl border border-ember/40 text-ember">
                      <a.icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-5 text-lg font-bold">{a.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{a.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={200}>
              <div className="mt-12 surface-card rounded-3xl p-6 md:p-8">
                <h3 className="text-lg font-bold md:text-xl">
                  Получите программу шоу и стоимость на вашу дату
                </h3>
                <LeadForm source="cta" className="mt-5" buttonLabel="Получить программу" />
              </div>
            </Reveal>
          </div>
        </section>

        {/* 6. ГАЛЕРЕЯ */}
        <section id="gallery" className="section-pad mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <p className="eyebrow">Галерея</p>
            <h2 className="mt-4 max-w-3xl text-3xl font-extrabold md:text-5xl">
              Как это выглядит вживую
            </h2>
          </Reveal>
          <div className="mt-12 grid auto-rows-[190px] grid-cols-2 gap-4 md:grid-cols-4">
            {gallery.map((g, i) => (
              <Reveal key={g.alt} delay={i * 60} className={`${g.cls} h-full`}>
                <img
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  className="h-full w-full rounded-2xl object-cover transition-transform duration-700 hover:scale-[1.03]"
                />
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <div className="relative mt-6 overflow-hidden rounded-3xl border border-border">
              <img
                src={g4}
                alt="Видео-отзыв команды после кулинарного шоу"
                loading="lazy"
                className="h-72 w-full object-cover md:h-96"
              />
              <div className="absolute inset-0 grid place-items-center bg-background/50">
                <div className="text-center">
                  <span className="animate-flicker grid h-16 w-16 place-items-center rounded-full bg-gradient-fire text-primary-foreground mx-auto">
                    <Flame className="h-7 w-7" />
                  </span>
                  <p className="mt-4 font-display text-lg font-bold">Видео-отзывы участников</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Пришлем подборку роликов с игр в мессенджер
                  </p>
                  <a
                    href="#quiz"
                    className="mt-5 inline-flex rounded-full border border-ember px-6 py-3 text-sm font-bold text-ember"
                  >
                    Запросить видео
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* 7. ЦИФРЫ */}
        <section className="border-y border-border bg-graphite/40">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 80}>
                <p className="text-gradient-fire font-display text-4xl font-black md:text-5xl">
                  {s.value}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* 8. ОТЗЫВЫ */}
        <section id="reviews" className="section-pad mx-auto max-w-5xl px-5 lg:px-8">
          <Reveal>
            <p className="eyebrow">Отзывы · средняя оценка 5.0</p>
            <h2 className="mt-4 mb-12 text-3xl font-extrabold md:text-5xl">
              Компании и частные гости
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <Testimonials />
          </Reveal>
        </section>

        {/* 9. КВИЗ */}
        <section id="quiz" className="border-y border-border bg-graphite/40">
          <div className="section-pad mx-auto max-w-6xl px-5 lg:px-8">
            <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.15fr]">
              <Reveal>
                <p className="eyebrow">Расчет за 1 минуту</p>
                <h2 className="mt-4 text-3xl font-extrabold md:text-5xl">
                  Рассчитать стоимость мероприятия
                </h2>
                <p className="mt-5 text-muted-foreground">
                  Ответьте на 4 вопроса — пришлем программу шоу, свободные даты и точную стоимость
                  под ваш формат.
                </p>
                <ul className="mt-8 space-y-3 text-sm">
                  {[
                    "Ответ менеджера в течение 15 минут",
                    "Работаем с юрлицами и по договору",
                    "Площадка, продукты и техника — на нас",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <Award className="mt-0.5 h-4 w-4 shrink-0 text-ember" /> {t}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={120}>
                <Quiz />
              </Reveal>
            </div>
          </div>
        </section>

        {/* 10. FAQ */}
        <section id="faq" className="section-pad mx-auto max-w-4xl px-5 lg:px-8">
          <Reveal>
            <p className="eyebrow">FAQ</p>
            <h2 className="mt-4 mb-10 text-3xl font-extrabold md:text-5xl">Частые вопросы</h2>
          </Reveal>
          <Reveal delay={80}>
            <Accordion type="single" collapsible className="w-full">
              {faq.map((f, i) => (
                <AccordionItem key={f.q} value={`i${i}`} className="border-border">
                  <AccordionTrigger className="text-left text-base font-semibold hover:text-ember md:text-lg">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground md:text-base">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </section>

        {/* 11. ФИНАЛЬНЫЙ CTA */}
        <section className="relative overflow-hidden">
          <img
            src={cta}
            alt="Гости за общим столом после кулинарного шоу"
            loading="lazy"
            width={1600}
            height={900}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-background/80" />
          <div className="relative mx-auto max-w-4xl px-5 py-24 text-center lg:px-8">
            <Reveal>
              <h2 className="text-3xl font-extrabold md:text-5xl">
                Готовы проверить, кто станет{" "}
                <span className="text-gradient-fire">шефом вашей команды?</span>
              </h2>
              <p className="mt-5 text-muted-foreground md:text-lg">
                Оставьте заявку и получите программу мероприятия уже сегодня.
              </p>
              <LeadForm source="cta" className="mx-auto mt-9 max-w-2xl" />
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
