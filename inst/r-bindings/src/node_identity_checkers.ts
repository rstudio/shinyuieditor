import { is_object } from "util-functions/src/is_object";

import type {
  AstNameToKey,
  AST_Node_By_Name,
  Branch_Node,
  Function_Node,
  R_AST_Node,
} from ".";
import { ast_name_to_key } from ".";

import { ParsingError } from "./parsing_error_class";

export function assert_is_ast_node(x: unknown): asserts x is R_AST_Node {
  if (!is_object(x) || !("type" in x) || !("val" in x)) {
    throw new ParsingError({ message: "Invalid AST node passed", cause: x });
  }
}

export function IsNodeOfType<TypeName extends keyof AstNameToKey>(
  node: R_AST_Node,
  type: TypeName
): node is AST_Node_By_Name[TypeName] {
  return node.type === ast_name_to_key[type];
}

const primative_type_keys = new Set(["c", "n", "b"]);
export function is_primative_node(
  node: R_AST_Node
): node is AST_Node_By_Name["character" | "number" | "boolean"] {
  return primative_type_keys.has(node.type);
}

export function is_ast_branch_node(node: R_AST_Node): node is Branch_Node {
  return node.type === "e" && Array.isArray(node.val);
}

export function is_function_node(node: R_AST_Node): node is Function_Node {
  return (
    node.type === "e" &&
    Array.isArray(node.val) &&
    IsNodeOfType(node.val[0], "symbol")
  );
}
