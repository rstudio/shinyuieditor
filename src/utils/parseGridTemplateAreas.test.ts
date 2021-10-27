import parseGridTemplateAreas from "./parseGridTemplateAreas";

describe("Properly parse grid areas template from string vector", () => {
  test("Simple 2x2 grid", () => {
    expect(
      parseGridTemplateAreas({
        areas: [
          ["a", "b"],
          ["c", "d"],
        ],
      })
    ).toStrictEqual({
      numRows: 2,
      numCols: 2,
      styles: {
        gridTemplateAreas: `"a b"\n"c d"`,
        gridTemplateRows: "1fr 1fr",
        gridTemplateColumns: "1fr 1fr",
      },
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
    ).toStrictEqual({
      numRows: 2,
      numCols: 3,
      styles: {
        gridTemplateAreas: `"a b c"\n"d e f"`,
        gridTemplateRows: "1fr 1fr",
        gridTemplateColumns: "1fr 1fr 1fr",
      },
      uniqueAreas: ["a", "b", "c", "d", "e", "f"],
    });
  });

  test("Single row", () => {
    expect(parseGridTemplateAreas({ areas: [["a", "b", "c"]] })).toStrictEqual({
      numRows: 1,
      numCols: 3,
      styles: {
        gridTemplateAreas: `"a b c"`,
        gridTemplateRows: "1fr",
        gridTemplateColumns: "1fr 1fr 1fr",
      },
      uniqueAreas: ["a", "b", "c"],
    });
  });
  test("Single column", () => {
    expect(
      parseGridTemplateAreas({ areas: [["a"], ["b"], ["c"]] })
    ).toStrictEqual({
      numRows: 3,
      numCols: 1,
      styles: {
        gridTemplateAreas: `"a"\n"b"\n"c"`,
        gridTemplateRows: "1fr 1fr 1fr",
        gridTemplateColumns: "1fr",
      },
      uniqueAreas: ["a", "b", "c"],
    });
  });
});

describe("Validate format of template", () => {
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

describe("Tract sizing handles things properly", () => {
  test("If a single value is provided for a size it is repeated for all tracts", () => {
    const res = parseGridTemplateAreas({
      areas: [
        ["a", "b", "c"],
        ["d", "e", "f"],
      ],
      rowSizes: "100px",
      colSizes: "200px",
    });
    expect(res.styles.gridTemplateRows).toEqual("100px 100px");
    expect(res.styles.gridTemplateColumns).toEqual("200px 200px 200px");
  });
  test("If a vector is passed it is used accordingly", () => {
    const res = parseGridTemplateAreas({
      areas: [
        ["a", "b", "c"],
        ["d", "e", "f"],
      ],
      rowSizes: ["150px", "2rem"],
    });
    expect(res.styles.gridTemplateRows).toEqual("150px 2rem");
  });
  test("Mismatches in dimension of areas and sizes are caught", () => {
    expect(() =>
      parseGridTemplateAreas({
        areas: [
          ["a", "b", "c"],
          ["d", "e", "f"],
        ],
        rowSizes: ["150px", "2rem", "3rem"],
      })
    ).toThrowError();
  });
});
