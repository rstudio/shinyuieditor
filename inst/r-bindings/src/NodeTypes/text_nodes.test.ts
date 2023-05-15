import { setup_r_parser } from "treesitter-parsers";

import { parse_r_script } from "../parse_r_script";

import { is_text_node, parse_text_node } from "./TextNode";

describe("Can parse text nodes to their proper object format", async () => {
  const my_parser = await setup_r_parser();

  test("Simple string", () => {
    const parse_test = parse_r_script(my_parser, `"hello, world"`).rootNode;

    const test_node = parse_test.firstNamedChild!;

    expect(is_text_node(test_node)).toBe(true);

    if (is_text_node(test_node)) {
      expect(parse_text_node(test_node)).toStrictEqual({
        id: "textNode",
        namedArgs: {
          contents: "hello, world",
        },
      });
    }
    // if (is_array_node(test_node)) {
    //   expect(extract_array_contents(test_node)).toStrictEqual(["a", "b", "c"]);
    // }
  });

  test("em tag", () => {
    const parse_test = parse_r_script(my_parser, `em("hello, world")`).rootNode;

    const test_node = parse_test.firstNamedChild!;

    expect(is_text_node(test_node)).toBe(true);

    if (is_text_node(test_node)) {
      expect(parse_text_node(test_node)).toStrictEqual({
        id: "textNode",
        namedArgs: {
          contents: "hello, world",
          decoration: "italic",
        },
      });
    }
  });

  test("h1 tag", () => {
    const parse_test = parse_r_script(my_parser, `h1("hello, world")`).rootNode;

    const test_node = parse_test.firstNamedChild!;

    expect(is_text_node(test_node)).toBe(true);

    if (is_text_node(test_node)) {
      expect(parse_text_node(test_node)).toStrictEqual({
        id: "textNode",
        namedArgs: {
          contents: "hello, world",
          size: "headline",
        },
      });
    }
  });

  test("Combined size and decoration tags", () => {
    const parse_test = parse_r_script(
      my_parser,
      `h2(strong("hello, world"))`
    ).rootNode;

    const test_node = parse_test.firstNamedChild!;

    expect(is_text_node(test_node)).toBe(true);

    if (is_text_node(test_node)) {
      expect(parse_text_node(test_node)).toStrictEqual({
        id: "textNode",
        namedArgs: {
          contents: "hello, world",
          size: "subtitle",
          decoration: "bold",
        },
      });
    }
  });
});
