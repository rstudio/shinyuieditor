import { areasOfChildren } from "components/Shiny-Ui-Elements/Elements/GridlayoutGridPage/GridlayoutGridPage";
import { gridLayoutReducer } from "components/Shiny-Ui-Elements/Elements/GridlayoutGridPage/gridLayoutReducer";
import type { GridPanelSettings } from "components/Shiny-Ui-Elements/Elements/GridlayoutGridPanel";
import type { ShinyUiNode } from "components/Shiny-Ui-Elements/Elements/uiNodeTypes";
import { getNode } from "components/Shiny-Ui-Elements/UiNode/TreeManipulation/getNode";
import type { UpdateNodeArguments } from "components/Shiny-Ui-Elements/UiNode/TreeManipulation/updateNode";
import { emptyCell } from "utils/gridTemplates/itemLocations";

// This function watches for changes in a grid layout childs grid area and
// updates the parent's layout names accordingly. Note that it mutates the tree
// object in place and so should only be used inside of an immer-ized function
// like a redux reducer
export function watchAndReactToGridAreaUpdatesupdate({
  tree,
  path,
  node,
}: { tree: ShinyUiNode } & UpdateNodeArguments) {
  console.log("Checking for grid updates");
  // Node that's not a child of a grid element changed. This sould be
  // updated to be more general in the future
  if (path.length !== 1) return;

  // Only trigger on updates of grid area nodes
  if (!("area" in node.uiArguments)) return;

  // Make sure that the parent of this node is in fact a grid page
  const parentNode = getNode(tree, path.slice(0, -1));
  if (parentNode.uiName !== "gridlayout::grid_page") return;

  if (parentNode.uiChildren === undefined) return;

  const oldAreaName = areasOfChildren(parentNode.uiChildren)[path[0]];
  const newAreaName = (node.uiArguments as GridPanelSettings).area ?? emptyCell;

  parentNode.uiArguments = gridLayoutReducer(parentNode.uiArguments, {
    type: "RENAME_ITEM",
    oldName: oldAreaName,
    newName: newAreaName,
  });
}
