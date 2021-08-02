import { Stringifier } from "postcss";
import { RefObject } from "preact";
import { useEffect, useRef } from "preact/hooks";
import { useLayoutDispatch } from "../../layout-updating-logic";
import { GridItemDef, ItemTractPos } from "../../types";
import {
  BottomLeftArrow,
  BottomRightArrow,
  DragIcon,
  TopLeftArrow,
  TopRightArrow,
} from "../icons";
import classes from "./style.module.css";

type DragDir = "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "middle";

const MoveIcon = ({
  type,
  onDrag,
  editorRef,
}: {
  type: DragDir;
  onDrag: (type: DragDir) => void;
  editorRef: RefObject<HTMLDivElement>;
}) => {
  let iconElement: JSX.Element;
  switch (type) {
    case "middle":
      iconElement = <DragIcon />;
      break;
    case "topLeft":
      iconElement = <TopLeftArrow />;
      break;
    case "topRight":
      iconElement = <TopRightArrow />;
      break;
    case "bottomLeft":
      iconElement = <BottomLeftArrow />;
      break;
    case "bottomRight":
      iconElement = <BottomRightArrow />;
      break;
    default:
      console.error("That shouldnt happen");
      return null;
  }

  const startDrag = (e: Event) => {
    console.log(`Starting to drag!`);
    editorRef.current?.addEventListener("mousemove", duringDrag);
    editorRef.current?.addEventListener("mouseup", endDrag);
  };

  const endDrag = (e: Event) => {
    console.log(`Ending drag!`);

    editorRef.current?.removeEventListener("mousemove", duringDrag);
    editorRef.current?.removeEventListener("mouseup", endDrag);
  };

  const duringDrag = (e: Event) => {
    onDrag(type);
  };

  return (
    <span class={classes[type]} onMouseDown={(e) => startDrag(e)}>
      {iconElement}
    </span>
  );
};

const allDirections: Array<DragDir> = [
  "middle",
  "topLeft",
  "topRight",
  "bottomLeft",
  "bottomRight",
];

export function EditableGridItem(
  props: GridItemDef & {
    editorRef: RefObject<HTMLDivElement>;
  }
) {
  const layoutDispatch = useLayoutDispatch();
  const gridItem = useRef<HTMLDivElement>(null);

  const onDrag = (type: DragDir) => {
    const updatedCols: ItemTractPos = [...props.cols];
    updatedCols[0] += 1;

    layoutDispatch({
      type: "Move-Item",
      name: props.name,
      rows: props.rows,
      cols: updatedCols,
    });
    console.log(`Dragging in ${type}`);
  };
  return (
    <div
      ref={gridItem}
      class={classes.item}
      style={{
        "--cols": props.cols.join("/"),
        "--rows": props.rows.join("/"),
      }}
    >
      {allDirections.map((dir) => (
        <MoveIcon onDrag={onDrag} type={dir} editorRef={props.editorRef} />
      ))}
    </div>
  );
}
