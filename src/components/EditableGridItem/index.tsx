import classes from "./style.module.css";

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
    ></div>
  );
}
