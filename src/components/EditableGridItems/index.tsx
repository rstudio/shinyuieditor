import type { RefObject } from "preact";
import { DragUpdateDispatch } from "../../state-logic/drag-logic";
import type { DragDir, GridLayoutTemplate } from "../../types";
import { DragIcon } from "../Icons";
import classes from "./style.module.css";

export const EditableGridItems = ({
  items,
  editorRef,
  dragDispatch,
}: {
  items: GridLayoutTemplate["items"];
  editorRef: RefObject<HTMLDivElement>;
  dragDispatch: DragUpdateDispatch;
}) => {
  const startDrag = (e: MouseEvent) => {
    dragDispatch({
      type: "start",
      pos: { x: e.offsetX, y: e.offsetY },
    });
    console.log("Starting to drag!!!");
    editorRef.current?.addEventListener("mousemove", duringDrag);
    editorRef.current?.addEventListener("mouseup", endDrag);
  };

  const endDrag = () => {
    console.log("Ending drag!");
    dragDispatch({ type: "end" });
    editorRef.current?.removeEventListener("mousemove", duringDrag);
    editorRef.current?.removeEventListener("mouseup", endDrag);
  };

  const duringDrag = (e: MouseEvent) => {
    dragDispatch({
      type: "move",
      pos: { x: e.offsetX, y: e.offsetY },
    });
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
            <span key={dir} className={classes[dir]} onMouseDown={startDrag}>
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
