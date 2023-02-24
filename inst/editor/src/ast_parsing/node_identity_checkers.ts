import { is_object } from "editor/src/utils/is_object";

import type {
  AST_Node_By_Key,
  Branch_Node,
  Leaf_Node,
  Primatives,
  R_AST_Node,
} from ".";

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

export type Character_Node = AST_Node_By_Key["c"];
export function is_character_node(node: R_AST_Node): node is Character_Node {
  return node.type === "c";
}

export function is_ast_branch_node(node: unknown): node is Branch_Node {
  return is_object(node) && "val" in node && Array.isArray(node.val);
}

type Named_Node = Required<Pick<R_AST_Node, "val" | "name">>;
export function is_named_node(node: unknown): node is Named_Node {
  return is_object(node) && "name" in node;
}
