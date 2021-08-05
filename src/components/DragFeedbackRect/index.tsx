import type { DragState } from "../../state-logic/drag-logic";
import classes from "./style.module.css";

export function DragFeedbackRect({
  status,
  color = "pink",
}: {
  status: DragState | null;
  color?: string;
}) {
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
        outline: `1px solid ${color}`,
      }}
    ></div>
  );
}
