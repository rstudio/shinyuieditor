import { GridLayoutTemplate } from "../../types";

export function About(props: { layout: GridLayoutTemplate }) {
  return (
    <>
      <h2>Welcome to the Shiny Visual Layout Editor!</h2>
      <p>
        The currently selected layout is <strong>{props.layout.name}</strong>
      </p>
      <p>This is some informational text about what is going on here!</p>
    </>
  );
}
