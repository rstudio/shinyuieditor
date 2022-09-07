import { GridlayoutElement } from "components/Grids/GridlayoutElement/GridlayoutElement";
import type { UiNodeComponent } from "Shiny-Ui-Elements/uiNodeTypes";

import type { GridContainerSettings } from "./index";

import "./styles.scss";

const GridlayoutGridContainer: UiNodeComponent<GridContainerSettings> = ({
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

export default GridlayoutGridContainer;
