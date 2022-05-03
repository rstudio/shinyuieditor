import React from "react";

import { LayoutDispatchContext } from "./GridlayoutGridPage";

export function useSetLayout() {
  const setLayout = React.useContext(LayoutDispatchContext);

  return setLayout;
}
