import * as React from "react";

import type { CSSMeasure } from "CSSMeasure";

import { AreaControls } from "./AreaControls";
import { getHasRelativeUnits } from "./dragToResizeHelpers";
import classes from "./resizableGrid.module.css";
import type { TractInfo } from "./useDragToResizeGrid";
import { useDragToResizeGrid } from "./useDragToResizeGrid";
import { buildRange, layoutDefToStyles } from "./utils";

export type GridLayoutDef = {
  areas: string[][];
  rowSizes: string[];
  colSizes: string[];
  gapSize: CSSMeasure;
};

function EditableGridContainer({
  className,
  children,
  onNewLayout,
  ...layout
}: {
  className?: string;
  children?: React.ReactNode;
  onNewLayout: (layout: GridLayoutDef) => void;
} & GridLayoutDef) {
  const { rowSizes, colSizes } = layout;
  const containerRef = React.useRef<HTMLDivElement>(null);
  const styles = layoutDefToStyles(layout);

  // Build indices of the sizers needed. If there is only a single tract then no
  // resizers are needed.
  const hasRelativeRows = getHasRelativeUnits(rowSizes);

  const columnSizers =
    colSizes.length > 1 ? buildRange(2, colSizes.length) : [];
  const rowSizers =
    rowSizes.length > 1
      ? buildRange(2, rowSizes.length + (hasRelativeRows ? 0 : 1))
      : [];

  const areasInLayout = getAreasInLayout(layout);
  const { startDrag, dragStatus } = useDragToResizeGrid({
    containerRef,
    onDragEnd: onNewLayout,
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
          style={{ gridColumn: gap_index }}
        />
      ))}
      {rowSizers.map((gap_index) => (
        <div
          key={"row" + gap_index}
          onMouseDown={(e) => startDrag({ e, dir: "rows", index: gap_index })}
          className={classes.rowSizer}
          style={{ gridRow: gap_index }}
        />
      ))}
      {areasInLayout.map((area) => (
        <AreaControls key={area} area={area} />
      ))}
      {children}
      {dragStatus.status === "dragging" ? (
        <>
          <TractInfoDisplay {...dragStatus.tracts[0]} />
          <TractInfoDisplay {...dragStatus.tracts[1]} />
        </>
      ) : null}
    </div>
  );
}

function getAreasInLayout({ areas }: Pick<GridLayoutDef, "areas">): string[] {
  const seenAreas = new Set<string>();

  const num_rows = areas.length;
  const num_cols = areas[0].length;
  for (let row_index = 0; row_index < num_rows; row_index++) {
    const row = areas[row_index];
    for (let col_index = 0; col_index < num_cols; col_index++) {
      const area_name = row[col_index];
      if (area_name !== ".") {
        seenAreas.add(row[col_index]);
      }
    }
  }

  return [...seenAreas];
}

function TractInfoDisplay({ dir, index, size }: TractInfo) {
  return (
    <div
      className={classes.tractInfoDisplay}
      data-drag-dir={dir}
      style={
        {
          "--tract-index": index + 1,
        } as React.CSSProperties
      }
    >
      {size}
    </div>
  );
}

export default EditableGridContainer;
