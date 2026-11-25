export const BOOKING_GIFT_DAYS = 5;

export const GIFT_OPTIONS = [
  {
    id: "black_boxes",
    name: "Конкурс «Чёрные ящики»",
    description: "Дополнительный командный конкурс в программе вашего праздника.",
  },
  {
    id: "video_invitation",
    name: "Персональное видеоприглашение",
    description: "Индивидуальное видеоприглашение на праздник для ваших гостей.",
  },
] as const;

export const BOOKING_GIFT_CONDITION = `Подарок предоставляется при подтверждении бронирования в течение ${BOOKING_GIFT_DAYS} календарных дней после отправки заявки.`;

export function getGiftName(id: string): string {
  return GIFT_OPTIONS.find((gift) => gift.id === id)?.name ?? "";
}
