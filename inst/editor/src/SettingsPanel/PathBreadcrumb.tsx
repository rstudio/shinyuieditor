import type { ShinyUiNode } from "../main";
import type { NodePath } from "../Shiny-Ui-Elements/uiNodeTypes";
import { getNamedPath } from "../state/getNamedPath";

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
