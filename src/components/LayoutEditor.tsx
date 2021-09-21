/** @jsxImportSource @emotion/react */

import * as React from "react";
import { EditorInstructions } from "./EditorInstructions";

export function LayoutEditor() {
  return (
    <div
      css={{
        "--main-gap": "var(--pad, 1rem)",
        "--row-controls-gap":
          "calc(var(--unit-input-width, 30px) - var(--main-gap))",
        "--col-controls-gap": "calc(50px - var(--main-gap))",
        display: "grid",
        gridTemplateColumns: "300px var(--row-controls-gap) 1fr",
        gridTemplateRows: "var(--col-controls-gap) auto 1fr auto",
        gap: "var(--main-gap)",
        padding: "var(--main-gap)",
        gridTemplateAreas: `
          "settings      .   .   "
          "settings      . editor"
          "instructions  . editor"
          "items         . editor"
        `,
      }}
    >
      <EditorInstructions />
    </div>
  );
}
