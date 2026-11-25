import { describe, expect, it } from "vitest";
import { buildThankYouUrl, readAttribution } from "./attribution";

describe("advertising attribution", () => {
  it("keeps UTM tags and available advertising identifiers", () => {
    expect(readAttribution("?utm_source=yandex&utm_campaign=corporate&yclid=12345&gclid=abc")).toEqual({
      utm_source: "yandex",
      utm_campaign: "corporate",
      yclid: "12345",
      gclid: "abc",
    });
  });

  it("adds attribution to the existing thank-you page", () => {
    expect(buildThankYouUrl({ utm_source: "vk", utm_campaign: "show", yclid: "987" })).toBe(
      "https://akshow.ru/tnx?utm_source=vk&utm_campaign=show&yclid=987",
    );
  });

  it("uses https://akshow.ru/tnx when no advertising tags are present", () => {
    expect(buildThankYouUrl({})).toBe("https://akshow.ru/tnx");
  });
});
