import React from "react";

import { LayoutDispatchContext } from "../../Shiny-Ui-Elements/GridlayoutGridPage/GridlayoutGridPage";

export function useSetLayout() {
  const setLayout = React.useContext(LayoutDispatchContext);

  return setLayout;
}
