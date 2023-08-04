import type {
  SymbolNode,
  ASTNodeByName,
  RASTNode,
  ExpressionNode,
  RAST,
} from "../../../r-bindings/src";
import { IsNodeOfType } from "../../../r-bindings/src";

type FunctionDefAST = [
  SymbolNode<"function">,
  ASTNodeByName["expression"],
  RASTNode
];

function isFunctionDefAst(ast: RAST): ast is FunctionDefAST {
  return IsNodeOfType(ast[0], "symbol") && ast[0].val === "function";
}

export function isWrappedFunctionDefNode(
  node: RASTNode
): node is ExpressionNode<[SymbolNode<"(">, ExpressionNode<FunctionDefAST>]> {
  if (!IsNodeOfType(node, "expression")) return false;

  if (node.val.length !== 2) return false;

  const [first_node, second_node] = node.val;

  // First node is an opening paren.
  if (!(IsNodeOfType(first_node, "symbol") && first_node.val === "("))
    return false;

  return (
    IsNodeOfType(second_node, "expression") && isFunctionDefAst(second_node.val)
  );
}

export function printFnDefinitionPreview([
  ,
  fn_args,
  fn_body,
]: FunctionDefAST): string {
  const args_print = fn_args.val.map((arg) => {
    const name = arg.name ?? "name";
    const default_val = arg.val ? ` = ${arg.val}` : "";

    return `${name}${default_val}`;
  });

  return `function(${args_print.join(", ")}) {...}`;
}
