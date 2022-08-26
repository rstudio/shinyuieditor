import type {
  NodePath,
  ShinyUiNode,
  UiNodeWrapperSettings,
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
    "data-sue-path": path.join("-"),
    "data-is-selected-node": isSelected,
    ...dragProps,
  };
}
