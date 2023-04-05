import type { Expression_Node, R_AST_Node } from ".";

import { is_function_node, IsNodeOfType } from "./node_identity_checkers";

export type Function_Call_Node<Fn_Name extends string = string> =
  Expression_Node<[{ val: Fn_Name; type: "s" }, ...R_AST_Node[]]>;

/**
 * Check if a given array of ast nodes represent a call to a function of a given name
 * @param nodes Array of AST nodes that may or may not respesent a function call
 * @param fn_name Name of the function we're checking for
 * @returns True if the first node is a symbol node with the value of `fn_name`
 */
export function is_function_call<Fn_Name extends string>(
  node: R_AST_Node,
  fn_name: Fn_Name
): node is Function_Call_Node<Fn_Name> {
  return (
    is_function_node(node) &&
    IsNodeOfType(node.val[0], "symbol") &&
    node.val[0].val === fn_name
  );
}
