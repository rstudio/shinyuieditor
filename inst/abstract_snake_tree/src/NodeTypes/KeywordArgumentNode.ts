import type Parser from "tree-sitter";

import { node_to_uitree } from "../node_to_uitree";

import type { Parsed_Nodes_By_Type } from "./Parsed_Ui_Node";

/**
 * Node representing a pair of key-value in a keyword argument. E.g. `foo = bar`
 * This is one of the `eval`ed types in tree sitter so there's no built-in type
 * or class for it
 */
interface KeywordArgumentNode extends Parser.SyntaxNode {
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
): node is KeywordArgumentNode {
  return (
    node.type === "keyword_argument" &&
    "valueNode" in node &&
    "nameNode" in node
  );
}

export function parse_keyword_argument_node(
  node: KeywordArgumentNode
): Parsed_Nodes_By_Type["kwarg"] {
  return {
    type: "kwarg",
    name: node.nameNode.text,
    value: node_to_uitree(node.valueNode),
  };
}
