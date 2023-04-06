import type { ShinyUiParentNode } from "../../../Shiny-Ui-Elements/uiNodeTypes";

/**
 * Removes a node by index from a parent node's uiChildren array
 * @param parent_node Node for which we want to remove a child
 * @param child_index Index of child to remove
 * @returns  A new parent node with the child removed. The original parent node
 * is not mutated
 * @throws Error if child_index is out of bounds
 */
export function removeChildNode(
  parent_node: ShinyUiParentNode,
  child_index: number
) {
  const { id, uiArguments, uiChildren = [] } = parent_node;

  // Make sure the child we're going to remove actually exists
  const children = [...uiChildren];

  if (child_index < 0 || child_index >= children.length) {
    throw new Error("Trying to remove a child that doesn't exist");
  }

  // Splice out this child
  children.splice(child_index, 1);

  // Update the ui children array on parent to this spliced array
  return {
    id,
    uiArguments,
    uiChildren: children,
  };
}
