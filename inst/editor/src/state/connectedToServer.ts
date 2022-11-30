import React from "react";

import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

export const connectedToServerSlice = createSlice({
  name: "runtimeInfo",
  initialState: true as boolean,
  reducers: {
    DISCONNECTED_FROM_SERVER: (_prev, action: PayloadAction) => false,
  },
});

// Action creators are generated for each case reducer function
const { DISCONNECTED_FROM_SERVER } = connectedToServerSlice.actions;

export const useSetDisconnectedFromServer = () => {
  const dispatch = useDispatch();

  const set_disconected = React.useCallback(() => {
    dispatch(DISCONNECTED_FROM_SERVER());
  }, [dispatch]);
  return set_disconected;
};

export default connectedToServerSlice.reducer;
