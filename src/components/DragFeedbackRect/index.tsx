import type { DragState } from "../../state-logic/drag-logic";
import classes from "./style.module.css";

export function DragFeedbackRect({ status }: { status: DragState | null }) {
  if (!status) return <div className={classes.hidden}></div>;

  const color = status.type === "ItemResizeDrag" ? "red" : "blue";
  const { xStart, xEnd, yStart, yEnd, xOffset, yOffset } = status;

  return (
    <div
      className={classes.rect}
      style={{
        "--top": `calc(${yStart - yOffset}px - var(--gap))`,
        "--left": `calc(${xStart - xOffset}px - var(--gap))`,
        width: `${xEnd - xStart}px`,
        height: `${yEnd - yStart}px`,
        outline: `1px solid ${color}`,
      }}
    ></div>
  );
}
