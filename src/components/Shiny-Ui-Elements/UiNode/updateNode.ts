import produce from "immer";
import { NodePath, UiNodeProps } from "./index";
import { navigateToParent } from "./navigateToParent";

type UpdateNodeArgs = {
  tree: UiNodeProps;
  path: NodePath;
  newNode: UiNodeProps;
};

// Use immer to turn our mutation into a deep copied version of the tree
export function replaceNode({ tree, path, newNode }: UpdateNodeArgs) {
  return produce(tree, (treeDraft) => {
    const { parentNode, indexToNode } = navigateToParent(treeDraft, path);

    // Update requested child
    parentNode.uiChildren[indexToNode] = newNode;
  });
}
