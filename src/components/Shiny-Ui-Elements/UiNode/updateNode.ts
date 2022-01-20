import { UiNodeProps, NodePath, isContainerNode } from "./index";

import produce from "immer";

type UpdateNodeArgs = {
  tree: UiNodeProps;
  path: NodePath;
  newNode: UiNodeProps;
};

function replaceNodeMutating({ tree, path, newNode }: UpdateNodeArgs) {
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

  // Update requested child
  currNode.uiChildren[lastPath] = newNode;
}

// Use immer to turn our mutation into a deep copied version of the tree
export function replaceNode({ tree, path, newNode }: UpdateNodeArgs) {
  return produce(tree, (treeDraft) =>
    replaceNodeMutating({ tree: treeDraft, path, newNode })
  );
}
