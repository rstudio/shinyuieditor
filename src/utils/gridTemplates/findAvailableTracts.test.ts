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
  const itemALocation = { rowStart: 2, rowSpan: 1, colStart: 3, colSpan: 2 };

  test("expand right", () => {
    expect(
      findAvailableTracts({
        dragDirection: "right",
        gridLocation: itemALocation,
        layoutAreas,
      })
    ).toStrictEqual({ shrinkExtent: 3, growExtent: 5 });
  });

  test("Expand left", () => {
    expect(
      findAvailableTracts({
        dragDirection: "left",
        gridLocation: itemALocation,
        layoutAreas,
      })
    ).toStrictEqual({ shrinkExtent: 4, growExtent: 1 });
  });

  test("Expand up", () => {
    expect(
      findAvailableTracts({
        dragDirection: "up",
        gridLocation: itemALocation,
        layoutAreas,
      })
    ).toStrictEqual({ shrinkExtent: 2, growExtent: 1 });
  });

  test("Expand down", () => {
    expect(
      findAvailableTracts({
        dragDirection: "down",
        gridLocation: itemALocation,
        layoutAreas,
      })
    ).toStrictEqual({ shrinkExtent: 2, growExtent: 4 });
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
        dragDirection: "up",
        gridLocation: itemALocation,
        layoutAreas,
      })
    ).toStrictEqual({ shrinkExtent: 2, growExtent: 1 });
  });

  test("Expand left no room", () => {
    expect(
      findAvailableTracts({
        dragDirection: "left",
        gridLocation: itemALocation,
        layoutAreas,
      })
    ).toStrictEqual({ shrinkExtent: 2, growExtent: 1 });
  });

  test("Expand right no item in item bounds", () => {
    expect(
      findAvailableTracts({
        dragDirection: "right",
        gridLocation: itemALocation,
        layoutAreas,
      })
    ).toStrictEqual({ shrinkExtent: 1, growExtent: 3 });
  });
  test("Expand down into item", () => {
    expect(
      findAvailableTracts({
        dragDirection: "down",
        gridLocation: itemALocation,
        layoutAreas,
      })
    ).toStrictEqual({ shrinkExtent: 2, growExtent: 3 });
  });

  test("Expand left with no room", () => {
    const layoutAreas = [
      ["a", ".", "b", "other"],
      ["c", "d", "d", "other"],
    ];
    //  1    2    3     4

    expect(
      findAvailableTracts({
        dragDirection: "left",
        gridLocation: { rowStart: 2, rowSpan: 1, colStart: 2, colSpan: 2 }, // = "d"
        layoutAreas,
      })
    ).toStrictEqual({ shrinkExtent: 3, growExtent: 2 });
  });
});
