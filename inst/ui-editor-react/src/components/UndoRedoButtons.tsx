import React from "react";

import { MdRedo, MdUndo } from "react-icons/md";
import { useUndoRedo } from "state-logic/useUndoRedo";

import Button from "./Inputs/Button";
import classes from "./UndoRedoButtons.module.css";

export function UndoRedoButtons() {
  const { goBackward, goForward, canGoBackward, canGoForward } = useUndoRedo();

  return (
    <div className={classes.container + " undo-redo-buttons"}>
      <Button
        variant="icon"
        disabled={!canGoBackward}
        aria-label="Undo last change"
        title="Undo last change"
        onClick={goBackward}
      >
        <MdUndo />
      </Button>
      <Button
        variant="icon"
        disabled={!canGoForward}
        aria-label="Redo last change"
        title="Redo last change"
        onClick={goForward}
      >
        <MdRedo />
      </Button>
    </div>
  );
}
