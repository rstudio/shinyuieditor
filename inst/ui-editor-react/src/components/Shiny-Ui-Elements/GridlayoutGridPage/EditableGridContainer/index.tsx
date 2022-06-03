import * as React from "react";

import type { CSSMeasure } from "CSSMeasure";
import produce from "immer";
import addTract from "utils/gridTemplates/addTract";
import removeTract from "utils/gridTemplates/removeTract";

import type { TemplatedGridProps } from "..";

import classes from "./resizableGrid.module.css";
import { TractInfoDisplays } from "./TractInfoDisplay";
import type { TractEventListners, TractInfo } from "./useDragToResizeGrid";
import { useDragToResizeGrid } from "./useDragToResizeGrid";
import { buildRange, layoutDefToStyles } from "./utils";

export type TractUpdateAction = { dir: TractInfo["dir"]; index: number } & (
  | { type: "RESIZE"; size: CSSMeasure }
  | { type: "ADD"; index: number }
  | { type: "DELETE" }
);

const NEW_TRACT_SIZE: CSSMeasure = "1fr";
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

  const columnSizers = buildRange(2, colSizes.length);
  const rowSizers = buildRange(2, rowSizes.length);

  const { startDrag, onTractHover, dragStatus, onTractMouseOut } =
    useDragToResizeGrid({
      containerRef,
      onDragEnd: onNewLayout,
    });

  const containerClasses = [classes.ResizableGrid];
  if (className) containerClasses.push(className);

  const handleUpdateAction = React.useCallback(
    (update: TractUpdateAction) => {
      // There's a mismatch of "columns" vs "cols" for dir type so this is a
      // "temporary" bandaid for that
      const dir = update.dir === "columns" ? "cols" : "rows";
      switch (update.type) {
        case "ADD":
          return addTract(layout, {
            afterIndex: update.index,
            dir,
            size: NEW_TRACT_SIZE,
          });
        case "RESIZE":
          return updateTractSize(layout, {
            dir: update.dir,
            index: update.index,
            size: update.size,
          });
        case "DELETE":
          return removeTract(layout, {
            dir,
            index: update.index,
          });
      }
    },
    [layout]
  );

  const handleUpdate = React.useCallback(
    (update: TractUpdateAction) => onNewLayout(handleUpdateAction(update)),
    [handleUpdateAction, onNewLayout]
  );

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
      <TractInfoDisplays
        dir="columns"
        sizes={colSizes}
        dragStatus={dragStatus}
        areas={layout.areas}
        onUpdate={handleUpdate}
      />
      <TractInfoDisplays
        dir="rows"
        sizes={rowSizes}
        dragStatus={dragStatus}
        areas={layout.areas}
        onUpdate={handleUpdate}
      />
    </div>
  );
}

function TractSizer({
  // dir,
  gap_index,
  event_listeners: { onTractHover, onTractMouseOut, startDrag },
}: {
  // dir: TractDir;
  gap_index: number;
  event_listeners: TractEventListners;
}) {
  return (
    <div
      key={"col" + gap_index}
      className={classes.columnSizer}
      onMouseOver={(e) => onTractHover({ e, dir: "columns", index: gap_index })}
      onMouseOut={onTractMouseOut}
      onMouseDown={(e) => startDrag({ e, dir: "columns", index: gap_index })}
      style={{ gridColumn: gap_index }}
    />
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

export default EditableGridContainer;
