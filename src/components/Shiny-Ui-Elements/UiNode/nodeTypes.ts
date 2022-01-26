import { ShinyUiNameAndArguments } from "../Elements/componentTypes";

export type UiContainerNode = {
  // Any children of this node
  uiChildren: UiNodeProps[];

  // Settings for the container div
  containerSettings?: ContainerSettings;
};

export type ContainerSettings = {
  horizontalAlign: "left" | "center" | "right";
  verticalAlign: "top" | "center" | "bottom";
};

export type UiLeafNode = {
  // Name and properties of the UI function used for this node
  uiInfo: ShinyUiNameAndArguments;
};

// Path to a given node. Starts at [0] for the root. The first child for
// instance would be then [0,1]
export type NodePath = number[];

export type UiNodeProps = UiContainerNode | UiLeafNode;

export function checkIfContainerNode(
  node: UiNodeProps
): node is UiContainerNode {
  return (node as UiContainerNode).uiChildren !== undefined;
}
