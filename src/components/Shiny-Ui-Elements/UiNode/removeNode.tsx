import produce from "immer";
import { NodePath, UiNodeProps } from "./index";
import { navigateToParent } from "./navigateToParent";

// Use immer to turn our mutation into a deep copied version of the tree
export function removeNode({
  tree,
  path,
}: {
  tree: UiNodeProps;
  path: NodePath;
}) {
  return produce(tree, (treeDraft) => {
    const { parentNode, indexToNode } = navigateToParent(treeDraft, path);

    // Splice out this child
    parentNode.uiChildren.splice(indexToNode, 1);
  });
}
