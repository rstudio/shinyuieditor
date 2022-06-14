import addItem from "./addItem";
import { fillInPartialTemplate } from "./utils";

describe("Add items", () => {
  const baseLayout = fillInPartialTemplate({
    areas: [
      ["a", "b", "c"],
      ["a", ".", "."],
      ["d", "e", "f"],
    ],
  });
  test("Make valid addition", () => {
    const layoutWithNewItem = addItem(baseLayout, {
      name: "new",
      rowStart: 2,
      rowSpan: 1,
      colStart: 2,
      colSpan: 2,
    });
    expect(layoutWithNewItem.areas).toStrictEqual([
      ["a", "b", "c"],
      ["a", "new", "new"],
      ["d", "e", "f"],
    ]);
  });
  test("Invalid addition", () => {
    expect(() =>
      addItem(baseLayout, {
        name: "newItem",
        rowStart: 2,
        rowSpan: 1,
        colStart: 1,
        colSpan: 3,
      })
    ).toThrowError(`Can't add newItem to layout, overlaps with item a.`);
  });
});

describe("Move items", () => {
  const baseLayout = fillInPartialTemplate({
    areas: [
      [".", ".", ".", "."],
      [".", "a", "a", "."],
      [".", ".", ".", "."],
    ],
  });
  test("Expand", () => {
    const layoutWithNewItem = addItem(baseLayout, {
      name: "a",
      rowStart: 2,
      rowSpan: 1,
      colStart: 2,
      colSpan: 3,
    });
    expect(layoutWithNewItem.areas).toStrictEqual([
      [".", ".", ".", "."],
      [".", "a", "a", "a"],
      [".", ".", ".", "."],
    ]);
  });
  test("Shrink", () => {
    const layoutWithNewItem = addItem(baseLayout, {
      name: "a",
      rowStart: 2,
      rowSpan: 1,
      colStart: 2,
      colSpan: 1,
    });
    expect(layoutWithNewItem.areas).toStrictEqual([
      [".", ".", ".", "."],
      [".", "a", ".", "."],
      [".", ".", ".", "."],
    ]);
  });

  test("Move", () => {
    const layoutWithNewItem = addItem(baseLayout, {
      name: "a",
      rowStart: 1,
      rowSpan: 1,
      colStart: 1,
      colSpan: 2,
    });
    expect(layoutWithNewItem.areas).toStrictEqual([
      ["a", "a", ".", "."],
      [".", ".", ".", "."],
      [".", ".", ".", "."],
    ]);
  });
});
