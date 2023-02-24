import { createListenerMiddleware } from "@reduxjs/toolkit";

import { getPathAfterMove } from "../../components/UiNode/TreeManipulation/getPathAfterMove";
import { isNodeMove } from "../../components/UiNode/TreeManipulation/placeNode";
import { PLACE_NODE } from "../app_info";
import { SET_SELECTION } from "../selectedPath";

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

    if (isNodeMove(args)) {
      // If we've moved a node to a later position within the same parent then we
      // need to account for the shuffling of indices after this move
      newNodePath = getPathAfterMove({
        fromPath: args.currentPath,
        toPath: newNodePath,
      });
    }

    listenerApi.dispatch(SET_SELECTION({ path: newNodePath }));
  },
});

export default listenForNodeAddMiddleware.middleware;
