import { ShinyUiNameAndArguments } from "../componentTypes";
import { GridPanelSettings } from "../Elements/GridlayoutGridPanel";

/**
 * UiNode that can have children container within it
 * */
export type UiContainerNode = {
  uiName: "container";
  uiArguments: ContainerSettings;
  /** Any children of this node */
  uiChildren: UiNodeProps[];
};

export type ContainerSettings = GridPanelSettings;

/**
 * Path to a given node. Starts at [0] for the root. The first child for
 * instance would be then [0,1]
 */
export type NodePath = number[];

export type UiNodeProps = UiContainerNode | ShinyUiNameAndArguments;

export function checkIfContainerNode(
  node: UiNodeProps
): node is UiContainerNode {
  return (node as UiContainerNode).uiChildren !== undefined;
}
