import classes from "./styles.module.css";

type GridPanelSettings = {
  area?: string;
  horizontalAlign: "left" | "center" | "right";
  verticalAlign: "top" | "center" | "bottom";
};
export default function GridlayoutGridPanel({
  settings,
  children,
  ...divProps
}: {
  settings: GridPanelSettings;
  children: React.ReactNode;
} & /**
 * Used to passthrough callbacks like drag events etc..
 */ React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) {
  return (
    <div
      className={classes.container}
      style={
        {
          gridArea: settings.area,
          "--verticalAlign": dirToFlexProp[settings.verticalAlign],
          "--horizontalAlign": dirToFlexProp[settings.horizontalAlign],
        } as React.CSSProperties
      }
      {...divProps}
    >
      {children}
    </div>
  );
}

const dirToFlexProp = {
  center: "center",
  left: "start",
  top: "start",
  right: "end",
  bottom: "end",
};
