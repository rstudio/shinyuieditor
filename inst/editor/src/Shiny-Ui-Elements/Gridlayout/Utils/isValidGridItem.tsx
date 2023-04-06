import type { UnionToTuple } from "util-functions/src/TypescriptUtils";

import type {
  KnownShinyUiNode,
  NodeInfoByRPackage,
  ShinyUiNode,
} from "../../uiNodeTypes";

type GridItemNodeIds = Extract<
  NodeInfoByRPackage["gridlayout"],
  { settingsInfo: { area: any } }
>["id"];

export type GridItemNode = Extract<KnownShinyUiNode, { id: GridItemNodeIds }>;

const gridAwareNodeNamesTuple: UnionToTuple<GridItemNodeIds> = [
  "grid_card",
  "grid_card_text",
  "grid_card_plot",
];

// Place in a set so our checking of the node name is O(1)
const gridItemNodes = new Set(gridAwareNodeNamesTuple);

export function isValidGridItem(node: ShinyUiNode): node is GridItemNode {
  return gridItemNodes.has(node.id as GridItemNode["id"]);
}
