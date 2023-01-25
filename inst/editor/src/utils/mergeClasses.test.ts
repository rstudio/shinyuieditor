import { mergeClasses } from "./mergeClasses";

describe("Merges multiple and conditional classes into single string", () => {
  test("Simple case", () => {
    expect(mergeClasses("foo", "bar")).toBe("foo bar");
  });

  test("Handles missing elements", () => {
    expect(mergeClasses("foo", undefined, "bar", null)).toBe("foo bar");
  });

  test("Can be used with unpacked arrays", () => {
    const extraClasses = ["A", "B"];
    const extraClass = "extra";

    expect(mergeClasses("foo", "bar", ...extraClasses, extraClass)).toBe(
      "foo bar A B extra"
    );
  });
});
