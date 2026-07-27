import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

const TITLE = "Пользовательское соглашение — FIRE KITCHEN SHOW";
const DESCRIPTION =
  "Условия использования сайта шоу FIRE KITCHEN SHOW: заявки, коммерческие предложения и порядок взаимодействия.";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: Terms,
});

function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-3xl px-5 pt-36 pb-24 lg:px-8">
        <h1 className="text-3xl font-extrabold md:text-5xl">Пользовательское соглашение</h1>
        <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
          <p>
            Использование сайта означает согласие с условиями настоящего соглашения. Сайт носит
            информационный характер и не является публичной офертой.
          </p>
          <h2 className="text-xl font-bold text-foreground">1. Заявки</h2>
          <p>
            Отправляя форму, вы подтверждаете достоверность указанных данных и согласие на
            обработку персональных данных.
          </p>
          <h2 className="text-xl font-bold text-foreground">2. Стоимость услуг</h2>
          <p>
            Указанные на сайте цифры являются ориентировочными. Итоговая стоимость фиксируется в
            смете и договоре.
          </p>
          <h2 className="text-xl font-bold text-foreground">3. Интеллектуальная собственность</h2>
          <p>
            Материалы сайта, включая тексты и изображения, принадлежат шоу FIRE KITCHEN SHOW и не могут
            использоваться без письменного согласия.
          </p>
          <h2 className="text-xl font-bold text-foreground">4. Контакты</h2>
          <p>По любым вопросам: hello@eventum.ru, +7 996 900-36-66.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
