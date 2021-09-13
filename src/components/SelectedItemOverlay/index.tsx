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
