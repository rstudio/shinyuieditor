import { makeColumnAlignedTable, parseGridLayoutArgs } from "./layoutParsing";

describe("Can parse meaningful info out of a layout argument", () => {
  const simpleLayout = parseGridLayoutArgs({
    layout: ["A B", "C   D"],
    row_sizes: ["100px", "200px"],
    col_sizes: ["1fr", "2fr"],
    gap_size: "12px",
  });

  test("Can get unique areas", () => {
    expect(simpleLayout.uniqueAreas).toEqual(["A", "B", "C", "D"]);
  });

  test("Let's tract sizes through when provided", () => {
    expect(simpleLayout.row_sizes).toStrictEqual(["100px", "200px"]);
    expect(simpleLayout.col_sizes).toStrictEqual(["1fr", "2fr"]);
  });

  test("Throw errors for mismatched tract sizes", () => {
    expect(() => {
      parseGridLayoutArgs({
        layout: ["A B", "C   D"],
        row_sizes: ["100px", "200px", "1fr"],
        col_sizes: ["1fr", "2fr"],
        gap_size: "12px",
      });
    }).toThrowError();
    expect(() => {
      parseGridLayoutArgs({
        layout: ["A B", "C   D"],
        row_sizes: ["100px", "200px"],
        col_sizes: ["1fr", "2fr", "3fr"],
        gap_size: "12px",
      });
    }).toThrowError();
  });

  test("Throw error for poorly formed layout table", () => {
    expect(() => {
      parseGridLayoutArgs({
        layout: ["A B", "C   D E"],
        row_sizes: ["1fr", "2fr"],
        col_sizes: ["1fr", "2fr"],
        gap_size: "10px",
      });
    }).toThrowError();
  });

  //   test("Generates tract sizes for us if not provided", () => {
  //     const noSizesLayout = parseGridLayoutArgs({
  //       layout: ["A B", "C  D", "E F"],
  //     });
  //     expect(noSizesLayout.col_sizes).toStrictEqual(["1fr", "1fr"]);
  //     expect(noSizesLayout.row_sizes).toStrictEqual(["1fr", "1fr", "1fr"]);
  //   });
});

describe("Can convert matrix style layout to column aligned array version", () => {
  test("Simple 2x2", () => {
    expect(
      makeColumnAlignedTable([
        ["A", "B"],
        ["Cee", "D"],
      ])
    ).toStrictEqual(["A   B", "Cee D"]);
  });
  test("Single row", () => {
    expect(makeColumnAlignedTable([["A", "B"]])).toStrictEqual(["A B"]);
  });
  test("Single col", () => {
    expect(makeColumnAlignedTable([["Aey"], ["B"]])).toStrictEqual([
      "Aey",
      "B  ",
    ]);
  });

  test("All single letters", () => {
    expect(
      makeColumnAlignedTable([
        ["A", "B"],
        ["C", "D"],
      ])
    ).toStrictEqual(["A B", "C D"]);
  });
});
