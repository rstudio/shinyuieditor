import React from "react";

import Button from "components/Inputs/Button";
import type { NodePath } from "components/Shiny-Ui-Elements/uiNodeTypes";
import { FiTrash as TrashIcon } from "react-icons/fi";
import { useDeleteNode } from "SettingsPanel/useDeleteNode";

import classes from "./styles.module.css";

export function EmptyGridPanelMessage({ path }: { path: NodePath }) {
  const deletePanel = useDeleteNode(path);

  return (
    <div className={classes.emptyGridPanel}>
      Empty grid panel. Delete?
      <Button
        className={classes.deleteButton}
        onClick={() => deletePanel()}
        variant="delete"
        aria-label="Delete Node"
      >
        <TrashIcon /> Delete Element
      </Button>
    </div>
  );
}
