import { isValidTabPanel } from "Shiny-Ui-Elements/ShinyTabPanel/isValidTabPanel";
import type { ShinyUiNode } from "Shiny-Ui-Elements/uiNodeTypes";

export function getTabPanelTitle(node: ShinyUiNode): string | null {
  if (isValidTabPanel(node)) {
    return node.uiArguments.title;
  }
  return null;
}

export function getTabNames({ uiChildren }: ShinyUiNode): string[] {
  const titles = uiChildren?.map(
    (child) => getTabPanelTitle(child) ?? "failed"
  );
  if (!titles) return ["failed to find child tab titles"];
  return titles;
}

export function getFirstTabName({ uiChildren }: ShinyUiNode): string {
  const firstChild = uiChildren?.[0];
  if (!firstChild) return "failed";
  return getTabPanelTitle(firstChild) ?? "failed";
}
