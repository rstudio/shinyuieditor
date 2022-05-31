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
          rowSizes: ["1fr", "1fr"],
          gapSize: "10px",
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
          colSizes: ["1fr", "1fr"],
          gapSize: "10px",
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
          rowSizes: ["1fr", "1fr"],
          colSizes: ["1fr", "1fr", "1fr"],
          gapSize: "10px",
        },
        { index: 2, dir: "cols" }
      )
    ).toStrictEqual({
      areas: [
        ["a", "c"],
        ["b", "c"],
      ],
      rowSizes: ["1fr", "1fr"],
      colSizes: ["1fr", "1fr"],
      gapSize: "10px",
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
          rowSizes: ["1fr", "1fr", "1fr"],
          colSizes: ["1fr", "1fr", "1fr"],
          gapSize: "10px",
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
          colSizes: ["1fr", "1fr", "1fr"],
          rowSizes: ["1fr", "1fr"],
          gapSize: "10px",
        },
        { index: 3, dir: "cols" },
        true
      )
    ).not.toThrowError(
      `Can't remove col 3 as items c are entirely contained within it.`
    );
  });
});
