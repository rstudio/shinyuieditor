import { RefObject } from "preact";
import { DragUpdateDispatch } from "../../state-logic/drag-logic";
import { DragDir } from "../../types";
import {
  BottomLeftArrow,
  BottomRightArrow,
  MoveIcon,
  TopLeftArrow,
  TopRightArrow,
} from "../Icons";
import classes from "./style.module.css";

const allDirections: Array<DragDir> = [
  "middle",
  "topLeft",
  "topRight",
  "bottomLeft",
  "bottomRight",
];

export const DragHandles = ({
  dispatch,
  editorRef,
}: {
  dispatch: DragUpdateDispatch;
  editorRef: RefObject<HTMLDivElement>;
}) => {
  const startDrag = (e: MouseEvent) => {
    dispatch({
      type: "start",
      pos: { x: e.offsetX, y: e.offsetY },
    });
    console.log("Starting to drag!!!");
    editorRef.current?.addEventListener("mousemove", duringDrag);
    editorRef.current?.addEventListener("mouseup", endDrag);
  };

  const endDrag = () => {
    console.log("Ending drag!");
    dispatch({ type: "end" });
    editorRef.current?.removeEventListener("mousemove", duringDrag);
    editorRef.current?.removeEventListener("mouseup", endDrag);
  };

  const duringDrag = (e: MouseEvent) => {
    dispatch({
      type: "move",
      pos: { x: e.offsetX, y: e.offsetY },
    });
  };

  return (
    <>
      {allDirections.map((dir) => (
        <span
          key={dir}
          className={classes[dir]}
          onMouseDown={(e) => startDrag(e)}
        >
          <DragIcon type={dir} />
        </span>
      ))}
    </>
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
