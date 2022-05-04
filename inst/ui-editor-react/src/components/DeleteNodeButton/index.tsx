import Button from "components/Inputs/Button";
import type { NodePath } from "components/Shiny-Ui-Elements/uiNodeTypes";
import { FiTrash as TrashIcon } from "react-icons/fi";
import { useDeleteNode } from "SettingsPanel/useDeleteNode";

import classes from "./styles.module.css";

function DeleteNodeButton({ path }: { path: NodePath }) {
  const deletePanel = useDeleteNode(path);

  return (
    <Button
      className={classes.deleteButton}
      onClick={() => deletePanel()}
      variant="icon"
      aria-label="Delete Node"
    >
      <TrashIcon />
    </Button>
  );
}

export default DeleteNodeButton;
