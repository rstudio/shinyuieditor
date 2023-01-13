import { is_object } from "../utils/is_object";

import type {
  AST_Node_Generic,
  Branch_Node,
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

type Assignment_Node = AST_Node_Generic<
  [AST_Node_Generic<"<-">, AST_Node_Generic<string>, Branch_Node]
>;
export function is_ui_assignment_node(
  node: R_AST_Node
): node is Assignment_Node {
  if (is_ast_leaf_node(node)) return false;

  const { val } = node;

  const is_assignment = val[0].val === "<-" || val[0].val === "=";

  return is_assignment && val[1].val === "ui";
}
