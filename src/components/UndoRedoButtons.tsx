import React from "react";

import { FaUndo, FaRedo } from "react-icons/fa";
import { useUndoRedo } from "state-logic/useUndoRedo";

import Button from "./Inputs/Button";
import classes from "./UndoRedoButtons.module.css";

export function UndoRedoButtons() {
  const { goBackward, goForward, canGoBackward, canGoForward } = useUndoRedo();

  return (
    <div className={classes.container}>
      <Button disabled={!canGoBackward} aria-label="undo" onClick={goBackward}>
        <FaUndo />
      </Button>
      <Button disabled={!canGoForward} aria-label="redo" onClick={goForward}>
        <FaRedo />
      </Button>
    </div>
  );
}
