import { UiNodeComponent } from "../uiComponentAndSettings";
import classes from "./styles.module.css";

export type GridPanelSettings = {
  area?: string;
  horizontalAlign?: "left" | "center" | "right";
  verticalAlign?: "top" | "center" | "bottom";
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
      style={
        {
          gridArea: area,
          "--verticalAlign": dirToFlexProp[verticalAlign ?? "center"],
          "--horizontalAlign": dirToFlexProp[horizontalAlign ?? "center"],
        } as React.CSSProperties
      }
      {...passthroughProps}
    >
      {children}
    </div>
  );
};

const dirToFlexProp = {
  center: "center",
  left: "start",
  top: "start",
  right: "end",
  bottom: "end",
};
export default GridlayoutGridPanel;
