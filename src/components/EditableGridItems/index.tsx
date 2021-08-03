import type { RefObject } from "preact";
import { DragUpdateDispatch } from "../../state-logic/drag-logic";
import type { GridLayoutTemplate } from "../../types";
import { DragHandles } from "../DragHangles";
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
  return (
    <>
      {items.map(({ name, rows, cols }) => (
        <div
          class={classes.item}
          style={{
            "--cols": cols.join("/"),
            "--rows": rows.join("/"),
          }}
          title={name}
        >
          <DragHandles editorRef={editorRef} dispatch={dragDispatch} />
        </div>
      ))}
    </>
  );
};
