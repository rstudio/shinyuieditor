import { DropWatcherPanel } from "../../DragAndDropHelpers/DropWatcherPanel";
import type { ShinyUiNodeIds, UiNodeComponent } from "../uiNodeTypes";
import { RenderUiChildren } from "../utils/RenderUiChildren";

import type { TabPanelSettings } from "./index";

import classes from "./ShinyTabPanel.module.css";

export const invalidTabPanelContents: ShinyUiNodeIds[] = [
  "navbarPage",
  "tabPanel",
  "grid_card",
  "grid_card_plot",
  "grid_card_text",
];

const dropFilters = {
  rejected: invalidTabPanelContents,
};

const ShinyTabPanel: UiNodeComponent<
  TabPanelSettings,
  { TakesChildren: true }
> = ({ namedArgs, children, path, wrapperProps }) => {
  const hasChildren = children && children.length > 0;

  return (
    <div className={classes.container} {...wrapperProps}>
      {hasChildren ? (
        <RenderUiChildren children={children} parentPath={path} />
      ) : (
        <DropWatcherPanel
          className={classes.emptyTabPanelDropDetector}
          child_loc={0}
          parentPath={path}
          dropFilters={dropFilters}
          parentNodeType="tabPanel"
          visibleWhenEmpty
        />
      )}
    </div>
  );
};

export default ShinyTabPanel;
