import { InputProblem } from "components/Shiny-Ui-Elements/UiSettings/types";
import * as React from "react";

export function ShowProblems({
  which,
  problems,
}: {
  which: InputProblem["which"];
  problems: InputProblem[];
}) {
  return (
    <>
      {problems
        .filter((p) => p.which === which)
        .map(({ msg }) => (
          <span style={{ color: "orangered" }}>{msg}</span>
        ))}
    </>
  );
}
