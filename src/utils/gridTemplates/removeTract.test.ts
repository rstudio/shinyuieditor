import removeTract from "./removeTract";

describe("Remove empty tracts", () => {
  test("Remove column without fully contained items", () => {
    expect(
      removeTract(
        {
          areas: [
            ["a", "a", "c"],
            ["b", "b", "c"],
          ],
          colSizes: ["1fr", "2fr", "3fr"],
        },
        { index: 2, dir: "cols" }
      )
    ).toStrictEqual({
      areas: [
        ["a", "c"],
        ["b", "c"],
      ],
      colSizes: ["1fr", "3fr"],
    });
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
          rowSizes: ["1fr", "2fr", "3fr"],
        },
        { index: 3, dir: "rows" }
      )
    ).toStrictEqual({
      areas: [
        ["a", "a"],
        ["b", "b"],
      ],
      rowSizes: ["1fr", "2fr"],
    });
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
          colSizes: "1fr",
        },
        { index: 2, dir: "cols" }
      )
    ).toStrictEqual({
      areas: [
        ["a", "c"],
        ["b", "c"],
      ],
      colSizes: "1fr",
    });
  });
});
