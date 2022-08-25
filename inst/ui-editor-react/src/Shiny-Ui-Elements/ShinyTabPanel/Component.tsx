import type { UiNodeComponent } from "Shiny-Ui-Elements/uiNodeTypes";
import DropDetector from "Shiny-Ui-Elements/utils/DropDetector";

import { RenderUiChildren } from "../utils/RenderUiChildren";

import type { TabPanelSettings } from "./index";

import classes from "./styles.module.css";

const ShinyTabPanel: UiNodeComponent<TabPanelSettings> = ({
  uiArguments,
  uiChildren,
  nodeInfo: { path },
  compRef,
}) => {
  return (
    <div className={classes.container}>
      {!uiChildren ? (
        <DropDetector
          dropFilters={{
            rejectedNodes: [
              "shiny::navbarPage",
              "shiny::tabPanel",
              "gridlayout::grid_card",
              "gridlayout::grid_card_plot",
              "gridlayout::grid_card_text",
            ],
          }}
          positionInChildren={0}
          parentPath={path}
          onDrop="add-node"
        />
      ) : (
        <RenderUiChildren uiChildren={uiChildren} parentPath={path} />
      )}
    </div>
  );
};

export default ShinyTabPanel;
