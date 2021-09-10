import { useEffect, useRef } from "preact/hooks";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  selectedItemRef,
  selectedItemState,
} from "../../state-logic/gridItems";
import { useGridDragger } from "../../state-logic/itemDragging";
import { DragDir } from "../../types";
import { GridItem } from "../GridItem";
import { DragIcon } from "../Icons";
import classes from "./style.module.css";

export function SelectedItemOverlay() {
  const selectedItem = useRecoilValue(selectedItemState);
  if (selectedItem === null) return null;
  const selectedItemName = selectedItem.name;

  const itemRef = useRef<HTMLDivElement>(null);

  const setSelectedRef = useSetRecoilState(selectedItemRef);
  useEffect(() => {
    // Hook up the ref into the item state
    setSelectedRef(itemRef);
  }, []);

  const startDrag = useGridDragger(selectedItemName, itemRef);
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
        // <ItemDragHandle key={dir} name={selectedItemName} dir={dir} />
      ))}
    </GridItem>
  );
}

const directions: Array<DragDir> = [
  "middle",
  "topLeft",
  "topRight",
  "left",
  "right",
  "top",
  "bottom",
  "bottomLeft",
  "bottomRight",
];
