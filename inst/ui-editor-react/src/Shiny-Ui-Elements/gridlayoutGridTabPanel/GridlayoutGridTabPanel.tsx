import { GridlayoutElement } from "components/Grids/GridlayoutElement/GridlayoutElement";
import type { UiNodeComponent } from "Shiny-Ui-Elements/uiNodeTypes";

import type { GridTabPanelSettings } from "./index";

import "./styles.scss";

const GridlayoutGridTabPanel: UiNodeComponent<GridTabPanelSettings> = ({
  uiArguments,
  uiChildren,
  path,
  wrapperProps,
}) => {
  return (
    <GridlayoutElement
      uiArguments={uiArguments}
      uiChildren={uiChildren}
      path={path}
      wrapperProps={wrapperProps}
    />
  );
};

export default GridlayoutGridTabPanel;
