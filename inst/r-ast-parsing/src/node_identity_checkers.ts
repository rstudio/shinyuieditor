import { is_object } from "util-functions/src/is_object";

import type {
  AST_Name_To_Key,
  AST_Node_By_Name,
  Branch_Node,
  Expression_Node,
  Function_Node,
  R_AST_Node,
} from ".";
import { ast_name_to_key } from ".";

import { Parsing_Error } from "./parsing_error_class";

export function assert_is_ast_node(x: unknown): asserts x is R_AST_Node {
  if (!is_object(x) || !("type" in x) || !("val" in x)) {
    throw new Parsing_Error({ message: "Invalid AST node passed", cause: x });
  }
}

export function IsNodeOfType<TypeName extends keyof AST_Name_To_Key>(
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

/**
 * Check if a given array of ast nodes represent a call to a function of a given name
 * @param nodes Array of AST nodes that may or may not respesent a function call
 * @param fn_name Name of the function we're checking for
 * @returns True if the first node is a symbol node with the value of `fn_name`
 */
export function is_function_call<Fn_Name extends string>(
  node: R_AST_Node,
  fn_name: Fn_Name
): node is Expression_Node<[{ val: Fn_Name; type: "s" }, ...R_AST_Node[]]> {
  return (
    is_function_node(node) &&
    IsNodeOfType(node.val[0], "symbol") &&
    node.val[0].val === fn_name
  );
}
