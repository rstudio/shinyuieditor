import type Parser from "tree-sitter";

import { node_to_uitree } from "../node_to_uitree";

import type { Parsed_Nodes_By_Type } from "./Parsed_Ui_Node";

/**
 * Call node for when a node represents a function call. This is one of the
 * `eval`ed types in tree sitter so there's not built-in type/class for it
 *
 * Definition of call node in tree-sitter grammar:
 * ```
 * {
 *   "type": "call",
 *   "named": true,
 *   "fields": {
 *     "arguments": {
 *       "multiple": false,
 *       "required": true,
 *       "types": [
 *         {
 *           "type": "argument_list",
 *           "named": true
 *         },
 *         {
 *           "type": "generator_expression",
 *           "named": true
 *         }
 *       ]
 *     },
 *     "function": {
 *       "multiple": false,
 *       "required": true,
 *       "types": [
 *         {
 *           "type": "primary_expression",
 *           "named": true
 *         }
 *       ]
 *     }
 *   }
 * }
 * ```
 */
interface TSCallNode extends Parser.SyntaxNode {
  argumentsNode: Parser.SyntaxNode;
  functionNode: Parser.SyntaxNode;
}

export function is_call_node(node: Parser.SyntaxNode): node is TSCallNode {
  return (
    node.type === "call" && "argumentsNode" in node && "functionNode" in node
  );
}

export function parse_call_node(
  node: TSCallNode
): Parsed_Nodes_By_Type["call"] {
  return {
    type: "call",
    fn_name: node.functionNode.text,
    args: node.argumentsNode.namedChildren.map(node_to_uitree),
  };
}
