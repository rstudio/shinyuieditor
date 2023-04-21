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

  const positional_args = [...known_info.ordered_positional_args];
  const num_of_positional_args = positional_args.length;

  const parsed_node: ShinyUiNode = {
    id: known_info.id,
    namedArgs: {},
  };

  // TODO: Also validate that the correct values are present and handle extra ones
  // elegantly
  let children_nodes: ShinyUiNode[] = [];
  for (let i = 0; i < fn_args.length; i++) {
    const arg = fn_args[i];

    if (i < num_of_positional_args) {
      // This is a positional argument so we need to gather it into the named
      // args
      const arg_name = positional_args[i];
      parsed_node.namedArgs[arg_name] = parse_arg_node(arg);
      continue;
    }

    if (is_keyword_argument_node(arg)) {
      parsed_node.namedArgs[arg.nameNode.text] = parse_arg_node(arg.valueNode);
      continue;
    }

    // Must be a child node, so add it to the children array
    children_nodes.push(treesitter_to_ui_tree(arg));
  }

  if (children_nodes.length > 0) {
    return {
      ...parsed_node,
      children: children_nodes,
    };
  }

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
