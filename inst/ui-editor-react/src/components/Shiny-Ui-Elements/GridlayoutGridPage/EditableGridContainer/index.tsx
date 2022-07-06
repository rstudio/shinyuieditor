import * as React from "react";

import type { CSSMeasure } from "CSSMeasure";
import produce from "immer";
import addTract from "utils/gridTemplates/addTract";
import removeTract from "utils/gridTemplates/removeTract";

import type { TemplatedGridProps } from "..";

import classes from "./resizableGrid.module.css";
import { TractInfoDisplays } from "./TractInfoDisplay";
import { TractSizer } from "./TractSizer";
import type { TractInfo } from "./useDragToResizeGrid";
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
  const { row_sizes, col_sizes } = layout;
  const containerRef = React.useRef<HTMLDivElement>(null);
  const styles = layoutDefToStyles(layout);

  const columnSizers = buildRange(2, col_sizes.length);
  const rowSizers = buildRange(2, row_sizes.length);

  const { startDrag, onTractHover, dragStatus, onTractMouseOut } =
    useDragToResizeGrid({
      containerRef,
      onDragEnd: onNewLayout,
    });

  const containerClasses = [classes.ResizableGrid];
  if (className) containerClasses.push(className);

  const handleUpdateAction = React.useCallback(
    (update: TractUpdateAction) => {
      switch (update.type) {
        case "ADD":
          return addTract(layout, {
            afterIndex: update.index,
            dir: update.dir,
            size: NEW_TRACT_SIZE,
          });
        case "RESIZE":
          return updateTractSize(layout, update);
        case "DELETE":
          return removeTract(layout, update);
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
        <TractSizer
          key={"cols" + gap_index}
          dir="cols"
          index={gap_index}
          event_listeners={{ onTractMouseOut, onTractHover, startDrag }}
        />
      ))}
      {rowSizers.map((gap_index) => (
        <TractSizer
          key={"rows" + gap_index}
          dir="rows"
          index={gap_index}
          event_listeners={{ onTractMouseOut, onTractHover, startDrag }}
        />
      ))}

      {children}
      <TractInfoDisplays
        dir="cols"
        sizes={col_sizes}
        dragStatus={dragStatus}
        areas={layout.areas}
        onUpdate={handleUpdate}
      />
      <TractInfoDisplays
        dir="rows"
        sizes={row_sizes}
        dragStatus={dragStatus}
        areas={layout.areas}
        onUpdate={handleUpdate}
      />
    </div>
  );
}

function updateTractSize(
  layout: TemplatedGridProps,
  { dir, index, size }: TractInfo
): TemplatedGridProps {
  return produce(layout, (updatedLayout) => {
    updatedLayout[dir === "rows" ? "row_sizes" : "col_sizes"][index] = size;
  });
}

export default EditableGridContainer;
