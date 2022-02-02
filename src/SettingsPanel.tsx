import NodeUpdateContext from "components/Shiny-Ui-Elements/UiNode/NodeUpdateContext";
import { getNode } from "components/Shiny-Ui-Elements/UiNode/treeManipulation";
import { UiSettingsComponent } from "components/Shiny-Ui-Elements/UiNode/UiSettingsComponent";
import {
  NodePath,
  UiNodeProps,
} from "components/Shiny-Ui-Elements/uiNodeTypes";
import { NodeSelectionContext } from "EditorContainer";
import * as React from "react";
import { FiTrash as TrashIcon } from "react-icons/fi";
import classes from "./SettingsPanel.module.css";

export function SettingsPanel({
  tree,
  selectedPath,
}: {
  tree: UiNodeProps;
  selectedPath: NodePath | null;
}) {
  const nodeUpdaters = React.useContext(NodeUpdateContext);
  const setNodeSelection = React.useContext(NodeSelectionContext);

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

            nodeUpdaters({
              type: "UPDATE_NODE",
              path: selectedPath,
              newNode: {
                ...currentNode,
                uiArguments: newSettings,
              } as UiNodeProps,
            });
          }}
          checkValid={false}
        />
      </div>

      <button
        className={classes.deleteButton}
        onClick={() => {
          setNodeSelection(null);
          nodeUpdaters({ type: "DELETE_NODE", path: selectedPath });
        }}
      >
        <TrashIcon /> Delete Element
      </button>
    </div>
  );
}
