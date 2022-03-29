import { configureStore } from "@reduxjs/toolkit";
import { backendApi } from "getInitialState";

import selectedPathReducer from "./selectedPath";
import uiTreeReducer from "./uiTree";

export const store = configureStore({
  reducer: {
    uiTree: uiTreeReducer,
    selectedPath: selectedPathReducer,
    [backendApi.reducerPath]: backendApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(backendApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
