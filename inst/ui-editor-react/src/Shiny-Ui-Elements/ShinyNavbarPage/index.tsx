import containerIcon from "assets/icons/shinyContainer.png";

import type { UiComponentInfo } from "../uiNodeTypes";

import { ShinyNavbarPageSettings } from "./SettingsPanel";
import ShinyNavbarPage from "./ShinyNavbarPage";

export type NavbarPageSettings = {
  pageTitle: string;
};

export const shinyNavbarPageDefaultSettings: NavbarPageSettings = {
  pageTitle: "My Shiny App",
};

export const shinyNavbarPageInfo: UiComponentInfo<NavbarPageSettings> = {
  title: "Navbar Page",
  UiComponent: ShinyNavbarPage,
  SettingsComponent: ShinyNavbarPageSettings,
  acceptsChildren: true,
  defaultSettings: shinyNavbarPageDefaultSettings,
  iconSrc: containerIcon,
  category: "layouts",
  description: "Layout an app with tab-based navigation",
};

export default shinyNavbarPageInfo;
