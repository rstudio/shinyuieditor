import * as React from "react";

import produce from "immer";

import type { TemplatedGridProps } from "..";

import classes from "./resizableGrid.module.css";
import { TractInfoDisplay } from "./TractInfoDisplay";
import type { TractInfo } from "./useDragToResizeGrid";
import { useDragToResizeGrid } from "./useDragToResizeGrid";
import {
  buildRange,
  columnIsBeingResized,
  layoutDefToStyles,
  rowIsBeingResized,
} from "./utils";

function EditableGridContainer({
  className,
  children,
  onNewLayout,
  ...layout
}: {
  className?: string;
  children?: React.ReactNode;
  onNewLayout: (layout: TemplatedGridProps) => void;
} & TemplatedGridProps) {
  const { rowSizes, colSizes } = layout;
  const containerRef = React.useRef<HTMLDivElement>(null);
  const styles = layoutDefToStyles(layout);

  const columnTractIndices = buildRange(1, colSizes.length);
  const rowTractIndices = buildRange(1, rowSizes.length);
  const [, ...columnSizers] = columnTractIndices;
  const [, ...rowSizers] = rowTractIndices;

  const { startDrag, onTractHover, dragStatus, onTractMouseOut } =
    useDragToResizeGrid({
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
          onMouseOver={(e) =>
            onTractHover({ e, dir: "columns", index: gap_index })
          }
          onMouseOut={onTractMouseOut}
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
          onMouseOver={(e) =>
            onTractHover({ e, dir: "rows", index: gap_index })
          }
          onMouseOut={onTractMouseOut}
          className={classes.rowSizer}
          style={{ gridRow: gap_index }}
        />
      ))}

      {children}
      {colSizes.map((size, column_i) => {
        const resized_size = columnIsBeingResized(dragStatus, column_i);

        return (
          <TractInfoDisplay
            key={"col" + column_i}
            index={column_i}
            dir="columns"
            size={resized_size === false ? size : resized_size.current_size}
            show={resized_size !== false}
            onChange={(s) =>
              onNewLayout(
                updateTractSize(layout, {
                  dir: "columns",
                  index: column_i,
                  size: s,
                })
              )
            }
          />
        );
      })}
      {rowSizes.map((size, row_i) => {
        const resized_size = rowIsBeingResized(dragStatus, row_i);

        return (
          <TractInfoDisplay
            key={"row" + row_i}
            index={row_i}
            dir="rows"
            size={resized_size === false ? size : resized_size.current_size}
            show={resized_size !== false}
            onChange={(s) =>
              onNewLayout(
                updateTractSize(layout, {
                  dir: "rows",
                  index: row_i,
                  size: s,
                })
              )
            }
          />
        );
      })}
    </div>
  );
}

function updateTractSize(
  layout: TemplatedGridProps,
  { dir, index, size }: TractInfo
): TemplatedGridProps {
  return produce(layout, (updatedLayout) => {
    updatedLayout[dir === "rows" ? "rowSizes" : "colSizes"][index] = size;
  });
}

function TractInfoField({ dir, index, size }: TractInfo) {
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
