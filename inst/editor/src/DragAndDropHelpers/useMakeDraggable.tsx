import React from "react";

import {
  useUnsetCurrentDraggedNode,
  useSetCurrentDraggedNode,
} from "../state/currentlyDraggedNode";

import type { DraggedNodeInfo } from "./DragAndDropHelpers";

type DragEventCallback = React.DragEventHandler<HTMLDivElement>;
type DragCallbacks = {
  onDragStart: DragEventCallback;
  onDragEnd: DragEventCallback;
  draggable: boolean;
};

export function useMakeDraggable(
  nodeInfo: DraggedNodeInfo
): DragCallbacks | null {
  // Keep track of if we're in the middle of a drag. This will help avoid
  // unneccesary duplicate work when of calling endDrag twice we get when the
  // user abandons a drag
  const dragHappening = React.useRef(false);
  const setDraggedNode = useSetCurrentDraggedNode();
  const unsetDraggedNode = useUnsetCurrentDraggedNode();

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
  const endDrag = React.useCallback(
    (e: React.DragEvent<HTMLDivElement> | DragEvent) => {
      if (dragHappening.current === false) return;
      e.stopPropagation();
      unsetDraggedNode();
      dragHappening.current = false;
      document.body.removeEventListener("dragover", dummyDragOverListener);
      document.body.removeEventListener("drop", endDrag);
    },
    [unsetDraggedNode]
  );

  const startDrag: React.DragEventHandler<HTMLDivElement> = React.useCallback(
    (e) => {
      e.stopPropagation();
      dragHappening.current = true;
      document.body.addEventListener("dragover", dummyDragOverListener);
      document.body.addEventListener("drop", endDrag);

      setDraggedNode(nodeInfo);
    },
    [endDrag, nodeInfo, setDraggedNode]
  );

  return {
    onDragStart: startDrag,
    onDragEnd: endDrag,
    draggable: true,
  };
}

// This is just needed to let the drop event fire
function dummyDragOverListener(e: DragEvent) {
  e.preventDefault();
}
