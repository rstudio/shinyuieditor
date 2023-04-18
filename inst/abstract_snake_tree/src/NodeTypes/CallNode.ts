import type Parser from "tree-sitter";

import { node_to_uitree } from "../node_to_uitree";

import type { Parsed_Ui_Node } from "./Parsed_Ui_Node";

/**
 * Call node for when a node represents a function call. This is one of the
 * `eval`ed types in tree sitter so there's not built-in type/class for it
 */
interface CallNode extends Parser.SyntaxNode {
  argumentsNode: Parser.SyntaxNode;
  functionNode: Parser.SyntaxNode;
}

export function is_call_node(node: Parser.SyntaxNode): node is CallNode {
  return (
    node.type === "call" && "argumentsNode" in node && "functionNode" in node
  );
}

export interface Parsed_Call_Node extends Parsed_Ui_Node {
  type: "call";
  fn_name: string;
  args: Parsed_Ui_Node[];
}

export function parse_call_node(node: CallNode): Parsed_Call_Node {
  return {
    type: "call",
    fn_name: node.functionNode.text,
    args: node.argumentsNode.namedChildren.map(node_to_uitree),
  };
}
