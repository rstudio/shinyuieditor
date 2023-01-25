import type { NodePath } from "../../../Shiny-Ui-Elements/uiNodeTypes";
import { sameArray } from "../../../utils/equalityCheckers";

import { nodesShareCommonParent } from "./nodesShareCommonParent";

export function getNewSelectionPathAfterDeletion({
  selectedPath,
  deletedPath,
}: {
  deletedPath: NodePath;
  selectedPath: NodePath;
}): NodePath {
  // If nothing is selected then we dont need to worry about deleting the
  // current selection
  if (selectedPath === null) return selectedPath;

  // Backup selection if it's the same as the deleted node
  if (sameArray(deletedPath, selectedPath)) {
    return stepSelectionBack(selectedPath);
  }

  // If the selection is earlier in the tree than the deleted node then
  // there's no need to change anything as that part of the tree will not be
  // touched
  if (selectedPath.length < deletedPath.length) return selectedPath;

  // If the selected path and the deleted node share a common parent
  // and the selected paths's index is higher than the deleted ones, we will
  // need to shift the selected path to account for the moving of the tree
  if (!nodesShareCommonParent(selectedPath, deletedPath)) return selectedPath;

  const finalNodeIndex = deletedPath.length - 1;

  if (finalNodeIndex < 0) {
    // Something went wrong. Resetting the selection
    return [];
  }

  const finalPosOfDeleted = deletedPath[finalNodeIndex];
  const positionOfSelected = selectedPath[finalNodeIndex];

  // Deleted node is later in the children of parent than the selected so the
  // index of selection will not update
  if (finalPosOfDeleted > positionOfSelected) return selectedPath;

  // Now just make a new version of the selected path with common parent index
  // shifted down to reflect new tree shape
  // const newSelectionPath = stepSelectionBack(selectedPath);
  const newSelectionPath = [...selectedPath];
  const newFinalPos = positionOfSelected - 1;

  if (newFinalPos < 0) {
    return newSelectionPath;
  }

  newSelectionPath[finalNodeIndex] = newFinalPos;
  return newSelectionPath;
}

function stepSelectionBack(selection: NodePath): NodePath {
  return selection.slice(0, selection.length - 1);
}
