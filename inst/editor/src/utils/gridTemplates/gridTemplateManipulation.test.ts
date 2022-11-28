import { areasToItemLocations } from "./itemLocations";

describe("Parse item info out of the areas matrix", () => {
  test("Valid areas parse properly", () => {
    const items = areasToItemLocations([
      ["a", "a", "c"],
      ["b", "b", "c"],
    ]);

    expect(items.get("a")).toStrictEqual({
      colStart: 1,
      colSpan: 2,
      rowStart: 1,
      rowSpan: 1,
      isValid: true,
    });
    expect(items.get("b")).toStrictEqual({
      colStart: 1,
      colSpan: 2,
      rowStart: 2,
      rowSpan: 1,
      isValid: true,
    });
    expect(items.get("c")).toStrictEqual({
      rowStart: 1,
      rowSpan: 2,
      colStart: 3,
      colSpan: 1,
      isValid: true,
    });
  });
  test("Invalid areas are noted", () => {
    const items = areasToItemLocations([
      ["a", "a", "bad"],
      ["bad", "b", "b"],
    ]);

    expect(items.get("a")).toStrictEqual({
      colStart: 1,
      colSpan: 2,
      rowStart: 1,
      rowSpan: 1,
      isValid: true,
    });
    expect(items.get("b")).toStrictEqual({
      colStart: 2,
      colSpan: 2,
      rowStart: 2,
      rowSpan: 1,
      isValid: true,
    });

    expect(items.get("bad")).toStrictEqual({
      colStart: 1,
      colSpan: 3,
      rowStart: 1,
      rowSpan: 2,
      isValid: false,
    });
  });
});
