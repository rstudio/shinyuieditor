import { createListenerMiddleware } from "@reduxjs/toolkit";
import { nodesShareCommonParent } from "components/UiNode/TreeManipulation/nodesShareCommonParent";
import { sameArray } from "utils/equalityCheckers";

import { SET_SELECTION, STEP_BACK_SELECTION } from "./selectedPath";
import type { RootState } from "./store";
import { DELETE_NODE } from "./uiTree";

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
    const selectedPath = (listenerApi.getState() as RootState).selectedPath;

    // If nothing is selected then we dont need to worry about deleting the
    // current selection
    if (selectedPath === null || selectedPath.length === 0) return;

    // Backup selection if it's the same as the deleted node
    if (sameArray(deletedPath, selectedPath)) {
      listenerApi.dispatch(STEP_BACK_SELECTION());
    }

    // If the selection is earlier in the tree than the deleted node then
    // there's no need to change anything as that part of the tree will not be
    // touched
    if (selectedPath.length < deletedPath.length) return;

    // If the selected path and the deleted node share a common parent
    // and the selected paths's index is higher than the deleted ones, we will
    // need to shift the selected path to account for the moving of the tree
    if (!nodesShareCommonParent(selectedPath, deletedPath)) return;

    const finalPosOfDeleted = deletedPath[deletedPath.length - 1];
    const positionOfSelected = selectedPath[deletedPath.length - 1];

    // Deleted node is later in the children of parent than the selected so the
    // index of selection will not update
    if (finalPosOfDeleted > positionOfSelected) return;

    // Now just make a new version of the selected path with common parent index
    // shifted down to reflect new tree shape
    const newSelectionPath = [...selectedPath];
    newSelectionPath[deletedPath.length - 1] = positionOfSelected - 1;
    listenerApi.dispatch(SET_SELECTION({ path: newSelectionPath }));
  },
});

export default listenForDeleteMiddleware.middleware;
