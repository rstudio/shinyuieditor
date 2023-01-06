import * as React from "react";

import { useDeleteNode } from "../components/DeleteNodeButton/useDeleteNode";
import type { NodePath } from "../Shiny-Ui-Elements/uiNodeTypes";
import { useKeyboardShortcut } from "../utils/hooks/useKeyboardShortcut";

export function useDeleteNodeWithKeyboard(selectedPath: NodePath | null) {
  const deleteNode = useDeleteNode(selectedPath);
  // If the user presses the delete key when not editing an input etc, then run
  // delete node callback
  const onDeletePress = React.useCallback(
    (target: Element) => {
      if (target.tagName === "BODY") {
        deleteNode();
      }
    },
    [deleteNode]
  );

  useKeyboardShortcut({
    key: "Backspace",
    onPress: onDeletePress,
  });
}
