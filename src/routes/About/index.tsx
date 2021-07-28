import { GridLayoutTemplate } from "../../types";
import classes from "./style.module.css";

export function About(props: { layout: GridLayoutTemplate }) {
  return (
    <div class={classes.about}>
      <h1>Welcome to the Shiny Visual Layout Editor!</h1>
      <p>
        The currently selected layout is <strong>{props.layout.name}</strong>
      </p>
      <p>This is some informational text about what is going on here!</p>
    </div>
  );
}
