import type Parser from "tree-sitter";
import { make_unknown_ui_function } from "ui-node-definitions/src/make_unknown_ui_function";
import type { ShinyUiNode } from "ui-node-definitions/src/ShinyUiNode";
import { pyFnNameToNodeInfo } from "ui-node-definitions/src/uiNodeTypes";

import { extract_boolean_content, is_boolean_node } from "./BooleanNode";
import { is_call_node } from "./CallNode";
import { is_keyword_argument_node } from "./KeywordArgumentNode";
import { extract_number_content, is_number_node } from "./NumberNode";
import { extract_string_content, is_string_node } from "./StringNode";

export function treesitter_to_ui_tree(node: Parser.SyntaxNode): ShinyUiNode {
  if (!is_call_node(node)) {
    throw new Error("Node is not a call node");
  }
  const fn_name = node.functionNode.text;
  const known_info = pyFnNameToNodeInfo.get(fn_name);
  if (!known_info) {
    return make_unknown_ui_function(node.text);
  }

  const fn_args = node.argumentsNode.namedChildren;

  const has_ordered_positional_args = known_info
    ? known_info.ordered_positional_args.size > 0
    : false;

  const parsed_node: ShinyUiNode = {
    id: known_info.id,
    namedArgs: {},
  };

  if (has_ordered_positional_args) {
    // TODO: Pull off the positional args from the args array and put them into
    // the namedArgs field with the correct names
  }

  // TODO: Add all the keyword args to the namedArgs field as well. We should
  // also validate that the correct values are present and handle extra ones
  // elegantly

  for (let i = 0; i < fn_args.length; i++) {
    const arg = fn_args[i];
    if (is_keyword_argument_node(arg)) {
      parsed_node.namedArgs[arg.nameNode.text] = parse_arg_node(arg.valueNode);
    }
  }

  // TODO: Gather remaining args into children array

  return parsed_node;
}

function parse_arg_node(node: Parser.SyntaxNode) {
  if (is_string_node(node)) {
    return extract_string_content(node);
  }

  if (is_number_node(node)) {
    return extract_number_content(node);
  }

  if (is_boolean_node(node)) {
    return extract_boolean_content(node);
  }

  if (is_call_node(node)) {
    return treesitter_to_ui_tree(node);
  }

  return make_unknown_ui_function(node.text);
}
