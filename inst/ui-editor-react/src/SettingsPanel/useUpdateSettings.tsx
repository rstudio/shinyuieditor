import * as React from "react";

import type { OnChangeCallback } from "components/Inputs/SettingsUpdateContext";
import type { ShinyUiNode } from "components/Shiny-Ui-Elements/uiNodeTypes";
import { getNode } from "components/UiNode/TreeManipulation/getNode";
import debounce from "just-debounce-it";
import { useNodeSelectionState } from "NodeSelectionState";
import { useDispatch } from "react-redux";
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

  // The new settings updating to the backend is debounced so we don't spam the
  // R backend and cause bad slowdowns.
  const sendNewSettings = React.useMemo(
    () =>
      debounce((updated_node: ShinyUiNode) => {
        if (!selectedPath) return;
        // Don't send updates when the selected node has changed. See comments
        // for formHasBeenUpdated for more info
        if (!formHasBeenUpdated.current) return;

        // Sync the state that's been updated from the form to the main tree
        dispatch(UPDATE_NODE({ path: selectedPath, node: updated_node }));
      }, 250),
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

  const updateArgumentsByName: OnChangeCallback = ({ name, value }) => {
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
