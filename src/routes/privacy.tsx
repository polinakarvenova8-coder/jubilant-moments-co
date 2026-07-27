import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

const TITLE = "Политика конфиденциальности — FIRE KITCHEN SHOW";
const DESCRIPTION =
  "Как проект FIRE KITCHEN SHOW собирает, использует и защищает персональные данные посетителей сайта и клиентов.";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-3xl px-5 pt-36 pb-24 lg:px-8">
        <h1 className="text-3xl font-extrabold md:text-5xl">Политика конфиденциальности</h1>
        <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
          <p>
            Настоящая политика описывает порядок обработки персональных данных, которые вы
            передаете шоу FIRE KITCHEN SHOW через формы на сайте.
          </p>
          <h2 className="text-xl font-bold text-foreground">1. Какие данные мы собираем</h2>
          <p>
            Имя, номер телефона, адрес электронной почты и сведения о планируемом мероприятии,
            указанные вами в квизе или заявке.
          </p>
          <h2 className="text-xl font-bold text-foreground">2. Цели обработки</h2>
          <p>
            Связь с вами, подготовка коммерческого предложения, расчет стоимости и исполнение
            договора на организацию мероприятия.
          </p>
          <h2 className="text-xl font-bold text-foreground">3. Передача третьим лицам</h2>
          <p>
            Данные не продаются и не передаются третьим лицам, за исключением подрядчиков,
            привлеченных для проведения вашего мероприятия, и случаев, предусмотренных законом.
          </p>
          <h2 className="text-xl font-bold text-foreground">4. Хранение и удаление</h2>
          <p>
            Данные хранятся до достижения целей обработки или до отзыва согласия. Запрос на
            удаление направляйте по телефону +7 996 900-36-66.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
