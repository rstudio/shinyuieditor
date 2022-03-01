import * as React from "react";
import { UiNodeComponent } from "../uiComponentAndSettings";
import { UiComponentInfo } from "../UiComponentInfo";
import { GridlayoutTitlePanelSettings } from "./SettingsPanel";
import classes from "./styles.module.css";
import textIcon from "assets/icons/shinyText.png";

export interface GridlayoutTitlePanelProps {
  title: string;
  area?: string;
}

const GridlayoutTitlePanel: UiNodeComponent<GridlayoutTitlePanelProps> = ({
  uiArguments: { title, area },
  children,
  ...passthroughProps
}) => {
  return (
    <div
      className={classes.titlePanel + " gridlayout-titlePanel"}
      style={{ gridArea: area }}
      aria-label={"gridlayout-titlePanel"}
      {...passthroughProps}
    >
      <h1>{title}</h1>
      {children}
    </div>
  );
};

export const gridlayoutTitlePanelInfo: UiComponentInfo<GridlayoutTitlePanelProps> =
  {
    title: "Vertical Stack Panel",
    UiComponent: GridlayoutTitlePanel,
    SettingsComponent: GridlayoutTitlePanelSettings,
    acceptsChildren: false,
    defaultSettings: { title: "Title from Chooser" },
    iconSrc: textIcon,
  };

export default GridlayoutTitlePanel;
