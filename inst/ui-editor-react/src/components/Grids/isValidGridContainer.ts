import type {
  ShinyUiNode,
  ShinyUiNodeByName,
} from "Shiny-Ui-Elements/uiNodeTypes";

// Make it known that the ui children are required here
export type GridContainerNode = Required<
  ShinyUiNodeByName["gridlayout::grid_page" | "gridlayout::grid_container"]
>;

const validGridContainerNodeNames = [
  "gridlayout::grid_page",
  "gridlayout::grid_container",
];

/**
 * Checks to make sure the node is a grid container node
 * @param node A shiny ui node
 * @returns Boolean value that the node passed is a gridlayout container node
 */
export function isValidGridContainer(
  node: ShinyUiNode
): node is GridContainerNode {
  return validGridContainerNodeNames.includes(node.uiName);
}
