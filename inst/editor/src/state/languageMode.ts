import React from "react";

import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "./store";

/**
 * What mode is the editor currently in. This will influence what code is
 * generated and elements are visible in the elements palette
 * */
export type Language_Mode = "R" | "PYTHON";

export const languageModeSlice = createSlice({
  name: "language_mode",
  initialState: "R" as Language_Mode,
  reducers: {
    SET_MODE: (_prev, action: PayloadAction<Language_Mode>) => action.payload,
  },
});

// Action creators are generated for each case reducer function
const { SET_MODE } = languageModeSlice.actions;

export const useSetLanguageMode = () => {
  const dispatch = useDispatch();

  const set_mode = React.useCallback(
    (mode: Language_Mode) => {
      dispatch(SET_MODE(mode));
    },
    [dispatch]
  );
  return set_mode;
};

export const useLanguageMode = () => {
  return useSelector((state: RootState) => state.language_mode);
};

export const language_mode_reducer = languageModeSlice.reducer;
