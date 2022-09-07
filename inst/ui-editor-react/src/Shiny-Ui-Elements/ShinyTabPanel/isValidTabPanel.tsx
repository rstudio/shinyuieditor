import type {
  ShinyUiNode,
  ShinyUiNodeByName,
} from "Shiny-Ui-Elements/uiNodeTypes";

// Not a fan of having to replicate the names across two instances here but
// right now I can't figure out a more elegant way to do it
const validTabPanels = ["shiny::tabPanel", "gridlayout::grid_tab_panel"];

type ValidTabPanels = ShinyUiNodeByName[
  | "gridlayout::grid_tab_panel"
  | "shiny::tabPanel"];

/**
 * Is a ui node a valid tab panel? Aka can it be used as a direct child of a
 * tabset?
 * @param node ShinyUiNode
 * @returns Boolean value of if node is a tab panel
 */
export function isValidTabPanel(node: ShinyUiNode): node is ValidTabPanels {
  return validTabPanels.includes(node.uiName);
}
