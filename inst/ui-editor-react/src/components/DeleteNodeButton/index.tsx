import { useDeleteNode } from "components/DeleteNodeButton/useDeleteNode";
import { Trash } from "components/Icons";
import Button from "components/Inputs/Button";
import type { NodePath } from "components/Shiny-Ui-Elements/uiNodeTypes";

import classes from "./styles.module.css";

function DeleteNodeButton({ path }: { path: NodePath }) {
  const deletePanel = useDeleteNode(path);

  return (
    <Button
      className={classes.deleteButton}
      onClick={() => deletePanel()}
      aria-label="Delete Node"
      title="Delete Element"
    >
      <Trash />
      Delete Element
    </Button>
  );
}

export default DeleteNodeButton;
