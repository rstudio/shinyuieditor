import type {
  AST_Node_By_Name,
  Expression_Node,
  R_AST,
  R_AST_Node,
  Symbol_Node,
} from ".";

import type { Function_Call_Node } from "./Function_Call_Node";

export function make_function_call_node<Fn_Name extends string>(
  fn_name: Fn_Name,
  args: R_AST_Node[]
): Function_Call_Node<Fn_Name> {
  return make_expression_node([make_symbol_node(fn_name), ...args]);
}

export function name_node(node: R_AST_Node, name: string): R_AST_Node {
  node.name = name;
  return node;
}

export function make_expression_node<T extends R_AST>(
  val: T
): Expression_Node<T> {
  // return make_node(type = "expression"), val);
  return { val, type: "e" };
}

export function make_symbol_node<Sym extends string>(
  val: Sym
): Symbol_Node<Sym> {
  return { val, type: "s" };
}
export function make_character_node(
  val: string
): AST_Node_By_Name["character"] {
  return { val, type: "c" };
}
export function make_number_node(val: number): AST_Node_By_Name["number"] {
  return { val, type: "n" };
}
