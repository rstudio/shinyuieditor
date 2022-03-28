import { configureStore } from "@reduxjs/toolkit";

import selectedPathReducer from "./selectedPath";
import uiTreeReducer from "./uiTree";

export const store = configureStore({
  reducer: {
    uiTree: uiTreeReducer,
    selectedPath: selectedPathReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
