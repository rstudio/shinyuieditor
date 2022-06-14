import addTract from "./addTract";
import { fillInPartialTemplate } from "./utils";

describe("Add empty tracts", () => {
  const baseLayout = fillInPartialTemplate({
    areas: [
      ["a", "b", "c"],
      ["d", "e", "f"],
    ],
  });
  test("Add a new row after first", () => {
    const sizeOfNewRow = "9px";
    const layoutWithNewRow = addTract(baseLayout, {
      afterIndex: 1,
      size: sizeOfNewRow,
      dir: "rows",
    });

    expect(layoutWithNewRow.areas).toStrictEqual([
      ["a", "b", "c"],
      [".", ".", "."],
      ["d", "e", "f"],
    ]);

    expect(layoutWithNewRow.rowSizes).toStrictEqual([
      "1fr",
      sizeOfNewRow,
      "1fr",
    ]);
  });
  test("Add a new column after first", () => {
    const sizeOfNewCol = "9px";
    const layoutWithNewCol = addTract(baseLayout, {
      afterIndex: 1,
      size: sizeOfNewCol,
      dir: "cols",
    });

    expect(layoutWithNewCol.areas).toStrictEqual([
      ["a", ".", "b", "c"],
      ["d", ".", "e", "f"],
    ]);

    expect(layoutWithNewCol.colSizes).toStrictEqual([
      "1fr",
      sizeOfNewCol,
      "1fr",
      "1fr",
    ]);
  });
});

describe("Add tracts between items", () => {
  const sizeOfNewTract = "9px";
  test("Split item on row", () => {
    expect(
      addTract(
        fillInPartialTemplate({
          areas: [
            ["a", "b", "c"],
            ["a", "b", "d"],
          ],
        }),
        {
          afterIndex: 1,
          size: sizeOfNewTract,
          dir: "rows",
        }
      ).areas
    ).toStrictEqual([
      ["a", "b", "c"],
      ["a", "b", "."],
      ["a", "b", "d"],
    ]);
  });

  test("Split item on col", () => {
    expect(
      addTract(
        fillInPartialTemplate({
          areas: [
            ["a", "b", "b"],
            ["a", "c", "d"],
          ],
        }),
        {
          afterIndex: 2,
          size: sizeOfNewTract,
          dir: "cols",
        }
      ).areas
    ).toStrictEqual([
      ["a", "b", "b", "b"],
      ["a", "c", ".", "d"],
    ]);
  });
});

describe("Add at extremes", () => {
  test("Add new row at start of grid", () => {
    expect(
      addTract(
        fillInPartialTemplate({
          areas: [
            ["a", "b", "c"],
            ["a", "b", "d"],
          ],
        }),
        {
          afterIndex: 0,
          size: "1fr",
          dir: "rows",
        }
      ).areas
    ).toStrictEqual([
      [".", ".", "."],
      ["a", "b", "c"],
      ["a", "b", "d"],
    ]);
  });
  test("Add new row at end of grid", () => {
    expect(
      addTract(
        fillInPartialTemplate({
          areas: [
            ["a", "b", "c"],
            ["a", "b", "d"],
          ],
        }),
        {
          afterIndex: 2,
          size: "1fr",
          dir: "rows",
        }
      ).areas
    ).toStrictEqual([
      ["a", "b", "c"],
      ["a", "b", "d"],
      [".", ".", "."],
    ]);
  });

  test("Add new col at start of grid", () => {
    expect(
      addTract(
        fillInPartialTemplate({
          areas: [
            ["a", "b", "b"],
            ["a", "c", "d"],
          ],
        }),
        {
          afterIndex: 0,
          size: "1fr",
          dir: "cols",
        }
      ).areas
    ).toStrictEqual([
      [".", "a", "b", "b"],
      [".", "a", "c", "d"],
    ]);
  });
  test("Add new col at end of grid", () => {
    expect(
      addTract(
        fillInPartialTemplate({
          areas: [
            ["a", "b", "b"],
            ["a", "c", "d"],
          ],
        }),
        {
          afterIndex: 3,
          size: "1fr",
          dir: "cols",
        }
      ).areas
    ).toStrictEqual([
      ["a", "b", "b", "."],
      ["a", "c", "d", "."],
    ]);
  });
});
describe("Add tracts between items", () => {
  const sizeOfNewTract = "9px";
  test("Split item on row", () => {
    expect(
      addTract(
        fillInPartialTemplate({
          areas: [
            ["a", "b", "c"],
            ["a", "b", "d"],
          ],
        }),
        {
          afterIndex: 1,
          size: sizeOfNewTract,
          dir: "rows",
        }
      ).areas
    ).toStrictEqual([
      ["a", "b", "c"],
      ["a", "b", "."],
      ["a", "b", "d"],
    ]);
  });

  test("Split item on col", () => {
    expect(
      addTract(
        fillInPartialTemplate({
          areas: [
            ["a", "b", "b"],
            ["a", "c", "d"],
          ],
        }),
        {
          afterIndex: 2,
          size: sizeOfNewTract,
          dir: "cols",
        }
      ).areas
    ).toStrictEqual([
      ["a", "b", "b", "b"],
      ["a", "c", ".", "d"],
    ]);
  });
});

describe("Invalid track indices", () => {
  const baseLayout = fillInPartialTemplate({
    areas: [
      ["a", "b", "c"],
      ["a", "b", "d"],
    ],
  });
  test("Beyond end of rows", () => {
    expect(() =>
      addTract(baseLayout, {
        afterIndex: 5,
        size: "1fr",
        dir: "rows",
      })
    ).toThrowError(`Can't add a tract after index 5. Not enought tracts.`);
  });
  test("Before start of rows", () => {
    expect(() =>
      addTract(baseLayout, {
        afterIndex: -1,
        size: "1fr",
        dir: "rows",
      })
    ).toThrowError(`Cant add a tract at a negative index`);
  });
  test("Beyond end of cols", () => {
    expect(() =>
      addTract(baseLayout, {
        afterIndex: 6,
        size: "1fr",
        dir: "cols",
      })
    ).toThrowError(`Can't add a tract after index 6. Not enought tracts.`);
  });
});
