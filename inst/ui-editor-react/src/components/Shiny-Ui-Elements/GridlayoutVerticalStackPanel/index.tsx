import containerIcon from "assets/icons/shinyContainer.png";
import type { CSSMeasure } from "CSSMeasure";

import type { UiComponentInfo } from "../uiNodeTypes";

import GridlayoutVerticalStackPanel from "./GridlayoutVerticalStackPanel";
import { GridlayoutVerticalStackPanelSettings } from "./SettingsPanel";

export type AlignmentOptions = "top" | "center" | "bottom" | "spread";
export type VerticalStackPanelSettings = {
  area: string;
  title?: string;
  item_alignment?: AlignmentOptions;
  item_gap?: CSSMeasure;
};

export const gridlayoutVerticalStackPanelDefaultSettings: VerticalStackPanelSettings =
  {
    area: "default-area",
    item_alignment: "top",
    item_gap: "12px",
  };

export const gridlayoutVerticalStackPanelInfo: UiComponentInfo<VerticalStackPanelSettings> =
  {
    title: "Stack Panel",
    UiComponent: GridlayoutVerticalStackPanel,
    SettingsComponent: GridlayoutVerticalStackPanelSettings,
    acceptsChildren: true,
    defaultSettings: gridlayoutVerticalStackPanelDefaultSettings,
    iconSrc: containerIcon,
    category: "gridlayout",
  };

export default GridlayoutVerticalStackPanel;
