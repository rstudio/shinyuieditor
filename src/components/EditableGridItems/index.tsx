import { RefObject } from "preact";
import { useMemo, useRef } from "preact/hooks";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { makeTractPos } from "../../helper-scripts/grid-helpers";
import { useGridDragger } from "../../state-logic/drag-logic";
import { gridItemBoundingBoxFamily } from "../../state-logic/dragStateAtoms";
import { useGridItemBoundingBoxRecorder } from "../../state-logic/gridItems";
import {
  gridItemsState,
  itemNamesState,
} from "../../state-logic/gridLayoutAtoms";
import type { DragDir } from "../../types";
import { DragIcon } from "../Icons";
import classes from "./style.module.css";

export const EditableGridItems = () => {
  const itemNames = useRecoilValue(itemNamesState);
  return (
    <>
      {itemNames.map((name) => (
        <EditableGridItem key={name} name={name} />
      ))}
    </>
  );
};

export type GridItemRef = RefObject<HTMLDivElement>;
const EditableGridItem = ({ name }: { name: string }) => {
  const { startRow, endRow, startCol, endCol } = useRecoilValue(
    gridItemsState(name)
  );

  const setBoundingBox = useSetRecoilState(gridItemBoundingBoxFamily(name));

  const itemRef: GridItemRef = useRef(null);

  useGridItemBoundingBoxRecorder({
    itemRef,
    startRow,
    endRow,
    startCol,
    endCol,
    setBoundingBox,
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
