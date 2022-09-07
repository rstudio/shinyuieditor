import { areasOfChildren } from "components/Grids/areasOfChildren";
import { gridLayoutReducer } from "components/Grids/gridLayoutReducer";
import { getNode } from "components/UiNode/TreeManipulation/getNode";
import type { RemoveNodeArguments } from "components/UiNode/TreeManipulation/removeNode";
import type { UpdateNodeArguments } from "components/UiNode/TreeManipulation/updateNode";
import type { NodePath, ShinyUiNode } from "Shiny-Ui-Elements/uiNodeTypes";
import { emptyCell } from "utils/gridTemplates/itemLocations";

import type { GridCardSettings } from "../../Shiny-Ui-Elements/GridlayoutGridCard";

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
  const gridPageAndItemNodes = getGridPageAndItemNodes({
    tree,
    pathToGridItem: path,
  });

  if (gridPageAndItemNodes === null) return;
  const { gridPageNode } = gridPageAndItemNodes;

  const oldAreaName = areasOfChildren(gridPageNode.uiChildren)[path[0]];
  const newAreaName = (node.uiArguments as GridCardSettings).area ?? emptyCell;

  if (oldAreaName === newAreaName) return;

  gridPageNode.uiArguments = gridLayoutReducer(gridPageNode.uiArguments, {
    type: "RENAME_ITEM",
    oldName: oldAreaName,
    newName: newAreaName,
  });
}

export function removeDeletedGridAreaFromLayout(
  tree: ShinyUiNode,
  { path }: RemoveNodeArguments
) {
  const gridPageAndItemNodes = getGridPageAndItemNodes({
    tree,
    pathToGridItem: path,
  });

  if (gridPageAndItemNodes === null) return;

  const { gridPageNode, gridItemNode } = gridPageAndItemNodes;

  const deletedAreaName = (gridItemNode.uiArguments as GridCardSettings).area;

  if (!deletedAreaName) {
    // eslint-disable-next-line no-console
    console.error("Deleted node appears to not have a grid area, ignoring");
    return;
  }

  gridPageNode.uiArguments = gridLayoutReducer(gridPageNode.uiArguments, {
    type: "REMOVE_ITEM",
    name: deletedAreaName,
  });
}

function getGridPageAndItemNodes({
  tree,
  pathToGridItem,
}: {
  tree: ShinyUiNode;
  pathToGridItem: NodePath;
}): { gridPageNode: GridContainerNode; gridItemNode: ShinyUiNode } | null {
  // Node that's not a child of a grid element changed. This sould be
  // updated to be more general in the future
  if (pathToGridItem.length !== 1) return null;

  // Make sure that the parent of this node is in fact a grid page
  const gridPageNode = getNode(tree, pathToGridItem.slice(0, -1));
  if (!isValidGridContainer(gridPageNode)) {
    return null;
  }

  // Make sure the child node is in fact a grid item aware node
  const gridItemNode =
    gridPageNode.uiChildren[pathToGridItem[pathToGridItem.length - 1]];

  // Only trigger on updates of grid area nodes
  if (!("area" in gridItemNode.uiArguments)) return null;

  // Not sure why typescript cant properly infer this type here but we check for
  // the uiChildren already so it's a safe inference
  return {
    gridPageNode: gridPageNode as GridContainerNode,
    gridItemNode,
  };
}
