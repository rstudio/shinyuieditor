import parseGridTemplateAreas, {
  buildGridTemplateAreas,
  buildTractSizes,
} from "./parseGridTemplateAreas";

describe("Properly parse grid areas template from string vector", () => {
  test("Simple 2x2 grid", () => {
    expect(
      buildGridTemplateAreas([
        ["a", "b"],
        ["c", "d"],
      ])
    ).toStrictEqual({
      numRows: 2,
      numCols: 2,
      gridTemplateAreas: `"a b"\n"c d"`,
      uniqueAreas: new Set(["a", "b", "c", "d"]),
    });
  });
  test("Simple 2x3 grid", () => {
    expect(
      buildGridTemplateAreas([
        ["a", "b", "c"],
        ["d", "e", "f"],
      ])
    ).toStrictEqual({
      numRows: 2,
      numCols: 3,
      gridTemplateAreas: `"a b c"\n"d e f"`,
      uniqueAreas: new Set(["a", "b", "c", "d", "e", "f"]),
    });
  });

  test("Single row", () => {
    expect(buildGridTemplateAreas([["a", "b", "c"]])).toStrictEqual({
      numRows: 1,
      numCols: 3,
      gridTemplateAreas: `"a b c"`,
      uniqueAreas: new Set(["a", "b", "c"]),
    });
  });
  test("Single column", () => {
    expect(buildGridTemplateAreas([["a"], ["b"], ["c"]])).toStrictEqual({
      numRows: 3,
      numCols: 1,
      gridTemplateAreas: `"a"\n"b"\n"c"`,
      uniqueAreas: new Set(["a", "b", "c"]),
    });
  });

  test("Need to have consistant number of columns across rows", () => {
    expect(() =>
      buildGridTemplateAreas([
        ["a", "b"],
        ["c", "d", "e"],
      ])
    ).toThrowError();
  });
});

describe("Build and validate tract size definitions", () => {
  test("If a single value is provided for a size it is repeated for all tracts", () => {
    expect(buildTractSizes(3, "100px", "row")).toEqual("100px 100px 100px");
  });

  test("If a vector is passed it is used accordingly", () => {
    expect(buildTractSizes(2, ["150px", "2rem"], "row")).toEqual("150px 2rem");
  });

  test("Mismatches in dimension of areas and sizes are caught", () => {
    expect(() => buildTractSizes(3, ["150px", "2rem"], "row")).toThrowError();
  });
});

describe("Validate entire templated grid definition", () => {
  test("Simple two by two", () => {
    expect(
      parseGridTemplateAreas({
        areas: [
          ["a", "b"],
          ["c", "d"],
        ],
        rowSizes: ["200px", "300px"],
        colSizes: "4rem",
        gapSize: "11px",
      })
    ).toStrictEqual({
      numRows: 2,
      numCols: 2,
      uniqueAreas: new Set(["a", "b", "c", "d"]),
      styles: {
        gap: "11px",
        gridTemplateAreas: `"a b"\n"c d"`,
        gridTemplateColumns: "4rem 4rem",
        gridTemplateRows: "200px 300px",
      },
    });
  });
});
