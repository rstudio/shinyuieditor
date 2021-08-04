import { DragPos } from "../../state-logic/drag-logic";
import classes from "./style.module.css";

export function DragFeedbackRect({ status }: { status: DragPos }) {
  console.log(status);
  return (
    <>
      {status ? (
        <div
          className={classes.rect}
          style={{
            "--top": status.YStart - status.YOffset + "px",
            "--left": status.XStart - status.XOffset + "px",
            width: status.width,
            height: status.height,
          }}
        ></div>
      ) : (
        <div className={classes.hidden}></div>
      )}
    </>
  );
}
