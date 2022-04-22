import type {
  NodePath,
  ShinyUiNode,
} from "components/Shiny-Ui-Elements/uiNodeTypes";
import { shinyUiNodeInfo } from "components/Shiny-Ui-Elements/uiNodeTypes";
import { getNode } from "components/UiNode/TreeManipulation/getNode";

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
    <div className={classes.container}>
      {pathString.map((name, i) => (
        <div
          key={name + i}
          className={classes.node}
          onClick={
            // Only run selection callback when selection will change current
            // state. Otherwise it will just loose any changes to settings the
            // user has made without changing anything meaningful
            i === totalDepth ? undefined : () => onSelect(path.slice(0, i))
          }
        >
          {removeNamespaceFromUiName(name)}
        </div>
      ))}
    </div>
  );
}

function removeNamespaceFromUiName(uiName: string): string {
  return uiName.replace(/[a-z]+::/, "");
}
