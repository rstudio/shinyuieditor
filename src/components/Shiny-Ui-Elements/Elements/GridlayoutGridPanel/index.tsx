import { UiNodeComponent } from "../uiComponentAndSettings";
import { UiComponentInfo } from "../UiComponentInfo";
import { GridlayoutGridPanelSettings } from "./SettingsPanel";
import containerIcon from "assets/icons/shinyContainer.png";

import classes from "./styles.module.css";

export type HorizontalAlignments = "left" | "center" | "right" | "spread";
export type VerticalAlignments = "top" | "center" | "bottom" | "spread";
export type GridPanelSettings = {
  area?: string;
  horizontalAlign?: HorizontalAlignments;
  verticalAlign?: VerticalAlignments;
};

const GridlayoutGridPanel: UiNodeComponent<GridPanelSettings> = ({
  uiArguments,
  children,
  ...passthroughProps
}) => {
  const { area, verticalAlign, horizontalAlign } = uiArguments;
  return (
    <div
      className={classes.container}
      style={{
        gridArea: area,
        justifyContent: dirToFlexProp[horizontalAlign ?? "spread"],
        alignContent: dirToFlexProp[verticalAlign ?? "spread"],
      }}
      {...passthroughProps}
    >
      {children}
    </div>
  );
};

const dirToFlexProp: Record<HorizontalAlignments | VerticalAlignments, string> =
  {
    center: "center",
    left: "start",
    top: "start",
    right: "end",
    bottom: "end",
    spread: "space-evenly",
  };

export const gridLayoutGridPanelInfo: UiComponentInfo<GridPanelSettings> = {
  title: "Vertical Stack Panel",
  UiComponent: GridlayoutGridPanel,
  SettingsComponent: GridlayoutGridPanelSettings,
  acceptsChildren: true,
  defaultSettings: {
    area: "default-grid-panel-area",
    verticalAlign: "center",
    horizontalAlign: "center",
  },
  iconSrc: containerIcon,
};

export default GridlayoutGridPanel;
