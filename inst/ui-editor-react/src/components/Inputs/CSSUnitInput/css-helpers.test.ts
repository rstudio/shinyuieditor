import { isCSSMeasure, parseCSSMeasure } from "./CSSMeasure";

test("Initializes properly", () => {
  expect(parseCSSMeasure("2rem")).toStrictEqual({ count: 2, unit: "rem" });
  expect(parseCSSMeasure("1rem")).toStrictEqual({ count: 1, unit: "rem" });
  expect(parseCSSMeasure("1 rem")).toStrictEqual({ count: 1, unit: "rem" });
  expect(parseCSSMeasure("3fr")).toStrictEqual({ count: 3, unit: "fr" });
  expect(parseCSSMeasure("auto")).toStrictEqual({ count: null, unit: "auto" });
});

test("Catches improper values", () => {
  expect(() => parseCSSMeasure("1auto")).toThrow();
  expect(() => parseCSSMeasure("px")).toThrow();
  expect(() => parseCSSMeasure("-2fr")).toThrow();
});

test("Validates CSS Measures properly", () => {
  expect(isCSSMeasure("1auto")).toEqual(false);
  expect(isCSSMeasure("auto")).toEqual(true);
  expect(isCSSMeasure("29px")).toEqual(true);
  expect(isCSSMeasure("1rem")).toEqual(true);
  expect(isCSSMeasure("1.5fr")).toEqual(true);
  expect(isCSSMeasure("1.5 fr")).toEqual(true);
  expect(isCSSMeasure("14")).toEqual(false);
});
