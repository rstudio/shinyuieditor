// import containerIcon from "assets/icons/shinyContainer.png";
import type { CSSMeasure } from "CSSMeasure";

import type { UiComponentInfo } from "../uiNodeTypes";

import GridlayoutGridCard from "./GridlayoutGridCard";
import { GridlayoutGridCardSettings } from "./SettingsPanel";

export type AlignmentOptions = "top" | "center" | "bottom" | "spread";
export type GridCardSettings = {
  area: string;
  title?: string;
  item_alignment?: AlignmentOptions;
  item_gap?: CSSMeasure;
};

export const gridlayoutGridCardDefaultSettings: GridCardSettings = {
  area: "default-area",
  item_alignment: "top",
  item_gap: "12px",
};

export const gridlayoutGridCardInfo: UiComponentInfo<GridCardSettings> = {
  title: "Card",
  UiComponent: GridlayoutGridCard,
  SettingsComponent: GridlayoutGridCardSettings,
  acceptsChildren: true,
  defaultSettings: gridlayoutGridCardDefaultSettings,
  // iconSrc: containerIcon,
  category: "gridlayout",
};

export default GridlayoutGridCard;
