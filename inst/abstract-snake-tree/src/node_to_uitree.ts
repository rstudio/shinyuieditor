import type Parser from "tree-sitter";

import { is_boolean_node, parse_boolean_node } from "./NodeTypes/BooleanNode";
import { is_call_node, parse_call_node } from "./NodeTypes/CallNode";
import {
  is_keyword_argument_node,
  parse_keyword_argument_node,
} from "./NodeTypes/KeywordArgumentNode";
import { is_number_node, parse_number_node } from "./NodeTypes/NumberNode";
import type { Parsed_Ui_Node } from "./NodeTypes/Parsed_Ui_Node";
import { is_string_node, parse_string_node } from "./NodeTypes/StringNode";
import { parse_unknown_node } from "./NodeTypes/UnknownNode";

/**
 * Convert the tree-sitter node representing an apps UI definition into a custom
 * simplified ast format for easier processing
 * @param node Syntax node representing the UI of a python app script from
 * tree-sitter parser
 * @returns A serializable simplified version tree-sitter tree for the UI
 * definition.
 */
export function node_to_uitree(node: Parser.SyntaxNode): Parsed_Ui_Node {
  if (is_call_node(node)) {
    return parse_call_node(node);
  }

  if (is_keyword_argument_node(node)) {
    return parse_keyword_argument_node(node);
  }

  if (is_string_node(node)) {
    return parse_string_node(node);
  }

  if (is_number_node(node)) {
    return parse_number_node(node);
  }

  if (is_boolean_node(node)) {
    return parse_boolean_node(node);
  }

  return parse_unknown_node(node);
}
