import { isContainerNode, NodePath, UiNodeProps } from "./index";

function getNode(tree: UiNodeProps, path: NodePath): UiNodeProps {
  let currNode: UiNodeProps = tree;
  let currPath: number;
  for (currPath of path) {
    if (!isContainerNode(currNode)) {
      throw new Error("Somehow trying to enter a leaf node");
    }

    currNode = currNode.uiChildren[currPath];
  }

  return currNode;
}
