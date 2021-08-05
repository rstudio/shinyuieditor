import { FunctionComponent, Ref } from "preact";
import { GridLayoutDef } from "../../types";
import classes from "./style.module.css";

export const GridContainer: FunctionComponent<{
  defs: GridLayoutDef;
  className?: string;
  styles?: JSX.CSSProperties;
  divRef?: Ref<HTMLDivElement>;
}> = ({
  defs: { cols, rows, gap },
  children,
  className,
  styles: extraStyles,
  divRef,
}) => {
  const styles: JSX.CSSProperties = {
    ...extraStyles,
    "--gap": gap,
  };
  if (cols) styles.gridTemplateColumns = cols.join(" ");
  if (rows) styles.gridTemplateRows = rows.join(" ");

  const containerClass = classes.container + (className ? " " + className : "");

  return (
    <div ref={divRef} className={containerClass} style={styles}>
      {children}
    </div>
  );
};

export const TwoColumnGrid: FunctionComponent = ({ children }) => {
  return (
    <GridContainer
      defs={{ cols: ["1fr", "1fr"], gap: "0.5rem" }}
      styles={{ alignItems: "center" }}
    >
      {children}
    </GridContainer>
  );
};
