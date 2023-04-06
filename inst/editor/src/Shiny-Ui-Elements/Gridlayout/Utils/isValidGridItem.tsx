import type { UnionToTuple } from "util-functions/src/TypescriptUtils";

import type { KnownShinyUiNode, ShinyUiNode } from "../../uiNodeTypes";

export type GridItemNode = Extract<
  KnownShinyUiNode,
  { id: `gridlayout::${string}`; namedArgs: { area: string } }
>;

const gridAwareNodeNamesTuple: UnionToTuple<GridItemNode["id"]> = [
  "gridlayout::grid_card",
  "gridlayout::grid_card_text",
  "gridlayout::grid_card_plot",
];

// Place in a set so our checking of the node name is O(1)
const gridItemNodes = new Set(gridAwareNodeNamesTuple);

export function isValidGridItem(node: ShinyUiNode): node is GridItemNode {
  return gridItemNodes.has(node.id as GridItemNode["id"]);
}
