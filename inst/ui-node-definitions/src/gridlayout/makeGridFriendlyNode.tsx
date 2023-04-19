import type { ShinyUiNode } from "../uiNodeTypes";

/**
 * Takes any ui node and makes sure that it can be placed on a gridlayout in the
 * specified area
 * @param node Node to be placed on grid
 * @param area Area that grid card should occupy on gridlayout
 * @returns If the node is a valid grid item already, it is returned as is with
 * the area argument set to `area`. If the node is a bslib card, it is wrapped
 * in a grid_card with the area argument set to `area`. Otherwise, the node is
 * wrapped as a child of a `grid_card` within the `bslib::card_body_fill`
 * element.
 */
export function makeGridFriendlyNode(
  node: ShinyUiNode,
  area: string
): GridItemNode {
  if (isValidGridItem(node)) {
    node.namedArgs.area = area;

    return node;
  }

  if (isBslibCard(node)) {
    const { namedArgs, children } = node;

    return {
      id: "grid_card",
      namedArgs: { area, ...namedArgs },
      children,
    } satisfies GridlayoutCardNode;
  }

  return {
    id: "grid_card",
    namedArgs: { area },
    children: [
      {
        id: "card_body_fill",
        namedArgs: {},
        children: [node as KnownShinyUiNode],
      },
    ],
  };
}
