import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { MessageToClientByPath } from "communication-types";
import { useSelector } from "react-redux";

import type { RootState } from "./store";

export const metaDataSlice = createSlice({
  name: "metaData",
  initialState: null as MessageToClientByPath["CHECKIN"] | null,
  reducers: {
    SET_META_DATA: (
      state,
      { payload: meta_data }: PayloadAction<MessageToClientByPath["CHECKIN"]>
    ) => {
      return { ...state, ...meta_data };
    },
  },
});

// Action creators are generated for each case reducer function
export const { SET_META_DATA } = metaDataSlice.actions;

export function useMetaData() {
  return useSelector((state: RootState) => state.meta_data);
}

export default metaDataSlice.reducer;
