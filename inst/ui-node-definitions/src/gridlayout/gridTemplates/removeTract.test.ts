import { removeTract } from "./removeTract";

describe("Remove empty tracts", () => {
  test("Remove column without fully contained items", () => {
    expect(
      removeTract(
        {
          areas: [
            ["a", "a", "c"],
            ["b", "b", "c"],
          ],
          col_sizes: ["1fr", "2fr", "3fr"],
          row_sizes: ["1fr", "1fr"],
          gap_size: "10px",
        },
        { index: 2, dir: "cols" }
      )
    ).toStrictEqual(
      expect.objectContaining({
        areas: [
          ["a", "c"],
          ["b", "c"],
        ],
        col_sizes: ["1fr", "3fr"],
      })
    );
  });
  test("Remove row without fully contained items", () => {
    expect(
      removeTract(
        {
          areas: [
            ["a", "a"],
            ["b", "b"],
            ["b", "b"],
          ],
          row_sizes: ["1fr", "2fr", "3fr"],
          col_sizes: ["1fr", "1fr"],
          gap_size: "10px",
        },
        { index: 3, dir: "rows" }
      )
    ).toStrictEqual(
      expect.objectContaining({
        areas: [
          ["a", "a"],
          ["b", "b"],
        ],
        row_sizes: ["1fr", "2fr"],
      })
    );
  });
});

describe("Leaves alone repeated tract sizes", () => {
  test("Remove column without fully contained items", () => {
    expect(
      removeTract(
        {
          areas: [
            ["a", "a", "c"],
            ["b", "b", "c"],
          ],
          row_sizes: ["1fr", "1fr"],
          col_sizes: ["1fr", "1fr", "1fr"],
          gap_size: "10px",
        },
        { index: 2, dir: "cols" }
      )
    ).toStrictEqual({
      areas: [
        ["a", "c"],
        ["b", "c"],
      ],
      row_sizes: ["1fr", "1fr"],
      col_sizes: ["1fr", "1fr"],
      gap_size: "10px",
    });
  });
});

describe("Wont remove a tract that will delete items unless explicitely told to", () => {
  test("Errors when there is an item in the tract", () => {
    expect(() =>
      removeTract(
        {
          areas: [
            ["a", "a", "c"],
            ["b", "b", "c"],
          ],
          row_sizes: ["1fr", "1fr", "1fr"],
          col_sizes: ["1fr", "1fr", "1fr"],
          gap_size: "10px",
        },
        { index: 3, dir: "cols" }
      )
    ).toThrowError(
      `Can't remove col 3 as items c are entirely contained within it.`
    );
  });

  test("Proceeds with removal is force is set to true", () => {
    expect(() =>
      removeTract(
        {
          areas: [
            ["a", "a", "c"],
            ["b", "b", "c"],
          ],
          col_sizes: ["1fr", "1fr", "1fr"],
          row_sizes: ["1fr", "1fr"],
          gap_size: "10px",
        },
        { index: 3, dir: "cols" },
        true
      )
    ).not.toThrowError(
      `Can't remove col 3 as items c are entirely contained within it.`
    );
  });
});
