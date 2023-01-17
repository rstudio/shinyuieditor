import { build_function_text } from "./build_function_text";

describe("Can turn AST into function call text with formatting", () => {
  test("Simple one argument function", () => {
    expect(
      build_function_text([
        { val: "my_fun", type: "s" },
        { name: "a", val: 1, type: "n" },
      ])
    ).toBe(`my_fun(a = 1)`);
  });

  test("Multi-argument functions put arguments on their own lines", () => {
    // prettier-ignore
    const expected_result = 
`my_fun(
  a = 1,
  b = "two"
)`;
    expect(
      build_function_text([
        { val: "my_fun", type: "s" },
        { name: "a", val: 1, type: "n" },
        { name: "b", val: "two", type: "c" },
      ])
    ).toBe(expected_result);
  });

  test("Distinguishes between characters and symbols", () => {
    // prettier-ignore
    const expected_result = 
`my_fun(
  char_arg = "a",
  sym_arg = b
)`;

    expect(
      build_function_text([
        { val: "my_fun", type: "s" },
        { name: "char_arg", val: "a", type: "c" },
        { name: "sym_arg", val: "b", type: "s" },
      ])
    ).toBe(expected_result);
  });
});

describe("Nested function calls are properly indented", () => {
  test("Single arg functions can sit on a single line", () => {
    // prettier-ignore
    const expected_output = 
`my_fun(
  char_arg = "a",
  nested_arg = nested(a = 1)
)`;

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
    ).toBe(expected_output);
  });

  test("Multi-arg functions are broken up over multiple lines and indented", () => {
    // prettier-ignore
    const expected_output = 
`my_fun(
  char_arg = "a",
  nested_arg = nested(
    a = 1,
    b = 2
  )
)`;

    expect(
      build_function_text([
        { val: "my_fun", type: "s" },
        { name: "char_arg", val: "a", type: "c" },
        {
          name: "nested_arg",
          val: [
            { val: "nested", type: "s" },
            { name: "a", val: 1, type: "n" },
            { name: "b", val: 2, type: "n" },
          ],
          type: "e",
        },
      ])
    ).toBe(expected_output);
  });
  test("Double nesting works", () => {
    // prettier-ignore
    const expected_output = 
`my_fun(
  a = 1,
  n1 = nested(
    b = 2,
    n2 = nested2(
      c = 3,
      d = 4
    )
  )
)`;

    expect(
      build_function_text([
        { val: "my_fun", type: "s" },
        { name: "a", val: 1, type: "n" },
        {
          name: "n1",
          val: [
            { val: "nested", type: "s" },
            { name: "b", val: 2, type: "n" },
            {
              name: "n2",
              val: [
                { val: "nested2", type: "s" },
                { name: "c", val: 3, type: "n" },
                { name: "d", val: 4, type: "n" },
              ],
              type: "e",
            },
          ],
          type: "e",
        },
      ])
    ).toBe(expected_output);
  });

  test("Will smartly put a nested argument on a new line even if it's the only argument", () => {
    // prettier-ignore
    const expected_output = 
`my_fun(
  n1 = nested(
    b = 2,
    c = 3
  )
)`;

    expect(
      build_function_text([
        { val: "my_fun", type: "s" },
        {
          name: "n1",
          val: [
            { val: "nested", type: "s" },
            { name: "b", val: 2, type: "n" },
            { name: "c", val: 3, type: "n" },
          ],
          type: "e",
        },
      ])
    ).toBe(expected_output);
  });
  test("Short arrays or lists can be kept on single line", () => {
    // prettier-ignore
    const expected_output = `my_fun(vec = c(1, 2, 3))`

    expect(
      build_function_text([
        { val: "my_fun", type: "s" },
        {
          name: "vec",
          val: [
            { val: "c", type: "s" },
            { val: 1, type: "n" },
            { val: 2, type: "n" },
            { val: 3, type: "n" },
          ],
          type: "e",
        },
      ])
    ).toBe(expected_output);
  });
});

describe("Can print arrays and lists with smart line breaks", () => {
  test("Short multi-element arrays go on one line", () => {
    expect(
      build_function_text([
        { val: "c", type: "s" },
        { val: "a", type: "c" },
        { val: "b", type: "c" },
        { val: "c", type: "c" },
      ])
    ).toBe(`c("a", "b", "c")`);
  });

  test("Short multi-element lists go on one line", () => {
    expect(
      build_function_text([
        { val: "list", type: "s" },
        { name: "a", val: 1, type: "n" },
        { name: "b", val: 2, type: "n" },
        { name: "c", val: 3, type: "n" },
      ])
    ).toBe(`list(a = 1, b = 2, c = 3)`);
  });

  test("Long arguments will cause a multi-line array", () => {
    // prettier-ignore
    const expected_result = 
`c(
  "a suuuuper long",
  "character vec with many arguments",
  "splits to different lines"
)`

    expect(
      build_function_text([
        { val: "c", type: "s" },
        { val: "a suuuuper long", type: "c" },
        { val: "character vec with many arguments", type: "c" },
        { val: "splits to different lines", type: "c" },
      ])
    ).toBe(expected_result);
  });
});
