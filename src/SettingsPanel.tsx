import Button from "components/Inputs/Button";
import { uiComponentAndSettings } from "components/Shiny-Ui-Elements/Elements/uiComponentAndSettings";
import NodeUpdateContext from "components/Shiny-Ui-Elements/UiNode/NodeUpdateContext";
import { getNode } from "components/Shiny-Ui-Elements/UiNode/treeManipulation";
import {
  NodePath,
  SettingsUpdaterComponent,
  UiNodeProps,
} from "components/Shiny-Ui-Elements/uiNodeTypes";
import { NodeSelectionContext } from "EditorContainer";
import * as React from "react";
import { BiCheck } from "react-icons/bi";
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

  const [currentNode, setCurrentNode] = React.useState<UiNodeProps | null>(
    selectedPath !== null ? getNode(tree, selectedPath) : null
  );
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  React.useEffect(() => {
    const selectedNode =
      selectedPath !== null ? getNode(tree, selectedPath) : null;
    setCurrentNode(selectedNode);
  }, [tree, selectedPath]);

  if (selectedPath === null) {
    return <div>Select an element to edit properties</div>;
  }
  if (currentNode === null) {
    return (
      <div>Error finding requested node at path {selectedPath.join(".")}</div>
    );
  }

  const { uiName, uiArguments } = currentNode;

  const updateArguments = (newArguments: typeof uiArguments) => {
    setCurrentNode({
      ...currentNode,
      uiArguments: newArguments,
    } as typeof currentNode);
  };

  const SettingsInputs = uiComponentAndSettings[uiName]
    .SettingsComponent as SettingsUpdaterComponent<typeof uiArguments>;

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
        <form
          onSubmit={(e) => {
            e.preventDefault();

            // Sync the state that's been updated from the form to the main tree
            nodeUpdaters({
              type: "UPDATE_NODE",
              path: selectedPath,
              newNode: currentNode,
            });

            // // Check if valid
            // if (checkValid) {
            //   checkIfArgumentsValid({
            //     state: currentState,
            //     onValid: () => onChange(currentState.uiArguments),
            //     onError: setErrorMsg,
            //   });
            // } else {
            //   onChange(currentSettings);
            // }
          }}
        >
          <SettingsInputs
            settings={uiArguments}
            onChange={(settings) => {
              updateArguments(settings);
            }}
          />
          {errorMsg ? (
            <div>
              Input settings are not valid. The following errors were received:
              <pre style={{ color: "orangered" }}>{errorMsg}</pre>
            </div>
          ) : null}
          <Button
          // type="submit"
          >
            <BiCheck /> Update
          </Button>
        </form>
      </div>

      <Button
        onClick={() => {
          setNodeSelection(null);
          nodeUpdaters({ type: "DELETE_NODE", path: selectedPath });
        }}
        variant="delete"
      >
        <TrashIcon /> Delete Element
      </Button>
    </div>
  );
}
