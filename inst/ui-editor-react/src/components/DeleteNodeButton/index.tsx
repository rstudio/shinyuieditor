import { useDeleteNode } from "components/DeleteNodeButton/useDeleteNode";
import { Trash } from "components/Icons";
import Button from "components/Inputs/Button/Button";
import type { NodePath } from "components/Shiny-Ui-Elements/uiNodeTypes";

import classes from "./styles.module.css";

function DeleteNodeButton({
  path,
  justIcon = false,
}: {
  path: NodePath;
  justIcon?: boolean;
}) {
  const deletePanel = useDeleteNode(path);

  return (
    <Button
      className={classes.deleteButton}
      onClick={() => deletePanel()}
      aria-label="Delete Node"
      title="Delete Element"
      variant={justIcon ? "icon" : "delete"}
      type="button"
    >
      <Trash />
      {justIcon ? null : "Delete Element"}
    </Button>
  );
}

export default DeleteNodeButton;
