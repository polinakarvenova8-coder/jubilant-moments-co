import * as Dialog from "@radix-ui/react-dialog";
import { Gift, X } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { LeadForm } from "@/components/site/LeadForm";
import { Quiz } from "@/components/site/Quiz";
import { hasLeadSubmitted, trackEvent } from "@/lib/analytics";
import { getAttribution } from "@/lib/attribution";
import { BOOKING_GIFT_CONDITION } from "@/lib/offer";
import type { Lead } from "@/lib/crm";

type PopupState =
  | { kind: "lead"; source: Lead["source"] }
  | { kind: "quiz" }
  | { kind: "exit" };

type LeadPopupContextValue = {
  openLead: (source: Lead["source"]) => void;
  openQuiz: () => void;
};

const LeadPopupContext = createContext<LeadPopupContextValue | null>(null);
const EXIT_SHOWN_KEY = "akshow_exit_popup_shown";

export function useLeadPopup(): LeadPopupContextValue {
  const context = useContext(LeadPopupContext);
  if (!context) throw new Error("useLeadPopup must be used inside LeadPopupProvider");
  return context;
}

export function LeadPopupProvider({ children }: { children: ReactNode }) {
  const [popup, setPopup] = useState<PopupState | null>(null);
  const [dirty, setDirty] = useState(false);
  const popupRef = useRef<PopupState | null>(null);
  const dirtyRef = useRef(false);
  const exitShownRef = useRef(false);

  useEffect(() => {
    popupRef.current = popup;
  }, [popup]);

  useEffect(() => {
    dirtyRef.current = dirty;
  }, [dirty]);

  const openPopup = useCallback((next: PopupState) => {
    setDirty(false);
    dirtyRef.current = false;
    setPopup(next);
    popupRef.current = next;
  }, []);

  const openLead = useCallback(
    (source: Lead["source"]) => openPopup({ kind: "lead", source }),
    [openPopup],
  );
  const openQuiz = useCallback(() => openPopup({ kind: "quiz" }), [openPopup]);
  const close = useCallback(() => {
    setPopup(null);
    popupRef.current = null;
    setDirty(false);
    dirtyRef.current = false;
  }, []);

  useEffect(() => {
    getAttribution();
  }, []);

  useEffect(() => {
    if (!popup) return;
    const popupType = popup.kind === "quiz" ? "quiz" : popup.kind === "exit" ? "exit" : "lead";
    trackEvent("popup_open", {
      popup_type: popupType,
      form_name: popup.kind === "lead" ? `short_${popup.source}` : popupType,
    });
    if (popup.kind === "quiz") trackEvent("quiz_open", { form_name: "quiz" });
  }, [popup]);

  useEffect(() => {
    const mobile = window.matchMedia("(pointer: coarse)").matches;
    let mobileDelayPassed = !mobile;

    const canShow = () => {
      if (exitShownRef.current || popupRef.current || dirtyRef.current || hasLeadSubmitted()) return false;
      if (mobile) {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
        return mobileDelayPassed && progress >= 0.25;
      }
      return true;
    };

    const show = () => {
      if (!canShow()) return;
      try {
        if (window.sessionStorage.getItem(EXIT_SHOWN_KEY) === "1") return;
        window.sessionStorage.setItem(EXIT_SHOWN_KEY, "1");
      } catch {
        // The in-memory flag below still prevents repeats when storage is unavailable.
      }
      exitShownRef.current = true;
      openPopup({ kind: "exit" });
    };

    const onMouseOut = (event: MouseEvent) => {
      if (!mobile && event.clientY <= 0 && !event.relatedTarget) show();
    };
    const onScroll = () => {
      if (mobile) show();
    };
    const timer = window.setTimeout(
      () => {
        mobileDelayPassed = true;
        if (mobile) show();
      },
      mobile ? 35000 : 0,
    );

    document.addEventListener("mouseout", onMouseOut);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("scroll", onScroll);
    };
  }, [openPopup]);

  const isQuiz = popup?.kind === "quiz";

  return (
    <LeadPopupContext.Provider value={{ openLead, openQuiz }}>
      {children}
      <Dialog.Root open={popup !== null} onOpenChange={(open) => !open && close()}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[80] bg-background/85 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content
            onPointerDownOutside={(event) => {
              if (dirty) event.preventDefault();
            }}
            className={`fixed left-1/2 top-1/2 z-[90] max-h-[92svh] w-[calc(100%-1.5rem)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-3xl border border-border bg-card p-5 shadow-2xl outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:p-8 ${
              isQuiz ? "max-w-3xl" : "max-w-xl"
            }`}
          >
            <Dialog.Close
              aria-label="Закрыть окно"
              className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-border bg-background/80 text-muted-foreground transition-colors hover:border-ember hover:text-ember"
            >
              <X className="h-5 w-5" />
            </Dialog.Close>

            {popup?.kind === "quiz" && (
              <>
                <Dialog.Title className="pr-12 text-2xl font-bold">
                  Рассчитать стоимость мероприятия
                </Dialog.Title>
                <Dialog.Description className="mt-2 pr-10 text-sm text-muted-foreground">
                  Ответьте на вопросы и выберите подарок при бронировании в течение 5 дней.
                </Dialog.Description>
                <Quiz onDirtyChange={setDirty} />
              </>
            )}

            {popup?.kind === "lead" && (
              <>
                <Dialog.Title className="pr-12 text-2xl font-bold">
                  Получите специальное предложение на проведение Адского кулинарного шоу!
                </Dialog.Title>
                <Dialog.Description className="mt-3 text-sm text-muted-foreground">
                  Оставьте заявку, расскажите о вашем мероприятии и получите индивидуальный расчёт
                  стоимости и специальные условия бронирования.
                </Dialog.Description>
                <div className="mt-5 flex gap-3 rounded-2xl border border-ember/30 bg-ember/10 p-4 text-sm">
                  <Gift className="mt-0.5 h-5 w-5 shrink-0 text-ember" />
                  <p>{BOOKING_GIFT_CONDITION} На выбор: «Чёрные ящики» или видеоприглашение.</p>
                </div>
                <LeadForm
                  source={popup.source}
                  buttonLabel="Получить предложение"
                  className="mt-6"
                  onDirtyChange={setDirty}
                />
              </>
            )}

            {popup?.kind === "exit" && (
              <>
                <Dialog.Title className="pr-12 text-2xl font-bold">
                  Не спешите уходить! Возможно, для вашего мероприятия у нас есть специальное
                  предложение
                </Dialog.Title>
                <Dialog.Description className="mt-3 text-sm text-muted-foreground">
                  Оставьте контакты, и мы поможем подобрать программу и рассчитать стоимость.
                </Dialog.Description>
                <LeadForm
                  source="callback"
                  buttonLabel="Получить предложение"
                  className="mt-6"
                  onDirtyChange={setDirty}
                />
              </>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </LeadPopupContext.Provider>
  );
}
