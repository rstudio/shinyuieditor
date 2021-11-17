import { arrayRange, buildRange } from "./array-helpers";
import { insertRowOrCol } from "./matrix-helpers";

describe("Tells you if array forms consecutive sequence of numbers", () => {
  test("Valid sequence", () => {
    expect(arrayRange([1, 2, 3])).toStrictEqual({
      minVal: 1,
      maxVal: 3,
      span: 2,
      isSequence: true,
    });
    expect(arrayRange([3, 1, 2])).toStrictEqual({
      minVal: 1,
      maxVal: 3,
      span: 2,
      isSequence: true,
    });
  });

  test("Invalid sequence", () => {
    expect(arrayRange([1, 2, 4])).toStrictEqual({
      minVal: 1,
      maxVal: 4,
      span: 3,
      isSequence: false,
    });
    expect(arrayRange([2, 1, 4])).toStrictEqual({
      minVal: 1,
      maxVal: 4,
      span: 3,
      isSequence: false,
    });
  });

  test("Single length array", () => {
    expect(arrayRange([1])).toStrictEqual({
      minVal: 1,
      maxVal: 1,
      span: 0,
      isSequence: true,
    });
    expect(arrayRange([2])).toStrictEqual({
      minVal: 2,
      maxVal: 2,
      span: 0,
      isSequence: true,
    });
  });

  test("Negative values", () => {
    expect(arrayRange([-3, -2, -1])).toStrictEqual({
      minVal: -3,
      maxVal: -1,
      span: 2,
      isSequence: true,
    });
    expect(arrayRange([-4, -2, -1])).toStrictEqual({
      minVal: -4,
      maxVal: -1,
      span: 3,
      isSequence: false,
    });
  });
});

describe("Build a sequence of numbers from start to end", () => {
  test("Basic usage", () => {
    expect(buildRange(2, 5)).toStrictEqual([2, 3, 4, 5]);
  });

  test("Handle single length", () => {
    expect(buildRange(2, 2)).toStrictEqual([2]);
  });

  test("Count down", () => {
    expect(buildRange(6, 3)).toStrictEqual([6, 5, 4, 3]);
  });
});
