import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

import type { DraggedNodeInfo } from "../DragAndDropHelpers/DragAndDropHelpers";

import type { RootState } from "./store";

type Current_Dragged_Node_Info = DraggedNodeInfo | null;

export const currentlyDraggedNodeSlice = createSlice({
  name: "currentlyDraggedNode",
  initialState: null as Current_Dragged_Node_Info,
  reducers: {
    SET_DRAGGED: (
      currentDragInfo,
      action: PayloadAction<{ node_info: DraggedNodeInfo }>
    ) => action.payload.node_info,

    UNSET_DRAGGED: (currentDragInfo) => {
      return null;
    },
  },
});

// Action creators are generated for each case reducer function
const { SET_DRAGGED, UNSET_DRAGGED } = currentlyDraggedNodeSlice.actions;

export function useCurrentDraggedNode() {
  return useSelector((state: RootState) => state.currentlyDraggedNode);
}
export function useSetCurrentDraggedNode() {
  const dispatch = useDispatch();

  return (node_info: DraggedNodeInfo) => dispatch(SET_DRAGGED({ node_info }));
}

export function useUnsetCurrentDraggedNode() {
  const dispatch = useDispatch();

  return () => dispatch(UNSET_DRAGGED());
}

export default currentlyDraggedNodeSlice.reducer;
