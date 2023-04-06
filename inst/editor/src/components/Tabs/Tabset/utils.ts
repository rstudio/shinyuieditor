import { isValidTabPanel } from "../../../Shiny-Ui-Elements/ShinyTabPanel/isValidTabPanel";
import type {
  ShinyUiNode,
  ShinyUiParentNode,
} from "../../../Shiny-Ui-Elements/uiNodeTypes";

export function getTabPanelTitle(node: ShinyUiNode): string | null {
  if (isValidTabPanel(node)) {
    return node.namedArgs.title;
  }
  return null;
}

export function getTabNames({ children }: ShinyUiParentNode): string[] {
  let titles: string[] = [];

  children?.forEach((child) => {
    const panelTitle = getTabPanelTitle(child);
    if (panelTitle) titles.push(panelTitle);
  });

  return titles;
}

export function getFirstTabName({ children }: ShinyUiParentNode): string {
  const firstChild = children?.[0];
  if (!firstChild) return "First Tab";
  return getTabPanelTitle(firstChild) ?? "First Tab";
}
