import { parseCSSMeasure } from "components/Inputs/CSSUnitInput/css-helpers";

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
