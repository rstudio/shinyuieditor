import { pathToString } from "Shiny-Ui-Elements/nodePathUtils";
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
    <div className="gridlayoutGridTabPanel" {...wrapperProps}>
      <p>NODE NAME: {uiArguments.name}</p>
      <p>Path: {pathToString(path)}</p>
      <p>There are {uiChildren?.length ?? 0} children</p>
    </div>
  );
};

export default GridlayoutGridTabPanel;
