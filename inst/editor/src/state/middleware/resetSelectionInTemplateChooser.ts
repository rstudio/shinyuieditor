import { createListenerMiddleware } from "@reduxjs/toolkit";

import { SET_SELECTION } from "../selectedPath";
import { SET_FULL_STATE } from "../uiTree";

// Create the middleware instance and methods
const listenForTemplateChooserMode = createListenerMiddleware();

// Add one or more listener entries that look for specific actions.
// They may contain any sync or async logic, similar to thunks.
listenForTemplateChooserMode.startListening({
  actionCreator: SET_FULL_STATE,
  effect: async (action, listenerApi) => {
    listenerApi.dispatch(SET_SELECTION({ path: [] }));
  },
});

export const resetSelectionInTemplateChooser =
  listenForTemplateChooserMode.middleware;
