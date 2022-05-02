import React from "react";

import type { DraggedNodeInfo } from "./DragAndDropHelpers";
import { DraggedNodeContext } from "./useCurrentDraggedNode";

export function useMakeDraggable({
  ref,
  nodeInfo,
  immovable = false,
}: {
  ref: React.RefObject<HTMLDivElement>;
  nodeInfo: DraggedNodeInfo;
  // A way of disabling drag behavior
  immovable?: boolean;
}) {
  // Keep track of if we're in the middle of a drag. This will help avoid
  // unneccesary duplicate work when of calling endDrag twice we get when the
  // user abandons a drag
  const dragHappening = React.useRef(false);
  const [, setDraggedNode] = React.useContext(DraggedNodeContext);

  // The drag can end three different ways
  // 1. The user drags the item onto a suitable drop target. Then the dragend
  //    event is triggered immediately and all is good
  // 2. The user stops the drag somewhere on the app but not on a suitable drop
  //    target. We detect this with event listeners on the body for drop. The
  //    reason for doing this is the drop event fires immediately upon the user
  //    releasing the mouse button, unlike the dragEnd event which needs to wait
  //    for the dragged item to animate all the way back to its start position.
  //    This delay makes things feel slow. This option will end up triggering
  //    the endDrag() function twice as the document drop listener calls it and
  //    then once the item has animated back the normal dragend listener calls
  //    it. We avoid the unnecesary double-call by using a reference variable to
  //    keep track of if we've already ended the event.
  // 3. The user starts a drag then drops the item somewhere outside the browser
  //    window. This will trigger the dragend event instantly.
  const endDrag = React.useCallback(() => {
    if (dragHappening.current === false || immovable) return;
    setDraggedNode(null);
    dragHappening.current = false;
    document.body.removeEventListener("dragover", dummyDragOverListener);
    document.body.removeEventListener("drop", endDrag);
  }, [immovable, setDraggedNode]);

  const startDrag = React.useCallback(
    (e: DragEvent) => {
      e.stopPropagation();
      setDraggedNode(nodeInfo);
      dragHappening.current = true;
      document.body.addEventListener("dragover", dummyDragOverListener);
      document.body.addEventListener("drop", endDrag);
    },
    [endDrag, nodeInfo, setDraggedNode]
  );

  React.useEffect(() => {
    if (nodeInfo.currentPath?.length === 0 || immovable) {
      // Don't let the root node be dragged. It can't go anywhere and causes
      // super annoying visual shift
      return;
    }

    const watcherEl = ref.current;
    if (!watcherEl) return;

    watcherEl.setAttribute("draggable", "true");
    watcherEl.addEventListener("dragstart", startDrag);

    // We still keep listening for the dragend event in case the user drops the
    // item off the screen and thus the body can not detect the drop
    watcherEl.addEventListener("dragend", endDrag);

    return () => {
      watcherEl.removeEventListener("dragstart", startDrag);
      watcherEl.removeEventListener("dragend", endDrag);
    };
  }, [endDrag, immovable, nodeInfo.currentPath, startDrag, ref]);
}

// This is just needed to let the drop event fire
function dummyDragOverListener(e: DragEvent) {
  e.preventDefault();
}
