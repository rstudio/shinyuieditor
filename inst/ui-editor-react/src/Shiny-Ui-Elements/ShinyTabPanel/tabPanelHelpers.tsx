import { shinyTabPanelDefaultSettings } from "Shiny-Ui-Elements/ShinyTabPanel";
import type {
  ShinyUiNode,
  ShinyUiNodeByName,
} from "Shiny-Ui-Elements/uiNodeTypes";

type TabPanelNode = ShinyUiNodeByName["shiny::tabPanel"];
export function isTabPanelNode(node: ShinyUiNode): node is TabPanelNode {
  return node.uiName === "shiny::tabPanel";
}

export function wrapNodeInTabPanel(node: ShinyUiNode): ShinyUiNode {
  // Already wrapped?
  if (node.uiName === "shiny::tabPanel") return node;

  return {
    ...newTabPanelNode,
    uiChildren: [node],
  };
}

export const newTabPanelNode: ShinyUiNode = {
  uiName: "shiny::tabPanel",
  uiArguments: shinyTabPanelDefaultSettings,
  uiChildren: [],
};

export function getNamesOfChildTabPanels(containerNode: ShinyUiNode): string[] {
  const childNodes = containerNode.uiChildren;
  if (!childNodes) return [];

  return childNodes.map((child) => {
    if (child.uiName !== "shiny::tabPanel") return "";

    return child.uiArguments.title;
  });
}
