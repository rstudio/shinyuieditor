import type Parser from "tree-sitter";
import { make_unknown_ui_function } from "ui-node-definitions/src/make_unknown_ui_function";
import type { ShinyUiNode } from "ui-node-definitions/src/ShinyUiNode";
import type { namedArgsObject } from "ui-node-definitions/src/uiNodeTypes";
import { pyFnNameToNodeInfo } from "ui-node-definitions/src/uiNodeTypes";

import { is_call_node } from "./CallNode";

export function ts_node_to_ui_tree(node: Parser.SyntaxNode): ShinyUiNode {
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
    ? !!known_info.ordered_positional_args
    : false;

  let namedArgs: namedArgsObject = {};

  if (has_ordered_positional_args) {
    // TODO: Pull off the positional args from the args array and put them into the namedArgs field with the correct names
  }

  // TODO: Add all the keyword args to the namedArgs field as well. We should also validate that the correct values are present and handle extra ones elegantly

  // TODO: Gather remaining args into children array

  return {
    id: known_info.id,
    namedArgs,
    children: [],
  };
}
