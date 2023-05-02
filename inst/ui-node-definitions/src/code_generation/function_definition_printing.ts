import type {
  Symbol_Node,
  AST_Node_By_Name,
  R_AST_Node,
  Expression_Node,
  R_AST,
} from "../../../r-bindings/src";
import { IsNodeOfType } from "../../../r-bindings/src";

type Function_Def_AST = [
  Symbol_Node<"function">,
  AST_Node_By_Name["expression"],
  R_AST_Node
];

/** A function wrapped in parentheses */
type Wrapped_Function_Def_Node = Expression_Node<
  [Symbol_Node<"(">, Expression_Node<Function_Def_AST>]
>;

export function is_function_def_ast(ast: R_AST): ast is Function_Def_AST {
  return IsNodeOfType(ast[0], "symbol") && ast[0].val === "function";
}

export function is_wrapped_function_def_node(
  node: R_AST_Node
): node is Wrapped_Function_Def_Node {
  if (!IsNodeOfType(node, "expression")) return false;

  if (node.val.length !== 2) return false;

  const [first_node, second_node] = node.val;

  // First node is an opening paren.
  if (!(IsNodeOfType(first_node, "symbol") && first_node.val === "("))
    return false;

  return (
    IsNodeOfType(second_node, "expression") &&
    is_function_def_ast(second_node.val)
  );
}
export function print_fn_definition_preview([
  ,
  fn_args,
  fn_body,
]: Function_Def_AST): string {
  const args_print = fn_args.val.map((arg) => {
    const name = arg.name ?? "name";
    const default_val = arg.val ? ` = ${arg.val}` : "";

    return `${name}${default_val}`;
  });

  return `function(${args_print.join(", ")}) {...}`;
}
