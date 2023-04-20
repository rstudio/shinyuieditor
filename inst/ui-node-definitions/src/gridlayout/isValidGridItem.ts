import type { UnionToTuple } from "util-functions/src/TypescriptUtils";

import type {
  NodeInfoByRPackage,
  KnownShinyUiNode,
  ShinyUiNode,
} from "../uiNodeTypes";

type GridItemNodeIds = Extract<
  NodeInfoByRPackage["gridlayout"],
  { settingsInfo: { area: any } }
>["id"];

export type GridItemNode = Extract<KnownShinyUiNode, { id: GridItemNodeIds }>;

const gridAwareNodeNamesTuple: UnionToTuple<GridItemNodeIds> = [
  "grid_card",
  "grid_card_plot",
  "grid_card_text",
];

// Place in a set so our checking of the node name is O(1)
const gridItemNodes = new Set(gridAwareNodeNamesTuple);

export function isValidGridItem(node: ShinyUiNode): node is GridItemNode {
  return gridItemNodes.has(node.id as GridItemNode["id"]);
}

type GridContainerNodeIds = "grid_page" | "grid_container";

const validGridContainerNodeNames: string[] = [
  "grid_page",
  "grid_container",
] satisfies GridContainerNodeIds[];

export type GridContainerNode = Extract<
  KnownShinyUiNode,
  {
    id: GridContainerNodeIds;
  }
>;

/**
 * Checks to make sure the node is a grid container node
 * @param node A shiny ui node
 * @returns Boolean value that the node passed is a gridlayout container node
 */
export function isValidGridContainer(
  node: ShinyUiNode
): node is GridContainerNode {
  return validGridContainerNodeNames.includes(node.id);
}
