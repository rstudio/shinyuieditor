import { RefObject } from "preact";
import { memo } from "preact/compat";
import { useRef } from "preact/hooks";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { makeColPos, makeRowPos } from "../../helper-scripts/grid-helpers";
import type { DragKickoffFn } from "../../state-logic/drag-logic";
import {
  gridItemsState,
  itemBoundingBoxState,
  itemNamesState,
  useGridItemBoundingBoxRecorder,
} from "../../state-logic/gridItems";
import type { DragDir } from "../../types";
import { DragIcon } from "../Icons";
import classes from "./style.module.css";

export const EditableGridItems = ({ onDrag }: { onDrag: DragKickoffFn }) => {
  const itemNames = useRecoilValue(itemNamesState);
  return (
    <>
      {itemNames.map((name) => (
        <EditableGridItem key={name} name={name} onDrag={onDrag} />
      ))}
    </>
  );
};

export type GridItemRef = RefObject<HTMLDivElement>;
const EditableGridItem = memo(
  ({ name, onDrag }: { name: string; onDrag: DragKickoffFn }) => {
    const { startRow, endRow, startCol, endCol } = useRecoilValue(
      gridItemsState(name)
    );

    const setBoundingBox = useSetRecoilState(itemBoundingBoxState(name));

    const itemRef: GridItemRef = useRef(null);

    useGridItemBoundingBoxRecorder({
      itemRef,
      startRow,
      endRow,
      startCol,
      endCol,
      setBoundingBox,
      debugName: name,
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
          <span
            key={dir}
            className={classes[dir]}
            onMouseDown={(e: MouseEvent) => {
              e.stopPropagation();
              onDrag(e, {
                dragType: "ResizeItemDrag",
                name,
                itemRef,
                dragDir: dir,
              });
            }}
          >
            <DragIcon type={dir} />
          </span>
        ))}
      </div>
    );
  }
);

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
