import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { NodePath } from "components/Shiny-Ui-Elements/uiNodeTypes";

// Note: Currently we're using Immer already so it's double immering this stuff
// which is not efficient.

export const selectedPathSlice = createSlice({
  name: "selectedPath",
  initialState: [] as NodePath | null,
  reducers: {
    SET_SELECTION: (
      selectedPath,
      action: PayloadAction<{ path: NodePath | null }>
    ) => action.payload.path,
    RESET_SELECTION: (selectedPath) => null,
  },
});

// Action creators are generated for each case reducer function
export const { SET_SELECTION, RESET_SELECTION } = selectedPathSlice.actions;

export default selectedPathSlice.reducer;
