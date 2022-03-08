import React from "react";

import type { DraggedNodeInfo } from "./DragAndDropHelpers";

export type DraggedNodeState = [
  DraggedNodeInfo | null,
  (path: DraggedNodeInfo | null) => void
];

const DraggedNodeContext = React.createContext<DraggedNodeState>([
  null,
  (x) => {},
]);

export const CurrentDraggedNodeProvider: React.FC = ({ children }) => {
  const draggedNodeState = React.useState<DraggedNodeInfo | null>(null);

  return (
    <DraggedNodeContext.Provider value={draggedNodeState}>
      {children}
    </DraggedNodeContext.Provider>
  );
};

export function useCurrentDraggedNode() {
  return React.useContext(DraggedNodeContext)[0];
}

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
