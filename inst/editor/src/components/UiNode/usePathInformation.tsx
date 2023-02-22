import React from "react";

import type { NodePath } from "../../Shiny-Ui-Elements/uiNodeTypes";
import {
  useCurrentSelection,
  useSetCurrentSelection,
} from "../../state/selectedPath";
import { sameArray } from "../../utils/equalityCheckers";

/**
 * Builds info related to the path such as a click handler to set selection and
 * selected status
 * @param path Path of the ui node within the ui tree
 */
export function usePathInformation(path: NodePath) {
  const selectedPath = useCurrentSelection();
  const setSelectedPath = useSetCurrentSelection();

  const handleClick: React.MouseEventHandler<HTMLDivElement> =
    React.useCallback(
      (e) => {
        e.stopPropagation();
        setSelectedPath(path);
      },
      [path, setSelectedPath]
    );

  const isSelected = Boolean(selectedPath && sameArray(selectedPath, path));

  return { onClick: handleClick, isSelected };
}
