import React from "react";

import { useNodeSelectionState } from "NodeSelectionState";
import type { NodePath } from "Shiny-Ui-Elements/uiNodeTypes";

/**
 * Attach path information and click information to a given ui node ref. This
 * hook will annotate the path onto the ui element and also make it so when the
 * node is clicked the node selection is updated.
 * @param ref React reference object belonging to ui node component
 * @param path Path of the ui node within the ui tree
 */
export function usePathInformation(
  ref: React.RefObject<HTMLDivElement>,
  path: NodePath
) {
  const [, setNodeSelection] = useNodeSelectionState();

  const handleClick = React.useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      setNodeSelection(path);
    },
    [path, setNodeSelection]
  );

  React.useEffect(() => {
    const nodeElement = ref.current;
    if (!nodeElement) return;

    nodeElement.addEventListener("click", handleClick);
    attachDataPath(nodeElement, path);

    return () => {
      nodeElement.removeEventListener("click", handleClick);
    };
  }, [handleClick, path, ref]);
}

/**
 * Add a data attribute to each node's outer div so it can be easily selected
 * via path. Attribute added is `data-sue-path` and is joined by dashes (`-`)
 */
function attachDataPath(nodeEl: HTMLElement, path: NodePath) {
  nodeEl.dataset.suePath = path.join("-");
}
