import PlusButton from "components/Inputs/PlusButton";
import type { NodePath, ShinyUiNode } from "Shiny-Ui-Elements/uiNodeTypes";
import DropDetector from "Shiny-Ui-Elements/utils/DropDetector";

import classes from "./Tabset.module.css";

export function NewTabButtonWithDropDetection({
  path,
  numSiblings,
  onNewTab,
}: {
  path: NodePath;
  numSiblings: number;
  onNewTab: (node?: ShinyUiNode) => void;
}) {
  return (
    <DropDetector
      className={classes.newTabDropDetector}
      dropArgs={{
        parentPath: path,
        positionInChildren: numSiblings,
        dropFilters: {
          rejectedNodes: [
            "shiny::navbarPage",
            "gridlayout::grid_card",
            "gridlayout::grid_card_plot",
            "gridlayout::grid_card_text",
          ],
        },
        onDrop: ({ node, currentPath }) => {
          onNewTab(node);
        },
      }}
    >
      <PlusButton
        className={classes.addTabButton}
        label="Add new tab"
        onClick={(e) => {
          e.stopPropagation();
          onNewTab();
        }}
      />
    </DropDetector>
  );
}
