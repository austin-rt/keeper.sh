import { describe, expect, it } from "vitest";
import {
  MAX_EXCLUDE_TITLE_KEYWORDS,
  MAX_EXCLUDE_TITLE_KEYWORD_LENGTH,
} from "@keeper.sh/data-schemas";
import {
  formatTitleKeywords,
  parseTitleKeywords,
  toggleExcludedAvailability,
} from "../../src/utils/calendars";

describe("toggleExcludedAvailability", () => {
  it("adds a status that is not excluded yet", () => {
    expect(toggleExcludedAvailability(["free"], "tentative")).toEqual(["free", "tentative"]);
  });

  it("removes a status that is already excluded", () => {
    expect(toggleExcludedAvailability(["free", "tentative"], "free")).toEqual(["tentative"]);
  });
});

describe("parseTitleKeywords", () => {
  it("splits on commas and trims each keyword", () => {
    expect(parseTitleKeywords(" zoom room ,placeholder")).toEqual(["zoom room", "placeholder"]);
  });

  it("drops empty entries so the request stays valid", () => {
    expect(parseTitleKeywords("zoom room,, ,")).toEqual(["zoom room"]);
  });

  it("keeps the list within the limits the API accepts", () => {
    const keywords = parseTitleKeywords(
      [`${"a".repeat(MAX_EXCLUDE_TITLE_KEYWORD_LENGTH)}b`, ...Array.from({ length: MAX_EXCLUDE_TITLE_KEYWORDS }, (_, index) => `k${index}`)].join(","),
    );

    expect(keywords).toHaveLength(MAX_EXCLUDE_TITLE_KEYWORDS);
    expect(keywords[0]).toBe("a".repeat(MAX_EXCLUDE_TITLE_KEYWORD_LENGTH));
  });
});

describe("formatTitleKeywords", () => {
  it("joins keywords with a comma and a space", () => {
    expect(formatTitleKeywords(["zoom room", "placeholder"])).toBe("zoom room, placeholder");
  });
});
