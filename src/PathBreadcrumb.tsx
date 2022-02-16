import { getNode } from "components/Shiny-Ui-Elements/UiNode/treeManipulation";
import {
  NodePath,
  UiNodeProps,
} from "components/Shiny-Ui-Elements/uiNodeTypes";
import * as React from "react";
import classes from "./PathBreadcrumb.module.css";

export default function PathBreadcrumb({
  tree,
  path,
  onSelect,
}: {
  tree: UiNodeProps;
  path: NodePath;
  onSelect: (selectedPath: NodePath) => void;
}) {
  const totalDepth = path.length;
  let pathString: string[] = [];
  for (let depth = 0; depth <= totalDepth; depth++) {
    pathString.push(getNode(tree, path.slice(0, depth)).uiName);
  }

  return (
    <div className={classes.container}>
      {pathString.map((name, i) => (
        <div
          key={name}
          className={classes.node}
          onClick={
            // Only run selection callback when selection will change current
            // state. Otherwise it will just loose any changes to settings the
            // user has made without changing anything meaningful
            i === totalDepth ? undefined : () => onSelect(path.slice(0, i))
          }
        >
          {name}
        </div>
      ))}
    </div>
  );
}
