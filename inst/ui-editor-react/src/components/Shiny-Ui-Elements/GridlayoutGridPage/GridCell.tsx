import React from "react";

import { useFilteredDrop } from "DragAndDropHelpers/useFilteredDrop";

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
      className="grid-cell"
      ref={cellRef}
      style={{
        gridRow,
        gridColumn,
        // By insetting a tiny bit we ensure that the cells won't peak out from
        // behind any item placed over them
        margin: "2px",
      }}
    />
  );
}
