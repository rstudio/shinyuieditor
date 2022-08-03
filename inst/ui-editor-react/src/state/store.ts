import { configureStore } from "@reduxjs/toolkit";
import { backendApi } from "state/getInitialState";

import connectedToServerReducer from "./connectedToServer";
import listenForDeleteMiddleware from "./listenForDeleteMiddleware";
import selectedPathReducer from "./selectedPath";
import uiTreeReducer from "./uiTree";

export const store = configureStore({
  reducer: {
    uiTree: uiTreeReducer,
    selectedPath: selectedPathReducer,
    connectedToServer: connectedToServerReducer,
    [backendApi.reducerPath]: backendApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(backendApi.middleware)
      .prepend(listenForDeleteMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
