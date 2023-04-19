import type Parser from "tree-sitter";

import { node_to_uitree } from "../node_to_uitree";

import type { Parsed_Ui_Node } from "./Parsed_Ui_Node";

/**
 * Node representing a pair of key-value in a keyword argument. E.g. `foo = bar`
 * This is one of the `eval`ed types in tree sitter so there's no built-in type
 * or class for it
 *
 * Definition of the keyword_argument node in the python tree-sitter grammar (node-types.json)
 * ```
 * {
 *   "type": "keyword_argument",
 *   "named": true,
 *   "fields": {
 *     "name": {
 *       "multiple": false,
 *       "required": true,
 *       "types": [
 *         {
 *           "type": "identifier",
 *           "named": true
 *         }
 *       ]
 *     },
 *     "value": {
 *       "multiple": false,
 *       "required": true,
 *       "types": [
 *         {
 *           "type": "expression",
 *           "named": true
 *         }
 *       ]
 *     }
 *   }
 * }
 * ```
 */
interface TSKeywordArgumentNode extends Parser.SyntaxNode {
  /**
   * The node representing the value of the keyword argument
   */
  valueNode: Parser.SyntaxNode;

  /**
   * The node representing the name of the keyword argument
   */
  nameNode: Parser.SyntaxNode;
}

export function is_keyword_argument_node(
  node: Parser.SyntaxNode
): node is TSKeywordArgumentNode {
  return (
    node.type === "keyword_argument" &&
    "valueNode" in node &&
    "nameNode" in node
  );
}

export function parse_keyword_argument_node(
  node: TSKeywordArgumentNode
): Parsed_Ui_Node {
  return {
    ...node_to_uitree(node.valueNode),
    name: node.nameNode.text,
  };
}
