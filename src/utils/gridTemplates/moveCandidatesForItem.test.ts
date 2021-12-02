import moveCandidatesForItem, { blockIsFree } from "./moveCandidatesForItem";

describe("Add empty tracts", () => {
  test("Add a new row after first", () => {
    const layoutAreas = [
      [".", "."], //  1
      ["a", "a"], //  2
      [".", "."], //  3
      ["b", "."], //  4
    ];
    //  1    2    3    4    5

    expect(
      blockIsFree(
        { rowStart: 1, rowEnd: 1, colStart: 1, colEnd: 2 },
        layoutAreas
      )
    ).toBe(true);
    expect(
      blockIsFree(
        { rowStart: 2, rowEnd: 2, colStart: 1, colEnd: 2 },
        layoutAreas
      )
    ).toBe(false);
    expect(
      blockIsFree(
        { rowStart: 3, rowEnd: 3, colStart: 1, colEnd: 2 },
        layoutAreas
      )
    ).toBe(true);
    // expect(
    //   moveCandidatesForItem({
    //     layoutAreas,
    //     itemLocation: { rowStart: 2, rowSpan: 1, colStart: 1, colSpan: 2 },
    //   })
    // ).toStrictEqual([
    //   { rowStart: 1, rowSpan: 1, colStart: 1, colSpan: 2 },
    //   { rowStart: 3, rowSpan: 1, colStart: 1, colSpan: 2 },
    // ]);
  });
});
