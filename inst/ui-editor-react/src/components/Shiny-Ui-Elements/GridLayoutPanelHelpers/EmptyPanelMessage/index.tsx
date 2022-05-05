import DeleteNodeButton from "components/DeleteNodeButton";
import type { NodePath } from "components/Shiny-Ui-Elements/uiNodeTypes";

import classes from "./styles.module.css";

export function EmptyGridPanelMessage({ path }: { path: NodePath }) {
  return (
    <div className={classes.emptyGridPanel}>
      <span className={classes.emptyMessage}>Empty grid panel. Delete?</span>
      <DeleteNodeButton path={path} />
    </div>
  );
}
