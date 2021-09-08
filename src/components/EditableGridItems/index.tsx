import { RefObject } from "preact";
import { useMemo, useRef } from "preact/hooks";
import { useRecoilValue } from "recoil";
import { makeTractPos } from "../../helper-scripts/grid-helpers";
import { useGridDragger } from "../../state-logic/dragging/hooks";
import type {
  GridItemAtom,
  GridItemsAtomFamily,
  GridItemNamesAtom,
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

export type GridItemRef = RefObject<HTMLDivElement>;
const EditableGridItem = ({
  name,
  itemDefState,
}: {
  name: string;
  itemDefState: GridItemAtom;
}) => {
  const itemDef = useRecoilValue(itemDefState);
  const { startRow, endRow, startCol, endCol } = itemDef;

  const itemRef: GridItemRef = useRef(null);

  useGridItemBoundingBoxRecorder({
    itemRef,
    ...itemDef,
  });

  const onMouseDown = useGridDragger({ nameOfDragged: name });

  const dragHandles = useMemo(() => {
    return directions.map((dir) => (
      <span
        key={name + dir}
        className={classes[dir]}
        onMouseDown={(e) => onMouseDown(e, dir)}
      >
        <DragIcon type={dir} />
      </span>
    ));
  }, [name, onMouseDown]);

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
      {dragHandles}
    </div>
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
