import { getNode } from "../../../components/UiNode/TreeManipulation/getNode";
import {
  getChildIndex,
  separateIntoParentAndChildPaths,
} from "../../../components/UiNode/TreeManipulation/getParentPath";
import type { RemoveNodeArguments } from "../../../components/UiNode/TreeManipulation/removeNode";
import type { UpdateNodeArguments } from "../../../components/UiNode/TreeManipulation/updateNode";
import type { ShinyUiNode } from "../../../main";
import { emptyCell } from "../../../utils/gridTemplates/itemLocations";
import type { NodePath } from "../../uiNodeTypes";
import type { GridItemSettings } from "../GridlayoutCard";

import { areasOfChildren } from "./areasOfChildren";
import { gridLayoutReducer } from "./GridContainerElement/gridLayoutReducer";
import type { GridContainerNode } from "./isValidGridContainer";
import { isValidGridContainer } from "./isValidGridContainer";

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
