import { nodeInfoFactory } from "../nodeInfoFactory";
import type { ShinyUiParentNode, ShinyUiNode } from "../ShinyUiNode";

export const page_navbar = nodeInfoFactory<{
  title: string;
  collapsible: boolean;
  id?: string;
  selected?: string;
  theme?: unknown;
}>()({
  id: "navbarPage",
  r_info: {
    fn_name: "navbarPage",
    package: "shiny",
  },
  py_info: {
    fn_name: "ui.page_navbar",
    package: "shiny",
  },
  title: "Navbar Page",
  takesChildren: true,
  settingsInfo: {
    title: {
      inputType: "string",
      label: "Page title",
      defaultValue: "navbar-page",
    },
    collapsible: {
      label: "Collapse navigation on mobile",
      inputType: "boolean",
      defaultValue: false,
    },
    id: {
      inputType: "string",
      label: "Id for tabset",
      defaultValue: "tabset-default-id",
      optional: true,
    },
    selected: {
      inputType: "dropdown",
      optional: true,
      label: "Selected tab on load",
      defaultValue: (node) =>
        node ? getFirstTabName(node as ShinyUiParentNode) : "First Tab",
      choices: (node) =>
        node ? getTabNames(node as ShinyUiParentNode) : ["First Tab"],
    },
    theme: { inputType: "omitted", optional: true },
  },
  // iconSrc: icon,
  category: "layouts",
  description: "Layout an app with tab-based navigation",
});

export function getTabPanelTitle(node: ShinyUiNode): string | null {
  // if (isValidTabPanel(node)) {
  // return node.namedArgs.title;
  // }
  // TODO: Resetup the isValidTabPanel function
  if ("title" in node.namedArgs && typeof node.namedArgs.title === "string") {
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
