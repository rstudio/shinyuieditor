import React from "react";

import type { GridLayoutAction } from "./GridContainerElement/gridLayoutReducer";

export const LayoutDispatchContext =
  React.createContext<React.Dispatch<GridLayoutAction> | null>(null);

export function useSetLayout() {
  const setLayout = React.useContext(LayoutDispatchContext);

  return setLayout;
}
