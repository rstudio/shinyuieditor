import { configureStore } from "@reduxjs/toolkit";

import uiTreeReducer from "./app_info";
import connectedToServerReducer from "./connectedToServer";
import listenForDeleteMiddleware from "./listenForDeleteMiddleware";
import listenForNodeAddMiddleware from "./listenForNodeAddMiddleware";
import { resetSelectionInTemplateChooser } from "./middleware/resetSelectionInTemplateChooser";
import selectedPathReducer from "./selectedPath";

export const store = configureStore({
  reducer: {
    app_info: uiTreeReducer,
    selected_path: selectedPathReducer,
    connected_to_server: connectedToServerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(listenForDeleteMiddleware)
      .concat(listenForNodeAddMiddleware)
      .concat(resetSelectionInTemplateChooser),
});

export type RootState = ReturnType<typeof store.getState>;
