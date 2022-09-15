// import icon from "assets/icons/tabsetPanel.png";

import type {
  SettingsInfo,
  SettingsObj,
} from "components/Inputs/SettingsFormBuilder/ArgumentInfo";

import type { UiComponentInfo } from "../uiNodeTypes";

import { ShinyNavbarPageSettings } from "./SettingsPanel";
import ShinyNavbarPage from "./ShinyNavbarPage";

export const NavbarPageSettingsInfo: SettingsInfo = {
  title: {
    type: "string",
    defaultValue: "My Shiny App",
  },
  collapsible: {
    type: "boolean",
    defaultValue: false,
  },
  id: {
    type: "string",
    defaultValue: "navbar",
    requiredOrOptional: "optional",
  },
  selected: {
    type: "optionsDropdown",
    defaultValue: "tab 1",
    requiredOrOptional: "optional",
    options: {
      choices: ["tab 1"],
    },
  },
};

export type NavbarPageSettings = {
  title: string;
  collapsible: boolean;
  id?: string;
  selected?: string;
};

export const shinyNavbarPageDefaultSettings: SettingsObj<
  typeof NavbarPageSettingsInfo
> = {
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
