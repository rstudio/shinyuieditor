import React from "react";

import { useNodeSelectionState } from "NodeSelectionState";
import type { NodePath } from "Shiny-Ui-Elements/uiNodeTypes";
import { sameArray } from "utils/equalityCheckers";

/**
 * Builds info related to the path such as a click handler to set selection and
 * selected status
 * @param path Path of the ui node within the ui tree
 */
export function usePathInformation(path: NodePath) {
  const [selectedPath, setNodeSelection] = useNodeSelectionState();

  const handleClick: React.MouseEventHandler<HTMLDivElement> =
    React.useCallback(
      (e) => {
        e.stopPropagation();
        setNodeSelection(path);
      },
      [path, setNodeSelection]
    );

  const isSelected = Boolean(selectedPath && sameArray(selectedPath, path));

  return { onClick: handleClick, isSelected };
}
