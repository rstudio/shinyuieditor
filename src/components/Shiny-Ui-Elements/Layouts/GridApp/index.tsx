/** @jsxImportSource @emotion/react */

import { GridLayoutAction } from "components/Shiny-Ui-Elements/Elements/GridlayoutGridPage/gridLayoutReducer";
import { GridLocString } from "GridTypes";
import * as React from "react";
import { ItemBoundingBox } from "utils/overlap-helpers";
import { UiNodeProps } from "../../uiNodeTypes";

export type Panels = Record<string, UiNodeProps>;

export type GridCellBounds = Record<GridLocString, ItemBoundingBox>;
export type CellLocRef = React.MutableRefObject<GridCellBounds>;
export type EditMode = "UI" | "Layout";

export const LayoutDispatchContext =
  React.createContext<React.Dispatch<GridLayoutAction> | null>(null);
