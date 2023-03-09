import type {
  ShinyUiNodeByName,
  ShinyUiNames,
  ShinyUiNode,
} from "../../uiNodeTypes";

export type GridItemNode = ShinyUiNodeByName[
  | "gridlayout::grid_card"
  | "gridlayout::grid_card_text"
  | "gridlayout::grid_card_plot"];

const gridItemNodes: ShinyUiNames[] = [
  "gridlayout::grid_card_text",
  "gridlayout::grid_card",
  "gridlayout::grid_card_plot",
];

export function isValidGridItem(node: ShinyUiNode): node is GridItemNode {
  return gridItemNodes.includes(node.uiName as ShinyUiNames);
}
