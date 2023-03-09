// import icon from "../../assets/icons/tabsetPanel.png";

import {
  getFirstTabName,
  getTabNames,
} from "../../components/Tabs/Tabset/utils";
import { nodeInfoFactory } from "../ShinyActionButton/makeUiNodeInfo";
import type { ShinyUiParentNode } from "../uiNodeTypes";

import ShinyNavbarPage from "./ShinyNavbarPage";

export type NavbarPageSettings = {
  title: string;
  collapsible: boolean;
  id?: string;
  selected?: string;
  theme?: unknown;
};

export const shinyNavbarPageInfo = nodeInfoFactory<NavbarPageSettings>()({
  library: "shiny",
  name: "navbarPage",
  title: "Navbar Page",
  UiComponent: ShinyNavbarPage,
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
  acceptsChildren: true,
  // iconSrc: icon,
  category: "layouts",
  description: "Layout an app with tab-based navigation",
});
