import { CSSMeasure } from "GridTypes";
import React from "react";
import { UiNodeComponent } from "../uiComponentAndSettings";
import { GridlayoutVerticalStackPanelSettings } from "./SettingsPanel";
import classes from "./styles.module.css";
import containerIcon from "assets/icons/shinyContainer.png";
import { UiComponentInfo } from "../UiComponentInfo";

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

const GridlayoutVerticalStackPanel: UiNodeComponent<
  VerticalStackPanelSettings
> = (props) => {
  console.log("Vertical Stack Panel", props);
  const { uiArguments, children, ...passthroughProps } = props;
  const { area, item_alignment, item_gap } = uiArguments;
  return (
    <div
      className={classes.container}
      style={
        {
          gridArea: area,
          justifyContent: dirToFlexProp[item_alignment ?? "top"],
          "--item-gap": item_gap,
        } as React.CSSProperties
      }
      {...passthroughProps}
    >
      {children}
    </div>
  );
};

const dirToFlexProp: Record<
  AlignmentOptions,
  React.CSSProperties["justifyContent"]
> = {
  top: "flex-start",
  center: "center",
  bottom: "flex-end",
  spread: "space-evenly",
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
