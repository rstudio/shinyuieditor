import { addAtIndex, arrayRange, buildRange, moveElement } from "./arrays";

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

describe("Insert items into an array", () => {
  test("Index is within array bounds", () => {
    expect(addAtIndex(["a", "b", "c"], 0, "z")).toEqual(["z", "a", "b", "c"]);
    expect(addAtIndex(["a", "b", "c"], 1, "z")).toEqual(["a", "z", "b", "c"]);
    expect(addAtIndex(["a", "b", "c"], 2, "z")).toEqual(["a", "b", "z", "c"]);
    expect(addAtIndex(["a", "b", "c"], 3, "z")).toEqual(["a", "b", "c", "z"]);
  });
  test("Extends array if index of addition is outside of bounds", () => {
    // eslint-disable-next-line no-sparse-arrays
    expect(addAtIndex(["a", "b", "c"], 4, "z")).toEqual(["a", "b", "c", , "z"]);
    // eslint-disable-next-line no-sparse-arrays
    expect(addAtIndex(["a", "b", "c"], 5, "z")).toEqual([
      "a",
      "b",
      "c",
      ,
      ,
      "z",
    ]);
  });

  test("Can't add an item _before_ the array", () => {
    expect(() => {
      addAtIndex(["a", "b", "c"], -1, "z");
    }).toThrowError("Can't add item at a negative index");
  });
});

describe("Moving element within an element", () => {
  const startArray = ["a", "b", "c", "z", "d"];
  test("Can move an element infront its current place", () => {
    expect(moveElement(startArray, 3, 5)).toEqual(["a", "b", "c", "d", "z"]);
  });
  test("Can move an element before its current place", () => {
    expect(moveElement(startArray, 3, 1)).toEqual(["a", "z", "b", "c", "d"]);
  });
  test("Can move an element to start of array", () => {
    expect(moveElement(startArray, 3, 0)).toEqual(["z", "a", "b", "c", "d"]);
  });
  test("Element can be moved next to itself (essentially a no-op)", () => {
    expect(moveElement(startArray, 3, 3)).toEqual(startArray);
    expect(moveElement(startArray, 3, 4)).toEqual(startArray);
  });
});
