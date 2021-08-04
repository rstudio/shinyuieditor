import { useEffect, useRef } from "preact/hooks";
import type { GridLayoutDef } from "../../types";
import { GridItem } from "../GridItem";
import classes from "./style.module.css";

export function GridCells({
  cols,
  rows,
}: {
  cols: GridLayoutDef["cols"];
  rows: GridLayoutDef["rows"];
}) {
  const numCols = cols?.length ?? 1;
  const numRows = rows?.length ?? 1;

  const gridCells = Array.from({ length: numCols * numRows }).map((_, i) => {
    const iCol = (i % numCols) + 1;
    const iRow = Math.floor(i / numCols) + 1;
    return <GridCell key={{ iCol, iRow }} iCol={iCol} iRow={iRow} />;
  });

  return <>{gridCells}</>;
}

const GridCell = ({ iRow, iCol }: { iRow: number; iCol: number }) => {
  const ref = useRef<HTMLDivElement>();
  const onResize = () => {
    const newBounds = ref.current?.getBoundingClientRect();
    if (newBounds) {
      const { top, left, bottom, right } = newBounds;
      ref.current?.setAttribute(
        "bounds",
        JSON.stringify({ top, left, bottom, right })
      );
    }
  };
  useEffect(() => {
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <GridItem
      divRef={ref}
      key={{ iRow, iCol }}
      className={classes.gridCell + " gridCell"}
      rows={[iRow, iRow]}
      cols={[iCol, iCol]}
    />
  );
};
