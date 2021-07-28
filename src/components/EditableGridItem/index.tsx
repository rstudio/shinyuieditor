import {
  BottomLeftArrow,
  BottomRightArrow,
  DragIcon,
  TopLeftArrow,
  TopRightArrow,
} from "../icons";
import classes from "./style.module.css";

type DragDir = "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "middle";

const MoveIcon = ({ type }: { type: DragDir }) => {
  switch (type) {
    case "middle":
      return (
        <span class={classes.middle}>
          <DragIcon />
        </span>
      );
    case "topLeft":
      return (
        <span class={classes.topLeft}>
          <TopLeftArrow />
        </span>
      );
    case "topRight":
      return (
        <span class={classes.topRight}>
          <TopRightArrow />
        </span>
      );
    case "bottomLeft":
      return (
        <span class={classes.bottomLeft}>
          <BottomLeftArrow />
        </span>
      );
    case "bottomRight":
      return (
        <span class={classes.bottomRight}>
          <BottomRightArrow />
        </span>
      );
    default:
      console.error("That shouldnt happen");
      return null;
  }
};

export function EditableGridItem(props: {
  rows: [number, number];
  cols: [number, number];
}) {
  return (
    <div
      class={classes.item}
      style={{
        "--cols": props.cols.join("/"),
        "--rows": props.rows.join("/"),
      }}
    >
      <MoveIcon type={"middle"} />
      <MoveIcon type={"topLeft"} />
      <MoveIcon type={"topRight"} />
      <MoveIcon type={"bottomLeft"} />
      <MoveIcon type={"bottomRight"} />
    </div>
  );
}
