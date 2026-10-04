import { describe, expect, it } from "vitest";
import { getExcludableAvailabilities } from "../src/index";

const valuesFor = (provider: string): string[] =>
  getExcludableAvailabilities(provider).map(({ value }) => value);

describe("getExcludableAvailabilities", () => {
  it("offers only the statuses every provider reports to a provider without extras", () => {
    expect(valuesFor("google")).toEqual(["busy", "free"]);
  });

  it("adds tentative for providers that report it", () => {
    expect(valuesFor("outlook")).toEqual(["busy", "free", "tentative"]);
    expect(valuesFor("ics")).toEqual(["busy", "free", "tentative"]);
  });
});
