import * as React from "react";

import omit from "just-omit";
import { useDispatch } from "react-redux";

import type { KnownInputFieldTypes } from "../components/Inputs/SettingsFormBuilder/inputFieldTypes";
import { getNode } from "../components/UiNode/TreeManipulation/getNode";
import type { ShinyUiNode } from "../main";
import { useNodeSelectionState } from "../NodeSelectionState";
import { UPDATE_NODE } from "../state/uiTree";

export function useUpdateSettings(tree: ShinyUiNode) {
  const dispatch = useDispatch();

  const [selectedPath, setNodeSelection] = useNodeSelectionState();

  const [currentNode, setCurrentNode] = React.useState<ShinyUiNode | null>(
    selectedPath !== null ? safeGetNode(tree, selectedPath) : null
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
    setCurrentNode(safeGetNode(tree, selectedPath));
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

  const deleteArgumentByName = (name: string) => {
    setCurrentNode((node) => {
      if (node === null) return node;

      return {
        ...node,
        uiArguments: omit(
          node.uiArguments ?? {},
          name as keyof typeof node.uiArguments
        ),
      } as typeof currentNode;
    });
    formHasBeenUpdated.current = true;
  };

  return {
    currentNode,
    updateArgumentsByName,
    deleteArgumentByName,
    selectedPath,
    setNodeSelection,
  };
}

// Sometimes we may have a twisted state due to inconsistant timings of events
// firing. This makes sure that we don't crash the app if we try and go into a
// node that's about to be deleted. Ideally this should not ever trigger the
// catch, but just in case.
function safeGetNode(
  ...opts: Parameters<typeof getNode>
): ReturnType<typeof getNode> | null {
  try {
    return getNode(...opts);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn("Failed to get node. Args:", opts);
    return null;
  }
}
