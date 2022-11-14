import { getNode } from "components/UiNode/TreeManipulation/getNode";
import type { NodePath, ShinyUiNode } from "Shiny-Ui-Elements/uiNodeTypes";
import { shinyUiNodeInfo } from "Shiny-Ui-Elements/uiNodeTypes";

import classes from "./PathBreadcrumb.module.css";

export default function PathBreadcrumb({
  tree,
  path,
  onSelect,
}: {
  tree: ShinyUiNode;
  path: NodePath;
  onSelect: (selectedPath: NodePath) => void;
}) {
  const totalDepth = path.length;
  let pathString: string[] = [];
  for (let depth = 0; depth <= totalDepth; depth++) {
    const nodeAtDepth = getNode(tree, path.slice(0, depth));
    if (nodeAtDepth === undefined) {
      // If the selection is not valid (node probably just got moved) then don't
      // render breadcrumb
      return null;
    }

    pathString.push(shinyUiNodeInfo[nodeAtDepth.uiName].title);
  }

  return (
    <div className={classes.container} aria-label="Path to selected node">
      {pathString.map((name, i) => {
        const isFinalNode = i === totalDepth;
        const cleanNodeName = removeNamespaceFromUiName(name);
        return (
          <div
            key={name + i}
            className={classes.node}
            aria-label={
              isFinalNode ? "current selection" : "ancestor of selection"
            }
            onClick={
              // Only run selection callback when selection will change current
              // state. Otherwise it will just loose any changes to settings the
              // user has made without changing anything meaningful
              isFinalNode ? undefined : () => onSelect(path.slice(0, i))
            }
          >
            {cleanNodeName}
          </div>
        );
      })}
    </div>
  );
}

function removeNamespaceFromUiName(uiName: string): string {
  return uiName.replace(/[a-z]+::/, "");
}
