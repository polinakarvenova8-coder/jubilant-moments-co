import { useEffect, useState } from "react";
import { Flame, Phone } from "lucide-react";
import { useLeadPopup } from "@/components/site/LeadPopup";
import { MessengerButtons } from "@/components/site/MessengerButtons";

export function StickyCta() {
  const [show, setShow] = useState(false);
  const { openQuiz } = useLeadPopup();

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 transition-all duration-300 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
      }`}
    >
      <div className="mx-auto flex max-w-2xl flex-col items-stretch gap-3 border-t border-border bg-background/90 p-3 backdrop-blur-xl sm:flex-row sm:items-center md:mb-5 md:rounded-full md:border">
        <button
          type="button"
          onClick={openQuiz}
          className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-gradient-fire px-5 py-3.5 text-sm font-bold text-primary-foreground"
        >
          <Flame className="h-4 w-4" /> Забронировать игру
        </button>
        <div className="flex items-center justify-center gap-2">
          <a
            href="tel:+79969003666"
            aria-label="Позвонить"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border text-ember"
          >
            <Phone className="h-5 w-5" />
          </a>
          <MessengerButtons className="flex items-center gap-2" />
        </div>
      </div>
    </div>
  );
}
