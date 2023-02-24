import { configureStore } from "@reduxjs/toolkit";

import uiTreeReducer from "./app_info";
import connectedToServerReducer from "./connectedToServer";
import currentlyDraggedNodeReducer from "./currentlyDraggedNode";
import listenForDeleteMiddleware from "./middleware/listenForDeleteMiddleware";
import listenForNodeAddMiddleware from "./middleware/listenForNodeAddMiddleware";
import { resetSelectionInTemplateChooser } from "./middleware/resetSelectionInTemplateChooser";
import selectedPathReducer from "./selectedPath";

export const store = configureStore({
  reducer: {
    app_info: uiTreeReducer,
    selected_path: selectedPathReducer,
    connected_to_server: connectedToServerReducer,
    currentlyDraggedNode: currentlyDraggedNodeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(listenForDeleteMiddleware)
      .concat(listenForNodeAddMiddleware)
      .concat(resetSelectionInTemplateChooser),
});

export type RootState = ReturnType<typeof store.getState>;
