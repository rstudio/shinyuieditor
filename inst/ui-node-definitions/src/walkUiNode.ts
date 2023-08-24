import { isShinyUiNode } from "./isShinyUiNode";
import type { ShinyUiNode } from "./ShinyUiNode";
import { isParentNode } from "./ShinyUiNode";

/**
 * Walk a ui node tree and run a callback on each node.
 * @param ui_node Ui node to traverse
 * @param callback Callack to run on each node. The callback is called on the
 * node before its children are visited. If the callback returns false, the
 * children of the node will not be visited.
 */
export function walkUiNode(
  ui_node: ShinyUiNode,
  callback: (node: ShinyUiNode) => boolean | void
) {
  function visit(node: ShinyUiNode) {
    const keepTraversing = callback(node);

    if (keepTraversing === false) {
      return;
    }
    const namedArgs = node.namedArgs;

    for (const key in namedArgs) {
      const value = namedArgs[key];
      if (isShinyUiNode(value)) {
        visit(value);
      }
    }

    if (isParentNode(node)) {
      node.children?.forEach(visit);
    }
  }
  visit(ui_node);
}
