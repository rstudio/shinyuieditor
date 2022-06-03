import { formatFunctionText } from "./formatFunctionText";

describe("Can modify text to a decent format", () => {
  test("no-arg function", () => {
    expect(formatFunctionText(`simple_fn()`)).toEqual(`simple_fn()`);
  });
  test("single-arg function", () => {
    expect(formatFunctionText(`gt::gt_output("stockTable")`)).toEqual(
      `gt::gt_output(
  "stockTable"
)`
    );
  });
  test("double-arg function", () => {
    expect(formatFunctionText(`my_custom_fn(foo="bar", arg2=false)`)).toEqual(
      `my_custom_fn(
  foo="bar",
  arg2=false
)`
    );
  });
});
