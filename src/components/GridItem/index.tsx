import { FunctionComponent, Ref } from "preact";
import { makeColPos, makeRowPos } from "../../helper-scripts/grid-helpers";

export const GridItem: FunctionComponent<{
  startRow?: number;
  endRow?: number;
  startCol?: number;
  endCol?: number;
  gridArea?: string;
  className?: string;
  styles?: JSX.CSSProperties;
  divRef?: Ref<HTMLDivElement | undefined>;
}> = ({
  startRow,
  endRow,
  startCol,
  endCol,
  gridArea,
  className,
  styles: extraStyles,
  children,
  divRef,
}) => {
  const styles = { ...extraStyles };

  if (startRow && startCol) {
    styles.gridRow = makeRowPos({ startRow, endRow });
    styles.gridColumn = makeColPos({ startCol, endCol });
  } else if (gridArea) {
    styles.gridArea = gridArea;
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
