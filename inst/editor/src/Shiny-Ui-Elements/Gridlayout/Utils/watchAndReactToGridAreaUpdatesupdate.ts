import type { GridItemSettings } from "ui-node-definitions/src/gridlayout/grid_card";
import { areasOfChildren } from "ui-node-definitions/src/gridlayout/gridTemplates/areasOfChildren";
import { emptyCell } from "ui-node-definitions/src/gridlayout/gridTemplates/itemLocations";
import type { GridContainerNode } from "ui-node-definitions/src/gridlayout/isValidGridItem";
import { isValidGridContainer } from "ui-node-definitions/src/gridlayout/isValidGridItem";
import type { NodePath } from "ui-node-definitions/src/NodePath";
import type { ShinyUiNode } from "ui-node-definitions/src/ShinyUiNode";
import { getNode } from "ui-node-definitions/src/TreeManipulation/getNode";
import {
  getChildIndex,
  separateIntoParentAndChildPaths,
} from "ui-node-definitions/src/TreeManipulation/getParentPath";
import type { RemoveNodeArguments } from "ui-node-definitions/src/TreeManipulation/removeNode";
import type { UpdateNodeArguments } from "ui-node-definitions/src/TreeManipulation/updateNode";

import { gridLayoutReducer } from "./GridContainerElement/gridLayoutReducer";

// This function watches for changes in a grid layout childs grid area and
// updates the parent's layout names accordingly. Note that it mutates the tree
// object in place and so should only be used inside of an immer-ized function
// like a redux reducer
export function updateGridLayoutAreaOnItemAreaChange(
  tree: ShinyUiNode,
  { path, node }: UpdateNodeArguments
) {
  const gridPageAndItemNodes = getGridContainerAndItemNodes({
    tree,
    pathToGridItem: path,
  });

  if (gridPageAndItemNodes === null) return;
  const { gridPageNode } = gridPageAndItemNodes;

  const child_index = getChildIndex(path);
  if (typeof child_index !== "number") {
    throw new Error("Grid item node should always be a child of the parent");
  }

  const oldAreaName = areasOfChildren(gridPageNode.children)[child_index];

  const newAreaName = (node.namedArgs as GridItemSettings).area ?? emptyCell;

  if (oldAreaName === newAreaName) return;

  gridPageNode.namedArgs = gridLayoutReducer(gridPageNode.namedArgs, {
    type: "RENAME_ITEM",
    oldName: oldAreaName,
    newName: newAreaName,
  });
}

export function removeDeletedGridAreaFromLayout(
  tree: ShinyUiNode,
  { path }: RemoveNodeArguments
) {
  const gridPageAndItemNodes = getGridContainerAndItemNodes({
    tree,
    pathToGridItem: path,
  });

  if (gridPageAndItemNodes === null) return;

  const { gridPageNode, gridItemNode } = gridPageAndItemNodes;

  const deletedAreaName = (gridItemNode.namedArgs as GridItemSettings).area;

  if (!deletedAreaName) {
    // eslint-disable-next-line no-console
    console.error("Deleted node appears to not have a grid area, ignoring");
    return;
  }

  gridPageNode.namedArgs = gridLayoutReducer(gridPageNode.namedArgs, {
    type: "REMOVE_ITEM",
    name: deletedAreaName,
  });
}

function getGridContainerAndItemNodes({
  tree,
  pathToGridItem,
}: {
  tree: ShinyUiNode;
  pathToGridItem: NodePath;
}): { gridPageNode: GridContainerNode; gridItemNode: ShinyUiNode } | null {
  const item_paths = separateIntoParentAndChildPaths(pathToGridItem);

  // A grid item node should always be a child of the parent grid container
  if (
    item_paths.child_location === "namedArgs" ||
    item_paths.child_location === "missing"
  )
    return null;

  const parentNode = getNode(tree, item_paths.parent_path);

  // Make sure that the parent of this node is in fact a grid page
  if (!isValidGridContainer(parentNode)) {
    return null;
  }

  // Make sure the child node is in fact a grid item aware node
  const gridItemNode = parentNode.children[item_paths.child_path];

  // Only trigger on updates of grid area nodes
  if (!("area" in gridItemNode.namedArgs)) return null;

  // Not sure why typescript cant properly infer this type here but we check for
  // the children already so it's a safe inference
  return {
    gridPageNode: parentNode,
    gridItemNode,
  };
}
