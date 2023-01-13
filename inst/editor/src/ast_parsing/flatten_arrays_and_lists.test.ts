import { flatten_array } from "./flatten_array";
import { flatten_list } from "./flatten_list";
import type { R_AST } from "./r_ast";

describe("Can flatten arrays", () => {
  test("1d arrays", () => {
    const array_node: R_AST = [
      { val: "c" },
      { val: "a" },
      { val: "b" },
      { val: "c" },
    ];

    expect(flatten_array(array_node)).toStrictEqual(["a", "b", "c"]);
  });

  test("2d arrays", () => {
    const array_node: R_AST = [
      { val: "c" },
      { val: [{ val: "c" }, { val: "a1" }, { val: "a2" }] },
      { val: [{ val: "c" }, { val: "b1" }, { val: "b2" }] },
      { val: [{ val: "c" }, { val: "c1" }, { val: "c2" }] },
    ];

    expect(flatten_array(array_node)).toStrictEqual([
      ["a1", "a2"],
      ["b1", "b2"],
      ["c1", "c2"],
    ]);
  });
});

describe("Can flatten lists", () => {
  test("1d arrays", () => {
    const array_node: R_AST = [
      { val: "list" },
      { name: "a", val: 1 },
      { name: "b", val: 2 },
      { name: "c", val: 3 },
    ];

    expect(flatten_list(array_node)).toStrictEqual({ a: 1, b: 2, c: 3 });
  });
});
