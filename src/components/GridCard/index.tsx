import classes from "./style.module.css";

export function GridCard(props: { title: string; gridArea: string }) {
  return (
    <div className={classes.card} style={{ "--grid-area": props.gridArea }}>
      <h3 className={classes.title}>{props.title}</h3>
    </div>
  );
}
