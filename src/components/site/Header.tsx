import { useEffect, useState } from "react";
import { Flame, Menu, Phone, X } from "lucide-react";

const nav = [
  { href: "#emotions", label: "О шоу" },
  { href: "#how", label: "Как проходит" },
  { href: "#formats", label: "Форматы" },
  { href: "#gallery", label: "Галерея" },
  { href: "#reviews", label: "Отзывы" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/85 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-8">
        <a href="#hero" className="flex min-w-0 items-center gap-2">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-fire text-primary-foreground">
            <Flame className="h-5 w-5" />
          </span>
          <span className="truncate font-display text-sm font-bold tracking-tight sm:text-base">
            FIRE KITCHEN<span className="text-gradient-fire"> SHOW</span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-ember"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="tel:+79969003666"
            className="hidden items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-ember xl:flex"
          >
            <Phone className="h-4 w-4 text-ember" />
            +7 996 900-36-66
          </a>
          <a
            href="#quiz"
            className="hidden rounded-full bg-gradient-fire px-5 py-2.5 text-sm font-bold text-primary-foreground transition-transform hover:scale-105 sm:inline-flex"
          >
            Забронировать игру
          </a>
          <button
            type="button"
            aria-label="Меню"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background/95 px-5 py-4 backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col gap-3">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-1 text-sm text-muted-foreground"
              >
                {item.label}
              </a>
            ))}
            <a
              href="tel:+79969003666"
              className="py-1 text-sm font-semibold text-foreground"
            >
              +7 996 900-36-66
            </a>
            <a
              href="#quiz"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-gradient-fire px-5 py-3 text-center text-sm font-bold text-primary-foreground"
            >
              Забронировать игру
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
