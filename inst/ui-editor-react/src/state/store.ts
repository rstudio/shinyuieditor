import { configureStore } from "@reduxjs/toolkit";

import connectedToServerReducer from "./connectedToServer";
import listenForDeleteMiddleware from "./listenForDeleteMiddleware";
import listenForNodeAddMiddleware from "./listenForNodeAddMiddleware";
import { resetSelectionInTemplateChooser } from "./middleware/resetSelectionInTemplateChooser";
import selectedPathReducer from "./selectedPath";
import uiTreeReducer from "./uiTree";

export const store = configureStore({
  reducer: {
    uiTree: uiTreeReducer,
    selectedPath: selectedPathReducer,
    connectedToServer: connectedToServerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(listenForDeleteMiddleware)
      .concat(listenForNodeAddMiddleware)
      .concat(resetSelectionInTemplateChooser),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
