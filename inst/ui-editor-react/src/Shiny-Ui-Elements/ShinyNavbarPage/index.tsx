// import icon from "assets/icons/tabsetPanel.png";

import type { DynamicFormInfo } from "components/Inputs/SettingsFormBuilder/inputFieldTypes";
import { getTabPanelTitle } from "components/Tabs/Tabset/utils";

import type { UiComponentInfo } from "../uiNodeTypes";

import { ShinyNavbarPageSettings } from "./SettingsPanel";
import ShinyNavbarPage from "./ShinyNavbarPage";

export const NavbarPageSettingsInfo: DynamicFormInfo = {
  title: {
    inputType: "string",
    label: "Page title",
    defaultValue: "navbar-page",
  },
  id: {
    inputType: "string",
    label: "Id for tabset",
    defaultValue: "tabset-default-id",
    optional: true,
  },
  collapsible: {
    label: "Allow menu to collapse?",
    inputType: "boolean",
    defaultValue: false,
  },
  selected: {
    inputType: "optionsDropdown",
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
