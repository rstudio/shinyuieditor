import { useRef } from "preact/hooks";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { addGridPosToStyles } from "../../helper-scripts/grid-helpers";
import {
  selectedItemNameState,
  selectedItemState,
} from "../../state-logic/gridItems";
import { useGridDragger } from "../../state-logic/itemDragging";
import { DragDir } from "../../types";
import { DragIcon } from "../Icons";
import classes from "./style.module.css";

export function SelectedItemOverlay() {
  const resetSelection = useResetRecoilState(selectedItemNameState);
  const selectedItem = useRecoilValue(selectedItemState);
  if (selectedItem === null) return null;
  const itemRef = useRef<HTMLDivElement>(null);

  const startDrag = useGridDragger(itemRef);

  // The reason that we have a separate div for triggering the resetting of the
  // selected item is because if the click event was listening on the main div
  // it's really hard to differentiate between the drag events and the click to
  // close events, whereas the mouse-down on a drag handle wont trigger a click
  // event on the cancelBox div behind it.
  return (
    <div
      ref={itemRef}
      className={classes.item}
      style={addGridPosToStyles(selectedItem, {
        boxShadow: "var(--selected-shadow)",
      })}
    >
      {directions.map((dir) => (
        <span
          key={dir}
          className={classes[dir]}
          onMouseDown={(e) => {
            startDrag(e, dir);
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <DragIcon type={dir} />
        </span>
      ))}
      <div
        className={classes.cancelBox}
        onClick={() => {
          resetSelection();
        }}
      />
    </div>
  );
}

const directions: Array<DragDir> = [
  // "middle",
  "topLeft",
  "topRight",
  "left",
  "right",
  "top",
  "bottom",
  "bottomLeft",
  "bottomRight",
];
