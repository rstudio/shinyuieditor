import type { DragState } from "../../state-logic/drag-logic";
import classes from "./style.module.css";

export function DragFeedbackRect({ status }: { status: DragState | null }) {
  if (!status) return <div className={classes.hidden}></div>;

  const { xStart, xEnd, yStart, yEnd, xOffset, yOffset } = status;
  const width = xEnd - xStart;
  const height = yEnd - yStart;
  const top = yStart - yOffset;
  const left = xStart - xOffset;
  return (
    <div
      className={classes.rect}
      style={{
        "--top": top + "px",
        "--left": left + "px",
        width: width + "px",
        height: height + "px",
      }}
    ></div>
  );
}
