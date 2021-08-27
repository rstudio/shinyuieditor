import { ComponentChildren, FunctionComponent, Ref } from "preact";
import { memo } from "preact/compat";
import classes from "./style.module.css";

let GridContainer = ({
  cols,
  rows,
  gap,
  className,
  styles: extraStyles,
  divRef,
  children,
}: {
  cols?: string[];
  rows?: string[];
  gap: string;
  className?: string;
  styles?: JSX.CSSProperties;
  divRef?: Ref<HTMLDivElement>;
  children: ComponentChildren;
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

// GridContainer.displayName = "GridContainer";
GridContainer = memo(GridContainer);

const twoColGridDefs = { cols: ["1fr", "1fr"], gap: "0.5rem" };
const twoColGridStyles = { alignItems: "center" };
const TwoColumnGrid: FunctionComponent = ({ children }) => {
  return (
    <GridContainer {...twoColGridDefs} styles={twoColGridStyles}>
      {children}
    </GridContainer>
  );
};

export { GridContainer, TwoColumnGrid };
