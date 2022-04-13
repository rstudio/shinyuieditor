import React from "react";

import ElementsPalette from ".";

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const ElementsPaletteDemo = () => (
  <div
    style={{
      width: "var(--layout-elements-panel-w, 100px)",
      height: "90vh",
      outline: "1px solid grey",
      backgroundColor: "var(--light-grey)",
    }}
  >
    <ElementsPalette />
  </div>
);
