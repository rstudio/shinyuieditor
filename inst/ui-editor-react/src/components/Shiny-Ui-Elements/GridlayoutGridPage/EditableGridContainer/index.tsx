import * as React from "react";

import type { CSSMeasure } from "CSSMeasure";

import { getHasRelativeUnits } from "./dragToResizeHelpers";
import classes from "./resizableGrid.module.css";
import { useDragToResizeGrid } from "./useDragToResizeGrid";

export type GridLayoutDef = {
  areas: string[][];
  rowSizes: string[];
  colSizes: string[];
  gapSize: CSSMeasure;
};

function EditableGridContainer({
  className,
  children,
  areas,
  rowSizes,
  colSizes,
  gapSize,
}: {
  className?: string;
  children?: React.ReactNode;
} & GridLayoutDef) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const styles = {
    gridTemplateAreas: areas.map((x) => `"${x.join(" ")}"`).join(" \n "),
    gridTemplateRows: rowSizes.join(" "),
    gridTemplateColumns: colSizes.join(" "),
    "--grid-gap": gapSize,
  } as React.CSSProperties;

  // Build indices of the sizers needed. If there is only a single tract then no
  // resizers are needed.
  const hasRelativeRows = getHasRelativeUnits(rowSizes);

  const columnSizers =
    colSizes.length > 1 ? buildRange(2, colSizes.length) : [];
  const rowSizers =
    rowSizes.length > 1
      ? buildRange(2, rowSizes.length + (hasRelativeRows ? 0 : 1))
      : [];

  const { startDrag } = useDragToResizeGrid({
    containerRef,
  });

  const containerClasses = [classes.ResizableGrid];
  if (className) containerClasses.push(className);

  return (
    <div
      className={containerClasses.join(" ")}
      ref={containerRef}
      style={styles}
    >
      {columnSizers.map((gap_index) => (
        <div
          key={"col" + gap_index}
          className={classes.columnSizer}
          onMouseDown={(e) =>
            startDrag({ e, dir: "columns", index: gap_index })
          }
          style={{
            gridColumn: gap_index,
          }}
        />
      ))}
      {rowSizers.map((gap_index) => (
        <div
          key={"row" + gap_index}
          onMouseDown={(e) => startDrag({ e, dir: "rows", index: gap_index })}
          className={classes.rowSizer}
          style={{
            gridRow: gap_index,
          }}
        />
      ))}
      {children}
    </div>
  );
}

function buildRange(from: number, to: number): number[] {
  const numEls = Math.abs(to - from) + 1;
  const step = from < to ? 1 : -1;
  return Array.from({ length: numEls }, (_, i) => from + i * step);
}

export default EditableGridContainer;
