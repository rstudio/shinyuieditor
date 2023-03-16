import type {
  ShinyUiNodeNames,
  MakeShinyUiNode,
  ShinyUiNode,
} from "../../uiNodeTypes";
import type { GridItemSettings } from "../GridlayoutCard";

export type GridItemNode = MakeShinyUiNode<GridItemSettings>;

const gridItemNodes = new Set<ShinyUiNodeNames>([
  "gridlayout::grid_card_text",
  "gridlayout::grid_card",
  "gridlayout::grid_card_plot",
]);

export function isValidGridItem(node: ShinyUiNode): node is GridItemNode {
  return gridItemNodes.has(node.uiName as ShinyUiNodeNames);
}
