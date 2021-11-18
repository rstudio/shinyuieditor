import { availableCellsForItem } from "./availableCellsForItem";
import { areasToItemLocations } from "./itemLocations";

describe("Free to expand till end of grid", () => {
  const layoutAreas = [
    [".", ".", ".", ".", "."], //  1
    [".", ".", "a", "a", "."], //  2
    [".", ".", ".", ".", "."], //  3
    [".", ".", ".", ".", "."], //  4
  ];
  //  1    2    3    4    5
  const itemALocation = areasToItemLocations(layoutAreas).get("a");

  if (!itemALocation) throw new Error("Finding locations of items failed");
  test("expand right", () => {
    expect(
      availableCellsForItem({
        side: "expand right",
        gridLocation: itemALocation,
        layoutAreas,
      })
    ).toStrictEqual({
      searchDir: "cols",
      colBounds: [5, 5],
      rowBounds: [2, 2],
    });
  });

  test("Expand left", () => {
    expect(
      availableCellsForItem({
        side: "expand left",
        gridLocation: itemALocation,
        layoutAreas,
      })
    ).toStrictEqual({
      searchDir: "cols",
      colBounds: [2, 1],
      rowBounds: [2, 2],
    });
  });

  test("Expand up", () => {
    expect(
      availableCellsForItem({
        side: "expand up",
        gridLocation: itemALocation,
        layoutAreas,
      })
    ).toStrictEqual({
      searchDir: "rows",
      colBounds: [3, 4],
      rowBounds: [1, 1],
    });
  });
  test("Expand down", () => {
    expect(
      availableCellsForItem({
        side: "expand down",
        gridLocation: itemALocation,
        layoutAreas,
      })
    ).toStrictEqual({
      searchDir: "rows",
      colBounds: [3, 4],
      rowBounds: [3, 4],
    });
  });
});

describe("Dealing with other items", () => {
  const layoutAreas = [
    [".", ".", "."], //  1
    ["a", "a", "."], //  2
    [".", ".", "c"], //  3
    ["b", ".", "c"], //  4
  ];
  //  1    2    3
  const itemALocation = areasToItemLocations(layoutAreas).get("a");

  if (!itemALocation) throw new Error("Finding locations of items failed");

  test("Expand up to end of grid", () => {
    expect(
      availableCellsForItem({
        side: "expand up",
        gridLocation: itemALocation,
        layoutAreas,
      })
    ).toStrictEqual({
      searchDir: "rows",
      colBounds: [1, 2],
      rowBounds: [1, 1],
    });
  });

  test("Expand left no room", () => {
    expect(
      availableCellsForItem({
        side: "expand left",
        gridLocation: itemALocation,
        layoutAreas,
      })
    ).toStrictEqual({
      searchDir: "cols",
      colBounds: null,
      rowBounds: [2, 2],
    });
  });

  test("Expand right no item in item bounds", () => {
    expect(
      availableCellsForItem({
        side: "expand right",
        gridLocation: itemALocation,
        layoutAreas,
      })
    ).toStrictEqual({
      searchDir: "cols",
      colBounds: [3, 3],
      rowBounds: [2, 2],
    });
  });
  test("Expand down into item", () => {
    expect(
      availableCellsForItem({
        side: "expand down",
        gridLocation: itemALocation,
        layoutAreas,
      })
    ).toStrictEqual({
      searchDir: "rows",
      colBounds: [1, 2],
      rowBounds: [3, 3],
    });
  });
});
