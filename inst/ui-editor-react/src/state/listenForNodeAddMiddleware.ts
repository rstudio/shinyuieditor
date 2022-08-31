import { createListenerMiddleware } from "@reduxjs/toolkit";
import { getChildIndex } from "components/UiNode/TreeManipulation/getParentPath";
import { nodesAreSiblings } from "components/UiNode/TreeManipulation/nodesAreSiblings";
import { isNodeMove } from "components/UiNode/TreeManipulation/placeNode";

import { SET_SELECTION } from "./selectedPath";
import { PLACE_NODE } from "./uiTree";

// This middleware watches for the placement of a node and handles updating the
// current selection path appropriately.

// Create the middleware instance and methods
const listenForNodeAddMiddleware = createListenerMiddleware();

// Add one or more listener entries that look for specific actions.
// They may contain any sync or async logic, similar to thunks.
listenForNodeAddMiddleware.startListening({
  actionCreator: PLACE_NODE,
  effect: async (action, listenerApi) => {
    const args = action.payload;
    let newNodePath = args.path;

    if (
      isNodeMove(args) &&
      nodesAreSiblings(newNodePath, args.currentPath) &&
      getChildIndex(newNodePath) > getChildIndex(args.currentPath)
    ) {
      // If we've moved a node to a later position within the same parent then we
      // need to account for the shuffling of indices after this move
      newNodePath[newNodePath.length - 1]--;
    }

    listenerApi.dispatch(SET_SELECTION({ path: newNodePath }));
  },
});

export default listenForNodeAddMiddleware.middleware;
