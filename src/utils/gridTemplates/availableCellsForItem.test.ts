import { findAvailableTracts } from "./findAvailableTracts";
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
      findAvailableTracts({
        side: "expand right",
        gridLocation: itemALocation,
        layoutAreas,
      })
    ).toStrictEqual({
      searchDir: "cols",
      colBounds: [5, 5],
    });
  });

  test("Expand left", () => {
    expect(
      findAvailableTracts({
        side: "expand left",
        gridLocation: itemALocation,
        layoutAreas,
      })
    ).toStrictEqual({
      searchDir: "cols",
      colBounds: [2, 1],
    });
  });

  test("Expand up", () => {
    expect(
      findAvailableTracts({
        side: "expand up",
        gridLocation: itemALocation,
        layoutAreas,
      })
    ).toStrictEqual({
      searchDir: "rows",
      rowBounds: [1, 1],
    });
  });
  test("Expand down", () => {
    expect(
      findAvailableTracts({
        side: "expand down",
        gridLocation: itemALocation,
        layoutAreas,
      })
    ).toStrictEqual({
      searchDir: "rows",
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
      findAvailableTracts({
        side: "expand up",
        gridLocation: itemALocation,
        layoutAreas,
      })
    ).toStrictEqual({
      searchDir: "rows",
      rowBounds: [1, 1],
    });
  });

  test("Expand left no room", () => {
    expect(
      findAvailableTracts({
        side: "expand left",
        gridLocation: itemALocation,
        layoutAreas,
      })
    ).toStrictEqual({
      searchDir: "cols",
      colBounds: null,
    });
  });

  test("Expand right no item in item bounds", () => {
    expect(
      findAvailableTracts({
        side: "expand right",
        gridLocation: itemALocation,
        layoutAreas,
      })
    ).toStrictEqual({
      searchDir: "cols",
      colBounds: [3, 3],
    });
  });
  test("Expand down into item", () => {
    expect(
      findAvailableTracts({
        side: "expand down",
        gridLocation: itemALocation,
        layoutAreas,
      })
    ).toStrictEqual({
      searchDir: "rows",
      rowBounds: [3, 3],
    });
  });
});
