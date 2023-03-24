import { isBslibCard } from "../../Bslib/BslibCard";
import type {
  KnownShinyUiNode,
  ShinyUiNode
} from "../../uiNodeTypes";
import type { GridItemNode} from "../Utils/isValidGridItem";
import { isValidGridItem } from "../Utils/isValidGridItem";

import type { GridlayoutCardNode } from "./index";


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
export function makeGridFriendlyNode(  node: ShinyUiNode,
  area: string): GridItemNode {

  if (isValidGridItem(node)) {
    node.uiArguments.area = area;

    return node;
  }

  if (isBslibCard(node)) {
    const { uiArguments, uiChildren } = node;

    return {
      uiName: "gridlayout::grid_card",
      uiArguments: { area, ...uiArguments },
      uiChildren,
    } satisfies GridlayoutCardNode;
  }

  return {
    uiName: "gridlayout::grid_card",
    uiArguments: { area },
    uiChildren: [
      {
        uiName: "bslib::card_body_fill",
        uiArguments: {},
        uiChildren: [node as KnownShinyUiNode],
      },
    ],
  };
}
