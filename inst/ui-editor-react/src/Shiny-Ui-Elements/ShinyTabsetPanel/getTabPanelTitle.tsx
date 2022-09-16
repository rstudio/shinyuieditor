import { isValidTabPanel } from "Shiny-Ui-Elements/ShinyTabPanel/isValidTabPanel";
import { ShinyUiNode } from "Shiny-Ui-Elements/uiNodeTypes";

export function getTabPanelTitle(node: ShinyUiNode): string | null {
  if (isValidTabPanel(node)) {
    return node.uiArguments.title;
  }
  return null;
}
