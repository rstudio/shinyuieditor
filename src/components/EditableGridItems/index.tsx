import { RefObject } from "preact";
import { memo } from "preact/compat";
import { useRef } from "preact/hooks";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { makeColPos, makeRowPos } from "../../helper-scripts/grid-helpers";
import { useGridDragger } from "../../state-logic/drag-logic";
import { useGridItemBoundingBoxRecorder } from "../../state-logic/gridItems";
import {
  gridItemBoundingBoxFamily,
  gridItemsState,
  itemNamesState,
} from "../../state-logic/recoilAtoms";
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
const EditableGridItem = memo(({ name }: { name: string }) => {
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

  return (
    <div
      ref={itemRef}
      className={classes.item}
      style={{
        "--cols": makeColPos({ startCol, endCol }),
        "--rows": makeRowPos({ startRow, endRow }),
      }}
      title={name}
    >
      {directions.map((dir) => (
        <DragHandle key={name + dir} dir={dir} name={name} />
      ))}
    </div>
  );
});

const DragHandle = memo(({ dir, name }: { dir: DragDir; name: string }) => {
  const onMouseDown = useGridDragger({
    dragDir: dir,
    nameOfDragged: name,
  });

  return (
    <span className={classes[dir]} onMouseDown={onMouseDown}>
      <DragIcon type={dir} />
    </span>
  );
});

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
