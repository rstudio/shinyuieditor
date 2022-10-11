import * as React from "react";

import type { KnownInputFieldTypes } from "components/Inputs/SettingsFormBuilder/inputFieldTypes";
import { getNode } from "components/UiNode/TreeManipulation/getNode";
import { useNodeSelectionState } from "NodeSelectionState";
import { useDispatch } from "react-redux";
import type { ShinyUiNode } from "Shiny-Ui-Elements/uiNodeTypes";
import { UPDATE_NODE } from "state/uiTree";

export function useUpdateSettings(tree: ShinyUiNode) {
  const dispatch = useDispatch();

  const [selectedPath, setNodeSelection] = useNodeSelectionState();

  const [currentNode, setCurrentNode] = React.useState<ShinyUiNode | null>(
    selectedPath !== null ? getNode(tree, selectedPath) : null
  );

  // When the selection changes it triggers a change in the currentNode variable
  // which if sent over to the server can cause the new path to be updated with
  // the old node which is not what we want. This variable helps the
  // send-to-backend function know to only send updates that came from the form
  // itself being updated
  const formHasBeenUpdated = React.useRef(false);

  const sendNewSettings = React.useCallback(
    (updated_node: ShinyUiNode) => {
      if (!selectedPath) return;
      // Don't send updates when the selected node has changed. See comments
      // for formHasBeenUpdated for more info
      if (!formHasBeenUpdated.current) return;

      // Sync the state that's been updated from the form to the main tree
      dispatch(UPDATE_NODE({ path: selectedPath, node: updated_node }));
    },
    [dispatch, selectedPath]
  );

  React.useEffect(() => {
    formHasBeenUpdated.current = false;
    if (selectedPath === null) {
      setCurrentNode(null);
      return;
    }
    const selectedNode = getNode(tree, selectedPath);

    // Sometimes the selection will fail because the selected node was just
    // moved. In this case back up until we get to an available parent
    if (selectedNode === undefined) return;

    setCurrentNode(getNode(tree, selectedPath));
  }, [tree, selectedPath]);

  React.useEffect(() => {
    if (!currentNode) return;

    sendNewSettings(currentNode);
  }, [currentNode, sendNewSettings]);

  const updateArgumentsByName = (
    name: string,
    value?: KnownInputFieldTypes
  ) => {
    setCurrentNode(
      (node) =>
        ({
          ...node,
          uiArguments: { ...node?.uiArguments, [name]: value },
        } as typeof currentNode)
    );
    formHasBeenUpdated.current = true;
  };

  return {
    currentNode,
    updateArgumentsByName,
    selectedPath,
    setNodeSelection,
  };
}
