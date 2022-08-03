import { createListenerMiddleware } from "@reduxjs/toolkit";

import { RESET_SELECTION } from "./selectedPath";
import { DELETE_NODE } from "./uiTree";

// Create the middleware instance and methods
const listenForDeleteMiddleware = createListenerMiddleware();

// Add one or more listener entries that look for specific actions.
// They may contain any sync or async logic, similar to thunks.
listenForDeleteMiddleware.startListening({
  actionCreator: DELETE_NODE,
  effect: async (action, listenerApi) => {
    // Reset the selection after a node is deleted This is a bit overkill
    // especially if the node being deleted isn't selected but since deleting a
    // node can cause nodes to shift in the tree without doing some semi-complex
    // logic it's safest to just reset the selection entirely
    listenerApi.dispatch(RESET_SELECTION());
  },
});

export default listenForDeleteMiddleware.middleware;
