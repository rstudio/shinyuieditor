import containerIcon from "assets/icons/shinyContainer.png";
import { CSSMeasure } from "GridTypes";

import { UiComponentInfo } from "../uiNodeTypes";
import GridlayoutVerticalStackPanel from "./GridlayoutVerticalStackPanel";
import { GridlayoutVerticalStackPanelSettings } from "./SettingsPanel";

export type AlignmentOptions = "top" | "center" | "bottom" | "spread";
export type VerticalStackPanelSettings = {
  area: string;
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
    title: "Vertical Stack Panel",
    UiComponent: GridlayoutVerticalStackPanel,
    SettingsComponent: GridlayoutVerticalStackPanelSettings,
    acceptsChildren: true,
    defaultSettings: {
      area: "default-area",
      item_alignment: "top",
      item_gap: "12px",
    },
    iconSrc: containerIcon,
  };

export default GridlayoutVerticalStackPanel;
