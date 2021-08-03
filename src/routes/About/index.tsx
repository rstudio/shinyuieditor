import classes from "./style.module.css";

export function About(props: { layoutName: string }) {
  return (
    <div className={classes.about}>
      <h1>Welcome to the Shiny Visual Layout Editor!</h1>
      <p>
        The currently selected layout is <strong>{props.layoutName}</strong>
      </p>
      <p>This is some informational text about what is going on here!</p>
    </div>
  );
}
