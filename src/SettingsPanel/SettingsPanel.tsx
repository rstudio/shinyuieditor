import * as React from "react";

import Button from "components/Inputs/Button";
import {
  SettingsUpdaterComponent,
  ShinyUiNode,
  shinyUiNodeInfo,
} from "components/Shiny-Ui-Elements/Elements/uiNodeTypes";
import { getUiNodeValidation } from "components/Shiny-Ui-Elements/UiNode/getUiNodeValidation";
import { getNode } from "components/Shiny-Ui-Elements/UiNode/TreeManipulation/getNode";
import { sendTreeUpdateMessage } from "components/Shiny-Ui-Elements/UiNode/TreeManipulation/treeUpdateEvents";
import { NodeSelectionContext } from "NodeSelectionContext";
import { BiCheck } from "react-icons/bi";
import { FiTrash as TrashIcon } from "react-icons/fi";

import PathBreadcrumb from "./PathBreadcrumb";
import classes from "./SettingsPanel.module.css";

function useUpdateSettings({ tree }: { tree: ShinyUiNode }) {
  const [selectedPath, setNodeSelection] =
    React.useContext(NodeSelectionContext);

  const [currentNode, setCurrentNode] = React.useState<ShinyUiNode | null>(
    selectedPath !== null ? getNode(tree, selectedPath) : null
  );
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  React.useEffect(() => {
    const selectedNode =
      selectedPath !== null ? getNode(tree, selectedPath) : null;
    setCurrentNode(selectedNode);
  }, [tree, selectedPath]);

  const handleSubmit = React.useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!currentNode || !selectedPath) return;

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
        node: {
          ...currentNode,
          // Add resulting html from setting validation (if present)
          uiHTML: "uiHTML" in result ? result.uiHTML : undefined,
        },
      });
    },
    [currentNode, selectedPath]
  );

  const updateArguments = (newArguments: typeof tree.uiArguments) => {
    setCurrentNode({
      ...currentNode,
      uiArguments: newArguments,
    } as typeof currentNode);
  };

  const deleteNode = React.useCallback(() => {
    if (selectedPath === null) return;

    sendTreeUpdateMessage({ type: "DELETE_NODE", path: selectedPath });
  }, [selectedPath]);

  return {
    currentNode,
    errorMsg,
    handleSubmit,
    deleteNode,
    updateArguments,
    selectedPath,
    setNodeSelection,
  };
}

export function SettingsPanel({ tree }: { tree: ShinyUiNode }) {
  const {
    currentNode,
    errorMsg,
    deleteNode,
    handleSubmit,
    updateArguments,
    selectedPath,
    setNodeSelection,
  } = useUpdateSettings({ tree });

  if (selectedPath === null) {
    return <div>Select an element to edit properties</div>;
  }
  if (currentNode === null) {
    return (
      <div>Error finding requested node at path {selectedPath.join(".")}</div>
    );
  }

  const isRootNode = selectedPath.length === 0;

  const { uiName, uiArguments } = currentNode;

  const SettingsInputs = shinyUiNodeInfo[uiName]
    .SettingsComponent as SettingsUpdaterComponent<typeof uiArguments>;

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
        <form onSubmit={handleSubmit}>
          <SettingsInputs settings={uiArguments} onChange={updateArguments} />
          <ErrorMessageDisplay errorMsg={errorMsg} />
          <div className={classes.submitHolder}>
            <Button type="submit">
              <BiCheck /> Update
            </Button>
          </div>
        </form>
      </div>

      {!isRootNode ? (
        <Button onClick={() => deleteNode()} variant="delete">
          <TrashIcon /> Delete Element
        </Button>
      ) : null}
    </div>
  );
}

function ErrorMessageDisplay({ errorMsg }: { errorMsg: string | null }) {
  if (errorMsg) {
    return (
      <div>
        Input settings are not valid. The following errors were received:
        <div className={classes.validationErrorMsg}>{errorMsg}</div>
      </div>
    );
  }

  return null;
}
