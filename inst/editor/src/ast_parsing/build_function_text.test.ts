import {
  build_function_text,
  print_array_or_list,
} from "./build_function_text";

describe("Can turn AST into function call text with formatting", () => {
  test("Simple one argument function", () => {
    expect(
      build_function_text([
        { val: "my_fun", type: "s" },
        { name: "a", val: 1, type: "n" },
        //   { name: "b", val: "two", type: "c" },
      ])
    ).toBe(`my_fun(a = 1)`);
  });

  test("Multi-argument functions put arguments on their own lines", () => {
    expect(
      build_function_text([
        { val: "my_fun", type: "s" },
        { name: "a", val: 1, type: "n" },
        { name: "b", val: "two", type: "c" },
      ])
    ).toBe(`my_fun(\n  a = 1,\n  b = "two"\n)`);
  });

  test("Distinguishes between characters and symbols", () => {
    expect(
      build_function_text([
        { val: "my_fun", type: "s" },
        { name: "char_arg", val: "a", type: "c" },
        { name: "sym_arg", val: "b", type: "s" },
      ])
    ).toBe(`my_fun(\n  char_arg = "a",\n  sym_arg = b\n)`);
  });

  test("Nested or complicated args are abbreviated", () => {
    expect(
      build_function_text([
        { val: "my_fun", type: "s" },
        { name: "char_arg", val: "a", type: "c" },
        {
          name: "nested_arg",
          val: [
            { val: "nested", type: "s" },
            { name: "a", val: 1, type: "n" },
          ],
          type: "e",
        },
      ])
    ).toBe(`my_fun(\n  char_arg = "a",\n  nested_arg = <...>\n)`);
  });
});

describe("Can print arrays and lists with smart line breaks", () => {
  test("Short multi-element arrays go on one line", () => {
    expect(
      print_array_or_list([
        { val: "c", type: "s" },
        { val: "a", type: "c" },
        { val: "b", type: "c" },
        { val: "c", type: "c" },
      ])
    ).toBe(`c("a", "b", "c")`);
  });

  test("Short multi-element lists go on one line", () => {
    expect(
      print_array_or_list([
        { val: "list", type: "s" },
        { name: "a", val: 1, type: "n" },
        { name: "b", val: 2, type: "n" },
        { name: "c", val: 3, type: "n" },
      ])
    ).toBe(`list(a = 1, b = 2, c = 3)`);
  });

  test("Long arguments will cause a multi-line array", () => {
    expect(
      print_array_or_list([
        { val: "c", type: "s" },
        { val: "a suuuuper long", type: "c" },
        { val: "character vec with many arguments", type: "c" },
        { val: "splits to different lines", type: "c" },
      ])
    ).toBe(
      `c(\n  "a suuuuper long",\n  "character vec with many arguments",\n  "splits to different lines"\n)`
    );
  });
});
