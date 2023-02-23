import { useMakeDraggable } from "../../DragAndDropHelpers/useMakeDraggable";
import { pathToString } from "../../Shiny-Ui-Elements/nodePathUtils";
import type { UiNodeWrapperProps } from "../../Shiny-Ui-Elements/uiNodeTypes";

import type { UiNodeProps } from "./UiNode";
import { usePathInformation } from "./usePathInformation";

export function useMakeWrapperProps({
  node,
  path,
  canDrag,
}: UiNodeProps): Required<UiNodeWrapperProps> {
  const dragProps = useMakeDraggable({ node, currentPath: path });

  const { onClick, isSelected } = usePathInformation(path);

  return {
    onClick,
    "data-sue-path": pathToString(path),
    "data-is-selected-node": isSelected,
    "aria-label": node.uiName,
    ...(canDrag ? dragProps : {}),
  };
}
