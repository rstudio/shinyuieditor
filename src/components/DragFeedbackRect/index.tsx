import type { DragState } from "../../state-logic/drag-logic";
import classes from "./style.module.css";

export function DragFeedbackRect({
  status,
  color = "pink",
}: {
  status: DragState | null;
  color?: string;
}) {
  if (!status?.dragPos) return <div className={classes.hidden}></div>;

  const { xStart, xEnd, yStart, yEnd } = status.dragPos;
  const { xOffset, yOffset } = status;

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
