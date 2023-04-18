import type Parser from "tree-sitter";

import { simple_app_script } from "./example_app_scripts";
import { get_assignment_nodes } from "./get_assignment_nodes";
import { get_ui_assignment } from "./get_ui_assignment";
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
import { setup_python_parser } from "./setup_python_parser";

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

// Initialize a tree-sitter parser with the Python grammar
const parser = setup_python_parser();

// Parse the current script
const tree = parser.parse(simple_app_script);
const assignment_nodes = get_assignment_nodes(tree.rootNode);
const ui_node = get_ui_assignment(assignment_nodes);
const uiTree = node_to_uitree(ui_node);
