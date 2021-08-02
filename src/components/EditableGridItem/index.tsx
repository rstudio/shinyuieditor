import { RefObject } from "preact";
import { useRef } from "preact/hooks";
import { useLayoutDispatch } from "../../state-logic/layout-updating-logic";
import type { DragDir, GridItemDef, ItemTractPos } from "../../types";
import { DragHangle } from "../DragHangle";
import classes from "./style.module.css";

const allDirections: Array<DragDir> = [
  "middle",
  "topLeft",
  "topRight",
  "bottomLeft",
  "bottomRight",
];

export function EditableGridItem({
  name,
  rows,
  cols,
  editorRef,
}: GridItemDef & {
  editorRef: RefObject<HTMLDivElement>;
}) {
  const layoutDispatch = useLayoutDispatch();
  const gridItemRef = useRef<HTMLDivElement>(null);

  const onDrag = (type: DragDir) => {
    // const updatedCols: ItemTractPos = [...cols];
    // updatedCols[0] += 1;

    // layoutDispatch({
    //   type: "Move-Item",
    //   name: name,
    //   rows: rows,
    //   cols: updatedCols,
    // });
    console.log(`Dragging in ${type}`);
  };
  return (
    <div
      ref={gridItemRef}
      class={classes.item}
      style={{
        "--cols": cols.join("/"),
        "--rows": rows.join("/"),
      }}
    >
      {allDirections.map((dir) => (
        <DragHangle onDrag={onDrag} type={dir} editorRef={editorRef} />
      ))}
    </div>
  );
}
