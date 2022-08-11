import { useDeleteNode } from "components/DeleteNodeButton/useDeleteNode";
import { Trash } from "components/Icons";
import Button from "components/Inputs/Button/Button";
import type { NodePath } from "Shiny-Ui-Elements/uiNodeTypes";

import classes from "./styles.module.css";

function DeleteNodeButton({
  path,
  justIcon = false,
  label = "Delete Node",
}: {
  path: NodePath;
  justIcon?: boolean;
  label?: string;
}) {
  const deleteNode = useDeleteNode(path);

  return (
    <Button
      className={classes.deleteButton}
      onClick={(e) => {
        // Stop propigation of click event in case we have other click listeners
        // that try and do things like set selection
        e.stopPropagation();
        deleteNode();
      }}
      aria-label={label}
      title={label}
      variant={justIcon ? "icon" : "delete"}
      type="button"
    >
      <Trash />
      {justIcon ? null : "Delete Element"}
    </Button>
  );
}

export default DeleteNodeButton;
