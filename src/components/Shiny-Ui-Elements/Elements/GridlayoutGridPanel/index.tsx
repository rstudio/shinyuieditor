import classes from "./styles.module.css";

export type GridPanelSettings = {
  area?: string;
  horizontalAlign?: "left" | "center" | "right";
  verticalAlign?: "top" | "center" | "bottom";
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
          "--verticalAlign": dirToFlexProp[settings.verticalAlign ?? "center"],
          "--horizontalAlign":
            dirToFlexProp[settings.horizontalAlign ?? "center"],
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
