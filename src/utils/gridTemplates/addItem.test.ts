import addItem from "./addItem";

describe("Add items", () => {
  const baseLayout = {
    areas: [
      ["a", "b", "c"],
      ["a", ".", "."],
      ["d", "e", "f"],
    ],
  };
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
