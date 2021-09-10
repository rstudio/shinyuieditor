import { useRef } from "preact/hooks";
import { useRecoilValue } from "recoil";
import { selectedItemState } from "../../state-logic/gridItems";
import { useGridDragger } from "../../state-logic/itemDragging";
import { DragDir } from "../../types";
import { GridItem } from "../GridItem";
import { DragIcon } from "../Icons";
import classes from "./style.module.css";

export function SelectedItemOverlay() {
  const selectedItem = useRecoilValue(selectedItemState);
  if (selectedItem === null) return null;
  const itemRef = useRef<HTMLDivElement>(null);

  const startDrag = useGridDragger(itemRef);
  return (
    <GridItem
      {...selectedItem}
      styles={{
        boxShadow: "var(--selected-shadow)",
      }}
      className={classes.item}
      divRef={itemRef}
    >
      {directions.map((dir) => (
        <span
          key={dir}
          className={classes[dir]}
          onMouseDown={(e) => startDrag(e, dir)}
        >
          <DragIcon type={dir} />
        </span>
      ))}
    </GridItem>
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
