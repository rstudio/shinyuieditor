import { DropWatcherPanel } from "../../DragAndDropHelpers/DropWatcherPanel";
import type { ShinyUiNames, UiNodeComponent } from "../uiNodeTypes";
import { RenderUiChildren } from "../utils/RenderUiChildren";

import type { TabPanelSettings } from "./index";

import classes from "./ShinyTabPanel.module.css";

export const invalidTabPanelContents: ShinyUiNames[] = [
  "shiny::navbarPage",
  "shiny::tabPanel",
  "gridlayout::grid_card",
  "gridlayout::grid_card_plot",
  "gridlayout::grid_card_text",
];

const dropFilters = {
  rejected: invalidTabPanelContents,
};

const ShinyTabPanel: UiNodeComponent<TabPanelSettings> = ({
  uiArguments,
  uiChildren,
  path,
  wrapperProps,
}) => {
  const hasChildren = uiChildren && uiChildren.length > 0;

  return (
    <div className={classes.container} {...wrapperProps}>
      {hasChildren ? (
        <RenderUiChildren uiChildren={uiChildren} parentPath={path} />
      ) : (
        <DropWatcherPanel
          className={classes.emptyTabPanelDropDetector}
          index={0}
          parentPath={path}
          dropFilters={dropFilters}
        />
      )}
    </div>
  );
};

export default ShinyTabPanel;
