import { ShinyUiNode } from "components/Shiny-Ui-Elements/uiNodeTypes";
import * as React from "react";
import { assignElementDragData } from "../DragAndDropHelpers/useDragAndDropElements";
import { defaultSettingsForElements } from "../Elements/uiComponentAndSettings";
import { previewIconsSrc } from "./previewIconsSrc";
import classes from "./styles.module.css";

export default function ElementsPalette({
  availableUi = defaultSettingsForElements,
}: {
  availableUi?: ShinyUiNode[];
}) {
  return (
    <div className={classes.OptionsList}>
      {availableUi.map((node) => {
        return <ElementIcon key={node.uiName} {...node} />;
      })}
    </div>
  );
}

function ElementIcon(node: ShinyUiNode) {
  return (
    <div
      className={classes.OptionItem}
      draggable
      onDragStart={(e) => {
        // Tag the drag event with the element type being dragged
        assignElementDragData(e, { node });
      }}
    >
      <img src={previewIconsSrc[node.uiName]} alt={node.uiName} />
      <code>{node.uiName.replace(/[\w]+::/, "")}</code>
    </div>
  );
}
