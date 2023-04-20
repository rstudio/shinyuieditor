import type { NodePath } from "ui-node-definitions/src/NodePath";

import { Trash } from "../Icons";
import Button from "../Inputs/Button/Button";

import classes from "./styles.module.css";
import { useDeleteNode } from "./useDeleteNode";

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
