import { Link } from "@tanstack/react-router";
import { Mail, MessageCircle, Phone, Send } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-graphite/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-3 lg:px-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-gold text-sm font-black text-primary-foreground">
              E
            </span>
            <span className="font-display text-base font-bold">
              EVENTUM<span className="text-gradient-gold">.</span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Агентство корпоративных мероприятий, тимбилдингов и частных праздников для взрослых
            компаний. Работаем по всей России.
          </p>
        </div>

        <div className="space-y-3 text-sm">
          <h3 className="eyebrow">Контакты</h3>
          <a
            href="tel:+74951234567"
            className="flex items-center gap-2 text-foreground transition-colors hover:text-gold"
          >
            <Phone className="h-4 w-4 text-gold" /> +7 (495) 123-45-67
          </a>
          <a
            href="https://wa.me/74951234567"
            className="flex items-center gap-2 text-foreground transition-colors hover:text-gold"
          >
            <MessageCircle className="h-4 w-4 text-gold" /> WhatsApp
          </a>
          <a
            href="https://t.me/eventum"
            className="flex items-center gap-2 text-foreground transition-colors hover:text-gold"
          >
            <Send className="h-4 w-4 text-gold" /> Telegram
          </a>
          <a
            href="mailto:hello@eventum.ru"
            className="flex items-center gap-2 text-foreground transition-colors hover:text-gold"
          >
            <Mail className="h-4 w-4 text-gold" /> hello@eventum.ru
          </a>
        </div>

        <div className="space-y-3 text-sm">
          <h3 className="eyebrow">Документы</h3>
          <Link
            to="/privacy"
            className="block text-muted-foreground transition-colors hover:text-gold"
          >
            Политика конфиденциальности
          </Link>
          <Link
            to="/terms"
            className="block text-muted-foreground transition-colors hover:text-gold"
          >
            Пользовательское соглашение
          </Link>
          <div className="flex gap-3 pt-2">
            {["VK", "TG", "YT", "IG"].map((s) => (
              <a
                key={s}
                href="#hero"
                className="grid h-9 w-9 place-items-center rounded-full border border-border text-xs font-bold text-muted-foreground transition-colors hover:border-gold hover:text-gold"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-border px-5 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} EVENTUM. Все права защищены.
      </div>
    </footer>
  );
}
