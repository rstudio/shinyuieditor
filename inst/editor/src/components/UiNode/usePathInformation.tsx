import React from "react";

import type { NodePath } from "ui-node-definitions/src/NodePath";
import { sameArray } from "util-functions/src/equalityCheckers";

import {
  useCurrentSelection,
  useSetCurrentSelection,
} from "../../state/selectedPath";

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
