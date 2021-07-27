import { FunctionComponent } from "preact";
import { GridLayoutDef } from "../../types";
import classes from "./style.module.css";

export const GridContainer: FunctionComponent<{
  defs: GridLayoutDef;
  className?: string;
}> = ({ defs: { cols, rows, gap }, children, className }) => {
  const styles: JSX.CSSProperties = {
    "--gap": gap,
  };
  if (cols) styles.gridTemplateColumns = cols.join(" ");
  if (rows) styles.gridTemplateRows = rows.join(" ");

  let containerClass = classes.container;
  if (className) containerClass += " " + className;

  return (
    <div class={containerClass} style={styles}>
      {children}
    </div>
  );
};
