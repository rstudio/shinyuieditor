import { is_object } from "../utils/is_object";

import type {
  Branch_Node,
  ExpressionNode,
  Leaf_Node,
  Primatives,
  R_AST_Node,
} from "./r_ast";

export function is_primative(x: unknown): x is Primatives {
  return (
    typeof x === "string" || typeof x === "number" || typeof x === "boolean"
  );
}
export function is_ast_leaf_node(node: unknown): node is Leaf_Node {
  return (
    is_object(node) &&
    "val" in node &&
    ["string", "boolean", "number"].includes(typeof node.val)
  );
}
export function is_ast_branch_node(node: unknown): node is Branch_Node {
  return is_object(node) && "val" in node && Array.isArray(node.val);
}

type Named_Node = Required<Pick<R_AST_Node, "val" | "name">>;
export function is_named_node(node: unknown): node is Named_Node {
  return is_object(node) && "name" in node;
}

export type Assignment_Node = ExpressionNode<
  [{ val: "<-" | "="; type: "s" }, R_AST_Node, ...R_AST_Node[]]
>;
export function is_assignment_node(
  node: R_AST_Node,
  var_name?: string
): node is Assignment_Node {
  if (!is_ast_branch_node(node)) return false;

  const { val } = node;

  const is_assignment = val[0].val === "<-" || val[0].val === "=";

  if (!is_assignment) return false;

  return var_name ? val[1].val === var_name : true;
}

type Output_Node = ExpressionNode<
  [
    { val: "$"; type: "s" },
    { val: "output"; type: "s" },
    { val: string; type: "s" }
  ]
>;

export function is_output_node(node: R_AST_Node): node is Output_Node {
  if (!is_ast_branch_node(node)) return false;
  const { val: subnodes } = node;

  return (
    subnodes.length === 3 &&
    subnodes[1].val === "output" &&
    typeof subnodes[2].val === "string"
  );
}
