import React from "react";

import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

import type { NodePath } from "../Shiny-Ui-Elements/uiNodeTypes";

import type { RootState } from "./store";

// Note: Currently we're using Immer already so it's double immering this stuff
// which is not efficient.

type CurrentSelection = NodePath | null;
export const selectedPathSlice = createSlice({
  name: "selectedPath",
  initialState: [] as CurrentSelection,
  reducers: {
    SET_SELECTION: (
      selectedPath,
      action: PayloadAction<{ path: CurrentSelection }>
    ) => action.payload.path,

    STEP_BACK_SELECTION: (selectedPath) => {
      if (selectedPath === null || selectedPath.length === 0) return null;
      selectedPath.pop();

      return selectedPath;
    },
  },
});

// Action creators are generated for each case reducer function
export const { SET_SELECTION, STEP_BACK_SELECTION } = selectedPathSlice.actions;

export function useCurrentSelection() {
  return useSelector((state: RootState) => state.selected_path);
}

export function useSetCurrentSelection() {
  const dispatch = useDispatch();

  const set_selection = React.useCallback(
    (sel: CurrentSelection) => {
      dispatch(SET_SELECTION({ path: sel }));
    },
    [dispatch]
  );

  return set_selection;
}

export default selectedPathSlice.reducer;
