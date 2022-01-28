import { UiNodeComponent } from "../uiComponentAndSettings";
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
export default GridlayoutGridPanel;
