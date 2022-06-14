import React from "react";

import { useFilteredDrop } from "DragAndDropHelpers/useFilteredDrop";

import classes from "./GridCell.module.css";
import type { NewItemInfo } from "./GridlayoutGridPage";

export function GridCell({
  gridRow,
  gridColumn,
  onDroppedNode,
}: {
  gridRow: number;
  gridColumn: number;
  onDroppedNode: (nodeInfo: NewItemInfo) => void;
}) {
  const cellRef = React.useRef<HTMLDivElement>(null);

  useFilteredDrop({
    watcherRef: cellRef,
    onDrop: (nodeInfo) => {
      onDroppedNode({
        ...nodeInfo,
        pos: {
          rowStart: gridRow,
          rowEnd: gridRow,
          colStart: gridColumn,
          colEnd: gridColumn,
        },
      });
    },
  });

  return (
    <div
      className={`grid-cell ${classes.cell}`}
      ref={cellRef}
      style={{ gridRow, gridColumn }}
    ></div>
  );
}
