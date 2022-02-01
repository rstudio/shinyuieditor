import NodeUpdateContext from "components/Shiny-Ui-Elements/UiNode/NodeUpdateContext";
import { getNode } from "components/Shiny-Ui-Elements/UiNode/treeManipulation";
import { UiSettingsComponent } from "components/Shiny-Ui-Elements/UiNode/UiSettingsComponent";
import {
  NodePath,
  UiNodeProps,
} from "components/Shiny-Ui-Elements/uiNodeTypes";
import * as React from "react";
import classes from "./SettingsPanel.module.css";
import { FiTrash as TrashIcon } from "react-icons/fi";

export function SettingsPanel({
  tree,
  selectedPath,
}: {
  tree: UiNodeProps;
  selectedPath: NodePath | null;
}) {
  const nodeUpdaters = React.useContext(NodeUpdateContext);

  if (selectedPath === null) {
    return <div>Select an element to edit properties</div>;
  }
  const currentNode = getNode(tree, selectedPath);

  const { uiName, uiArguments } = currentNode;

  return (
    <div className={classes.settingsPanel}>
      <div className={classes.currentElementAbout}>
        <p>
          <strong>Element:</strong> {uiName}
        </p>
        <p>
          <strong>Path:</strong> [{selectedPath.join(",")}]
        </p>
      </div>
      <div className={classes.settingsForm}>
        <UiSettingsComponent
          {...currentNode}
          onChange={(newSettings) => {
            console.log("New settings for a node!", {
              path: selectedPath,
              node: { uiName, uiArguments: newSettings },
            });
            nodeUpdaters.updateNode(selectedPath, {
              ...currentNode,
              uiArguments: newSettings,
            } as UiNodeProps);
          }}
          checkValid={false}
        />
      </div>

      <button
        className={classes.deleteButton}
        onClick={() => {
          nodeUpdaters.deleteNode(selectedPath);
        }}
      >
        <TrashIcon /> Delete Element
      </button>
    </div>
  );
}
