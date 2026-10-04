import { describe, expect, it } from "vitest";
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
});

describe("formatTitleKeywords", () => {
  it("joins keywords with a comma and a space", () => {
    expect(formatTitleKeywords(["zoom room", "placeholder"])).toBe("zoom room, placeholder");
  });
});
