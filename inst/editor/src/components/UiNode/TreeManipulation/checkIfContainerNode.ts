import type { ShinyUiNode } from "../../../main";

/**
 * Like Required but you can choose what subset of properties are required
 */
type RequireProp<T, K extends keyof T> = T & {
  [P in K]-?: T[P];
};
type UiContainerNode = RequireProp<ShinyUiNode, "uiChildren">;

export function checkIfContainerNode(
  node: ShinyUiNode
): node is UiContainerNode {
  return (node as UiContainerNode).uiChildren !== undefined;
}
