import {
  NodePath,
  ShinyUiNode,
} from "components/Shiny-Ui-Elements/Elements/uiNodeTypes";
import produce from "immer";

import {
  addNodeMutating,
  getNode,
  removeNodeMutating,
} from "./treeManipulation";

export default function moveNode({
  tree,
  fromPath,
  toPath,
}: {
  tree: ShinyUiNode;
  fromPath: NodePath;
  toPath: NodePath;
}) {
  return produce(tree, (treeDraft) => {
    // Gather node first
    const nodeToMove = getNode(treeDraft, fromPath);

    // Add it to the new position
    addNodeMutating({
      tree: treeDraft,
      path: toPath,
      newNode: nodeToMove,
    });

    // Remove it from its previous position
    removeNodeMutating({ tree: treeDraft, path: fromPath });
  });
}
