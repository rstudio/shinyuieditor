import parseGridTemplateAreas, {
  buildTractSizes,
} from "./parseGridTemplateAreas";
import { fillInPartialTemplate } from "./utils";

describe("Build and validate tract size definitions", () => {
  test("If a vector is passed it is used accordingly", () => {
    expect(
      parseGridTemplateAreas(
        fillInPartialTemplate({
          areas: [
            ["a", "b", "c"],
            ["d", "e", "f"],
          ],
          rowSizes: ["150px", "2rem"],
        })
      ).sizes
    ).toEqual(expect.objectContaining({ rows: ["150px", "2rem"] }));
  });

  test("Mismatches in dimension of areas and sizes are caught", () => {
    expect(() => buildTractSizes(3, ["150px", "2rem"], "row")).toThrowError();
  });
});

describe("Make sure templates are parsed to right dimensions and contents", () => {
  test("Simple 2x2 grid", () => {
    expect(
      parseGridTemplateAreas(
        fillInPartialTemplate({
          areas: [
            ["a", "b"],
            ["c", "d"],
          ],
        })
      )
    ).toMatchObject({
      numRows: 2,
      numCols: 2,
      uniqueAreas: ["a", "b", "c", "d"],
    });
  });
  test("Simple 2x3 grid", () => {
    expect(
      parseGridTemplateAreas(
        fillInPartialTemplate({
          areas: [
            ["a", "b", "c"],
            ["d", "e", "f"],
          ],
        })
      )
    ).toMatchObject({
      numRows: 2,
      numCols: 3,
      uniqueAreas: ["a", "b", "c", "d", "e", "f"],
    });
  });

  test("Single row", () => {
    expect(
      parseGridTemplateAreas(
        fillInPartialTemplate({ areas: [["a", "b", "c"]] })
      )
    ).toMatchObject({
      numRows: 1,
      numCols: 3,
      uniqueAreas: ["a", "b", "c"],
    });
  });
  test("Single column", () => {
    expect(
      parseGridTemplateAreas(
        fillInPartialTemplate({ areas: [["a"], ["b"], ["c"]] })
      )
    ).toMatchObject({
      numRows: 3,
      numCols: 1,
      uniqueAreas: ["a", "b", "c"],
    });
  });

  test("Need to have consistant number of columns across rows", () => {
    expect(() =>
      parseGridTemplateAreas(
        fillInPartialTemplate({
          areas: [
            ["a", "b"],
            ["c", "d", "e"],
          ],
        })
      )
    ).toThrowError();
  });
});

describe("Validate entire templated grid definition", () => {
  test("Simple two by two", () => {
    expect(
      parseGridTemplateAreas(
        fillInPartialTemplate({
          areas: [
            ["a", "b"],
            ["c", "d"],
          ],
          rowSizes: ["200px", "300px"],
          colSizes: ["4rem", "4rem"],
          gapSize: "11px",
        })
      )
    ).toStrictEqual({
      numRows: 2,
      numCols: 2,
      uniqueAreas: ["a", "b", "c", "d"],
      sizes: {
        rows: ["200px", "300px"],
        cols: ["4rem", "4rem"],
      },
    });
  });
});
