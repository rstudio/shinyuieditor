import type { NodePath } from "ui-node-definitions/src/NodePath";
import { getNamedPath } from "ui-node-definitions/src/TreeManipulation/getNamedPath";
import type { ShinyUiNode } from "ui-node-definitions/src/uiNodeTypes";

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
  const pathString = getNamedPath(path, tree);
  const totalDepth = path.length;

  return (
    <div className={classes.container} aria-label="Path to selected node">
      {pathString.map((name, i) => {
        const isFinalNode = i === totalDepth;
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
            {name}
          </div>
        );
      })}
    </div>
  );
}
