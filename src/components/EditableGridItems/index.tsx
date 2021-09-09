import { RefObject } from "preact";
import { useRef } from "preact/hooks";
import { useRecoilValue } from "recoil";
import { makeTractPos } from "../../helper-scripts/grid-helpers";
import { useGridDragger } from "../../state-logic/dragging/hooks";
import {
  GridItemAtom,
  GridItemNamesAtom,
  GridItemsAtomFamily,
} from "../../state-logic/gridItems/atoms";
import { useGridItemBoundingBoxRecorder } from "../../state-logic/gridItems/hooks";
import type { DragDir } from "../../types";
import { DragIcon } from "../Icons";
import classes from "./style.module.css";

export function EditableGridItems({
  itemNamesState,
  itemDefsState,
}: {
  itemNamesState: GridItemNamesAtom;
  itemDefsState: GridItemsAtomFamily;
}) {
  const itemNames = useRecoilValue(itemNamesState);
  return (
    <>
      {itemNames.map((name) => (
        <EditableGridItem
          key={name}
          name={name}
          itemDefState={itemDefsState(name)}
        />
      ))}
    </>
  );
}

const EditableGridItem = ({
  name,
  itemDefState,
}: {
  name: string;
  itemDefState: GridItemAtom;
}) => {
  const itemDef = useRecoilValue(itemDefState);
  const { startRow, endRow, startCol, endCol } = itemDef;

  const itemRef: RefObject<HTMLDivElement> = useRef(null);

  useGridItemBoundingBoxRecorder({
    itemRef,
    ...itemDef,
  });

  return (
    <div
      ref={itemRef}
      className={classes.item}
      style={{
        "--cols": makeTractPos(startCol, endCol),
        "--rows": makeTractPos(startRow, endRow),
      }}
      title={name}
    >
      {directions.map((dir) => (
        <ItemDragHandle key={name + dir} name={name} dir={dir} />
      ))}
    </div>
  );
};

const ItemDragHandle = ({ name, dir }: { name: string; dir: DragDir }) => {
  const startDrag = useGridDragger(name, dir);

  return (
    <span key={name + dir} className={classes[dir]} onMouseDown={startDrag}>
      <DragIcon type={dir} />
    </span>
  );
};

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
