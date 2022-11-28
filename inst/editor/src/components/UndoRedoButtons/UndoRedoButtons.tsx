import React from "react";

import { useUndoRedo } from "../../state-logic/useUndoRedo";
import { Undo, Redo } from "../Icons";
import Button from "../Inputs/Button/Button";

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
        <Undo height="100%" />
      </Button>
      <Button
        variant={["transparent", "icon"]}
        disabled={!canGoForward}
        aria-label="Redo last change"
        title="Redo last change"
        onClick={goForward}
      >
        <Redo height="100%" />
      </Button>
    </div>
  );
}
