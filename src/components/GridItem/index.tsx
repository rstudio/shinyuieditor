import { FunctionComponent } from "preact";

export const GridItem: FunctionComponent<{
  rows?: [number, number];
  cols?: [number, number];
  gridArea?: string;
  className?: string;
  styles?: JSX.CSSProperties;
}> = ({ rows, cols, gridArea, className, styles: extraStyles, children }) => {
  const styles = { ...extraStyles };

  if (gridArea && !rows && !cols) {
    styles.gridArea = gridArea;
  } else if (rows && cols && !gridArea) {
    styles.gridRow = rows.join("/");
    styles.gridColumn = cols.join("/");
  } else {
    console.error(
      "You need to provide one of rows and cols or gridArea for GridItem"
    );
  }
  return (
    <div className={className} style={styles}>
      {children}
    </div>
  );
};
