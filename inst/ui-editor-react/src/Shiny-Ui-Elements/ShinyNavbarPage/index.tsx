// import icon from "assets/icons/tabsetPanel.png";

import type { DynamicFormInfo } from "components/Inputs/SettingsFormBuilder/inputFieldTypes";
import { getFirstTabName, getTabNames } from "components/Tabs/Tabset/utils";

import type { UiComponentInfo } from "../uiNodeTypes";

import { ShinyNavbarPageSettings } from "./SettingsPanel";
import ShinyNavbarPage from "./ShinyNavbarPage";

export const NavbarPageSettingsInfo: DynamicFormInfo = {
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
    inputType: "optionsDropdown",
    optional: true,
    label: "Selected tab on load",
    defaultValue: getFirstTabName,
    choices: getTabNames,
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
