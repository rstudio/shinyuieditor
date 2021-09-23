import {
  defaultValueForCssUnit,
  parseCSSMeasure,
  updateCssUnit,
} from "./css-helpers";

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

test("Can update units easily", () => {
  expect(updateCssUnit("1rem", { count: 2 })).toStrictEqual("2rem");
  expect(updateCssUnit("1rem", { count: 20 })).toStrictEqual("20rem");
  expect(updateCssUnit("1rem", { unit: "fr" })).toStrictEqual("1fr");
  expect(updateCssUnit("1rem", { count: 3, unit: "fr" })).toStrictEqual("3fr");
  expect(updateCssUnit("1rem", { unit: "auto" })).toStrictEqual("auto");

  expect(() => updateCssUnit("1fr", { count: -2 })).toThrow();
  expect(() => updateCssUnit("auto", { count: 1 })).toThrow();
});

test("Moving to a counted unit from auto will fill the count with the default for that unit", () => {
  expect(updateCssUnit("auto", { unit: "fr" })).toStrictEqual(
    defaultValueForCssUnit("fr")
  );
  expect(updateCssUnit("auto", { unit: "px" })).toStrictEqual(
    defaultValueForCssUnit("px")
  );
  expect(updateCssUnit("auto", { unit: "rem" })).toStrictEqual(
    defaultValueForCssUnit("rem")
  );
});
