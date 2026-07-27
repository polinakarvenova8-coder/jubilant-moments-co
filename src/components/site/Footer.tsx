import { Link } from "@tanstack/react-router";
import { Flame, Instagram, Mail, MessageCircle, Phone, Send, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-graphite/40 pb-24 md:pb-0">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-3 lg:px-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-fire text-primary-foreground">
              <Flame className="h-5 w-5" />
            </span>
            <span className="font-display text-base font-bold">
              FIRE KITCHEN<span className="text-gradient-fire"> SHOW</span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Кулинарное квест-шоу для взрослых компаний: корпоративы, тимбилдинги, дни рождения,
            мальчишники и девичники. От 8 до 80 участников.
          </p>
        </div>

        <div className="space-y-3 text-sm">
          <h3 className="eyebrow">Контакты</h3>
          <a
            href="tel:+74951234567"
            className="flex items-center gap-2 text-foreground transition-colors hover:text-ember"
          >
            <Phone className="h-4 w-4 text-ember" /> +7 (495) 123-45-67
          </a>
          <a
            href="https://wa.me/74951234567"
            className="flex items-center gap-2 text-foreground transition-colors hover:text-ember"
          >
            <MessageCircle className="h-4 w-4 text-ember" /> WhatsApp
          </a>
          <a
            href="https://t.me/firekitchenshow"
            className="flex items-center gap-2 text-foreground transition-colors hover:text-ember"
          >
            <Send className="h-4 w-4 text-ember" /> Telegram
          </a>
          <a
            href="mailto:hello@firekitchenshow.ru"
            className="flex items-center gap-2 text-foreground transition-colors hover:text-ember"
          >
            <Mail className="h-4 w-4 text-ember" /> hello@firekitchenshow.ru
          </a>
        </div>

        <div className="space-y-3 text-sm">
          <h3 className="eyebrow">Соцсети и документы</h3>
          <div className="flex gap-3">
            <a
              href="https://instagram.com"
              aria-label="Instagram"
              className="grid h-10 w-10 place-items-center rounded-full border border-border transition-colors hover:border-ember hover:text-ember"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://youtube.com"
              aria-label="YouTube"
              className="grid h-10 w-10 place-items-center rounded-full border border-border transition-colors hover:border-ember hover:text-ember"
            >
              <Youtube className="h-4 w-4" />
            </a>
            <a
              href="https://t.me/firekitchenshow"
              aria-label="Telegram"
              className="grid h-10 w-10 place-items-center rounded-full border border-border transition-colors hover:border-ember hover:text-ember"
            >
              <Send className="h-4 w-4" />
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
