import PlusButton from "components/Inputs/PlusButton";
import type { NodePath, ShinyUiNode } from "Shiny-Ui-Elements/uiNodeTypes";

import { TabDropDetector } from "./TabDropDetector";
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
    <TabDropDetector parentPath={path} index={numSiblings} width="35px">
      <PlusButton
        className={classes.addTabButton}
        label="Add new tab"
        onClick={(e) => {
          e.stopPropagation();
          onNewTab();
        }}
      />
    </TabDropDetector>
  );
}
