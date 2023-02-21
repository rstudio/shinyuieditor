import { getDefaultSettings } from "../../components/Inputs/SettingsFormBuilder/buildStaticSettingsInfo";
import type { ShinyUiNode } from "../uiNodeTypes";

import { shinyTabPanelInfo } from ".";

export const newTabPanelNode: ShinyUiNode = {
  uiName: "shiny::tabPanel",
  uiArguments: getDefaultSettings(shinyTabPanelInfo.settingsInfo),
  uiChildren: [],
};
