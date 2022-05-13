import React from "react";

import { Redo, Undo } from "components/Icons";
import { useUndoRedo } from "state-logic/useUndoRedo";

import Button from "./Inputs/Button";
import classes from "./UndoRedoButtons.module.css";

export function UndoRedoButtons() {
  const { goBackward, goForward, canGoBackward, canGoForward } = useUndoRedo();

  return (
    <div className={classes.container + " undo-redo-buttons"}>
      <Button
        variant={["transparent", "icon"]}
        disabled={!canGoBackward}
        aria-label="Undo last change"
        title="Undo last change"
        onClick={goBackward}
      >
        <Undo />
      </Button>
      <Button
        variant={["transparent", "icon"]}
        disabled={!canGoForward}
        aria-label="Redo last change"
        title="Redo last change"
        onClick={goForward}
      >
        <Redo />
      </Button>
    </div>
  );
}
