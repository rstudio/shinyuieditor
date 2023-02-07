import { createListenerMiddleware } from "@reduxjs/toolkit";

import { getNewSelectionPathAfterDeletion } from "../components/UiNode/TreeManipulation/getNewSelectionPathAfterDeletion";

import { DELETE_NODE } from "./app_info";
import { SET_SELECTION } from "./selectedPath";
import type { RootState } from "./store";

// This middleware watches for the deletion of a node and handles updating the
// current selection path appropriately. If the currently selected node was
// deleted we move the selection to back to its parent, otherwise we need to
// make sure that the selection is properly maintained in the case of the tree
// shifting beneath it etc..

// Create the middleware instance and methods
const listenForDeleteMiddleware = createListenerMiddleware();

// Add one or more listener entries that look for specific actions.
// They may contain any sync or async logic, similar to thunks.
listenForDeleteMiddleware.startListening({
  actionCreator: DELETE_NODE,
  effect: async (action, listenerApi) => {
    const deletedPath = action.payload.path;
    const selectedPath = (listenerApi.getState() as RootState).selected_path;

    // console.log("Deciding new path based on", { deletedPath, selectedPath });

    // If nothing is selected then we dont need to worry about deleting the
    // current selection
    if (selectedPath === null) return;

    const updatedSelection = getNewSelectionPathAfterDeletion({
      selectedPath,
      deletedPath,
    });

    listenerApi.dispatch(SET_SELECTION({ path: updatedSelection }));
  },
});
export default listenForDeleteMiddleware.middleware;
