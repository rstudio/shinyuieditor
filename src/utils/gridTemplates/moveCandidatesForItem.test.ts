import moveCandidatesForItem from "./moveCandidatesForItem";

test("2x1 block", () => {
  const layoutAreas = [
    [".", ".", "."], //  1
    ["a", "a", "."], //  2
    [".", ".", "."], //  3
    ["b", ".", "."], //  4
  ];
  //  1    2    3    4    5

  expect(
    moveCandidatesForItem({ rowSpan: 1, colSpan: 2, layoutAreas })
  ).toStrictEqual([
    { rowStart: 1, rowSpan: 1, colStart: 1, colSpan: 2 },
    { rowStart: 1, rowSpan: 1, colStart: 2, colSpan: 2 },
    { rowStart: 3, rowSpan: 1, colStart: 1, colSpan: 2 },
    { rowStart: 3, rowSpan: 1, colStart: 2, colSpan: 2 },
    { rowStart: 4, rowSpan: 1, colStart: 2, colSpan: 2 },
  ]);
});
test("2x1 block", () => {
  const layoutAreas = [
    [".", "."], //  1
    [".", "a"], //  2
    [".", "."], //  3
    ["b", "."], //  4
  ];
  //  1    2    3    4    5

  expect(
    moveCandidatesForItem({ rowSpan: 1, colSpan: 1, layoutAreas })
  ).toStrictEqual([
    { rowStart: 1, colStart: 1, rowSpan: 1, colSpan: 1 },
    { rowStart: 1, colStart: 2, rowSpan: 1, colSpan: 1 },
    { rowStart: 2, colStart: 1, rowSpan: 1, colSpan: 1 },
    { rowStart: 3, colStart: 1, rowSpan: 1, colSpan: 1 },
    { rowStart: 3, colStart: 2, rowSpan: 1, colSpan: 1 },
    { rowStart: 4, colStart: 2, rowSpan: 1, colSpan: 1 },
  ]);
});
