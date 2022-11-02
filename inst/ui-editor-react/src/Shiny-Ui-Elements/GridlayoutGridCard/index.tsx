import containerIcon from "assets/icons/shinyContainer.png";
import type { CSSMeasure } from "components/Inputs/CSSUnitInput/CSSMeasure";

import type { UiComponentInfo } from "../uiNodeTypes";

import GridlayoutGridCard from "./GridlayoutGridCard";

export type AlignmentOptions = "top" | "center" | "bottom" | "spread";
export type GridCardSettings = {
  area: string;
  title?: string;
  item_gap?: CSSMeasure;
};

export const gridlayoutGridCardInfo: UiComponentInfo<GridCardSettings> = {
  title: "Grid Card",
  UiComponent: GridlayoutGridCard,
  settingsInfo: {
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
      defaultValue: "10px",
      units: ["px", "rem"],
      optional: true,
    },
  },
  acceptsChildren: true,
  iconSrc: containerIcon,
  category: "gridlayout",
  description:
    "The standard element for placing elements on the grid in a simple card container.",
};
