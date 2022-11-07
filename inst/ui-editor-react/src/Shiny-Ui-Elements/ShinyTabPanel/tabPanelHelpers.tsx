import { getDefaultSettings } from "components/Inputs/SettingsFormBuilder/buildStaticSettingsInfo";
import type { ShinyUiNode } from "Shiny-Ui-Elements/uiNodeTypes";

import { shinyTabPanelInfo } from ".";

import { isValidTabPanel } from "./isValidTabPanel";

export function wrapNodeInTabPanel(node: ShinyUiNode): ShinyUiNode {
  // Already wrapped?
  if (isValidTabPanel(node)) return node;

  return {
    ...newTabPanelNode,
    uiChildren: [node],
  };
}

export const newTabPanelNode: ShinyUiNode = {
  uiName: "shiny::tabPanel",
  uiArguments: getDefaultSettings(shinyTabPanelInfo.settingsInfo),
  uiChildren: [],
};
