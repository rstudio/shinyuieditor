import { parse_python_script } from ".";

describe("Getting started", () => {
  test("Can run a test", () => {
    expect(parse_python_script("import * from shiny")).toBe(
      "Yup, that's a Python script!"
    );
  });
});
