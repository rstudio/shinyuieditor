import type { ParserNode } from "treesitter-parsers";
import { extract_call_content, is_call_node } from "treesitter-parsers";
import { rFnNameToNodeInfo } from "ui-node-definitions/src/uiNodeTypes";

/**
 * Checks if node is known to the ui editor and returns info if it is.
 * @param node Node from R tree-sitter tree that may be a known ui node
 * @returns If the node is a call to a known ui node, return the info about that
 * node. Otherwise return null.
 */

export function getRInfoIfKnown(node: ParserNode) {
  if (!is_call_node(node)) {
    return null;
  }
  const { fn_name, fn_args } = extract_call_content(node);

  const info = rFnNameToNodeInfo(fn_name);

  if (!info) {
    return null;
  }

  return {
    info,
    fn_name,
    fn_args,
  };
}
