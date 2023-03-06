import { insertRowOrCol, removeRowOrCol } from "./matrix-helpers";

describe("Matrix updating", () => {
  test("Add a new row", () => {
    expect(
      insertRowOrCol(
        [
          ["a", "b"],
          ["c", "d"],
        ],
        {
          index: 1,
          arr: ["new", "new"],
          dir: "rows",
        }
      )
    ).toStrictEqual([
      ["a", "b"],
      ["new", "new"],
      ["c", "d"],
    ]);
  });

  test("Remove a row", () => {
    expect(
      removeRowOrCol(
        [
          ["a", "b"],
          ["x", "x"],
          ["c", "d"],
        ],
        {
          index: 1,
          dir: "rows",
        }
      )
    ).toStrictEqual([
      ["a", "b"],
      ["c", "d"],
    ]);
  });
  test("Remove a column", () => {
    expect(
      removeRowOrCol(
        [
          ["a", "x", "b"],
          ["c", "x", "d"],
        ],
        {
          index: 1,
          dir: "cols",
        }
      )
    ).toStrictEqual([
      ["a", "b"],
      ["c", "d"],
    ]);
  });
});
