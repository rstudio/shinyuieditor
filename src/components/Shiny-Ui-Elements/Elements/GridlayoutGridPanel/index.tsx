import classes from "./styles.module.css";

export type GridPanelSettings = {
  area?: string;
  horizontalAlign?: "left" | "center" | "right";
  verticalAlign?: "top" | "center" | "bottom";
};

const GridlayoutGridPanel: React.FC<GridPanelSettings> = ({
  children,
  ...settings
}) => {
  return (
    <div
      className={classes.container}
      style={
        {
          gridArea: settings.area,
          "--verticalAlign": dirToFlexProp[settings.verticalAlign ?? "center"],
          "--horizontalAlign":
            dirToFlexProp[settings.horizontalAlign ?? "center"],
        } as React.CSSProperties
      }
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
