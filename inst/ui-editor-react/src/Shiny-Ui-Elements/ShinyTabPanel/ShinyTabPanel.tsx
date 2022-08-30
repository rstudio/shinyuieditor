import type { UiNodeComponent } from "Shiny-Ui-Elements/uiNodeTypes";
import DropDetector from "Shiny-Ui-Elements/utils/DropDetector";

import { RenderUiChildren } from "../utils/RenderUiChildren";

import type { TabPanelSettings } from "./index";

import classes from "./ShinyTabPanel.module.css";

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
        <DropDetector
          dropArgs={{
            dropFilters: {
              rejectedNodes: [
                "shiny::navbarPage",
                "shiny::tabPanel",
                "gridlayout::grid_card",
                "gridlayout::grid_card_plot",
                "gridlayout::grid_card_text",
              ],
            },
            positionInChildren: 0,
            parentPath: path,
            onDrop: "add-node",
          }}
        />
      )}
    </div>
  );
};

export default ShinyTabPanel;
