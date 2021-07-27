import { useContext } from "preact/hooks";
import { CurrentLayoutCtx } from "../../manageState";

export function About() {
  const { state, updateState } = useContext(CurrentLayoutCtx);

  return (
    <>
      <h2>Welcome to the Shiny Visual Layout Editor!</h2>
      <p>
        The currently selected layout is <strong>{state.layout.name}</strong>
      </p>
      <p>This is some informational text about what is going on here!</p>
    </>
  );
}
