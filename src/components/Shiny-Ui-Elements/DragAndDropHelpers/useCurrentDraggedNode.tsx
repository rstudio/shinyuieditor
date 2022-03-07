import React from "react";

import { DraggedNodeInfo } from "./DragAndDropHelpers";

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

/**
 *
 * @param info Information about the node and potentially its current path to
 * attach to the drag event.
 * @returns A callback appropriate for the onDragStart event
 */
export function useSetCurrentDraggedNode(nodeInfo: DraggedNodeInfo) {
  const [, setDraggedNode] = React.useContext(DraggedNodeContext);

  return function (e: React.DragEvent<HTMLElement>) {
    e.stopPropagation();
    setDraggedNode(nodeInfo);
    // assignElementDragData(e, nodeInfo);
  };
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

    watcherEl.addEventListener("dragstart", startDrag);
    watcherEl.addEventListener("dragend", endDrag);

    return () => {
      watcherEl.removeEventListener("dragstart", startDrag);
      watcherEl.removeEventListener("dragend", endDrag);
    };
  }, [endDrag, startDrag, watcherRef]);
}
