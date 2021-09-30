import { intervalsOverlap } from "./overlap-helpers";

test("Standard partial overlap", () => {
  // B is hanging off end of A
  expect(intervalsOverlap([0, 2], [1, 3])).toStrictEqual({
    type: "end",
    amount: 1,
  });

  // B is hanging off start of A
  expect(intervalsOverlap([1, 3], [0, 2])).toStrictEqual({
    type: "start",
    amount: 1,
  });
});

test("Intervals fully contain eachother", () => {
  // A contains B
  expect(intervalsOverlap([0, 3], [1, 2]).type).toStrictEqual("full");

  // B fully contains A
  expect(intervalsOverlap([1, 2], [0, 3]).type).toStrictEqual("full");
});

test("Intervals are identical", () => {
  expect(intervalsOverlap([0, 1], [0, 1]).type).toStrictEqual("full");
});

test("Just touching at boundaries is a zero-length but existing overlap", () => {
  expect(intervalsOverlap([0, 1], [1, 2])).toStrictEqual({
    type: "end",
    amount: 0,
  });

  expect(intervalsOverlap([1, 2], [0, 1])).toStrictEqual({
    type: "start",
    amount: 0,
  });
});

test("Intervals that are simply points work as well", () => {
  // On the edge...
  expect(intervalsOverlap([0, 1], [1, 1]).type).toStrictEqual("full");
  expect(intervalsOverlap([1, 1], [0, 1]).type).toStrictEqual("full");

  // Within
  expect(intervalsOverlap([1, 1], [0, 2]).type).toStrictEqual("full");
  expect(intervalsOverlap([0, 2], [1, 1]).type).toStrictEqual("full");

  // Outside
  expect(intervalsOverlap([3, 3], [0, 2]).type).toStrictEqual("none");
  expect(intervalsOverlap([0, 2], [-1, -1]).type).toStrictEqual("none");
});
