import { is_ast_branch_node } from "./node_identity_checkers";
import type { R_AST, AST_Node_By_Key, R_AST_Node } from "./r_ast";

export function get_function_body(fn_node: Function_Node): R_AST {
  const fn_body = fn_node.val[2].val;
  const [, ...fn_contents] = fn_body;
  return fn_contents;
}
type Function_Node = {
  val: [
    { val: "function"; type: "s" },
    AST_Node_By_Key["e"],
    { val: [{ val: "{"; type: "s" }, ...AST_Node_By_Key["e"][]]; type: "e" }
  ];
  type: "e";
};
export function is_function_node(node: R_AST_Node): node is Function_Node {
  const { val, type } = node;

  if (type !== "e") return false;

  const [call_node, args_node, body_node] = val;

  if (call_node.val !== "function") return false;

  if (args_node.type !== "e") return false;

  if (!is_ast_branch_node(body_node)) return false;

  if (body_node.val[0].val !== "{") return false;

  return true;
}
