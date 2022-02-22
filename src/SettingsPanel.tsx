import Button from "components/Inputs/Button";
import { sendTreeUpdateMessage } from "components/Shiny-Ui-Elements/Elements/treeUpdateEvents";
import { uiComponentAndSettings } from "components/Shiny-Ui-Elements/Elements/uiComponentAndSettings";
import { getUiNodeValidation } from "components/Shiny-Ui-Elements/UiNode/getUiNodeValidation";
import { getNode } from "components/Shiny-Ui-Elements/UiNode/treeManipulation";
import {
  NodePath,
  SettingsUpdaterComponent,
  ShinyUiNode,
} from "components/Shiny-Ui-Elements/uiNodeTypes";
import { NodeSelectionContext } from "EditorContainer";
import * as React from "react";
import { BiCheck } from "react-icons/bi";
import { FiTrash as TrashIcon } from "react-icons/fi";
import PathBreadcrumb from "./PathBreadcrumb";
import classes from "./SettingsPanel.module.css";

export function SettingsPanel({
  tree,
  selectedPath,
}: {
  tree: ShinyUiNode;
  selectedPath: NodePath | null;
}) {
  const setNodeSelection = React.useContext(NodeSelectionContext);

  const [currentNode, setCurrentNode] = React.useState<ShinyUiNode | null>(
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

  const finishUpdating = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await getUiNodeValidation({ node: currentNode });

    if (result.type === "error") {
      setErrorMsg(result.error_msg);
      return;
    }

    if (result.type === "server-error") {
      // Otherwise we have a server error and need to make sure the user knows this
      // before continuing
      console.error(`HTTP error! status: ${result.status}`);

      const userAcknowledgedLackOfServer = window.confirm(
        "Could not check with backend for settings validation. You're on your own."
      );
      if (!userAcknowledgedLackOfServer) {
        setErrorMsg(
          "Failed to validate settings for component. Try again or check to make sure your R session didn't crash."
        );
      }
    }

    // Sync the state that's been updated from the form to the main tree
    sendTreeUpdateMessage({
      type: "UPDATE_NODE",
      path: selectedPath,
      newNode: {
        ...currentNode,
        // Add resulting html from setting validation (if present)
        uiHTML: "uiHTML" in result ? result.uiHTML : undefined,
      },
    });
  };

  return (
    <div className={classes.settingsPanel}>
      <div className={classes.currentElementAbout}>
        <div>
          <strong>Path:</strong>
          <PathBreadcrumb
            tree={tree}
            path={selectedPath}
            onSelect={setNodeSelection}
          />
        </div>
      </div>
      <div className={classes.settingsForm}>
        <form onSubmit={finishUpdating}>
          <SettingsInputs
            settings={uiArguments}
            onChange={(settings) => {
              updateArguments(settings);
            }}
          />
          {errorMsg ? (
            <div>
              Input settings are not valid. The following errors were received:
              <div className={classes.validationErrorMsg}>{errorMsg}</div>
            </div>
          ) : null}
          <div className={classes.submitHolder}>
            <Button type="submit">
              <BiCheck /> Update
            </Button>
          </div>
        </form>
      </div>

      <Button
        onClick={() => {
          setNodeSelection(null);
          sendTreeUpdateMessage({ type: "DELETE_NODE", path: selectedPath });
        }}
        variant="delete"
      >
        <TrashIcon /> Delete Element
      </Button>
    </div>
  );
}
