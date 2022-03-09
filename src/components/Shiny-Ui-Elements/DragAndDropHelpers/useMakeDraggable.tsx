import React from "react";

import type { DraggedNodeInfo } from "./DragAndDropHelpers";
import { DraggedNodeContext } from "./useCurrentDraggedNode";

export function useMakeDraggable(
  watcherRef: React.RefObject<HTMLDivElement>,
  nodeInfo: DraggedNodeInfo
) {
  const [, setDraggedNode] = React.useContext(DraggedNodeContext);

  const startDrag = React.useCallback(
    (e: DragEvent) => {
      e.stopPropagation();
      setDraggedNode(nodeInfo);
      // assignElementDragData(e, nodeInfo);
    },
    [nodeInfo, setDraggedNode]
  );

  const endDrag = React.useCallback(
    (e: DragEvent) => {
      console.log("Ending drag");
      setDraggedNode(null);
    },
    [setDraggedNode]
  );

  React.useEffect(() => {
    const watcherEl = watcherRef.current;
    if (!watcherEl) return;

    watcherEl.setAttribute("draggable", "true");
    watcherEl.addEventListener("dragstart", startDrag);

    // This event takes a while to fire because of the animation of the dragged
    // snapping back so we may want to turn it into a mouse-up watcher instead
    watcherEl.addEventListener("dragend", endDrag);

    return () => {
      watcherEl.removeEventListener("dragstart", startDrag);
      watcherEl.removeEventListener("dragend", endDrag);
    };
  }, [endDrag, startDrag, watcherRef]);
}
