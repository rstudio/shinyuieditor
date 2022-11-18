import React from "react";

import type { GridLayoutAction } from "../GridlayoutElement/gridLayoutReducer";

export const LayoutDispatchContext =
  React.createContext<React.Dispatch<GridLayoutAction> | null>(null);

export function useSetLayout() {
  const setLayout = React.useContext(LayoutDispatchContext);

  return setLayout;
}
