import removeItem from "./removeItem";

describe("Remove items", () => {
  const baseLayout = {
    areas: [
      ["a", "b", "b"],
      ["a", "c", "d"],
      ["e", "e", "f"],
    ],
  };
  test("Remove a", () => {
    expect(removeItem(baseLayout, "a").areas).toStrictEqual([
      [".", "b", "b"],
      [".", "c", "d"],
      ["e", "e", "f"],
    ]);
  });
  test("Remove b", () => {
    expect(removeItem(baseLayout, "b").areas).toStrictEqual([
      ["a", ".", "."],
      ["a", "c", "d"],
      ["e", "e", "f"],
    ]);
  });

  test("Remove non-existant item", () => {
    expect(removeItem(baseLayout, "doesntExist").areas).toStrictEqual(
      baseLayout.areas
    );
  });
});
