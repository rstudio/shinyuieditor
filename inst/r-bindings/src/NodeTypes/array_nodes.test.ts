import { setup_r_parser } from "treesitter-parsers";

import { parse_r_script } from "../parse_r_script";

import { is_array_node, extract_array_contents } from "./ArrayNode";

describe("Can parse array nodes to their proper javascript formats", async () => {
  const my_parser = await setup_r_parser();

  test("Array of strings", () => {
    const parse_test = parse_r_script(my_parser, `c("a", "b", "c")`).rootNode;

    const test_node = parse_test.descendantsOfType("call")[0];

    expect(is_array_node(test_node)).toBe(true);
    if (is_array_node(test_node)) {
      expect(extract_array_contents(test_node)).toStrictEqual(["a", "b", "c"]);
    }
  });
  test("Array of numbers", () => {
    const parse_test = parse_r_script(my_parser, `c(4.2, 42, -2)`).rootNode;

    const test_node = parse_test.descendantsOfType("call")[0];

    expect(is_array_node(test_node)).toBe(true);

    if (is_array_node(test_node)) {
      expect(extract_array_contents(test_node)).toStrictEqual([4.2, 42, -2]);
    }
  });

  test("2d array of numbers", () => {
    const parse_test = parse_r_script(my_parser, `c(c(1,2),c(3,4))`).rootNode;

    const test_node = parse_test.descendantsOfType("call")[0];

    expect(is_array_node(test_node)).toBe(true);
    if (is_array_node(test_node)) {
      expect(extract_array_contents(test_node)).toStrictEqual([
        [1, 2],
        [3, 4],
      ]);
    }
  });
});
