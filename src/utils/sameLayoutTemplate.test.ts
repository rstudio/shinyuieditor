import { CSSMeasure, GridItemDef, GridLayoutTemplate } from "GridTypes";
import { GridItemState } from "state-logic/gridItems";
import { sameLayoutTemplate } from "./sameLayoutTemplate";

const baseLayout: GridLayoutTemplate = {
  name: "test",
  rows: ["1fr", "2fr"],
  cols: ["1fr", "2fr"],
  gap: "2rem",
  items: [
    { name: "a", startRow: 1, endRow: 2, startCol: 1, endCol: 1 },
    { name: "b", startRow: 1, endRow: 2, startCol: 2, endCol: 2 },
  ] as GridItemDef[],
};

describe("Can do deep equality check on layout templates", () => {
  test("Works with exact same layout", () => {
    expect(sameLayoutTemplate(baseLayout, baseLayout)).toBe(true);
  });

  test("Works with a shallow copy of the same layout", () => {
    expect(sameLayoutTemplate({ ...baseLayout }, baseLayout)).toBe(true);
  });

  test("Works with a deep copy of the layout", () => {
    expect(
      sameLayoutTemplate(
        {
          name: "test",
          rows: ["1fr", "2fr"],
          cols: ["1fr", "2fr"],
          gap: "2rem",
          items: [
            { name: "a", startRow: 1, endRow: 2, startCol: 1, endCol: 1 },
            { name: "b", startRow: 1, endRow: 2, startCol: 2, endCol: 2 },
          ] as GridItemDef[],
        },
        baseLayout
      )
    ).toBe(true);
  });

  test("Works with a deep copy in different order", () => {
    expect(
      sameLayoutTemplate(
        {
          rows: ["1fr", "2fr"],
          name: "test",
          gap: "2rem",
          cols: ["1fr", "2fr"],
          items: [
            { name: "b", startRow: 1, endRow: 2, startCol: 2, endCol: 2 },
            { name: "a", startRow: 1, endRow: 2, startCol: 1, endCol: 1 },
          ] as GridItemDef[],
        },
        baseLayout
      )
    ).toBe(true);
  });

  test("Different rows/columns are caught", () => {
    const newRows = ["1fr", "2fr", "3fr"] as CSSMeasure[];
    const diffRows = { ...baseLayout, rows: newRows };

    expect(sameLayoutTemplate(diffRows, baseLayout)).toBe(false);
  });

  test("Item differences are caught", () => {
    // Changes the start row of item a
    const newItems = [
      { name: "a", startRow: 2, endRow: 2, startCol: 1, endCol: 1 },
      { name: "b", startRow: 1, endRow: 2, startCol: 2, endCol: 2 },
    ] as GridItemDef[];
    const diffItems = { ...baseLayout, items: newItems };

    expect(sameLayoutTemplate(diffItems, baseLayout)).toBe(false);
  });

  test("We ignore absolute position values when comparing items", () => {
    // Add an absolute bounds to item b, like it was being dragged
    const newItems = [
      { name: "a", startRow: 1, endRow: 2, startCol: 1, endCol: 1 },
      {
        name: "b",
        startRow: 1,
        endRow: 2,
        startCol: 2,
        endCol: 2,
        absoluteBounds: {
          left: 0,
          right: 100,
          top: 0,
          bottom: 100,
          offsetLeft: 50,
          offsetTop: 50,
        },
      },
    ] as GridItemState[];
    const itemsWAbsoluteBounds: GridLayoutTemplate = {
      ...baseLayout,
      items: newItems,
    };

    expect(sameLayoutTemplate(itemsWAbsoluteBounds, baseLayout)).toBe(true);
  });
});
