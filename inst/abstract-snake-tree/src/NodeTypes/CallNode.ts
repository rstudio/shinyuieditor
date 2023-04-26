import type { namedArgsObject } from "ui-node-definitions/src/uiNodeTypes";
import { pyFnNameToNodeInfo } from "ui-node-definitions/src/uiNodeTypes";
import type Parser from "web-tree-sitter";

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
export interface TSCallNode extends Parser.SyntaxNode {
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
  const fn_name = node.functionNode.text;
  const fn_args = node.argumentsNode.namedChildren;
  const known_info = pyFnNameToNodeInfo.get(fn_name);

  const has_ordered_positional_args = known_info
    ? !!known_info.ordered_positional_args
    : false;

  let namedArgs: namedArgsObject = {};

  if (has_ordered_positional_args) {
    // Pull off the positional args from the args array and put them into the namedArgs field with the correct names
  }

  // Add all the keyword args to the namedArgs field as well

  // Gather remaining args into children array

  return {
    type: "call",
    fn_name: node.functionNode.text,
    args: fn_args.map(node_to_uitree),
  };
}
