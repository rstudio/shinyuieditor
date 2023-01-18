import { flatten_to_list, flatten_to_array } from "./flatten_arrays_and_lists";
import type { R_AST_Node } from "./r_ast";

describe("Can flatten arrays", () => {
  test("1d arrays", () => {
    const array_node: R_AST_Node = {
      val: [
        { val: "c", type: "s" },
        { val: "a", type: "c" },
        { val: "b", type: "c" },
        { val: "c", type: "c" },
      ],
      type: "e",
    };

    expect(flatten_to_array(array_node)).toStrictEqual(["a", "b", "c"]);
  });

  test("2d arrays", () => {
    const array_node: R_AST_Node = {
      val: [
        { val: "c", type: "s" },
        {
          val: [
            { val: "c", type: "s" },
            { val: "a1", type: "c" },
            { val: "a2", type: "c" },
          ],
          type: "e",
        },
        {
          val: [
            { val: "c", type: "s" },
            { val: "b1", type: "c" },
            { val: "b2", type: "c" },
          ],
          type: "e",
        },
        {
          val: [
            { val: "c", type: "s" },
            { val: "c1", type: "c" },
            { val: "c2", type: "c" },
          ],
          type: "e",
        },
      ],
      type: "e",
    };

    expect(flatten_to_array(array_node)).toStrictEqual([
      ["a1", "a2"],
      ["b1", "b2"],
      ["c1", "c2"],
    ]);
  });
});

describe("Can flatten lists", () => {
  test("1d arrays", () => {
    const array_node: R_AST_Node = {
      val: [
        { val: "list", type: "s" },
        { name: "a", val: 1, type: "n" },
        { name: "b", val: 2, type: "n" },
        { name: "c", val: 3, type: "n" },
      ],
      type: "e",
    };

    expect(flatten_to_list(array_node)).toStrictEqual({ a: 1, b: 2, c: 3 });
  });
});
