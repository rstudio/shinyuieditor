import { findItemLocations, findEmptyCells } from "./findItemLocation";
import type { TemplatedGridProps } from "./TemplatedGridProps";

describe("Finds single item locations", () => {
  const areas: TemplatedGridProps["areas"] = [
    [".", "a", "b"],
    ["c", "c", "."],
    ["d", "e", "."],
  ];

  test("Empty cells", () => {
    expect(findEmptyCells(areas)).toStrictEqual([
      { row: 1, col: 1 },
      { row: 2, col: 3 },
      { row: 3, col: 3 },
    ]);
  });
  test("Single cell item", () => {
    expect(findItemLocations(areas, "a")).toStrictEqual([{ row: 1, col: 2 }]);
  });
  test("non-existant items", () => {
    expect(findItemLocations(areas, "doesntexist")).toStrictEqual([]);
  });
});
