import { UiNodeComponent } from "../uiComponentAndSettings";
import {
  GridPanelSettings,
  HorizontalAlignments,
  VerticalAlignments,
} from "./index";
import classes from "./styles.module.css";

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

export default GridlayoutGridPanel;

const dirToFlexProp: Record<HorizontalAlignments | VerticalAlignments, string> =
  {
    center: "center",
    left: "start",
    top: "start",
    right: "end",
    bottom: "end",
    spread: "space-evenly",
  };
