import { describe, expect, it } from "vitest";
import { BOOKING_GIFT_CONDITION, BOOKING_GIFT_DAYS, GIFT_OPTIONS, getGiftName } from "./offer";

describe("booking gift", () => {
  it("requires booking confirmation within exactly 5 calendar days", () => {
    expect(BOOKING_GIFT_DAYS).toBe(5);
    expect(BOOKING_GIFT_CONDITION).toContain("подтверждении бронирования в течение 5 календарных дней после отправки заявки");
  });

  it("offers exactly the two approved gifts", () => {
    expect(GIFT_OPTIONS.map((gift) => gift.name)).toEqual([
      "Конкурс «Чёрные ящики»",
      "Персональное видеоприглашение",
    ]);
  });

  it("includes the selected gift name in lead answers", () => {
    expect(getGiftName("black_boxes")).toBe("Конкурс «Чёрные ящики»");
    expect(getGiftName("video_invitation")).toBe("Персональное видеоприглашение");
  });
});
