import { useMakeDraggable } from "../../DragAndDropHelpers/useMakeDraggable";
import type { ShinyUiNode } from "../../main";
import { pathToString } from "../../Shiny-Ui-Elements/nodePathUtils";
import type {
  NodePath,
  UiNodeWrapperProps,
} from "../../Shiny-Ui-Elements/uiNodeTypes";

import { usePathInformation } from "./usePathInformation";

export function useMakeWrapperProps(
  node: ShinyUiNode,
  path: NodePath
): UiNodeWrapperProps {
  const dragProps = useMakeDraggable({
    nodeInfo: { node, currentPath: path },
  });
  const { onClick, isSelected } = usePathInformation(path);

  return {
    onClick,
    "data-sue-path": pathToString(path),
    "data-is-selected-node": isSelected,
    "aria-label": node.uiName,
    ...dragProps,
  };
}
