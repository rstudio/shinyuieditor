import type { ShinyUiNode } from "../../main";
import type {
  ShinyUiNodeByName,
  ShinyUiNames,
} from "../../Shiny-Ui-Elements/uiNodeTypes";

export type GridItemNode = ShinyUiNodeByName[
  | "gridlayout::grid_card"
  | "gridlayout::grid_card_text"
  | "gridlayout::grid_card_plot"];

const gridItemNodes: ShinyUiNames[] = [
  "gridlayout::grid_card_text",
  "gridlayout::grid_card",
  "gridlayout::grid_card_panel",
  "gridlayout::grid_card_plot",
];

export function isValidGridItem(node: ShinyUiNode): node is GridItemNode {
  return gridItemNodes.includes(node.uiName);
}
