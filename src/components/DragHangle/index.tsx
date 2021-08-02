import { RefObject } from "preact";
import { useDragDispatch } from "../../drag-logic";
import { DragDir } from "../../types";
import {
  BottomLeftArrow,
  BottomRightArrow,
  MoveIcon,
  TopLeftArrow,
  TopRightArrow,
} from "../icons";
import classes from "./style.module.css";

export const DragHangle = ({
  type,
  onDrag,
  editorRef,
}: {
  type: DragDir;
  onDrag: (type: DragDir) => void;
  editorRef: RefObject<HTMLDivElement>;
}) => {
  const dragDispatch = useDragDispatch();
  const startDrag = (e: MouseEvent) => {
    dragDispatch({
      type: "start",
      pos: { x: e.offsetX, y: e.offsetY },
    });
    console.log(`Starting to drag!!!`);
    editorRef.current?.addEventListener("mousemove", duringDrag);
    editorRef.current?.addEventListener("mouseup", endDrag);
  };

  const endDrag = (e: Event) => {
    console.log(`Ending drag!`);
    dragDispatch({ type: "end" });
    editorRef.current?.removeEventListener("mousemove", duringDrag);
    editorRef.current?.removeEventListener("mouseup", endDrag);
  };

  const duringDrag = (e: MouseEvent) => {
    dragDispatch({
      type: "move",
      pos: { x: e.offsetX, y: e.offsetY },
    });
    onDrag(type);
  };

  return (
    <span class={classes[type]} onMouseDown={(e) => startDrag(e)}>
      <DragIcon type={type} />
    </span>
  );
};

const DragIcon = ({ type }: { type: DragDir }) => {
  switch (type) {
    case "middle":
      return <MoveIcon />;
    case "topLeft":
      return <TopLeftArrow />;
    case "topRight":
      return <TopRightArrow />;
    case "bottomLeft":
      return <BottomLeftArrow />;
    case "bottomRight":
      return <BottomRightArrow />;
    default:
      console.error("That direction doesn't have an icon");
      return <MoveIcon />;
  }
};
