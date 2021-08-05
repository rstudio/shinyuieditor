import type { RefObject } from "preact";
import { triggerCustomDragEvent } from "../../state-logic/drag-logic";
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
                e.stopPropagation();
                triggerCustomDragEvent({
                  el: editorRef.current as HTMLDivElement,
                  e,
                  type: "ItemResizeDrag",
                  name,
                  dir,
                });
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
