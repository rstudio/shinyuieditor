import { sameObject } from "./equalityCheckers";

describe("Same object comparison with key omission", () => {
  test("Works with identical objects", () => {
    expect(sameObject({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
  });

  test("Same keys, Different values", () => {
    expect(sameObject({ a: 1, b: 3 }, { a: 1, b: 2 })).toBe(false);
  });

  test("Different keys, same values", () => {
    expect(sameObject({ a: 1, b: 2 }, { a: 1, c: 2 })).toBe(false);
  });

  test("Different number of keys", () => {
    expect(sameObject({ a: 1, b: 2, c: 3 }, { a: 1, b: 2 })).toBe(false);
  });

  test("Different number of keys but with omission", () => {
    expect(sameObject({ a: 1, b: 2, c: 3 }, { a: 1, b: 2 }, "c")).toBe(true);
    expect(sameObject({ a: 1, b: 2, c: 3 }, { a: 1, b: 2 }, ["c"])).toBe(true);
  });
  test("Both have same ommitted key but different value", () => {
    expect(sameObject({ a: 1, b: 2, c: 3 }, { a: 1, b: 2, c: 4 }, "c")).toBe(
      true
    );
  });
  test("Multuple ommitted keys", () => {
    expect(
      sameObject({ a: 1, b: 2, c: 3 }, { a: 1, b: 2, c: 4 }, ["a", "c"])
    ).toBe(true);
  });

  test("Empty objects", () => {
    expect(sameObject({}, {})).toBe(true);
  });
});
