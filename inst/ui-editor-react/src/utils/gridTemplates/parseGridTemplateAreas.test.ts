import parseGridTemplateAreas, {
  buildTractSizes,
} from "./parseGridTemplateAreas";

describe("Build and validate tract size definitions", () => {
  // test("If a single value is provided for a size it is repeated for all tracts", () => {
  //   expect(
  //     parseGridTemplateAreas({
  //       areas: [
  //         ["a", "b", "c"],
  //         ["d", "e", "f"],
  //       ],
  //       colSizes: "100px",
  //     }).styles.gridTemplateColumns
  //   ).toEqual("100px 100px 100px");
  // });

  // test("If a vector is passed it is used accordingly", () => {
  //   expect(
  //     parseGridTemplateAreas({
  //       areas: [
  //         ["a", "b", "c"],
  //         ["d", "e", "f"],
  //       ],
  //       rowSizes: ["150px", "2rem"],
  //     }).styles.gridTemplateRows
  //   ).toEqual("150px 2rem");
  // });

  test("Mismatches in dimension of areas and sizes are caught", () => {
    expect(() => buildTractSizes(3, ["150px", "2rem"], "row")).toThrowError();
  });
});

describe("Make sure templates are parsed to right dimensions and contents", () => {
  test("Simple 2x2 grid", () => {
    expect(
      parseGridTemplateAreas({
        areas: [
          ["a", "b"],
          ["c", "d"],
        ],
      })
    ).toMatchObject({
      numRows: 2,
      numCols: 2,
      uniqueAreas: ["a", "b", "c", "d"],
    });
  });
  test("Simple 2x3 grid", () => {
    expect(
      parseGridTemplateAreas({
        areas: [
          ["a", "b", "c"],
          ["d", "e", "f"],
        ],
      })
    ).toMatchObject({
      numRows: 2,
      numCols: 3,
      uniqueAreas: ["a", "b", "c", "d", "e", "f"],
    });
  });

  test("Single row", () => {
    expect(parseGridTemplateAreas({ areas: [["a", "b", "c"]] })).toMatchObject({
      numRows: 1,
      numCols: 3,
      uniqueAreas: ["a", "b", "c"],
    });
  });
  test("Single column", () => {
    expect(
      parseGridTemplateAreas({ areas: [["a"], ["b"], ["c"]] })
    ).toMatchObject({
      numRows: 3,
      numCols: 1,
      uniqueAreas: ["a", "b", "c"],
    });
  });

  test("Need to have consistant number of columns across rows", () => {
    expect(() =>
      parseGridTemplateAreas({
        areas: [
          ["a", "b"],
          ["c", "d", "e"],
        ],
      })
    ).toThrowError();
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
      uniqueAreas: ["a", "b", "c", "d"],
      sizes: {
        rows: ["200px", "300px"],
        cols: ["4rem", "4rem"],
      },
      styles: {
        padding: "11px",
        gap: "11px",
        gridTemplateAreas: `"a b"\n"c d"`,
        gridTemplateColumns: "4rem 4rem",
        gridTemplateRows: "200px 300px",
      },
    });
  });
});
