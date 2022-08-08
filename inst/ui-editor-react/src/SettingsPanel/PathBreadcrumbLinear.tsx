import { getNode } from "components/UiNode/TreeManipulation/getNode";
import type { NodePath, ShinyUiNode } from "Shiny-Ui-Elements/uiNodeTypes";
import { shinyUiNodeInfo } from "Shiny-Ui-Elements/uiNodeTypes";

import classes from "./PathBreadcrumbLinear.module.css";

const MAX_SHOWN = 3;
const TRUNCATION_STRING = "...";
export default function PathBreadcrumbLinear({
  tree,
  path,
  onSelect,
}: {
  tree: ShinyUiNode;
  path: NodePath;
  onSelect: (selectedPath: NodePath) => void;
}) {
  const totalDepth = path.length + 1;
  const startingDepth = Math.max(totalDepth - MAX_SHOWN, 0);
  const isTruncated = startingDepth !== 0;

  let pathString: string[] = isTruncated ? [TRUNCATION_STRING] : [];
  for (let depth = startingDepth; depth < totalDepth; depth++) {
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
          data-disable-click={
            name === TRUNCATION_STRING || i === pathString.length - 1
          }
          onClick={() => onSelect(path.slice(0, i))}
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
