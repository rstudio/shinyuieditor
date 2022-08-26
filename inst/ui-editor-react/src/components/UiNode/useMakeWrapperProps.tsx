import { pathToString } from "Shiny-Ui-Elements/nodePathUtils";
import type {
  NodePath,
  ShinyUiNode,
  UiNodeWrapperProps,
} from "Shiny-Ui-Elements/uiNodeTypes";

import { useMakeDraggable } from "../../DragAndDropHelpers/useMakeDraggable";

import { usePathInformation } from "./usePathInformation";

export function useMakeWrapperProps(
  node: ShinyUiNode,
  path: NodePath
): UiNodeWrapperSettings {
  const dragProps = useMakeDraggable({
    nodeInfo: { node, currentPath: path },
  });
  const { onClick, isSelected } = usePathInformation(path);

  return {
    onClick,
    "data-sue-path": pathToString(path),
    "data-is-selected-node": isSelected,
    ...dragProps,
  };
}
