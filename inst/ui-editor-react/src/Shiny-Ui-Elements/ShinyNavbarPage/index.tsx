// import icon from "assets/icons/tabsetPanel.png";

import type { DynamicSettingsInfo } from "components/Inputs/SettingsFormBuilder/NodeSettingsFormBuilder";
import { getTabPanelTitle } from "Shiny-Ui-Elements/ShinyTabsetPanel/getTabPanelTitle";

import type { UiComponentInfo } from "../uiNodeTypes";

import { ShinyNavbarPageSettings } from "./SettingsPanel";
import ShinyNavbarPage from "./ShinyNavbarPage";

export const NavbarPageSettingsInfo: DynamicSettingsInfo = {
  title: {
    type: "string",
    label: "Page title",
    defaultValue: "navbar-page",
  },
  id: {
    type: "string",
    label: "Id for tabset",
    defaultValue: "tabset-default-id",
    optional: true,
  },
  collapsible: {
    label: "Allow menu to collapse?",
    type: "boolean",
    defaultValue: false,
  },
  selected: {
    type: "optionsDropdown",
    optional: true,
    label: "Selected tab on load",
    defaultValue: ({ uiChildren }) => {
      const firstChild = uiChildren?.[0];
      if (!firstChild) return "failed";
      return getTabPanelTitle(firstChild) ?? "failed";
    },
    choices: ({ uiChildren }) => {
      const titles = uiChildren?.map(
        (child) => getTabPanelTitle(child) ?? "failed"
      );
      if (!titles) return ["failed to find child tab titles"];
      return titles;
    },
  },
};

export type NavbarPageSettings = {
  title: string;
  collapsible: boolean;
  id?: string;
  selected?: string;
};

export const shinyNavbarPageDefaultSettings: NavbarPageSettings = {
  title: "My Shiny App",
  collapsible: false,
};

export const shinyNavbarPageInfo: UiComponentInfo<NavbarPageSettings> = {
  title: "Navbar Page",
  UiComponent: ShinyNavbarPage,
  settingsInfo: NavbarPageSettingsInfo,
  SettingsComponent: ShinyNavbarPageSettings,
  acceptsChildren: true,
  defaultSettings: shinyNavbarPageDefaultSettings,
  // iconSrc: icon,
  category: "layouts",
  description: "Layout an app with tab-based navigation",
};
