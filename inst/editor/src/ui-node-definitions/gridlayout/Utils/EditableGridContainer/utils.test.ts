import { getAreaMatrixFromStyleDeclaration } from "./utils";

describe("Get layout areas from style string", () => {
  test("Handles non-filled area cells", () => {
    const areaString = `"a b f" ". . f" "g g f" "c d f" "e d f"`;

    expect(getAreaMatrixFromStyleDeclaration(areaString)).toEqual([
      ["a", "b", "f"],
      [".", ".", "f"],
      ["g", "g", "f"],
      ["c", "d", "f"],
      ["e", "d", "f"],
    ]);
  });
});
