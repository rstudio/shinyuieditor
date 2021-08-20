import { RefObject } from "preact";
import { memo } from "preact/compat";
import { useRef } from "preact/hooks";
import { makeColPos, makeRowPos } from "../../helper-scripts/grid-helpers";
import type { DragKickoffFn } from "../../state-logic/drag-logic";
import type { DragDir, GridItemDef, GridLayoutTemplate } from "../../types";
import { DragIcon } from "../Icons";
import classes from "./style.module.css";

export const EditableGridItems = ({
  items,
  onDrag,
}: {
  items: GridLayoutTemplate["items"];
  onDrag: DragKickoffFn;
}) => {
  return (
    <>
      {items.map((itemInfo) => (
        <EditableGridItem key={itemInfo.name} {...itemInfo} onDrag={onDrag} />
      ))}
    </>
  );
};

export type GridItemRef = RefObject<HTMLDivElement>;
const EditableGridItem = memo(
  ({
    startRow,
    endRow,
    startCol,
    endCol,
    name,
    onDrag,
  }: GridItemDef & { onDrag: DragKickoffFn }) => {
    const itemRef: GridItemRef = useRef(null);

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
