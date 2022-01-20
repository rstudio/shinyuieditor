import { UiNodeProps, NodePath, isContainerNode } from "./index";

import produce from "immer";

function removeNodeMutating(tree: UiNodeProps, path: NodePath) {
  let currNode: UiNodeProps = tree;

  const pathCopy = [...path];
  const lastPath = pathCopy.pop();
  if (typeof lastPath === "undefined")
    throw new Error("Path to node must have at least one element");
  let currPath: number;

  for (currPath of pathCopy) {
    if (!isContainerNode(currNode)) {
      throw new Error("Somehow trying to enter a leaf node");
    }

    currNode = currNode.uiChildren[currPath];
  }

  if (!isContainerNode(currNode)) {
    throw new Error("Somehow trying to enter a leaf node");
  }

  // Splice out this child
  currNode.uiChildren.splice(lastPath, 1);
}

// Use immer to turn our mutation into a deep copied version of the tree
export function removeNode(tree: UiNodeProps, path: NodePath) {
  return produce(tree, (treeDraft) => removeNodeMutating(treeDraft, path));
}
