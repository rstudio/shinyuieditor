import { isValidTabPanel } from "Shiny-Ui-Elements/ShinyTabPanel/isValidTabPanel";
import type { ShinyUiNode } from "Shiny-Ui-Elements/uiNodeTypes";

export function getTabPanelTitle(node: ShinyUiNode): string | null {
  if (isValidTabPanel(node)) {
    return node.uiArguments.title;
  }
  return null;
}

export function getTabNames({ uiChildren }: ShinyUiNode): string[] {
  let titles: string[] = [];

  uiChildren?.forEach((child) => {
    const panelTitle = getTabPanelTitle(child);
    if (panelTitle) titles.push(panelTitle);
  });

  return titles;
}

export function getFirstTabName({ uiChildren }: ShinyUiNode): string {
  const firstChild = uiChildren?.[0];
  if (!firstChild) return "First Tab";
  return getTabPanelTitle(firstChild) ?? "First Tab";
}
