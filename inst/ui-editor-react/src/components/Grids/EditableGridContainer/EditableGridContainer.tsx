import * as React from "react";

import type { CSSMeasure } from "components/Inputs/CSSUnitInput/CSSMeasure";
import produce from "immer";
import type { TemplatedGridProps } from "Shiny-Ui-Elements/GridlayoutGridPage";
import addTract from "utils/gridTemplates/addTract";
import removeTract from "utils/gridTemplates/removeTract";

import classes from "./resizableGrid.module.css";
import { TractInfoDisplays } from "./TractInfoDisplay";
import { TractSizerHandle } from "./TractSizer";
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

  // Build sizers with the special context of not needing any if we only have a
  // single tract
  const columnSizers =
    col_sizes.length < 2 ? [] : buildRange(2, col_sizes.length);
  const rowSizers = row_sizes.length < 2 ? [] : buildRange(2, row_sizes.length);

  const startDrag = useDragToResizeGrid({
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
        <TractSizerHandle
          key={"cols" + gap_index}
          dir="cols"
          index={gap_index}
          onStartDrag={startDrag}
        />
      ))}
      {rowSizers.map((gap_index) => (
        <TractSizerHandle
          key={"rows" + gap_index}
          dir="rows"
          index={gap_index}
          onStartDrag={startDrag}
        />
      ))}
      {children}
      <TractInfoDisplays
        dir="cols"
        sizes={col_sizes}
        areas={layout.areas}
        onUpdate={handleUpdate}
      />
      <TractInfoDisplays
        dir="rows"
        sizes={row_sizes}
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
