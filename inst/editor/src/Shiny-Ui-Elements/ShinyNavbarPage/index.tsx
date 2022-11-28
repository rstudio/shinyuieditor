// import icon from "../../assets/icons/tabsetPanel.png";

import {
  getFirstTabName,
  getTabNames,
} from "../../components/Tabs/Tabset/utils";
import type { UiComponentInfo } from "../uiNodeTypes";

import ShinyNavbarPage from "./ShinyNavbarPage";

export type NavbarPageSettings = {
  title: string;
  collapsible: boolean;
  id?: string;
  selected?: string;
};

export const shinyNavbarPageInfo: UiComponentInfo<NavbarPageSettings> = {
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
      defaultValue: (node) => (node ? getFirstTabName(node) : "First Tab"),
      choices: (node) => (node ? getTabNames(node) : ["First Tab"]),
    },
  },
  acceptsChildren: true,
  // iconSrc: icon,
  category: "layouts",
  description: "Layout an app with tab-based navigation",
};
