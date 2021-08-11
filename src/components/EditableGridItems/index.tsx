import { RefObject } from "preact";
import { useRef } from "preact/hooks";
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
        <EditableGridItem key={itemInfo.name} info={itemInfo} onDrag={onDrag} />
      ))}
    </>
  );
};

export type GridItemRef = RefObject<HTMLDivElement>;
function EditableGridItem({
  info: { name, rows, cols },
  onDrag,
}: {
  info: GridItemDef;
  onDrag: DragKickoffFn;
}) {
  const itemRef: GridItemRef = useRef(null);

  return (
    <div
      ref={itemRef}
      className={classes.item}
      style={{
        "--cols": cols.join("/"),
        "--rows": rows.join("/"),
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

const directions: Array<DragDir> = [
  "middle",
  "topLeft",
  "topRight",
  "bottomLeft",
  "bottomRight",
];
