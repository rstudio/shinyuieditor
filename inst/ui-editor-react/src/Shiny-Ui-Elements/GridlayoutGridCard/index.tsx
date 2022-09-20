import containerIcon from "assets/icons/shinyContainer.png";
import type { CSSMeasure } from "components/Inputs/CSSUnitInput/CSSMeasure";
import type { UiNodeSettingsInfo } from "components/Inputs/SettingsFormBuilder/inputFieldTypes";

import type { UiComponentInfo } from "../uiNodeTypes";

import GridlayoutGridCard from "./GridlayoutGridCard";
import { GridlayoutGridCardSettings } from "./SettingsPanel";

export type AlignmentOptions = "top" | "center" | "bottom" | "spread";
export type GridCardSettings = {
  area: string;
  title?: string;
  // item_alignment?: AlignmentOptions;
  item_gap?: CSSMeasure;
};

export const GridCardSettingsInfo: UiNodeSettingsInfo = {
  area: {
    label: "Name of grid area",
    inputType: "string",
    defaultValue: "default-area",
  },
  title: {
    inputType: "string",
    label: "Panel title",
    defaultValue: "My Card",
    optional: true,
  },
  item_gap: {
    inputType: "cssMeasure",
    label: "Gap size between contents",
    defaultValue: "15px",
    units: ["px", "rem"],
  },
};

export const gridlayoutGridCardDefaultSettings: GridCardSettings = {
  area: "default-area",
  // item_alignment: "top",
  item_gap: "12px",
};

export const gridlayoutGridCardInfo: UiComponentInfo<GridCardSettings> = {
  title: "Grid Card",
  UiComponent: GridlayoutGridCard,
  settingsInfo: GridCardSettingsInfo,
  SettingsComponent: GridlayoutGridCardSettings,
  acceptsChildren: true,
  defaultSettings: gridlayoutGridCardDefaultSettings,
  iconSrc: containerIcon,
  category: "gridlayout",
  description:
    "The standard element for placing elements on the grid in a simple card container.",
};
