import PlusButton from "components/Inputs/PlusButton";
import {
  newTabPanelNode,
  wrapNodeInTabPanel,
} from "Shiny-Ui-Elements/ShinyNavbarPage/ShinyNavbarPage";
import type { NodePath } from "Shiny-Ui-Elements/uiNodeTypes";
import DropDetector from "Shiny-Ui-Elements/utils/DropDetector";
import { usePlaceNode } from "state/uiTree";

import classes from "./Tabset.module.css";

export function NewTabButtonWithDropDetection({
  path,
  numSiblings,
}: {
  path: NodePath;
  numSiblings: number;
}) {
  const place_node = usePlaceNode();

  return (
    <DropDetector
      className={classes.newTabDropDetector}
      parentPath={path}
      positionInChildren={numSiblings}
      dropFilters={{
        rejectedNodes: [
          "shiny::navbarPage",
          "gridlayout::grid_card",
          "gridlayout::grid_card_plot",
          "gridlayout::grid_card_text",
        ],
      }}
      onDrop="add-node"
      processDropped={wrapNodeInTabPanel}
    >
      <PlusButton
        className={classes.addTabButton}
        label="Add new tab"
        onClick={() => {
          place_node({
            node: newTabPanelNode,
            positionInChildren: numSiblings,
            parentPath: path,
          });
        }}
      />
    </DropDetector>
  );
}
