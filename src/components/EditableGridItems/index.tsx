import type { RefObject } from "preact";
import { ItemDragStart } from "../../state-logic/drag-logic";
import type { DragDir, GridLayoutTemplate } from "../../types";
import { DragIcon } from "../Icons";
import classes from "./style.module.css";

export const EditableGridItems = ({
  items,
  editorRef,
}: {
  items: GridLayoutTemplate["items"];
  editorRef: RefObject<HTMLDivElement>;
}) => {
  const triggerDragStart = (e: MouseEvent, dir: DragDir, name: string) => {
    editorRef.current?.dispatchEvent(
      new CustomEvent<ItemDragStart>("itemDrag", {
        detail: {
          name,
          dir,
          pageX: e.pageX,
          offsetX: e.offsetX,
          pageY: e.pageY,
          offsetY: e.offsetY,
        },
      })
    );
  };

  return (
    <>
      {items.map(({ name, rows, cols }) => (
        <div
          key={name}
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
                triggerDragStart(e, dir, name);
              }}
            >
              <DragIcon type={dir} />
            </span>
          ))}
        </div>
      ))}
    </>
  );
};

const directions: Array<DragDir> = [
  "middle",
  "topLeft",
  "topRight",
  "bottomLeft",
  "bottomRight",
];
