import { Link } from "@tanstack/react-router";
import logoAsset from "@/assets/logo_white.png.asset.json";
import { Instagram, MessageCircle, MessagesSquare, Phone, Send, Users, Youtube } from "lucide-react";


export function Footer() {
  return (
    <footer className="border-t border-border bg-graphite/40 pb-24 md:pb-0">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-3 lg:px-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid place-items-center rounded-lg bg-white p-2">
              <img
                src={logoAsset.url}
                alt="Логотип «Адская кухня»"
                className="h-12 w-auto sm:h-14"
                loading="lazy"
              />
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Кулинарное квест-шоу для взрослых компаний: корпоративы, тимбилдинги, дни рождения,
            мальчишники и девичники. От 8 до 40 участников.
          </p>
        </div>

        <div className="space-y-3 text-sm">
          <h3 className="eyebrow">Контакты</h3>
          <a
            href="tel:+79969003666"
            className="flex items-center gap-2 text-foreground transition-colors hover:text-ember"
          >
            <Phone className="h-4 w-4 text-ember" /> +7 996 900-36-66
          </a>
          <a
            href="https://wa.me/79969003666"
            className="flex items-center gap-2 text-foreground transition-colors hover:text-ember"
          >
            <MessageCircle className="h-4 w-4 text-ember" /> WhatsApp
          </a>
          <a
            href="https://t.me/firekitchenkzn"
            className="flex items-center gap-2 text-foreground transition-colors hover:text-ember"
          >
            <Send className="h-4 w-4 text-ember" /> Telegram
          </a>
          <a
            href="https://max.ru/firekitchenkzn"
            className="flex items-center gap-2 text-foreground transition-colors hover:text-ember"
          >
            <MessagesSquare className="h-4 w-4 text-ember" /> MAX
          </a>
          <a
            href="https://vk.com/ad_cook_show"
            className="flex items-center gap-2 text-foreground transition-colors hover:text-ember"
          >
            <Users className="h-4 w-4 text-ember" /> ВКонтакте
          </a>
          <a
            href="https://instagram.com/adskoe_shou_kzn"
            className="flex items-center gap-2 text-foreground transition-colors hover:text-ember"
          >
            <Instagram className="h-4 w-4 text-ember" /> @adskoe_shou_kzn
          </a>
        </div>

        <div className="space-y-3 text-sm">
          <h3 className="eyebrow">Соцсети и документы</h3>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://instagram.com/adskoe_shou_kzn"
              aria-label="Instagram @adskoe_shou_kzn"
              className="grid h-10 w-10 place-items-center rounded-full border border-border transition-colors hover:border-ember hover:text-ember"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://vk.com/ad_cook_show"
              aria-label="ВКонтакте"
              className="grid h-10 w-10 place-items-center rounded-full border border-border transition-colors hover:border-ember hover:text-ember"
            >
              <Users className="h-4 w-4" />
            </a>
            <a
              href="https://youtube.com"
              aria-label="YouTube"
              className="grid h-10 w-10 place-items-center rounded-full border border-border transition-colors hover:border-ember hover:text-ember"
            >
              <Youtube className="h-4 w-4" />
            </a>
            <a
              href="https://t.me/firekitchenkzn"
              aria-label="Telegram"
              className="grid h-10 w-10 place-items-center rounded-full border border-border transition-colors hover:border-ember hover:text-ember"
            >
              <Send className="h-4 w-4" />
            </a>
            <a
              href="https://max.ru/firekitchenkzn"
              aria-label="MAX"
              className="grid h-10 w-10 place-items-center rounded-full border border-border transition-colors hover:border-ember hover:text-ember"
            >
              <MessagesSquare className="h-4 w-4" />
            </a>
          </div>

          <Link to="/privacy" className="block text-muted-foreground hover:text-ember">
            Политика конфиденциальности
          </Link>
          <Link to="/terms" className="block text-muted-foreground hover:text-ember">
            Пользовательское соглашение
          </Link>
        </div>
      </div>

      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} FIRE KITCHEN SHOW. Кулинарное квест-шоу для взрослых.
      </div>
    </footer>
  );
}
