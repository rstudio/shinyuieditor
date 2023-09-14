import type { HistoryInfo } from "../../HistoryNavigation/useUndoRedo";
import { mergeClasses } from "../../utils/mergeClasses";
import { Redo, Undo } from "../Icons";
import Button from "../Inputs/Button/Button";

import classes from "./UndoRedoButtons.module.css";

export function UndoRedoButtons({
  goBackward,
  canGoBackward,
  goForward,
  canGoForward,
}: HistoryInfo) {
  return (
    <div
      className={mergeClasses(classes.container, "undo-redo-buttons")}
      aria-label="Undo/Redo buttons"
    >
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
