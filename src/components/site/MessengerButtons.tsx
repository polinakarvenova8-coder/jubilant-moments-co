import { MessageCircle, MessagesSquare, Send } from "lucide-react";

const messengers = [
  {
    name: "WhatsApp",
    href: "https://wa.me/79969003666",
    icon: MessageCircle,
  },
  {
    name: "Telegram",
    href: "https://t.me/firekitchenkzn",
    icon: Send,
  },
  {
    name: "MAX",
    href: "https://max.ru/u/f9LHodD0cOIzFjRenoyF_tXQcn2n8l2nhkG7SAlqU5wgdIXVyWuMHXjRvjo",
    icon: MessagesSquare,
  },
];

export function MessengerButtons({ className = "" }: { className?: string }) {
  return (
    <div className={className} aria-label="Мессенджеры">
      {messengers.map(({ name, href, icon: Icon }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={name}
          title={name}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border bg-background/70 text-foreground transition-colors hover:border-ember hover:text-ember"
        >
          <Icon className="h-4 w-4" aria-hidden />
        </a>
      ))}
    </div>
  );
}
