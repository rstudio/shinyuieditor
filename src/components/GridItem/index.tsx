import { FunctionComponent, Ref } from "preact";

export const GridItem: FunctionComponent<{
  rows?: [number, number];
  cols?: [number, number];
  gridArea?: string;
  className?: string;
  styles?: JSX.CSSProperties;
  divRef?: Ref<HTMLDivElement | undefined>;
}> = ({
  rows,
  cols,
  gridArea,
  className,
  styles: extraStyles,
  children,
  divRef,
}) => {
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
    <div
      ref={divRef as Ref<HTMLDivElement>}
      className={className}
      style={styles}
    >
      {children}
    </div>
  );
};
