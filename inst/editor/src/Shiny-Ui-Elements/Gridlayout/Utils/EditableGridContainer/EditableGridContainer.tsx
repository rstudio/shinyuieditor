import * as React from "react";

import produce from "immer";
import { ensureArray } from "util-functions/src/arrays";

import type { CSSMeasure } from "../../../../components/Inputs/CSSUnitInput/CSSMeasure";
import addTract from "../../../../utils/gridTemplates/addTract";
import removeTract from "../../../../utils/gridTemplates/removeTract";
import { mergeClasses } from "../../../../utils/mergeClasses";
import type { TractDirection } from "../../GridlayoutGridPage";

import classes from "./resizableGrid.module.css";
import type { TemplatedGridProps } from "./TemplatedGridProps";
import { TractInfoDisplays } from "./TractInfoDisplay";
import { TractSizerHandle } from "./TractSizer";
import type { TractInfo } from "./useDragToResizeGrid";
import { useDragToResizeGrid } from "./useDragToResizeGrid";
import { buildRange, getTractSizesInPx, layoutDefToStyles } from "./utils";

export type TractUpdateAction = { dir: TractInfo["dir"]; index: number } & (
  | { type: "RESIZE"; size: CSSMeasure }
  | { type: "ADD"; index: number }
  | { type: "DELETE" }
);

// Sometimes a single-length array is sent over without array wrapping. This
// updates and makes sure arrray-ness is kept
function cleanupLayoutArgs({
  areas,
  col_sizes,
  row_sizes,
  gap_size,
}: TemplatedGridProps) {
  return {
    areas,
    gap_size,
    col_sizes: ensureArray(col_sizes),
    row_sizes: ensureArray(row_sizes),
  };
}

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
  layout = cleanupLayoutArgs(layout);
  let { row_sizes, col_sizes } = layout;
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

  const getActualSizeByTract = React.useCallback((dir: TractDirection) => {
    const container = containerRef.current;
    if (!container) return [];
    return getTractSizesInPx({ container, dir });
  }, []);
  return (
    <div
      className={mergeClasses(...containerClasses)}
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
        getActualSizes={() => getActualSizeByTract("cols")}
        areas={layout.areas}
        onUpdate={handleUpdate}
      />
      <TractInfoDisplays
        dir="rows"
        sizes={row_sizes}
        getActualSizes={() => getActualSizeByTract("rows")}
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
